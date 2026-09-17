"use client";

import { useEffect } from "react";
import Script from "next/script";
import { TRACKING_EVENTS, pixelId, trackBrowser, type ViewContentPayload } from "@/lib/tracking/pixel";

export function OfferPixel({ payload }: { payload: ViewContentPayload }) {
  const id = pixelId();
  useEffect(() => {
    trackBrowser(TRACKING_EVENTS.PAGE_VIEW);
    trackBrowser(TRACKING_EVENTS.VIEW_CONTENT, payload);
  }, [payload]);

  if (!id) return null;

  return (
    <Script
      src="https://connect.facebook.net/en_US/fbevents.js"
      strategy="lazyOnload"
      onLoad={() => {
        window.fbq?.("init", id);
        trackBrowser(TRACKING_EVENTS.PAGE_VIEW);
        trackBrowser(TRACKING_EVENTS.VIEW_CONTENT, payload);
      }}
    />
  );
}
