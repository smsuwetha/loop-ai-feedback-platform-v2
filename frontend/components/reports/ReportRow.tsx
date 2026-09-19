import { Download, Eye } from "lucide-react";

interface Report {
  id: number;
  name: string;
  format: string;
  createdBy: string;
  date: string;
  status: string;
}

interface ReportRowProps {
  report: Report;
}

export default function ReportRow({
  report,
}: ReportRowProps) {
  return (
    <tr className="border-t border-slate-200 hover:bg-slate-50">

      <td className="px-6 py-5 font-medium">
        {report.name}
      </td>

      <td>{report.format}</td>

      <td>{report.createdBy}</td>

      <td>{report.date}</td>

      <td>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            report.status === "Ready"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {report.status}
        </span>

      </td>

      <td>

        <div className="flex gap-2">

          <button className="rounded-lg p-2 hover:bg-slate-100">
            <Eye size={18} />
          </button>

          <button className="rounded-lg p-2 hover:bg-slate-100">
            <Download size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
}