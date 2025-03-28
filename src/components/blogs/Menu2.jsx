import React, { useEffect, useState } from "react";

const blogsURL = [
  {
    id: 1,
    url: "/blogs/Es-necesaria-una-segunda-cirugia-para-tratar-la-pseudoartrosis/",
  },
  {
    id: 2,
    url: "/blogs/fractura-de-humero-proximal-en-adultos-mayores/",
  },
  {
    id: 3,
    url: "/blogs/lumbalgia-tipos-factores-de-riesgos-y-tratamientos/",
  },
  {
    id: 4,
    url: "/blogs/Como-saber-si-es-artritis-o-artrosis/",
  },
  {
    id: 5,
    url: "/blogs/Tendinitis-y-tendinosis-causas-diferencias-y-tratamiento/",
  },
  {
    id: 6,
    url: "/blogs/Infiltraciones-de-rodilla-Opciones-y-beneficios-para-la-osteoartritis/",
  },
  {
    id: 7,
    url: "/blogs/Juanetes-sintomas-deteccion-y-tipos-de-cirugia-para-eliminarlos/",
  },
  {
    id: 8,
    url: "/blogs/Porque-se-dice-que-el-cuerpo-rechazo-de-material-Factores-asociados-al-fallo-en-la-osteosintesis-de-fracturas/",
  },
  {
    id: 9,
    url: "/blogs/Tratamiento-conservador-vs-cirugia-Cuando-un-tratamiento-conservador-falla-y-requiere-intervencion-quirurgica-en-hernia-discal-cervical/",
  },
  {
    id: 10,
    url: "/blogs/Infiltraciones-en-la-rodilla-con-acido-hialuronico-para-tratamiento-de-artrosis-de-rodilla/",
  },
  {
    id: 11,
    url: "/blogs/Osteoporosis-Una-condicion-silenciosa-que-afecta-a-la-mitad-de-la-poblacion-mayor/",
  },
  { id: 12, url: "/blogs/Lesion-de-Ligamento-cruzado-anterior/" },
  { id: 13, url: "/blogs/Pseudoartrosis-y-Retraso-de-Consolidacion/" },
  { id: 14, url: "/blogs/Fractura-de-tibia-y-Perone/" },
];

const Menu2 = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const index = blogsURL.findIndex((blog) => blog.url === currentPath);
    if (index !== -1) {
      setCurrentIndex(index);
    } else {
      console.error(`No se encontró la URL: ${currentPath}`);
    }
  }, []);

  const handleBackButtonClick = () => {
    window.location.href = "/";
  };

  return (
    <section className="bottom-0 right-0 fixed mb-4 mr-4">
      <div className="flex items-center justify-center space-x-4">
        {currentIndex > 0 && (
          <a href={blogsURL[currentIndex - 1].url}>
            <button
              aria-label="Go to previous blog"
              className="p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-900 transition duration-300 transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </a>
        )}
        <button
          id="back-button2"
          aria-label="Go to home page"
          className="p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-900 transition duration-300 transform hover:scale-110"
          onClick={handleBackButtonClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-8 h-8"
          >
            <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
            <path d="M10 12h4v4h-4z"></path>
          </svg>
        </button>
        {currentIndex < blogsURL.length - 1 && (
          <a href={blogsURL[currentIndex + 1].url}>
            <button
              aria-label="Go to next blog"
              className="p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-900 transition duration-300 transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </a>
        )}
      </div>
    </section>
  );
};

export default Menu2;
