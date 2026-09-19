import ReportsHeader from "@/components/reports/ReportsHeader";
import ReportsStats from "@/components/reports/ReportsStats";
import ReportsFilters from "@/components/reports/ReportsFilters";
import ReportsTable from "@/components/reports/ReportsTable";
import ReportsPagination from "@/components/reports/ReportsPagination";

export default function ReportsPage() {
  return (
    <div className="space-y-8">

      <ReportsHeader />

      <ReportsStats />

      <ReportsFilters />

      <ReportsTable />

      <ReportsPagination />

    </div>
  );
}