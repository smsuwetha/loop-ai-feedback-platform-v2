"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  href: string;
  title: string;
  icon: LucideIcon;
  active?: boolean;
  badge?: string;
}

export default function SidebarItem({
  href,
  title,
  icon: Icon,
  active,
  badge,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`
        group relative flex items-center justify-between
        rounded-2xl px-4 py-3
        transition-all duration-300
        ${
          active
            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl"
            : "text-slate-600 hover:bg-slate-100"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} />

        <span className="font-medium">
          {title}
        </span>
      </div>

      {badge && (
        <span className="rounded-full bg-white/20 px-2 py-1 text-xs">
          {badge}
        </span>
      )}
    </Link>
  );
}