// ──────────────────────────────────────────────
// Toxicity levels — mirrors the Prisma enum
// ──────────────────────────────────────────────
export type ToxicityLevel = "SAFE" | "CAUTION" | "DANGER";

// ──────────────────────────────────────────────
// Domain models for the UI layer
// ──────────────────────────────────────────────
export interface PlantSummary {
  id: string;
  nameGeneral: string;
  nameAlgerian: string;
  nameScientific: string;
  toxicityLevel: ToxicityLevel;
  description: string;
}

export interface Symptom {
  id: string;
  name: string;
}

export interface ToxicityWarning {
  id: string;
  trimester: number;
  warningType: string;
  details: string;
}

export interface Source {
  id: string;
  thesisTitle: string;
  university: string;
  urlOrPage?: string | null;
}

export interface PlantFull extends PlantSummary {
  symptoms: Symptom[];
  warnings: ToxicityWarning[];
  sources: Source[];
}
