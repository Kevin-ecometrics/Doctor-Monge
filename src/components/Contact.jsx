import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion, useInView } from "framer-motion";

function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [animationKey, setAnimationKey] = useState(0);
  const year = new Date().getFullYear();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);

    const data = {
      nombre: formData.get("nombre"),
      correo: formData.get("correo"),
      mensaje: formData.get("mensaje"),
    };

    try {
      const response = await axios.post(
        "https://mongeortopedia.com/contactoForm",
        data
      );
      console.log(response);
      toast.success("Mensaje enviado correctamente");
      setIsLoading(false);
      e.target.reset();
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al enviar el mensaje");
    }
  };
  useEffect(() => {
    if (isInView) {
      setAnimationKey((prevKey) => prevKey + 1);
    }
  }, [isInView]);

  return (
    <main
      ref={ref}
      className="flex justify-center items-center lg:h-screen py-16 lg:py-0 relative"
      style={{
        overflow: "hidden", // Asegura que el contenido animado no desborde
      }}
    >
      <motion.div
        key={animationKey} // Usa la clave que cambia para forzar la reanimación
        initial={{ scale: 1.25 }} // Inicia con el fondo escalado al 125%
        animate={{ scale: 1 }} // Anima la escala al 100% cuando está en vista
        transition={{ duration: 5, ease: "easeOut" }}
        style={{
          backgroundImage:
            "url('/Comodidad_desde_la_primera_visita_en_el_consultorio_de_Dr_Monge.webp')",
          cover: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: "-1",
        }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 px-8 gap-16 w-[80%] mx-auto z-10">
        <div>
          <h3 className="font-medium text-[42px] mb-2">
            {" "}
            Contacto para Dr. Ricardo Monge Romero
          </h3>
          <h1 className="font-bold text-[#969596] text-[16px] mb-8">
            Me encuentro cerca de ti a 10 minutos de la frontera de San Ysidro
            en Tijuana{" "}
          </h1>
          <div className="*:font-medium *:text-[16px] mb-12 ">
            <a
              href="https://g.co/kgs/bGEUyuJ"
              target="_blank"
              className="hover:text-blue-500"
              rel="noopener noreferrer"
            >
              <h3>Fray Servando Teresa de Mier #1351, Núm.</h3>
              <h3>Interior 809-810, Zona Urbana Río, C.P.</h3>
              <h3>22010 Tijuana, B.C., México</h3>
            </a>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="mb-4 group">
                <a
                  href="tel:6649763510"
                  className="flex items-center gap-4 group-hover:text-blue-600 group-hover:cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-building"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 21l18 0" />
                    <path d="M9 8l1 0" />
                    <path d="M9 12l1 0" />
                    <path d="M9 16l1 0" />
                    <path d="M14 8l1 0" />
                    <path d="M14 12l1 0" />
                    <path d="M14 16l1 0" />
                    <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
                  </svg>
                  <h3
                    className="font-medium text-[29px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    664 976 3510
                  </h3>
                </a>
              </div>
              <h3 className="mb-2 font-bold text-[#969596]">
                Horario de atención:
              </h3>
              <h3 className="font-medium">
                Lunes a Viernes de 10am-2pm y 4pm-6pm.
              </h3>
              <h3 className="mb-4 font-medium">Sábados de 10am-2pm.</h3>
            </div>

            <div className="mb-8 group">
              <a
                className="flex items-center gap-4 group-hover:text-blue-600 group-hover:cursor-pointer"
                href="https://wa.me/6641690650"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                  <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                </svg>
                <h3
                  className="font-medium text-[29px]  "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  664 169 0650
                </h3>
              </a>
            </div>
            <div className="mb-8 group">
              <a
                href="mailto:pacientes@mongeortopedia.com"
                className=" group-hover:text-blue-600 flex items-center gap-4 group-hover:cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                  <path d="M3 7l9 6l9 -6" />
                </svg>
                <h3 className="font-bold text-[18px]">
                  pacientes@mongeortopedia.com{" "}
                </h3>
              </a>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-[32px] font-bold mb-2">
            ¿Tienes alguna pregunta para mí?{" "}
          </h2>
          <h3 className="text-[25px] font-medium mb-10">
            Te invito a preguntarme tus dudas en Ortopedia y Traumatología y si
            quieres saber más visita{" "}
            <div className="flex gap-4 items-center">
              <a
                href="https://www.tiktok.com/@elmongedelaortopedia"
                target="_blank"
              >
                <img
                  src="/Tiktok.svg"
                  alt="Logo de Tiktok"
                  title="Logo de Instagram"
                  className="w-8"
                />{" "}
              </a>
              <a
                href="https://www.instagram.com/drmonge.ortho/?hl=es"
                target="_blank"
              >
                <img
                  src="Instagram.svg"
                  alt="Logo de Instagram"
                  title="Logo de Instagram"
                  className="w-8"
                />
              </a>
            </div>
          </h3>
          <h3 className="font-medium mb-10 text-[20px] text-blue-500">
            ¿Deseas agendar tu cita de valoración ortopédica? Con gusto, solo
            escríbeme tus datos para comenzar
          </h3>
          <form className="mt-8 mb-24 lg:mb-8" onSubmit={handleSubmit}>
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="nombre"
                id="nombre"
                class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white  focus:outline-none focus:ring-0 peer"
                placeholder=""
                required
              />
              <label
                for="nombre"
                class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nombre:
              </label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="correo"
                id="correo"
                class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white  focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
              />
              <label
                for="correo"
                class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Correo:
              </label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <textarea
                name="mensaje"
                id="mensaje"
                class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white  focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
              />
              <label
                for="mensaje"
                class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mensaje:
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              class="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none text-[13px] font-medium w-full sm:w-[400px] px-5 py-2.5 text-center"
            >
              {isLoading ? "Enviando..." : "Hacer cita"}
            </button>
          </form>
          <Toaster position="top-right" />
        </div>
      </div>{" "}
      <footer className=" absolute bottom-10 left-10 lg:left-20">
        <p className="text-sm">
          All rights reserved by Doctor Monge. {year} ©{" "}
          <a href="/" className="hover:text-blue-500 hover:underline">
            <strong> mongeortopedia.com</strong>
          </a>{" "}
          is powered by{" "}
          <a
            href="https://ecommetrica.com/"
            target="_blank"
            className="hover:text-blue-500 hover:underline"
          >
            <strong>ecommetrica.com</strong>
          </a>
        </p>
      </footer>
    </main>
  );
}

export default Contact;
