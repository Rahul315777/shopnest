import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const res = login(form);
    if (!res.ok) return setError(res.error);
    navigate(location.state?.from || "/", { replace: true });
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8">
      <h1 className="text-2xl font-bold">Welcome back</h1>
      <p className="mt-1 text-sm text-slate-500">Log in to continue shopping.</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input type="email" required placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500" />
        <input type="password" required placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500" />
        {error && <p className="text-sm text-rose-500">{error}</p>}
        <button className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700">Log in</button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        New here? <Link to="/signup" className="font-medium text-indigo-600">Create an account</Link>
      </p>
      <p className="mt-3 text-center text-xs text-slate-400">Demo admin: admin@shopnest.com / admin123</p>
    </div>
  );
}
