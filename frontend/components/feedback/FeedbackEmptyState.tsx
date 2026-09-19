import { Inbox } from "lucide-react";

export default function FeedbackEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white py-20">

      <div className="rounded-full bg-slate-100 p-5">
        <Inbox className="h-12 w-12 text-slate-400" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        No Feedback Found
      </h2>

      <p className="mt-2 max-w-md text-center text-slate-500">
        No customer feedback is available yet.
        New feedback will appear here after submission.
      </p>

      <button className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
        Add Feedback
      </button>

    </div>
  );
}