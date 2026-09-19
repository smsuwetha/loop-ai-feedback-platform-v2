import {
  Clock,
  Headphones,
  MessageSquare,
} from "lucide-react";

export default function SupportCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-lg">

      <Headphones size={42} />

      <h2 className="mt-5 text-2xl font-bold">
        Premium Support
      </h2>

      <p className="mt-3 text-blue-100">
        Need immediate help? Our support team is available 24/7.
      </p>

      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3">

          <Clock size={18} />

          <span>Average response: 10 mins</span>

        </div>

        <div className="flex items-center gap-3">

          <MessageSquare size={18} />

          <span>Live Chat Available</span>

        </div>

      </div>

      <button className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-slate-100">

        Start Live Chat

      </button>

    </div>
  );
}