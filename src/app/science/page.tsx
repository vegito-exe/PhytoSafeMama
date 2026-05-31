import { FlaskConical, GraduationCap, FileText } from "lucide-react";

export const metadata = {
  title: "Le Coin Scientifique — PhytoSafeMama Algérie",
  description:
    "Données scientifiques détaillées et références bibliographiques sur la phytothérapie et la grossesse.",
};

interface SourceData {
  id: string;
  refId: number;
  citation: string;
  plantName: string;
  plantScientific: string;
}

const FALLBACK_SOURCES: SourceData[] = [
  // Ginger references
  { id: "r255", refId: 255, citation: "Vutyavanich T, et al. Ginger for nausea and vomiting in pregnancy: randomized, double-masked, placebo-controlled trial. Obstetrics & Gynecology. 2001;97(4):577-82.", plantName: "Gingembre", plantScientific: "Zingiber officinale" },
  { id: "r258", refId: 258, citation: "Borrelli F, et al. Effectiveness and safety of ginger in the treatment of pregnancy-induced nausea and vomiting. Obstetrics & gynecology. 2005;105(4):849-56.", plantName: "Gingembre", plantScientific: "Zingiber officinale" },
  { id: "r264", refId: 264, citation: "Viljoen E, et al. A systematic review and meta-analysis of the effect and safety of ginger in the treatment of pregnancy-associated nausea and vomiting. Nutrition journal. 2014;13(1):20.", plantName: "Gingembre", plantScientific: "Zingiber officinale" },
  { id: "r319", refId: 319, citation: "Wilkinson JM. Effect of ginger tea on the fetal development of Sprague-Dawley rats. Reproductive Toxicology. 2000;14(6):507-12.", plantName: "Gingembre", plantScientific: "Zingiber officinale" },
  // Date Palm references
  { id: "r436", refId: 436, citation: "Vayalil PK. Date fruits (Phoenix dactylifera Linn): an emerging medicinal food. Critical reviews in food science and nutrition. 2012;52(3):249-71.", plantName: "Dattier", plantScientific: "Phoenix dactylifera" },
  { id: "r437", refId: 437, citation: "Al-Kuran O, et al. The effect of late pregnancy consumption of date fruit on labour and delivery. Journal of obstetrics and gynaecology. 2011;31(1):29-31.", plantName: "Dattier", plantScientific: "Phoenix dactylifera" },
  // Green Anise reference
  { id: "r330", refId: 330, citation: "Committee on Herbal Medicinal Products: Community herbal monograph on pimpinella anisum l., aetheroleum. London: European Medicines Agency; 2013.", plantName: "Anis vert", plantScientific: "Pimpinella anisum" },
  // Garlic reference
  { id: "r347", refId: 347, citation: "Myhre R, et al. Intakes of Garlic and Dried Fruits Are Associated with Lower Risk of Spontaneous Preterm Delivery. The Journal of nutrition. 2013;143(7):1100-8.", plantName: "Ail", plantScientific: "Allium sativum" },
  // Frankincense reference
  { id: "r361", refId: 361, citation: "Boswellia serrata. Available from: http://www.worldagroforestry.org/treedb/AFTPDFS/Boswellia_serrata.PDF", plantName: "Encens (Oliban)", plantScientific: "Boswellia sacra" },
  // Cumin reference
  { id: "r365", refId: 365, citation: "Le cumin et ses bienfaits pour la digestion. Available from: https://www.passeportsante.net/fr/Nutrition/EncyclopedieAliments/Fiche.aspx?doc=cumin_nu", plantName: "Cumin", plantScientific: "Cuminum cyminum" },
  // Cinnamon references
  { id: "r373", refId: 373, citation: "Lemonica IP, Macedo AB. Abortive and/or embryofetotoxic effect of Cinnamomum zeylanicum leaf extracts in pregnant rats. Fitoterapia. 1994;65(5):431-4.", plantName: "Cannelle", plantScientific: "Cinnamomum verum" },
  { id: "r379", refId: 379, citation: "Verspohl EJ, et al. Antidiabetic effect of Cinnamomum cassia and Cinnamomum zeylanicum in vivo and in vitro. Phytotherapy research. 2005;19(3):203-6.", plantName: "Cannelle", plantScientific: "Cinnamomum verum" },
  // Senna reference
  { id: "r413", refId: 413, citation: "Séné (feuille de séné et fruit de séné). Available from: https://www.creapharma.ch/sene.htm", plantName: "Séné", plantScientific: "Senna alexandrina" },
  // Thyme reference
  { id: "r417", refId: 417, citation: "Thym - Bienfaits pour la santé. Available from: https://sante-medecine.journaldesfemmes.fr/contents/2506-thym-bienfaits-pour-la-sante", plantName: "Thym", plantScientific: "Thymus vulgaris" },
  // General toxicity references (shared across Harmal, White Wormwood, Juniper, Fenugreek)
  { id: "r19-harmal", refId: 19, citation: "Hammiche V, Merad R, Azzouz M. Plantes toxiques à usage médicinal du pourtour méditerranéen: Springer Paris; 2013.", plantName: "Harmel", plantScientific: "Peganum harmala" },
  { id: "r55-harmal", refId: 55, citation: "Bruneton J. Plantes toxiques: végétaux dangereux pour l'homme et les animaux. Paris: Tec Doc. 1996.", plantName: "Harmel", plantScientific: "Peganum harmala" },
  { id: "r19-wormwood", refId: 19, citation: "Hammiche V, Merad R, Azzouz M. Plantes toxiques à usage médicinal du pourtour méditerranéen: Springer Paris; 2013.", plantName: "Armoise blanche", plantScientific: "Artemisia herba-alba" },
  { id: "r55-wormwood", refId: 55, citation: "Bruneton J. Plantes toxiques: végétaux dangereux pour l'homme et les animaux. Paris: Tec Doc. 1996.", plantName: "Armoise blanche", plantScientific: "Artemisia herba-alba" },
  { id: "r19-juniper", refId: 19, citation: "Hammiche V, Merad R, Azzouz M. Plantes toxiques à usage médicinal du pourtour méditerranéen: Springer Paris; 2013.", plantName: "Genévrier", plantScientific: "Juniperus phoenicea" },
  { id: "r19-fenugreek", refId: 19, citation: "Hammiche V, Merad R, Azzouz M. Plantes toxiques à usage médicinal du pourtour méditerranéen: Springer Paris; 2013.", plantName: "Fenugrec", plantScientific: "Trigonella foenum-graecum" },
  { id: "r315", refId: 315, citation: "Holst L, Wright D, Haavik S, Nordeng H. Safety and efficacy of herbal remedies in obstetrics—review and clinical implications. Midwifery. 2011;27(1):80-6.", plantName: "Fenugrec", plantScientific: "Trigonella foenum-graecum" },
];

export default async function SciencePage() {
  let sources: SourceData[] = FALLBACK_SOURCES;

  try {
    const { prisma } = await import("@/lib/prisma");
    const dbSources = await prisma.source.findMany({
      include: { plant: true },
      orderBy: { refId: "asc" },
    });

    if (dbSources.length > 0) {
      sources = dbSources.map((s) => ({
        id: s.id,
        refId: s.refId,
        citation: s.citation,
        plantName: s.plant.nameFr,
        plantScientific: s.plant.nameScientific,
      }));
    }
  } catch {
    console.warn("⚠️ Database unavailable, using fallback data");
  }

  // Group by plant
  const byPlant = sources.reduce<Record<string, SourceData[]>>((acc, src) => {
    const key = `${src.plantName} (${src.plantScientific})`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(src);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Le Coin Scientifique
        </h1>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          Références bibliographiques et sources scientifiques utilisées dans
          notre guide des plantes médicinales.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200/50 px-4 py-2 text-sm text-amber-700">
          <FlaskConical className="h-4 w-4" />
          Section destinée aux professionnels de santé
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(byPlant).map(([plantLabel, plantSources]) => (
          <div
            key={plantLabel}
            className="rounded-2xl border border-border/50 bg-white/60 backdrop-blur-sm overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-border/30 bg-muted/30 px-6 py-4">
              <GraduationCap className="h-5 w-5 text-primary shrink-0" />
              <h2 className="text-lg font-bold text-foreground">{plantLabel}</h2>
              <span className="ml-auto rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {plantSources.length} réf{plantSources.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="divide-y divide-border/30">
              {plantSources.map((source) => (
                <div
                  key={source.id}
                  className="flex items-start gap-3 px-6 py-4 transition-colors hover:bg-muted/20"
                >
                  <FileText className="h-4 w-4 mt-0.5 text-muted-foreground/50 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground text-sm">
                      [{source.refId}] {source.citation}
                    </p>
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
