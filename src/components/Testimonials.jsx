import { useState } from "react";

const testimonials = [
  {
    text: "Excelente atención y gran profesionalismo, toda explicación es detallada y armónica para su comprensión",
    name: "Alan Cota",
    topic: "Ortopedia ",
  },
  {
    text: "El Dr Ricardo Monge a quien visité por vez primera revisó de forma muy amplia y detallada mi padecimiento, y con su explicación me quedó totalmente claro el tratamiento a seguir para mi recuperación. Excelente",
    name: "Leticia R",
    topic: "Traumatología ",
  },
  {
    text: "Bastante profesional, explica cada detalle de los procedimientos posibles y recomendó la mejor accion. Me he sentido de maravilla y quede muy agradecido con el Dr. Monge",
    name: "FP",
    topic: "Ortopedia ",
  },
  {
    text: "Mi experiencia con el dr monge fue muy buena, nos explicó perfectamente todo, apenas empiezo un tratamiento con el pero la atención fue excelente y el trato muy amable. Lo recomiendo!!",
    name: "Nelly toledo",
    topic: "Traumatología ",
  },
  {
    text: "Excelente doctor , muy explícito en sus palabras , tanto profesional como humana, ambas cosas totalmente diferentes , certero y sabio en sus diagnósticos ,lo recomiendo ampliamente gracias doctor en lo personal por su enorme ayuda y ante todo paciencia a todas mis dudas con amabilidad que me las respondió al momento ,grx mil",
    name: "Alicia garza soltero",
    topic: "Traumatología ",
  },
];

function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(1);

  return (
    <main
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: "url('/testimoniales.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 px-8 md:w-[80%] md:mx-auto gap-16">
        <div>
          <h1 className="font-semibold text-[29px] md:text-[42px]">
            Buscaremos el tratamiento ideal para ti y tu lesión.
          </h1>
        </div>
        <div>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={currentTestimonial === index ? "block" : "hidden"}
            >
              <p className="mb-8 font-bold text-[12px] text-[#ACACAD]">
                {testimonial.text}
              </p>
              <h1 className="mb-4 font-bold text-[20px]">{testimonial.name}</h1>
              <p className="font-medium text-[12px] text-[#D9D9D9] mb-16">
                {testimonial.topic}
              </p>
            </div>
          ))}
          <div className="flex justify-start items-center gap-8">
            <button
              className="border border-white px-8 py-2 hover:bg-blue-500 hover:text-[#000] transition-all duration-300"
              onClick={() =>
                setCurrentTestimonial(
                  (currentTestimonial - 1 + testimonials.length) %
                    testimonials.length
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-arrow-left"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
              </svg>{" "}
            </button>
            <button
              className="border border-white px-8 py-2 hover:bg-blue-500 hover:text-[#000] transition-all duration-300"
              onClick={() =>
                setCurrentTestimonial(
                  (currentTestimonial + 1) % testimonials.length
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-arrow-right"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M13 18l6 -6" />
                <path d="M13 6l6 6" />
              </svg>{" "}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Testimonials;
