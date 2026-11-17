
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Home,
  Sparkles,
  Target,
} from "lucide-react";

const questionBank = [
  {
    category: "FOOTBALL RULES",
    difficulty: "Beginner",
    question: "How many players from one team are normally on the pitch at the start of a football match?",
    options: ["9", "10", "11", "12"],
    answer: 2,
    explanation:
      "A standard football team starts a match with 11 players, including the goalkeeper.",
  },
  {
    category: "FOOTBALL RULES",
    difficulty: "Beginner",
    question: "How long is a standard football match, excluding added time?",
    options: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"],
    answer: 1,
    explanation:
      "A standard match has two 45-minute halves, making 90 minutes in total.",
  },
  {
    category: "FOOTBALL HISTORY",
    difficulty: "Intermediate",
    question: "Which country hosted and won the first FIFA World Cup in 1930?",
    options: ["Brazil", "Italy", "Argentina", "Uruguay"],
    answer: 3,
    explanation:
      "Uruguay hosted the inaugural FIFA World Cup in 1930 and defeated Argentina in the final.",
  },
  {
    category: "FOOTBALL RULES",
    difficulty: "Intermediate",
    question: "How many points does a team receive for winning a league match under the standard points system?",
    options: ["1 point", "2 points", "3 points", "4 points"],
    answer: 2,
    explanation:
      "The standard league points system awards three points for a win, one for a draw and zero for a defeat.",
  },
  {
    category: "FOOTBALL STATISTICS",
    difficulty: "Intermediate",
    question: "What does xG stand for in football statistics?",
    options: [
      "Expected Goals",
      "Extra Goals",
      "External Goals",
      "Exact Goals",
    ],
    answer: 0,
    explanation:
      "Expected Goals (xG) estimates the likelihood that a particular shot will result in a goal.",
  },
  {
    category: "FOOTBALL COMPETITIONS",
    difficulty: "Beginner",
    question: "How often is the FIFA Men's World Cup normally held?",
    options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"],
    answer: 2,
    explanation:
      "The FIFA Men's World Cup is normally held every four years.",
  },
  {
    category: "FOOTBALL TACTICS",
    difficulty: "Intermediate",
    question: "In a 4-3-3 formation, how many defenders are normally included?",
    options: ["3", "4", "5", "6"],
    answer: 1,
    explanation:
      "The first number in 4-3-3 represents four defenders, followed by three midfielders and three forwards.",
  },
  {
    category: "FOOTBALL RULES",
    difficulty: "Expert",
    question: "Which official is primarily responsible for deciding whether a player is offside?",
    options: [
      "The fourth official",
      "The assistant referee",
      "The team captain",
      "The match commissioner",
    ],
    answer: 1,
    explanation:
      "Assistant referees monitor offside positions and signal potential offences to the referee.",
  },
  {
    category: "FOOTBALL HISTORY",
    difficulty: "Intermediate",
    question: "Which country won the 2022 FIFA Men's World Cup?",
    options: ["France", "Croatia", "Argentina", "Brazil"],
    answer: 2,
    explanation:
      "Argentina won the 2022 World Cup after defeating France in the final on penalties.",
  },
  {
    category: "FOOTBALL STATISTICS",
    difficulty: "Expert",
    question: "What does a clean sheet mean for a football team?",
    options: [
      "Scoring in both halves",
      "Not conceding a goal",
      "Winning without substitutions",
      "Having more possession",
    ],
    answer: 1,
    explanation:
      "A clean sheet means a team finishes the match without conceding a goal.",
  },
  {
    category: "FOOTBALL COMPETITIONS",
    difficulty: "Beginner",
    question: "Which trophy is awarded to the winner of the UEFA Champions League?",
    options: [
      "The FA Cup",
      "The European Champion Clubs' Cup",
      "The Copa América",
      "The Community Shield",
    ],
    answer: 1,
    explanation:
      "The UEFA Champions League winner receives the European Champion Clubs' Cup, commonly called the Champions League trophy.",
  },
  {
    category: "FOOTBALL TACTICS",
    difficulty: "Expert",
    question: "What is a counterattack in football?",
    options: [
      "A defensive substitution",
      "A quick attacking move after regaining possession",
      "A long period of possession",
      "A short corner routine",
    ],
    answer: 1,
    explanation:
      "A counterattack is a quick attacking move launched after a team wins the ball, often while the opposition is out of defensive position.",
  },
  {
    category: "FOOTBALL RULES",
    difficulty: "Intermediate",
    question: "What is the maximum number of substitutions normally permitted in a standard match under current IFAB competition rules?",
    options: ["3", "4", "5", "7"],
    answer: 2,
    explanation:
      "Current IFAB rules allow competitions to permit up to five substitutions. Competition regulations determine the actual allowance.",
  },
  {
    category: "FOOTBALL HISTORY",
    difficulty: "Beginner",
    question: "Which country is credited with developing modern association football?",
    options: ["Brazil", "England", "Germany", "Spain"],
    answer: 1,
    explanation:
      "Modern association football was codified in England during the nineteenth century.",
  },
  {
    category: "FOOTBALL STATISTICS",
    difficulty: "Expert",
    question: "If a team has 60% possession, what does that measurement describe?",
    options: [
      "Its share of recorded ball possession",
      "Its percentage of shots on target",
      "Its percentage of successful tackles",
      "Its share of total goals",
    ],
    answer: 0,
    explanation:
      "Possession percentage represents the share of the match during which a team controls the ball, according to the data provider's measurement method.",
  },
];

const QUESTIONS_PER_ROUND = 10;

function shuffle<T,>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export default function FootballQuizPage() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<typeof questionBank>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  const percentage = useMemo(
    () => Math.round((score / QUESTIONS_PER_ROUND) * 100),
    [score]
  );

  const startQuiz = () => {
    setQuestions(shuffle(questionBank).slice(0, QUESTIONS_PER_ROUND));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setStarted(true);
  };

  const selectAnswer = (index: number) => {
    if (selected !== null) return;

    setSelected(index);

    if (index === question.answer) {
      setScore((previous) => previous + 1);
    }
  };

  const nextQuestion = () => {
    if (current + 1 === QUESTIONS_PER_ROUND) {
      setFinished(true);
      return;
    }

    setCurrent((previous) => previous + 1);
    setSelected(null);
  };

  const shareResult = async () => {
    const message = `I scored ${score}/10 (${percentage}%) on the GoalSense Football Knowledge Quiz! Can you beat my score? https://goalsense.live/insights/football-quiz`;

    if (navigator.share) {
      await navigator.share({
        title: "GoalSense Football Quiz",
        text: message,
      });
    } else {
      await navigator.clipboard.writeText(message);
      alert("Your result has been copied!");
    }
  };

  const rating =
    percentage >= 90
      ? "Football Genius"
      : percentage >= 70
        ? "Football Expert"
        : percentage >= 50
          ? "Rising Football Mind"
          : "Keep Learning";

  return (
    <main className="min-h-screen overflow-hidden bg-[#050807] px-5 py-10 text-white sm:py-16">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.13),transparent_55%)]" />

      <div className="relative mx-auto max-w-3xl">

        {/* HEADER */}
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-emerald-400"
        >
          <ArrowLeft size={17} />
          Back to Insights
        </Link>

        <div className="mt-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
            <Brain size={32} />
          </div>

          <p className="mt-6 text-xs font-bold tracking-[0.25em] text-emerald-400">
            GOALSENSE KNOWLEDGE CHALLENGE
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Football Knowledge Quiz
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-400">
            How well do you really know football? Challenge yourself,
            discover interesting facts and test your knowledge.
          </p>
        </div>

        {/* START SCREEN */}
        {!started && (
          <div className="mt-12 rounded-3xl border border-white/10 bg-[#0b110e] p-7 shadow-2xl sm:p-10">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-white/[0.04] p-4">
                <Target className="mx-auto text-emerald-400" size={23} />
                <p className="mt-3 text-xl font-black">10</p>
                <p className="mt-1 text-[10px] text-gray-500">QUESTIONS</p>
              </div>

              <div className="rounded-xl bg-white/[0.04] p-4">
                <Brain className="mx-auto text-emerald-400" size={23} />
                <p className="mt-3 text-xl font-black">Mixed</p>
                <p className="mt-1 text-[10px] text-gray-500">DIFFICULTY</p>
              </div>

              <div className="rounded-xl bg-white/[0.04] p-4">
                <Trophy className="mx-auto text-emerald-400" size={23} />
                <p className="mt-3 text-xl font-black">100%</p>
                <p className="mt-1 text-[10px] text-gray-500">YOUR TARGET</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                "10 randomly selected football questions",
                "Four answer options per question",
                "Instant explanations after every answer",
                "Your final score and performance rating",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-gray-300"
                >
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-emerald-400"
                  />
                  {item}
                </div>
              ))}
            </div>

            <button
              onClick={startQuiz}
              className="mt-9 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 font-black text-black transition hover:bg-emerald-400"
            >
              Start Football Quiz
              <ArrowRight size={19} />
            </button>

            <p className="mt-4 text-center text-xs text-gray-500">
              Free to play. No account required.
            </p>
          </div>
        )}

        {/* QUESTION SCREEN */}
        {started && !finished && question && (
          <div className="mt-12 rounded-3xl border border-white/10 bg-[#0b110e] p-6 shadow-2xl sm:p-9">

            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold tracking-widest text-emerald-400">
                QUESTION {current + 1} OF {QUESTIONS_PER_ROUND}
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-400">
                {question.difficulty}
              </span>
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-300"
                style={{
                  width: `${((current + 1) / QUESTIONS_PER_ROUND) * 100}%`,
                }}
              />
            </div>

            <p className="mt-9 text-[10px] font-bold tracking-[0.2em] text-emerald-400">
              {question.category}
            </p>

            <h2 className="mt-4 text-xl font-extrabold leading-8 sm:text-2xl">
              {question.question}
            </h2>

            <div className="mt-8 space-y-3">
              {question.options.map((option, index) => {
                const isCorrect = index === question.answer;
                const isSelected = selected === index;

                let style =
                  "border-white/10 bg-white/[0.025] hover:border-emerald-400/40 hover:bg-emerald-400/5";

                if (selected !== null && isCorrect) {
                  style =
                    "border-emerald-400 bg-emerald-400/10 text-emerald-300";
                } else if (isSelected && !isCorrect) {
                  style =
                    "border-red-400/60 bg-red-400/10 text-red-300";
                }

                return (
                  <button
                    key={option}
                    disabled={selected !== null}
                    onClick={() => selectAnswer(index)}
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${style}`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span className="flex-1 text-sm font-semibold">
                      {option}
                    </span>

                    {selected !== null && isCorrect && (
                      <CheckCircle2 size={19} />
                    )}

                    {isSelected && !isCorrect && (
                      <XCircle size={19} />
                    )}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="flex items-center gap-2">
                  {selected === question.answer ? (
                    <>
                      <CheckCircle2
                        size={20}
                        className="text-emerald-400"
                      />
                      <span className="font-bold text-emerald-400">
                        Excellent! Correct answer.
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle size={20} className="text-red-400" />
                      <span className="font-bold text-red-400">
                        Not quite. Keep learning!
                      </span>
                    </>
                  )}
                </div>

                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {question.explanation}
                </p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Score: <strong className="text-white">{score}</strong>
              </span>

              <button
                onClick={nextQuestion}
                disabled={selected === null}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-bold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-30"
              >
                {current === QUESTIONS_PER_ROUND - 1
                  ? "View Results"
                  : "Next Question"}
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}

        {/* RESULTS SCREEN */}
        {finished && (
          <div className="mt-12 rounded-3xl border border-emerald-400/20 bg-[#0b110e] p-7 text-center shadow-2xl sm:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
              <Trophy size={39} />
            </div>

            <p className="mt-7 text-xs font-bold tracking-[0.25em] text-emerald-400">
              CHALLENGE COMPLETED
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              {rating}
            </h2>

            <p className="mt-3 text-gray-400">
              You have completed the GoalSense Football Knowledge Quiz.
            </p>

            <div className="mt-9 rounded-2xl border border-white/10 bg-black/30 p-7">
              <p className="text-xs font-bold tracking-widest text-gray-500">
                YOUR FINAL SCORE
              </p>

              <p className="mt-3 text-6xl font-black text-emerald-400">
                {score}<span className="text-3xl text-gray-500">/10</span>
              </p>

              <p className="mt-3 text-lg font-bold">{percentage}%</p>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-emerald-400"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <p className="mt-7 text-sm leading-7 text-gray-400">
              {percentage >= 90
                ? "Outstanding! You have an excellent understanding of football."
                : percentage >= 70
                  ? "Great performance! You clearly know your football."
                  : percentage >= 50
                    ? "Good effort! Keep exploring and expanding your football knowledge."
                    : "Every expert starts somewhere. Keep learning and try again!"}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                onClick={startQuiz}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-4 font-bold text-black transition hover:bg-emerald-400"
              >
                <RotateCcw size={18} />
                Play Again
              </button>

              <button
                onClick={shareResult}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-4 font-bold transition hover:border-emerald-400/50 hover:text-emerald-400"
              >
                <Sparkles size={18} />
                Share My Score
              </button>
            </div>

            <Link
              href="/insights"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-emerald-400"
            >
              <Home size={16} />
              Return to Insights
            </Link>
          </div>
        )}

        <p className="mt-10 text-center text-xs tracking-wider text-gray-600">
          GOALSENSE INSIGHTS · KNOWLEDGE · FOOTBALL
        </p>
      </div>
    </main>
  );
}
