import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

if (typeof window !== "undefined") {
  // Los ScrollTriggers (pin del Hero, scrubs de About/Experience, SplitText)
  // se crean al montar, pero el layout aún puede moverse después: fuentes
  // que terminan de cargar, SplitText re-partiendo líneas, o el overflow:hidden
  // del intro quitando/devolviendo la scrollbar (cambia el viewport width y
  // reflowa el texto en vw). Si eso pasa DESPUÉS de que ScrollTrigger calculó
  // sus posiciones en píxeles, el scroll se siente "atorado" justo tras el
  // intro. Un refresh cuando el layout se estabiliza corrige las posiciones.
  window.addEventListener("load", () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
}

export { gsap, useGSAP, ScrollTrigger, SplitText };
