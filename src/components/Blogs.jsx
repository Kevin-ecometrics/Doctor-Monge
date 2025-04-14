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
        "Todo lo que debes saber sobre las fracturas de tibia y peroné unas de las más complejas e interesantes atendidas en la traumatología. En este blog nos gustaría que nos acompañes a identificar porque son tan únicas en cada paciente",
      link: "/blogs/Fractura-de-tibia-y-Perone",
    },
    {
      img: "/Todo lo que debes saber sobre una de las lesiones mas comunes en ortopedia.png",
      fecha: "Mayo 2024",
      titulo: "Pseudoartrosis y retraso de consolidación ósea",
      texto:
        "En este blog abordaremos junto con el Dr. Ricardo Monge Experto Ortopedia por qué unas fracturas tardan en sanar o no sanan completamente.",
      link: "/blogs/Pseudoartrosis-y-Retraso-de-Consolidacion",
    },
    {
      img: "/Si sufres de dolor en hueso o articulaciones a acude con tu medico ortopedista para una valoracion.png",
      fecha: "Junio 2024",
      titulo: "Lesión de Ligamento Cruzado Anterior",
      texto:
        " Descubre en este blog todas las causas que hacen a las mujeres más propensas a lesiones por LCA y como gracias a la artroscopia un procedimiento ortopédico mínimo invasivo pueden reincorporarse sin complicaciones a su vida diaria",
      link: "/blogs/Lesion-de-Ligamento-Cruzado-Anterior",
    },
    {
      img: "/El doctor Ricardo Monge inspecciona minuciosamente cada estudio para un diagnostico completo.webp",
      fecha: "Julio 2024",
      titulo:
        "Osteoporosis: Una condición silenciosa que afecta a la mitad de la población mayor de 50 años",
      texto:
        "El Dr. Ricardo Monge traumatólogo ortopedista en Tijuana explica lo que debes saber sobre la osteoporosis una afección en los huesos cuyos síntomas no suelen percibirse en las primeras etapas",
      link: "/blogs/Osteoporosis-Una-condicion-silenciosa-que-afecta-a-la-mitad-de-la-poblacion-mayor",
    },
    {
      img: "/Realiza tus infiltraciones articulares con el Dr. Monge en Tijuana.webp",
      fecha: "Agosto 2024",
      titulo:
        "Infiltraciones con ácido hialurónico para tratamiento de artrosis de rodilla",
      texto:
        "¿Te han recomendado infiltraciones con ácido hialurónico? Profundiza con el Dr. experto en infiltraciones sobre este procedimiento conservador en ortopedia que ha demostrado ser muy eficaz. ",
      link: "/blogs/Infiltraciones-en-la-rodilla-con-acido-hialuronico-para-tratamiento-de-artrosis-de-rodilla",
    },
    {
      img: "/Invierte en tu bienestar con un tratamiento adecuado para ti con el Dr. Monge.webp",
      fecha: "Septiembre 2024",
      titulo: "Tratamiento conservador vs cirugía en hernia discal ",
      texto:
        "En este blog el Dr. Ricardo Monge traumatólogo ortopedista especializado en lesiones y cirugía platicará sobre las diferencias entre un tratamiento conservador y una cirugía ortopédica de hernia discal cervical y como saber cuál es la mejor opción para ti ",
      link: "/blogs/Tratamiento-conservador-vs-cirugia-Cuando-un-tratamiento-conservador-falla-y-requiere-intervencion-quirurgica-en-hernia-discal-cervical",
    },
    {
      img: "/El Dr. Ricardo Monge te invita a leer el blog donde explica que es la ostesintesis y como puede fallar.webp",
      fecha: "Octubre 2024",
      titulo: "Rechazo de Material en Osteosíntesis",
      texto:
        "Es cierto que tu cuerpo rechazó el material? En este blog el Dr. Monge traumatólogo ortopedista te platica todo sobre el rechazo de material en osteosíntesis y como detectarlo a tiempo para evitar complicaciones.",
      link: "/blogs/Porque-se-dice-que-el-cuerpo-rechazo-de-material-Factores-asociados-al-fallo-en-la-osteosintesis-de-fracturas",
    },
    {
      img: "/El Hallux Valgus o Juanete puede  limitar tu movilidad el Dr monge te explica mas.webp",
      fecha: "Noviembre 2024",
      titulo:
        "Hallux valgus un padecimiento que afecta a hasta el 35% de la población ",
      texto:
        "Te invitamos a conocer las causas de la mano del Dr. Ricardo Monge traumatólogo experto que te explicará las causas por las que los juanetes aparecen y como se lleva a cabo su diagnóstico y cirugía. ",
      link: "/blogs/Juanetes-sintomas-deteccion-y-tipos-de-cirugia-para-eliminarlos",
    },
    {
      img: "/El doctor Monge experto en infiltraciones te platica mas sobre ellas en este blog.webp",
      fecha: "Diciembre 2024",
      titulo:
        "Infiltraciones de rodilla: Opciones y beneficios para la osteoartritis",
      texto:
        "En este blog abordaremos las opciones de tratamientos ortopédicos conservadores para tratar la osteoartritis como las infiltraciones de: Corticoides, plasma rico en plaquetas y ácido hialurónico. ",
      link: "/blogs/Infiltraciones-de-rodilla-Opciones-y-beneficios-para-la-osteoartritis",
    },
    {
      img: "/Visita el blog para conocer los detalles entre cada uno con el DR Ricardo Monge.webp",
      fecha: "Enero 2025",
      titulo: "Tendinitis y tendinosis: Causas diferencias y tratamientos  ",
      texto:
        "El Dr. Ricardo Monge, especialista en traumatología y ortopedia, te aclara las diferencias entre la tendinitis, que es la inflamación del tendón, y la tendinosis, que es la complicación que surge cuando no se trata a tiempo. ",
      link: "/blogs/Tendinitis-y-tendinosis-causas-diferencias-y-tratamiento",
    },
    {
      img: "/Artritis y artrosis Conoce las diferencias con el traumatologo ortopedista Ricardo Monge.webp",
      fecha: "Febrero 2025",
      titulo:
        "¿Cómo saber si es artritis o artrosis? Síntomas y Diferencias Clave  ",
      texto:
        "El Dr. Ricardo Monge explica la diferencia clave de la artritis una enfermedad autoinmune y artrosis un padecimiento degenerativo articular. ",
      link: "/blogs/Como-saber-si-es-artritis-o-artrosis",
    },
    {
      img: "/El DR Monge explica en su blog de forma breve todo sobre la lumbalgia.webp",
      fecha: "Febero 2025",
      titulo: "Lumbalgia: Tipos, Factores de Riesgo y Tratamientos ",
      texto:
        "¿Sufres de dolor de espalda? El Dr. Ricardo Monge, especialista en ortopedia, analiza en detalle esta condición que impacta al 80% de las personas. Descubre las causas, los síntomas más comunes y los tratamientos ortopédicos disponibles para aliviar esta molestia. ",
      link: "/blogs/lumbalgia-tipos-factores-de-riesgos-y-tratamientos",
    },
    {
      img: "/Fractura-Humero-Proximal-Adultos-Mayores-Cuidados-Terapias-Tiempo-Recuperacion-Dr-Ricardo-Monge.webp",
      fecha: "Marzo 2025",
      titulo: "Fractura de humero proximal en adultos mayores ",
      texto:
        "Acompaña al Dr. Ricardo Monge mientras explica cómo disminuir el riesgo de fracturas en adultos mayores con hábitos saludables, ajustes en el hogar para evitar caídas, ejercicios recomendados y el tiempo de rehabilitación necesario. ",
      link: "/blogs/fractura-de-humero-proximal-en-adultos-mayores",
    },
    {
      img: "/cardblog14.webp",
      fecha: "Marzo 2025",
      titulo:
        "¿Es necesaria una segunda cirugía ortopédica por pseudoartrosis? ",
      texto:
        "¿Qué hacer si tu hueso no logra consolidarse? La pseudoartrosis ocurre y se forma una falsa articulación. Te invitamos a leer el blog del cirujano traumatólogo ortopedista Ricardo Monge para conocer más detalles. ",
      link: "/blogs/Es-necesaria-una-segunda-cirugia-para-tratar-la-pseudoartrosis",
    },
    {
      img: "/cardblog15.webp",
      fecha: "Abril 2025",
      titulo:
        "¿El dolor persiste pero la radiografía dice que todo está bien? Podrías estar frente a una fractura oculta.",
      texto:
        "Acompaña al Dr. Ricardo Monge y descubre cómo se originan estas lesiones invisibles y qué métodos existen para detectarlas a tiempo.",
      link: "/blogs/fracturas-ocultas-diagnostico-tijuana",
    },
    // {
    //   img: "/cardblog15.webp",
    //   fecha: "Abril 2025",
    //   titulo:
    //     "¿Dolor de Rodilla? Artroscopia para tratar el desgaste articular ",
    //   texto:
    //     "El Dr. Ricardo Monge, experto en artroscopia de rodilla en Tijuana, responde tus dudas sobre la cirugía de mínima invasión con máximos resultados. ",
    //   link: "/blogs/dolor-de-rodilla-artroscopia-para-tratar-el-desgaste-articular",
    // },
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
          className="hidden md:block absolute left-4 md:left-32 top-1/2 transform -translate-y-1/2 px-4 py-2 z-50 text-white rounded"
        >
          <svg
            width="31"
            height="57"
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
        <div className="text-start">
          <h1 className="font-medium text-[42px] mb-16 px-8">
            Conoce más sobre ortopedia y traumatología en mis blogs{" "}
          </h1>
          <div className="flex flex-col md:flex-row justify-center gap-8 md:mb-0 mb-16">
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
                  <h2 className="text-hover-blue font-bold absolute inset-0 flex items-start px-4 py-12 justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                    <a
                      className="text-white z-10 hover:text-blue-600"
                      href={item.link}
                      rel="noopener noreferrer"
                    >
                      {item.titulo}
                    </a>{" "}
                  </h2>
                  <h3 className="absolute inset-0 flex items-center text-start p-4 justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {item.texto}
                  </h3>
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
          className="hidden md:block absolute right-4 md:right-32 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white rounded z-50"
        >
          <svg
            width="31"
            height="57"
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

        <div className="md:hidden block absolute bottom-24">
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white rounded"
          >
            <svg
              width="31"
              height="57"
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
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white rounded"
          >
            <svg
              width="31"
              height="57"
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
        </div>
      </main>
      <div className="md:hidden block h-24"></div>
    </div>
  );
}

export default Blogs;
