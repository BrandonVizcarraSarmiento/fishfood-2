-- CreateTable
CREATE TABLE "Recetas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "ingredientes" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Paso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "recetaId" INTEGER NOT NULL,
    CONSTRAINT "Paso_recetaId_fkey" FOREIGN KEY ("recetaId") REFERENCES "Recetas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
