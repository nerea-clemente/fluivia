/* Oficina de Fluivia · lista y tablero de contactos */
(function () {
  "use strict";
  var Of = window.Of, esc = Of.esc;
  Of.cabecera("contactos");

  var todos = [];
  var estado = { texto: "", sector: "", origen: "", etapa: "activos", vista: "lista" };
  try { var g = JSON.parse(localStorage.getItem("of-contactos") || "{}"); if (g.vista) estado.vista = g.vista; if (g.etapa) estado.etapa = g.etapa; } catch (e) {}
  var guardarPref = function () { try { localStorage.setItem("of-contactos", JSON.stringify({ vista: estado.vista, etapa: estado.etapa })); } catch (e) {} };

  var $ = function (id) { return document.getElementById(id); };
  $("f-sector").insertAdjacentHTML("beforeend", Of.SECTORES.map(function (s) { return '<option value="' + s[0] + '">' + esc(s[1]) + "</option>"; }).join(""));
  $("f-origen").insertAdjacentHTML("beforeend", Of.ORIGENES.map(function (s) { return '<option value="' + s[0] + '">' + esc(s[1]) + "</option>"; }).join(""));

  var normal = function (t) { return String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
  function filtrar(sinEtapa) {
    var q = normal(estado.texto);
    return todos.filter(function (c) {
      if (estado.sector && c.sector !== estado.sector) return false;
      if (estado.origen && c.origen !== estado.origen) return false;
      if (!Of.enPais(c)) return false;
      if (!sinEtapa) {
        if (estado.etapa === "activos" && (c.etapa === "cliente" || c.etapa === "perdido")) return false;
        if (estado.etapa === "toca" && !(c.proxima && c.proxima.fecha && c.proxima.fecha <= Of.hoy() && c.etapa !== "cliente" && c.etapa !== "perdido")) return false;
        if (Of.ETAPAS.some(function (e) { return e[0] === estado.etapa; }) && c.etapa !== estado.etapa) return false;
      }
      if (q && normal([c.nombre, c.empresa, c.email, c.telefono, c.ciudad, (c.etiquetas || []).join(" ")].join(" ")).indexOf(q) < 0) return false;
      return true;
    });
  }
  // Primero lo que toca antes; sin próxima acción, al final y por el más reciente.
  function ordenar(lista) {
    return lista.slice().sort(function (a, b) {
      var fa = (a.proxima && a.proxima.fecha) || "9999", fb = (b.proxima && b.proxima.fecha) || "9999";
      if (fa !== fb) return fa < fb ? -1 : 1;
      return (a.actualizado || "") < (b.actualizado || "") ? 1 : -1;
    });
  }
  function ultimo(c) { var h = (c.historial || []).slice(-1)[0]; return h ? Of.momento(h.fecha) : ""; }

  function pintarPestanas() {
    var base = filtrar(true), h = Of.hoy();
    var cuenta = function (f) { return base.filter(f).length; };
    var tabs = [["activos", "En marcha", cuenta(function (c) { return c.etapa !== "cliente" && c.etapa !== "perdido"; })],
      ["toca", "Te toca", cuenta(function (c) { return c.proxima && c.proxima.fecha && c.proxima.fecha <= h && c.etapa !== "cliente" && c.etapa !== "perdido"; })]]
      .concat(Of.ETAPAS.map(function (e) { return [e[0], e[1], cuenta(function (c) { return c.etapa === e[0]; })]; }))
      .concat([["todos", "Todos", base.length]]);
    $("pestanas").innerHTML = tabs.map(function (t) {
      return '<button type="button" class="pestana" data-etapa="' + t[0] + '" aria-pressed="' + (estado.etapa === t[0]) + '">' + esc(t[1]) + " <span>" + t[2] + "</span></button>";
    }).join("");
    $("pestanas").hidden = estado.vista === "tablero";
  }

  function pintarLista() {
    var lista = ordenar(filtrar());
    if (!lista.length) { $("lista").innerHTML = '<p class="vacio">' + (todos.length ? "No hay contactos con estos filtros." : 'Todavía no hay contactos. Llegarán solos desde la web, o puedes <a href="/ficha.html?nuevo=1">crear uno</a>.') + "</p>"; return; }
    $("lista").innerHTML = '<div class="tabla-env"><table class="tabla"><thead><tr><th>Contacto</th><th>Etapa</th><th>Próxima acción</th><th class="ocultar-movil">Origen</th><th class="ocultar-movil">Último movimiento</th></tr></thead><tbody>' +
      lista.map(function (c) {
        var li = c.linkedin ? ' <a class="chip" href="' + esc(c.linkedin) + '" target="_blank" rel="noopener" title="Abrir en LinkedIn">in</a>' : "";
        return '<tr data-id="' + esc(c.id) + '"><td><a href="/ficha.html?id=' + encodeURIComponent(c.id) + '">' + esc(Of.titulo(c)) + "</a>" + li + "<small>" + esc([Of.subtitulo(c), c.ciudad].filter(Boolean).join(" · ")) + "</small></td>" +
          "<td>" + Of.etapa(c.etapa) + (Of.fiscalPendiente(c) ? ' <span class="chip chip-fiscal">Sin NIF-IVA válido</span>' : "") + "</td>" +
          "<td>" + (c.proxima && c.proxima.fecha ? Of.proxima(c) + "<small>" + esc(c.proxima.texto) + "</small>" : '<span class="tenue">—</span>') + "</td>" +
          '<td class="ocultar-movil">' + esc(Of.nombre(Of.ORIGENES, c.origen)) + "</td>" +
          '<td class="ocultar-movil">' + esc(ultimo(c)) + "</td></tr>";
      }).join("") + "</tbody></table></div>";
  }

  function pintarTablero() {
    var lista = ordenar(filtrar(true));
    $("tablero").innerHTML = Of.ETAPAS.map(function (e) {
      var col = lista.filter(function (c) { return c.etapa === e[0]; });
      var suma = col.reduce(function (s, c) { return s + (e[0] === "cliente" ? (c.cuota || 0) : (c.implantacion || 0)); }, 0);
      return '<section class="columna" data-etapa="' + e[0] + '"><h2>' + esc(e[1]) + " <span>" + col.length + "</span></h2>" +
        (suma ? '<p class="columna-suma">' + Of.euros(suma) + (e[0] === "cliente" ? "/mes" : "") + "</p>" : "") +
        col.map(function (c) {
          return '<a class="tarjeta-c" draggable="true" data-id="' + esc(c.id) + '" href="/ficha.html?id=' + encodeURIComponent(c.id) + '"><strong>' + esc(Of.titulo(c)) + "</strong><span>" + esc(Of.subtitulo(c)) + "</span>" + Of.proxima(c) + (Of.fiscalPendiente(c) ? ' <span class="chip chip-fiscal">Sin NIF-IVA válido</span>' : "") + "</a>";
        }).join("") + "</section>";
    }).join("");
  }

  function pintar() {
    var n = Of.pais() ? todos.filter(Of.enPais).length : todos.length;
    $("total").textContent = n + (n === 1 ? " contacto" : " contactos") + (Of.pais() ? " en " + Of.nombre(Of.PAISES, Of.pais()) : "");
    document.querySelectorAll("[data-vista]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-vista") === estado.vista)); });
    pintarPestanas();
    $("lista").hidden = estado.vista !== "lista";
    $("tablero").hidden = estado.vista !== "tablero";
    if (estado.vista === "lista") pintarLista(); else pintarTablero();
  }

  $("buscar").addEventListener("input", function () { estado.texto = this.value; pintar(); });
  $("f-sector").addEventListener("change", function () { estado.sector = this.value; pintar(); });
  $("f-origen").addEventListener("change", function () { estado.origen = this.value; pintar(); });
  document.addEventListener("of-pais", function () { if (todos.length) pintar(); });

  // ---- Importar una lista de empresas (CSV o JSON) para prospectar ----
  // Columnas: empresa, ciudad, pais (ES/DK), sector, web, telefono, email, linkedin,
  // persona, cvr, nota, fuente. Las que ya estén (por correo, web o nombre y ciudad) no se repiten.
  function leerCsv(texto) {
    texto = texto.replace(/^\uFEFF/, "");
    var sep = (texto.split("\n")[0].match(/;/g) || []).length >= (texto.split("\n")[0].match(/,/g) || []).length ? ";" : ",";
    var filas = [], fila = [], celda = "", dentro = false;
    for (var i = 0; i < texto.length; i++) {
      var ch = texto[i];
      if (dentro) { if (ch === '"') { if (texto[i + 1] === '"') { celda += '"'; i++; } else dentro = false; } else celda += ch; }
      else if (ch === '"') dentro = true;
      else if (ch === sep) { fila.push(celda); celda = ""; }
      else if (ch === "\n" || ch === "\r") { if (ch === "\r" && texto[i + 1] === "\n") i++; fila.push(celda); filas.push(fila); fila = []; celda = ""; }
      else celda += ch;
    }
    if (celda || fila.length) { fila.push(celda); filas.push(fila); }
    var cab = (filas.shift() || []).map(function (h) { return normal(h).trim().replace(/[^a-z]/g, ""); });
    var alias = { nombre: "empresa", company: "empresa", city: "ciudad", country: "pais", phone: "telefono", telfono: "telefono", correo: "email", mail: "email", contacto: "persona", notas: "nota" };
    return filas.filter(function (f) { return f.some(function (x) { return x.trim(); }); }).map(function (f) {
      var o = {}; cab.forEach(function (h, j) { o[alias[h] || h] = (f[j] || "").trim(); }); return o;
    });
  }
  function importar(lista) {
    if (!lista.length) { Of.aviso("El archivo no tiene empresas.", true); return; }
    var porDia = prompt(lista.length + " empresas en el archivo. ¿Cuántas quieres contactar al día? (las repartimos en la próxima acción)", "10");
    if (porDia === null) return;
    Of.api("/api/contactos/importar", { method: "POST", body: { contactos: lista, porDia: Number(porDia) || 10 } }).then(function (r) {
      Of.aviso(r.nuevos + " empresas añadidas" + (r.repetidos ? ", " + r.repetidos + " ya estaban" : "") + (r.hasta ? ". Repartidas hasta el " + r.hasta.split("-").reverse().join("/") : ""));
      return Of.api("/api/contactos");
    }).then(function (l) { if (l) { todos = l; estado.origen = "prospeccion"; $("f-origen").value = "prospeccion"; pintar(); } }).catch(function (e) { Of.aviso(e.message, true); });
  }
  $("importar").addEventListener("click", function () { $("importar-archivo").click(); });
  $("importar-archivo").addEventListener("change", function () {
    var f = this.files[0]; this.value = "";
    if (!f) return;
    f.text().then(function (t) {
      var lista;
      try { lista = /\.json$/i.test(f.name) || /^\s*[\[{]/.test(t) ? JSON.parse(t) : leerCsv(t); } catch (e) { Of.aviso("No se ha podido leer el archivo.", true); return; }
      if (lista && !Array.isArray(lista)) lista = lista.contactos || [];
      importar(lista || []);
    });
  });
  $("pestanas").addEventListener("click", function (e) { var b = e.target.closest("[data-etapa]"); if (b) { estado.etapa = b.getAttribute("data-etapa"); guardarPref(); pintar(); } });
  document.querySelector(".vista-cambio").addEventListener("click", function (e) { var b = e.target.closest("[data-vista]"); if (b) { estado.vista = b.getAttribute("data-vista"); guardarPref(); pintar(); } });
  $("lista").addEventListener("click", function (e) {
    if (e.target.closest("a")) return;
    var tr = e.target.closest("tr[data-id]");
    if (tr) location.href = "/ficha.html?id=" + encodeURIComponent(tr.getAttribute("data-id"));
  });

  // Tablero: arrastrar una tarjeta a otra columna cambia la etapa.
  var arrastrado = null;
  $("tablero").addEventListener("dragstart", function (e) {
    var t = e.target.closest(".tarjeta-c"); if (!t) return;
    arrastrado = t.getAttribute("data-id"); t.classList.add("arrastrando");
    e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", arrastrado);
  });
  $("tablero").addEventListener("dragend", function () { arrastrado = null; document.querySelectorAll(".arrastrando, .es-destino").forEach(function (x) { x.classList.remove("arrastrando", "es-destino"); }); });
  $("tablero").addEventListener("dragover", function (e) {
    var col = e.target.closest(".columna"); if (!col || !arrastrado) return;
    e.preventDefault();
    document.querySelectorAll(".es-destino").forEach(function (x) { if (x !== col) x.classList.remove("es-destino"); });
    col.classList.add("es-destino");
  });
  $("tablero").addEventListener("drop", function (e) {
    var col = e.target.closest(".columna"); if (!col || !arrastrado) return;
    e.preventDefault();
    var c = todos.filter(function (x) { return x.id === arrastrado; })[0];
    var etapa = col.getAttribute("data-etapa");
    if (!c || c.etapa === etapa) return;
    var copia = JSON.parse(JSON.stringify(c)); copia.etapa = etapa;
    if (etapa === "cliente" && Of.fiscalPendiente(copia) && !confirm(Of.titulo(c) + " todavía no tiene un NIF-IVA válido en VIES. Sin él, su factura tendría que llevar el 25 % de IVA danés.\n\n¿Pasarlo a cliente igualmente?")) return;
    Of.api("/api/contactos/" + encodeURIComponent(c.id), { method: "PUT", body: copia }).then(function (g) {
      todos = todos.map(function (x) { return x.id === g.id ? g : x; });
      pintar(); Of.aviso(Of.titulo(g) + ": " + Of.nombre(Of.ETAPAS, etapa));
    }).catch(function (err) { Of.aviso(err.message, true); });
  });

  Of.api("/api/contactos").then(function (lista) { todos = lista; pintar(); }).catch(function (e) { Of.aviso(e.message, true); });
})();
