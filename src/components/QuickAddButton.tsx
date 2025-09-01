'use client';

import { useCart, CartItem } from "@/app/contexts/CartContext";

type ProductForGrid = {
  id: number;
  name: string;
  href: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
};

type QuickAddButtonProps = {
  product: ProductForGrid;
};

export default function QuickAddButton({ product }: QuickAddButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
      className="mt-4 w-full bg-mocha-mousse/80 text-off-white font-montserrat font-bold py-2 px-4 rounded-sm uppercase tracking-wider hover:bg-charcoal dark:hover:bg-off-white dark:hover:text-charcoal transition-colors duration-300"
    >
      Quick Add
    </button>
  );
}
