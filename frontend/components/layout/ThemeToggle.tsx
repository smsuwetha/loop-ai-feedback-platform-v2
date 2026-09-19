"use client";

import { Moon } from "lucide-react";

export default function ThemeToggle() {
  return (
    <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-100">

      <Moon size={18} />

    </button>
  );
}