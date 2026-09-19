import {
  BrainCircuit,
  BarChart3,
  FileText,
  ShieldCheck,
  Users,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Sentiment Analysis",
    description:
      "Automatically detect positive, negative and neutral customer feedback using AI.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Visualize customer feedback with interactive dashboards and live charts.",
  },
  {
    icon: FileText,
    title: "Smart Reports",
    description:
      "Generate PDF and CSV reports instantly with AI-generated summaries.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Secure authentication, role-based access and encrypted data storage.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Invite your team members and collaborate on customer feedback.",
  },
  {
    icon: Sparkles,
    title: "AI Insights",
    description:
      "Discover hidden trends and actionable recommendations from feedback.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-2xl text-center">

          <h2 className="text-4xl font-bold text-slate-900">

            Powerful Features

          </h2>

          <p className="mt-5 text-slate-600">

            Everything you need to collect,
            analyze and improve customer experience.

          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (

              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="mb-6 inline-flex rounded-2xl bg-blue-100 p-4">

                  <Icon className="text-blue-600" size={28} />

                </div>

                <h3 className="text-xl font-bold">

                  {feature.title}

                </h3>

                <p className="mt-4 leading-7 text-slate-600">

                  {feature.description}

                </p>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}