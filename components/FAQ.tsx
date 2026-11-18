
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "Is GoalSense free to use?",
      answer:
        "GoalSense offers free access to selected football information and features. Some additional platform features may require a Premium subscription.",
    },
    {
      question: "How does GoalSense work?",
      answer:
        "GoalSense brings football fixtures, statistics and useful insights together in one place, making it easier to explore and understand the game.",
    },
    {
      question: "Where does GoalSense get its football information?",
      answer:
        "GoalSense uses available football fixture and statistical data to provide information about teams, competitions and matches.",
    },
    {
      question: "What do I get with Premium?",
      answer:
        "Premium provides access to additional platform features and tools beyond those available on the free plan.",
    },
    {
      question: "How long does Premium activation take?",
      answer:
        "Premium is usually activated shortly after a successful payment. If activation is delayed, please contact our support team.",
    },
    {
      question: "Can I access GoalSense on my phone?",
      answer:
        "Yes. GoalSense is accessible through your mobile browser and is designed to work across different screen sizes.",
    },
    {
      question: "Is GoalSense suitable for beginners?",
      answer:
        "Yes. Its simple interface, football guides and educational quizzes make it easy for new users to explore football information.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach the GoalSense team through the Contact page for assistance with your account or the platform.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative z-10 mx-auto mt-10 max-w-5xl rounded-2xl border border-white/[0.07] bg-[#080d12] px-4 py-6 sm:px-6 sm:py-8 md:px-9">

      {/* Heading */}
      <div className="mb-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">
          Help Center
        </span>

        <h2 className="mt-3 text-xl font-extrabold tracking-tight text-white sm:text-2xl md:text-3xl">
          Frequently Asked Questions
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-gray-500 sm:text-sm">
          Quick answers to common questions about GoalSense.
        </p>
      </div>

      {/* FAQ list */}
      <div className="mx-auto max-w-3xl divide-y divide-white/[0.07]">
        {faqs.map((faq, index) => {
          const isOpen = open === index;

          return (
            <div key={index}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-emerald-400"
              >
                <span
                  className={`text-[13px] font-semibold sm:text-sm ${
                    isOpen ? "text-emerald-400" : "text-gray-200"
                  }`}
                >
                  {faq.question}
                </span>

                <ChevronDown
                  size={17}
                  className={`shrink-0 text-gray-500 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-emerald-400" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-4 pr-6 text-xs leading-6 text-gray-400 sm:text-[13px]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-600">
        <span className="h-px w-7 bg-gray-800" />
        GOALSENSE SUPPORT
        <span className="h-px w-7 bg-gray-800" />
      </div>
    </section>
  );
}
