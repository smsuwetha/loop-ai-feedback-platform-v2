"use client";

import {
  Upload,
  FileText,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { useRef, useState } from "react";

export default function QuickActions() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setMessage("Please select a CSV file.");
      event.target.value = "";
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "/backend/api/feedback/import",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "CSV upload failed."
        );
      }

      setMessage(
        `Successfully imported ${result.imported} feedback records.`
      );
    } catch (error) {
      console.error("CSV upload error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "CSV upload failed."
      );
    } finally {
      setUploading(false);

      // Allow selecting the same file again
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,text/csv"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Upload CSV */}
        <button
          type="button"
          onClick={handleUploadClick}
          disabled={uploading}
          className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <Upload
              size={22}
              className="text-blue-600"
            />
          </div>

          <h3 className="font-semibold">
            {uploading ? "Uploading..." : "Upload CSV"}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Import customer feedback from a CSV file.
          </p>
        </button>

        {/* Generate Report */}
        <button
          type="button"
          className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <FileText
              size={22}
              className="text-blue-600"
            />
          </div>

          <h3 className="font-semibold">
            Generate Report
          </h3>
        </button>

        {/* Analytics */}
        <button
          type="button"
          className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <BarChart3
              size={22}
              className="text-blue-600"
            />
          </div>

          <h3 className="font-semibold">
            Analytics
          </h3>
        </button>

        {/* AI Insights */}
        <button
          type="button"
          className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <Sparkles
              size={22}
              className="text-blue-600"
            />
          </div>

          <h3 className="font-semibold">
            AI Insights
          </h3>
        </button>
      </div>

      {message && (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
          {message}
        </div>
      )}
    </div>
  );
}