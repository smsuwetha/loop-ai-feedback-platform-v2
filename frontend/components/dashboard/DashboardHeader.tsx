interface DashboardHeaderProps {
  userName: string;
}

export default function DashboardHeader({
  userName,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <span className="text-sm font-medium text-blue-600">
        👋 Welcome Back
      </span>

      <h1 className="text-4xl font-bold tracking-tight text-slate-900">
        {userName}
      </h1>

      <p className="max-w-2xl text-slate-500">
        Monitor customer feedback, discover AI-powered insights,
        and track your business performance in one place.
      </p>
    </div>
  );
}