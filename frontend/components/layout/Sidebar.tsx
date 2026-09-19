"use client";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  MessageSquareText,
  BarChart3,
  FileText,
  UserCircle2,
  Settings,
  HelpCircle,
} from "lucide-react";

import Logo from "@/components/branding/Logo";
import SidebarItem from "./SidebarItem";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import UserProfile from "./UserProfile";

const mainMenu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Feedback",
    href: "/feedback",
    icon: MessageSquareText,
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
    badge: "New",
  },
];

const accountMenu = [
  {
    title: "Profile",
    href: "/profile",
    icon: UserCircle2,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/help",
    icon: HelpCircle,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[290px] flex-col border-r border-slate-200 bg-white/95 backdrop-blur-xl">

      {/* Brand */}

      <div className="border-b border-slate-100 p-6">

        <Logo />

      </div>

      {/* Workspace */}

      <div className="px-6 pt-6">

        <WorkspaceSwitcher />

      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto px-5 py-6">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Main Menu
        </p>

        <div className="space-y-2">

          {mainMenu.map((item) => (
            <SidebarItem
              key={item.title}
              href={item.href}
              title={item.title}
              icon={item.icon}
              badge={item.badge}
              active={pathname === item.href}
            />
          ))}

        </div>

        <div className="my-8 border-t border-slate-200" />

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Account
        </p>

        <div className="space-y-2">

          {accountMenu.map((item) => (
            <SidebarItem
              key={item.title}
              href={item.href}
              title={item.title}
              icon={item.icon}
              active={pathname === item.href}
            />
          ))}

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-slate-200 p-5">

        <UserProfile />

      </div>

    </aside>
  );
}