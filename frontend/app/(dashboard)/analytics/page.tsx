import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import AnalyticsStats from "@/components/analytics/AnalyticsStats";
import AnalyticsFilters from "@/components/analytics/AnalyticsFilters";
import AnalyticsCharts from "@/components/analytics/AnalyticsCharts";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">

      <AnalyticsHeader />

      <AnalyticsStats />

      <AnalyticsFilters />

      <AnalyticsCharts />

    </div>
  );
}