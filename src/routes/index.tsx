import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDown, Compass, Anchor, ShieldCheck, Container } from "lucide-react";
import heroPort from "@/assets/hero-port.jpg";
import lashing from "@/assets/lashing.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PortoSeguro — Amarração e Segurança de Cargas" },
      {
        name: "description",
        content:
          "Projetamos amarrações e instalações que protegem cada produto até o destino. 15+ anos de experiência, 27 portos atendidos, 0 incidentes de carga.",
      },
      { property: "og:title", content: "PortoSeguro — Amarração e Segurança de Cargas" },
      {
        property: "og:description",
        content:
          "A segurança da sua carga começa antes de embarcar. Precisão em cada amarração.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "15+", label: "Anos de experiência" },
  { value: "27", label: "Portos atendidos" },
  { value: "0", label: "Incidentes de carga" },
];

const services = [
  {
    icon: Compass,
    num: "01",
    title: "Consultoria operacional",
    desc: "Planejamento técnico para operações mais seguras, eficientes e previsíveis.",
  },
  {
    icon: Anchor,
    num: "02",
    title: "Amarração de cargas",
    desc: "Projetos de amarração sob medida para cada tipo de carga e modal de transporte.",
  },
  {
    icon: ShieldCheck,
    num: "03",
    title: "Inspeção e compliance",
    desc: "Auditorias e laudos que garantem conformidade com normas internacionais.",
  },
  {
    icon: Container,
    num: "04",
    title: "Instalações portuárias",
    desc: "Estruturas e sistemas de fixação instalados com precisão e rastreabilidade.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <header className="relative flex min-h-svh flex-col overflow-hidden">
        <img
          src={heroPort}
          alt="Porto de contêineres ao entardecer"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />

        <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
          <span className="font-display text-lg font-bold tracking-tight">
            Porto<span className="text-primary">Seguro</span>
          </span>
          <a
            href="#contato"
            className="rounded-full border border-input px-5 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          >
            Fale conosco
          </a>
        </nav>

        <div className="relative z-10 mt-auto px-6 pb-16 md:px-12 md:pb-24">
          <p className="eyebrow mb-4">Precisão em cada amarração</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            A segurança da sua carga começa antes de embarcar.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Projetamos amarrações e instalações que protegem cada produto até o
            destino.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Solicitar orçamento <ArrowUpRight className="size-4" />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Conheça nossos serviços <ArrowDown className="size-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="border-y border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-10 text-center md:py-14">
              <p className="font-display text-5xl font-bold md:text-6xl">{s.value}</p>
              <p className="eyebrow mt-3 text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* História */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
        <p className="eyebrow">/ 01 — Nossa história</p>
        <div className="mt-6 grid gap-10 md:grid-cols-2 md:gap-16">
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            Experiência construída no cais, projeto a projeto.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Há mais de 15 anos atuamos nos principais portos do país, unindo
            engenharia e prática operacional para garantir que cada carga chegue
            intacta ao destino. Nossa equipe acompanha embarques de ponta a
            ponta, do planejamento da amarração à inspeção final.
          </p>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="bg-card">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          <p className="eyebrow">/ 02 — Serviços</p>
          <h2 className="mt-6 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
            Soluções completas para a sua operação
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {services.map((s) => (
              <article
                key={s.num}
                className="group rounded-2xl border border-border bg-background p-8 transition-colors hover:border-primary/50"
              >
                <div className="flex items-start justify-between">
                  <s.icon className="size-8 text-primary" />
                  <span className="font-mono text-sm text-muted-foreground">{s.num}</span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Saiba mais
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Na prática */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
        <p className="eyebrow">/ 03 — Na prática</p>
        <div className="mt-6 grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              Cada detalhe verificado antes da partida.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Do cálculo de tensão das cintas à conferência dos pontos de
              fixação, nosso time segue protocolos rigorosos em campo. É assim
              que mantemos zero incidentes de carga em toda a nossa história.
            </p>
            <a
              href="#contato"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-input px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Agende uma visita técnica <ArrowUpRight className="size-4" />
            </a>
          </div>
          <img
            src={lashing}
            alt="Trabalhador amarrando contêiner com cinta de segurança"
            loading="lazy"
            width={1024}
            height={768}
            className="rounded-2xl border border-border object-cover"
          />
        </div>
      </section>

      {/* CTA / Contato */}
      <section id="contato" className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center md:px-12 md:py-28">
          <p className="eyebrow">/ 04 — Contato</p>
          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
            Pronto para embarcar com segurança?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Conte com quem entende de amarração de cargas. Solicite um
            orçamento e receba uma proposta técnica para a sua operação.
          </p>
          <a
            href="mailto:contato@portoseguro.com.br"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Solicitar orçamento <ArrowUpRight className="size-4" />
          </a>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-display font-bold text-foreground">
            Porto<span className="text-primary">Seguro</span>
          </span>
          <p>© 2026 PortoSeguro. Precisão em cada amarração.</p>
        </div>
      </footer>
    </div>
  );
}
