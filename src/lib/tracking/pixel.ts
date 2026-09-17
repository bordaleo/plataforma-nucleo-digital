export const TRACKING_EVENTS = {
  PAGE_VIEW: "PageView",
  VIEW_CONTENT: "ViewContent",
  INITIATE_CHECKOUT: "InitiateCheckout",
  PURCHASE: "Purchase",
} as const;

export type TrackingEventName = (typeof TRACKING_EVENTS)[keyof typeof TRACKING_EVENTS];

export type ViewContentPayload = {
  content_ids: string[];
  content_type: "product";
  content_name: string;
  value: number;
  currency: "BRL";
};

declare global {
  interface Window {
    fbq?: (action: string, event: string, payload?: object) => void;
  }
}

export function pixelId() {
  return process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "";
}

export function trackBrowser(event: TrackingEventName, payload?: object) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, payload);
}
