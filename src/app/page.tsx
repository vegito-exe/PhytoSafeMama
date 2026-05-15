"use client";

import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SymptomFilter } from "@/components/SymptomFilter";
import { PlantCard } from "@/components/PlantCard";
import { NavigationTabs, type TabValue } from "@/components/NavigationTabs";
import { TrafficLightBadge } from "@/components/TrafficLightBadge";
import { Leaf, ShieldCheck, BookOpen } from "lucide-react";
import type { ToxicityLevel } from "@/types";

// ──────────────────────────────────────────────
// Sample data — will be replaced by real DB data
// ──────────────────────────────────────────────
const SAMPLE_PLANTS: {
  id: string;
  nameGeneral: string;
  nameAlgerian: string;
  nameScientific: string;
  toxicityLevel: ToxicityLevel;
  description: string;
}[] = [
  {
    id: "1",
    nameGeneral: "Gingembre",
    nameAlgerian: "Skenjbir",
    nameScientific: "Zingiber officinale",
    toxicityLevel: "SAFE",
    description:
      "Le gingembre est considéré comme sûr pendant la grossesse. Il est souvent utilisé pour soulager les nausées matinales du premier trimestre.",
  },
  {
    id: "2",
    nameGeneral: "Sauge",
    nameAlgerian: "Salmiya",
    nameScientific: "Salvia officinalis",
    toxicityLevel: "DANGER",
    description:
      "La sauge contient de la thuyone, une substance neurotoxique et potentiellement abortive. Son utilisation est contre-indiquée pendant toute la grossesse.",
  },
  {
    id: "3",
    nameGeneral: "Camomille",
    nameAlgerian: "Baboundj",
    nameScientific: "Matricaria chamomilla",
    toxicityLevel: "CAUTION",
    description:
      "La camomille est généralement bien tolérée en infusion légère, mais une consommation excessive peut stimuler les contractions utérines.",
  },
  {
    id: "4",
    nameGeneral: "Menthe poivrée",
    nameAlgerian: "Naânaâ",
    nameScientific: "Mentha × piperita",
    toxicityLevel: "CAUTION",
    description:
      "La menthe poivrée est acceptable en petites quantités. À éviter en grande quantité car elle peut causer des reflux gastro-œsophagiens.",
  },
  {
    id: "5",
    nameGeneral: "Fenouil",
    nameAlgerian: "Besbès",
    nameScientific: "Foeniculum vulgare",
    toxicityLevel: "DANGER",
    description:
      "Le fenouil contient de l'estragole, une substance potentiellement cancérigène et œstrogénique. Déconseillé pendant la grossesse.",
  },
  {
    id: "6",
    nameGeneral: "Thym",
    nameAlgerian: "Zaâtar",
    nameScientific: "Thymus vulgaris",
    toxicityLevel: "SAFE",
    description:
      "Le thym en infusion légère est considéré comme sûr pendant la grossesse. Il possède des propriétés antiseptiques utiles contre les maux de gorge.",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabValue>("guide");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);

  // Simple client-side filter
  const filteredPlants = SAMPLE_PLANTS.filter((plant) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      plant.nameGeneral.toLowerCase().includes(q) ||
      plant.nameAlgerian.toLowerCase().includes(q) ||
      plant.nameScientific.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex min-h-screen flex-col">
      {/* ─── Hero Section ─────────────────────────── */}
      <header className="bg-gradient-hero relative overflow-hidden">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-emerald-200/20 blur-2xl" />

        <div className="relative mx-auto max-w-5xl px-4 pb-10 pt-12 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Phyto<span className="text-primary">Grossesse</span>{" "}
              <span className="text-muted-foreground font-medium">Algérie</span>
            </h1>
          </div>

          {/* Tagline */}
          <p className="mx-auto mt-3 max-w-xl text-center text-base text-muted-foreground leading-relaxed">
            Vérifiez la sécurité des plantes médicinales pendant votre grossesse.
            <br />
            <span className="text-sm">
              Données issues de <strong>thèses universitaires algériennes</strong>.
            </span>
          </p>

          {/* Trust indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/70">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Sources académiques vérifiées
            </span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-primary/60" />
              Guide pratique pour futures mamans
            </span>
          </div>

          {/* Search Bar */}
          <div className="mt-8">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          {/* Symptom Quick Filters */}
          <div className="mt-5">
            <SymptomFilter
              symptoms={[
                "Nausées",
                "Stress",
                "Insomnie",
                "Douleurs",
                "Digestion",
                "Fatigue",
              ]}
              onSelect={setSelectedSymptom}
            />
          </div>
        </div>
      </header>

      {/* ─── Navigation Tabs ──────────────────────── */}
      <div className="sticky top-0 z-30 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-5xl px-4 py-2 sm:px-6 lg:px-8">
          <NavigationTabs value={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* ─── Main Content ─────────────────────────── */}
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Tab: Le Guide des Plantes */}
          {activeTab === "guide" && (
            <section>
              {/* Legend */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Légende :
                </span>
                <TrafficLightBadge level="SAFE" size="sm" />
                <TrafficLightBadge level="CAUTION" size="sm" />
                <TrafficLightBadge level="DANGER" size="sm" />
              </div>

              {/* Plant Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredPlants.map((plant) => (
                  <PlantCard
                    key={plant.id}
                    nameGeneral={plant.nameGeneral}
                    nameAlgerian={plant.nameAlgerian}
                    nameScientific={plant.nameScientific}
                    toxicityLevel={plant.toxicityLevel}
                    description={plant.description}
                  />
                ))}
              </div>

              {filteredPlants.length === 0 && (
                <div className="py-16 text-center">
                  <Leaf className="mx-auto h-12 w-12 text-muted-foreground/30" />
                  <p className="mt-4 text-muted-foreground">
                    Aucune plante trouvée pour « {searchQuery} »
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Tab: Maux & Solutions */}
          {activeTab === "symptoms" && (
            <section className="py-12 text-center">
              <div className="mx-auto max-w-md">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  Maux & Solutions
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Sélectionnez un symptôme pour découvrir les plantes recommandées
                  et celles à éviter pendant votre grossesse.
                </p>
                {selectedSymptom && (
                  <p className="mt-4 rounded-xl bg-primary/5 p-4 text-sm text-primary font-medium">
                    Filtre actif : <strong>{selectedSymptom}</strong> — Contenu
                    bientôt disponible.
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Tab: Le Coin Scientifique */}
          {activeTab === "science" && (
            <section className="py-12 text-center">
              <div className="mx-auto max-w-md">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  Le Coin Scientifique
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Explorez les données scientifiques détaillées, issues de thèses
                  universitaires algériennes, sur la phytothérapie pendant la
                  grossesse.
                </p>
                <p className="mt-4 rounded-xl bg-amber-50 border border-amber-200/50 p-4 text-sm text-amber-700">
                  🔬 Section réservée aux professionnels de santé — Contenu
                  bientôt disponible.
                </p>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* ─── Footer ───────────────────────────────── */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground/60">
              © 2026 PhytoGrossesse Algérie — Données à titre informatif uniquement.
            </p>
            <p className="text-xs text-muted-foreground/60">
              ⚠️ Consultez toujours votre médecin avant d&apos;utiliser des plantes
              pendant la grossesse.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
