"use client";

const products = [
  {
    name: "Smart Watch",
    score: 95,
  },
  {
    name: "Wireless Earbuds",
    score: 88,
  },
  {
    name: "Gaming Laptop",
    score: 82,
  },
  {
    name: "Bluetooth Speaker",
    score: 76,
  },
];

export default function TopProducts() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Top Products
      </h2>

      <div className="space-y-6">

        {products.map((item) => (
          <div key={item.name}>

            <div className="mb-2 flex justify-between">

              <span className="font-medium">
                {item.name}
              </span>

              <span className="font-semibold text-indigo-600">
                {item.score}%
              </span>

            </div>

            <div className="h-3 rounded-full bg-slate-200">

              <div
                className="h-3 rounded-full bg-indigo-600"
                style={{
                  width: `${item.score}%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}