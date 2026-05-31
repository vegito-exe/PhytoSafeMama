import { SymptomsClient } from "./symptoms-client";
import type { ToxicityLevel } from "@/types";

export const metadata = {
  title: "Maux & Solutions — PhytoSafeMama Algérie",
  description:
    "Trouvez les plantes médicinales recommandées et celles à éviter selon vos symptômes pendant la grossesse.",
};

const FALLBACK_SYMPTOMS = [
  { id: "s1", name: "Nausées", plants: [
    { id: "18", nameFr: "Gingembre", nameAr: "زنجبيل", nameScientific: "Zingiber officinale", toxicityLevel: "CAUTION" as ToxicityLevel, description: "Très efficace contre les nausées matinales, mais ne pas dépasser les doses alimentaires." },
    { id: "8", nameFr: "Menthe", nameAr: "نعناع", nameScientific: "Mentha spicata", toxicityLevel: "SAFE" as ToxicityLevel, description: "Sûre en infusion légère pour soulager les nausées." },
  ]},
  { id: "s2", name: "Digestion", plants: [
    { id: "26", nameFr: "Huile d'olive", nameAr: "زيت الزيتون", nameScientific: "Olea europaea", toxicityLevel: "SAFE" as ToxicityLevel, description: "Réduit le reflux et favorise la digestion." },
    { id: "9", nameFr: "Thym", nameAr: "زعتر", nameScientific: "Thymus vulgaris", toxicityLevel: "SAFE" as ToxicityLevel, description: "Sûr en infusion légère, aide à la digestion." },
    { id: "4", nameFr: "Cumin", nameAr: "كمون", nameScientific: "Cuminum cyminum", toxicityLevel: "SAFE" as ToxicityLevel, description: "Sûr en quantités culinaires, soulage les ballonnements." },
    { id: "3", nameFr: "Anis vert", nameAr: "حبة حلاوة", nameScientific: "Pimpinella anisum", toxicityLevel: "CAUTION" as ToxicityLevel, description: "Infusion courte durée OK. Huile essentielle contre-indiquée." },
  ]},
  { id: "s3", name: "Stress", plants: [
    { id: "10", nameFr: "Camomille", nameAr: "بابونج", nameScientific: "Matricaria chamomilla", toxicityLevel: "CAUTION" as ToxicityLevel, description: "Bien tolérée en infusion légère, éviter les excès au 1er trimestre." },
    { id: "23", nameFr: "Lavande", nameAr: "خزامى", nameScientific: "Lavandula angustifolia", toxicityLevel: "CAUTION" as ToxicityLevel, description: "Infusion légère tolérée. Huile essentielle déconseillée." },
  ]},
  { id: "s4", name: "Insomnie", plants: [
    { id: "10", nameFr: "Camomille", nameAr: "بابونج", nameScientific: "Matricaria chamomilla", toxicityLevel: "CAUTION" as ToxicityLevel, description: "Propriétés sédatives en infusion légère." },
    { id: "23", nameFr: "Lavande", nameAr: "خزامى", nameScientific: "Lavandula angustifolia", toxicityLevel: "CAUTION" as ToxicityLevel, description: "Favorise la relaxation et le sommeil." },
  ]},
  { id: "s5", name: "Fatigue", plants: [
    { id: "16", nameFr: "Dattier", nameAr: "تمر", nameScientific: "Phoenix dactylifera", toxicityLevel: "SAFE" as ToxicityLevel, description: "Source d'énergie majeure, riche en glucides et minéraux." },
    { id: "15", nameFr: "Lentille rouge", nameAr: "عدس أحمر", nameScientific: "Lens culinaris", toxicityLevel: "SAFE" as ToxicityLevel, description: "Riche en fer et acide folique." },
    { id: "7", nameFr: "Betterave rouge", nameAr: "شمندر أحمر", nameScientific: "Beta vulgaris", toxicityLevel: "SAFE" as ToxicityLevel, description: "Riche en fer, bénéfique contre la fatigue." },
  ]},
  { id: "s6", name: "Immunité", plants: [
    { id: "9", nameFr: "Thym", nameAr: "زعتر", nameScientific: "Thymus vulgaris", toxicityLevel: "SAFE" as ToxicityLevel, description: "Propriétés antiseptiques respiratoires." },
    { id: "11", nameFr: "Ail", nameAr: "ثوم", nameScientific: "Allium sativum", toxicityLevel: "SAFE" as ToxicityLevel, description: "Réduit le risque d'accouchement prématuré." },
    { id: "27", nameFr: "Oignon", nameAr: "بصل", nameScientific: "Allium cepa", toxicityLevel: "SAFE" as ToxicityLevel, description: "Propriétés anti-inflammatoires et antioxydantes." },
    { id: "30", nameFr: "Origan", nameAr: "زعتر بري", nameScientific: "Origanum vulgare", toxicityLevel: "CAUTION" as ToxicityLevel, description: "Antiseptique puissant. Ne pas utiliser comme médicament pendant la grossesse." },
  ]},
  { id: "s7", name: "Toux", plants: [
    { id: "9", nameFr: "Thym", nameAr: "زعتر", nameScientific: "Thymus vulgaris", toxicityLevel: "SAFE" as ToxicityLevel, description: "Antiseptique respiratoire, sûr en infusion." },
    { id: "32", nameFr: "Verveine", nameAr: "اللويزة", nameScientific: "Verbena officinalis", toxicityLevel: "DANGER" as ToxicityLevel, description: "⚠️ Antitussif mais abortif — contre-indiquée pendant la grossesse." },
  ]},
  { id: "s8", name: "Constipation", plants: [
    { id: "12", nameFr: "Lin", nameAr: "بذور الكتان", nameScientific: "Linum usitatissimum", toxicityLevel: "CAUTION" as ToxicityLevel, description: "Prudence en raison des phytoestrogènes." },
    { id: "13", nameFr: "Séné", nameAr: "سنا مكي", nameScientific: "Cassia angustifolia", toxicityLevel: "DANGER" as ToxicityLevel, description: "⚠️ Contre-indiqué : passage des anthraquinones à travers le placenta." },
  ]},
  { id: "s9", name: "Anémie", plants: [
    { id: "7", nameFr: "Betterave rouge", nameAr: "شمندر أحمر", nameScientific: "Beta vulgaris", toxicityLevel: "SAFE" as ToxicityLevel, description: "Riche en fer et acide folique." },
    { id: "15", nameFr: "Lentille rouge", nameAr: "عدس أحمر", nameScientific: "Lens culinaris", toxicityLevel: "SAFE" as ToxicityLevel, description: "Excellente source de fer végétal." },
  ]},
  { id: "s10", name: "Ballonnements", plants: [
    { id: "4", nameFr: "Cumin", nameAr: "كمون", nameScientific: "Cuminum cyminum", toxicityLevel: "SAFE" as ToxicityLevel, description: "Sûr en quantités culinaires." },
    { id: "18", nameFr: "Gingembre", nameAr: "زنجبيل", nameScientific: "Zingiber officinale", toxicityLevel: "CAUTION" as ToxicityLevel, description: "Aide digestive, respecter les doses alimentaires." },
    { id: "3", nameFr: "Anis vert", nameAr: "حبة حلاوة", nameScientific: "Pimpinella anisum", toxicityLevel: "CAUTION" as ToxicityLevel, description: "Infusion courte durée uniquement." },
  ]},
  { id: "s11", name: "Douleurs", plants: [
    { id: "33", nameFr: "Giroflier", nameAr: "قرنفل", nameScientific: "Caryophyllus aromaticus", toxicityLevel: "DANGER" as ToxicityLevel, description: "⚠️ Antalgique dentaire mais utérotonique — contre-indiqué pendant la grossesse." },
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
          nameFr: ps.plant.nameFr,
          nameAr: ps.plant.nameAr,
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
