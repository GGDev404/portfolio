import { skills } from "@/data/skills";

const stack = Array.from(new Set(Object.values(skills).flat()));

export function StackMarquee() {
  return (
    <div className="gg-marquee border-y border-border bg-background-elevated/50" aria-hidden="true">
      <div className="gg-marquee__track">
        {[...stack, ...stack].map((tech, i) => (
          <span key={`${tech}-${i}`} className="gg-marquee__item">
            {tech}
            <span className="gg-marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
