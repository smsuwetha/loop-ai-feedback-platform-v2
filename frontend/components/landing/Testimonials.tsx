import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    image: "SJ",
    rating: 5,
    review:
      "Loop AI completely transformed how we analyze customer feedback. The AI insights helped us improve customer satisfaction significantly.",
  },
  {
    id: 2,
    name: "David Miller",
    role: "CEO",
    company: "NextGen Solutions",
    image: "DM",
    rating: 5,
    review:
      "Beautiful dashboard, accurate analytics and excellent reporting features. Our decision-making process has become much faster.",
  },
  {
    id: 3,
    name: "Emily Clark",
    role: "Operations Manager",
    company: "FutureSoft",
    image: "EC",
    rating: 5,
    review:
      "The sentiment analysis is incredibly accurate. Loop AI gives us a clear understanding of what our customers actually think.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-gradient-to-b from-white to-slate-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Loved by Teams Around the World
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Thousands of businesses trust Loop AI to analyze customer
            feedback and improve their products with AI-powered insights.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <Quote
                size={40}
                className="text-blue-500 opacity-20"
              />

              <p className="mt-6 leading-8 text-slate-600">
                &quot;{item.review}&quot;
              </p>

              <div className="mt-6 flex gap-1">
                {[...Array(item.rating)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-lg font-bold text-white">
                  {item.image}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    {item.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {item.role}
                  </p>

                  <p className="text-sm font-medium text-blue-600">
                    {item.company}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}