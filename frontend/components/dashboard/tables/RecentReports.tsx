"use client";

import {
  Download,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";

interface ReportItem {
  id: string;
  title: string;
  periodStart: string;
  periodEnd: string;
  createdAt: string;
}

interface ReportsResponse {
  reports: ReportItem[];
  message?: string;
}

export default function RecentReports() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(
          "/backend/api/dashboard/reports",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const result =
          (await response.json()) as ReportsResponse;

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to load reports."
          );
        }

        setReports(result.reports || []);
      } catch (error) {
        console.error(
          "Recent reports fetch error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load reports."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold">
          Recent Reports
        </h2>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Recent Reports
      </h2>

      {reports.length === 0 ? (
        <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
          <FileText
            size={40}
            className="mb-3 text-slate-300"
          />

          <p className="font-medium text-slate-600">
            No reports yet
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Generated reports will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <FileText className="shrink-0 text-blue-600" />

                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-900">
                    {report.title}
                  </p>

                  <p className="text-xs text-slate-500">
                    Created {formatDate(report.createdAt)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="shrink-0"
                title="Download report"
                onClick={() => {
                  console.log(
                    "Download report:",
                    report.id
                  );
                }}
              >
                <Download className="text-slate-500 hover:text-blue-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}