export const formatPrice = (n) => "₹" + Number(n).toLocaleString("en-IN");

export const discountPercent = (price, oldPrice) =>
  oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
