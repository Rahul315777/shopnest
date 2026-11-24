import { Link } from "react-router-dom";
import { useCompare } from "../../context/CompareContext.jsx";
import { useProducts } from "../../context/ProductContext.jsx";

export default function CompareBar() {
  const { ids, remove, clear } = useCompare();
  const { products } = useProducts();
  const selected = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  if (selected.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-40 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
      <div className="flex items-center gap-2">
        {selected.map((p) => (
          <button
            key={p.id}
            onClick={() => remove(p.id)}
            title={`Remove ${p.name}`}
            className="rounded-lg bg-slate-100 px-2 py-1 text-xl hover:bg-rose-100"
          >
            {p.emoji}
          </button>
        ))}
      </div>
      <Link
        to="/compare"
        className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Compare ({selected.length})
      </Link>
      <button onClick={clear} className="text-sm text-slate-500 hover:text-rose-500">Clear</button>
    </div>
  );
}
