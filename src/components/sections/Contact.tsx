"use client";

import { useState, useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedThinking from "@/components/ui/AnimatedThinking";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: -30 },
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

      gsap.fromTo(
        formRef.current,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    }, 3000);
  };

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F1F5F9 0%, #FEFEFE 100%)" }}
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-turquoise/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge mb-6">
            <span className="w-2 h-2 bg-turquoise rounded-full" />
            Contacto
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-6">
            ¿Listo para <span className="text-gradient">comenzar</span>?
          </h2>
          <p className="text-lg text-dark-light max-w-2xl mx-auto">
            Da el primer paso hacia tu bienestar. Completa el formulario y me
            pondré en contacto contigo lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-dark mb-6">
                Información de contacto
              </h3>
              <p className="text-dark-light mb-8">
                Estoy aquí para ayudarte. No dudes en contactarme por cualquiera de estos medios.
              </p>
            </div>

            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-medium hover:shadow-large transition-all duration-300 group border border-transparent hover:border-turquoise/20"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-dark font-semibold group-hover:text-turquoise transition-colors">
                    WhatsApp
                  </p>
                  <p className="text-dark-light text-sm">Respuesta rápida</p>
                </div>
                <svg className="w-5 h-5 text-dark-light group-hover:text-turquoise group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Schedule */}
              <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-medium border border-accent/10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-dark font-semibold">Horario de atención</p>
                  <p className="text-dark-light text-sm">Lunes a Viernes: 9:00 - 19:00</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-medium border border-secondary/10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-dark font-semibold">Modalidad</p>
                  <p className="text-dark-light text-sm">Consultas presenciales y online</p>
                </div>
              </div>
            </div>

            {/* Decorative illustration */}
            <div className="hidden lg:block mt-8">
              <div className="relative bg-gradient-to-br from-turquoise/10 to-primary/5 rounded-3xl p-8 flex items-center justify-center overflow-hidden">
                <AnimatedThinking color="#2DD4BF" className="w-32 h-32" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                <p className="absolute bottom-4 left-0 right-0 text-center text-dark-light text-sm font-medium">
                  Tu bienestar es mi prioridad
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-large p-6 sm:p-8 md:p-10 lg:p-12 border border-turquoise/10"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-20 h-20 rounded-full bg-turquoise/15 flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-dark mb-4">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-dark-light max-w-sm leading-relaxed">
                  Gracias por contactarme. Te responderé lo antes posible.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-dark mb-3">
                    Envíame un mensaje
                  </h3>
                  <p className="text-dark-light text-base md:text-lg">
                    Completa el formulario y te contactaré pronto.
                  </p>
                </div>

                <div className="space-y-5 md:space-y-6">
                  {/* Name & Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <div>
                      <label htmlFor="name" className="form-label">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Tu nombre"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  {/* Phone & Service row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <div>
                      <label htmlFor="phone" className="form-label">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="+1 234 567 890"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="form-label">
                        Servicio de interés
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="input-field appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat"
                      >
                        <option value="">Selecciona un servicio</option>
                        <option value="individual">Terapia Individual</option>
                        <option value="pareja">Terapia de Pareja</option>
                        <option value="ansiedad">Ansiedad y Depresión</option>
                        <option value="estres">Manejo del Estrés</option>
                        <option value="duelo">Duelo y Pérdida</option>
                        <option value="autoestima">Autoestima</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="form-label">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Cuéntame brevemente en qué puedo ayudarte..."
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-4 text-lg mt-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar mensaje
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default memo(Contact);
