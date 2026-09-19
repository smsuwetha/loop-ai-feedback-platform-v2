import { Sparkles } from "lucide-react";

export default function AIInsightsCard() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white">

      <div className="mb-4 flex items-center gap-3">

        <Sparkles size={24} />

        <h2 className="text-2xl font-bold">
          AI Insights
        </h2>

      </div>

      <p className="leading-7 text-blue-100">

        Customer satisfaction increased by
        <strong> 12% </strong>
        this month. AI detected usability,
        fast response time and customer support
        as the most common positive themes.

      </p>

    </div>
  );
}