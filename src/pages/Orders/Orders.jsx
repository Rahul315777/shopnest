import { Link, useLocation } from "react-router-dom";
import { useOrders } from "../../context/OrderContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { formatPrice } from "../../utils/format.js";

export const statusColor = {
  Placed: "bg-blue-100 text-blue-700",
  Shipped: "bg-amber-100 text-amber-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-rose-100 text-rose-700",
};

export default function Orders() {
  const { orders, updateStatus } = useOrders();
  const { user } = useAuth();
  const location = useLocation();
  const mine = orders.filter((o) => o.userEmail === user.email);

  return (
    <div>
      {location.state?.placed && (
        <div className="mb-4 rounded-xl bg-emerald-50 p-4 text-emerald-700">
          🎉 Order <b>{location.state.placed}</b> placed successfully!
        </div>
      )}
      <h1 className="mb-4 text-2xl font-bold">My orders</h1>
      {mine.length === 0 ? (
        <div className="py-16 text-center text-slate-500">
          No orders yet. <Link to="/shop" className="text-indigo-600 hover:underline">Start shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {mine.map((o) => (
            <div key={o.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">Order {o.id}</p>
                  <p className="text-xs text-slate-500">{new Date(o.date).toLocaleString("en-IN")}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[o.status]}`}>{o.status}</span>
              </div>
              <ul className="mt-3 space-y-1 text-sm">
                {o.items.map((i) => (
                  <li key={i.id}>{i.emoji} {i.name} × {i.qty} — {formatPrice(i.price * i.qty)}</li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between border-t pt-3">
                <span className="font-bold">{formatPrice(o.total)}</span>
                {o.status === "Placed" && (
                  <button onClick={() => updateStatus(o.id, "Cancelled")} className="text-sm text-rose-500 hover:underline">
                    Cancel order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
