import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    text: "Excelente atención y gran profesionalismo, toda explicación por parte del Doctor Ricardo es detallada y armónica para su comprensión",
    name: "Alan Cota",
    topic: "Hombro",
  },
  {
    text: "El Dr. Ricardo Monge, a quien visité por vez primera, revisó de forma muy amplia y detallada mi padecimiento, y con su explicación me quedó totalmente claro el tratamiento a seguir para mi recuperación. Excelente",
    name: "Leticia R",
    topic: "Columna ",
  },
  {
    text: "Bastante profesional, explica cada detalle de los procedimientos posibles y recomendó la mejor acción. Me he sentido de maravilla y quede muy agradecido con el Dr. Monge",
    name: "Francisco Pérez",
    topic: "Rodilla ",
  },
  {
    text: "Mi experiencia con el Dr. Monge fue muy buena, nos explicó perfectamente todo, apenas empiezo un tratamiento con él pero la atención fue excelente y el trato muy amable. ¡Lo recomiendo!",
    name: "Nelly Toledo",
    topic: "Rodilla ",
  },
  {
    text: "Excelente doctor, muy explícito en sus palabras , tanto profesional como humana, ambas cosas totalmente diferentes , certero y sabio en sus diagnósticos ,lo recomiendo ampliamente gracias doctor en lo personal por su enorme ayuda y ante todo paciencia a todas mis dudas con amabilidad que me las respondió al momento",
    name: "Alicia Garza Soltero",
    topic: "Cadera ",
  },
];

function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(1);

  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const ref = useRef(null);
  const isInView = useInView(ref);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (isInView) {
      setAnimationKey((prevKey) => prevKey + 1);
    }
  }, [isInView]);

  return (
    <main
      ref={ref}
      className="flex justify-center items-center lg:h-screen py-16 lg:py-0"
      style={{
        overflow: "hidden", // Asegura que el contenido animado no desborde
      }}
    >
      <motion.div
        key={animationKey} // Usa la clave que cambia para forzar la reanimación
        initial={{ scale: 1.25 }} // Inicia con el fondo escalado al 125%
        animate={{ scale: 1 }} // Anima la escala al 100% cuando está en vista
        transition={{ duration: 5, ease: "easeOut" }}
        style={{
          backgroundImage:
            "url('/Bienvenido a tu tratamiento a la medida con expertos en traumatologia.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          zIndex: -1, // Asegura que el fondo esté detrás del contenido
          position: "absolute", // Asegura que el fondo no afecte el scroll
        }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 px-8 lg:w-[80%] lg:mx-auto gap-16">
        <div>
          <svg
            width="78"
            height="70"
            viewBox="0 0 78 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.5988 69.3H0.59883V32.1C0.59883 22.1 2.59883 14.5 6.59883 9.29999C10.9988 3.89999 18.3988 0.799984 28.7988 -1.78814e-05V17.7C25.1988 17.7 22.1988 19.2 19.7988 22.2C18.5988 23.8 17.9988 26.9 17.9988 31.5V37.2H30.5988V69.3ZM77.3988 69.3H47.3988V32.1C47.3988 22.1 49.1988 14.8 52.7988 10.2C57.5988 4.19999 65.1988 0.799984 75.5988 -1.78814e-05V17.7C69.3988 17.7 65.8988 20.8 65.0988 27C64.8988 27.8 64.7988 29.3 64.7988 31.5V37.2H77.3988V69.3Z"
              fill="#005692"
            />
          </svg>

          <h1 className="font-semibold text-[29px] lg:text-[42px] py-4 lg:py-16">
            Encontramos el mejor tratamiento ortopedista para cada paciente en
            Tijuana
          </h1>
        </div>
        <div>
          <section className="flex justify-center items-center flex-col">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={currentTestimonial === index ? "visible" : "exit"}
                variants={variants}
                transition={{ duration: 0.5 }}
                className={currentTestimonial === index ? "block" : "hidden"}
              >
                <h2 className="mb-8 font-normal text-[22px] text-[#ACACAD]">
                  {testimonial.text}
                </h2>
                <h3 className="mb-8 font-normal text-[24px]">
                  {testimonial.name}
                </h3>
                <h3 className="font-medium text-[22px] text-[#D9D9D9] mb-16">
                  {testimonial.topic}
                </h3>
              </motion.div>
            ))}
          </section>

          <div className="flex justify-start items-center gap-4 lg:mb-0 mb-40 ">
            <button
              className="border border-white px-4 py-2 hover:bg-blue-500 hover:text-[#000] transition-all duration-300"
              onClick={() =>
                setCurrentTestimonial(
                  (currentTestimonial - 1 + testimonials.length) %
                    testimonials.length
                )
              }
            >
              <svg
                width="27"
                height="31"
                viewBox="0 0 31 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Previous Slide"
              >
                <path
                  d="M28.2861 54.6339L2.41885 28.1918L28.861 2.32457"
                  stroke="#969596"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              className="border border-white px-4 py-2 hover:bg-blue-500 hover:text-[#000] transition-all duration-300"
              onClick={() =>
                setCurrentTestimonial(
                  (currentTestimonial + 1) % testimonials.length
                )
              }
            >
              <svg
                width="27"
                height="31"
                viewBox="0 0 31 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Next Slide"
              >
                <path
                  d="M2.42188 2L28.5781 28.1562L2.42188 54.3125"
                  stroke="#969596"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Testimonials;
