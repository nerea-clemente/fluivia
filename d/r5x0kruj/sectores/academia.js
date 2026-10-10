/* Demo · Academia (ejemplo ficticio) */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "academia",
  etiqueta: "Academia",
  tipo: "Academia de idiomas y refuerzo",
  negocio: "Academia Nexo",
  lema: "Idiomas y refuerzo escolar en grupos reducidos",
  cliente: "Familia",
  marca: {
    m1: "#4B3FD1", m1t: "#FFFFFF", m2: "#FFE08A", m2t: "#2A2272", suave: "#F3F1FF", tinta: "#221C4F",
    fuente: "'Nunito', 'Trebuchet MS', sans-serif", radio: "18px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="20" fill="#4B3FD1"/><path d="M13.5 27V14l13 13V14" fill="none" stroke="#FFC93C" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  panel: ["Grupos", "Alumnos", "Asistencia", "Familias", "Matrículas"],
  situacion: "Unos 180 alumnos, de primaria a adultos, en 22 grupos de inglés, francés y refuerzo. Irene dirige la academia y también da clase; en septiembre y en junio no da abasto.",
  dolores: [
    ["Septiembre es una locura", "Matrículas en papel, llamadas para saber el nivel y grupos que se llenan sin que nadie lo sepa a tiempo."],
    ["Faltas que nadie avisa", "Si un alumno falta, la familia se entera cuando llegan las notas. Y nadie ve quién está dejando de venir."],
    ["Las mismas preguntas", "Horarios, plazas libres, si hay clase en festivo… por teléfono y por WhatsApp, también los domingos."],
    ["Junio sin saber quién sigue", "Media academia no confirma si sigue el curso que viene y los grupos se organizan a ciegas."]
  ],
  casos: [
    {
      id: "matricula",
      nav: "Matrícula online",
      titulo: "Matrícula online con prueba de nivel",
      hoy: "Las familias vienen a la academia, rellenan papeles y hay que hacerles una prueba de nivel en persona antes de decirles en qué grupo entran.",
      con: "La familia matricula desde el móvil: datos, prueba de nivel corta, grupo recomendado con plazas reales y firma de las normas. La academia lo ve todo colocado.",
      ganas: ["Matrículas a cualquier hora", "Grupos bien hechos desde el principio", "Septiembre sin colas"],
      pasos: [
        { quien: "cliente", nombre: "Laura, madre de Hugo", t: "Laura apunta a Hugo desde el móvil", d: "Datos del alumno, qué quiere estudiar y qué tardes puede. Un domingo por la noche, sin llamar.", boton: "Siguiente" },
        { quien: "cliente", nombre: "Hugo, 12 años", t: "Hugo hace una prueba de nivel corta", d: "Diez minutos de preguntas que se adaptan a cómo va respondiendo. Sirve para orientar, no para aprobar o suspender.", boton: "Terminar la prueba" },
        { quien: "auto", t: "Se le propone un grupo con plazas reales", d: "Según su nivel, edad y horario. Laura reserva la plaza y acepta las normas y la protección de datos en el mismo paso.", boton: "Reservar la plaza" },
        { quien: "equipo", nombre: "Irene, directora", t: "Irene ve los grupos llenándose", d: "Sabe cuántas plazas quedan en cada grupo y cuándo conviene abrir otro. Las profesoras reciben su lista de alumnos.", boton: "Ver el resultado" }
      ],
      final: { antes: "Colas en septiembre, pruebas de nivel una a una y grupos que se descuadran.", ahora: "Las familias se matriculan solas y los grupos se forman con el nivel de cada alumno." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        var grupos = function (extra) {
          return u.tabla(["Grupo", "Horario", "Plazas"], [
            ["Inglés A2+ (11–13 años)", "L y X · 18:00", (8 + extra) + " de 10"],
            ["Inglés B1 (12–14 años)", "M y J · 18:00", "10 de 10 " + u.chip("Completo", "alerta")],
            ["Francés A1 (adultos)", "M y J · 19:30", "5 de 8"],
            ["Refuerzo de Matemáticas ESO", "V · 17:00", "6 de 8"]
          ], [extra ? "is-resaltada" : ""]);
        };
        if (x.p === 0) {
          movil = u.movil({ quien: "Móvil de Laura", hora: "21:50", titulo: "Matrícula 2026–2027", cuerpo:
            u.campos([
              ["Alumno", "Hugo García · 12 años"],
              ["Curso en el colegio", "1.º de ESO"],
              ["¿Qué quiere estudiar?", u.opc(["Inglés", "Francés", "Refuerzo"], 0)],
              ["Tardes disponibles", u.opc(["L", "M", "X", "J", "V"], [0, 2])]
            ]) + u.btn("Siguiente: prueba de nivel", true, "ancho")
          });
          cuerpo = u.kpis([["126", "matriculados"], ["38", "plazas libres"]]) + grupos(0);
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Móvil de Laura (lo usa Hugo)", hora: "21:55", titulo: "Prueba de nivel · 7 de 12", cuerpo:
            u.barra(7, 12, "Preguntas") +
            '<div class="caja anim"><p class="peq"><strong>Choose the right option:</strong></p><p>Last summer we ___ to Portugal with my cousins.</p></div>' +
            u.opc(["go", "went", "have gone", "were go"], 1) +
            '<div class="caja anim anim-2"><p class="peq"><strong>Escucha y responde</strong></p><p class="tenue">Audio de 20 segundos sobre un horario de tren.</p></div>' +
            u.btn("Terminar la prueba", true, "ancho")
          });
          cuerpo = u.kpis([["126", "matriculados"], ["38", "plazas libres"]]) + grupos(0);
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Móvil de Laura", hora: "22:01", titulo: "Grupo recomendado", cuerpo:
            '<div class="caja caja-suave anim"><p class="tenue">Nivel orientativo de Hugo</p><p class="marca-fuente" style="font-size:24px">A2 alto</p></div>' +
            '<div class="caja anim anim-2"><h5>Inglés A2+ (11–13 años)</h5><p>Lunes y miércoles, de 18:00 a 19:00 · Profesora: Sara Medina</p><p>' + u.chip("Quedan 2 plazas", "pend") + "</p></div>" +
            u.check([["Acepto las normas de la academia", "ok"], ["Acepto la política de protección de datos", "ok"], ["Autorizo fotos de Hugo en clase", "falta", "No autorizado"]]) +
            u.btn("Reservar la plaza", true, "ancho")
          });
          cuerpo = u.kpis([["126", "matriculados"], ["38", "plazas libres"]]) + grupos(0);
        } else {
          movil = u.movil({ quien: "Móvil de Laura", app: "mail", hora: "22:02", cuerpo:
            u.mail({ asunto: "Plaza reservada para Hugo", clase: " anim", cuerpo:
              "<p>¡Hola, Laura!</p><p>Hugo empieza el <strong>lunes 14 de septiembre a las 18:00</strong> en el grupo Inglés A2+ con Sara.</p><p>Te mandamos la lista de material y el calendario del curso. ¡Nos vemos!</p>" })
          });
          cuerpo = u.kpis([["127", "matriculados", "ok"], ["37", "plazas libres"]]) + grupos(1) +
            '<div class="caja caja-alerta anim anim-2"><h5>' + u.icono("alerta") + "Inglés B1 completo</h5><p>Hay 6 familias en lista de espera para M y J a las 18:00. Con 4 más se puede abrir otro grupo.</p></div>" +
            '<div class="caja caja-suave"><div class="entre"><strong>Hugo García</strong>' + u.chip("Nuevo", "marca") + '</div><p class="tenue">Nivel A2 alto · sin autorización de fotos · lista enviada a Sara</p></div>';
        }
        return movil + u.ventana({ quien: "Ordenador de Irene", seccion: x.p === 3 ? "Grupos" : "Matrículas", cuerpo: cuerpo });
      }
    },

    {
      id: "asistencia",
      nav: "Faltas y familias",
      titulo: "Las faltas, avisadas a las familias el mismo día",
      hoy: "Las profesoras pasan lista en papel. Si un alumno falta, la familia no se entera, y nadie ve quién está dejando de venir hasta que es tarde.",
      con: "La profesora pasa lista en el móvil, la familia recibe un aviso con los deberes y la academia ve quién acumula faltas.",
      ganas: ["Familias informadas al momento", "Alumnos que no se descuelgan", "Informes trimestrales sin esfuerzo"],
      pasos: [
        { quien: "equipo", nombre: "Sara, profesora", t: "Sara pasa lista en 20 segundos", d: "Desde el móvil, al empezar la clase. Hugo no ha venido.", boton: "Guardar la lista" },
        { quien: "auto", t: "La familia recibe un aviso con los deberes", d: "Laura sabe en el momento que Hugo no ha ido y tiene los deberes de hoy para que no se quede atrás.", boton: "Laura responde" },
        { quien: "auto", t: "Irene ve quién se está descolgando", d: "La falta de Hugo queda justificada. Y salta una alerta con los alumnos que acumulan faltas este mes, para llamar a tiempo.", boton: "Ver el informe trimestral" },
        { quien: "auto", t: "El informe trimestral sale solo", d: "Asistencia, progreso y un comentario de la profesora para cada familia. Sara solo escribe el comentario.", boton: "Ver el resultado" }
      ],
      final: { antes: "Listas en papel, familias que se enteran de las faltas con las notas y alumnos que se van sin avisar.", ahora: "Cada falta se avisa el mismo día y la academia llama a quien se está descolgando antes de perderlo." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        var al = function (n, ok) { return [n, ok ? "ok" : "falta", ok ? "Presente" : "No ha venido"]; };
        if (x.p === 0) {
          movil = u.movil({ quien: "Móvil de Sara", equipo: true, hora: "18:02", titulo: "Inglés A2+ · lunes 18:00", cuerpo:
            u.check([al("Carla Ruiz", true), al("Hugo García", false), al("Iker Sanz", true), al("Lola Pérez", true), al("Mateo Gil", true), al("Nora Vidal", true)]) +
            u.campos([["Deberes de hoy", "Unit 4: ejercicios 2 a 5 de la página 38"]]) +
            u.btn("Guardar la lista", true, "ancho")
          });
          cuerpo = '<p class="tenue">Esperando las listas de las clases de las 18:00…</p>';
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Móvil de Laura", app: "wa", hora: "18:03", cuerpo:
            u.ellos("Hola, Laura. Hugo no ha venido hoy a inglés (18:00). ¿Va todo bien?<br><br>Deberes de hoy: <strong>Unit 4, ejercicios 2 a 5 de la página 38</strong>.", "18:03", " anim") +
            u.respuestas(["Está enfermo", "Se nos ha olvidado", "Llamadme"], 0)
          });
          cuerpo = u.tabla(["Alumno", "Grupo", "Aviso"], [["Hugo García", "Inglés A2+", u.chip("Familia avisada", "info")], ["Pablo Ruiz", "Refuerzo Mates", u.chip("Familia avisada", "info")]], ["is-resaltada"]);
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Móvil de Laura", app: "wa", hora: "18:05", cuerpo:
            u.ellos("Hola, Laura. Hugo no ha venido hoy a inglés (18:00). ¿Va todo bien?<br><br>Deberes de hoy: <strong>Unit 4, ejercicios 2 a 5 de la página 38</strong>.", "18:03") +
            u.yo("Está enfermo, con fiebre.", "18:05") +
            u.ellos("Gracias por avisar. ¡Que se mejore! Se lo decimos a Sara.", "18:05", " anim")
          });
          cuerpo = u.tabla(["Alumno", "Grupo", "Aviso"], [["Hugo García", "Inglés A2+", u.chip("Justificada: enfermo", "ok")]]) +
            '<div class="caja caja-alerta anim anim-2"><h5>' + u.icono("alerta") + "3 alumnos con 3 o más faltas este mes</h5>" +
            u.tabla(["Alumno", "Faltas", ""], [["Nora Vidal", "4", u.btn(u.icono("telefono") + "Llamar", false, "sec")], ["Álex Moreno", "3", u.btn(u.icono("telefono") + "Llamar", false, "sec")], ["Pablo Ruiz", "3", u.btn(u.icono("telefono") + "Llamar", false, "sec")]]) + "</div>" +
            '<div class="fila">' + u.btn("Ver el informe trimestral", true) + "</div>";
        } else {
          movil = u.movil({ quien: "Móvil de Laura", app: "mail", hora: "17:00", cuerpo:
            u.mail({ asunto: "Informe del 1.er trimestre de Hugo", clase: " anim", cuerpo:
              u.kpis([["92 %", "asistencia"], ["B+", "progreso"]]) +
              "<p><strong>Comentario de Sara:</strong> Hugo participa mucho y ha mejorado la expresión oral. Tiene que repasar los verbos irregulares.</p>" })
          });
          cuerpo = '<div class="entre"><strong>Informes del 1.er trimestre</strong>' + u.chip("Enviados a 178 familias", "ok") + "</div>" +
            u.tabla(["Alumno", "Asistencia", "Comentario", ""], [
              ["Hugo García", "92 %", "Escrito por Sara", u.chip("Enviado", "ok")],
              ["Carla Ruiz", "100 %", "Escrito por Sara", u.chip("Enviado", "ok")],
              ["Nora Vidal", "71 %", "Escrito por Sara", u.chip("Enviado", "ok")]
            ]);
        }
        return movil + u.ventana({ quien: "Ordenador de Irene", seccion: "Asistencia", cuerpo: cuerpo });
      }
    },

    {
      id: "familias",
      nav: "Preguntas de familias",
      titulo: "Las preguntas de las familias, con plazas y horarios reales",
      hoy: "Horarios, plazas, precios, festivos: Irene responde el teléfono entre clase y clase y el WhatsApp los domingos.",
      con: "Un asistente responde con los grupos y plazas reales de la academia, ofrece una clase de prueba y pasa a Irene lo que necesita una persona.",
      ganas: ["Irene da clase sin interrupciones", "Ninguna pregunta sin responder", "Clases de prueba reservadas solas"],
      pasos: [
        { quien: "cliente", nombre: "Pedro, interesado", t: "Pedro pregunta un domingo", d: "Quiere aprender francés para un viaje y escribe por WhatsApp a las 11 de la mañana.", boton: "Enviar" },
        { quien: "auto", t: "Respuesta con plazas reales", d: "No es un texto fijo: consulta los grupos de verdad y le dice dónde queda sitio. Le ofrece una clase de prueba.", boton: "Reservar la clase de prueba" },
        { quien: "auto", t: "Lo que no sabe, se lo pasa a Irene", d: "Pedro pregunta por un descuento de empresa. El asistente no se lo inventa: avisa a Irene con el contexto.", boton: "Ver la bandeja de Irene" },
        { quien: "equipo", nombre: "Irene, directora", t: "El lunes, Irene lo tiene todo ordenado", d: "La clase de prueba está en la agenda del grupo y la pregunta del descuento espera con una respuesta propuesta.", boton: "Ver el resultado" }
      ],
      final: { antes: "Interrupciones en clase y mensajes del fin de semana que se contestan el lunes, cuando ya es tarde.", ahora: "Las familias tienen respuesta al momento y a Irene solo le llega lo que necesita su decisión." },
      escena: function (x) {
        var u = UI;
        var chat = u.fecha("Domingo") + u.yo("Hola, ¿tenéis clases de francés para adultos? Empiezo de cero.", "11:02", x.n(0));
        if (x.p === 0) chat += u.btn(u.icono("enviar") + "Enviar", true);
        if (x.p >= 1) chat += u.ellos("¡Hola, Pedro! Sí. Tenemos <strong>Francés A1 para adultos</strong> los martes y jueves de 19:30 a 21:00, y quedan <strong>3 plazas</strong>.<br><br>¿Quieres venir a una clase de prueba gratis este martes?", "11:02", x.n(1));
        if (x.p === 1) chat += u.respuestas(["Sí, el martes", "Prefiero otro día"], 0);
        if (x.p >= 2) chat += u.yo("Sí, el martes", "11:03") + u.ellos("Apuntado: <strong>martes a las 19:30</strong>, aula 2. Te mando la dirección.", "11:03", x.n(2)) +
          u.yo("¿Hay descuento si venimos dos de la misma empresa?", "11:05") +
          u.ellos("Eso lo decide Irene, la directora. Le paso tu pregunta y te contesta mañana.", "11:05", x.n(2));
        var movil = u.movil({ quien: "Móvil de Pedro", app: "wa", hora: "11:05", cuerpo: chat });
        var cuerpo;
        if (x.p < 2) {
          cuerpo = u.kpis([["27", "preguntas respondidas este fin de semana", "ok"], ["2", "para Irene"]]) +
            u.tabla(["Familia", "Pregunta", "Estado"], [["Marta López", "¿Hay clase el día 12?", u.chip("Respondida", "ok")], ["Javier Ros", "¿Plazas en refuerzo de Mates?", u.chip("Respondida", "ok")], ["Pedro Alonso", x.p ? "Francés para adultos" : "…", x.p ? u.chip("Respondida", "ok") : u.chip("Entrando", "info")]], ["", "", "is-resaltada"]);
        } else {
          cuerpo = '<div class="caja caja-suave"><div class="entre"><strong>Clase de prueba</strong>' + u.chip("Reservada sola", "ok") + '</div><p>Pedro Alonso · Francés A1 adultos · martes 19:30</p></div>' +
            '<div class="caja caja-ia' + x.n(2) + '"><h5>Para Irene</h5><p>Pedro Alonso pregunta si hay descuento para dos personas de la misma empresa. Viene a la clase de prueba del martes.</p></div>' +
            (x.p === 3 ? '<div class="caja anim"><h5>Respuesta propuesta</h5><p>Hola, Pedro. Sí, si os apuntáis dos personas os aplicamos un 10 % a cada uno. Lo hablamos el martes en la clase de prueba.</p></div><div class="fila">' + u.btn("Enviar", false) + u.btn("Editar", false, "sec") + "</div>" : "");
        }
        return movil + u.ventana({ quien: "Ordenador de Irene", seccion: "Familias", cuerpo: cuerpo });
      }
    },

    {
      id: "renovaciones",
      nav: "Renovaciones de junio",
      titulo: "Saber en junio quién sigue en septiembre",
      hoy: "En junio, la mitad de las familias no dice si sigue. En septiembre faltan plazas en unos grupos y sobran en otros.",
      con: "Cada familia recibe en mayo la propuesta de su grupo para el curso que viene. Con sus respuestas, la academia planifica grupos y sabe por qué se va quien se va.",
      ganas: ["Grupos planificados antes del verano", "Plazas guardadas para quien sigue", "Sabes por qué se va la gente"],
      pasos: [
        { quien: "auto", t: "En mayo, la propuesta para el curso que viene", d: "Laura recibe el grupo recomendado para Hugo el curso que viene, con prioridad sobre las familias nuevas.", boton: "Laura mantiene la plaza" },
        { quien: "auto", t: "Quien no sigue, dice por qué", d: "Una pregunta y un toque. La academia sabe si se van por horario, por precio o porque se mudan.", boton: "Ver las respuestas" },
        { quien: "equipo", nombre: "Irene, directora", t: "Irene planifica el curso con datos", d: "Ve quién sigue, quién cambia y quién no ha respondido, a quienes se les recuerda solo. Y los grupos que habrá que abrir.", boton: "Ver el resultado" }
      ],
      final: { antes: "Grupos que se organizan en septiembre a ciegas y alumnos que se van sin saber por qué.", ahora: "En junio Irene sabe cuántos grupos tendrá y qué cambiar para que no se vaya nadie más." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        if (x.p === 0) {
          movil = u.movil({ quien: "Móvil de Laura", app: "wa", hora: "10:00", cuerpo:
            u.fecha("15 de mayo") +
            u.ellos("Hola, Laura. ¡Hugo ha tenido un gran curso!<br><br>Para el curso que viene le recomendamos <strong>Inglés B1 (12–14 años)</strong>, lunes y miércoles a las 18:00, con Sara.<br><br>Las familias actuales tenéis prioridad hasta el 31 de mayo. ¿Os guardamos la plaza?", "10:00", " anim") +
            u.respuestas(["Sí, guardádnosla", "Cambiar de horario", "No seguimos"], 0)
          });
        } else {
          movil = u.movil({ quien: "Móvil de la familia Vidal", app: "wa", hora: "20:10", cuerpo:
            u.fecha("17 de mayo") +
            u.ellos("Hola, Raquel. ¿Os guardamos la plaza de Nora para el curso que viene?", "10:00") +
            u.respuestas(["Sí, guardádnosla", "Cambiar de horario", "No seguimos"], null, 2) +
            u.ellos("Gracias por decírnoslo. ¿Nos cuentas el motivo? Nos ayuda a mejorar.", "20:10", x.n(1)) +
            u.respuestas(["El horario no nos va", "El precio", "Nos mudamos", "Otro"], null, 0)
          });
        }
        var datos = x.p === 0 ? [["1", "respuestas", ""], ["179", "sin respuesta", ""]] :
          [["132", "siguen", "ok"], ["18", "cambian de grupo", ""], ["12", "no siguen", "alerta"], ["18", "sin respuesta", ""]];
        cuerpo = u.kpis(datos);
        if (x.p >= 1) {
          cuerpo += '<div class="caja' + x.n(1) + '"><h5>Por qué no siguen (12)</h5><ul class="lista-simple"><li><span>El horario no les va</span><strong>7</strong></li><li><span>Se mudan</span><strong>3</strong></li><li><span>El precio</span><strong>2</strong></li></ul></div>';
        }
        if (x.p === 1) cuerpo += '<div class="fila">' + u.btn("Ver las respuestas", true) + "</div>";
        if (x.p === 2) {
          cuerpo += '<div class="caja caja-ia anim"><h5>Para el curso que viene</h5><p>7 familias se van por el horario y 5 de ellas piden el viernes por la tarde. Con un grupo de inglés los viernes a las 17:00 podrías mantenerlas.</p><p>Inglés B1 tendrá 14 alumnos: hace falta abrir un segundo grupo.</p></div>' +
            u.tabla(["Sin respuesta", "Recordatorios", ""], [["Familia Ortiz", "2", u.chip("Se le recuerda el lunes", "info")], ["Familia Sanz", "2", u.chip("Se le recuerda el lunes", "info")]]);
        }
        return movil + u.ventana({ quien: "Ordenador de Irene", seccion: "Alumnos", cuerpo: '<div class="entre"><strong>Renovaciones 2026–2027</strong>' + u.chip("Plazo: 31 de mayo", "marca") + "</div>" + cuerpo });
      }
    }
  ]
});
