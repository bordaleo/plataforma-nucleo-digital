-- AlterTable
ALTER TABLE "Product" ADD COLUMN "galleryImages" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Product" ADD COLUMN "mockupImages" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Product" ADD COLUMN "videoUrl" TEXT;
ALTER TABLE "Product" ADD COLUMN "audiencePoints" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Product" ADD COLUMN "notFor" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Product" ADD COLUMN "stickyCtaEnabled" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "subheadline" TEXT NOT NULL,
    "originalPriceCents" INTEGER NOT NULL,
    "promotionalPriceCents" INTEGER NOT NULL,
    "discountPercentage" INTEGER NOT NULL DEFAULT 0,
    "badge" TEXT NOT NULL DEFAULT 'Oferta especial',
    "barText" TEXT NOT NULL DEFAULT '',
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "guaranteeEnabled" BOOLEAN NOT NULL DEFAULT false,
    "guaranteeDays" INTEGER,
    "guaranteeText" TEXT,
    "expiredBehavior" TEXT NOT NULL DEFAULT 'hide_urgency',
    "stickyCtaEnabled" BOOLEAN NOT NULL DEFAULT true,
    "demo" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Offer_productId_active_idx" ON "Offer"("productId", "active");
CREATE INDEX "Offer_endsAt_idx" ON "Offer"("endsAt");

ALTER TABLE "Offer" ADD CONSTRAINT "Offer_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "CheckoutIntent" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "offerId" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmContent" TEXT,
    "utmTerm" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CheckoutIntent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "CheckoutIntent_productId_createdAt_idx" ON "CheckoutIntent"("productId", "createdAt");
CREATE INDEX "CheckoutIntent_storeId_idx" ON "CheckoutIntent"("storeId");

ALTER TABLE "CheckoutIntent" ADD CONSTRAINT "CheckoutIntent_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
