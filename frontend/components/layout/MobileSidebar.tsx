"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  FileText,
  User,
  Settings,
  HelpCircle,
  Bell,
  Sparkles,
} from "lucide-react";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Feedback",
    href: "/feedback",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help Center",
    href: "/help-center",
    icon: HelpCircle,
  },
];

export default function MobileSidebar({
  open,
  onClose,
}: MobileSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-200 p-6">

        <Link
          href="/dashboard"
          className="flex items-center gap-3"
          onClick={onClose}
        >
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-3 text-white">
            <Sparkles size={22} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Loop AI
            </h2>

            <p className="text-xs text-slate-500">
              Feedback Platform
            </p>
          </div>
        </Link>

        <button
          onClick={onClose}
          className="rounded-xl p-2 hover:bg-slate-100"
        >
          <X size={22} />
        </button>

      </div>

      {/* Navigation */}

      <nav className="space-y-2 p-5">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.title}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-4 rounded-2xl px-4 py-3 transition ${
                active
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="absolute bottom-6 left-6 right-6">

        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-5 text-white">

          <h3 className="font-bold">
            Loop AI Pro
          </h3>

          <p className="mt-2 text-sm text-blue-100">
            Unlock advanced AI analytics and enterprise features.
          </p>

          <button className="mt-4 w-full rounded-xl bg-white py-3 font-semibold text-blue-600">
            Upgrade Plan
          </button>

        </div>

      </div>

    </aside>
  );
}