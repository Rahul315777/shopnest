import { bestSellers, newArrivals, trending } from "./productLists.js";

// Returns { [productId]: ["Bestseller", "New", ...] } using the same lists as the home sections.
export function computeBadges(products) {
  const map = {};
  const add = (list, label) =>
    list.forEach((p) => {
      (map[p.id] ||= []).push(label);
    });

  add(bestSellers(products), "Bestseller");
  add(trending(products), "Trending");
  add(newArrivals(products), "New");
  return map;
}
