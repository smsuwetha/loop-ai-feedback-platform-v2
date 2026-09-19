"use client";

import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  console.error(error);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">

      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

          <AlertTriangle
            size={40}
            className="text-red-600"
          />

        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Oops! Something went wrong
        </h1>

        <p className="mt-3 text-slate-500">
          We couldn&apos;t load the Reports module.
          Please try again or return to the dashboard.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-left">

            <p className="mb-2 text-sm font-semibold text-red-600">
              Development Error
            </p>

            <pre className="overflow-auto text-xs text-slate-700">
              {error.message}
            </pre>

          </div>
        )}

        <div className="mt-8 flex justify-center gap-4">

          <button
            onClick={() => reset()}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >

            <RefreshCw size={18} />

            Try Again

          </button>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >

            <Home size={18} />

            Dashboard

          </Link>

        </div>

      </div>

    </div>
  );
}