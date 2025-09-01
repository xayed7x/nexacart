import Image from "next/image";
import Link from "next/link";
import QuickAddButton from "./QuickAddButton";
import StarRating from "./StarRating"; // 1. Import StarRating

type ProductForGrid = {
  id: number;
  name: string;
  href: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
  reviews: { average: number; count: number } | null; // 2. Add reviews to type
};

type ProductGridProps = {
  title: string;
  products: ProductForGrid[];
};

export default function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-montserrat font-extrabold text-charcoal text-center mb-12 dark:text-off-white">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-6 lg:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative text-center">
              <div className="h-72 w-full rounded-lg overflow-hidden bg-soft-grey dark:bg-gray-800">
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    width={500}
                    height={625}
                    className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>
              <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md h-48 flex flex-col justify-between">
                {/* 3. Display StarRating */}
                {product.reviews && (
                  <div className="mb-2 flex justify-center">
                    <StarRating
                      average={product.reviews.average}
                      count={product.reviews.count}
                    />
                  </div>
                )}
                <h3 className="text-lg font-montserrat font-bold text-charcoal dark:text-off-white">
                   <Link href={`/product/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-1 text-md text-charcoal dark:text-soft-grey">
                  Price: {`$${product.price}`}
                </p>
                <QuickAddButton product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
