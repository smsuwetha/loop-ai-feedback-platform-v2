import { reports } from "./reportsData";
import ReportRow from "./ReportRow";

export default function ReportsTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr className="text-left text-sm text-slate-500">

            <th className="px-6 py-4">
              Report
            </th>

            <th>Format</th>

            <th>Created By</th>

            <th>Date</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {reports.map((report) => (

            <ReportRow
              key={report.id}
              report={report}
            />

          ))}

        </tbody>

      </table>

    </div>
  );
}