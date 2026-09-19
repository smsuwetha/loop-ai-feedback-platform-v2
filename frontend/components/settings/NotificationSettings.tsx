export default function NotificationSettings() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Notifications
      </h2>

      <div className="space-y-6">

        {[
          "Email Notifications",
          "Push Notifications",
          "Weekly Reports",
          "AI Insights Alerts",
        ].map((item) => (

          <div
            key={item}
            className="flex items-center justify-between"
          >

            <span>{item}</span>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5"
            />

          </div>

        ))}

      </div>

    </div>
  );
}