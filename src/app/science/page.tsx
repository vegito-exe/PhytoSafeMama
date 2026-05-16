import { FlaskConical, GraduationCap, FileText } from "lucide-react";

export const metadata = {
  title: "Le Coin Scientifique — PhytoGrossesse Algérie",
  description:
    "Données scientifiques détaillées issues de thèses universitaires algériennes sur la phytothérapie et la grossesse.",
};

interface SourceData {
  id: string;
  thesisTitle: string;
  university: string;
  urlOrPage: string | null;
  plantName: string;
  plantScientific: string;
}

const FALLBACK_SOURCES: SourceData[] = [
  { id: "f1", thesisTitle: "Étude de la phytothérapie traditionnelle chez la femme enceinte dans la région d'Alger", university: "Université d'Alger 1", urlOrPage: "p. 45-48", plantName: "Gingembre", plantScientific: "Zingiber officinale" },
  { id: "f2", thesisTitle: "Plantes aromatiques et médicinales d'Algérie : usages et toxicité", university: "Université d'Alger 1", urlOrPage: "p. 102-105", plantName: "Thym", plantScientific: "Thymus vulgaris" },
  { id: "f3", thesisTitle: "Nigella sativa : propriétés et risques pendant la grossesse", university: "Université d'Alger 1", urlOrPage: "p. 28-35", plantName: "Nigelle", plantScientific: "Nigella sativa" },
  { id: "f4", thesisTitle: "Plantes abortives de la pharmacopée traditionnelle algérienne", university: "Université d'Alger 1", urlOrPage: "p. 112-118", plantName: "Armoise", plantScientific: "Artemisia herba-alba" },
  { id: "f5", thesisTitle: "Les plantes toxiques utilisées en médecine traditionnelle algérienne", university: "Université de Constantine", urlOrPage: "p. 72-75", plantName: "Sauge", plantScientific: "Salvia officinalis" },
  { id: "f6", thesisTitle: "Les épices médicinales dans la tradition algérienne", university: "Université de Constantine", urlOrPage: "p. 55-57", plantName: "Cumin", plantScientific: "Cuminum cyminum" },
  { id: "f7", thesisTitle: "Artemisia herba-alba : toxicité et contre-indications", university: "Université de Constantine", urlOrPage: "p. 95-101", plantName: "Armoise", plantScientific: "Artemisia herba-alba" },
  { id: "f8", thesisTitle: "Usage des plantes médicinales durant la grossesse dans la wilaya de Tizi Ouzou", university: "Université de Tizi Ouzou", urlOrPage: "p. 33-36", plantName: "Camomille", plantScientific: "Matricaria chamomilla" },
  { id: "f9", thesisTitle: "Ethnobotanique des plantes médicinales de la Kabylie", university: "Université de Tizi Ouzou", urlOrPage: "p. 41-43", plantName: "Verveine", plantScientific: "Aloysia citrodora" },
  { id: "f10", thesisTitle: "Enquête ethnobotanique sur les plantes médicinales dans la région de Blida", university: "Université de Blida", urlOrPage: "p. 58-61", plantName: "Menthe poivrée", plantScientific: "Mentha × piperita" },
  { id: "f11", thesisTitle: "Risques liés à l'utilisation des plantes médicinales pendant la grossesse", university: "Université d'Oran", urlOrPage: "p. 89-93", plantName: "Fenouil", plantScientific: "Foeniculum vulgare" },
  { id: "f12", thesisTitle: "Plantes galactogènes et grossesse : bénéfices et risques", university: "Université de Sétif", urlOrPage: "p. 67-72", plantName: "Fenugrec", plantScientific: "Trigonella foenum-graecum" },
];

export default async function SciencePage() {
  let sources: SourceData[] = FALLBACK_SOURCES;

  try {
    const { prisma } = await import("@/lib/prisma");
    const dbSources = await prisma.source.findMany({
      include: { plant: true },
      orderBy: { university: "asc" },
    });

    if (dbSources.length > 0) {
      sources = dbSources.map((s) => ({
        id: s.id,
        thesisTitle: s.thesisTitle,
        university: s.university,
        urlOrPage: s.urlOrPage,
        plantName: s.plant.nameGeneral,
        plantScientific: s.plant.nameScientific,
      }));
    }
  } catch {
    console.warn("⚠️ Database unavailable, using fallback data");
  }

  // Group by university
  const byUniversity = sources.reduce<Record<string, SourceData[]>>((acc, src) => {
    if (!acc[src.university]) acc[src.university] = [];
    acc[src.university].push(src);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Le Coin Scientifique
        </h1>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          Sources académiques et thèses universitaires algériennes référencées
          dans notre guide.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200/50 px-4 py-2 text-sm text-amber-700">
          <FlaskConical className="h-4 w-4" />
          Section destinée aux professionnels de santé
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(byUniversity).map(([university, uniSources]) => (
          <div
            key={university}
            className="rounded-2xl border border-border/50 bg-white/60 backdrop-blur-sm overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-border/30 bg-muted/30 px-6 py-4">
              <GraduationCap className="h-5 w-5 text-primary shrink-0" />
              <h2 className="text-lg font-bold text-foreground">{university}</h2>
              <span className="ml-auto rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {uniSources.length} source{uniSources.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="divide-y divide-border/30">
              {uniSources.map((source) => (
                <div
                  key={source.id}
                  className="flex items-start gap-3 px-6 py-4 transition-colors hover:bg-muted/20"
                >
                  <FileText className="h-4 w-4 mt-0.5 text-muted-foreground/50 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground text-sm">
                      {source.thesisTitle}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Plante : {source.plantName} ({source.plantScientific})
                    </p>
                    {source.urlOrPage && (
                      <p className="mt-0.5 text-xs text-primary/70">
                        📄 {source.urlOrPage}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
