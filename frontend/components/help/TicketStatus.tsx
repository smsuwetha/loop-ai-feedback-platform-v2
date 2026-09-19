import {
  CheckCircle2,
  Clock3,
} from "lucide-react";

const tickets = [
  {
    id: "#TK-1024",
    title: "CSV Import Issue",
    status: "Resolved",
    icon: CheckCircle2,
    color: "text-green-600",
  },
  {
    id: "#TK-1031",
    title: "Analytics Loading",
    status: "Pending",
    icon: Clock3,
    color: "text-yellow-600",
  },
];

export default function TicketStatus() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Recent Support Tickets
      </h2>

      <div className="space-y-5">

        {tickets.map((ticket) => {

          const Icon = ticket.icon;

          return (

            <div
              key={ticket.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-5"
            >

              <div>

                <h3 className="font-semibold">
                  {ticket.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {ticket.id}
                </p>

              </div>

              <div className="flex items-center gap-2">

                <Icon
                  size={18}
                  className={ticket.color}
                />

                <span className={ticket.color}>
                  {ticket.status}
                </span>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}