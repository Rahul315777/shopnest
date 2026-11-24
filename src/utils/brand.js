import { seedBrand } from "../data/products.js";

// Products saved in the browser before brands existed fall back to the seed table.
export const brandOf = (p) => p.brand || seedBrand[p.id] || "ShopNest";

export const allBrands = (products) => [...new Set(products.map(brandOf))].sort();
