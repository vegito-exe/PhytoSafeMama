import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { PlantSchema } from "./seed/validate";
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const connectionString =
  process.env.DIRECT_URL || process.env.DATABASE_URL || "";

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Workaround for __dirname in esm if tsx operates in ESM mode
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  console.log("🌿 Seeding PhytoSafeMama database...\n");

  // 1. load and validate all plant files
  const dataPath = join(__dirname, "seed/data/plants");
  const plantFiles = readdirSync(dataPath).filter((f) => f.endsWith(".json"));
  const plantsData = plantFiles.map((file) => {
    const raw = JSON.parse(readFileSync(join(dataPath, file), "utf-8"));
    return PlantSchema.parse(raw); // throws if invalid
  });

  // 2. clear existing data
  await prisma.$transaction([
    prisma.plantSymptom.deleteMany(),
    prisma.toxicityWarning.deleteMany(),
    prisma.source.deleteMany(),
    prisma.plant.deleteMany(),
    prisma.symptom.deleteMany(),
  ]);

  // 3. create all symptoms at once
  const symptomNames = [...new Set(plantsData.flatMap((p) => p.symptomLinks))];
  await prisma.symptom.createMany({
    data: symptomNames.map((name) => ({ name })),
    skipDuplicates: true,
  });

  // 4. fetch all created symptoms once
  const symptoms = await prisma.symptom.findMany();
  const symptomMap = Object.fromEntries(symptoms.map((s) => [s.name, s.id]));

  // 5. batch insert all plants
  await prisma.$transaction(
    plantsData.map((p) =>
      prisma.plant.create({
        data: {
          nameEn: p.nameEn,
          nameFr: p.nameFr,
          nameAr: p.nameAr,
          nameScientific: p.nameScientific,
          family: p.family,
          botanicalDescription: p.botanicalDescription,
          partUsed: p.partUsed,
          chemicalComposition: p.chemicalComposition,
          therapeuticEffects: p.therapeuticEffects,
          toxicityLevel: p.toxicityLevel,
          description: p.description,
          pregnancySafetyNote: p.pregnancySafetyNote,
          isAbortifacient: p.isAbortifacient,
          isUterotonic: p.isUterotonic,
          symptoms: {
            create: p.symptomLinks
              .filter((s) => symptomMap[s])
              .map((s) => ({ symptomId: symptomMap[s] })),
          },
          warnings: { create: p.warnings },
          sources: {
            create: p.sources.map((s) => ({
              refId: s.refId,
              citation: s.citation,
            })),
          },
        },
      })
    ),
    {
      timeout: 30000,
    }
  );

  console.log(`✅ Seeded ${plantsData.length} plants`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
