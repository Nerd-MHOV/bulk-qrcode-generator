-- CreateTable
CREATE TABLE "Projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Links" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "urlIn" TEXT NOT NULL,
    "urlOut" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "Links_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
