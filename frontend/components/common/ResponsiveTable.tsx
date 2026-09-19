"use client";

interface ResponsiveTableProps {
  children: React.ReactNode;
}

export default function ResponsiveTable({
  children,
}: ResponsiveTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">

      <table className="min-w-[1000px] w-full">

        {children}

      </table>

    </div>
  );
}