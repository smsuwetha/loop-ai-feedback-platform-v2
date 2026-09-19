import {
  Sparkles,
  Brain,
} from "lucide-react";

export default function AIInsightCard() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 p-8 text-white shadow-xl">

      <div className="flex items-start justify-between">

        <div>

          <div className="mb-3 flex items-center gap-2">

            <Sparkles size={20} />

            <span className="font-semibold">
              AI Summary
            </span>

          </div>

          <h2 className="text-2xl font-bold">
            Customer Satisfaction Increased
          </h2>

          <p className="mt-3 max-w-xl text-blue-100">
            AI detected a 12% increase in positive customer
            sentiment this month. Shipping speed and product
            quality are the most appreciated topics.
          </p>

        </div>

        <Brain size={40} className="opacity-80" />

      </div>

      <div className="mt-8 flex gap-8">

        <div>
          <h3 className="text-3xl font-bold">
            86%
          </h3>

          <p className="text-blue-100">
            Positive Sentiment
          </p>
        </div>

        <div>
          <h3 className="text-3xl font-bold">
            +12%
          </h3>

          <p className="text-blue-100">
            Monthly Growth
          </p>
        </div>

        <div>
          <h3 className="text-3xl font-bold">
            14
          </h3>

          <p className="text-blue-100">
            AI Themes
          </p>
        </div>

      </div>
    </div>
  );
}