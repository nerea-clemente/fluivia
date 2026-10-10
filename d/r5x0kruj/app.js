/* Fluivia · Demo para clientes
   Motor de la demo. Cada negocio de ejemplo trae sus propios casos (carpeta sectores/).
   Un caso es una historia en pasos: quién hace qué y qué se ve en cada pantalla. */
(function () {
  "use strict";

  var SECTORES = window.DEMO_SECTORES || [];
  var S = null;          // sector activo
  var estado = {};       // paso actual de cada caso
  var enFinal = false;   // mientras se pinta un caso terminado, los botones no avanzan

  /* ---------- Utilidades ---------- */
  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var ICONOS = {
    rayo: "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
    persona: "M20 21a8 8 0 0 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    equipo: "M16 21a6 6 0 0 0-12 0M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21a6 6 0 0 0-5-5.9M15.5 3.2a4 4 0 0 1 0 7.6",
    check: "M5 12.5 10 17 19 7",
    flecha: "M5 12h14M13 6l6 6-6 6",
    atras: "M19 12H5M11 6l-6 6 6 6",
    reloj: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
    doc: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6",
    camara: "M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    chat: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z",
    calendario: "M4 6h16v15H4zM4 10h16M8 3v4M16 3v4",
    alerta: "M12 9v4M12 17h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
    descarga: "M12 4v11M7 10l5 5 5-5M5 20h14",
    subir: "M12 20V9M7 14l5-5 5 5M5 4h14",
    estrella: "M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z",
    enviar: "M4 12 20 4l-6 16-3-7z",
    clip: "M20 11.5 12 19.5a5 5 0 0 1-7-7l8.5-8.5a3.5 3.5 0 0 1 5 5L10 17.5a2 2 0 0 1-3-3L14.5 7",
    mic: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3",
    lupa: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
    grafico: "M5 20V11M12 20V5M19 20v-9",
    repetir: "M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5",
    casa: "M4 11 12 4l8 7M6 9.5V20h12V9.5",
    ubicacion: "M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
    correo: "M3 6h18v12H3zM3 7l9 6 9-6",
    telefono: "M6 3h3l2 5-2 1.5a12 12 0 0 0 5.5 5.5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z",
    lista: "M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01",
    play: "M8 5v14l11-7z",
    escudo: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z",
    lapiz: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
    cerrar: "M6 6l12 12M18 6 6 18"
  };
  function icono(n, clase) {
    return '<svg class="icon' + (clase ? " " + clase : "") + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + (ICONOS[n] || "") + '"/></svg>';
  }
  function logo(tam) {
    return '<span class="marca-logo" style="width:' + tam + "px;height:" + tam + 'px">' + S.marca.logo + "</span>";
  }

  /* ---------- Piezas de interfaz que usan los casos ---------- */
  var QUIEN = {
    auto: { icono: "rayo", texto: "Automático" },
    cliente: { icono: "persona", texto: "Cliente" },
    equipo: { icono: "equipo", texto: "Tu equipo" }
  };

  var UI = {
    esc: esc,
    icono: icono,
    logo: logo,

    // Botón que hace avanzar la historia (brilla mientras toca pulsarlo)
    btn: function (texto, avanza, variante) {
      var cl = "ui-btn" + (variante ? " ui-btn-" + variante : "");
      if (avanza && !enFinal) return '<button type="button" class="' + cl + ' pista" data-avanzar>' + texto + "</button>";
      return '<span class="' + cl + '">' + texto + "</span>";
    },
    chip: function (texto, tono) { return '<span class="chip chip-' + (tono || "info") + '">' + texto + "</span>"; },

    // Móvil: lo que ve el cliente (o alguien del equipo fuera de la oficina)
    movil: function (o) {
      var cab;
      if (o.app === "wa") {
        cab = '<div class="m-cab m-cab-wa">' + logo(30) + "<div><strong>" + esc(o.de || S.negocio) + "</strong><span>" + esc(o.sub || "en línea") + "</span></div></div>";
      } else if (o.app === "mail") {
        cab = '<div class="m-cab m-cab-mail">' + icono("correo") + "<strong>Correo</strong></div>";
      } else {
        cab = '<div class="m-cab m-cab-marca">' + logo(28) + '<div><strong class="marca-fuente">' + esc(S.negocio) + "</strong><span>" + esc(o.titulo || "") + "</span></div></div>";
      }
      return '<figure class="disp disp-movil">' +
        "<figcaption>" + icono(o.equipo ? "equipo" : "persona") + esc(o.quien) + "</figcaption>" +
        '<div class="movil"><div class="movil-pantalla">' +
          '<div class="movil-estado"><span>' + esc(o.hora || "9:41") + '</span><span class="movil-isla"></span><span class="movil-bat"></span></div>' +
          cab +
          '<div class="m-cuerpo' + (o.app === "wa" ? " m-wa" : "") + '">' + o.cuerpo + "</div>" +
        "</div></div></figure>";
    },

    // Ventana de escritorio: el panel que usa el equipo del negocio
    ventana: function (o) {
      var menu = (S.panel || []).map(function (m) {
        return '<li class="' + (m === o.seccion ? "is-activo" : "") + '">' + esc(m) + "</li>";
      }).join("");
      return '<figure class="disp disp-ventana">' +
        "<figcaption>" + icono("equipo") + esc(o.quien) + "</figcaption>" +
        '<div class="ventana">' +
          '<div class="v-barra"><i></i><i></i><i></i><span>Panel de ' + esc(S.negocio) + "</span></div>" +
          '<div class="v-app">' +
            '<aside class="v-menu"><div class="v-menu-logo">' + logo(26) + "</div><ul>" + menu + "</ul></aside>" +
            '<div class="v-cont"><h4 class="v-tit marca-fuente">' + esc(o.seccion) + "</h4>" + o.cuerpo + "</div>" +
          "</div>" +
        "</div></figure>";
    },

    // Chat
    ellos: function (html, hora, clase) { return '<div class="bur bur-ellos' + (clase || "") + '">' + html + '<span class="bur-hora">' + esc(hora || "") + "</span></div>"; },
    yo: function (html, hora, clase) { return '<div class="bur bur-yo' + (clase || "") + '">' + html + '<span class="bur-hora">' + esc(hora || "") + "</span></div>"; },
    fecha: function (t) { return '<div class="chat-fecha">' + esc(t) + "</div>"; },
    respuestas: function (lista, avanza, elegida) {
      return '<div class="respuestas">' + lista.map(function (r, i) {
        if (elegida != null) return '<span class="resp' + (i === elegida ? " is-elegida" : " is-apagada") + '">' + esc(r) + "</span>";
        if (i === avanza && !enFinal) return '<button type="button" class="resp pista" data-avanzar>' + esc(r) + "</button>";
        return '<span class="resp">' + esc(r) + "</span>";
      }).join("") + "</div>";
    },

    // Datos
    campos: function (lista) {
      return '<div class="campos">' + lista.map(function (c) {
        return '<div class="campo' + (c[2] ? " " + c[2] : "") + '"><span>' + esc(c[0]) + '</span><div class="campo-valor">' + c[1] + "</div></div>";
      }).join("") + "</div>";
    },
    ficha: function (lista) {
      return '<dl class="ficha">' + lista.map(function (f) { return "<div><dt>" + esc(f[0]) + "</dt><dd>" + f[1] + "</dd></div>"; }).join("") + "</dl>";
    },
    check: function (lista) {
      var ic = { ok: "check", pend: "reloj", falta: "cerrar", alerta: "alerta" };
      return '<ul class="checks">' + lista.map(function (c) {
        return '<li class="ck ck-' + c[1] + (c[3] || "") + '"><span class="ck-ic">' + icono(ic[c[1]]) + "</span><div><strong>" + c[0] + "</strong>" + (c[2] ? "<small>" + c[2] + "</small>" : "") + "</div></li>";
      }).join("") + "</ul>";
    },
    tabla: function (cab, filas, clases) {
      return '<div class="tabla-env"><table class="tabla"><thead><tr>' + cab.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        filas.map(function (f, i) { return '<tr class="' + ((clases && clases[i]) || "") + '">' + f.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") +
        "</tbody></table></div>";
    },
    kpis: function (lista) {
      return '<div class="kpis">' + lista.map(function (k) {
        return '<div class="kpi' + (k[2] ? " kpi-" + k[2] : "") + '"><strong>' + k[0] + "</strong><span>" + esc(k[1]) + "</span></div>";
      }).join("") + "</div>";
    },
    barra: function (v, total, texto) {
      var pc = Math.round(v / total * 100);
      return '<div class="barra"><div class="barra-txt"><span>' + esc(texto) + "</span><strong>" + v + " de " + total + '</strong></div><div class="barra-fondo"><i style="width:' + pc + '%"></i></div></div>';
    },
    caja: function (titulo, cuerpo, clase) {
      return '<section class="caja' + (clase || "") + '">' + (titulo ? "<h5>" + titulo + "</h5>" : "") + cuerpo + "</section>";
    },
    nota: function (html, clase) { return '<p class="nota' + (clase || "") + '">' + icono("escudo") + "<span>" + html + "</span></p>"; },
    aviso: function (titulo, texto, clase) {
      return '<div class="aviso' + (clase || "") + '">' + logo(22) + "<div><strong>" + esc(titulo) + "</strong><span>" + texto + "</span></div></div>";
    },
    mail: function (o) {
      return '<article class="mail' + (o.clase || "") + '"><header>' + (o.sinLogo ? '<span class="mail-ini">' + esc((o.de || "?").charAt(0)) + "</span>" : logo(30)) + "<div><strong>" + esc(o.de || S.negocio) + "</strong><span>" + esc(o.asunto) + "</span></div></header>" +
        '<div class="mail-cuerpo">' + o.cuerpo + "</div></article>";
    },
    agenda: function (filas) {
      return '<ul class="agenda">' + filas.map(function (f) {
        return '<li class="ag' + (f[2] ? " ag-" + f[2] : "") + (f[3] || "") + '"><span class="ag-hora">' + esc(f[0]) + '</span><div class="ag-txt">' + f[1] + "</div></li>";
      }).join("") + "</ul>";
    },
    kanban: function (cols) {
      return '<div class="kanban">' + cols.map(function (c) {
        return '<div class="kb-col"><h6>' + esc(c[0]) + " <span>" + c[1].length + "</span></h6>" + c[1].map(function (t) {
          return '<div class="kb-tarjeta' + (t[2] || "") + '"><strong>' + esc(t[0]) + "</strong><small>" + t[1] + "</small></div>";
        }).join("") + "</div>";
      }).join("") + "</div>";
    },
    escala: function (max, elegido, etiqueta) {
      var h = '<div class="escala"><span class="escala-txt">' + esc(etiqueta) + '</span><div class="escala-num">';
      for (var i = 0; i <= max; i++) h += '<span class="' + (i === elegido ? "is-elegido" : "") + '">' + i + "</span>";
      return h + "</div></div>";
    },
    estrellas: function (n) {
      var h = '<span class="estrellas" aria-label="' + n + ' de 5">';
      for (var i = 1; i <= 5; i++) h += '<span class="' + (i <= n ? "is-llena" : "") + '">' + icono("estrella") + "</span>";
      return h + "</span>";
    },
    // Una "foto" hecha con dos colores (inmuebles, vídeos de ejercicios)
    foto: function (tono, contenido, clase) {
      return '<div class="foto' + (clase || "") + '" style="background:linear-gradient(135deg,' + tono[0] + "," + tono[1] + ')">' + (contenido || "") + "</div>";
    },
    opc: function (lista, sel) {
      return '<div class="opc">' + lista.map(function (o, i) {
        var activo = Array.isArray(sel) ? sel.indexOf(i) > -1 : i === sel;
        return '<span class="' + (activo ? "is-sel" : "") + '">' + esc(o) + "</span>";
      }).join("") + "</div>";
    },
    inmueble: function (i, clase) {
      return '<div class="inmueble' + (clase || "") + '">' + UI.foto(i.tono, "<span>" + esc(i.zona) + "</span>") +
        '<div class="inmueble-txt"><strong>' + esc(i.titulo) + "</strong><small>" + i.m2 + " m² · " + i.hab + " hab. · " + i.banos + " baños</small></div></div>";
    },
    video: function (titulo, detalle, tono, extra) {
      return '<div class="video">' + UI.foto(tono, "", " foto-video foto-peq") + "<div><strong>" + esc(titulo) + "</strong><small>" + esc(detalle) + "</small>" + (extra || "") + "</div></div>";
    },
    recibo: function (o) {
      return '<div class="recibo' + (o.clase || "") + '"><strong>' + esc(o.comercio) + "</strong><small>" + esc(o.dato) + '</small><div class="recibo-lineas">' +
        o.lineas.map(function (l) { return "<div><span>" + esc(l[0]) + "</span><span>" + esc(l[1]) + "</span></div>"; }).join("") +
        '</div><div class="recibo-total"><span>TOTAL</span><span>' + esc(o.total) + "</span></div></div>";
    },
    firma: function (hecha) {
      return '<div class="firma' + (hecha ? " is-hecha" : "") + '"><svg viewBox="0 0 220 70" aria-hidden="true"><path d="M10 50c18-30 30-38 36-30s-14 34-4 34 18-34 30-30-6 26 6 26 14-18 22-16 4 14 14 12 18-14 40-10 30 6 46 2"/></svg><span>Firma aquí con el dedo</span></div>';
    },
    grafico: function (valores, etiquetas, titulo) {
      var w = 260, h = 90, max = 10, paso = w / (valores.length - 1);
      var pts = valores.map(function (v, i) { return [Math.round(i * paso), Math.round(h - v / max * (h - 10) - 4)]; });
      var d = pts.map(function (p, i) { return (i ? "L" : "M") + p[0] + " " + p[1]; }).join(" ");
      return '<div class="grafico"><span class="grafico-tit">' + esc(titulo) + '</span><svg viewBox="-6 -6 ' + (w + 12) + " " + (h + 12) + '" aria-hidden="true"><path class="g-linea" d="' + d + '"/>' +
        pts.map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4"/>'; }).join("") +
        '</svg><div class="grafico-eje">' + etiquetas.map(function (e) { return "<span>" + esc(e) + "</span>"; }).join("") + "</div></div>";
    }
  };
  window.UI = UI;

  /* ---------- Marca del negocio ---------- */
  function aplicarMarca() {
    var m = S.marca;
    [document.getElementById("view"), document.getElementById("nav")].forEach(function (el) {
      var st = el.style;
      st.setProperty("--m1", m.m1); st.setProperty("--m1t", m.m1t);
      st.setProperty("--m2", m.m2); st.setProperty("--m2t", m.m2t);
      st.setProperty("--msuave", m.suave); st.setProperty("--mtinta", m.tinta);
      st.setProperty("--mfuente", m.fuente); st.setProperty("--mradio", m.radio);
    });
  }

  /* ---------- Navegación ---------- */
  var nav = document.getElementById("nav");
  var view = document.getElementById("view");
  var selector = document.getElementById("sector");
  var menuBtn = document.querySelector(".menu-btn");

  function rutaActual() {
    var h = location.hash.replace("#", "");
    var existe = S.casos.some(function (c) { return c.id === h; });
    return existe ? h : "inicio";
  }

  function pintarNav(ruta) {
    var h = '<div class="nav-negocio">' + logo(36) + '<div><strong class="marca-fuente">' + esc(S.negocio) + "</strong><span>" + esc(S.tipo) + "</span></div></div>";
    h += '<a href="#inicio" class="nav-link' + (ruta === "inicio" ? " is-activo" : "") + '"><span class="nav-num">' + icono("casa") + "</span><span>Presentación</span></a>";
    h += '<p class="nav-sub">Casos</p>';
    S.casos.forEach(function (c, i) {
      var hecho = estado[c.id] && estado[c.id].p >= c.pasos.length;
      h += '<a href="#' + c.id + '" class="nav-link' + (ruta === c.id ? " is-activo" : "") + (hecho ? " is-hecho" : "") + '">' +
        '<span class="nav-num">' + (hecho ? icono("check") : i + 1) + "</span><span>" + esc(c.nav) + "</span></a>";
    });
    nav.innerHTML = h;
  }

  /* ---------- Vistas ---------- */
  function vistaInicio() {
    var h = '<section class="portada">' +
      '<div class="portada-logo">' + logo(76) + "</div>" +
      '<div><p class="portada-tipo">Ejemplo ficticio · ' + esc(S.tipo) + '</p><h1 class="marca-fuente">' + esc(S.negocio) + "</h1><p>" + esc(S.lema) + "</p></div>" +
      "</section>";

    h += '<section class="bloque"><h2>Cómo trabaja hoy ' + esc(S.negocio) + '</h2><p class="bloque-intro">' + esc(S.situacion) + '</p><div class="dolores">' +
      S.dolores.map(function (d) { return '<article class="dolor">' + icono("alerta") + "<div><h3>" + esc(d[0]) + "</h3><p>" + esc(d[1]) + "</p></div></article>"; }).join("") +
      "</div></section>";

    h += '<section class="bloque"><h2>Lo que vas a ver</h2><p class="bloque-intro">Cada caso es una situación de su día a día contada paso a paso: qué hace el ' + esc(S.cliente.toLowerCase()) + ", qué pasa solo y qué ve el equipo.</p>" +
      '<div class="casos">' +
      S.casos.map(function (c, i) {
        return '<a class="caso-card" href="#' + c.id + '"><span class="caso-num">' + (i + 1) + "</span><h3>" + esc(c.titulo) + '</h3><p><strong>Hoy:</strong> ' + esc(c.hoy) + '</p><p><strong>Con Fluivia:</strong> ' + esc(c.con) + '</p><span class="caso-ir">Ver cómo funciona ' + icono("flecha") + "</span></a>";
      }).join("") + "</div></section>";

    h += '<p class="pie-nota">Los nombres y los datos son inventados. Cada sistema se monta con tus herramientas, tus textos y tu forma de trabajar.</p>';
    return h;
  }

  function pasoHtml(paso, i, p) {
    var q = QUIEN[paso.quien];
    var nombre = paso.nombre || q.texto;
    var clase = i < p ? "is-hecho" : i === p ? "is-ahora" : "is-luego";
    var h = '<li class="paso ' + clase + '"><span class="paso-num">' + (i < p ? icono("check") : i + 1) + '</span><div class="paso-txt">' +
      '<span class="quien quien-' + paso.quien + '">' + icono(q.icono) + esc(nombre) + "</span>" +
      "<h3>" + esc(paso.t) + "</h3>";
    if (i === p) {
      h += "<p>" + paso.d + "</p>" +
        '<button type="button" class="btn-paso" data-avanzar>' + esc(paso.boton) + icono("flecha") + "</button>";
    }
    return h + "</div></li>";
  }

  function vistaCaso(c) {
    var st = estado[c.id] || (estado[c.id] = { p: 0 });
    var n = c.pasos.length, p = st.p, fin = p >= n, pv = Math.min(p, n - 1);
    var idx = S.casos.indexOf(c), sig = S.casos[idx + 1];

    var h = '<header class="caso-cab"><div><p class="caso-de">Caso ' + (idx + 1) + " de " + S.casos.length + "</p><h1>" + esc(c.titulo) + "</h1></div>" +
      '<button type="button" class="btn-sec" data-reiniciar>' + icono("repetir") + "Empezar de nuevo</button></header>";

    h += '<div class="resumen">' +
      '<div class="res res-hoy"><h2>Hoy</h2><p>' + esc(c.hoy) + "</p></div>" +
      '<div class="res res-con"><h2>Con Fluivia</h2><p>' + esc(c.con) + "</p></div>" +
      '<div class="res res-ganas"><h2>Lo que ganas</h2><ul>' + c.ganas.map(function (g) { return "<li>" + icono("check") + esc(g) + "</li>"; }).join("") + "</ul></div>" +
      "</div>";

    var pasos = '<ol class="pasos">' + c.pasos.map(function (paso, i) { return pasoHtml(paso, i, p); }).join("") + "</ol>";
    if (p > 0 && !fin) pasos += '<button type="button" class="btn-atras" data-atras>' + icono("atras") + "Paso anterior</button>";
    if (fin) {
      pasos += '<section class="final"><h3>Así queda</h3>' +
        '<div class="final-fila"><span>Antes</span><p>' + esc(c.final.antes) + "</p></div>" +
        '<div class="final-fila final-ahora"><span>Ahora</span><p>' + esc(c.final.ahora) + "</p></div>" +
        '<div class="final-acciones">' +
          (sig ? '<a class="btn-paso" href="#' + sig.id + '">Siguiente caso: ' + esc(sig.nav) + icono("flecha") + "</a>" : '<a class="btn-paso" href="#inicio">Volver a la presentación' + icono("flecha") + "</a>") +
          '<button type="button" class="btn-sec" data-reiniciar>' + icono("repetir") + "Verlo otra vez</button>" +
        "</div></section>";
    }

    enFinal = fin;
    var x = {
      p: pv,
      fin: fin,
      // clase de animación para lo que aparece justo en este paso
      n: function (k) { return pv === k && !fin ? " anim" : ""; },
      ya: function (k) { return pv >= k; }
    };
    var escena = c.escena(x);
    enFinal = false;

    h += '<div class="historia"><div class="historia-pasos"><p class="historia-tit">Paso a paso</p>' + pasos +
      (fin ? "" : '<p class="truco">Pulsa el botón que brilla en la pantalla o usa las flechas del teclado.</p>') + "</div>" +
      '<div class="escenario">' + escena + "</div></div>";
    return h;
  }

  function casoActual() {
    var ruta = rutaActual();
    return S.casos.filter(function (k) { return k.id === ruta; })[0];
  }

  function render(foco) {
    var ruta = rutaActual();
    pintarNav(ruta);
    var cont = document.createElement("div");
    cont.className = "vista";
    cont.innerHTML = ruta === "inicio" ? vistaInicio() : vistaCaso(casoActual());
    view.replaceChildren(cont);
    // Dentro del móvil, que se vea lo último que ha pasado (o el botón que toca pulsar)
    cont.querySelectorAll(".m-cuerpo").forEach(function (el) {
      var pista = el.querySelector(".pista");
      if (el.classList.contains("m-wa")) {
        el.scrollTop = el.scrollHeight;
      } else if (pista) {
        var abajo = pista.offsetTop + pista.offsetHeight + 16 - el.clientHeight;
        if (abajo > 0) el.scrollTop = abajo;
      }
    });
    if (foco) { view.focus({ preventScroll: true }); window.scrollTo(0, 0); }
  }

  function mover(delta) {
    var c = casoActual();
    if (!c) return;
    var st = estado[c.id] || (estado[c.id] = { p: 0 });
    var nuevo = Math.max(0, Math.min(c.pasos.length, st.p + delta));
    if (nuevo === st.p) return;
    st.p = nuevo;
    render(false);
    // En pantallas estrechas, lleva la vista al paso nuevo
    if (window.innerWidth < 1000) {
      var ahora = view.querySelector(".paso.is-ahora, .final");
      if (ahora) ahora.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  view.addEventListener("click", function (e) {
    if (e.target.closest("[data-avanzar]")) { mover(1); return; }
    if (e.target.closest("[data-atras]")) { mover(-1); return; }
    if (e.target.closest("[data-reiniciar]")) {
      var c = casoActual();
      if (c) { estado[c.id] = { p: 0 }; render(false); }
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.target.closest && e.target.closest("select, input, textarea")) return;
    if (e.key === "ArrowRight") { e.preventDefault(); mover(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); mover(-1); }
  });

  window.addEventListener("hashchange", function () {
    document.body.classList.remove("menu-abierto");
    menuBtn.setAttribute("aria-expanded", "false");
    render(true);
  });

  menuBtn.addEventListener("click", function () {
    var abierto = document.body.classList.toggle("menu-abierto");
    menuBtn.setAttribute("aria-expanded", abierto ? "true" : "false");
  });

  function cambiarSector(id) {
    S = SECTORES.filter(function (s) { return s.id === id; })[0] || SECTORES[0];
    estado = {};
    selector.value = S.id;
    document.title = S.negocio + " · Demo de Fluivia";
    var url = new URL(location.href);
    url.searchParams.set("s", S.id);
    history.replaceState(null, "", url.pathname + url.search + location.hash);
    aplicarMarca();
  }

  selector.innerHTML = SECTORES.map(function (s) { return '<option value="' + s.id + '">' + esc(s.etiqueta) + "</option>"; }).join("");
  selector.addEventListener("change", function () {
    cambiarSector(selector.value);
    if (location.hash && location.hash !== "#inicio") location.hash = "inicio";
    else render(true);
  });

  cambiarSector(new URLSearchParams(location.search).get("s"));
  render(false);
})();
