import Image from "next/image";

// Updated placeholder data for featured products with working image links
const products = [
  {
    id: 1,
    name: "Classic Crewneck Tee",
    category: "Clothing",
    href: "#",
    price: "$48.00",
    imageSrc:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    imageAlt: "A classic black crewneck t-shirt on a hanger.",
  },
  {
    id: 2,
    name: "Wireless Over-Ear Headphones",
    category: "Electronics",
    href: "#",
    price: "$249.99",
    imageSrc:
      "https://www.pchouse.com.bd/image/cache/catalog/headphone/jbl/jbl-endurance-dive-headphone/JBL_20Tune_20710BT-03-600x500h.jpg.webp",
    imageAlt: "Sleek black wireless over-ear headphones.",
  },
  {
    id: 3,
    name: "Leather Strap Watch",
    category: "Accessories",
    href: "#",
    price: "$195.00",
    imageSrc:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    imageAlt: "A minimalist watch with a brown leather strap.",
  },
  {
    id: 4,
    name: "Artisan Eau de Parfum",
    category: "Perfumes",
    href: "#",
    price: "$120.00",
    imageSrc:
      "https://medias.artisanparfumeur.com/cdn-cgi/image/format=auto,width=500/https://dynamic-assets.artisanparfumeur.com/is/image/puig/PDP_LA_CHASSE_AUX_PAPILLONS_1650X1650?version=8154c37654cee1e19156daf8e4c6a1e21c0d7a4a",
    imageAlt: "A stylish bottle of artisan perfume.",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-off-white dark:bg-charcoal pt-8 sm:pt-12 pb-16 sm:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-montserrat font-extrabold text-charcoal text-center mb-12 dark:text-off-white">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-6 lg:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative text-center">
              {/* This div enforces the new aspect ratio */}
              <div className="aspect-[4/5] w-full rounded-lg overflow-hidden bg-soft-grey dark:bg-gray-800">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  width={500}
                  height={625}
                  className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-montserrat font-bold text-charcoal dark:text-off-white">
                  <a href={product.href}>
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
