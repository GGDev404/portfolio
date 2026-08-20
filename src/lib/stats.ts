import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

function monthsBetween(start: string, end: string) {
  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] = end.split("-").map(Number);
  return (endYear - startYear) * 12 + (endMonth - startMonth);
}

export function computeStats() {
  const starts = [...experience.map((item) => item.start)].sort();
  const ends = [...experience.map((item) => item.end)].sort();
  const totalMonths = Math.max(0, monthsBetween(starts[0], ends[ends.length - 1]));
  const stackCount = new Set(Object.values(skills).flat()).size;

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    projectCount: projects.length,
    stackCount,
    current: experience[0],
  };
}
