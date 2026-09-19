import {
  Upload,
  BrainCircuit,
  BarChart3,
  Download,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Feedback",
    description:
      "Collect customer feedback from forms, surveys or APIs.",
  },
  {
    icon: BrainCircuit,
    title: "AI Processing",
    description:
      "Our AI automatically classifies sentiment and extracts insights.",
  },
  {
    icon: BarChart3,
    title: "Analyze Dashboard",
    description:
      "Monitor analytics with beautiful charts and KPIs.",
  },
  {
    icon: Download,
    title: "Export Reports",
    description:
      "Download professional PDF and CSV reports anytime.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold">

            How It Works

          </h2>

          <p className="mt-4 text-slate-600">

            Four simple steps to transform feedback into insights.

          </p>

        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-4">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <div
                key={step.title}
                className="relative rounded-3xl bg-slate-50 p-8 text-center shadow-sm"
              >

                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">

                  <Icon size={30} />

                </div>

                <h3 className="text-xl font-bold">

                  {step.title}

                </h3>

                <p className="mt-3 text-slate-600">

                  {step.description}

                </p>

                <div className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">

                  {index + 1}

                </div>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}