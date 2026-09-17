-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tagline" TEXT NOT NULL DEFAULT '',
    "logo" TEXT,
    "favicon" TEXT,
    "primaryColor" TEXT NOT NULL,
    "secondaryColor" TEXT NOT NULL,
    "email" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_slug_key" ON "Company"("slug");

-- Empresa proprietária. A Semeia permanece como Store.
INSERT INTO "Company" (
  "id",
  "name",
  "slug",
  "description",
  "tagline",
  "logo",
  "favicon",
  "primaryColor",
  "secondaryColor",
  "email",
  "active",
  "createdAt",
  "updatedAt"
) VALUES (
  'clcompany00000000000000001',
  'Núcleo',
  'nucleo',
  'Desenvolvemos e administramos marcas de produtos digitais. Cada loja tem identidade, catálogo e checkout próprios.',
  'Uma empresa. Várias marcas. Produtos digitais.',
  NULL,
  NULL,
  '#141414',
  '#6b7280',
  'ola@nucleo.com.br',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

ALTER TABLE "Store" ADD COLUMN "companyId" TEXT;

UPDATE "Store" SET "companyId" = 'clcompany00000000000000001' WHERE "companyId" IS NULL;

ALTER TABLE "Store" ALTER COLUMN "companyId" SET NOT NULL;

CREATE INDEX "Store_companyId_idx" ON "Store"("companyId");

ALTER TABLE "Store" ADD CONSTRAINT "Store_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
