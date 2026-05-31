"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronRight, ShieldCheck, Leaf, Heart, AlertTriangle } from "lucide-react";
import { Modal } from "@/components/ui/modal";

export default function ConseilsPage() {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center min-h-screen pt-24 pb-12 ">
      {/* ─── Hero Section ─────────────────────────────────── */}
      <section className="relative overflow-hidden mb-16 py-12 lg:py-0">
        <div className="mx-auto w-[990px] ">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:h-[400px]">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-4">
                <span className="text-green-900">Grossesse & </span>
                <span className="text-[#E91E8C]">Conseils</span>
              </h1>
              
              {/* Decorative Divider */}
              <div className="h-1 w-24 bg-[#E91E8C] rounded-full mb-6 mx-auto lg:mx-0 opacity-70"></div>
              
              <p className="max-w-lg text-lg text-slate-700 mx-auto lg:mx-0 leading-relaxed font-medium">
                Des informations fiables et naturelles pour vous accompagner<br className="hidden lg:block"/> à chaque étape de votre grossesse.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* ─── Info Card ─────────────────────────────────── */}
      <section className="mb-20 w-full">
        <div className="bg-white rounded-2xl p-8 max-w-5xl mx-auto shadow-[0_8px_30px_rgb(233,30,140,0.06)] border border-[#E91E8C]/10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          
          {/* Subtle background element */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#E91E8C]/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Icon Left */}
          <div className="flex-shrink-0 flex items-center justify-center h-40 w-40 rounded-full bg-[#FFF0F3] inset-shadow-sm text-[#E91E8C]">
            <Image src="/definition/left-side.svg" alt="Grossesse logo" width={120} height={120} style={{ objectFit: 'contain' }} />
          </div>

          {/* Text Center */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-[#E91E8C] mb-3">
              Qu'est-ce que la grossesse ?
            </h2>
            <p className="text-gray-600 leading-relaxed text-balance">
              La grossesse est une période unique dans la vie d'une femme.
              Elle dure en moyenne 40 semaines et se divise en trois trimestres.
              Chaque étape est importante pour le développement de votre bébé
              et votre bien-être.
            </p>
          </div>

          {/* Icon Right */}
          <div className="flex-shrink-0 p-4 ">
            <Image src="/definition/right-side.svg" alt="Plante" width={200} height={2} style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* ─── Les étapes de la grossesse ─────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-24">
        <h2 className="text-3xl font-bold text-center text-[#E91E8C] mb-12">
          Les étapes de la grossesse
        </h2>

        {/* Timeline Desktop implementation */}
        <div className="relative">
          {/* Connector Line (visible only on md+) */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-1 bg-gray-100 -z-10 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center relative hover:shadow-md transition-shadow">
              <div className="h-30 w-30 rounded-full  text-white flex items-center justify-center text-xl font-bold mb-4 shadow-lg shadow-[#E91E8C]/20 border-4 border-white">
                <Image src="/les-etapes/part1.svg" alt="1er trimestre" width={120} height={120} style={{ objectFit: 'contain' }} />
              </div>
              <h3 className="text-2xl font-bold text-[#E91E8C] mb-1">1er trimestre</h3>
              <span className="text-sm font-medium text-[#E91E8C]/80 mb-6">(0 - 12 semaines)</span>
              
              <p className="text-gray-600 text-sm mb-8 leading-relaxed flex-1">
                Les premiers changements apparaissent. Le bébé commence
                à se former et votre corps s'adapte.
              </p>

              <button 
                onClick={() => setActiveModal(1)}
                className="w-full py-2.5 px-4 rounded-lg border-2 border-[#E91E8C]/30 text-[#E91E8C] font-semibold hover:bg-[#E91E8C]/5 transition-colors"
              >
                En savoir plus →
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center relative hover:shadow-md transition-shadow">
              <div className="h-30 w-30 rounded-full  text-white flex items-center justify-center text-xl font-bold mb-4 shadow-lg shadow-green-600/20 border-4 border-white">
                <Image src="/les-etapes/part2.svg" alt="2ème trimestre" width={120} height={120} style={{ objectFit: 'contain' }} />
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-1">2ème trimestre</h3>
              <span className="text-sm font-medium text-green-700/80 mb-6">(13 - 26 semaines)</span>
              
              <p className="text-gray-600 text-sm mb-8 leading-relaxed flex-1">
                Le bébé grandit et se développe. Vous vous sentez
                généralement plus en forme.
              </p>

              <button 
                onClick={() => setActiveModal(2)}
                className="w-full py-2.5 px-4 rounded-lg border-2 border-green-600/30 text-green-700 font-semibold hover:bg-green-50 transition-colors"
              >
                En savoir plus →
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center relative hover:shadow-md transition-shadow">
              <div className="h-30 w-30 rounded-full  text-white flex items-center justify-center text-xl font-bold mb-4 shadow-lg shadow-[#E91E8C]/20 border-4 border-white">
                <Image src="/les-etapes/part3.svg" alt="3ème trimestre" width={120} height={120} style={{ objectFit: 'contain' }} />
              </div>
              <h3 className="text-2xl font-bold text-[#E91E8C] mb-1">3ème trimestre</h3>
              <span className="text-sm font-medium text-[#E91E8C]/80 mb-6">(27 - 40 semaines)</span>
              
              <p className="text-gray-600 text-sm mb-8 leading-relaxed flex-1">
                Le bébé continue de prendre du poids et se prépare
                pour la naissance.
              </p>

              <button 
                onClick={() => setActiveModal(3)}
                className="w-full py-2.5 px-4 rounded-lg border-2 border-[#E91E8C]/30 text-[#E91E8C] font-semibold hover:bg-[#E91E8C]/5 transition-colors"
              >
                En savoir plus →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Bottom Info Bar ─────────────────────────────────── */}
      <section className="bg-slate-50 rounded-2xl border-y border-slate-100 py-12 mt-auto">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="flex flex-row gap-4">
              <div className="flex-shrink-0">
                <ShieldCheck className="w-12 h-12 text-green-900" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-green-900 text-lg">Informations fiables</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Basées sur des données scientifiques et des sources de confiance.
                </p>
              </div>
              <div className="h-full w-1 bg-black/20"></div>
            </div>

            <div className="flex flex-row gap-4">
              <div className="flex-shrink-0">
                <Leaf className="w-12 h-12 text-[#E91E8C]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-[#E91E8C] text-lg">Conseils naturels</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Des recommandations à base de plantes adaptées à chaque étape.
                </p>
              </div>
              <div className="h-full w-1 bg-black/20"></div>
            </div>

            <div className="flex flex-row gap-4">
              <div className="flex-shrink-0">
                <Heart className="w-12 h-12 text-green-900" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-green-900 text-lg">Bien-être global</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Prenez soin de votre corps et de votre esprit pour une grossesse sereine.
                </p>
              </div>
              <div className="h-full w-1 bg-black/20"></div>
            </div>

            <div className="flex flex-row gap-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-12 h-12 text-[#E91E8C]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-[#E91E8C] text-lg">Prudence d'abord</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Certaines plantes sont à éviter. Informez-vous toujours avant
                  toute utilisation.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trimester Modals */}
      <Modal isOpen={activeModal === 1} onClose={() => setActiveModal(null)} title="1er trimestre (0 - 12 semaines)">
        <div className="space-y-4 text-slate-700">
          <p>
            Le premier trimestre est fondamental : c’est la période de l'embryogenèse. Tous les organes de votre bébé se forment.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Changements corporels :</strong> Nausées, fatigue intense, et sensibilité aux odeurs sont fréquents.</li>
            <li><strong>Précautions :</strong> C'est la période la plus à risque pour les fausses couches. Soyez très prudente avec l'automédication et les plantes. L'acide folique (vitamine B9) est essentiel.</li>
            <li><strong>Plantes à éviter absolument :</strong> Toutes les plantes abortives et celles contenant des huiles essentielles riches en cétones (ex: romarin, menthe poivrée).</li>
          </ul>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 2} onClose={() => setActiveModal(null)} title="2ème trimestre (13 - 26 semaines)">
        <div className="space-y-4 text-slate-700">
          <p>
            Généralement considéré comme le trimestre le plus agréable. Le risque de fausse couche diminue drastiquement et les nausées disparaissent souvent.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Développement :</strong> Le bébé entend, bouge, et vous pouvez commencer à sentir ses coups de pied.</li>
            <li><strong>Maux fréquents :</strong> Remontées acides, maux de dos, et parfois crampes nocturnes.</li>
            <li><strong>Phytothérapie :</strong> Quelques plantes douces (comme la camomille ou le gingembre léger) peuvent être utilisées pour la digestion, mais toujours demander l'avis d'un professionnel.</li>
          </ul>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 3} onClose={() => setActiveModal(null)} title="3ème trimestre (27 - 40 semaines)">
        <div className="space-y-4 text-slate-700">
          <p>
            Le bébé grandit rapidement et votre ventre s'arrondit considérablement, ce qui peut entraîner une nouvelle fatigue.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Changements :</strong> Essoufflement, insomnies, contractions de Braxton-Hicks (fausses contractions) et préparation du corps à l'accouchement.</li>
            <li><strong>Plantes utiles (en fin de grossesse) :</strong> Les tisanes de feuilles de framboisier sont souvent recommandées (à partir de la 36ème semaine uniquement) pour tonifier l'utérus en vue de l'accouchement.</li>
            <li><strong>Attention :</strong> Restez toujours vigilante, certaines plantes peuvent déclencher prématurément le travail.</li>
          </ul>
        </div>
      </Modal>

    </div>
  );
}