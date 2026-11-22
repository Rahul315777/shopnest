import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard.jsx";
import ProductSkeleton from "../ProductSkeleton/ProductSkeleton.jsx";
import useSimulatedLoading from "../../hooks/useSimulatedLoading.js";

export default function ProductSection({ title, subtitle, products, to = "/shop" }) {
  const loading = useSimulatedLoading();

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
        <Link to={to} className="text-sm font-medium text-indigo-600 hover:underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <ProductSkeleton count={4} />
        ) : (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </section>
  );
}
