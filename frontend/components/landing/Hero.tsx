import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Sparkles,
  Star,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50 pt-36 pb-24">

      {/* Background Blur */}

      <div className="absolute -top-20 left-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">

        {/* Left */}

        <div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2">

            <Sparkles
              size={18}
              className="text-blue-600"
            />

            <span className="text-sm font-semibold text-blue-700">
              AI Powered Feedback Analytics
            </span>

          </div>

          <h1 className="text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">

            Turn Customer Feedback Into

            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">

              {" "}Business Insights

            </span>

          </h1>

          <p className="mt-7 text-lg leading-8 text-slate-600">

            Collect, analyze and visualize customer feedback using
            Artificial Intelligence. Discover customer sentiment,
            generate reports and make better business decisions.

          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              href="/register"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-4 font-semibold text-white shadow-xl transition hover:scale-105"
            >
              Get Started

              <ArrowRight size={18} />

            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
            >
              Live Demo
            </Link>

          </div>

          {/* Rating */}

          <div className="mt-12 flex items-center gap-5">

            <div className="flex">

              {[1, 2, 3, 4, 5].map((item) => (

                <Star
                  key={item}
                  size={20}
                  className="fill-yellow-400 text-yellow-400"
                />

              ))}

            </div>

            <p className="text-slate-600">

              Trusted by

              <span className="font-bold text-slate-900">
                {" "}250+
              </span>

              companies worldwide

            </p>

          </div>

        </div>

        {/* Right */}

        <div className="relative">

          <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-2xl">

            <div className="mb-8 flex items-center justify-between">

              <div>

                <p className="text-slate-500">
                  AI Analytics
                </p>

                <h2 className="text-3xl font-bold">
                  98.4%
                </h2>

              </div>

              <div className="rounded-2xl bg-blue-100 p-4">

                <BrainCircuit
                  size={34}
                  className="text-blue-600"
                />

              </div>

            </div>

            <div className="space-y-5">

              <div className="rounded-2xl bg-green-50 p-5">

                <div className="flex items-center justify-between">

                  <span className="font-semibold">
                    Positive Feedback
                  </span>

                  <span className="font-bold text-green-600">
                    82%
                  </span>

                </div>

              </div>

              <div className="rounded-2xl bg-yellow-50 p-5">

                <div className="flex items-center justify-between">

                  <span className="font-semibold">
                    Neutral Feedback
                  </span>

                  <span className="font-bold text-yellow-600">
                    11%
                  </span>

                </div>

              </div>

              <div className="rounded-2xl bg-red-50 p-5">

                <div className="flex items-center justify-between">

                  <span className="font-semibold">
                    Negative Feedback
                  </span>

                  <span className="font-bold text-red-600">
                    7%
                  </span>

                </div>

              </div>

            </div>

          </div>

          <div className="absolute -bottom-8 -left-8 rounded-2xl bg-white p-5 shadow-xl">

            <div className="flex items-center gap-3">

              <BarChart3 className="text-blue-600" />

              <div>

                <h4 className="font-bold">
                  50K+
                </h4>

                <p className="text-sm text-slate-500">
                  Feedback Analysed
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}