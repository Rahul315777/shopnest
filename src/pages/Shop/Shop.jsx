import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiGrid, FiList } from "react-icons/fi";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import FilterChips from "../../components/FilterChips/FilterChips.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import ProductSkeleton from "../../components/ProductSkeleton/ProductSkeleton.jsx";
import { buildChips } from "../../utils/filterChips.js";
import useLocalStorage from "../../hooks/useLocalStorage.js";
import useSimulatedLoading from "../../hooks/useSimulatedLoading.js";
import { useProducts } from "../../context/ProductContext.jsx";
import { categories } from "../../data/products.js";

export default function Shop() {
  const { products, search, setSearch } = useProducts();
  const [params, setParams] = useSearchParams();
  const loading = useSimulatedLoading();
  const category = params.get("category") || "All";
  const [sort, setSort] = useState("featured");
  const [perPage, setPerPage] = useLocalStorage("shopnest_per_page", 9);
  const [page, setPage] = useState(1);
  const [view, setView] = useLocalStorage("shopnest_shop_view", "grid");
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

  // Go back to page 1 whenever the result set changes.
  useEffect(() => setPage(1), [category, maxPrice, minRating, search, sort, perPage]);

  const totalPages = Math.max(1, Math.ceil(list.length / perPage));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * perPage;
  const pageItems = list.slice(start, start + perPage);

  const goToPage = (n) => {
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const chips = buildChips({ category, search, maxPrice, minRating });

  const removeChip = (key) => {
    if (key === "category") setParams({});
    if (key === "search") setSearch("");
    if (key === "price") setMaxPrice(5000);
    if (key === "rating") setMinRating(0);
  };

  const reset = () => {
    setParams({});
    setSearch("");
    setMaxPrice(5000);
    setMinRating(0);
    setSort("featured");
  };

  return (
    <div>
    <Breadcrumb items={category === "All" ? [{ label: "Shop" }] : [{ label: "Shop", to: "/shop" }, { label: category }]} />
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
          <p className="text-sm text-slate-500">
            {list.length === 0
              ? "0 products"
              : `Showing ${start + 1}–${start + pageItems.length} of ${list.length} products`}
          </p>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..."
            className="rounded-full border border-slate-300 px-4 py-2 text-sm md:hidden" />
          <div className="flex overflow-hidden rounded-lg border border-slate-300">
            {[["grid", FiGrid], ["list", FiList]].map(([v, Icon]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-label={`${v} view`}
                aria-pressed={view === v}
                className={`p-2 ${view === v ? "bg-indigo-600 text-white" : "hover:bg-slate-100"}`}
              >
                <Icon />
              </button>
            ))}
          </div>
          <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}
            aria-label="Products per page" className="rounded-lg border border-slate-300 p-2 text-sm">
            {[6, 9, 12, 24].map((n) => <option key={n} value={n}>{n} per page</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-slate-300 p-2 text-sm">
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
        <FilterChips chips={chips} onRemove={removeChip} onClear={reset} />
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <ProductSkeleton count={6} />
          </div>
        ) : list.length === 0 ? (
          <p className="py-16 text-center text-slate-500">No products match your filters.</p>
        ) : (
          <div className={view === "list" ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"}>
            {pageItems.map((p) => <ProductCard key={p.id} product={p} view={view} />)}
          </div>
        )}
        {!loading && <Pagination page={current} totalPages={totalPages} onChange={goToPage} />}
      </section>
    </div>
    </div>
  );
}
