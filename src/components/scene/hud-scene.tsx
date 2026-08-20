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

    const render = () => {
      const t = clock.getElapsedTime();
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
