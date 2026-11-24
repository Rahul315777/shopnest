import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiHeart, FiStar } from "react-icons/fi";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useProducts } from "../../context/ProductContext.jsx";
import { useCompare } from "../../context/CompareContext.jsx";
import Badges from "../Badges/Badges.jsx";
import QuickView from "../QuickView/QuickView.jsx";
import { discountPercent, formatPrice } from "../../utils/format.js";
import { stockLabel, stockOf } from "../../utils/stock.js";

// view: "grid" (default) or "list" (horizontal layout used on the shop page)
export default function ProductCard({ product, view = "grid" }) {
  const { addToCart } = useCart();
  const { isWished, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const { badges } = useProducts();
  const { has, toggle } = useCompare();
  const [quick, setQuick] = useState(false);
  const compared = has(product.id);
  const wished = isWished(product.id);
  const off = discountPercent(product.price, product.oldPrice);
  const isList = view === "list";
  const soldOut = stockOf(product) <= 0;
  const stock = stockLabel(product);

  const handleAdd = () => {
    const r = addToCart(product);
    if (r.added === 0) showToast(`Only ${r.max} available. You already have them in your cart.`, "error");
    else showToast(`${product.name} added to cart`);
  };

  const handleCompare = () => {
    const r = toggle(product.id);
    if (!r.ok) showToast(r.error, "error");
  };

  const handleWish = () => {
    toggleWishlist(product.id);
    showToast(wished ? "Removed from wishlist" : "Added to wishlist ♥", wished ? "info" : "success");
  };

  return (
    <div className={`group relative flex overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg ${isList ? "flex-row" : "flex-col"}`}>
      <Link
        to={`/product/${product.id}`}
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 ${
          isList ? "min-h-40 w-36 shrink-0 text-6xl sm:w-52" : "h-44 text-7xl"
        }`}
      >
        <span className="transition-transform duration-300 group-hover:scale-125">{product.emoji}</span>
        <Badges tags={badges[product.id]} className="absolute bottom-2 left-2 z-10" />
        {soldOut && (
          <span className="absolute inset-0 flex items-center justify-center bg-slate-900/50 text-sm font-bold uppercase tracking-wide text-white">
            Out of stock
          </span>
        )}
        {off > 0 && !soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2 py-0.5 text-xs font-bold text-white">
            {off}% OFF
          </span>
        )}
      </Link>
      <button
        onClick={handleWish}
        aria-label="Toggle wishlist"
        className="absolute right-3 top-3 rounded-full bg-white p-2 shadow hover:scale-110"
      >
        <FiHeart className={wished ? "fill-rose-500 text-rose-500" : "text-slate-500"} />
      </button>

      <button
        onClick={() => setQuick(true)}
        aria-label="Quick view"
        className="absolute right-3 top-14 rounded-full bg-white p-2 shadow transition hover:scale-110 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <FiEye className="text-slate-500" />
      </button>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-indigo-500">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`} className="line-clamp-2 font-semibold hover:text-indigo-600">
          {product.name}
        </Link>
        {isList && (
          <p className="line-clamp-2 hidden text-sm text-slate-500 sm:block">{product.description}</p>
        )}
        <div className="flex items-center gap-1 text-sm text-amber-500">
          <FiStar className="fill-current" /> {product.rating}
          <span className="text-slate-400">({product.reviews})</span>
        </div>
        <p className={`text-xs font-medium ${stock.tone}`}>{stock.text}</p>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-lg font-bold">{formatPrice(product.price)}</span>
          <span className="text-sm text-slate-400 line-through">{formatPrice(product.oldPrice)}</span>
        </div>
        <button
          onClick={handleAdd}
          disabled={soldOut}
          className={`mt-2 rounded-xl bg-indigo-600 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:hover:bg-slate-300 ${isList ? "sm:w-44" : ""}`}
        >
          {soldOut ? "Unavailable" : "Add to cart"}
        </button>
        <label className="mt-1 flex cursor-pointer items-center gap-2 text-xs text-slate-500">
          <input type="checkbox" checked={compared} onChange={handleCompare} className="accent-indigo-600" />
          Compare
        </label>
        {quick && <QuickView product={product} onClose={() => setQuick(false)} />}
      </div>
    </div>
  );
}
