import type { Metadata } from "next";
import { Poppins, Inter, IBM_Plex_Mono, Fraunces } from "next/font/google";
import { site } from "@/data/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Used in exactly one place: the Home hero's H1. Everything else stays on
// font-display/font-body/font-mono — see DESIGN.md's Typography section.
// Loaded as the full variable font (no fixed `weight`) so the hero can dial
// in Fraunces's opsz/SOFT/WONK axes via font-variation-settings for a
// sharper, higher-contrast cut rather than its default softer text setting.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-hero-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${ibmPlexMono.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
