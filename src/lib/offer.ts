import type { Offer, Product } from "@prisma/client";

export const OFFER_EXPIRED_BEHAVIORS = ["hide_urgency", "unavailable"] as const;
export type OfferExpiredBehavior = (typeof OFFER_EXPIRED_BEHAVIORS)[number];

export type OfferState = {
  offer: Offer;
  live: boolean;
  expired: boolean;
  notStarted: boolean;
  discountPercent: number;
};

export function computeDiscountPercent(originalCents: number, promotionalCents: number) {
  if (originalCents <= 0 || promotionalCents >= originalCents) return 0;
  return Math.round(((originalCents - promotionalCents) / originalCents) * 100);
}

export function getOfferState(offer: Offer, now = new Date()): OfferState {
  const live = offer.active && now >= offer.startsAt && now <= offer.endsAt;
  const expired = now > offer.endsAt;
  const notStarted = now < offer.startsAt;
  return {
    offer,
    live,
    expired,
    notStarted,
    discountPercent: offer.discountPercentage || computeDiscountPercent(offer.originalPriceCents, offer.promotionalPriceCents),
  };
}

export function selectPrimaryOffer(offers: Offer[], now = new Date()) {
  const active = offers.filter((offer) => offer.active);
  if (active.length === 0) return null;
  const live = active.filter((offer) => now >= offer.startsAt && now <= offer.endsAt);
  const pool = live.length > 0 ? live : active;
  return pool.sort((a, b) => b.endsAt.getTime() - a.endsAt.getTime())[0] ?? null;
}

export function offerCheckoutPrice(offer: Offer, product: Pick<Product, "priceCents" | "promotionalPriceCents">) {
  return {
    originalCents: offer.originalPriceCents,
    currentCents: offer.promotionalPriceCents,
    catalogCents: product.promotionalPriceCents ?? product.priceCents,
  };
}

export function offerHref(storeSlug: string, productSlug: string) {
  return `/loja/${storeSlug}/oferta/${productSlug}`;
}
