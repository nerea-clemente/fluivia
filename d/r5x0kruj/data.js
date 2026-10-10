/* Fluivia · Demo para clientes
   Datos ficticios de cuatro negocios de ejemplo. Para añadir un sector,
   copia un bloque y cambia sus textos: la demo se adapta sola. */
window.DEMO_SECTORES = {
  gestoria: {
    etiqueta: "Gestoría",
    negocio: "Gestoría Ribera",
    equipo: "Ana",
    rolEquipo: "gestora",
    cliente: "cliente",
    consultas: {
      sugerencias: ["¿Qué horario tenéis?", "¿Qué necesito para la renta?", "¿Cómo os envío las facturas?", "¿Me ayudáis con una herencia?"],
      faqs: [
        { tema: "Horario", claves: ["horario", "abris", "abrir", "hora", "cerrais"], respuesta: "Abrimos de lunes a jueves de 9:00 a 18:00 y los viernes de 9:00 a 14:00. Si quieres, puedes reservar una cita desde aquí mismo." },
        { tema: "Renta", claves: ["renta", "declaracion", "irpf"], respuesta: "Para preparar tu declaración necesitamos tu DNI, tus datos fiscales, los certificados de retenciones y, si tienes hipoteca, el certificado del banco. Puedes subirlo todo a tu área de cliente." },
        { tema: "Autónomos", claves: ["autonomo", "alta", "emprender"], respuesta: "Para darte de alta como autónomo hacemos una primera reunión de una hora. Nos encargamos del alta en Hacienda y en la Seguridad Social y te explicamos qué tendrás que presentar cada trimestre." },
        { tema: "Documentación", claves: ["factura", "facturas", "envio", "enviar", "documento", "documentos", "subir"], respuesta: "Puedes subir tus facturas en tu área de cliente, en la carpeta del trimestre. Si falta algo, te avisamos automáticamente." },
        { tema: "Impuestos", claves: ["trimestre", "iva", "303", "plazo", "impuesto"], respuesta: "Los impuestos de cada trimestre se presentan durante los 20 primeros días del mes siguiente (los del cuarto trimestre, hasta el 30 de enero). Te avisamos una semana antes para que nos envíes las facturas." }
      ],
      sinRespuesta: "Esa consulta prefiero que la vea una persona del equipo. He avisado a Ana y te escribirá hoy mismo.",
      borrador: "Hola, gracias por escribirnos. Las herencias las lleva nuestra compañera Ana. ¿Te viene bien que te llame mañana por la mañana para ver tu caso?"
    },
    citas: {
      servicios: [["Primera consulta", 30], ["Declaración de la renta", 45], ["Alta de autónomo", 60]],
      agenda: [["09:30", "Café Central · Cierre trimestral"], ["11:00", "Marta Ruiz · Renta"], ["16:00", "Taller Hnos. Pérez · Nóminas"]]
    },
    documentos: {
      persona: "Laura Gómez",
      periodo: "3.er trimestre",
      lista: ["Facturas emitidas", "Facturas recibidas", "Extracto del banco", "Recibos de autónomo"],
      clientes: [["Laura Gómez", 2], ["Taller Hnos. Pérez", 4], ["Café Central", 1], ["Marta Ruiz", 3], ["Estudio Lienzo", 0]],
      factura: { proveedor: "Suministros Levante S.L.", nif: "B12345678", numero: "F-2026-0412", concepto: "Material de oficina", base: 120, ivaPct: 21 }
    },
    crm: {
      etapas: ["Nuevo", "Contactado", "Reunión", "Propuesta", "Cliente"],
      contactos: [
        ["Carlos Medina", "Alta de autónomo", 0, "Web", "Llamar para la primera reunión"],
        ["Lucía Fernández", "Declaración de la renta", 0, "WhatsApp", "Enviar lista de documentos"],
        ["Panadería Sol", "Contabilidad mensual", 1, "Recomendación", "Seguimiento del correo"],
        ["Jorge Blasco", "Crear una sociedad", 2, "Web", "Reunión el jueves a las 10:00"],
        ["Clínica Dental Mar", "Asesoría laboral", 3, "LinkedIn", "Resolver dudas de la propuesta"],
        ["Café Central", "Fiscal y laboral", 4, "Recomendación", "Revisión trimestral"],
        ["Taller Hnos. Pérez", "Nóminas", 4, "Web", "Renovación anual"]
      ],
      nuevo: ["Beatriz Lozano", "Alta de autónomo", "Web"]
    },
    email: {
      recurso: "Calendario fiscal del autónomo",
      serie: [
        ["Día 0", "Tu calendario fiscal ya está aquí", "Aquí tienes el calendario con todas las fechas del año. Te recomendamos apuntar ya las del próximo trimestre."],
        ["Día 3", "Tres gastos que casi nadie apunta", "Hay gastos de tu actividad que puedes registrar y que muchos autónomos olvidan. Te contamos cuáles y cómo guardarlos."],
        ["Día 7", "Cómo preparar el cierre del trimestre sin agobios", "Una lista sencilla para tener todo listo una semana antes del plazo."],
        ["Día 12", "¿Hablamos 20 minutos de tus impuestos?", "Si quieres que revisemos tu caso, reserva una llamada gratuita. Te decimos con sinceridad si podemos ayudarte."]
      ]
    },
    resenas: {
      positiva: ["Marta R.", 5, "Me resolvieron el alta de autónomo en una mañana. Muy claros y muy cercanos."],
      respuestaPositiva: "¡Gracias, Marta! Nos alegra mucho que el alta fuera tan sencilla. Aquí nos tienes para lo que necesites cada trimestre.",
      negativa: ["Diego P.", 3, "Buen servicio, pero tardaron en contestar a un correo."],
      respuestaNegativa: "Gracias por contárnoslo, Diego. Tienes razón: ese correo tardó más de lo que debería. Ya hemos cambiado cómo organizamos las consultas para responder antes. Si necesitas algo, escríbenos directamente."
    },
    oficina: {
      kpis: [["Contactos nuevos", "12", "últimos 7 días"], ["Citas", "9", "esta semana"], ["Documentos pendientes", "14", "de 5 clientes"], ["Aperturas", "52 %", "última newsletter"]],
      hoy: [["3", "seguimientos de contactos", "crm"], ["5", "clientes con documentos pendientes", "documentos"], ["2", "citas esta tarde", "citas"], ["1", "consulta para revisar", "consultas"]],
      origen: [["Web", 46], ["Recomendación", 28], ["WhatsApp", 16], ["LinkedIn", 10]],
      actividad: ["Café Central ha subido 3 facturas", "Recordatorio enviado a Estudio Lienzo", "Nueva cita: Marta Ruiz, jueves a las 11:00", "Lucía Fernández ha descargado el calendario fiscal"]
    },
    agentes: [
      ["Llega un correo con facturas", ["Lee el correo y los adjuntos", "Identifica al cliente", "Extrae los datos de cada factura", "Las guarda en la carpeta del trimestre", "Marca los documentos como recibidos", "Prepara un aviso si falta algo"]],
      ["Faltan 7 días para el cierre del trimestre", ["Revisa qué clientes no han enviado todo", "Redacta un recordatorio para cada uno", "Lo envía por email", "Programa un segundo aviso a los 3 días", "Te deja la lista de pendientes"]],
      ["Entra un contacto nuevo desde la web", ["Lee qué necesita", "Lo clasifica: renta, autónomo o empresa", "Lo registra en el CRM", "Redacta la respuesta con el enlace a la agenda", "Te la deja para revisar"]]
    ]
  },

  inmobiliaria: {
    etiqueta: "Inmobiliaria",
    negocio: "Inmobiliaria Brisa",
    equipo: "Pablo",
    rolEquipo: "agente",
    cliente: "comprador",
    consultas: {
      sugerencias: ["¿Sigue disponible el piso de Colón?", "Quiero visitar un piso", "¿Me ayudáis con la hipoteca?", "¿Aceptan mascotas en el alquiler?"],
      faqs: [
        { tema: "Horario", claves: ["horario", "abris", "abrir", "hora", "cerrais"], respuesta: "Abrimos de lunes a viernes de 9:30 a 14:00 y de 16:30 a 20:00, y los sábados por la mañana para visitas." },
        { tema: "Disponibilidad", claves: ["disponible", "sigue", "vendido", "colon"], respuesta: "El piso de la calle Colón, de 3 habitaciones y 95 m², sigue disponible. ¿Quieres que te reserve una visita?" },
        { tema: "Visitas", claves: ["visita", "visitar", "ver el piso", "ver la casa"], respuesta: "Puedes reservar la visita desde aquí: eliges el inmueble, el día y la hora. Te confirmamos al momento y te recordamos la cita el día antes." },
        { tema: "Financiación", claves: ["hipoteca", "financiacion", "banco", "prestamo"], respuesta: "Colaboramos con asesores hipotecarios que pueden estudiar tu caso sin compromiso. Si quieres, te ponemos en contacto." },
        { tema: "Vender", claves: ["vender", "tasacion", "valorar", "valoracion"], respuesta: "Hacemos una valoración gratuita de tu vivienda. Déjanos la dirección y los metros, y te llamamos para concertar la visita." }
      ],
      sinRespuesta: "Eso depende de cada propietario, así que prefiero que te lo confirme una persona. He avisado a Pablo y te escribirá hoy.",
      borrador: "Hola, gracias por tu interés. En el piso de la calle Sorolla el propietario acepta mascotas pequeñas. ¿Te reservo una visita esta semana?"
    },
    citas: {
      servicios: [["Visita a inmueble", 30], ["Valoración de vivienda", 45], ["Firma de reserva", 30]],
      agenda: [["10:00", "Elena Soler · Visita C/ Colón 14"], ["12:30", "Familia Núñez · Valoración"], ["17:30", "Hugo y Elena · Firma de reserva"]]
    },
    documentos: {
      persona: "Javier Ortega",
      periodo: "Compraventa · C/ Colón 14",
      lista: ["DNI de los compradores", "Nota simple", "Certificado energético", "Preaprobación hipotecaria"],
      clientes: [["Javier Ortega", 2], ["Familia Núñez", 4], ["Sofía Lara", 1], ["Hugo y Elena", 3], ["Raúl Vidal", 0]],
      factura: { proveedor: "Fotografía Luz Estudio", nif: "B87654321", numero: "2026-118", concepto: "Reportaje fotográfico de 3 inmuebles", base: 180, ivaPct: 21 }
    },
    crm: {
      etapas: ["Nuevo", "Contactado", "Visita", "Oferta", "Cliente"],
      contactos: [
        ["Elena Soler", "Piso de 3 habitaciones en el centro", 0, "Portal inmobiliario", "Proponer visitas"],
        ["Marcos Gil", "Alquiler hasta 900 €", 0, "Web", "Enviar 3 opciones"],
        ["Sara Molina", "Vender su piso", 1, "Recomendación", "Agendar valoración"],
        ["Familia Núñez", "Casa con jardín", 2, "Web", "Segunda visita el sábado"],
        ["Hugo y Elena", "C/ Colón 14", 3, "Portal inmobiliario", "Respuesta del propietario"],
        ["Raúl Vidal", "Compra cerrada", 4, "Web", "Felicitar y pedir reseña"],
        ["Sofía Lara", "Alquiler firmado", 4, "WhatsApp", "Revisión a los 6 meses"]
      ],
      nuevo: ["Andrea Ramos", "Ático con terraza", "Portal inmobiliario"]
    },
    email: {
      recurso: "Guía para comprar tu primera vivienda",
      serie: [
        ["Día 0", "Tu guía para comprar tu primera vivienda", "Aquí tienes la guía, con los pasos desde que empiezas a buscar hasta que firmas en el notario."],
        ["Día 3", "Cuánto necesitas ahorrar antes de comprar", "Además del precio, hay gastos e impuestos que conviene tener en cuenta desde el principio."],
        ["Día 7", "Qué mirar en una visita (y qué preguntar)", "Una lista para que no se te escape nada cuando vayas a ver pisos."],
        ["Día 12", "¿Te ayudamos a encontrarla?", "Cuéntanos qué buscas y te avisamos en cuanto entre algo que encaje."]
      ]
    },
    resenas: {
      positiva: ["Laura M.", 5, "Nos encontraron piso en tres semanas y nos acompañaron hasta la firma. Muy recomendables."],
      respuestaPositiva: "¡Gracias, Laura! Ha sido un placer acompañaros. Que disfrutéis mucho de vuestra nueva casa.",
      negativa: ["Iván C.", 3, "El piso estaba bien, pero la visita empezó tarde."],
      respuestaNegativa: "Gracias por avisarnos, Iván, y perdona la espera. Ya hemos ajustado la agenda para dejar más margen entre visitas. Si quieres volver a ver el piso, te lo organizamos cuando te venga bien."
    },
    oficina: {
      kpis: [["Contactos nuevos", "18", "últimos 7 días"], ["Visitas", "14", "esta semana"], ["Operaciones abiertas", "6", "en curso"], ["Aperturas", "47 %", "último aviso de inmuebles"]],
      hoy: [["4", "contactos por llamar", "crm"], ["3", "visitas esta tarde", "citas"], ["2", "compraventas con documentos pendientes", "documentos"], ["1", "consulta para revisar", "consultas"]],
      origen: [["Portales", 52], ["Web", 24], ["WhatsApp", 14], ["Recomendación", 10]],
      actividad: ["Hugo y Elena han subido la nota simple", "Visita confirmada: Elena Soler, mañana a las 10:00", "Aviso de nuevo inmueble enviado a 12 compradores", "Sara Molina ha descargado la guía de compra"]
    },
    agentes: [
      ["Entra un contacto desde un portal", ["Lee qué busca: zona, presupuesto y habitaciones", "Lo puntúa según tu cliente ideal", "Busca inmuebles que encajan", "Lo registra en el CRM", "Redacta la respuesta con 3 propuestas y la agenda de visitas", "Te la deja para revisar"]],
      ["Se publica un inmueble nuevo", ["Lo cruza con los compradores registrados", "Encuentra a los que encajan", "Redacta un aviso para cada uno", "Programa el envío", "Te avisa de quién abre el correo"]],
      ["El día antes de cada visita", ["Revisa las visitas de mañana", "Envía el recordatorio por WhatsApp", "Pide confirmación de asistencia", "Avisa al agente si alguien cancela"]]
    ]
  },

  academia: {
    etiqueta: "Academia",
    negocio: "Academia Nexo",
    equipo: "Irene",
    rolEquipo: "coordinadora",
    cliente: "alumno",
    consultas: {
      sugerencias: ["¿Hacéis prueba de nivel?", "¿Cómo me matriculo?", "Si falto, ¿puedo recuperar la clase?", "¿Tenéis clases de chino?"],
      faqs: [
        { tema: "Horario", claves: ["horario", "abris", "abrir", "hora", "cerrais"], respuesta: "Tenemos clases de lunes a viernes de 16:00 a 21:30 y los sábados de 10:00 a 13:00. Secretaría atiende de 15:30 a 20:00." },
        { tema: "Prueba de nivel", claves: ["prueba", "nivel", "grupo"], respuesta: "Hacemos una prueba de nivel gratuita de 20 minutos para colocarte en el grupo adecuado. Puedes reservarla aquí mismo." },
        { tema: "Matrícula", claves: ["matricula", "matricular", "inscribir", "apuntar", "apunto"], respuesta: "Puedes matricularte online: rellenas el formulario, subes tu DNI y eliges grupo. Te confirmamos la plaza en 24 horas." },
        { tema: "Recuperar clases", claves: ["recuperar", "falto", "faltar", "falta"], respuesta: "Si faltas a una clase, puedes recuperarla en otro grupo del mismo nivel esa misma semana. Avísanos por aquí y te decimos qué huecos hay." },
        { tema: "Exámenes oficiales", claves: ["examen", "cambridge", "certificado", "oficial"], respuesta: "Preparamos los exámenes oficiales de inglés con grupos específicos a partir de enero." }
      ],
      sinRespuesta: "Ahora mismo no tengo esa información, así que se lo paso a una persona. He avisado a Irene y te responderá hoy.",
      borrador: "¡Hola! De momento no tenemos clases de chino, pero estamos valorando abrir un grupo el próximo trimestre. ¿Quieres que te avisemos si sale adelante?"
    },
    citas: {
      servicios: [["Prueba de nivel", 20], ["Tutoría con la familia", 30], ["Clase de prueba", 60]],
      agenda: [["16:00", "Nora Gil · Prueba de nivel"], ["17:30", "Familia Sanz · Tutoría"], ["19:00", "Iván Castro · Clase de prueba"]]
    },
    documentos: {
      persona: "Daniel Ruiz",
      periodo: "Matrícula curso 2026-2027",
      lista: ["DNI del alumno", "Autorización de la familia", "Ficha de matrícula firmada", "Justificante de pago"],
      clientes: [["Daniel Ruiz", 2], ["Lucas Peña", 4], ["Paula Esteve", 1], ["Familia Sanz", 3], ["Nora Gil", 0]],
      factura: { proveedor: "Editorial Aula Viva", nif: "B11223344", numero: "AV-2026-0931", concepto: "Libros de texto (12 unidades)", base: 288, ivaPct: 4 }
    },
    crm: {
      etapas: ["Nuevo", "Contactado", "Prueba de nivel", "Propuesta", "Alumno"],
      contactos: [
        ["Paula Esteve", "Inglés B2", 0, "Web", "Proponer prueba de nivel"],
        ["Familia Romero", "Refuerzo de matemáticas", 0, "WhatsApp", "Llamar a la madre"],
        ["Iván Castro", "Francés A2", 1, "Instagram", "Seguimiento del mensaje"],
        ["Nora Gil", "Preparación Cambridge", 2, "Web", "Prueba el martes a las 16:00"],
        ["Familia Sanz", "Dos hermanos, inglés", 3, "Recomendación", "Enviar horarios de grupo"],
        ["Daniel Ruiz", "Inglés B1", 4, "Web", "Renovación de curso"],
        ["Lucas Peña", "Matemáticas 4.º ESO", 4, "Recomendación", "Tutoría trimestral"]
      ],
      nuevo: ["Marina Torres", "Inglés para el trabajo", "Web"]
    },
    email: {
      recurso: "Guía para preparar el B2 de inglés",
      serie: [
        ["Día 0", "Tu guía para preparar el B2", "Aquí tienes la guía con el plan de estudio por semanas y los recursos que más usan nuestros alumnos."],
        ["Día 3", "Los 5 errores más comunes en el speaking", "Lo que más baja la nota en la parte oral y cómo evitarlo."],
        ["Día 7", "Cuánto tiempo necesitas para pasar de B1 a B2", "Depende de tu punto de partida. Te explicamos cómo calcularlo."],
        ["Día 12", "Reserva tu prueba de nivel gratuita", "En 20 minutos sabrás tu nivel real y qué grupo te conviene."]
      ]
    },
    resenas: {
      positiva: ["Carmen L.", 5, "Mi hijo ha aprobado inglés por primera vez. Los profes se implican muchísimo."],
      respuestaPositiva: "¡Qué buena noticia, Carmen! Dale la enhorabuena de nuestra parte: el mérito es suyo. Seguimos con él el próximo curso.",
      negativa: ["Álvaro T.", 3, "Buenas clases, pero cambiaron el horario del grupo con poco aviso."],
      respuestaNegativa: "Gracias por decírnoslo, Álvaro. Tienes razón, avisamos tarde. A partir de ahora los cambios de horario se comunican con al menos dos semanas de antelación."
    },
    oficina: {
      kpis: [["Contactos nuevos", "21", "últimos 7 días"], ["Pruebas de nivel", "11", "esta semana"], ["Matrículas pendientes", "8", "con documentos por subir"], ["Aperturas", "58 %", "última newsletter"]],
      hoy: [["5", "familias por contactar", "crm"], ["3", "pruebas de nivel esta tarde", "citas"], ["8", "matrículas con documentos pendientes", "documentos"], ["2", "consultas para revisar", "consultas"]],
      origen: [["Web", 38], ["Instagram", 27], ["Recomendación", 22], ["WhatsApp", 13]],
      actividad: ["Familia Sanz ha firmado la ficha de matrícula", "Recordatorio de pago enviado a 4 familias", "Nueva prueba de nivel: Nora Gil, martes a las 16:00", "Paula Esteve ha descargado la guía del B2"]
    },
    agentes: [
      ["Se matricula un alumno", ["Crea su ficha", "Le asigna grupo según la prueba de nivel", "Pide los documentos que faltan", "Programa los recordatorios", "Avisa al profesor del grupo", "Envía la bienvenida a la familia"]],
      ["Un alumno falta dos clases seguidas", ["Detecta las ausencias", "Avisa a la coordinadora", "Redacta un mensaje para la familia", "Propone una clase de recuperación"]],
      ["Cada lunes", ["Revisa la asistencia y los pagos", "Detecta qué ha cambiado", "Escribe un resumen", "Lo envía al equipo"]]
    ]
  },

  clinica: {
    etiqueta: "Clínica",
    negocio: "Clínica Alba Fisioterapia",
    equipo: "Marta",
    rolEquipo: "recepción",
    cliente: "paciente",
    consultas: {
      sugerencias: ["¿Trabajáis con mi seguro?", "¿Cómo es la primera sesión?", "¿Puedo cambiar mi cita?", "¿Qué ejercicios hago para la espalda?"],
      faqs: [
        { tema: "Horario", claves: ["horario", "abris", "abrir", "hora", "cerrais"], respuesta: "Atendemos de lunes a viernes de 8:00 a 21:00 y los sábados de 9:00 a 13:00." },
        { tema: "Seguros", claves: ["seguro", "mutua", "aseguradora"], respuesta: "Trabajamos con varias aseguradoras. Dinos cuál tienes y te confirmamos si cubre tu tratamiento." },
        { tema: "Primera sesión", claves: ["primera", "valoracion", "primera vez"], respuesta: "En la primera sesión valoramos tu caso y empezamos el tratamiento. Dura unos 50 minutos. Si tienes informes o pruebas, tráelos." },
        { tema: "Cambios de cita", claves: ["cambiar", "cancelar", "anular", "mover"], respuesta: "Puedes cambiar o cancelar tu cita desde el enlace del recordatorio, hasta 24 horas antes." },
        { tema: "Cómo llegar", claves: ["aparcar", "parking", "aparcamiento", "llegar"], respuesta: "Hay un aparcamiento público a 50 metros, en la plaza del Mercado, y la parada del autobús está en la puerta." }
      ],
      sinRespuesta: "Eso tiene que valorarlo un fisioterapeuta, así que no te voy a dar una recomendación por aquí. He avisado a Marta para que te llame y te demos cita.",
      borrador: "Hola, gracias por escribirnos. Para recomendarte ejercicios necesitamos valorar primero tu espalda. ¿Te va bien una primera sesión mañana a las 18:00?"
    },
    citas: {
      servicios: [["Primera valoración", 50], ["Sesión de fisioterapia", 45], ["Pilates terapéutico", 55]],
      agenda: [["09:00", "Carmen Vidal · Sesión"], ["12:00", "Tomás Gil · Primera valoración"], ["18:30", "Grupo de pilates terapéutico"]]
    },
    documentos: {
      persona: "Carmen Vidal",
      periodo: "Alta de paciente",
      lista: ["Consentimiento informado", "Datos de la aseguradora", "Informe médico (si lo tienes)", "Protección de datos firmada"],
      clientes: [["Carmen Vidal", 2], ["Luis Pardo", 4], ["Andrés Mora", 1], ["Rosa Blanco", 3], ["Tomás Gil", 0]],
      factura: { proveedor: "Suministros Fisio Pro S.L.", nif: "B55667788", numero: "FP-26-2210", concepto: "Material de electroterapia", base: 340, ivaPct: 21 }
    },
    crm: {
      etapas: ["Nuevo", "Contactado", "Valoración", "Plan propuesto", "Paciente"],
      contactos: [
        ["Andrés Mora", "Dolor lumbar", 0, "Web", "Llamar para la valoración"],
        ["Logística Sur", "Fisioterapia para la plantilla", 0, "LinkedIn", "Enviar información para empresas"],
        ["Rosa Blanco", "Pilates terapéutico", 1, "Instagram", "Seguimiento del mensaje"],
        ["Tomás Gil", "Lesión de rodilla", 2, "Recomendación", "Valoración hoy a las 12:00"],
        ["Club Deportivo Albor", "Convenio para el equipo", 3, "Recomendación", "Respuesta a la propuesta"],
        ["Carmen Vidal", "Tratamiento cervical", 4, "Web", "Sesión de seguimiento"],
        ["Luis Pardo", "Readaptación deportiva", 4, "Web", "Alta y pedir reseña"]
      ],
      nuevo: ["Silvia Navarro", "Dolor de hombro", "Web"]
    },
    email: {
      recurso: "Guía para trabajar sentado sin dolor",
      serie: [
        ["Día 0", "Tu guía para trabajar sentado sin dolor", "Aquí tienes la guía con pautas de postura y pausas activas para el día a día."],
        ["Día 3", "Cómo colocar la pantalla y la silla", "Pequeños ajustes en tu puesto que marcan la diferencia."],
        ["Día 7", "Cuándo conviene ver a un fisioterapeuta", "Algunas señales que indican que es mejor que alguien valore tu caso."],
        ["Día 12", "¿Te valoramos?", "Si el dolor no mejora, reserva una primera valoración y vemos qué te pasa."]
      ]
    },
    resenas: {
      positiva: ["Pedro S.", 5, "Llegué con la espalda fatal y en cuatro sesiones estaba como nuevo. Trato excelente."],
      respuestaPositiva: "¡Gracias, Pedro! Nos alegra muchísimo verte recuperado. Sigue con los ejercicios en casa y aquí nos tienes.",
      negativa: ["Nuria F.", 3, "Buenos profesionales, pero me costó conseguir cita por teléfono."],
      respuestaNegativa: "Gracias por contárnoslo, Nuria. Ahora puedes reservar y cambiar tus citas online en cualquier momento, sin tener que llamar. Esperamos que así sea mucho más fácil."
    },
    oficina: {
      kpis: [["Contactos nuevos", "15", "últimos 7 días"], ["Citas", "86", "esta semana"], ["Altas pendientes", "6", "con documentos por firmar"], ["Huecos libres", "4", "mañana"]],
      hoy: [["4", "pacientes por llamar", "crm"], ["18", "citas hoy", "citas"], ["6", "consentimientos pendientes", "documentos"], ["1", "consulta para revisar", "consultas"]],
      origen: [["Web", 41], ["Recomendación", 33], ["Instagram", 15], ["Aseguradoras", 11]],
      actividad: ["Tomás Gil ha firmado el consentimiento", "Recordatorio enviado a 18 pacientes de mañana", "Cita cancelada: hueco ofrecido a la lista de espera", "Andrés Mora ha descargado la guía de postura"]
    },
    agentes: [
      ["Termina una sesión", ["Marca la sesión como hecha", "Programa la siguiente según el plan", "Envía los ejercicios para casa", "Pide la reseña al terminar el tratamiento"]],
      ["Se cancela una cita", ["Libera el hueco en la agenda", "Avisa a los pacientes en lista de espera", "Reserva al primero que confirma", "Actualiza la agenda del fisioterapeuta"]],
      ["El día antes de cada cita", ["Revisa las citas de mañana", "Envía el recordatorio por WhatsApp", "Pide confirmación", "Avisa a recepción de las que no confirman"]]
    ]
  }
};
