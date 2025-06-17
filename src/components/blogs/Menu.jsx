import { useState } from "react";
import { motion } from "framer-motion";

function Menu({ blogs, titulo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  const toggleMenu = () => setIsOpen(!isOpen);

  // Reverse blogs for latest first
  const blogsReverse = [...blogs].reverse();
  const totalPages = Math.ceil(blogsReverse.length / blogsPerPage);

  // Pagination logic
  const startIndex = (currentPage - 1) * blogsPerPage;
  const paginatedBlogs = blogsReverse.slice(
    startIndex,
    startIndex + blogsPerPage
  );

  const isEnglish = "/en/blogs/";
  const isSpanish = "/blogs/";
  const isCurrentPath = window.location.pathname.includes(isEnglish)
    ? isEnglish + titulo
    : isSpanish + titulo;

  return (
    <div>
      <div className="relative z-50">
        <button
          onClick={toggleMenu}
          className="p-2 fixed top-2 right-4 md:top-10 md:right-10 text-white rounded-lg bg-gray-600"
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
            className="icon icon-tabler icon-tabler-menu-2"
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
          transition={{ type: "spring", stiffness: 120 }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 overflow-auto flex flex-col justify-center items-center"
        >
          <div className="p-6 space-y-4 w-full max-w-md">
            {paginatedBlogs.map((blog, index) => (
              <a
                key={index}
                href={`${blog.ruta}/`}
                className={`block p-3 text-center rounded-lg transition duration-300 transform hover:scale-105 ${
                  blog.ruta === isCurrentPath
                    ? "text-blue-400 bg-gray-700"
                    : "text-white bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {blog.title}
              </a>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
            >
              ← Anterior
            </button>
            <span className="text-white">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
            >
              Siguiente →
            </button>
          </div>

          <button
            className="absolute top-10 right-10 text-white text-5xl transition-transform transform hover:scale-110"
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
