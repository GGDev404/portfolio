// crystal-scene.js — escena 3D del portafolio, portable y sin dependencias de framework.
// Requiere: npm i three   (probado con three 0.160)
//
//   import { createCrystalScene } from "./crystal-scene";
//   const scene = createCrystalScene(hostEl, { accent: "#2FE6E6" });
//   scene.feed(0.75);        // "alimentar" la figura (llamar en cada reveal)
//   scene.setMode(1);        // 0 cristal · 1 wireframe · 2 puntos
//   scene.setDistort(45);    // 0..100
//   scene.setSpeed(45);      // 0..100
//   scene.dispose();
//
// El host debe ser un elemento con tamaño propio (p. ej. position:fixed; inset:0).

import * as THREE from "three";

// Recorrido de cámara: una única órbita continua alrededor del cristal,
// manejada por funciones de `prog` (0..1, el progreso de scroll ya
// suavizado) en vez de un set de keyframes curados a mano. Con keyframes
// discretos, una sección corta de la página consume su tramo de `t` en pocos
// píxeles de scroll y la cámara "late" de una composición a otra — eso es lo
// que se sentía como cortes bruscos. Una curva continua no tiene ese modo de
// falla: da igual cuánto mida cada sección, la velocidad de la cámara es
// siempre proporcional a cuánto se scrolleó, nunca un salto.
//
// La cámara arranca en (0,0,6.4) —mismo encuadre íntimo de siempre para el
// Hero— y gira lentamente sobre el eje Y mientras recorre Hero → About →
// Proyectos → Experiencia → Skills → Playground → Contacto. El radio ya no
// crece en línea recta: usa una curva en forma de "U invertida" (`bump`,
// pico en la mitad del scroll) que ACERCA la cámara a media página —el
// cristal se ve más grande y con más movimiento justo ahí— y la deja cerca
// otra vez al final, en vez de alejarla hasta verse diminuta. El barrido se
// limita a ~80° para no cruzar nunca al lado opuesto del cristal, donde no
// hay luces (`key`/`fill` están del lado +z).
const ORBIT_START = 0;
const ORBIT_END = (78 * Math.PI) / 180;
const ORBIT_RADIUS_START = 6.4;
const ORBIT_RADIUS_END = 7.15;   // antes 8.6: al final ya no se veía tan chico
const ORBIT_RADIUS_PULL = 0.6;   // cuánto se acerca la cámara a media página

export function createCrystalScene(host, options = {}) {
  const accentHex = options.accent || "#2FE6E6";
  const accent = new THREE.Color(accentHex);
  const reduced = typeof window !== "undefined" &&
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = {
    distort: options.distort ?? 45,   // 0..100
    speed: options.speed ?? 45,       // 0..100
    mode: options.mode ?? 0           // 0 cristal · 1 wireframe · 2 puntos
  };

  // Pantallas angostas ya usan menos detalle de geometría (ver `detail` abajo);
  // bajar también el pixelRatio ahí ahorra fillrate en el mismo tipo de equipo.
  const narrow = window.innerWidth < 800;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, narrow ? 1.5 : 1.8));
  renderer.setSize(host.clientWidth, host.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 6.4);

  // --- Environment map pintada a mano en un canvas (sin assets externos) ---
  const ec = document.createElement("canvas");
  ec.width = 512; ec.height = 256;
  const ex = ec.getContext("2d");
  const grad = ex.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, "#0d1418");
  grad.addColorStop(0.5, "#111a1f");
  grad.addColorStop(1, "#05060700");
  ex.fillStyle = "#07080A"; ex.fillRect(0, 0, 512, 256);
  ex.fillStyle = grad;      ex.fillRect(0, 0, 512, 256);
  const paintBlob = (x, y, r, col) => {
    const gr = ex.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, col); gr.addColorStop(1, "rgba(0,0,0,0)");
    ex.fillStyle = gr; ex.fillRect(0, 0, 512, 256);
  };
  paintBlob(120, 70, 150, "rgba(47,230,230,0.95)");
  paintBlob(400, 180, 170, "rgba(120,200,220,0.5)");
  paintBlob(300, 30, 90, "rgba(237,240,243,0.85)");
  const envTex = new THREE.CanvasTexture(ec);
  envTex.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = envTex;

  // --- Geometría del cristal. `base` guarda las posiciones sin deformar. ---
  const detail = narrow ? 8 : 14;
  const geo = new THREE.IcosahedronGeometry(1.55, detail);
  const base = geo.attributes.position.array.slice();

  const glass = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, roughness: 0.06, transmission: 1, thickness: 1.8,
    ior: 1.45, clearcoat: 1, clearcoatRoughness: 0.08, iridescence: 0.7,
    iridescenceIOR: 1.4, envMapIntensity: 1.6, transparent: true
  });
  const wire = new THREE.MeshBasicMaterial({ color: accent, wireframe: true, transparent: true, opacity: 0.5 });

  const crystal = new THREE.Mesh(geo, glass);
  scene.add(crystal);

  // Variante "puntos": misma geometría deformada, dibujada como nube.
  const ptsGeo = new THREE.BufferGeometry();
  ptsGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(base), 3));
  const points = new THREE.Points(ptsGeo, new THREE.PointsMaterial({
    color: accent, size: 0.018, transparent: true, opacity: 0.85
  }));
  points.visible = false;
  scene.add(points);

  const cage = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.5, 1)),
    new THREE.LineBasicMaterial({ color: 0x2a3238, transparent: true, opacity: 0.55 })
  );
  scene.add(cage);

  const N = 900;
  const fp = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 4.5 + Math.random() * 10;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    fp[i * 3]     = r * Math.sin(ph) * Math.cos(th);
    fp[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.6;
    fp[i * 3 + 2] = r * Math.cos(ph);
  }
  const fieldGeo = new THREE.BufferGeometry();
  fieldGeo.setAttribute("position", new THREE.BufferAttribute(fp, 3));
  const field = new THREE.Points(fieldGeo, new THREE.PointsMaterial({
    color: 0x9AA3AD, size: 0.02, transparent: true, opacity: 0.4
  }));
  scene.add(field);

  const grid = new THREE.GridHelper(60, 60, 0x14181d, 0x0e1216);
  grid.position.y = -6;
  grid.material.transparent = true;
  grid.material.opacity = 0.35;
  scene.add(grid);

  const key = new THREE.PointLight(accent, 22, 30);   key.position.set(3, 3, 4);   scene.add(key);
  const fill = new THREE.PointLight(0xEDF0F3, 12, 30); fill.position.set(-4, -2, 3); scene.add(fill);
  scene.add(new THREE.AmbientLight(0x1b2226, 1.2));

  // --- Entradas dinámicas ---
  let energy = 0;                 // sube con feed(), decae cada frame
  let prog = 0, progTarget = 0;   // progreso de scroll suavizado
  const mouse = { x: 0, y: 0 };
  let mx = 0, my = 0;

  const scrollProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  };

  const onMove = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onMove);

  const onResize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener("resize", onResize);

  const pos = geo.attributes.position;
  const tmpTarget = new THREE.Vector3();
  const clock = new THREE.Clock();
  let simTime = 0;
  let prevProg = 0;
  let raf = 0, dead = false;

  const tick = () => {
    if (dead) return;
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);

    // El progreso de scroll se LEE AQUÍ, no en un listener de scroll:
    // este bucle siempre corre y no se pierde en remounts.
    progTarget = scrollProgress();
    prog += (progTarget - prog) * 0.075;

    // 0 en los extremos del scroll, 1 a media página: da la forma de "más
    // grande y con más movimiento a la mitad" sin tocar el arranque, que
    // sigue igual porque bump = 0 en prog = 0.
    const bump = Math.sin(Math.min(1, Math.max(0, prog)) * Math.PI);

    const orbitT = ORBIT_START + prog * (ORBIT_END - ORBIT_START);
    const radius =
      ORBIT_RADIUS_START + prog * (ORBIT_RADIUS_END - ORBIT_RADIUS_START) - bump * ORBIT_RADIUS_PULL;
    const height = Math.sin(prog * Math.PI * 1.3) * 1.3;
    const cp = [radius * Math.sin(orbitT), height, radius * Math.cos(orbitT)];
    const ct = [Math.sin(prog * Math.PI) * 0.25, Math.cos(prog * Math.PI * 0.6) * 0.15, 0];

    mx += (mouse.x - mx) * 0.05;
    my += (mouse.y - my) * 0.05;
    camera.position.set(cp[0] + mx * 0.55, cp[1] - my * 0.45, cp[2]);
    tmpTarget.set(ct[0], ct[1], ct[2]);
    camera.lookAt(tmpTarget);

    // Reactivo al scroll: cada frame que el usuario avanza suma energía en
    // proporción a la velocidad real de scroll (no solo a los feed() de los
    // reveals), así el cristal responde al gesto mismo de scrollear. Se
    // clampea por frame para que un salto grande de scroll (anchor jump,
    // flick muy rápido) no sature toda la energía de un golpe.
    const rawVelocity = Math.min(0.05, Math.abs(progTarget - prevProg));
    prevProg = progTarget;
    energy = Math.min(1.8, energy + rawVelocity * 6);

    // Energía: decaimiento independiente del framerate (~1s hasta ~0).
    energy *= Math.pow(0.14, dt);
    const en = energy;

    const play = state.distort / 100;
    const speed = (0.25 + (state.speed / 100) * 1.5) * (1 + en * 0.55) * (1 + bump * 0.45);
    const amp = (0.30 + bump * 0.10 + Math.sin(prog * Math.PI * 1.4) * 0.06) * (0.45 + play * 1.25) * (1 + en * 0.34);
    const scale = (1 + bump * 0.07 + Math.sin(prog * Math.PI * 1.1 + 0.4) * 0.06) * (1 + en * 0.055);
    key.intensity = 22 * (1 + en * 0.85);
    wire.opacity = 0.5 + en * 0.28;

    simTime += dt * speed;
    const tt = simTime;

    // Deformación por ruido sinusoidal sobre las posiciones base.
    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3;
      const x = base[ix], y = base[ix + 1], z = base[ix + 2];
      const n =
        Math.sin(x * 2.1 + tt * 1.1) * Math.cos(y * 1.9 - tt * 0.8) * Math.sin(z * 2.3 + tt * 0.6) * 0.7 +
        Math.sin(x * 4.6 - tt * 1.7) * Math.cos(z * 4.2 + tt * 1.3) * 0.3;
      const f = 1 + n * amp;
      pos.array[ix] = x * f;
      pos.array[ix + 1] = y * f;
      pos.array[ix + 2] = z * f;
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    ptsGeo.attributes.position.array.set(pos.array);
    ptsGeo.attributes.position.needsUpdate = true;

    const rot = 0.12 + bump * 0.16;
    crystal.rotation.y += dt * (0.12 + rot * 0.6);
    crystal.rotation.x = Math.sin(tt * 0.2) * 0.22;
    crystal.scale.setScalar(scale);
    points.rotation.copy(crystal.rotation);
    points.scale.copy(crystal.scale);

    // La energía contrae la jaula y el campo hacia el centro: "absorción".
    cage.rotation.y -= dt * (0.06 + en * 0.22);
    cage.rotation.x += dt * 0.02;
    cage.scale.setScalar(1 - en * 0.045);
    field.rotation.y += dt * (0.012 + en * 0.06);
    field.scale.setScalar(1 - en * 0.02);

    crystal.visible = state.mode !== 2;
    crystal.material = state.mode === 1 ? wire : glass;
    points.visible = state.mode === 2;

    renderer.render(scene, camera);
  };

  if (reduced) {
    // Sin movimiento: un solo frame estático.
    renderer.render(scene, camera);
  } else {
    tick();
  }

  // Pestaña oculta = nadie ve el frame: cortar el loop ahorra CPU/batería.
  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else if (!reduced && !dead) {
      tick();
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  return {
    feed(amount = 0.6) { energy = Math.min(1.8, energy + amount); },
    setMode(mode) { state.mode = mode; },
    setDistort(v) { state.distort = v; },
    setSpeed(v) { state.speed = v; },
    get energy() { return energy; },
    camera, scene, renderer,
    dispose() {
      dead = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      geo.dispose(); ptsGeo.dispose(); fieldGeo.dispose();
      cage.geometry.dispose(); cage.material.dispose();
      glass.dispose(); wire.dispose();
      points.material.dispose(); field.material.dispose();
      grid.geometry.dispose(); grid.material.dispose();
      envTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    }
  };
}
