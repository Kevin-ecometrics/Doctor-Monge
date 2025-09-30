import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export class TourAppointment {
  constructor(URL) {
    this.driverObj = null;
    this.URL = URL;
    this.isActive = false;
    this.scrollHandler = null;
    this.init();
  }

  init() {
    this.driverObj = driver({
      showProgress: true,
      animate: true,
      smoothScroll: true,
      allowClose: true,
      overlayClickNext: false,
      stagePadding: 10,
      stageRadius: 10,
      doneBtnText: this.URL ? "Finish" : "Finalizar",
      nextBtnText: this.URL ? "Next" : "Siguiente",
      prevBtnText: this.URL ? "Back" : "Anterior",
      progressText: this.URL
        ? "Step {{current}} of {{total}}"
        : "Paso {{current}} de {{total}}",
      popoverClass: "driver-popover-custom",
      onHighlightStarted: (element) => {
        this.isActive = true;
        this.addScrollListener();

        // Esperar a que el elemento esté completamente renderizado
        if (element?.classList?.contains("calendar-section")) {
          setTimeout(() => {
            this.refresh();
          }, 300);
        }
      },
      onNext: (element) => {
        // Prevenir el siguiente paso hasta que el elemento esté listo
        if (element?.classList?.contains("calendar-section")) {
          setTimeout(() => {
            this.refresh();
          }, 200);
        }
      },
      onReset: () => {
        this.isActive = false;
        localStorage.setItem("doctoralia-tour-completed", "true");
        this.removeScrollListener();
      },
      onDestroyed: () => {
        this.isActive = false;
        this.removeScrollListener();
      },
    });
  }

  addScrollListener() {
    this.scrollHandler = () => {
      if (this.driverObj && this.isActive) {
        setTimeout(() => {
          this.refresh();
        }, 50);
      }
    };

    window.addEventListener("scroll", this.scrollHandler, true);
    window.addEventListener("resize", this.scrollHandler, true);
  }

  removeScrollListener() {
    if (this.scrollHandler) {
      window.removeEventListener("scroll", this.scrollHandler, true);
      window.removeEventListener("resize", this.scrollHandler, true);
    }
  }

  getSteps() {
    return [
      {
        element: ".personal-info-section",
        popover: {
          title: this.URL ? "Personal Information" : "Información Personal",
          description: this.URL
            ? "Start by filling in your personal details: name, phone, and email"
            : "Comienza completando tus datos personales: nombre, teléfono y correo electrónico",
          side: "left",
          align: "start",
        },
      },
      {
        element: ".visit-type-section",
        popover: {
          title: this.URL ? "Visit Type" : "Tipo de Visita",
          description: this.URL
            ? "Specify if this is your first visit or a follow-up appointment"
            : "Especifica si es tu primera visita o una cita de seguimiento",
          side: "left",
          align: "start",
        },
      },
      {
        element: ".insurance-section",
        popover: {
          title: this.URL ? "Insurance Information" : "Información del Seguro",
          description: this.URL
            ? "Let us know if you have health insurance"
            : "Infórmanos si cuentas con seguro médico",
          side: "left",
          align: "start",
        },
      },
      {
        element: ".calendar-section",
        popover: {
          title: this.URL ? "Select Date" : "Seleccionar Fecha",
          description: this.URL
            ? "Choose an available date from the calendar. Green dots indicate available days"
            : "Elige una fecha disponible del calendario. Los puntos verdes indican días disponibles",
          side: "top",
          align: "start",
        },
      },
      {
        element: ".summary-section",
        popover: {
          title: this.URL ? "Appointment Summary" : "Resumen de la Cita",
          description: this.URL
            ? "Review your appointment details and confirm when ready"
            : "Revisa los detalles de tu cita y confirma cuando estés listo",
          side: "left",
          align: "start",
        },
      },
    ];
  }

  start() {
    if (this.driverObj && !this.isActive) {
      this.driverObj.setSteps(this.getSteps());
      this.driverObj.drive();

      // Refrescar después de iniciar para asegurar posición correcta
      setTimeout(() => {
        this.refresh();
      }, 500);

      return true;
    }
    return false;
  }

  stop() {
    if (this.driverObj) {
      this.driverObj.destroy();
      this.isActive = false;
      this.removeScrollListener();
    }
  }

  refresh() {
    if (this.driverObj && this.isActive) {
      try {
        this.driverObj.refresh();
      } catch (error) {
        console.log("Error refreshing tour:", error);
      }
    }
  }

  isTourActive() {
    return this.isActive;
  }

  destroy() {
    this.stop();
    this.removeScrollListener();
    this.driverObj = null;
  }

  isTourCompleted() {
    return localStorage.getItem("doctoralia-tour-completed") === "true";
  }

  resetTour() {
    localStorage.removeItem("doctoralia-tour-completed");
    this.isActive = false;
    this.removeScrollListener();
  }
}

export default TourAppointment;
