"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ResponsiveDrawer({
  open,
  onClose,
  children,
}: Props) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50"
        />
      )}

      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full sm:w-[450px] bg-white shadow-xl transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {children}

      </div>
    </>
  );
}