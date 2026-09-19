"use client";

interface MobileOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileOverlay({
  open,
  onClose,
}: MobileOverlayProps) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
    />
  );
}