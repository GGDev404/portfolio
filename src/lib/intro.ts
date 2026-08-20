export const INTRO_DURATION = 3200;
// Debe coincidir con el punto (58%) en que ggIntroOut empieza a desvanecer en globals.css.
export const INTRO_EXIT_DELAY = Math.round(INTRO_DURATION * 0.58);

export function shouldRunIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.location.hash && window.location.hash !== "#top") return false;
  if (window.scrollY >= 40) return false;
  return true;
}
