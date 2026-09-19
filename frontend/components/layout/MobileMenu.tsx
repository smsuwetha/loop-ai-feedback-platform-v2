"use client";

import { Menu } from "lucide-react";

interface MobileMenuProps {
  onOpen: () => void;
}

export default function MobileMenu({
  onOpen,
}: MobileMenuProps) {
  return (
    <button
      onClick={onOpen}
      className="rounded-xl border border-slate-200 bg-white p-3 shadow lg:hidden"
    >
      <Menu size={22} />
    </button>
  );
}