import { GuideClient } from "./guide-client";

export const metadata = {
  title: "Guide des Plantes — PhytoGrossesse Algérie",
  description:
    "Consultez notre guide complet des plantes médicinales et leur sécurité pendant la grossesse.",
};

// ── Sample fallback data (used when DB is unavailable) ──
const FALLBACK_PLANTS = [
  { id: "1", nameGeneral: "Gingembre", nameAlgerian: "Skenjbir", nameScientific: "Zingiber officinale", toxicityLevel: "SAFE" as const, description: "Le gingembre est considéré comme sûr pendant la grossesse. Il est souvent utilisé pour soulager les nausées matinales du premier trimestre.", symptomNames: ["Nausées", "Digestion", "Ballonnements"] },
  { id: "2", nameGeneral: "Sauge", nameAlgerian: "Salmiya", nameScientific: "Salvia officinalis", toxicityLevel: "DANGER" as const, description: "La sauge contient de la thuyone, une substance neurotoxique et potentiellement abortive. Contre-indiquée pendant toute la grossesse.", symptomNames: ["Digestion", "Stress"] },
  { id: "3", nameGeneral: "Camomille", nameAlgerian: "Baboundj", nameScientific: "Matricaria chamomilla", toxicityLevel: "CAUTION" as const, description: "La camomille est généralement bien tolérée en infusion légère, mais une consommation excessive peut stimuler les contractions utérines.", symptomNames: ["Stress", "Insomnie", "Digestion"] },
  { id: "4", nameGeneral: "Menthe poivrée", nameAlgerian: "Naânaâ el-har", nameScientific: "Mentha × piperita", toxicityLevel: "CAUTION" as const, description: "La menthe poivrée est acceptable en petites quantités. À éviter en grande quantité car elle peut causer des reflux.", symptomNames: ["Nausées", "Digestion", "Maux de tête"] },
  { id: "5", nameGeneral: "Fenouil", nameAlgerian: "Besbès", nameScientific: "Foeniculum vulgare", toxicityLevel: "DANGER" as const, description: "Le fenouil contient de l'estragole, potentiellement cancérigène et œstrogénique. Déconseillé pendant la grossesse.", symptomNames: ["Digestion", "Ballonnements"] },
  { id: "6", nameGeneral: "Thym", nameAlgerian: "Zaâtar", nameScientific: "Thymus vulgaris", toxicityLevel: "SAFE" as const, description: "Le thym en infusion légère est considéré comme sûr. Propriétés antiseptiques utiles contre les maux de gorge.", symptomNames: ["Toux", "Immunité", "Digestion"] },
  { id: "7", nameGeneral: "Verveine", nameAlgerian: "Louiza", nameScientific: "Aloysia citrodora", toxicityLevel: "SAFE" as const, description: "La verveine citronnelle est très populaire en Algérie. En infusion légère, elle aide à la relaxation et à la digestion.", symptomNames: ["Stress", "Insomnie", "Digestion"] },
  { id: "8", nameGeneral: "Nigelle", nameAlgerian: "Habbat el-baraka", nameScientific: "Nigella sativa", toxicityLevel: "CAUTION" as const, description: "La graine de nigelle est très utilisée en Algérie. Prudence pendant la grossesse car elle peut avoir un effet utérotonique à forte dose.", symptomNames: ["Immunité", "Digestion", "Fatigue"] },
  { id: "9", nameGeneral: "Fenugrec", nameAlgerian: "Halba", nameScientific: "Trigonella foenum-graecum", toxicityLevel: "DANGER" as const, description: "Le fenugrec est contre-indiqué pendant la grossesse car il peut provoquer des contractions utérines prématurées.", symptomNames: ["Fatigue", "Anémie"] },
  { id: "10", nameGeneral: "Armoise", nameAlgerian: "Chih", nameScientific: "Artemisia herba-alba", toxicityLevel: "DANGER" as const, description: "L'armoise blanche est strictement contre-indiquée pendant la grossesse. Elle contient de la thuyone aux propriétés abortives.", symptomNames: ["Digestion", "Douleurs"] },
  { id: "11", nameGeneral: "Tilleul", nameAlgerian: "Zizfoun", nameScientific: "Tilia cordata", toxicityLevel: "SAFE" as const, description: "Le tilleul en infusion est recommandé pour ses propriétés calmantes et sédatives légères.", symptomNames: ["Stress", "Insomnie", "Fièvre"] },
  { id: "12", nameGeneral: "Cumin", nameAlgerian: "Kamoun", nameScientific: "Cuminum cyminum", toxicityLevel: "SAFE" as const, description: "Le cumin utilisé comme épice culinaire est sûr pendant la grossesse. Il aide aux ballonnements.", symptomNames: ["Digestion", "Ballonnements"] },
];

const FALLBACK_SYMPTOMS = ["Nausées", "Stress", "Insomnie", "Douleurs", "Digestion", "Fatigue", "Immunité", "Ballonnements", "Maux de tête", "Toux"];

export default async function GuidePage() {
  let plants = FALLBACK_PLANTS;
  let symptomList = FALLBACK_SYMPTOMS;

  try {
    const { prisma } = await import("@/lib/prisma");
    const dbPlants = await prisma.plant.findMany({
      orderBy: { nameGeneral: "asc" },
      include: { symptoms: { include: { symptom: true } } },
    });

    if (dbPlants.length > 0) {
      plants = dbPlants.map((p) => ({
        id: p.id,
        nameGeneral: p.nameGeneral,
        nameAlgerian: p.nameAlgerian,
        nameScientific: p.nameScientific,
        toxicityLevel: p.toxicityLevel,
        description: p.description,
        symptomNames: p.symptoms.map((ps) => ps.symptom.name),
      }));
    }

    const dbSymptoms = await prisma.symptom.findMany({ orderBy: { name: "asc" } });
    if (dbSymptoms.length > 0) {
      symptomList = dbSymptoms.map((s) => s.name);
    }
  } catch {
    console.warn("⚠️ Database unavailable, using fallback data");
  }

  return <GuideClient plants={plants} symptoms={symptomList} />;
}
