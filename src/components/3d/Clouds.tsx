"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

interface CloudsProps {
  count?: number;
  speed?: number;
  opacity?: number;
  spread?: { x: number; y: number; z: number };
}

export default function Clouds({
  count = 15,
  speed = 0.3,
  opacity = 0.4,
  spread = { x: 12, y: 6, z: 5 },
}: CloudsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Store cloud data
  const cloudData = useMemo(() => {
    const data: {
      position: THREE.Vector3;
      scale: number;
      speed: number;
      rotationSpeed: number;
    }[] = [];

    for (let i = 0; i < count; i++) {
      data.push({
        position: new THREE.Vector3(
          gsap.utils.random(-spread.x, spread.x),
          gsap.utils.random(-spread.y, spread.y),
          gsap.utils.random(-spread.z, 0)
        ),
        scale: gsap.utils.random(1.5, 4),
        speed: gsap.utils.random(0.1, 0.3) * speed,
        rotationSpeed: gsap.utils.random(-0.1, 0.1),
      });
    }
    return data;
  }, [count, speed, spread]);

  // Custom cloud geometry (soft sphere cluster)
  const cloudGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(1, 16, 16);
    return geometry;
  }, []);

  // Cloud material
  const cloudMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ffffff"),
      transparent: true,
      opacity: opacity,
      depthWrite: false,
    });
  }, [opacity]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const cloud = cloudData[i];

      // Gentle floating motion
      const floatY = Math.sin(time * cloud.speed + i) * 0.5;
      const floatX = Math.cos(time * cloud.speed * 0.5 + i) * 0.3;

      dummy.position.set(
        cloud.position.x + floatX,
        cloud.position.y + floatY,
        cloud.position.z
      );

      dummy.scale.setScalar(cloud.scale + Math.sin(time * 0.2 + i) * 0.2);
      dummy.rotation.y = time * cloud.rotationSpeed;

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[cloudGeometry, cloudMaterial, count]}
      frustumCulled={false}
    />
  );
}
