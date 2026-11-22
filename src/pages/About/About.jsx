import { Link } from "react-router-dom";
import InfoPage from "../../components/InfoPage/InfoPage.jsx";

const values = [
  { emoji: "🚚", title: "Fast delivery", text: "Free shipping on orders of ₹999 and above." },
  { emoji: "🔒", title: "Secure checkout", text: "Your details stay protected at every step." },
  { emoji: "↩️", title: "Easy returns", text: "7-day returns on eligible products." },
  { emoji: "💬", title: "Real support", text: "Friendly help whenever you need it." },
];

export default function About() {
  return (
    <InfoPage title="About ShopNest" intro="Everyday essentials, delivered with care.">
      <p className="text-slate-600">
        ShopNest brings electronics, fashion, home, beauty, sports and books together in one simple
        store. We focus on fair prices, clear product details and an easy shopping experience from
        browsing to delivery.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-3xl">{v.emoji}</p>
            <h2 className="mt-2 font-semibold">{v.title}</h2>
            <p className="text-sm text-slate-500">{v.text}</p>
          </div>
        ))}
      </div>
      <Link to="/shop" className="mt-8 inline-block rounded-xl bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-700">
        Start shopping
      </Link>
    </InfoPage>
  );
}
