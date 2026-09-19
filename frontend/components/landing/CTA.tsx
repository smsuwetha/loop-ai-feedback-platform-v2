import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-blue-600 py-20 text-center text-white">
      <h2 className="text-4xl font-bold">
        Ready to Transform Customer Feedback?
      </h2>

      <p className="mt-5 text-blue-100">
        Join hundreds of businesses already using Loop AI.
      </p>

      <Link
        href="/register"
        className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-semibold text-blue-600"
      >
        Get Started Free
      </Link>
    </section>
  );
}