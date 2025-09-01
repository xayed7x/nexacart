"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { addProduct, updateProduct } from "@/app/admin/_actions/products";
import { SubmitButton } from "./SubmitButton";
import DeleteProductButton from './DeleteProductButton';

// Define the shape of the category and product objects we'll pass as props
interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  isFeatured: boolean;
  categoryId: number;
}

interface ProductFormProps {
  categories: Category[];
  product?: Product | null;
}

export default function ProductForm({ categories, product }: ProductFormProps) {
  // The useActionState hook manages form state based on the server action's response
  const action = product ? updateProduct : addProduct;
  const [errorState, formAction] = useFormState(action, undefined);
  const router = useRouter();

  return (
    <form action={formAction} className="space-y-8 font-montserrat">
      {product && <input type="hidden" name="id" value={product.id} />}
      <div className="space-y-4">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-charcoal"
          >
            Product Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={product?.name}
              className="block w-full rounded-md border-0 p-2 text-charcoal shadow-sm ring-1 ring-inset ring-soft-grey focus:ring-2 focus:ring-inset focus:ring-mocha-mousse"
              required
            />
          </div>
          {errorState?.errors?.name && (
            <p className="text-red-500 text-xs mt-1">
              {errorState.errors.name[0]}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-charcoal"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              name="description"
              rows={5}
              defaultValue={product?.description}
              className="block w-full rounded-md border-0 p-2 text-charcoal shadow-sm ring-1 ring-inset ring-soft-grey focus:ring-2 focus:ring-inset focus:ring-mocha-mousse"
              required
            />
          </div>
          {errorState?.errors?.description && (
            <p className="text-red-500 text-xs mt-1">
              {errorState.errors.description[0]}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-charcoal"
          >
            Price
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="price"
              id="price"
              defaultValue={product?.price}
              className="block w-full rounded-md border-0 py-2 pl-7 pr-12 text-charcoal ring-1 ring-inset ring-soft-grey placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mocha-mousse"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>
          {errorState?.errors?.price && (
            <p className="text-red-500 text-xs mt-1">
              {errorState.errors.price[0]}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="imageSrc" className="block text-sm font-medium leading-6 text-charcoal">
            Product Image
          </label>
          <div className="mt-2">
            {product?.imageSrc && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                <img src={product.imageSrc} alt={product.name} className="h-32 w-32 rounded-md object-cover" />
              </div>
            )}
            <input
              type="file"
              name="imageSrc"
              id="imageSrc"
              className="block w-full text-sm text-charcoal file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-off-white file:text-charcoal hover:file:bg-soft-grey"
              accept="image/*"
              // Make the file input required only when creating a new product
              required={!product} 
            />
            {product && <p className="text-xs text-gray-500 mt-2">Leave blank to keep the current image.</p>}
          </div>
          {errorState?.errors?.imageSrc && <p className="text-red-500 text-xs mt-1">{errorState.errors.imageSrc[0]}</p>}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium leading-6 text-charcoal"
          >
            Category
          </label>
          <div className="mt-2">
            <select
              id="categoryId"
              name="categoryId"
              defaultValue={product?.categoryId}
              className="block w-full rounded-md border-0 p-2 text-charcoal shadow-sm ring-1 ring-inset ring-soft-grey focus:ring-2 focus:ring-inset focus:ring-mocha-mousse"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {errorState?.errors?.categoryId && (
            <p className="text-red-500 text-xs mt-1">
              {errorState.errors.categoryId[0]}
            </p>
          )}
        </div>

        {/* Is Featured */}
        <div className="relative flex gap-x-3">
          <div className="flex h-6 items-center">
            <input
              id="isFeatured"
              name="isFeatured"
              type="checkbox"
              defaultChecked={product?.isFeatured}
              className="h-4 w-4 rounded border-gray-300 text-mocha-mousse focus:ring-mocha-mousse"
            />
          </div>
          <div className="text-sm leading-6">
            <label htmlFor="isFeatured" className="font-medium text-charcoal">
              Featured Product
            </label>
            <p className="text-gray-500">
              Feature this product on the homepage.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-4">
        <div className="flex-grow">
          {product && <DeleteProductButton productId={product.id} />}
        </div>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm font-semibold leading-6 text-charcoal"
        >
          Cancel
        </button>
        <SubmitButton />
      </div>
      {errorState?.message && (
        <p className="text-red-500 text-sm mt-4 text-right">
          {errorState.message}
        </p>
      )}
    </form>
  );
}
