"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  User,
} from "lucide-react";

const navItems = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Home",
  },
  {
    href: "/feedback",
    icon: MessageSquare,
    label: "Feedback",
  },
  {
    href: "/analytics",
    icon: BarChart3,
    label: "Analytics",
  },
  {
    href: "/profile",
    icon: User,
    label: "Profile",
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white lg:hidden">

      <div className="grid grid-cols-4">

        {navItems.map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-3 text-xs ${
                pathname === item.href
                  ? "text-blue-600"
                  : "text-slate-500"
              }`}
            >
              <Icon size={20} />

              {item.label}
            </Link>
          );

        })}

      </div>

    </div>
  );
}