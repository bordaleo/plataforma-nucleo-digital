import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withDb } from "@/lib/safe-db";
import { cleanText } from "@/lib/sanitize";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const productId = cleanText(body.productId, 40);
  const offerId = cleanText(body.offerId, 40) || null;
  if (!productId) return NextResponse.json({ error: "Produto ausente." }, { status: 400 });

  const product = await withDb(
    () => prisma.product.findUnique({ where: { id: productId }, select: { id: true, storeId: true } }),
    null,
  );
  if (!product) return NextResponse.json({ ok: true, stored: false });

  await withDb(
    () =>
      prisma.checkoutIntent.create({
        data: {
          storeId: product.storeId,
          productId: product.id,
          offerId,
          utmSource: cleanText(body.utmSource, 120) || null,
          utmMedium: cleanText(body.utmMedium, 120) || null,
          utmCampaign: cleanText(body.utmCampaign, 180) || null,
          utmContent: cleanText(body.utmContent, 180) || null,
          utmTerm: cleanText(body.utmTerm, 180) || null,
        },
      }),
    null,
  );

  return NextResponse.json({ ok: true, stored: true });
}
