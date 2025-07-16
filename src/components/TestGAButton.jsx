import React from "react";

const TestGAButton = () => {
  const handleClick = () => {
    console.log("Click en botón, enviando evento GA");

    if (typeof window.gtag === "function") {
      window.gtag("event", "test_button_click", {
        debug_mode: window.location.hostname === "localhost", // solo en dev
        event_category: "Test",
        event_label: "Botón de prueba",
        value: 1,
      });
      console.log("✅ Evento test_button_click enviado");
    } else {
      console.warn("⚠️ window.gtag no está disponible aún");
    }
  };

  return (
    <div
      className="h-screen flex justify-center"
      style={{ padding: "2rem", textAlign: "center" }}
    >
      <button
        onClick={handleClick}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.25rem",
          cursor: "pointer",
          borderRadius: "8px",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
        }}
      >
        Enviar Evento GA4
      </button>
    </div>
  );
};

export default TestGAButton;
