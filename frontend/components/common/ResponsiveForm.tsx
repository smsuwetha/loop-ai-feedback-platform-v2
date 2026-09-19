interface Props {
  children: React.ReactNode;
}

export default function ResponsiveForm({
  children,
}: Props) {
  return (
    <div
      className="
      grid
      gap-6
      grid-cols-1
      lg:grid-cols-2
    "
    >
      {children}
    </div>
  );
}