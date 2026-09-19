import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">

        <div>
          <h2 className="text-xl font-bold text-white">
            Loop AI
          </h2>

          <p className="mt-2 text-sm">
            © 2026 Loop AI. All rights reserved.
          </p>
        </div>

        <div className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>

      </div>
    </footer>
  );
}