"use client";

import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SymptomFilter } from "@/components/SymptomFilter";
import { PlantCard } from "@/components/PlantCard";
import { TrafficLightBadge } from "@/components/TrafficLightBadge";
import type { ToxicityLevel } from "@/types";
import { Leaf } from "lucide-react";

interface PlantData {
  id: string;
  nameGeneral: string;
  nameAlgerian: string;
  nameScientific: string;
  toxicityLevel: ToxicityLevel;
  description: string;
  symptomNames: string[];
}

interface GuideClientProps {
  plants: PlantData[];
  symptoms: string[];
}

export function GuideClient({ plants, symptoms }: GuideClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);

  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          plant.nameGeneral.toLowerCase().includes(q) ||
          plant.nameAlgerian.toLowerCase().includes(q) ||
          plant.nameScientific.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }
      // Symptom filter
      if (selectedSymptom) {
        if (!plant.symptomNames.includes(selectedSymptom)) return false;
      }
      return true;
    });
  }, [plants, searchQuery, selectedSymptom]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Le Guide des Plantes
        </h1>
        <p className="mt-2 text-muted-foreground">
          Recherchez une plante par son nom français, algérien ou scientifique.
        </p>
      </div>

      {/* Search */}
      <SearchBar onSearch={setSearchQuery} />

      {/* Symptom filters */}
      <div className="mt-5">
        <SymptomFilter symptoms={symptoms} onSelect={setSelectedSymptom} />
      </div>

      {/* Legend */}
      <div className="mt-8 mb-6 flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">
          Légende :
        </span>
        <TrafficLightBadge level="SAFE" size="sm" />
        <TrafficLightBadge level="CAUTION" size="sm" />
        <TrafficLightBadge level="DANGER" size="sm" />
      </div>

      {/* Plant Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
            Aucune plante trouvée
            {searchQuery && <> pour « {searchQuery} »</>}
            {selectedSymptom && <> avec le symptôme « {selectedSymptom} »</>}.
          </p>
        </div>
      )}
    </div>
  );
}
