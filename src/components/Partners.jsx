import React, { useState } from "react";

function Partners() {
  const [currentImage, setCurrentImage] = useState(null);

  const partners = [
    {
      image: "/Logos FENECOT 2 (A).png",
      hoverLogo: "/Logos FENECOT 2 (B).png",
      alt: "El doctor Ricardo Monge es miembro de la federacion nacional de colegios de ortopedia y traumatologia de mexico",
    },
    {
      image:
        "/El consejo mexicano de ortopedia y traumatologia reconoce y certifica a Ricardo Monge como medico especialista en Tijuana.png",
      hoverLogo: "/cmo.png",
      alt: "El Consejo Mexicano de Ortopedia y Traumatologia certifica y evalua a los medicos como Ricardo MONGE",
    },
    {
      image:
        "/Ricardo Monge  miembro de AANA  fundacion en pro  de la ensenanza  de artroscopia y cirugia no invasivas.png",
      hoverLogo: "/AANA.png",
      alt: "Una importante fundacion especializada en astroscopia cirugias invasivas forman parte de la amplia variedad de instituciones de las que el doctor Ricardo Monge participa",
    },
    {
      image:
        "/Ricardo Monge pertenece a una de las organizaciones de ortopedia y traumatologia mas grande de america latina.png",
      hoverLogo: "/femecot.png",
      alt: "Ricardo Monge pertenece a una institución que fomenta el conocimiento y promueve el mejoramiento continuo de la práctica médica a especialistas en ortopedia y traumatología",
    },
    {
      image:
        "/Monge pertenece a la asociacion medica de especialistas musculoesqueleticos mas grande del mundo.png",
      hoverLogo: "/AAOS.png",
      alt: "Ricardo Monge está en constantes congresos y diplomados con la asociación médica de especialistas musculoesqueléticos en el mundo",
    },
    {
      image:
        "/El ortopedista y  traumatologo  Ricardo Monge es  miembro del  programa de ensenanza de recostruccion articular en AMECRA.png",
      hoverLogo: "/AMECRA.png",
      alt: "La AMECRA es una reconocida institucion por su alta especialidades en recostrucion articular de la que Ricardo Monge forma parte",
    },
  ];
  return (
    <div>
      <main class="flex justify-center lg:justify-start flex-col lg:w-[80%] mx-auto items-center lg:items-start py-16 lg:py-48 ">
        <h1 class="text-[42px] font-medium mb-4 px-8 lg:px-0 text-center">
          Colegios Médicos
        </h1>
        <h2 class="font-bold text-[#969596] text-[16px] mb-8 px-8 lg:px-0 lg:mb-16">
          Miembro activo de varios colegios e instituciones especializadas me
          continúan preparando y actualizando mediante seminarios y congresos
          con el fin de seguir brindando una alta calidad de atención para
          paciente actuales y futuros
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:w-full">
          {partners.map((partner, index) => (
            <div
              key={index}
              onMouseEnter={() => setCurrentImage(partner.hoverLogo)}
              onMouseLeave={() => setCurrentImage(partner.image)}
            >
              <img
                src={
                  currentImage === partner.hoverLogo
                    ? partner.hoverLogo
                    : partner.image
                }
                alt={partner.alt}
                className="w-48 h-48 object-contain"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Partners;
