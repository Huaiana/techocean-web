import { z } from "zod";

/** Valida CPF pelos dígitos verificadores. */
export function cpfValido(valor: string): boolean {
  const cpf = valor.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  const digito = (base: string, peso: number) => {
    let soma = 0;
    for (const n of base) soma += Number(n) * peso--;
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  return (
    digito(cpf.slice(0, 9), 10) === Number(cpf[9]) &&
    digito(cpf.slice(0, 10), 11) === Number(cpf[10])
  );
}

/** Requisitos do cadastro de usuário (mesmas regras que o back-end deve aplicar). */
export const cadastroSchema = z.object({
  nome: z.string().trim().min(3, "Informe o nome completo.").max(100),
  email: z.string().trim().email("E-mail inválido.").max(255),
  telefone: z
    .string()
    .trim()
    .refine((t) => /^\d{10,11}$/.test(t.replace(/\D/g, "")), "Telefone deve ter DDD + número."),
  cpf: z.string().trim().refine(cpfValido, "CPF inválido."),
  senha: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .regex(/[A-Za-z]/, "A senha deve conter letras.")
    .regex(/\d/, "A senha deve conter números."),
});

export type Cadastro = z.infer<typeof cadastroSchema>;
