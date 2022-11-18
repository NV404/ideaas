/*
  Warnings:

  - Added the required column `author` to the `Idea` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Idea" ADD COLUMN     "author" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
