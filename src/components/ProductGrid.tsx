import { Product } from "@/lib/placeholder-data";

type ProductGridProps = {
  title: string;
  products: Product[];
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
              <div className="aspect-[4/5] w-full rounded-lg overflow-hidden bg-soft-grey dark:bg-gray-800">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-montserrat font-bold text-charcoal dark:text-off-white">
                   <a href={`/product/${product.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-md text-charcoal dark:text-soft-grey">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
