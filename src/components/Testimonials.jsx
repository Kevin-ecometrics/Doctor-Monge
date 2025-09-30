import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials_es = [
  {
    text: "Excelente atención y gran profesionalismo, toda explicación por parte del Doctor Ricardo Romero es detallada y armónica para su comprensión en traumatología y ortopedia. ",
    name: "Alan Cota",
    topic: "Padecimiento de Hombro",
  },
  {
    text: " El Dr. Ricardo Monge a quien visité por vez primera en Tijuana me revisó de forma muy amplia y detallada mi padecimiento, y con su explicación me quedó totalmente claro el tratamiento a seguir para mi recuperación. Excelente atención",
    name: "Leticia R",
    topic: "Lesiones de Columna  ",
  },
  {
    text: "El Doctor fue bastante profesional, explica cada detalle de los procedimientos posibles y me recomendó la mejor acción. Me he sentido de maravilla y quede muy agradecido con el Dr. Monge ",
    name: "Felipe Pérez",
    topic: "Ortopedia en Rodillas",
  },
  {
    text: "Mi experiencia con el Dr. Monge en Tijuana fue muy buena, nos explicó perfectamente todo, apenas empiezo un tratamiento ortopédico con él, la atención fue excelente y el trato muy amable. ¡¡Lo recomiendo!! ",
    name: "Nelly Toledo",
    topic: "Lesiones de Rodilla ",
  },
  {
    text: "Excelente doctor, muy explícito en sus palabras, tanto profesional como humana, ambas cosas totalmente diferentes, certero y sabio en sus diagnósticos, lo recomiendo ampliamente en Tijuana, gracias doctor en lo personal por su enorme ayuda y ante todo paciencia a todas mis dudas con amabilidad que me las respondió al momento. ",
    name: "Alicia Garza Soltero",
    topic: "Cirugía de Cadera ",
  },
];

const testimonials_en = [
  {
    text: "Excellent attention and great professionalism, Dr. Ricardo Romero provides detailed and clear explanations for understanding traumatology and orthopedics.",
    name: "Alan Cota",
    topic: "Shoulder Condition",
  },
  {
    text: "Dr. Ricardo Monge, whom I visited for the first time in Tijuana, examined my condition very thoroughly and explained everything clearly about the treatment needed for my recovery. Excellent care.",
    name: "Leticia R",
    topic: "Spinal Injuries",
  },
  {
    text: "The doctor was very professional, explained every detail of possible procedures and recommended the best course of action. I felt wonderful and was very grateful to Dr. Monge.",
    name: "Felipe Pérez",
    topic: "Knee Orthopedics",
  },
  {
    text: "My experience with Dr. Monge in Tijuana was excellent. He explained everything perfectly. I'm just starting orthopedic treatment with him - the attention was outstanding and the treatment very kind. I recommend him!",
    name: "Nelly Toledo",
    topic: "Knee Injuries",
  },
  {
    text: "Excellent doctor, very clear in his explanations, both professional and humane. Accurate and wise in his diagnoses. I highly recommend him in Tijuana. Thank you doctor personally for your enormous help and above all, patience with all my questions which you answered kindly immediately.",
    name: "Alicia Garza Soltero",
    topic: "Hip Surgery",
  },
];

function Testimonials({ URL }) {
  const [currentTestimonial, setCurrentTestimonial] = useState(1);
  const testimonials = URL ? testimonials_en : testimonials_es;

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
        overflow: "hidden",
      }}
    >
      <motion.div
        key={animationKey}
        initial={{ scale: 1.25 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5, ease: "easeOut" }}
        style={{
          backgroundImage:
            "url('/Bienvenido-a-tu-tratamiento-a-la-medida-con-expertos-en-traumatologia.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          zIndex: -1,
          position: "absolute",
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

          <h1 className="font-semibold text-[30px] lg:text-[42px] py-4 lg:py-16">
            {URL
              ? "We find the perfect orthopedic treatment to relieve each patient in Tijuana"
              : "Encontramos el tratamiento ortopedista perfecto para aliviar a cada paciente en Tijuana"}
          </h1>
        </div>
        <div>
          <section className="flex justify-center items-center flex-col">
            {(URL ? testimonials_en : testimonials_es).map(
              (testimonial, index) => (
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
                  <h2 className="mb-8 font-normal text-[24px]">
                    {testimonial.name}
                  </h2>
                  <h2 className="font-medium text-[22px] text-[#D9D9D9] mb-16">
                    {testimonial.topic}
                  </h2>
                </motion.div>
              )
            )}
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
