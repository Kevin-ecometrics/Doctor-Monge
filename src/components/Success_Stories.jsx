import React, { useState } from "react";

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para el índice del contenido actual

  const content = [
    {
      title: "Casos de",
      title2: "Éxito1",
      subtitle:
        "Te compartimos la historia detrás de los padecimientos y como tenazmente se logró  rehabilitar a los pacientes y mejorar su calidad de vida.",
    },
    {
      title: "Casos de",
      title2: "Éxito2",
      subtitle:
        "Te compartimos la historia detrás de los padecimientos y como tenazmente se logró  rehabilitar a los pacientes y mejorar su calidad de vida.",
    },
    {
      title: "Casos de",
      title2: "Éxito3",
      subtitle:
        "Te compartimos la historia detrás de los padecimientos y como tenazmente se logró  rehabilitar a los pacientes y mejorar su calidad de vida.",
    },
  ];

  function incrementIndex() {
    if (currentIndex < content.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }

  function decrementIndex() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(content.length - 1);
    }
  }

  return (
    <main
      className="flex flex-col h-screen py-16 md:py-0"
      style={{
        backgroundImage: "url(/casos_exito.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-center md:justify-between items-center h-screen md:w-[1400px] m-auto px-16">
        <button onClick={decrementIndex} className="hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-arrow-narrow-left"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l4 4" />
            <path d="M5 12l4 -4" />
          </svg>{" "}
        </button>
        <div className="flex flex-col justify-center items-start">
          <h1 className="font-bold text-[25px] md:text-[50px] mb-2">
            {content[currentIndex].title}
          </h1>
          <h1 className="font-bold text-[70px] md:text-[140px] mb-2">
            {content[currentIndex].title2}
          </h1>
          <h1 className="font-bold text-[10px] md:text-[16px] text-[#969596] mb-8 text ">
            {content[currentIndex].subtitle.slice(
              0,
              Math.floor(content[currentIndex].subtitle.length / 2)
            )}
            <br />
            {content[currentIndex].subtitle.slice(
              Math.floor(content[currentIndex].subtitle.length / 2)
            )}
          </h1>
          <button className="bg-blue-500 hover:bg-blue-700 px-8 py-2 mb-12">
            <p className="text-sm">Ver Casos.</p>
          </button>
          <div className="flex justify-center items-center gap-4">
            {content.map((item, index) => (
              <svg
                className="cursor-pointer"
                key={index}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setCurrentIndex(index)}
              >
                <circle
                  cx="6"
                  cy="6"
                  r="6"
                  fill={currentIndex === index ? "#3B82F6" : "#FFFFFF"}
                />
              </svg>
            ))}
          </div>
        </div>
        <button onClick={incrementIndex} className="hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-arrow-narrow-right"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M15 16l4 -4" />
            <path d="M15 8l4 4" />
          </svg>{" "}
        </button>
      </div>
    </main>
  );
};

export default SuccessStories;
