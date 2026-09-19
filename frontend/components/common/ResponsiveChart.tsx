interface Props {
  children: React.ReactNode;
}

export default function ResponsiveChart({
  children,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm">

      <div className="h-[300px] sm:h-[400px]">

        {children}

      </div>

    </div>
  );
}