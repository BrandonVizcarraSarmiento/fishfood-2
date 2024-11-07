-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Novedades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Novedades" ("createdAt", "fecha", "id", "imagen", "info", "titulo", "updatedAt") SELECT "createdAt", "fecha", "id", "imagen", "info", "titulo", "updatedAt" FROM "Novedades";
DROP TABLE "Novedades";
ALTER TABLE "new_Novedades" RENAME TO "Novedades";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
