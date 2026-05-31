// ──────────────────────────────────────────────
// Toxicity / Pregnancy-safety levels
// ──────────────────────────────────────────────
export type ToxicityLevel = "SAFE" | "CAUTION" | "DANGER";

// ──────────────────────────────────────────────
// Multilingual plant names
// ──────────────────────────────────────────────
export interface PlantNames {
  en: string;
  fr: string;
  ar: string;
  scientific: string;
}

// ──────────────────────────────────────────────
// Pregnancy-safety descriptor
// ──────────────────────────────────────────────
export interface PregnancySafety {
  level: ToxicityLevel;
  note: string;
  isAbortifacient?: boolean;
  isUterotonic?: boolean;
}

// ──────────────────────────────────────────────
// Bibliographic reference
// ──────────────────────────────────────────────
export interface Reference {
  id: number;
  citation: string;
}

// ──────────────────────────────────────────────
// Full plant monograph (data layer)
// ──────────────────────────────────────────────
export interface PlantMonograph {
  names: PlantNames;
  family: string;
  botanicalDescription: string;
  partUsed: string;
  chemicalComposition: string[];
  therapeuticEffects: string[];
  pregnancySafety: PregnancySafety;
  references: Reference[];
}

// ──────────────────────────────────────────────
// Domain models for the UI layer
// ──────────────────────────────────────────────
export interface PlantSummary {
  id: string;
  nameFr: string;
  nameAr: string;
  nameEn: string;
  nameScientific: string;
  family: string;
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
  refId: number;
  citation: string;
}

export interface PlantFull extends PlantSummary {
  partUsed: string;
  chemicalComposition: string[];
  therapeuticEffects: string[];
  pregnancySafetyNote: string;
  isAbortifacient: boolean;
  isUterotonic: boolean;
  symptoms: Symptom[];
  warnings: ToxicityWarning[];
  sources: Source[];
}
