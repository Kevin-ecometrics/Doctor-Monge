import { useState, useCallback, useMemo, useEffect } from "react";
import axios from "axios";

export default function OptimizedDoctoraliaBookingInterface({ URL }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    isFirstVisit: true,
    firstVisitReason: "", // nuevo campo
    hasInsurance: false, // nuevo campo
    insuranceName: "", // nuevo campo
  });
  const [bookedSlots, setBookedSlots] = useState({});
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ================== Constants ==================
  const services = useMemo(
    () => [
      // {
      //   name: "Primera visita Ortopedia",
      //   price: 1000,
      //   description: "Detalles",
      // },
      // {
      //   name: "Primera visita Traumatología",
      //   price: 1000,
      //   description: "Detalles",
      // },
      {
        name: URL
          ? "Follow-up Orthopedic Visits"
          : "Visitas sucesivas Ortopedia",
        price: 1000,
        description: URL ? "Details" : "Detalles",
      },
      {
        name: URL ? "Orthopedic Consultation" : "Consulta ortopédica",
        price: 1000,
        description: URL ? "Details" : "Detalles",
      },
      {
        name: URL ? "Infiltrations" : "Infiltraciones",
        price: null,
        description: URL ? "Details" : "Detalles",
      },
      {
        name: URL
          ? "Total Hip Arthroplasty with Prosthesis"
          : "Artroplastia de la cadera con prótesis total",
        price: null,
        description: URL ? "Details" : "Detalles",
      },
      {
        name: URL
          ? "Total Knee Arthroplasty with Prosthesis"
          : "Artroplastia rodilla con prótesis total",
        price: null,
        description: URL ? "Details" : "Detalles",
      },
      {
        name: URL ? "Knee Arthroscopy" : "Artroscopia de rodilla",
        price: null,
        description: URL ? "Details" : "Detalles",
      },
      {
        name: URL
          ? "Cervical Disc Herniation Surgery"
          : "Cirugía de hernia discal cervical",
        price: null,
        description: URL ? "Details" : "Detalles",
      },
      {
        name: URL
          ? "Surgery for Ligament and Meniscus Injuries"
          : "Cirugía de lesiones en ligamentos y meniscos",
        price: null,
        description: URL ? "Details" : "Detalles",
      },
      {
        name: URL ? "Lumbar Disc Herniation" : "Hernia de disco lumbar",
        price: null,
        description: URL ? "Details" : "Detalles",
      },
      {
        name: URL
          ? "Spinal Pain Management and Spine Surgery"
          : "Manejo del dolor en columna y cirugía de columna",
        price: null,
        description: URL ? "Details" : "Detalles",
      },
      {
        name: URL
          ? "ACL Reconstruction by Arthroscopy"
          : "Reconstrucción ligamentos cruzados de rodilla por artroscopia",
        price: null,
        description: URL ? "Details" : "Detalles",
      },
      {
        name: URL
          ? "Orthopedic Reduction and Immobilization of Fractures/Dislocations"
          : "Reducción ortopédica e inmovilización de fracturas y/o luxaciones",
        price: null,
        description: URL ? "Details" : "Detalles",
      },
    ],
    []
  );
  const monthNames = useMemo(
    () =>
      URL
        ? [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]
        : [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ],
    [URL]
  );

  const weekDays = useMemo(
    () =>
      URL
        ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        : ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    [URL]
  );

  // ================== Horarios por día ==================
  const scheduleByDay = useMemo(
    () => ({
      0: [], // Domingo cerrado
      1: ["10:00", "11:00", "12:00", "16:00", "17:00"], // Lunes
      2: ["10:00", "11:00", "12:00", "13:00"], // Martes
      3: ["10:00", "11:00", "12:00", "16:00", "17:00"], // Miércoles
      4: ["10:00", "11:00", "12:00", "13:00"], // Jueves
      5: ["10:00", "11:00", "12:00", "16:00", "17:00"], // Viernes
      6: ["10:00", "11:00", "12:00"], // Sábado
    }),
    []
  );

  // ================== Calendar Generation ==================
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Empty cells before first day
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);

    // Fill days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      const dayOfWeek = dayDate.getDay();
      const isPast = dayDate < today;
      const dateKey = dayDate.toDateString();

      // Verificar si el día está completamente ocupado
      const isDayFullyBooked = (() => {
        // Si es domingo, siempre está ocupado
        if (dayOfWeek === 0) return true;

        // Obtener los horarios disponibles para este día de la semana
        const availableSlotsForDay = scheduleByDay[dayOfWeek] || [];

        // Si no hay horarios disponibles para este día de la semana
        if (availableSlotsForDay.length === 0) return true;

        // Verificar si todos los horarios están ocupados
        const bookedForDay = bookedSlots[dateKey] || new Set();

        // Si la cantidad de horarios ocupados es igual a los disponibles, el día está lleno
        return bookedForDay.size >= availableSlotsForDay.length;
      })();

      const hasAvailability = !isPast && !isDayFullyBooked;

      days.push({
        day,
        date: dayDate,
        isPast,
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
        hasAvailability,
        isFullyBooked: isDayFullyBooked,
      });
    }

    return days;
  }, [currentMonth, scheduleByDay, bookedSlots]);

  // ================== Available Slots ==================
  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];

    const dayOfWeek = selectedDate.getDay();
    let slots = scheduleByDay[dayOfWeek] || [];

    // Verificar si el día está completamente ocupado
    const dateKey = selectedDate.toDateString();
    const bookedForDay = bookedSlots[dateKey] || new Set();
    const isDayFullyBooked = bookedForDay.size >= slots.length;

    // Si el día está completamente ocupado, no mostrar horarios
    if (isDayFullyBooked) return [];

    // Filtrar horarios ocupados primero
    slots = slots.filter((slot) => !bookedForDay.has(slot));

    const now = new Date();
    const isToday = selectedDate.toDateString() === now.toDateString();

    // Filtrar horas pasadas si es hoy
    if (isToday) {
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      slots = slots.filter((slot) => {
        const [hour, minutes] = slot.split(":").map(Number);
        return (
          hour > currentHour ||
          (hour === currentHour && minutes > currentMinutes)
        );
      });
    }

    return slots;
  }, [selectedDate, scheduleByDay, bookedSlots]);

  const morningSlots = useMemo(
    () => availableSlots.filter((slot) => parseInt(slot.split(":")[0]) < 14),
    [availableSlots]
  );
  const afternoonSlots = useMemo(
    () => availableSlots.filter((slot) => parseInt(slot.split(":")[0]) >= 14),
    [availableSlots]
  );

  const isFormComplete = useMemo(
    () =>
      formData.name &&
      formData.phone &&
      formData.email &&
      (formData.isFirstVisit ? formData.firstVisitReason : selectedService) &&
      (formData.hasInsurance ? formData.insuranceName : true) &&
      selectedDate &&
      selectedTime,
    [
      formData.name,
      formData.phone,
      formData.email,
      formData.isFirstVisit,
      formData.firstVisitReason,
      selectedService,
      formData.hasInsurance,
      formData.insuranceName,
      selectedDate,
      selectedTime,
    ]
  );

  const progressPercentage = useMemo(() => {
    const completedFields = [
      formData.name && formData.phone && formData.email,
      formData.isFirstVisit ? formData.firstVisitReason : selectedService,
      formData.hasInsurance ? formData.insuranceName : true,
      selectedDate,
      selectedTime,
    ].filter(Boolean).length;

    return (completedFields / 5) * 100;
  }, [
    formData.name,
    formData.phone,
    formData.email,
    formData.isFirstVisit,
    formData.firstVisitReason,
    selectedService,
    formData.hasInsurance,
    formData.insuranceName,
    selectedDate,
    selectedTime,
  ]);

  // ================== Callbacks ==================
  const updateFormData = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    // Si cambia isFirstVisit, limpia campos relacionados
    if (field === "isFirstVisit") {
      setSelectedService("");
      setFormData((prev) => ({
        ...prev,
        firstVisitReason: "",
      }));
    }
    // Si cambia hasInsurance, limpia insuranceName
    if (field === "hasInsurance" && !value) {
      setFormData((prev) => ({
        ...prev,
        insuranceName: "",
      }));
    }
  }, []);

  const selectDate = useCallback((dayObj) => {
    if (
      !dayObj ||
      dayObj.isPast ||
      dayObj.date.getDay() === 0 ||
      !dayObj.hasAvailability ||
      dayObj.isFullyBooked
    )
      return;
    setSelectedDate(dayObj.date);
    setSelectedTime(null);
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
    setSelectedDate(null);
    setSelectedTime(null);
  }, []);

  const prevMonth = useCallback(() => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
    setSelectedDate(null);
    setSelectedTime(null);
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim())
      newErrors.name = URL ? "Name is required" : "El nombre es requerido";

    if (!formData.phone.trim())
      newErrors.phone = URL ? "Phone is required" : "El teléfono es requerido";

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = URL ? "Invalid email" : "Email inválido";

    if (formData.isFirstVisit) {
      if (!formData.firstVisitReason.trim())
        newErrors.firstVisitReason = URL
          ? "Please describe the reason for your visit"
          : "Describe el motivo de tu visita";
    } else {
      if (!selectedService)
        newErrors.service = URL
          ? "Select a type of consultation"
          : "Selecciona un tipo de consulta";
    }

    if (formData.hasInsurance) {
      if (!formData.insuranceName.trim())
        newErrors.insuranceName = URL
          ? "Enter your insurance name"
          : "Escribe el nombre de tu seguro";
    }

    if (!selectedDate)
      newErrors.date = URL ? "Select a date" : "Selecciona una fecha";

    if (!selectedTime)
      newErrors.time = URL ? "Select a time" : "Selecciona un horario";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, selectedService, selectedDate, selectedTime, URL]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (validateForm()) {
        setIsLoading(true);
        const appointmentData = {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          isFirstVisit: formData.isFirstVisit,
          firstVisitReason: formData.firstVisitReason,
          service: formData.isFirstVisit
            ? formData.firstVisitReason
            : selectedService,
          insurance: formData.hasInsurance
            ? formData.insuranceName
            : "Sin seguro",
          date: selectedDate?.toISOString(),
          time: selectedTime,
          lang: URL ? "en" : "es",
        };
        try {
          const { data } = await axios.post(
            "https://mongeortopedia.com/api/appointments",
            appointmentData
          );

          setAppointmentData({
            ...appointmentData,
            appointmentId: data.appointmentId,
            formattedDate: selectedDate?.toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          });

          fetchAppointments();

          setShowSuccessModal(true);

          setFormData({
            name: "",
            phone: "",
            email: "",
            isFirstVisit: true,
            firstVisitReason: "",
            hasInsurance: false,
            insuranceName: "",
          });
          setSelectedService("");
          setSelectedDate(null);
          setSelectedTime(null);
        } catch (err) {
          console.error("❌ Error en handleSubmit:", err);
          alert("❌ No se pudo guardar la cita. Ver consola.");
        } finally {
          setIsLoading(false);
        }
      }
    },
    [validateForm, formData, selectedService, selectedDate, selectedTime]
  );

  const closeSuccessModal = useCallback(() => {
    setShowSuccessModal(false);
    setAppointmentData(null);
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(
        "https://mongeortopedia.com/api/appointments"
      );
      const slotsByDate = {};
      data.forEach((appointment) => {
        // Suma 24 horas (en milisegundos) a la fecha UTC
        const localDate = new Date(
          new Date(appointment.fecha).getTime() + 24 * 60 * 60 * 1000
        );
        const dateKey = new Date(
          localDate.getFullYear(),
          localDate.getMonth(),
          localDate.getDate()
        ).toDateString();
        // Normaliza la hora a "HH:mm"
        const time = appointment.hora
          ? appointment.hora.slice(0, 5)
          : localDate.toTimeString().slice(0, 5);
        if (!slotsByDate[dateKey]) slotsByDate[dateKey] = new Set();
        slotsByDate[dateKey].add(time);
      });
      setBookedSlots(slotsByDate);
    } catch (err) {
      console.error("❌ Error cargando citas:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-16">
      {/* Modal de éxito */}
      {showSuccessModal && appointmentData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl max-w-md w-full mx-4">
            {/* Header del modal */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-6 rounded-t-2xl text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {URL ? "Appointment Confirmed!" : "¡Cita Confirmada!"}
              </h3>
              <p className="text-emerald-100 mt-2">
                {URL
                  ? "Your appointment has been successfully scheduled"
                  : "Tu cita ha sido agendada exitosamente"}
              </p>
            </div>

            {/* Contenido del modal */}
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-2xl">👤</span>
                  <div>
                    <div className="text-sm text-slate-400">
                      {URL ? "Patient" : "Paciente"}
                    </div>
                    <div className="font-semibold text-white">
                      {appointmentData.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-2xl">📞</span>
                  <div>
                    <div className="text-sm text-slate-400">
                      {URL ? "Phone" : "Teléfono"}
                    </div>
                    <div className="font-semibold text-white">
                      {appointmentData.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-2xl">🏥</span>
                  <div>
                    <div className="text-sm text-slate-400">
                      {URL ? "Service" : "Servicio"}
                    </div>
                    <div className="font-semibold text-white text-sm">
                      {appointmentData.service}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-2xl">📅</span>
                  <div>
                    <div className="text-sm text-slate-400">
                      {URL ? "Date & Time" : "Fecha y Hora"}
                    </div>
                    <div className="font-semibold text-white">
                      {appointmentData.formattedDate} {URL ? "at" : "a las"}{" "}
                      {appointmentData.time}
                    </div>
                  </div>
                </div>
              </div>

              {/* Información importante */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-blue-400 mb-2 flex items-center">
                  <span className="mr-2">📧</span>
                  {URL ? "Check your email" : "Verifica tu correo electrónico"}
                </h4>
                <p className="text-sm text-slate-300">
                  {URL
                    ? "We have sent a confirmation email to "
                    : "Hemos enviado un correo de confirmación a "}
                  <strong>
                    {appointmentData.email ||
                      (URL ? "your email address" : "tu dirección de correo")}
                  </strong>{" "}
                  {URL
                    ? "with all the details of your appointment and a link to track it."
                    : "con todos los detalles de tu cita y un enlace para hacer seguimiento."}
                </p>
              </div>

              {/* Botones del modal */}
              <div className="space-y-3">
                <button
                  onClick={closeSuccessModal}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200"
                >
                  {URL ? "Got it" : "Entendido"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optimized Header with better gradients */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto p-6">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-all duration-300 group-hover:bg-white/20">
                <div className="text-2xl font-bold text-white">RM</div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">
                  Dr. Ricardo Monge
                </h1>
                <span className="px-3 py-1 bg-emerald-500/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                  {URL ? "✓ Verified" : "✓ Verificado"}
                </span>
              </div>

              <p className="text-blue-200 text-lg mb-3">
                {URL
                  ? "Traumatology and Orthopedics"
                  : "Traumatología y Ortopedia"}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>
                    {URL
                      ? "Fray Servando Teresa de Mier 1351-Interior 809-810, Tijuana, B.C."
                      : "Fray Servando Teresa de Mier 1351-Interior 809-810, Tijuana, B.C."}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★★★★★</span>
                  <span>{URL ? "(99 reviews)" : "(99 opiniones)"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>
                    {URL ? "Responds within 2 hours" : "Responde en 2 horas"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🎓</span>
                  <span>
                    {URL ? "15 years of experience" : "15 años de experiencia"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Personal Information */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-3">👤</span>
                {URL ? "Personal Information" : "Información Personal"}
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    {URL ? "Full Name *" : "Nombre completo *"}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    className={`w-full p-4 bg-slate-700 border-2 rounded-xl transition-all duration-200 text-white placeholder-slate-400 ${
                      errors.name
                        ? "border-red-400 focus:border-red-500"
                        : "border-slate-600 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder={URL ? "Your full name" : "Tu nombre completo"}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    {URL ? "Phone *" : "Teléfono *"}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className={`w-full p-4 bg-slate-700 border-2 rounded-xl transition-all duration-200 text-white placeholder-slate-400 ${
                      errors.phone
                        ? "border-red-400 focus:border-red-500"
                        : "border-slate-600 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="+52 (664) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    {URL ? "Email" : "Correo electrónico"}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className={`w-full p-4 bg-slate-700 border-2 rounded-xl transition-all duration-200 text-white placeholder-slate-400 ${
                      errors.email
                        ? "border-red-400 focus:border-red-500"
                        : "border-slate-600 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder={
                      URL ? "Your email address" : "Tu correo electrónico"
                    }
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-slate-300 mb-4">
                  {URL
                    ? "Is this your first visit with this specialist? *"
                    : "¿Es tu primera visita con este especialista? *"}
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      value: true,
                      title: URL
                        ? "Yes, it's my first visit"
                        : "Sí, es mi primera visita",
                      desc: URL
                        ? "We will include extra time to understand your history"
                        : "Incluiremos tiempo adicional para conocer tu historial",
                    },
                    {
                      value: false,
                      title: URL
                        ? "No, I'm already a patient"
                        : "No, ya soy paciente",
                      desc: URL
                        ? "We will continue with your usual follow-up"
                        : "Continuaremos con tu seguimiento habitual",
                    },
                  ].map((option) => (
                    <label
                      key={option.value.toString()}
                      className="flex items-center p-4 rounded-xl border-2 border-slate-600 hover:border-blue-500 transition-all duration-200 cursor-pointer bg-slate-700/50"
                    >
                      <input
                        type="radio"
                        name="firstVisit"
                        checked={formData.isFirstVisit === option.value}
                        onChange={() =>
                          updateFormData("isFirstVisit", option.value)
                        }
                        className="w-5 h-5 text-blue-500"
                      />
                      <div className="ml-3">
                        <span className="font-medium text-white">
                          {option.title}
                        </span>
                        <p className="text-sm text-slate-400">{option.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Service and Insurance Selection */}
            <div className="grid md:grid-cols-1 gap-8">
              {/* Service Selection */}
              <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3">🏥</span>
                  {URL ? "Type of Consultation" : "Tipo de Consulta"}
                </h3>
                {formData.isFirstVisit ? (
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      {URL
                        ? "Reason for your first visit *"
                        : "Motivo de tu primera visita *"}
                    </label>
                    <input
                      type="text"
                      value={formData.firstVisitReason}
                      onChange={(e) =>
                        updateFormData("firstVisitReason", e.target.value)
                      }
                      className={`w-full p-4 bg-slate-700 border-2 rounded-xl transition-all duration-200 text-white placeholder-slate-400 ${
                        errors.firstVisitReason
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-600 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder={
                        URL ? "Describe your reason" : "Describe tu motivo"
                      }
                    />
                    {errors.firstVisitReason && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.firstVisitReason}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <button
                        key={service.name}
                        onClick={() => setSelectedService(service.name)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          selectedService === service.name
                            ? "border-blue-500 bg-blue-900/50 shadow-lg"
                            : "border-slate-600 hover:border-blue-400 hover:bg-slate-700/50"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-semibold text-white">
                              {service.name}
                            </div>
                          </div>
                          {service.price ? (
                            <div className="text-right ml-4">
                              <div className="text-lg font-bold text-blue-400">
                                ${service.price}
                              </div>
                              <div className="text-sm text-slate-400">MXN</div>
                            </div>
                          ) : null}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {!formData.isFirstVisit && errors.service && (
                  <p className="text-red-400 text-sm mt-2">{errors.service}</p>
                )}
              </div>

              {/* Insurance Selection */}
              <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3">🛡️</span>
                  {URL
                    ? "Do you have health insurance?"
                    : "¿Tienes seguro médico?"}
                </h3>
                <div className="flex gap-6 mb-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="hasInsurance"
                      checked={formData.hasInsurance === true}
                      onChange={() => updateFormData("hasInsurance", true)}
                      className="w-5 h-5 text-blue-500"
                    />
                    <span className="ml-2 text-white font-medium">
                      {URL ? "Yes" : "Sí"}
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="hasInsurance"
                      checked={formData.hasInsurance === false}
                      onChange={() => updateFormData("hasInsurance", false)}
                      className="w-5 h-5 text-blue-500"
                    />
                    <span className="ml-2 text-white font-medium">
                      {URL ? "No" : "No"}
                    </span>
                  </label>
                </div>
                {formData.hasInsurance && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      {URL
                        ? "Name of your insurance *"
                        : "Nombre de tu seguro *"}
                    </label>
                    <input
                      type="text"
                      value={formData.insuranceName}
                      onChange={(e) =>
                        updateFormData("insuranceName", e.target.value)
                      }
                      className={`w-full p-4 bg-slate-700 border-2 rounded-xl transition-all duration-200 text-white placeholder-slate-400 ${
                        errors.insuranceName
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-600 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder={
                        URL
                          ? "Enter your insurance name"
                          : "Escribe el nombre de tu seguro"
                      }
                    />
                    {errors.insuranceName && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.insuranceName}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Calendar Section */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-3">📅</span>
                {URL ? "Select your date" : "Selecciona tu fecha"}
              </h3>

              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={prevMonth}
                  className="p-3 hover:bg-slate-700 rounded-xl transition-colors text-2xl font-bold text-slate-300 hover:text-blue-400"
                >
                  ←
                </button>
                <h4 className="text-2xl font-bold text-white">
                  {monthNames[currentMonth.getMonth()]}{" "}
                  {currentMonth.getFullYear()}
                </h4>
                <button
                  onClick={nextMonth}
                  className="p-3 hover:bg-slate-700 rounded-xl transition-colors text-2xl font-bold text-slate-300 hover:text-blue-400"
                >
                  →
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-6 w-full">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="p-3 text-center text-sm font-bold text-slate-400 bg-slate-700 rounded-lg"
                  >
                    {day}
                  </div>
                ))}
                {calendarDays.map((dayObj, index) => (
                  <button
                    key={index}
                    onClick={() => selectDate(dayObj)}
                    disabled={
                      !dayObj ||
                      dayObj.isPast ||
                      dayObj.date.getDay() === 0 ||
                      !dayObj.hasAvailability ||
                      dayObj.isFullyBooked
                    }
                    className={`
                      p-3 text-center text-base rounded-xl transition-all duration-200 font-medium h-14 flex flex-col items-center justify-center
                      ${!dayObj ? "invisible" : ""}
                      ${
                        dayObj?.isPast || dayObj?.isFullyBooked
                          ? "text-slate-500 cursor-not-allowed bg-slate-900"
                          : dayObj?.date.getDay() === 0
                          ? "text-slate-500 cursor-not-allowed bg-slate-700/50"
                          : dayObj?.hasAvailability
                          ? selectedDate?.toDateString() ===
                            dayObj.date.toDateString()
                            ? "bg-blue-600 text-white shadow-xl scale-105"
                            : "text-white hover:bg-blue-600/20 hover:text-blue-400 border-2 border-transparent hover:border-blue-400/50"
                          : "text-slate-500 cursor-not-allowed bg-slate-700/30"
                      }
                    `}
                    title={
                      dayObj?.isFullyBooked
                        ? URL
                          ? "Completely Busy Day"
                          : "Dia Completamente Ocupado"
                        : ""
                    }
                  >
                    <span>{dayObj?.day}</span>
                    {dayObj?.hasAvailability &&
                      !dayObj?.isFullyBooked &&
                      dayObj.date.getDay() !== 0 && (
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1"></div>
                      )}
                    {dayObj?.isFullyBooked && (
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1"></div>
                    )}
                  </button>
                ))}
              </div>

              {errors.date && (
                <p className="text-red-400 text-sm">{errors.date}</p>
              )}
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3">⏰</span>
                  Horarios para el{" "}
                  {selectedDate.toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>

                {availableSlots.length > 0 ? (
                  <div className="space-y-8">
                    {/* Morning Slots */}
                    {morningSlots.length > 0 && (
                      <div>
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                          <span className="mr-3 text-xl">🌅</span>
                          {URL ? "Morning Slots" : "Horarios de mañana"}
                          <span className="ml-3 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                            {morningSlots.length}{" "}
                            {URL ? "available" : "disponibles"}
                          </span>
                        </h4>
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                          {morningSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`p-3 text-center rounded-xl border-2 transition-all duration-200 font-semibold ${
                                selectedTime === slot
                                  ? "border-blue-500 bg-blue-600 text-white shadow-xl scale-105"
                                  : "border-slate-600 hover:border-blue-400 hover:bg-blue-600/20 hover:text-blue-400 text-white"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Afternoon Slots */}
                    {afternoonSlots.length > 0 && (
                      <div>
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                          <span className="mr-3 text-xl">🌇</span>
                          {URL ? "Afternoon Slots" : "Horarios de tarde"}
                          <span className="ml-3 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium">
                            {afternoonSlots.length}
                            {URL ? "available" : "disponibles"}
                          </span>
                        </h4>
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                          {afternoonSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`p-3 text-center rounded-xl border-2 transition-all duration-200 font-semibold ${
                                selectedTime === slot
                                  ? "border-blue-500 bg-blue-600 text-white shadow-xl scale-105"
                                  : "border-slate-600 hover:border-blue-400 hover:bg-blue-600/20 hover:text-blue-400 text-white"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4"></div>
                    <p className="text-slate-300 mb-4">
                      {URL
                        ? "No available slots for this date"
                        : "No hay horarios disponibles para esta fecha"}
                    </p>
                    <p className="text-sm text-slate-400">
                      {URL
                        ? "Please select another date from the calendar"
                        : "Selecciona otra fecha del calendario"}
                    </p>
                  </div>
                )}

                {errors.time && (
                  <p className="text-red-400 text-sm mt-4">{errors.time}</p>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-2">📋</span>
                  {URL ? "Your Appointment Summary" : "Resumen de tu cita"}
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                    <span className="text-blue-400">👨‍⚕️</span>
                    <div>
                      <div className="text-sm text-slate-400">
                        {URL ? "Doctor" : "Doctor"}
                      </div>
                      <div className="font-semibold text-white">
                        Dr. Ricardo Monge
                      </div>
                      <div className="text-xs text-slate-500">
                        {URL ? "Traumatology" : "Traumatología"}
                      </div>
                    </div>
                  </div>

                  {/* Servicio o motivo de primera visita */}
                  {formData.isFirstVisit && formData.firstVisitReason ? (
                    <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                      <span className="text-emerald-400">🏥</span>
                      <div>
                        <div className="text-sm text-slate-400">
                          {URL ? "Reason" : "Motivo"}
                        </div>
                        <div className="font-semibold text-sm text-white">
                          {formData.firstVisitReason}
                        </div>
                      </div>
                    </div>
                  ) : (
                    selectedService && (
                      <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                        <span className="text-emerald-400">🏥</span>
                        <div>
                          <div className="text-sm text-slate-400">
                            {URL ? "Service" : "Servicio"}
                          </div>
                          <div className="font-semibold text-sm text-white">
                            {selectedService}
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  {/* Seguro */}
                  {formData.hasInsurance && formData.insuranceName && (
                    <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                      <span className="text-indigo-400">🛡️</span>
                      <div>
                        <div className="text-sm text-slate-400">
                          {URL ? "Insurance" : "Seguro"}
                        </div>
                        <div className="font-semibold text-sm text-white">
                          {formData.insuranceName}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Button y Progress Indicator */}
                <button
                  onClick={handleSubmit}
                  disabled={!isFormComplete || isLoading}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${
                    isFormComplete
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 hover:scale-105 shadow-xl"
                      : "bg-slate-700 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <span className="animate-spin">
                      {URL ? "Processing..." : "Procesando..."}
                    </span>
                  ) : isFormComplete ? (
                    URL ? (
                      "Confirm Appointment"
                    ) : (
                      "Confirmar Cita"
                    )
                  ) : URL ? (
                    "Complete the information"
                  ) : (
                    "Completa la información"
                  )}
                </button>

                {/* Progress Indicator */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
                    <span>{URL ? "Progress" : "Progreso"}</span>
                    <span>{Math.round(progressPercentage / 20)}/5</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-500 mt-2 text-center">
                    {isFormComplete
                      ? URL
                        ? "Ready to confirm!"
                        : "¡Listo para confirmar!"
                      : URL
                      ? "Complete all fields"
                      : "Completa todos los campos"}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              {isFormComplete && (
                <div className="bg-slate-800 border border-blue-500/20 rounded-2xl p-6 mt-6">
                  <h4 className="font-bold text-blue-400 mb-3 flex items-center">
                    <span className="mr-2">ℹ️</span>
                    {URL ? "Important Information" : "Información importante"}
                  </h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>
                      {URL
                        ? "Arrive 15 minutes before your appointment"
                        : "Llega 15 minutos antes de tu cita"}
                    </p>
                    <p>
                      {URL
                        ? "You can cancel up to 24 hours before"
                        : "Puedes cancelar hasta 24 horas antes"}
                    </p>
                    <p>
                      {URL ? "Phone: 664 976 3510" : "Teléfono: 664 976 3510"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
