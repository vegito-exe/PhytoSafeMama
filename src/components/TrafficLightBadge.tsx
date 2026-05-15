"use client";

import { cn } from "@/lib/utils";
import type { ToxicityLevel } from "@/types";

// ──────────────────────────────────────────────
// Configuration for each toxicity level
// ──────────────────────────────────────────────
const config: Record<
  ToxicityLevel,
  { label: string; emoji: string; bg: string; text: string; ring: string; dot: string }
> = {
  SAFE: {
    label: "Indiqué",
    emoji: "🟢",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
    dot: "bg-emerald-500",
  },
  CAUTION: {
    label: "Prudence",
    emoji: "🟡",
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-200",
    dot: "bg-amber-500",
  },
  DANGER: {
    label: "Contre-indiqué",
    emoji: "🔴",
    bg: "bg-rose-50",
    text: "text-rose-700",
    ring: "ring-rose-200",
    dot: "bg-rose-500",
  },
};

interface TrafficLightBadgeProps {
  level: ToxicityLevel;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function TrafficLightBadge({
  level,
  size = "md",
  className,
}: TrafficLightBadgeProps) {
  const { label, bg, text, ring, dot } = config[level];

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1.5",
    md: "px-3 py-1 text-sm gap-2",
    lg: "px-4 py-1.5 text-base gap-2.5",
  };

  const dotSizes = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold ring-1 ring-inset transition-all duration-200",
        bg,
        text,
        ring,
        sizeClasses[size],
        className
      )}
    >
      {/* Animated pulse dot */}
      <span className="relative flex">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-40",
            dot
          )}
        />
        <span className={cn("relative inline-flex rounded-full", dot, dotSizes[size])} />
      </span>
      {label}
    </span>
  );
}
