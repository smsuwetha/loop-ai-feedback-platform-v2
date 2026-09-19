import { ReactNode } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Side */}

        <section className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-cyan-600 to-indigo-700 lg:flex">

          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-center px-20 text-white">

            <div className="mb-8 flex items-center gap-3">

              <div className="rounded-xl bg-white/20 p-3">

                <Sparkles size={28} />

              </div>

              <h1 className="text-3xl font-bold">
                Loop AI
              </h1>

            </div>

            <h2 className="text-5xl font-bold leading-tight">

              AI Powered

              <br />

              Feedback Platform

            </h2>

            <p className="mt-8 text-lg leading-8 text-blue-100">

              Analyze customer feedback, discover insights and
              improve your business with Artificial Intelligence.

            </p>

            <div className="mt-12 grid grid-cols-2 gap-6">

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

                <h3 className="text-3xl font-bold">
                  50K+
                </h3>

                <p>Feedback Analysed</p>

              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

                <h3 className="text-3xl font-bold">
                  98%
                </h3>

                <p>AI Accuracy</p>

              </div>

            </div>

          </div>

        </section>

        {/* Right */}

        <section className="flex items-center justify-center p-8">

          <div className="w-full max-w-md">

            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-3"
            >

              <div className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-3 text-white">

                <Sparkles />

              </div>

              <span className="text-2xl font-bold">
                Loop AI
              </span>

            </Link>

            <h1 className="text-4xl font-bold text-slate-900">

              {title}

            </h1>

            <p className="mt-3 text-slate-500">

              {subtitle}

            </p>

            <div className="mt-10">

              {children}

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}