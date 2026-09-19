import {
  PlayCircle,
  Clock,
} from "lucide-react";

export default function HelpVideoCard() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white shadow-xl">

      <PlayCircle size={50} />

      <h2 className="mt-5 text-2xl font-bold">
        Watch Video Tutorials
      </h2>

      <p className="mt-3 text-blue-100">
        Learn how to use Loop AI Dashboard through
        step-by-step tutorials.
      </p>

      <div className="mt-6 flex items-center gap-3">

        <Clock size={18} />

        <span>20+ Tutorials Available</span>

      </div>

      <button className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-slate-100">

        Watch Now

      </button>

    </div>
  );
}