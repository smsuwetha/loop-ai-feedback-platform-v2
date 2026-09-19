import { feedbackStats } from "./feedbackData";

type FeedbackStat = {
  title: string;
  value: string;
  color: string;
};

export default function FeedbackStats() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {feedbackStats.map((item: FeedbackStat) => (
        <div
          key={item.title}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Top Color Bar */}
          <div
            className={`mb-5 h-2 w-20 rounded-full ${item.color}`}
          />

          {/* Title */}
          <p className="text-sm font-medium text-slate-500">
            {item.title}
          </p>

          {/* Value */}
          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {item.value}
          </h2>
        </div>
      ))}
    </section>
  );
}