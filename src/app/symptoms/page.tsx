import { SymptomsClient } from "./symptoms-client";
import type { ToxicityLevel } from "@/types";

export const metadata = {
  title: "Maux & Solutions — PhytoSafeMama Algérie",
  description:
    "Trouvez les plantes médicinales recommandées et celles à éviter selon vos symptômes pendant la grossesse.",
};

const FALLBACK_SYMPTOMS = [
  { id: "s1", name: "Nausées", plants: [
    { id: "1", nameGeneral: "Gingembre", nameAlgerian: "Skenjbir", nameScientific: "Zingiber officinale", toxicityLevel: "SAFE" as ToxicityLevel, description: "Sûr pour soulager les nausées matinales." },
    { id: "4", nameGeneral: "Menthe poivrée", nameAlgerian: "Naânaâ el-har", nameScientific: "Mentha × piperita", toxicityLevel: "CAUTION" as ToxicityLevel, description: "Acceptable en petites quantités." },
  ]},
  { id: "s2", name: "Stress", plants: [
    { id: "3", nameGeneral: "Camomille", nameAlgerian: "Baboundj", nameScientific: "Matricaria chamomilla", toxicityLevel: "CAUTION" as ToxicityLevel, description: "Bien tolérée en infusion légère." },
    { id: "7", nameGeneral: "Verveine", nameAlgerian: "Louiza", nameScientific: "Aloysia citrodora", toxicityLevel: "SAFE" as ToxicityLevel, description: "Aide à la relaxation." },
    { id: "11", nameGeneral: "Tilleul", nameAlgerian: "Zizfoun", nameScientific: "Tilia cordata", toxicityLevel: "SAFE" as ToxicityLevel, description: "Propriétés calmantes et sédatives." },
  ]},
  { id: "s3", name: "Insomnie", plants: [
    { id: "3", nameGeneral: "Camomille", nameAlgerian: "Baboundj", nameScientific: "Matricaria chamomilla", toxicityLevel: "CAUTION" as ToxicityLevel, description: "Aide au sommeil en infusion légère." },
    { id: "7", nameGeneral: "Verveine", nameAlgerian: "Louiza", nameScientific: "Aloysia citrodora", toxicityLevel: "SAFE" as ToxicityLevel, description: "Favorise la relaxation." },
    { id: "11", nameGeneral: "Tilleul", nameAlgerian: "Zizfoun", nameScientific: "Tilia cordata", toxicityLevel: "SAFE" as ToxicityLevel, description: "Sédatif léger naturel." },
  ]},
  { id: "s4", name: "Digestion", plants: [
    { id: "1", nameGeneral: "Gingembre", nameAlgerian: "Skenjbir", nameScientific: "Zingiber officinale", toxicityLevel: "SAFE" as ToxicityLevel, description: "Aide digestive éprouvée." },
    { id: "6", nameGeneral: "Thym", nameAlgerian: "Zaâtar", nameScientific: "Thymus vulgaris", toxicityLevel: "SAFE" as ToxicityLevel, description: "Sûr en infusion légère." },
    { id: "12", nameGeneral: "Cumin", nameAlgerian: "Kamoun", nameScientific: "Cuminum cyminum", toxicityLevel: "SAFE" as ToxicityLevel, description: "Sûr en quantités culinaires." },
  ]},
  { id: "s5", name: "Fatigue", plants: [
    { id: "8", nameGeneral: "Nigelle", nameAlgerian: "Habbat el-baraka", nameScientific: "Nigella sativa", toxicityLevel: "CAUTION" as ToxicityLevel, description: "Prudence, effet utérotonique à forte dose." },
  ]},
  { id: "s6", name: "Immunité", plants: [
    { id: "6", nameGeneral: "Thym", nameAlgerian: "Zaâtar", nameScientific: "Thymus vulgaris", toxicityLevel: "SAFE" as ToxicityLevel, description: "Propriétés antiseptiques." },
    { id: "8", nameGeneral: "Nigelle", nameAlgerian: "Habbat el-baraka", nameScientific: "Nigella sativa", toxicityLevel: "CAUTION" as ToxicityLevel, description: "Immunostimulant, mais prudence." },
  ]},
  { id: "s7", name: "Toux", plants: [
    { id: "6", nameGeneral: "Thym", nameAlgerian: "Zaâtar", nameScientific: "Thymus vulgaris", toxicityLevel: "SAFE" as ToxicityLevel, description: "Antiseptique respiratoire." },
  ]},
];

export default async function SymptomsPage() {
  let symptoms = FALLBACK_SYMPTOMS;

  try {
    const { prisma } = await import("@/lib/prisma");
    const dbSymptoms = await prisma.symptom.findMany({
      orderBy: { name: "asc" },
      include: { plants: { include: { plant: true } } },
    });

    if (dbSymptoms.length > 0) {
      symptoms = dbSymptoms.map((s) => ({
        id: s.id,
        name: s.name,
        plants: s.plants.map((ps) => ({
          id: ps.plant.id,
          nameGeneral: ps.plant.nameGeneral,
          nameAlgerian: ps.plant.nameAlgerian,
          nameScientific: ps.plant.nameScientific,
          toxicityLevel: ps.plant.toxicityLevel,
          description: ps.plant.description,
        })),
      }));
    }
  } catch {
    console.warn("⚠️ Database unavailable, using fallback data");
  }

  return <SymptomsClient symptoms={symptoms} />;
}
