import { useState } from "react";

const testimonials = [
  {
    text: "Excelente trato y muy claro al explicar, nos atendió en domingo a las 4 pm Muy bien por el Dr.",
    name: "Denisse Higuera",
    topic: "Articulaciones",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, molestias?",
    name: "Denisse Higuera",
    topic: "Artoplastia",
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
