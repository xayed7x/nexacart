/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - The `id` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `availableColors` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `href` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageAlt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageSrc` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviews` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "imageUrl",
ADD COLUMN     "availableColors" JSONB NOT NULL,
ADD COLUMN     "availableSizes" TEXT[],
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "details" TEXT[],
ADD COLUMN     "href" TEXT NOT NULL,
ADD COLUMN     "imageAlt" TEXT NOT NULL,
ADD COLUMN     "imageSrc" TEXT NOT NULL,
ADD COLUMN     "reviews" JSONB NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
