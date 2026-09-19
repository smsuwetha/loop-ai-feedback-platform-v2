"use client";

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface SentimentItem {
  name: string;
  value: number;
  color: string;
}

interface ChartsResponse {
  sentimentData: SentimentItem[];
}

export default function SentimentPieChart() {
  const [data, setData] = useState<SentimentItem[]>([]);
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
              "Failed to load sentiment data."
          );
        }

        setData(result.sentimentData || []);
      } catch (error) {
        console.error(
          "Sentiment chart fetch error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load sentiment data."
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

  const hasData = data.some(
    (item) => item.value > 0
  );

  if (!hasData) {
    return (
      <div className="flex h-[320px] items-center justify-center text-sm text-slate-500">
        No classified feedback available yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={70}
          outerRadius={110}
          paddingAngle={3}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={entry.color}
            />
          ))}
        </Pie>

        <Tooltip
          formatter={(value) => [
            `${value}%`,
            "Feedback",
          ]}
        />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}