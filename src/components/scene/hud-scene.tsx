"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function HudScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 640px)").matches;
    const canvas = canvasRef.current;
    if (!canvas || coarse || narrow) return;

    const accent = new THREE.Color(0x2fe6e6);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const core = new THREE.Group();
    scene.add(core);

    const icoGeometry = new THREE.IcosahedronGeometry(2.1, 1);
    const icoEdges = new THREE.EdgesGeometry(icoGeometry);
    const icoLines = new THREE.LineSegments(
      icoEdges,
      new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.55 }),
    );
    core.add(icoLines);

    // Snapshot of resting vertex positions so each frame can displace outward from
    // origin (the shape is centered at 0,0,0) without drifting or losing its form.
    const initialPosAttr = icoLines.geometry.attributes.position as THREE.BufferAttribute;
    const basePositions = Float32Array.from(initialPosAttr.array);
    initialPosAttr.setUsage(THREE.DynamicDrawUsage);

    const ringMaterial = new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.3 });
    const rings: THREE.Line[] = [];
    [2.9, 3.6].forEach((radius, i) => {
      const ringGeometry = new THREE.BufferGeometry();
      const segments = 96;
      const points: number[] = [];
      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        points.push(Math.cos(theta) * radius, Math.sin(theta) * radius, 0);
      }
      ringGeometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
      const ring = new THREE.Line(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2 + i * 0.6;
      ring.rotation.y = i * 0.9;
      core.add(ring);
      rings.push(ring);
    });

    const particleCount = 260;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 5 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.Float32BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: accent,
      size: 0.035,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    let frameId = 0;
    const clock = new THREE.Clock();
    const progress = { value: 0 };

    const posAttr = icoLines.geometry.attributes.position as THREE.BufferAttribute;
    const livePositions = posAttr.array as Float32Array;

    const render = () => {
      const t = clock.getElapsedTime();

      // Amplitude breathes across the whole page (a few waves over the full scroll,
      // not tied to any single section) so the core visibly "reconfigures" as you read.
      const wave = (Math.sin(progress.value * Math.PI * 5 - Math.PI / 2) + 1) / 2;
      const amplitude = gsap.utils.interpolate(0.06, 0.3, wave);

      for (let i = 0; i < livePositions.length; i += 3) {
        const bx = basePositions[i];
        const by = basePositions[i + 1];
        const bz = basePositions[i + 2];
        const noise =
          Math.sin(bx * 1.4 + t * 0.9) * Math.sin(by * 1.7 - t * 0.7) * Math.sin(bz * 1.3 + t * 0.6);
        const scale = 1 + noise * amplitude;
        livePositions[i] = bx * scale;
        livePositions[i + 1] = by * scale;
        livePositions[i + 2] = bz * scale;
      }
      posAttr.needsUpdate = true;

      const breathe = 1 + Math.sin(t * 0.5) * 0.05;
      core.scale.setScalar(breathe);

      core.rotation.y = progress.value * Math.PI * 2 + t * 0.06;
      core.rotation.x = progress.value * Math.PI * 0.6 + Math.sin(t * 0.15) * 0.05;
      particles.rotation.y = -t * 0.02;

      const settle = gsap.utils.clamp(0, 1, (progress.value - 0.85) / 0.15);
      particleMaterial.opacity = gsap.utils.interpolate(0.4, 0.12, settle);
      camera.position.z = gsap.utils.interpolate(9, 7.5, gsap.utils.clamp(0, 1, progress.value));

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };

    if (reduced) {
      renderer.render(scene, camera);
    } else {
      frameId = requestAnimationFrame(render);
    }

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progress.value = self.progress;
        if (reduced) renderer.render(scene, camera);
      },
    });

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frameId);
      } else if (!reduced) {
        frameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      trigger.kill();
      icoGeometry.dispose();
      icoEdges.dispose();
      icoLines.material.dispose();
      rings.forEach((ring) => ring.geometry.dispose());
      ringMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden sm:block"
    />
  );
}
