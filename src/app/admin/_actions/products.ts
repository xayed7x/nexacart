"use server";

import supabaseAdmin from '@/lib/supabase';
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

// Zod schema for validating the form data
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  imageSrc: z.instanceof(File).refine(file => file.size > 0, 'Image is required.'),
  categoryId: z.coerce.number().int("Category is required"),
  isFeatured: z.coerce.boolean(),
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const isFeatured = formData.get('isFeatured') === 'on';
  const imageFile = formData.get('imageSrc') as File;

  const validatedFields = productSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    imageSrc: imageFile,
    categoryId: formData.get('categoryId'),
    isFeatured: isFeatured,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description, price, categoryId, isFeatured: featured } = validatedFields.data;
  const image = validatedFields.data.imageSrc;

  try {
    // 1. Upload the image to Supabase Storage
    const fileExtension = image.name.split('.').pop();
    const newFileName = `${Date.now()}-${Math.random()}.${fileExtension}`;
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('product-images')
      .upload(newFileName, image);

    if (uploadError) {
      console.error('Upload Error:', uploadError);
      return { message: 'Database Error: Failed to upload image.' };
    }

    // 2. Get the public URL of the uploaded image
    const { data: urlData } = supabaseAdmin.storage
      .from('product-images')
      .getPublicUrl(uploadData.path);

    const imageUrl = urlData.publicUrl;

    // 3. Create the product in the database with the new image URL
    const slug = name.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substring(2, 9);
    await prisma.product.create({
      data: {
        name,
        href: slug,
        description,
        price,
        categoryId,
        isFeatured: featured,
        imageSrc: imageUrl,
        imageAlt: name,
        details: [],
        availableSizes: [],
        availableColors: [],
        reviews: [],
      },
    });

  } catch (e) {
    console.error(e);
    return {
      message: 'Database Error: Failed to create product.',
    };
  }

  // If successful, redirect to the main products page
  redirect('/admin/products');
}


export async function updateProduct(prevState: unknown, formData: FormData) {

  const id = formData.get('id') as string;
  if (!id) {
    return { message: 'Product ID is missing.' };
  }

  const isFeatured = formData.get('isFeatured') === 'on';
  const imageFile = formData.get('imageSrc') as File;

  // since image is optional on update, we need a slightly different validation
  const productUpdateSchema = productSchema.extend({
    imageSrc: z.instanceof(File).refine(file => file.size > 0, 'Image is required.').optional(),
  });

  const validatedFields = productUpdateSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    imageSrc: imageFile.size > 0 ? imageFile : undefined,
    categoryId: formData.get('categoryId'),
    isFeatured: isFeatured,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description, price, categoryId, isFeatured: featured, imageSrc } = validatedFields.data;
  
  try {
    let imageUrl: string | undefined;

    if (imageSrc) {
        // 1. Upload the image to Supabase Storage
        const fileExtension = imageSrc.name.split('.').pop();
        const newFileName = `${Date.now()}-${Math.random()}.${fileExtension}`;
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('product-images')
        .upload(newFileName, imageSrc);

        if (uploadError) {
            console.error('Upload Error:', uploadError);
            return { message: 'Database Error: Failed to upload image.' };
        }

        // 2. Get the public URL of the uploaded image
        const { data: urlData } = supabaseAdmin.storage
        .from('product-images')
        .getPublicUrl(uploadData.path);

        imageUrl = urlData.publicUrl;

        // 3. Delete old image
        const product = await prisma.product.findUnique({ where: {id: parseInt(id) }});
        if (product?.imageSrc) {
            const oldImageName = product.imageSrc.split('/').pop();
            if (oldImageName) {
                await supabaseAdmin.storage.from('product-images').remove([oldImageName]);
            }
        }
    }

    // Update the product in the database using its ID
    const slug = name.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substring(2, 9);
    await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        href: slug,
        description,
        price,
        categoryId,
        isFeatured: featured,
        imageAlt: name,
        ...(imageUrl && { imageSrc: imageUrl }),
      },
    });
  } catch (e) {
    console.error(e);
    return {
      message: 'Database Error: Failed to update product.',
    };
  }

  // If successful, redirect back to the main products page
  redirect('/admin/products');
}


export async function deleteProduct(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) {
    throw new Error('Product ID is required for deletion.');
  }
  
  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
  } catch (e) {
    console.error(e);
    // In a real-world app, you might return an error message
    // For now, we'll re-throw or handle as needed.
    throw new Error('Database Error: Failed to delete product.');
  }

  // If successful, redirect back to the main products page
  redirect('/admin/products');
}