/* Oficina de Fluivia · ficha de un contacto */
(function () {
  "use strict";
  var Of = window.Of, esc = Of.esc;
  Of.cabecera("contactos");

  var $ = function (id) { return document.getElementById(id); };
  var form = $("ficha");
  var params = new URLSearchParams(location.search);
  var id = params.get("id");
  var nuevo = !id;
  var c = null;          // la versión guardada
  var etapa = "nuevo";
  var sucio = false;
  var plantillas = [];

  if (nuevo) id = "c-" + Date.now().toString(36) + "-" + Math.floor(Math.random() * 1e9).toString(36);

  // ---- Opciones de los desplegables ----
  form.elements.sector.insertAdjacentHTML("beforeend", Of.SECTORES.map(function (s) { return '<option value="' + s[0] + '">' + esc(s[1]) + "</option>"; }).join(""));
  form.elements.origen.innerHTML = Of.ORIGENES.map(function (s) { return '<option value="' + s[0] + '">' + esc(s[1]) + "</option>"; }).join("");
  $("intereses").innerHTML = Of.INTERESES.map(function (s) { return '<label class="opcion"><input type="checkbox" name="intereses" value="' + s[0] + '">' + esc(s[1]) + "</label>"; }).join("");
  $("apunte-tipo").innerHTML = Of.TIPOS.filter(function (t) { return ["nota", "llamada", "reunion", "whatsapp", "linkedin", "correo"].indexOf(t[0]) > -1; })
    .map(function (t) { return '<option value="' + t[0] + '">' + esc(t[0] === "correo" ? "Correo enviado desde fuera" : t[1]) + "</option>"; }).join("");

  // ---- Estado de guardado ----
  function marcar(s) {
    sucio = s;
    $("estado-guardado").textContent = s ? "Cambios sin guardar" : "Sin cambios";
    $("estado-guardado").classList.toggle("es-sucio", s);
  }
  form.addEventListener("input", function (e) { if (!e.target.closest("#apuntar-caja, #correo-caja, #demo-caja")) marcar(true); });
  window.addEventListener("beforeunload", function (e) { if (sucio) { e.preventDefault(); e.returnValue = ""; } });

  function pintarEtapas() {
    $("etapas").innerHTML = Of.ETAPAS.map(function (e) { return '<button type="button" data-etapa="' + e[0] + '" aria-pressed="' + (etapa === e[0]) + '">' + esc(e[1]) + "</button>"; }).join("");
    $("motivo-campo").hidden = etapa !== "perdido";
    $("etapa-chip").innerHTML = Of.etapa(etapa);
  }
  $("etapas").addEventListener("click", function (e) {
    var b = e.target.closest("[data-etapa]"); if (!b) return;
    etapa = b.getAttribute("data-etapa");
    if (etapa === "cliente" || etapa === "perdido") { form.elements.proxima_fecha.value = ""; form.elements.proxima_texto.value = ""; }
    pintarEtapas(); marcar(true);
  });

  $("proxima-rapida").addEventListener("click", function (e) {
    var b = e.target.closest("[data-dias]"); if (!b) return;
    var d = b.getAttribute("data-dias");
    if (d === "quitar") { form.elements.proxima_fecha.value = ""; form.elements.proxima_texto.value = ""; }
    else { form.elements.proxima_fecha.value = Of.masDias(+d); if (!form.elements.proxima_texto.value) form.elements.proxima_texto.focus(); }
    marcar(true);
  });

  // ---- Leer y escribir el formulario ----
  function rellenar(x) {
    ["empresa", "nombre", "cargo", "email", "telefono", "ciudad", "web", "notas", "motivo"].forEach(function (k) { form.elements[k].value = x[k] || ""; });
    form.elements.sector.value = x.sector || "";
    form.elements.origen.value = x.origen || "manual";
    form.elements.etiquetas.value = (x.etiquetas || []).join(", ");
    form.elements.implantacion.value = x.implantacion || "";
    form.elements.cuota.value = x.cuota || "";
    form.elements.proxima_fecha.value = (x.proxima && x.proxima.fecha) || "";
    form.elements.proxima_texto.value = (x.proxima && x.proxima.texto) || "";
    form.querySelectorAll('input[name="intereses"]').forEach(function (i) { i.checked = (x.intereses || []).indexOf(i.value) > -1; });
    etapa = x.etapa || "nuevo";
    $("mensaje-campo").hidden = !x.mensaje;
    $("mensaje").textContent = x.mensaje || "";
  }
  function leer() {
    var d = c ? JSON.parse(JSON.stringify(c)) : { historial: [], etapas: {} };
    ["empresa", "nombre", "cargo", "email", "telefono", "ciudad", "web", "notas", "motivo", "sector", "origen"].forEach(function (k) { d[k] = form.elements[k].value.trim(); });
    d.etiquetas = form.elements.etiquetas.value.split(",").map(function (t) { return t.trim(); }).filter(Boolean);
    d.implantacion = +form.elements.implantacion.value || 0;
    d.cuota = +form.elements.cuota.value || 0;
    d.proxima = { fecha: form.elements.proxima_fecha.value, texto: form.elements.proxima_texto.value.trim() };
    d.intereses = Array.prototype.map.call(form.querySelectorAll('input[name="intereses"]:checked'), function (i) { return i.value; });
    d.etapa = etapa;
    return d;
  }

  function pintarTodo() {
    $("titulo").textContent = nuevo ? "Nuevo contacto" : Of.titulo(c);
    document.title = (nuevo ? "Nuevo contacto" : Of.titulo(c)) + " · Oficina de Fluivia";
    pintarEtapas();
    $("borrar").hidden = nuevo;
    ["apuntar-caja", "demo-caja", "historial-caja"].forEach(function (k) { $(k).hidden = nuevo; });
    $("correo-caja").hidden = nuevo || !c.email || c.noEscribir;
    if (!nuevo) {
      $("correo-a").textContent = "a " + c.email;
      $("demo-enviada").textContent = c.demo ? "Pidió la demo desde la web el " + Of.momento(c.demo.fecha) + "." : "";
      pintarHistorial();
      cargarPlantillas();
    }
  }

  var ICONO_TIPO = { nota: "nota", llamada: "llamada", correo: "correo", reunion: "reunion", whatsapp: "whatsapp", linkedin: "linkedin", web: "web", etapa: "etapa", demo: "demo" };
  function pintarHistorial() {
    var h = (c.historial || []).slice().reverse();
    $("historial").innerHTML = h.length ? h.map(function (x) {
      return '<li class="hist-' + esc(x.tipo) + '"><span class="hist-ic">' + Of.icono(ICONO_TIPO[x.tipo] || "nota") + "</span><div>" +
        '<p class="hist-meta">' + esc(Of.nombre(Of.TIPOS, x.tipo)) + " · " + esc(Of.momento(x.fecha)) + (x.autor && x.autor !== "web" ? " · " + esc(x.autor) : "") + "</p>" +
        (x.asunto ? '<p class="hist-asunto">' + esc(x.asunto) + "</p>" : "") +
        '<p class="hist-txt">' + esc(x.texto) + "</p></div></li>";
    }).join("") : '<li><p class="tenue">Sin movimientos todavía.</p></li>';
  }

  function cargarPlantillas() {
    Of.api("/api/plantillas?contacto=" + encodeURIComponent(id)).then(function (r) {
      plantillas = r.plantillas;
      $("demo-enlace").value = r.demo; $("abrir-demo").href = r.demo;
      var sel = $("plantilla"), actual = sel.value;
      sel.innerHTML = '<option value="">Correo en blanco</option>' + plantillas.map(function (p) { return '<option value="' + esc(p.k) + '">' + esc(p.nombre) + "</option>"; }).join("");
      sel.value = actual;
    }).catch(function () {});
  }
  $("plantilla").addEventListener("change", function () {
    var p = plantillas.filter(function (x) { return x.k === this.value; }, this)[0];
    if (($("correo-asunto").value || $("correo-texto").value) && !confirm("¿Cambiar el texto que has escrito por el de la plantilla?")) return;
    $("correo-asunto").value = p ? p.asunto : ""; $("correo-texto").value = p ? p.texto : "";
  });

  // ---- Guardar ----
  function guardar() {
    var d = leer();
    if (!d.nombre && !d.empresa && !d.email) { Of.aviso("Pon al menos la empresa, la persona o el correo.", true); return Promise.reject(); }
    if (d.email && !form.elements.email.checkValidity()) { Of.aviso("El correo no es válido.", true); form.elements.email.focus(); return Promise.reject(); }
    $("guardar").disabled = true;
    return Of.api("/api/contactos/" + encodeURIComponent(id), { method: "PUT", body: d }).then(function (g) {
      c = g; marcar(false);
      if (nuevo) { nuevo = false; history.replaceState(null, "", "/ficha.html?id=" + encodeURIComponent(id)); }
      rellenar(c); pintarTodo();
      Of.aviso("Guardado");
      return g;
    }).catch(function (e) {
      if (e && e.datos && e.datos.id && e.status === 409 && e.datos.error.indexOf("email") > -1) {
        Of.aviso(e.message, true);
        if (confirm(e.message + ". ¿Quieres abrir esa ficha?")) location.href = "/ficha.html?id=" + encodeURIComponent(e.datos.id);
      } else if (e) Of.aviso(e.message, true);
      throw e;
    }).finally(function () { $("guardar").disabled = false; });
  }
  $("guardar").addEventListener("click", function () { guardar().catch(function () {}); });
  document.addEventListener("keydown", function (e) { if ((e.metaKey || e.ctrlKey) && e.key === "s") { e.preventDefault(); guardar().catch(function () {}); } });

  // ---- Apuntar algo en el historial ----
  $("apuntar").addEventListener("click", function () {
    var texto = $("apunte-texto").value.trim();
    if (!texto) { Of.aviso("Escribe qué ha pasado.", true); $("apunte-texto").focus(); return; }
    c.historial = (c.historial || []).concat([{ fecha: new Date().toISOString(), tipo: $("apunte-tipo").value, texto: texto }]);
    // Si estaba en «nuevo» y ya le has escrito o llamado, pasa a «contactado».
    if (etapa === "nuevo" && $("apunte-tipo").value !== "nota") { etapa = "contactado"; pintarEtapas(); }
    guardar().then(function () { $("apunte-texto").value = ""; }).catch(function () {});
  });

  // ---- Enviar un correo ----
  $("enviar-correo").addEventListener("click", function () {
    var asunto = $("correo-asunto").value.trim(), texto = $("correo-texto").value.trim();
    if (!asunto || !texto) { Of.aviso("Falta el asunto o el texto.", true); return; }
    var envio = function () {
      if (!confirm("¿Enviar este correo a " + c.email + "?")) return;
      var b = $("enviar-correo"); b.disabled = true;
      Of.api("/api/contactos/" + encodeURIComponent(id) + "/correo", { method: "POST", body: { asunto: asunto, texto: texto } }).then(function (g) {
        c = g;
        $("correo-asunto").value = ""; $("correo-texto").value = ""; $("plantilla").value = "";
        Of.aviso("Correo enviado");
        if (etapa === "nuevo") { etapa = "contactado"; pintarEtapas(); marcar(true); guardar().catch(function () {}); }
        else pintarHistorial();
      }).catch(function (e) { Of.aviso(e.message, true); }).finally(function () { b.disabled = false; });
    };
    // Antes de enviar, se guarda lo que haya cambiado (el correo usa los datos guardados).
    if (sucio) guardar().then(envio).catch(function () {}); else envio();
  });

  $("copiar-demo").addEventListener("click", function () {
    var v = $("demo-enlace").value;
    (navigator.clipboard ? navigator.clipboard.writeText(v) : Promise.reject()).then(function () { Of.aviso("Enlace copiado"); }, function () { $("demo-enlace").select(); Of.aviso("Cópialo con Ctrl+C"); });
  });

  $("borrar").addEventListener("click", function () {
    if (!confirm("¿Borrar a " + Of.titulo(c) + " y todo su historial? No se puede deshacer.")) return;
    Of.api("/api/contactos/" + encodeURIComponent(id), { method: "DELETE" }).then(function () { sucio = false; location.href = "/contactos.html"; })
      .catch(function (e) { Of.aviso(e.message, true); });
  });

  // ---- Arranque ----
  if (nuevo) { rellenar({ origen: "prospeccion", etapa: "nuevo" }); pintarTodo(); form.elements.empresa.focus(); }
  else {
    Of.api("/api/contactos/" + encodeURIComponent(id)).then(function (x) { c = x; rellenar(c); pintarTodo(); })
      .catch(function (e) { $("titulo").textContent = "No se ha encontrado este contacto"; form.hidden = true; document.querySelector(".barra-guardar").hidden = true; Of.aviso(e.message, true); });
  }
})();
