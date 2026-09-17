"use server";

import { redirect } from "next/navigation";
import { createAdminSession, destroyAdminSession, verifyAdminCredentials } from "@/lib/auth";
import { cleanText } from "@/lib/sanitize";

export type AuthState = {
  error?: string;
};

export async function loginAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = cleanText(formData.get("email"), 160).toLowerCase();
  const password = String(formData.get("password") ?? "");
  const from = cleanText(formData.get("from"), 120) || "/admin";

  if (!email || !password) {
    return { error: "Informe e-mail e senha." };
  }

  if (!verifyAdminCredentials(email, password)) {
    return { error: "Credenciais inválidas." };
  }

  await createAdminSession();
  redirect(from.startsWith("/admin") ? from : "/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}
