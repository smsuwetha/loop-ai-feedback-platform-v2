"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="hidden lg:flex items-center gap-3 w-[420px] rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:ring-2 focus-within:ring-blue-500">

      <Search size={18} className="text-slate-400" />

      <input
        type="text"
        placeholder="Search feedback, reports..."
        className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
      />

    </div>
  );
}