import { Lock } from "lucide-react";

export default function ChangePassword() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <Lock className="text-blue-600" />

        <h2 className="text-2xl font-bold">
          Change Password
        </h2>

      </div>

      <div className="space-y-5">

        <input
          type="password"
          placeholder="Current Password"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />

      </div>

      <button className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">
        Update Password
      </button>

    </div>
  );
}