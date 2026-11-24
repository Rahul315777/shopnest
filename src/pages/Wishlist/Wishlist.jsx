import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useProducts } from "../../context/ProductContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";

export default function Wishlist() {
  const { products } = useProducts();
  const { ids } = useWishlist();
  const saved = products.filter((p) => ids.includes(p.id));

  if (saved.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-6xl">💜</p>
        <h2 className="mt-4 text-2xl font-bold">Your wishlist is empty</h2>
        <Link to="/shop" className="mt-4 inline-block text-indigo-600 hover:underline">Browse products</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">My wishlist ({saved.length})</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {saved.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
