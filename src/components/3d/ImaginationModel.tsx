"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  scale?: number;
}

function Model({ scale = 0.1 }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/assets/models/imagination/scene.gltf");

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y += 0.003;
      // Subtle floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

interface ImaginationModelProps {
  className?: string;
}

export default function ImaginationModel({ className = "" }: ImaginationModelProps) {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isClient) {
    return (
      <div className={`${className} bg-gradient-to-br from-pink-soft/10 to-blue-dark/5`} />
    );
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={isMobile ? 1 : [1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Model scale={0.05} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
          <ambientLight intensity={0.8} color="#f4f6f8" />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            color="#DB8084"
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8FA1B1" />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/assets/models/imagination/scene.gltf");
