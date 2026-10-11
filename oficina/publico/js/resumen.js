/* Oficina de Fluivia · resumen */
(function () {
  "use strict";
  var Of = window.Of, esc = Of.esc;
  Of.cabecera("resumen");

  var h = new Date().getHours();
  document.getElementById("saludo").textContent = h < 14 ? "Buenos días" : h < 21 ? "Buenas tardes" : "Buenas noches";
  document.getElementById("fecha").textContent = new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "long" }).format(new Date());

  Of.api("/api/contactos").then(function (lista) {
    var hoy = Of.hoy();
    var activos = lista.filter(function (c) { return c.etapa !== "cliente" && c.etapa !== "perdido"; });
    var toca = activos.filter(function (c) { return c.proxima && c.proxima.fecha && c.proxima.fecha <= hoy; })
      .sort(function (a, b) { return a.proxima.fecha < b.proxima.fecha ? -1 : 1; });
    var semana = Of.masDias(-7);
    var nuevos = lista.filter(function (c) { return (c.creado || "").slice(0, 10) >= semana; });
    var propuesta = lista.filter(function (c) { return c.etapa === "propuesta"; });
    var clientes = lista.filter(function (c) { return c.etapa === "cliente"; });
    var cuotas = clientes.reduce(function (s, c) { return s + (c.cuota || 0); }, 0);
    var enJuego = propuesta.reduce(function (s, c) { return s + (c.implantacion || 0); }, 0);

    document.getElementById("kpis").innerHTML = [
      [String(nuevos.length), "contactos nuevos en 7 días"],
      [String(activos.length), "en marcha"],
      [Of.euros(enJuego), "en propuestas (" + propuesta.length + ")"],
      [Of.euros(cuotas) + "/mes", "en cuotas de " + clientes.length + (clientes.length === 1 ? " cliente" : " clientes")]
    ].map(function (k) { return '<div class="kpi"><strong>' + esc(k[0]) + "</strong><span>" + esc(k[1]) + "</span></div>"; }).join("");

    document.getElementById("toca-n").textContent = toca.length ? toca.length + (toca.length === 1 ? " contacto" : " contactos") : "";
    document.getElementById("toca").innerHTML = toca.length ? toca.map(function (c) {
      return '<li><div class="toca-txt"><a href="/ficha.html?id=' + encodeURIComponent(c.id) + '"><strong>' + esc(Of.titulo(c)) + "</strong></a>" +
        "<span>" + esc(c.proxima.texto || "Sin detalle") + (Of.subtitulo(c) ? " · " + esc(Of.subtitulo(c)) : "") + "</span></div>" + Of.proxima(c) + Of.etapa(c.etapa) + "</li>";
    }).join("") : '<li><p class="vacio">Nada pendiente para hoy.</p></li>';

    var max = Math.max(1, Math.max.apply(null, Of.ETAPAS.map(function (e) { return lista.filter(function (c) { return c.etapa === e[0]; }).length; })));
    document.getElementById("embudo").innerHTML = Of.ETAPAS.map(function (e) {
      var n = lista.filter(function (c) { return c.etapa === e[0]; }).length;
      return '<li><span>' + esc(e[1]) + '</span><span class="embudo-barra"><i style="width:' + Math.round(n / max * 100) + '%"></i></span><strong>' + n + "</strong></li>";
    }).join("");

    var web = lista.map(function (c) {
      var ult = (c.historial || []).filter(function (x) { return x.tipo === "web" || x.tipo === "demo"; }).pop();
      return ult ? { c: c, h: ult } : null;
    }).filter(Boolean).sort(function (a, b) { return a.h.fecha < b.h.fecha ? 1 : -1; }).slice(0, 6);
    document.getElementById("recientes").innerHTML = web.length ? web.map(function (x) {
      return '<li><a href="/ficha.html?id=' + encodeURIComponent(x.c.id) + '">' + esc(Of.titulo(x.c)) + '</a><span class="tenue">' + (x.h.tipo === "demo" ? "Pidió la demo" : "Escribió") + " · " + esc(Of.momento(x.h.fecha)) + "</span></li>";
    }).join("") : '<li><p class="tenue">Todavía no ha llegado nadie desde la web.</p></li>';
  }).catch(function (e) { Of.aviso(e.message, true); });
})();
