function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="h-44 bg-slate-200" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 rounded bg-slate-200" />
        <div className="h-4 w-full rounded bg-slate-200" />
        <div className="h-3 w-1/2 rounded bg-slate-200" />
        <div className="h-5 w-2/5 rounded bg-slate-200" />
        <div className="h-9 w-full rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

export default function ProductSkeleton({ count = 8 }) {
  return Array.from({ length: count }, (_, i) => <SkeletonCard key={i} />);
}
