import { useState } from "react";
import { FiTag, FiX } from "react-icons/fi";
import { coupons } from "../../data/coupons.js";

export default function CouponBox({ subtotal, coupon, applyCoupon, removeCoupon }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const apply = (value) => {
    const res = applyCoupon(value);
    setError(res.ok ? "" : res.error);
    if (res.ok) setCode("");
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold"><FiTag /> Coupon</h3>

      {coupon ? (
        <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          <span><b>{coupon.code}</b> applied · {coupon.label}</span>
          <button onClick={removeCoupon} aria-label="Remove coupon" className="rounded-full p-1 hover:bg-emerald-100">
            <FiX />
          </button>
        </div>
      ) : (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              apply(code);
            }}
            className="flex gap-2"
          >
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code"
              aria-label="Coupon code"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm uppercase outline-none focus:border-indigo-500"
            />
            <button className="rounded-xl bg-slate-800 px-4 text-sm font-semibold text-white hover:bg-slate-700">Apply</button>
          </form>
          {error && <p className="mt-2 text-xs text-rose-500">{error}</p>}
          <ul className="mt-3 space-y-1">
            {coupons.map((c) => (
              <li key={c.code} className="flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  <b className="text-slate-700">{c.code}</b> · {c.label} (min ₹{c.min})
                </span>
                <button
                  onClick={() => apply(c.code)}
                  disabled={subtotal < c.min}
                  className="font-semibold text-indigo-600 hover:underline disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline"
                >
                  Apply
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
