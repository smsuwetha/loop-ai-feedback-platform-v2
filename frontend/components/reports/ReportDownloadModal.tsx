"use client";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ReportDownloadModal({
  open,
  onClose,
}: Props) {

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50"
      />

      <div className="fixed left-1/2 top-1/2 z-50 w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-2xl">

        <h2 className="text-2xl font-bold">
          Download Report
        </h2>

        <p className="mt-3 text-slate-500">
          Select your preferred export format.
        </p>

        <div className="mt-8 space-y-4">

          <button className="w-full rounded-xl border p-4 hover:bg-slate-50">
            Download PDF
          </button>

          <button className="w-full rounded-xl border p-4 hover:bg-slate-50">
            Download CSV
          </button>

        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white"
        >
          Close
        </button>

      </div>
    </>
  );
}