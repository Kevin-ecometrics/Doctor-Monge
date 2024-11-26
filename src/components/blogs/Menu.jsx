import React, { useState } from "react";
import { motion } from "framer-motion";

function Menu({ blogs, titulo }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const blogsReverse = [...blogs].reverse();

  return (
    <div>
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="p-2 top-2 right-4 md:top-10 md:right-10 fixed text-white rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        </button>

        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : "-100%" }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-auto overflow-auto flex flex-col justify-center items-center"
        >
          <div className="p-6 space-y-6">
            {blogsReverse.map((blog, key) => (
              <div key={key}>
                <a
                  href={blog.ruta}
                  className={`p-4 mb-4 flex flex-col text-center transition duration-300 ease-in-out transform hover:scale-105 rounded-lg ${
                    blog.ruta === "/blogs/" + titulo
                      ? "text-blue-400 bg-gray-700" // Estilo especial para el título activo
                      : "text-white bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  {blog.title}
                </a>
              </div>
            ))}
          </div>

          <button
            className="p-3 top-0 right-4 md:top-10 md:right-10 absolute text-white rounded-full text-5xl transition duration-300 ease-in-out transform hover:scale-110"
            onClick={toggleMenu}
          >
            &times;
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Menu;
