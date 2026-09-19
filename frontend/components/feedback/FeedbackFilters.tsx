"use client";

import { Download, Filter, Plus, Search } from "lucide-react";

export default function FeedbackFilters() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        {/* Left */}

        <div className="flex flex-1 flex-col gap-4 lg:flex-row">

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 lg:w-[350px]">

            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search feedback..."
              className="w-full bg-transparent outline-none"
            />

          </div>

          <select className="rounded-2xl border border-slate-200 px-4 py-3">
            <option>All Ratings</option>
            <option>★★★★★</option>
            <option>★★★★☆</option>
            <option>★★★☆☆</option>
            <option>★★☆☆☆</option>
            <option>★☆☆☆☆</option>
          </select>

          <select className="rounded-2xl border border-slate-200 px-4 py-3">
            <option>All Sentiments</option>
            <option>Positive</option>
            <option>Neutral</option>
            <option>Negative</option>
          </select>

          <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 hover:bg-slate-50">

            <Filter size={18} />

            Filters

          </button>

        </div>

        {/* Right */}

        <div className="flex gap-3">

          <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 hover:bg-slate-50">

            <Download size={18} />

            Export

          </button>

          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">

            <Plus size={18} />

            Add Feedback

          </button>

        </div>

      </div>

    </div>
  );
}