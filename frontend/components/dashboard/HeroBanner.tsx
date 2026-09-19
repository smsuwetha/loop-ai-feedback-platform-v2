import DashboardHeader from "./DashboardHeader";
import AIInsightCard from "./AIInsightCard";
import QuickActions from "./QuickActions";

export default function HeroBanner() {
  return (
    <section className="space-y-8">

      <DashboardHeader userName="Zara SS" />

      <AIInsightCard />

      <QuickActions />

    </section>
  );
}