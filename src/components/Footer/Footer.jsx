import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <h3 className="text-xl font-bold text-white">ShopNest</h3>
          <p className="mt-2 text-sm">Everyday essentials, delivered with care.</p>
        </div>
        <div className="text-sm">
          <h4 className="mb-2 font-semibold text-white">Quick links</h4>
          <ul className="space-y-1">
            <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/orders" className="hover:text-white">My orders</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <h4 className="mb-2 font-semibold text-white">Support</h4>
          <p>help@shopnest.example</p>
        </div>
      </div>
      <p className="border-t border-slate-800 py-4 text-center text-xs">
        © {new Date().getFullYear()} ShopNest. All rights reserved.
      </p>
    </footer>
  );
}
