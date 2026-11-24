import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const CompareContext = createContext(null);
export const MAX_COMPARE = 3;

export function CompareProvider({ children }) {
  const [ids, setIds] = useLocalStorage("shopnest_compare", []);

  // Adds or removes a product. Returns { ok } or { ok: false, error }.
  const toggle = (id) => {
    if (ids.includes(id)) {
      setIds((prev) => prev.filter((x) => x !== id));
      return { ok: true };
    }
    if (ids.length >= MAX_COMPARE) {
      return { ok: false, error: `You can compare up to ${MAX_COMPARE} products.` };
    }
    setIds((prev) => [...prev, id]);
    return { ok: true };
  };

  const remove = (id) => setIds((prev) => prev.filter((x) => x !== id));
  const clear = () => setIds([]);

  const value = useMemo(
    () => ({ ids, has: (id) => ids.includes(id), toggle, remove, clear }),
    [ids]
  );
  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export const useCompare = () => useContext(CompareContext);
