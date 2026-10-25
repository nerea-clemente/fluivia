/* Demo · Comercio (ejemplo ficticio) */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "comercio",
  etiqueta: "Comercio",
  tipo: "Librería y papelería",
  negocio: "Librería Marea",
  lema: "Libros, papelería y club de lectura en el barrio, y también en la web",
  cliente: "Cliente",
  software: { actual: "tu programa de caja y tu tienda online", medida: "un panel de encargos, stock y proveedores a medida" },
  marca: {
    m1: "#B5482A", m1t: "#FFFFFF", m2: "#FBE3CC", m2t: "#4A2410", suave: "#FBF3EC", tinta: "#3A1E13",
    fuente: "'Fraunces', Georgia, serif", radio: "6px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="6" fill="#B5482A"/><path d="M20 12.5c-3-2-7-2.5-11-2v16c4-.5 8 0 11 2 3-2 7-2.5 11-2v-16c-4-.5-8 0-11 2zM20 12.5v16" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linejoin="round"/><path d="M9 33c2.5-1.6 5-1.6 7.5 0s5 1.6 7.5 0 5-1.6 7.5 0" fill="none" stroke="#FBD3B0" stroke-width="2" stroke-linecap="round"/></svg>'
  },
  panel: ["Mensajes", "Encargos", "Proveedores", "Clientes", "Reseñas"],
  situacion: "Dos libreras, una persona por las tardes y unos 12.000 libros en tienda. Una web pequeña, un club de lectura y mensajes por WhatsApp e Instagram que llegan mientras se atiende el mostrador.",
  dolores: [
    ["«¿Tenéis este libro?» a todas horas", "Te lo preguntan por WhatsApp, por Instagram y por teléfono, y para contestar hay que dejar el mostrador y mirar en el ordenador."],
    ["Encargos en una libreta", "El libro llega de la distribuidora y nadie se acuerda de avisar, o se avisa dos veces."],
    ["Albaranes y facturas por todas partes", "Llegan de diez distribuidoras y editoriales, en papel y por correo, y a final de trimestre la gestoría pide lo que falta."],
    ["Clientes que vienen una vez", "Muchos compran un regalo en Navidad y no vuelven. Y los que salen contentos no dejan reseña."]
  ],
  casos: [
    {
      id: "mensajes",
      montaje: { plazo: "3 a 4 semanas", con: "WhatsApp Business, Instagram y tu programa de caja, para el stock" },
      nav: "Mensajes de clientes",
      titulo: "Mensajes de clientes respondidos con el stock real",
      hoy: "Preguntan por WhatsApp o Instagram si tenéis un libro, a qué hora abrís o si podéis guardarlo. Contestar obliga a dejar el mostrador y mirar en el programa.",
      con: "Las preguntas de siempre se responden al momento con el stock de tu programa de caja y vuestro horario. Lo que necesita a una librera, como una recomendación o una queja, se le pasa.",
      pasos: [
        { quien: "cliente", nombre: "Elena, clienta", t: "Elena pregunta por Instagram a las 21:30", d: "Busca un libro que le han recomendado y quiere saber si abrís el sábado.", boton: "Enviar la pregunta" },
        { quien: "auto", t: "Se responde con el stock y el horario reales", d: "Quedan 2 ejemplares en tienda y el sábado abrís de 10:00 a 14:00. Se le ofrece guardarle uno.", boton: "Elena pide que se lo guarden" },
        { quien: "auto", t: "El ejemplar queda apartado", d: "Se aparta en el stock para que no se venda en la web, hasta el sábado a las 14:00. Y aparece en la lista de Nuria para dejarlo en el estante de encargos.", boton: "Ver la mañana siguiente" },
        { quien: "equipo", nombre: "Nuria, librera", t: "Por la mañana, Nuria ve qué queda para ella", d: "Lo que se ha respondido solo y lo que necesita a una librera: una recomendación para un niño que no lee y una queja de un pedido de la web.", boton: "Ver el resultado" }
      ],
      final: { antes: "Mensajes sin contestar hasta el día siguiente y viajes del mostrador al ordenador para mirar el stock.", ahora: "Las preguntas de siempre se contestan solas con datos reales, y Nuria dedica su tiempo a las que necesitan a una librera." },
      escena: function (x) {
        var u = UI, cuerpo;
        var de = function (t, q) { return t + '<br><span class="tenue">' + q + "</span>"; };
        var resp = "¡Hola, Elena! Sí: nos quedan <strong>2 ejemplares</strong> de <em>Nada</em>, de Carmen Laforet, en edición de bolsillo (10,95 €). El sábado abrimos de <strong>10:00 a 14:00</strong>. ¿Quieres que te guardemos uno?";
        var chat = u.fecha("Jueves") + u.yo("¡Hola! ¿Tenéis <em>Nada</em>, de Carmen Laforet? Y el sábado, ¿abrís?", "21:32", x.n(0));
        if (x.p === 0) chat += u.btn(u.icono("enviar") + "Enviar", true);
        if (x.p >= 1) chat += u.ellos(resp, "21:32", x.n(1)) +
          (x.p === 1 ? u.respuestas(["Sí, guárdamelo", "No hace falta"], 0) : u.respuestas(["Sí, guárdamelo", "No hace falta"], null, 0));
        if (x.p >= 2) chat += u.ellos("Hecho. Te lo guardamos a nombre de Elena hasta el sábado a las 14:00. Lo pagas al recogerlo.", "21:33", x.n(2));
        var movil = u.movil({ quien: "Móvil de Elena (Instagram)", app: "wa", sub: "Mensajes de Instagram", hora: x.p >= 2 ? "21:33" : "21:32", cuerpo: chat });

        if (x.p === 0) {
          cuerpo = '<p class="peq"><strong>Mensajes de hoy</strong></p>' +
            u.tabla(["Pregunta", "Estado"], [
              [de("¿Tenéis cuadernos de dibujo A4?", "Luis M. · WhatsApp, 18:05"), u.chip("Respondido", "ok")],
              [de("¿Hacéis envíos a Oviedo?", "Ana P. · Instagram, 19:40"), u.chip("Respondido", "ok")]
            ]);
        } else if (x.p === 1) {
          cuerpo = '<div class="entre"><strong>Elena G. · Instagram</strong>' + u.chip("21:32", "info") + "</div>" +
            '<div class="caja caja-ia anim"><h5>Con qué se ha respondido</h5>' + u.ficha([
              ["Libro", "<em>Nada</em>, Carmen Laforet · bolsillo"],
              ["Stock en tienda", "2 ejemplares, según el programa de caja"],
              ["Precio", "10,95 €"],
              ["Horario del sábado", "10:00 a 14:00"]
            ]) + "</div>";
        } else if (x.p === 2) {
          cuerpo = '<div class="entre"><strong>Elena G. · Instagram</strong>' + u.chip("Apartado", "ok") + "</div>" +
            '<div class="anim">' + u.ficha([
              ["Libro", "<em>Nada</em>, Carmen Laforet · bolsillo"],
              ["Stock", "1 a la venta · 1 apartado"],
              ["Apartado hasta", "Sábado a las 14:00"],
              ["Se paga", "Al recogerlo"]
            ]) + "</div>" +
            '<div class="anim anim-2">' + u.check([["Dejar en el estante de encargos", "pend", "En la lista de Nuria para mañana"]]) + "</div>";
        } else {
          cuerpo = '<div class="anim">' + u.kpis([["17", "mensajes esta noche"], ["14", "respondidos solos", "ok"], ["3", "esperan a una librera", "alerta"]]) + "</div>" +
            u.tabla(["Mensaje", "Estado"], [
              [de("¿Tenéis <em>Nada</em>?", "Elena G."), u.chip("Apartado", "ok")],
              [de("Busco un libro para mi hijo de 9 años, que no lee nada", "Javier R."), u.chip("Para Nuria", "pend")],
              [de("El libro de la web llegó con la tapa doblada", "Rosa T."), u.chip("Queja", "alerta")],
              [de("¿Abrís el 8 de diciembre?", "Luis M."), u.chip("Respondido", "ok")]
            ], ["", "is-resaltada", "is-resaltada"]) +
            u.nota("Las recomendaciones y las quejas las contesta siempre una persona. Lo de siempre, como stock, horario o envíos, sale solo con tus datos.");
        }
        return movil + u.ventana({ quien: "Ordenador del mostrador", seccion: "Mensajes", cuerpo: cuerpo });
      }
    },

    {
      id: "encargos",
      montaje: { plazo: "2 semanas", con: "Tu programa de caja y WhatsApp Business" },
      nav: "Encargos para recoger",
      titulo: "Encargos que avisan solos cuando llegan",
      hoy: "Si un libro no está, se apunta en una libreta, se pide a la distribuidora y, cuando llega, alguien tiene que acordarse de llamar al cliente.",
      con: "El encargo se registra con los datos del cliente y entra en el pedido a la distribuidora. Al dar entrada al albarán, al cliente le llega un aviso de que ya puede pasar a recogerlo.",
      pasos: [
        { quien: "equipo", nombre: "Nuria, librera", t: "Pablo encarga un libro en el mostrador", d: "Busca una guía de rutas en bici que no tenéis. Nuria la apunta en el panel en medio minuto, con su teléfono.", boton: "Guardar el encargo" },
        { quien: "auto", t: "Pablo recibe la confirmación", d: "Con el libro, el precio y el plazo aproximado de la distribuidora. El encargo entra en el próximo pedido.", boton: "Llega el pedido" },
        { quien: "auto", t: "Llega el pedido y se reconocen los encargos", d: "Al dar entrada al albarán, cada libro encargado se separa con el nombre de quien lo pidió.", boton: "Dar entrada al albarán" },
        { quien: "cliente", nombre: "Pablo, cliente", t: "Pablo recibe el aviso y dice cuándo pasa", d: "Se le guarda 10 días. Si no pasa, se le recuerda una vez; después, Nuria decide si el libro vuelve a la estantería.", boton: "Responder" }
      ],
      final: { antes: "Encargos en una libreta, llamadas uno a uno y algún libro esperando semanas detrás del mostrador.", ahora: "Cada encargo avisa solo cuando llega y Nuria sabe en todo momento qué hay pendiente de recoger." },
      escena: function (x) {
        var u = UI, movil;
        var libro = function (t, s) { return t + '<br><span class="tenue">' + s + "</span>"; };
        if (x.p === 0) {
          return u.ventana({ quien: "Ordenador del mostrador", seccion: "Encargos", cuerpo:
            '<div class="entre"><strong>Encargo nuevo</strong>' + u.chip("Sábado, 12:10", "info") + "</div>" +
            u.campos([
              ["Libro", libro("<strong>Asturias en bici: 30 rutas</strong>", "Ediciones Trasgo · 22,50 €")],
              ["Cliente", "Pablo Ferrer · 6** *** 412"],
              ["Se pide a", u.opc(["Distribuidora Atlántico", "Directo a la editorial"], 0)],
              ["Pago", u.opc(["Al recoger", "Deja una señal"], 0)]
            ]) +
            '<div class="fila">' + u.btn("Guardar el encargo", true) + "</div>"
          });
        }
        var filas = function (pablo) {
          return u.tabla(["Encargo", "Estado"], [
            [libro("Asturias en bici: 30 rutas", "Para Pablo Ferrer"), pablo],
            [libro("Guía de setas de Asturias", "Para Carmen Díaz"), x.p >= 3 ? u.chip("Avisada", "ok") : u.chip("Pedido", "info")],
            [libro("Cuaderno de caligrafía 3", "Para Marta Ruiz"), u.chip("9 días sin recoger", "pend")]
          ], ["is-resaltada"]);
        };
        if (x.p === 1) {
          movil = u.movil({ quien: "Móvil de Pablo", app: "wa", hora: "12:11", cuerpo:
            u.fecha("Sábado") +
            u.ellos("Hola, Pablo. Te hemos encargado <strong>Asturias en bici: 30 rutas</strong> (22,50 €). Suele llegar en 3 o 4 días laborables. Te avisamos por aquí en cuanto esté en la tienda.", "12:11", " anim")
          });
          return movil + u.ventana({ quien: "Ordenador del mostrador", seccion: "Encargos", cuerpo:
            '<p class="peq"><strong>Encargos pendientes</strong></p>' + filas(u.chip("Pedido", "info"))
          });
        }
        if (x.p === 2) {
          return u.ventana({ quien: "Ordenador del mostrador", seccion: "Proveedores", cuerpo:
            '<div class="entre"><strong>Albarán de Distribuidora Atlántico</strong>' + u.chip("Llegó hoy, 11:20", "info") + "</div>" +
            '<div class="anim">' + u.tabla(["Libro", "Uds.", "Para"], [
              [libro("<em>Nada</em>", "Carmen Laforet · bolsillo"), "3", "Tienda"],
              ["Asturias en bici: 30 rutas", "1", u.chip("Encargo de Pablo", "marca")],
              ["Guía de setas de Asturias", "1", u.chip("Encargo de Carmen", "marca")],
              [libro("Novedades de noviembre", "9 títulos"), "14", "Tienda"]
            ], ["", "is-resaltada", "is-resaltada", ""]) + "</div>" +
            '<div class="fila">' + u.btn("Dar entrada al albarán", true) + "</div>"
          });
        }
        var chat = u.fecha("Sábado") +
          u.ellos("Hola, Pablo. Te hemos encargado <strong>Asturias en bici: 30 rutas</strong> (22,50 €). Suele llegar en 3 o 4 días laborables. Te avisamos por aquí en cuanto esté en la tienda.", "12:11") +
          u.fecha("Martes") +
          u.ellos("Pablo, ya tienes tu libro en Librería Marea: <strong>Asturias en bici: 30 rutas</strong>. Te lo guardamos 10 días. ¿Cuándo te pasas?", "11:22", x.n(3));
        chat += x.fin ? u.respuestas(["Hoy por la tarde", "El viernes"], null, 1) +
            u.ellos("Perfecto, te esperamos el viernes. Abrimos de 10:00 a 13:30 y de 17:00 a 20:00.", "11:30", " anim") :
          u.respuestas(["Hoy por la tarde", "El viernes"], 1);
        movil = u.movil({ quien: "Móvil de Pablo", app: "wa", hora: x.fin ? "11:30" : "11:22", cuerpo: chat });
        var cuerpo = '<p class="peq"><strong>Encargos pendientes</strong></p>' +
          filas(x.fin ? u.chip("Viene el viernes", "ok") : u.chip("Avisado", "ok"));
        if (x.fin) {
          cuerpo += '<div class="anim">' + u.kpis([["12", "encargos este mes"], ["12", "clientes avisados sin llamar", "ok"], ["1", "sin recoger, para Nuria", "alerta"]]) + "</div>" +
            u.nota("Si un encargo no se recoge, se recuerda una vez. Después, Nuria decide si el libro vuelve a la estantería.");
        }
        return movil + u.ventana({ quien: "Ordenador del mostrador", seccion: "Encargos", cuerpo: cuerpo });
      }
    },

    {
      id: "facturas",
      montaje: { plazo: "2 a 3 semanas", con: "Tu correo, el móvil de la tienda y una carpeta compartida con tu gestoría" },
      nav: "Facturas de proveedores",
      titulo: "Albaranes y facturas de proveedores, ordenados para la gestoría",
      hoy: "Los albaranes llegan en papel con las cajas y las facturas, por correo. Se acumulan en una bandeja y a final de trimestre la gestoría pide las que faltan.",
      con: "Cada albarán y factura que recibes, en papel con una foto o por correo, se lee y se guarda ordenado. Se comprueba que la factura cuadra con los albaranes y la gestoría tiene su carpeta al día.",
      pasos: [
        { quien: "equipo", nombre: "Nuria, librera", t: "Nuria hace una foto al albarán", d: "Llegan las cajas de la distribuidora con el albarán en papel. Una foto desde el móvil de la tienda y el papel ya puede ir al archivador.", boton: "Hacer la foto" },
        { quien: "auto", t: "Se lee y se compara con el pedido", d: "Se leen los libros, las unidades, la base y el IVA. Un libro que se pidió no viene: queda apuntado.", boton: "Llega la factura" },
        { quien: "auto", t: "La factura del mes se comprueba con los albaranes", d: "La distribuidora manda la factura por correo. Se recoge sola, se cruza con los tres albaranes del mes y aparece una diferencia.", boton: "Ver la carpeta" },
        { quien: "equipo", nombre: "Marisa, dueña", t: "La gestoría tiene la carpeta al día", d: "Facturas recibidas del trimestre, ordenadas y con sus datos en una hoja. Antes de pagar, Marisa decide qué hacer con las diferencias.", boton: "Ver el resultado" }
      ],
      final: { antes: "Una bandeja de papeles, facturas en el correo y la gestoría pidiendo lo que falta a final de trimestre.", ahora: "Cada albarán y factura queda guardado y comprobado el día que llega, y Marisa ve las diferencias antes de pagar." },
      escena: function (x) {
        var u = UI, movil;
        var tit = function (t, s) { return t + '<br><span class="tenue">' + s + "</span>"; };
        var albaran = function (clase) {
          return u.recibo({ comercio: "Distribuidora Atlántico", dato: "Albarán 26-1187 · 3 de noviembre", clase: clase || "", lineas: [
            ["3 Nada (bolsillo)", "24,63"],
            ["1 Asturias en bici", "15,75"],
            ["14 Novedades nov.", "127,12"],
            ["Base", "167,50"],
            ["IVA 4 %", "6,70"]
          ], total: "174,20 €" });
        };
        if (x.p === 0) {
          movil = u.movil({ quien: "Móvil de la tienda", equipo: true, hora: "11:25", titulo: "Subir albarán o factura", cuerpo:
            '<p class="peq">Haz una foto al papel. Se lee solo.</p>' +
            albaran() +
            u.btn(u.icono("camara") + "Hacer la foto", true, "ancho")
          });
          return movil + u.ventana({ quien: "Ordenador de la tienda", seccion: "Proveedores", cuerpo:
            '<p class="peq"><strong>Últimos documentos recibidos</strong></p>' +
            u.tabla(["Documento", "Estado"], [
              [tit("Factura PN-0912", "Papelería Norte · 241,79 €"), u.chip("Guardada", "ok")],
              [tit("Albarán T-0451", "Ediciones Trasgo · 88,40 €"), u.chip("Guardado", "ok")]
            ])
          });
        }
        if (x.p === 1) {
          return u.ventana({ quien: "Ordenador de la tienda", seccion: "Proveedores", cuerpo:
            '<div class="entre"><strong>Albarán 26-1187 · foto de las 11:25</strong>' + u.chip("Para reclamar: 1 libro", "pend") + "</div>" +
            '<div class="anim">' + u.tabla(["Libro", "Pedidos", "En el albarán"], [
              [tit("<em>Nada</em>", "Carmen Laforet · bolsillo"), "3", u.chip("Vienen 3", "ok")],
              ["Asturias en bici: 30 rutas", "1", u.chip("Viene", "ok")],
              [tit("Novedades de noviembre", "9 títulos"), "14", u.chip("Vienen 14", "ok")],
              [tit("Atlas de aves de la costa", "18,90 € + IVA"), "1", u.chip("No viene", "alerta")]
            ], ["", "", "", "is-resaltada"]) + "</div>" +
            '<div class="caja caja-ia anim anim-2"><h5>Lo que se ha leído</h5>' + u.ficha([
              ["Proveedor", "Distribuidora Atlántico"],
              ["Albarán", "26-1187 · 3 de noviembre"],
              ["Base", "167,50 €"],
              ["IVA (4 %)", "6,70 €"],
              ["Total", "174,20 €"]
            ]) + "</div>"
          });
        }
        if (x.p === 2) {
          movil = u.movil({ quien: "Correo de la librería", app: "mail", hora: "9:02", cuerpo:
            u.mail({ de: "Distribuidora Atlántico", sinLogo: true, asunto: "Factura F-26/3391 · noviembre", clase: " anim", cuerpo:
              "<p>Buenos días:</p><p>Os adjuntamos la factura de los albaranes de noviembre.</p><p>Un saludo,<br>Administración</p><p class=\"tenue\">Adjunto: F-26-3391.pdf</p>" })
          });
          return movil + u.ventana({ quien: "Ordenador de la tienda", seccion: "Proveedores", cuerpo:
            '<div class="entre"><strong>Factura F-26/3391</strong>' + u.chip("604,40 €", "info") + "</div>" +
            '<div class="anim">' + u.tabla(["Albarán", "En la factura"], [
              [tit("26-1187 · 174,20 €", "3 de noviembre"), u.chip("193,86 €", "alerta")],
              [tit("26-1203 · 312,10 €", "10 de noviembre"), u.chip("Cuadra", "ok")],
              [tit("26-1240 · 98,44 €", "17 de noviembre"), u.chip("Cuadra", "ok")]
            ], ["is-resaltada"]) + "</div>" +
            '<div class="caja caja-alerta anim anim-2"><h5>' + u.icono("alerta") + "Diferencia de 19,66 €</h5><p>La factura cobra el <em>Atlas de aves de la costa</em>, que no venía en el albarán 26-1187. Queda para que Marisa decida antes de pagar.</p></div>"
          });
        }
        return u.ventana({ quien: "Ordenador de Marisa", seccion: "Proveedores", cuerpo:
          '<div class="entre"><strong>Facturas recibidas · 4.º trimestre</strong>' + u.chip("Carpeta compartida con la gestoría", "ok") + "</div>" +
          '<div class="anim">' + u.kpis([["31", "facturas recibidas"], ["29", "cuadran con sus albaranes", "ok"], ["2", "con diferencias, para Marisa", "alerta"]]) + "</div>" +
          u.tabla(["Proveedor", "Factura", "Estado"], [
            ["Distribuidora Atlántico", tit("F-26/3391", "604,40 €"), u.chip("Diferencia: para Marisa", "alerta")],
            ["Papelería Norte", tit("PN-0912", "241,79 €"), u.chip("Cuadra", "ok")],
            ["Ediciones Trasgo", tit("T-0118", "88,40 €"), u.chip("Cuadra", "ok")],
            ["Luz del local", tit("Noviembre", "131,22 €"), u.chip("Guardada", "ok")]
          ], ["is-resaltada"]) +
          '<div class="caja caja-suave anim anim-2"><h5>' + u.icono("doc") + 'Lo que ve la gestoría</h5><ul class="lista-simple">' +
            '<li><span>Facturas en PDF, por mes</span><span class="tenue">31</span></li>' +
            '<li><span>Hoja con proveedor, fecha, base, IVA y total</span><span class="tenue">Al día</span></li>' +
          "</ul></div>" +
          u.nota("Aquí solo se ordenan las facturas que recibes. Tus tiques y facturas siguen saliendo de tu programa de caja, que es el que tiene que cumplir con Verifactu.")
        });
      }
    },

    {
      id: "fidelidad",
      montaje: { plazo: "1 a 2 semanas", con: "Tu ficha de Google, WhatsApp Business y tu programa de caja" },
      nav: "Reseñas y clientes que vuelven",
      titulo: "Reseñas en Google y clientes que vuelven",
      hoy: "Los clientes contentos se van sin dejar reseña. Y quien vino a por un regalo en diciembre no vuelve a saber de la librería hasta el año siguiente.",
      con: "A quien deja su teléfono y acepta recibir mensajes, le llega uno para opinar en Google. Cuando sale una novedad que le encaja con lo que compró, se le avisa.",
      pasos: [
        { quien: "auto", t: "Al día siguiente de la compra, se pide su opinión", d: "Solo a quien dejó su teléfono y aceptó recibir mensajes. Un mensaje corto con el enlace directo a vuestra ficha de Google.", boton: "Elena deja su reseña" },
        { quien: "equipo", nombre: "Marisa, dueña", t: "La respuesta llega preparada", d: "La reseña aparece en el panel con una respuesta propuesta en el tono de la librería. Marisa la lee, la cambia si quiere y la publica.", boton: "Publicar la respuesta" },
        { quien: "auto", t: "Sale una novedad y se avisa a quien le encaja", d: "Javier compró en diciembre los dos primeros libros de una serie y no ha vuelto. Sale el tercero y le llega un aviso. Marisa elige qué se avisa y a quién.", boton: "Javier lo reserva" },
        { quien: "equipo", nombre: "Marisa, dueña", t: "Marisa ve el resultado del mes", d: "Reseñas nuevas, respuestas publicadas y clientes que han vuelto después de un mensaje.", boton: "Ver el resultado" }
      ],
      final: { antes: "Una reseña de vez en cuando y clientes de Navidad de los que no se vuelve a saber.", ahora: "Reseñas nuevas cada semana, todas respondidas, y clientes que vuelven cuando sale algo que les interesa." },
      escena: function (x) {
        var u = UI, movil;
        var pide = "Hola, Elena. Gracias por pasarte ayer por Librería Marea. Si te gustó la visita, ¿nos dejas una opinión en Google? Es lo que más ayuda a que nos encuentren otros lectores del barrio.";
        var respuesta = "Gracias, Elena. Nos alegra que <em>Nada</em> te estuviera esperando y que la recomendación de Nuria haya funcionado. Cuando lo termines, ven a contarnos qué te ha parecido.";
        var resena = '<div class="caja' + x.n(1) + '"><div class="entre"><strong>Elena Gómez</strong>' + u.estrellas(5) + '</div><p>Pregunté por un libro un jueves por la noche y el sábado me lo tenían apartado. Nuria me recomendó otro y ya voy por la mitad. Librería de barrio de las de verdad.</p><p class="tenue">Reseña de Google · hace 15 minutos</p></div>';
        if (x.p === 0) {
          movil = u.movil({ quien: "Móvil de Elena", app: "wa", hora: "11:00", cuerpo:
            u.fecha("Domingo") + u.ellos(pide + u.btn("Escribir mi opinión", true), "11:00", " anim")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Móvil de Elena", app: "wa", hora: "11:06", cuerpo:
            u.fecha("Domingo") + u.ellos(pide, "11:00") + u.yo("Hecha. ¡Gracias a vosotras!", "11:06")
          });
        } else {
          var serie = ["Sí, guárdamelo", "Me apunto a la presentación", "Ahora no"];
          movil = u.movil({ quien: "Móvil de Javier", app: "wa", hora: "18:00", cuerpo:
            u.fecha("Marzo") +
            u.ellos("Hola, Javier. En diciembre te llevaste los dos primeros casos del inspector Covián. Ya ha salido el tercero, <strong>La marea negra</strong>, y Lola Sanz lo presenta en la librería el jueves a las 19:00. ¿Te guardamos un ejemplar?", "18:00", x.n(2)) +
            (x.p === 2 ? u.respuestas(serie, 0) :
              u.respuestas(serie, null, 0) + u.ellos("Hecho, te lo guardamos hasta el sábado. Y si te apetece, te esperamos el jueves.", "18:01", " anim"))
          });
        }
        var cuerpo;
        if (x.p === 0) {
          cuerpo = u.kpis([["4,6", "nota media en Google"], ["2", "reseñas nuevas este mes"]]) +
            '<p class="tenue">Ayer se pidió opinión a 9 clientes, todos con permiso para recibir mensajes.</p>';
        } else if (x.p === 1) {
          cuerpo = '<p class="peq"><strong>Reseña nueva</strong></p>' + resena +
            '<div class="caja caja-ia anim anim-2"><h5>Respuesta propuesta</h5><p>' + respuesta + "</p></div>" +
            '<div class="fila">' + u.btn("Publicar la respuesta", true) + u.btn("Editar", false, "sec") + "</div>";
        } else if (x.p === 2) {
          return movil + u.ventana({ quien: "Ordenador de Marisa", seccion: "Clientes", cuerpo:
            '<div class="entre"><strong>Aviso: <em>La marea negra</em></strong>' + u.chip("Elegido por Marisa", "ok") + "</div>" +
            '<div class="anim">' + u.ficha([
              ["A quién", "Quien compró los dos primeros de la serie y aceptó recibir mensajes"],
              ["Cuántos", "23 clientes"],
              ["Qué se ofrece", "Guardarle un ejemplar y la presentación del jueves"],
              ["Cuándo", "El día que llega el libro a la tienda"]
            ]) + "</div>" +
            u.nota("Nadie recibe mensajes que no ha aceptado, y cualquiera puede darse de baja respondiendo «baja».")
          });
        } else {
          cuerpo = '<div class="anim">' + u.kpis([["4,7", "nota media en Google"], ["11", "reseñas nuevas este mes", "ok"], ["11 de 11", "respondidas"], ["8", "reservas tras el aviso de la novedad"]]) + "</div>" +
            resena.replace(" anim", "") +
            '<div class="caja caja-suave"><div class="entre"><strong>Respuesta de Librería Marea</strong>' + u.chip("Publicada", "ok") + "</div><p>" + respuesta + "</p></div>";
        }
        return movil + u.ventana({ quien: "Ordenador de Marisa", seccion: "Reseñas", cuerpo: cuerpo });
      }
    }
  ]
});
