import { TrendingUp } from "lucide-react";
import { analyticsStats } from "./analyticsData";

export default function AnalyticsStats() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {analyticsStats.map((item) => (

        <div
          key={item.title}
          className="rounded-3xl bg-white p-6 shadow-sm border"
        >

          <div className="flex items-center justify-between">

            <div
              className={`h-3 w-20 rounded-full ${item.color}`}
            />

            <TrendingUp
              className="text-green-500"
              size={20}
            />

          </div>

          <p className="mt-5 text-sm text-slate-500">
            {item.title}
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {item.value}
          </h2>

          <p className="mt-3 text-green-600 font-medium">
            {item.change}
          </p>

        </div>

      ))}

    </section>
  );
}