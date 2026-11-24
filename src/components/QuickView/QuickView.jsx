import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { FiStar, FiX } from "react-icons/fi";
import { useCart } from "../../context/CartContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { discountPercent, formatPrice } from "../../utils/format.js";
import { stockLabel, stockOf } from "../../utils/stock.js";
import { brandOf } from "../../utils/brand.js";

export default function QuickView({ product, onClose }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const soldOut = stockOf(product) <= 0;
  const stock = stockLabel(product);
  const off = discountPercent(product.price, product.oldPrice);

  // Close on Escape and stop the page behind from scrolling.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const add = () => {
    const r = addToCart(product);
    if (r.added === 0) return showToast(`Only ${r.max} available. You already have them in your cart.`, "error");
    showToast(`${product.name} added to cart`);
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative grid w-full max-w-2xl gap-6 rounded-3xl bg-white p-6 shadow-xl sm:grid-cols-2"
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full p-2 hover:bg-slate-100">
          <FiX />
        </button>

        <div className="flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-8xl sm:h-full">
          {product.emoji}
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-500">{product.category}</span>
          <h2 className="mt-1 pr-8 text-xl font-bold">{product.name}</h2>
          <p className="text-sm text-slate-500">by {brandOf(product)}</p>
          <div className="mt-2 flex items-center gap-1 text-amber-500">
            <FiStar className="fill-current" /> {product.rating}
            <span className="text-sm text-slate-400">({product.reviews} reviews)</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold">{formatPrice(product.price)}</span>
            <span className="text-slate-400 line-through">{formatPrice(product.oldPrice)}</span>
            {off > 0 && <span className="text-sm font-semibold text-emerald-600">{off}% off</span>}
          </div>
          <p className={`mt-2 text-sm font-semibold ${stock.tone}`}>{stock.text}</p>
          <p className="mt-2 line-clamp-3 text-sm text-slate-600">{product.description}</p>

          <div className="mt-auto flex flex-col gap-2 pt-4">
            <button
              onClick={add}
              disabled={soldOut}
              className="rounded-xl bg-indigo-600 py-2.5 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:hover:bg-slate-300"
            >
              {soldOut ? "Unavailable" : "Add to cart"}
            </button>
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="rounded-xl border border-slate-300 py-2.5 text-center font-semibold hover:bg-slate-50"
            >
              View full details
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
