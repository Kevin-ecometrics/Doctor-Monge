import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Blogs.css";

function Blogs() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const blogItem = [
    {
      img: "/Cuando tienes una lesion que no mejora acude con el Dr Monge experto en lesiones musculoesqueleticas.png",
      fecha: "Abril 2024",
      titulo: "Fractura de Tibia y Peroné",
      texto:
        "Todo lo que debes saber sobre las fracturas de tibia y peroné, unas de las lesiones más complejas e interesantes atendidas en la traumatología. En este blog nos gustaría que nos acompañes a identificar por qué son tan únicas en cada paciente.",
      link: "/blogs/Fractura-de-tibia-y-Perone",
    },
    {
      img: "/Todo lo que debes saber sobre una de las lesiones mas comunes en ortopedia.png",
      fecha: "Mayo 2024",
      titulo: "Pseudoartrosis y retraso de consolidación óse",
      texto:
        "Seguramente conoces a alguien que está, o tú estás, en una situación complicada con la sanación de una fractura. En este blog abordaremos por qué algunas fracturas tardan en sanar o no sanan completamente.",
      link: "/blogs/Pseudoartrosis-y-Retraso-de-Consolidacion",
    },
    {
      img: "/Si sufres de dolor en hueso o articulaciones a acude con tu medico ortopedista para una valoracion.png",
      fecha: "Junio 2024",
      titulo: "Lesión de Ligamento Cruzado Anterior",
      texto:
        "Descubre en este blog todas las causas que hacen a las mujeres más propensas a lesiones de LCA y cómo, gracias a la artroscopia, pueden reincorporarse sin complicaciones a su vida diaria.",
      link: "/blogs/Lesion-de-Ligamento-Cruzado-Anterior",
    },
    {
      img: "/4.Card.webp",
      fecha: "Julio 2024",
      titulo:
        "Osteoporosis: Una condición silenciosa que afecta a la mitad de la población mayor de 50 años",
      texto:
        "Te platico sobre una condición en los huesos que, como ortopedista, sé que genera bastantes dudas y estrés a partir de los 50 años.",
      link: "/blogs/Osteoporosis-Una-condicion-silenciosa-que-afecta-a-la-mitad-de-la-poblacion-mayor",
    },
    {
      img: "/5.Card.webp",
      fecha: "Agosto 2024",
      titulo: "Infiltraciones en la Rodilla con Ácido Hialurónico",
      texto:
        "¿Te han recomendado infiltraciones en la rodilla con ácido hialurónico? En este blog te platicaré sobre este procedimiento conservador que ha demostrado ser muy eficaz.",
      link: "/blogs/Infiltraciones-en-la-rodilla-con-acido-hialuronico-para-tratamiento-de-artrosis-de-rodilla",
    },
    {
      img: "/6.Card.webp",
      fecha: "Septiembre 2024",
      titulo: "Tratamiento Conservador vs Cirugía",
      texto:
        "En este blog te platicaré sobre las diferencias entre un tratamiento conservador y una cirugía, y cómo saber cuál es el mejor para ti.",
      link: "/blogs/Tratamiento-conservador-vs-cirugia-Cuando-un-tratamiento-conservador-falla-y-requiere-intervencion-quirurgica-en-hernia-discal-cervical",
    },
    {
      img: "/7.Card.webp",
      fecha: "Octubre 2024",
      titulo: "Rechazo de Material en Osteosíntesis",
      texto:
        "En este blog te platicaré sobre el rechazo de material en osteosíntesis y cómo detectarlo a tiempo para evitar complicaciones.",
      link: "/blogs/Porque-se-dice-que-el-cuerpo-rechazo-de-material-Factores-asociados-al-fallo-en-la-osteosintesis-de-fracturas",
    },
    {
      img: "/8.Card.webp",
      fecha: "Noviembre 2024",
      titulo:
        "Juanetes: Síntomas, detección y tipos de cirugía para eliminarlos",
      texto:
        "En este blog te platicaré sobre los juanetes, cómo detectarlos y los tipos de cirugía que existen para eliminarlos.",
      link: "/blogs/Juanetes-sintomas-deteccion-y-tipos-de-cirugia-para-eliminarlos",
    },
    {
      img: "/9.Card.webp",
      fecha: "Diciembre 2024",
      titulo:
        "Infiltraciones de Rodilla: Opciones y beneficios para la osteoartritis",
      texto:
        "En este blog te platicaré sobre las infiltraciones de rodilla, sus opciones y beneficios para la osteoartritis.",
      link: "/blogs/Infiltraciones-de-rodilla-Opciones-y-beneficios-para-la-osteoartritis",
    },
    {
      img: "/9.Card.webp",
      fecha: "Enero 2025",
      titulo: "Tendinitis y tendinosis: causas, diferencias y tratamiento ",
      texto:
        "En este blog te platicaré sobre la tendinitis y la tendinosis, sus causas, diferencias y tratamiento.",
      link: "/blogs/Tendinitis-y-tendinosis-causas-diferencias-y-tratamiento",
    },
  ];

  const reversedBlogItem = [...blogItem].reverse();

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % blogItem.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + blogItem.length) % blogItem.length
    );
  };

  const displayedItems = [
    reversedBlogItem[currentIndex],
    reversedBlogItem[(currentIndex + 1) % blogItem.length],
    reversedBlogItem[(currentIndex + 2) % blogItem.length],
  ];

  return (
    <div>
      <main className="flex justify-center items-center py-24 md:py-24 md:h-screen relative">
        <button
          onClick={handlePrev}
          className="hidden md:block absolute left-4 md:left-36 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l6 6" />
            <path d="M5 12l6 -6" />
          </svg>
        </button>
        <div className="text-start">
          <h1 className="font-medium text-[42px] mb-16 px-8">
            Conoce más sobre Ortopedia y Traumatología
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:mb-0 mb-16">
            <AnimatePresence mode="popLayout">
              {displayedItems.map((item, index) => (
                <motion.div
                  className={`relative group ${
                    index > 0 ? "hidden md:block" : ""
                  }`}
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={item.img}
                    alt=""
                    className="transition-opacity duration-200 group-hover:opacity-50"
                  />
                  <p className="absolute inset-0 flex items-start p-4 justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {item.fecha}
                  </p>
                  <p className="text-hover-blue font-bold absolute inset-0 flex items-start px-4 py-16 justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                    <a
                      className="text-white z-10 hover:text-blue-600"
                      href={item.link}
                      rel="noopener noreferrer"
                    >
                      {item.titulo}
                    </a>{" "}
                  </p>
                  <p className="absolute inset-0 flex items-center text-start p-4 justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {item.texto}
                  </p>
                  <div className="items-center gap-2 group">
                    <p className="absolute inset-0 flex items-end p-4 justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <a
                        className="text-white z-10 hover:text-blue-600"
                        href={item.link}
                        rel="noopener noreferrer"
                      >
                        Leer tema
                      </a>
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        c
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M5 12l14 0"></path>
                        <path d="M15 16l4 -4"></path>
                        <path d="M15 8l4 4"></path>
                      </svg> */}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <button
          onClick={handleNext}
          className="hidden md:block absolute right-4 md:right-36 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M13 18l6 -6" />
            <path d="M13 6l6 6" />
          </svg>
        </button>

        <div className="md:hidden block absolute bottom-24">
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M13 18l6 -6" />
              <path d="M13 6l6 6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M5 12l6 6" />
              <path d="M5 12l6 -6" />
            </svg>
          </button>
        </div>
      </main>
      <div className="md:hidden block h-24"></div>
    </div>
  );
}

export default Blogs;
