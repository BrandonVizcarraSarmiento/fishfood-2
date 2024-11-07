-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Productos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "imagen" TEXT NOT NULL,
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Productos" ("createdAt", "descripcion", "id", "imagen", "nombre", "precio", "updatedAt") SELECT "createdAt", "descripcion", "id", "imagen", "nombre", "precio", "updatedAt" FROM "Productos";
DROP TABLE "Productos";
ALTER TABLE "new_Productos" RENAME TO "Productos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
