import {
  ArrowRight,
  BookOpen,
} from "lucide-react";

const articles = [
  {
    title: "Getting Started with Loop AI",
    category: "Documentation",
    read: "5 min read",
  },
  {
    title: "Import Feedback via CSV",
    category: "Guide",
    read: "3 min read",
  },
  {
    title: "Understanding AI Analytics",
    category: "Analytics",
    read: "7 min read",
  },
  {
    title: "Managing Team Members",
    category: "Administration",
    read: "6 min read",
  },
];

export default function HelpArticles() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Popular Articles
      </h2>

      <div className="space-y-4">

        {articles.map((article) => (

          <button
            key={article.title}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:border-blue-500 hover:bg-blue-50"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-blue-100 p-3">

                <BookOpen
                  size={20}
                  className="text-blue-600"
                />

              </div>

              <div className="text-left">

                <h3 className="font-semibold">
                  {article.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {article.category} • {article.read}
                </p>

              </div>

            </div>

            <ArrowRight
              size={18}
              className="text-slate-400"
            />

          </button>

        ))}

      </div>

    </div>
  );
}