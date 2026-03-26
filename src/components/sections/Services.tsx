"use client";

import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Ansiedad y Depresión",
    description: "Acompañamiento terapéutico para gestionar la ansiedad y la depresión, fortaleciendo herramientas emocionales y promoviendo el bienestar mental.",
    icon: "🧠",
    color: "from-turquoise to-turquoise-dark",
    hoverColor: "from-turquoise to-turquoise-deep",
  },
  {
    title: "Regulación Emocional",
    description: "Herramientas prácticas para que el paciente maneje miedos, preocupaciones y situaciones estresantes.",
    icon: "🌟",
    color: "from-primary to-primary-dark",
    hoverColor: "from-primary-dark to-primary",
  },
  {
    title: "Dificultades de Aprendizaje",
    description: "Apoyo especializado para niños con TDAH, dislexia u otras necesidades educativas especiales.",
    icon: "📚",
    color: "from-accent to-accent-light",
    hoverColor: "from-accent-light to-accent",
  },
  {
    title: "Habilidades Sociales",
    description: "Desarrollamos la capacidad de relacionarse, comunicarse y hacer amigos de manera asertiva.",
    icon: "🤝",
    color: "from-secondary to-secondary-dark",
    hoverColor: "from-secondary-dark to-secondary",
  },
  {
    title: "Cambios Familiares",
    description: "Acompañamiento en divorcios, llegada de hermanos, cambios de colegio y otras transiciones.",
    icon: "🏡",
    color: "from-turquoise-dark to-turquoise-deep",
    hoverColor: "from-turquoise-deep to-turquoise-dark",
  },
  {
    title: "Autoestima y Confianza",
    description: "Fortalecemos la imagen positiva de sí mismo para que tu hijo brille con seguridad.",
    icon: "🌈",
    color: "from-primary-light to-primary",
    hoverColor: "from-primary to-primary-light",
  },
];

function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
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

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40, scale: 0.95 },
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
      id="servicios"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)" }}
    >
      {/* Decorative glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-turquoise/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge bg-turquoise/20 text-turquoise border-turquoise/30 mb-6">
            <span className="w-2 h-2 bg-turquoise rounded-full" />
            Servicios
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            ¿En qué puedo <span className="text-gradient">ayudarte</span>?
          </h2>
          <p className="text-lg text-white/60">
            Cada persona es única. Adapto cada proceso a su edad, personalidad y necesidades específicas.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-turquoise/40 transition-all duration-400 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl`} />

              {/* Content */}
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-all duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white/60 group-hover:text-white/90 transition-colors leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-turquoise group-hover:text-white transition-colors font-medium">
                  <span>Saber más</span>
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a href="#contacto" className="btn-primary text-lg">
            <span>Agenda tu primera cita</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default memo(Services);
