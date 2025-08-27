import Image from "next/image";
import Link from "next/link";

// Placeholder data for our categories (remains the same)
const categories = [
  {
    name: "Clothing",
    href: "/category/clothing",
    imageSrc:
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    imageAlt: "Model wearing a plain white t-shirt.",
  },
  {
    name: "Electronics",
    href: "/category/electronics",
    imageSrc:
      "https://tse2.mm.bing.net/th/id/OIP.kkjf1ciRFqJVuR6ul2aa8gAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    imageAlt: "Various electronic gadgets on a desk.",
  },
  {
    name: "Accessories",
    href: "/category/accessories",
    imageSrc:
      "https://th.bing.com/th/id/R.3fe98c89a6e4b31758e7a560830dccee?rik=BRcRUQ1jVE%2flxw&riu=http%3a%2f%2fmybigsistersclosetboutique.com%2fcdn%2fshop%2fcollections%2fshutterstock_319427201.jpg%3fv%3d1710265908%26width%3d2048&ehk=l7q4E8TQrJuZdMXmEeG%2bsU1SXv2Bd%2fQoi0sqYwdwmBg%3d&risl=&pid=ImgRaw&r=0",
    imageAlt:
      "Collection of stylish accessories including a watch, sunglasses, and a wallet.",
  },
  {
    name: "Perfumes",
    href: "/category/perfumes",
    imageSrc:
      "https://medias.artisanparfumeur.com/cdn-cgi/image/format=auto,width=500/https://dynamic-assets.artisanparfumeur.com/is/image/puig/PDP_LA_CHASSE_AUX_PAPILLONS_1650X1650?version=8154c37654cee1e19156daf8e4c6a1e21c0d7a4a",
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
