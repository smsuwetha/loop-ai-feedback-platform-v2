import {
  BookOpen,
  FileText,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

const categories = [
  {
    title: "Documentation",
    description: "Read platform documentation.",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "User Guides",
    description: "Learn how to use Loop AI.",
    icon: FileText,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Security",
    description: "Privacy and account security.",
    icon: ShieldCheck,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Community",
    description: "Join discussions and support.",
    icon: MessageCircle,
    color: "bg-violet-100 text-violet-600",
  },
];

export default function HelpCategories() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {categories.map((item) => {

        const Icon = item.icon;

        return (

          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
            >

              <Icon size={28} />

            </div>

            <h3 className="mt-5 text-xl font-bold">
              {item.title}
            </h3>

            <p className="mt-2 text-slate-500">
              {item.description}
            </p>

          </div>

        );

      })}

    </div>
  );
}