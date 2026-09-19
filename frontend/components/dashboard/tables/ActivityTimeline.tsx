"use client";

import { useEffect, useState } from "react";

interface Activity {
  id: string;
  type: string;
  message: string;
  createdAt: string;
}

interface ActivityResponse {
  activities: Activity[];
}

export default function ActivityTimeline() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch("/backend/api/dashboard/activity", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const result = (await response.json()) as ActivityResponse & {
          message?: string;
        };

        if (!response.ok) {
          throw new Error(result.message || "Failed to load activity.");
        }

        setActivities(result.activities || []);
      } catch (error) {
        console.error("Activity fetch error:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load activity.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold">Activity</h2>

        <div className="flex h-32 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold">Activity</h2>

        <div className="flex h-32 items-center justify-center text-sm text-red-500">
          {error}
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold">Activity</h2>

        <div className="flex h-32 items-center justify-center text-sm text-slate-500">
          No recent activity.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">Activity</h2>

      <div className="space-y-5">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className="mt-2 h-3 w-3 shrink-0 rounded-full bg-blue-600" />

            <div>
              <p className="font-medium">{activity.message}</p>

              <span className="text-sm text-slate-500">
                {new Date(activity.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
