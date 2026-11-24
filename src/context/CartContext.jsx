import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { useProducts } from "./ProductContext.jsx";
import { stockOf } from "../utils/stock.js";
import { validateCoupon } from "../utils/coupons.js";
import { calcTotals } from "../utils/pricing.js";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage("shopnest_cart", []);
  const [couponCode, setCouponCode] = useLocalStorage("shopnest_coupon", null);
  const { products } = useProducts();

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);

  // Live stock limit for a product id (unlimited if the product no longer exists).
  const maxFor = (id) => {
    const p = products.find((x) => x.id === id);
    return p ? stockOf(p) : Infinity;
  };

  // Adds up to the available stock. Returns { added, limited, max } so callers can show a message.
  const addToCart = (product, qty = 1) => {
    const max = maxFor(product.id);
    const inCart = items.find((i) => i.id === product.id)?.qty ?? 0;
    const added = Math.max(0, Math.min(qty, max - inCart));
    if (added > 0) {
      setItems((prev) => {
        const found = prev.find((i) => i.id === product.id);
        if (found) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + added } : i));
        return [...prev, { ...product, qty: added }];
      });
    }
    return { added, limited: added < qty, max };
  };

  const removeFromCart = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const changeQty = (id, delta) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.min(maxFor(id), Math.max(1, i.qty + delta)) } : i
      )
    );

  const clearCart = () => {
    setItems([]);
    setCouponCode(null);
  };

  // Returns { ok, coupon } or { ok: false, error }.
  const applyCoupon = (code) => {
    const res = validateCoupon(code, subtotal);
    if (res.ok) setCouponCode(res.coupon.code);
    return res;
  };

  const removeCoupon = () => setCouponCode(null);

  const value = useMemo(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    // A saved coupon stops applying if the cart no longer meets its minimum.
    const check = couponCode ? validateCoupon(couponCode, subtotal) : null;
    const coupon = check?.ok ? check.coupon : null;
    return {
      items,
      count,
      total: subtotal,
      coupon,
      ...calcTotals(subtotal, coupon),
      maxFor,
      addToCart,
      removeFromCart,
      changeQty,
      clearCart,
      applyCoupon,
      removeCoupon,
    };
  }, [items, products, couponCode]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
