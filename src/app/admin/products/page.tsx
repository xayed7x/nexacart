import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      category: true, // Include the related category data
    },
  });

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md font-montserrat text-charcoal">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-merriweather text-charcoal">
          Manage Products
        </h1>
        <Link
          href="/admin/products/new"
          className="bg-charcoal text-off-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded transition-colors duration-200 hover:bg-mocha-mousse"
        >
          + Add New Product
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b-2 border-soft-grey font-semibold">
            <tr>
              <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">
                Image
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">
                Product Name
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">
                Category
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">
                Price
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">
                Featured
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-soft-grey">
                <td className="whitespace-nowrap px-4 py-3 sm:px-6 sm:py-4">
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-3 sm:px-6 sm:py-4 font-semibold">
                  {product.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3 sm:px-6 sm:py-4">
                  {product.category.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3 sm:px-6 sm:py-4">
                  ${product.price.toString()}
                </td>
                <td className="whitespace-nowrap px-4 py-3 sm:px-6 sm:py-4">
                  {product.isFeatured ? "Yes" : "No"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 sm:px-6 sm:py-4 text-right">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-mocha-mousse hover:underline font-semibold"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}