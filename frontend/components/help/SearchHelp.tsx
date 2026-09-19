"use client";

import { Search } from "lucide-react";

export default function SearchHelp() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="flex items-center gap-4 rounded-2xl border border-slate-300 px-5 py-4">

        <Search
          size={22}
          className="text-slate-400"
        />

        <input
          type="text"
          placeholder="Search documentation, FAQs or guides..."
          className="w-full bg-transparent outline-none"
        />

      </div>

    </div>
  );
}