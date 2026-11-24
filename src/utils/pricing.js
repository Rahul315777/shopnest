import { discountFor } from "./coupons.js";

export const FREE_SHIPPING_MIN = 999;
export const SHIPPING_FEE = 49;

// Free delivery is based on the subtotal before any coupon discount.
export function calcTotals(subtotal, coupon = null) {
  const discount = discountFor(coupon, subtotal);
  const freeShip = subtotal >= FREE_SHIPPING_MIN || coupon?.type === "shipping";
  const shipping = subtotal === 0 || freeShip ? 0 : SHIPPING_FEE;
  return { subtotal, discount, shipping, payable: subtotal - discount + shipping };
}
