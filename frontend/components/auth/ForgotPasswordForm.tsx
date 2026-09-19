"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  ArrowRight,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

export default function ForgotPasswordForm() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO:
    // Call Backend API

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="rounded-3xl border border-green-200 bg-green-50 p-8 text-center">

        <CheckCircle
          className="mx-auto text-green-600"
          size={70}
        />

        <h2 className="mt-6 text-2xl font-bold">
          Email Sent Successfully
        </h2>

        <p className="mt-3 text-slate-600">
          Please check your inbox and follow the password reset link.
        </p>

        <Link
          href="/login"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
        >
          Back to Login

          <ArrowLeft size={18} />
        </Link>

      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div>

        <label className="mb-2 block font-semibold">
          Email Address
        </label>

        <div className="relative">

          <Mail
            size={20}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="email"
            required
            placeholder="Enter your registered email"
            className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />

        </div>

      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
      >
        Send Reset Link

        <ArrowRight size={18} />

      </button>

      <Link
        href="/login"
        className="flex items-center justify-center gap-2 text-blue-600 font-semibold"
      >
        <ArrowLeft size={18} />

        Back to Login

      </Link>

    </form>
  );
}