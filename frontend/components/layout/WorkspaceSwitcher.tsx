"use client";

import { ChevronDown } from "lucide-react";

export default function WorkspaceSwitcher() {
  return (
    <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:bg-slate-100">

      <div>

        <p className="text-xs uppercase tracking-widest text-slate-400">

          Workspace

        </p>

        <h3 className="font-semibold">

          LOOP AI

        </h3>

      </div>

      <ChevronDown size={18} />

    </button>
  );
}