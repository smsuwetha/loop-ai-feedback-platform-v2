"use client";

import HeroBanner from "@/components/dashboard/HeroBanner";
import KPISection from "@/components/dashboard/KPISection";
import ChartsSection from "@/components/dashboard/charts/ChartsSection";
import DashboardBottom from "@/components/dashboard/tables/DashboardBottom";
import DashboardWidgets from "@/components/dashboard/widgets/DashboardWidgets";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <HeroBanner />
      <KPISection />
      <ChartsSection />
      <DashboardWidgets />
      <DashboardBottom />
    </div>
  );
}