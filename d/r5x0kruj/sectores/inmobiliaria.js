/* Demo · Inmobiliaria (ejemplo ficticio) */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "inmobiliaria",
  etiqueta: "Inmobiliaria",
  tipo: "Agencia inmobiliaria",
  negocio: "Inmobiliaria Brisa",
  lema: "Tu casa, sin prisas y sin sorpresas",
  cliente: "Comprador",
  software: { actual: "tu CRM inmobiliario y los portales", medida: "un CRM a medida para tu forma de trabajar" },
  marca: {
    m1: "#C2553D", m1t: "#FFFFFF", m2: "#F6D9BE", m2t: "#3A2620", suave: "#F8F2EC", tinta: "#2B2220",
    fuente: "'DM Serif Display', Georgia, serif", radio: "14px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#C2553D"/><path d="M9 20 20 11l11 9M13 17.5V29h14V17.5" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 29v-6h4v6" fill="none" stroke="#F2C9A0" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  panel: ["Contactos", "Visitas", "Inmuebles", "Captación", "Operaciones"],
  situacion: "Tres agentes, unos 40 inmuebles en cartera y los contactos entrando por los portales, la web y el teléfono. Gran parte del día se va en responder, cuadrar visitas y perseguir papeles.",
  dolores: [
    ["Contactos que se enfrían", "Un interesado escribe desde el portal a las 21:30 y nadie le contesta hasta el día siguiente. Para entonces ya ha llamado a otra agencia."],
    ["Visitas a base de mensajes", "Cuadrar una visita lleva diez mensajes, y después nadie pregunta qué le pareció."],
    ["Propietarios que preguntan", "«¿Cómo va lo mío?». Sin datos de visitas, la conversación sobre bajar el precio se hace difícil."],
    ["Papeles hasta la notaría", "Nota simple, certificado energético, documentación del banco… repartido entre correos y carpetas."]
  ],
  casos: [
    {
      id: "contactos",
      montaje: { plazo: "2 semanas", con: "Los avisos de los portales, tu CRM y WhatsApp Business" },
      nav: "Contactos de portales",
      titulo: "Contactos de los portales, atendidos en un minuto",
      hoy: "Los contactos de los portales llegan al correo a cualquier hora. Se responden cuando alguien puede, a veces al día siguiente.",
      con: "Cada contacto recibe respuesta en un minuto, se le hacen las preguntas clave y llega al agente ya calificado y con una visita propuesta.",
      ganas: ["Respuesta en un minuto, también de noche", "Sabes qué contactos son serios", "Más visitas cerradas"],
      pasos: [
        { quien: "auto", t: "Entra un contacto desde el portal a las 21:30", d: "Elena se interesa por el piso de la calle Colón. Pablo está cenando y no se entera.", boton: "Ver qué pasa" },
        { quien: "auto", t: "En un minuto, Elena ya tiene respuesta", d: "Por WhatsApp, con la ficha del piso y dos preguntas para saber si es un contacto serio: para qué lo quiere y cómo lo va a pagar.", boton: "Elena responde" },
        { quien: "auto", t: "Llega a Pablo calificado", d: "Con lo que ha contado Elena se rellena su ficha y se marca como prioritaria. Además, se le sugiere otro piso que le encaja.", boton: "Ofrecer visita" },
        { quien: "cliente", nombre: "Elena, compradora", t: "Elena elige hora de visita", d: "Ve los huecos libres de Pablo y elige. La visita entra en su agenda sin una sola llamada.", boton: "Ver el resultado" }
      ],
      final: { antes: "Contactos que se contestan al día siguiente y llamadas para saber si van en serio.", ahora: "A las 21:32 Elena tiene respuesta y visita, y Pablo lo ve todo por la mañana con la ficha hecha." },
      escena: function (x) {
        var u = UI, out;
        var piso = { titulo: "Piso en C/ Colón 14", zona: "Centro", m2: 95, hab: 3, banos: 2, tono: ["#E9C9A8", "#C98A64"] };
        var atico = { titulo: "Ático con terraza", zona: "Ensanche", m2: 110, hab: 3, banos: 2, tono: ["#CFDCE3", "#7F9DAE"] };
        if (x.p === 0) {
          return u.ventana({ quien: "Correo de la agencia", seccion: "Contactos", cuerpo:
            u.mail({ de: "Portal inmobiliario", sinLogo: true, asunto: "Nuevo contacto para «Piso en C/ Colón 14»", clase: " anim", cuerpo:
              "<p><strong>Elena Ruiz</strong> · 600 123 456</p><p>«Hola, me interesa el piso. ¿Sigue disponible? ¿Se puede ver esta semana?»</p><p class=\"tenue\">Recibido a las 21:30</p>" }) +
            '<div class="fila">' + u.chip("Pablo no está conectado", "pend") + u.btn("Ver qué pasa", true) + "</div>"
          });
        }
        var chat = u.ellos("Hola, Elena. Soy el asistente de Inmobiliaria Brisa. ¡Sí, sigue disponible!" + u.inmueble(piso) + "Para enseñártelo bien, ¿es para vivir o para invertir? ¿Cómo lo pagarías?", "21:31", x.n(1));
        if (x.p === 1) chat += u.respuestas(["Para vivir, con hipoteca ya preaprobada"], 0);
        if (x.p >= 2) chat += u.yo("Para vivir. Tengo la hipoteca preaprobada, hasta 260.000. Somos dos y un niño.", "21:31");
        if (x.p === 3) {
          chat += u.ellos("Perfecto. Pablo, el agente que lleva el piso, puede enseñártelo. ¿Qué hora te viene bien?", "21:32", x.n(3)) +
            (x.fin ? u.respuestas(["Jueves 17:00", "Viernes 10:00", "Sábado 11:00"], null, 0) +
              u.ellos("Visita confirmada: <strong>jueves a las 17:00</strong> en C/ Colón 14. El día antes te mando un recordatorio.", "21:32", " anim")
              : u.respuestas(["Jueves 17:00", "Viernes 10:00", "Sábado 11:00"], 0));
        }
        out = u.movil({ quien: "Móvil de Elena", app: "wa", hora: "21:32", cuerpo: chat });

        var cuerpo;
        if (x.p === 1) {
          cuerpo = u.tabla(["Contacto", "Inmueble", "Entrada", "Estado"], [
            ["Elena Ruiz", "C/ Colón 14", "21:30", u.chip("Respondido en 1 min", "ok")],
            ["Marcos Gil", "Ático Ensanche", "19:12", u.chip("Esperando respuesta", "info")],
            ["Sonia Lara", "Casa La Vega", "17:40", u.chip("Visita el sábado", "ok")]
          ], ["is-resaltada"]);
        } else {
          cuerpo = '<div class="entre"><strong>Elena Ruiz</strong>' + u.chip("Prioritaria", "alerta") + "</div>" +
            '<div class="anim">' + u.ficha([
              ["Busca", "Vivienda habitual · 3 habitaciones"], ["Familia", "Pareja con un niño"],
              ["Financiación", "Hipoteca preaprobada"], ["Presupuesto", "Hasta 260.000 €"],
              ["Agente", "Pablo"]
            ]) + "</div>" +
            '<div class="caja caja-suave anim anim-2"><h5>También le puede encajar</h5>' + u.inmueble(atico) + "</div>" +
            (x.p === 2 ? '<div class="fila">' + u.btn("Ofrecer visita", true) + "</div>" : !x.fin ? '<p class="tenue">Visita ofrecida a Elena con los huecos libres de Pablo.</p>' :
              '<div class="caja anim"><h5>' + u.icono("calendario") + "Visita en la agenda de Pablo</h5><p>Jueves 17:00 · C/ Colón 14 · Elena Ruiz</p></div>");
        }
        return out + u.ventana({ quien: "Ordenador de Pablo", seccion: "Contactos", cuerpo: cuerpo });
      }
    },

    {
      id: "visitas",
      montaje: { plazo: "2 semanas", con: "Tu agenda y tu CRM, o uno nuevo" },
      nav: "Visitas y opiniones",
      titulo: "Visitas confirmadas y opiniones que llegan al propietario",
      hoy: "Las visitas se confirman a mano, algunas personas no aparecen y nadie pregunta qué les pareció. El propietario solo sabe lo que el agente le cuenta.",
      con: "Recordatorio con confirmación, hoja de ruta para el agente, una pregunta corta después de cada visita y un informe semanal para el propietario.",
      ganas: ["Menos visitas en balde", "Sabes qué frena a los compradores", "Propietarios informados sin llamadas"],
      pasos: [
        { quien: "auto", t: "La víspera, recordatorio con confirmación", d: "Elena recibe dirección, hora y quién la va a recibir. Confirma con un toque.", boton: "Elena confirma" },
        { quien: "equipo", nombre: "Pablo, agente", t: "Pablo tiene su ruta del día en el móvil", d: "Cada visita con lo que busca el comprador, para que no tenga que repasar los mensajes.", boton: "Visita terminada" },
        { quien: "auto", t: "Dos horas después, una pregunta a Elena", d: "Qué le ha parecido, en un toque. Si tiene dudas, se le pregunta qué la frena.", boton: "Elena responde" },
        { quien: "auto", t: "El propietario recibe su informe semanal", d: "Visitas, interesados y lo que más se repite. Con datos, la conversación sobre el precio es más fácil.", boton: "Ver el resultado" }
      ],
      final: { antes: "Visitas que no aparecen, opiniones que se pierden y un propietario que llama cada semana.", ahora: "Las visitas se confirman solas, se sabe qué opina cada comprador y el propietario recibe sus datos cada viernes." },
      escena: function (x) {
        var u = UI, movil, ventana = "";
        if (x.p === 0) {
          movil = u.movil({ quien: "Móvil de Elena", app: "wa", hora: "18:00", cuerpo:
            u.fecha("Miércoles") +
            u.ellos("Hola, Elena. Mañana a las <strong>17:00</strong> te esperamos en C/ Colón 14, 3.º B. Te recibe Pablo en el portal.", "18:00", " anim") +
            u.respuestas(["Confirmo", "Cambiar hora"], 0)
          });
          ventana = u.ventana({ quien: "Ordenador de la agencia", seccion: "Visitas", cuerpo:
            u.agenda([["10:00", "<strong>Ático Ensanche</strong><small>Marcos Gil · confirmada</small>"], ["12:30", "<strong>Casa La Vega</strong><small>Sonia Lara · confirmada</small>"], ["17:00", "<strong>C/ Colón 14</strong><small>Elena Ruiz · esperando confirmación</small>", "libre"], ["18:30", "<strong>C/ Colón 14</strong><small>Jaime Soto · confirmada</small>"]])
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Móvil de Pablo", equipo: true, hora: "16:50", titulo: "Mis visitas de hoy", cuerpo:
            u.agenda([
              ["10:00", "<strong>Ático Ensanche</strong><small>Hecha</small>"],
              ["12:30", "<strong>Casa La Vega</strong><small>Hecha</small>"],
              ["17:00", "<strong>C/ Colón 14 · Elena Ruiz</strong><small>Vivienda habitual, pareja con un niño. Hipoteca preaprobada.</small>", "nueva"]
            ]) +
            '<div class="caja caja-suave"><h5>' + u.icono("ubicacion") + "C/ Colón 14, 3.º B</h5><p class=\"tenue\">Llaves: caja de la oficina, gancho 7</p></div>" +
            u.btn("Visita terminada", true, "ancho")
          });
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Móvil de Elena", app: "wa", hora: "19:00", cuerpo:
            u.ellos("Hola, Elena. ¿Qué te ha parecido el piso de la calle Colón?", "19:00", " anim") +
            u.respuestas(["Me ha encantado", "Tengo dudas", "No es para mí"], null, 1) +
            u.ellos("Gracias. ¿Qué es lo que más te frena?", "19:01", " anim anim-2") +
            u.respuestas(["La cocina es pequeña"], 0)
          });
          ventana = u.ventana({ quien: "Ordenador de Pablo", seccion: "Visitas", cuerpo:
            u.tabla(["Visita", "Inmueble", "Opinión"], [
              ["Elena Ruiz", "C/ Colón 14", u.chip("Tiene dudas", "pend")],
              ["Sonia Lara", "Casa La Vega", u.chip("Le ha encantado", "ok")],
              ["Marcos Gil", "Ático Ensanche", u.chip("No es para él", "alerta")]
            ], ["is-resaltada"])
          });
        } else {
          movil = u.movil({ quien: "Móvil del propietario", app: "mail", hora: "18:00", cuerpo:
            u.mail({ asunto: "Tu piso de C/ Colón esta semana", clase: " anim", cuerpo:
              "<p>Hola, Jaime:</p><ul><li><strong>6 visitas</strong>, 2 personas muy interesadas</li><li>Lo que más gusta: la luz y la zona</li><li>Lo que más frena: <strong>la cocina</strong> (3 de 6)</li><li>Visitas en el portal: 412 (+18 %)</li></ul><p>El lunes te llamo para comentarlo. Pablo</p>" })
          });
          ventana = u.ventana({ quien: "Ordenador de Pablo", seccion: "Inmuebles", cuerpo:
            '<div class="entre"><strong>C/ Colón 14 · semana 3</strong>' + u.chip("Informe enviado al propietario", "ok") + "</div>" +
            u.kpis([["6", "visitas"], ["2", "muy interesados", "ok"], ["3 de 6", "les frena la cocina", "alerta"]]) +
            u.tabla(["Comprador", "Opinión", "Le frena"], [["Elena Ruiz", u.chip("Dudas", "pend"), "La cocina"], ["Jaime Soto", u.chip("Le encanta", "ok"), "—"], ["Clara Muñoz", u.chip("Dudas", "pend"), "La cocina"]])
          });
        }
        return movil + ventana;
      }
    },

    {
      id: "captacion",
      montaje: { plazo: "2 a 3 semanas", con: "Tu web y los datos de ventas de tu zona" },
      nav: "Captar propietarios",
      titulo: "Propietarios que piden valoración desde la web",
      hoy: "Los propietarios que quieren vender llaman a tres agencias para saber cuánto vale su piso. Gana el que contesta antes y mejor.",
      con: "Un formulario de valoración en la web da una horquilla orientativa al momento, y la agencia recibe al propietario con sus datos y un estudio de mercado ya preparado.",
      ganas: ["Más propietarios que te llaman a ti", "Llegas a la cita con el estudio hecho", "Ninguna valoración se queda sin seguimiento"],
      pasos: [
        { quien: "cliente", nombre: "Jaime, propietario", t: "Jaime pide una valoración desde la web", d: "Dirección, metros, habitaciones, estado y cuándo quiere vender. Dos minutos.", boton: "Ver mi valoración" },
        { quien: "auto", t: "Recibe una horquilla orientativa al momento", d: "Calculada con ventas recientes de la zona, y la invitación a que un agente lo vea para darle un precio ajustado.", boton: "Pedir visita de valoración" },
        { quien: "auto", t: "Pablo recibe la captación preparada", d: "Con los datos del piso, la urgencia de Jaime y un borrador de estudio de mercado con los comparables.", boton: "Revisar el estudio" },
        { quien: "equipo", nombre: "Pablo, agente", t: "Pablo revisa el estudio y lo envía", d: "Ajusta lo que ve en la visita y lo manda con la imagen de la agencia. El precio final siempre lo pone él.", boton: "Ver el resultado" }
      ],
      final: { antes: "Valoraciones por teléfono, estudios hechos a mano por la noche y propietarios que se van con otra agencia.", ahora: "El propietario tiene una primera cifra al momento y Pablo llega a la visita con el estudio hecho." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        if (x.p === 0) {
          movil = u.movil({ quien: "Móvil de Jaime", hora: "20:15", titulo: "¿Cuánto vale tu casa?", cuerpo:
            u.campos([
              ["Dirección", "C/ Mayor 8, 2.º A"],
              ["Metros", "88 m²"],
              ["Habitaciones", u.opc(["1", "2", "3", "4+"], 2)],
              ["Estado", u.opc(["Para reformar", "Bien", "Reformado"], 1)],
              ["¿Cuándo quieres vender?", u.opc(["Ya", "En 3 meses", "Solo curiosidad"], 1)]
            ]) + u.btn("Ver mi valoración", true, "ancho")
          });
          cuerpo = '<p class="tenue">Sin valoraciones nuevas hoy.</p>';
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Móvil de Jaime", hora: "20:16", titulo: "Tu valoración", cuerpo:
            '<div class="caja caja-suave anim" style="text-align:center"><p class="tenue">Horquilla orientativa</p><p class="marca-fuente" style="font-size:26px;line-height:1.2">210.000 – 235.000 €</p><p class="tenue">Según 8 ventas recientes en tu zona</p></div>' +
            '<p class="peq anim anim-2">Para darte un precio ajustado, un agente tiene que ver tu casa. Es gratis y sin compromiso.</p>' +
            u.btn("Pedir visita de valoración", true, "ancho")
          });
          cuerpo = '<p class="tenue">Jaime está viendo su valoración…</p>';
        } else {
          movil = "";
          cuerpo = '<div class="entre"><strong>Jaime Soto · C/ Mayor 8, 2.º A</strong>' + u.chip("Quiere vender en 3 meses", "alerta") + "</div>" +
            u.ficha([["Piso", "88 m² · 3 hab. · buen estado"], ["Horquilla enviada", "210.000 – 235.000 €"], ["Visita de valoración", "Lunes 11:00"]]) +
            '<div class="caja caja-ia' + x.n(2) + '"><h5>' + u.icono("doc") + "Borrador del estudio de mercado</h5>" +
            u.tabla(["Comparable", "m²", "Vendido por"], [["C/ Mayor 22", "92", "228.000 €"], ["Pza. del Sol 3", "85", "214.000 €"], ["C/ Nueva 40", "90", "231.000 €"]]) + "</div>" +
            (x.p === 2 ? '<div class="fila">' + u.btn("Revisar el estudio", true) + "</div>" :
              '<div class="caja anim"><div class="entre"><strong>Estudio para Jaime Soto.pdf</strong>' + u.chip("Revisado por Pablo", "ok") + '</div><p class="tenue">Precio recomendado tras la visita: 229.000 €</p></div>' +
              u.nota("La horquilla es orientativa. El precio de salida lo decide el agente después de ver la vivienda."));
        }
        return movil + u.ventana({ quien: "Ordenador de Pablo", seccion: "Captación", cuerpo: cuerpo });
      }
    },

    {
      id: "operacion",
      montaje: { plazo: "2 a 3 semanas", con: "Tu CRM o una ficha de operación a medida" },
      nav: "Papeles hasta la notaría",
      titulo: "De las arras a la notaría, sin papeles perdidos",
      hoy: "Nota simple, certificado energético, recibo del IBI, nóminas para el banco… cada documento llega por un sitio distinto y alguien tiene que acordarse de pedirlo.",
      con: "Cada operación tiene su ficha con lo que falta y quién lo tiene que traer. Comprador y vendedor reciben avisos y ven cómo va todo desde el móvil.",
      ganas: ["Nada se queda sin pedir", "Comprador y vendedor tranquilos", "Llegas a la firma con todo"],
      pasos: [
        { quien: "equipo", nombre: "Pablo, agente", t: "Pablo abre la operación", d: "Con la fecha de firma, se crea la lista de documentos y quién tiene que aportar cada uno.", boton: "Enviar avisos" },
        { quien: "auto", t: "Al vendedor solo le piden lo suyo", d: "A Jaime le falta el certificado energético. Puede subirlo o pedir que la agencia lo gestione.", boton: "Jaime responde" },
        { quien: "cliente", nombre: "Elena, compradora", t: "Elena sigue su compra desde el móvil", d: "Ve en qué punto está, la fecha de la notaría y lo que le toca subir a ella.", boton: "Subir nóminas" },
        { quien: "auto", t: "Todo listo para la firma", d: "Con todo completo, se avisa a la notaría y se manda a comprador y vendedor la cita con lo que deben llevar.", boton: "Ver el resultado" }
      ],
      final: { antes: "Correos y llamadas para reunir documentos y algún susto la semana de la firma.", ahora: "Cada uno sabe lo que le toca, los avisos salen solos y se llega a la notaría con todo." },
      escena: function (x) {
        var u = UI, movil;
        var ce = x.p >= 2 ? ["Certificado energético", "ok", "Lo gestiona la agencia · técnico el martes"] : ["Certificado energético", x.p === 1 ? "falta" : "pend", "Vendedor"];
        var nom = x.p >= 3 ? ["Nóminas y vida laboral", "ok", "Comprador · subidas"] : ["Nóminas y vida laboral", "pend", "Comprador"];
        var tas = x.p >= 3 ? ["Tasación del banco", "ok", "Banco · 231.000 €"] : ["Tasación del banco", "pend", "Banco"];
        var lista = [["Nota simple", "ok", "Agencia · pedida al Registro"], ce, ["Último recibo del IBI", "ok", "Vendedor"], ["DNI de los compradores", "ok", "Comprador"], nom, tas];
        if (x.p === 0) movil = "";
        else if (x.p === 1) {
          movil = u.movil({ quien: "Móvil de Jaime (vendedor)", app: "wa", hora: "10:00", cuerpo:
            u.ellos("Hola, Jaime. Para la firma del <strong>20 de noviembre</strong> solo nos falta el <strong>certificado energético</strong> de tu piso.<br><br>¿Lo tienes o quieres que lo gestionemos nosotros con un técnico?", "10:00", " anim") +
            u.respuestas(["Gestionadlo vosotros", "Ya lo tengo"], 0)
          });
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Móvil de Elena (compradora)", hora: "13:20", titulo: "Mi compra", cuerpo:
            u.inmueble({ titulo: "Piso en C/ Colón 14", zona: "Centro", m2: 95, hab: 3, banos: 2, tono: ["#E9C9A8", "#C98A64"] }) +
            u.check([["Reserva", "ok", "Hecha"], ["Arras", "ok", "Firmadas el 15/10"], ["Hipoteca", "pend", "El banco necesita tus nóminas"], ["Notaría", "pend", "20 de noviembre, 12:00"]]) +
            u.btn(u.icono("subir") + "Subir nóminas", true, "ancho")
          });
        } else {
          movil = u.movil({ quien: "Móvil de Elena (compradora)", app: "wa", hora: "9:00", cuerpo:
            u.ellos("¡Todo listo, Elena! Firmamos el <strong>20 de noviembre a las 12:00</strong> en la notaría de la calle Real 5.<br><br>Lleva tu DNI. Pablo estará allí contigo.", "9:00", " anim")
          });
        }
        var cuerpo = '<div class="entre"><strong>Operación C/ Colón 14</strong>' + u.chip("Firma: 20 de noviembre", "marca") + "</div>" +
          u.barra(lista.filter(function (l) { return l[1] === "ok"; }).length, lista.length, "Documentos completos") +
          u.check(lista);
        if (x.p === 0) cuerpo += '<div class="fila">' + u.btn("Enviar avisos", true) + "</div>";
        if (x.p === 3) cuerpo += '<div class="caja caja-suave anim"><h5>' + u.icono("correo") + "Documentación enviada a la notaría</h5><p>Con la cita confirmada a comprador y vendedor.</p></div>";
        return movil + u.ventana({ quien: "Ordenador de Pablo", seccion: "Operaciones", cuerpo: cuerpo });
      }
    }
  ]
});
