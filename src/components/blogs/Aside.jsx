import React from "react";

function Aside({ blogs }) {
  const currentRoute = window.location.pathname;
  return (
    <aside class="w-full md:w-1/4 mt-8 md:mt-0 md:ml-8">
      <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold mb-4 text-white">
          Artículos Recientes
        </h3>
        <ul class="space-y-2">
          {blogs.map((blog) => (
            <li>
              {blog.ruta === currentRoute ? (
                <span class="block text-white transition-colors duration-300 p-2 rounded-lg">
                  {blog.title}
                </span>
              ) : (
                <a
                  href={blog.ruta}
                  class="block text-blue-500 hover:text-blue-300 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-700"
                >
                  {blog.title}
                </a>
              )}
              <p class="text-gray-400 text-sm mt-1">{blog.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Aside;
