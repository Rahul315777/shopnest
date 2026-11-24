import { seedStock } from "../data/products.js";

// Products saved in the browser before stock existed fall back to the seed table.
export const stockOf = (p) => p.stock ?? seedStock[p.id] ?? 25;

export function stockLabel(p) {
  const n = stockOf(p);
  if (n <= 0) return { text: "Out of stock", tone: "text-rose-600" };
  if (n <= 5) return { text: `Only ${n} left`, tone: "text-amber-600" };
  return { text: "In stock", tone: "text-emerald-600" };
}
