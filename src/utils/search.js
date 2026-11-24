import { brandOf } from "./brand.js";

// Ranks products for a search query: name matches first, then brand/category.
export function searchProducts(products, query, limit = 5) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return products
    .map((p) => {
      const name = p.name.toLowerCase();
      let score = 0;
      if (name.startsWith(q)) score = 4;
      else if (name.split(" ").some((w) => w.startsWith(q))) score = 3;
      else if (name.includes(q)) score = 2;
      else if (brandOf(p).toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) score = 1;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.rating - a.p.rating)
    .slice(0, limit)
    .map((x) => x.p);
}
