import { FiTruck } from "react-icons/fi";
import { FREE_SHIPPING_MIN } from "../../utils/pricing.js";
import { formatPrice } from "../../utils/format.js";

export default function FreeShippingBar({ subtotal }) {
  if (subtotal <= 0) return null;

  const left = FREE_SHIPPING_MIN - subtotal;
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_MIN) * 100));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="flex items-center gap-2 text-sm font-medium">
        <FiTruck className="text-indigo-600" />
        {left > 0 ? (
          <>Add <b>{formatPrice(left)}</b> more for free delivery</>
        ) : (
          <span className="text-emerald-600">You've unlocked free delivery 🎉</span>
        )}
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all duration-500 ${left > 0 ? "bg-indigo-600" : "bg-emerald-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
