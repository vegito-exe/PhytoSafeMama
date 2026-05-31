"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = "Rechercher une plante (français, arabe, anglais ou scientifique)…",
  onSearch,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full max-w-2xl mx-auto", className)}
    >
      <div
        className={cn(
          "relative flex items-center rounded-2xl border bg-white/90 backdrop-blur-sm transition-all duration-300",
          focused
            ? "border-primary/40 shadow-lg shadow-primary/10 ring-4 ring-primary/5"
            : "border-border/60 shadow-sm hover:shadow-md hover:border-border"
        )}
      >
        {/* Search icon */}
        <Search
          className={cn(
            "absolute left-4 h-5 w-5 transition-colors duration-200",
            focused ? "text-primary" : "text-muted-foreground/50"
          )}
        />

        {/* Input */}
        <input
          id="plant-search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={cn(
            "w-full bg-transparent py-4 pl-12 pr-4 text-base text-foreground",
            "placeholder:text-muted-foreground/50",
            "outline-none"
          )}
        />

        {/* Clear button (appears when there's text) */}
        {query.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onSearch?.("");
            }}
            className="absolute right-4 rounded-full p-1 text-muted-foreground/50 transition-colors hover:bg-muted hover:text-muted-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
