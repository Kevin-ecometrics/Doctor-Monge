import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Blogs.css";
import ReactGA from "../utils/GA";
function Blogs() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClicked = (e) => {
    e.preventDefault(); // ¡Clave! Detiene la navegación inmediata
    const link = e.currentTarget.href; // Guarda el href antes del async

    if (typeof ReactGA !== "undefined") {
      ReactGA.event({
        category: "button_click",
        action: "Click",
        label: "Leer tema", // Añade label para mejor tracking
      });
      console.log("Evento enviado ✅");

      // Retraso para asegurar el envío
      setTimeout(() => {
        window.location.href = link; // Navega después de 300ms
      }, 1000);
    } else {
      console.error("Error: ReactGA no cargado");
    }
  };

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
      img: "/El doctor Ricardo Monge inspecciona minuciosamente cada estudio para un diagnostico completo.webp",
      fecha: "Julio 2024",
      titulo:
        "Osteoporosis: Una condición silenciosa que afecta a la mitad de la población mayor de 50 años",
      texto:
        "Te platico sobre una condición en los huesos que, como ortopedista, sé que genera bastantes dudas y estrés a partir de los 50 años.",
      link: "/blogs/Osteoporosis-Una-condicion-silenciosa-que-afecta-a-la-mitad-de-la-poblacion-mayor",
    },
    {
      img: "/Realiza tus infiltraciones articulares con el Dr. Monge en Tijuana.webp",
      fecha: "Agosto 2024",
      titulo: "Infiltraciones en la Rodilla con Ácido Hialurónico",
      texto:
        "Hola que tal, el día de hoy te escribo acerca de las infiltraciones de rodilla con ácido hialurónico, los candidatos, consideraciones y expectativas. Quédate a leer el blog",
      link: "/blogs/Infiltraciones-en-la-rodilla-con-acido-hialuronico-para-tratamiento-de-artrosis-de-rodilla",
    },
    {
      img: "/Invierte en tu bienestar con un tratamiento adecuado para ti con el Dr. Monge.webp",
      fecha: "Septiembre 2024",
      titulo: "Tratamiento Conservador vs Cirugía",
      texto:
        "En este blog abordaremos de forma resumida lo más conveniente para tratar una hernia discal cervical, ¿Será un tratamiento conservador o la cirugía?",
      link: "/blogs/Tratamiento-conservador-vs-cirugia-Cuando-un-tratamiento-conservador-falla-y-requiere-intervencion-quirurgica-en-hernia-discal-cervical",
    },
    {
      img: "/El Dr. Ricardo Monge te invita a leer el blog donde explica que es la ostesintesis y como puede fallar.webp",
      fecha: "Octubre 2024",
      titulo: "Rechazo de Material en Osteosíntesis",
      texto:
        "¿Es cierto que tu cuerpo rechazo el material? En este blog te platico brevemente el fallo en la osteosíntesis en tu fractura.",
      link: "/blogs/Porque-se-dice-que-el-cuerpo-rechazo-de-material-Factores-asociados-al-fallo-en-la-osteosintesis-de-fracturas",
    },
    {
      img: "/El Hallux Valgus o Juanete puede  limitar tu movilidad el Dr monge te explica mas.webp",
      fecha: "Noviembre 2024",
      titulo:
        "Juanetes: Síntomas, detección y tipos de cirugía para eliminarlos",
      texto:
        "El padecimiento más común que a simple vista no se ve, te platico sobre el hallux valgus (Juanetes) Todo lo que debes saber sobre sus causas, tratamiento y mucho más.",
      link: "/blogs/Juanetes-sintomas-deteccion-y-tipos-de-cirugia-para-eliminarlos",
    },
    {
      img: "/El doctor Monge experto en infiltraciones te platica mas sobre ellas en este blog.webp",
      fecha: "Diciembre 2024",
      titulo:
        "Infiltraciones de Rodilla: Opciones y beneficios para la osteoartritis",
      texto:
        "El día de hoy platicamos sobre las opciones de infiltraciones para tratar de forma conservadora la osteoartritis como: la cortisona, Plasma rico en plaquetas y ácido hialurónico.",
      link: "/blogs/Infiltraciones-de-rodilla-Opciones-y-beneficios-para-la-osteoartritis",
    },
    {
      img: "/Visita el blog para conocer los detalles entre cada uno con el DR Ricardo Monge.webp",
      fecha: "Enero 2025",
      titulo: "Tendinitis y tendinosis: causas, diferencias y tratamiento ",
      texto:
        "Te comparto brevemente la diferencias entre tendinitis, la inflamación del tendón que si no es tratada se puede convertir en una tendinosis, da clic para continuar leyendo.",
      link: "/blogs/Tendinitis-y-tendinosis-causas-diferencias-y-tratamiento",
    },
    {
      img: "/Artritis y artrosis Conoce las diferencias con el traumatologo ortopedista Ricardo Monge.webp",
      fecha: "Febrero 2025",
      titulo:
        "¿Cómo Saber si es artritis o artrosis? Síntomas y  Diferencias Clave ",
      texto:
        "El DR. Ricardo Monge explica la diferencia clave de la artritis una enfermedad autoinmune y artrosis un padecimiento degenerativo articular.",
      link: "/blogs/Como-saber-si-es-artritis-o-artrosis",
    },
    {
      img: "/El DR Monge explica en su blog de forma breve todo sobre la lumbalgia.webp",
      fecha: "Febero 2025",
      titulo: "Lumbalgia: Tipos, Factores de Riesgo y Tratamientos",
      texto:
        "¿Tienes dolor de espalda? Hoy te invito a profundizar sobre la lumbalgia que afecta el 80% de la población. Causas, síntomas y tratamientos en mi blog.",
      link: "/blogs/lumbalgia-tipos-factores-de-riesgos-y-tratamientos",
    },
    {
      img: "/Fractura-Humero-Proximal-Adultos-Mayores-Cuidados-Terapias-Tiempo-Recuperacion-Dr-Ricardo-Monge.webp",
      fecha: "Marzo 2025",
      titulo: "Fractura de Humero proximal en adultos mayores",
      texto:
        "La fractura de húmero proximal es una lesión común en adultos mayores. En este blog te explico cómo se diagnostica y trata esta lesión.",
      link: "/blogs/fractura-de-humero-proximal-en-adultos-mayores",
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
                        className="text-white z-10 hover:text-blue-600 cursor-pointer"
                        href={item.link}
                        rel="noopener noreferrer"
                        onClick={handleClicked} // Handler aquí
                        role="button" // Accesibilidad
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
