import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
