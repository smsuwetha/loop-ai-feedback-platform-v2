export default function ReportsPagination() {
  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:flex-row">

      <p className="text-sm text-slate-500">
        Showing <span className="font-semibold">1–10</span> of{" "}
        <span className="font-semibold">248</span> reports
      </p>

      <div className="flex items-center gap-2">

        <button className="rounded-xl border px-4 py-2 hover:bg-slate-100">
          Previous
        </button>

        <button className="rounded-xl bg-blue-600 px-4 py-2 text-white">
          1
        </button>

        <button className="rounded-xl border px-4 py-2 hover:bg-slate-100">
          2
        </button>

        <button className="rounded-xl border px-4 py-2 hover:bg-slate-100">
          3
        </button>

        <button className="rounded-xl border px-4 py-2 hover:bg-slate-100">
          Next
        </button>

      </div>

    </div>
  );
}