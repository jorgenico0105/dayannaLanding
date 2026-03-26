"use client";

import { useEffect, useRef, useState, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import AnimatedBrain from "@/components/ui/AnimatedBrain";

gsap.registerPlugin(ScrollTrigger);

const ChatModal = dynamic(() => import("@/components/ui/ChatModal"), {
  ssr: false,
});

function ChatPlaceholder() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        mockupRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="section-padding relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-turquoise/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-turquoise-dark/5 rounded-full blur-[80px]" />

        {/* Floating brain decorations */}
        <div className="absolute top-20 left-10 w-16 h-16 animate-float-slow opacity-20 hidden lg:block">
          <AnimatedBrain color="#2DD4BF" className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-10 w-12 h-12 animate-float opacity-15 hidden lg:block" style={{ animationDelay: "2s" }}>
          <AnimatedBrain color="#E8747C" className="w-full h-full" />
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <div ref={contentRef} className="text-center mb-12">
            <div className="badge bg-turquoise/20 text-turquoise border-turquoise/30 mb-6">
              <span className="w-2 h-2 bg-turquoise rounded-full animate-pulse" />
              Asistente IA
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
              Orientación para padres{" "}
              <span className="text-gradient">24/7</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Resuelve dudas rápidas sobre el comportamiento y las emociones de tu hijo/a
              con nuestro asistente inteligente, disponible cuando lo necesites.
            </p>
          </div>

          {/* Chat Preview Card */}
          <div ref={mockupRef} className="max-w-lg mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-turquoise to-turquoise-dark flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">Asistente Virtual</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-turquoise animate-pulse" />
                    <span className="text-turquoise text-sm">En línea</span>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="py-6 space-y-4">
                {/* Bot message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-turquoise/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-turquoise text-xs font-bold">AI</span>
                  </div>
                  <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-white/90 text-sm">
                      ¡Hola! Soy el asistente de Dayanna. ¿Tienes alguna duda sobre tu hijo/a?
                    </p>
                  </div>
                </div>

                {/* User message */}
                <div className="flex gap-3 justify-end">
                  <div className="bg-gradient-to-br from-turquoise to-turquoise-dark rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p className="text-white text-sm">
                      Mi hijo tiene miedo de ir al colegio, ¿qué puedo hacer?
                    </p>
                  </div>
                </div>

                {/* Typing indicator */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-turquoise/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-turquoise text-xs font-bold">AI</span>
                  </div>
                  <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setIsChatOpen(true)}
                className="w-full btn-primary py-4 text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Probar Asistente
              </button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[
                { icon: "🕐", text: "Disponible 24/7" },
                { icon: "🔒", text: "100% Privado" },
                { icon: "⚡", text: "Respuestas inmediatas" },
              ].map((feature) => (
                <div
                  key={feature.text}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
                >
                  <span>{feature.icon}</span>
                  <span className="text-white/60 text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}

export default memo(ChatPlaceholder);
