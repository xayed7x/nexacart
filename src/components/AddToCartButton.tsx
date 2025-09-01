'use client';

import { useCart, CartItem } from "@/app/contexts/CartContext";
import { Product } from "@prisma/client";

type SerializableProduct = Omit<Product, 'price' | 'reviews' | 'availableColors' | 'details' | 'availableSizes' | 'createdAt' | 'updatedAt'> & {
  price: string;
};


type AddToCartButtonProps = {
  product: SerializableProduct;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const itemToAdd: CartItem = {
      id: product.id.toString(),
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
      image: product.imageSrc,
    };
    addToCart(itemToAdd);
    console.log(`${product.name} added to cart!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-mocha-mousse text-off-white font-montserrat font-bold py-4 px-8 rounded-sm uppercase tracking-wider hover:bg-charcoal dark:hover:bg-off-white dark:hover:text-charcoal transition-colors duration-300"
    >
      Add to Cart
    </button>
  );
}
