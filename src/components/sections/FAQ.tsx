"use client";

import { useState, useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "¿A partir de qué edad pueden venir los niños?",
    answer: "Trabajo con niños desde los 3 años. Para los más pequeños (3-5 años) utilizamos principalmente terapia de juego. A partir de los 6 años incorporamos técnicas más variadas adaptadas a su nivel de desarrollo.",
  },
  {
    question: "¿Cómo es la primera consulta?",
    answer: "La primera sesión es una reunión con los padres o cuidadores, sin el niño presente. Conversamos sobre las preocupaciones, la historia del niño y los objetivos. Esto me permite diseñar un plan adaptado antes de conocer al pequeño.",
  },
  {
    question: "¿Participan los padres en el proceso?",
    answer: "Sí, los padres son parte fundamental de la terapia. Realizamos sesiones de retroalimentación periódicas para que en casa refuercen lo trabajado en consulta. La familia y la psicóloga somos un equipo.",
  },
  {
    question: "¿Cuánto dura cada sesión y con qué frecuencia?",
    answer: "Las sesiones duran 45 minutos y generalmente se realizan una vez por semana. A medida que el niño progresa podemos espaciarlas. Cada caso es diferente y lo ajustamos juntos.",
  },
  {
    question: "¿Las sesiones son presenciales u online?",
    answer: "Ofrezco ambas modalidades. Las sesiones online son especialmente útiles para niños mayores de 7 años y para sesiones de orientación a padres. Tú eliges lo que mejor se adapte a la familia.",
  },
  {
    question: "¿La información es confidencial?",
    answer: "Absolutamente. Todo lo tratado en sesión está protegido por el secreto profesional. Comparto información con los padres solo en la medida necesaria para el bienestar del niño, siempre de forma respetuosa.",
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const FAQItem = memo(function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.35,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${
        isOpen
          ? "bg-gradient-to-br from-turquoise to-turquoise-dark shadow-turquoise"
          : "bg-white shadow-medium hover:shadow-large border border-turquoise/10 hover:border-turquoise/25"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full px-5 py-5 md:px-7 md:py-6 flex items-center justify-between text-left gap-4"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 md:gap-5 flex-1 min-w-0">
          <span
            className={`w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all duration-300 ${
              isOpen ? "bg-white/20 text-white" : "bg-turquoise/10 text-turquoise"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`font-semibold text-base md:text-lg transition-colors leading-snug ${
              isOpen ? "text-white" : "text-dark"
            }`}
          >
            {question}
          </span>
        </div>
        <div
          className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
            isOpen ? "bg-white/20 rotate-180" : "bg-turquoise/10 hover:bg-turquoise/20"
          }`}
        >
          <svg
            className={`w-5 h-5 transition-colors ${isOpen ? "text-white" : "text-turquoise"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div ref={contentRef} className="overflow-hidden h-0 opacity-0">
        <div className="px-5 md:px-7 pb-6 md:pb-7">
          <p className="text-white/90 leading-relaxed pl-[3.75rem] md:pl-[4.25rem] text-[15px] md:text-base">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
});

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: {
              trigger: listRef.current,
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
      id="faq"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F0FDFA 0%, #FEFEFE 50%, #F1F5F9 100%)" }}
    >
      {/* Decorative */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-turquoise/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <div className="badge mb-6">
            <span className="w-2 h-2 bg-turquoise rounded-full" />
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark mb-6">
            Preguntas <span className="text-gradient">Frecuentes</span>
          </h2>
          <p className="text-lg text-dark-light max-w-2xl mx-auto">
            Sabemos que como papá o mamá tienes muchas dudas. Aquí resolvemos las más comunes.
          </p>
        </div>

        {/* FAQ List */}
        <div ref={listRef} className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 md:mt-16">
          <p className="text-dark-light mb-5 text-lg">¿Tienes más preguntas?</p>
          <a href="#contacto" className="btn-secondary text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Contáctame
          </a>
        </div>
      </div>
    </section>
  );
}

export default memo(FAQ);
