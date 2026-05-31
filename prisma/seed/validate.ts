import { z } from "zod";

export const PlantSchema = z.object({
  nameEn: z.string().min(1),
  nameFr: z.string().min(1),
  nameAr: z.string().min(1),
  nameScientific: z.string().min(1),
  family: z.string(),
  botanicalDescription: z.string(),
  partUsed: z.string(),
  chemicalComposition: z.array(z.string()),
  therapeuticEffects: z.array(z.string()),
  toxicityLevel: z.enum(["SAFE", "CAUTION", "DANGER"]),
  description: z.string().min(10),
  pregnancySafetyNote: z.string(),
  isAbortifacient: z.boolean(),
  isUterotonic: z.boolean(),
  symptomLinks: z.array(z.string()),
  warnings: z.array(z.object({
    trimester: z.number().min(0).max(3),
    warningType: z.string(),
    details: z.string()
  })),
  sources: z.array(z.object({
    refId: z.number(),
    citation: z.string()
  }))
});

export type PlantData = z.infer<typeof PlantSchema>;
