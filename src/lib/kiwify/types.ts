/**
 * Tipos internos da loja. Não representam o contrato oficial da Kiwify.
 *
 * Quando a documentação real da API/webhook estiver disponível:
 * - ajuste `extractKiwifyEvent()` em map-event.ts
 * - ajuste `verifyKiwifySignature()` em verify.ts
 * - não altere os modelos de Order/Payment para caber campos inventados
 */

export const KIWIFY_EVENT_TYPES = ["order.paid", "order.refunded", "order.failed", "unknown"] as const;

export type KiwifyEventType = (typeof KIWIFY_EVENT_TYPES)[number];

export type NormalizedKiwifyEvent = {
  eventType: KiwifyEventType;
  providerEventId: string | null;
  providerOrderId: string | null;
  providerPaymentId: string | null;
  customerEmail: string | null;
  customerName: string | null;
  amountCents: number | null;
  productRefs: string[];
  occurredAt: string | null;
  raw: unknown;
};
