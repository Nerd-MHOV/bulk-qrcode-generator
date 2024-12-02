/*
  Warnings:

  - A unique constraint covering the columns `[urlIn]` on the table `Links` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Links_urlIn_key" ON "Links"("urlIn");
