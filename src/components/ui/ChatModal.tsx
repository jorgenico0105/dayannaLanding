"use client";

import { useState, useEffect, useRef, memo, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  type: "bot" | "user";
  text: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: "bot",
    text: "¡Hola! 👋 Soy el asistente virtual de Dayanna. Estoy aquí para resolver tus dudas sobre psicología y bienestar emocional. ¿En qué puedo ayudarte?",
    timestamp: new Date(),
  },
];

function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, delay: 0.1, ease: "power2.out" }
      );

      setTimeout(() => inputRef.current?.focus(), 400);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleClose = useCallback(() => {
    if (modalRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.98,
        duration: 0.2,
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  }, [onClose]);

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      text: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Entiendo tu consulta. La ansiedad es una respuesta natural del cuerpo ante situaciones de estrés. Te recomiendo practicar técnicas de respiración profunda y, si persiste, agendar una consulta para un tratamiento personalizado.",
        "Gracias por compartir eso conmigo. El primer paso para el bienestar es reconocer que necesitas apoyo. Te invito a agendar una cita con Dayanna para explorar esto más a fondo.",
        "Es una pregunta muy válida. El autocuidado es fundamental para la salud mental. Algunas prácticas que puedo recomendarte son: mantener una rutina de sueño, hacer ejercicio regularmente y practicar mindfulness.",
        "Comprendo lo que describes. Estos sentimientos son más comunes de lo que crees. Te sugiero agendar una consulta para poder brindarte el apoyo profesional que mereces.",
      ];

      const botMessage: Message = {
        id: Date.now(),
        type: "bot",
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 1500 + Math.random() * 1000);
  }, [inputValue]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-dark/95 via-turquoise-deep/30 to-dark/95 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative w-full h-full md:w-[90%] md:h-[90%] md:max-w-4xl md:max-h-[800px] md:rounded-3xl overflow-hidden flex flex-col"
        style={{
          background: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-turquoise to-turquoise-dark flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h2 id="chat-modal-title" className="text-white font-semibold text-lg">
                Asistente Virtual
              </h2>
              <div className="flex items-center gap-2 text-turquoise text-sm">
                <span className="w-2 h-2 rounded-full bg-turquoise animate-pulse" />
                En línea
              </div>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Cerrar chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}
            >
              {message.type === "bot" && (
                <div className="w-8 h-8 rounded-xl bg-turquoise/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-turquoise text-xs font-bold">AI</span>
                </div>
              )}
              <div
                className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.type === "user"
                    ? "bg-gradient-to-br from-turquoise to-turquoise-dark text-white rounded-tr-sm"
                    : "bg-white/10 text-white/90 rounded-tl-sm"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <span className="text-xs opacity-50 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
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
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 md:px-6 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {["¿Qué es la ansiedad?", "Agendar cita", "Servicios disponibles"].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInputValue(suggestion)}
                className="flex-shrink-0 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-sm transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 md:p-6 pt-2 border-t border-white/10">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/40 focus:border-turquoise focus:ring-2 focus:ring-turquoise/20 outline-none transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-turquoise to-turquoise-dark flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-turquoise transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

          <p className="text-center text-white/30 text-xs mt-3">
            Este es un asistente de demostración. Para atención personalizada, agenda una consulta.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default memo(ChatModal);
