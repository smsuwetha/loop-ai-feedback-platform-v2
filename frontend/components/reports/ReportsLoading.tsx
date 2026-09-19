export default function ReportsLoading() {
  return (
    <div className="space-y-4">

      {[1,2,3,4,5].map((item)=>(
        <div
          key={item}
          className="h-20 animate-pulse rounded-2xl bg-slate-200"
        />
      ))}

    </div>
  );
}