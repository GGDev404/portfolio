import type { Metadata } from "next";
import { Oxanium, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/hud/custom-cursor";
import { SectionNav } from "@/components/hud/section-nav";
import { IntroOverlay } from "@/components/hud/intro-overlay";
import { CrystalSceneProvider } from "@/components/crystal/CrystalScene";
import "../globals.css";

const oxanium = Oxanium({
  variable: "--font-display",
  weight: ["300", "600", "800"],
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://geovanygonzalez.dev"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${oxanium.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider>
          <CrystalSceneProvider>
            <div className="relative z-10 flex min-h-full flex-1 flex-col">
              <IntroOverlay />
              <CustomCursor />
              <Header />
              <SectionNav />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CrystalSceneProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
