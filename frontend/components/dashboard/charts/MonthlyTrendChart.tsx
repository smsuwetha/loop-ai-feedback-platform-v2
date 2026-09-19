"use client";

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MonthlyTrendItem {
  month: string;
  feedback: number;
}

interface ChartsResponse {
  monthlyTrend: MonthlyTrendItem[];
}

export default function MonthlyTrendChart() {
  const [data, setData] = useState<MonthlyTrendItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          "/backend/api/dashboard/charts",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const result =
          (await response.json()) as ChartsResponse & {
            message?: string;
          };

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to load monthly feedback data."
          );
        }

        setData(result.monthlyTrend || []);
      } catch (error) {
        console.error(
          "Monthly trend fetch error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load monthly feedback data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[320px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[320px] items-center justify-center text-sm text-red-500">
        {error}
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data}>
        <defs>
          <linearGradient
            id="feedbackGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#2563EB"
              stopOpacity={0.8}
            />

            <stop
              offset="100%"
              stopColor="#2563EB"
              stopOpacity={0.05}
            />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis allowDecimals={false} />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="feedback"
          stroke="#2563EB"
          strokeWidth={3}
          fill="url(#feedbackGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}