"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

interface FeedbackItem {
  id: string;
  content: string;
  channel: string;
  customerLabel: string | null;
  sentiment: "POS" | "NEU" | "NEG" | null;
  createdAt: string;
}

interface FeedbackResponse {
  feedback: FeedbackItem[];
  message?: string;
}

export default function RecentFeedbackTable() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("/backend/api/feedback", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const result =
          (await response.json()) as FeedbackResponse;

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to load feedback."
          );
        }

        setFeedback(result.feedback?.slice(0, 5) || []);
      } catch (error) {
        console.error(
          "Recent feedback fetch error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load feedback."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const getSentimentLabel = (
    sentiment: FeedbackItem["sentiment"]
  ) => {
    switch (sentiment) {
      case "POS":
        return "Positive";
      case "NEG":
        return "Negative";
      case "NEU":
        return "Neutral";
      default:
        return "Unclassified";
    }
  };

  const getSentimentStyle = (
    sentiment: FeedbackItem["sentiment"]
  ) => {
    switch (sentiment) {
      case "POS":
        return "bg-green-100 text-green-700";

      case "NEG":
        return "bg-red-100 text-red-700";

      case "NEU":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold">
          Recent Feedback
        </h2>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-14 animate-pulse rounded-xl bg-slate-100"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-bold">
          Recent Feedback
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest feedback from your workspace
        </p>
      </div>

      {feedback.length === 0 ? (
        <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
          <MessageSquare
            size={40}
            className="mb-3 text-slate-300"
          />

          <p className="font-medium text-slate-600">
            No feedback yet
          </p>

          <p className="mt-1 text-sm text-slate-400">
            New feedback will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-slate-500">
                <th className="p-5">
                  Customer
                </th>

                <th className="p-5">
                  Feedback
                </th>

                <th className="p-5">
                  Channel
                </th>

                <th className="p-5">
                  Sentiment
                </th>

                <th className="p-5">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {feedback.map((item) => (
                <tr
                  key={item.id}
                  className="border-t transition-colors hover:bg-slate-50"
                >
                  <td className="p-5 font-medium text-slate-900">
                    {item.customerLabel || "Anonymous"}
                  </td>

                  <td className="max-w-[320px] p-5">
                    <p className="truncate text-sm text-slate-600">
                      {item.content}
                    </p>
                  </td>

                  <td className="p-5 text-sm text-slate-600">
                    {item.channel.replaceAll("_", " ")}
                  </td>

                  <td className="p-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getSentimentStyle(
                        item.sentiment
                      )}`}
                    >
                      {getSentimentLabel(
                        item.sentiment
                      )}
                    </span>
                  </td>

                  <td className="p-5 text-sm text-slate-500">
                    {formatDate(item.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}