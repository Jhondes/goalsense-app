#!/usr/bin/env python3
"""Export GoalSense Performance Insights data from the Match Analysis worksheet.

Reads the workbook only. It never writes to or modifies the Excel source file.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any

try:
    from openpyxl import load_workbook
except ImportError:
    print("ERROR: openpyxl is not installed. Run update-performance-data.bat again.")
    sys.exit(1)

MARKETS = ("OVER 1.5", "OVER 2.5", "BTTS")


def parse_score(value: Any) -> tuple[int, int] | None:
    """Parse workbook score formats accepted by its Result Status formula."""
    if value is None:
        return None
    text = str(value).strip()
    text = text.replace("–", "-").replace("—", "-").replace(":", "-")
    match = re.fullmatch(r"\s*(\d+)\s*-\s*(\d+)\s*", text)
    if not match:
        return None
    return int(match.group(1)), int(match.group(2))


def parse_date(value: Any) -> str | None:
    if value is None or value == "":
        return None
    if isinstance(value, datetime):
        parsed = value.date()
    elif isinstance(value, date):
        parsed = value
    else:
        text = str(value).strip()
        if not text or text in {"0", "00/00/00", "0/0/0"}:
            return None
        parsed = None
        # The workbook's displayed dates are day/month/year.
        for fmt in ("%d/%m/%y", "%d/%m/%Y", "%Y-%m-%d", "%d-%m-%Y", "%d-%m-%y"):
            try:
                parsed = datetime.strptime(text, fmt).date()
                break
            except ValueError:
                pass
        if parsed is None:
            return None
    if parsed.year < 2000 or parsed.year > 2100:
        return None
    return parsed.isoformat()


def metric(wins: int, losses: int) -> dict[str, int | float]:
    total = wins + losses
    return {
        "wins": wins,
        "losses": losses,
        "total": total,
        "accuracy": round((wins / total) * 100, 2) if total else 0,
    }


def choose_workbook() -> Path | None:
    try:
        import tkinter as tk
        from tkinter import filedialog

        root = tk.Tk()
        root.withdraw()
        root.attributes("-topmost", True)
        selected = filedialog.askopenfilename(
            title="Select your GoalSense Automatic Match Workbook",
            filetypes=[("Excel workbooks", "*.xlsx *.xlsm"), ("All files", "*.*")],
        )
        root.destroy()
        return Path(selected) if selected else None
    except Exception:
        return None


def build_export(workbook_path: Path) -> dict[str, Any]:
    wb = load_workbook(workbook_path, data_only=True, read_only=True)
    try:
        if "Match Analysis" not in wb.sheetnames:
            raise ValueError("The selected workbook does not contain a 'Match Analysis' sheet.")
        ws = wb["Match Analysis"]
        headers = {str(cell.value).strip(): idx for idx, cell in enumerate(ws[1], start=1) if cell.value is not None}
        required = [
            "Date", "League", "Home Team", "Away Team", "Best Market",
            "Overall Score", "Final Decision", "Final Score",
        ]
        missing = [name for name in required if name not in headers]
        if missing:
            raise ValueError("Missing expected Match Analysis columns: " + ", ".join(missing))

        def get(row: tuple[Any, ...], name: str) -> Any:
            return row[headers[name] - 1]

        records: list[dict[str, Any]] = []
        for row_number, row in enumerate(ws.iter_rows(min_row=2, values_only=True), start=2):
            score = parse_score(get(row, "Final Score"))
            # This mirrors the workbook's Result Status rule: a parseable final score is COMPLETE.
            if score is None:
                continue
            home_goals, away_goals = score
            home_team = get(row, "Home Team")
            away_team = get(row, "Away Team")
            best_market = get(row, "Best Market")
            final_decision = get(row, "Final Decision")
            overall_score = get(row, "Overall Score")
            league = get(row, "League")
            if league is not None and str(league).strip() in {"", "0", "0.0"}:
                league = None

            # Formula-derived fields must have cached values from Excel. Fail safely rather than
            # silently publishing incomplete or stale-looking statistics.
            if best_market is None or final_decision is None or overall_score is None:
                raise ValueError(
                    f"Row {row_number} has a final score but its calculated Best Market, "
                    "Overall Score or Final Decision is blank. Open the workbook in Excel, "
                    "allow calculations to finish, save it, then run the export again."
                )

            best_market = str(best_market).strip().upper()
            final_decision = str(final_decision).strip().upper()
            try:
                overall_score = int(float(overall_score))
            except (TypeError, ValueError):
                overall_score = None

            total_goals = home_goals + away_goals
            if best_market == "OVER 1.5":
                market_won = total_goals >= 2
            elif best_market == "OVER 2.5":
                market_won = total_goals >= 3
            elif best_market == "BTTS":
                market_won = home_goals >= 1 and away_goals >= 1
            else:
                market_won = False

            records.append({
                "id": f"match-{row_number}",
                "date": parse_date(get(row, "Date")),
                "league": str(league).strip() if league is not None and str(league).strip() else None,
                "homeTeam": str(home_team).strip() if home_team is not None else "",
                "awayTeam": str(away_team).strip() if away_team is not None else "",
                "homeGoals": home_goals,
                "awayGoals": away_goals,
                "finalScore": f"{home_goals}-{away_goals}",
                "bestMarket": best_market,
                "overallScore": overall_score,
                "finalDecision": final_decision,
                "marketWon": bool(market_won),
            })

        if not records:
            raise ValueError("No completed matches with valid final scores were found. No output was changed.")

        over15_wins = sum(r["homeGoals"] + r["awayGoals"] >= 2 for r in records)
        over25_wins = sum(r["homeGoals"] + r["awayGoals"] >= 3 for r in records)
        btts_wins = sum(r["homeGoals"] >= 1 and r["awayGoals"] >= 1 for r in records)
        selected = [r for r in records if r["bestMarket"] in MARKETS]

        metrics: dict[str, Any] = {
            "OVER 1.5": metric(over15_wins, len(records) - over15_wins),
            "OVER 2.5": metric(over25_wins, len(records) - over25_wins),
            "BTTS": metric(btts_wins, len(records) - btts_wins),
            "SELECTED_MARKET": metric(sum(r["marketWon"] for r in selected), sum(not r["marketWon"] for r in selected)),
        }
        for decision, key in (("STRONG PASS", "DECISION_STRONG_PASS"), ("WATCH", "DECISION_WATCH"), ("PASS", "DECISION_PASS")):
            group = [r for r in selected if r["finalDecision"] == decision]
            metrics[key] = metric(sum(r["marketWon"] for r in group), sum(not r["marketWon"] for r in group))

        score_ranges = []
        # The workbook's original band uses Overall Score < 61 for the final band;
        # scores of exactly 61 are intentionally excluded from the displayed bands.
        bands = (("90–100", 90, 100), ("80–89", 80, 89), ("72–79", 72, 79), ("62–71", 62, 71), ("Below 62", 0, 60))
        for label, low, high in bands:
            group = [r for r in selected if r["overallScore"] is not None and low <= r["overallScore"] <= high]
            score_ranges.append({"range": label, **metric(sum(r["marketWon"] for r in group), sum(not r["marketWon"] for r in group))})

        league_counts = Counter(r["league"] for r in records if r["league"])
        top_leagues = [{"league": league, "matches": count} for league, count in league_counts.most_common(10)]
        dated_count = sum(r["date"] is not None for r in records)

        return {
            "sourceWorkbook": workbook_path.name,
            "sourceSheet": "Match Analysis",
            "generatedAt": datetime.now(timezone.utc).isoformat(),
            "totalCompletedMatches": len(records),
            "recordsWithUsableDate": dated_count,
            "recordsWithoutUsableDate": len(records) - dated_count,
            "metrics": metrics,
            "scoreRanges": score_ranges,
            "topLeagues": top_leagues,
            "records": records,
            "methodology": {
                "completedRecord": "Rows with a parseable Final Score in Match Analysis; this is equivalent to the workbook's COMPLETE status formula.",
                "over15": "A match is counted as a win when total goals are at least 2.",
                "over25": "A match is counted as a win when total goals are at least 3.",
                "btts": "A match is counted as a win when both teams scored at least once.",
                "selectedMarket": "Only records whose Best Market is OVER 1.5, OVER 2.5 or BTTS are included; NO BET records are excluded.",
                "dateHandling": "Only valid, non-zero dates are retained. Records without a usable date remain in all-time totals but are not assigned to date-based trends.",
            },
        }
    finally:
        wb.close()


def main() -> int:
    parser = argparse.ArgumentParser(description="Refresh GoalSense website performance data from the Excel workbook.")
    parser.add_argument("workbook", nargs="?", help="Path to GoalSense_Automatic_Match_Workbook_Main.xlsx")
    parser.add_argument("--output", help=argparse.SUPPRESS)
    args = parser.parse_args()

    workbook_path = Path(args.workbook).expanduser() if args.workbook else choose_workbook()
    if not workbook_path:
        print("No workbook selected. Nothing was changed.")
        return 1
    if not workbook_path.is_file():
        print(f"ERROR: Workbook not found: {workbook_path}")
        return 1

    project_root = Path(__file__).resolve().parents[1]
    output_path = Path(args.output).expanduser() if args.output else project_root / "data" / "goalsense-performance-data.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    try:
        export_data = build_export(workbook_path)
        temporary_path = output_path.with_suffix(output_path.suffix + ".tmp")
        temporary_path.write_text(json.dumps(export_data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        temporary_path.replace(output_path)
    except Exception as exc:
        print(f"ERROR: {exc}")
        print("The existing website data file was left unchanged.")
        return 1

    print("\nGOALSENSE PERFORMANCE DATA UPDATED")
    print(f"Completed matches : {export_data['totalCompletedMatches']:,}")
    print(f"Usable dates       : {export_data['recordsWithUsableDate']:,}")
    print(f"Selected market    : {export_data['metrics']['SELECTED_MARKET']['accuracy']:.2f}%")
    print(f"Updated file       : {output_path}")
    print("\nYour Excel workbook was only read. It was not modified.")
    print("Next: git add data/goalsense-performance-data.json")
    print("      git commit -m \"Update GoalSense performance data\"")
    print("      git push origin main")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
