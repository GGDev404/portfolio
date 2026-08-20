import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { HeroPitch } from "@/components/hero/hero-pitch";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import ProjectsTerminal from "@/components/crystal/ProjectsTerminal";
import Playground from "@/components/crystal/Playground";
import { projects } from "@/data/projects";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as "es" | "en";

  const tProjects = await getTranslations({ locale, namespace: "projects" });
  const projectsCopy = {
    eyebrow: "02",
    title: tProjects("title"),
    sub: tProjects("subtitle"),
    terminalHint: tProjects("terminalHint"),
    viewDemo: tProjects("liveLink"),
    viewCode: tProjects("codeLink"),
  };
  const projectsList = projects.map((project) => {
    const content = project[loc];
    return {
      name: content.name,
      role: content.role,
      desc: content.summary,
      bullets: content.impact,
      stack: project.stack,
      demo: project.liveUrl,
      code: project.repoUrl,
    };
  });

  const tPlayground = await getTranslations({ locale, namespace: "playground" });
  const playgroundCopy = {
    eyebrow: tPlayground("eyebrow"),
    title: tPlayground("title"),
    sub: tPlayground("sub"),
    distort: tPlayground("distort"),
    speed: tPlayground("speed"),
    mode: tPlayground("mode"),
    modes: tPlayground.raw("modes") as string[],
  };

  return (
    <>
      <Hero />
      <HeroPitch />
      <About />
      <ProjectsTerminal copy={projectsCopy} projects={projectsList} />
      <Experience />
      <Skills />
      <Playground copy={playgroundCopy} />
      <Contact />
    </>
  );
}
