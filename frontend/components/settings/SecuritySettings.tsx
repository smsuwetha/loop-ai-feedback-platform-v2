import { ShieldCheck } from "lucide-react";

export default function SecuritySettings() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <ShieldCheck className="text-green-600" />

        <h2 className="text-2xl font-bold">
          Security
        </h2>

      </div>

      <div className="space-y-5">

        <div className="flex items-center justify-between rounded-xl border p-4">

          <div>

            <h3 className="font-semibold">
              Two-Factor Authentication
            </h3>

            <p className="text-sm text-slate-500">
              Protect your account with 2FA.
            </p>

          </div>

          <input
            type="checkbox"
            className="h-5 w-5"
          />

        </div>

        <div className="flex items-center justify-between rounded-xl border p-4">

          <div>

            <h3 className="font-semibold">
              Login Alerts
            </h3>

            <p className="text-sm text-slate-500">
              Get notified for new sign-ins.
            </p>

          </div>

          <input
            type="checkbox"
            defaultChecked
            className="h-5 w-5"
          />

        </div>

      </div>

    </div>
  );
}