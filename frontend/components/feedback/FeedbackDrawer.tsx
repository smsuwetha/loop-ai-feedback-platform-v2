"use client";

import { X, Star, Calendar, User, Sparkles } from "lucide-react";

interface FeedbackDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function FeedbackDrawer({
  open,
  onClose,
}: FeedbackDrawerProps) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 z-50 h-screen w-full max-w-xl overflow-y-auto bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">

          <div>
            <h2 className="text-2xl font-bold">
              Feedback Details
            </h2>

            <p className="text-sm text-slate-500">
              AI Generated Insights
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Customer */}

        <div className="space-y-6 p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              J
            </div>

            <div>

              <h3 className="text-xl font-bold">
                John Smith
              </h3>

              <p className="text-slate-500">
                Mobile App Customer
              </p>

            </div>

          </div>

          {/* Rating */}

          <div className="rounded-2xl border p-5">

            <h4 className="mb-3 font-semibold">
              Rating
            </h4>

            <div className="flex gap-1">

              {[1,2,3,4,5].map((i)=>(
                <Star
                  key={i}
                  size={20}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}

            </div>

          </div>

          {/* Feedback */}

          <div className="rounded-2xl border p-5">

            <h4 className="mb-3 font-semibold">
              Customer Feedback
            </h4>

            <p className="leading-7 text-slate-600">
              Excellent application.
              The dashboard is fast,
              easy to navigate,
              and customer support was amazing.
            </p>

          </div>

          {/* AI Summary */}

          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-5 text-white">

            <div className="mb-3 flex items-center gap-2">

              <Sparkles size={20} />

              <h4 className="font-semibold">
                AI Summary
              </h4>

            </div>

            <p className="text-blue-100">

              AI detected highly positive sentiment.
              Main themes include usability,
              performance,
              and customer support satisfaction.

            </p>

          </div>

          {/* Metadata */}

          <div className="grid gap-4 md:grid-cols-2">

            <div className="rounded-xl border p-4">

              <div className="flex items-center gap-2">

                <Calendar size={18} />

                <span>12 Jul 2026</span>

              </div>

            </div>

            <div className="rounded-xl border p-4">

              <div className="flex items-center gap-2">

                <User size={18} />

                <span>Positive</span>

              </div>

            </div>

          </div>

        </div>

      </aside>
    </>
  );
}