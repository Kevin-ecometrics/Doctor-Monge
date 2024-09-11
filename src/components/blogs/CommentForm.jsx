import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function Comment({ blogs }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const currentRoute = window.location.pathname;
  const blogId =
    blogs.findIndex((b) => `/blogs/${b.blog}` === currentRoute) + 1;

  console.log(blogs);
  console.log(`Current Route: ${currentRoute}`);
  console.log(`Blog ID: ${blogId}`);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          "https://mongeortopedia.com/api/comments"
        );
        const filteredComments = response.data.filter(
          (comment) =>
            comment.blog_id === blogId && comment.estatus === "aceptado"
        );
        setComments(filteredComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      comment,
      blogId,
    };

    try {
      await axios.post("https://mongeortopedia.com/comments", data);
      toast.success("Comentario enviado con éxito");
      setName("");
      setEmail("");
      setComment("");
    } catch {
      toast.error("Algo salió mal, por favor intente nuevamente");
    }
  };

  const calculateYearsAgo = (date) => {
    const currentDate = new Date();
    const commentDate = new Date(date);
    const yearsAgo = currentDate.getFullYear() - commentDate.getFullYear();
    return yearsAgo;
  };

  return (
    <div className="flex flex-col justify-start items-start px-4 md:px-28 py-16 bg-[#202020] h-screen w-screen">
      <h1 className="font-bold text-2xl mb-12">Nuestros comentarios:</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {comments.map((comment, index) => (
          <div key={index} className="border-2 p-4 border-white mb-8">
            <div className="flex justify-start gap-6 items-center mb-8">
              <h1>{comment.nombre}</h1>-{" "}
              <p>
                {new Date(comment.fecha_creacion).toLocaleDateString("es-ES", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                ({calculateYearsAgo(comment.fecha_creacion)} años atrás)
              </p>{" "}
            </div>
            <p className="font-medium">{comment.comentario}</p>
          </div>
        ))}
      </div>

      <div className="h-screen flex flex-col justify-start items-start">
        <h1 className="text-2xl font-bold mb-4">Deja tu comentario </h1>

        <form className="w-80" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombre
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Correo electrónico
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              rows={5}
              type="text"
              name="comment"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="comment"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Comentario
            </label>
          </div>
          <div className="mb-4 hidden">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="currentRoute"
            >
              URL Actual
            </label>
            <select
              id="currentRoute"
              className="w-full px-3 py-2 text-black"
              value={blogId}
              readOnly
            >
              <option value={blogId}>{blogId}</option>
            </select>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-80 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Enviar comentario
          </button>
        </form>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default Comment;
