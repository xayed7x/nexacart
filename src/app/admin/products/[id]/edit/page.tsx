import prisma from "@/lib/prisma";
import ProductForm from "../../ProductForm"; // Note the '../../' to go up two directories
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: { id: string };
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const productId = parseInt(params.id);

  if (isNaN(productId)) {
    return notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return notFound();
  }

  // Sanitize the product data for the client component by converting Decimal to number
  const productForForm = {
    ...product,
    price: product.price.toNumber(),
  };

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="font-montserrat">
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="text-mocha-mousse hover:underline font-semibold"
        >
          &larr; Back to All Products
        </Link>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md text-charcoal">
        <h1 className="text-3xl font-bold font-merriweather text-charcoal mb-6">
          Edit Product
        </h1>
        {/* We pass the sanitized product data and categories to our reusable form */}
        <ProductForm categories={categories} product={productForForm} />
      </div>
    </div>
  );
}
