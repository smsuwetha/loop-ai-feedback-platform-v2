export default function ProfileActivity() {
  const activities = [
    {
      title: "Generated Monthly Report",
      time: "2 hours ago",
    },
    {
      title: "Reviewed Customer Feedback",
      time: "Yesterday",
    },
    {
      title: "Updated Profile",
      time: "3 days ago",
    },
    {
      title: "Logged In",
      time: "5 days ago",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {activities.map((activity) => (

          <div
            key={activity.title}
            className="flex items-center justify-between border-b border-slate-100 pb-4"
          >
            <span className="font-medium">
              {activity.title}
            </span>

            <span className="text-sm text-slate-500">
              {activity.time}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}