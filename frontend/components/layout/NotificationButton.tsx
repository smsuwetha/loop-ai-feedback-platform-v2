"use client";

import { Bell } from "lucide-react";

export default function NotificationButton() {
  return (
    <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-100">

      <Bell size={18} />

      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">

        3

      </span>

    </button>
  );
}