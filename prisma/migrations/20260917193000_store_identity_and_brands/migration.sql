-- AlterTable
ALTER TABLE "Store" ADD COLUMN "backgroundColor" TEXT NOT NULL DEFAULT '#f3eee4';
ALTER TABLE "Store" ADD COLUMN "themeStyle" TEXT NOT NULL DEFAULT 'editorial';

-- Semeia keeps the editorial parchment identity.
UPDATE "Store"
SET "backgroundColor" = '#f3eee4', "themeStyle" = 'editorial'
WHERE "slug" = 'semeia';
