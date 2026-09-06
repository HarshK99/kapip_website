import type { Metadata } from "next";
import { Poppins, IBM_Plex_Sans, Spectral } from "next/font/google";
import { site } from "@/data/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
import PageIntro from "@/components/layout/PageIntro";
import PageTransition from "@/components/layout/PageTransition";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Body face. IBM Plex Sans is a humanist screen sans with engineering-drafting
// heritage that pairs with Poppins without competing with it — part of a
// coordinated Plex system alongside the mono below (DESIGN.md — Typography).
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

// The assertion voice — used in exactly two places: the Home hero's H1 and the
// once-per-page Statement block. Everything else stays on
// font-display/font-body (DESIGN.md — Typography).
// Spectral is a screen-first serif (Production Type) with low stroke contrast
// and a calm, sturdy display cut — confident without drama. Only 700 is loaded:
// both usages set it bold, nothing uses a lighter cut (perf — India context).
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["700"],
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
      className={`${poppins.variable} ${plexSans.variable} ${spectral.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <PageIntro />
        <Header />
        <main className="flex flex-1 flex-col">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
