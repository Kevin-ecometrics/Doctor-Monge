import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Education = ({ URL }) => {
  const [showImages, setShowImages] = useState(false);
  const ref = useRef(null);
  const isVisible = useInView(ref);
  const [hoverIndex, setHoverIndex] = useState(null);

  const educationData_es = [
    {
      logo: "/Ricardo-Monge-obtuvo-su-titulo-como-medico-general-en-una-prestigiosa-universidad-en-Tijuana-Baja-California.webp",
      hoverLogo: "/xochicalco.png",
      alt: "El doctor Ricardo Monge se formó en una de las mejores universidades de Tijuana Baja california con un modelo educativo integral",
      years: "2013 - 2018",
      university: "Universidad Xochicalco",
      description:
        "La universidad cuenta con 50 años de calidad y prestigio con múltiples acreditaciones como La Asociación Mexicana de Facultades y Escuelas de Medicina, A.C., O.M.S. , COMAEM, COMAPROD, convirtiéndola en una las mejores universidades para la licenciatura en medina. ",
    },
    {
      logo: "/Ricardo-Monge-es-un-medico-especialista-avalado-por-la-UNAM.webp",
      hoverLogo: "/unam.png",
      alt: "El doctor Ricardo Monge fue Avadado por unas de las facultades más reconocidas del país en su especialidad como traumatólogo",
      years: "2018 - 2021",
      university: "Universidad Nacional Autónoma de México.",
      description:
        "Especialidad en traumatología y Ortopedia otorgada en el Hospital General del Estado de Sonora, avalado por la U.N.A.M. certificado y miembro del Consejo Mexicano de Ortopedia. ",
    },
    {
      logo: "/Ricardo-Monge-pertenece-a-una-de-las-organizaciones-de-ortopedia-y-traumatologia-mas-grande-de-america-latina.webp",
      hoverLogo: "/femecot.png",
      alt: "Ricardo Monge pertenece a una institución que fomenta el conocimiento y promueve el mejoramiento continuo de la práctica médica a especialistas en ortopedia y traumatología",
      years: "2021 - 2022",
      university: "4to. Lugar Nacional FEMECOT 2022",
      description:
        "Realicé Investigación de Incidencia de lesión del ligamento nucal en esguince cervical valorado por ultrasonido en el Hospital General del Estado de Sonora para mi certificación como médico especialista en traumatología y ortopedia",
    },
  ];

  const educationData_en = [
    {
      logo: "/Ricardo-Monge-obtuvo-su-titulo-como-medico-general-en-una-prestigiosa-universidad-en-Tijuana-Baja-California.webp",
      hoverLogo: "/xochicalco.png",
      alt: "Dr. Ricardo Monge trained at one of the best universities in Tijuana with a comprehensive educational model",
      years: "2013 - 2018",
      university: "Xochicalco University",
      description:
        "The university has 50 years of quality and prestige with multiple accreditations including the Mexican Association of Medical Schools, WHO, COMAEM, and COMAPROD, making it one of the best universities for medical studies.",
    },
    {
      logo: "/Ricardo-Monge-es-un-medico-especialista-avalado-por-la-UNAM.webp",
      hoverLogo: "/unam.png",
      alt: "Dr. Ricardo Monge was certified by one of the most recognized medical schools in Mexico for his trauma specialist training",
      years: "2018 - 2021",
      university: "National Autonomous University of Mexico",
      description:
        "Specialization in Traumatology and Orthopedics at the General Hospital of Sonora, certified by UNAM and member of the Mexican Council of Orthopedics.",
    },
    {
      logo: "/Ricardo-Monge-pertenece-a-una-de-las-organizaciones-de-ortopedia-y-traumatologia-mas-grande-de-america-latina.webp",
      hoverLogo: "/femecot.png",
      alt: "Ricardo Monge belongs to an institution that promotes knowledge and continuous improvement in orthopedic and trauma medical practice",
      years: "2021 - 2022",
      university: "4th National Place FEMECOT 2022",
      description:
        "Conducted research on nuchal ligament injury incidence in cervical sprain evaluated by ultrasound at the General Hospital of Sonora for my certification as a specialist in traumatology and orthopedics.",
    },
  ];

  const handleButtonClick = () => {
    setShowImages(!showImages);
  };

  const currentData = URL ? educationData_en : educationData_es;

  return (
    <main className="lg:w-[80%] lg:mx-auto py-16 lg:py-44" ref={ref}>
      <div className="lg:w-full flex flex-col justify-center lg:flex-row lg:justify-between items-center">
        <div>
          <h1 className="text-[30px] md:text-[42px] font-medium text-center lg:text-start mb-4">
            {URL
              ? "Academic trajectory in traumatology and orthopedics"
              : "Trayectoria académica en traumatología y ortopedia"}{" "}
          </h1>
          <h3 className="font-bold text-[16px] text-[#969596] text-center lg:text-start px-8 lg:px-0 lg:w-[70%]">
            {URL
              ? "I have trained at the best traumatology and orthopedic institutions in Mexico to provide you with excellent treatment and quality care, as well as giving you absolutely necessary information to understand your orthopedic injury or pathology and how to treat it."
              : "Me he preparado en las mejores instituciones de traumatología y ortopedia en México para brindarte tratamiento de excelencia y acompañamiento de calidad, así como ortogarte la información absolutamente necesaria para que comprendas tu lesión ortopédica o patología y poderla tratar."}
          </h3>
          <h4 className="font-bold text-[16px] text-[#969596] text-center lg:text-start px-8 lg:px-0 lg:w-[70%]">
            {URL
              ? "Professional license number as a specialist in traumatology and orthopedics:"
              : "Número de Cédula profesional como médico especialista en traumatología y ortopedia:"}
            <strong className="text-white font-bold">12900183</strong>{" "}
          </h4>
        </div>
        <div className="py-6 lg:py-0">
          <button
            className="bg-blue-700 hover:bg-blue-900 text-white px-8 py-2 whitespace-nowrap"
            onClick={handleButtonClick}
            aria-label={URL ? "View Degrees" : "Ver Títulos"}
          >
            {URL ? "View Degrees" : "Ver Títulos"}
          </button>
        </div>
      </div>
      {currentData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -100 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 3.0, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-3 py-8 border-b border-gray-300 items-center px-8"
        >
          <div>
            <img
              src={hoverIndex === index ? item.hoverLogo : item.logo}
              loading="lazy"
              fetchPriority="high"
              className="w-24"
              alt={item.alt}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              title="logos Institucionales"
            />
          </div>
          <div>
            <h3 className="text-[#969596] font-bold text-[14px] mb-4">
              {item.years}
            </h3>
            <h3 className="font-bold text-[18px]">{item.university}</h3>
          </div>
          <div>
            <h4 className="text-[#969596] font-bold text-[14px]">
              {item.description}
            </h4>
          </div>
        </motion.div>
      ))}
      {showImages && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg flex flex-col items-end">
            <div className="w-full flex justify-center items-center">
              <h2 className="text-xl font-bold text-black mb-4 uppercase">
                {URL ? "Degrees" : "Títulos"}
              </h2>
            </div>
            <div className="flex lg:flex-row flex-col justify-center items-center gap-8">
              <img
                src="/Ricardo Monge es un medico certificado por las mejores universidades de Mexico.png"
                loading="lazy"
                alt="Ricardo monge concluyo sus estudios de forma destacable en las mejores universidades de medicina en México"
                className="mx-auto size-72  lg:size-full  "
              />
              <img
                src="/Ricardo Monge  especialista en cirugia y manejo de lesiones muscoloesqueleticas.png"
                loading="lazy"
                alt="Ricardo monge egresó como médico especializado en lesiones musculo esqueléticas"
                className="mx-auto size-72 lg:size-full"
              />
            </div>
            <div className="">
              <button
                className="bg-red-500 hover:bg-red-700 px-2 py-1 rounded-md m-2 w-[200px]"
                onClick={handleButtonClick}
              >
                {URL ? "Close" : "Cerrar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Education;
