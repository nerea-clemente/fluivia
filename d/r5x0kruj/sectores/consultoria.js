/* Demo · Consultoría o agencia (ejemplo ficticio) */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "consultoria",
  etiqueta: "Consultoría o agencia",
  tipo: "Agencia de marketing",
  negocio: "Estudio Candela",
  lema: "Marketing y comunicación para pymes y negocios de barrio",
  cliente: "Cliente",
  software: { actual: "tu gestor de proyectos (Asana, Trello o Notion) y tu Google Drive", medida: "un panel de clientes, propuestas y aprobaciones a medida" },
  marca: {
    m1: "#4A2C5E", m1t: "#FFFFFF", m2: "#FFE1D1", m2t: "#5A2A14", suave: "#F5F0F7", tinta: "#2B1B37",
    fuente: "'Outfit', 'Segoe UI', sans-serif", radio: "10px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#4A2C5E"/><path d="M27 13.6a9 9 0 1 0 0 12.8" fill="none" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round"/><circle cx="27.6" cy="20" r="3" fill="#FFB38A"/></svg>'
  },
  panel: ["Clientes", "Propuestas", "Proyectos", "Aprobaciones", "Informes"],
  situacion: "Seis personas y unos 25 clientes con cuota mensual: redes sociales, anuncios y alguna web para pymes de la zona. Casi todo pasa por el correo, y lo que no, por WhatsApp.",
  dolores: [
    ["Propuestas que tardan días", "Después de cada reunión, alguien rehace una propuesta copiando la última que se envió. Mientras tanto, el posible cliente se enfría."],
    ["Bienvenidas a medias", "Cuestionario, accesos, carpetas, tareas: cada cliente nuevo se monta a mano y siempre falta algo. La primera semana se va en perseguir contraseñas."],
    ["Aprobaciones perdidas en el correo", "«Te paso la versión 3», respuesta en otro hilo y un audio por WhatsApp. Al final nadie sabe cuál era la buena ni quién dijo que sí."],
    ["Informes que se comen dos días", "A primeros de mes, sacar datos de Meta, Google y la web, pegarlos en una presentación y escribir conclusiones, cliente a cliente."]
  ],
  casos: [
    {
      id: "propuestas",
      montaje: { plazo: "2 a 3 semanas", con: "Tus plantillas y tarifas, tu herramienta de videollamadas y un sistema para aceptar propuestas online" },
      nav: "Propuestas",
      titulo: "Propuestas listas el mismo día de la reunión",
      hoy: "Después de cada primera reunión, alguien rehace una propuesta a partir de la última que se envió. Tarda dos o tres días y luego nadie sabe si el cliente la ha leído.",
      con: "Con lo que se habló en la reunión y vuestras tarifas sale un borrador. Quien lleva la reunión lo revisa, decide el precio y lo envía. Ves cuándo lo abre el cliente y él lo acepta con un botón.",
      ganas: ["La propuesta sale el mismo día", "Precios coherentes con vuestras tarifas", "Sabes cuándo toca llamar"],
      pasos: [
        { quien: "equipo", nombre: "Irene, socia", t: "Irene tiene la primera reunión con un posible cliente", d: "Una videollamada de 40 minutos con Obrador Sanz, una panadería con dos tiendas. Con su permiso se transcribe, e Irene apunta tres notas.", boton: "Preparar la propuesta" },
        { quien: "auto", t: "Sale un borrador con vuestras tarifas", d: "Objetivo, qué incluye, plazos y precio, con vuestra plantilla. Lo que no encaja con lo que se habló queda señalado para que lo decida Irene.", boton: "Revisar el borrador" },
        { quien: "equipo", nombre: "Irene, socia", t: "Irene ajusta el precio y la envía", d: "Parte la propuesta en dos opciones y deja la tienda online para más adelante. El precio lo decide ella, no el borrador.", boton: "Enviar la propuesta" },
        { quien: "cliente", nombre: "Andrés, Obrador Sanz", t: "Andrés la lee en el móvil y la acepta", d: "Elige una de las dos opciones y la acepta con un botón. Irene ve cuándo la ha abierto. Si pasan cinco días sin respuesta, le llega un recordatorio para llamarle.", boton: "Aceptar la propuesta" }
      ],
      final: { antes: "Dos o tres días para cada propuesta, copiando de la última, y sin saber si el cliente la ha leído.", ahora: "La propuesta sale el mismo día de la reunión. Irene revisa un borrador en lugar de escribir desde cero y el precio lo sigue decidiendo ella." },
      escena: function (x) {
        var u = UI;
        if (x.p === 0) {
          return u.ventana({ quien: "Ordenador de Irene", seccion: "Propuestas", cuerpo:
            '<div class="entre"><strong>Obrador Sanz · primera reunión</strong>' + u.chip("Hoy, 10:00 · 40 min", "info") + "</div>" +
            u.ficha([["Con", "Andrés Sanz y su hermana Lucía"], ["Negocio", "Panadería con obrador y dos tiendas"], ["Cómo llegó", "Recomendado por Clínica Dental Ruiz"]]) +
            '<div class="caja anim"><h5>' + u.icono("mic") + 'Lo que se habló</h5><p class="tenue">«Queremos vender tartas por encargo desde la web, ahora todo va por teléfono.» · «Instagram lo lleva mi hermana cuando puede.» · «Pensábamos en unos 600 € al mes, no mucho más.»</p></div>' +
            u.campos([["Notas de Irene", "Empezar por redes y anuncios en la zona. Deciden los dos hermanos. Quieren tenerlo en marcha antes de Navidad."]]) +
            '<div class="fila">' + u.btn("Preparar la propuesta", true) + "</div>"
          });
        }
        if (x.p === 1) {
          return u.ventana({ quien: "Ordenador de Irene", seccion: "Propuestas", cuerpo:
            '<div class="entre"><strong>Propuesta para Obrador Sanz</strong>' + u.chip("Borrador", "pend") + "</div>" +
            '<div class="caja caja-ia anim"><h5>Borrador preparado</h5>' + u.ficha([
              ["Objetivo", "Vender tartas por encargo desde la web antes de Navidad"],
              ["Qué incluye", "Redes sociales (12 publicaciones al mes) y anuncios en Instagram y Google en la zona"],
              ["Plazo", "3 meses, desde el 3 de noviembre"],
              ["Precio", "750 € al mes, según vuestra tarifa"]
            ]) + "</div>" +
            '<div class="anim anim-2">' + u.check([
              ["El precio supera lo que dijeron", "alerta", "Andrés habló de unos 600 € al mes. Lo decide Irene."],
              ["Caso parecido para enseñar", "ok", "Pastelería Mirto, del año pasado"],
              ["Fecha de inicio", "pend", "Propuesta: martes 3 de noviembre"]
            ]) + "</div>" +
            '<div class="fila">' + u.btn("Revisar el borrador", true) + "</div>" +
            u.nota("El borrador sale de vuestras plantillas, tarifas y propuestas anteriores. No se envía nada sin que lo revise una persona.")
          });
        }
        if (x.p === 2) {
          return u.ventana({ quien: "Ordenador de Irene", seccion: "Propuestas", cuerpo:
            '<div class="entre"><strong>Propuesta para Obrador Sanz</strong>' + u.chip("Revisada por Irene", "ok") + "</div>" +
            '<div class="anim">' + u.tabla(["Opción", "Qué incluye", "Al mes"], [
              ["<strong>Redes</strong>", "12 publicaciones e historias", "480 €"],
              ['<strong>Redes y anuncios</strong><br><span class="tenue">La que recomendamos</span>', "Lo anterior y anuncios en Instagram y Google en la zona", "690 €"]
            ], ["", "is-resaltada"]) + "</div>" +
            '<div class="caja caja-suave anim anim-2"><h5>Cambios de Irene</h5><p>Dos opciones en lugar de una y el precio ajustado. El dinero de los anuncios va aparte y lo decide el cliente. La tienda online, para una segunda fase.</p></div>' +
            '<div class="fila">' + u.btn("Enviar la propuesta", true) + u.btn("Editar", false, "sec") + "</div>"
          });
        }
        var movil = u.movil({ quien: "Móvil de Andrés", hora: x.fin ? "9:12" : "21:32", titulo: "Propuesta para Obrador Sanz", cuerpo:
          '<p class="peq">Hola, Andrés. Aquí tienes lo que hablamos el lunes. Elige la opción que prefieras.</p>' +
          u.campos([["Opción", u.opc(["Redes · 480 € al mes", "Redes y anuncios · 690 € al mes"], 1)]]) +
          u.ficha([["Plazo", "3 meses, desde el 3 de noviembre"], ["Anuncios", "Aparte, desde 150 € al mes. Lo decides tú."], ["Quién lo lleva", "Marcos, con Laia en diseño"]]) +
          (x.fin ? '<div class="caja caja-suave anim"><h5>' + u.icono("check") + "Propuesta aceptada</h5><p>Gracias, Andrés. Hoy te llega un correo con los primeros pasos.</p></div>" :
            u.btn("Aceptar la propuesta", true, "ancho"))
        });
        var cuerpo = '<div class="entre"><strong>Obrador Sanz</strong>' + (x.fin ? u.chip("Aceptada", "ok") : u.chip("Enviada", "info")) + "</div>" +
          u.agenda([
            ["13:10", "<strong>Propuesta enviada</strong><small>Lunes, el mismo día de la reunión</small>"],
            ["21:32", "<strong>Andrés la abre</strong><small>Lunes, desde el móvil</small>"],
            x.fin ? ["9:12", "<strong>Aceptada: redes y anuncios</strong><small>Martes · empieza el alta del cliente</small>", "nueva", " anim"] :
              ["Sáb.", "<strong>Si no contesta, recordatorio para Irene</strong><small>Para llamarle, no para insistir por correo</small>", "libre"]
          ]);
        if (x.fin) cuerpo += u.nota("Lo que se ofrece y a qué precio lo decide siempre quien firma la propuesta.");
        return movil + u.ventana({ quien: "Ordenador de Irene", seccion: "Propuestas", cuerpo: cuerpo });
      }
    },

    {
      id: "alta",
      montaje: { plazo: "2 semanas", con: "Tu gestor de proyectos (Asana, Trello o Notion), tu Google Drive y tu calendario" },
      nav: "Alta de clientes",
      titulo: "Cliente nuevo: de la firma al arranque sin perseguir a nadie",
      hoy: "Cuando un cliente firma, alguien manda el cuestionario, pide accesos, crea carpetas y tareas y busca hueco para la reunión. Siempre falta algo y la primera semana se va en perseguir contraseñas.",
      con: "Al aceptar la propuesta, el cliente recibe una bienvenida con un cuestionario y una lista de accesos que da él mismo, sin mandar contraseñas. La carpeta, las tareas y la reunión de arranque se crean solas.",
      ganas: ["Ninguna bienvenida a medias", "Sin contraseñas por correo", "El equipo empieza con todo a mano"],
      pasos: [
        { quien: "auto", t: "Al aceptar, le llega la bienvenida", d: "Andrés recibe un correo con lo que va a pasar en las dos primeras semanas, quién lleva su cuenta y un enlace a su cuestionario.", boton: "Abrir el cuestionario" },
        { quien: "cliente", nombre: "Andrés, Obrador Sanz", t: "Andrés cuenta su negocio y da los accesos", d: "A quién vende, qué no quiere ver en sus redes y quién aprueba las publicaciones. Los accesos a Instagram y Meta los da él desde cada plataforma: nadie manda contraseñas.", boton: "Enviar" },
        { quien: "auto", t: "Carpeta, tareas y reunión de arranque, creadas", d: "La carpeta del cliente con su cuestionario, las tareas de las dos primeras semanas en vuestro gestor de proyectos y la reunión a la hora que eligió Andrés.", boton: "Ver lo que falta" },
        { quien: "equipo", nombre: "Marcos, cuentas", t: "Marcos solo mira lo que falta", d: "El acceso a Google Analytics sigue pendiente. A Andrés le llega un recordatorio; Marcos solo interviene si el viernes sigue faltando.", boton: "Ver el resultado" }
      ],
      final: { antes: "Una semana de correos para pedir cuestionarios, accesos y fechas, y tareas que dependen de quién se acuerde.", ahora: "El cliente lo da todo en un sitio y el equipo llega a la reunión de arranque con la carpeta y las tareas preparadas." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        var estado = function (k) {
          return u.check([
            ["Propuesta aceptada", "ok", "Redes y anuncios · 690 € al mes"],
            ["Bienvenida enviada", "ok", "Con las dos primeras semanas explicadas"],
            ["Cuestionario", k >= 2 ? "ok" : "pend", k >= 2 ? "Rellenado por Andrés" : "Enviado, sin rellenar"],
            ["Accesos a Instagram y Meta", k >= 2 ? "ok" : "pend", k >= 2 ? "Dados por Andrés desde cada plataforma" : "Pendientes"],
            ["Acceso a Google Analytics", x.fin ? "ok" : "pend", x.fin ? "Dado por Andrés el jueves" : k >= 3 ? "Recordatorio enviado. Si el viernes falta, aviso a Marcos." : "Pendiente"],
            ["Carpeta, tareas y reunión de arranque", k >= 2 ? "ok" : "pend", k >= 2 ? "Martes 3, 10:00 · invitación enviada" : "Se crean al recibir el cuestionario"]
          ]);
        };
        var cab = '<div class="entre"><strong>Obrador Sanz</strong>' + u.chip("Cliente nuevo", "marca") + "</div>";
        var quien = function (t, q) { return t + '<br><span class="tenue">' + q + "</span>"; };
        if (x.p === 0) {
          movil = u.movil({ quien: "Correo de Andrés", app: "mail", hora: "9:20", cuerpo:
            u.mail({ asunto: "Bienvenido: tus dos primeras semanas", clase: " anim", cuerpo:
              "<p>Hola, Andrés:</p><p>Gracias por confiar en nosotros. Esto es lo que va a pasar:</p><ul><li><strong>Esta semana:</strong> nos cuentas tu negocio en un cuestionario de 10 minutos y nos das acceso a tus cuentas.</li><li><strong>Martes 3:</strong> reunión de arranque con Marcos, que lleva tu cuenta.</li><li><strong>Semana 2:</strong> primer calendario de publicaciones para que lo apruebes.</li></ul>" +
              "<p>" + u.btn("Abrir el cuestionario", true) + "</p>" })
          });
          cuerpo = cab + estado(0);
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Móvil de Andrés", hora: "9:31", titulo: "Antes de empezar", cuerpo:
            '<p class="peq">Son 10 minutos. Lo que nos cuentes aquí lo leerá todo el equipo.</p>' +
            u.campos([
              ["¿Qué vendes y a quién?", "Pan de masa madre y tartas. Gente del barrio y algunas empresas, para desayunos."],
              ["¿Qué no quieres ver en tus redes?", "Fotos de banco de imágenes y ofertas a lo loco."],
              ["¿Quién aprueba las publicaciones?", "Yo. Si no estoy, mi hermana Lucía."],
              ["Reunión de arranque", u.opc(["Mar. 3 · 10:00", "Mar. 3 · 16:00", "Mié. 4 · 10:00"], 0)]
            ]) +
            '<p class="peq"><strong>Accesos</strong></p>' +
            u.check([
              ["Instagram", "ok", "Acceso de colaborador dado desde la app"],
              ["Meta Business", "ok", "Acceso de socio dado"],
              ["Google Analytics", "pend", "Lo hago luego"]
            ]) +
            u.btn("Enviar", true, "ancho")
          });
          cuerpo = cab + estado(1);
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Correo de Andrés", app: "mail", hora: "9:33", cuerpo:
            u.mail({ asunto: "Reunión de arranque · martes 3, 10:00", clase: " anim", cuerpo:
              "<p>Hola, Andrés:</p><p>Gracias por el cuestionario. Nos vemos el <strong>martes 3 de noviembre a las 10:00</strong> en vuestro obrador, con Marcos y Laia.</p><p>Solo nos falta el acceso a Google Analytics. Te dejamos los pasos: son dos minutos.</p>" })
          });
          cuerpo = '<div class="entre"><strong>Obrador Sanz · arranque</strong>' + u.chip("Creado solo", "ok") + "</div>" +
            '<div class="caja anim"><h5>' + u.icono("doc") + 'Carpeta del cliente</h5><ul class="lista-simple">' +
              "<li><span>01 Propuesta aceptada</span><span class=\"tenue\">PDF</span></li>" +
              "<li><span>02 Cuestionario</span><span class=\"tenue\">De Andrés</span></li>" +
              "<li><span>03 Marca: logos y fotos</span><span class=\"tenue\">Se pide en el arranque</span></li>" +
              "<li><span>04 Informes</span><span class=\"tenue\">Vacía</span></li>" +
            "</ul></div>" +
            '<div class="anim anim-2">' + u.tabla(["Tarea", "Para"], [
              [quien("Leer el cuestionario", "Marcos"), "Lunes 2"],
              [quien("Revisar sus redes actuales", "Laia"), "Lunes 2"],
              [quien("Reunión de arranque", "Marcos y Laia"), "Martes 3"],
              [quien("Primer calendario de publicaciones", "Laia"), "Viernes 6"]
            ]) + "</div>";
        } else {
          var chat = u.fecha("Jueves") +
            u.ellos("Hola, Andrés. Para preparar tu primer informe nos falta el acceso a <strong>Google Analytics</strong>. Son dos minutos." + u.btn("Ver los pasos", false), "10:00", x.n(3));
          if (x.fin) chat += u.yo("Hecho, ya lo tenéis", "12:41") + u.ellos("Recibido, gracias. ¡Nos vemos el martes!", "12:42", " anim");
          movil = u.movil({ quien: "Móvil de Andrés", app: "wa", hora: x.fin ? "12:42" : "10:00", cuerpo: chat });
          cuerpo = cab + estado(3) + u.nota("Las contraseñas no viajan por correo: cada acceso lo da el cliente desde su propia cuenta y se puede retirar cuando quiera.");
        }
        return movil + u.ventana({ quien: "Ordenador de Marcos", seccion: x.p === 2 ? "Proyectos" : "Clientes", cuerpo: cuerpo });
      }
    },

    {
      id: "aprobaciones",
      montaje: { plazo: "3 a 4 semanas", con: "Un portal web para tus clientes, sin descargas, y tu herramienta para programar publicaciones" },
      nav: "Aprobaciones",
      titulo: "Aprobaciones en un solo sitio, no en veinte correos",
      hoy: "Los diseños y textos van por correo, el cliente contesta en otro hilo o por WhatsApp, y al final nadie sabe qué versión es la buena ni quién dijo que sí.",
      con: "El cliente ve cada pieza en un enlace, comenta encima y aprueba con un botón. Cada cambio queda con su versión y no se programa nada sin aprobación.",
      ganas: ["Una sola versión buena", "Los comentarios, encima de la pieza", "Queda claro quién aprobó qué y cuándo"],
      pasos: [
        { quien: "equipo", nombre: "Laia, diseño", t: "Laia sube las publicaciones de la semana", d: "Tres publicaciones para el Instagram de Obrador Sanz. Al subirlas, a Andrés le llega un aviso con un enlace.", boton: "Enviar a Andrés" },
        { quien: "cliente", nombre: "Andrés, Obrador Sanz", t: "Andrés comenta encima de cada pieza", d: "Las ve en el móvil, aprueba dos y en la tercera pide un cambio: el precio de la tarta de queso está mal.", boton: "Pedir el cambio" },
        { quien: "equipo", nombre: "Laia, diseño", t: "El cambio le llega a Laia como tarea", d: "Con el comentario, la pieza y el día que se publica. Laia corrige el precio y sube la versión 2.", boton: "Subir la versión 2" },
        { quien: "cliente", nombre: "Andrés, Obrador Sanz", t: "Andrés aprueba y queda registrado", d: "Le llega un aviso, ve la versión nueva y la aprueba. Queda guardado quién aprobó cada versión y cuándo, y las tres publicaciones se programan.", boton: "Aprobar" }
      ],
      final: { antes: "Hilos de correo con versiones cruzadas, audios por WhatsApp y alguna publicación que salió con un error ya corregido.", ahora: "Cada pieza tiene su enlace, sus comentarios y sus versiones. Lo que se publica es lo que aprobó el cliente." },
      escena: function (x) {
        var u = UI, movil;
        var t1 = ["#C99A5B", "#7A4F22"], t2 = ["#B98E6E", "#5E3B22"], t3 = ["#C46A85", "#7A2E46"];
        var pieza = function (tono, txt, clase) { return u.foto(tono, '<span class="peq"><strong>' + txt + "</strong></span>", clase); };
        var sale = function (t, d) { return t + '<br><span class="tenue">Sale el ' + d.toLowerCase() + "</span>"; };
        var pie = function (dia, txt) { return '<p class="peq"><strong>' + dia + "</strong> · " + txt + "</p>"; };
        if (x.p === 0) {
          return u.ventana({ quien: "Ordenador de Laia", seccion: "Aprobaciones", cuerpo:
            '<div class="entre"><strong>Obrador Sanz · semana del 9 de noviembre</strong>' + u.chip("3 publicaciones", "info") + "</div>" +
            '<div class="dos">' +
              "<div>" + pieza(t1, "Masa madre por dentro") + pie("Lunes 9", "48 horas de fermentación") + "</div>" +
              "<div>" + pieza(t2, "Encarga tu roscón") + pie("Miércoles 11", "Encargos de Navidad") + "</div>" +
              "<div>" + pieza(t3, "Tarta de queso · 22 €") + pie("Viernes 13", "La tarta de la semana") + "</div>" +
            "</div>" +
            u.campos([["Mensaje para Andrés", "Las publicaciones de la semana que viene. Si puedes, antes del jueves."]]) +
            '<div class="fila">' + u.btn("Enviar a Andrés", true) + "</div>"
          });
        }
        if (x.p === 1) {
          movil = u.movil({ quien: "Móvil de Andrés", hora: "19:42", titulo: "Para revisar", cuerpo:
            '<p class="peq">Laia te ha mandado 3 publicaciones para la semana del 9.</p>' +
            pieza(t1, "Masa madre por dentro") + '<div class="entre">' + pie("Lunes 9", "masa madre") + u.chip("Aprobada", "ok") + "</div>" +
            pieza(t2, "Encarga tu roscón") + '<div class="entre">' + pie("Miércoles 11", "Navidad") + u.chip("Aprobada", "ok") + "</div>" +
            pieza(t3, "Tarta de queso · 22 €") + pie("Viernes 13", "tarta de la semana") +
            u.campos([["Tu comentario", "La tarta de queso entera es a 24 €, no a 22 €."]]) +
            u.btn("Pedir el cambio", true, "ancho")
          });
          return movil + u.ventana({ quien: "Ordenador de Laia", seccion: "Aprobaciones", cuerpo:
            '<div class="entre"><strong>Obrador Sanz · semana del 9</strong>' + u.chip("Enviado a Andrés", "ok") + "</div>" +
            u.tabla(["Publicación", "Estado"], [
              [sale("Masa madre por dentro", "Lunes 9"), u.chip("Pendiente", "pend")],
              [sale("Encarga tu roscón", "Miércoles 11"), u.chip("Pendiente", "pend")],
              [sale("Tarta de queso", "Viernes 13"), u.chip("Pendiente", "pend")]
            ])
          });
        }
        if (x.p === 2) {
          return u.ventana({ quien: "Ordenador de Laia", seccion: "Aprobaciones", cuerpo:
            '<div class="entre"><strong>Tarta de queso · viernes 13</strong>' + u.chip("Cambio pedido", "alerta") + "</div>" +
            '<div class="caja anim"><h5>' + u.icono("chat") + "Comentario de Andrés</h5><p>«La tarta de queso entera es a 24 €, no a 22 €.»</p><p class=\"tenue\">Sobre la versión 1 · lunes a las 19:42</p></div>" +
            '<div class="dos anim anim-2">' +
              "<div>" + pieza(t3, "Tarta de queso · 22 €") + '<p class="peq tenue">Versión 1</p></div>' +
              "<div>" + pieza(t3, "Tarta de queso · 24 €") + '<p class="peq"><strong>Versión 2</strong> · precio corregido</p></div>' +
            "</div>" +
            u.tabla(["Publicación", "Sale", "Estado"], [
              ["Masa madre por dentro", "Lunes 9", u.chip("Aprobada", "ok")],
              ["Encarga tu roscón", "Miércoles 11", u.chip("Aprobada", "ok")],
              ["Tarta de queso", "Viernes 13", u.chip("Cambio pedido", "alerta")]
            ], ["", "", "is-resaltada"]) +
            '<div class="fila">' + u.btn("Subir la versión 2", true) + "</div>"
          });
        }
        movil = u.movil({ quien: "Móvil de Andrés", hora: x.fin ? "9:31" : "9:16", titulo: "Para revisar", cuerpo:
          u.aviso("Estudio Candela", "Laia ha subido la versión 2 de la publicación del viernes 13.", x.n(3)) +
          pieza(t3, "Tarta de queso · 24 €") +
          pie("Viernes 13", "versión 2, con el precio corregido") +
          (x.fin ? '<div class="caja caja-suave anim"><h5>' + u.icono("check") + "Aprobada</h5><p>Se publica el viernes 13 a las 12:00.</p></div>" : u.btn("Aprobar", true, "ancho"))
        });
        var cuerpo = '<div class="entre"><strong>Obrador Sanz · semana del 9</strong>' + (x.fin ? u.chip("Las 3 programadas", "ok") : u.chip("1 esperando a Andrés", "pend")) + "</div>" +
          u.agenda([
            ["10:02", "<strong>Laia sube 3 publicaciones</strong><small>Lunes · versión 1</small>"],
            ["19:40", "<strong>Andrés aprueba 2</strong><small>Lunes · masa madre y roscón</small>"],
            ["19:42", "<strong>Andrés pide un cambio</strong><small>Lunes · precio de la tarta de queso</small>"],
            ["9:15", "<strong>Laia sube la versión 2</strong><small>Martes · precio corregido</small>"],
            x.fin ? ["9:31", "<strong>Andrés aprueba la versión 2</strong><small>Martes · se programan las 3</small>", "nueva", " anim"] :
              ["", "<strong>Esperando a Andrés</strong><small>Versión 2 de la tarta de queso</small>", "libre"]
          ]);
        if (x.fin) cuerpo += u.nota("No se programa nada sin la aprobación del cliente, y queda guardado quién aprobó cada versión.");
        return movil + u.ventana({ quien: "Ordenador de Laia", seccion: "Aprobaciones", cuerpo: cuerpo });
      }
    },

    {
      id: "informes",
      montaje: { plazo: "3 a 4 semanas", con: "Conexión con Meta, Google Ads y Google Analytics, y tu plantilla de informe" },
      nav: "Informes mensuales",
      titulo: "Informes mensuales que se montan solos y revisa una persona",
      hoy: "A primeros de mes, alguien pasa dos días sacando datos de Meta, Google y la web de cada cliente, pegándolos en una presentación y escribiendo conclusiones.",
      con: "El día 1 se recogen los datos de cada cliente y se monta el informe con vuestro formato. La IA propone un resumen; quien lleva la cuenta lo corrige, añade su opinión y lo envía.",
      ganas: ["Sin copiar y pegar datos", "Más tiempo para pensar el mes siguiente", "Lo que dice el informe lo firma una persona"],
      pasos: [
        { quien: "auto", t: "El día 1 se recogen los datos", d: "De Instagram, de los anuncios de Meta y Google y de la web de cada uno de vuestros 25 clientes. Si a alguno se le ha caído una conexión, se avisa.", boton: "Montar los informes" },
        { quien: "auto", t: "Se monta el informe con un resumen propuesto", d: "Con vuestro formato y comparado con el mes anterior. El resumen lo propone la IA a partir de las cifras y queda como borrador.", boton: "Revisar el informe" },
        { quien: "equipo", nombre: "Marcos, cuentas", t: "Marcos lo revisa y añade lo que solo sabe él", d: "Corrige una conclusión: parte de la subida vino de la feria de dulces del día 17, no de los anuncios. Y añade lo que propone para noviembre.", boton: "Enviar a Carmen" },
        { quien: "cliente", nombre: "Carmen, Pastelería Mirto", t: "Carmen recibe lo importante en un correo", d: "Tres cifras y lo que propone Marcos, en corto. El informe completo va adjunto para quien quiera el detalle.", boton: "Ver el resultado" }
      ],
      final: { antes: "Dos días de copiar y pegar a primeros de mes, y conclusiones escritas con prisa.", ahora: "Los informes están montados el día 1. El tiempo se va en revisarlos y en pensar qué hacer el mes siguiente." },
      escena: function (x) {
        var u = UI, cuerpo;
        var revisa = function (c, q) { return c + '<br><span class="tenue">Revisa ' + q + "</span>"; };
        var cifras = [["41", "encargos por la web"], ["+18 %", "visitas a la web"], ["4,20 €", "coste por encargo con anuncios"]];
        if (x.p === 0) {
          return u.ventana({ quien: "Ordenador de Marcos", seccion: "Informes", cuerpo:
            '<div class="entre"><strong>Informes de octubre</strong>' + u.chip("1 de noviembre, 7:00", "info") + "</div>" +
            '<div class="anim">' + u.barra(23, 25, "Clientes con los datos recogidos") + "</div>" +
            u.tabla(["Cliente", "Datos de", "Estado"], [
              ["Pastelería Mirto", "Instagram, anuncios de Meta y Google, web", u.chip("Recogidos", "ok")],
              ["Clínica Dental Ruiz", "Anuncios de Google y web", u.chip("Recogidos", "ok")],
              ["Hotel Rural El Roble", "Instagram y anuncios de Meta", u.chip("Hay que reconectar Meta", "alerta")],
              ["Gimnasio Forma", "Instagram y web", u.chip("Recogidos", "ok")]
            ], ["", "", "is-resaltada"]) +
            '<div class="fila">' + u.btn("Montar los informes", true) + "</div>"
          });
        }
        if (x.p === 1) {
          return u.ventana({ quien: "Ordenador de Marcos", seccion: "Informes", cuerpo:
            '<div class="entre"><strong>Pastelería Mirto · octubre</strong>' + u.chip("Borrador", "pend") + "</div>" +
            '<div class="anim">' + u.kpis(cifras) + "</div>" +
            u.grafico([3.1, 3.4, 3.3, 4.2, 5.0], ["Jun.", "Jul.", "Ago.", "Sep.", "Oct."], "Interacción media en Instagram (%)") +
            '<div class="caja caja-ia anim anim-2"><h5>Resumen propuesto</h5><p>Octubre ha sido el mejor mes del año en encargos por la web: 41, nueve más que en septiembre. Las visitas a la web suben un 18 % y los anuncios de Instagram son los que más encargos traen.</p></div>' +
            '<div class="fila">' + u.btn("Revisar el informe", true) + "</div>"
          });
        }
        if (x.p === 2) {
          return u.ventana({ quien: "Ordenador de Marcos", seccion: "Informes", cuerpo:
            '<div class="entre"><strong>Pastelería Mirto · octubre</strong>' + u.chip("Revisado por Marcos", "ok") + "</div>" +
            u.kpis(cifras) +
            '<div class="caja caja-suave anim"><h5>Resumen de Marcos</h5><p>Octubre ha sido el mejor mes del año en encargos por la web: 41, nueve más que en septiembre. Ojo: parte de la subida vino de la feria de dulces del día 17, no solo de los anuncios.</p><p>Para noviembre proponemos empezar ya con los encargos de Navidad, desde el día 15.</p></div>' +
            '<div class="anim anim-2">' + u.check([
              ["Corregido: de dónde vienen las visitas", "ok", "La feria del día 17 trajo visitas que no venían de anuncios"],
              ["Añadido: propuesta para noviembre", "ok", "Campaña de encargos de Navidad"]
            ]) + "</div>" +
            '<div class="fila">' + u.btn("Enviar a Carmen", true) + u.btn("Editar", false, "sec") + "</div>"
          });
        }
        var movil = u.movil({ quien: "Correo de Carmen", app: "mail", hora: "11:05", cuerpo:
          u.mail({ asunto: "Tu informe de octubre", clase: x.n(3), cuerpo:
            "<p>Hola, Carmen:</p><p>Lo importante del mes, en corto:</p>" +
            u.kpis([["41", "encargos por la web"], ["+18 %", "visitas a la web"]]) +
            "<p>Ha sido el mejor mes del año en encargos. Parte de la subida vino de la feria del día 17. Para noviembre te proponemos empezar ya con los encargos de Navidad. ¿Lo hablamos el jueves?</p><p>Marcos</p><p class=\"tenue\">Adjunto: Mirto-octubre.pdf</p>" })
        });
        cuerpo = '<div class="anim">' + u.kpis([["21 de 25", "revisados y enviados", "ok"], ["2", "en revisión"], ["2", "esperando datos", "alerta"]]) + "</div>" +
          u.tabla(["Cliente", "Estado"], [
            [revisa("Pastelería Mirto", "Marcos"), u.chip("Enviado", "ok")],
            [revisa("Clínica Dental Ruiz", "Irene"), u.chip("Enviado", "ok")],
            [revisa("Gimnasio Forma", "Irene"), u.chip("En revisión", "pend")],
            [revisa("Hotel Rural El Roble", "Marcos"), u.chip("Faltan datos", "alerta")]
          ], ["is-resaltada"]) +
          u.nota("Las cifras salen de cada plataforma. Las conclusiones y lo que se propone para el mes siguiente los escribe o revisa quien lleva la cuenta.");
        return movil + u.ventana({ quien: "Ordenador de Marcos", seccion: "Informes", cuerpo: cuerpo });
      }
    }
  ]
});
