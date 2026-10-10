/* Fluivia · Demo para clientes
   Todo es simulado en el navegador: no se envía nada a ningún sitio. */
(function () {
  "use strict";

  var SECTORES = window.DEMO_SECTORES;
  var CLAVES = Object.keys(SECTORES);

  /* ---------- Utilidades ---------- */
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var norm = function (s) { return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); };
  var eur = function (n) { return n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"; };
  var primerNombre = function (n) { return String(n).split(" ")[0]; };
  var espera = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var fmtLargo = new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "long" });
  var fmtDiaSemana = new Intl.DateTimeFormat("es-ES", { weekday: "short" });
  var fmtCorto = new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
  var fmtMes = new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric" });
  var capital = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };

  var proximosDias = function (n) {
    var dias = [];
    var d = new Date();
    d.setHours(12, 0, 0, 0);
    while (dias.length < n) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) dias.push(new Date(d));
    }
    return dias;
  };
  var sumarDias = function (dias) { var d = new Date(); d.setDate(d.getDate() + dias); return d; };

  var toastTimer;
  var toast = function (texto) {
    var t = document.getElementById("toast");
    t.textContent = texto;
    t.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("is-on"); }, 2600);
  };

  var cabecera = function (kicker, titulo, entradilla, extra) {
    return '<div class="view-head"><div><p class="kicker">' + esc(kicker) + "</p><h1>" + esc(titulo) + "</h1>" +
      (entradilla ? "<p>" + entradilla + "</p>" : "") + "</div>" + (extra || "") + "</div>";
  };
  var explicacion = function (titulo, pasos) {
    return '<div class="explain"><h2>' + esc(titulo) + "</h2><ol>" +
      pasos.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ol></div>";
  };
  var estrellas = function (n) {
    var s = "";
    for (var i = 1; i <= 5; i++) s += i <= n ? "★" : '<span class="off">★</span>';
    return '<span class="stars" aria-label="' + n + ' de 5 estrellas">' + s + "</span>";
  };

  /* ---------- Estado ---------- */
  var estado = { sector: "gestoria", vista: "inicio" };
  var memoria = {}; // estado de cada módulo; se vacía al cambiar de sector
  var S = function () { return SECTORES[estado.sector]; };
  var mem = function (id, inicial) {
    if (!memoria[id]) memoria[id] = inicial();
    return memoria[id];
  };

  /* ---------- Módulos ---------- */
  var MODULOS = [
    { id: "inicio", ico: "⌂", titulo: "Inicio" },
    { grupo: "Soluciones para empezar" },
    { id: "consultas", ico: "💬", titulo: "Consultas en orden", desc: "Un asistente responde las preguntas frecuentes y deja lo demás preparado para tu equipo." },
    { id: "citas", ico: "📅", titulo: "Citas sin llamadas", desc: "Tus clientes reservan solos y reciben confirmación y recordatorio." },
    { id: "documentos", ico: "📄", titulo: "Documentos sin perseguir", desc: "Cada cliente sube lo que falta y la IA lee las facturas por ti." },
    { grupo: "A medida" },
    { id: "oficina", ico: "🏢", titulo: "Oficina digital", desc: "Todo tu negocio en un panel, con lo que toca hoy." },
    { id: "crm", ico: "🧭", titulo: "CRM a tu medida", desc: "Tus contactos por etapas, con la próxima acción de cada uno." },
    { id: "gastos", ico: "🧾", titulo: "Control de gastos", desc: "Foto al recibo y exportación lista para tu gestoría." },
    { grupo: "Marketing" },
    { id: "email", ico: "✉️", titulo: "Captación y email", desc: "Un recurso descargable que trae contactos y una serie de correos que los acompaña." },
    { id: "resenas", ico: "⭐", titulo: "Reseñas", desc: "Pide reseñas en el momento justo y responde con borradores revisados." },
    { grupo: "El siguiente nivel" },
    { id: "agentes", ico: "⚡", titulo: "Agentes de IA", desc: "Flujos que encadenan varios pasos y te avisan cuando necesitan tu revisión." }
  ];
  var porId = {};
  MODULOS.forEach(function (m) { if (m.id) porId[m.id] = m; });

  /* ===== Inicio ===== */
  var vistaInicio = function () {
    var s = S();
    var grupos = [];
    var actual = null;
    MODULOS.forEach(function (m) {
      if (m.grupo) { actual = { titulo: m.grupo, items: [] }; grupos.push(actual); }
      else if (m.id !== "inicio" && actual) actual.items.push(m);
    });
    return {
      html:
        '<section class="home-hero entra"><div>' +
          '<span class="tag">Demo con datos de ejemplo</span>' +
          "<h1>Así podría funcionar " + esc(s.negocio) + "</h1>" +
          "<p>Un negocio ficticio para que veas, sin tecnicismos, lo que montamos en Fluivia. Todo se puede probar: escribe, reserva, sube documentos o mueve contactos. Cambia el tipo de negocio arriba para ver otro ejemplo.</p>" +
        '</div><div class="home-steps">' +
          "<div><b>1</b>Elige el tipo de negocio que más se parece al tuyo</div>" +
          "<div><b>2</b>Prueba las soluciones que te interesen</div>" +
          "<div><b>3</b>Hablamos de cómo adaptarlo a tu forma de trabajar</div>" +
        "</div></section>" +
        grupos.map(function (g) {
          return '<p class="home-group">' + esc(g.titulo) + '</p><div class="home-grid">' +
            g.items.map(function (m) {
              return '<a class="home-card" href="#' + m.id + '"><span class="ico" aria-hidden="true">' + m.ico + "</span><h3>" + esc(m.titulo) + "</h3><p>" + esc(m.desc) + '</p><span class="go">Probar</span></a>';
            }).join("") + "</div>";
        }).join("")
    };
  };

  /* ===== Consultas en orden ===== */
  var vistaConsultas = function () {
    var s = S();
    var c = s.consultas;
    var st = mem("consultas", function () {
      return { msgs: [{ de: "bot", texto: "Hola, soy el asistente de " + s.negocio + ". Soy una inteligencia artificial: si no sé algo, te paso con una persona del equipo. ¿En qué te ayudo?" }], bandeja: [], ocupado: false, vistos: 0, bandejaVista: 0 };
    });

    var htmlMsgs = function () {
      return st.msgs.map(function (m, i) {
        var anim = i >= st.vistos ? " anim" : "";
        if (m.de === "nota") return '<div class="msg-note' + anim + '">' + esc(m.texto) + "</div>";
        if (m.de === "escribiendo") return '<div class="msg msg-bot' + anim + '"><span class="typing" aria-label="Escribiendo"><i></i><i></i><i></i></span></div>';
        var firma = m.firma ? '<br><small class="muted">— ' + esc(m.firma) + "</small>" : "";
        return '<div class="msg msg-' + (m.de === "user" ? "user" : "bot") + anim + '">' + esc(m.texto) + firma + "</div>";
      }).join("");
    };
    var htmlBandeja = function () {
      if (!st.bandeja.length) return '<div class="empty">Aquí aparecen las conversaciones, clasificadas por tema. Escribe algo en el chat para verlo.</div>';
      return st.bandeja.slice().reverse().map(function (b) {
        var i = st.bandeja.indexOf(b);
        var etiqueta = b.estado === "ia" ? '<span class="tag tag-ok">Respondida por la IA</span>'
          : b.estado === "pendiente" ? '<span class="tag tag-warn">Para revisar</span>'
          : '<span class="tag tag-dark">Respondida por ' + esc(s.equipo) + "</span>";
        return '<div class="inbox-item' + (i >= st.bandejaVista ? " anim" : "") + '"><div class="row between wrap"><span class="tag">' + esc(b.tema) + "</span>" + etiqueta + "</div>" +
          "<p>«" + esc(b.pregunta) + "»</p><small class=\"muted\">" + esc(b.hora) + "</small>" +
          (b.estado === "pendiente"
            ? '<div class="draft"><span class="muted">Borrador preparado por la IA para que lo revises</span>' + esc(b.borrador) +
              '<div class="row" style="margin-top:10px"><button class="btn btn-primary btn-sm" data-aprobar="' + i + '">Aprobar y enviar</button></div></div>'
            : "") + "</div>";
      }).join("");
    };

    var pintar = function (root) {
      root.querySelector(".chat-log").innerHTML = htmlMsgs();
      root.querySelector("#bandeja").innerHTML = htmlBandeja();
      st.vistos = st.msgs.filter(function (m) { return m.de !== "escribiendo"; }).length;
      st.bandejaVista = st.bandeja.length;
      var log = root.querySelector(".chat-log");
      log.scrollTop = log.scrollHeight;
      root.querySelectorAll(".chip-btn, .chat-form button").forEach(function (b) { b.disabled = st.ocupado; });
    };

    var responder = function (root, texto) {
      texto = texto.trim();
      if (!texto || st.ocupado) return;
      st.ocupado = true;
      st.msgs.push({ de: "user", texto: texto });
      st.msgs.push({ de: "escribiendo" });
      pintar(root);
      espera(1100).then(function () {
        st.msgs.pop();
        var t = norm(texto);
        var mejor = null, puntos = 0;
        c.faqs.forEach(function (f) {
          var p = f.claves.filter(function (k) { return t.indexOf(norm(k)) !== -1; }).length;
          if (p > puntos) { puntos = p; mejor = f; }
        });
        var hora = new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
        if (mejor) {
          st.msgs.push({ de: "bot", texto: mejor.respuesta });
          st.bandeja.push({ pregunta: texto, tema: mejor.tema, estado: "ia", hora: hora });
        } else {
          st.msgs.push({ de: "bot", texto: c.sinRespuesta });
          st.msgs.push({ de: "nota", texto: "Derivada a " + s.equipo });
          var borrador = norm(texto) === norm(c.sugerencias[3]) ? c.borrador
            : "Hola, gracias por escribirnos. Lo revisamos y te respondemos hoy mismo.";
          st.bandeja.push({ pregunta: texto, tema: "Otra consulta", estado: "pendiente", hora: hora, borrador: borrador });
        }
        st.ocupado = false;
        if (vistaActual() === "consultas") pintar(root);
      });
    };

    return {
      html:
        cabecera("Solución para empezar", "Consultas en orden", "Así ve tu cliente el asistente, y así llegan las conversaciones a tu equipo. Prueba las preguntas de ejemplo o escribe la tuya.") +
        '<div class="stage"><div class="panel chat">' +
          '<div class="chat-head"><span class="chat-avatar">' + esc(s.negocio.charAt(0)) + "</span><div><b>" + esc(s.negocio) + "</b><small>Asistente de IA · responde al momento</small></div></div>" +
          '<div class="chat-log" aria-live="polite"></div>' +
          '<div class="chips">' + c.sugerencias.map(function (q) { return '<button class="chip-btn" type="button">' + esc(q) + "</button>"; }).join("") + "</div>" +
          '<form class="chat-form"><input type="text" placeholder="Escribe tu pregunta…" aria-label="Tu pregunta" autocomplete="off"><button class="btn btn-dark" type="submit">Enviar</button></form>' +
        '</div><div class="side">' +
          '<div class="panel"><div class="panel-head"><h2>Bandeja de ' + esc(s.negocio) + '</h2><span class="tag">Un solo sitio</span></div><div id="bandeja"></div></div>' +
          explicacion("Qué está pasando", [
            "La IA responde con <strong>la información de tu negocio</strong>, no inventa.",
            "Si no sabe algo, <strong>lo dice y avisa a una persona</strong>.",
            "Te deja un <strong>borrador preparado</strong>: tú decides si lo envías.",
            "Funciona en tu web, por email o por WhatsApp."
          ]) +
        "</div></div>",
      init: function (root) {
        pintar(root);
        root.querySelectorAll(".chip-btn").forEach(function (b) {
          b.addEventListener("click", function () { responder(root, b.textContent); });
        });
        var form = root.querySelector(".chat-form");
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var input = form.querySelector("input");
          responder(root, input.value);
          input.value = "";
        });
        root.querySelector("#bandeja").addEventListener("click", function (e) {
          var b = e.target.closest("[data-aprobar]");
          if (!b) return;
          var item = st.bandeja[+b.dataset.aprobar];
          item.estado = "persona";
          st.msgs.push({ de: "bot", texto: item.borrador, firma: s.equipo + ", " + s.negocio });
          pintar(root);
          toast("Respuesta enviada al cliente");
        });
      }
    };
  };

  /* ===== Citas sin llamadas ===== */
  var HORAS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "16:00", "16:30", "17:00", "17:30"];
  var vistaCitas = function () {
    var s = S();
    var st = mem("citas", function () { return { paso: 0, servicio: null, dia: null, hora: null, nombre: "" }; });
    var dias = proximosDias(5);

    var htmlPaso = function () {
      if (st.paso === 0) {
        return '<h3 style="margin-bottom:12px">¿Qué necesitas?</h3><div class="options">' +
          s.citas.servicios.map(function (sv, i) {
            return '<button class="option" data-servicio="' + i + '"><span>' + esc(sv[0]) + "</span><small>" + sv[1] + " min</small></button>";
          }).join("") + "</div>";
      }
      if (st.paso === 1 || st.paso === 2) {
        var html = '<h3 style="margin-bottom:12px">Elige día</h3><div class="days">' +
          dias.map(function (d, i) {
            var sel = st.dia === i ? ' style="border-color:var(--bosque);background:var(--bosque);color:#fff"' : "";
            return '<button class="day" data-dia="' + i + '"' + sel + "><small" + (st.dia === i ? ' style="color:#fff"' : "") + ">" + esc(fmtDiaSemana.format(d)) + "</small><b>" + d.getDate() + "</b></button>";
          }).join("") + "</div>";
        if (st.paso === 2) {
          html += '<h3 style="margin:20px 0 0">Elige hora</h3><div class="slots">' +
            HORAS.map(function (h, i) {
              var ocupada = (i * 7 + st.dia * 3) % 5 === 0;
              return '<button class="slot-btn" data-hora="' + h + '"' + (ocupada ? " disabled" : "") + ">" + h + "</button>";
            }).join("") + "</div>";
        }
        return html;
      }
      if (st.paso === 3) {
        return '<h3 style="margin-bottom:4px">Tus datos</h3><p class="muted small" style="margin-bottom:14px">' + esc(s.citas.servicios[st.servicio][0]) + " · " + esc(fmtLargo.format(dias[st.dia])) + " · " + st.hora + "</p>" +
          '<form class="stack" id="datos-cita"><div class="field"><label for="c-nombre">Nombre</label><input id="c-nombre" required value="Laura Gómez"></div>' +
          '<div class="field"><label for="c-tel">Móvil (para el recordatorio)</label><input id="c-tel" required value="600 123 456" inputmode="tel"></div>' +
          '<button class="btn btn-primary" type="submit">Confirmar cita</button></form>';
      }
      return '<div class="confirm"><div class="ok" aria-hidden="true">✓</div><h3>¡Cita confirmada!</h3><p class="muted" style="margin:6px 0 16px">' +
        esc(s.citas.servicios[st.servicio][0]) + "<br>" + esc(capital(fmtLargo.format(dias[st.dia]))) + " a las " + st.hora + "</p>" +
        '<button class="btn btn-ghost btn-sm" id="otra-cita">Probar otra reserva</button></div>';
    };

    var htmlAgenda = function () {
      var items = s.citas.agenda.map(function (a) { return { hora: a[0], texto: a[1] }; });
      if (st.paso === 4) items.push({ hora: st.hora, texto: st.nombre + " · " + s.citas.servicios[st.servicio][0], nueva: true });
      items.sort(function (a, b) { return a.hora < b.hora ? -1 : 1; });
      var dia = st.dia != null ? dias[st.dia] : dias[0];
      return '<div class="panel-head"><h2>Agenda de ' + esc(s.negocio) + '</h2><span class="tag">' + esc(capital(fmtLargo.format(dia))) + '</span></div><div class="panel-body" style="padding-top:6px">' +
        items.map(function (a) {
          return '<div class="agenda-item' + (a.nueva ? " is-new" : "") + '"><b>' + a.hora + "</b><span>" + esc(a.texto) + (a.nueva ? ' <span class="tag tag-ok">Nueva</span>' : "") + "</span></div>";
        }).join("") + "</div>";
    };

    var htmlMensajes = function () {
      if (st.paso !== 4) return '<div class="empty">Cuando confirmes la cita verás aquí los mensajes que recibe tu cliente.</div>';
      var nom = primerNombre(st.nombre);
      var cuando = fmtLargo.format(dias[st.dia]);
      return '<div class="wa">' +
        '<div class="wa-bubble">Hola, ' + esc(nom) + ". Tu cita en " + esc(s.negocio) + " está confirmada para el " + esc(cuando) + " a las " + st.hora + ". Si necesitas cambiarla, puedes hacerlo aquí: enlace a tu cita<span class=\"wa-meta\">Ahora · confirmación</span></div>" +
        '<div class="wa-bubble">Hola, ' + esc(nom) + ". Te recordamos tu cita de mañana a las " + st.hora + ". ¿Nos confirmas que vienes? Responde SÍ o cámbiala desde el enlace.<span class=\"wa-meta\">El día antes · recordatorio</span></div>" +
        "</div>";
    };

    var pintar = function (root) {
      root.querySelector("#reserva").innerHTML = htmlPaso();
      root.querySelector(".steps-bar").innerHTML = [0, 1, 2, 3].map(function (i) { return '<span class="' + (st.paso > i || st.paso === 4 ? "is-on" : "") + '"></span>'; }).join("");
      root.querySelector("#agenda").innerHTML = htmlAgenda();
      root.querySelector("#mensajes").innerHTML = htmlMensajes();
    };

    return {
      html:
        cabecera("Solución para empezar", "Citas sin llamadas", "Esto es lo que ve tu cliente al reservar desde tu web o desde un enlace. La cita entra sola en tu agenda.") +
        '<div class="stage"><div class="stack">' +
          '<div class="panel"><div class="panel-head"><h2>Reservar en ' + esc(s.negocio) + '</h2></div><div class="steps-bar" aria-hidden="true"></div><div class="panel-body" id="reserva"></div></div>' +
          '<div class="panel"><div class="panel-head"><h2>Mensajes que recibe tu cliente</h2><span class="tag">WhatsApp o email</span></div><div class="panel-body" id="mensajes"></div></div>' +
        '</div><div class="side"><div class="panel" id="agenda"></div>' +
          explicacion("Qué está pasando", [
            "Tu cliente <strong>ve solo los huecos libres</strong> y reserva en un minuto.",
            "La cita <strong>entra sola en tu calendario</strong>.",
            "Recibe la <strong>confirmación y un recordatorio</strong> el día antes.",
            "Puede <strong>cambiarla o cancelarla</strong> sin llamar, y el hueco se libera."
          ]) +
        "</div></div>",
      init: function (root) {
        pintar(root);
        root.addEventListener("click", function (e) {
          var b;
          if ((b = e.target.closest("[data-servicio]"))) { st.servicio = +b.dataset.servicio; st.paso = 1; }
          else if ((b = e.target.closest("[data-dia]"))) { st.dia = +b.dataset.dia; st.paso = 2; st.hora = null; }
          else if ((b = e.target.closest("[data-hora]"))) { st.hora = b.dataset.hora; st.paso = 3; }
          else if (e.target.closest("#otra-cita")) { st.paso = 0; st.servicio = st.dia = st.hora = null; }
          else return;
          pintar(root);
        });
        root.addEventListener("submit", function (e) {
          if (e.target.id !== "datos-cita") return;
          e.preventDefault();
          st.nombre = root.querySelector("#c-nombre").value.trim() || "Cliente";
          st.paso = 4;
          pintar(root);
          toast("Cita añadida a la agenda");
        });
      }
    };
  };

  /* ===== Documentos sin perseguir ===== */
  var vistaDocumentos = function () {
    var s = S();
    var d = s.documentos;
    var st = mem("documentos", function () {
      var recibidos = d.clientes[0][1];
      return {
        tab: "cliente",
        docs: d.lista.map(function (n, i) { return { nombre: n, estado: i < recibidos ? "aceptado" : "pendiente" }; }),
        lectura: 0, // 0 sin leer, 1 leyendo, 2 leída, 3 enviada
        recordados: {}
      };
    });
    var f = d.factura;
    var iva = Math.round(f.base * f.ivaPct) / 100;
    var total = f.base + iva;
    var fechaFactura = fmtCorto.format(sumarDias(-6));
    var aceptados = function () { return st.docs.filter(function (x) { return x.estado === "aceptado"; }).length; };

    var htmlCliente = function () {
      var faltan = st.docs.filter(function (x) { return x.estado === "pendiente" || x.estado === "rechazado"; }).length;
      var titulo = faltan ? "Te faltan " + faltan + " documento" + (faltan > 1 ? "s" : "") : "¡Ya lo tenemos todo!";
      return '<div class="panel"><div class="panel-head"><h2>Hola, ' + esc(primerNombre(d.persona)) + '</h2><span class="tag">' + esc(d.periodo) + '</span></div><div class="panel-body">' +
        '<p style="font-weight:600;font-size:17px">' + titulo + "</p>" +
        '<p class="muted small" style="margin:4px 0 8px">' + (faltan ? "Súbelos aquí cuando puedas. Te recordaremos lo que falte el " + esc(fmtLargo.format(sumarDias(3))) + "." : "Gracias. Lo revisamos y te avisamos si necesitamos algo más.") + "</p>" +
        st.docs.map(function (x, i) {
          var accion = x.estado === "aceptado" ? '<span class="tag tag-ok">Aceptado</span>'
            : x.estado === "revisar" ? '<span class="tag">En revisión</span>'
            : x.estado === "subiendo" ? '<span class="tag">Subiendo…</span>'
            : '<button class="btn btn-dark btn-sm" data-subir="' + i + '">Subir</button>';
          var nota = x.estado === "rechazado" ? '<small style="display:block;color:var(--rojo);font-weight:500">Se ve borroso: ¿puedes subirlo otra vez?</small>' : "";
          return '<div class="doc-row"><span class="name"><span class="doc-ico" aria-hidden="true">📄</span><span>' + esc(x.nombre) + nota + "</span></span>" + accion + "</div>";
        }).join("") + "</div></div>";
    };

    var htmlEquipo = function () {
      var porRevisar = st.docs.map(function (x, i) { return { x: x, i: i }; }).filter(function (o) { return o.x.estado === "revisar"; });
      var filas = d.clientes.map(function (c, i) {
        var hechos = i === 0 ? aceptados() : c[1];
        var completo = hechos >= d.lista.length;
        var accion = completo ? '<span class="tag tag-ok">Completo</span>'
          : st.recordados[i] ? '<span class="tag">Recordatorio enviado</span>'
          : '<button class="btn btn-ghost btn-sm" data-recordar="' + i + '">Recordar</button>';
        return '<div class="client-row"><b>' + esc(c[0]) + '</b><div><div class="progress"><span style="width:' + (hechos / d.lista.length * 100) + '%"></span></div><small class="muted">' + hechos + " de " + d.lista.length + "</small></div>" + accion + "</div>";
      }).join("");

      var revisar = porRevisar.length
        ? porRevisar.map(function (o) {
            return '<div class="doc-row"><span class="name"><span class="doc-ico" aria-hidden="true">📄</span><span>' + esc(o.x.nombre) + '<small class="muted" style="display:block">' + esc(d.persona) + ' · acaba de subirlo</small></span></span><span class="row"><button class="btn btn-ghost btn-sm" data-rechazar="' + o.i + '">Pedir otra vez</button><button class="btn btn-primary btn-sm" data-aceptar="' + o.i + '">Aceptar</button></span></div>';
          }).join("")
        : '<div class="empty">Nada por revisar. Sube algo en «Lo que ve tu ' + esc(s.cliente) + '» y aparecerá aquí.</div>';

      var campos = [["Proveedor", f.proveedor], ["NIF", f.nif], ["N.º de factura", f.numero], ["Fecha", fechaFactura], ["Concepto", f.concepto], ["Base imponible", eur(f.base)], ["IVA (" + f.ivaPct + " %)", eur(iva)], ["Total", eur(total)]];
      var extraccion = st.lectura === 0 ? '<div class="empty">Pulsa «Leer con IA» para extraer los datos.</div>'
        : st.lectura === 1 ? '<div class="empty">Leyendo la factura…</div>'
        : campos.map(function (k, i) { return '<div class="kv' + (st.animar ? " anim" : "") + '" style="animation-delay:' + (i * 0.08) + 's"><span>' + esc(k[0]) + "</span><b>" + esc(k[1]) + "</b></div>"; }).join("") +
          (st.lectura === 2 ? '<button class="btn btn-primary" id="validar" style="margin-top:6px">Validar y enviar a contabilidad</button>' : '<span class="tag tag-ok" style="justify-self:start;margin-top:6px">Enviada a contabilidad</span>');

      return '<div class="stack">' +
        '<div class="panel"><div class="panel-head"><h2>Estado por ' + esc(s.cliente) + '</h2><span class="tag">' + esc(d.periodo) + '</span></div><div class="panel-body" style="padding-top:4px">' + filas + "</div></div>" +
        '<div class="panel"><div class="panel-head"><h2>Por revisar</h2></div><div class="panel-body" style="padding-top:4px">' + revisar + "</div></div>" +
        '<div class="panel"><div class="panel-head"><h2>Lectura de facturas con IA</h2>' + (st.lectura === 0 ? '<button class="btn btn-dark btn-sm" id="leer">Leer con IA</button>' : "") + '</div><div class="panel-body invoice-grid">' +
          '<div class="paper' + (st.lectura === 1 ? " is-scanning" : "") + '"><h4>' + esc(f.proveedor) + '</h4><span class="muted">NIF ' + esc(f.nif) + "</span><br><br>" +
            "<b>Factura " + esc(f.numero) + "</b><br>Fecha: " + fechaFactura + "<br>Cliente: " + esc(s.negocio) + "<br><br>" +
            '<div class="line"><span>' + esc(f.concepto) + "</span><span>" + eur(f.base) + '</span></div><div class="line"><span>IVA ' + f.ivaPct + " %</span><span>" + eur(iva) + '</span></div><div class="line"><b>Total</b><b>' + eur(total) + "</b></div></div>" +
          '<div class="extract">' + extraccion + "</div></div></div>" +
        "</div>";
    };

    var pintar = function (root) {
      root.querySelectorAll(".tabs button").forEach(function (b) { b.setAttribute("aria-selected", String(b.dataset.tab === st.tab)); });
      root.querySelector("#docs").innerHTML = st.tab === "cliente" ? htmlCliente() : htmlEquipo();
      st.animar = false;
    };

    return {
      html:
        cabecera("Solución para empezar", "Documentos sin perseguir", "Cambia entre lo que ve tu " + esc(s.cliente) + " y lo que ve tu equipo. Prueba a subir un documento y a revisarlo después.",
          '<div class="tabs" role="tablist"><button data-tab="cliente" role="tab">Lo que ve tu ' + esc(s.cliente) + '</button><button data-tab="equipo" role="tab">Lo que ve tu equipo</button></div>') +
        '<div class="stage"><div id="docs"></div><div class="side">' +
          explicacion("Qué está pasando", [
            "Cada " + esc(s.cliente) + " tiene <strong>su lista de documentos</strong> y los sube desde el móvil.",
            "Los <strong>recordatorios salen solos</strong> hasta que lo tienes todo.",
            "Tu equipo <strong>acepta o pide otra vez</strong> cada documento, con un clic.",
            "La IA <strong>lee las facturas</strong> y una persona valida los datos antes de contabilizarlos."
          ]) +
          '<div class="panel"><div class="panel-body small muted">Acceso con código al email, documentos guardados en la UE y copia de seguridad diaria.</div></div>' +
        "</div></div>",
      init: function (root) {
        pintar(root);
        root.addEventListener("click", function (e) {
          var b;
          if ((b = e.target.closest("[data-tab]"))) { st.tab = b.dataset.tab; pintar(root); return; }
          if ((b = e.target.closest("[data-subir]"))) {
            var doc = st.docs[+b.dataset.subir];
            doc.estado = "subiendo"; pintar(root);
            espera(900).then(function () { doc.estado = "revisar"; if (vistaActual() === "documentos") pintar(root); toast("Documento recibido. Tu equipo ya lo puede revisar"); });
            return;
          }
          if ((b = e.target.closest("[data-aceptar]"))) { st.docs[+b.dataset.aceptar].estado = "aceptado"; pintar(root); toast("Documento aceptado"); return; }
          if ((b = e.target.closest("[data-rechazar]"))) { st.docs[+b.dataset.rechazar].estado = "rechazado"; pintar(root); toast("Le hemos pedido que lo suba otra vez"); return; }
          if ((b = e.target.closest("[data-recordar]"))) { st.recordados[+b.dataset.recordar] = true; pintar(root); toast("Recordatorio enviado por email"); return; }
          if (e.target.closest("#leer")) {
            st.lectura = 1; pintar(root);
            espera(1600).then(function () { st.lectura = 2; st.animar = true; if (vistaActual() === "documentos") pintar(root); });
            return;
          }
          if (e.target.closest("#validar")) { st.lectura = 3; pintar(root); toast("Factura enviada a contabilidad"); }
        });
      }
    };
  };

  /* ===== Oficina digital ===== */
  var vistaOficina = function () {
    var s = S();
    var o = s.oficina;
    var hora = new Date().getHours();
    var saludo = hora < 14 ? "Buenos días" : hora < 21 ? "Buenas tardes" : "Buenas noches";
    var maximo = Math.max.apply(null, o.origen.map(function (x) { return x[1]; }));
    return {
      html:
        cabecera("A medida", saludo + ", " + s.equipo, capital(fmtLargo.format(new Date())) + ". Esta es la Oficina digital de " + esc(s.negocio) + ": todo el negocio en un solo panel.",
          '<span class="tag">Acceso con código · datos en la UE · copia diaria</span>') +
        '<div class="kpis">' + o.kpis.map(function (k) { return '<div class="kpi entra"><span>' + esc(k[0]) + "</span><b>" + esc(k[1]) + "</b><small>" + esc(k[2]) + "</small></div>"; }).join("") + "</div>" +
        '<div class="office-grid"><div class="stack">' +
          '<div class="panel"><div class="panel-head"><h2>Hoy te toca</h2><span class="tag tag-warn">' + o.hoy.length + " tareas</span></div>" +
            o.hoy.map(function (t) { return '<a class="todo" href="#' + t[2] + '"><b>' + esc(t[0]) + "</b>" + esc(t[1]) + "</a>"; }).join("") + "</div>" +
          '<div class="panel"><div class="panel-head"><h2>De dónde vienen tus contactos</h2><span class="tag">Últimos 30 días</span></div><div class="panel-body bars">' +
            o.origen.map(function (x) { return '<div class="bar-row"><span>' + esc(x[0]) + '</span><div class="progress"><span style="width:' + (x[1] / maximo * 100) + '%"></span></div><b>' + x[1] + " %</b></div>"; }).join("") + "</div></div>" +
          '<div class="panel"><div class="panel-head"><h2>Actividad reciente</h2></div><div class="panel-body" style="padding-top:4px"><ul class="feed">' +
            o.actividad.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ul></div></div>" +
        '</div><div class="stack">' +
          '<div class="panel"><div class="panel-head"><h2>Resumen diario por email</h2><span class="tag">Cada mañana a las 7:30</span></div><div class="panel-body">' +
            '<div class="email-preview"><header><b>Tu día en ' + esc(s.negocio) + "</b>De: Oficina de " + esc(s.negocio) + "</header>" +
            '<div class="body">Buenos días, ' + esc(s.equipo) + ". Esto es lo que te toca hoy:<ul>" + o.hoy.map(function (t) { return "<li>" + esc(t[0] + " " + t[1]) + "</li>"; }).join("") + "</ul>Que tengas un buen día.</div></div></div></div>" +
          explicacion("Qué incluye la Oficina digital", [
            "<strong>Contactos y CRM</strong> con la próxima acción de cada uno.",
            "<strong>Correos y avisos automáticos</strong> desde tu dominio.",
            "<strong>Documentos, contenido y gastos</strong> en el mismo sitio.",
            "<strong>Resumen diario</strong> para empezar el día sabiendo qué toca.",
            "Hecha a tu medida: <strong>solo con lo que usas</strong>."
          ]) +
        "</div></div>"
    };
  };

  /* ===== CRM a tu medida ===== */
  var vistaCRM = function () {
    var s = S();
    var cr = s.crm;
    var st = mem("crm", function () {
      return {
        nuevoAnadido: false,
        contactos: cr.contactos.map(function (c, i) {
          return { id: i, nombre: c[0], necesidad: c[1], etapa: c[2], origen: c[3], siguiente: c[4], historial: ["Entró desde " + c[3]] };
        })
      };
    });

    var plantilla = function (c) {
      var n = primerNombre(c.nombre);
      var firma = "\n\nUn saludo,\n" + s.equipo + " · " + s.negocio;
      var textos = [
        "Hola, " + n + ":\n\nGracias por escribirnos sobre «" + c.necesidad.toLowerCase() + "». ¿Te viene bien que hablemos 15 minutos esta semana? Puedes elegir la hora que mejor te venga en este enlace.",
        "Hola, " + n + ":\n\nTe escribí hace unos días y no quería que se quedara en el aire. ¿Seguimos con lo de «" + c.necesidad.toLowerCase() + "»?",
        "Hola, " + n + ":\n\nGracias por tu tiempo. Como hablamos, te preparo la propuesta y te la envío en los próximos días.",
        "Hola, " + n + ":\n\n¿Has podido ver la propuesta? Si tienes cualquier duda, te la resuelvo con gusto en una llamada corta.",
        "Hola, " + n + ":\n\n¿Qué tal va todo? Si te está gustando nuestro trabajo, nos ayudaría mucho una reseña. Y si hay algo que mejorar, cuéntanoslo."
      ];
      return textos[c.etapa] + firma;
    };

    var pendientes = function () { return st.contactos.filter(function (c) { return c.etapa < cr.etapas.length - 1; }).length; };

    var htmlKanban = function () {
      return cr.etapas.map(function (et, i) {
        var lista = st.contactos.filter(function (c) { return c.etapa === i; });
        return '<div class="col" data-col="' + i + '"><div class="col-head"><span>' + esc(et) + '</span><span class="tag">' + lista.length + "</span></div>" +
          lista.map(function (c) {
            return '<div class="card' + (c.recien ? " brilla" : "") + '" draggable="true" data-id="' + c.id + '" tabindex="0" role="button" aria-label="Abrir ' + esc(c.nombre) + '"><b>' + esc(c.nombre) + '</b><span class="muted">' + esc(c.necesidad) + '</span><span class="next">' + esc(c.siguiente) + '</span><div class="row"><span class="tag">' + esc(c.origen) + "</span></div></div>";
          }).join("") + "</div>";
      }).join("");
    };

    var pintar = function (root) {
      root.querySelector(".kanban").innerHTML = htmlKanban();
      root.querySelector("#te-toca").textContent = pendientes();
      var btn = root.querySelector("#simular");
      btn.disabled = st.nuevoAnadido;
      st.contactos.forEach(function (c) { c.recien = false; });
    };

    var mover = function (root, id, etapa) {
      var c = st.contactos[id];
      if (c.etapa === etapa) return;
      c.etapa = etapa;
      c.historial.push("Pasa a «" + cr.etapas[etapa] + "»");
      c.siguiente = ["Responder hoy", "Seguimiento en 3 días", "Preparar la reunión", "Seguimiento de la propuesta", "Revisión trimestral"][etapa];
      pintar(root);
    };

    var abrir = function (root, id) {
      var c = st.contactos[id];
      var back = document.createElement("div");
      back.className = "drawer-back";
      var dibujar = function () {
        back.innerHTML = '<aside class="drawer" role="dialog" aria-modal="true" aria-label="Ficha de ' + esc(c.nombre) + '">' +
          '<div class="row between"><span class="tag">' + esc(cr.etapas[c.etapa]) + '</span><button class="btn btn-ghost btn-sm" data-cerrar>Cerrar</button></div>' +
          '<h2 style="margin-top:12px">' + esc(c.nombre) + '</h2><p class="muted">' + esc(c.necesidad) + " · Origen: " + esc(c.origen) + "</p>" +
          '<section><h3>Próxima acción</h3><p style="font-weight:600">' + esc(c.siguiente) + "</p></section>" +
          '<section><h3>Etapa</h3><div class="row wrap">' + cr.etapas.map(function (et, i) {
            return '<button class="btn btn-sm ' + (i === c.etapa ? "btn-dark" : "btn-ghost") + '" data-etapa="' + i + '">' + esc(et) + "</button>";
          }).join("") + "</div></section>" +
          '<section><h3>Correo con plantilla</h3><div class="mail">' + esc(plantilla(c)) + '</div><button class="btn btn-primary" data-enviar style="margin-top:10px">Enviar desde tu dominio</button></section>' +
          '<section><h3>Historial</h3><ul class="history">' + c.historial.slice().reverse().map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul></section></aside>";
      };
      dibujar();
      document.body.appendChild(back);
      var cerrar = function () { back.remove(); document.removeEventListener("keydown", tecla); pintar(root); };
      var tecla = function (e) { if (e.key === "Escape") cerrar(); };
      document.addEventListener("keydown", tecla);
      back.addEventListener("click", function (e) {
        if (e.target === back || e.target.closest("[data-cerrar]")) { cerrar(); return; }
        var b;
        if ((b = e.target.closest("[data-etapa]"))) { mover(root, c.id, +b.dataset.etapa); dibujar(); return; }
        if (e.target.closest("[data-enviar]")) {
          c.historial.push("Correo enviado: " + plantilla(c).split("\n")[2].slice(0, 60) + "…");
          if (c.etapa === 0) { c.etapa = 1; c.historial.push("Pasa a «" + cr.etapas[1] + "»"); }
          c.siguiente = "Seguimiento en 3 días si no responde";
          dibujar();
          toast("Correo enviado y guardado en el historial");
        }
      });
      back.querySelector("[data-cerrar]").focus();
    };

    return {
      html:
        cabecera("A medida", "CRM a tu medida", "Arrastra los contactos entre etapas o pulsa en uno para ver su ficha, enviarle un correo con plantilla y ver su historial.",
          '<div class="row wrap"><span class="tag tag-warn">Te toca hoy: <b id="te-toca"></b></span><button class="btn btn-dark btn-sm" id="simular">Simular contacto desde la web</button></div>') +
        '<div class="stage stage-wide"><div class="kanban"></div>' +
        explicacion("Qué está pasando", [
          "Los formularios de tu web <strong>entran solos</strong> y sin duplicados.",
          "Cada contacto tiene <strong>su próxima acción</strong>, así no se olvida ninguno.",
          "Los correos salen <strong>con plantilla y desde tu dominio</strong>, y quedan en el historial.",
          "Las etapas y los campos se diseñan <strong>a tu forma de vender</strong>."
        ]) + "</div>",
      init: function (root) {
        pintar(root);
        var kanban = root.querySelector(".kanban");
        kanban.addEventListener("click", function (e) {
          var card = e.target.closest(".card");
          if (card) abrir(root, +card.dataset.id);
        });
        kanban.addEventListener("keydown", function (e) {
          var card = e.target.closest(".card");
          if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); abrir(root, +card.dataset.id); }
        });
        kanban.addEventListener("dragstart", function (e) {
          var card = e.target.closest(".card");
          if (!card) return;
          e.dataTransfer.setData("text/plain", card.dataset.id);
          card.classList.add("is-dragging");
        });
        kanban.addEventListener("dragend", function (e) {
          var card = e.target.closest(".card");
          if (card) card.classList.remove("is-dragging");
        });
        kanban.addEventListener("dragover", function (e) {
          var col = e.target.closest(".col");
          if (!col) return;
          e.preventDefault();
          kanban.querySelectorAll(".col").forEach(function (c) { c.classList.toggle("is-over", c === col); });
        });
        kanban.addEventListener("drop", function (e) {
          var col = e.target.closest(".col");
          if (!col) return;
          e.preventDefault();
          mover(root, +e.dataTransfer.getData("text/plain"), +col.dataset.col);
          toast("Contacto movido a «" + cr.etapas[+col.dataset.col] + "»");
        });
        root.querySelector("#simular").addEventListener("click", function () {
          if (st.nuevoAnadido) return;
          st.nuevoAnadido = true;
          st.contactos.push({ id: st.contactos.length, nombre: cr.nuevo[0], necesidad: cr.nuevo[1], etapa: 0, origen: cr.nuevo[2], siguiente: "Responder hoy", historial: ["Entró desde el formulario de la web"], recien: true });
          root.querySelector(".kanban").innerHTML = htmlKanban();
          root.querySelector("#te-toca").textContent = pendientes();
          root.querySelector("#simular").disabled = true;
          toast("Nuevo contacto desde la web: " + cr.nuevo[0]);
        });
      }
    };
  };

  /* ===== Control de gastos ===== */
  var vistaGastos = function () {
    var st = mem("gastos", function () {
      var base = [
        ["Papelería Central", "Material de oficina", 23.4, 21, -9],
        ["Proveedor de internet", "Suministros", 45.98, 21, -8],
        ["Restaurante La Plaza", "Comidas con clientes", 38.5, 10, -6],
        ["Programa de diseño", "Software", 29, 21, -4],
        ["Parking Centro", "Desplazamientos", 6.5, 21, -2, true]
      ];
      return { paso: 0, gastos: base.map(function (g) { return { comercio: g[0], categoria: g[1], total: g[2], ivaPct: g[3], fecha: sumarDias(g[4]), sinRecibo: !!g[5] }; }) };
    });
    var nuevo = { comercio: "Gasolinera Ruta 7", categoria: "Desplazamientos", total: 45, ivaPct: 21, fecha: new Date() };
    var ivaDe = function (g) { return Math.round((g.total - g.total / (1 + g.ivaPct / 100)) * 100) / 100; };

    var htmlCamara = function () {
      if (st.paso === 0) {
        return '<div class="camera"><div style="font-size:40px" aria-hidden="true">📷</div><p>Haz una foto al recibo desde el móvil.<br><span class="muted" style="color:var(--w75)">Así no se pierde ninguno.</span></p><button class="btn btn-primary" id="foto">Hacer foto del recibo</button></div>';
      }
      var recibo = '<div class="receipt' + (st.paso === 1 ? " is-scanning" : "") + '"><div class="c"><b>GASOLINERA RUTA 7</b><br>Ctra. Nacional, km 12<br>' + fmtCorto.format(nuevo.fecha) + "</div><hr>" +
        '<div class="l"><span>Gasóleo</span><span>45,00</span></div><hr><div class="l"><span>Base</span><span>' + eur(nuevo.total - ivaDe(nuevo)).replace(" €", "") + '</span></div><div class="l"><span>IVA 21%</span><span>' + eur(ivaDe(nuevo)).replace(" €", "") + '</span></div><div class="l"><b>TOTAL</b><b>45,00 €</b></div><hr><div class="c">Gracias por su visita</div></div>';
      if (st.paso === 1) return '<div class="stack">' + recibo + '<p class="muted small" style="text-align:center">Leyendo el recibo…</p></div>';
      var campos = [["Comercio", nuevo.comercio], ["Fecha", fmtCorto.format(nuevo.fecha)], ["Total", eur(nuevo.total)], ["IVA", eur(ivaDe(nuevo))], ["Categoría", nuevo.categoria]];
      return '<div class="invoice-grid">' + recibo + '<div class="extract">' + campos.map(function (k, i) { return '<div class="kv' + (st.paso === 2 ? " anim" : "") + '" style="animation-delay:' + i * 0.08 + 's"><span>' + k[0] + "</span><b>" + esc(k[1]) + "</b></div>"; }).join("") +
        (st.paso === 2 ? '<button class="btn btn-primary" id="guardar" style="margin-top:6px">Guardar gasto</button>' : '<span class="tag tag-ok" style="justify-self:start;margin-top:6px">Guardado</span><button class="btn btn-ghost btn-sm" id="otro" style="justify-self:start">Probar con otro</button>') + "</div></div>";
    };

    var htmlLista = function () {
      var porCat = {};
      var total = 0;
      st.gastos.forEach(function (g) { porCat[g.categoria] = (porCat[g.categoria] || 0) + g.total; total += g.total; });
      var sinRecibo = st.gastos.filter(function (g) { return g.sinRecibo; }).length;
      return '<div class="panel-head"><h2>Gastos de ' + esc(fmtMes.format(new Date())) + '</h2><b>' + eur(total) + '</b></div><div class="panel-body" style="padding-top:4px">' +
        st.gastos.slice().reverse().map(function (g) {
          return '<div class="expense-row' + (g.nuevo ? " is-new" : "") + '"><span><b>' + esc(g.comercio) + '</b><br><small class="muted">' + esc(g.categoria) + " · " + fmtCorto.format(g.fecha) + "</small></span>" +
            (g.sinRecibo ? '<span class="tag tag-warn">Sin recibo</span>' : '<span class="tag tag-ok">Con recibo</span>') + "<b>" + eur(g.total) + "</b></div>";
        }).join("") +
        '<div style="margin-top:14px">' + Object.keys(porCat).map(function (k) { return '<div class="cat-sum"><span>' + esc(k) + "</span><b>" + eur(porCat[k]) + "</b></div>"; }).join("") + "</div>" +
        (sinRecibo ? '<p class="alert" style="margin-top:12px">' + sinRecibo + " gasto sin recibo: te lo recordamos antes de cerrar el mes.</p>" : "") +
        '<button class="btn btn-dark" id="exportar" style="margin-top:14px;width:100%">Exportar para la gestoría (CSV)</button></div>';
    };

    var pintar = function (root) {
      root.querySelector("#camara").innerHTML = htmlCamara();
      root.querySelector("#lista").innerHTML = htmlLista();
    };

    return {
      html:
        cabecera("A medida", "Control de gastos para tu gestoría", "Haz una foto a un recibo de ejemplo: la IA lee los datos, el gasto queda apuntado y a final de mes lo exportas para tu gestoría.") +
        '<div class="stage"><div class="stack"><div class="panel"><div class="panel-head"><h2>Nuevo gasto</h2></div><div class="panel-body" id="camara"></div></div>' +
          explicacion("Qué está pasando", [
            "Haces <strong>una foto al recibo</strong> en el momento, desde el móvil.",
            "La IA <strong>lee comercio, fecha, total e IVA</strong> y propone la categoría.",
            "Ves en todo momento <strong>cuánto llevas gastado</strong> y qué gastos no tienen recibo.",
            "A final de mes, <strong>un clic</strong> y tu gestoría lo tiene todo. Solo gastos: las facturas se emiten con un programa homologado para Verifactu."
          ]) +
        '</div><div class="panel" id="lista"></div></div>',
      init: function (root) {
        pintar(root);
        root.addEventListener("click", function (e) {
          if (e.target.closest("#foto")) {
            st.paso = 1; pintar(root);
            espera(1600).then(function () { st.paso = 2; if (vistaActual() === "gastos") pintar(root); });
          } else if (e.target.closest("#guardar")) {
            st.gastos.forEach(function (g) { g.nuevo = false; });
            st.gastos.push(Object.assign({ nuevo: true }, nuevo));
            st.paso = 3; pintar(root); toast("Gasto guardado con su recibo");
          } else if (e.target.closest("#otro")) {
            st.paso = 0; pintar(root);
          } else if (e.target.closest("#exportar")) {
            var filas = [["Fecha", "Comercio", "Categoría", "Base", "IVA", "Total", "Recibo"]];
            st.gastos.forEach(function (g) {
              var iva = ivaDe(g);
              filas.push([fmtCorto.format(g.fecha), g.comercio, g.categoria, (g.total - iva).toFixed(2).replace(".", ","), iva.toFixed(2).replace(".", ","), g.total.toFixed(2).replace(".", ","), g.sinRecibo ? "No" : "Sí"]);
            });
            var csv = "﻿" + filas.map(function (f) { return f.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(";"); }).join("\r\n");
            var a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
            a.download = "gastos-ejemplo.csv";
            document.body.appendChild(a); a.click(); a.remove();
            toast("Exportación descargada");
          }
        });
      }
    };
  };

  /* ===== Captación y email ===== */
  var vistaEmail = function () {
    var s = S();
    var em = s.email;
    var st = mem("email", function () { return { apuntado: false, nombre: "", activo: 0 }; });

    var htmlTimeline = function () {
      return em.serie.map(function (e, i) {
        var etiqueta = !st.apuntado ? '<span class="tag">Programado</span>' : i === 0 ? '<span class="tag tag-ok">Enviado</span>' : '<span class="tag">' + esc(capital(fmtLargo.format(sumarDias(parseInt(e[0].replace(/\D/g, ""), 10))))) + "</span>";
        return '<button class="tl' + (st.activo === i ? " is-active" : "") + '" data-correo="' + i + '"><span class="when">' + esc(e[0]) + '</span><span class="subj">' + esc(e[1]) + "</span>" + etiqueta + "</button>";
      }).join("");
    };
    var htmlCorreo = function () {
      var e = em.serie[st.activo];
      var nombre = st.nombre || "Laura";
      var boton = st.activo === em.serie.length - 1 ? "Reservar una llamada" : st.activo === 0 ? "Descargar la guía" : "Leer más";
      return '<div class="email-preview"><header><b>' + esc(e[1]) + "</b>De: " + esc(s.equipo) + " de " + esc(s.negocio) + "</header>" +
        '<div class="body">Hola, ' + esc(nombre) + ":<br><br>" + esc(e[2]) + '<br><br><span class="btn btn-primary btn-sm">' + boton + '</span><br><br><small class="muted">Recibes este correo porque descargaste un recurso de ' + esc(s.negocio) + ". Puedes darte de baja con un clic.</small></div></div>";
    };
    var pintar = function (root) {
      root.querySelector("#timeline").innerHTML = htmlTimeline();
      root.querySelector("#correo").innerHTML = htmlCorreo();
      var lf = root.querySelector("#landing-form");
      if (st.apuntado) lf.outerHTML = '<p id="landing-form" style="margin-top:16px;font-weight:600">✓ ¡Listo! Te la hemos enviado a tu correo.</p>';
      root.querySelector("#crm-nota").innerHTML = st.apuntado
        ? '<span class="tag tag-ok">Nuevo contacto en el CRM</span> ' + esc(st.nombre) + " · origen: " + esc(em.recurso)
        : '<span class="muted small">Cuando alguien descargue la guía, aparecerá aquí como contacto nuevo.</span>';
    };

    return {
      html:
        cabecera("Marketing", "Captación con recurso descargable y email", "Un recurso útil para tu cliente ideal, una serie de correos que sale sola y métricas para saber qué funciona.") +
        '<div class="stage"><div class="stack">' +
          '<div class="landing"><span class="tag">Página de descarga</span><div class="row" style="gap:20px;align-items:flex-start;margin-top:12px"><div class="cover">' + esc(em.recurso) + "</div><div>" +
            "<h3>Descarga gratis: " + esc(em.recurso) + "</h3><p>Escrita por el equipo de " + esc(s.negocio) + ". Te la enviamos por email.</p></div></div>" +
            '<form id="landing-form"><input type="text" placeholder="Tu nombre" aria-label="Tu nombre" value="Laura" required><input type="email" placeholder="Tu email" aria-label="Tu email" value="laura@ejemplo.com" required><button class="btn btn-primary" type="submit">Quiero la guía</button></form></div>' +
          '<div class="panel"><div class="panel-body" id="crm-nota"></div></div>' +
          '<div class="panel"><div class="panel-head"><h2>Serie de correos automática</h2><span class="tag">Se para si responde o se da de baja</span></div><div class="panel-body timeline" id="timeline"></div></div>' +
        '</div><div class="side"><div class="panel"><div class="panel-head"><h2>Vista previa del correo</h2></div><div class="panel-body" id="correo"></div></div>' +
          '<div class="panel"><div class="panel-head"><h2>Última newsletter</h2><span class="tag">Ejemplo</span></div><div class="panel-body metrics">' +
            [["1.240", "enviados"], ["51 %", "aperturas"], ["9,8 %", "clics"], ["0,4 %", "bajas"]].map(function (m) { return '<div class="metric"><b>' + m[0] + "</b><span>" + m[1] + "</span></div>"; }).join("") + "</div></div>" +
          explicacion("Qué está pasando", [
            "El recurso <strong>atrae a tu cliente ideal</strong> a cambio de su email.",
            "El contacto <strong>entra solo en tu CRM</strong>, con su consentimiento guardado.",
            "Recibe <strong>una serie de correos útiles</strong> que acaba invitándole a hablar contigo.",
            "Las <strong>bajas y rebotes se gestionan solos</strong>, como pide el RGPD."
          ]) +
        "</div></div>",
      init: function (root) {
        pintar(root);
        root.addEventListener("submit", function (e) {
          if (e.target.id !== "landing-form") return;
          e.preventDefault();
          st.nombre = e.target.querySelector("input").value.trim() || "Laura";
          st.apuntado = true;
          st.activo = 0;
          pintar(root);
          toast("Guía enviada y serie de correos activada");
        });
        root.addEventListener("click", function (e) {
          var b = e.target.closest("[data-correo]");
          if (!b) return;
          st.activo = +b.dataset.correo;
          pintar(root);
        });
      }
    };
  };

  /* ===== Reseñas ===== */
  var vistaResenas = function () {
    var s = S();
    var r = s.resenas;
    var st = mem("resenas", function () { return { paso: 0, publicadaPos: false, publicadaNeg: false }; });

    var htmlFlujo = function () {
      var html = "";
      if (st.paso === 0) return '<div class="empty">Pulsa «Termina una cita» para ver qué recibe tu cliente.<br><br><button class="btn btn-dark" id="terminar">Termina una cita</button></div>';
      html += '<div class="wa"><div class="wa-bubble">Hola, ' + esc(primerNombre(r.positiva[0])) + ". Gracias por confiar en " + esc(s.negocio) + ". ¿Nos dejas tu opinión? Nos ayuda mucho: enlace a Google<span class=\"wa-meta\">Al terminar · automático</span></div></div>";
      if (st.paso >= 2) {
        html += '<div class="review' + (st.animar === "pos" ? " anim" : "") + '" style="margin-top:14px"><div class="row between"><b>' + esc(r.positiva[0]) + "</b>" + estrellas(r.positiva[1]) + '</div><p style="margin:6px 0 10px">' + esc(r.positiva[2]) + "</p>" +
          '<div class="draft"><span class="muted">Respuesta propuesta por la IA</span>' + esc(r.respuestaPositiva) + "</div>" +
          (st.publicadaPos ? '<span class="tag tag-ok" style="margin-top:10px">Respuesta publicada</span>' : '<button class="btn btn-primary btn-sm" id="pub-pos" style="margin-top:10px">Publicar respuesta</button>') + "</div>";
      }
      if (st.paso === 2 && st.publicadaPos) html += '<div style="margin-top:14px"><button class="btn btn-ghost" id="negativa">Llega una reseña negativa</button></div>';
      if (st.paso >= 3) {
        html += '<p class="alert" style="margin-top:14px">Aviso: nueva reseña de ' + r.negativa[1] + " estrellas. Te la hemos enviado por email para responder hoy.</p>" +
          '<div class="review' + (st.animar === "neg" ? " anim" : "") + '" style="margin-top:10px"><div class="row between"><b>' + esc(r.negativa[0]) + "</b>" + estrellas(r.negativa[1]) + '</div><p style="margin:6px 0 10px">' + esc(r.negativa[2]) + "</p>" +
          '<div class="draft"><span class="muted">Respuesta propuesta por la IA</span>' + esc(r.respuestaNegativa) + "</div>" +
          (st.publicadaNeg ? '<span class="tag tag-ok" style="margin-top:10px">Respuesta publicada</span>' : '<button class="btn btn-primary btn-sm" id="pub-neg" style="margin-top:10px">Revisar y publicar</button>') + "</div>";
      }
      return html;
    };
    var pintar = function (root) { root.querySelector("#flujo").innerHTML = htmlFlujo(); st.animar = null; };

    return {
      html:
        cabecera("Marketing", "Reseñas y reputación", "Pedimos la reseña justo cuando el cliente está contento, te avisamos de las negativas y te dejamos la respuesta preparada.") +
        '<div class="stage"><div class="panel"><div class="panel-head"><h2>Reseñas de ' + esc(s.negocio) + '</h2><span class="row"><b>4,8</b>' + estrellas(5) + "</span></div><div class=\"panel-body\" id=\"flujo\"></div></div>" +
        '<div class="side">' + explicacion("Qué está pasando", [
          "Al terminar el servicio, tu cliente recibe <strong>un mensaje pidiendo su opinión</strong>.",
          "Cada reseña llega con <strong>una respuesta propuesta</strong> en tu tono.",
          "Las negativas te llegan <strong>con aviso</strong> para responder rápido.",
          "<strong>Nada se publica sin que lo revises.</strong>"
        ]) + "</div></div>",
      init: function (root) {
        pintar(root);
        root.addEventListener("click", function (e) {
          if (e.target.closest("#terminar")) {
            st.paso = 1; pintar(root);
            espera(1400).then(function () { st.paso = 2; st.animar = "pos"; if (vistaActual() === "resenas") { pintar(root); toast("Nueva reseña de 5 estrellas"); } });
          } else if (e.target.closest("#pub-pos")) { st.publicadaPos = true; pintar(root); toast("Respuesta publicada en Google"); }
          else if (e.target.closest("#negativa")) { st.paso = 3; st.animar = "neg"; pintar(root); }
          else if (e.target.closest("#pub-neg")) { st.publicadaNeg = true; pintar(root); toast("Respuesta publicada en Google"); }
        });
      }
    };
  };

  /* ===== Agentes ===== */
  var vistaAgentes = function () {
    var s = S();
    var st = mem("agentes", function () { return { activo: null, hechos: 0, corriendo: false, aprobado: false }; });

    var htmlRun = function () {
      if (st.activo == null) return '<div class="empty">Elige un disparador para ver al agente trabajar paso a paso.</div>';
      var a = s.agentes[st.activo];
      var pasos = a[1].map(function (p, i) {
        var cls = i < st.hechos ? "is-done" : i === st.hechos && st.corriendo ? "is-doing" : "";
        return '<div class="run-step ' + cls + '"><span class="dot">' + (i < st.hechos ? "✓" : "") + "</span>" + esc(p) + "</div>";
      }).join("");
      var final = !st.corriendo && st.hechos === a[1].length
        ? '<div class="draft" style="margin-top:8px"><span class="muted">Listo</span>El agente ha terminado y te deja el resultado para revisar. ' +
          (st.aprobado ? '<br><span class="tag tag-ok" style="margin-top:8px">Aprobado</span>' : '<br><button class="btn btn-primary btn-sm" id="aprobar" style="margin-top:8px">Revisar y aprobar</button>') + "</div>"
        : "";
      return '<div class="run">' + pasos + "</div>" + final;
    };
    var pintar = function (root) {
      root.querySelector("#triggers").innerHTML = s.agentes.map(function (a, i) {
        return '<button class="trigger' + (st.activo === i ? " is-active" : "") + '" data-trigger="' + i + '"' + (st.corriendo ? " disabled" : "") + ">" + esc(a[0]) + "</button>";
      }).join("");
      root.querySelector("#run").innerHTML = htmlRun();
    };
    var ejecutar = function (root, i) {
      st.activo = i; st.hechos = 0; st.corriendo = true; st.aprobado = false;
      pintar(root);
      var total = s.agentes[i][1].length;
      var paso = function () {
        if (vistaActual() !== "agentes" || st.activo !== i) { st.corriendo = false; return; }
        st.hechos++;
        if (st.hechos >= total) st.corriendo = false;
        pintar(root);
        if (st.corriendo) setTimeout(paso, 850);
      };
      setTimeout(paso, 850);
    };

    return {
      html:
        cabecera("El siguiente nivel", "Agentes de IA", "Un agente no solo redacta: da varios pasos seguidos, como lo haría una persona del equipo, y te avisa cuando necesita tu revisión.") +
        '<div class="stage"><div class="stack"><div class="panel"><div class="panel-head"><h2>Cuando pasa esto…</h2></div><div class="panel-body triggers" id="triggers"></div></div>' +
          '<div class="panel"><div class="panel-head"><h2>…el agente hace esto</h2></div><div class="panel-body" id="run"></div></div></div>' +
        '<div class="side">' + explicacion("Qué está pasando", [
          "Algo <strong>dispara el agente</strong>: un correo, un contacto nuevo o una hora del día.",
          "El agente <strong>encadena los pasos</strong> con tus herramientas: CRM, correo, calendario o documentos.",
          "Lo importante <strong>queda para tu revisión</strong>: no envía nada delicado sin tu visto bueno.",
          "Empezamos por flujos sencillos y <strong>los ampliamos cuando funcionan</strong>."
        ]) + "</div></div>",
      init: function (root) {
        pintar(root);
        root.addEventListener("click", function (e) {
          var b = e.target.closest("[data-trigger]");
          if (b && !st.corriendo) { ejecutar(root, +b.dataset.trigger); return; }
          if (e.target.closest("#aprobar")) { st.aprobado = true; pintar(root); toast("Aprobado. El agente continúa"); }
        });
      }
    };
  };

  var VISTAS = {
    inicio: vistaInicio, consultas: vistaConsultas, citas: vistaCitas, documentos: vistaDocumentos,
    oficina: vistaOficina, crm: vistaCRM, gastos: vistaGastos, email: vistaEmail, resenas: vistaResenas, agentes: vistaAgentes
  };

  /* ---------- Navegación ---------- */
  var vistaActual = function () { return estado.vista; };
  var nav = document.getElementById("nav");
  var view = document.getElementById("view");
  var menuBtn = document.querySelector(".menu-btn");

  var pintarNav = function () {
    nav.innerHTML = MODULOS.map(function (m) {
      if (m.grupo) return '<p class="nav-group">' + esc(m.grupo) + "</p>";
      return '<a href="#' + m.id + '"' + (m.id === estado.vista ? ' aria-current="page"' : "") + '><span class="ico" aria-hidden="true">' + m.ico + "</span>" + esc(m.titulo) + "</a>";
    }).join("") + '<p class="nav-note">Demo con datos ficticios. Todo ocurre en tu navegador: no se guarda ni se envía nada.</p>';
  };

  var render = function () {
    var id = (location.hash || "#inicio").slice(1);
    if (!VISTAS[id]) id = "inicio";
    estado.vista = id;
    pintarNav();
    var v = VISTAS[id]();
    view.innerHTML = '<div class="entra">' + v.html + "</div>";
    if (v.init) v.init(view);
    document.title = (porId[id] && id !== "inicio" ? porId[id].titulo + " · " : "") + "Demo · Fluivia";
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    window.scrollTo(0, 0);
    view.focus({ preventScroll: true });
  };

  var selector = document.getElementById("sector");
  selector.innerHTML = CLAVES.map(function (k) { return '<option value="' + k + '">' + esc(SECTORES[k].etiqueta) + "</option>"; }).join("");
  var params = new URLSearchParams(location.search);
  if (SECTORES[params.get("s")]) estado.sector = params.get("s");
  selector.value = estado.sector;
  selector.addEventListener("change", function () {
    estado.sector = selector.value;
    memoria = {};
    var url = new URL(location.href);
    url.searchParams.set("s", estado.sector);
    history.replaceState(null, "", url.pathname + url.search + location.hash);
    render();
    toast("Ejemplo cambiado a " + SECTORES[estado.sector].etiqueta.toLowerCase());
  });

  menuBtn.addEventListener("click", function () {
    var abierto = menuBtn.getAttribute("aria-expanded") !== "true";
    menuBtn.setAttribute("aria-expanded", String(abierto));
    nav.classList.toggle("is-open", abierto);
  });

  window.addEventListener("hashchange", render);
  render();
})();
