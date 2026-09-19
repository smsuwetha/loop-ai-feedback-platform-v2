"use client";

import {
  MessageSquare,
  Smile,
  Frown,
  Meh,
} from "lucide-react";
import { useEffect, useState } from "react";

import StatCard from "./StatCard";

interface KPIData {
  totalFeedback: number;
  positive: number;
  negative: number;
  neutral: number;
}

export default function KPISection() {
  const [data, setData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const response = await fetch(
          "/backend/api/dashboard/kpis",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to load dashboard data."
          );
        }

        setData(result);
      } catch (error) {
        console.error(
          "Dashboard KPI fetch error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchKPIs();
  }, []);

  if (loading) {
    return (
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-40 animate-pulse rounded-3xl border border-slate-200 bg-slate-100"
          />
        ))}
      </section>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error || "Unable to load dashboard data."}
      </div>
    );
  }

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Feedback"
        value={data.totalFeedback.toLocaleString()}
        growth="Live"
        color="bg-blue-600"
        icon={<MessageSquare size={28} />}
      />

      <StatCard
        title="Positive"
        value={data.positive.toLocaleString()}
        growth="Live"
        color="bg-green-500"
        icon={<Smile size={28} />}
      />

      <StatCard
        title="Negative"
        value={data.negative.toLocaleString()}
        growth="Live"
        color="bg-red-500"
        icon={<Frown size={28} />}
      />

      <StatCard
        title="Neutral"
        value={data.neutral.toLocaleString()}
        growth="Live"
        color="bg-yellow-500"
        icon={<Meh size={28} />}
      />
    </section>
  );
}