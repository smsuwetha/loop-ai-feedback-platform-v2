import { Mail, MessageCircle } from "lucide-react";

export default function ContactSupport() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Contact Support
      </h2>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Your Name"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />

        <textarea
          rows={5}
          placeholder="Describe your issue..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />

        <button className="flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">

          <MessageCircle size={18} />

          Send Request

        </button>

      </div>

      <div className="mt-8 rounded-2xl bg-slate-50 p-5">

        <div className="flex items-center gap-3">

          <Mail className="text-blue-600" />

          <span className="font-medium">
            support@loopai.com
          </span>

        </div>

      </div>

    </div>
  );
}