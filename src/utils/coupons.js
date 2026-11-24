import { coupons } from "../data/coupons.js";

export const findCoupon = (code) =>
  coupons.find((c) => c.code === String(code || "").trim().toUpperCase());

export function discountFor(coupon, subtotal) {
  if (!coupon || subtotal < coupon.min) return 0;
  if (coupon.type === "percent") {
    return Math.min(Math.round((subtotal * coupon.value) / 100), coupon.max ?? Infinity);
  }
  if (coupon.type === "flat") return Math.min(coupon.value, subtotal);
  return 0;
}

// Returns { ok, coupon } or { ok: false, error }.
export function validateCoupon(code, subtotal) {
  const coupon = findCoupon(code);
  if (!coupon) return { ok: false, error: "That coupon code is not valid." };
  if (subtotal < coupon.min) {
    return { ok: false, error: `Add items worth ₹${coupon.min - subtotal} more to use ${coupon.code}.` };
  }
  return { ok: true, coupon };
}
