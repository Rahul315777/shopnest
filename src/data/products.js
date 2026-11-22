export const categories = [
  { name: "Electronics", emoji: "🎧", gradient: "from-indigo-500 to-blue-400" },
  { name: "Fashion", emoji: "👕", gradient: "from-pink-500 to-rose-400" },
  { name: "Home", emoji: "🛋️", gradient: "from-amber-500 to-orange-400" },
  { name: "Beauty", emoji: "💄", gradient: "from-fuchsia-500 to-purple-400" },
  { name: "Sports", emoji: "🏏", gradient: "from-emerald-500 to-green-400" },
  { name: "Books", emoji: "📚", gradient: "from-sky-500 to-cyan-400" },
];

const p = (id, name, category, price, oldPrice, rating, reviews, emoji, description) => ({
  id, name, category, price, oldPrice, rating, reviews, emoji, description,
});

export const products = [
  p(1, "Wireless Bluetooth Headphones", "Electronics", 2499, 3999, 4.5, 312, "🎧", "Over-ear headphones with deep bass, 30-hour battery life and a built-in mic for calls."),
  p(2, "Smart Fitness Band", "Electronics", 1799, 2999, 4.2, 198, "⌚", "Track steps, heart rate and sleep with a bright AMOLED display and 10-day battery."),
  p(3, "Portable Power Bank 20000mAh", "Electronics", 1299, 1899, 4.4, 521, "🔋", "Fast-charging power bank with dual USB ports and a USB-C input/output."),
  p(4, "Classic Cotton T-Shirt", "Fashion", 499, 799, 4.1, 874, "👕", "Soft, breathable 100% cotton tee with a relaxed everyday fit."),
  p(5, "Slim Fit Denim Jacket", "Fashion", 1999, 2999, 4.3, 143, "🧥", "A timeless denim jacket with a modern slim cut and durable stitching."),
  p(6, "Running Sneakers", "Fashion", 2299, 3499, 4.6, 402, "👟", "Lightweight sneakers with cushioned soles built for daily runs."),
  p(7, "Ceramic Coffee Mug Set", "Home", 699, 999, 4.4, 267, "☕", "Set of four hand-glazed ceramic mugs, microwave and dishwasher safe."),
  p(8, "Cozy Throw Blanket", "Home", 1199, 1699, 4.5, 189, "🛏️", "Ultra-soft fleece blanket, perfect for sofas and chilly evenings."),
  p(9, "LED Desk Lamp", "Home", 899, 1399, 4.2, 334, "💡", "Adjustable LED lamp with three brightness levels and eye-care light."),
  p(10, "Vitamin C Face Serum", "Beauty", 599, 899, 4.3, 645, "🧴", "Brightening serum with 15% Vitamin C for a smooth, glowing skin tone."),
  p(11, "Matte Lipstick Combo", "Beauty", 449, 699, 4.0, 412, "💄", "Pack of three long-wear matte lipsticks in trending everyday shades."),
  p(12, "Cricket Bat - English Willow", "Sports", 3499, 4999, 4.7, 96, "🏏", "Well-balanced English willow bat with a thick edge and comfortable grip."),
  p(13, "Yoga Mat with Strap", "Sports", 799, 1299, 4.4, 278, "🧘", "Non-slip 6mm yoga mat with a carry strap, ideal for home workouts."),
  p(14, "Stainless Steel Water Bottle", "Sports", 549, 799, 4.5, 730, "🥤", "Insulated bottle that keeps drinks cold for 24 hours and hot for 12."),
  p(15, "Atomic Habits (Paperback)", "Books", 399, 599, 4.8, 2150, "📘", "A practical guide to building good habits and breaking bad ones."),
  p(16, "The Psychology of Money", "Books", 349, 499, 4.7, 1820, "📗", "Timeless lessons on wealth, greed and happiness by Morgan Housel."),
];

export const sampleReviews = [
  { name: "Aarav S.", rating: 5, text: "Great quality for the price. Delivery was quick too!" },
  { name: "Neha K.", rating: 4, text: "Exactly as described. Would happily buy again." },
  { name: "Rohan M.", rating: 4, text: "Good value. Packaging could be a bit better." },
];

// Starting stock per product id. Products added later (e.g. from admin) carry their own `stock`.
export const seedStock = {
  1: 12, 2: 5, 3: 30, 4: 40, 5: 3, 6: 18, 7: 25, 8: 0,
  9: 14, 10: 2, 11: 20, 12: 6, 13: 9, 14: 50, 15: 15, 16: 8,
};
