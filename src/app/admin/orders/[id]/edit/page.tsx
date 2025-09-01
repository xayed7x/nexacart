import prisma from "@/lib/prisma";
import ProductForm from "../../ProductForm";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: { id: string };
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const productId = parseInt(params.id);

  // Fetch the specific product to edit
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return notFound();
  }

  // Fetch all categories for the form's dropdown selector
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
        {/* We pass both the product data and categories to our reusable form */}
        <ProductForm categories={categories} product={product} />
      </div>
    </div>
  );
}
