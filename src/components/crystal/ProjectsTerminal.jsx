"use client";

// ProjectsTerminal.jsx — lista de proyectos con estética de terminal.
// Una sola fila abierta a la vez (acordeón). Abrir una fila alimenta la escena 3D.
//
//   <ProjectsTerminal
//     copy={{ eyebrow: "02", title: "Proyectos", sub: "…",
//             terminalHint: "click para expandir", viewDemo: "Ver demo", viewCode: "Código" }}
//     projects={[{ name, role, desc, bullets: [], stack: [], demo, code }]} />

import { useState } from "react";
import { useScene, useMagneticReveal } from "./CrystalScene";

const A = "#2FE6E6";
const mono = "'IBM Plex Mono', monospace";
const display = "'Oxanium', sans-serif";

export default function ProjectsTerminal({ copy, projects }) {
  const scene = useScene();
  const headRef = useMagneticReveal();
  const subRef = useMagneticReveal();
  const shellRef = useMagneticReveal();
  const [open, setOpen] = useState(-1);

  const toggle = (i) => {
    const next = open === i ? -1 : i;
    setOpen(next);
    if (next !== -1) scene?.current?.feed(0.9);
  };

  return (
    <section
      id="projects"
      style={{
        padding: "clamp(64px,12vw,100px) 40px clamp(80px,16vw,140px)",
        maxWidth: 1360,
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      <div ref={headRef} style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 12 }}>
        <span style={{ fontFamily: mono, fontSize: 12, color: A, letterSpacing: "0.2em" }}>{copy.eyebrow}</span>
        <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: 30, letterSpacing: "0.14em", textTransform: "uppercase", margin: 0 }}>
          {copy.title}
        </h2>
      </div>

      <p ref={subRef} style={{ margin: "0 0 44px", fontSize: 15, color: "#6E7783" }}>{copy.sub}</p>

      <div ref={shellRef} style={{ border: "1px solid #1B1F25", background: "rgba(9,11,13,0.88)", backdropFilter: "blur(10px)" }}>
        {/* Barra de título de la "terminal" */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid #1B1F25",
          padding: "14px 22px", fontFamily: mono, fontSize: 11, letterSpacing: "0.16em", color: "#6E7783"
        }}>
          <span style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 8, height: 8, background: "#1B1F25" }} />
            <span style={{ width: 8, height: 8, background: "#1B1F25" }} />
            <span style={{ width: 8, height: 8, background: A }} />
          </span>
          <span>~/projects — {copy.terminalHint}</span>
        </div>

        {projects.map((p, i) => (
          <Row key={p.name} p={p} i={i} open={open === i} onToggle={() => toggle(i)} copy={copy} />
        ))}
      </div>
    </section>
  );
}

function Row({ p, i, open, onToggle, copy }) {
  const [hover, setHover] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid #14181D" }}>
      <div
        onClick={onToggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
        style={{
          display: "grid", gridTemplateColumns: "56px 1fr auto", gap: 24, alignItems: "start",
          padding: "26px 22px", cursor: "pointer",
          background: hover ? "rgba(47,230,230,0.045)" : "transparent",
          transition: "background 0.25s ease"
        }}
      >
        <span style={{ fontFamily: mono, fontSize: 12, color: A, marginTop: 6 }}>{String(i + 1).padStart(2, "0")}</span>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20, flexWrap: "wrap" }}>
          <span style={{ fontFamily: display, fontWeight: 600, fontSize: 26, letterSpacing: "0.02em" }}>{p.name}</span>
          <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", color: "#6E7783" }}>{p.role}</span>
        </div>
        <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", color: "#6E7783", marginTop: 6 }}>
          {open ? "[ — ]" : "[ + ]"}
        </span>
      </div>

      {/* Expansión: grid-template-rows 0fr→1fr para animar altura sin medir. */}
      <div style={{
        display: "grid", gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows 0.5s cubic-bezier(.16,1,.3,1)"
      }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{
            padding: "4px 22px 34px clamp(22px,8vw,102px)", display: "grid", gap: 24,
            borderTop: "1px dashed #14181D",
            opacity: open ? 1 : 0, transition: "opacity 0.4s ease"
          }}>
            <p style={{ margin: "22px 0 0", maxWidth: "70ch", fontSize: 15, lineHeight: 1.75, color: "#9AA3AD", textWrap: "pretty" }}>
              {p.desc}
            </p>

            <div style={{ display: "grid", gap: 10 }}>
              {p.bullets.map((b) => (
                <div key={b} style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: 12, alignItems: "baseline" }}>
                  <span style={{ color: A, fontFamily: mono, fontSize: 11 }}>›</span>
                  <span style={{ fontSize: 14, lineHeight: 1.6, color: "#9AA3AD" }}>{b}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {p.stack.map((s) => (
                <span key={s} style={{
                  fontFamily: mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "#9AA3AD", border: "1px solid #1B1F25", padding: "6px 10px"
                }}>{s}</span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 24 }}>
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer"
                   style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: A, textDecoration: "none" }}>
                  {copy.viewDemo} →
                </a>
              )}
              {p.code && (
                <a href={p.code} target="_blank" rel="noreferrer"
                   style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6E7783", textDecoration: "none" }}>
                  {copy.viewCode} →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
