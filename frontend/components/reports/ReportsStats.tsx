import { reportStats } from "./reportsData";

export default function ReportsStats() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {reportStats.map((item) => (

        <div
          key={item.title}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
        >

          <div
            className={`mb-4 h-2 w-20 rounded-full ${item.color}`}
          />

          <p className="text-sm text-slate-500">
            {item.title}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {item.value}
          </h2>

        </div>

      ))}

    </section>
  );
}