export default function ProfileStats() {
  const stats = [
    {
      title: "Reports Generated",
      value: "248",
    },
    {
      title: "Feedback Reviewed",
      value: "12.5K",
    },
    {
      title: "AI Requests",
      value: "5.8K",
    },
    {
      title: "Account Age",
      value: "2 Years",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((item) => (

        <div
          key={item.title}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >

          <p className="text-slate-500">
            {item.title}
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {item.value}
          </h2>

        </div>

      ))}

    </div>
  );
}