import { createContext, useContext, useMemo, useState } from "react";
import { products as seed } from "../data/products.js";
import useLocalStorage from "../hooks/useLocalStorage.js";

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

  const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  const value = useMemo(
    () => ({ products, search, setSearch, getProduct, addProduct, deleteProduct }),
    [products, search]
  );
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export const useProducts = () => useContext(ProductContext);
