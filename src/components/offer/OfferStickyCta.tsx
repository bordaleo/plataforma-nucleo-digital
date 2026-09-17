"use client";

import { formatPrice } from "@/lib/format";
import { OfferCheckoutButton } from "@/components/offer/OfferCheckoutButton";

export function OfferStickyCta({
  priceCents,
  checkoutUrl,
  productId,
  offerId,
  productName,
}: {
  priceCents: number;
  checkoutUrl: string;
  productId: string;
  offerId: string;
  productName: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <p className="min-w-0 flex-1 text-sm text-ink">
          Comprar por <strong>{formatPrice(priceCents)}</strong>
        </p>
        <OfferCheckoutButton
          href={checkoutUrl}
          productId={productId}
          offerId={offerId}
          productName={productName}
          value={priceCents / 100}
          label="Quero agora"
          className="inline-flex h-11 min-w-[9rem] items-center justify-center rounded-full bg-forest px-4 text-sm text-cream"
        />
      </div>
    </div>
  );
}
