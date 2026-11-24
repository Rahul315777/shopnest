import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiClock, FiSearch, FiX } from "react-icons/fi";
import { useProducts } from "../../context/ProductContext.jsx";
import useDebounce from "../../hooks/useDebounce.js";
import useRecentSearches from "../../hooks/useRecentSearches.js";
import { searchProducts } from "../../utils/search.js";
import { brandOf } from "../../utils/brand.js";
import { formatPrice } from "../../utils/format.js";

export default function SearchBar() {
  const { products, search, setSearch } = useProducts();
  const navigate = useNavigate();
  const wrapRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const { recent, add, remove, clear } = useRecentSearches();

  const debounced = useDebounce(search, 250);
  const suggestions = useMemo(() => searchProducts(products, debounced), [products, debounced]);
  const showList = open && search.trim() !== "";
  const showRecent = open && search.trim() === "" && recent.length > 0;

  // Close the dropdown when clicking outside of it.
  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => setActive(-1), [debounced]);

  const goToProduct = (id) => {
    add(search);
    setOpen(false);
    navigate(`/product/${id}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (active >= 0 && suggestions[active]) return goToProduct(suggestions[active].id);
    add(search);
    setOpen(false);
    navigate("/shop");
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") return setOpen(false);
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % suggestions.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    }
  };

  return (
    <div ref={wrapRef} className="relative mx-auto hidden w-full max-w-md md:block">
      <form onSubmit={onSubmit}>
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search products..."
          aria-label="Search products"
          autoComplete="off"
          className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-400"
        />
      </form>

      {showRecent && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <div className="flex items-center justify-between px-4 pt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Recent searches
            <button type="button" onMouseDown={clear} className="normal-case text-indigo-600 hover:underline">
              Clear all
            </button>
          </div>
          <ul className="py-1">
            {recent.map((term) => (
              <li key={term} className="flex items-center hover:bg-slate-50">
                <button
                  type="button"
                  onMouseDown={() => {
                    setSearch(term);
                    add(term);
                    setOpen(false);
                    navigate("/shop");
                  }}
                  className="flex flex-1 items-center gap-3 px-4 py-2 text-left text-sm"
                >
                  <FiClock className="text-slate-400" /> {term}
                </button>
                <button
                  type="button"
                  onMouseDown={() => remove(term)}
                  aria-label={`Remove ${term}`}
                  className="px-3 text-slate-400 hover:text-rose-500"
                >
                  <FiX />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showList && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
        >
          {suggestions.length === 0 ? (
            <li className="px-4 py-3 text-sm text-slate-500">No products found for "{search.trim()}"</li>
          ) : (
            suggestions.map((p, i) => (
              <li key={p.id} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  onMouseDown={() => goToProduct(p.id)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-3 px-4 py-2 text-left ${i === active ? "bg-indigo-50 dark:bg-slate-800" : ""}`}
                >
                  <span className="text-2xl">{p.emoji}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{p.name}</span>
                    <span className="block text-xs text-slate-500">{brandOf(p)} · {p.category}</span>
                  </span>
                  <span className="text-sm font-semibold">{formatPrice(p.price)}</span>
                </button>
              </li>
            ))
          )}
          {suggestions.length > 0 && (
            <li>
              <button
                type="button"
                onMouseDown={() => {
                  add(search);
                  setOpen(false);
                  navigate("/shop");
                }}
                className="w-full border-t border-slate-200 px-4 py-2 text-left text-sm font-medium text-indigo-600 hover:bg-slate-50"
              >
                See all results for "{search.trim()}"
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
