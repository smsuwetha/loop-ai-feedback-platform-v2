const plans = [
  {
    title: "Starter",
    price: "$0",
    features: ["100 Feedback", "Basic Dashboard", "Email Support"],
  },
  {
    title: "Professional",
    price: "$29",
    features: [
      "Unlimited Feedback",
      "AI Insights",
      "Analytics",
      "Reports",
    ],
    popular: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    features: [
      "Everything Included",
      "SSO",
      "Dedicated Support",
      "Custom AI",
    ],
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Pricing
          </h2>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {plans.map((plan) => (

            <div
              key={plan.title}
              className={`rounded-3xl border p-8 shadow-sm ${
                plan.popular
                  ? "border-blue-600 bg-white"
                  : "border-slate-200 bg-white"
              }`}
            >
              {plan.popular && (
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs text-white">
                  Most Popular
                </span>
              )}

              <h3 className="mt-4 text-2xl font-bold">
                {plan.title}
              </h3>

              <p className="mt-2 text-4xl font-extrabold">
                {plan.price}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}