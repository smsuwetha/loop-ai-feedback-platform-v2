interface Props {
  children: React.ReactNode;
}

export default function ResponsiveContainer({
  children,
}: Props) {
  return (
    <div
      className="
      mx-auto
      w-full
      max-w-[1600px]
      px-4
      sm:px-6
      lg:px-8
      xl:px-10
    "
    >
      {children}
    </div>
  );
}