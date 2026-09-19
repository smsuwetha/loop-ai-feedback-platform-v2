import { Inbox } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white py-16">

      <Inbox
        size={52}
        className="text-slate-400"
      />

      <h2 className="mt-6 text-xl font-semibold">

        No Feedback Available

      </h2>

      <p className="mt-2 text-slate-500">

        Upload a CSV or collect customer feedback
        to begin AI analysis.

      </p>

    </div>
  );
}