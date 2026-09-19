"use client";

import {
  ChevronDown,
} from "lucide-react";

export default function UserDropdown() {
  return (
    <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-md">

      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-white">
        Z
      </div>

      <div className="hidden md:block text-left">
        <h4 className="text-sm font-semibold">
          Zara SS
        </h4>

        <p className="text-xs text-slate-500">
          Administrator
        </p>
      </div>

      <ChevronDown size={18} className="text-slate-500" />
    </button>
  );
}