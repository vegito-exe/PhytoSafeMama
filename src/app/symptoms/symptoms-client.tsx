"use client";

import { useState } from "react";
import { PlantCard } from "@/components/PlantCard";
import { Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToxicityLevel } from "@/types";

interface PlantData {
  id: string;
  nameFr: string;
  nameAr: string;
  nameScientific: string;
  toxicityLevel: ToxicityLevel;
  description: string;
}

interface SymptomData {
  id: string;
  name: string;
  plants: PlantData[];
}

interface SymptomsClientProps {
  symptoms: SymptomData[];
}

export function SymptomsClient({ symptoms }: SymptomsClientProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const activeSymptom = symptoms.find((s) => s.id === selected);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Maux & Solutions
        </h1>
        <p className="mt-2 text-muted-foreground">
          Sélectionnez un symptôme pour découvrir les plantes adaptées.
        </p>
      </div>

      {/* Symptom pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {symptoms.map((symptom) => (
          <button
            key={symptom.id}
            type="button"
            onClick={() =>
              setSelected(selected === symptom.id ? null : symptom.id)
            }
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
              selected === symptom.id
                ? "border-primary/40 bg-primary/10 text-primary shadow-sm"
                : "border-border/60 bg-white/70 text-muted-foreground hover:border-primary/30 hover:bg-primary/5"
            )}
          >
            {symptom.name}
            <span className="ml-1.5 text-xs opacity-60">
              ({symptom.plants.length})
            </span>
          </button>
        ))}
      </div>

      {/* Results */}
      {activeSymptom ? (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Plantes pour : {activeSymptom.name}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activeSymptom.plants.map((plant) => (
              <PlantCard
                key={plant.id}
                nameFr={plant.nameFr}
                nameAr={plant.nameAr}
                nameEn=""
                nameScientific={plant.nameScientific}
                family=""
                toxicityLevel={plant.toxicityLevel}
                description={plant.description}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Stethoscope className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground">
            Cliquez sur un symptôme ci-dessus pour voir les plantes associées.
          </p>
        </div>
      )}
    </div>
  );
}
