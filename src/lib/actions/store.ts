"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slug";
import { ADMIN_STORE_COOKIE } from "@/lib/store";
import { parseStoreForm, type FieldErrors } from "@/lib/validations/store";

export type StoreFormState = {
  errors?: FieldErrors;
  message?: string;
};

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
}

export async function selectStoreAction(formData: FormData) {
  await requireAdmin();
  const storeId = String(formData.get("storeId") ?? "");
  const store = await prisma.store.findUnique({ where: { id: storeId }, select: { id: true } });
  if (!store) return;
  const jar = await cookies();
  jar.set(ADMIN_STORE_COOKIE, store.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  revalidatePath("/admin", "layout");
}

export async function createStoreAction(_prev: StoreFormState, formData: FormData): Promise<StoreFormState> {
  await requireAdmin();
  const parsed = parseStoreForm(formData);
  if (!parsed.data) return { errors: parsed.errors };

  const taken = await prisma.store.findMany({ select: { slug: true } });
  const slug = uniqueSlug(
    parsed.data.slug,
    taken.map((item) => item.slug),
  );

  const company = await prisma.company.findFirst({ orderBy: { createdAt: "asc" } });
  if (!company) {
    return { errors: { name: "Cadastre a empresa antes de criar uma loja." } };
  }

  const store = await prisma.store.create({
    data: { ...parsed.data, slug, companyId: company.id },
  });

  revalidatePath("/");
  revalidatePath("/admin/stores");
  redirect(`/admin/stores/${store.id}`);
}

export async function updateStoreAction(id: string, _prev: StoreFormState, formData: FormData): Promise<StoreFormState> {
  await requireAdmin();
  const parsed = parseStoreForm(formData);
  if (!parsed.data) return { errors: parsed.errors };

  const taken = await prisma.store.findMany({
    where: { id: { not: id } },
    select: { slug: true },
  });
  const slug = uniqueSlug(
    parsed.data.slug,
    taken.map((item) => item.slug),
  );

  await prisma.store.update({
    where: { id },
    data: { ...parsed.data, slug },
  });

  revalidatePath("/");
  revalidatePath("/admin/stores");
  revalidatePath(`/loja/${slug}`);
  return { message: "Loja atualizada." };
}

export async function toggleStoreStatusAction(id: string, active: boolean) {
  await requireAdmin();
  await prisma.store.update({ where: { id }, data: { active } });
  revalidatePath("/");
  revalidatePath("/admin/stores");
}

export async function deleteStoreAction(id: string) {
  await requireAdmin();
  const [products, categories, orders] = await Promise.all([
    prisma.product.count({ where: { storeId: id } }),
    prisma.category.count({ where: { storeId: id } }),
    prisma.order.count({ where: { storeId: id } }),
  ]);

  if (products + categories + orders > 0) {
    return;
  }

  await prisma.store.delete({ where: { id } });
  revalidatePath("/admin/stores");
  redirect("/admin/stores");
}
