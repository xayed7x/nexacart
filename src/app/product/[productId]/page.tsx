// src/app/product/[id]/page.tsx
"use client";

import { notFound } from "next/navigation";
import { products } from "@/lib/placeholder-data";
import StarRating from "@/components/StarRating";
import SizeSelector from "@/components/SizeSelector";
import ColorSelector from "@/components/ColorSelector";
import DetailsAccordion from "@/components/DetailsAccordion";
import ProductGrid from "@/components/ProductGrid";
import { useCart } from "@/app/contexts/CartContext"; // 1. Import useCart

// Note: This is now a Client Component
export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  const product = products.find((p) => p.id === Number(productId));
  const { addToCart } = useCart(); // 2. Get the addToCart function

  if (!product) {
    notFound();
  }

  // Find related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // 3. Create a handler function to add the item to the cart
  const handleAddToCart = () => {
    // We create a CartItem object from the product data
    const itemToAdd = {
      id: product.id.toString(),
      name: product.name,
      price: parseFloat(product.price.replace("$", "")), // Convert price string to number
      quantity: 1, // Default quantity is 1
      image: product.imageSrc,
    };
    addToCart(itemToAdd);
    // Optional: Add a confirmation message here later
    console.log(`${product.name} added to cart!`);
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 min-h-[calc(100vh-5rem)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Product Image */}
        <div className="aspect-square w-full rounded-lg overflow-hidden bg-soft-grey dark:bg-gray-800">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="w-full h-full object-center object-cover"
          />
        </div>

        {/* Right Column: Product Details */}
        <div>
          <p className="font-montserrat text-sm uppercase tracking-widest text-mocha-mousse mb-2">
            {product.category}
          </p>
          <h1 className="font-montserrat text-4xl md:text-5xl font-extrabold text-charcoal dark:text-off-white mb-4">
            {product.name}
          </h1>

          {product.reviews && (
            <div className="mb-4">
              <StarRating
                average={product.reviews.average}
                count={product.reviews.count}
              />
            </div>
          )}

          <p className="font-merriweather text-3xl text-charcoal dark:text-soft-grey mb-6">
            {product.price}
          </p>

          <div className="font-merriweather text-charcoal/90 dark:text-soft-grey/90 space-y-4 mb-8">
            <p>{product.description}</p>
          </div>

          <div className="space-y-8 mb-8">
            {product.availableSizes && (
              <SizeSelector sizes={product.availableSizes} />
            )}
            {product.availableColors && (
              <ColorSelector colors={product.availableColors} />
            )}
          </div>

          {product.details && (
            <div className="mt-8">
              <DetailsAccordion details={product.details} />
            </div>
          )}

          {/* 4. Attach the handler to the button's onClick event */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-mocha-mousse text-off-white font-montserrat font-bold py-4 px-8 rounded-sm uppercase tracking-wider hover:bg-charcoal dark:hover:bg-off-white dark:hover:text-charcoal transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-16 md:pt-24">
          <ProductGrid title="You Might Also Like" products={relatedProducts} />
        </div>
      )}
    </main>
  );
}
