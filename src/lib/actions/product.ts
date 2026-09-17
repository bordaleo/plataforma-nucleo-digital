"use server";

import { ProductStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSelectedAdminStore } from "@/lib/admin-store";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slug";
import { storeHref } from "@/lib/store";
import { parseProductForm, type FieldErrors } from "@/lib/validations/product";

export type ProductFormState = {
  errors?: FieldErrors;
  message?: string;
};

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
}

async function assertCategoryInStore(categoryId: string, storeId: string) {
  const category = await prisma.category.findFirst({
    where: { id: categoryId, storeId },
    select: { id: true },
  });
  return Boolean(category);
}

function revalidateStorefront(storeSlug: string, productSlug?: string) {
  revalidatePath(storeHref(storeSlug, "/"));
  revalidatePath(storeHref(storeSlug, "/produtos"));
  revalidatePath("/admin/produtos");
  if (productSlug) {
    revalidatePath(storeHref(storeSlug, `/produtos/${productSlug}`));
  }
}

export async function createProductAction(_prev: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await requireAdmin();
  const store = await getSelectedAdminStore();
  const parsed = parseProductForm(formData);
  if (!parsed.data) return { errors: parsed.errors };

  if (!(await assertCategoryInStore(parsed.data.categoryId, store.id))) {
    return { errors: { categoryId: "A categoria precisa pertencer à loja selecionada." } };
  }

  const taken = await prisma.product.findMany({
    where: { storeId: store.id },
    select: { slug: true },
  });
  const slug = uniqueSlug(
    parsed.data.slug,
    taken.map((item) => item.slug),
  );

  const product = await prisma.product.create({
    data: { ...parsed.data, slug, storeId: store.id },
  });

  revalidateStorefront(store.slug, slug);
  redirect(`/admin/produtos/${product.id}`);
}

export async function updateProductAction(
  id: string,
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();
  const parsed = parseProductForm(formData);
  if (!parsed.data) return { errors: parsed.errors };

  const current = await prisma.product.findUnique({
    where: { id },
    include: { store: true },
  });
  if (!current) return { errors: { name: "Produto não encontrado." } };

  if (!(await assertCategoryInStore(parsed.data.categoryId, current.storeId))) {
    return { errors: { categoryId: "A categoria precisa pertencer à mesma loja do produto." } };
  }

  const taken = await prisma.product.findMany({
    where: { storeId: current.storeId, id: { not: id } },
    select: { slug: true },
  });
  const slug = uniqueSlug(
    parsed.data.slug,
    taken.map((item) => item.slug),
  );

  await prisma.product.update({
    where: { id },
    data: { ...parsed.data, slug, storeId: current.storeId },
  });

  revalidateStorefront(current.store.slug, slug);
  return { message: "Produto atualizado." };
}

export async function toggleProductStatusAction(id: string, status: ProductStatus) {
  await requireAdmin();
  const product = await prisma.product.update({
    where: { id },
    data: { status },
    include: { store: true },
  });
  revalidateStorefront(product.store.slug, product.slug);
}

export async function deleteProductAction(id: string) {
  await requireAdmin();
  const current = await prisma.product.findUnique({
    where: { id },
    include: { store: true },
  });
  if (!current) redirect("/admin/produtos");

  const linked = await prisma.orderItem.count({ where: { productId: id } });
  if (linked > 0) {
    await prisma.product.update({
      where: { id },
      data: { status: ProductStatus.INACTIVE },
    });
  } else {
    await prisma.product.delete({ where: { id } });
  }
  revalidateStorefront(current.store.slug);
  redirect("/admin/produtos");
}
