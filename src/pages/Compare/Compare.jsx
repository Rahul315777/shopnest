import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import { useCompare } from "../../context/CompareContext.jsx";
import { useProducts } from "../../context/ProductContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { discountPercent, formatPrice } from "../../utils/format.js";
import { stockLabel, stockOf } from "../../utils/stock.js";
import { brandOf } from "../../utils/brand.js";

// best: "min" or "max" highlights the winning numeric value (omit for text rows).
const rows = [
  { label: "Price", value: (p) => p.price, show: (p) => formatPrice(p.price), best: "min" },
  { label: "MRP", value: (p) => p.oldPrice, show: (p) => formatPrice(p.oldPrice) },
  { label: "Discount", value: (p) => discountPercent(p.price, p.oldPrice), show: (p) => `${discountPercent(p.price, p.oldPrice)}%`, best: "max" },
  { label: "Rating", value: (p) => p.rating, show: (p) => `${p.rating} ★`, best: "max" },
  { label: "Reviews", value: (p) => p.reviews, show: (p) => p.reviews, best: "max" },
  { label: "Brand", show: (p) => brandOf(p) },
  { label: "Category", show: (p) => p.category },
  { label: "Availability", show: (p) => stockLabel(p).text },
];

export default function Compare() {
  const { ids, remove, clear } = useCompare();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const selected = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  if (selected.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-6xl">⚖️</p>
        <h2 className="mt-4 text-2xl font-bold">Nothing to compare yet</h2>
        <p className="mt-1 text-slate-500">Tick "Compare" on up to 3 products in the shop.</p>
        <Link to="/shop" className="mt-4 inline-block rounded-full bg-indigo-600 px-6 py-2 font-semibold text-white">
          Browse products
        </Link>
      </div>
    );
  }

  const bestOf = (row) => {
    if (!row.best || selected.length < 2) return null;
    const values = selected.map(row.value);
    const best = row.best === "min" ? Math.min(...values) : Math.max(...values);
    return values.every((v) => v === best) ? null : best;
  };

  const add = (p) => {
    const r = addToCart(p);
    if (r.added === 0) showToast(`Only ${r.max} available. You already have them in your cart.`, "error");
    else showToast(`${p.name} added to cart`);
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "Compare" }]} />
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Compare products</h1>
        <button onClick={clear} className="text-sm text-rose-500 hover:underline">Clear all</button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="w-32 p-4" />
              {selected.map((p) => (
                <th key={p.id} className="relative p-4 align-top">
                  <button onClick={() => remove(p.id)} aria-label={`Remove ${p.name}`} className="absolute right-2 top-2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-rose-500">
                    <FiX />
                  </button>
                  <Link to={`/product/${p.id}`} className="block text-5xl">{p.emoji}</Link>
                  <Link to={`/product/${p.id}`} className="mt-2 block font-semibold hover:text-indigo-600">{p.name}</Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const best = bestOf(row);
              return (
                <tr key={row.label} className="border-b border-slate-100 last:border-0">
                  <td className="p-4 font-medium text-slate-500">{row.label}</td>
                  {selected.map((p) => (
                    <td key={p.id} className={`p-4 ${best !== null && row.value(p) === best ? "font-bold text-emerald-600" : ""}`}>
                      {row.show(p)}
                    </td>
                  ))}
                </tr>
              );
            })}
            <tr>
              <td className="p-4" />
              {selected.map((p) => (
                <td key={p.id} className="p-4">
                  <button
                    onClick={() => add(p)}
                    disabled={stockOf(p) <= 0}
                    className="w-full rounded-xl bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:hover:bg-slate-300"
                  >
                    {stockOf(p) <= 0 ? "Unavailable" : "Add to cart"}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-500">Green marks the best value in each row.</p>
    </div>
  );
}
