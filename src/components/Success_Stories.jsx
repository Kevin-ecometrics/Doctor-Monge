import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SuccessStories = ({ URL }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isActive, setIsActive] = useState(false); // Estado para controlar la activación de la animación
  const sectionRef = useRef(null); // Ref para la sección a observar

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true); // Activa la animación cuando la sección entra en el viewport
        }
      },
      {
        root: null, // null significa que el viewport es el contenedor de referencia
        rootMargin: "0px",
        threshold: 0.1, // Se activa cuando el 10% de la sección es visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Observa la sección referenciada
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Limpia el observer al desmontar el componente
      }
    };
  }, []);

  const content_es = [
    {
      title: "Prótesis total de",
      title2: "rodilla",
      subtitle:
        "Los resultados de esta cirugía tienen una de las tasas de éxito más altas, es normal sentirte con angustia previo a este procedimiento ortopédico por lo que en este videoblog te explico como traumatólogo especialista en rodilla todo lo que debes saber.",
      background: "/Protesis%20total%20de%20cadera%20en%20Tijuana.png",
      link: "/procedimientos/protesis-total-de-rodilla",
    },
    {
      title: "Prótesis total de",
      title2: "cadera",
      subtitle:
        "En este videoblog profundizaremos en una de las cirugías en traumatología más realizadas mundialmente con poco más de 1 millón de pacientes cada año. Te explico en que consiste y quienes son candidatos.",
      background: "/Hernia%20discal%20cervical%20cirugia%20en%20Tijuana.png",
      link: "/procedimientos/protesis-total-de-cadera",
    },
    {
      title: "Hernia de",
      title2: "disco lumbar",
      subtitle:
        "¿Sabías que la radiculopatía por hernia en disco lumbar es una de las principales causas de discapacidad ortopédica en todo el mundo? Me gustaría hablar sobre la intervención quirúrgica, una práctica en traumatología donde se realiza una descompresión de la raíz nerviosa afectada.",
      background:
        "/protesis%20total%20de%20rodilla%20en%20Tijuana%20consulta.png",
      link: "/procedimientos/hernia-de-disco-lumbar",
    },
    {
      title: "Lesion de",
      title2: "L.C.A.",
      subtitle:
        "El ligamento cruzado anterior es uno de los estabilizadores más importantes de la rodilla que le da el 85% de su estabilidad, acompáñame te platico de ortopedia y de cómo se aborda esta lesión.",
      background:
        "/Lesiones%20en%20ligamento%20cruzado%20anterior%20tratamiento%20conservador%20en%20Tijuana.png",
      link: "/procedimientos/lesion-por-lca",
    },
    {
      title: "Hernia discal",
      title2: "cervical",
      subtitle:
        "Una hernia se produce cuando el disco que se encargan de disipar las fuerzas que recorren la columna se dañan, por tanto, se aplasta las raíces nerviosas. Te invito a ver este videoblog para conocer su tratamiento ortopédico.",
      background:
        "/Hernia%20de%20disco%20lumbar%20cirugia%20y%20tratamiento%20en%20Tijuana.png",
      link: "/procedimientos/hernia-discal-cervical",
    },
    {
      title: "Lesiones en",
      title2: "meniscos",
      subtitle:
        "Son responsables del casi 50 % de la trasmisión de fuerza a través de la rodilla y actúan como estabilizadores secundarios. Esta es una de las lesiones de rodilla más comunes te invito a conocer tratamiento.",
      background:
        "/Lesiones%20en%20meniscos%20tratamiento%20conservador%20en%20Tijuana.png",
      link: "/procedimientos/lesiones-en-meniscos",
    },
  ];

  const content_en = [
    {
      title: "Total knee",
      title2: "replacement",
      subtitle:
        "This surgery has one of the highest success rates. It's normal to feel anxious before this orthopedic procedure, so in this vlog I explain everything you need to know as a knee specialist trauma surgeon.",
      background: "/Protesis%20total%20de%20cadera%20en%20Tijuana.png",
      link: "/procedimientos/protesis-total-de-rodilla",
    },
    {
      title: "Total hip",
      title2: "replacement",
      subtitle:
        "In this vlog we'll explore one of the most performed trauma surgeries worldwide with over 1 million patients each year. I'll explain what it involves and who are candidates.",
      background: "/Hernia%20discal%20cervical%20cirugia%20en%20Tijuana.png",
      link: "/procedimientos/protesis-total-de-cadera",
    },
    {
      title: "Lumbar disc",
      title2: "herniation",
      subtitle:
        "Did you know lumbar disc herniation radiculopathy is one of the leading causes of orthopedic disability worldwide? I'd like to discuss the surgical intervention, a trauma procedure that decompresses the affected nerve root.",
      background:
        "/protesis%20total%20de%20rodilla%20en%20Tijuana%20consulta.png",
      link: "/procedimientos/hernia-de-disco-lumbar",
    },
    {
      title: "Anterior cruciate",
      title2: "ligament (ACL) injury",
      subtitle:
        "The anterior cruciate ligament is one of the knee's most important stabilizers, providing 85% of its stability. Join me as I discuss orthopedics and how this injury is treated.",
      background:
        "/Lesiones%20en%20ligamento%20cruzado%20anterior%20tratamiento%20conservador%20en%20Tijuana.png",
      link: "/procedimientos/lesion-por-lca",
    },
    {
      title: "Cervical disc",
      title2: "herniation",
      subtitle:
        "A herniation occurs when the discs that dissipate forces along the spine are damaged, compressing nerve roots. I invite you to watch this vlog to learn about its orthopedic treatment.",
      background:
        "/Hernia%20de%20disco%20lumbar%20cirugia%20y%20tratamiento%20en%20Tijuana.png",
      link: "/procedimientos/hernia-discal-cervical",
    },
    {
      title: "Meniscal",
      title2: "injuries",
      subtitle:
        "The menisci are responsible for nearly 50% of force transmission through the knee and act as secondary stabilizers. This is one of the most common knee injuries - I invite you to learn about its treatment.",
      background:
        "/Lesiones%20en%20meniscos%20tratamiento%20conservador%20en%20Tijuana.png",
      link: "/procedimientos/lesiones-en-meniscos",
    },
  ];

  function incrementIndex() {
    const content = URL ? content_en : content_es;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
    setAnimate(true);
    setAnimationKey((prevKey) => prevKey + 1);
  }

  function decrementIndex() {
    const content = URL ? content_en : content_es;
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + content.length) % content.length
    );
    setAnimate(true);
    setAnimationKey((prevKey) => prevKey + 1);
  }

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [animate, currentIndex]);

  return (
    <main className="flex flex-col lg:h-screen py-16 lg:py-0">
      <div ref={sectionRef} className="overflow-hidden h-screen">
        <motion.div
          key={currentIndex}
          initial={{ scale: 1.25 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${URL ? content_en[currentIndex].background : content_es[currentIndex].background})`,
          }}
        >
          <div className="flex justify-center lg:justify-between items-center h-screen lg:w-[1400px] m-auto px-28">
            <button onClick={decrementIndex} className="hidden lg:block">
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
            <motion.div
              key={animationKey}
              className={`flex flex-col justify-center items-start px-16`}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0 }}
            >
              <h2 className="font-bold text-[25px] lg:text-[50px] mb-2">
                {URL
                  ? content_en[currentIndex].title
                  : content_es[currentIndex].title}
              </h2>
              <h2 className="font-bold text-[70px] lg:text-[80px] mb-2">
                {URL
                  ? content_en[currentIndex].title2
                  : content_es[currentIndex].title2}
              </h2>
              <h3 className="font-bold text-[14px] lg:text-[18px] text-[#969596] mb-8 lg:w-[70%]">
                {URL
                  ? content_en[currentIndex].subtitle
                  : content_es[currentIndex].subtitle}
              </h3>
              <button className="bg-blue-500 hover:bg-blue-700 px-8 py-2 mb-12">
                <a
                  className="text-sm"
                  href={
                    URL
                      ? content_en[currentIndex].link
                      : content_es[currentIndex].link
                  }
                >
                  {URL ? "Learn more" : "Conoce más"}
                </a>
              </button>
              <div className="flex justify-center items-center gap-4">
                {(URL ? content_en : content_es).map((item, index) => (
                  <svg
                    className="cursor-pointer"
                    key={index}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setCurrentIndex(index)}
                  >
                    <circle
                      cx="6"
                      cy="6"
                      r="6"
                      fill={currentIndex === index ? "#3B82F6" : "#FFFFFF"}
                    />
                  </svg>
                ))}
              </div>
            </motion.div>
            <button onClick={incrementIndex} className="hidden lg:block">
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
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default SuccessStories;
