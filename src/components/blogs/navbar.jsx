import React, { useEffect } from "react";

const Navbar = ({ URL }) => {
  useEffect(() => {
    const backButton = document.getElementById("back-button");
    if (backButton) {
      backButton.addEventListener("click", () => {
        window.location.href = URL ? "/en/" : "/";
      });
    }
  }, [URL]);

  return (
    <nav className="flex justify-start items-center fixed px-4 sm:px-8 md:px-14 py-4 sm:py-8 z-50">
      <div className="flex justify-start">
        <button id="back-button">
          <img
            src="/El-doctor-Ricardo-Monge-es-ortopedista-especialista-en-rodilla-cadera-y-espalda.webp"
            alt="El doctor Ricardo Monge es especialista en ortopedia y traumatología especializado en lesiones musculo esqueléticas  de rodilla, cadera y espalda"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
