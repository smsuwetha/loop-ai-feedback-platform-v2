import ChartCard from "./ChartCard";
import MonthlyTrendChart from "./MonthlyTrendChart";
import SentimentPieChart from "./SentimentPieChart";

export default function ChartsSection() {
  return (
    <section className="grid gap-6 xl:grid-cols-3">

      <div className="xl:col-span-2">

        <ChartCard
          title="Monthly Feedback Trend"
          subtitle="Customer feedback collected every month"
        >
          <MonthlyTrendChart />
        </ChartCard>

      </div>

      <ChartCard
        title="Sentiment Analysis"
        subtitle="AI generated sentiment distribution"
      >
        <SentimentPieChart />
      </ChartCard>

    </section>
  );
}