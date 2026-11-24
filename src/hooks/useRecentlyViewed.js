import useLocalStorage from "./useLocalStorage.js";

const MAX = 8;

// Remembers the ids of the last few products opened, newest first.
export default function useRecentlyViewed() {
  const [ids, setIds] = useLocalStorage("shopnest_recently_viewed", []);

  const track = (id) => setIds((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, MAX));
  const clear = () => setIds([]);

  return { ids, track, clear };
}
