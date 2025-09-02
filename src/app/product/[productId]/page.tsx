import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import StarRating from "@/components/StarRating";
import SizeSelector from "@/components/SizeSelector";
import ColorSelector from "@/components/ColorSelector";
import DetailsAccordion from "@/components/DetailsAccordion";
import ProductGrid from "@/components/ProductGrid";
import Image from "next/image";
import AddToCartButton from '@/components/AddToCartButton';

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(params.productId),
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  // Find related products
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: {
        not: product.id,
      },
    },
    take: 4,
  });

  const serializableRelatedProducts = relatedProducts.map((p) => {
    let parsedReviews: { average: number; count: number } | null = null;
    if (p.reviews) {
      if (typeof p.reviews === 'string') {
        parsedReviews = JSON.parse(p.reviews);
      } else if (typeof p.reviews === 'object') {
        parsedReviews = p.reviews as { average: number; count: number };
      }
    }
    return {
      ...p,
      price: p.price.toString(),
      reviews: parsedReviews,
    };
  });

  const serializableProduct = {
    ...product,
    price: product.price.toString(),
  };

  // Safely parse JSON fields
  let reviews: { average: number; count: number } | null = null;
  if (product.reviews) {
    if (typeof product.reviews === 'string') {
      reviews = JSON.parse(product.reviews);
    } else if (typeof product.reviews === 'object') {
      reviews = product.reviews as { average: number; count: number };
    }
  }
  
  const colorsFromDb = product.availableColors;
  let availableColors: { name: string; hex: string; }[] | null = null;

  if (Array.isArray(colorsFromDb)) {
    availableColors = colorsFromDb.map((color: any) => ({
      name: color.name,
      hex: color.bgColor || color.hex, // Handle both possible property names
    }));
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 min-h-[calc(100vh-5rem)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Product Image */}
        <div className="aspect-square w-full rounded-lg overflow-hidden bg-soft-grey dark:bg-gray-800">
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            width={500}
            height={500}
            className="w-full h-full object-center object-cover"
          />
        </div>

        {/* Right Column: Product Details */}
        <div>
          <p className="font-montserrat text-sm uppercase tracking-widest text-mocha-mousse mb-2">
            {product.category.name}
          </p>
          <h1 className="font-montserrat text-4xl md:text-5xl font-extrabold text-charcoal dark:text-off-white mb-4">
            {product.name}
          </h1>

          {reviews && (
            <div className="mb-4">
              <StarRating
                average={reviews.average}
                count={reviews.count}
              />
            </div>
          )}

          <p className="font-merriweather text-3xl text-charcoal dark:text-soft-grey mb-6">
            {`$${product.price}`}
          </p>

          <div className="font-merriweather text-charcoal/90 dark:text-soft-grey/90 space-y-4 mb-8">
            <p>{product.description}</p>
          </div>

          <div className="space-y-8 mb-8">
            {product.availableSizes && product.availableSizes.length > 0 && (() => {
              const validSizes: ("S" | "M" | "L" | "XL")[] = ["S", "M", "L", "XL"];
              const filteredSizes = product.availableSizes.filter(size => validSizes.includes(size as any)) as ("S" | "M" | "L" | "XL")[];
              return <SizeSelector sizes={filteredSizes} />;
            })()}
            {availableColors && availableColors.length > 0 && (
              <ColorSelector colors={availableColors} />
            )}
          </div>

          {product.details && product.details.length > 0 && (
            <div className="mt-8">
              <DetailsAccordion details={product.details} />
            </div>
          )}

          <AddToCartButton product={serializableProduct} />
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-16 md:pt-24">
          <ProductGrid title="You Might Also Like" products={serializableRelatedProducts} />
        </div>
      )}
    </main>
  );
}
