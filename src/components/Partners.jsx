import React, { useState } from "react";

function Partners({ URL }) {
  const [currentImage, setCurrentImage] = useState(null);

  const partners_en = [
    {
      image: "/Logos-FENECOT-2-A.png",
      hoverLogo: "/Logos-FENECOT-2-B.png",
      alt: "Dr. Ricardo Monge is a member of the National Federation of Orthopedics and Traumatology Colleges of Mexico",
    },
    {
      image:
        "/El-consejo-mexicano-de-ortopedia-y-traumatologia-reconoce-y-certifica-a-Ricardo-Monge-como-medico-especialista-en-Tijuana.png",
      hoverLogo: "/cmo.png",
      alt: "The Mexican Council of Orthopedics and Traumatology certifies and evaluates physicians like Ricardo Monge",
    },
    {
      image:
        "/Ricardo-Monge-miembro-de-AANA-fundacion-en-pro-de-la-ensenanza-de-artroscopia-y-cirugia-no-invasivas.png",
      hoverLogo: "/AANA.png",
      alt: "Dr. Ricardo Monge participates in important foundations specialized in arthroscopy and minimally invasive surgeries",
    },
    {
      image:
        "/Ricardo-Monge-pertenece-a-una-de-las-organizaciones-de-ortopedia-y-traumatologia-mas-grande-de-america-latina.png",
      hoverLogo: "/femecot.png",
      alt: "Ricardo Monge belongs to an institution that promotes knowledge and continuous improvement in orthopedic and trauma medical practice",
    },
    {
      image:
        "/Monge-pertenece-a-la-asociacion-medica-de-especialistas-musculoesqueleticos-mas-grande-del-mundo.png",
      hoverLogo: "/AAOS.png",
      alt: "Ricardo Monge regularly attends conferences and courses with the world's largest association of musculoskeletal specialists",
    },
    {
      image:
        "/El-ortopedista-y-traumatologo-Ricardo-Monge-es-miembro-del-programa-de-ensenanza-de-recostruccion-articular-en-AMECRA.png",
      hoverLogo: "/AMECRA.png",
      alt: "AMECRA is a renowned institution for its expertise in joint reconstruction, of which Ricardo Monge is a member",
    },
  ];

  const partners_es = [
    {
      image: "/Logos-FENECOT-2-A.png",
      hoverLogo: "/Logos-FENECOT-2-B.png",
      alt: "El doctor Ricardo Monge es miembro de la federación nacional de colegios de ortopedia y traumatología de México",
    },
    {
      image:
        "/El-consejo-mexicano-de-ortopedia-y-traumatologia-reconoce-y-certifica-a-Ricardo-Monge-como-medico-especialista-en-Tijuana.png",
      hoverLogo: "/cmo.png",
      alt: "El Consejo Mexicano de Ortopedia y Traumatología certifica y evalúa a los médicos como Ricardo Monge",
    },
    {
      image:
        "/Ricardo-Monge-miembro-de-AANA-fundacion-en-pro-de-la-ensenanza-de-artroscopia-y-cirugia-no-invasivas.png",
      hoverLogo: "/AANA.png",
      alt: "Una importante fundación especializada en artroscopía y cirugías invasivas forman parte de la amplia variedad de instituciones de las que el doctor Ricardo Monge participa",
    },
    {
      image:
        "/Ricardo-Monge-pertenece-a-una-de-las-organizaciones-de-ortopedia-y-traumatologia-mas-grande-de-america-latina.png",
      hoverLogo: "/femecot.png",
      alt: "Ricardo Monge pertenece a una institución que fomenta el conocimiento y promueve el mejoramiento continuo de la práctica médica a especialistas en ortopedia y traumatología",
    },
    {
      image:
        "/Monge-pertenece-a-la-asociacion-medica-de-especialistas-musculoesqueleticos-mas-grande-del-mundo.png",
      hoverLogo: "/AAOS.png",
      alt: "Ricardo Monge está en constantes congresos y diplomados con la asociación médica de especialistas musculoesqueléticos en el mundo",
    },
    {
      image:
        "/El-ortopedista-y-traumatologo-Ricardo-Monge-es-miembro-del-programa-de-ensenanza-de-recostruccion-articular-en-AMECRA.png",
      hoverLogo: "/AMECRA.png",
      alt: "La AMECRA es una reconocida institución por su alta especialidad en reconstrucción articular de la que Ricardo Monge forma parte",
    },
  ];

  const partners = URL ? partners_en : partners_es;

  return (
    <div>
      <main className="flex justify-center lg:justify-start flex-col lg:w-[80%] mx-auto items-center lg:items-start py-16 lg:py-48">
        <h2 className="text-[30px] md:text-[42px] font-medium mb-4 px-8 lg:px-0 md:text-center">
          {URL
            ? "National and internationally recognized Medical Associations and Councils in Orthopedics and Traumatology that I belong to"
            : "Colegios y consejos Médicos avalados nacional e internacionalmente en Ortopedia y Traumatología a los que pertenezco"}
        </h2>
        <h3 className="font-bold text-[#969596] text-[16px] mb-8 px-8 lg:px-0 lg:mb-16">
          {URL
            ? "Active member of the most prestigious colleges and institutions specialized in traumatology and orthopedics that continue to train and update me. I regularly attend seminars and congresses to maintain high quality care for my patients with traumatological complications and orthopedic injuries."
            : "Miembro activo de los colegios e instituciones más prestigiados especializados en traumatología y ortopedia que me continúan preparando y actualizando. Constantemente acudo a seminarios y congresos con el fin de seguir brindando una alta calidad de atención para mis pacientes con complicaciones traumatológicas y lesiones ortopédicas."}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:w-full">
          {partners.map((partner, index) => (
            <div
              key={index}
              onMouseEnter={() => setCurrentImage(partner.hoverLogo)}
              onMouseLeave={() => setCurrentImage(partner.image)}
              className="transition-all duration-300 hover:scale-105"
            >
              <img
                src={
                  currentImage === partner.hoverLogo
                    ? partner.hoverLogo
                    : partner.image
                }
                alt={partner.alt}
                className="w-48 h-48 object-contain mx-auto"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Partners;
