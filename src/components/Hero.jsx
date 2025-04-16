import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

function Hero({ URL }) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (isInView) {
      setAnimationKey((prevKey) => prevKey + 1);
    }
  }, [isInView]);

  return (
    <div className="h-full">
      <main
        className="px-16 py-28 lg:py-0 lg:h-screen"
        style={{
          backgroundImage: "url('/background.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex justify-center items-start lg:h-screen flex-col lg:px-16">
          <section ref={ref} className="z-10">
            <img
              src="/El_doctor_Ricardo_Monge_es_ortopedista_especialista_en_rodilla_cadera_y_espalda.webp"
              alt={
                URL
                  ? "Dr. Ricardo Monge is an orthopedic specialist in knee, hip and back conditions"
                  : "El doctor Ricardo Monge es especialista en ortopedia y traumatología especializado en lesiones musculo esqueléticas de rodilla, cadera y espalda"
              }
              width={500}
              height={500}
              className="mb-8"
            />
            <div>
              <h1 className="mb-8 font-semibold lg:w-[500px] text-[18px] text-[#969596] hidden lg:block">
                {URL
                  ? "I am an orthopedic traumatologist, specialist in joint injuries, hip and knee replacement, shoulder pathologies and spine surgery in Tijuana B.C."
                  : "Soy traumatólogo ortopedista, especialista en lesiones articulares, reemplazo de cadera, rodilla, patologías de hombro y cirugía de columna en Tijuana B.C."}
              </h1>
            </div>
          </section>

          <div className="w-[400px] h-[400px] lg:h-screen lg:w-full lg:absolute lg:translate-x-4 translate-x-[-40px] top-[-150px] hidden lg:block">
            <motion.img
              key={animationKey}
              src="/hero.webp"
              style={{
                maskImage: "linear-gradient(to bottom, black 60%, transparent)",
              }}
              initial={{ scale: 1.25 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              alt={
                URL
                  ? "Dr. Ricardo Monge is an orthopedic specialist in knee, hip and back conditions"
                  : "El doctor Ricardo Monge es especialista en ortopedia y traumatología especializado en lesiones musculo esqueléticas de rodilla, cadera y espalda"
              }
            />
          </div>

          <div className="block lg:hidden">
            <motion.img
              key={animationKey}
              style={{
                maskImage: "linear-gradient(to bottom, black 60%, transparent)",
              }}
              initial={{ scale: 1.25 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src="/herom.webp"
              alt={
                URL
                  ? "Dr. Ricardo Monge is an orthopedic specialist in knee, hip and back conditions"
                  : "El doctor Ricardo Monge es especialista en ortopedia y traumatología especializado en lesiones musculo esqueléticas de rodilla, cadera y espalda"
              }
            />
            <h1 className="mb-8 font-semibold lg:w-[500px] md:text-[28px] lg:text-[18px] text-[#969596]">
              {URL
                ? "I am an orthopedic traumatologist, specialist in joint injuries, hip and knee replacement, shoulder pathologies and spine surgery in Tijuana B.C."
                : "Soy traumatólogo ortopedista, especialista en lesiones articulares, reemplazo de cadera, rodilla, patologías de hombro y cirugía de columna en Tijuana B.C."}
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Hero;
