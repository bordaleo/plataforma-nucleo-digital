import { OrderStatus, PaymentStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { NormalizedKiwifyEvent } from "@/lib/kiwify/types";

function toOrderStatus(eventType: NormalizedKiwifyEvent["eventType"]): OrderStatus {
  if (eventType === "order.paid") return OrderStatus.PAID;
  if (eventType === "order.refunded") return OrderStatus.REFUNDED;
  if (eventType === "order.failed") return OrderStatus.FAILED;
  return OrderStatus.PENDING;
}

function toPaymentStatus(eventType: NormalizedKiwifyEvent["eventType"]): PaymentStatus {
  if (eventType === "order.paid") return PaymentStatus.PAID;
  if (eventType === "order.refunded") return PaymentStatus.REFUNDED;
  if (eventType === "order.failed") return PaymentStatus.FAILED;
  return PaymentStatus.PENDING;
}

export async function processKiwifyEvent(event: NormalizedKiwifyEvent) {
  if (event.providerEventId) {
    const existing = await prisma.payment.findUnique({
      where: { providerEventId: event.providerEventId },
    });
    if (existing) {
      return { status: "duplicate" as const, paymentId: existing.id };
    }
  }

  const email = event.customerEmail ?? "pedido-pendente@local";
  const customer = await prisma.customer.upsert({
    where: { email },
    update: {
      name: event.customerName ?? undefined,
    },
    create: {
      email,
      name: event.customerName,
    },
  });

  const products = event.productRefs.length
    ? await prisma.product.findMany({
        where: {
          OR: [{ kiwifyProductId: { in: event.productRefs } }, { id: { in: event.productRefs } }],
        },
      })
    : [];

  const storeId =
    products[0]?.storeId ??
    (
      await prisma.store.findUnique({
        where: { slug: "semeia" },
        select: { id: true },
      })
    )?.id;

  if (!storeId) {
    throw new Error("Não foi possível associar o pedido a uma loja.");
  }

  const amountCents = event.amountCents ?? products.reduce((sum, product) => sum + (product.promotionalPriceCents ?? product.priceCents), 0);

  const order = event.providerOrderId
    ? await prisma.order.upsert({
        where: { providerRef: event.providerOrderId },
        update: {
          status: toOrderStatus(event.eventType),
          totalCents: amountCents,
          storeId,
          metadata: { productRefs: event.productRefs, occurredAt: event.occurredAt, storeId },
        },
        create: {
          storeId,
          customerId: customer.id,
          status: toOrderStatus(event.eventType),
          totalCents: amountCents,
          providerRef: event.providerOrderId,
          metadata: { productRefs: event.productRefs, occurredAt: event.occurredAt, storeId },
          items: {
            create: products.map((product) => ({
              productId: product.id,
              name: product.name,
              quantity: 1,
              priceCents: product.promotionalPriceCents ?? product.priceCents,
            })),
          },
        },
      })
    : await prisma.order.create({
        data: {
          storeId,
          customerId: customer.id,
          status: toOrderStatus(event.eventType),
          totalCents: amountCents,
          metadata: { productRefs: event.productRefs, occurredAt: event.occurredAt, storeId },
          items: {
            create: products.map((product) => ({
              productId: product.id,
              name: product.name,
              quantity: 1,
              priceCents: product.promotionalPriceCents ?? product.priceCents,
            })),
          },
        },
      });

  const payment = await prisma.payment.upsert({
    where: { orderId: order.id },
    update: {
      status: toPaymentStatus(event.eventType),
      amountCents,
      providerEventId: event.providerEventId,
      providerPaymentId: event.providerPaymentId,
      rawPayload: event.raw as object,
    },
    create: {
      orderId: order.id,
      status: toPaymentStatus(event.eventType),
      amountCents,
      providerEventId: event.providerEventId,
      providerPaymentId: event.providerPaymentId,
      rawPayload: event.raw as object,
    },
  });

  return { status: "processed" as const, orderId: order.id, paymentId: payment.id };
}
