const stats = [
  {
    value: "50K+",
    title: "Feedback Analyzed",
  },
  {
    value: "98%",
    title: "AI Accuracy",
  },
  {
    value: "120+",
    title: "Organizations",
  },
  {
    value: "15+",
    title: "AI Models",
  },
];

export default function Stats() {
  return (
    <section className="bg-white py-20">

      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => (

          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center transition hover:-translate-y-2 hover:shadow-xl"
          >

            <h2 className="text-4xl font-extrabold text-blue-600">

              {item.value}

            </h2>

            <p className="mt-3 text-slate-600">

              {item.title}

            </p>

          </div>

        ))}

      </div>

    </section>
  );
}