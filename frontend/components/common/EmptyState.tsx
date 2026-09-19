import { Inbox } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white py-20">

      <Inbox
        size={60}
        className="text-slate-400"
      />

      <h2 className="mt-5 text-2xl font-bold">

        {title}

      </h2>

      <p className="mt-2 text-slate-500">

        {description}

      </p>

    </div>
  );
}