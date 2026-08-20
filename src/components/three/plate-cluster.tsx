"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

type PlateSpec = {
  size: [number, number];
  chamfer: number;
  depth: number;
  position: [number, number, number];
  rotation: [number, number, number];
  face: string;
  accent?: boolean;
};

const SIGNAL = "#EDF0F3";
const TACTICAL = "#2FE6E6";

const PLATES: PlateSpec[] = [
  { size: [2.1, 1.3], chamfer: 0.22, depth: 0.1, position: [-0.6, 0.15, 0.3], rotation: [0.28, -0.35, 0.06], face: "#14171C" },
  { size: [1.5, 1.9], chamfer: 0.24, depth: 0.09, position: [0.7, -0.25, -0.1], rotation: [-0.15, 0.4, -0.08], face: "#14171C" },
  { size: [1.7, 1.05], chamfer: 0.18, depth: 0.11, position: [0.15, 0.55, 0.55], rotation: [0.4, 0.12, 0.2], face: "#1B1F25", accent: true },
  { size: [1.1, 1.5], chamfer: 0.16, depth: 0.08, position: [-0.85, -0.65, 0.05], rotation: [-0.3, -0.2, 0.35], face: "#1B1F25" },
  { size: [0.9, 0.9], chamfer: 0.14, depth: 0.07, position: [0.95, 0.65, -0.35], rotation: [0.5, 0.55, -0.15], face: "#14171C" },
];

/** Rectangle with two opposite corners cut at 45deg, matching the brand chamfer-plate construction. */
function chamferedRect(w: number, h: number, c: number) {
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2, -h / 2);
  shape.lineTo(-w / 2, h / 2 - c);
  shape.lineTo(-w / 2 + c, h / 2);
  shape.lineTo(w / 2, h / 2);
  shape.lineTo(w / 2, -h / 2 + c);
  shape.lineTo(w / 2 - c, -h / 2);
  shape.lineTo(-w / 2, -h / 2);
  return shape;
}

function Plate({ spec }: { spec: PlateSpec }) {
  const geometry = useMemo(() => {
    const shape = chamferedRect(spec.size[0], spec.size[1], spec.chamfer);
    return new THREE.ExtrudeGeometry(shape, { depth: spec.depth, bevelEnabled: false });
  }, [spec]);

  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <group position={spec.position} rotation={spec.rotation}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={spec.face} roughness={0.95} metalness={0.05} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial
          color={spec.accent ? TACTICAL : SIGNAL}
          transparent
          opacity={spec.accent ? 0.9 : 0.35}
        />
      </lineSegments>
    </group>
  );
}

function Cluster({ reduced }: { reduced: boolean }) {
  const pointerGroup = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (reduced || !pointerGroup.current) return;
    target.current.x = state.pointer.y * 0.18;
    target.current.y = state.pointer.x * 0.28;
    const lerp = Math.min(delta * 2, 1);
    pointerGroup.current.rotation.x += (target.current.x - pointerGroup.current.rotation.x) * lerp;
    pointerGroup.current.rotation.y += (target.current.y - pointerGroup.current.rotation.y) * lerp;
  });

  const plates = (
    <group ref={pointerGroup}>
      {PLATES.map((spec, i) => (
        <Plate key={i} spec={spec} />
      ))}
    </group>
  );

  if (reduced) return plates;

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.5}>
      {plates}
    </Float>
  );
}

export default function PlateCluster() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} camera={{ fov: 36, position: [0, 0, 6] }}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <directionalLight position={[-4, -2, -3]} intensity={0.25} />
      <Cluster reduced={reduced} />
    </Canvas>
  );
}
