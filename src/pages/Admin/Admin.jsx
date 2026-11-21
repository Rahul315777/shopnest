import { useState } from "react";
import { useProducts } from "../../context/ProductContext.jsx";
import { useOrders } from "../../context/OrderContext.jsx";
import { categories } from "../../data/products.js";
import { statusColor } from "../Orders/Orders.jsx";
import { formatPrice } from "../../utils/format.js";

const empty = { name: "", category: "Electronics", price: "", oldPrice: "", emoji: "📦", description: "" };

export default function Admin() {
  const { products, addProduct, deleteProduct } = useProducts();
  const { orders, updateStatus } = useOrders();
  const [form, setForm] = useState(empty);

  const revenue = orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0);

  const submit = (e) => {
    e.preventDefault();
    const price = Number(form.price);
    addProduct({ ...form, price, oldPrice: Number(form.oldPrice) || price });
    setForm(empty);
  };

  const field = "rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500";
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Admin dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        {[["Products", products.length], ["Orders", orders.length], ["Revenue", formatPrice(revenue)]].map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">{l}</p><p className="text-2xl font-bold">{v}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 font-semibold">Add product</h2>
        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-3">
          <input required placeholder="Name" value={form.name} onChange={set("name")} className={field} />
          <select value={form.category} onChange={set("category")} className={field}>
            {categories.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
          <input placeholder="Emoji" value={form.emoji} onChange={set("emoji")} className={field} />
          <input required type="number" min="1" placeholder="Price" value={form.price} onChange={set("price")} className={field} />
          <input type="number" min="1" placeholder="Old price" value={form.oldPrice} onChange={set("oldPrice")} className={field} />
          <input required placeholder="Description" value={form.description} onChange={set("description")} className={field} />
          <button className="rounded-xl bg-indigo-600 py-2 font-semibold text-white sm:col-span-3">Add product</button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 font-semibold">Products</h2>
        <div className="divide-y">
          {products.map((p) => (
            <div key={p.id} className="flex items-center justify-between py-2 text-sm">
              <span>{p.emoji} {p.name} — {formatPrice(p.price)}</span>
              <button onClick={() => deleteProduct(p.id)} className="text-rose-500 hover:underline">Delete</button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 font-semibold">Orders</h2>
        {orders.length === 0 ? <p className="text-sm text-slate-500">No orders yet.</p> : (
          <div className="divide-y">
            {orders.map((o) => (
              <div key={o.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
                <span>{o.id} · {o.userEmail} · {formatPrice(o.total)}</span>
                <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[o.status]}`}>
                  {Object.keys(statusColor).map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
