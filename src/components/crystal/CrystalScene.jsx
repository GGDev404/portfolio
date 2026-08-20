"use client";

// CrystalScene.jsx — wrapper React/Next.js del fondo 3D.
// Coloca el <div> host fijo detrás de todo el contenido y expone la escena
// por contexto, para que los reveals puedan llamar a feed() y "alimentarla".
//
// Uso en un layout o página (App Router):
//
//   <CrystalSceneProvider>
//     <main className="relative z-10">…tu contenido…</main>
//   </CrystalSceneProvider>
//
// Y en cualquier bloque revelable:
//
//   const ref = useMagneticReveal();
//   return <div ref={ref}>…</div>;

import { createContext, useContext, useEffect, useRef, useState } from "react";

const SceneCtx = createContext(null);
export const useScene = () => useContext(SceneCtx);

export function CrystalSceneProvider({ children, accent = "#2FE6E6" }) {
  const host = useRef(null);
  const scene = useRef(null);
  const [, force] = useState(0);

  useEffect(() => {
    let s;
    let cancelled = false;
    // three se carga en cliente y de forma diferida: es pesado y no sirve en SSR.
    (async () => {
      const { createCrystalScene: create } = await import("./crystal-scene");
      if (cancelled || !host.current) return;
      s = create(host.current, { accent });
      scene.current = s;
      force((n) => n + 1);
    })();
    return () => { cancelled = true; if (s) s.dispose(); scene.current = null; };
  }, [accent]);

  return (
    <SceneCtx.Provider value={scene}>
      <div className="relative flex min-h-full flex-1 flex-col bg-background">
        <div ref={host} className="fixed inset-0 z-0" />
        {/* Viñeta: oscurece los bordes para que el texto respire sobre la escena. */}
        <div
          className="pointer-events-none fixed inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, transparent 30%, color-mix(in srgb, var(--background) 72%, transparent) 100%)",
          }}
        />
        {children}
      </div>
    </SceneCtx.Provider>
  );
}

// ---------------------------------------------------------------------------
// Reveal magnético: el bloque entra desde afuera hacia el centro y alimenta
// la escena al hacerlo. Ver README §2 y §3.
// ---------------------------------------------------------------------------
export function useMagneticReveal({ delayForIntro = true } = {}) {
  const ref = useRef(null);
  const scene = useScene();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const off = (r.left + r.width / 2) - vw / 2;
    const wide = r.width > vw * 0.72 || vw < 720;
    const dir = off < 0 ? -1 : 1;
    // Clamp por espacio disponible: el offset inicial NUNCA debe salirse del
    // viewport, o el documento crece y aparece scroll horizontal.
    const room = dir < 0 ? Math.max(0, r.left) : Math.max(0, vw - r.right);
    const pull = Math.min(200, 90 + Math.abs(off) * 0.5, room);
    const side = !wide && Math.abs(off) > vw * 0.05 && pull >= 36;
    const plan = side ? { x: dir * pull, y: 10, rot: dir * -7 } : { x: 0, y: 46, rot: 0 };

    el.style.willChange = "transform, opacity, filter";
    el.style.transition =
      "opacity 0.9s cubic-bezier(.16,1,.3,1), transform 1.05s cubic-bezier(.16,1,.3,1), filter 0.9s ease-out";
    el.style.opacity = "0";
    el.style.filter = "blur(9px)";
    el.style.transform =
      `perspective(1200px) translate3d(${plan.x}px,${plan.y}px,-90px) rotateY(${plan.rot}deg) scale(0.94)`;

    let cleanT;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        if (scene?.current) scene.current.feed(plan.x !== 0 ? 0.75 : 0.4);
        el.style.opacity = "1";
        el.style.filter = "blur(0px)";
        el.style.transform = "perspective(1200px) translate3d(0,0,0) rotateY(0deg) scale(1)";
        cleanT = setTimeout(() => { el.style.willChange = ""; el.style.filter = ""; }, 1300);
      });
    }, { rootMargin: "0px 0px -10% 0px" });

    // Si el intro está en pantalla, no revelar todavía: el H1 chocaría con el
    // nombre gigante del overlay.
    let startT;
    const start = () => io.observe(el);
    if (delayForIntro && window.scrollY < 40) startT = setTimeout(start, 2300);
    else start();

    return () => { clearTimeout(startT); clearTimeout(cleanT); io.disconnect(); };
  }, [scene, delayForIntro]);

  return ref;
}
