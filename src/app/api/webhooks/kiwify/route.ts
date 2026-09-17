import { NextResponse } from "next/server";
import { extractKiwifyEvent } from "@/lib/kiwify/map-event";
import { processKiwifyEvent } from "@/lib/kiwify/process-event";
import { verifyKiwifySignature } from "@/lib/kiwify/verify";

export const runtime = "nodejs";

/**
 * POST /api/webhooks/kiwify
 *
 * Estrutura pronta para a Kiwify, sem contrato oficial inventado.
 * 1. Valida o segredo (placeholder até a assinatura real ser documentada)
 * 2. Lê o JSON como desconhecido
 * 3. Normaliza o evento
 * 4. Atualiza Customer, Order e Payment com idempotência
 */
export async function POST(request: Request) {
  const verification = verifyKiwifySignature(request);
  if (!verification.ok) {
    const status = process.env.NODE_ENV === "production" ? 401 : 503;
    return NextResponse.json({ error: verification.reason }, { status });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const event = extractKiwifyEvent(payload);

  try {
    const result = await processKiwifyEvent(event);
    return NextResponse.json({
      ok: true,
      result,
      eventType: event.eventType,
    });
  } catch (error) {
    console.error("[kiwify webhook]", error);
    return NextResponse.json({ error: "Falha ao persistir o evento." }, { status: 500 });
  }
}
