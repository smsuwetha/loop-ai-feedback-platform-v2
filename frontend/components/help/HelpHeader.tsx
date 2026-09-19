import { LifeBuoy } from "lucide-react";

export default function HelpHeader() {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

      <div className="flex items-center gap-5">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">

          <LifeBuoy size={32} />

        </div>

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Help Center
          </h1>

          <p className="mt-1 text-slate-500">
            Find answers, documentation and contact our support team.
          </p>

        </div>

      </div>

      <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
        Contact Support
      </button>

    </div>
  );
}