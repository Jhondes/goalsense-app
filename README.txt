GOALSENSE PERFORMANCE INSIGHTS - INSTALLATION

This package contains:
1. app/insights/performance/page.tsx
2. data/goalsense-performance-data.json

Copy both folders into the root of your existing Next.js project, merging with the existing folders.

Then update the Performance Insights category on your existing /insights page:

Before:
href: "#performance-insights",

After:
href: "/insights/performance",

The page imports the JSON using the existing @/ alias. If your project uses a different alias, update the import path accordingly.

No Supabase connection, migration, API route, authentication change, or existing workbook edit is required.

DATA NOTES
- Exported from Match Analysis rows where Result Status is COMPLETE and validated home/away goals are numeric.
- 932 completed records were found.
- The workbook's saved Performance sheet figures are preserved by applying its documented thresholds.
- Only 13 records have a usable non-zero date, so the page intentionally does not show a date-based timeline.
- The score range below 62 follows the workbook formula (Overall Score < 61), so records scoring exactly 61 are not included in that workbook band.
