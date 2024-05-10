function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      nombre: formData.get("nombre"),
      correo: formData.get("correo"),
      mensaje: formData.get("mensaje"),
    };
    console.log(data);
  };
  return (
    <main
      class="flex justify-center items-center md:h-screen"
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
          <div>
            <h1 className="font-medium text-[29px]">664 976 3510</h1>
            <h1 className="font-medium text-[29px] mb-8">664 169 0650</h1>
            <p className="font-bold text-[15px] text-[#969596]">
              rmonge.ortho@gmail.com
            </p>
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
        </div>
      </div>
    </main>
  );
}

export default Contact;
