"use client";

import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Terapia Individual",
    description: "Espacio seguro para explorar tus emociones y alcanzar tus metas personales.",
    icon: "👤",
    color: "from-turquoise to-turquoise-dark",
    hoverColor: "from-turquoise to-turquoise-deep",
  },
  {
    title: "Terapia de Pareja",
    description: "Mejora la comunicación y fortalece el vínculo con tu pareja.",
    icon: "💑",
    color: "from-primary to-primary-dark",
    hoverColor: "from-primary-dark to-primary",
  },
  {
    title: "Ansiedad y Depresión",
    description: "Tratamiento especializado para recuperar tu calidad de vida.",
    icon: "🌱",
    color: "from-accent to-accent-light",
    hoverColor: "from-accent-light to-accent",
  },
  {
    title: "Manejo del Estrés",
    description: "Desarrolla estrategias efectivas y técnicas de relajación.",
    icon: "🧘",
    color: "from-secondary to-secondary-dark",
    hoverColor: "from-secondary-dark to-secondary",
  },
  {
    title: "Duelo y Pérdida",
    description: "Acompañamiento compasivo en procesos de duelo.",
    icon: "🕊️",
    color: "from-turquoise-dark to-turquoise-deep",
    hoverColor: "from-turquoise-deep to-turquoise-dark",
  },
  {
    title: "Autoestima",
    description: "Desarrolla una relación saludable contigo mismo.",
    icon: "⭐",
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
      style={{ background: "linear-gradient(180deg, #F1F5F9 0%, #FEFEFE 50%, #F0FDFA 100%)" }}
    >
      {/* Decorative */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-turquoise/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge mb-6">
            <span className="w-2 h-2 bg-turquoise rounded-full" />
            Servicios
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-6">
            ¿En qué puedo <span className="text-gradient">ayudarte</span>?
          </h2>
          <p className="text-lg text-dark-light">
            Ofrezco diferentes servicios adaptados a tus necesidades. Cada proceso es único y personalizado.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-medium hover:shadow-large transition-all duration-400 overflow-hidden border border-transparent hover:border-turquoise/20"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl`} />

              {/* Content */}
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl mb-6 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300`}>
                  {service.icon}
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-dark group-hover:text-white mb-3 transition-colors">
                  {service.title}
                </h3>
                <p className="text-dark-light group-hover:text-white/90 transition-colors leading-relaxed mb-6">
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
