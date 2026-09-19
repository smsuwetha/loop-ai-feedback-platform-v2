interface Props {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  action,
}: Props) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">

          {title}

        </h1>

        <p className="mt-2 text-slate-500">

          {subtitle}

        </p>

      </div>

      {action}

    </div>
  );
}