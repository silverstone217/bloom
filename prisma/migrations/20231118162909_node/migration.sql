/*
  Warnings:

  - Made the column `image` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "image" SET NOT NULL;
ALTER TABLE "Comment" ALTER COLUMN "name" SET NOT NULL;
