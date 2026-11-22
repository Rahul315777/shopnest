import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Returns e.g. [1, "…", 4, 5, 6, "…", 12]
function pageList(page, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, page - 1, page, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("…");
    out.push(p);
  });
  return out;
}

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const btn = "flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-300 px-2 text-sm";

  return (
    <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button onClick={() => onChange(page - 1)} disabled={page === 1} aria-label="Previous page"
        className={`${btn} hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40`}>
        <FiChevronLeft />
      </button>
      {pageList(page, totalPages).map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-1 text-slate-400">…</span>
        ) : (
          <button key={p} onClick={() => onChange(p)} aria-current={p === page ? "page" : undefined}
            className={`${btn} ${p === page ? "border-indigo-600 bg-indigo-600 font-semibold text-white" : "hover:bg-slate-100"}`}>
            {p}
          </button>
        )
      )}
      <button onClick={() => onChange(page + 1)} disabled={page === totalPages} aria-label="Next page"
        className={`${btn} hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40`}>
        <FiChevronRight />
      </button>
    </nav>
  );
}
