import { notFound } from "next/navigation";
import { categories, products } from "@/lib/placeholder-data";
import ProductGrid from "@/components/ProductGrid";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.name.toLowerCase(),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = categories.find((c) => c.name.toLowerCase() === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === category.name.toLowerCase()
  );

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 min-h-[calc(100vh-5rem)]">
      <h1 className="font-montserrat text-4xl md:text-5xl font-extrabold text-charcoal dark:text-off-white mb-4">
        {category.name}
      </h1>
      <p className="font-merriweather text-lg md:text-xl max-w-3xl mb-8">
        {category.description}
      </p>
      <ProductGrid title={`${category.name} Products`} products={categoryProducts} />
    </main>
  );
}