"use client";

// Playground.jsx — controles en vivo de la figura 3D.
// Los sliders y botones escriben directo en la escena (setDistort/setSpeed/setMode);
// no re-renderizan nada del 3D, solo mutan su estado interno.
//
//   <Playground copy={{ eyebrow: "05", title: "Playground", sub: "…",
//                       distort: "Distorsión", speed: "Velocidad", mode: "Modo",
//                       modes: ["Cristal", "Wireframe", "Puntos"] }} />

import { useState } from "react";
import { useScene, useMagneticReveal } from "./CrystalScene";

const A = "#2FE6E6";
const mono = "'IBM Plex Mono', monospace";
const display = "'Oxanium', sans-serif";

const label = {
  fontFamily: mono, fontSize: 10, letterSpacing: "0.2em",
  textTransform: "uppercase", color: "#6E7783", marginBottom: 14
};

export default function Playground({ copy }) {
  const scene = useScene();
  const headRef = useMagneticReveal();
  const subRef = useMagneticReveal();
  const panelRef = useMagneticReveal();

  const [distort, setDistort] = useState(45);
  const [speed, setSpeed] = useState(45);
  const [mode, setMode] = useState(2);

  const pad = (n) => String(n).padStart(3, "0");

  const onDistort = (e) => {
    const v = +e.target.value;
    setDistort(v);
    scene?.current?.setDistort(v);
  };
  const onSpeed = (e) => {
    const v = +e.target.value;
    setSpeed(v);
    scene?.current?.setSpeed(v);
  };
  const pickMode = (i) => {
    setMode(i);
    scene?.current?.setMode(i);
    scene?.current?.feed(0.9);   // cambiar de figura también alimenta la escena
  };

  return (
    <section
      id="playground"
      style={{ padding: "100px 40px 140px", maxWidth: 1360, margin: "0 auto", boxSizing: "border-box" }}
    >
      <div ref={headRef} style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 12 }}>
        <span style={{ fontFamily: mono, fontSize: 12, color: A, letterSpacing: "0.2em" }}>{copy.eyebrow}</span>
        <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: 30, letterSpacing: "0.14em", textTransform: "uppercase", margin: 0 }}>
          {copy.title}
        </h2>
      </div>

      <p ref={subRef} style={{ margin: "0 0 44px", maxWidth: "56ch", fontSize: 15, lineHeight: 1.7, color: "#6E7783" }}>
        {copy.sub}
      </p>

      <div
        ref={panelRef}
        style={{
          border: "1px solid #1B1F25", background: "rgba(11,13,16,0.86)", backdropFilter: "blur(10px)",
          padding: "36px 38px", display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40, alignItems: "start"
        }}
      >
        <div>
          <div style={{ ...label, display: "flex", justifyContent: "space-between" }}>
            <span>{copy.distort}</span><span style={{ color: A }}>{pad(distort)}</span>
          </div>
          <input type="range" min="0" max="100" value={distort} onChange={onDistort}
                 style={{ width: "100%", accentColor: A }} />
        </div>

        <div>
          <div style={{ ...label, display: "flex", justifyContent: "space-between" }}>
            <span>{copy.speed}</span><span style={{ color: A }}>{pad(speed)}</span>
          </div>
          <input type="range" min="0" max="100" value={speed} onChange={onSpeed}
                 style={{ width: "100%", accentColor: A }} />
        </div>

        <div>
          <div style={label}>{copy.mode}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {copy.modes.map((m, i) => (
              <button
                key={m}
                onClick={() => pickMode(i)}
                style={{
                  fontFamily: mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
                  padding: "9px 14px", cursor: "pointer",
                  background: mode === i ? A : "transparent",
                  color: mode === i ? "#07080A" : "#9AA3AD",
                  border: `1px solid ${mode === i ? A : "#1B1F25"}`
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
