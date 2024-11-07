-- CreateTable
CREATE TABLE "Banner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imgLink" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Redes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "linkRedes" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Mision" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL,
    "imgLink" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Beneficios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pregunta" TEXT NOT NULL,
    "respuesta" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Testimonios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "testimonio" TEXT NOT NULL,
    "imgLink" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "About" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Secciones" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL,
    "imgLink" TEXT NOT NULL
);
