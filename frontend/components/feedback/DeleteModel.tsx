"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({
  open,
  onClose,
  onDelete,
}: Props) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />

      <div className="fixed left-1/2 top-1/2 z-50 w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-2xl">

        <h2 className="text-2xl font-bold">
          Delete Feedback?
        </h2>

        <p className="mt-3 text-slate-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-3"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white"
          >
            Delete
          </button>

        </div>

      </div>
    </>
  );
}