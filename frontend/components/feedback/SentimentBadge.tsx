interface Props {
  sentiment: string;
}

export default function SentimentBadge({
  sentiment,
}: Props) {

  const colors = {
    Positive: "bg-green-100 text-green-700",
    Neutral: "bg-yellow-100 text-yellow-700",
    Negative: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[sentiment as keyof typeof colors]
      }`}
    >
      {sentiment}
    </span>
  );
}