import { UserCircle2 } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      <div className="flex items-center gap-4">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg">
          <UserCircle2 size={32} />
        </div>

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            My Profile
          </h1>

          <p className="mt-1 text-slate-500">
            Manage your personal information and account settings.
          </p>

        </div>

      </div>

      <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700 transition">
        Edit Profile
      </button>

    </div>
  );
}