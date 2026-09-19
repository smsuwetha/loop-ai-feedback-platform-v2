import { FileX } from "lucide-react";

export default function ReportsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white py-24">

      <FileX className="h-16 w-16 text-slate-400" />

      <h2 className="mt-6 text-2xl font-bold">
        No Reports Found
      </h2>

      <p className="mt-2 text-slate-500">
        Reports will appear here after generation.
      </p>

      <button className="mt-8 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
        Generate Report
      </button>

    </div>
  );
}