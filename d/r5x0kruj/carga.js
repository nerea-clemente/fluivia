/* Fluivia · Demo: elige el idioma (?lang=es|en|da) y carga los sectores de ese idioma.
   Español: sectores/*.js · Inglés: sectores/en/*.js · Danés: sectores/da/*.js */
(function () {
  "use strict";
  var V = "4";
  var SECTORES = {
    es: ["gestoria", "inmobiliaria", "academia", "clinica", "distribucion", "consultoria", "comercio", "autoescuela"],
    en: ["gestoria", "inmobiliaria", "academia", "clinica", "distribucion", "consultoria", "comercio"],
    da: ["gestoria", "inmobiliaria", "academia", "clinica", "distribucion", "consultoria", "comercio"]
  };
  var lang = "es";
  try { lang = (new URLSearchParams(location.search).get("lang") || "es").toLowerCase(); } catch (e) {}
  if (!SECTORES[lang]) lang = "es";
  window.DEMO_IDIOMA = lang;
  var carpeta = lang === "es" ? "sectores/" : "sectores/" + lang + "/";
  SECTORES[lang].forEach(function (id) {
    document.write('<script src="' + carpeta + id + ".js?v=" + V + '"><\/script>');
  });
})();
