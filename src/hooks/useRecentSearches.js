import useLocalStorage from "./useLocalStorage.js";

const MAX = 5;

// Keeps the last few search terms, newest first, without duplicates.
export default function useRecentSearches() {
  const [recent, setRecent] = useLocalStorage("shopnest_recent_searches", []);

  const add = (term) => {
    const t = term.trim();
    if (!t) return;
    setRecent((prev) => [t, ...prev.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, MAX));
  };

  const remove = (term) => setRecent((prev) => prev.filter((x) => x !== term));
  const clear = () => setRecent([]);

  return { recent, add, remove, clear };
}
