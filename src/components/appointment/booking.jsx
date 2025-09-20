import { useState, useCallback, useMemo } from "react";

export default function OptimizedDoctoraliaBookingInterface() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    isFirstVisit: true,
  });
  const [selectedService, setSelectedService] = useState("");
  const [selectedInsurance, setSelectedInsurance] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [errors, setErrors] = useState({});

  // ================== Constants ==================
  const services = useMemo(
    () => [
      {
        name: "Primera visita Ortopedia",
        price: 1000,
        description: "Detalles",
      },
      {
        name: "Primera visita Traumatología",
        price: 1000,
        description: "Detalles",
      },
      {
        name: "Visitas sucesivas Ortopedia",
        price: 1000,
        description: "Detalles",
      },
      { name: "Consulta ortopédica", price: 1000, description: "Detalles" },
      { name: "Infiltraciones", price: null, description: "Detalles" },
      {
        name: "Artroplastia de la cadera con prótesis total",
        price: null,
        description: "Detalles",
      },
      {
        name: "Artroplastia rodilla con prótesis total",
        price: null,
        description: "Detalles",
      },
      { name: "Artroscopia de rodilla", price: null, description: "Detalles" },
      {
        name: "Cirugía de hernia discal cervical",
        price: null,
        description: "Detalles",
      },
      {
        name: "Cirugía de lesiones en ligamentos y meniscos",
        price: null,
        description: "Detalles",
      },
      { name: "Hernia de disco lumbar", price: null, description: "Detalles" },
      {
        name: "Manejo del dolor en columna y cirugía de columna",
        price: null,
        description: "Detalles",
      },
      {
        name: "Reconstrucción ligamentos cruzados de rodilla por artroscopia",
        price: null,
        description: "Detalles",
      },
      {
        name: "Reducción ortopédica e inmovilización de fracturas y/o luxaciones",
        price: null,
        description: "Detalles",
      },
    ],
    []
  );

  const insuranceOptions = useMemo(
    () => [
      { name: "Particular (sin seguro)", discount: 0 },
      { name: "Axa", discount: 20 },
      { name: "DKV", discount: 25 },
      { name: "Mapfre", discount: 15 },
      { name: "Sanitas", discount: 30 },
      { name: "Cigna", discount: 25 },
      { name: "Allianz Care", discount: 20 },
    ],
    []
  );

  const monthNames = useMemo(
    () => [
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
    []
  );

  const weekDays = useMemo(
    () => ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sab"],
    []
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
      const hasAvailability =
        !isPast && (scheduleByDay[dayOfWeek]?.length || 0) > 0;

      days.push({
        day,
        date: dayDate,
        isPast,
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
        hasAvailability,
      });
    }

    return days;
  }, [currentMonth, scheduleByDay]);

  // ================== Available Slots ==================
  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];
    const dayOfWeek = selectedDate.getDay();
    return scheduleByDay[dayOfWeek] || [];
  }, [selectedDate, scheduleByDay]);

  const morningSlots = useMemo(
    () => availableSlots.filter((slot) => parseInt(slot.split(":")[0]) < 14),
    [availableSlots]
  );
  const afternoonSlots = useMemo(
    () => availableSlots.filter((slot) => parseInt(slot.split(":")[0]) >= 14),
    [availableSlots]
  );

  // ================== Selected Service & Insurance ==================
  const selectedServiceObj = useMemo(
    () => services.find((s) => s.name === selectedService),
    [services, selectedService]
  );

  const selectedInsuranceObj = useMemo(
    () => insuranceOptions.find((i) => i.name === selectedInsurance),
    [insuranceOptions, selectedInsurance]
  );

  const finalPrice = useMemo(() => {
    if (!selectedServiceObj || !selectedInsuranceObj)
      return selectedServiceObj?.price || 0;
    return Math.round(
      selectedServiceObj.price * (1 - selectedInsuranceObj.discount / 100)
    );
  }, [selectedServiceObj, selectedInsuranceObj]);

  const isFormComplete = useMemo(
    () =>
      formData.name &&
      formData.phone &&
      selectedService &&
      selectedInsurance &&
      selectedDate &&
      selectedTime,
    [
      formData.name,
      formData.phone,
      selectedService,
      selectedInsurance,
      selectedDate,
      selectedTime,
    ]
  );

  const progressPercentage = useMemo(() => {
    const completedFields = [
      formData.name && formData.phone,
      selectedService,
      selectedInsurance,
      selectedDate,
      selectedTime,
    ].filter(Boolean).length;

    return (completedFields / 5) * 100;
  }, [
    formData.name,
    formData.phone,
    selectedService,
    selectedInsurance,
    selectedDate,
    selectedTime,
  ]);

  // ================== Callbacks ==================
  const updateFormData = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const selectDate = useCallback((dayObj) => {
    if (
      !dayObj ||
      dayObj.isPast ||
      dayObj.date.getDay() === 0 ||
      !dayObj.hasAvailability
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
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email inválido";
    if (!selectedService) newErrors.service = "Selecciona un tipo de consulta";
    if (!selectedInsurance) newErrors.insurance = "Selecciona tu seguro médico";
    if (!selectedDate) newErrors.date = "Selecciona una fecha";
    if (!selectedTime) newErrors.time = "Selecciona un horario";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [
    formData,
    selectedService,
    selectedInsurance,
    selectedDate,
    selectedTime,
  ]);

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      alert(
        `¡Cita confirmada!\n\nPaciente: ${formData.name}\nTeléfono: ${
          formData.phone
        }\nDoctor: Dr. Ricardo Monge\nServicio: ${selectedService}\nFecha: ${selectedDate?.toLocaleDateString(
          "es-ES",
          { weekday: "long", year: "numeric", month: "long", day: "numeric" }
        )}\nHora: ${selectedTime}\nTotal: $${finalPrice} MXN\n\nRecibirás un SMS de confirmación en breve.`
      );
    }
  }, [
    validateForm,
    formData,
    selectedService,
    selectedDate,
    selectedTime,
    finalPrice,
  ]);

  return (
    <div className="min-h-screen bg-black text-white py-16">
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
                  ✓ Verificado
                </span>
              </div>

              <p className="text-blue-200 text-lg mb-3">
                Traumatología y Ortopedia
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>
                    Fray Servando Teresa de Mier 1351-Interior 809-810, Tijuana,
                    B.C.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★★★★★</span>
                  <span>(99 opiniones)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>Responde en 2 horas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🎓</span>
                  <span>15 años de experiencia</span>
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
                Información Personal
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Nombre completo *
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
                    placeholder="Tu nombre completo"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Teléfono *
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
                    Email (opcional)
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
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-slate-300 mb-4">
                  ¿Es tu primera visita con este especialista? *
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      value: true,
                      title: "Sí, es mi primera visita",
                      desc: "Incluiremos tiempo adicional para conocer tu historial",
                    },
                    {
                      value: false,
                      title: "No, ya soy paciente",
                      desc: "Continuaremos con tu seguimiento habitual",
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
            <div className="grid md:grid-cols-2 gap-8">
              {/* Service Selection */}
              <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3">🏥</span>
                  Tipo de Consulta
                </h3>
                <div className="space-y-3">
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
                          <div className="text-sm text-slate-300 mt-1">
                            {service.description}
                          </div>
                          <div className="flex items-center mt-2 text-sm text-slate-400">
                            <span>⏱️ {service.duration}</span>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-lg font-bold text-blue-400">
                            ${service.price}
                          </div>
                          <div className="text-sm text-slate-400">MXN</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.service && (
                  <p className="text-red-400 text-sm mt-2">{errors.service}</p>
                )}
              </div>

              {/* Insurance Selection */}
              <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3">🛡️</span>
                  Seguro Médico
                </h3>
                <div className="space-y-3">
                  {insuranceOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => setSelectedInsurance(option.name)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        selectedInsurance === option.name
                          ? "border-emerald-500 bg-emerald-900/50 shadow-lg"
                          : "border-slate-600 hover:border-emerald-400 hover:bg-slate-700/50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-white">
                          {option.name}
                        </div>
                        {option.discount > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-emerald-400 font-medium">
                              -{option.discount}%
                            </span>
                            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                              Descuento
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {errors.insurance && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.insurance}
                  </p>
                )}
              </div>
            </div>

            {/* Calendar Section */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-3">📅</span>
                Selecciona tu fecha
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
                      !dayObj.hasAvailability
                    }
                    className={`
    p-3 text-center text-base rounded-xl transition-all duration-200 font-medium h-14 flex flex-col items-center justify-center
    ${!dayObj ? "invisible" : ""}
    ${
      dayObj?.isPast
        ? "text-slate-500 cursor-not-allowed bg-slate-900"
        : dayObj?.date.getDay() === 0
        ? "text-slate-500 cursor-not-allowed bg-slate-700/50"
        : dayObj?.hasAvailability
        ? selectedDate?.toDateString() === dayObj.date.toDateString()
          ? "bg-blue-600 text-white shadow-xl scale-105"
          : "text-white hover:bg-blue-600/20 hover:text-blue-400 border-2 border-transparent hover:border-blue-400/50"
        : "text-slate-500 cursor-not-allowed bg-slate-700/30"
    }
  `}
                  >
                    <span>{dayObj?.day}</span>
                    {dayObj?.hasAvailability && dayObj.date.getDay() !== 0 && (
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Calendar Legend */}
              <div className="flex items-center justify-center gap-6 text-sm mb-4">
                <div className="flex items-center gap-2 p-2 bg-emerald-500/10 rounded-lg">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <span className="font-medium text-emerald-400">
                    Disponible
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded-lg">
                  <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                  <span className="font-medium text-slate-400">
                    No disponible
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded-lg">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="font-medium text-orange-400">
                    Fin de semana
                  </span>
                </div>
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
                          Horarios de mañana
                          <span className="ml-3 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                            {morningSlots.length} disponibles
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
                          Horarios de tarde
                          <span className="ml-3 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium">
                            {afternoonSlots.length} disponibles
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
                    <div className="text-4xl mb-4">😔</div>
                    <p className="text-slate-300 mb-4">
                      No hay horarios disponibles para esta fecha
                    </p>
                    <p className="text-sm text-slate-400">
                      Selecciona otra fecha del calendario
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
                  Resumen de tu cita
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                    <span className="text-blue-400">👨‍⚕️</span>
                    <div>
                      <div className="text-sm text-slate-400">Doctor</div>
                      <div className="font-semibold text-white">
                        Dr. Ricardo Monge
                      </div>
                      <div className="text-xs text-slate-500">
                        Traumatología
                      </div>
                    </div>
                  </div>

                  {selectedService && (
                    <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                      <span className="text-emerald-400">🏥</span>
                      <div>
                        <div className="text-sm text-slate-400">Servicio</div>
                        <div className="font-semibold text-sm text-white">
                          {selectedService}
                        </div>
                        {selectedServiceObj && (
                          <div className="text-xs text-slate-500">
                            Duración: {selectedServiceObj.duration}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedDate && (
                    <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                      <span className="text-purple-400">📅</span>
                      <div>
                        <div className="text-sm text-slate-400">Fecha</div>
                        <div className="font-semibold text-sm text-white">
                          {selectedDate.toLocaleDateString("es-ES", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedTime && (
                    <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                      <span className="text-orange-400">⏰</span>
                      <div>
                        <div className="text-sm text-slate-400">Hora</div>
                        <div className="font-semibold text-lg text-white">
                          {selectedTime}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedInsurance && (
                    <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                      <span className="text-indigo-400">🛡️</span>
                      <div>
                        <div className="text-sm text-slate-400">Seguro</div>
                        <div className="font-semibold text-sm text-white">
                          {selectedInsurance}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Summary */}
                {selectedServiceObj && selectedInsuranceObj && (
                  <div className="border-t border-slate-600 pt-4 mb-6">
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between text-slate-300">
                        <span>Precio base:</span>
                        <span>${selectedServiceObj.price} MXN</span>
                      </div>
                      {selectedInsuranceObj.discount > 0 && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Descuento {selectedInsuranceObj.name}:</span>
                          <span>
                            -$
                            {Math.round(
                              (selectedServiceObj.price *
                                selectedInsuranceObj.discount) /
                                100
                            )}{" "}
                            MXN
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white">
                      <span className="font-semibold">Total a pagar:</span>
                      <span className="text-xl font-bold">
                        ${finalPrice} MXN
                      </span>
                    </div>
                    {selectedInsuranceObj?.discount > 0 && (
                      <div className="text-center mt-3">
                        <span className="inline-flex items-center px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                          ✅ Ahorras $
                          {Math.round(
                            ((selectedServiceObj?.price || 0) *
                              (selectedInsuranceObj?.discount || 0)) /
                              100
                          )}{" "}
                          MXN
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Confirm Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!isFormComplete}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${
                    isFormComplete
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 hover:scale-105 shadow-xl"
                      : "bg-slate-700 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {isFormComplete
                    ? "🎉 Confirmar Cita"
                    : "Completa la información"}
                </button>

                {/* Progress Indicator */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
                    <span>Progreso</span>
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
                      ? "¡Listo para confirmar!"
                      : "Completa todos los campos"}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              {isFormComplete && (
                <div className="bg-slate-800 border border-blue-500/20 rounded-2xl p-6 mt-6">
                  <h4 className="font-bold text-blue-400 mb-3 flex items-center">
                    <span className="mr-2">ℹ️</span>
                    Información importante
                  </h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>• Llega 15 minutos antes de tu cita</p>
                    <p>• Trae identificación oficial y tarjeta de seguro</p>
                    <p>• Puedes cancelar hasta 24 horas antes</p>
                    <p>• Recibirás confirmación por SMS</p>
                    <p>• Teléfono: (664) 123-4567</p>
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
