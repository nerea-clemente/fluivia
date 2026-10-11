/* Fluivia · Demo para clientes
   Motor de la demo. Cada negocio de ejemplo trae sus propios casos (carpeta sectores/).
   Un caso es una historia en pasos: quién hace qué y qué se ve en cada pantalla.
   Con ?n=Nombre&c=color&l=logo la demo se personaliza para un cliente (ver crear.html). */
(function () {
  "use strict";

  var SECTORES = window.DEMO_SECTORES || [];
  var S = null;          // sector activo (copia, con la marca del cliente si la hay)
  var ORIGINAL = "";     // nombre del negocio de ejemplo, para sustituirlo en los textos
  var estado = {};       // paso actual de cada caso
  var elegidos = [];     // casos marcados en la pantalla final
  var enFinal = false;   // mientras se pinta un caso terminado, los botones no avanzan

  var params = new URLSearchParams(location.search);
  var PERSONAL = {
    nombre: (params.get("n") || "").trim().slice(0, 60),
    color: /^[0-9a-f]{6}$/i.test(params.get("c") || "") ? "#" + params.get("c") : "",
    logo: /^https:\/\/[^\s"'<>]+$/i.test(params.get("l") || "") ? params.get("l") : "",
    lema: (params.get("lema") || "").trim().slice(0, 90),
    email: /^[^\s@<>"]+@[^\s@<>"]+\.[a-z]{2,}$/i.test(params.get("r") || "") ? params.get("r") : ""
  };
  var personalizada = !!PERSONAL.nombre;

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
    mic: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3",
    repetir: "M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5",
    casa: "M4 11 12 4l8 7M6 9.5V20h12V9.5",
    ubicacion: "M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
    correo: "M3 6h18v12H3zM3 7l9 6 9-6",
    telefono: "M6 3h3l2 5-2 1.5a12 12 0 0 0 5.5 5.5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z",
    escudo: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z",
    cerrar: "M6 6l12 12M18 6 6 18",
    enchufe: "M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4",
    piezas: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
    bandera: "M5 21V4M5 4h11l-2 4 2 4H5",
    abajo: "M6 9l6 6 6-6"
  };
  function icono(n, clase) {
    return '<svg class="icon' + (clase ? " " + clase : "") + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + (ICONOS[n] || "") + '"/></svg>';
  }

  // Logo del negocio: el del cliente (si hay URL), sus iniciales o el del ejemplo
  function iniciales(nombre) {
    var vacias = ["de", "del", "la", "las", "el", "los", "y", "e", "&"];
    var p = nombre.split(/\s+/).filter(function (w) { return w && vacias.indexOf(w.toLowerCase()) < 0; });
    return ((p[0] || "?").charAt(0) + (p[1] ? p[1].charAt(0) : "")).toUpperCase();
  }
  function monograma() {
    var t = iniciales(S.negocio);
    return '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="10" fill="' + S.marca.m1 + '"/>' +
      '<text x="20" y="21" text-anchor="middle" dominant-baseline="middle" font-family="' + esc(S.marca.fuente) + '" font-weight="700" font-size="' + (t.length > 1 ? 15 : 18) + '" fill="' + S.marca.m1t + '">' + esc(t) + "</text></svg>";
  }
  function logo(tam) {
    if (personalizada && PERSONAL.logo) {
      return '<span class="marca-logo marca-img" style="width:' + tam + "px;height:" + tam + 'px"><img src="' + esc(PERSONAL.logo) + '" alt=""></span>';
    }
    return '<span class="marca-logo" style="width:' + tam + "px;height:" + tam + 'px">' + (personalizada ? monograma() : S.marca.logo) + "</span>";
  }
  // Si el logo del cliente no carga, se ponen sus iniciales
  function vigilarLogos(raiz) {
    raiz.querySelectorAll(".marca-img img").forEach(function (img) {
      img.addEventListener("error", function () {
        var caja = img.parentNode;
        caja.classList.remove("marca-img");
        caja.innerHTML = monograma();
      }, { once: true });
    });
  }

  /* ---------- Colores a partir del color del cliente ---------- */
  function rgb(hex) { var n = parseInt(hex.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  function hex(c) { return "#" + c.map(function (v) { return ("0" + Math.round(v).toString(16)).slice(-2); }).join(""); }
  function mezcla(a, b, t) { var x = rgb(a), y = rgb(b); return hex(x.map(function (v, i) { return v + (y[i] - v) * t; })); }
  function luz(h) {
    var c = rgb(h).map(function (v) { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); });
    return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
  }
  function marcaDesdeColor(base, fuente) {
    var claro = luz(base) > .45;
    var tinta = mezcla(base, "#111418", .78);
    return {
      m1: base, m1t: claro ? tinta : "#FFFFFF",
      m2: mezcla(base, "#FFFFFF", .8), m2t: tinta,
      suave: mezcla(base, "#FFFFFF", .92), tinta: tinta,
      fuente: fuente, radio: "12px"
    };
  }

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
            '<aside class="v-menu"><div class="v-menu-marca">' + logo(24) + '<strong class="marca-fuente">' + esc(S.negocio) + "</strong></div><ul>" + menu + "</ul></aside>" +
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
    if (h === "empezar") return h;
    var existe = S.casos.some(function (c) { return c.id === h; });
    return existe ? h : "inicio";
  }
  function casoActual() {
    var ruta = rutaActual();
    return S.casos.filter(function (k) { return k.id === ruta; })[0];
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
    h += '<p class="nav-sub">Para terminar</p>';
    h += '<a href="#empezar" class="nav-link' + (ruta === "empezar" ? " is-activo" : "") + '"><span class="nav-num">' + icono("bandera") + "</span><span>¿Por dónde empezarías?</span></a>";
    nav.innerHTML = h;
  }

  /* ---------- Bloques compartidos ---------- */
  function bloqueHerramientas() {
    return '<section class="bloque"><h2>¿Y lo que ya usas?</h2><p class="bloque-intro">Tú decides, y puede ser distinto en cada parte.</p>' +
      '<div class="opciones">' +
        '<article class="opcion">' + icono("enchufe") + "<div><h3>Lo conectamos</h3><p>Si " + esc(S.software.actual) + " te funciona, Fluivia trabaja con él. Tu equipo sigue usando lo de siempre.</p></div></article>" +
        '<article class="opcion">' + icono("piezas") + "<div><h3>Lo sustituimos</h3><p>Si se te queda corto, te montamos " + esc(S.software.medida) + ", con todo lo que ves en esta demo dentro.</p></div></article>" +
      "</div></section>";
  }

  /* ---------- Vistas ---------- */
  function vistaInicio() {
    var h = '<section class="portada">' +
      '<div class="portada-logo">' + logo(64) + "</div>" +
      '<div class="portada-txt"><p class="portada-tipo">' + (personalizada ? "Demo preparada para" : "Ejemplo ficticio · " + esc(S.tipo)) + '</p><h1 class="marca-fuente">' + esc(S.negocio) + "</h1>" +
      "<p>" + esc(personalizada ? (PERSONAL.lema || S.tipo) : S.lema) + "</p></div>" +
      "</section>";

    h += '<section class="bloque"><h2>Lo que suele pasar hoy</h2>' + (personalizada ? "" : '<p class="bloque-intro">' + esc(S.situacion) + "</p>") +
      '<div class="dolores">' +
      S.dolores.map(function (d) { return '<article class="dolor"><h3>' + esc(d[0]) + "</h3><p>" + esc(d[1]) + "</p></article>"; }).join("") +
      "</div></section>";

    h += '<section class="bloque"><h2>Lo que vas a ver</h2><p class="bloque-intro">Cuatro situaciones del día a día, paso a paso: qué hace el ' + esc(S.cliente.toLowerCase()) + ", qué pasa solo y qué ve tu equipo.</p>" +
      '<div class="casos">' +
      S.casos.map(function (c, i) {
        return '<a class="caso-card" href="#' + c.id + '"><span class="caso-num">' + (i + 1) + "</span><h3>" + esc(c.titulo) + "</h3>" +
          '<p class="caso-hoy">' + esc(c.hoy) + "</p>" +
          '<span class="caso-ir">Ver cómo funciona ' + icono("flecha") + "</span></a>";
      }).join("") + "</div></section>";

    h += bloqueHerramientas();
    h += '<p class="pie-nota">Los nombres, conversaciones y cifras de esta demo son de ejemplo.</p>';
    return h;
  }

  function pasoHtml(paso, i, p) {
    var q = QUIEN[paso.quien];
    var clase = i < p ? "is-hecho" : i === p ? "is-ahora" : "is-luego";
    var h = '<li class="paso ' + clase + '"><span class="paso-num">' + (i < p ? icono("check") : i + 1) + '</span><div class="paso-txt">' +
      (i <= p ? '<span class="quien quien-' + paso.quien + '">' + icono(q.icono) + esc(paso.nombre || q.texto) + "</span>" : "") +
      "<h3>" + esc(paso.t) + "</h3>";
    if (i === p) {
      h += "<p>" + paso.d + "</p>" +
        '<button type="button" class="btn-paso" data-avanzar>' + esc(paso.boton) + icono("flecha") + "</button>";
    }
    return h + "</div></li>";
  }

  function vistaCaso(c) {
    var st = estado[c.id] || (estado[c.id] = { p: 0, abierto: false });
    var n = c.pasos.length, p = st.p, fin = p >= n, pv = Math.min(p, n - 1);
    var idx = S.casos.indexOf(c), sig = S.casos[idx + 1];
    var plegado = p > 0 && !fin && !st.abierto;

    var h = '<header class="caso-cab"><div class="caso-cab-txt"><p class="caso-de">Caso ' + (idx + 1) + " de " + S.casos.length + '<span class="punto"></span>Nombres y cifras de ejemplo</p>' +
      "<h1>" + esc(c.titulo) + '</h1><p class="caso-sub">' + esc(c.con) + "</p></div>" +
      '<button type="button" class="btn-sec" data-reiniciar>' + icono("repetir") + "Empezar de nuevo</button></header>";

    h += '<section class="resumen' + (plegado ? " is-plegado" : "") + '">' +
      '<div class="res"><h2>Hoy</h2><p>' + esc(c.hoy) + "</p></div>" +
      '<div class="res"><h2>Lo que ganas</h2><ul>' + c.ganas.map(function (g) { return "<li>" + icono("check") + esc(g) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="res"><h2>Para montarlo</h2><p><strong>' + esc(c.montaje.plazo) + "</strong></p><p>" + esc(c.montaje.con) + "</p></div>" +
      "</section>";
    if (p > 0 && !fin) {
      h += '<button type="button" class="btn-plegar" data-plegar aria-expanded="' + (!plegado) + '">' + (plegado ? "Ver de qué va este caso" : "Ocultar el resumen") + icono("abajo", plegado ? "" : "gira") + "</button>";
    }

    var pasos = '<ol class="pasos">' + c.pasos.map(function (paso, i) { return pasoHtml(paso, i, p); }).join("") + "</ol>";
    if (p > 0 && !fin) pasos += '<button type="button" class="btn-atras" data-atras>' + icono("atras") + "Paso anterior</button>";
    if (fin) {
      pasos += '<section class="final"><h3>Así queda</h3>' +
        '<div class="final-fila"><span>Antes</span><p>' + esc(c.final.antes) + "</p></div>" +
        '<div class="final-fila final-ahora"><span>Ahora</span><p>' + esc(c.final.ahora) + "</p></div>" +
        '<div class="final-fila"><span>Montaje</span><p><strong>' + esc(c.montaje.plazo) + ".</strong> " + esc(c.montaje.con) + ".</p></div>" +
        '<div class="final-acciones">' +
          (sig ? '<a class="btn-paso" href="#' + sig.id + '">Siguiente: ' + esc(sig.nav) + icono("flecha") + "</a>" : '<a class="btn-paso" href="#empezar">¿Por dónde empezarías?' + icono("flecha") + "</a>") +
          '<button type="button" class="btn-texto" data-reiniciar>' + icono("repetir") + "Verlo otra vez</button>" +
        "</div></section>";
    } else {
      pasos += '<p class="truco">Pulsa el botón que brilla o usa las flechas del teclado.</p>';
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

    h += '<div class="historia"><div class="historia-pasos">' + pasos + "</div>" +
      '<div class="escenario">' + escena + "</div></div>";
    return h;
  }

  function vistaCierre() {
    var h = '<header class="caso-cab"><div class="caso-cab-txt"><p class="caso-de">Para terminar</p><h1>¿Por dónde empezarías?</h1>' +
      '<p class="caso-sub">Marca lo que más trabajo te quitaría. No hace falta montarlo todo de golpe: se empieza por una cosa y se suma lo demás cuando funciona.</p></div></header>';

    h += '<div class="eleccion">' + S.casos.map(function (c, i) {
      var sel = elegidos.indexOf(c.id) > -1;
      return '<button type="button" class="elige' + (sel ? " is-sel" : "") + '" data-elegir="' + c.id + '" aria-pressed="' + sel + '">' +
        '<span class="elige-check">' + icono("check") + "</span>" +
        '<span class="elige-txt"><strong>' + esc(c.titulo) + "</strong><span>" + esc(c.ganas.join(" · ")) + "</span>" +
        '<small>Para montarlo: ' + esc(c.montaje.plazo) + "</small></span></button>";
    }).join("") + "</div>";

    var nombres = S.casos.filter(function (c) { return elegidos.indexOf(c.id) > -1; }).map(function (c) { return c.titulo; });
    if (PERSONAL.email) {
      var cuerpo = "Hola:\n\nHe visto la demo. Lo que más me interesa:\n" + (nombres.length ? nombres.map(function (t) { return "- " + t; }).join("\n") : "- (todavía no lo tengo claro)") + "\n\n";
      var href = "mailto:" + PERSONAL.email + "?subject=" + encodeURIComponent("Demo de Fluivia: " + S.negocio) + "&body=" + encodeURIComponent(cuerpo);
      h += '<div class="enviar"><p>' + (nombres.length ? "Has marcado " + nombres.length + (nombres.length === 1 ? " caso." : " casos.") : "Marca uno o varios y envíanos tu elección.") + "</p>" +
        '<a class="btn-paso" href="' + esc(href) + '">' + icono("correo") + "Enviar mi elección</a></div>";
    } else if (nombres.length) {
      h += '<div class="enviar"><p>Has marcado: <strong>' + esc(nombres.join(", ")) + "</strong>.</p></div>";
    }

    h += '<section class="bloque"><h2>Cómo seguiríamos</h2><ol class="siguientes">' +
      "<li><strong>Una llamada de 30 minutos</strong><span>Para ver cómo trabajáis hoy y qué os quita más tiempo.</span></li>" +
      "<li><strong>Una propuesta concreta</strong><span>Qué montaríamos primero, en cuánto tiempo y con qué herramientas: las tuyas o nuevas.</span></li>" +
      "<li><strong>Lo montamos y lo probáis</strong><span>Primero lo usa tu equipo. Cuando estáis contentos, lo ven tus clientes.</span></li>" +
      "</ol></section>";
    h += bloqueHerramientas();
    return h;
  }

  /* ---------- Pintar ---------- */
  function render(foco) {
    var ruta = rutaActual();
    pintarNav(ruta);
    var html = ruta === "inicio" ? vistaInicio() : ruta === "empezar" ? vistaCierre() : vistaCaso(casoActual());
    if (personalizada && ORIGINAL) html = html.split(esc(ORIGINAL)).join(esc(S.negocio));
    var cont = document.createElement("div");
    cont.className = "vista";
    cont.innerHTML = html;
    view.replaceChildren(cont);
    vigilarLogos(document);
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
    var st = estado[c.id] || (estado[c.id] = { p: 0, abierto: false });
    var nuevo = Math.max(0, Math.min(c.pasos.length, st.p + delta));
    if (nuevo === st.p) return;
    st.p = nuevo;
    render(false);
    // En pantallas estrechas, lleva la vista al paso nuevo
    if (window.innerWidth < 1100) {
      var ahora = view.querySelector(".paso.is-ahora, .final");
      if (ahora) ahora.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  view.addEventListener("click", function (e) {
    var el;
    if (e.target.closest("[data-avanzar]")) { mover(1); return; }
    if (e.target.closest("[data-atras]")) { mover(-1); return; }
    if (e.target.closest("[data-plegar]")) {
      var cp = casoActual();
      if (cp) { estado[cp.id].abierto = !estado[cp.id].abierto; render(false); }
      return;
    }
    if ((el = e.target.closest("[data-elegir]"))) {
      var id = el.getAttribute("data-elegir"), i = elegidos.indexOf(id);
      if (i > -1) elegidos.splice(i, 1); else elegidos.push(id);
      render(false);
      var boton = view.querySelector('[data-elegir="' + id + '"]');
      if (boton) boton.focus({ preventScroll: true });
      return;
    }
    if (e.target.closest("[data-reiniciar]")) {
      var c = casoActual();
      if (c) { estado[c.id] = { p: 0, abierto: false }; render(false); }
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
    var base = SECTORES.filter(function (s) { return s.id === id; })[0] || SECTORES[0];
    S = Object.create(base);
    ORIGINAL = base.negocio;
    if (personalizada) {
      S.negocio = PERSONAL.nombre;
      if (PERSONAL.color) S.marca = marcaDesdeColor(PERSONAL.color, base.marca.fuente);
    }
    estado = {};
    elegidos = [];
    selector.value = base.id;
    document.title = (personalizada ? "Demo para " + S.negocio : S.negocio + " · Demo") + " · Fluivia";
    var url = new URL(location.href);
    url.searchParams.set("s", base.id);
    history.replaceState(null, "", url.pathname + url.search + location.hash);
    aplicarMarca();
  }

  selector.innerHTML = SECTORES.map(function (s) { return '<option value="' + s.id + '">' + esc(s.etiqueta) + "</option>"; }).join("");
  selector.addEventListener("change", function () {
    cambiarSector(selector.value);
    if (location.hash && location.hash !== "#inicio") location.hash = "inicio";
    else render(true);
  });

  // En una demo personalizada no se ofrece cambiar de negocio
  if (personalizada) {
    document.querySelector(".sector-picker").hidden = true;
    var para = document.getElementById("demo-para");
    para.textContent = "Preparada para " + PERSONAL.nombre;
    para.hidden = false;
  }

  cambiarSector(params.get("s"));
  render(false);
})();
