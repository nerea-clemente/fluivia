/* Oficina de Fluivia · lo común a todas las páginas */
(function () {
  "use strict";

  var ETAPAS = [["nuevo", "Nuevo"], ["contactado", "Contactado"], ["reunion", "Reunión"], ["propuesta", "Propuesta"], ["cliente", "Cliente"], ["perdido", "Perdido"]];
  var SECTORES = [["gestoria", "Gestoría"], ["inmobiliaria", "Inmobiliaria"], ["clinica", "Clínica"], ["academia", "Academia"], ["distribucion", "Distribución"], ["consultoria", "Consultoría o agencia"], ["comercio", "Comercio"], ["otro", "Otro"]];
  var ORIGENES = [["web-demo", "Pidió la demo"], ["web-contacto", "Formulario de la web"], ["prospeccion", "Prospección"], ["linkedin", "LinkedIn"], ["recomendacion", "Recomendación"], ["evento", "Evento"], ["manual", "A mano"], ["otro", "Otro"]];
  var INTERESES = [["consultas", "Consultas en orden"], ["citas", "Citas sin llamadas"], ["documentos", "Documentos sin perseguir"], ["a-medida", "A medida"], ["marketing", "Marketing"], ["formacion", "Formación"]];
  var TIPOS = [["nota", "Nota"], ["llamada", "Llamada"], ["correo", "Correo"], ["reunion", "Reunión"], ["whatsapp", "WhatsApp"], ["linkedin", "LinkedIn"], ["web", "Web"], ["etapa", "Etapa"], ["demo", "Demo"], ["fiscal", "IVA"]];
  var PAISES = [["ES", "España"], ["DK", "Dinamarca"], ["UE", "Otro país de la UE"]];
  var nombre = function (lista, k) { var f = lista.filter(function (x) { return x[0] === k; })[0]; return f ? f[1] : (k || ""); };

  var ICONOS = {
    nota: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6",
    llamada: "M6 3h3l2 5-2 1.5a12 12 0 0 0 5.5 5.5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z",
    correo: "M3 6h18v12H3zM3 7l9 6 9-6",
    reunion: "M4 6h16v15H4zM4 10h16M8 3v4M16 3v4",
    whatsapp: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z",
    linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    web: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18",
    demo: "M8 5v14l11-7z",
    etapa: "M5 12h14M13 6l6 6-6 6",
    mas: "M12 5v14M5 12h14",
    descarga: "M12 4v11M7 10l5 5 5-5M5 20h14",
    atras: "M19 12H5M11 6l-6 6 6 6",
    copiar: "M9 9h11v11H9zM5 15H4V4h11v1",
    fiscal: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z",
    alerta: "M12 9v4M12 17h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
    check: "M5 12.5 10 17 19 7"
  };
  function icono(n) { return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="' + (ICONOS[n] || "") + '"/></svg>'; }

  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function api(ruta, opciones) {
    opciones = opciones || {};
    var init = { method: opciones.method || "GET", headers: {}, credentials: "same-origin" };
    if (opciones.body !== undefined) { init.headers["content-type"] = "application/json"; init.body = JSON.stringify(opciones.body); }
    return fetch(ruta, init).then(function (res) {
      if (res.status === 401) { location.href = "/entrar.html"; throw new Error("Sesión caducada"); }
      return res.json().catch(function () { return {}; }).then(function (datos) {
        if (!res.ok) { var e = new Error(datos.error || "Algo ha fallado"); e.status = res.status; e.datos = datos; throw e; }
        return datos;
      });
    });
  }

  var hoy = function () { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  var masDias = function (n) { var d = new Date(Date.now() + n * 864e5); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  var fmtDia = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short" });
  var fmtHora = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  function dia(iso) { if (!iso) return ""; var p = iso.split("-"); return fmtDia.format(new Date(+p[0], +p[1] - 1, +p[2])); }
  function momento(iso) { return iso ? fmtHora.format(new Date(iso)) : ""; }
  function euros(n) { return new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(n || 0) + " €"; }

  // Etiqueta de la próxima acción: tarde, hoy o fecha.
  function proxima(c) {
    if (!c.proxima || !c.proxima.fecha) return "";
    var h = hoy(), f = c.proxima.fecha;
    var clase = f < h ? "chip chip-tarde" : f === h ? "chip chip-hoy" : "chip";
    var cuando = f < h ? "Desde el " + dia(f) : f === h ? "Hoy" : dia(f);
    return '<span class="' + clase + '">' + esc(cuando) + "</span>";
  }
  // ¿Le falta un NIF-IVA válido para facturarle sin IVA danés? Solo cuenta en
  // propuesta o cliente, y solo fuera de Dinamarca (allí siempre lleva moms).
  function fiscalPendiente(c) {
    if (c.etapa !== "propuesta" && c.etapa !== "cliente") return false;
    if (c.pais === "DK") return false;
    return !(c.vies && c.vies.estado === "valido" && c.vies.nif === c.nif);
  }
  function etapa(k) { return '<span class="etapa etapa-' + esc(k) + '">' + esc(nombre(ETAPAS, k)) + "</span>"; }
  function titulo(c) { return c.empresa || c.nombre || c.email || "Sin nombre"; }
  function subtitulo(c) { return [c.empresa ? c.nombre : "", nombre(SECTORES, c.sector)].filter(Boolean).join(" · "); }

  var avisoEl;
  function aviso(texto, error) {
    if (!avisoEl) { avisoEl = document.createElement("div"); avisoEl.className = "aviso"; avisoEl.setAttribute("role", "status"); document.body.appendChild(avisoEl); }
    avisoEl.textContent = texto;
    avisoEl.classList.toggle("es-error", !!error);
    avisoEl.classList.add("es-visible");
    clearTimeout(aviso.t);
    aviso.t = setTimeout(function () { avisoEl.classList.remove("es-visible"); }, error ? 5000 : 2600);
  }

  // Cabecera común
  function cabecera(actual) {
    var cab = document.createElement("header");
    cab.className = "cab";
    cab.innerHTML = '<a class="cab-marca" href="/"><img src="/img/logo.svg" alt="fluivia" width="650" height="225"><span>Oficina</span></a>' +
      '<nav class="cab-nav" aria-label="Oficina">' +
        '<a href="/"' + (actual === "resumen" ? ' aria-current="page"' : "") + ">Resumen</a>" +
        '<a href="/contactos.html"' + (actual === "contactos" ? ' aria-current="page"' : "") + ">Contactos</a>" +
      "</nav>" +
      '<div class="cab-usuario"><span id="yo"></span><button type="button" class="btn-texto" id="salir">Salir</button></div>';
    document.body.insertBefore(cab, document.body.firstChild);
    api("/api/yo").then(function (r) { document.getElementById("yo").textContent = r.email; }).catch(function () {});
    document.getElementById("salir").addEventListener("click", function () {
      api("/api/acceso/salir", { method: "POST", body: {} }).finally(function () { location.href = "/entrar.html"; });
    });
  }

  window.Of = {
    ETAPAS: ETAPAS, SECTORES: SECTORES, ORIGENES: ORIGENES, INTERESES: INTERESES, TIPOS: TIPOS, PAISES: PAISES, fiscalPendiente: fiscalPendiente,
    nombre: nombre, icono: icono, esc: esc, api: api, hoy: hoy, masDias: masDias, dia: dia, momento: momento, euros: euros,
    proxima: proxima, etapa: etapa, titulo: titulo, subtitulo: subtitulo, aviso: aviso, cabecera: cabecera
  };
})();
