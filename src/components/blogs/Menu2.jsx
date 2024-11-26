import React, { useState, useEffect } from "react";

function Menu2() {
  const blogsURL = [
    {
      id: 1,
      url: "/blogs/Porque-se-dice-que-el-cuerpo-rechazo-de-material-Factores-asociados-al-fallo-en-la-osteosintesis-de-fracturas",
    },
    {
      id: 2,
      url: "/blogs/Tratamiento-conservador-vs-cirugia-Cuando-un-tratamiento-conservador-falla-y-requiere-intervencion-quirurgica-en-hernia-discal-cervical",
    },
    {
      id: 3,
      url: "/blogs/infiltraciones-en-la-rodilla-con-acido-hialuronico-para-tratamiento-de-artrosis-de-rodilla",
    },
    {
      id: 4,
      url: "/blogs/Osteoporosis-Una-condicion-silenciosa-que-afecta-a-la-mitad-de-la-poblacion-mayor",
    },
    {
      id: 5,
      url: "/blogs/Lesion-de-Ligamento-cruzado-anterior",
    },
    {
      id: 6,
      url: "/blogs/Pseudoartrosis-y-Retraso-de-Consolidacion",
    },
    {
      id: 7,
      url: "/blogs/Fractura-de-tibia-y-Perone",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const index = blogsURL.findIndex((blog) => blog.url === currentPath);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [window.location.pathname]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      window.location.href = blogsURL[newIndex].url;
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.min(prevIndex + 1, blogsURL.length - 1);
      window.location.href = blogsURL[newIndex].url;
      return newIndex;
    });
  };

  const handleHome = () => {
    window.location.href = "/";
  };

  return (
    <section className="bottom-0 right-0 fixed mb-4 mr-4">
      <div className="flex items-center justify-center space-x-4">
        {currentIndex > 0 && (
          <button
            onClick={handlePrevious}
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
        )}

        <button
          onClick={handleHome}
          className="p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-900 transition duration-300 transform hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="24"
            height="24"
            stroke-width="2"
            className="w-8 h-8"
          >
            {" "}
            <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>{" "}
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>{" "}
            <path d="M10 12h4v4h-4z"></path>{" "}
          </svg>
        </button>

        {currentIndex < blogsURL.length - 1 && (
          <button
            onClick={handleNext}
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
        )}
      </div>
    </section>
  );
}

export default Menu2;
