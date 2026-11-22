// Derived lists, so no product data changes are needed.
export const bestSellers = (products, n = 4) =>
  [...products].sort((a, b) => b.reviews - a.reviews).slice(0, n);

export const trending = (products, n = 4) => {
  const sold = new Set(bestSellers(products).map((p) => p.id));
  return [...products]
    .filter((p) => !sold.has(p.id))
    .sort((a, b) => b.rating * Math.log10(b.reviews + 10) - a.rating * Math.log10(a.reviews + 10))
    .slice(0, n);
};

// Highest ids are the most recently added (including products added from admin).
export const newArrivals = (products, n = 4) =>
  [...products].sort((a, b) => b.id - a.id).slice(0, n);
