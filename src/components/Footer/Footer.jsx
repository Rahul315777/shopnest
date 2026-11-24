import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMail, FiPhone, FiLock } from "react-icons/fi";
import { categories } from "../../data/products.js";

const socials = [
  { label: "Instagram", icon: FiInstagram, href: "https://instagram.com" },
  { label: "Facebook", icon: FiFacebook, href: "https://facebook.com" },
  { label: "Twitter", icon: FiTwitter, href: "https://twitter.com" },
  { label: "YouTube", icon: FiYoutube, href: "https://youtube.com" },
];

const company = [
  { label: "About us", to: "/about" },
  { label: "Contact us", to: "/contact" },
  { label: "FAQ", to: "/faq" },
  { label: "My orders", to: "/orders" },
];

const policies = [
  { label: "Privacy policy", to: "/privacy" },
  { label: "Terms & conditions", to: "/terms" },
  { label: "Shipping policy", to: "/shipping" },
  { label: "Returns & refunds", to: "/returns" },
];

const payments = ["UPI", "Visa", "Mastercard", "RuPay", "Net Banking", "Cash on Delivery"];

function Column({ title, children }) {
  return (
    <div className="text-sm">
      <h4 className="mb-3 font-semibold text-white">{title}</h4>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-extrabold text-white">
            Shop<span className="text-indigo-400">Nest</span>
          </h3>
          <p className="mt-3 max-w-sm text-sm">
            Everyday essentials across electronics, fashion, home, beauty, sports and books,
            delivered with care.
          </p>
          <div className="mt-4 space-y-1 text-sm">
            <p className="flex items-center gap-2"><FiMail /> help@shopnest.example</p>
            <p className="flex items-center gap-2"><FiPhone /> +91 98765 43210</p>
          </div>
          <div className="mt-5 flex gap-3">
            {socials.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full bg-slate-800 p-2.5 text-lg transition hover:bg-indigo-600 hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <Column title="Shop">
          {categories.map((c) => (
            <li key={c.name}>
              <Link to={`/shop?category=${encodeURIComponent(c.name)}`} className="hover:text-white">
                {c.name}
              </Link>
            </li>
          ))}
        </Column>

        <Column title="Company">
          {company.map((l) => (
            <li key={l.to}><Link to={l.to} className="hover:text-white">{l.label}</Link></li>
          ))}
        </Column>

        <Column title="Policies">
          {policies.map((l) => (
            <li key={l.to}><Link to={l.to} className="hover:text-white">{l.label}</Link></li>
          ))}
        </Column>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-xs sm:flex-row">
          <p className="flex items-center gap-2">
            <FiLock /> Secure checkout · © {new Date().getFullYear()} ShopNest. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {payments.map((p) => (
              <span key={p} className="rounded-md border border-slate-700 px-2.5 py-1 font-medium text-slate-300">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
