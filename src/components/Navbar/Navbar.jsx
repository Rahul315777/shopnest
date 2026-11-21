import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import { useCart } from "../../context/CartContext.jsx";
import { useProducts } from "../../context/ProductContext.jsx";

export default function Navbar() {
  const { count } = useCart();
  const { search, setSearch } = useProducts();
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    navigate("/shop");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link to="/" className="text-2xl font-extrabold text-indigo-600">
          Shop<span className="text-slate-800">Nest</span>
        </Link>

        <form onSubmit={onSearch} className="relative mx-auto hidden w-full max-w-md md:block">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-400"
          />
        </form>

        <nav className="ml-auto flex items-center gap-5 text-xl text-slate-600">
          <Link to="/shop" className="hidden text-sm font-medium hover:text-indigo-600 sm:block">
            Shop
          </Link>
          <Link to="/profile" aria-label="Profile" className="hover:text-indigo-600">
            <FiUser />
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative hover:text-indigo-600">
            <FiShoppingCart />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
