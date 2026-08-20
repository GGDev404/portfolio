import { SITE } from "@/data/site";

export function HeroBackdrop() {
  const [first, ...rest] = SITE.name.toUpperCase().split(" ");
  const last = rest.join(" ");

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden select-none overflow-hidden sm:block"
    >
      <div
        data-hero-bg-row="1"
        className="absolute left-0 top-[14%] whitespace-nowrap font-display text-[16vw] font-light leading-none tracking-tight text-border-strong/70"
      >
        {first}
      </div>
      <div
        data-hero-bg-row="2"
        className="absolute right-0 bottom-[10%] whitespace-nowrap font-display text-[16vw] font-light leading-none tracking-tight text-border-strong/70"
      >
        {last}
      </div>
    </div>
  );
}
