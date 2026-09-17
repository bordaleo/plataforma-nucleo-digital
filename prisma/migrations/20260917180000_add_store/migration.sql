-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "niche" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tagline" TEXT NOT NULL DEFAULT '',
    "logo" TEXT,
    "favicon" TEXT,
    "primaryColor" TEXT NOT NULL,
    "secondaryColor" TEXT NOT NULL,
    "domain" TEXT,
    "email" TEXT,
    "instagram" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_slug_key" ON "Store"("slug");

-- CreateIndex
CREATE INDEX "Store_active_idx" ON "Store"("active");

-- Seed da primeira loja para associar dados existentes
INSERT INTO "Store" (
  "id",
  "name",
  "slug",
  "niche",
  "description",
  "tagline",
  "logo",
  "favicon",
  "primaryColor",
  "secondaryColor",
  "domain",
  "email",
  "instagram",
  "active",
  "createdAt",
  "updatedAt"
) VALUES (
  'clsemeia000000000000000001',
  'Semeia',
  'semeia',
  'Cristão',
  'Loja digital de devocionais, estudos bíblicos, e-books e materiais para famílias. Conteúdo cristão com qualidade, simplicidade e profundidade.',
  'Materiais cristãos para cultivar a fé no cotidiano.',
  '/logo.svg',
  '/logo.svg',
  '#1e3a32',
  '#9a7848',
  NULL,
  'ola@semeia.com.br',
  'https://instagram.com/semeia',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- Category.storeId
ALTER TABLE "Category" ADD COLUMN "storeId" TEXT;
UPDATE "Category" SET "storeId" = 'clsemeia000000000000000001' WHERE "storeId" IS NULL;
ALTER TABLE "Category" ALTER COLUMN "storeId" SET NOT NULL;

-- Product.storeId
ALTER TABLE "Product" ADD COLUMN "storeId" TEXT;
UPDATE "Product" SET "storeId" = 'clsemeia000000000000000001' WHERE "storeId" IS NULL;
ALTER TABLE "Product" ALTER COLUMN "storeId" SET NOT NULL;

-- Order.storeId
ALTER TABLE "Order" ADD COLUMN "storeId" TEXT;
UPDATE "Order" SET "storeId" = 'clsemeia000000000000000001' WHERE "storeId" IS NULL;
ALTER TABLE "Order" ALTER COLUMN "storeId" SET NOT NULL;

-- Slugs passam a ser únicos por loja
DROP INDEX "Category_slug_key";
DROP INDEX "Product_slug_key";

CREATE UNIQUE INDEX "Category_storeId_slug_key" ON "Category"("storeId", "slug");
CREATE INDEX "Category_storeId_idx" ON "Category"("storeId");

CREATE UNIQUE INDEX "Product_storeId_slug_key" ON "Product"("storeId", "slug");
CREATE INDEX "Product_storeId_idx" ON "Product"("storeId");

CREATE INDEX "Order_storeId_idx" ON "Order"("storeId");

-- Foreign keys
ALTER TABLE "Category" ADD CONSTRAINT "Category_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Order" ADD CONSTRAINT "Order_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
