import React, { useEffect, useState } from "react";

const blogsURL = [
  {
    id: 1,
    url: "/blogs/dolor-de-rodilla-artroscopia-para-tratar-el-desgaste-articular/",
  },
  {
    id: 2,
    url: "/blogs/fracturas-ocultas-diagnostico-tijuana/",
  },
  {
    id: 3,
    url: "/blogs/Es-necesaria-una-segunda-cirugia-para-tratar-la-pseudoartrosis/",
  },
  {
    id: 4,
    url: "/blogs/fractura-de-humero-proximal-en-adultos-mayores/",
  },
  {
    id: 5,
    url: "/blogs/lumbalgia-tipos-factores-de-riesgos-y-tratamientos/",
  },
  {
    id: 6,
    url: "/blogs/Como-saber-si-es-artritis-o-artrosis/",
  },
  {
    id: 7,
    url: "/blogs/Tendinitis-y-tendinosis-causas-diferencias-y-tratamiento/",
  },
  {
    id: 8,
    url: "/blogs/Infiltraciones-de-rodilla-Opciones-y-beneficios-para-la-osteoartritis/",
  },
  {
    id: 9,
    url: "/blogs/Juanetes-sintomas-deteccion-y-tipos-de-cirugia-para-eliminarlos/",
  },
  {
    id: 10,
    url: "/blogs/Porque-se-dice-que-el-cuerpo-rechazo-de-material-Factores-asociados-al-fallo-en-la-osteosintesis-de-fracturas/",
  },
  {
    id: 11,
    url: "/blogs/Tratamiento-conservador-vs-cirugia-Cuando-un-tratamiento-conservador-falla-y-requiere-intervencion-quirurgica-en-hernia-discal-cervical/",
  },
  {
    id: 12,
    url: "/blogs/Infiltraciones-en-la-rodilla-con-acido-hialuronico-para-tratamiento-de-artrosis-de-rodilla/",
  },
  {
    id: 13,
    url: "/blogs/Osteoporosis-Una-condicion-silenciosa-que-afecta-a-la-mitad-de-la-poblacion-mayor/",
  },
  { id: 14, url: "/blogs/Lesion-de-Ligamento-cruzado-anterior/" },
  { id: 15, url: "/blogs/Pseudoartrosis-y-Retraso-de-Consolidacion/" },
  { id: 16, url: "/blogs/Fractura-de-tibia-y-Perone/" },
];

const blogsURLEN = [
  {
    id: 1,
    url: "/en/blogs/knee-pain-arthroscopy-to-treat-joint-wear/",
  },
  {
    id: 2,
    url: "/en/blogs/hidden-fractures-diagnosis-tijuana/",
  },
  {
    id: 3,
    url: "/en/blogs/is-a-second-surgery-necessary-to-treat-pseudoarthrosis/",
  },
  {
    id: 4,
    url: "/en/blogs/proximal-humerus-fracture-in-older-adults/",
  },
  {
    id: 5,
    url: "/en/blogs/low-back-pain-types-risk-factors-and-treatments/",
  },
  {
    id: 6,
    url: "/en/blogs/how-to-tell-if-its-arthritis-or-osteoarthritis/",
  },
  {
    id: 7,
    url: "/en/blogs/tendinitis-and-tendinosis-causes-differences-and-treatment/",
  },
  {
    id: 8,
    url: "/en/blogs/knee-injections-options-and-benefits-for-osteoarthritis/",
  },
  {
    id: 9,
    url: "/en/blogs/bunions-symptoms-detection-and-types-of-surgery-to-remove-them/",
  },
  {
    id: 10,
    url: "/en/blogs/why-is-it-said-that-the-body-rejects-material-factors-associated-with-failure-in-fracture-osteosynthesis/",
  },
  {
    id: 11,
    url: "/en/blogs/conservative-treatment-vs-surgery-when-conservative-treatment-fails-and-requires-surgical-intervention-for-cervical-disc-herniation/",
  },
  {
    id: 12,
    url: "/en/blogs/knee-injections-with-hyaluronic-acid-for-knee-osteoarthritis-treatment/",
  },
  {
    id: 13,
    url: "/en/blogs/osteoporosis-a-silent-condition-affecting-half-the-population-over-50/",
  },
  {
    id: 14,
    url: "/en/blogs/anterior-cruciate-ligament-injury/",
  },
  {
    id: 15,
    url: "/en/blogs/pseudoarthrosis-and-delayed-union/",
  },
  {
    id: 16,
    url: "/en/blogs/tibia-and-fibula-fracture/",
  },
];

const Menu2 = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentBlogs, setCurrentBlogs] = useState(blogsURL);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const isEnglish = currentPath.startsWith("/en/blogs/");
    const selectedBlogs = isEnglish ? blogsURLEN : blogsURL;
    setCurrentBlogs(selectedBlogs);

    const index = selectedBlogs.findIndex((blog) => blog.url === currentPath);
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
          <a href={currentBlogs[currentIndex - 1].url}>
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
        {currentIndex < currentBlogs.length - 1 && (
          <a href={currentBlogs[currentIndex + 1].url}>
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
