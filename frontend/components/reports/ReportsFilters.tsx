"use client";

import { Download, Filter, Search } from "lucide-react";

export default function ReportsFilters() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex flex-1 flex-col gap-4 lg:flex-row">

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 lg:w-[350px]">

            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search reports..."
              className="w-full bg-transparent outline-none"
            />

          </div>

          <select className="rounded-2xl border border-slate-200 px-4 py-3">
            <option>All Formats</option>
            <option>PDF</option>
            <option>CSV</option>
          </select>

          <select className="rounded-2xl border border-slate-200 px-4 py-3">
            <option>All Status</option>
            <option>Ready</option>
            <option>Generating</option>
          </select>

          <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 hover:bg-slate-50">

            <Filter size={18} />

            Filter

          </button>

        </div>

        <button className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700">

          <Download size={18} />

          Export All

        </button>

      </div>

    </div>
  );
}