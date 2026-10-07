import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  limparAgendamentoPendente,
  lerAgendamentoPendente,
  solicitarAgendamento,
  type DadosAgendamento,
} from "@/services/agendamentos";
import { cadastroSchema } from "@/models/cadastro";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [{ title: "Cadastro de usuário — Techocean" }],
  }),
  component: Cadastro,
});

function Cadastro() {
  const [agendamento, setAgendamento] = useState<DadosAgendamento | null>(null);
  const [carregado, setCarregado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    setAgendamento(lerAgendamentoPendente());
    setCarregado(true);
  }, []);

  async function cadastrarEAgendar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!agendamento) {
      return;
    }

    setErro("");
    setEnviando(true);
    const form = new FormData(event.currentTarget);

    const validacao = cadastroSchema.safeParse({
      ...agendamento,
      cpf: String(form.get("cpf") ?? ""),
      senha: String(form.get("senha") ?? ""),
    });
    if (!validacao.success) {
      setErro(validacao.error.issues[0]?.message ?? "Dados inválidos.");
      setEnviando(false);
      return;
    }

    try {
      await solicitarAgendamento({
        ...agendamento,
        cpf: validacao.data.cpf.replace(/\D/g, ""),
        senha: validacao.data.senha,
      });
      limparAgendamentoPendente();
      setSucesso(true);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível concluir o cadastro e o agendamento.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-foreground">
      <section className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 md:p-10">
        <Link to="/" className="text-sm text-primary hover:underline">
          Voltar ao site
        </Link>

        {sucesso ? (
          <div className="mt-8" role="status">
            <p className="eyebrow">Cadastro confirmado</p>
            <h1 className="mt-3 text-3xl font-bold">Visita solicitada!</h1>
            <p className="mt-4 text-muted-foreground">
              Seu cadastro foi criado e a solicitação da visita foi confirmada.
              Nossa equipe entrará em contato pelo telefone informado.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
            >
              Voltar ao site
            </Link>
          </div>
        ) : (
          <>
            <p className="eyebrow mt-8">Cadastro de usuário</p>
            <h1 className="mt-3 text-3xl font-bold">Crie seu cadastro</h1>
            <p className="mt-4 text-muted-foreground">
              Para solicitar uma visita, precisamos criar seu cadastro de
              usuário.
            </p>

            {!carregado ? (
              <p className="mt-8 text-muted-foreground">Carregando solicitação...</p>
            ) : !agendamento ? (
              <div className="mt-8" role="alert">
                <p className="text-destructive">
                  Não encontramos uma solicitação de visita pendente. Volte ao
                  site e inicie o agendamento novamente.
                </p>
                <Link
                  to="/"
                  className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
                >
                  Ir para o site
                </Link>
              </div>
            ) : (
              <form className="mt-8 space-y-5" onSubmit={cadastrarEAgendar}>
                <div className="rounded-xl border border-border p-4 text-sm">
                  <p>
                    <span className="font-semibold">Nome:</span> {agendamento.nome}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold">E-mail:</span> {agendamento.email}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold">Telefone:</span>{" "}
                    {agendamento.telefone}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold">Visita:</span>{" "}
                    {new Date(agendamento.dataHora).toLocaleString("pt-BR")}
                  </p>
                </div>

                <label className="block text-sm font-medium" htmlFor="cpf">
                  CPF
                  <input
                    id="cpf"
                    name="cpf"
                    autoComplete="off"
                    required
                    className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>

                <label className="block text-sm font-medium" htmlFor="senha">
                  Crie uma senha para seu usuário
                  <input
                    id="senha"
                    name="senha"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
                  />
                  <span className="mt-1 block text-xs text-muted-foreground">
                    Use pelo menos 8 caracteres.
                  </span>
                </label>

                {erro && (
                  <p className="text-sm text-destructive" role="alert">
                    {erro}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
                >
                  {enviando ? "Cadastrando e agendando..." : "Cadastrar e confirmar visita"}
                </button>
              </form>
            )}
          </>
        )}
      </section>
    </main>
  );
}
