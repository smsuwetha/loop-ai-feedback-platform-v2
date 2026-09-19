export default function LanguageSettings() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Language
      </h2>

      <select className="w-full rounded-xl border border-slate-300 px-4 py-3">

        <option>English</option>

        <option>Tamil</option>

        <option>Hindi</option>

        <option>French</option>

      </select>

    </div>
  );
}