import { PrismaClient, Prisma } from "@prisma/client";
import { products as placeholderProducts } from "../src/lib/placeholder-data";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // Delete existing users and create mock users
  await prisma.user.deleteMany();
  console.log('Deleted existing users.');

  await prisma.user.createMany({
    data: [
      {
        name: 'Alice Johnson',
        email: 'customer@example.com',
        password: 'dummyPassword123', // Not a real password
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'dummyAdminPassword123', // Not a real password
      },
    ],
  });
  console.log('Created mock users.');

  // 1. Clear existing data to ensure a clean slate
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  console.log("Deleted existing products and categories.");

  // 2. Identify unique categories from the placeholder data
  const uniqueCategoryNames = [
    ...new Set(placeholderProducts.map((p) => p.category)),
  ];

  // 3. Create a mapping of category names to their new database records
  const categoryMap = new Map<string, { id: number }>();

  for (const name of uniqueCategoryNames) {
    const category = await prisma.category.create({
      data: {
        name: name,
        // We'll add a placeholder description for now.
        description: `The best ${name} in our collection.`,
      },
    });
    categoryMap.set(name, { id: category.id });
    console.log(`Created category: ${name}`);
  }

  // 4. Create products and connect them to the created categories
  for (const productData of placeholderProducts) {
    const category = categoryMap.get(productData.category);

    if (!category) {
      console.warn(`Could not find category for product: ${productData.name}`);
      continue;
    }

    await prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price.replace("$", "")),
        href: productData.href,
        imageSrc: productData.imageSrc,
        imageAlt: productData.imageAlt,
        isFeatured: productData.isFeatured || false,
        details: productData.details || undefined,
        availableSizes: productData.availableSizes || undefined,
        availableColors: productData.availableColors || Prisma.JsonNull,
        reviews: productData.reviews || Prisma.JsonNull,
        // Connect to the category using its ID
        categoryId: category.id,
      },
    });
    console.log(`Created product: ${productData.name}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });