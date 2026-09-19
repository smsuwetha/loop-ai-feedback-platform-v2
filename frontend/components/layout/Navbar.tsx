"use client";

import {
  Bell,
  CalendarDays,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  clearAuthUser,
  getAuthUser,
  AuthUser,
} from "@/lib/auth-client";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({
  onMenuClick,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getAuthUser());
  }, []);

  const displayName = user?.name || "Account";

  const displayRole = user?.role
    ? user.role.charAt(0) +
      user.role.slice(1).toLowerCase()
    : "";

  const initial = displayName
    .charAt(0)
    .toUpperCase();

  const handleSignOut = async () => {
  try {
    await fetch(
      "http://localhost:3000/api/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );
  } catch (error) {
    console.error(
      "Logout error:",
      error
    );
  } finally {
    clearAuthUser();
    setUser(null);
    setMenuOpen(false);

    window.location.href = "/login";
  }
};

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl lg:left-[290px]">
      <div className="flex h-full items-center justify-between px-4 md:px-8">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu */}
          <button
            onClick={onMenuClick}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 lg:hidden"
          >
            <Menu size={20} />
          </button>

          {/* Search */}
          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:ring-2 focus-within:ring-blue-500 lg:flex">
            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search feedback, reports..."
              className="w-[340px] bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* AI */}
          <button className="hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-medium text-white shadow-lg transition hover:scale-105 xl:flex">
            <Sparkles size={18} />
            AI Assistant
          </button>

          {/* Date */}
          <button className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm hover:bg-slate-50 xl:flex">
            <CalendarDays size={18} />

            <span className="text-sm font-medium">
              This Month
            </span>
          </button>

          {/* Theme */}
          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50">
            <Moon size={18} />
          </button>

          {/* Notification */}
          <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50">
            <Bell size={18} />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              3
            </span>
          </button>

          {/* User */}
          <div className="relative">
            <button
              onClick={() =>
                setMenuOpen((open) => !open)
              }
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 font-bold text-white">
                {initial}
              </div>

              <div className="hidden text-left md:block">
                <h4 className="text-sm font-semibold text-slate-900">
                  {displayName}
                </h4>

                <p className="text-xs text-slate-500">
                  {displayRole}
                </p>
              </div>

              <ChevronDown
                size={18}
                className="text-slate-500"
              />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-14 z-50 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}