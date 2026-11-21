import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

// items: [{ label: "Shop", to: "/shop" }, { label: "Current page" }]
// The last item has no "to" and is shown as the current page.
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm text-slate-500">
      <Link to="/" className="hover:text-indigo-600">Home</Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1">
          <FiChevronRight className="text-slate-400" />
          {item.to ? (
            <Link to={item.to} className="hover:text-indigo-600">{item.label}</Link>
          ) : (
            <span className="font-medium text-slate-700">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
