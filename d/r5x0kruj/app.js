/* Fluivia · Demo para clientes
   Todo es simulado en el navegador: no se envía nada a ningún sitio. */
(function () {
  "use strict";

  /* ---------- Datos: textos (data.js) + marca de cada negocio (data-marcas.js) ---------- */
  var SECTORES = {};
  Object.keys(window.DEMO_SECTORES).forEach(function (k) {
    var extra = window.DEMO_MARCAS[k] || {};
    var base = window.DEMO_SECTORES[k];
    SECTORES[k] = Object.assign({}, base, {
      marca: extra.marca,
      portal: extra.portal,
      citasExtra: extra.citas,
      inmuebles: extra.inmuebles,
      profesionales: extra.profesionales,
      gastos: extra.gastos
    });
  });
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
  var fmtDiaMes = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short" });
  var fmtMes = new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric" });
  var capital = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
  var horaAhora = function () { return new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }); };

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

  /* ---------- Iconos de línea ---------- */
  var ICONOS = {
    inicio: "M3 11 12 4l9 7M5 10v10h14V10",
    consultas: "M4 5h16v11H9l-5 4z",
    citas: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
    documentos: "M6 3h8l4 4v14H6zM14 3v4h4M9 13h6M9 17h6",
    oficina: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
    crm: "M4 5h4v14H4zM10 5h4v9h-4zM16 5h4v6h-4z",
    gastos: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3",
    email: "M3 6h18v12H3zM3 7l9 6 9-6",
    resenas: "M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8-4.2-4.1 5.9-.9z",
    agentes: "M4 6h6v5H4zM14 13h6v5h-6zM10 8.5h2.5a2 2 0 0 1 2 2V13",
    camara: "M4 8h4l2-3h4l2 3h4v11H4zM12 16.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    subir: "M12 16V5M7 10l5-5 5 5M5 19h14",
    reloj: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
    atras: "M15 5l-7 7 7 7"
  };
  var icono = function (nombre, clase) {
    return '<svg class="icon ' + (clase || "") + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + ICONOS[nombre] + '"/></svg>';
  };

  /* ---------- Estado ---------- */
  var estado = { sector: "gestoria", vista: "inicio" };
  var memoria = {};
  var S = function () { return SECTORES[estado.sector]; };
  var mem = function (id, inicial) {
    if (!memoria[id]) memoria[id] = inicial();
    return memoria[id];
  };
  var vistaActual = function () { return estado.vista; };

  /* ---------- Piezas comunes ---------- */
  var MODULOS = [
    { id: "inicio", titulo: "Inicio" },
    { grupo: "Para empezar" },
    { id: "consultas", titulo: "Consultas en orden", desc: "Un asistente responde las preguntas frecuentes y deja lo demás preparado para tu equipo." },
    { id: "citas", titulo: "Citas sin llamadas", desc: "Tus clientes reservan solos y reciben confirmación y recordatorio." },
    { id: "documentos", titulo: "Documentos sin perseguir", desc: "Cada cliente sube lo que falta y la IA lee las facturas por ti." },
    { grupo: "A medida" },
    { id: "oficina", titulo: "Oficina digital", desc: "Todo tu negocio en un panel, con lo que toca hoy." },
    { id: "crm", titulo: "CRM a tu medida", desc: "Tus contactos por etapas, con la próxima acción de cada uno." },
    { id: "gastos", titulo: "Control de gastos", desc: "Foto al recibo y exportación lista para tu gestoría." },
    { grupo: "Marketing" },
    { id: "email", titulo: "Captación y email", desc: "Una guía descargable que trae contactos y una serie de correos que los acompaña." },
    { id: "resenas", titulo: "Reseñas", desc: "Pide reseñas en el momento justo y responde con borradores revisados." },
    { grupo: "El siguiente nivel" },
    { id: "agentes", titulo: "Agentes de IA", desc: "Flujos que encadenan varios pasos y te avisan cuando necesitan tu revisión." }
  ];
  var ORDEN = MODULOS.filter(function (m) { return m.id; }).map(function (m) { return m.id; });
  var porId = {};
  MODULOS.forEach(function (m) { if (m.id) porId[m.id] = m; });

  var logoMarca = function (tam) {
    var s = S();
    return '<span class="marca-logo" style="width:' + tam + "px;height:" + tam + 'px">' + s.marca.logo + "</span>";
  };
  var cabeceraApp = function (subtitulo, extra) {
    var s = S();
    return '<div class="app-top">' + logoMarca(30) + '<div class="app-top-txt"><b>' + esc(s.negocio) + "</b>" +
      (subtitulo ? "<small>" + esc(subtitulo) + "</small>" : "") + "</div>" + (extra || "") + "</div>";
  };
  var movil = function (quien, contenido) {
    return '<div class="lado lado-cli"><p class="quien">' + esc(quien) + '</p><div class="movil"><div class="movil-pantalla">' + contenido + "</div></div></div>";
  };
  var ventana = function (quien, url, contenido, clase) {
    return '<div class="lado lado-eq ' + (clase || "") + '"><p class="quien">' + esc(quien) + '</p><div class="ventana"><div class="ventana-barra"><i></i><i></i><i></i><span>' + esc(url) + '</span></div><div class="ventana-app">' + contenido + "</div></div></div>";
  };
  var guia = function (pasos, actual) {
    return '<ol class="guia">' + pasos.map(function (p, i) {
      var cls = actual == null ? "" : i < actual ? "is-hecho" : i === actual ? "is-ahora" : "";
      return '<li class="' + cls + '"><span class="guia-n">' + (actual != null && i < actual ? "✓" : i + 1) + "</span><span>" + p + "</span></li>";
    }).join("") + "</ol>";
  };
  var puntos = function (lista) {
    return '<div class="puntos"><p class="puntos-tit">Qué está pasando</p><ul>' + lista.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ul></div>";
  };
  var cabecera = function (id, entradilla) {
    var m = porId[id];
    return '<div class="mod-head"><div><h1>' + esc(m.titulo) + "</h1><p>" + entradilla + '</p></div><button class="btn btn-ghost btn-sm" data-reiniciar="' + id + '">Empezar de nuevo</button></div>';
  };
  var paginador = function (id) {
    var i = ORDEN.indexOf(id);
    var ant = ORDEN[i - 1], sig = ORDEN[i + 1];
    return '<nav class="pager" aria-label="Recorrido de la demo">' +
      (ant ? '<a class="btn btn-ghost" href="#' + ant + '">← ' + esc(porId[ant].titulo) + "</a>" : "<span></span>") +
      (sig ? '<a class="btn btn-dark" href="#' + sig + '">' + esc(porId[sig].titulo) + " →</a>" : '<a class="btn btn-dark" href="#inicio">Volver al inicio</a>') +
      "</nav>";
  };
  var estrellas = function (n) {
    var s = "";
    for (var i = 1; i <= 5; i++) s += i <= n ? "★" : '<span class="off">★</span>';
    return '<span class="stars" aria-label="' + n + ' de 5 estrellas">' + s + "</span>";
  };
  var fotoInmueble = function (inm, alto) {
    return '<div class="foto" style="height:' + alto + "px;background:linear-gradient(135deg," + inm.tono[0] + "," + inm.tono[1] + ')"><svg viewBox="0 0 120 60" aria-hidden="true"><path d="M20 56V30l25-18 25 18v26M70 56V36h30v20" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="3" stroke-linejoin="round"/><path d="M38 56V42h14v14M80 44h10" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="3"/></svg></div>';
  };
  var fichaInmueble = function (inm) {
    return '<div class="inmueble">' + fotoInmueble(inm, 84) + '<div class="inmueble-txt"><b>' + esc(inm.titulo) + "</b><span>" + esc(inm.zona) + " · " + inm.m2 + " m² · " + inm.hab + " hab.</span><strong>" + esc(inm.precio) + "</strong></div></div>";
  };

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
        '<section class="home-hero"><div class="home-intro">' +
          '<p class="kicker">Demo de Fluivia</p>' +
          "<h1>Así podría funcionar tu negocio con Fluivia</h1>" +
          "<p>Hemos creado un negocio ficticio para que veas, con ejemplos reales, lo que montamos. En cada pantalla verás a la izquierda lo que ve tu cliente en su móvil y a la derecha lo que ve tu equipo.</p>" +
          '<p class="home-label">Elige el negocio que más se parece al tuyo</p><div class="home-sectores">' +
            CLAVES.map(function (k) {
              return '<button class="sector-btn' + (k === estado.sector ? " is-on" : "") + '" data-sector="' + k + '"><span class="marca-logo" style="width:26px;height:26px">' + SECTORES[k].marca.logo + "</span>" + esc(SECTORES[k].etiqueta) + "</button>";
            }).join("") +
          '</div><a class="btn btn-primary" href="#consultas">Empezar el recorrido →</a></div>' +
          '<div class="home-negocio"><p class="kicker">Nuestro negocio de ejemplo</p>' +
            '<div class="negocio-card">' + logoMarca(64) + '<h2 class="marca-fuente">' + esc(s.negocio) + "</h2><p>" + esc(s.marca.lema) + '</p><span class="negocio-web">' + esc(s.marca.web) + "</span>" +
            '<div class="paleta"><i style="background:' + s.marca.m1 + '"></i><i style="background:' + s.marca.m2 + '"></i><i style="background:' + s.marca.suave + '"></i></div></div>' +
            '<p class="small muted">Cada demo se adapta a la marca y a la forma de trabajar de cada negocio.</p>' +
        "</div></section>" +
        grupos.map(function (g) {
          return '<p class="home-group">' + esc(g.titulo) + '</p><div class="home-grid">' +
            g.items.map(function (m) {
              return '<a class="home-card" href="#' + m.id + '"><span class="ico">' + icono(m.id) + "</span><h3>" + esc(m.titulo) + "</h3><p>" + esc(m.desc) + '</p><span class="go">Probar →</span></a>';
            }).join("") + "</div>";
        }).join(""),
      init: function (root) {
        root.querySelectorAll("[data-sector]").forEach(function (b) {
          b.addEventListener("click", function () { cambiarSector(b.dataset.sector); });
        });
      }
    };
  };

  /* ===== Consultas en orden ===== */
  var vistaConsultas = function () {
    var s = S();
    var c = s.consultas;
    var st = mem("consultas", function () {
      return { msgs: [{ de: "bot", texto: "Hola, soy el asistente de " + s.negocio + ". Soy una inteligencia artificial: si no sé algo, te paso con una persona del equipo. ¿En qué te ayudo?" }], bandeja: [], ocupado: false, vistos: 1, bandejaVista: 0, iaOk: false, derivada: false, aprobada: false };
    });
    var paso = function () { return !st.iaOk ? 0 : !st.derivada ? 1 : !st.aprobada ? 2 : 3; };
    var PASOS = ["Pulsa una pregunta de ejemplo en el móvil", "Prueba la última pregunta: la IA no la sabe", "Aprueba la respuesta en la bandeja del equipo"];

    var htmlMsgs = function () {
      return st.msgs.map(function (m, i) {
        var anim = i >= st.vistos ? " anim" : "";
        if (m.de === "nota") return '<div class="msg-note' + anim + '">' + esc(m.texto) + "</div>";
        if (m.de === "escribiendo") return '<div class="msg msg-bot' + anim + '"><span class="typing" aria-label="Escribiendo"><i></i><i></i><i></i></span></div>';
        var firma = m.firma ? '<small class="firma">' + esc(m.firma) + "</small>" : "";
        var tarjeta = m.tarjeta != null ? fichaInmueble(s.inmuebles[m.tarjeta]) + '<a class="btn btn-marca btn-sm" href="#citas" style="margin-top:8px">Reservar visita</a>' : "";
        return '<div class="msg msg-' + (m.de === "user" ? "user" : "bot") + anim + '">' + esc(m.texto) + tarjeta + firma + "</div>";
      }).join("");
    };
    var htmlBandeja = function () {
      if (!st.bandeja.length) return '<div class="empty">Aquí llegan las conversaciones, clasificadas por tema. Escribe algo en el móvil para verlo.</div>';
      return st.bandeja.slice().reverse().map(function (b) {
        var i = st.bandeja.indexOf(b);
        var etiqueta = b.estado === "ia" ? '<span class="tag tag-ok">Respondida por la IA</span>'
          : b.estado === "pendiente" ? '<span class="tag tag-warn">Para revisar</span>'
          : '<span class="tag tag-dark">Respondida por ' + esc(s.equipo) + "</span>";
        return '<div class="inbox-item' + (i >= st.bandejaVista ? " anim" : "") + '"><div class="row between wrap"><span class="tag">' + esc(b.tema) + "</span>" + etiqueta + "</div>" +
          '<p class="inbox-q">«' + esc(b.pregunta) + '»</p><small class="muted">Web · ' + esc(b.hora) + "</small>" +
          (b.estado === "pendiente"
            ? '<div class="draft"><span class="draft-tit">Borrador preparado por la IA</span>' + esc(b.borrador) +
              '<div class="row" style="margin-top:10px"><button class="btn btn-primary btn-sm' + (paso() === 2 ? " pista" : "") + '" data-aprobar="' + i + '">Aprobar y enviar</button></div></div>'
            : "") + "</div>";
      }).join("");
    };
    var pintar = function (root) {
      var log = root.querySelector(".chat-log");
      log.innerHTML = htmlMsgs();
      log.scrollTop = log.scrollHeight;
      root.querySelector("#bandeja").innerHTML = htmlBandeja();
      st.vistos = st.msgs.filter(function (m) { return m.de !== "escribiendo"; }).length;
      st.bandejaVista = st.bandeja.length;
      root.querySelector(".guia-wrap").innerHTML = guia(PASOS, paso());
      root.querySelectorAll(".chip-btn").forEach(function (b, i) {
        b.disabled = st.ocupado;
        b.classList.toggle("pista", (paso() === 0 && i === 0) || (paso() === 1 && i === 3));
      });
      root.querySelector(".chat-form button").disabled = st.ocupado;
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
        var mejor = null, puntosMax = 0;
        c.faqs.forEach(function (f) {
          var p = f.claves.filter(function (k) { return t.indexOf(norm(k)) !== -1; }).length;
          if (p > puntosMax) { puntosMax = p; mejor = f; }
        });
        if (mejor) {
          var m = { de: "bot", texto: mejor.respuesta };
          if (s.inmuebles && mejor.tema === "Disponibilidad") m.tarjeta = 0;
          st.msgs.push(m);
          st.bandeja.push({ pregunta: texto, tema: mejor.tema, estado: "ia", hora: horaAhora() });
          st.iaOk = true;
        } else {
          st.msgs.push({ de: "bot", texto: c.sinRespuesta });
          st.msgs.push({ de: "nota", texto: "Avisado a " + s.equipo });
          var borrador = norm(texto) === norm(c.sugerencias[3]) ? c.borrador : "Hola, gracias por escribirnos. Lo revisamos y te respondemos hoy mismo.";
          st.bandeja.push({ pregunta: texto, tema: "Otra consulta", estado: "pendiente", hora: horaAhora(), borrador: borrador });
          st.derivada = true;
        }
        st.ocupado = false;
        if (vistaActual() === "consultas") pintar(root);
      });
    };

    return {
      html:
        cabecera("consultas", "Un asistente con la información de tu negocio responde al momento. Lo que no sabe, lo pasa a tu equipo con la respuesta ya preparada.") +
        '<div class="guia-wrap"></div><div class="escena">' +
          movil("Lo que ve tu " + s.cliente,
            cabeceraApp("Asistente · responde al momento") +
            '<div class="chat-log" aria-live="polite"></div>' +
            '<div class="chips">' + c.sugerencias.map(function (q) { return '<button class="chip-btn" type="button">' + esc(q) + "</button>"; }).join("") + "</div>" +
            '<form class="chat-form"><input type="text" placeholder="Escribe tu pregunta…" aria-label="Tu pregunta" autocomplete="off"><button class="btn btn-marca btn-sm" type="submit">Enviar</button></form>') +
          ventana("Lo que ve tu equipo", s.marca.web + "/equipo", cabeceraApp("Bandeja de consultas", '<span class="tag tag-claro">Un solo sitio</span>') + '<div id="bandeja"></div>') +
        "</div>" +
        puntos(["La IA responde con <strong>la información de tu negocio</strong> y no inventa.", "Si no sabe algo, <strong>lo dice y avisa a una persona</strong>.", "Te deja <strong>un borrador preparado</strong>: tú decides si se envía.", "Funciona en tu web, por email o por WhatsApp."]) +
        paginador("consultas"),
      init: function (root) {
        pintar(root);
        root.querySelectorAll(".chip-btn").forEach(function (b) { b.addEventListener("click", function () { responder(root, b.textContent); }); });
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
          st.msgs.push({ de: "bot", texto: item.borrador, firma: s.equipo + " · " + s.negocio });
          st.aprobada = true;
          pintar(root);
          toast("Respuesta enviada al " + s.cliente);
        });
      }
    };
  };

  /* ===== Citas sin llamadas ===== */
  var HORAS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "16:00", "16:30", "17:00", "17:30"];
  var vistaCitas = function () {
    var s = S();
    var esInmo = !!s.inmuebles;
    var st = mem("citas", function () { return { fase: "inicio", eleccion: null, pro: null, dia: null, hora: null, nombre: "", verMensajes: false }; });
    var dias = proximosDias(5);
    var PASOS = [esInmo ? "Elige la vivienda que quieres ver" : "Elige qué necesitas", "Elige día y hora", "Confirma con tus datos", "Mira la agenda del equipo y el mensaje que recibe tu " + s.cliente];
    var paso = function () {
      if (st.fase === "inicio" || st.fase === "pro") return 0;
      if (st.fase === "dia" || st.fase === "hora") return 1;
      if (st.fase === "datos") return 2;
      return st.verMensajes ? 4 : 3;
    };
    var nombreCita = function () {
      if (esInmo) return "Visita · " + s.inmuebles[st.eleccion].titulo;
      return s.citas.servicios[st.eleccion][0];
    };

    var htmlMovil = function () {
      var titulo = '<div class="app-sec"><h3 class="marca-fuente">' + esc(s.citasExtra.titulo) + "</h3></div>";
      if (st.fase === "inicio") {
        var opciones = esInmo
          ? s.inmuebles.map(function (inm, i) { return '<button class="opcion-inm' + (i === 0 ? " pista" : "") + '" data-eleccion="' + i + '">' + fichaInmueble(inm) + "</button>"; }).join("")
          : s.citas.servicios.map(function (sv, i) { return '<button class="opcion' + (i === 0 ? " pista" : "") + '" data-eleccion="' + i + '"><span>' + esc(sv[0]) + "</span><small>" + sv[1] + " min</small></button>"; }).join("");
        return cabeceraApp() + titulo + '<div class="app-body"><p class="app-label">' + esc(s.citasExtra.paso0) + '</p><div class="opciones">' + opciones + "</div></div>";
      }
      if (st.fase === "pro") {
        return cabeceraApp() + titulo + '<div class="app-body"><p class="app-label">' + esc(nombreCita()) + ' · ¿con quién?</p><div class="opciones">' +
          s.profesionales.map(function (p, i) { return '<button class="opcion' + (i === 0 ? " pista" : "") + '" data-pro="' + i + '"><span>' + esc(p) + "</span></button>"; }).join("") + "</div></div>";
      }
      if (st.fase === "dia" || st.fase === "hora") {
        var html = cabeceraApp() + titulo + '<div class="app-body"><p class="app-label">' + esc(nombreCita()) + '</p><p class="app-label">Elige día</p><div class="days">' +
          dias.map(function (d, i) {
            return '<button class="day' + (st.dia === i ? " is-on" : "") + (st.fase === "dia" && i === 1 ? " pista" : "") + '" data-dia="' + i + '"><small>' + esc(fmtDiaSemana.format(d)) + "</small><b>" + d.getDate() + "</b></button>";
          }).join("") + "</div>";
        if (st.fase === "hora") {
          var primeraLibre = true;
          html += '<p class="app-label" style="margin-top:16px">Elige hora</p><div class="slots">' +
            HORAS.map(function (h, i) {
              var ocupada = (i * 7 + st.dia * 3) % 5 === 0;
              var pista = !ocupada && i > 1 && primeraLibre;
              if (pista) primeraLibre = false;
              return '<button class="slot-btn' + (pista ? " pista" : "") + '" data-hora="' + h + '"' + (ocupada ? " disabled" : "") + ">" + h + "</button>";
            }).join("") + "</div>";
        }
        return html + "</div>";
      }
      if (st.fase === "datos") {
        return cabeceraApp() + titulo + '<div class="app-body"><div class="resumen-cita"><b>' + esc(nombreCita()) + "</b><span>" + esc(capital(fmtLargo.format(dias[st.dia]))) + " · " + st.hora + "</span>" + (st.pro != null && st.pro < 2 ? "<span>Con " + esc(s.profesionales[st.pro].split(" · ")[0]) + "</span>" : "") + "</div>" +
          '<form class="stack" id="datos-cita"><div class="field"><label for="c-nombre">Nombre</label><input id="c-nombre" required value="Laura Gómez"></div>' +
          '<div class="field"><label for="c-tel">Móvil (para el recordatorio)</label><input id="c-tel" required value="600 123 456" inputmode="tel"></div>' +
          '<button class="btn btn-marca pista" type="submit">Confirmar cita</button></form></div>';
      }
      if (!st.verMensajes) {
        return cabeceraApp() + titulo + '<div class="app-body confirm"><div class="ok">✓</div><h3 class="marca-fuente">¡Cita confirmada!</h3><p>' + esc(nombreCita()) + "<br>" + esc(capital(fmtLargo.format(dias[st.dia]))) + " a las " + st.hora + "</p>" +
          '<button class="btn btn-marca pista" id="ver-mensajes">Ver el mensaje que te llega</button></div>';
      }
      var nom = primerNombre(st.nombre);
      return '<div class="wa-head"><button class="wa-back" id="volver-cita" aria-label="Volver">' + icono("atras") + "</button>" + logoMarca(30) + "<div><b>" + esc(s.negocio) + "</b><small>Cuenta de empresa</small></div></div>" +
        '<div class="wa"><div class="wa-bubble">Hola, ' + esc(nom) + ". Tu cita en " + esc(s.negocio) + " está confirmada para el " + esc(fmtLargo.format(dias[st.dia])) + " a las " + st.hora + ". Si necesitas cambiarla, hazlo aquí: " + esc(s.marca.web) + '/cita<span class="wa-meta">' + horaAhora() + "</span></div>" +
        '<p class="wa-dia">El día antes</p><div class="wa-bubble">Hola, ' + esc(nom) + ". Te recordamos tu cita de mañana a las " + st.hora + ". ¿Nos confirmas que vienes? Responde SÍ o cámbiala desde el enlace." + '<span class="wa-meta">10:00</span></div></div>';
    };

    var htmlAgenda = function () {
      var items = s.citas.agenda.map(function (a) { return { hora: a[0], texto: a[1] }; });
      if (st.fase === "hecho") items.push({ hora: st.hora, texto: st.nombre + " · " + nombreCita() + (st.pro != null && st.pro < 2 ? " · con " + s.profesionales[st.pro].split(" · ")[0] : ""), nueva: true });
      items.sort(function (a, b) { return a.hora < b.hora ? -1 : 1; });
      var dia = st.dia != null ? dias[st.dia] : dias[0];
      return cabeceraApp("Agenda", '<span class="tag tag-claro">' + esc(capital(fmtLargo.format(dia))) + "</span>") +
        '<div class="app-body">' + items.map(function (a) {
          return '<div class="agenda-item' + (a.nueva ? " is-new anim" : "") + '"><b>' + a.hora + "</b><span>" + esc(a.texto) + "</span>" + (a.nueva ? '<span class="tag tag-ok">Nueva · online</span>' : "") + "</div>";
        }).join("") +
        (st.fase === "hecho" ? '<p class="nota-eq">' + icono("reloj") + "Recordatorio programado para el día antes a las 10:00</p>" : '<p class="nota-eq muted">' + icono("reloj") + "Las citas reservadas online aparecen aquí al momento.</p>") +
        "</div>";
    };

    var pintar = function (root) {
      root.querySelector(".movil-pantalla").innerHTML = htmlMovil();
      root.querySelector(".ventana-app").innerHTML = htmlAgenda();
      root.querySelector(".guia-wrap").innerHTML = guia(PASOS, paso());
    };

    return {
      html:
        cabecera("citas", "Tu " + esc(s.cliente) + " reserva en un minuto desde el móvil, recibe la confirmación y un recordatorio, y la cita entra sola en tu agenda.") +
        '<div class="guia-wrap"></div><div class="escena">' +
          movil("Lo que ve tu " + s.cliente, "") +
          ventana("Lo que ve tu equipo", s.marca.web + "/agenda", "") +
        "</div>" +
        puntos(["Tu " + esc(s.cliente) + " <strong>solo ve los huecos libres</strong>.", "La cita <strong>entra sola en tu calendario</strong>.", "Recibe <strong>confirmación y recordatorio</strong> por WhatsApp o email.", "Puede <strong>cambiarla o cancelarla</strong> sin llamar, y el hueco se libera."]) +
        paginador("citas"),
      init: function (root) {
        pintar(root);
        root.addEventListener("click", function (e) {
          var b;
          if ((b = e.target.closest("[data-eleccion]"))) { st.eleccion = +b.dataset.eleccion; st.fase = s.profesionales ? "pro" : "dia"; }
          else if ((b = e.target.closest("[data-pro]"))) { st.pro = +b.dataset.pro; st.fase = "dia"; }
          else if ((b = e.target.closest("[data-dia]"))) { st.dia = +b.dataset.dia; st.fase = "hora"; st.hora = null; }
          else if ((b = e.target.closest("[data-hora]"))) { st.hora = b.dataset.hora; st.fase = "datos"; }
          else if (e.target.closest("#ver-mensajes")) { st.verMensajes = true; }
          else if (e.target.closest("#volver-cita")) { st.verMensajes = false; }
          else return;
          pintar(root);
        });
        root.addEventListener("submit", function (e) {
          if (e.target.id !== "datos-cita") return;
          e.preventDefault();
          st.nombre = root.querySelector("#c-nombre").value.trim() || "Cliente";
          st.fase = "hecho";
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
        tab: "estado",
        docs: d.lista.map(function (n, i) { return { nombre: n, estado: i < recibidos ? "aceptado" : "pendiente" }; }),
        lectura: 0, animar: false, recordados: {}, subido: false, aceptado: false
      };
    });
    var f = d.factura;
    var iva = Math.round(f.base * f.ivaPct) / 100;
    var total = f.base + iva;
    var fechaFactura = fmtCorto.format(sumarDias(-6));
    var aceptados = function () { return st.docs.filter(function (x) { return x.estado === "aceptado"; }).length; };
    var porRevisar = function () { return st.docs.filter(function (x) { return x.estado === "revisar"; }).length; };
    var PASOS = ["Sube un documento desde el móvil del " + s.cliente, "Acéptalo en el panel del equipo", "Lee una factura con IA y valida los datos"];
    var paso = function () { return !st.subido ? 0 : !st.aceptado ? 1 : st.lectura < 3 ? 2 : 3; };

    var htmlMovil = function () {
      var faltan = st.docs.filter(function (x) { return x.estado === "pendiente" || x.estado === "rechazado"; }).length;
      var primeraPista = paso() === 0;
      return cabeceraApp(s.portal.titulo) + '<div class="app-body">' +
        '<h3 class="marca-fuente saludo-cli">Hola, ' + esc(primerNombre(d.persona)) + "</h3>" +
        '<div class="info-cards">' + s.portal.info.map(function (i) { return '<div class="info-card"><span>' + esc(i[0]) + "</span><b>" + esc(i[1]) + "</b></div>"; }).join("") + "</div>" +
        '<p class="app-label">' + esc(d.periodo) + " · " + (faltan ? (faltan > 1 ? "te faltan " + faltan + " documentos" : "te falta 1 documento") : "¡ya está todo!") + "</p>" +
        st.docs.map(function (x, i) {
          var accion;
          if (x.estado === "aceptado") accion = '<span class="tag tag-ok">Aceptado</span>';
          else if (x.estado === "revisar") accion = '<span class="tag">En revisión</span>';
          else if (x.estado === "subiendo") accion = '<span class="tag">Subiendo…</span>';
          else {
            accion = '<button class="btn btn-marca btn-sm' + (primeraPista ? " pista" : "") + '" data-subir="' + i + '">' + icono("subir") + "Subir</button>";
            primeraPista = false;
          }
          var nota = x.estado === "rechazado" ? '<small class="error">Se ve borroso: súbelo otra vez</small>' : "";
          return '<div class="doc-row"><span class="name">' + icono("documentos", "doc-ico") + "<span>" + esc(x.nombre) + nota + "</span></span>" + accion + "</div>";
        }).join("") +
        (faltan ? '<p class="nota-cli">' + icono("reloj") + "Te recordaremos lo que falte el " + esc(fmtLargo.format(sumarDias(3))) + ".</p>" : "") +
        "</div>";
    };

    var htmlEquipo = function () {
      var n = porRevisar();
      var tabs = '<div class="tabs-eq" role="tablist">' +
        [["estado", "Estado"], ["revisar", "Por revisar" + (n ? " (" + n + ")" : "")], ["facturas", "Leer facturas"]].map(function (t) {
          var pista = (paso() === 1 && t[0] === "revisar" && st.tab !== "revisar") || (paso() === 2 && t[0] === "facturas" && st.tab !== "facturas");
          return '<button role="tab" data-tab="' + t[0] + '" aria-selected="' + (st.tab === t[0]) + '"' + (pista ? ' class="pista"' : "") + ">" + t[1] + "</button>";
        }).join("") + "</div>";
      var cuerpo;
      if (st.tab === "estado") {
        cuerpo = d.clientes.map(function (c, i) {
          var hechos = i === 0 ? aceptados() : c[1];
          var completo = hechos >= d.lista.length;
          var accion = completo ? '<span class="tag tag-ok">Completo</span>' : st.recordados[i] ? '<span class="tag">Recordado</span>' : '<button class="btn btn-ghost btn-sm" data-recordar="' + i + '">Recordar</button>';
          return '<div class="client-row"><b>' + esc(c[0]) + '</b><div><div class="progress"><span style="width:' + (hechos / d.lista.length * 100) + '%"></span></div><small class="muted">' + hechos + " de " + d.lista.length + "</small></div>" + accion + "</div>";
        }).join("");
      } else if (st.tab === "revisar") {
        var lista = st.docs.map(function (x, i) { return { x: x, i: i }; }).filter(function (o) { return o.x.estado === "revisar"; });
        cuerpo = lista.length ? lista.map(function (o, k) {
          return '<div class="doc-row"><span class="name">' + icono("documentos", "doc-ico") + "<span>" + esc(o.x.nombre) + '<small class="muted" style="display:block">' + esc(d.persona) + ' · acaba de subirlo</small></span></span><span class="row"><button class="btn btn-ghost btn-sm" data-rechazar="' + o.i + '">Pedir otra vez</button><button class="btn btn-primary btn-sm' + (k === 0 && paso() === 1 ? " pista" : "") + '" data-aceptar="' + o.i + '">Aceptar</button></span></div>';
        }).join("") : '<div class="empty">Nada por revisar. Sube algo desde el móvil del ' + esc(s.cliente) + " y aparecerá aquí.</div>";
      } else {
        var campos = [["Proveedor", f.proveedor], ["NIF", f.nif], ["N.º de factura", f.numero], ["Fecha", fechaFactura], ["Concepto", f.concepto], ["Base imponible", eur(f.base)], ["IVA (" + f.ivaPct + " %)", eur(iva)], ["Total", eur(total)]];
        var extraccion = st.lectura === 0 ? '<button class="btn btn-dark' + (paso() === 2 ? " pista" : "") + '" id="leer">Leer con IA</button>'
          : st.lectura === 1 ? '<div class="empty">Leyendo la factura…</div>'
          : campos.map(function (k, i) { return '<div class="kv' + (st.animar ? " anim" : "") + '" style="animation-delay:' + (i * 0.07) + 's"><span>' + esc(k[0]) + "</span><b>" + esc(k[1]) + "</b></div>"; }).join("") +
            (st.lectura === 2 ? '<button class="btn btn-primary pista" id="validar" style="margin-top:6px">Validar y enviar a contabilidad</button>' : '<span class="tag tag-ok" style="justify-self:start;margin-top:6px">Enviada a contabilidad</span>');
        cuerpo = '<p class="small muted" style="margin-bottom:12px">Factura recibida por email de un proveedor:</p><div class="invoice-grid"><div class="paper' + (st.lectura === 1 ? " is-scanning" : "") + '"><h4>' + esc(f.proveedor) + '</h4><span class="muted">NIF ' + esc(f.nif) + "</span><br><br><b>Factura " + esc(f.numero) + "</b><br>Fecha: " + fechaFactura + "<br>Cliente: " + esc(s.negocio) +
          '<div class="line"><span>' + esc(f.concepto) + "</span><span>" + eur(f.base) + '</span></div><div class="line"><span>IVA ' + f.ivaPct + " %</span><span>" + eur(iva) + '</span></div><div class="line"><b>Total</b><b>' + eur(total) + '</b></div></div><div class="extract">' + extraccion + "</div></div>";
      }
      return cabeceraApp("Panel del equipo · " + d.periodo) + tabs + '<div class="app-body">' + cuerpo + "</div>";
    };

    var pintar = function (root) {
      root.querySelector(".movil-pantalla").innerHTML = htmlMovil();
      root.querySelector(".ventana-app").innerHTML = htmlEquipo();
      root.querySelector(".guia-wrap").innerHTML = guia(PASOS, paso());
      st.animar = false;
    };

    return {
      html:
        cabecera("documentos", "Cada " + esc(s.cliente) + " ve qué le falta y lo sube desde el móvil. Tu equipo lo revisa con un clic y la IA lee las facturas por ti.") +
        '<div class="guia-wrap"></div><div class="escena">' +
          movil("Lo que ve tu " + s.cliente, "") +
          ventana("Lo que ve tu equipo", s.marca.web + "/equipo", "") +
        "</div>" +
        puntos(["Cada " + esc(s.cliente) + " tiene <strong>su lista de documentos</strong>.", "Los <strong>recordatorios salen solos</strong> hasta que está todo.", "Tu equipo <strong>acepta o pide otra vez</strong> cada documento.", "La IA <strong>lee las facturas</strong> y una persona valida antes de contabilizar."]) +
        paginador("documentos"),
      init: function (root) {
        pintar(root);
        root.addEventListener("click", function (e) {
          var b;
          if ((b = e.target.closest("[data-tab]"))) { st.tab = b.dataset.tab; pintar(root); return; }
          if ((b = e.target.closest("[data-subir]"))) {
            var doc = st.docs[+b.dataset.subir];
            doc.estado = "subiendo"; pintar(root);
            espera(900).then(function () {
              doc.estado = "revisar"; st.subido = true; st.tab = "revisar";
              if (vistaActual() === "documentos") pintar(root);
              toast("Documento recibido: tu equipo ya lo puede revisar");
            });
            return;
          }
          if ((b = e.target.closest("[data-aceptar]"))) { st.docs[+b.dataset.aceptar].estado = "aceptado"; st.aceptado = true; pintar(root); toast("Documento aceptado"); return; }
          if ((b = e.target.closest("[data-rechazar]"))) { st.docs[+b.dataset.rechazar].estado = "rechazado"; pintar(root); toast("Le hemos pedido que lo suba otra vez"); return; }
          if ((b = e.target.closest("[data-recordar]"))) { st.recordados[+b.dataset.recordar] = true; pintar(root); toast("Recordatorio enviado"); return; }
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
    var app =
      cabeceraApp("Oficina digital", '<span class="tag tag-claro">' + esc(s.equipo) + "</span>") +
      '<div class="app-body">' +
        '<h3 class="marca-fuente oficina-saludo">' + saludo + ", " + esc(s.equipo) + '</h3><p class="muted" style="margin-bottom:16px">' + esc(capital(fmtLargo.format(new Date()))) + "</p>" +
        '<div class="kpis">' + o.kpis.map(function (k) { return '<div class="kpi"><span>' + esc(k[0]) + "</span><b>" + esc(k[1]) + "</b><small>" + esc(k[2]) + "</small></div>"; }).join("") + "</div>" +
        '<div class="office-grid"><div class="stack">' +
          '<div class="box"><div class="box-head"><h4>Hoy te toca</h4><span class="tag tag-warn">' + o.hoy.length + " tareas</span></div>" +
            o.hoy.map(function (t, i) { return '<a class="todo' + (i === 0 ? " pista" : "") + '" href="#' + t[2] + '"><b>' + esc(t[0]) + "</b><span>" + esc(t[1]) + "</span><em>Ir →</em></a>"; }).join("") + "</div>" +
          '<div class="box"><div class="box-head"><h4>De dónde vienen tus contactos</h4><span class="tag">30 días</span></div><div class="bars">' +
            o.origen.map(function (x) { return '<div class="bar-row"><span>' + esc(x[0]) + '</span><div class="progress"><span style="width:' + (x[1] / maximo * 100) + '%"></span></div><b>' + x[1] + " %</b></div>"; }).join("") + "</div></div>" +
        '</div><div class="stack">' +
          '<div class="box"><div class="box-head"><h4>Actividad reciente</h4></div><ul class="feed">' + o.actividad.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ul></div>" +
          '<div class="box"><div class="box-head"><h4>Resumen que te llega cada mañana</h4><span class="tag">7:30</span></div>' +
            '<div class="email-preview"><header><b>Tu día en ' + esc(s.negocio) + "</b>De: Oficina de " + esc(s.negocio) + '</header><div class="body">Buenos días, ' + esc(s.equipo) + ". Hoy te toca:<ul>" + o.hoy.map(function (t) { return "<li>" + esc(t[0] + " " + t[1]) + "</li>"; }).join("") + "</ul></div></div></div>" +
        "</div></div></div>";
    return {
      html:
        cabecera("oficina", "Un panel hecho a tu medida con todo el negocio en un sitio: lo que toca hoy, tus contactos, tus documentos y tus números.") +
        guia(["Empieza por «Hoy te toca»", "Pulsa una tarea para ir directamente a esa parte", "Este mismo resumen te llega cada mañana por email"], null) +
        '<div class="escena escena-una">' + ventana("Lo que ve tu equipo", s.marca.web + "/oficina", app) + "</div>" +
        puntos(["<strong>Contactos, correos, documentos y gastos</strong> en el mismo sitio.", "Un <strong>resumen diario</strong> para empezar sabiendo qué toca.", "<strong>Acceso con código al email</strong>, datos en la UE y copia diaria.", "Hecha a tu medida: <strong>solo con lo que usas</strong>."]) +
        paginador("oficina")
    };
  };

  /* ===== CRM a tu medida ===== */
  var vistaCRM = function () {
    var s = S();
    var cr = s.crm;
    var st = mem("crm", function () {
      return {
        simulado: false, enviado: false, movido: false, idNuevo: null,
        contactos: cr.contactos.map(function (c, i) { return { id: i, nombre: c[0], necesidad: c[1], etapa: c[2], origen: c[3], siguiente: c[4], historial: ["Entró desde " + c[3]] }; })
      };
    });
    var PASOS = ["Simula un contacto que entra desde tu web", "Ábrelo y envíale el correo con plantilla", "Arrastra cualquier contacto a otra etapa"];
    var paso = function () { return !st.simulado ? 0 : !st.enviado ? 1 : !st.movido ? 2 : 3; };
    var SIGUIENTE = ["Responder hoy", "Seguimiento en 3 días", "Preparar la reunión", "Seguimiento de la propuesta", "Revisión trimestral"];

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
            var pista = paso() === 1 && c.id === st.idNuevo;
            return '<div class="card' + (c.recien ? " brilla" : "") + (pista ? " pista" : "") + '" draggable="true" data-id="' + c.id + '" tabindex="0" role="button" aria-label="Abrir ' + esc(c.nombre) + '"><b>' + esc(c.nombre) + '</b><span class="muted">' + esc(c.necesidad) + '</span><span class="next">' + esc(c.siguiente) + '</span><span class="tag">' + esc(c.origen) + "</span></div>";
          }).join("") + "</div>";
      }).join("");
    };
    var pintar = function (root) {
      root.querySelector(".kanban").innerHTML = htmlKanban();
      root.querySelector("#te-toca").textContent = pendientes();
      var btn = root.querySelector("#simular");
      btn.disabled = st.simulado;
      btn.classList.toggle("pista", paso() === 0);
      root.querySelector(".guia-wrap").innerHTML = guia(PASOS, paso());
      st.contactos.forEach(function (c) { c.recien = false; });
    };
    var mover = function (root, id, etapa) {
      var c = st.contactos[id];
      if (!c || c.etapa === etapa) return;
      c.etapa = etapa;
      c.historial.push("Pasa a «" + cr.etapas[etapa] + "»");
      c.siguiente = SIGUIENTE[etapa];
      st.movido = true;
      pintar(root);
    };
    var abrir = function (root, id) {
      var c = st.contactos[id];
      var back = document.createElement("div");
      back.className = "drawer-back";
      back.setAttribute("style", view.getAttribute("style") || "");
      var dibujar = function () {
        back.innerHTML = '<aside class="drawer" role="dialog" aria-modal="true" aria-label="Ficha de ' + esc(c.nombre) + '">' +
          '<div class="row between"><span class="tag">' + esc(cr.etapas[c.etapa]) + '</span><button class="btn btn-ghost btn-sm" data-cerrar>Cerrar</button></div>' +
          '<h2 class="marca-fuente">' + esc(c.nombre) + '</h2><p class="muted">' + esc(c.necesidad) + " · Origen: " + esc(c.origen) + "</p>" +
          '<section><h3>Próxima acción</h3><p class="siguiente">' + esc(c.siguiente) + "</p></section>" +
          '<section><h3>Correo con plantilla</h3><div class="mail">' + esc(plantilla(c)) + '</div><button class="btn btn-marca' + (!st.enviado ? " pista" : "") + '" data-enviar style="margin-top:10px">Enviar desde ' + esc(s.marca.web) + "</button></section>" +
          '<section><h3>Mover a otra etapa</h3><div class="row wrap">' + cr.etapas.map(function (et, i) {
            return '<button class="btn btn-sm ' + (i === c.etapa ? "btn-dark" : "btn-ghost") + '" data-etapa="' + i + '">' + esc(et) + "</button>";
          }).join("") + "</div></section>" +
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
          c.historial.push("Correo enviado desde " + s.marca.web);
          if (c.etapa === 0) { c.etapa = 1; c.historial.push("Pasa a «" + cr.etapas[1] + "»"); }
          c.siguiente = "Seguimiento en 3 días si no responde";
          st.enviado = true;
          dibujar();
          toast("Correo enviado y guardado en el historial");
        }
      });
      back.querySelector("[data-cerrar]").focus();
    };

    var app = cabeceraApp("CRM", '<span class="tag tag-claro">Te toca hoy: <b id="te-toca"></b></span>') +
      '<div class="app-toolbar"><span class="small muted">Arrastra las tarjetas entre columnas o pulsa una para abrir su ficha.</span><button class="btn btn-marca btn-sm" id="simular">Simular contacto desde la web</button></div>' +
      '<div class="app-body"><div class="kanban"></div></div>';

    return {
      html:
        cabecera("crm", "Tus contactos por etapas, con la próxima acción de cada uno. Los formularios de tu web entran solos y los correos quedan en el historial.") +
        '<div class="guia-wrap"></div><div class="escena escena-una">' + ventana("Lo que ve tu equipo", s.marca.web + "/crm", app) + "</div>" +
        puntos(["Los formularios de tu web <strong>entran solos</strong> y sin duplicados.", "Cada contacto tiene <strong>su próxima acción</strong>: no se olvida ninguno.", "Los correos salen <strong>con plantilla y desde tu dominio</strong>.", "Las etapas y los campos se diseñan <strong>a tu forma de vender</strong>."]) +
        paginador("crm"),
      init: function (root) {
        pintar(root);
        var kanban = root.querySelector(".kanban");
        kanban.addEventListener("click", function (e) { var card = e.target.closest(".card"); if (card) abrir(root, +card.dataset.id); });
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
        kanban.addEventListener("dragend", function () { kanban.querySelectorAll(".col").forEach(function (c) { c.classList.remove("is-over"); }); });
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
          if (st.simulado) return;
          st.simulado = true;
          st.idNuevo = st.contactos.length;
          st.contactos.push({ id: st.idNuevo, nombre: cr.nuevo[0], necesidad: cr.nuevo[1], etapa: 0, origen: cr.nuevo[2], siguiente: "Responder hoy", historial: ["Entró desde el formulario de " + s.marca.web], recien: true });
          pintar(root);
          toast("Nuevo contacto desde la web: " + cr.nuevo[0]);
        });
      }
    };
  };

  /* ===== Control de gastos ===== */
  var vistaGastos = function () {
    var s = S();
    var g = s.gastos;
    var st = mem("gastos", function () {
      return { paso: 0, exportado: false, gastos: g.lista.map(function (x) { return { comercio: x[0], categoria: x[1], total: x[2], ivaPct: x[3], fecha: sumarDias(x[4]), sinRecibo: !!x[5] }; }) };
    });
    var nuevo = Object.assign({ fecha: new Date() }, g.nuevo);
    var ivaDe = function (x) { return Math.round((x.total - x.total / (1 + x.ivaPct / 100)) * 100) / 100; };
    var PASOS = ["Haz una foto al recibo", "Guarda el gasto que ha leído la IA", "Exporta el mes para tu gestoría"];
    var guiaPaso = function () { return st.paso < 2 ? 0 : st.paso === 2 ? 1 : !st.exportado ? 2 : 3; };

    var htmlMovil = function () {
      var top = cabeceraApp("Gastos");
      if (st.paso === 0 || st.paso === 3) {
        return top + '<div class="app-body"><div class="camera">' + icono("camara", "cam-ico") + "<p>Haz una foto al recibo en el momento.<br><small>Así no se pierde ninguno.</small></p>" +
          '<button class="btn btn-marca' + (st.paso === 0 ? " pista" : "") + '" id="foto">Hacer foto del recibo</button>' + (st.paso === 3 ? '<p class="small cam-ok">✓ Gasto guardado</p>' : "") + "</div></div>";
      }
      var recibo = '<div class="receipt' + (st.paso === 1 ? " is-scanning" : "") + '"><div class="c"><b>' + esc(nuevo.comercio.toUpperCase()) + "</b><br>" + fmtCorto.format(nuevo.fecha) + "</div><hr>" +
        '<div class="l"><span>' + esc(nuevo.linea) + "</span><span>" + nuevo.total.toFixed(2).replace(".", ",") + '</span></div><hr><div class="l"><span>Base</span><span>' + (nuevo.total - ivaDe(nuevo)).toFixed(2).replace(".", ",") + '</span></div><div class="l"><span>IVA ' + nuevo.ivaPct + '%</span><span>' + ivaDe(nuevo).toFixed(2).replace(".", ",") + '</span></div><div class="l"><b>TOTAL</b><b>' + eur(nuevo.total) + '</b></div><hr><div class="c">Gracias por su visita</div></div>';
      if (st.paso === 1) return top + '<div class="app-body">' + recibo + '<p class="muted small" style="text-align:center;margin-top:10px">Leyendo el recibo…</p></div>';
      var campos = [["Comercio", nuevo.comercio], ["Fecha", fmtCorto.format(nuevo.fecha)], ["Total", eur(nuevo.total)], ["IVA", eur(ivaDe(nuevo))], ["Categoría", nuevo.categoria]];
      return top + '<div class="app-body"><p class="app-label">La IA ha leído:</p><div class="extract">' + campos.map(function (k, i) { return '<div class="kv anim" style="animation-delay:' + i * 0.07 + 's"><span>' + k[0] + "</span><b>" + esc(k[1]) + "</b></div>"; }).join("") +
        '<button class="btn btn-marca pista" id="guardar" style="margin-top:6px">Guardar gasto</button></div></div>';
    };
    var htmlEquipo = function () {
      var porCat = {};
      var total = 0;
      st.gastos.forEach(function (x) { porCat[x.categoria] = (porCat[x.categoria] || 0) + x.total; total += x.total; });
      var sinRecibo = st.gastos.filter(function (x) { return x.sinRecibo; }).length;
      return cabeceraApp("Gastos de " + fmtMes.format(new Date()), '<span class="tag tag-claro">' + eur(total) + "</span>") + '<div class="app-body">' +
        st.gastos.slice().reverse().map(function (x) {
          return '<div class="expense-row' + (x.nuevo ? " is-new anim" : "") + '"><span><b>' + esc(x.comercio) + '</b><br><small class="muted">' + esc(x.categoria) + " · " + fmtCorto.format(x.fecha) + "</small></span>" +
            (x.sinRecibo ? '<span class="tag tag-warn">Sin recibo</span>' : '<span class="tag tag-ok">Con recibo</span>') + "<b>" + eur(x.total) + "</b></div>";
        }).join("") +
        '<div class="cat-box">' + Object.keys(porCat).map(function (k) { return '<div class="cat-sum"><span>' + esc(k) + "</span><b>" + eur(porCat[k]) + "</b></div>"; }).join("") + "</div>" +
        (sinRecibo ? '<p class="alert">' + sinRecibo + " gasto sin recibo: te lo recordamos antes de cerrar el mes.</p>" : "") +
        '<button class="btn btn-dark' + (guiaPaso() === 2 ? " pista" : "") + '" id="exportar" style="margin-top:14px;width:100%">Exportar para la gestoría (CSV)</button></div>';
    };
    var pintar = function (root) {
      root.querySelector(".movil-pantalla").innerHTML = htmlMovil();
      root.querySelector(".ventana-app").innerHTML = htmlEquipo();
      root.querySelector(".guia-wrap").innerHTML = guia(PASOS, guiaPaso());
      st.gastos.forEach(function (x) { x.nuevo = false; });
    };

    return {
      html:
        cabecera("gastos", "Una foto al recibo y el gasto queda apuntado con su categoría. A final de mes, un clic y tu gestoría lo tiene todo.") +
        '<div class="guia-wrap"></div><div class="escena">' +
          movil("Desde tu móvil", "") + ventana("Desde tu ordenador", s.marca.web + "/gastos", "") +
        "</div>" +
        puntos(["Haces <strong>una foto al recibo</strong> en el momento.", "La IA <strong>lee comercio, fecha, total e IVA</strong> y propone la categoría.", "Ves <strong>cuánto llevas gastado</strong> y qué gastos no tienen recibo.", "Solo gastos: las facturas se emiten con un <strong>programa homologado para Verifactu</strong>."]) +
        paginador("gastos"),
      init: function (root) {
        pintar(root);
        root.addEventListener("click", function (e) {
          if (e.target.closest("#foto")) {
            st.paso = 1; pintar(root);
            espera(1600).then(function () { st.paso = 2; if (vistaActual() === "gastos") pintar(root); });
          } else if (e.target.closest("#guardar")) {
            st.gastos.push(Object.assign({ nuevo: true }, nuevo));
            st.paso = 3; pintar(root); toast("Gasto guardado con su recibo");
          } else if (e.target.closest("#exportar")) {
            var filas = [["Fecha", "Comercio", "Categoría", "Base", "IVA", "Total", "Recibo"]];
            st.gastos.forEach(function (x) {
              var iva = ivaDe(x);
              filas.push([fmtCorto.format(x.fecha), x.comercio, x.categoria, (x.total - iva).toFixed(2).replace(".", ","), iva.toFixed(2).replace(".", ","), x.total.toFixed(2).replace(".", ","), x.sinRecibo ? "No" : "Sí"]);
            });
            var csv = "﻿" + filas.map(function (fl) { return fl.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(";"); }).join("\r\n");
            var a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
            a.download = "gastos-" + estado.sector + ".csv";
            document.body.appendChild(a); a.click(); a.remove();
            st.exportado = true; pintar(root);
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
    var st = mem("email", function () { return { apuntado: false, nombre: "", abierto: null, abiertos: {} }; });
    var PASOS = ["Descarga la guía desde la web", "Abre el correo que llega al momento", "Mira los siguientes: salen solos"];
    var paso = function () {
      if (!st.apuntado) return 0;
      if (!st.abiertos[0]) return 1;
      return Object.keys(st.abiertos).length < 2 ? 2 : 3;
    };
    var fechaEnvio = function (i) { return sumarDias(parseInt(em.serie[i][0].replace(/\D/g, ""), 10)); };

    var htmlWeb = function () {
      return '<div class="landing"><div class="landing-nav">' + logoMarca(28) + '<b class="marca-fuente">' + esc(s.negocio) + "</b><span>Servicios</span><span>Contacto</span></div>" +
        '<div class="landing-body"><div class="cover"><span class="marca-fuente">' + esc(em.recurso) + '</span><small>' + esc(s.negocio) + '</small></div><div><p class="landing-kicker">Guía gratuita</p><h3 class="marca-fuente">' + esc(em.recurso) + "</h3><p>Preparada por el equipo de " + esc(s.negocio) + ". Te la enviamos por email.</p>" +
        (st.apuntado ? '<p class="landing-ok">✓ ¡Listo! Revisa tu correo.</p>'
          : '<form id="landing-form"><input type="text" aria-label="Tu nombre" value="Laura" required><input type="email" aria-label="Tu email" value="laura@ejemplo.com" required><button class="btn btn-marca pista" type="submit">Quiero la guía</button><small>Acepto recibir la guía y novedades. Puedo darme de baja cuando quiera.</small></form>') +
        "</div></div></div>";
    };
    var htmlMovil = function () {
      if (!st.apuntado) return '<div class="mail-top"><b>Correo</b></div><div class="empty">Aquí verás los correos que recibe la persona que descarga la guía.</div>';
      if (st.abierto != null) {
        var e = em.serie[st.abierto];
        var boton = st.abierto === em.serie.length - 1 ? "Reservar una llamada" : st.abierto === 0 ? "Descargar la guía" : "Leer más";
        return '<div class="mail-top"><button class="wa-back" id="cerrar-correo" aria-label="Volver">' + icono("atras") + "</button><b>Correo</b></div>" +
          '<div class="mail-detalle"><h4>' + esc(e[1]) + '</h4><div class="mail-de">' + logoMarca(28) + "<span><b>" + esc(s.equipo) + " · " + esc(s.negocio) + "</b><br><small>para " + esc(st.nombre) + "</small></span></div>" +
          '<div class="mail-cuerpo"><div class="mail-banda">' + logoMarca(24) + '<b class="marca-fuente">' + esc(s.negocio) + "</b></div><p>Hola, " + esc(st.nombre) + ":</p><p>" + esc(e[2]) + '</p><span class="btn btn-marca btn-sm">' + boton + '</span><p class="baja">Recibes este correo porque descargaste una guía de ' + esc(s.negocio) + ". Darte de baja: un clic.</p></div></div>";
      }
      return '<div class="mail-top"><b>Recibidos</b></div><div class="mail-list">' +
        em.serie.map(function (e, i) {
          var enviado = i === 0;
          var pista = (paso() === 1 && i === 0) || (paso() === 2 && i === 1);
          return '<button class="mail-item' + (enviado ? "" : " is-programado") + (pista ? " pista" : "") + '" data-correo="' + i + '">' + logoMarca(34) + '<span class="mail-txt"><b>' + esc(s.negocio) + "</b><span>" + esc(e[1]) + "</span></span><small>" + (enviado ? "Ahora" : "Programado<br>" + esc(fmtDiaMes.format(fechaEnvio(i)))) + "</small></button>";
        }).join("") + "</div>";
    };
    var pintar = function (root) {
      root.querySelector(".ventana-app").innerHTML = htmlWeb();
      root.querySelector(".movil-pantalla").innerHTML = htmlMovil();
      root.querySelector(".guia-wrap").innerHTML = guia(PASOS, paso());
      root.querySelector("#crm-nota").innerHTML = st.apuntado
        ? '<span class="tag tag-ok">Nuevo contacto en tu CRM</span> ' + esc(st.nombre) + " · origen: " + esc(em.recurso) + " · consentimiento guardado"
        : '<span class="muted">Cuando alguien descargue la guía, entrará en tu CRM como contacto nuevo.</span>';
    };

    return {
      html:
        cabecera("email", "Una guía útil para tu cliente ideal atrae contactos a cambio de su email, y una serie de correos los acompaña hasta que te piden una reunión.") +
        '<div class="guia-wrap"></div><div class="escena escena-inversa">' +
          ventana("Tu web", s.marca.web + "/guia", "") +
          movil("El correo de quien la descarga", "") +
        "</div>" +
        '<div class="aviso-crm" id="crm-nota"></div>' +
        '<div class="metricas"><p class="puntos-tit">Lo que ves tú: última newsletter</p><div class="metrics">' + [["1.240", "enviados"], ["51 %", "aperturas"], ["9,8 %", "clics"], ["0,4 %", "bajas"]].map(function (m) { return '<div class="metric"><b>' + m[0] + "</b><span>" + m[1] + "</span></div>"; }).join("") + "</div></div>" +
        puntos(["La guía <strong>atrae a tu cliente ideal</strong> a cambio de su email.", "El contacto <strong>entra solo en tu CRM</strong>, con su consentimiento guardado.", "Recibe <strong>correos útiles</strong> que acaban invitándole a hablar contigo.", "<strong>Bajas y rebotes</strong> se gestionan solos, como pide el RGPD."]) +
        paginador("email"),
      init: function (root) {
        pintar(root);
        root.addEventListener("submit", function (e) {
          if (e.target.id !== "landing-form") return;
          e.preventDefault();
          st.nombre = e.target.querySelector("input").value.trim() || "Laura";
          st.apuntado = true;
          pintar(root);
          toast("Guía enviada y serie de correos activada");
        });
        root.addEventListener("click", function (e) {
          var b = e.target.closest("[data-correo]");
          if (b) { st.abierto = +b.dataset.correo; st.abiertos[st.abierto] = true; pintar(root); return; }
          if (e.target.closest("#cerrar-correo")) { st.abierto = null; pintar(root); }
        });
      }
    };
  };

  /* ===== Reseñas ===== */
  var vistaResenas = function () {
    var s = S();
    var r = s.resenas;
    var st = mem("resenas", function () { return { fase: 0, pos: false, neg: false, animar: null }; });
    // fase: 0 inicio · 1 mensaje enviado · 2 escribiendo la reseña · 3 reseña publicada · 4 negativa recibida
    var PASOS = ["Marca la cita como terminada en el panel", "Deja la reseña desde el móvil del " + s.cliente, "Revisa y publica la respuesta", "Prueba con una reseña negativa"];
    var paso = function () {
      if (st.fase === 0) return 0;
      if (st.fase < 3) return 1;
      if (!st.pos) return 2;
      if (st.fase < 4) return 3;
      return st.neg ? 4 : 3;
    };
    var nombreCli = primerNombre(r.positiva[0]);

    var htmlMovil = function () {
      if (st.fase === 0) return '<div class="mail-top"><b>Mensajes</b></div><div class="empty">Cuando termine la cita, aquí llegará el mensaje que pide la opinión.</div>';
      if (st.fase === 2) {
        return '<div class="mail-top"><b>Escribe una reseña en Google</b></div><div class="app-body"><div class="row" style="gap:10px;margin-bottom:12px">' + logoMarca(36) + "<b>" + esc(s.negocio) + "</b></div>" +
          '<div class="stars stars-big">★★★★★</div><div class="review-input">' + esc(r.positiva[2]) + '</div><button class="btn btn-marca pista" id="publicar-resena" style="margin-top:12px;width:100%">Publicar</button></div>';
      }
      return '<div class="wa-head">' + logoMarca(30) + "<div><b>" + esc(s.negocio) + '</b><small>Cuenta de empresa</small></div></div><div class="wa"><div class="wa-bubble">Hola, ' + esc(nombreCli) + ". Gracias por confiar en " + esc(s.negocio) + ". ¿Nos dejas tu opinión? Nos ayuda mucho." +
        (st.fase === 1 ? '<button class="btn btn-marca btn-sm pista" id="opinar" style="margin-top:8px;width:100%">Dejar mi opinión</button>' : '<br><small class="muted">✓ Opinión enviada. ¡Gracias!</small>') + '<span class="wa-meta">' + horaAhora() + "</span></div></div>";
    };
    var htmlEquipo = function () {
      var html = cabeceraApp("Reseñas", '<span class="tag tag-claro">4,8 ★ · 126 reseñas</span>') + '<div class="app-body">';
      html += st.fase === 0
        ? '<div class="cita-fin"><div><b>' + esc(r.positiva[0]) + '</b><br><small class="muted">Cita de hoy · 10:00</small></div><button class="btn btn-dark btn-sm pista" id="terminar">Marcar como terminada</button></div>'
        : '<p class="nota-eq">' + icono("reloj") + "Mensaje de reseña enviado a " + esc(nombreCli) + " al terminar la cita.</p>";
      if (st.fase >= 3) {
        html += '<div class="review' + (st.animar === "pos" ? " anim" : "") + '"><div class="row between"><b>' + esc(r.positiva[0]) + "</b>" + estrellas(r.positiva[1]) + "</div><p>" + esc(r.positiva[2]) + "</p>" +
          '<div class="draft"><span class="draft-tit">Respuesta propuesta por la IA</span>' + esc(r.respuestaPositiva) + "</div>" +
          (st.pos ? '<span class="tag tag-ok">Respuesta publicada</span>' : '<button class="btn btn-primary btn-sm pista" id="pub-pos">Publicar respuesta</button>') + "</div>";
      }
      if (st.fase === 3 && st.pos) html += '<button class="btn btn-ghost pista" id="negativa" style="margin-top:12px">Simular una reseña negativa</button>';
      if (st.fase >= 4) {
        html += '<p class="alert" style="margin-top:12px">Aviso: nueva reseña de ' + r.negativa[1] + " estrellas. Te la hemos enviado por email para responder hoy.</p>" +
          '<div class="review' + (st.animar === "neg" ? " anim" : "") + '"><div class="row between"><b>' + esc(r.negativa[0]) + "</b>" + estrellas(r.negativa[1]) + "</div><p>" + esc(r.negativa[2]) + "</p>" +
          '<div class="draft"><span class="draft-tit">Respuesta propuesta por la IA</span>' + esc(r.respuestaNegativa) + "</div>" +
          (st.neg ? '<span class="tag tag-ok">Respuesta publicada</span>' : '<button class="btn btn-primary btn-sm pista" id="pub-neg">Revisar y publicar</button>') + "</div>";
      }
      return html + "</div>";
    };
    var pintar = function (root) {
      root.querySelector(".movil-pantalla").innerHTML = htmlMovil();
      root.querySelector(".ventana-app").innerHTML = htmlEquipo();
      root.querySelector(".guia-wrap").innerHTML = guia(PASOS, paso());
      st.animar = null;
    };

    return {
      html:
        cabecera("resenas", "Pedimos la reseña justo cuando tu " + esc(s.cliente) + " está contento, te avisamos de las negativas y te dejamos la respuesta preparada.") +
        '<div class="guia-wrap"></div><div class="escena">' +
          movil("Lo que ve tu " + s.cliente, "") + ventana("Lo que ve tu equipo", s.marca.web + "/resenas", "") +
        "</div>" +
        puntos(["Al terminar el servicio sale <strong>un mensaje pidiendo su opinión</strong>.", "Cada reseña llega con <strong>una respuesta propuesta</strong> en tu tono.", "Las negativas te llegan <strong>con aviso</strong> para responder rápido.", "<strong>Nada se publica</strong> sin que lo revises."]) +
        paginador("resenas"),
      init: function (root) {
        pintar(root);
        root.addEventListener("click", function (e) {
          if (e.target.closest("#terminar")) { st.fase = 1; pintar(root); toast("Mensaje enviado al " + s.cliente); }
          else if (e.target.closest("#opinar")) { st.fase = 2; pintar(root); }
          else if (e.target.closest("#publicar-resena")) { st.fase = 3; st.animar = "pos"; pintar(root); toast("Nueva reseña de 5 estrellas"); }
          else if (e.target.closest("#pub-pos")) { st.pos = true; pintar(root); toast("Respuesta publicada en Google"); }
          else if (e.target.closest("#negativa")) { st.fase = 4; st.animar = "neg"; pintar(root); }
          else if (e.target.closest("#pub-neg")) { st.neg = true; pintar(root); toast("Respuesta publicada en Google"); }
        });
      }
    };
  };

  /* ===== Agentes ===== */
  var vistaAgentes = function () {
    var s = S();
    var st = mem("agentes", function () { return { activo: null, hechos: 0, corriendo: false, aprobado: false }; });
    var PASOS = ["Elige qué pasa en tu negocio", "Mira al agente trabajar paso a paso", "Revisa y aprueba el resultado"];
    var paso = function () { return st.activo == null ? 0 : st.corriendo ? 1 : !st.aprobado ? 2 : 3; };

    var htmlApp = function () {
      var run;
      if (st.activo == null) run = '<div class="empty">Elige qué pasa y verás al agente trabajar.</div>';
      else {
        var a = s.agentes[st.activo];
        run = '<div class="run">' + a[1].map(function (p, i) {
          var cls = i < st.hechos ? "is-done" : i === st.hechos && st.corriendo ? "is-doing" : "";
          return '<div class="run-step ' + cls + '"><span class="dot">' + (i < st.hechos ? "✓" : "") + "</span>" + esc(p) + "</div>";
        }).join("") + "</div>" +
          (!st.corriendo && st.hechos === a[1].length
            ? '<div class="draft" style="margin-top:10px"><span class="draft-tit">Listo para tu revisión</span>El agente ha terminado y te deja el resultado preparado. No se envía nada delicado sin tu visto bueno.' +
              (st.aprobado ? '<br><span class="tag tag-ok" style="margin-top:8px">Aprobado</span>' : '<br><button class="btn btn-primary btn-sm pista" id="aprobar" style="margin-top:8px">Revisar y aprobar</button>') + "</div>"
            : "");
      }
      return cabeceraApp("Agentes de IA") + '<div class="app-body agentes-grid"><div><p class="app-label">Cuando pasa esto…</p><div class="triggers">' +
        s.agentes.map(function (a, i) {
          return '<button class="trigger' + (st.activo === i ? " is-active" : "") + (st.activo == null && i === 0 ? " pista" : "") + '" data-trigger="' + i + '"' + (st.corriendo ? " disabled" : "") + "><span>" + esc(a[0]) + "</span>" + icono("agentes") + "</button>";
        }).join("") + '</div></div><div><p class="app-label">…el agente hace esto</p>' + run + "</div></div>";
    };
    var pintar = function (root) {
      root.querySelector(".ventana-app").innerHTML = htmlApp();
      root.querySelector(".guia-wrap").innerHTML = guia(PASOS, paso());
    };
    var ejecutar = function (root, i) {
      st.activo = i; st.hechos = 0; st.corriendo = true; st.aprobado = false;
      pintar(root);
      var total = s.agentes[i][1].length;
      var avanzar = function () {
        if (vistaActual() !== "agentes" || st.activo !== i) { st.corriendo = false; return; }
        st.hechos++;
        if (st.hechos >= total) st.corriendo = false;
        pintar(root);
        if (st.corriendo) setTimeout(avanzar, 850);
      };
      setTimeout(avanzar, 850);
    };

    return {
      html:
        cabecera("agentes", "Un agente no solo redacta: da varios pasos seguidos, como lo haría una persona del equipo, y te avisa cuando necesita tu revisión.") +
        '<div class="guia-wrap"></div><div class="escena escena-una">' + ventana("Lo que ve tu equipo", s.marca.web + "/agentes", "") + "</div>" +
        puntos(["Algo <strong>dispara el agente</strong>: un correo, un contacto nuevo o una hora del día.", "El agente <strong>encadena los pasos</strong> con tus herramientas.", "Lo importante <strong>queda para tu revisión</strong>.", "Empezamos por flujos sencillos y <strong>los ampliamos cuando funcionan</strong>."]) +
        paginador("agentes"),
      init: function (root) {
        pintar(root);
        root.addEventListener("click", function (e) {
          var b = e.target.closest("[data-trigger]");
          if (b && !st.corriendo) { ejecutar(root, +b.dataset.trigger); return; }
          if (e.target.closest("#aprobar")) { st.aprobado = true; pintar(root); toast("Aprobado: el agente continúa"); }
        });
      }
    };
  };

  var VISTAS = {
    inicio: vistaInicio, consultas: vistaConsultas, citas: vistaCitas, documentos: vistaDocumentos,
    oficina: vistaOficina, crm: vistaCRM, gastos: vistaGastos, email: vistaEmail, resenas: vistaResenas, agentes: vistaAgentes
  };

  /* ---------- Navegación ---------- */
  var nav = document.getElementById("nav");
  var view = document.getElementById("view");
  var menuBtn = document.querySelector(".menu-btn");
  var selector = document.getElementById("sector");

  var aplicarMarca = function () {
    var m = S().marca;
    view.setAttribute("style", "--m1:" + m.m1 + ";--m1t:" + m.m1t + ";--m2:" + m.m2 + ";--m2t:" + m.m2t + ";--msuave:" + m.suave + ";--mtinta:" + m.tinta + ";--mfuente:" + m.fuente + ";--mradio:" + m.radio);
  };

  var pintarNav = function () {
    nav.innerHTML = MODULOS.map(function (m) {
      if (m.grupo) return '<p class="nav-group">' + esc(m.grupo) + "</p>";
      return '<a href="#' + m.id + '"' + (m.id === estado.vista ? ' aria-current="page"' : "") + '><span class="ico">' + icono(m.id) + "</span>" + esc(m.titulo) + "</a>";
    }).join("") + '<p class="nav-note">Demo con datos ficticios. Todo ocurre en tu navegador: no se guarda ni se envía nada.</p>';
  };

  // Cada vista se pinta en un contenedor nuevo, así sus eventos no se acumulan.
  var render = function () {
    var id = (location.hash || "#inicio").slice(1);
    if (!VISTAS[id]) id = "inicio";
    var cambiaVista = id !== estado.vista;
    estado.vista = id;
    aplicarMarca();
    pintarNav();
    var v = VISTAS[id]();
    var cont = document.createElement("div");
    cont.className = "entra";
    cont.innerHTML = v.html;
    view.replaceChildren(cont);
    if (v.init) v.init(cont);
    document.title = (id !== "inicio" ? porId[id].titulo + " · " : "") + "Demo · Fluivia";
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    if (cambiaVista) window.scrollTo(0, 0);
    view.focus({ preventScroll: true });
  };

  var cambiarSector = function (clave) {
    if (!SECTORES[clave]) return;
    estado.sector = clave;
    selector.value = clave;
    memoria = {};
    var url = new URL(location.href);
    url.searchParams.set("s", clave);
    history.replaceState(null, "", url.pathname + url.search + location.hash);
    render();
    toast("Ahora ves el ejemplo de " + SECTORES[clave].negocio);
  };

  selector.innerHTML = CLAVES.map(function (k) { return '<option value="' + k + '">' + esc(SECTORES[k].etiqueta) + "</option>"; }).join("");
  var params = new URLSearchParams(location.search);
  if (SECTORES[params.get("s")]) estado.sector = params.get("s");
  selector.value = estado.sector;
  selector.addEventListener("change", function () { cambiarSector(selector.value); });

  view.addEventListener("click", function (e) {
    var b = e.target.closest("[data-reiniciar]");
    if (!b) return;
    delete memoria[b.dataset.reiniciar];
    render();
  });

  menuBtn.addEventListener("click", function () {
    var abierto = menuBtn.getAttribute("aria-expanded") !== "true";
    menuBtn.setAttribute("aria-expanded", String(abierto));
    nav.classList.toggle("is-open", abierto);
  });

  window.addEventListener("hashchange", render);
  estado.vista = null;
  render();
})();
