/*
  Warnings:

  - You are about to drop the column `userId` on the `Item` table. All the data in the column will be lost.
  - Added the required column `createdByUserId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownedByUserId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_userId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "userId",
ADD COLUMN     "createdByUserId" TEXT NOT NULL,
ADD COLUMN     "ownedByUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_ownedByUserId_fkey" FOREIGN KEY ("ownedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
