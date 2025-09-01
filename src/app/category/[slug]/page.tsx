import { notFound } from "next/navigation";
import prisma from '@/lib/prisma';
import ProductGrid from "@/components/ProductGrid";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany();

  return categories.map((category) => ({
    slug: category.name.toLowerCase().replace(/ /g, '-'),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;

  const categoryName = decodeURIComponent(slug).replace(/-/g, ' ');

  const category = await prisma.category.findFirst({
    where: {
      name: {
        equals: categoryName,
        mode: 'insensitive',
      },
    },
  });

  if (!category) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: {
      categoryId: category.id,
    },
  });

  const serializableProducts = products.map((p) => ({
    ...p,
    price: p.price.toString(),
    reviews: p.reviews ? (typeof p.reviews === 'string' ? JSON.parse(p.reviews) : p.reviews) : null,
  }));

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 min-h-[calc(100vh-5rem)]">
      <h1 className="font-montserrat text-4xl md:text-5xl font-extrabold text-charcoal dark:text-off-white mb-4">
        {category.name}
      </h1>
      <p className="font-merriweather text-lg md:text-xl max-w-3xl mb-8">
        {category.description}
      </p>
      <ProductGrid title={`${category.name} Products`} products={serializableProducts} />
    </main>
  );
}
