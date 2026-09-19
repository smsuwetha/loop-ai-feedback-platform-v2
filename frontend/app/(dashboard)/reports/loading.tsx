import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">

      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">

        <div className="flex flex-col items-center">

          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">

            <Loader2
              size={40}
              className="animate-spin text-blue-600"
            />

          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Loading Reports...
          </h2>

          <p className="mt-2 text-center text-slate-500">
            Please wait while we fetch your reports.
          </p>

        </div>

        <div className="mt-10 space-y-4">

          <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />

          <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />

          <div className="h-4 w-4/6 animate-pulse rounded-full bg-slate-200" />

          <div className="h-32 animate-pulse rounded-2xl bg-slate-200" />

        </div>

      </div>

    </div>
  );
}