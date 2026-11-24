import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../../context/CartContext.jsx";
import FreeShippingBar from "../../components/FreeShippingBar/FreeShippingBar.jsx";
import CouponBox from "../../components/CouponBox/CouponBox.jsx";
import { formatPrice } from "../../utils/format.js";

export default function Cart() {
  const {
    items, total, count, coupon, discount, shipping, payable,
    maxFor, changeQty, removeFromCart, clearCart, applyCoupon, removeCoupon,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-6xl">🛒</p>
        <h2 className="mt-4 text-2xl font-bold">Your cart is empty</h2>
        <Link to="/shop" className="mt-4 inline-block rounded-full bg-indigo-600 px-6 py-2 font-semibold text-white">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Shopping cart ({count})</h1>
          <button onClick={clearCart} className="text-sm text-rose-500 hover:underline">
            Clear cart
          </button>
        </div>
        <FreeShippingBar subtotal={total} />
        {items.map((i) => (
          <div key={i.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
            <Link to={`/product/${i.id}`} className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-4xl">
              {i.emoji}
            </Link>
            <div className="flex-1">
              <Link to={`/product/${i.id}`} className="font-semibold hover:text-indigo-600">{i.name}</Link>
              <p className="text-sm text-slate-500">{formatPrice(i.price)} each</p>
              <div className="mt-2 inline-flex items-center rounded-full border border-slate-200">
                <button onClick={() => changeQty(i.id, -1)} className="p-2" aria-label="Decrease"><FiMinus /></button>
                <span className="w-8 text-center text-sm font-semibold">{i.qty}</span>
                <button
                  onClick={() => changeQty(i.id, 1)}
                  disabled={i.qty >= maxFor(i.id)}
                  className="p-2 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Increase"
                >
                  <FiPlus />
                </button>
              </div>
              {i.qty >= maxFor(i.id) && (
                <p className="mt-1 text-xs text-amber-600">Only {maxFor(i.id)} available</p>
              )}
            </div>
            <div className="text-right">
              <p className="font-bold">{formatPrice(i.price * i.qty)}</p>
              <button onClick={() => removeFromCart(i.id)} className="mt-2 text-rose-500" aria-label="Remove">
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold">Order summary</h2>
        <div className="mt-4 flex justify-between text-sm"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
        {discount > 0 && (
          <div className="mt-2 flex justify-between text-sm text-emerald-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>
        )}
        <div className="mt-2 flex justify-between text-sm"><span>Shipping</span><span>{shipping ? formatPrice(shipping) : "Free"}</span></div>
        <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
          <span>Total</span><span>{formatPrice(payable)}</span>
        </div>
        <CouponBox subtotal={total} coupon={coupon} applyCoupon={applyCoupon} removeCoupon={removeCoupon} />
        <Link to="/checkout" className="mt-5 block rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white hover:bg-indigo-700">
          Proceed to checkout
        </Link>
      </aside>
    </div>
  );
}
