import ProductCard from "../ProductCard/ProductCard.jsx";
import { useProducts } from "../../context/ProductContext.jsx";
import useRecentlyViewed from "../../hooks/useRecentlyViewed.js";

export default function RecentlyViewed({ excludeId, limit = 4 }) {
  const { products } = useProducts();
  const { ids, clear } = useRecentlyViewed();

  const items = ids
    .filter((id) => id !== excludeId)
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, limit);

  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-2xl font-bold">Recently viewed</h2>
        <button onClick={clear} className="text-sm font-medium text-indigo-600 hover:underline">Clear</button>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
