"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { offerHref } from "@/lib/offer";
import { prisma } from "@/lib/prisma";
import { parseOfferForm, parseSalesContentForm, type FieldErrors } from "@/lib/validations/offer";

export type OfferFormState = {
  errors?: FieldErrors;
  message?: string;
};

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
}

function revalidateOffer(storeSlug: string, productSlug: string, productId: string) {
  revalidatePath(offerHref(storeSlug, productSlug));
  revalidatePath(`/admin/produtos/${productId}`);
  revalidatePath(`/admin/produtos/${productId}/oferta`);
}

export async function saveOfferAction(
  productId: string,
  offerId: string | null,
  _prev: OfferFormState,
  formData: FormData,
): Promise<OfferFormState> {
  await requireAdmin();
  const parsed = parseOfferForm(formData);
  if (!parsed.data) return { errors: parsed.errors };

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { store: true },
  });
  if (!product) return { errors: { name: "Produto não encontrado." } };

  const offer = offerId
    ? await prisma.offer.update({ where: { id: offerId }, data: parsed.data })
    : await prisma.offer.create({ data: { ...parsed.data, productId } });

  if (parsed.data.active) {
    await prisma.offer.updateMany({
      where: { productId, id: { not: offer.id } },
      data: { active: false },
    });
  }

  revalidateOffer(product.store.slug, product.slug, product.id);
  return { message: "Oferta salva." };
}

export async function saveSalesContentAction(
  productId: string,
  _prev: OfferFormState,
  formData: FormData,
): Promise<OfferFormState> {
  await requireAdmin();
  const parsed = parseSalesContentForm(formData);
  if (!parsed.data) return { errors: parsed.errors };

  const product = await prisma.product.update({
    where: { id: productId },
    data: parsed.data,
    include: { store: true },
  });

  revalidateOffer(product.store.slug, product.slug, product.id);
  return { message: "Conteúdo de venda atualizado." };
}
