import { isEmail } from "@/lib/sanitize";
import type { KiwifyEventType, NormalizedKiwifyEvent } from "@/lib/kiwify/types";

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function asString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function guessEventType(payload: Record<string, unknown>): KiwifyEventType {
  const raw = asString(payload.event) ?? asString(payload.type) ?? asString(payload.status) ?? "";
  const normalized = raw.toLowerCase();

  if (normalized.includes("refund")) return "order.refunded";
  if (normalized.includes("fail") || normalized.includes("refuse") || normalized.includes("cancel")) {
    return "order.failed";
  }
  if (normalized.includes("paid") || normalized.includes("approved") || normalized.includes("complete")) {
    return "order.paid";
  }
  return "unknown";
}

function collectProductRefs(payload: Record<string, unknown>) {
  const refs = new Set<string>();
  const candidates = [payload.product_id, payload.productId, payload.checkout_id, payload.checkoutId];

  for (const candidate of candidates) {
    const value = asString(candidate);
    if (value) refs.add(value);
  }

  return [...refs];
}

/**
 * Converte um JSON desconhecido em um evento interno.
 *
 * PLACEHOLDER: os nomes abaixo são tentativas genéricas (`event`, `email`, `amount`),
 * não campos oficiais da Kiwify. Substitua este mapeamento quando a documentação
 * real for anexada ao projeto.
 */
export function extractKiwifyEvent(payload: unknown): NormalizedKiwifyEvent {
  const root = asRecord(payload) ?? {};
  const data = asRecord(root.data) ?? root;
  const customer = asRecord(data.customer) ?? asRecord(root.customer) ?? {};

  const email = asString(customer.email) ?? asString(data.email) ?? asString(root.email);
  const amount =
    asNumber(data.amount_cents) ??
    asNumber(data.amountCents) ??
    asNumber(root.amount_cents) ??
    (asNumber(data.amount) !== null ? Math.round((asNumber(data.amount) as number) * 100) : null);

  return {
    eventType: guessEventType({ ...root, ...data }),
    providerEventId: asString(root.id) ?? asString(root.event_id) ?? asString(data.event_id),
    providerOrderId: asString(data.order_id) ?? asString(data.orderId) ?? asString(root.order_id),
    providerPaymentId: asString(data.payment_id) ?? asString(data.paymentId),
    customerEmail: email && isEmail(email) ? email.toLowerCase() : null,
    customerName: asString(customer.name) ?? asString(data.name),
    amountCents: amount !== null && amount >= 0 ? Math.round(amount) : null,
    productRefs: collectProductRefs(data),
    occurredAt: asString(data.created_at) ?? asString(root.created_at),
    raw: payload,
  };
}
