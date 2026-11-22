import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="text-8xl font-extrabold text-indigo-600">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-slate-500">The page you are looking for doesn't exist or has moved.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/" className="rounded-xl bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-700">
          Go home
        </Link>
        <Link to="/shop" className="rounded-xl border border-indigo-600 px-6 py-2 font-semibold text-indigo-600 hover:bg-indigo-50">
          Browse shop
        </Link>
      </div>
    </div>
  );
}
