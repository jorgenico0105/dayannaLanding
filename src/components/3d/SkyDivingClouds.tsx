"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";

// Cloud cluster made of multiple spheres
function CloudCluster({ position, scale = 1, speed = 0.5 }: { position: [number, number, number]; scale?: number; speed?: number }) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Move diagonally: down and slightly left
    groupRef.current.position.y -= delta * speed;
    groupRef.current.position.x -= delta * speed * 0.3;

    // Reset when below view
    if (groupRef.current.position.y < -10) {
      groupRef.current.position.y = 12;
      groupRef.current.position.x = -8 + Math.random() * 16;
    }
  });

  // Create multiple spheres with varying opacity for soft, ethereal look
  const spheres = useMemo(() => [
    // Core spheres - slightly more visible
    { pos: [0, 0, 0] as [number, number, number], size: 1.8 * scale, opacity: 0.35 },
    { pos: [1.5, 0.3, 0.2] as [number, number, number], size: 1.5 * scale, opacity: 0.3 },
    { pos: [-1.4, 0.2, 0.3] as [number, number, number], size: 1.4 * scale, opacity: 0.3 },
    // Outer wisps - very soft
    { pos: [0.8, 0.7, -0.3] as [number, number, number], size: 1.2 * scale, opacity: 0.2 },
    { pos: [-0.6, 0.6, 0.4] as [number, number, number], size: 1.1 * scale, opacity: 0.2 },
    { pos: [2.2, 0, 0.1] as [number, number, number], size: 1.0 * scale, opacity: 0.15 },
    { pos: [-2.0, -0.1, -0.1] as [number, number, number], size: 1.0 * scale, opacity: 0.15 },
    // Extra soft edges
    { pos: [0.3, -0.5, 0.2] as [number, number, number], size: 1.3 * scale, opacity: 0.18 },
    { pos: [-0.5, -0.3, -0.2] as [number, number, number], size: 1.1 * scale, opacity: 0.15 },
  ], [scale]);

  return (
    <group ref={groupRef} position={position}>
      {spheres.map((sphere, i) => (
        <mesh key={i} position={sphere.pos}>
          <sphereGeometry args={[sphere.size, 16, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={sphere.opacity}
            roughness={1}
            metalness={0}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function SkyDiveClouds() {
  // Define cloud positions - spread out for airy feel
  const clouds = useMemo(() => [
    { pos: [-6, 9, -3] as [number, number, number], scale: 1.0, speed: 0.5 },
    { pos: [4, 11, -4] as [number, number, number], scale: 0.9, speed: 0.45 },
    { pos: [-2, 6, -2] as [number, number, number], scale: 1.1, speed: 0.5 },
    { pos: [7, 7, -5] as [number, number, number], scale: 0.8, speed: 0.55 },
    { pos: [-5, 2, -3] as [number, number, number], scale: 0.95, speed: 0.4 },
    { pos: [2, 0, -2] as [number, number, number], scale: 1.05, speed: 0.45 },
    { pos: [6, 4, -4] as [number, number, number], scale: 0.85, speed: 0.6 },
    { pos: [-7, -3, -3] as [number, number, number], scale: 0.9, speed: 0.5 },
  ], []);

  return (
    <>
      {clouds.map((cloud, i) => (
        <CloudCluster key={i} position={cloud.pos} scale={cloud.scale} speed={cloud.speed} />
      ))}
    </>
  );
}

interface SkyDivingCloudsProps {
  className?: string;
}

export default function SkyDivingCloudsScene({ className = "" }: SkyDivingCloudsProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Sky gradient background - light turquoise */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #f0fdfa 0%, #e0f7fa 30%, #ccfbf1 60%, #b2ebf2 100%)",
        }}
      />

      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        style={{ position: "absolute", inset: 0 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={2} color="#ffffff" />
        <directionalLight position={[5, 10, 5]} intensity={1} color="#ffffff" />
        <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#b2ebf2" />
        <SkyDiveClouds />
      </Canvas>
    </div>
  );
}
