import Hero from "@/components/Hero";
import CategoryShowcase from "@/components/CategoryShowcase";
import ProductGrid from "@/components/ProductGrid";
import prisma from '@/lib/prisma';
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

export default async function Home() {
  const productsWithCategory = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  const products = productsWithCategory.map(product => ({
    ...product,
    price: product.price.toString(), // Convert Decimal to string
    reviews: product.reviews ? (typeof product.reviews === 'string' ? JSON.parse(product.reviews) : product.reviews) : null,
  }));

  const featuredProducts = products.filter((p) => p.isFeatured);

  const clothingProducts = products.filter((p) => p.category.name === "Clothing");
  const electronicsProducts = products.filter(
    (p) => p.category.name === "Electronics"
  );
  const accessoriesProducts = products.filter(
    (p) => p.category.name === "Accessories"
  );
  const perfumeProducts = products.filter((p) => p.category.name === "Perfumes");

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
