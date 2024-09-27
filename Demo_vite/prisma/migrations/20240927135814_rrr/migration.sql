/*
  Warnings:

  - You are about to drop the column `detailsId` on the `files` table. All the data in the column will be lost.
  - Added the required column `userId` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `files` DROP FOREIGN KEY `files_detailsId_fkey`;

-- AlterTable
ALTER TABLE `files` DROP COLUMN `detailsId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `files` ADD CONSTRAINT `files_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
