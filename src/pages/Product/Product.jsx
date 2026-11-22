import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiMinus, FiPlus, FiStar } from "react-icons/fi";
import { useProducts } from "../../context/ProductContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ZoomImage from "../../components/ZoomImage/ZoomImage.jsx";
import { sampleReviews } from "../../data/products.js";
import { discountPercent, formatPrice } from "../../utils/format.js";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, getProduct } = useProducts();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = getProduct(id);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/shop" className="mt-3 inline-block text-indigo-600 hover:underline">Back to shop</Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const buyNow = () => {
    addToCart(product, qty);
    navigate("/checkout");
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Shop", to: "/shop" },
          { label: product.category, to: `/shop?category=${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="grid gap-8 md:grid-cols-2">
        <ZoomImage className="h-80 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 text-9xl">
          {product.emoji}
        </ZoomImage>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-500">{product.category}</span>
          <h1 className="mt-1 text-3xl font-bold">{product.name}</h1>
          <div className="mt-2 flex items-center gap-1 text-amber-500">
            <FiStar className="fill-current" /> {product.rating}
            <span className="text-sm text-slate-400">({product.reviews} reviews)</span>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold">{formatPrice(product.price)}</span>
            <span className="text-slate-400 line-through">{formatPrice(product.oldPrice)}</span>
            <span className="font-semibold text-emerald-600">{discountPercent(product.price, product.oldPrice)}% off</span>
          </div>
          <p className="mt-4 text-slate-600">{product.description}</p>

          <div className="mt-6 inline-flex items-center rounded-full border border-slate-300">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3" aria-label="Decrease"><FiMinus /></button>
            <span className="w-10 text-center font-semibold">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="p-3" aria-label="Increase"><FiPlus /></button>
          </div>

          <div className="mt-5 flex gap-3">
            <button onClick={handleAdd} className="flex-1 rounded-xl border-2 border-indigo-600 py-3 font-semibold text-indigo-600 hover:bg-indigo-50">
              {added ? "Added ✓" : "Add to cart"}
            </button>
            <button onClick={buyNow} className="flex-1 rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700">
              Buy now
            </button>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-bold">Customer reviews</h2>
        <div className="space-y-3">
          {sampleReviews.map((r) => (
            <div key={r.name} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{r.name}</span>
                <span className="text-amber-500">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">Related products</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
