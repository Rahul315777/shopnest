import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useProducts } from "../../context/ProductContext.jsx";
import { categories } from "../../data/products.js";

export default function Shop() {
  const { products, search, setSearch } = useProducts();
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "All";
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minRating, setMinRating] = useState(0);

  const setCategory = (c) => (c === "All" ? setParams({}) : setParams({ category: c }));

  const list = useMemo(() => {
    let out = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.price <= maxPrice &&
        p.rating >= minRating &&
        p.name.toLowerCase().includes(search.trim().toLowerCase())
    );
    if (sort === "low") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "high") out = [...out].sort((a, b) => b.price - a.price);
    if (sort === "rating") out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [products, category, maxPrice, minRating, search, sort]);

  const reset = () => {
    setParams({});
    setSearch("");
    setMaxPrice(5000);
    setMinRating(0);
    setSort("featured");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <aside className="h-fit space-y-5 rounded-2xl border border-slate-200 bg-white p-5">
        <div>
          <h3 className="mb-2 font-semibold">Category</h3>
          {["All", ...categories.map((c) => c.name)].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`mb-1 block w-full rounded-lg px-3 py-1.5 text-left text-sm ${
                category === c ? "bg-indigo-600 text-white" : "hover:bg-slate-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Max price: ₹{maxPrice}</h3>
          <input type="range" min="300" max="5000" step="100" value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-indigo-600" />
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Minimum rating</h3>
          <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 p-2 text-sm">
            <option value={0}>Any</option>
            <option value={4}>4★ & up</option>
            <option value={4.5}>4.5★ & up</option>
          </select>
        </div>
        <button onClick={reset} className="text-sm text-indigo-600 hover:underline">Reset filters</button>
      </aside>

      <section className="lg:col-span-3">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">{list.length} products</p>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..."
            className="rounded-full border border-slate-300 px-4 py-2 text-sm md:hidden" />
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-slate-300 p-2 text-sm">
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
        {list.length === 0 ? (
          <p className="py-16 text-center text-slate-500">No products match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}
