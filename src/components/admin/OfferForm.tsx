"use client";

import type { Offer, Product } from "@prisma/client";
import { useActionState } from "react";
import { saveOfferAction, saveSalesContentAction, type OfferFormState } from "@/lib/actions/offer";
import { formatPrice } from "@/lib/format";
import { toDateTimeLocal } from "@/lib/validations/offer";
import { faqToFormValue } from "@/lib/validations/product";

const fieldClass = "h-12 w-full border border-line bg-cream px-4 text-ink outline-none ring-bronze/30 focus:ring-2";
const areaClass = "w-full border border-line bg-cream px-4 py-3 text-ink outline-none ring-bronze/30 focus:ring-2";

function centsToInput(cents?: number | null) {
  if (cents == null) return "";
  return formatPrice(cents).replace("R$", "").trim();
}

export function SalesContentForm({ product }: { product: Product }) {
  const [state, action, pending] = useActionState(saveSalesContentAction.bind(null, product.id), {} as OfferFormState);

  return (
    <form action={action} className="grid gap-6">
      {state.message ? <p className="text-sm text-sage">{state.message}</p> : null}
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Imagens da galeria</span>
        <textarea name="galleryImages" rows={3} defaultValue={product.galleryImages.join("\n")} className={areaClass} />
        <span className="mt-1 block text-xs text-muted">Uma URL ou caminho por linha.</span>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Mockups</span>
        <textarea name="mockupImages" rows={3} defaultValue={product.mockupImages.join("\n")} className={areaClass} />
      </label>
      <Field label="Vídeo (URL)" name="videoUrl" defaultValue={product.videoUrl ?? ""} error={state.errors?.videoUrl} />
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Benefícios</span>
        <textarea name="benefits" rows={4} defaultValue={product.benefits.join("\n")} className={areaClass} />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">O que está incluído</span>
        <textarea name="contents" rows={4} defaultValue={product.contents.join("\n")} className={areaClass} />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Este material é para você se</span>
        <textarea name="audiencePoints" rows={4} defaultValue={product.audiencePoints.join("\n")} className={areaClass} />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Talvez não seja para você se</span>
        <textarea name="notFor" rows={3} defaultValue={product.notFor.join("\n")} className={areaClass} />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">FAQ</span>
        <textarea name="faq" rows={6} defaultValue={faqToFormValue(product.faq)} className={areaClass} />
        <span className="mt-1 block text-xs text-muted">Bloco: pergunta na primeira linha, resposta abaixo. Separe com linha em branco.</span>
      </label>
      <label className="flex items-center gap-3 text-sm text-ink-soft">
        <input type="checkbox" name="stickyCtaEnabled" defaultChecked={product.stickyCtaEnabled} />
        CTA fixo no mobile
      </label>
      <button type="submit" disabled={pending} className="inline-flex h-12 items-center justify-center rounded-full bg-forest px-6 text-sm text-cream disabled:opacity-60">
        {pending ? "Salvando..." : "Salvar conteúdo de venda"}
      </button>
    </form>
  );
}

export function OfferForm({ product, offer }: { product: Product; offer?: Offer }) {
  const [state, action, pending] = useActionState(
    saveOfferAction.bind(null, product.id, offer?.id ?? null),
    {} as OfferFormState,
  );

  return (
    <form action={action} className="grid gap-6">
      {state.message ? <p className="text-sm text-sage">{state.message}</p> : null}
      <Field label="Nome interno" name="name" defaultValue={offer?.name ?? `${product.name} — oferta`} error={state.errors?.name} required />
      <Field label="Headline" name="headline" defaultValue={offer?.headline ?? product.name} error={state.errors?.headline} required />
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Subheadline</span>
        <textarea name="subheadline" rows={3} required defaultValue={offer?.subheadline ?? product.shortDescription} className={areaClass} />
        {state.errors?.subheadline ? <p className="mt-1 text-sm text-bronze-deep">{state.errors.subheadline}</p> : null}
      </label>
      <Field label="Selo" name="badge" defaultValue={offer?.badge ?? "Oferta especial"} />
      <Field label="Texto da barra" name="barText" defaultValue={offer?.barText ?? ""} />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Preço original (R$)"
          name="originalPrice"
          defaultValue={centsToInput(offer?.originalPriceCents ?? product.priceCents)}
          error={state.errors?.originalPrice}
          required
        />
        <Field
          label="Preço da oferta (R$)"
          name="promotionalPrice"
          defaultValue={centsToInput(offer?.promotionalPriceCents ?? product.promotionalPriceCents ?? product.priceCents)}
          error={state.errors?.promotionalPrice}
          required
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Início"
          name="startsAt"
          type="datetime-local"
          defaultValue={offer ? toDateTimeLocal(offer.startsAt) : ""}
          error={state.errors?.startsAt}
          required
        />
        <Field
          label="Término"
          name="endsAt"
          type="datetime-local"
          defaultValue={offer ? toDateTimeLocal(offer.endsAt) : ""}
          error={state.errors?.endsAt}
          required
        />
      </div>
      <label className="flex items-center gap-3 text-sm text-ink-soft">
        <input type="checkbox" name="guaranteeEnabled" defaultChecked={offer?.guaranteeEnabled} />
        Exibir garantia
      </label>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Dias de garantia" name="guaranteeDays" defaultValue={offer?.guaranteeDays?.toString() ?? ""} error={state.errors?.guaranteeDays} />
        <Field label="Texto da garantia" name="guaranteeText" defaultValue={offer?.guaranteeText ?? ""} error={state.errors?.guaranteeText} />
      </div>
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Se a janela acabar</span>
        <select name="expiredBehavior" defaultValue={offer?.expiredBehavior ?? "hide_urgency"} className={fieldClass}>
          <option value="hide_urgency">Esconder urgência e manter CTA</option>
          <option value="unavailable">Encerrar oferta e apontar ao catálogo</option>
        </select>
      </label>
      <label className="flex items-center gap-3 text-sm text-ink-soft">
        <input type="checkbox" name="stickyCtaEnabled" defaultChecked={offer?.stickyCtaEnabled ?? true} />
        CTA fixo no mobile
      </label>
      <label className="flex items-center gap-3 text-sm text-ink-soft">
        <input type="checkbox" name="demo" defaultChecked={offer?.demo} />
        Oferta de demonstração (não apresentar como promoção real)
      </label>
      <label className="flex items-center gap-3 text-sm text-ink-soft">
        <input type="checkbox" name="active" defaultChecked={offer?.active ?? true} />
        Oferta ativa (desativa as outras deste produto)
      </label>
      <button type="submit" disabled={pending} className="inline-flex h-12 items-center justify-center rounded-full bg-forest px-6 text-sm text-cream disabled:opacity-60">
        {pending ? "Salvando..." : offer ? "Salvar oferta" : "Criar oferta"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  error,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  error?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-ink-soft">{label}</span>
      <input name={name} type={type} defaultValue={defaultValue} required={required} className={fieldClass} />
      {error ? <p className="mt-1 text-sm text-bronze-deep">{error}</p> : null}
    </label>
  );
}
