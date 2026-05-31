"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getPlantImageUrl, PLANT_FALLBACK_IMAGE } from "@/lib/plant-image";
import type { ToxicityLevel } from "@/types";
import { TrafficLightBadge } from "./TrafficLightBadge";
import { Modal } from "./ui/modal";

interface PlantCardProps {
  nameFr: string;
  nameAr: string;
  nameEn: string;
  nameScientific: string;
  family: string;
  toxicityLevel: ToxicityLevel;
  description?: string;
  partUsed?: string;
  chemicalComposition?: string[];
  therapeuticEffects?: string[];
  pregnancySafetyNote?: string;
  isAbortifacient?: boolean;
  isUterotonic?: boolean;
  className?: string;
  onClick?: () => void;
}

export function PlantCard({
  nameFr,
  nameAr,
  nameEn,
  nameScientific,
  family,
  toxicityLevel,
  description,
  partUsed,
  chemicalComposition,
  therapeuticEffects,
  pregnancySafetyNote,
  isAbortifacient,
  isUterotonic,
  className,
  onClick,
}: PlantCardProps) {
  const [imgStatus, setImgStatus] = useState<"webp" | "jpg" | "error">("webp");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = imgStatus === "error" ? PLANT_FALLBACK_IMAGE : getPlantImageUrl(nameFr, imgStatus);

  const handleImageError = () => {
    if (imgStatus === "webp") {
      setImgStatus("jpg");
    } else {
      setImgStatus("error");
    }
  };

  const hasError = imgStatus === "error";

  const borderAccent: Record<ToxicityLevel, string> = {
    SAFE: "border-l-emerald-400",
    CAUTION: "border-l-amber-400",
    DANGER: "border-l-rose-400",
  };

  const glowColor: Record<ToxicityLevel, string> = {
    SAFE: "group-hover:shadow-emerald-100",
    CAUTION: "group-hover:shadow-amber-100",
    DANGER: "group-hover:shadow-rose-100",
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsModalOpen(true);
          onClick?.();
        }}
        className={cn(
          "group relative w-full text-left rounded-2xl border border-border/60",
        "bg-white/80 backdrop-blur-sm overflow-hidden",
        "shadow-sm transition-all duration-300",
        "border-l-4",
        borderAccent[toxicityLevel],
        "hover:shadow-xl hover:-translate-y-1",
        glowColor[toxicityLevel],
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2",
        className
      )}
    >
      {/* Image section */}
      <div className="relative h-40 w-full bg-gradient-to-br from-emerald-50/80 to-amber-50/30 overflow-hidden">
        <Image
          src={imageUrl}
          alt={nameFr}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className={cn(
            "object-contain p-4 transition-transform duration-500 group-hover:scale-110 ",
            hasError && "opacity-50 p-8"
          )}
          onError={handleImageError}
          unoptimized
        />
        {/* Badge positioned on image */}
        <div className="absolute top-3 right-3">
          <TrafficLightBadge level={toxicityLevel} size="sm" />
        </div>
      </div>

      {/* Content section */}
      <div className="p-4 pt-2">
        {/* French name */}
        <h3 className="text-lg font-bold text-foreground leading-tight truncate">
          {nameFr}
        </h3>
        {/* Arabic name */}
        <p className="text-sm font-medium text-primary/70 truncate mt-0.5">
          {nameAr}
        </p>
        {/* Scientific name */}
        <p className="text-xs italic text-muted-foreground/60 truncate">
          {nameScientific}
        </p>
        {/* Family */}
        {family && (
          <p className="text-xs text-muted-foreground/50 truncate">
            {family}
          </p>
        )}
        {/* Description */}
        {description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {/* Shimmer on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </button>

      {/* Plant Details Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col">
          {/* Header Image inside Modal */}
          <div className="relative h-48 w-full bg-gradient-to-br from-emerald-50 to-amber-50 rounded-xl overflow-hidden mb-6">
            <Image
              src={imageUrl}
              alt={nameFr}
              fill
              className={cn("object-contain p-4", hasError && "opacity-50 object-scale-down p-8")}
              onError={handleImageError}
              unoptimized
            />
            <div className="absolute top-3 right-3">
              <TrafficLightBadge level={toxicityLevel} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-green-900 leading-tight">
            {nameFr}
          </h2>
          {nameEn && (
            <p className="text-sm font-medium text-slate-600 mt-0.5">
              {nameEn}
            </p>
          )}
          {nameAr && (
            <p className="text-md font-medium text-[#E91E8C] mt-1">
              {nameAr}
            </p>
          )}
          {nameScientific && (
            <p className="text-sm italic text-slate-500 mt-1">
              {nameScientific}
            </p>
          )}
          {family && (
            <p className="text-xs text-slate-400 mb-4">
              Famille : {family}
            </p>
          )}

          {/* Pregnancy Safety Alert */}
          {(isAbortifacient || isUterotonic || pregnancySafetyNote) && (
            <div className={cn(
              "rounded-xl p-4 border mt-2 mb-3",
              toxicityLevel === "DANGER" ? "bg-rose-50 border-rose-200" :
              toxicityLevel === "CAUTION" ? "bg-amber-50 border-amber-200" :
              "bg-emerald-50 border-emerald-200"
            )}>
              <h4 className="font-semibold text-sm mb-1 flex items-center gap-1.5">
                {toxicityLevel === "DANGER" ? "🔴" : toxicityLevel === "CAUTION" ? "🟡" : "🟢"}
                Sécurité pendant la grossesse
              </h4>
              {pregnancySafetyNote && (
                <p className="text-sm text-slate-700">{pregnancySafetyNote}</p>
              )}
              {(isAbortifacient || isUterotonic) && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {isAbortifacient && (
                    <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800">
                      ⚠️ Abortifacient
                    </span>
                  )}
                  {isUterotonic && (
                    <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800">
                      ⚠️ Utérotonique
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Monograph Details */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mt-2">
            <h4 className="font-semibold text-green-900 mb-2">Description & Informations</h4>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {description || "Aucune description détaillée n'est disponible pour cette plante."}
            </p>
          </div>

          {/* Part Used & Composition */}
          {(partUsed || (chemicalComposition && chemicalComposition.length > 0)) && (
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mt-3">
              {partUsed && (
                <div className="mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Partie utilisée</span>
                  <p className="text-sm text-slate-700 mt-0.5">{partUsed}</p>
                </div>
              )}
              {chemicalComposition && chemicalComposition.length > 0 && (
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Composition chimique</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {chemicalComposition.map((comp) => (
                      <span key={comp} className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs text-blue-700 border border-blue-100">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Therapeutic Effects */}
          {therapeuticEffects && therapeuticEffects.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mt-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Effets thérapeutiques</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {therapeuticEffects.map((effect) => (
                  <span key={effect} className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs text-emerald-700 border border-emerald-100">
                    {effect}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
