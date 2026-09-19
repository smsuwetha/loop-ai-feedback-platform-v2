"use client";

import { useState } from "react";
import FeedbackRow from "./FeedbackRow";
import FeedbackDrawer from "./FeedbackDrawer";
import { feedbackList } from "./feedbackData";

export default function FeedbackTable() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-slate-50">
            <tr>
              <th className="p-5">Customer</th>
              <th>Product</th>
              <th>Rating</th>
              <th>Sentiment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {feedbackList.map((item) => (

              <FeedbackRow
                key={item.id}
                item={item}
                onView={() => setOpen(true)}
              />

            ))}

          </tbody>

        </table>

      </div>

      <FeedbackDrawer
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}