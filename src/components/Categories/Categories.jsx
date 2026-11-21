import { Link } from "react-router-dom";
import { categories } from "../../data/products.js";

export default function Categories() {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">Shop by category</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c) => (
          <Link
            key={c.name}
            to={`/shop?category=${encodeURIComponent(c.name)}`}
            className={`flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-br ${c.gradient} p-5 text-white transition hover:-translate-y-1 hover:shadow-lg`}
          >
            <span className="text-4xl">{c.emoji}</span>
            <span className="font-semibold">{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
