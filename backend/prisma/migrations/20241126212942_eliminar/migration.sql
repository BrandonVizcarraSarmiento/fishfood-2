-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "recetaId" INTEGER NOT NULL,
    CONSTRAINT "Paso_recetaId_fkey" FOREIGN KEY ("recetaId") REFERENCES "Recetas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Paso" ("descripcion", "id", "numero", "recetaId") SELECT "descripcion", "id", "numero", "recetaId" FROM "Paso";
DROP TABLE "Paso";
ALTER TABLE "new_Paso" RENAME TO "Paso";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
