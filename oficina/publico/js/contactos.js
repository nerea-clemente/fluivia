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
        return '<tr data-id="' + esc(c.id) + '"><td><a href="/ficha.html?id=' + encodeURIComponent(c.id) + '">' + esc(Of.titulo(c)) + "</a><small>" + esc(Of.subtitulo(c)) + "</small></td>" +
          "<td>" + Of.etapa(c.etapa) + "</td>" +
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
          return '<a class="tarjeta-c" draggable="true" data-id="' + esc(c.id) + '" href="/ficha.html?id=' + encodeURIComponent(c.id) + '"><strong>' + esc(Of.titulo(c)) + "</strong><span>" + esc(Of.subtitulo(c)) + "</span>" + Of.proxima(c) + "</a>";
        }).join("") + "</section>";
    }).join("");
  }

  function pintar() {
    $("total").textContent = todos.length + (todos.length === 1 ? " contacto" : " contactos");
    document.querySelectorAll("[data-vista]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-vista") === estado.vista)); });
    pintarPestanas();
    $("lista").hidden = estado.vista !== "lista";
    $("tablero").hidden = estado.vista !== "tablero";
    if (estado.vista === "lista") pintarLista(); else pintarTablero();
  }

  $("buscar").addEventListener("input", function () { estado.texto = this.value; pintar(); });
  $("f-sector").addEventListener("change", function () { estado.sector = this.value; pintar(); });
  $("f-origen").addEventListener("change", function () { estado.origen = this.value; pintar(); });
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
    Of.api("/api/contactos/" + encodeURIComponent(c.id), { method: "PUT", body: copia }).then(function (g) {
      todos = todos.map(function (x) { return x.id === g.id ? g : x; });
      pintar(); Of.aviso(Of.titulo(g) + ": " + Of.nombre(Of.ETAPAS, etapa));
    }).catch(function (err) { Of.aviso(err.message, true); });
  });

  Of.api("/api/contactos").then(function (lista) { todos = lista; pintar(); }).catch(function (e) { Of.aviso(e.message, true); });
})();
