import { AlertTriangle } from "lucide-react";

export default function ErrorCard() {
  return (
    <div className="rounded-3xl bg-red-50 p-10 text-center">

      <AlertTriangle
        size={50}
        className="mx-auto text-red-600"
      />

      <h2 className="mt-5 text-2xl font-bold text-red-600">

        Something went wrong

      </h2>

      <p className="mt-2 text-slate-500">

        Please try again later.

      </p>

    </div>
  );
}