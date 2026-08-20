const INTRO_SEEN_KEY = "gg-intro-seen";

export function shouldRunIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.location.hash && window.location.hash !== "#top") return false;
  if (window.scrollY >= 40) return false;
  if (sessionStorage.getItem(INTRO_SEEN_KEY)) return false;
  return true;
}

export function markIntroSeen() {
  sessionStorage.setItem(INTRO_SEEN_KEY, "1");
}
