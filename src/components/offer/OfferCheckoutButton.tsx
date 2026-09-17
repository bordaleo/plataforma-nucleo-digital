"use client";

import { TRACKING_EVENTS, trackBrowser } from "@/lib/tracking/pixel";
import { appendUtmToUrl, utmFromWindow } from "@/lib/utm";

export function OfferCheckoutButton({
  href,
  productId,
  offerId,
  productName,
  value,
  label,
  className,
}: {
  href: string;
  productId: string;
  offerId: string;
  productName: string;
  value: number;
  label: string;
  className?: string;
}) {
  async function goToCheckout() {
    const utm = utmFromWindow();
    const checkout = appendUtmToUrl(href, utm);
    trackBrowser(TRACKING_EVENTS.INITIATE_CHECKOUT, {
      content_ids: [productId],
      content_name: productName,
      value,
      currency: "BRL",
    });
    try {
      await fetch("/api/tracking/checkout-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, offerId, ...utm }),
        keepalive: true,
      });
    } catch {
      /* o checkout segue mesmo se o registro falhar */
    }
    window.location.assign(checkout);
  }

  return (
    <button type="button" onClick={goToCheckout} className={className}>
      {label}
    </button>
  );
}
