import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  growth: string;
  icon: ReactNode;
  color: string;
}

export default function StatCard({
  title,
  value,
  growth,
  icon,
  color,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div
        className={`absolute right-0 top-0 h-24 w-24 rounded-full opacity-10 blur-2xl ${color}`}
      />

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {value}
          </h2>

          <div className="mt-4 flex items-center gap-2 text-green-600">

            <ArrowUpRight size={18} />

            <span className="text-sm font-semibold">
              {growth}
            </span>

          </div>

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}