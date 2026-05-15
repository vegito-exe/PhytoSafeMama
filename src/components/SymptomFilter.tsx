"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface SymptomFilterProps {
  symptoms: string[];
  onSelect?: (selected: string | null) => void;
  className?: string;
}

// Default symptoms to display if none are provided
const DEFAULT_SYMPTOMS = [
  "Nausées",
  "Stress",
  "Insomnie",
  "Douleurs",
  "Digestion",
  "Fatigue",
  "Immunité",
  "Ballonnements",
];

export function SymptomFilter({
  symptoms = DEFAULT_SYMPTOMS,
  onSelect,
  className,
}: SymptomFilterProps) {
  const [active, setActive] = useState<string | null>(null);

  const handleClick = (symptom: string) => {
    const next = active === symptom ? null : symptom;
    setActive(next);
    onSelect?.(next);
  };

  return (
    <div className={cn("flex flex-wrap justify-center gap-2", className)}>
      {symptoms.map((symptom) => {
        const isActive = active === symptom;
        return (
          <button
            key={symptom}
            type="button"
            onClick={() => handleClick(symptom)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2",
              isActive
                ? "border-primary/40 bg-primary/10 text-primary shadow-sm"
                : "border-border/60 bg-white/70 text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary/80"
            )}
          >
            {symptom}
          </button>
        );
      })}
    </div>
  );
}
