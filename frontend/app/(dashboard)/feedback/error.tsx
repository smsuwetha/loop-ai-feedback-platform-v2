"use client";

export default function Error() {
  return (
    <div className="rounded-3xl bg-red-50 p-10 text-center">

      <h2 className="text-2xl font-bold text-red-600">
        Something went wrong
      </h2>

      <p className="mt-3 text-slate-500">
        Failed to load feedback.
      </p>

    </div>
  );
}