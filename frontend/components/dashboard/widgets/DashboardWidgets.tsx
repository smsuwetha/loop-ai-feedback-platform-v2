"use client";

import { useEffect, useState } from "react";
import AIRecommendation from "./AIRecommendation";

interface OverviewData {
  feedbackProcessed: number;
  aiCompletion: number;
  reportGeneration: number;
}

interface OverviewResponse {
  feedbackProcessed?: number;
  aiCompletion?: number;
  reportGeneration?: number;
  message?: string;
}

export default function DashboardWidgets() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await fetch(
          "/backend/api/dashboard/overview",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const result =
          (await response.json()) as OverviewResponse;

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to load workspace overview."
          );
        }

        if (
          typeof result.feedbackProcessed !== "number" ||
          typeof result.aiCompletion !== "number" ||
          typeof result.reportGeneration !== "number"
        ) {
          throw new Error(
            "Invalid workspace overview data."
          );
        }

        setData({
          feedbackProcessed: result.feedbackProcessed,
          aiCompletion: result.aiCompletion,
          reportGeneration: result.reportGeneration,
        });
      } catch (error) {
        console.error(
          "Dashboard overview fetch error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load workspace overview."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  return (
    <section className="grid gap-6 lg:grid-cols-2">

      <AIRecommendation />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-xl font-bold">
          Workspace Overview
        </h2>

        {loading ? (
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div key={item}>
                <div className="mb-2 flex justify-between">
                  <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-10 animate-pulse rounded bg-slate-200" />
                </div>

                <div className="h-3 animate-pulse rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        ) : data ? (
          <div className="space-y-5">

            <div>
              <div className="mb-2 flex justify-between">
                <span>Feedback Processed</span>
                <span>{data.feedbackProcessed}%</span>
              </div>

              <div className="h-3 rounded-full bg-slate-200">
                <div
                  className="h-3 rounded-full bg-blue-600"
                  style={{
                    width: `${data.feedbackProcessed}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span>AI Completion</span>
                <span>{data.aiCompletion}%</span>
              </div>

              <div className="h-3 rounded-full bg-slate-200">
                <div
                  className="h-3 rounded-full bg-green-500"
                  style={{
                    width: `${data.aiCompletion}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span>Report Generation</span>
                <span>{data.reportGeneration}%</span>
              </div>

              <div className="h-3 rounded-full bg-slate-200">
                <div
                  className="h-3 rounded-full bg-cyan-500"
                  style={{
                    width: `${data.reportGeneration}%`,
                  }}
                />
              </div>
            </div>

          </div>
        ) : null}

      </div>

    </section>
  );
}