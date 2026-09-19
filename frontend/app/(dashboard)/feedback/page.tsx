import FeedbackHeader from "@/components/feedback/FeedbackHeader";
import FeedbackStats from "@/components/feedback/FeedbackStats";
import FeedbackFilters from "@/components/feedback/FeedbackFilters";
import FeedbackTable from "@/components/feedback/FeedbackTable";
import FeedbackPagination from "@/components/feedback/FeedbackPagination";

export default function FeedbackPage() {
  return (
    <div className="space-y-8">

      <FeedbackHeader />

      <FeedbackStats />

      <FeedbackFilters />

      <FeedbackTable />

      <FeedbackPagination />

    </div>
  );
}