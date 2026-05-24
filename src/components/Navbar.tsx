"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Leaf, BookOpen, Stethoscope, FlaskConical, Home } from "lucide-react";

const navLinks = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/guide", label: "Guide des Plantes", icon: BookOpen },
  { href: "/symptoms", label: "Maux & Solutions", icon: Stethoscope },
  { href: "/science", label: "Coin Scientifique", icon: FlaskConical },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] shadow rounded-2xl border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl transition-colors group-hover:bg-primary/20">
            <Image src="/logo.svg" alt="Logo" width={64} height={64} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-foreground hidden sm:inline">
              PhytoSafe_<span className="text-primary">Mama</span>
            </span>
            <span className="text-sm tracking-tight text-foreground">Plantes medicinale & grossesse</span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
