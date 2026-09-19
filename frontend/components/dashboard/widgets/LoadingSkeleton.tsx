export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6">

      <div className="mb-5 h-6 w-40 rounded bg-slate-200" />

      <div className="space-y-3">

        <div className="h-5 rounded bg-slate-200" />

        <div className="h-5 w-5/6 rounded bg-slate-200" />

        <div className="h-5 w-3/4 rounded bg-slate-200" />

      </div>

    </div>
  );
}