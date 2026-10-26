/* Demo · Academia (ejemplo ficticio) */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "academia",
  etiqueta: "Academia",
  tipo: "Academia de idiomas y refuerzo",
  negocio: "Academia Nexo",
  lema: "Idiomas y refuerzo escolar en grupos reducidos",
  cliente: "Familia",
  software: { actual: "tu programa de gestión de alumnos", medida: "una gestión de grupos, alumnos y familias a medida" },
  marca: {
    m1: "#4B3FD1", m1t: "#FFFFFF", m2: "#FFE08A", m2t: "#2A2272", suave: "#F3F1FF", tinta: "#221C4F",
    fuente: "'Nunito', 'Trebuchet MS', sans-serif", radio: "18px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="20" fill="#4B3FD1"/><path d="M13.5 27V14l13 13V14" fill="none" stroke="#FFC93C" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  panel: ["Exámenes", "Grupos", "Alumnos", "Asistencia", "Matrículas"],
  situacion: "Unos 180 alumnos, de primaria a adultos, en 22 grupos de inglés, francés y refuerzo. Cuatro grupos, de jóvenes y de adultos, preparan exámenes de Cambridge. Irene dirige la academia y también da clase; en septiembre y en junio no da abasto.",
  dolores: [
    ["Simulacros que nadie corrige a tiempo", "Los grupos de B2 y C1 piden exámenes de práctica, pero corregirlos lleva tardes enteras. Y la nota llega cuando ya no sirve."],
    ["Septiembre es una locura", "Las matrículas llegan en papel, hay que llamar para saber el nivel y los grupos se llenan sin que nadie se entere a tiempo."],
    ["Faltas que nadie avisa", "Si un alumno falta, la familia se entera cuando llegan las notas. Y nadie ve quién está dejando de venir."],
    ["Junio sin saber quién sigue", "Media academia no confirma si sigue el curso que viene y los grupos se organizan a ciegas."]
  ],
  casos: [
    {
      id: "examenes",
      montaje: { plazo: "3 a 4 semanas", con: "Tu web, tus grupos y los ejercicios que prepara tu profesorado" },
      nav: "Exámenes de práctica",
      titulo: "Exámenes de práctica al estilo de Cambridge que se corrigen solos",
      hoy: "Los grupos de B2 y C1 piden simulacros, pero corregirlos se come las tardes del profesorado. Y hasta el examen nadie sabe bien quién va justo en Listening.",
      con: "Los alumnos hacen exámenes de práctica al estilo de B2 First y C1 Advanced desde el móvil o el portátil. Se corrigen solos, con explicación, y la academia ve cómo va cada grupo en cada parte.",
      pasos: [
        { quien: "cliente", nombre: "Lucía, 16 años", t: "Lucía hace el Use of English desde el móvil", d: "Huecos con cuatro opciones y formación de palabras. Cada respuesta se corrige al momento y le dice por qué.", boton: "Pasar al Reading" },
        { quien: "cliente", nombre: "Lucía, 16 años", t: "El Reading, con la pista en el texto", d: "Un texto corto y sus preguntas. Si falla, ve la frase del texto donde estaba la respuesta.", boton: "Pasar al Listening" },
        { quien: "cliente", nombre: "Lucía, 16 años", t: "El Listening, como en el examen", d: "Lo escucha dos veces y escribe lo que oye. Aquí las respuestas se corrigen al terminar, no antes.", boton: "Terminar el examen" },
        { quien: "auto", t: "Nota por partes, banda estimada y qué repasar", d: "Lucía ve que va camino del B2 y en qué falla más. Ana, su profesora, lo ve a la vez en el panel.", boton: "Ver cómo van los grupos" },
        { quien: "equipo", nombre: "Ana, profesora", t: "Ana ve quién necesita ayuda y asigna la siguiente práctica", d: "Por grupos y por partes. El Listening flojea en B2 jóvenes, así que les manda un examen nuevo y práctica extra de esa parte.", boton: "Asignar al grupo" }
      ],
      final: { antes: "Simulacros en papel que se corrigen en casa, días después, y alumnos que llegan al examen sin saber qué les falla.", ahora: "Cada práctica se corrige al momento y Ana prepara la siguiente según lo que flojea cada grupo." },
      escena: function (x) {
        var u = UI, movil, cuerpo, p = x.p;
        var titulo = "Examen 4 · " + ["Use of English", "Reading", "Listening"][Math.min(p, 2)] + " · " + (p + 1) + " de 3";

        if (p === 0) {
          movil = u.movil({ quien: "Móvil de Lucía", hora: "17:40", titulo: titulo, cuerpo:
            '<div class="caja anim"><p class="peq"><strong>Part 1 · Elige la palabra que falta</strong></p><p>On her first night in Dublin, Marta ___ up a conversation with the woman next door.</p>' + u.opc(["A struck", "B made", "C took", "D set"], 1) + "</div>" +
            u.check([["Era «struck», no «made»", "falta", "Se dice «strike up a conversation»: empezar a hablar con alguien. «Make» va con «friends».", " anim anim-2"]]) +
            '<div class="caja"><p class="peq"><strong>Part 3 · Forma la palabra</strong></p><p>Losing the final was a huge ___ for the team. <span class="tenue">(DISAPPOINT)</span></p></div>' +
            u.check([["disappointment", "ok", "Bien: después de «a huge» va un sustantivo."]]) +
            u.btn("Pasar al Reading", true, "ancho")
          });
        } else if (p === 1) {
          movil = u.movil({ quien: "Móvil de Lucía", hora: "17:52", titulo: titulo, cuerpo:
            '<div class="caja anim"><p class="peq"><strong>The night library</strong></p><p class="peq">Every Thursday, the library in Hartfield stays open until midnight. Students asked for it: they had nowhere quiet to revise. «We expected five people,» says Joan, the librarian. «Forty <mark>turned up</mark>.»</p></div>' +
            '<div class="fila">' + u.chip("1 ✓", "ok") + u.chip("2 ✓", "ok") + u.chip("3 ✗", "alerta") + u.chip("4 …", "info") + "</div>" +
            '<div class="caja"><p class="peq"><strong>3. What does «turned up» mean?</strong></p>' + u.opc(["A arrived", "B left", "C complained", "D signed up"], 3) + "</div>" +
            u.check([["Era «arrived», no «signed up»", "falta", "«Turn up» es aparecer, llegar: esperaban a cinco y llegaron cuarenta. «Sign up» es apuntarse.", " anim anim-2"]]) +
            u.btn("Pasar al Listening", true, "ancho")
          });
        } else if (p === 2) {
          movil = u.movil({ quien: "Móvil de Lucía", hora: "18:05", titulo: titulo, cuerpo:
            '<div class="caja caja-suave anim"><div style="display:flex;gap:12px;align-items:center">' +
              '<span style="display:grid;place-items:center;width:44px;height:44px;flex:none;border-radius:50%;background:var(--m1);color:var(--m1t)"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg></span>' +
              '<div style="flex:1;min-width:0"><strong class="peq">Part 2 · Una ruta en bici por el río</strong>' +
              '<div class="barra-fondo" style="margin:7px 0 4px"><i style="width:58%"></i></div>' +
              '<div class="entre tenue"><span>1:52</span><span>3:15</span></div></div></div>' +
              '<p class="tenue" style="margin-top:8px">Segunda escucha de dos, como en el examen.</p></div>' +
            u.campos([
              ["6. The tour starts at the old ___ station.", "railway"],
              ["7. Riders must bring their own ___.", "helmet"],
              ["8. The longest stop is for a ___ by the water.", "picnic"]
            ]) +
            '<p class="tenue">Las respuestas se corrigen cuando termines.</p>' +
            u.btn("Terminar el examen", true, "ancho")
          });
        } else if (p === 3) {
          movil = u.movil({ quien: "Móvil de Lucía", hora: "18:14", titulo: "Resultado · Examen 4", cuerpo:
            '<div class="caja caja-suave anim" style="text-align:center"><p class="tenue">Banda estimada</p><p class="marca-fuente" style="font-size:24px;line-height:1.2">Vas camino del B2</p><p class="tenue">Unos 166 puntos. El B2 empieza en 160.</p></div>' +
            u.barra(20, 28, "Use of English") + u.barra(31, 42, "Reading") + u.barra(17, 30, "Listening") +
            u.check([["Listening 7: era «water bottle»", "falta", "Pusiste «helmet», pero el casco lo dan ellos: «Just bring a water bottle.»", " anim anim-2"]]) +
            '<div class="caja caja-alerta anim anim-2"><h5>' + u.icono("alerta") + 'Para repasar</h5><ul class="lista-simple"><li><span>Listening Part 2</span><strong>3 fallos</strong></li><li><span>Phrasal verbs con «up»</span><strong>2 fallos</strong></li></ul></div>'
          });
        } else {
          movil = u.movil({ quien: "Móvil de Lucía", hora: x.fin ? "19:02" : "18:30", titulo: "Mis exámenes", cuerpo:
            (x.fin ? u.aviso("Nueva práctica de Ana", "Examen 5 y un Listening Part 2 extra. Para el viernes.", " anim") : "") +
            u.grafico([5.1, 5.8, 6.4, 6.9], ["Ex. 1", "Ex. 2", "Ex. 3", "Ex. 4"], "Tu nota en cada examen (sobre 10)") +
            u.check([
              ["Examen 4", "ok", "6,9 · camino del B2"],
              ["Examen 3", "ok", "6,4 · B1 alto"],
              x.fin ? ["Examen 5", "pend", "Asignado por Ana · para el viernes", " anim"] : ["Examen 5", "pend", "Todavía sin asignar"]
            ])
          });
        }

        if (p < 3) {
          var luc = [
            "<strong>Lucía Ortega</strong>",
            p === 0 ? u.chip("Haciéndolo", "info") : "71 %",
            p === 0 ? "—" : p === 1 ? u.chip("Haciéndolo", "info") : "74 %",
            p < 2 ? "—" : u.chip("Haciéndolo", "info"),
            "—"
          ];
          cuerpo = '<div class="entre"><strong>Examen 4 · B2 First jóvenes</strong>' + u.chip("Para el viernes", "marca") + "</div>" +
            u.kpis([["8 de 12", "entregados"], ["1", "haciéndolo ahora", "ok"], ["3", "sin empezar"]]) +
            u.tabla(["Alumno", "Use of English", "Reading", "Listening", "Banda"], [
              luc,
              ["Mateo Gil", "86 %", "83 %", "80 %", u.chip("B2 alto", "ok")],
              ["Iker Sanz", "79 %", "77 %", "55 %", u.chip("B2", "ok")],
              ["Nora Vidal", "63 %", "70 %", "48 %", u.chip("B1 alto", "pend")],
              ["Álex Moreno", "60 %", "58 %", "52 %", u.chip("B1 alto", "pend")]
            ], ["is-resaltada"]) +
            '<p class="tenue">Ejercicios propios de la academia, al estilo de B2 First. No es material oficial de Cambridge.</p>';
        } else if (p === 3) {
          cuerpo = '<div class="entre"><strong>Examen 4 · B2 First jóvenes</strong>' + u.chip("Para el viernes", "marca") + "</div>" +
            u.kpis([["9 de 12", "entregados", "ok"], ["0", "haciéndolo ahora"], ["3", "sin empezar"]]) +
            u.tabla(["Alumno", "Use of English", "Reading", "Listening", "Banda"], [
              ["<strong>Lucía Ortega</strong>", "71 %", "74 %", "57 %", u.chip("B2", "ok")],
              ["Mateo Gil", "86 %", "83 %", "80 %", u.chip("B2 alto", "ok")],
              ["Iker Sanz", "79 %", "77 %", "55 %", u.chip("B2", "ok")],
              ["Nora Vidal", "63 %", "70 %", "48 %", u.chip("B1 alto", "pend")],
              ["Álex Moreno", "60 %", "58 %", "52 %", u.chip("B1 alto", "pend")]
            ], ["is-resaltada"]) +
            '<div class="caja caja-ia anim anim-2"><h5>En este grupo</h5><p>El Listening es la parte más floja: 58 % de media. Casi todos los fallos son en la Part 2, al copiar datos concretos.</p></div>' +
            '<div class="fila">' + u.btn("Ver cómo van los grupos", true) + "</div>";
        } else {
          cuerpo = '<div class="entre"><strong>Cómo van los grupos</strong>' + u.chip("Examen 4", "info") + "</div>" +
            u.tabla(["Grupo", "Use of English", "Reading", "Listening", "Media"], [
              ["B2 First jóvenes (12)", "72 %", "75 %", u.chip("58 %", "alerta"), "B2 justo"],
              ["B2 First adultos (9)", "68 %", "80 %", "71 %", "B2"],
              ["C1 Advanced adultos (7)", u.chip("61 %", "alerta"), "78 %", "74 %", "C1 justo"]
            ], ["is-resaltada"]) +
            '<div class="caja caja-alerta"><h5>' + u.icono("alerta") + 'Quién necesita ayuda</h5><ul class="lista-simple">' +
              "<li><span>Listening Part 2 · B2 jóvenes</span><strong>Lucía, Nora, Álex, Iker</strong></li>" +
              "<li><span>Word formation · C1 adultos</span><strong>Pilar, Andrés</strong></li></ul></div>" +
            '<div class="caja' + (x.fin ? " caja-suave" : " anim") + '"><h5>Siguiente práctica</h5>' +
              u.campos([
                ["Grupo", "B2 First jóvenes · 12 alumnos"],
                ["Qué les mandas", u.opc(["Examen 5 completo", "Listening Part 2 extra", "Word formation"], [0, 1])],
                ["Para", "Viernes 6 de noviembre"]
              ]) +
              '<div class="fila" style="margin-top:10px">' + (x.fin ? u.chip("Asignado a 12 alumnos", "ok") + '<span class="tenue">Les ha llegado al móvil</span>' : u.btn("Asignar al grupo", true)) + "</div></div>";
        }
        return movil + u.ventana({ quien: "Ordenador de Ana, profesora", seccion: "Exámenes", cuerpo: cuerpo });
      }
    },

    {
      id: "matricula",
      montaje: { plazo: "3 semanas", con: "Tu web, tu programa de gestión y la domiciliación que ya usas" },
      nav: "Matrícula online",
      titulo: "Matrícula online con prueba de nivel",
      hoy: "Las familias vienen a la academia, rellenan papeles y hay que hacerles una prueba de nivel en persona antes de decirles en qué grupo entran.",
      con: "La familia matricula desde el móvil con sus datos, una prueba de nivel corta, el grupo recomendado con plazas libres y la firma de las normas. La academia lo ve todo ordenado.",
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
      montaje: { plazo: "2 semanas", con: "Una app web para el profesorado y WhatsApp" },
      nav: "Faltas y familias",
      titulo: "Las faltas, avisadas a las familias el mismo día",
      hoy: "Las profesoras pasan lista en papel. Si un alumno falta, la familia no se entera, y nadie ve quién está dejando de venir hasta que es tarde.",
      con: "La profesora pasa lista en el móvil, la familia recibe un aviso con los deberes y la academia ve quién acumula faltas.",
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
      id: "renovaciones",
      montaje: { plazo: "1 a 2 semanas", con: "WhatsApp o correo y tu lista de alumnos" },
      nav: "Renovaciones de junio",
      titulo: "Saber en junio quién sigue en septiembre",
      hoy: "En junio, la mitad de las familias no dice si sigue. En septiembre faltan plazas en unos grupos y sobran en otros.",
      con: "Cada familia recibe en mayo la propuesta de su grupo para el curso que viene. Con sus respuestas, la academia planifica grupos y sabe por qué se va quien se va.",
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
