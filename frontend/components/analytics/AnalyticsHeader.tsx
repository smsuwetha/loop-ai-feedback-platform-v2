import { BarChart3 } from "lucide-react";

export default function AnalyticsHeader() {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-blue-100 p-4">

          <BarChart3
            className="text-blue-600"
            size={28}
          />

        </div>

        <div>

          <h1 className="text-3xl font-bold">
            Analytics Dashboard
          </h1>

          <p className="text-slate-500">
            AI-powered insights and customer sentiment analytics.
          </p>

        </div>

      </div>

    </div>
  );
}