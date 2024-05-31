/*
  Warnings:

  - A unique constraint covering the columns `[content]` on the table `Todos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Todos_content_key" ON "Todos"("content");
