import { createContext, useContext, useMemo, useState } from "react";
import { products as seed } from "../data/products.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { computeBadges } from "../utils/badges.js";
import { stockOf } from "../utils/stock.js";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useLocalStorage("shopnest_products", seed);
  const [search, setSearch] = useState("");

  const getProduct = (id) => products.find((p) => p.id === Number(id));

  const addProduct = (data) =>
    setProducts((prev) => [
      ...prev,
      { ...data, id: Math.max(0, ...prev.map((p) => p.id)) + 1, rating: 4, reviews: 0 },
    ]);

  // Lowers stock after an order is placed (items: [{ id, qty }]).
  const reduceStock = (items) =>
    setProducts((prev) =>
      prev.map((p) => {
        const it = items.find((i) => i.id === p.id);
        return it ? { ...p, stock: Math.max(0, stockOf(p) - it.qty) } : p;
      })
    );

  // Puts stock back when an order is cancelled.
  const restockItems = (items) =>
    setProducts((prev) =>
      prev.map((p) => {
        const it = items.find((i) => i.id === p.id);
        return it ? { ...p, stock: stockOf(p) + it.qty } : p;
      })
    );

  const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  const value = useMemo(
    () => ({
      products,
      badges: computeBadges(products),
      search,
      setSearch,
      getProduct,
      addProduct,
      deleteProduct,
      reduceStock,
      restockItems,
    }),
    [products, search]
  );
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export const useProducts = () => useContext(ProductContext);
