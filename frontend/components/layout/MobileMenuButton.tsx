"use client";

import { Menu } from "lucide-react";

interface Props {
  onClick?: () => void;
}

export default function MobileMenuButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm lg:hidden"
    >
      <Menu size={20} />
    </button>
  );
}