import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Contact() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      nombre: formData.get("nombre"),
      correo: formData.get("correo"),
      mensaje: formData.get("mensaje"),
    };

    try {
      const response = await axios.post("http://localhost:3001/contacto", data);
      console.log(response);
      toast.success("Mensaje enviado correctamente");
      e.target.reset();
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al enviar el mensaje");
    }
  };
  return (
    <main
      class="flex justify-center items-center h-screen"
      style={{
        backgroundImage: "url('/contact.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 px-8 gap-16 w-[80%] mx-auto">
        <div>
          <h1 className="font-medium text-[42px]">Contacto</h1>
          <p className="font-bold text-[#969596] text-[12px] mb-12">
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
              href="mailto:rmonge.ortho@gmail.com"
              className="font-bold text-[15px] text-[#969596] hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              rmonge.ortho@gmail.com
            </a>
          </div>
        </div>
        <div>
          <h1 className="text-[25px] font-medium">¿Tienes alguna duda? </h1>
          <h1 className="font-medium text-[20px] text-[#005692]">
            Mándame mensaje o agenda tu cita.
          </h1>
          <form className="mt-8 mb-24 md:mb-8" onSubmit={handleSubmit}>
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="nombre"
                id="nombre"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer text-white"
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
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-[11px] font-medium w-full sm:w-full px-5 py-2.5 text-center"
            >
              Hacer cita
            </button>
          </form>
          <Toaster position="top-right" />
        </div>
      </div>
    </main>
  );
}

export default Contact;
