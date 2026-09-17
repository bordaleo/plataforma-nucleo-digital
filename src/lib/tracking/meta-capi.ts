import { TRACKING_EVENTS } from "@/lib/tracking/pixel";

/**
 * Conversão confirmada só no servidor, após o webhook da Kiwify.
 * Sem pixel ID ou token, a função apenas registra o evento no pedido.
 */
export async function sendMetaPurchase(input: {
  eventId: string;
  valueCents: number;
  contentIds: string[];
  eventSourceUrl?: string;
}) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  const token = process.env.META_CAPI_TOKEN?.trim();
  if (!pixelId || !token) return { sent: false as const };

  const payload = {
    data: [
      {
        event_name: TRACKING_EVENTS.PURCHASE,
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: "website",
        event_source_url: input.eventSourceUrl,
        custom_data: {
          currency: "BRL",
          value: input.valueCents / 100,
          content_ids: input.contentIds,
          content_type: "product",
        },
      },
    ],
    ...(process.env.META_CAPI_TEST_CODE ? { test_event_code: process.env.META_CAPI_TEST_CODE } : {}),
  };

  const response = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.error("[meta capi]", await response.text());
    return { sent: false as const };
  }

  return { sent: true as const };
}
