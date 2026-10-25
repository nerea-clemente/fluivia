/* Demo · Distribución (ejemplo ficticio) */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "distribucion",
  etiqueta: "Distribución",
  tipo: "Distribución para hostelería",
  negocio: "Distribuciones Levante",
  lema: "Bebidas y alimentación para bares, restaurantes y tiendas",
  cliente: "Cliente",
  software: { actual: "tu programa de gestión (ERP) y de facturación", medida: "un panel de pedidos, rutas y cobros a medida" },
  marca: {
    m1: "#1C4E80", m1t: "#FFFFFF", m2: "#FFE3BF", m2t: "#3A2A12", suave: "#EEF3F8", tinta: "#14263B",
    fuente: "'Barlow', 'Arial Narrow', sans-serif", radio: "8px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="8" fill="#1C4E80"/><path d="M7 25V14h15v11M22 17.5h5.5L32 22v3h-10" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linejoin="round"/><circle cx="12.5" cy="27" r="2.8" fill="#F28C28"/><circle cx="27" cy="27" r="2.8" fill="#F28C28"/></svg>'
  },
  panel: ["Pedidos", "Rutas", "Albaranes", "Cobros", "Clientes"],
  situacion: "Ocho personas, cinco vehículos de reparto y unos 300 bares, restaurantes y tiendas como clientes. Los pedidos llegan por WhatsApp, por teléfono y de palabra al repartidor.",
  dolores: [
    ["Pedidos por WhatsApp que se teclean a mano", "Cada mañana alguien pasa al programa de gestión decenas de mensajes, audios y fotos de listas. Y algún pedido se queda en el móvil."],
    ["Albaranes en papel", "Se firman en la furgoneta y vuelven arrugados a la oficina. Si falta una caja o llega rota, nadie lo apunta."],
    ["«¿A qué hora llegáis?»", "Los clientes llaman para saber cuándo llega el reparto, y la oficina llama al repartidor para preguntarlo."],
    ["Cobros que se alargan", "Hay facturas vencidas que nadie reclama a tiempo, porque da apuro o porque no hay tiempo."]
  ],
  casos: [
    {
      id: "pedidos",
      montaje: { plazo: "3 a 4 semanas", con: "WhatsApp Business y tu programa de gestión (ERP)" },
      nav: "Pedidos por WhatsApp",
      titulo: "Pedidos por WhatsApp que entran solos en el sistema",
      hoy: "Los pedidos llegan por WhatsApp como mensajes sueltos, audios o fotos de una lista. Alguien los pasa a mano al programa de gestión y a veces se equivoca o se le escapa uno.",
      con: "Cada pedido se lee al llegar, se convierte en líneas con los códigos de tus productos y se comprueba el stock. El cliente recibe la confirmación y el pedido aparece en tu sistema.",
      pasos: [
        { quien: "cliente", nombre: "Manolo, Bar La Esquina", t: "Manolo pide como siempre, por WhatsApp", d: "A las 23:40, al cerrar el bar. Sin formularios ni aplicaciones nuevas: escribe como le sale.", boton: "Enviar el pedido" },
        { quien: "auto", t: "El pedido se entiende y se ordena", d: "Se reconocen los productos de tu catálogo con su código y su formato. «La de siempre» es la cerveza que Manolo pide cada semana.", boton: "Comprobar el stock" },
        { quien: "auto", t: "Se comprueba el stock y se confirma", d: "Del agua con gas solo quedan 3 cajas. Se le ofrece una alternativa, Manolo elige y recibe la confirmación con la hora de reparto.", boton: "Manolo elige" },
        { quien: "equipo", nombre: "Sergio, oficina", t: "Por la mañana, los pedidos ya están en el sistema", d: "Sergio encuentra los pedidos de la noche ya pasados al programa de gestión. Solo revisa los que llevan una nota.", boton: "Ver el resultado" }
      ],
      final: { antes: "Una hora cada mañana pasando pedidos de WhatsApp y algún error en cada reparto.", ahora: "Los pedidos de la noche están en el sistema antes de que llegue nadie a la oficina." },
      escena: function (x) {
        var u = UI;
        var prod = function (n, c) { return n + '<br><span class="tenue">' + c + "</span>"; };
        var pedido = "¡Buenas! Para mañana: 4 barriles de la de siempre, 3 cajas de Coca-Cola, 5 de agua con gas y 1 malla de limones. Gracias";
        var chat = u.fecha("Miércoles") + u.yo(pedido, "23:40", x.n(0));
        if (x.p === 0) chat += u.btn(u.icono("enviar") + "Enviar", true);
        if (x.p === 1) chat += u.ellos("Recibido, Manolo. Lo estamos preparando.", "23:40", " anim");
        if (x.p >= 2) chat += u.ellos("Recibido, Manolo. Lo estamos preparando.", "23:40") +
          u.ellos("Del <strong>agua con gas</strong> solo nos quedan 3 cajas. ¿Te mandamos 3 con gas y 2 sin gas, o solo las 3?", "23:41", x.n(2)) +
          (x.p === 2 ? u.respuestas(["3 con gas y 2 sin gas", "Solo las 3"], 0) : u.respuestas(["3 con gas y 2 sin gas", "Solo las 3"], null, 0));
        if (x.p === 3) chat += u.ellos("Pedido confirmado para <strong>mañana jueves, de 9:00 a 11:00</strong>:<br>· 4 barriles de cerveza 30 L<br>· 3 cajas de Coca-Cola<br>· 3 cajas de agua con gas y 2 sin gas<br>· 1 malla de limones", "23:41", " anim");
        var movil = u.movil({ quien: "Móvil de Manolo", app: "wa", hora: "23:41", cuerpo: chat });

        var cuerpo;
        if (x.p === 0) {
          cuerpo = '<p class="peq"><strong>Pedidos de esta noche</strong></p>' +
            u.tabla(["Cliente", "Líneas", "Entró", "Estado"], [
              ["Restaurante El Faro", "6", "22:15", u.chip("En el sistema", "ok")],
              ["Cafetería Sol", "3", "22:52", u.chip("En el sistema", "ok")]
            ]);
        } else if (x.p < 3) {
          var agua = x.p === 1 ? [prod("Agua con gas 24 × 50 cl", "AG-224"), "5 cajas", u.chip("Comprobando", "info")] : [prod("Agua con gas 24 × 50 cl", "AG-224"), "5 cajas", u.chip("Solo quedan 3", "alerta")];
          cuerpo = '<div class="entre"><strong>Pedido de Bar La Esquina</strong>' + u.chip("Entró a las 23:40", "info") + "</div>" +
            '<div class="anim">' + u.tabla(["Producto", "Cantidad", "Stock"], [
              [prod("Cerveza barril 30 L", "CB-030"), "4", u.chip("Hay", "ok")],
              [prod("Coca-Cola 24 latas", "RF-124"), "3 cajas", u.chip("Hay", "ok")],
              agua,
              [prod("Limones malla 5 kg", "FR-005"), "1", u.chip("Hay", "ok")]
            ], ["", "", x.p === 2 ? "is-resaltada" : ""]) + "</div>" +
            '<div class="caja caja-ia anim anim-2"><h5>Cómo lo ha entendido</h5><p>«La de siempre» es la cerveza en barril de 30 L: la pide cada semana desde hace dos años.</p></div>' +
            (x.p === 1 ? '<div class="fila">' + u.btn("Comprobar el stock", true) + "</div>" : "");
        } else {
          cuerpo = '<div class="anim">' + u.kpis([["23", "pedidos por WhatsApp esta noche"], ["21", "pasados al sistema solos", "ok"], ["2", "con nota para revisar", "alerta"]]) + "</div>" +
            u.tabla(["Cliente", "Líneas", "Entró", "Estado"], [
              ["Bar La Esquina", "5", "23:40", u.chip("En el sistema", "ok")],
              ["Hotel Miramar", "9", "00:12", u.chip("Pide un precio especial", "pend")],
              ["Restaurante El Faro", "6", "22:15", u.chip("En el sistema", "ok")],
              ["Tienda Coral", "4", "06:30", u.chip("Producto que no existe", "pend")]
            ], ["is-resaltada"]) +
            u.nota("Los pedidos con algo raro, como un precio especial o un producto que no está en el catálogo, esperan a que alguien los mire.");
        }
        return movil + u.ventana({ quien: "Ordenador de la oficina", seccion: "Pedidos", cuerpo: cuerpo });
      }
    },

    {
      id: "albaranes",
      montaje: { plazo: "2 a 3 semanas", con: "Una app web para los repartidores y tu programa de gestión" },
      nav: "Albaranes y entregas",
      titulo: "Albaranes firmados en el móvil, con fotos e incidencias",
      hoy: "El albarán se firma en papel en la furgoneta y vuelve a la oficina al final del día, si vuelve. Si falta una caja o llega una rota, nadie lo apunta.",
      con: "El repartidor entrega con el móvil: el cliente firma en la pantalla, cualquier incidencia se apunta con foto y el albarán firmado le llega al cliente y a la oficina al momento.",
      pasos: [
        { quien: "equipo", nombre: "Toni, repartidor", t: "Toni llega al bar con el pedido", d: "Abre la entrega en el móvil: ve lo que tiene que dejar y marca lo que descarga.", boton: "Marcar una incidencia" },
        { quien: "equipo", nombre: "Toni, repartidor", t: "Una caja llega dañada y se apunta con foto", d: "Una caja de Coca-Cola tiene latas abolladas. Toni la marca, hace una foto y se la lleva de vuelta.", boton: "Pasar a la firma" },
        { quien: "cliente", nombre: "Manolo, Bar La Esquina", t: "Manolo firma en la pantalla", d: "Con el dedo, en el móvil de Toni. No hay papel que guardar ni que perder.", boton: "Firmar" },
        { quien: "auto", t: "El cliente y la oficina lo tienen al momento", d: "A Manolo le llega el albarán firmado por correo. En la oficina queda guardado con el pedido y la caja dañada, como abono pendiente.", boton: "Ver el resultado" }
      ],
      final: { antes: "Albaranes que vuelven arrugados o no vuelven, e incidencias que se discuten semanas después.", ahora: "Cada entrega queda firmada, con fotos, en el sistema y en el correo del cliente al momento." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        var lineas = function (rota) {
          return u.check([
            ["4 barriles de cerveza 30 L", "ok"],
            ["3 cajas de Coca-Cola", rota ? "alerta" : "ok", rota ? "1 caja dañada · se devuelve" : ""],
            ["3 cajas de agua con gas", "ok"],
            ["2 cajas de agua sin gas", "ok"],
            ["1 malla de limones", "ok"]
          ]);
        };
        if (x.p === 0) {
          movil = u.movil({ quien: "Móvil de Toni", equipo: true, hora: "10:08", titulo: "Entrega 7 de 14", cuerpo:
            '<div class="caja caja-suave"><strong>Bar La Esquina</strong><p class="tenue">C/ Mayor 21 · Manolo Ruiz</p></div>' +
            lineas(false) +
            u.btn(u.icono("alerta") + "Marcar una incidencia", true, "sec")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Móvil de Toni", equipo: true, hora: "10:10", titulo: "Incidencia", cuerpo:
            '<div class="caja caja-alerta anim"><h5>' + u.icono("alerta") + "3 cajas de Coca-Cola</h5><p>1 caja dañada</p></div>" +
            u.foto(["#C9CED4", "#8C3B32"], "<span class=\"peq\">Foto de la caja</span>", " anim anim-2") +
            u.campos([["Nota", "Latas abolladas. Me la llevo de vuelta."]]) +
            u.btn("Pasar a la firma", true, "ancho")
          });
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Móvil de Toni", equipo: true, hora: "10:12", titulo: "Firma del cliente", cuerpo:
            '<p class="peq"><strong>Bar La Esquina</strong> recibe:</p>' + lineas(true) +
            u.firma(false) + u.btn("Firmar", true, "ancho")
          });
        } else {
          movil = u.movil({ quien: "Correo de Manolo", app: "mail", hora: "10:12", cuerpo:
            u.mail({ asunto: "Albarán A-04512 · entrega de hoy", clase: " anim", cuerpo:
              "<p>Hola, Manolo:</p><p>Te mandamos el albarán firmado de la entrega de hoy a las 10:12.</p><ul><li>4 barriles de cerveza 30 L</li><li>2 cajas de Coca-Cola (1 devuelta, dañada)</li><li>3 cajas de agua con gas y 2 sin gas</li><li>1 malla de limones</li></ul><p>La caja dañada te la abonamos en la próxima factura.</p>" })
          });
        }
        if (x.p < 3) {
          cuerpo = '<div class="entre"><strong>Ruta Norte · Toni</strong>' + u.chip("7 de 14 entregas", "info") + "</div>" +
            u.agenda([
              ["9:20", "<strong>Cafetería Sol</strong><small>Entregado y firmado</small>"],
              ["9:45", "<strong>Restaurante El Faro</strong><small>Entregado y firmado</small>"],
              ["10:10", "<strong>Bar La Esquina</strong><small>" + (x.p === 0 ? "Entregando" : "Entregando · 1 incidencia") + "</small>", "nueva"],
              ["10:40", "<strong>Hotel Miramar</strong><small>Pendiente</small>", "libre"]
            ]);
        } else {
          cuerpo = '<div class="entre"><strong>Albarán A-04512</strong>' + u.chip("Firmado", "ok") + "</div>" +
            u.ficha([["Cliente", "Bar La Esquina"], ["Entregado", "Jueves a las 10:12"], ["Firmado por", "Manolo Ruiz"], ["Repartidor", "Toni"]]) +
            '<div class="anim">' + lineas(true) + "</div>" +
            '<div class="fila anim anim-2">' + u.chip("Enviado al cliente por correo", "ok") + u.chip("Abono pendiente: 1 caja", "pend") + "</div>";
        }
        return movil + u.ventana({ quien: "Ordenador de la oficina", seccion: x.p < 3 ? "Rutas" : "Albaranes", cuerpo: cuerpo });
      }
    },

    {
      id: "reparto",
      montaje: { plazo: "2 semanas", con: "Tu planificación de rutas y WhatsApp Business" },
      nav: "Avisos de reparto",
      titulo: "Avisos para que el cliente sepa cuándo llega el reparto",
      hoy: "Los clientes llaman para preguntar a qué hora llega el reparto, y la oficina tiene que llamar al repartidor para saberlo.",
      con: "El cliente recibe la franja de entrega la víspera y un aviso cuando el reparto va hacia su local. Si hay un retraso, se le avisa solo.",
      pasos: [
        { quien: "auto", t: "La víspera, la franja de entrega", d: "Con la ruta ya planificada, cada cliente recibe a qué hora le llega su pedido y quién se lo lleva.", boton: "Ver el día del reparto" },
        { quien: "auto", t: "Cuando el reparto va hacia él, un aviso", d: "Toni termina la entrega anterior y a Manolo le llega «Llegamos en unos 15 minutos». Nadie ha tenido que escribirlo.", boton: "Hay un retraso" },
        { quien: "auto", t: "Si hay un retraso, se avisa solo", d: "Un atasco retrasa la ruta 25 minutos. Los clientes que quedan reciben la nueva hora y pueden decir si no estarán.", boton: "El hotel responde" },
        { quien: "equipo", nombre: "Sergio, oficina", t: "La oficina ve la ruta sin llamar a nadie", d: "Sergio ve por dónde va cada reparto y qué clientes han avisado de algo. El Hotel Miramar no estará: su entrega pasa a la tarde.", boton: "Ver el resultado" }
      ],
      final: { antes: "Llamadas cruzadas entre clientes, oficina y repartidores durante toda la mañana.", ahora: "Cada cliente sabe cuándo llega su pedido y la oficina ve las rutas en una pantalla." },
      escena: function (x) {
        var u = UI, movil;
        if (x.p === 0) {
          movil = u.movil({ quien: "Móvil de Manolo", app: "wa", hora: "19:00", cuerpo:
            u.fecha("Miércoles") +
            u.ellos("Hola, Manolo. Mañana jueves te llevamos tu pedido <strong>entre las 9:00 y las 11:00</strong>. Te lo lleva Toni.", "19:00", " anim")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Móvil de Manolo", app: "wa", hora: "9:55", cuerpo:
            u.fecha("Miércoles") +
            u.ellos("Hola, Manolo. Mañana jueves te llevamos tu pedido <strong>entre las 9:00 y las 11:00</strong>. Te lo lleva Toni.", "19:00") +
            u.fecha("Jueves") +
            u.ellos("Toni va hacia tu local: <strong>llega en unos 15 minutos</strong>.", "9:55", " anim")
          });
        } else {
          movil = u.movil({ quien: "Móvil del Hotel Miramar", app: "wa", hora: "10:20", cuerpo:
            u.fecha("Jueves") +
            u.ellos("Hola. El reparto de Distribuciones Levante va con retraso: llegamos a las <strong>11:05</strong> en lugar de a las 10:40. ¿Estaréis?", "10:20", x.n(2)) +
            (x.p === 2 ? u.respuestas(["Sí, aquí estamos", "Hoy no estaremos"], 1) :
              u.respuestas(["Sí, aquí estamos", "Hoy no estaremos"], null, 1) +
              u.ellos("Gracias por avisar. Te lo llevamos esta tarde, entre las 16:00 y las 18:00.", "10:21", " anim"))
          });
        }
        var cuerpo;
        if (x.p === 0) {
          cuerpo = '<p class="peq"><strong>Rutas de mañana</strong></p>' +
            u.tabla(["Ruta", "Repartidor", "Entregas", "Avisos"], [
              ["Norte", "Toni", "14", u.chip("Enviados", "ok")],
              ["Centro", "Luis", "18", u.chip("Enviados", "ok")],
              ["Costa", "Ana", "11", u.chip("Enviados", "ok")]
            ]) +
            '<div class="fila">' + u.btn("Ver el día del reparto", true) + "</div>";
        } else {
          var ret = x.p >= 2;
          cuerpo = '<div class="entre"><strong>Ruta Norte · Toni</strong>' + (ret ? u.chip("Va con 25 minutos de retraso", "alerta") : u.chip("A su hora", "ok")) + "</div>" +
            u.agenda([
              ["9:20", "<strong>Cafetería Sol</strong><small>Entregado</small>"],
              ["9:45", "<strong>Restaurante El Faro</strong><small>Entregado</small>"],
              ["10:10", "<strong>Bar La Esquina</strong><small>" + (ret ? "Entregado" : "Aviso enviado: llega en 15 minutos") + "</small>", ret ? "" : "nueva", ret ? "" : x.n(1)],
              [ret ? "11:05" : "10:40", "<strong>Hotel Miramar</strong><small>" + (x.p === 3 ? "No estarán: pasa a la tarde, de 16:00 a 18:00" : ret ? "Nueva hora avisada" : "Pendiente") + "</small>", x.p === 3 ? "hueco" : "libre", x.p === 3 ? " anim" : ""],
              [ret ? "11:30" : "11:05", "<strong>Tienda Coral</strong><small>" + (ret ? "Nueva hora avisada" : "Pendiente") + "</small>", "libre"]
            ]);
          if (x.p === 2) cuerpo += '<div class="caja caja-alerta anim"><h5>' + u.icono("alerta") + "Retraso de 25 minutos</h5><p>Se ha avisado a los 6 clientes que quedan en la ruta.</p></div>";
          if (x.p === 3) cuerpo += '<div class="anim anim-2">' + u.kpis([["43", "entregas hoy"], ["86", "avisos enviados solos", "ok"], ["1", "entrega pasada a la tarde"]]) + "</div>";
        }
        return movil + u.ventana({ quien: "Ordenador de la oficina", seccion: "Rutas", cuerpo: cuerpo });
      }
    },

    {
      id: "cobros",
      montaje: { plazo: "2 a 3 semanas", con: "Tu programa de facturación y tu correo o WhatsApp" },
      nav: "Cobros pendientes",
      titulo: "Cobros pendientes, reclamados a tiempo",
      hoy: "Las facturas vencidas se acumulan porque reclamarlas da apuro y nunca hay tiempo. Cuando alguien se pone, algunas ya tienen tres meses.",
      con: "Cada factura vencida recibe recordatorios amables y escalonados, con la factura adjunta. Administración ve quién debe qué y decide en los casos delicados.",
      pasos: [
        { quien: "auto", t: "Vence una factura y sale un recordatorio amable", d: "Tres días después del vencimiento, el cliente recibe un recordatorio con la factura adjunta y los datos para pagar.", boton: "Ver el siguiente recordatorio" },
        { quien: "auto", t: "Si no paga, un segundo aviso más directo", d: "A los 15 días, por WhatsApp. Si el cliente responde que ya ha pagado o que hay un problema con la factura, los avisos se paran y se avisa a administración.", boton: "Pilar responde" },
        { quien: "equipo", nombre: "Rosa, administración", t: "Rosa ve quién debe qué", d: "Las deudas por antigüedad y lo que ha contestado cada cliente. A los clientes importantes o con una reclamación abierta no les sale ningún aviso sin que Rosa lo decida.", boton: "Ver el resultado" }
      ],
      final: { antes: "Facturas vencidas de hace meses y llamadas incómodas para reclamarlas.", ahora: "Lo normal se cobra con recordatorios automáticos y Rosa dedica su tiempo a los casos que lo necesitan." },
      escena: function (x) {
        var u = UI, movil;
        if (x.p === 0) {
          movil = u.movil({ quien: "Correo de Pilar (Cafetería Sol)", app: "mail", hora: "9:00", cuerpo:
            u.mail({ asunto: "Recordatorio: factura F-0387", clase: " anim", cuerpo:
              "<p>Hola, Pilar:</p><p>Te recordamos que la factura <strong>F-0387, de 486,20 €</strong>, venció el 5 de octubre. Si ya la has pagado, no hagas caso a este mensaje.</p><p>Puedes pagarla por transferencia a la cuenta que aparece en la factura.</p><p>Gracias,<br>Administración</p><p class=\"tenue\">Adjunto: F-0387.pdf</p>" })
          });
        } else {
          movil = u.movil({ quien: "Móvil de Pilar (Cafetería Sol)", app: "wa", hora: "10:02", cuerpo:
            u.fecha("20 de octubre") +
            u.ellos("Hola, Pilar. La factura F-0387 (486,20 €) lleva 15 días vencida. ¿Nos dices cuándo podrás pagarla?", "10:00", x.n(1)) +
            (x.p === 1 ? u.respuestas(["Ya está pagada", "La pago esta semana", "Hay un error en la factura"], 1) :
              u.respuestas(["Ya está pagada", "La pago esta semana", "Hay un error en la factura"], null, 1) +
              u.ellos("Perfecto, gracias. Lo apuntamos.", "10:02", " anim"))
          });
        }
        var sol = x.p === 0 ? u.chip("1.er recordatorio enviado", "info") : x.p === 1 ? u.chip("2.º recordatorio enviado", "info") : u.chip("Pagará esta semana", "ok");
        var cuerpo = (x.p === 2 ? '<div class="anim">' + u.kpis([["12.480 €", "vencido"], ["3.210 €", "cobrado este mes tras un recordatorio", "ok"], ["2", "casos para Rosa", "alerta"]]) + "</div>" : u.kpis([["12.480 €", "vencido"], ["27", "facturas vencidas"]])) +
          u.tabla(["Cliente", "Factura", "Importe", "Vencida", "Estado"], [
            ["Cafetería Sol", "F-0387", "486,20 €", x.p === 0 ? "3 días" : "15 días", sol],
            ["Restaurante El Faro", "F-0352", "1.240,00 €", "32 días", u.chip("Para Rosa: cliente importante", "alerta")],
            ["Bar Tito", "F-0401", "96,50 €", "5 días", u.chip("1.er recordatorio enviado", "info")],
            ["Hotel Miramar", "F-0298", "2.310,00 €", "61 días", u.chip("Dice que hay un error", "alerta")]
          ], ["is-resaltada"]);
        if (x.p === 2) cuerpo += u.nota("Aquí solo se recuerdan facturas: se emiten con tu programa de facturación de siempre.");
        return movil + u.ventana({ quien: "Ordenador de Rosa", seccion: "Cobros", cuerpo: cuerpo });
      }
    }
  ]
});
