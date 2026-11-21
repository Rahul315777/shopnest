import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 px-8 py-14 text-white">
      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-100">New season sale</p>
      <h1 className="mt-2 max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl">
        Everything you love, up to 40% off.
      </h1>
      <p className="mt-3 max-w-lg text-indigo-100">
        Electronics, fashion, home and more — picked for you and delivered fast.
      </p>
      <Link
        to="/shop"
        className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50"
      >
        Shop now
      </Link>
    </section>
  );
}
