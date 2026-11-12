import { createFileRoute } from "@tanstack/react-router";

// Every other path (cadastro, dashboard, ...) is drawn by the Techocean site itself.
export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Techocean — Painel e Cadastro" },
      { name: "description", content: "Área de clientes e painel da Techocean para operações portuárias." },
      { property: "og:title", content: "Techocean — Painel e Cadastro" },
      { property: "og:description", content: "Área de clientes e painel da Techocean para operações portuárias." },
    ],
  }),
  component: () => null,
});
