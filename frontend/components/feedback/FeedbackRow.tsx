import { Eye, Trash2 } from "lucide-react";
import RatingStars from "./RatingStars";
import SentimentBadge from "./SentimentBadge";

interface FeedbackItem {
  id: number;
  customer: string;
  product: string;
  rating: number;
  sentiment: string;
  status: string;
  date: string;
}

interface Props {
  item: FeedbackItem;
  onView: () => void;
}

export default function FeedbackRow({
  item,
  onView,
}: Props) {
  return (
    <tr className="border-b border-slate-200 transition hover:bg-slate-50">

      {/* Customer */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold text-white">

            {item.customer.charAt(0)}

          </div>

          <div>

            <h4 className="font-semibold text-slate-900">
              {item.customer}
            </h4>

            <p className="text-sm text-slate-500">
              Customer
            </p>

          </div>

        </div>

      </td>

      {/* Product */}

      <td className="px-6 py-5 text-slate-700">
        {item.product}
      </td>

      {/* Rating */}

      <td className="px-6 py-5">
        <RatingStars rating={item.rating} />
      </td>

      {/* Sentiment */}

      <td className="px-6 py-5">
        <SentimentBadge sentiment={item.sentiment} />
      </td>

      {/* Status */}

      <td className="px-6 py-5">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            item.status === "Reviewed"
              ? "bg-blue-100 text-blue-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {item.status}
        </span>

      </td>

      {/* Date */}

      <td className="px-6 py-5 text-slate-600">
        {item.date}
      </td>

      {/* Actions */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-2">

          <button
            onClick={onView}
            className="rounded-lg p-2 transition hover:bg-slate-100"
            title="View Feedback"
          >
            <Eye
              size={18}
              className="text-slate-600"
            />
          </button>

          <button
            className="rounded-lg p-2 transition hover:bg-red-50"
            title="Delete Feedback"
          >
            <Trash2
              size={18}
              className="text-red-600"
            />
          </button>

        </div>

      </td>

    </tr>
  );
}