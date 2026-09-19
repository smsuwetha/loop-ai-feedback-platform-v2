import { Moon, Monitor, Sun } from "lucide-react";

export default function ThemeSettings() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Appearance
      </h2>

      <div className="grid gap-5 md:grid-cols-3">

        <button className="rounded-2xl border-2 border-blue-600 p-6 transition hover:shadow-md">

          <Sun
            size={34}
            className="mx-auto text-yellow-500"
          />

          <h3 className="mt-4 font-semibold">
            Light
          </h3>

        </button>

        <button className="rounded-2xl border border-slate-200 p-6 transition hover:shadow-md">

          <Moon
            size={34}
            className="mx-auto text-indigo-600"
          />

          <h3 className="mt-4 font-semibold">
            Dark
          </h3>

        </button>

        <button className="rounded-2xl border border-slate-200 p-6 transition hover:shadow-md">

          <Monitor
            size={34}
            className="mx-auto text-slate-600"
          />

          <h3 className="mt-4 font-semibold">
            System
          </h3>

        </button>

      </div>

    </div>
  );
}