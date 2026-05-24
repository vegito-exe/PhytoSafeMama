"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getPlantImageUrl, PLANT_FALLBACK_IMAGE } from "@/lib/plant-image";
import type { ToxicityLevel } from "@/types";
import { TrafficLightBadge } from "./TrafficLightBadge";
import { Modal } from "./ui/modal";

interface PlantCardProps {
  nameGeneral: string;
  nameAlgerian: string;
  nameScientific: string;
  toxicityLevel: ToxicityLevel;
  description?: string;
  className?: string;
  onClick?: () => void;
}

export function PlantCard({
  nameGeneral,
  nameAlgerian,
  nameScientific,
  toxicityLevel,
  description,
  className,
  onClick,
}: PlantCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = imgError ? PLANT_FALLBACK_IMAGE : getPlantImageUrl(nameGeneral);

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
          alt={nameGeneral}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className={cn(
            "object-contain p-4 transition-transform duration-500 group-hover:scale-110",
            imgError && "opacity-50 p-8"
          )}
          onError={() => setImgError(true)}
          unoptimized
        />
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/90 to-transparent" />
        {/* Badge positioned on image */}
        <div className="absolute top-3 right-3">
          <TrafficLightBadge level={toxicityLevel} size="sm" />
        </div>
      </div>

      {/* Content section */}
      <div className="p-4 pt-2">
        {/* General name */}
        <h3 className="text-lg font-bold text-foreground leading-tight truncate">
          {nameGeneral}
        </h3>
        {/* Algerian name */}
        <p className="text-sm font-medium text-primary/70 truncate mt-0.5">
          {nameAlgerian}
        </p>
        {/* Scientific name */}
        <p className="text-xs italic text-muted-foreground/60 truncate">
          {nameScientific}
        </p>
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
              alt={nameGeneral}
              fill
              className="object-contain p-4"
              unoptimized
            />
            <div className="absolute top-3 right-3">
              <TrafficLightBadge level={toxicityLevel} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-green-900 leading-tight">
            {nameGeneral}
          </h2>
          {nameAlgerian && (
            <p className="text-md font-medium text-[#E91E8C] mt-1">
              Appellation algérienne: {nameAlgerian}
            </p>
          )}
          {nameScientific && (
            <p className="text-sm italic text-slate-500 mt-1 mb-4">
              Nom scientifique: {nameScientific}
            </p>
          )}

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mt-2">
            <h4 className="font-semibold text-green-900 mb-2">Description & Informations</h4>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {description || "Aucune description détaillée n'est disponible pour cette plante."}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
