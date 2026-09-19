import { Calendar, Download } from "lucide-react";

export default function AnalyticsFilters() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm border">

      <div className="flex gap-3">

        <select className="rounded-xl border px-4 py-3">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>This Year</option>
        </select>

        <button className="flex items-center gap-2 rounded-xl border px-4 py-3">
          <Calendar size={18} />
          Custom Date
        </button>

      </div>

      <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white">

        <Download size={18} />

        Export

      </button>

    </div>
  );
}