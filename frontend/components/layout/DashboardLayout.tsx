"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar */}

      <Sidebar />

      {/* Content */}

      <div className="lg:ml-[290px]">

        {/* Navbar */}

        <Navbar />

        {/* Main */}

        <main className="min-h-screen pt-24 px-8 pb-8">

          <div className="mx-auto max-w-[1600px]">

            {children}

          </div>

        </main>

        {/* Footer */}

        <footer className="border-t border-slate-200 bg-white px-8 py-5">

          <div className="flex flex-col items-center justify-between gap-2 text-sm text-slate-500 md:flex-row">

            <p>
              © 2026 LOOP AI. All rights reserved.
            </p>

            <p>
              Built with ❤️ using Next.js & Tailwind CSS
            </p>

          </div>

        </footer>

      </div>

    </div>
  );
}