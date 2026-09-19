import { MessageSquareText } from "lucide-react";

export default function FeedbackHeader() {
  return (
    <div className="flex items-center justify-between">

      <div>

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-100 p-3">

            <MessageSquareText
              className="text-blue-600"
              size={24}
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">
              Feedback Management
            </h1>

            <p className="text-slate-500">
              Manage customer feedback and AI insights.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}