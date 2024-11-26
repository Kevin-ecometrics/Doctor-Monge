import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function Comment({ blogs, blogActual, idForm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [blogId, setBlogId] = useState(idForm);

  let blogIndex = blogs.findIndex((blog) => blog.blog === blogActual);

  blogIndex = blogIndex + 1;

  const handleBlogChange = (event) => {
    setBlogId(event.target.value);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          "https://mongeortopedia.com/api/comments"
        );
        const filteredComments = response.data.filter(
          (comment) =>
            comment.estatus === "aceptado" && comment.blog_id === blogIndex
        );
        setComments(filteredComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [blogIndex]);

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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, options);

    const currentDate = new Date();
    const yearsAgo = currentDate.getFullYear() - date.getFullYear();

    return `${formattedDate} (${yearsAgo} años atrás)`;
  };
  return (
    <div className="flex flex-col px-4 md:px-0 py-16 ">
      {comments.length > 0 && (
        <h1 className="font-bold text-2xl">Nuestros comentarios:</h1>
      )}{" "}
      <div className="gap-8 grid grid-cols-1 md:grid-cols-3  mb-8">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="bg-gray-800 p-4 mt-2 rounded">
              <p className="text-white">
                Aportado por: <strong>{comment.nombre}</strong>
              </p>

              <p className="text-white break-words">
                Comentario:
                <span className="block mt-1">{comment.comentario}</span>
              </p>
              <p className="text-white text-sm">
                Fecha de creación: {formatDate(comment.fecha_creacion)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-white text-xl font-light mb-8">
            No hay comentarios para este blog.
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Deja tu comentario </h1>

        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
              Subir comentario al blog:
            </label>
            <select
              id="currentRoute"
              className="w-full px-3 py-2 text-black"
              value={blogId}
              onChange={handleBlogChange}
            >
              <option key={idForm} value={idForm}>
                {idForm}
              </option>{" "}
            </select>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
