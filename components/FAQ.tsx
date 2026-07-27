"use client";

import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "Is GoalSense free to use?",
      answer:
        "Yes. GoalSense offers a free plan that allows you to generate football predictions with limited features. Upgrade to Premium to unlock more picks, advanced markets and exclusive tools.",
    },
    {
      question: "How are GoalSense predictions generated?",
      answer:
        "GoalSense uses statistical analysis and intelligent filtering to generate football predictions from available fixtures. Predictions are intended to support your decision-making and do not guarantee winning bets.",
    },
    {
      question: "Can GoalSense guarantee winning bets?",
      answer:
        "No. No football prediction platform can guarantee winning bets. Football is unpredictable, and users should always bet responsibly.",
    },
    {
      question: "What do I get with Premium?",
      answer:
        "Premium members unlock more prediction markets, additional picks, Lucky Slip, Mixed Markets, Target Odds and future premium features as they are released.",
    },
    {
      question: "How long does Premium activation take?",
      answer:
        "Premium is usually activated immediately after a successful payment. If there is a delay, please contact our support team.",
    },
    {
      question: "Can I save my generated slips?",
      answer:
        "Yes. GoalSense allows you to save your generated accumulator slips so you can access them later.",
    },
    {
      question: "Can I share my prediction slips?",
      answer:
        "Yes. You can copy or share your generated slips with friends directly from the platform.",
    },
    {
      question: "Is GoalSense suitable for beginners?",
      answer:
        "Absolutely. GoalSense is designed with a simple interface that makes generating football predictions quick and easy for both beginners and experienced bettors.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative z-10 mt-16 mx-auto max-w-6xl rounded-3xl border border-gray-800 bg-gradient-to-b from-gray-900 to-black p-6 md:p-10">

      {/* Heading */}

      <div className="mx-auto mb-10 max-w-3xl text-center">

        <span className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
          ❓ Help Center
        </span>

        <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
          Frequently Asked Questions
        </h2>

        <p className="mt-4 text-sm sm:text-base leading-7 text-gray-400">
          Everything you need to know before using GoalSense or upgrading to Premium.
        </p>

      </div>

      <div className="space-y-4">

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 transition-all"
          >

            <button
              onClick={() =>
                setOpen(open === index ? null : index)
              }
              className="flex w-full items-center justify-between p-5 text-left"
            >
              <span className="text-base font-semibold text-white">
                {faq.question}
              </span>

              <span className="text-2xl text-green-400">
                {open === index ? "−" : "+"}
              </span>
            </button>

            {open === index && (
              <div className="border-t border-gray-800 px-5 pb-5 pt-4">
                <p className="leading-7 text-gray-300">
                  {faq.answer}
                </p>
              </div>
            )}

          </div>
        ))}

      </div>

    </section>
  );
}