import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { sendGAEvent } from "../utils/sendGAEvent";

function Appointment({ URL }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const content_es = {
    title: "Agenda tu Consulta",
    features: [
      {
        icon: FaCalendarAlt,
        text: "Elige fecha y hora disponible",
        subtitle: "Horarios flexibles",
      },
      {
        icon: FaCheckCircle,
        text: "Completa tus datos personales",
        subtitle: "Información segura y confidencial",
      },
      {
        icon: FaClock,
        text: "Confirmación instantánea",
        subtitle: "Recibe tu cita por correo electrónico",
      },
    ],
    cta: "Agendar Ahora",
    link: "/cita/",
  };

  const content_en = {
    title: "Schedule Your Consultation",
    features: [
      {
        icon: FaCalendarAlt,
        text: "Choose your preferred time",
        subtitle: "Flexible hours from",
      },
      {
        icon: FaCheckCircle,
        text: "Complete your information",
        subtitle: "Secure and confidential data",
      },
      {
        icon: FaClock,
        text: "Instant confirmation",
        subtitle: "Get your appointment via email",
      },
    ],
    cta: "Book Now",
    link: "/en/appointment/",
  };

  const content = URL ? content_en : content_es;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    const slideInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % content.features.length);
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearInterval(slideInterval);
    };
  }, [content.features.length]);

  const handleClick = () => {
    // Enviar evento GA solo al hacer click en el botón
    sendGAEvent({
      eventName: "appointment_click",
      category: "Appointment",
      label: content.cta,
      value: 1,
    });

    window.location.href = content.link;
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center overflow-hidden relative py-12">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700"
        style={{
          backgroundImage:
            "url('/Agenda cita con el doctor monge especialista traumatologia y ortopedia en tijuana.webp')",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div
        className={`relative z-10 text-center px-4 sm:px-6 w-full max-w-7xl transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-8 md:mb-12 tracking-tight leading-tight px-4">
          {content.title}
        </h1>

        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative inline-flex items-center gap-3 text-white px-10 sm:px-14 py-5 sm:py-7 rounded-full text-xl sm:text-2xl font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 mb-12 md:mb-16 overflow-hidden"
          style={{ backgroundColor: "#005692" }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10">{content.cta}</span>
          <FaArrowRight className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-2 transition-transform duration-300" />
          <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 group-hover:scale-150 transition-all duration-500"></span>
        </button>

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-4 sm:gap-6 mb-10 max-w-6xl mx-auto px-4">
          {content.features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                className={`flex-1 flex flex-col items-center text-white transition-all duration-500 ease-out p-6 sm:p-8 rounded-3xl cursor-pointer backdrop-blur-sm ${
                  isActive
                    ? "scale-100 sm:scale-105 opacity-100 bg-blue-600/30 border-2 border-blue-400 shadow-lg shadow-blue-500/30"
                    : "scale-95 opacity-80 bg-gray-900/30 border-2 border-gray-700/50 hover:scale-100 hover:opacity-90 hover:border-gray-600"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div
                  className={`relative p-4 sm:p-5 rounded-full transition-all duration-500 mb-5 ${
                    isActive
                      ? "bg-blue-600 shadow-xl shadow-blue-500/50 scale-110"
                      : "bg-gray-700/60 scale-100"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-60"></div>
                  )}
                  <Icon className="relative w-7 h-7 sm:w-9 sm:h-9 transition-transform duration-300" />
                </div>

                <h3
                  className={`text-lg sm:text-xl font-bold mb-3 transition-all duration-300 ${
                    isActive ? "text-white" : "text-gray-300"
                  }`}
                >
                  {feature.text}
                </h3>

                <p
                  className={`text-xs sm:text-sm transition-all duration-300 ${
                    isActive ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {feature.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {content.features.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 cursor-pointer hover:scale-125 ${
                activeIndex === i
                  ? "bg-blue-500 w-10 sm:w-12"
                  : "bg-gray-600 w-2 sm:w-2.5"
              }`}
              aria-label={`Go to step ${i + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Appointment;
