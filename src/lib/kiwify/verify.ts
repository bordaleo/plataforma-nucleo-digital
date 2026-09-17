import { timingSafeEqual } from "crypto";

/**
 * Proteção do webhook — placeholder documentado.
 *
 * A Kiwify ainda não está configurada neste projeto. Não inventamos o
 * algoritmo de assinatura oficial. Enquanto isso, o endpoint aceita:
 * - header `x-webhook-secret` igual a KIWIFY_WEBHOOK_SECRET
 * - ou `authorization: Bearer <KIWIFY_WEBHOOK_SECRET>`
 *
 * Se KIWIFY_WEBHOOK_SECRET estiver vazio, o endpoint recusa a requisição
 * em produção e registra um aviso em desenvolvimento.
 */
export function verifyKiwifySignature(request: Request) {
  const secret = process.env.KIWIFY_WEBHOOK_SECRET ?? "";

  if (!secret) {
    return {
      ok: false,
      reason: "KIWIFY_WEBHOOK_SECRET não configurado.",
    };
  }

  const headerSecret = request.headers.get("x-webhook-secret");
  const authorization = request.headers.get("authorization");
  const bearer = authorization?.toLowerCase().startsWith("bearer ")
    ? authorization.slice(7).trim()
    : null;
  const provided = headerSecret ?? bearer;

  if (!provided) {
    return { ok: false, reason: "Assinatura ou segredo ausente." };
  }

  const a = Buffer.from(provided);
  const b = Buffer.from(secret);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { ok: false, reason: "Segredo inválido." };
  }

  return { ok: true as const };
}
