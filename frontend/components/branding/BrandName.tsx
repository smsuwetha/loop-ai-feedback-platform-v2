interface Props {
  small?: boolean;
}

export default function BrandName({
  small,
}: Props) {
  return (
    <div>
      <h1
        className={`font-bold tracking-tight ${
          small
            ? "text-lg"
            : "text-2xl"
        }`}
      >
        LOOP AI
      </h1>

      <p className="text-xs text-slate-500">
        Feedback Intelligence
      </p>
    </div>
  );
}