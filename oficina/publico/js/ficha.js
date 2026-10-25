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
  form.elements.pais.innerHTML = Of.PAISES.map(function (s) { return '<option value="' + s[0] + '">' + esc(s[1]) + "</option>"; }).join("");
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
    var nueva = b.getAttribute("data-etapa");
    if (nueva === "cliente" && etapa !== "cliente" && Of.fiscalPendiente(Object.assign(leer(), { etapa: "cliente", vies: c && c.vies }))) {
      if (!confirm("Todavía no tiene un NIF-IVA válido en VIES. Sin él, su factura tendría que llevar el 25 % de IVA danés.\n\n¿Pasarlo a cliente igualmente?")) return;
    }
    etapa = nueva;
    if (etapa === "cliente" || etapa === "perdido") { form.elements.proxima_fecha.value = ""; form.elements.proxima_texto.value = ""; }
    pintarEtapas(); pintarFiscal(); marcar(true);
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
    ["empresa", "nombre", "cargo", "email", "telefono", "ciudad", "web", "linkedin", "notas", "motivo", "nif", "razonSocial", "direccion"].forEach(function (k) { form.elements[k].value = x[k] || ""; });
    $("abrir-linkedin").hidden = !x.linkedin; if (x.linkedin) $("abrir-linkedin").href = x.linkedin;
    $("fuente").hidden = !x.fuente; $("fuente").textContent = x.fuente ? "Datos sacados de: " + x.fuente : "";
    form.elements.pais.value = x.pais || "ES";
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
    ["empresa", "nombre", "cargo", "email", "telefono", "ciudad", "web", "linkedin", "notas", "motivo", "sector", "origen", "pais", "nif", "razonSocial", "direccion"].forEach(function (k) { d[k] = form.elements[k].value.trim(); });
    d.fuente = (c && c.fuente) || "";
    d.etiquetas = form.elements.etiquetas.value.split(",").map(function (t) { return t.trim(); }).filter(Boolean);
    d.implantacion = +form.elements.implantacion.value || 0;
    d.cuota = +form.elements.cuota.value || 0;
    d.proxima = { fecha: form.elements.proxima_fecha.value, texto: form.elements.proxima_texto.value.trim() };
    d.intereses = Array.prototype.map.call(form.querySelectorAll('input[name="intereses"]:checked'), function (i) { return i.value; });
    d.etapa = etapa;
    return d;
  }

  // ---- Facturación: qué IVA lleva su factura ----
  var nifActual = function () { var v = form.elements.nif.value.toUpperCase().replace(/[^A-Z0-9]/g, ""), p = form.elements.pais.value; if (v && (p === "ES" || p === "DK") && v.indexOf(p) !== 0) v = p + v; return v; };
  function caja(clase, icono, html) { return '<div class="fiscal-caja ' + clase + '">' + Of.icono(icono) + "<div>" + html + "</div></div>"; }
  function pintarFiscal() {
    var pais = form.elements.pais.value, nif = nifActual(), v = c && c.vies, sector = form.elements.sector.value;
    var comprobado = v && v.nif === nif;
    var h = "", chip = "";
    if (pais === "DK") {
      h = caja("fiscal-info", "fiscal", "<p><strong>Cliente en Dinamarca:</strong> su factura lleva el 25 % de <em>moms</em>.</p>");
    } else if (!nif) {
      h = caja("fiscal-pend", "alerta", "<p><strong>Falta el NIF-IVA.</strong> Sin él no se puede facturar sin IVA danés. Usa la plantilla «Pedir los datos para facturar».</p>");
      chip = "pend";
    } else if (!/^[A-Z]{2}[A-Z0-9]{2,13}$/.test(nif)) {
      h = caja("fiscal-mal", "alerta", "<p><strong>El NIF-IVA no tiene buen formato.</strong> Escríbelo con el prefijo del país, por ejemplo ESB12345678.</p>");
      chip = "mal";
    } else if (comprobado && v.estado === "valido") {
      h = caja("fiscal-ok", "check", "<p><strong>Válido en VIES</strong> (comprobado el " + esc(Of.momento(v.fecha)) + ")" + (v.nombre ? ": " + esc(v.nombre) : "") + ".</p><p>Su factura va <strong>sin IVA</strong>, con la mención «Inversión del sujeto pasivo / Reverse charge».</p>");
    } else if (comprobado && v.estado === "no-valido") {
      h = caja("fiscal-mal", "alerta", "<p><strong>No válido en VIES</strong> (comprobado el " + esc(Of.momento(v.fecha)) + ").</p><p>Normalmente es que no está dado de alta en operaciones intracomunitarias (ROI). Pídele que su gestoría lo haga con el modelo 036. Hasta entonces, su factura tendría que llevar el 25 % de IVA danés.</p>");
      chip = "mal";
    } else {
      h = caja("fiscal-pend", "alerta", "<p><strong>Sin comprobar en VIES.</strong> Compruébalo antes de la primera factura.</p>");
      chip = "pend";
    }
    if (pais === "ES" && (sector === "clinica" || sector === "academia")) {
      h += caja("fiscal-info", "fiscal", "<p>La sanidad y la enseñanza suelen estar <strong>exentas de IVA</strong>: el 21 % que declare por tu factura será un coste para él, igual que con un proveedor español. Mejor comentárselo a su gestoría.</p>");
    }
    var acciones = [];
    if (pais !== "DK" && /^[A-Z]{2}[A-Z0-9]{2,13}$/.test(nif)) acciones.push('<button type="button" class="btn btn-sec btn-peq" id="comprobar-vies">' + (comprobado ? "Volver a comprobar en VIES" : "Comprobar en VIES") + "</button>");
    if (comprobado && v.estado === "valido" && ((v.nombre && !form.elements.razonSocial.value) || (v.direccion && !form.elements.direccion.value))) acciones.push('<button type="button" class="btn-texto" id="usar-vies">Usar el nombre y la dirección de VIES</button>');
    if (acciones.length) h += '<div class="fiscal-acciones">' + acciones.join("") + "</div>";
    $("fiscal").innerHTML = h;
    var mostrarChip = chip && (etapa === "propuesta" || etapa === "cliente");
    $("fiscal-chip").innerHTML = mostrarChip ? '<span class="chip chip-fiscal">' + (chip === "mal" ? "NIF-IVA no válido" : "Falta comprobar el NIF-IVA") + "</span>" : "";
  }
  form.elements.pais.addEventListener("change", pintarFiscal);
  form.elements.nif.addEventListener("input", pintarFiscal);
  form.elements.sector.addEventListener("change", pintarFiscal);
  $("fiscal").addEventListener("click", function (e) {
    if (e.target.closest("#usar-vies")) {
      if (!form.elements.razonSocial.value) form.elements.razonSocial.value = c.vies.nombre || "";
      if (!form.elements.direccion.value) form.elements.direccion.value = c.vies.direccion || "";
      marcar(true); pintarFiscal(); return;
    }
    var b = e.target.closest("#comprobar-vies"); if (!b) return;
    if (nuevo) { Of.aviso("Guarda primero el contacto.", true); return; }
    b.disabled = true; b.textContent = "Comprobando…";
    var hacer = function () {
      return Of.api("/api/contactos/" + encodeURIComponent(id) + "/vies", { method: "POST", body: {} }).then(function (g) {
        var r = g.viesResultado; delete g.viesResultado;
        c = g; pintarHistorial(); pintarFiscal();
        Of.aviso(r.estado === "valido" ? "NIF-IVA válido en VIES" : r.estado === "no-valido" ? "NIF-IVA no válido en VIES" : (r.detalle || "VIES no responde ahora. Prueba más tarde."), r.estado !== "valido");
      });
    };
    (sucio ? guardar().then(hacer) : hacer()).catch(function (err) { if (err) Of.aviso(err.message, true); pintarFiscal(); });
  });

  function pintarTodo() {
    $("titulo").textContent = nuevo ? "Nuevo contacto" : Of.titulo(c);
    document.title = (nuevo ? "Nuevo contacto" : Of.titulo(c)) + " · Oficina de Fluivia";
    pintarEtapas();
    pintarFiscal();
    $("borrar").hidden = nuevo;
    ["apuntar-caja", "demo-caja", "historial-caja"].forEach(function (k) { $(k).hidden = nuevo; });
    $("correo-caja").hidden = nuevo || !c.email || c.noEscribir;
    if (!nuevo) {
      $("correo-a").textContent = "Sale desde info@fluivia.ai a " + c.email + ". La prueba te llega a ti.";
      cargarProgramados();
      $("demo-enviada").textContent = c.demo ? "Pidió la demo desde la web el " + Of.momento(c.demo.fecha) + "." : "";
      pintarHistorial();
      cargarPlantillas();
    }
  }

  var ICONO_TIPO = { nota: "nota", llamada: "llamada", correo: "correo", reunion: "reunion", whatsapp: "whatsapp", linkedin: "linkedin", web: "web", etapa: "etapa", demo: "demo", fiscal: "fiscal" };
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

  // ---- Programar el envío ----
  var dos = function (n) { return String(n).padStart(2, "0"); };
  var local = function (d) { return d.getFullYear() + "-" + dos(d.getMonth() + 1) + "-" + dos(d.getDate()) + "T" + dos(d.getHours()) + ":" + dos(d.getMinutes()); };
  $("abrir-programar").addEventListener("click", function () {
    var abierto = $("programar").hidden;
    $("programar").hidden = !abierto; this.setAttribute("aria-expanded", String(abierto));
    if (abierto && !$("correo-cuando").value) { var d = new Date(Date.now() + 864e5); d.setHours(9, 0, 0, 0); $("correo-cuando").value = local(d); }
    $("correo-cuando").min = local(new Date(Date.now() + 2 * 60000));
  });
  $("cuando-rapido").addEventListener("click", function (e) {
    var b = e.target.closest("[data-cuando]"); if (!b) return;
    var p = b.getAttribute("data-cuando").split("|"), d = new Date(), h = p[1].split(":");
    if (p[0] === "lunes") { do { d.setDate(d.getDate() + 1); } while (d.getDay() !== 1); }
    else d.setDate(d.getDate() + Number(p[0]));
    d.setHours(+h[0], +h[1], 0, 0);
    $("correo-cuando").value = local(d);
  });
  $("programar-correo").addEventListener("click", function () {
    var asunto = $("correo-asunto").value.trim(), texto = $("correo-texto").value.trim(), v = $("correo-cuando").value;
    if (!asunto || !texto) { Of.aviso("Falta el asunto o el texto.", true); return; }
    var cuando = v ? new Date(v) : null;
    if (!cuando || isNaN(cuando) || cuando.getTime() < Date.now() + 60000) { Of.aviso("Elige una hora que sea al menos dentro de un minuto.", true); return; }
    var programa = function () {
      var b = $("programar-correo"); b.disabled = true;
      Of.api("/api/contactos/" + encodeURIComponent(id) + "/correo", { method: "POST", body: { asunto: asunto, texto: texto, cuando: cuando.toISOString() } }).then(function () {
        $("correo-asunto").value = ""; $("correo-texto").value = ""; $("plantilla").value = "";
        $("programar").hidden = true; $("abrir-programar").setAttribute("aria-expanded", "false");
        Of.aviso("Programado para el " + Of.momento(cuando.toISOString()));
        cargarProgramados();
      }).catch(function (e) { Of.aviso(e.message, true); }).finally(function () { b.disabled = false; });
    };
    if (sucio) guardar().then(programa).catch(function () {}); else programa();
  });
  function cargarProgramados() {
    Of.api("/api/programados?contacto=" + encodeURIComponent(id)).then(function (l) {
      $("programados-caja").hidden = !l.length;
      $("programados").innerHTML = l.map(function (p) {
        return '<li><div><strong>' + esc(p.asunto) + '</strong></div>' +
          (p.estado === "error" ? '<span class="chip chip-tarde">' + esc(p.error || "No se pudo enviar") + "</span>" : '<span class="chip">' + esc(Of.momento(p.cuando)) + "</span>") +
          '<button type="button" class="btn-texto" data-cancelar="' + esc(p.id) + '">Cancelar</button></li>';
      }).join("");
    }).catch(function () {});
  }
  $("programados").addEventListener("click", function (e) {
    var b = e.target.closest("[data-cancelar]"); if (!b) return;
    if (!confirm("¿Cancelar este correo programado? No se enviará.")) return;
    Of.api("/api/programados/" + encodeURIComponent(b.getAttribute("data-cancelar")), { method: "DELETE" })
      .then(function () { Of.aviso("Correo cancelado"); cargarProgramados(); }).catch(function (err) { Of.aviso(err.message, true); });
  });

  // ---- Enviarte una prueba (no se apunta en el historial) ----
  $("probar-correo").addEventListener("click", function () {
    var asunto = $("correo-asunto").value.trim(), texto = $("correo-texto").value.trim();
    if (!asunto || !texto) { Of.aviso("Falta el asunto o el texto.", true); return; }
    var b = this; b.disabled = true;
    Of.api("/api/contactos/" + encodeURIComponent(id) + "/prueba", { method: "POST", body: { asunto: asunto, texto: texto } })
      .then(function (r) { Of.aviso("Prueba enviada a " + r.a); }).catch(function (e) { Of.aviso(e.message, true); })
      .finally(function () { b.disabled = false; });
  });

  // Copiar el texto (para mandarlo por LinkedIn): luego se apunta en el historial.
  $("copiar-texto").addEventListener("click", function () {
    var v = $("correo-texto").value.trim();
    if (!v) { Of.aviso("No hay texto que copiar.", true); return; }
    (navigator.clipboard ? navigator.clipboard.writeText(v) : Promise.reject()).then(function () {
      Of.aviso("Texto copiado. Cuando lo mandes, apúntalo como «LinkedIn».");
      $("apunte-tipo").value = "linkedin";
      if (!$("apunte-texto").value) $("apunte-texto").value = "Mensaje por LinkedIn: " + ($("correo-asunto").value || "primer contacto") + ".";
    }, function () { $("correo-texto").select(); Of.aviso("Cópialo con Ctrl+C"); });
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
