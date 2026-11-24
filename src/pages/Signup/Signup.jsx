import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    const res = signup(form);
    if (!res.ok) return setError(res.error);
    navigate("/", { replace: true });
  };

  const field = "w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500";

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8">
      <h1 className="text-2xl font-bold">Create your account</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input required placeholder="Full name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} />
        <input type="email" required placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} />
        <input type="password" required placeholder="Password (min 6 characters)" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} className={field} />
        {error && <p className="text-sm text-rose-500">{error}</p>}
        <button className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700">Sign up</button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        Already have an account? <Link to="/login" className="font-medium text-indigo-600">Log in</Link>
      </p>
    </div>
  );
}
