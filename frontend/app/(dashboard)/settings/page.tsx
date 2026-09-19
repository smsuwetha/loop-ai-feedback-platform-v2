import SettingsHeader from "@/components/settings/SettingsHeader";
import ThemeSettings from "@/components/settings/ThemeSettings";
import LanguageSettings from "@/components/settings/LanguageSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import AccountSettings from "@/components/settings/AccountSettings";

export default function SettingsPage() {
  return (
    <div className="space-y-8">

      <SettingsHeader />

      <div className="grid gap-8 xl:grid-cols-2">

        <ThemeSettings />

        <LanguageSettings />

      </div>

      <NotificationSettings />

      <div className="grid gap-8 xl:grid-cols-2">

        <SecuritySettings />

        <AccountSettings />

      </div>

    </div>
  );
}