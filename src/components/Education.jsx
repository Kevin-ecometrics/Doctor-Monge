import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Education = () => {
  const [showImages, setShowImages] = useState(false);
  const ref = useRef(null);
  const isVisible = useInView(ref);

  const educationData = [
    {
      logo: "/Ricardo Monge  obtuvo su titulo  como medico  general en una prestigiosa  universidad en Tijuana Baja California.png",
      alt: "El doctor Ricardo Monge se formó en una de las mejores universidades de Tijuana Baja california con un modelo educativo integral",
      years: "2013 - 2018",
      university: "Universidad Xochicalco",
      description:
        "La universidad cuenta con 50 años de calidad y prestigio con múltiples acreditaciones como La Asociación Mexicana de Facultades y Escuelas de Medicina, A.C., O.M.S. , COMAEM, COMAPROD, convirtiéndola en una las mejores universidades para la licenciatura en medina.",
    },
    {
      logo: "/Ricardo Monge es un medico especialista avalado por la UNAM.png",
      alt: "El doctor Ricardo Monge fue Avadado por unas de las facultades más reconocidas del país en su especialidad como traumatólogo",
      years: "2018 - 2021",
      university: "Universidad Nacional Autónoma de México.",
      description:
        " Hospital General del Estado de Sonora, avalado por la U.N.A.M. certificado y miembro del Consejo Mexicano de Ortopedia.",
    },
    {
      logo: "/Ricardo Monge  pertenece a una  de las  organizaciones de ortopedia y traumatologia más grande de america latina.png",
      alt: "Ricardo Monge pertenece a una institución que fomenta el conocimiento y promueve el mejoramiento continuo de la práctica médica a especialistas en ortopedia y traumatología",
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
    <main className="md:w-[80%] md:mx-auto py-44 md:h-screen" ref={ref}>
      <div className="md:w-full flex flex-col justify-center md:flex-row md:justify-between items-center">
        <div>
          <h1 className="text-[42px] font-medium text-center md:text-start">
            Trayectoria académica
          </h1>
          <h4 className="font-bold text-[16px] text-[#969596] text-center md:text-start px-8 md:px-0 md:w-[70%]">
            Me he preparado en las mejores instituciones para brindarte
            tratamiento de excelencia y acompañamiento de calidad, así como
            brindarte la información absolutamente necesaria para que comprendas
            tu lesión o patología y poderla tratar. Número de Cédula
            profesional: 129001837660539
          </h4>
        </div>
        <div className="py-6 md:py-0">
          <button
            className="bg-blue-500 hover:bg-blue-700 px-16 py-2"
            onClick={handleButtonClick}
          >
            Ver Títulos
          </button>
        </div>
      </div>
      {educationData.map((item) => (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 2.0, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-8 border-b border-gray-300 items-center px-8"
        >
          <div>
            <img
              src={item.logo}
              className="w-24"
              alt={item.alt}
              title="logos Institucionales"
            />
          </div>
          <div>
            <h2 className="text-[#969596] font-bold text-[14px] mb-4">
              {item.years}
            </h2>
            <h1 className="font-bold text-[18px]">{item.university}</h1>
          </div>
          <div>
            <p className="text-[#969596] font-bold text-[14px]">
              {item.description}
            </p>
          </div>
        </motion.div>
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
                src="/Ricardo Monge es un medico certificado por las mejores universidades de Mexico.png"
                alt="Ricardo monge concluyo sus estudios de forma destacable en las mejores universidades de medicina en México"
                className="mx-auto size-72  md:size-full  "
              />
              <img
                src="/Ricardo Monge  especialista en cirugia y manejo de lesiones muscoloesqueleticas.png"
                alt="Ricardo monge egresó como médico especializado en lesiones musculo esqueléticas"
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
