"use server";

import { parseContactForm } from "@/lib/validations/contact";

export type ContactState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string>;
};

export async function contactAction(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = parseContactForm(formData);
  if (!parsed.data) {
    return { fieldErrors: parsed.errors, error: "Revise os campos destacados." };
  }

  // PLACEHOLDER: envio de e-mail ainda não configurado (sem provedor SMTP).
  console.info("[contato]", parsed.data);

  return {
    success: "Mensagem recebida. Retornaremos em breve no e-mail informado.",
  };
}
