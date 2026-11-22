const styles = {
  Bestseller: "bg-amber-500 text-white",
  Trending: "bg-rose-500 text-white",
  New: "bg-emerald-500 text-white",
};

const icons = { Bestseller: "🏆", Trending: "🔥", New: "✨" };

// Shows at most `max` badges so cards stay tidy.
export default function Badges({ tags = [], max = 2, className = "" }) {
  if (tags.length === 0) return null;
  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {tags.slice(0, max).map((t) => (
        <span key={t} className={`rounded-full px-2 py-0.5 text-[11px] font-bold shadow-sm ${styles[t]}`}>
          {icons[t]} {t}
        </span>
      ))}
    </div>
  );
}
