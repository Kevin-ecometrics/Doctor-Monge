import React, { useState } from "react";
import { FaBars } from "react-icons/fa"; // Ícono de menú
import { IoClose } from "react-icons/io5"; // Ícono de cerrar
import { motion } from "framer-motion"; // Animaciones

const fichas = [
  {
    title: "Recomendaciones para una columna sana",
    link: "/fichas/recomendaciones-para-una-columna-sana/",
  },
  {
    title: "Instrucciones postoperatorias de Reemplazo total de cadera",
    link: "/fichas/instrucciones-postoperatorias-de-reemplazo-total-de-cadera/",
  },
  {
    title: "Instrucciones postoperatorias de Reemplazo total de rodilla",
    link: "/fichas/instrucciones-postoperatorias-de-reemplazo-total-de-rodilla/",
  },
  {
    title: "Instrucciones postoperatorias de artroscopia de rodilla",
    link: "/fichas/instrucciones-postoperatorias-de-artroscopia-de-rodilla/",
  },
  {
    title: "Recomendaciones generales preoperatorias",
    link: "/fichas/recomendaciones-generales-preoperatorias/",
  },
];

function MenuFicha() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Obtener la URL actual para resaltar el enlace activo
  const currentPath = window.location.pathname;

  return (
    <div>
      {/* Botón para abrir/cerrar el menú */}
      <button
        onClick={toggleMenu}
        className="fixed top-8 right-8 text-white bg-blue-600 p-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300 z-50"
      >
        <FaBars size={24} />
      </button>

      {/* Fondo oscuro al abrir el menú */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50"
          onClick={toggleMenu} // Cierra el menú al hacer clic en el fondo
        />
      )}

      {/* Menú tipo aside */}
      <motion.aside
        initial={{ x: "100%" }} // Comienza fuera de la pantalla (derecha)
        animate={{ x: isOpen ? "0%" : "100%" }} // Se mueve hacia adentro o afuera
        transition={{ duration: 0.5, ease: "easeInOut" }} // Duración y tipo de transición
        className="fixed top-0 right-0 h-full md:w-96 bg-black shadow-lg z-50 flex flex-col p-6 text-white"
      >
        {/* Encabezado del menú */}
        <div className="flex items-center justify-between mb-6 mt-16 md:mt-0">
          <h3 className="text-2xl font-semibold">
            Fichas Tecnicas Disponibles
          </h3>
          <button
            onClick={toggleMenu}
            className="text-white bg-red-600 p-2 rounded-full shadow-md hover:bg-red-700 transition duration-300"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Lista de enlaces */}
        <ul className="space-y-4">
          {fichas.map((ficha, index) => (
            <li key={index}>
              <a
                href={ficha.link}
                className={`block px-4 py-3 rounded-lg transition duration-300 ${
                  currentPath === ficha.link
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic
              >
                {ficha.title}
              </a>
            </li>
          ))}
        </ul>
      </motion.aside>
    </div>
  );
}

export default MenuFicha;
