interface Props {
  children: React.ReactNode;
}

export default function ResponsiveGrid({
  children,
}: Props) {
  return (
    <div
      className="
      grid
      gap-6
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-4
    "
    >
      {children}
    </div>
  );
}