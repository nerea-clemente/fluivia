/* Oficina de Fluivia · entrar con un código por correo */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var email = "";

  function enviar(ruta, datos) {
    return fetch(ruta, { method: "POST", headers: { "content-type": "application/json" }, credentials: "same-origin", body: JSON.stringify(datos) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { if (!r.ok) throw new Error(d.error || "Algo ha fallado"); return d; }); });
  }

  $("paso-email").addEventListener("submit", function (e) {
    e.preventDefault();
    $("error-email").textContent = "";
    email = $("email").value.trim().toLowerCase();
    if (!$("email").checkValidity() || !email) { $("error-email").textContent = "Escribe un correo válido."; return; }
    var b = this.querySelector("button"); b.disabled = true;
    enviar("/api/acceso/codigo", { email: email }).then(function () {
      $("a-quien").textContent = email;
      $("paso-email").hidden = true; $("paso-codigo").hidden = false; $("codigo").focus();
    }).catch(function (err) { $("error-email").textContent = err.message; }).finally(function () { b.disabled = false; });
  });

  $("paso-codigo").addEventListener("submit", function (e) {
    e.preventDefault();
    $("error-codigo").textContent = "";
    var codigo = $("codigo").value.replace(/\D/g, "");
    if (codigo.length !== 6) { $("error-codigo").textContent = "El código tiene 6 cifras."; return; }
    var b = this.querySelector('button[type="submit"]'); b.disabled = true;
    enviar("/api/acceso/entrar", { email: email, codigo: codigo }).then(function () { location.href = "/"; })
      .catch(function (err) { $("error-codigo").textContent = err.message; }).finally(function () { b.disabled = false; });
  });

  $("otra-vez").addEventListener("click", function () { $("paso-codigo").hidden = true; $("paso-email").hidden = false; $("codigo").value = ""; $("email").focus(); });
})();
