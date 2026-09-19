"use client";

import { useState } from "react";
import { FileSpreadsheet } from "lucide-react";

export default function ReportsHeader() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function generateReport() {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/backend/api/reports/generate", {
        method: "POST",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to generate report.");
      }

      setMessage("Report generated successfully.");

      window.location.reload();
    } catch (error) {
      console.error("Generate report error:", error);

      setMessage(
        error instanceof Error ? error.message : "Failed to generate report.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">
          <FileSpreadsheet size={30} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports</h1>

          <p className="mt-1 text-slate-500">
            Generate, download and manage AI-generated reports.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={generateReport}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Report"}
        </button>

        {message && <p className="text-sm text-slate-500">{message}</p>}
      </div>
    </div>
  );
}
