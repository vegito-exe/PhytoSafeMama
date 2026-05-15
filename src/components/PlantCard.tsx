"use client";

import { cn } from "@/lib/utils";
import type { ToxicityLevel } from "@/types";
import { TrafficLightBadge } from "./TrafficLightBadge";
import { Leaf } from "lucide-react";

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
  // Subtle left-border color based on toxicity
  const borderAccent: Record<ToxicityLevel, string> = {
    SAFE: "border-l-emerald-400",
    CAUTION: "border-l-amber-400",
    DANGER: "border-l-rose-400",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        // Card base
        "group relative w-full text-left rounded-2xl border border-border/60 bg-white/80 backdrop-blur-sm",
        "p-5 shadow-sm transition-all duration-300",
        // Left accent stripe
        "border-l-4",
        borderAccent[toxicityLevel],
        // Hover / focus
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2",
        className
      )}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        {/* Names stack */}
        <div className="min-w-0 flex-1 space-y-1">
          {/* General name — prominent */}
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 shrink-0 text-emerald-500 opacity-70 transition-transform duration-300 group-hover:rotate-12" />
            <h3 className="truncate text-lg font-bold text-foreground">
              {nameGeneral}
            </h3>
          </div>

          {/* Algerian name — subtitle */}
          <p className="truncate text-sm font-medium text-muted-foreground/80 pl-6">
            {nameAlgerian}
          </p>

          {/* Scientific name — italic, small */}
          <p className="truncate text-xs italic text-muted-foreground/60 pl-6">
            {nameScientific}
          </p>
        </div>

        {/* Traffic-light badge */}
        <TrafficLightBadge level={toxicityLevel} size="sm" />
      </div>

      {/* Description */}
      {description && (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground pl-6">
          {description}
        </p>
      )}

      {/* Subtle shimmer on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </button>
  );
}
