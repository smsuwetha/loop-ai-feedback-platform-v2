import { LogOut, Trash2 } from "lucide-react";

export default function AccountSettings() {
  return (
    <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold text-red-600">
        Account Management
      </h2>

      <div className="space-y-4">

        <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600">

          <LogOut size={18} />

          Logout From All Devices

        </button>

        <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700">

          <Trash2 size={18} />

          Delete Account

        </button>

      </div>

    </div>
  );
}