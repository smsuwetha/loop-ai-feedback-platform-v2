"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { ratingData } from "./analyticsData";

export default function RatingDistribution() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-bold">
        Rating Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>

        <BarChart data={ratingData}>

          <XAxis dataKey="rating" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="users"
            fill="#2563EB"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}