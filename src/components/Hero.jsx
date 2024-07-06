import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
function Hero() {
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
        className="px-16 py-28 md:py-0 md:h-screen"
        style={{
          backgroundImage: "url('/background.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex justify-center items-start h-screen flex-col md:px-16">
          <section ref={ref} className="z-10">
            <img
              src="/El doctor  Ricardo Monge es ortopedista especialista en rodilla cadera y espalda.png"
              alt="El doctor Ricardo Monge es especialista en ortopedia y traumatología especializado en lesiones musculo esqueléticas de rodilla, cadera y espalda"
              className="mb-8"
            />
            <h2 className="mb-8 font-semibold md:w-[500px] text-[18px] text-[#969596]">
              Soy especialista en reemplazo de cadera, rodilla, artroscopia de
              hombro y rodilla y cirugía de columna con base en Tijuana B.C.
            </h2>
            <h3 className="mb-4 font-semibold md:w-[500px] text-[18px] text-[#969596]">
              Me interesa conocer tu caso y acompañarte a comprender tu
              enfermedad o lesión y comenzar juntos con el tratamiento ideal
              para ti
            </h3>
            <h3 className="mb-4 font-semibold md:w-[500px] text-[22px] text-[#969596]">
              ¿Estas Listo?
            </h3>
          </section>
          <div className="w-[400px] h-[400px] md:h-screen md:w-full md:absolute md:translate-x-4 translate-x-[-40px] top-[-150px]">
            <motion.img
              key={animationKey} // Paso 3: Usa el estado como key para reiniciar la animación
              src="/hero.webp"
              style={{
                maskImage: "linear-gradient(to bottom, black 60%, transparent)",
              }}
              initial={{ scale: 1.25 }} // Estado inicial de la animación
              animate={{ scale: 1 }} // Estado final de la animación
              transition={{ duration: 1.5 }} // Configuración de la transición
            />
          </div>
        </div>

        <div className="md:block hidden">
          <div className="bottom-10 text-md px-1 fixed">
            <h1>© Doctor Monge. 2024</h1>
          </div>
          <div className="fixed bottom-10 right-16 text-md flex gap-6 cursor-pointer">
            <h1 className="hover:text-blue-500">ENG</h1>
            <h1 className="hover:text-blue-500">ESP</h1>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Hero;
