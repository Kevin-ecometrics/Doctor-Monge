// utils/sendGAEvent.js
export const sendGAEvent = ({ eventName, category, label, value = 1 }) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      debug_mode: window.location.hostname === "localhost",
      event_category: category,
      event_label: label,
      value: value,
    });
    console.log(`✅ Evento GA enviado: ${label}`);
  } else {
    console.warn("⚠️ window.gtag no está disponible");
  }
};
