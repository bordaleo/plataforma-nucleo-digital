"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSelectedAdminStore } from "@/lib/admin-store";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slug";
import { storeHref } from "@/lib/store";
import { parseCategoryForm } from "@/lib/validations/category";

export type CategoryFormState = {
  errors?: Record<string, string>;
  message?: string;
};

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
}

export async function createCategoryAction(_prev: CategoryFormState, formData: FormData): Promise<CategoryFormState> {
  await requireAdmin();
  const store = await getSelectedAdminStore();
  const parsed = parseCategoryForm(formData);
  if (!parsed.data) return { errors: parsed.errors };

  const taken = await prisma.category.findMany({
    where: { storeId: store.id },
    select: { slug: true },
  });
  const slug = uniqueSlug(
    parsed.data.slug,
    taken.map((item) => item.slug),
  );

  const category = await prisma.category.create({
    data: { ...parsed.data, slug, storeId: store.id },
  });

  revalidatePath("/admin/categorias");
  revalidatePath(storeHref(store.slug, "/categorias"));
  redirect(`/admin/categorias/${category.id}`);
}

export async function updateCategoryAction(
  id: string,
  _prev: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  await requireAdmin();
  const parsed = parseCategoryForm(formData);
  if (!parsed.data) return { errors: parsed.errors };

  const current = await prisma.category.findUnique({ where: { id } });
  if (!current) return { errors: { name: "Categoria não encontrada." } };

  const taken = await prisma.category.findMany({
    where: { storeId: current.storeId, id: { not: id } },
    select: { slug: true },
  });
  const slug = uniqueSlug(
    parsed.data.slug,
    taken.map((item) => item.slug),
  );

  await prisma.category.update({
    where: { id },
    data: { ...parsed.data, slug },
  });

  revalidatePath("/admin/categorias");
  return { message: "Categoria atualizada." };
}

export async function deleteCategoryAction(id: string) {
  await requireAdmin();
  const linked = await prisma.product.count({ where: { categoryId: id } });
  if (linked > 0) return;
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categorias");
  redirect("/admin/categorias");
}
