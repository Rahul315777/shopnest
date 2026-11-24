import Hero from "../../components/Hero/Hero.jsx";
import Categories from "../../components/Categories/Categories.jsx";
import ProductSection from "../../components/ProductSection/ProductSection.jsx";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts.jsx";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed.jsx";
import { useProducts } from "../../context/ProductContext.jsx";
import { bestSellers, newArrivals, trending } from "../../utils/productLists.js";

export default function Home() {
  const { products } = useProducts();

  return (
    <>
      <Hero />
      <Categories />
      <ProductSection title="🔥 Trending now" subtitle="What shoppers are loving this week" products={trending(products)} />
      <ProductSection title="🏆 Best sellers" subtitle="Our most reviewed products" products={bestSellers(products)} />
      <ProductSection title="✨ New arrivals" subtitle="Fresh additions to the store" products={newArrivals(products)} />
      <FeaturedProducts />
      <RecentlyViewed />
    </>
  );
}
