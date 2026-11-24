import { useEffect, useState } from "react";

// Shows a loading state briefly on mount. Swap for real fetch state once an API exists.
export default function useSimulatedLoading(ms = 600) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
  }, [ms]);

  return loading;
}
