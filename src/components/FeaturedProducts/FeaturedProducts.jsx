import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard.jsx";
import ProductSkeleton from "../ProductSkeleton/ProductSkeleton.jsx";
import useSimulatedLoading from "../../hooks/useSimulatedLoading.js";
import { useProducts } from "../../context/ProductContext.jsx";

export default function FeaturedProducts() {
  const { products } = useProducts();
  const loading = useSimulatedLoading();
  const featured = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-2xl font-bold">Featured products</h2>
        <Link to="/shop" className="text-sm font-medium text-indigo-600 hover:underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <ProductSkeleton count={8} />
        ) : (
          featured.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </section>
  );
}
