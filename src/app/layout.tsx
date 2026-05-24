import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PhytoGrossesse Algérie — Plantes Médicinales & Grossesse",
  description:
    "Vérifiez la sécurité des plantes médicinales pendant la grossesse. Guide complet avec données scientifiques issues de thèses universitaires algériennes.",
  keywords: [
    "plantes médicinales",
    "grossesse",
    "Algérie",
    "toxicité",
    "phytothérapie",
    "femme enceinte",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="mt-28 min-h-full flex flex-col">
        <div className="fixed inset-0 -z-10">
          <Image
            src="/background.jpg" // Path relative to the public folder
            alt="Site Background"
            fill
            quality={100}
            priority // Prioritizes loading this image since it's above the fold
            className="object-cover" // Acts like background-size: cover
          />
        </div>
        <Navbar />
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-border/40 bg-gradient-hero">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <p className="text-xs text-muted-foreground/60">
                © 2026 PhytoGrossesse Algérie — Données à titre informatif
                uniquement.
              </p>
              <p className="text-xs text-muted-foreground/60">
                ⚠️ Consultez toujours votre médecin avant d&apos;utiliser des
                plantes pendant la grossesse.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
