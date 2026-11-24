export const DEFAULT_MAX_PRICE = 5000;

// Turns the active shop filters into removable chips. Inactive filters produce no chip.
export function buildChips({ category, search, maxPrice, minRating, brands = [], inStock = false }) {
  const chips = [];
  if (category && category !== "All") chips.push({ key: "category", label: `Category: ${category}` });
  if (search.trim()) chips.push({ key: "search", label: `Search: "${search.trim()}"` });
  brands.forEach((b) => chips.push({ key: `brand:${b}`, label: `Brand: ${b}` }));
  if (maxPrice < DEFAULT_MAX_PRICE) chips.push({ key: "price", label: `Under ₹${maxPrice}` });
  if (minRating > 0) chips.push({ key: "rating", label: `${minRating}★ & up` });
  if (inStock) chips.push({ key: "stock", label: "In stock only" });
  return chips;
}
