// Sample policy text for a demo store. Review and adapt before using for a real business.
export const policies = {
  privacy: {
    title: "Privacy policy",
    sections: [
      { h: "Information we collect", p: "We collect the details you give us when you create an account or place an order, such as your name, email, phone number and delivery address." },
      { h: "How we use it", p: "Your information is used to process orders, deliver products, provide support and improve the store. We do not sell your personal data." },
      { h: "Cookies and local storage", p: "ShopNest stores your cart, wishlist and theme choice in your browser so they are still there when you return." },
      { h: "Your choices", p: "You can edit your profile at any time and ask us to delete your account by contacting support." },
    ],
  },
  terms: {
    title: "Terms & conditions",
    sections: [
      { h: "Using ShopNest", p: "By using this site you agree to provide accurate information and to use the store only for lawful purposes." },
      { h: "Orders and pricing", p: "All prices are in Indian rupees and may change without notice. An order is confirmed once you receive an order ID." },
      { h: "Accounts", p: "You are responsible for keeping your password safe and for activity under your account." },
      { h: "Changes", p: "We may update these terms from time to time. Continued use of the store means you accept the updated terms." },
    ],
  },
  shipping: {
    title: "Shipping policy",
    sections: [
      { h: "Delivery time", p: "Most orders are delivered within 3 to 7 working days, depending on your location." },
      { h: "Shipping charges", p: "Orders of ₹999 or more ship free. A flat charge of ₹49 applies to smaller orders." },
      { h: "Tracking", p: "You can follow the status of every order from the My orders page." },
      { h: "Delays", p: "Weather, festivals or courier issues can cause delays. We will keep your order status updated." },
    ],
  },
  returns: {
    title: "Returns & refunds",
    sections: [
      { h: "Return window", p: "You can request a return within 7 days of delivery if the item is unused and in its original packaging." },
      { h: "Cancellations", p: "Orders can be cancelled from My orders while the status is still Placed." },
      { h: "Refunds", p: "Approved refunds are sent to the original payment method within 5 to 7 working days. Cash on delivery refunds are sent by bank transfer." },
      { h: "Non-returnable items", p: "Opened beauty products and personal care items cannot be returned for hygiene reasons." },
    ],
  },
};

export const faqs = [
  { q: "How long does delivery take?", a: "Most orders arrive in 3 to 7 working days. You can follow your order on the My orders page." },
  { q: "Is shipping free?", a: "Yes, on orders of ₹999 or more. Smaller orders pay a flat ₹49." },
  { q: "Which payment methods do you accept?", a: "UPI, cards, net banking and cash on delivery." },
  { q: "Can I cancel my order?", a: "Yes. Open My orders and choose Cancel order while the status is Placed." },
  { q: "How do I return a product?", a: "Returns are accepted within 7 days of delivery for unused items. See the Returns & refunds page for details." },
  { q: "I forgot my password. What do I do?", a: "Contact support from the Contact page and we will help you get back into your account." },
];
