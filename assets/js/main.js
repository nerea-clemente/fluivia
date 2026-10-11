/* Fluivia · interacción básica de la web */
(function () {
  "use strict";

  /* ---- Configuración de los formularios ---- */
  var CONFIG = {
    FORM_ENDPOINT: "",
    CONTACT_EMAIL: "[tu-email@dominio.es]",
    /* Cuando la Oficina esté publicada (carpeta oficina/, ver su LEEME.md):
       FORM_ENDPOINT: "https://oficina.fluivia.es/api/publico/contacto"
       DEMO_ENDPOINT: "https://oficina.fluivia.es/api/publico/demo"
       Así cada mensaje y cada demo pedida entran solos en tus contactos.
       Mientras estén vacíos, los formularios abren el correo del visitante.
       CITA_URL: enlace de reserva de llamadas (por ejemplo, la página de citas
       de Google Calendar). Si se deja vacío, el botón lleva a Contacto. */
    DEMO_ENDPOINT: "",
    CITA_URL: ""
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
      toggle.querySelector(".sr-only").textContent = open ? "Cerrar menú" : "Abrir menú";
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
      nombre: "Indica tu nombre.",
      email: "Escribe un correo válido.",
      mensaje: "Cuéntanos brevemente qué te gustaría simplificar.",
      privacidad: "Necesitamos que aceptes la política de privacidad."
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

    // Si se llega desde «Me interesa», prepara el mensaje con el producto
    try {
      var interes = new URLSearchParams(window.location.search).get("interes");
      if (interes && !form.elements.mensaje.value) {
        form.elements.mensaje.value = "Me interesa «" + interes + "». ";
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
        status.textContent = "¡Gracias! Hemos recibido tu mensaje y te responderemos pronto.";
      };

      if (CONFIG.FORM_ENDPOINT) {
        var button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        fetch(CONFIG.FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (res) { if (!res.ok) throw new Error(res.status); done(); })
          .catch(function () {
            status.className = "form-status is-error";
            status.textContent = "No hemos podido enviar el mensaje. Inténtalo de nuevo o escríbenos a " + CONFIG.CONTACT_EMAIL + ".";
          })
          .finally(function () { button.disabled = false; });
        return;
      }

      var body = [
        "Nombre: " + data.get("nombre"),
        "Empresa: " + (data.get("empresa") || "-"),
        "Correo: " + data.get("email"),
        "Teléfono: " + (data.get("telefono") || "-"),
        "Sector: " + (data.get("sector") || "-"),
        "",
        data.get("mensaje")
      ].join("\n");
      window.location.href = "mailto:" + CONFIG.CONTACT_EMAIL +
        "?subject=" + encodeURIComponent("Consulta desde la web · " + data.get("nombre")) +
        "&body=" + encodeURIComponent(body);
      status.className = "form-status is-ok";
      status.textContent = "Se ha abierto tu programa de correo con el mensaje preparado. Solo tienes que enviarlo.";
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
      nombre: "Indica tu nombre.",
      email: "Escribe un correo válido.",
      negocio: "Indica el nombre de tu negocio.",
      sector: "Elige tu sector.",
      privacidad: "Necesitamos que aceptes la política de privacidad."
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
        segundos: Math.round((Date.now() - abierto) / 1000)
      };
      var hecho = function () {
        demoForm.reset();
        demoStatus.className = "form-status is-ok";
        demoStatus.textContent = "¡Listo! En unos minutos te llega la demo a " + datos.email + ". Si no la ves, mira en la carpeta de correo no deseado.";
      };

      if (CONFIG.DEMO_ENDPOINT) {
        var boton = demoForm.querySelector('button[type="submit"]');
        boton.disabled = true;
        fetch(CONFIG.DEMO_ENDPOINT, { method: "POST", body: JSON.stringify(datos), headers: { "Content-Type": "application/json" } })
          .then(function (res) { if (!res.ok) throw new Error(res.status); hecho(); })
          .catch(function () {
            demoStatus.className = "form-status is-error";
            demoStatus.textContent = "No hemos podido enviarla. Inténtalo de nuevo en un momento o escríbenos a " + CONFIG.CONTACT_EMAIL + ".";
          })
          .finally(function () { boton.disabled = false; });
        return;
      }

      var cuerpo = [
        "Quiero ver la demo.",
        "",
        "Nombre: " + datos.nombre,
        "Negocio: " + datos.negocio,
        "Sector: " + demoForm.elements.sector.options[demoForm.elements.sector.selectedIndex].text,
        "Correo: " + datos.email
      ].join("\n");
      window.location.href = "mailto:" + CONFIG.CONTACT_EMAIL +
        "?subject=" + encodeURIComponent("Quiero ver la demo · " + datos.negocio) +
        "&body=" + encodeURIComponent(cuerpo);
      demoStatus.className = "form-status is-ok";
      demoStatus.textContent = "Se ha abierto tu programa de correo con la petición preparada. Envíala y te mandamos la demo.";
    });
  }

  /* ---- Año actual en el pie ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
