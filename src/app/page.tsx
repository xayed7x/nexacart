import Hero from "@/components/Hero";
import CategoryShowcase from "@/components/CategoryShowcase";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/lib/placeholder-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | NexaCart',
    default: 'NexaCart - Your Ultimate E-commerce Destination',
  },
  description: 'Discover a seamless shopping experience with NexaCart, offering a wide range of products from fashion to electronics.',
  icons: {
    icon: '/images/logo for ecom.jpg',
  },
};

export default function Home() {
  // THIS IS THE LINE WE ARE CHANGING
  const featuredProducts = products.filter((p) => p.isFeatured);

  const clothingProducts = products.filter((p) => p.category === "Clothing");
  const electronicsProducts = products.filter(
    (p) => p.category === "Electronics"
  );
  const accessoriesProducts = products.filter(
    (p) => p.category === "Accessories"
  );
  const perfumeProducts = products.filter((p) => p.category === "Perfumes");

  return (
    <main>
      <Hero />
      <CategoryShowcase />
      <ProductGrid title="Featured Products" products={featuredProducts} />
      <ProductGrid title="Latest in Clothing" products={clothingProducts} />
      <ProductGrid title="New Electronics" products={electronicsProducts} />
      <ProductGrid title="Top Accessories" products={accessoriesProducts} />
      <ProductGrid title="Signature Scents" products={perfumeProducts} />
    </main>
  );
}
