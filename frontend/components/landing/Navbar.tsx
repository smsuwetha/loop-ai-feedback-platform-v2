"use client";

import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  {
    title: "Features",
    href: "#features",
  },


  
  {
    title: "Testimonials",
    href: "#testimonials",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">

      <div className="mx-auto max-w-7xl px-6 py-5">

        <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/80 px-6 py-4 shadow-xl backdrop-blur-xl">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white shadow-lg">

              <Sparkles size={22} />

            </div>

            <div>

              <h1 className="text-xl font-bold text-slate-900">
                Loop AI
              </h1>

              <p className="text-xs text-slate-500">
                Feedback Platform
              </p>

            </div>

          </Link>

          {/* Desktop Menu */}

          <nav className="hidden items-center gap-10 lg:flex">

            {navLinks.map((item) => (

              <a
                key={item.title}
                href={item.href}
                className="font-medium text-slate-600 transition hover:text-blue-600"
              >
                {item.title}
              </a>

            ))}

          </nav>

          {/* Right */}

          <div className="hidden items-center gap-4 lg:flex">

            <Link
              href="/login"
              className="font-semibold text-slate-600 hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              Get Started
            </Link>

          </div>

          {/* Mobile */}

          <button
            onClick={() => setOpen(!open)}
            className="rounded-xl border p-2 lg:hidden"
          >

            {open ? <X /> : <Menu />}

          </button>

        </div>

        {/* Mobile Menu */}

        {open && (

          <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl lg:hidden">

            <div className="space-y-4">

              {navLinks.map((item) => (

                <a
                  key={item.title}
                  href={item.href}
                  className="block rounded-xl p-3 hover:bg-slate-100"
                >
                  {item.title}
                </a>

              ))}

              <hr />

              <Link
                href="/login"
                className="block rounded-xl p-3 hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="block rounded-xl bg-blue-600 p-3 text-center font-semibold text-white"
              >
                Get Started
              </Link>

            </div>

          </div>

        )}

      </div>

    </header>
  );
}