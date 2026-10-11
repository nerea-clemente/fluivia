/* Demo · Gestoría (ejemplo ficticio) */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "gestoria",
  etiqueta: "Gestoría",
  tipo: "Gestoría y asesoría",
  negocio: "Gestoría Ribera",
  lema: "Asesoría fiscal, laboral y contable desde 1998",
  cliente: "Cliente",
  software: { actual: "tu programa de contabilidad y tu portal de cliente", medida: "un portal de cliente y un panel a medida" },
  marca: {
    m1: "#1F3A5F", m1t: "#FFFFFF", m2: "#E6DDBF", m2t: "#1F3A5F", suave: "#F2F4F8", tinta: "#1B2533",
    fuente: "'Lora', Georgia, serif", radio: "6px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="8" fill="#1F3A5F"/><path d="M13 30V10h8.5a6 6 0 0 1 0 12H13m7.5 0 7 8" fill="none" stroke="#C9A227" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  panel: ["Cierre trimestral", "Clientes", "Facturas recibidas", "Consultas", "Altas"],
  situacion: "Cinco personas llevan la contabilidad, los impuestos y las nóminas de unos 140 autónomos y pequeñas empresas. Cada trimestre se repite la misma carrera hasta el día 20.",
  dolores: [
    ["Perseguir la documentación", "Cada trimestre, mensajes uno a uno a 140 clientes para que manden facturas y extractos. Y un Excel para apuntar quién falta."],
    ["Facturas en mil formatos", "Fotos de tickets, PDF, papeles arrugados. Alguien las teclea una a una en el programa de contabilidad."],
    ["Las mismas preguntas", "«¿Hasta cuándo tengo para el IVA?», «¿Me puedo desgravar el coche?». A cualquier hora y por WhatsApp."],
    ["Altas que se alargan", "Para dar de alta a un cliente nuevo hacen falta varios correos y siempre falta un papel."]
  ],
  casos: [
    {
      id: "cierre",
      montaje: { plazo: "2 a 3 semanas", con: "Tu portal de cliente o uno nuevo, con WhatsApp y correo" },
      nav: "Documentación del trimestre",
      titulo: "La documentación del trimestre, sin perseguir a nadie",
      hoy: "Ana manda 140 mensajes uno a uno y apunta en un Excel quién ha enviado qué. Los últimos días antes del 20 son una carrera.",
      con: "Cada cliente recibe su lista personalizada y un enlace a su área. Los recordatorios salen solos y solo piden lo que falta.",
      ganas: ["Dejas de perseguir clientes", "Sabes quién falta de un vistazo", "Menos prisas el día 20"],
      pasos: [
        { quien: "auto", t: "El 1 de octubre sale el aviso a todos", d: "Cada cliente recibe lo que necesita según su caso. A Carlos, fontanero autónomo, le piden sus facturas emitidas, las de gastos y el extracto del banco.", boton: "Carlos abre su área" },
        { quien: "cliente", nombre: "Carlos, autónomo", t: "Carlos sube lo que tiene desde el móvil", d: "Hace fotos o sube los PDF. La gestoría lo ve al momento en su panel, sin buscar en el correo ni en WhatsApp.", boton: "Subir los documentos" },
        { quien: "auto", t: "El recordatorio solo pide lo que falta", d: "Cinco días después, a Carlos le llega un aviso con lo único que le queda: el extracto de septiembre.", boton: "Carlos sube el extracto" },
        { quien: "equipo", nombre: "Ana, gestora", t: "Ana ve quién está completo y quién no", d: "En vez de revisar 140 conversaciones, mira una lista. Solo tiene que llamar a los pocos que no responden.", boton: "Ver el resultado" }
      ],
      final: { antes: "140 mensajes a mano, un Excel y llamadas los últimos días.", ahora: "La mayoría lo sube solo y Ana llama únicamente a 6 personas." },
      escena: function (x) {
        var u = UI, movil;
        var docs = function (a, b, c) {
          return u.check([
            ["Facturas emitidas (julio a septiembre)", a ? "ok" : "pend", a ? "3 archivos subidos" : ""],
            ["Facturas de gastos", b ? "ok" : "pend", b ? "11 fotos subidas" : ""],
            ["Extracto del banco de septiembre", c ? "ok" : "pend", c ? "1 PDF subido" : ""]
          ]);
        };
        if (x.p === 0) {
          movil = u.movil({ quien: "Móvil de Carlos", app: "wa", hora: "9:00", cuerpo:
            u.fecha("1 de octubre") +
            u.ellos("Hola, Carlos. Empieza el cierre del <strong>3.er trimestre</strong>. Para preparar tu IVA y tu pago fraccionado necesitamos:<br>· Facturas emitidas de julio a septiembre<br>· Facturas de gastos<br>· Extracto del banco<br><br>Plazo para enviarlo: <strong>15 de octubre</strong>." + u.btn("Abrir mi área de cliente", true), "9:00", " anim")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Móvil de Carlos", hora: "19:40", titulo: "Mi área de cliente", cuerpo:
            '<div class="caja caja-suave"><strong>Cierre del 3.er trimestre</strong><p class="tenue">Plazo para enviarlo: 15 de octubre</p></div>' +
            docs(false, false, false) +
            '<div class="dos">' + u.btn(u.icono("camara") + "Hacer foto", false, "sec") + u.btn(u.icono("subir") + "Subir archivo", false, "sec") + "</div>" +
            u.btn("Subir los documentos", true, "ancho")
          });
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Móvil de Carlos", app: "wa", hora: "9:00", cuerpo:
            u.fecha("6 de octubre") +
            u.ellos("Hola, Carlos. Ya tenemos tus facturas, gracias. <strong>Solo nos falta el extracto del banco de septiembre.</strong> Puedes subirlo aquí hasta el 15." + u.btn("Subir el extracto", true), "9:00", " anim")
          });
        } else {
          movil = u.movil({ quien: "Móvil de Carlos", hora: "9:12", titulo: "Mi área de cliente", cuerpo:
            '<div class="caja caja-suave"><strong>Cierre del 3.er trimestre</strong><p class="tenue">Plazo para enviarlo: 15 de octubre</p></div>' +
            '<div class="anim">' + docs(true, true, true) + "</div>" +
            '<div class="caja anim anim-2"><h5>' + u.icono("check") + "Lo tienes todo</h5><p>Ana prepara tu declaración y te avisa antes de presentarla.</p></div>"
          });
        }

        var filaCarlos = x.p === 0 ? ["Carlos Méndez", "Fontanero · autónomo", "0 de 3", u.chip("Aviso enviado", "info")]
          : x.p === 1 ? ["Carlos Méndez", "Fontanero · autónomo", "2 de 3", u.chip("Falta el extracto", "pend")]
          : x.p === 2 ? ["Carlos Méndez", "Fontanero · autónomo", "2 de 3", u.chip("Recordatorio enviado", "info")]
          : ["Carlos Méndez", "Fontanero · autónomo", "3 de 3", u.chip("Completo", "ok")];
        var listos = [0, 61, 98, 134][x.p];
        var cuerpo = u.barra(listos, 140, "Clientes con toda la documentación") +
          u.kpis([["140", "avisos enviados"], [String(listos), "completos", "ok"], [String(140 - listos), "les falta algo"]]);
        if (x.p < 3) {
          cuerpo += u.tabla(["Cliente", "Actividad", "Documentos", "Estado"], [
            filaCarlos,
            ["Lucía Ortega", "Peluquería · autónoma", x.p ? "3 de 3" : "0 de 3", x.p ? u.chip("Completo", "ok") : u.chip("Aviso enviado", "info")],
            ["Talleres Ruiz SL", "Taller mecánico", x.p > 1 ? "4 de 4" : "1 de 4", x.p > 1 ? u.chip("Completo", "ok") : u.chip("Faltan 3", "pend")],
            ["Bea Torres", "Diseñadora · autónoma", "0 de 3", u.chip(x.p ? "Recordatorio enviado" : "Aviso enviado", "info")]
          ], ["is-resaltada"]);
        } else {
          cuerpo += '<p class="peq anim"><strong>A estos 6 no les han bastado los recordatorios</strong></p>' +
            '<div class="anim">' + u.tabla(["Cliente", "Le falta", "Recordatorios", ""], [
              ["Bea Torres", "Todo", "3", u.btn(u.icono("telefono") + "Llamar", false, "sec")],
              ["Hnos. Gil CB", "Facturas de gastos", "3", u.btn(u.icono("telefono") + "Llamar", false, "sec")],
              ["Jorge Pardo", "Extracto del banco", "3", u.btn(u.icono("telefono") + "Llamar", false, "sec")]
            ]) + '</div><p class="tenue">Y 3 más.</p>';
        }
        return movil + u.ventana({ quien: "Ordenador de Ana", seccion: "Cierre trimestral", cuerpo: cuerpo });
      }
    },

    {
      id: "facturas",
      montaje: { plazo: "3 a 4 semanas", con: "Exporta al formato de tu programa de contabilidad" },
      nav: "Facturas que se leen solas",
      titulo: "Facturas de gastos que se leen solas",
      hoy: "Los clientes mandan fotos de tickets y PDF. Alguien del equipo los abre uno a uno y teclea los datos en el programa de contabilidad.",
      con: "Cada factura se lee al llegar: proveedor, NIF, fecha, base, IVA y total, con la cuenta contable propuesta. El equipo solo revisa las dudosas.",
      ganas: ["Mucho menos tecleo", "Menos errores al pasar datos", "Las dudas, señaladas"],
      pasos: [
        { quien: "cliente", nombre: "Carlos, autónomo", t: "Carlos hace una foto al ticket", d: "Desde su área o reenviándolo por WhatsApp. No tiene que ordenar nada.", boton: "Enviar la foto" },
        { quien: "auto", t: "Los datos se sacan solos", d: "Se lee la factura y se rellenan los datos contables, con la cuenta propuesta según la actividad de Carlos.", boton: "Ver la bandeja" },
        { quien: "equipo", nombre: "Equipo de contabilidad", t: "El equipo solo mira las dudosas", d: "De 46 facturas, 41 están claras. Las 5 dudosas vienen con el motivo: un ticket sin NIF, un IVA que no cuadra, una comida que puede ser personal.", boton: "Revisar la dudosa" },
        { quien: "equipo", nombre: "Equipo de contabilidad", t: "Todo pasa al programa de contabilidad", d: "Con un botón se genera el fichero para importarlo. Nadie ha tecleado una factura.", boton: "Ver el resultado" }
      ],
      final: { antes: "Horas tecleando facturas cada trimestre, con errores al pasar los datos.", ahora: "Las facturas llegan leídas y el equipo dedica su tiempo a las 5 que tienen dudas." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        var recibo = u.recibo({ comercio: "FERRETERÍA INDUSTRIAL SUR", dato: "B-41234567 · 12/09/2026", lineas: [["Tubo multicapa 20 mm x10", "38,50"], ["Codos latón x12", "26,40"], ["Cinta teflón x6", "17,50"]], total: "99,70 €" });
        if (x.p === 0) {
          movil = u.movil({ quien: "Móvil de Carlos", hora: "13:10", titulo: "Subir gasto", cuerpo:
            '<div class="caja caja-suave" style="display:grid;place-items:center;padding:22px 10px">' + recibo + "</div>" +
            '<p class="tenue">Foto lista. No hace falta que rellenes nada.</p>' +
            u.btn(u.icono("enviar") + "Enviar a la gestoría", true, "ancho")
          });
          cuerpo = u.kpis([["45", "facturas recibidas este trimestre"], ["40", "listas"], ["5", "dudosas", "alerta"]]) +
            '<p class="tenue">Esperando facturas nuevas…</p>';
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Móvil de Carlos", hora: "13:10", titulo: "Subir gasto", cuerpo:
            '<div class="caja caja-suave"><h5>' + u.icono("check") + "Recibida</h5><p>Ferretería Industrial Sur · 99,70 €</p></div>"
          });
          cuerpo = '<div class="dos"><div style="display:grid;place-items:center">' + recibo + "</div>" +
            '<div class="anim">' + u.ficha([
              ["Proveedor", "Ferretería Industrial Sur"], ["NIF", "B-41234567"], ["Fecha", "12/09/2026"],
              ["Base imponible", "82,40 €"], ["IVA 21 %", "17,30 €"], ["Total", "99,70 €"],
              ["Cuenta propuesta", "600 · Compras de materiales"]
            ]) + "</div></div>" +
            '<div class="fila anim anim-2">' + u.chip("Lectura clara", "ok") + u.chip("Cuadra base + IVA", "ok") + "</div>" +
            '<div class="fila">' + u.btn("Ver la bandeja", true) + "</div>";
        } else if (x.p === 2) {
          cuerpo = u.kpis([["46", "facturas recibidas"], ["41", "listas", "ok"], ["5", "dudosas", "alerta"]]) +
            u.tabla(["Proveedor", "Total", "Motivo", ""], [
              ["Restaurante El Puerto", "64,80 €", u.chip("¿Comida con clientes o personal?", "pend"), u.btn("Revisar", true, "sec")],
              ["Gasolinera N-IV", "52,00 €", u.chip("Ticket sin NIF", "pend"), ""],
              ["Tienda online", "18,99 €", u.chip("IVA no cuadra", "pend"), ""],
              ["Ferretería Industrial Sur", "99,70 €", u.chip("Lista", "ok"), ""]
            ], ["is-resaltada"]);
          movil = "";
        } else {
          cuerpo = u.kpis([["46", "facturas recibidas"], ["46", "revisadas", "ok"], ["0", "tecleadas a mano"]]) +
            '<div class="caja caja-suave anim"><h5>' + u.icono("descarga") + "Exportado al programa de contabilidad</h5><p>46 apuntes de Carlos Méndez · 3.er trimestre. Fichero listo para importar.</p></div>" +
            u.nota("Lo dudoso nunca se contabiliza solo: lo decide una persona del equipo.");
          movil = "";
        }
        if (x.p === 2) {
          cuerpo += '<div class="caja caja-alerta anim"><h5>' + u.icono("alerta") + "Restaurante El Puerto · 64,80 €</h5><p>Martes 14:30, dos menús. Carlos no ha indicado con quién fue. Si es personal, no se deduce.</p></div>" +
            u.respuestas(["Comida con cliente", "Gasto personal", "Preguntar a Carlos"], null);
        }
        return movil + u.ventana({ quien: "Ordenador del equipo", seccion: "Facturas recibidas", cuerpo: cuerpo });
      }
    },

    {
      id: "consultas",
      montaje: { plazo: "2 semanas", con: "WhatsApp Business y el calendario fiscal de cada cliente" },
      nav: "Consultas de clientes",
      titulo: "Las preguntas de siempre, respondidas a cualquier hora",
      hoy: "Por WhatsApp entran las mismas preguntas a cualquier hora. Responderlas interrumpe el trabajo y lo que es asesoramiento se mezcla con lo que no.",
      con: "Un asistente responde lo general con los datos de la gestoría y del propio cliente. Lo que es asesoramiento lo pasa a Ana con un resumen.",
      ganas: ["Menos interrupciones", "Respuestas al momento", "El asesoramiento lo sigue dando Ana"],
      pasos: [
        { quien: "cliente", nombre: "Lucía, peluquera", t: "Lucía pregunta a las 22:40", d: "Una duda de calendario que se repite cientos de veces cada trimestre.", boton: "Enviar la pregunta" },
        { quien: "auto", t: "Respuesta al momento, con sus datos", d: "No es una respuesta genérica: sabe que Lucía tiene domiciliado el IVA y que le falta un documento.", boton: "Hacer una pregunta delicada" },
        { quien: "auto", t: "Lo que es asesoramiento, a Ana", d: "Si conviene pasar a sociedad depende de su caso. El asistente no opina: se lo pasa a Ana con un resumen y los datos útiles.", boton: "Ver la bandeja de Ana" },
        { quien: "equipo", nombre: "Ana, gestora", t: "Ana responde con todo delante", d: "Ve la pregunta, el contexto y una propuesta de respuesta para dar cita. Decide ella.", boton: "Ver el resultado" }
      ],
      final: { antes: "Ana contesta WhatsApps sobre plazos por la noche y entre declaración y declaración.", ahora: "Las dudas de calendario se responden solas y a Ana solo le llega lo que necesita su criterio." },
      escena: function (x) {
        var u = UI;
        var chat = u.fecha("Hoy") + u.yo("Hola, ¿hasta cuándo tengo para el IVA de este trimestre?", "22:40", x.n(0));
        if (x.p === 0) chat += u.btn(u.icono("enviar") + "Enviar", true);
        if (x.p >= 1) chat += u.ellos("Hola, Lucía. El plazo del IVA del 3.er trimestre acaba el <strong>20 de octubre</strong>. Como lo tienes domiciliado, el cargo será ese día.<br><br>Para prepararlo nos falta tu <strong>extracto del banco de septiembre</strong>. ¿Lo subes antes del 15?", "22:40", x.n(1));
        if (x.p === 1) chat += u.respuestas(["¿Me compensa pasarme a sociedad limitada?"], 0);
        if (x.p >= 2) chat += u.yo("Otra cosa: ¿me compensa pasarme a sociedad limitada?", "22:42") +
          u.ellos("Eso depende de tus números y de tus planes, y lo tiene que ver Ana. Le he pasado tu pregunta y te escribe mañana para buscar un hueco.", "22:42", x.n(2));
        var movil = u.movil({ quien: "Móvil de Lucía", app: "wa", hora: "22:42", cuerpo: chat });
        if (x.p < 2) {
          return movil + u.ventana({ quien: "Ordenador de Ana", seccion: "Consultas", cuerpo:
            u.kpis([["31", "consultas respondidas solas esta semana", "ok"], ["6", "pasadas a Ana"]]) +
            u.tabla(["Cliente", "Pregunta", "Estado"], [
              ["Lucía Ortega", x.p ? "¿Hasta cuándo tengo para el IVA?" : "…", x.p ? u.chip("Respondida sola", "ok") : u.chip("Entrando", "info")],
              ["Carlos Méndez", "¿Puedo pagar el IVA a plazos?", u.chip("Respondida sola", "ok")],
              ["Talleres Ruiz SL", "¿Cuándo llegan las nóminas?", u.chip("Respondida sola", "ok")]
            ], [x.p ? "is-resaltada" : ""])
          });
        }
        return movil + u.ventana({ quien: "Ordenador de Ana", seccion: "Consultas", cuerpo:
          '<div class="entre"><strong>Lucía Ortega · peluquería</strong>' + u.chip("Para Ana", "pend") + "</div>" +
          '<div class="caja caja-ia' + x.n(2) + '"><h5>Resumen</h5><p>Pregunta si le compensa pasar a sociedad limitada. Autónoma desde 2019, facturación de unos 68.000 € al año, una empleada. Comentó en junio que quiere abrir un segundo local.</p></div>' +
          (x.p === 3 ? '<div class="caja anim"><h5>Respuesta propuesta</h5><p>Hola, Lucía. Buena pregunta, con tus números merece la pena mirarlo con calma. ¿Te viene bien el jueves a las 10:00 y lo vemos en 30 minutos?</p></div>' +
            '<div class="fila">' + u.btn("Enviar", false) + u.btn("Editar", false, "sec") + "</div>" : "") +
          u.nota("El asistente no da asesoramiento fiscal: responde plazos y datos del cliente y deriva lo demás.")
        });
      }
    },

    {
      id: "alta",
      montaje: { plazo: "2 semanas", con: "Tu web y tu programa de gestión de clientes, o uno nuevo" },
      nav: "Alta de cliente nuevo",
      titulo: "Alta de un cliente nuevo en un día",
      hoy: "Para dar de alta a un cliente hacen falta varios correos: DNI, alta en Hacienda, certificado, datos del banco… y siempre falta algo o está caducado.",
      con: "El cliente rellena un formulario y recibe la lista exacta de lo que necesita según su caso. Los documentos se revisan al subirlos y el calendario fiscal sale solo.",
      ganas: ["Altas en un día, no en dos semanas", "Nada caducado ni a medias", "Buena primera impresión"],
      pasos: [
        { quien: "cliente", nombre: "Raúl, cliente nuevo", t: "Raúl rellena el formulario de alta", d: "Desde la web de la gestoría. Indica qué es (autónomo o sociedad), a qué se dedica y si tiene local o empleados.", boton: "Enviar el formulario" },
        { quien: "auto", t: "Le llega su lista, y solo la suya", d: "Como es autónomo con local, se le pide el DNI, el alta en Hacienda, el recibo de autónomos y el contrato del local. Nada más.", boton: "Subir los documentos" },
        { quien: "auto", t: "Los documentos se revisan al subirlos", d: "El DNI está caducado. Se le avisa en el momento, en vez de descubrirlo una semana después.", boton: "Raúl sube el DNI nuevo" },
        { quien: "equipo", nombre: "Ana, gestora", t: "Ficha completa y calendario fiscal listo", d: "Ana encuentra al cliente dado de alta con todo revisado, sus impuestos con fecha y la bienvenida enviada.", boton: "Ver el resultado" }
      ],
      final: { antes: "Dos semanas de correos para completar un alta y papeles que se descubren caducados tarde.", ahora: "El cliente lo deja todo listo en un día y Ana solo revisa y da la bienvenida." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        if (x.p === 0) {
          movil = u.movil({ quien: "Móvil de Raúl", hora: "18:30", titulo: "Hazte cliente", cuerpo:
            u.campos([
              ["Nombre", "Raúl Navas"],
              ["¿Cómo trabajas?", u.opc(["Autónomo", "Sociedad"], 0)],
              ["¿A qué te dedicas?", "Fisioterapeuta con consulta propia"],
              ["¿Tienes local?", u.opc(["Sí, alquilado", "No"], 0)],
              ["¿Tienes empleados?", u.opc(["Sí", "No"], 1)],
              ["Qué necesitas", u.opc(["Impuestos", "Contabilidad", "Nóminas"], [0, 1])]
            ]) +
            u.btn("Enviar", true, "ancho")
          });
          cuerpo = '<p class="tenue">Sin altas pendientes.</p>';
        } else {
          var dni = x.p === 1 ? ["DNI", "pend", "Por subir"] : x.p === 2 ? ["DNI", "alerta", "Caducado el 03/2026. Te hemos pedido uno en vigor.", " anim"] : ["DNI", "ok", "En vigor hasta 2035", x.n(3)];
          var lista = [
            dni,
            ["Alta en Hacienda (modelo 036)", x.p > 1 ? "ok" : "pend", x.p > 1 ? "Revisado: epígrafe correcto" : "Por subir"],
            ["Último recibo de autónomos", x.p > 1 ? "ok" : "pend", x.p > 1 ? "Revisado" : "Por subir"],
            ["Contrato de alquiler del local", x.p > 1 ? "ok" : "pend", x.p > 1 ? "Revisado: retención del 19 % al alquiler" : "Por subir"]
          ];
          if (x.p === 1) {
            movil = u.movil({ quien: "Móvil de Raúl", hora: "18:31", titulo: "Tu alta", cuerpo:
              '<p class="peq anim">Gracias, Raúl. Como eres <strong>autónomo con local alquilado</strong>, necesitamos esto:</p>' +
              '<div class="anim anim-2">' + u.check(lista) + "</div>" +
              u.btn(u.icono("subir") + "Subir documentos", true, "ancho")
            });
          } else if (x.p === 2) {
            movil = u.movil({ quien: "Móvil de Raúl", hora: "18:36", titulo: "Tu alta", cuerpo:
              u.check(lista) + u.btn(u.icono("camara") + "Hacer foto del DNI nuevo", true, "ancho")
            });
          } else {
            movil = u.movil({ quien: "Móvil de Raúl", app: "mail", hora: "9:00", cuerpo:
              u.mail({ asunto: "Bienvenido a Gestoría Ribera", clase: " anim", cuerpo:
                "<p>Hola, Raúl:</p><p>Ya eres cliente. Tu gestora es Ana Ribera. Estas son tus próximas fechas:</p><ul><li>20 de octubre: IVA y pago fraccionado</li><li>20 de octubre: retenciones del alquiler</li></ul><p>Te avisaremos antes de cada una.</p>" })
            });
          }
          cuerpo = '<div class="entre"><strong>Raúl Navas · fisioterapeuta</strong>' + u.chip(x.p === 3 ? "Alta completa" : "Alta en curso", x.p === 3 ? "ok" : "pend") + "</div>" +
            u.ficha([["Tipo", "Autónomo con local alquilado"], ["Servicios", "Impuestos y contabilidad"], ["Gestora", "Ana Ribera"]]) +
            u.check(lista);
          if (x.p === 3) {
            cuerpo += '<div class="caja caja-suave anim anim-2"><h5>' + u.icono("calendario") + "Calendario fiscal creado</h5>" +
              '<ul class="lista-simple"><li><span>Modelo 303 · IVA</span><strong>Trimestral</strong></li><li><span>Modelo 130 · pago fraccionado</span><strong>Trimestral</strong></li><li><span>Modelo 115 · retenciones del alquiler</span><strong>Trimestral</strong></li><li><span>Renta</span><strong>Anual</strong></li></ul></div>';
          }
        }
        return movil + u.ventana({ quien: "Ordenador de Ana", seccion: "Altas", cuerpo: cuerpo });
      }
    }
  ]
});
