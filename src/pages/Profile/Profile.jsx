import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useOrders } from "../../context/OrderContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";

export default function Profile() {
  const { user, isAdmin, logout, updateProfile } = useAuth();
  const { orders } = useOrders();
  const { ids } = useWishlist();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [saved, setSaved] = useState(false);

  const save = (e) => {
    e.preventDefault();
    updateProfile(name.trim() || user.name);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const myOrders = orders.filter((o) => o.userEmail === user.email);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
          {user.name[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-sm text-slate-500">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <Link to="/orders" className="rounded-2xl border border-slate-200 bg-white p-4 hover:shadow">
          <p className="text-2xl font-bold">{myOrders.length}</p><p className="text-sm text-slate-500">Orders</p>
        </Link>
        <Link to="/wishlist" className="rounded-2xl border border-slate-200 bg-white p-4 hover:shadow">
          <p className="text-2xl font-bold">{ids.length}</p><p className="text-sm text-slate-500">Wishlist items</p>
        </Link>
      </div>

      <form onSubmit={save} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-semibold">Edit profile</h2>
        <input value={name} onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500" />
        <button className="rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700">
          {saved ? "Saved ✓" : "Save changes"}
        </button>
      </form>

      <div className="flex gap-3">
        {isAdmin && (
          <Link to="/admin" className="rounded-xl border border-indigo-600 px-5 py-2 font-semibold text-indigo-600">Admin dashboard</Link>
        )}
        <button onClick={() => { logout(); navigate("/"); }}
          className="rounded-xl border border-rose-400 px-5 py-2 font-semibold text-rose-500">Log out</button>
      </div>
    </div>
  );
}
