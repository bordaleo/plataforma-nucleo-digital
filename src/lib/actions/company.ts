"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseCompanyForm } from "@/lib/validations/company";

export type CompanyFormState = {
  errors?: Record<string, string>;
  message?: string;
};

export async function updateCompanyAction(_prev: CompanyFormState, formData: FormData): Promise<CompanyFormState> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const parsed = parseCompanyForm(formData);
  if (!parsed.data) return { errors: parsed.errors };

  const company = await prisma.company.findFirst({ orderBy: { createdAt: "asc" } });
  if (!company) return { errors: { name: "Empresa não encontrada." } };

  await prisma.company.update({
    where: { id: company.id },
    data: parsed.data,
  });

  revalidatePath("/");
  revalidatePath("/admin/company");
  return { message: "Empresa atualizada." };
}
