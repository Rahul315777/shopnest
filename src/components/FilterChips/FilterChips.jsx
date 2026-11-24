import { FiX } from "react-icons/fi";

export default function FilterChips({ chips, onRemove, onClear }) {
  if (chips.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <span
          key={c.key}
          className="flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950"
        >
          {c.label}
          <button onClick={() => onRemove(c.key)} aria-label={`Remove ${c.label}`} className="rounded-full p-0.5 hover:bg-indigo-200">
            <FiX />
          </button>
        </span>
      ))}
      <button onClick={onClear} className="text-sm font-medium text-rose-500 hover:underline">
        Clear all
      </button>
    </div>
  );
}
