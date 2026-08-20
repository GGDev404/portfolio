import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { StackMarquee } from "@/components/hero/stack-marquee";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <StackMarquee />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
