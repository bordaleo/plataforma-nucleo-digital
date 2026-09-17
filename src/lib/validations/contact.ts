import { cleanMultiline, cleanText, isEmail } from "@/lib/sanitize";

export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

export function parseContactForm(formData: FormData) {
  const name = cleanText(formData.get("name"), 80);
  const email = cleanText(formData.get("email"), 160).toLowerCase();
  const message = cleanMultiline(formData.get("message"), 2000);
  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = "Informe seu nome.";
  if (!isEmail(email)) errors.email = "Informe um e-mail válido.";
  if (message.length < 10) errors.message = "Escreva uma mensagem com pelo menos 10 caracteres.";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return { data: { name, email, message } satisfies ContactInput, errors };
}
