"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Cloud, Clouds as DreiClouds } from "@react-three/drei";

interface CloudsSceneProps {
  className?: string;
}

function CloudsContent() {
  return (
    <>
      <DreiClouds material={undefined}>
        <Cloud
          seed={1}
          scale={2}
          volume={5}
          color="#ffffff"
          fade={100}
          speed={0.1}
          growth={4}
          segments={40}
          bounds={[10, 2, 2]}
          opacity={0.3}
          position={[-4, 2, -5]}
        />
        <Cloud
          seed={2}
          scale={1.5}
          volume={4}
          color="#f0f0f0"
          fade={100}
          speed={0.15}
          growth={3}
          segments={30}
          bounds={[8, 2, 2]}
          opacity={0.25}
          position={[5, -1, -8]}
        />
        <Cloud
          seed={3}
          scale={2.5}
          volume={6}
          color="#ffffff"
          fade={100}
          speed={0.08}
          growth={5}
          segments={50}
          bounds={[12, 3, 2]}
          opacity={0.2}
          position={[0, 3, -10]}
        />
        <Cloud
          seed={4}
          scale={1.8}
          volume={4}
          color="#e8e8e8"
          fade={100}
          speed={0.12}
          growth={4}
          segments={35}
          bounds={[9, 2, 2]}
          opacity={0.25}
          position={[-6, -2, -6]}
        />
        <Cloud
          seed={5}
          scale={1.2}
          volume={3}
          color="#ffffff"
          fade={100}
          speed={0.2}
          growth={3}
          segments={25}
          bounds={[6, 1.5, 1.5]}
          opacity={0.2}
          position={[7, 1, -7]}
        />
      </DreiClouds>

      {/* Ambient lighting for soft feel */}
      <ambientLight intensity={1} color="#f4f6f8" />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#DB8084" />
    </>
  );
}

export default function CloudsScene({ className = "" }: CloudsSceneProps) {
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
      <div
        className={`${className} bg-gradient-to-br from-white-soft via-white-soft to-pink-soft/10`}
      />
    );
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={isMobile ? 1 : [1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <CloudsContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
