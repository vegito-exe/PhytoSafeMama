import "dotenv/config";
import { PrismaClient, ToxicityLevel } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString =
  process.env.DIRECT_URL || process.env.DATABASE_URL || "";

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌿 Seeding PhytoGrossesse Algérie database...\n");

  // ─── Clear existing data ─────────────────────
  await prisma.plantSymptom.deleteMany();
  await prisma.toxicityWarning.deleteMany();
  await prisma.source.deleteMany();
  await prisma.plant.deleteMany();
  await prisma.symptom.deleteMany();

  // ─── Create Symptoms ─────────────────────────
  const symptomNames = [
    "Nausées",
    "Stress",
    "Insomnie",
    "Douleurs",
    "Digestion",
    "Fatigue",
    "Immunité",
    "Ballonnements",
    "Maux de tête",
    "Toux",
    "Fièvre",
    "Constipation",
    "Anémie",
    "Hypertension",
    "Infections urinaires",
  ];

  const symptoms: Record<string, string> = {};
  for (const name of symptomNames) {
    const s = await prisma.symptom.create({ data: { name } });
    symptoms[name] = s.id;
  }
  console.log(`✅ Created ${symptomNames.length} symptoms`);

  // ─── Plant Data ──────────────────────────────
  const plantsData: {
    nameGeneral: string;
    nameAlgerian: string;
    nameScientific: string;
    toxicityLevel: ToxicityLevel;
    description: string;
    symptomLinks: string[];
    warnings: { trimester: number; warningType: string; details: string }[];
    sources: { thesisTitle: string; university: string; urlOrPage?: string }[];
  }[] = [
    {
      nameGeneral: "Gingembre",
      nameAlgerian: "Skenjbir",
      nameScientific: "Zingiber officinale",
      toxicityLevel: "SAFE",
      description: "Le gingembre est considéré comme sûr pendant la grossesse. Il est souvent utilisé pour soulager les nausées matinales du premier trimestre.",
      symptomLinks: ["Nausées", "Digestion", "Ballonnements"],
      warnings: [{ trimester: 0, warningType: "Dose maximale", details: "Ne pas dépasser 1g de poudre séchée par jour." }],
      sources: [{ thesisTitle: "Étude de la phytothérapie traditionnelle chez la femme enceinte dans la région d'Alger", university: "Université d'Alger 1", urlOrPage: "p. 45-48" }],
    },
    {
      nameGeneral: "Sauge",
      nameAlgerian: "Salmiya",
      nameScientific: "Salvia officinalis",
      toxicityLevel: "DANGER",
      description: "La sauge contient de la thuyone, une substance neurotoxique et potentiellement abortive. Contre-indiquée pendant toute la grossesse.",
      symptomLinks: ["Digestion", "Stress"],
      warnings: [
        { trimester: 0, warningType: "Abortif", details: "La thuyone peut provoquer des contractions utérines et un avortement spontané." },
        { trimester: 1, warningType: "Tératogène", details: "Risque de malformations en début de grossesse." },
      ],
      sources: [{ thesisTitle: "Les plantes toxiques utilisées en médecine traditionnelle algérienne", university: "Université de Constantine", urlOrPage: "p. 72-75" }],
    },
    {
      nameGeneral: "Camomille",
      nameAlgerian: "Baboundj",
      nameScientific: "Matricaria chamomilla",
      toxicityLevel: "CAUTION",
      description: "La camomille est généralement bien tolérée en infusion légère, mais une consommation excessive peut stimuler les contractions utérines.",
      symptomLinks: ["Stress", "Insomnie", "Digestion", "Ballonnements"],
      warnings: [{ trimester: 3, warningType: "Utérotonique", details: "À forte dose, peut stimuler les contractions au troisième trimestre." }],
      sources: [{ thesisTitle: "Usage des plantes médicinales durant la grossesse dans la wilaya de Tizi Ouzou", university: "Université de Tizi Ouzou", urlOrPage: "p. 33-36" }],
    },
    {
      nameGeneral: "Menthe poivrée",
      nameAlgerian: "Naânaâ el-har",
      nameScientific: "Mentha × piperita",
      toxicityLevel: "CAUTION",
      description: "La menthe poivrée est acceptable en petites quantités. À éviter en grande quantité car elle peut causer des reflux.",
      symptomLinks: ["Nausées", "Digestion", "Maux de tête", "Ballonnements"],
      warnings: [{ trimester: 0, warningType: "Emménagogue", details: "Peut stimuler le flux menstruel à forte dose." }],
      sources: [{ thesisTitle: "Enquête ethnobotanique sur les plantes médicinales dans la région de Blida", university: "Université de Blida", urlOrPage: "p. 58-61" }],
    },
    {
      nameGeneral: "Fenouil",
      nameAlgerian: "Besbès",
      nameScientific: "Foeniculum vulgare",
      toxicityLevel: "DANGER",
      description: "Le fenouil contient de l'estragole, potentiellement cancérigène et œstrogénique. Déconseillé pendant la grossesse.",
      symptomLinks: ["Digestion", "Ballonnements"],
      warnings: [
        { trimester: 0, warningType: "Œstrogénique", details: "Effet œstrogène-like pouvant perturber l'équilibre hormonal." },
        { trimester: 0, warningType: "Potentiellement cancérigène", details: "L'estragole est classé comme possiblement cancérigène." },
      ],
      sources: [{ thesisTitle: "Risques liés à l'utilisation des plantes médicinales pendant la grossesse", university: "Université d'Oran", urlOrPage: "p. 89-93" }],
    },
    {
      nameGeneral: "Thym",
      nameAlgerian: "Zaâtar",
      nameScientific: "Thymus vulgaris",
      toxicityLevel: "SAFE",
      description: "Le thym en infusion légère est considéré comme sûr. Propriétés antiseptiques utiles contre les maux de gorge.",
      symptomLinks: ["Toux", "Immunité", "Digestion"],
      warnings: [{ trimester: 0, warningType: "Dose maximale", details: "En infusion uniquement, ne pas utiliser l'huile essentielle." }],
      sources: [{ thesisTitle: "Plantes aromatiques et médicinales d'Algérie : usages et toxicité", university: "Université d'Alger 1", urlOrPage: "p. 102-105" }],
    },
    {
      nameGeneral: "Verveine",
      nameAlgerian: "Louiza",
      nameScientific: "Aloysia citrodora",
      toxicityLevel: "SAFE",
      description: "La verveine citronnelle est très populaire en Algérie. En infusion légère, elle aide à la relaxation et à la digestion.",
      symptomLinks: ["Stress", "Insomnie", "Digestion"],
      warnings: [],
      sources: [{ thesisTitle: "Ethnobotanique des plantes médicinales de la Kabylie", university: "Université de Tizi Ouzou", urlOrPage: "p. 41-43" }],
    },
    {
      nameGeneral: "Cumin",
      nameAlgerian: "Kamoun",
      nameScientific: "Cuminum cyminum",
      toxicityLevel: "SAFE",
      description: "Le cumin utilisé comme épice culinaire est sûr pendant la grossesse. Il aide aux ballonnements.",
      symptomLinks: ["Digestion", "Ballonnements"],
      warnings: [{ trimester: 0, warningType: "Dose maximale", details: "Sûr en quantités culinaires, éviter les extraits concentrés." }],
      sources: [{ thesisTitle: "Les épices médicinales dans la tradition algérienne", university: "Université de Constantine", urlOrPage: "p. 55-57" }],
    },
    {
      nameGeneral: "Nigelle",
      nameAlgerian: "Habbat el-baraka",
      nameScientific: "Nigella sativa",
      toxicityLevel: "CAUTION",
      description: "La graine de nigelle est très utilisée en Algérie. Prudence pendant la grossesse : effet utérotonique à forte dose.",
      symptomLinks: ["Immunité", "Digestion", "Fatigue"],
      warnings: [
        { trimester: 1, warningType: "Utérotonique", details: "Peut stimuler les contractions utérines." },
        { trimester: 0, warningType: "Anticoagulant", details: "Peut augmenter le risque de saignement." },
      ],
      sources: [{ thesisTitle: "Nigella sativa : propriétés et risques pendant la grossesse", university: "Université d'Alger 1", urlOrPage: "p. 28-35" }],
    },
    {
      nameGeneral: "Fenugrec",
      nameAlgerian: "Halba",
      nameScientific: "Trigonella foenum-graecum",
      toxicityLevel: "DANGER",
      description: "Le fenugrec est contre-indiqué pendant la grossesse car il peut provoquer des contractions utérines prématurées.",
      symptomLinks: ["Fatigue", "Anémie"],
      warnings: [
        { trimester: 0, warningType: "Abortif", details: "Stimule les contractions utérines." },
        { trimester: 0, warningType: "Hypoglycémiant", details: "Peut provoquer une hypoglycémie." },
      ],
      sources: [{ thesisTitle: "Plantes galactogènes et grossesse : bénéfices et risques", university: "Université de Sétif", urlOrPage: "p. 67-72" }],
    },
    {
      nameGeneral: "Romarin",
      nameAlgerian: "Iklil el-jabal",
      nameScientific: "Rosmarinus officinalis",
      toxicityLevel: "CAUTION",
      description: "Le romarin en infusion légère est toléré mais les doses élevées sont déconseillées en raison de son effet emménagogue.",
      symptomLinks: ["Fatigue", "Digestion", "Maux de tête"],
      warnings: [{ trimester: 0, warningType: "Emménagogue", details: "Peut stimuler le flux menstruel à forte dose." }],
      sources: [{ thesisTitle: "Huiles essentielles et grossesse : état des connaissances", university: "Université de Blida", urlOrPage: "p. 44-48" }],
    },
    {
      nameGeneral: "Cannelle",
      nameAlgerian: "Qarfa",
      nameScientific: "Cinnamomum verum",
      toxicityLevel: "CAUTION",
      description: "La cannelle en petites quantités culinaires est tolérée. Les doses médicinales peuvent stimuler les contractions.",
      symptomLinks: ["Digestion", "Fatigue", "Immunité"],
      warnings: [{ trimester: 3, warningType: "Utérotonique", details: "Peut accélérer les contractions en fin de grossesse." }],
      sources: [{ thesisTitle: "Épices et aromates : sécurité d'emploi pendant la grossesse", university: "Université d'Oran", urlOrPage: "p. 38-41" }],
    },
    {
      nameGeneral: "Armoise",
      nameAlgerian: "Chih",
      nameScientific: "Artemisia herba-alba",
      toxicityLevel: "DANGER",
      description: "L'armoise blanche (Chih) est strictement contre-indiquée pendant la grossesse. Contient de la thuyone aux propriétés abortives.",
      symptomLinks: ["Digestion", "Douleurs"],
      warnings: [
        { trimester: 0, warningType: "Abortif", details: "Contient de la thuyone, fortement abortive." },
        { trimester: 0, warningType: "Neurotoxique", details: "La thuyone est neurotoxique pour le fœtus." },
      ],
      sources: [
        { thesisTitle: "Artemisia herba-alba : toxicité et contre-indications", university: "Université de Constantine", urlOrPage: "p. 95-101" },
        { thesisTitle: "Plantes abortives de la pharmacopée traditionnelle algérienne", university: "Université d'Alger 1", urlOrPage: "p. 112-118" },
      ],
    },
    {
      nameGeneral: "Persil",
      nameAlgerian: "Maâdnous",
      nameScientific: "Petroselinum crispum",
      toxicityLevel: "CAUTION",
      description: "Le persil en quantités culinaires est sûr. Les grandes quantités sont à éviter car l'apiol a des propriétés abortives.",
      symptomLinks: ["Digestion", "Anémie", "Ballonnements"],
      warnings: [{ trimester: 0, warningType: "Abortif (forte dose)", details: "L'apiol contenu dans le persil est abortif à forte dose." }],
      sources: [{ thesisTitle: "Plantes condimentaires et grossesse dans la tradition algérienne", university: "Université de Sétif", urlOrPage: "p. 23-26" }],
    },
    {
      nameGeneral: "Tilleul",
      nameAlgerian: "Zizfoun",
      nameScientific: "Tilia cordata",
      toxicityLevel: "SAFE",
      description: "Le tilleul en infusion est recommandé pour ses propriétés calmantes et sédatives légères.",
      symptomLinks: ["Stress", "Insomnie", "Fièvre"],
      warnings: [],
      sources: [{ thesisTitle: "Tisanes et grossesse : guide de sécurité", university: "Université de Tizi Ouzou", urlOrPage: "p. 51-53" }],
    },
    {
      nameGeneral: "Réglisse",
      nameAlgerian: "Arq sous",
      nameScientific: "Glycyrrhiza glabra",
      toxicityLevel: "DANGER",
      description: "La réglisse contient de la glycyrrhizine qui peut provoquer de l'hypertension et affecter le développement cérébral du fœtus.",
      symptomLinks: ["Toux", "Digestion"],
      warnings: [
        { trimester: 0, warningType: "Hypertenseur", details: "Augmente la tension artérielle, risque de pré-éclampsie." },
        { trimester: 0, warningType: "Fœtotoxique", details: "La glycyrrhizine peut affecter le développement cérébral du fœtus." },
      ],
      sources: [{ thesisTitle: "Glycyrrhiza glabra et risques obstétricaux", university: "Université d'Oran", urlOrPage: "p. 78-83" }],
    },
  ];

  // ─── Insert Plants ───────────────────────────
  for (const plantData of plantsData) {
    const plant = await prisma.plant.create({
      data: {
        nameGeneral: plantData.nameGeneral,
        nameAlgerian: plantData.nameAlgerian,
        nameScientific: plantData.nameScientific,
        toxicityLevel: plantData.toxicityLevel,
        description: plantData.description,
      },
    });

    for (const symptomName of plantData.symptomLinks) {
      if (symptoms[symptomName]) {
        await prisma.plantSymptom.create({
          data: { plantId: plant.id, symptomId: symptoms[symptomName] },
        });
      }
    }

    for (const w of plantData.warnings) {
      await prisma.toxicityWarning.create({
        data: { plantId: plant.id, trimester: w.trimester, warningType: w.warningType, details: w.details },
      });
    }

    for (const s of plantData.sources) {
      await prisma.source.create({
        data: { plantId: plant.id, thesisTitle: s.thesisTitle, university: s.university, urlOrPage: s.urlOrPage },
      });
    }

    console.log(`  🌱 ${plantData.nameGeneral} (${plantData.nameAlgerian})`);
  }

  console.log(`\n✅ Seeded ${plantsData.length} plants successfully!`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
