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
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute", // Posiciona sobre el main
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1, // Asegura que el fondo esté detrás del contenido
          opacity: 0.9,
        }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 px-8 gap-16 w-[80%] mx-auto z-10">
        <div>
          <h1 className="font-medium text-[42px]">Contacto</h1>
          <p className="font-bold text-[#969596] text-[16px] mb-12">
            Encuéntrame en:
          </p>
          <div className="*:font-medium *:text-[16px] mb-12">
            <p>Fray Servando Teresa de Mier #1351, Núm.</p>
            <p>Interior 809-810, Zona Urbana Río, C.P.</p>
            <p>22010 Tijuana, B.C., México</p>
          </div>
          <div className="flex flex-col">
            <a
              href="tel:6649763510"
              className="font-medium text-[29px] hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              664 976 3510
            </a>
            <a
              href="tel:6641690650"
              className="font-medium text-[29px] hover:text-blue-600 mb-8"
              target="_blank"
              rel="noopener noreferrer"
            >
              664 169 0650
            </a>
            <a
              href="mailto:pacientes@mongeortopedia.com"
              className="font-bold text-[18px] text-[#969596] hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              pacientes@mongeortopedia.com{" "}
            </a>
          </div>
        </div>
        <div>
          <h1 className="text-[32px] font-bold mb-2">
            ¿Tienes alguna pregunta?
          </h1>
          <h2 className="text-[25px] font-medium mb-2">
            Te invito a ver más contenido de Ortopedia y Traumatología
          </h2>
          <h1 className="font-medium text-[20px] text-blue-500">
            ¿ Deseas agendar tu cita? Con gusto, solo escribe tus datos para
            comenzar o llámanos{" "}
          </h1>
          <h2></h2>
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
      <footer className="absolute bottom-10 left-10 lg:left-20">
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
