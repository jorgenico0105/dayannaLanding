"use client";

import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";

const FluidRender = dynamic(() => import("@/components/3d/FluidRender"), {
  ssr: false,
});

// Palette: turquoise + coral on cream — defined outside component to keep stable references
const FLUID_CONFIG = {
  c1:   [0.176, 0.831, 0.749] as [number, number, number], // #2DD4BF turquoise
  c2:   [0.910, 0.455, 0.486] as [number, number, number], // #E8747C coral
  bg:   [0.996, 0.996, 0.996] as [number, number, number], // #FEFEFE cream
  speed: 0.18,
  comp:  0.72,
  scale: 2.6,
  elev:  0.55,
  gloss: 95,
};

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current, statsRef.current], {
        opacity: 0,
        y: 30,
      });

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.5)
        .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.7)
        .to(statsRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.9);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#FEFEFE]"
    >
      {/* WebGL fluid background */}
      <FluidRender
        config={FLUID_CONFIG}
        className="absolute inset-0 z-0"
      />

      {/* Overlay: fades the fluid subtly hacia abajo para que el texto respire */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/60 via-white/75 to-white/95 pointer-events-none" />

      {/* Floating bubbles — z-[2] to sit above the overlay */}
      <div className="absolute top-28 right-[18%] w-4 h-4 bg-turquoise/50 rounded-full animate-float z-[2]" />
      <div className="absolute top-1/2 left-14 w-3 h-3 bg-primary/50 rounded-full animate-float-slow z-[2]" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-36 right-20 w-5 h-5 bg-accent/50 rounded-full animate-float z-[2]" style={{ animationDelay: "2s" }} />
      <div className="absolute top-40 left-[15%] w-3 h-3 bg-secondary/40 rounded-full animate-float-slow z-[2]" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-56 left-16 w-4 h-4 bg-primary-light/45 rounded-full animate-float z-[2]" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-60 right-12 w-2.5 h-2.5 bg-turquoise/40 rounded-full animate-float-slow z-[2]" style={{ animationDelay: "0.8s" }} />
      <div className="absolute bottom-80 right-[30%] w-3.5 h-3.5 bg-accent/40 rounded-full animate-float z-[2]" style={{ animationDelay: "2.5s" }} />
      <div className="absolute top-1/3 left-8 w-2 h-2 bg-primary/35 rounded-full animate-float-slow z-[2]" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/4 right-[40%] w-2 h-2 bg-turquoise/35 rounded-full animate-float z-[2]" style={{ animationDelay: "1.8s" }} />
      <div className="absolute bottom-44 left-[35%] w-3 h-3 bg-accent/30 rounded-full animate-float-slow z-[2]" style={{ animationDelay: "2.2s" }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 relative z-[3] text-center">
        <div className="badge mb-6 mx-auto">
          <span className="w-2 h-2 bg-turquoise rounded-full animate-pulse" />
          Psicóloga Clínica · Especialista en infancia, adolescencia y adultez joven.
        </div>

        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-dark leading-tight mb-6"
        >
          Un espacio para sanar y{" "}
          <span className="text-gradient">crecer</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-dark-light leading-relaxed mb-10 max-w-2xl mx-auto"
        >
         Soy Dayanna Vivanco, psicóloga clínica enfocada en el acompañamiento de niños, adolescentes y adultos. Mi propósito es brindar un espacio seguro donde cada persona pueda sentirse escuchada, comprendida y acompañada en su camino hacia el bienestar emocional.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#contacto" className="btn-primary text-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Agendar Consulta
          </a>
          <a href="#servicios" className="btn-secondary text-lg">
            Ver Servicios
          </a>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="flex flex-wrap gap-10 justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-turquoise">+300</div>
            <div className="text-sm text-dark-light mt-1">Pacientes acompañados</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">+5</div>
            <div className="text-sm text-dark-light mt-1">Años de experiencia</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent">98%</div>
            <div className="text-sm text-dark-light mt-1">Familias satisfechas</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3]">
        <a
          href="#quien-soy"
          className="flex flex-col items-center text-dark-light hover:text-turquoise transition-colors"
        >
          <span className="text-sm mb-2">Descubre más</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
            <div className="w-1.5 h-2.5 bg-current rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}

export default memo(Hero);
