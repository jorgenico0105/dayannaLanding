"use client";

import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import AnimatedBrain from "@/components/ui/AnimatedBrain";

const SkyDivingClouds = dynamic(() => import("@/components/3d/SkyDivingClouds"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-cyan-50 via-teal-50 to-white" />
  ),
});

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const brainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current, statsRef.current], {
        opacity: 0,
        y: 30,
      });
      gsap.set(imageRef.current, { opacity: 0, scale: 0.95, x: 30 });
      gsap.set(brainRef.current, { opacity: 0, scale: 0.8 });

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.5)
        .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.7)
        .to(imageRef.current, { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: "power2.out" }, 0.4)
        .to(brainRef.current, { opacity: 1, scale: 1, duration: 0.6 }, 0.8)
        .to(statsRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.9);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Sky Diving Clouds Background */}
      <SkyDivingClouds className="absolute inset-0 z-0" />

      {/* Overlay for readability - subtle to let clouds show through */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/80 z-[1]" />

      {/* Floating decorative elements - using full color palette */}
      <div className="absolute top-32 right-1/4 w-4 h-4 bg-turquoise/50 rounded-full animate-float z-[2]" />
      <div className="absolute top-1/2 left-16 w-3 h-3 bg-primary/50 rounded-full animate-float-slow z-[2]" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-40 right-24 w-5 h-5 bg-accent/50 rounded-full animate-float z-[2]" style={{ animationDelay: "2s" }} />
      <div className="absolute top-40 left-1/3 w-3 h-3 bg-secondary/40 rounded-full animate-float-slow z-[2]" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-60 left-20 w-4 h-4 bg-primary-light/40 rounded-full animate-float z-[2]" style={{ animationDelay: "1.5s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="badge mb-6">
              <span className="w-2 h-2 bg-turquoise rounded-full animate-pulse" />
              Psicóloga Clínica
            </div>

            <h1
              ref={titleRef}
              className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl font-bold text-dark leading-tight mb-6"
            >
              Tu bienestar emocional{" "}
              <span className="text-gradient">comienza aquí</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl text-dark-light leading-relaxed mb-8 max-w-lg"
            >
              Soy Dayanna Vivanco. Te acompaño en tu camino hacia una vida más
              plena con un enfoque cálido, profesional y completamente personalizado.
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 mb-12">
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

            {/* Stats - using different colors from palette */}
            <div ref={statsRef} className="flex flex-wrap gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-turquoise">+500</div>
                <div className="text-sm text-dark-light">Pacientes atendidos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">+5</div>
                <div className="text-sm text-dark-light">Años de experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">98%</div>
                <div className="text-sm text-dark-light">Satisfacción</div>
              </div>
            </div>
          </div>

          {/* Image with decorative brain */}
          <div ref={imageRef} className="order-1 lg:order-2 relative">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Animated Brain decoration */}
              <div
                ref={brainRef}
                className="absolute -top-8 -right-8 w-24 h-24 z-20 animate-float-slow hidden lg:block"
              >
                <AnimatedBrain color="#2DD4BF" className="w-full h-full" />
              </div>

              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-turquoise/20 via-turquoise-light/10 to-primary/10 rounded-[40px] blur-2xl" />

              {/* Main image container */}
              <div className="relative bg-gradient-to-br from-turquoise to-turquoise-dark rounded-[32px] p-1 shadow-turquoise">
                <div className="bg-white rounded-[28px] p-3">
                  <img
                    src="/assets/img.webp"
                    alt="Dayanna Vivanco - Psicóloga Clínica"
                    className="w-full h-auto rounded-[20px] object-cover aspect-[4/5]"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-large border border-turquoise/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-turquoise/15 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-dark">Consulta Online</div>
                    <div className="text-sm text-turquoise-dark flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-turquoise animate-pulse" />
                      Disponible
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
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
