"use client";

import { LogOut } from "lucide-react";

export default function UserProfile() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-2xl">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-xl font-bold">

          Z

        </div>

        <div>

          <h3 className="font-semibold">
            Zara SS
          </h3>

          <p className="text-sm text-slate-300">
            Administrator
          </p>

        </div>

      </div>

      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 py-3 transition hover:bg-white/20">

        <LogOut size={18} />

        Logout

      </button>

    </div>
  );
}