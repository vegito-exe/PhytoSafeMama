import Link from "next/link";
import Image from "next/image";

import {
  Leaf,
  ShieldCheck,
  BookOpen,
  Stethoscope,
  FlaskConical,
  ArrowRight,
  Heart,
  Search,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* ─── Hero ─────────────────────────────────── */}
      <section className=" relative overflow-hidden">
        {/* Decorative blurs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-emerald-200/20 blur-2xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-amber-100/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:pb-28 lg:px-8 lg:pb-36 text-center">
          {/* Logo icon */}
          <div className="mx-auto mb-6 flex h-40 w-40 items-center justify-center rounded-2xl shadow-sm">
            <Image width={400} height={400} src={"/logo.svg"} alt="logo" />
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            PhytoSafe<span className="text-primary">Mama</span>{" "}
            <span className="text-muted-foreground font-semibold">Algérie</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Vérifiez la sécurité des{" "}
            <strong className="text-foreground">plantes médicinales</strong>{" "}
            pendant votre grossesse. Un guide scientifique basé sur des{" "}
            <strong className="text-foreground">
              thèses universitaires algériennes
            </strong>
            .
          </p>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground/80">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Sources académiques vérifiées
            </span>
            <span className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-400" />
              Conçu pour les futures mamans
            </span>
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary/70" />
              100% gratuit
            </span>
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              <Search className="h-5 w-5" />
              Consulter le Guide
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/symptoms"
              className="inline-flex items-center gap-2 rounded-2xl border border-border/60 bg-white/70 px-8 py-3.5 text-base font-semibold text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
            >
              <Stethoscope className="h-5 w-5 text-primary/70" />
              Trouver par symptôme
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Features Grid ────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
          Votre santé, notre priorité
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Trois outils complémentaires pour vous accompagner tout au long de
          votre grossesse.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {/* Card 1 */}
          <Link
            href="/guide"
            className="group rounded-2xl border border-border/50 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 transition-colors group-hover:bg-emerald-100">
              <BookOpen className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Le Guide des Plantes
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Explorez notre base de données complète de plantes médicinales avec
              leur niveau de sécurité pendant la grossesse.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
              Explorer <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>

          {/* Card 2 */}
          <Link
            href="/symptoms"
            className="group rounded-2xl border border-border/50 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 transition-colors group-hover:bg-amber-100">
              <Stethoscope className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Maux & Solutions
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Sélectionnez un symptôme pour découvrir quelles plantes sont
              recommandées et lesquelles éviter.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
              Trouver <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>

          {/* Card 3 */}
          <Link
            href="/science"
            className="group rounded-2xl border border-border/50 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 transition-colors group-hover:bg-violet-100">
              <FlaskConical className="h-6 w-6 text-violet-600" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Le Coin Scientifique
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Accédez aux données détaillées issues de thèses universitaires pour
              les professionnels de santé.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
              Découvrir <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </section>

      {/* ─── How it works ─────────────────────────── */}
      <section className="border-t border-border/30 bg-muted/20">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Comment ça marche ?
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Recherchez",
                desc: "Tapez le nom de la plante en français, algérien ou scientifique.",
              },
              {
                step: "2",
                title: "Vérifiez",
                desc: "Consultez le niveau de sécurité : Indiqué 🟢, Prudence 🟡, Contre-indiqué 🔴.",
              },
              {
                step: "3",
                title: "Informez-vous",
                desc: "Lisez les détails par trimestre et les sources scientifiques.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
