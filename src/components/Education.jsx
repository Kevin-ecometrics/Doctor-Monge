import { useState } from "react";

const Education = () => {
  const [showImages, setShowImages] = useState(false);
  const educationData = [
    {
      logo: "/Xochicalco.png",
      years: "2013 - 2018",
      university: "Universidad Xochicalco",
      description:
        "La universidad cuenta con 50 años de calidad y prestigio con múltiples acreditaciones como La Asociación Mexicana de Facultades y Escuelas de Medicina, A.C., O.M.S. , COMAEM, COMAPROD, convirtiéndola en una las mejores universidades para la licenciatura en medina.",
    },
    {
      logo: "/UNAM.png",
      years: "2018 - 2021",
      university: "Universidad Nacional Autónoma de México.",
      description:
        " Hospital General del Estado de Sonora, avalado por la U.N.A.M. certificado y miembro del Consejo Mexicano de Ortopedia.",
    },
    {
      logo: "/FEMECOT.png",
      years: "2021 - 2022",
      university: "4to. Lugar Nacional FEMECOT 2022",
      description:
        " Investigación de Incidencia de lesión del ligamento nucal en esguince cervical valorado por ultrasonido en el Hospital General del Estado de Sonora.",
    },
  ];

  const handleButtonClick = () => {
    setShowImages(!showImages);
  };

  return (
    <main className="md:w-[80%] md:mx-auto py-44 md:h-screen">
      <div className="md:w-full flex flex-col justify-center md:flex-row md:justify-between items-center">
        <div>
          <h1 className="text-[42px] font-medium text-center md:text-start">
            Educación
          </h1>
          <p className="font-bold text-[12px] text-[#969596] text-center md:text-start">
            Número de Cédula profesional: 12900183 7660539
          </p>
        </div>
        <div className="py-6 md:py-0">
          <button
            className="bg-blue-500 hover:bg-blue-700 px-8 py-2"
            onClick={handleButtonClick}
          >
            Ver Títulos
          </button>
        </div>
      </div>
      {educationData.map((item) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-8 border-b border-gray-300 items-center px-8">
          <div>
            <img src={item.logo} className="" alt="" />
          </div>
          <div>
            <p className="text-[#969596] font-bold text-[12px]">{item.years}</p>
            <h1 className="font-bold text-[19px]">{item.university}</h1>
          </div>
          <div>
            <p className="text-[#969596] font-bold text-[12px]">
              {item.description}
            </p>
          </div>
        </div>
      ))}
      {showImages && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg flex flex-col items-end">
            <div className="w-full flex justify-center items-center">
              <h2 className="text-xl font-bold text-black mb-4 uppercase">
                Títulos
              </h2>
            </div>
            <div className="flex md:flex-row flex-col justify-center items-center gap-8">
              <img
                src="/Titulo1.png"
                alt="Image 1"
                className="mx-auto size-72  md:size-full  "
              />
              <img
                src="/Titulo2.png"
                alt="Image 2"
                className="mx-auto size-72 md:size-full"
              />
            </div>
            <div className="">
              <button
                className="bg-red-500 hover:bg-red-700 px-2 py-1 rounded-md m-2 w-[200px]"
                onClick={handleButtonClick}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Education;
