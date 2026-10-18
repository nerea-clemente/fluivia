/* Fluivia · interacción básica de la web */
(function () {
  "use strict";

  /* ---- Configuración de los formularios ---- */
  var CONFIG = {
    /* Los formularios van a Netlify Forms (como en Study and Beyond). Netlify los
       guarda, y netlify/functions/submission-created.mjs manda la demo por correo
       y pasa el contacto a la Oficina. Si el envío falla (por ejemplo, en una
       copia de la web que no está en Netlify), se abre el correo del visitante. */
    NETLIFY_FORMS: true,
    CONTACT_EMAIL: "hola@fluivia.es",
    /* CITA_URL: enlace de reserva de llamadas (por ejemplo, la página de citas
       de Google Calendar). Si se deja vacío, el botón lleva a Contacto. */
    CITA_URL: ""
  };

  // Envío a Netlify Forms: el formulario entero, codificado como lo espera Netlify.
  var enviarANetlify = function (form, extra) {
    var datos = new URLSearchParams(new FormData(form));
    Object.keys(extra || {}).forEach(function (k) { datos.set(k, extra[k]); });
    return fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: datos.toString() })
      .then(function (res) { if (!res.ok) throw new Error(res.status); });
  };

  /* ---- Textos en cada idioma (según <html lang>) ---- */
  var IDIOMA = (document.documentElement.lang || "es").slice(0, 2);
  var TEXTOS = {
    es: {
      abrirMenu: "Abrir menú", cerrarMenu: "Cerrar menú",
      nombre: "Indica tu nombre.", email: "Escribe un correo válido.",
      mensaje: "Cuéntanos brevemente qué te gustaría simplificar.", privacidad: "Necesitamos que aceptes la política de privacidad.",
      negocio: "Indica el nombre de tu negocio.", sector: "Elige tu sector.",
      enviado: "¡Gracias! Hemos recibido tu mensaje y te responderemos pronto.",
      errorEnvio: "No hemos podido enviar el mensaje. Inténtalo de nuevo o escríbenos a {email}.",
      correoAbierto: "Se ha abierto tu programa de correo con el mensaje preparado. Solo tienes que enviarlo.",
      asuntoContacto: "Consulta desde la web · {nombre}",
      etNombre: "Nombre", etEmpresa: "Empresa", etCorreo: "Correo", etTelefono: "Teléfono", etSector: "Sector", etNegocio: "Negocio",
      demoLista: "¡Listo! En unos minutos te llega la demo a {email}. Si no la ves, mira en la carpeta de correo no deseado.",
      demoError: "No hemos podido enviarla. Inténtalo de nuevo en un momento o escríbenos a {email}.",
      demoQuiero: "Quiero ver la demo.", demoAsunto: "Quiero ver la demo · {negocio}",
      demoCorreoAbierto: "Se ha abierto tu programa de correo con la petición preparada. Envíala y te mandamos la demo.",
      interes: "Me interesa «{x}». "
    },
    en: {
      abrirMenu: "Open menu", cerrarMenu: "Close menu",
      nombre: "Please enter your name.", email: "Please enter a valid email address.",
      mensaje: "Tell us briefly what you would like to simplify.", privacidad: "Please accept the privacy policy.",
      negocio: "Please enter the name of your business.", sector: "Please choose your industry.",
      enviado: "Thank you! We have received your message and will get back to you soon.",
      errorEnvio: "We couldn't send your message. Please try again or write to us at {email}.",
      correoAbierto: "Your email program has opened with the message ready. You just need to send it.",
      asuntoContacto: "Enquiry from the website · {nombre}",
      etNombre: "Name", etEmpresa: "Company", etCorreo: "Email", etTelefono: "Phone", etSector: "Industry", etNegocio: "Business",
      demoLista: "Done! The demo will reach {email} in a few minutes. If you can't see it, check your spam folder.",
      demoError: "We couldn't send it. Please try again in a moment or write to us at {email}.",
      demoQuiero: "I'd like to see the demo.", demoAsunto: "I'd like to see the demo · {negocio}",
      demoCorreoAbierto: "Your email program has opened with the request ready. Send it and we'll send you the demo.",
      interes: "I'm interested in “{x}”. "
    },
    da: {
      abrirMenu: "Åbn menu", cerrarMenu: "Luk menu",
      nombre: "Skriv dit navn.", email: "Skriv en gyldig e-mailadresse.",
      mensaje: "Fortæl kort, hvad du gerne vil gøre nemmere.", privacidad: "Du skal acceptere privatlivspolitikken.",
      negocio: "Skriv navnet på din virksomhed.", sector: "Vælg din branche.",
      enviado: "Tak! Vi har modtaget din besked og vender tilbage hurtigst muligt.",
      errorEnvio: "Vi kunne ikke sende beskeden. Prøv igen, eller skriv til os på {email}.",
      correoAbierto: "Dit mailprogram er åbnet med beskeden klar. Du skal bare sende den.",
      asuntoContacto: "Henvendelse fra hjemmesiden · {nombre}",
      etNombre: "Navn", etEmpresa: "Virksomhed", etCorreo: "E-mail", etTelefono: "Telefon", etSector: "Branche", etNegocio: "Virksomhed",
      demoLista: "Så er det klaret! Demoen kommer til {email} om få minutter. Kan du ikke se den, så tjek din spam-mappe.",
      demoError: "Vi kunne ikke sende den. Prøv igen om lidt, eller skriv til os på {email}.",
      demoQuiero: "Jeg vil gerne se demoen.", demoAsunto: "Jeg vil gerne se demoen · {negocio}",
      demoCorreoAbierto: "Dit mailprogram er åbnet med forespørgslen klar. Send den, så sender vi dig demoen.",
      interes: "Jeg er interesseret i »{x}«. "
    }
  };
  var T = TEXTOS[IDIOMA] || TEXTOS.es;
  var t = function (clave, datos) {
    return String(T[clave] || TEXTOS.es[clave] || "").replace(/\{(\w+)\}/g, function (m, k) { return datos && k in datos ? datos[k] : m; });
  };

  /* ---- Cabecera: borde al hacer scroll ---- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Menú móvil ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.querySelector(".sr-only").textContent = open ? t("cerrarMenu") : t("abrirMenu");
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---- Pestañas de sectores (patrón ARIA tabs) ---- */
  document.querySelectorAll("[data-tabs]").forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
      });
      if (focus) tab.focus();
      tab.scrollIntoView({ block: "nearest", inline: "nearest" });
    };
    // Abrir la pestaña indicada en la URL (p. ej. sectores.html#inmobiliarias)
    var fromHash = function () {
      var id = window.location.hash.slice(1);
      var target = id && tabs.filter(function (t) { return t.id === "tab-" + id || t.id === "stab-" + id; })[0];
      if (target) {
        select(target, false);
        root.scrollIntoView({ block: "start" });
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = tabs[(i + 1) % tabs.length];
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === "Home") next = tabs[0];
        else if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
  });

  /* ---- Índice de sectores: resaltar el sector visible ---- */
  var sectorLinks = document.querySelectorAll(".sector-index a");
  if (sectorLinks.length && "IntersectionObserver" in window) {
    var markActive = function (id) {
      sectorLinks.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + id;
        a.classList.toggle("is-active", on);
        if (on) a.scrollIntoView({ block: "nearest", inline: "nearest" });
      });
    };
    var sectorIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) markActive(entry.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll(".sector-block").forEach(function (el) { sectorIO.observe(el); });
    markActive("gestorias");
  }

  /* ---- Aparición suave al hacer scroll ---- */
  var revealTargets = document.querySelectorAll(
    ".section-head, .pains li, .service, .build, .chain, .step, .value, .plan, .faq, .contact-form"
  );
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    revealTargets.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 3) * 60 + "ms";
      io.observe(el);
    });
  }

  /* ---- Formulario de contacto ---- */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    var messages = {
      nombre: t("nombre"),
      email: t("email"),
      mensaje: t("mensaje"),
      privacidad: t("privacidad")
    };

    var setError = function (input, msg) {
      var field = input.closest(".field");
      var existing = field.querySelector(".field-error");
      if (existing) existing.remove();
      field.classList.toggle("has-error", !!msg);
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (msg) {
        var p = document.createElement("p");
        p.className = "field-error";
        p.id = input.id + "-error";
        p.textContent = msg;
        field.appendChild(p);
        input.setAttribute("aria-describedby", p.id);
      } else {
        input.removeAttribute("aria-describedby");
      }
    };

    var validate = function () {
      var firstInvalid = null;
      Object.keys(messages).forEach(function (name) {
        var input = form.elements[name];
        var valid = input.type === "checkbox" ? input.checked : input.value.trim() !== "" && input.checkValidity();
        setError(input, valid ? "" : messages[name]);
        if (!valid && !firstInvalid) firstInvalid = input;
      });
      return firstInvalid;
    };

    // Los enlaces «Me interesa» llevan el nombre en español; aquí se traduce.
    var PRODUCTOS = {
      en: { "Consultas en orden": "Enquiries, sorted", "Citas sin llamadas": "Bookings without calls", "Documentos sin perseguir": "Documents without chasing", "Oficina digital": "Digital office", "Ver una demo": "See a demo" },
      da: { "Consultas en orden": "Styr på henvendelserne", "Citas sin llamadas": "Booking uden opkald", "Documentos sin perseguir": "Dokumenter uden rykkere", "Oficina digital": "Digitalt kontor", "Ver una demo": "Se en demo" }
    };

    // Si se llega desde «Me interesa», prepara el mensaje con el producto
    try {
      var interes = new URLSearchParams(window.location.search).get("interes");
      if (interes && !form.elements.mensaje.value) {
        var nombres = PRODUCTOS[IDIOMA] || {};
        form.elements.mensaje.value = t("interes", { x: nombres[interes] || interes });
      }
    } catch (err) { /* navegador sin URLSearchParams */ }

    form.addEventListener("input", function (e) {
      if (e.target.getAttribute("aria-invalid") === "true") validate();
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      status.textContent = "";

      var invalid = validate();
      if (invalid) { invalid.focus(); return; }

      var data = new FormData(form);
      var done = function () {
        form.reset();
        status.className = "form-status is-ok";
        status.textContent = t("enviado");
      };

      var porCorreo = function () {
      var body = [
        t("etNombre") + ": " + data.get("nombre"),
        t("etEmpresa") + ": " + (data.get("empresa") || "-"),
        t("etCorreo") + ": " + data.get("email"),
        t("etTelefono") + ": " + (data.get("telefono") || "-"),
        t("etSector") + ": " + (form.elements.sector.value ? form.elements.sector.options[form.elements.sector.selectedIndex].text : "-"),
        "",
        data.get("mensaje")
      ].join("\n");
      window.location.href = "mailto:" + CONFIG.CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(t("asuntoContacto", { nombre: data.get("nombre") })) +
        "&body=" + encodeURIComponent(body);
      status.className = "form-status is-ok";
      status.textContent = t("correoAbierto");
      };

      if (!CONFIG.NETLIFY_FORMS) { porCorreo(); return; }
      var button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      enviarANetlify(form)
        .then(done)
        .catch(porCorreo)
        .finally(function () { button.disabled = false; });
    });
  }

  /* ---- Pedir una demo ---- */
  var cita = document.getElementById("demo-cita");
  if (cita && /^https:\/\//.test(CONFIG.CITA_URL)) {
    cita.href = CONFIG.CITA_URL;
    cita.target = "_blank";
    cita.rel = "noopener";
  }

  var demoForm = document.getElementById("demo-form");
  if (demoForm) {
    var demoStatus = document.getElementById("demo-status");
    var demoMessages = {
      nombre: t("nombre"),
      email: t("email"),
      negocio: t("negocio"),
      sector: t("sector"),
      privacidad: t("privacidad")
    };
    var abierto = Date.now();

    // Si se llega desde Sectores, deja elegido el sector
    try {
      var sectorUrl = new URLSearchParams(window.location.search).get("sector");
      if (sectorUrl && demoForm.elements.sector.querySelector('option[value="' + sectorUrl.replace(/[^a-z]/g, "") + '"]')) {
        demoForm.elements.sector.value = sectorUrl;
      }
    } catch (err) { /* navegador sin URLSearchParams */ }

    var demoError = function (input, msg) {
      var field = input.closest(".field");
      var existing = field.querySelector(".field-error");
      if (existing) existing.remove();
      field.classList.toggle("has-error", !!msg);
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (msg) {
        var p = document.createElement("p");
        p.className = "field-error";
        p.id = input.id + "-error";
        p.textContent = msg;
        field.appendChild(p);
        input.setAttribute("aria-describedby", p.id);
      } else {
        input.removeAttribute("aria-describedby");
      }
    };
    var demoValidate = function () {
      var first = null;
      Object.keys(demoMessages).forEach(function (name) {
        var input = demoForm.elements[name];
        var valid = input.type === "checkbox" ? input.checked : input.value.trim() !== "" && input.checkValidity();
        demoError(input, valid ? "" : demoMessages[name]);
        if (!valid && !first) first = input;
      });
      return first;
    };

    demoForm.addEventListener("input", function (e) {
      if (e.target.getAttribute("aria-invalid") === "true") demoValidate();
    });

    demoForm.addEventListener("submit", function (e) {
      e.preventDefault();
      demoStatus.className = "form-status";
      demoStatus.textContent = "";
      var invalid = demoValidate();
      if (invalid) { invalid.focus(); return; }

      var datos = {
        nombre: demoForm.elements.nombre.value.trim(),
        email: demoForm.elements.email.value.trim(),
        negocio: demoForm.elements.negocio.value.trim(),
        sector: demoForm.elements.sector.value,
        web: demoForm.elements.web.value,
        idioma: IDIOMA,
        segundos: Math.round((Date.now() - abierto) / 1000)
      };
      var hecho = function () {
        demoForm.reset();
        demoStatus.className = "form-status is-ok";
        demoStatus.textContent = t("demoLista", { email: datos.email });
      };

      var demoPorCorreo = function () {
      var cuerpo = [
        t("demoQuiero"),
        "",
        t("etNombre") + ": " + datos.nombre,
        t("etNegocio") + ": " + datos.negocio,
        t("etSector") + ": " + demoForm.elements.sector.options[demoForm.elements.sector.selectedIndex].text,
        t("etCorreo") + ": " + datos.email
      ].join("\n");
      window.location.href = "mailto:" + CONFIG.CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(t("demoAsunto", { negocio: datos.negocio })) +
        "&body=" + encodeURIComponent(cuerpo);
      demoStatus.className = "form-status is-ok";
      demoStatus.textContent = t("demoCorreoAbierto");
      };

      // Envío en menos de 3 segundos: un bot. Se le da por bueno sin enviar nada.
      if (datos.segundos < 3) { hecho(); return; }
      if (!CONFIG.NETLIFY_FORMS) { demoPorCorreo(); return; }
      var boton = demoForm.querySelector('button[type="submit"]');
      boton.disabled = true;
      enviarANetlify(demoForm)
        .then(hecho)
        .catch(demoPorCorreo)
        .finally(function () { boton.disabled = false; });
    });
  }

  /* ---- Año actual en el pie ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

// Selector de idioma: se cierra al pulsar fuera o con Escape.
(function () {
  var menus = document.querySelectorAll(".lang-menu");
  if (!menus.length) return;
  document.addEventListener("click", function (e) {
    menus.forEach(function (m) { if (m.open && !m.contains(e.target)) m.open = false; });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    menus.forEach(function (m) { if (m.open) { m.open = false; m.querySelector("summary").focus(); } });
  });
})();
