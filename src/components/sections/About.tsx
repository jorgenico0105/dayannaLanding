"use client";

import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedBrain from "@/components/ui/AnimatedBrain";

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  { icon: "🎓", text: "Licenciada en Psicología Clínica", color: "from-turquoise to-turquoise-dark", bgColor: "bg-turquoise/10" },
  { icon: "🧒", text: "Especialización en Psicología Infantil y del Desarrollo", color: "from-primary to-primary-dark", bgColor: "bg-primary/10" },
  { 
  icon: "🧩", 
  text: "Maestría en Dificultades del Aprendizaje y Trastornos del Lenguaje", 
  color: "from-accent to-accent-light", 
  bgColor: "bg-accent/10" 
},
  { icon: "🌿", text: "Formación en Mindfulness para Niños", color: "from-secondary to-secondary-dark", bgColor: "bg-secondary/10" },
  
];

function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="quien-soy"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FEFEFE 0%, #F0FDFA 50%, #F1F5F9 100%)" }}
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-turquoise/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={contentRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge mb-6">
            <span className="w-2 h-2 bg-turquoise rounded-full" />
            Psicóloga Clínica
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark mb-6">
            Hola, soy <span className="text-gradient">Dayanna Vivanco</span>
          </h2>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Image side */}
          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="relative max-w-md mx-auto">
              {/* Decorative brain */}
              <div className="absolute -top-6 -left-6 w-20 h-20 animate-float-slow opacity-80 hidden md:block">
                <AnimatedBrain color="#2DD4BF" className="w-full h-full" />
              </div>

              {/* Image frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-turquoise/15 via-primary/10 to-turquoise-light/15 rounded-[40px] blur-xl" />

              <div className="relative bg-gradient-to-br from-turquoise to-turquoise-dark rounded-[32px] p-1">
                <div className="bg-white rounded-[28px] p-3">
                  <img
                    src="/assets/Dayanna.jpeg"
                    alt="Dayanna Vivanco - Psicóloga Clínica"
                    className="w-full h-auto rounded-[20px] object-cover aspect-[3/4]"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Stats card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-large border border-turquoise/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-turquoise to-turquoise-dark flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-dark">+300</div>
                    <div className="text-sm text-dark-light">Pacientes acompañados</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-medium border border-turquoise/10">
              <h3 className="text-2xl font-bold text-dark mb-4">
                Mi enfoque
              </h3>
              <p className="text-dark-light leading-relaxed mb-6">
                Trabajo desde un enfoque integrador, utilizando herramientas como la
                terapia cognitivo-conductual, la terapia de juego y mindfulness para acompañar a niños,
                adolescentes y adultos. Me especializo especialmente en la infancia, una etapa fundamental
                donde el apoyo adecuado puede transformar el bienestar emocional a largo plazo.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Empatía", "Juego terapéutico", "Enfoque familiar", "Calidez"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-turquoise/10 rounded-full text-sm font-medium text-turquoise-deep"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-turquoise to-turquoise-dark rounded-2xl p-5 text-white">
                <div className="text-3xl font-bold mb-1">+5</div>
                <div className="text-white/80 text-sm">Años de experiencia</div>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-5 text-white">
                <div className="text-3xl font-bold mb-1">98%</div>
                <div className="text-white/80 text-sm">Familias satisfechas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {credentials.map((credential, index) => (
            <div
              key={index}
              className="card group text-center hover:scale-105"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${credential.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                {credential.icon}
              </div>
              <p className="text-dark font-medium text-sm leading-relaxed">
                {credential.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(About);
