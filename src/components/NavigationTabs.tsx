"use client";

import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Stethoscope, FlaskConical } from "lucide-react";

export type TabValue = "guide" | "symptoms" | "science";

interface NavigationTabsProps {
  value: TabValue;
  onChange: (value: TabValue) => void;
  className?: string;
}

const tabs: { value: TabValue; label: string; icon: React.ElementType }[] = [
  { value: "guide", label: "Le Guide des Plantes", icon: BookOpen },
  { value: "symptoms", label: "Maux & Solutions", icon: Stethoscope },
  { value: "science", label: "Le Coin Scientifique", icon: FlaskConical },
];

export function NavigationTabs({ value, onChange, className }: NavigationTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(v) => onChange(v as TabValue)}
      className={cn("w-full", className)}
    >
      <TabsList className="mx-auto flex h-auto w-full max-w-2xl rounded-2xl bg-muted/50 p-1.5 backdrop-blur-sm">
        {tabs.map(({ value: tabVal, label, icon: Icon }) => (
          <TabsTrigger
            key={tabVal}
            value={tabVal}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
              "data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
