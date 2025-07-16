// utils/gtag.js
export const sendGAEvent = ({ action, category, label, value }) => {
  if (typeof window.gtag !== "function") {
    console.warn("gtag no está disponible");
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
