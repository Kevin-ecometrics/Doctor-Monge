import ReactGA from "react-ga4";

if (typeof window !== "undefined") {
  ReactGA.initialize("G-ML4B63MEC1", { debug: true }); // Reemplaza con tu ID de seguimiento
}

export default ReactGA;
