import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useOrders } from "../../context/OrderContext.jsx";
import { formatPrice } from "../../utils/format.js";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ name: user?.name || "", phone: "", line: "", city: "", pin: "" });
  const [payment, setPayment] = useState("Cash on Delivery");
  const [error, setError] = useState("");

  const shipping = total >= 999 ? 0 : 49;
  const grand = total + shipping;

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-500">Nothing to check out.</p>
        <Link to="/shop" className="text-indigo-600 hover:underline">Go shopping</Link>
      </div>
    );
  }

  const submit = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(address.phone)) return setError("Enter a valid 10-digit phone number.");
    if (!/^\d{6}$/.test(address.pin)) return setError("Enter a valid 6-digit PIN code.");
    const order = placeOrder({ userEmail: user.email, items, total: grand, address, payment });
    clearCart();
    navigate("/orders", { state: { placed: order.id } });
  };

  const field = "w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500";
  const set = (k) => (e) => setAddress({ ...address, [k]: e.target.value });

  return (
    <form onSubmit={submit} className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">Delivery address</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="Full name" value={address.name} onChange={set("name")} className={field} />
            <input required placeholder="Phone (10 digits)" value={address.phone} onChange={set("phone")} className={field} />
            <input required placeholder="Address line" value={address.line} onChange={set("line")} className={`${field} sm:col-span-2`} />
            <input required placeholder="City" value={address.city} onChange={set("city")} className={field} />
            <input required placeholder="PIN code" value={address.pin} onChange={set("pin")} className={field} />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">Payment method</h2>
          {["Cash on Delivery", "UPI", "Card"].map((m) => (
            <label key={m} className="mb-2 flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3">
              <input type="radio" name="pay" checked={payment === m} onChange={() => setPayment(m)} className="accent-indigo-600" />
              {m}
            </label>
          ))}
          <p className="text-xs text-slate-400">Demo store — no real payment is processed.</p>
        </section>
      </div>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold">Your order</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {items.map((i) => (
            <li key={i.id} className="flex justify-between gap-2">
              <span>{i.emoji} {i.name} × {i.qty}</span>
              <span>{formatPrice(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between text-sm"><span>Shipping</span><span>{shipping ? formatPrice(shipping) : "Free"}</span></div>
        <div className="mt-3 flex justify-between border-t pt-3 text-lg font-bold"><span>Total</span><span>{formatPrice(grand)}</span></div>
        {error && <p className="mt-3 text-sm text-rose-500">{error}</p>}
        <button className="mt-4 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700">Place order</button>
      </aside>
    </form>
  );
}
