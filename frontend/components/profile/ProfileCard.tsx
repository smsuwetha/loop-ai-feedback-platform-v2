import { Mail, Phone, Building2, ShieldCheck } from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="flex flex-col items-center">

        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-4xl font-bold text-white shadow-lg">
          Z
        </div>

        <h2 className="mt-5 text-2xl font-bold">
          Zara
        </h2>

        <p className="text-slate-500">
          Administrator
        </p>

      </div>

      <div className="mt-8 space-y-5">

        <div className="flex items-center gap-3">
          <Mail size={18} className="text-blue-600" />
          <span>zara@example.com</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={18} className="text-blue-600" />
          <span>+91 9876543210</span>
        </div>

        <div className="flex items-center gap-3">
          <Building2 size={18} className="text-blue-600" />
          <span>Loop AI Pvt Ltd</span>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck size={18} className="text-green-600" />
          <span>Admin Access</span>
        </div>

      </div>

    </div>
  );
}