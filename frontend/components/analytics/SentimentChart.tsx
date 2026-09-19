"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { sentimentData } from "./analyticsData";

const COLORS = [
  "#2563EB",
  "#06B6D4",
  "#EF4444",
];

export default function SentimentChart() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-bold">
        Sentiment Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>

        <PieChart>

          <Pie
            data={sentimentData}
            dataKey="value"
            outerRadius={100}
          >

            {sentimentData.map((_, index) => (

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}