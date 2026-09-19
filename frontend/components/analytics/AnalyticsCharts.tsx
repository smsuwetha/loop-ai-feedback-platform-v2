import MonthlyTrendChart from "./MonthlyTrendChart";
import RatingDistribution from "./RatingDistribution";
import SentimentChart from "./SentimentChart";
import AIInsightsCard from "./AIInsightsCard";

export default function AnalyticsCharts() {
  return (
    <div className="space-y-8">

      <div className="grid gap-8 xl:grid-cols-2">

        <MonthlyTrendChart />

        <SentimentChart />

      </div>

      <div className="grid gap-8 xl:grid-cols-2">

        <RatingDistribution />

        <AIInsightsCard />

      </div>

    </div>
  );
}