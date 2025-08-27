import Image from "next/image";
import Link from "next/link";

// Placeholder data for our categories (remains the same)
const categories = [
  {
    name: "Clothing",
    href: "/category/clothing",
    imageSrc: "/images/clothe1.jpg",
    imageAlt: "Model wearing a plain white t-shirt.",
  },
  {
    name: "Electronics",
    href: "/category/electronics",
    imageSrc:
      "/images/electronics1.webp",
    imageAlt: "Various electronic gadgets on a desk.",
  },
  {
    name: "Accessories",
    href: "/category/accessories",
    imageSrc:
      "/images/accessories1.avif",
    imageAlt:
      "Collection of stylish accessories including a watch, sunglasses, and a wallet.",
  },
  {
    name: "Perfumes",
    href: "/category/perfumes",
    imageSrc:
      "/images/perfume1.jpg",
    imageAlt: "A bottle of perfume on a decorative surface.",
  },
];

export default function CategoryShowcase() {
  return (
      <section id="categories" className="pt-6 sm:pt-10 pb-12 sm:pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-montserrat font-extrabold text-charcoal text-center mb-12 dark:text-off-white">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-6 lg:gap-x-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group text-center"
            >
              {/* This div is the container that enforces the aspect ratio */}
              <div className="aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src={category.imageSrc}
                  alt={category.imageAlt}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                />
              </div>
              <h3 className="mt-4 text-xl font-montserrat font-bold text-charcoal dark:text-off-white">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
