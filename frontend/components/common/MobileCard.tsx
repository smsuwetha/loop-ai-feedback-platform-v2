interface Props {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export default function MobileCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {value}
          </h2>

        </div>

        <div className="rounded-xl bg-blue-50 p-3">

          {icon}

        </div>

      </div>

    </div>
  );
}