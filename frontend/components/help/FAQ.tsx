"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do I upload feedback?",
    answer:
      "Navigate to the Feedback page and click the Upload CSV button. Select your CSV file and the system will import the data automatically.",
  },
  {
    question: "How are AI summaries generated?",
    answer:
      "Loop AI analyzes customer feedback using AI to identify themes, sentiment, and key insights before generating a concise summary.",
  },
  {
    question: "Can I export reports?",
    answer:
      "Yes. Reports can be downloaded in PDF and CSV formats from the Reports page.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Go to Profile or Settings and choose Change Password to update your credentials securely.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">

        {faqs.map((faq, index) => (

          <div
            key={index}
            className="rounded-2xl border border-slate-200"
          >

            <button
              onClick={() =>
                setOpen(open === index ? null : index)
              }
              className="flex w-full items-center justify-between px-6 py-5 text-left"
            >

              <span className="font-semibold">
                {faq.question}
              </span>

              {open === index ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}

            </button>

            {open === index && (

              <div className="border-t px-6 py-5 text-slate-600">

                {faq.answer}

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}