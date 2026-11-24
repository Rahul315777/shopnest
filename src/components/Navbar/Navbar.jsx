import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser, FiHeart, FiMoon, FiSun } from "react-icons/fi";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";

export default function Navbar() {
  const { count } = useCart();
  const { ids } = useWishlist();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link to="/" className="text-2xl font-extrabold text-indigo-600">
          Shop<span className="text-slate-800">Nest</span>
        </Link>

        <SearchBar />

        <nav className="ml-auto flex items-center gap-5 text-xl text-slate-600">
          <Link to="/shop" className="hidden text-sm font-medium hover:text-indigo-600 sm:block">
            Shop
          </Link>
          <button onClick={toggleTheme} aria-label="Toggle theme" className="hover:text-indigo-600">
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          <Link to="/wishlist" aria-label="Wishlist" className="relative hover:text-indigo-600">
            <FiHeart />
            {ids.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[11px] font-bold text-white">
                {ids.length}
              </span>
            )}
          </Link>
          {user ? (
            <Link to="/profile" aria-label="Profile" title={user.name} className="hover:text-indigo-600">
              <FiUser />
            </Link>
          ) : (
            <Link to="/login" className="text-sm font-medium hover:text-indigo-600">Log in</Link>
          )}
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
