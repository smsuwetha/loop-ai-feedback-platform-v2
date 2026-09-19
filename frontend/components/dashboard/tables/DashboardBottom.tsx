import RecentFeedbackTable from "./RecentFeedbackTable";
import RecentReports from "./RecentReports";
import ActivityTimeline from "./ActivityTimeline";

export default function DashboardBottom() {
  return (
    <section className="grid gap-6 xl:grid-cols-3">

      <div className="xl:col-span-2">

        <RecentFeedbackTable />

      </div>

      <div className="space-y-6">

        <RecentReports />

        <ActivityTimeline />

      </div>

    </section>
  );
}