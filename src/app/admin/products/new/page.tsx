import prisma from "@/lib/prisma";
import ProductForm from "../ProductForm";
import Link from "next/link";

export default async function NewProductPage() {
  // Fetch all categories to pass to the form's dropdown selector
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
          Add New Product
        </h1>
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
