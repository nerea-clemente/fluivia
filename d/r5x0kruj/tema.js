/* Estilos en prueba: /?tema=nombre carga css/temas/nombre.css (se recuerda en la pestaña). ?tema= lo quita. */
(function () {
  try {
    var t = new URLSearchParams(location.search).get("tema");
    if (t !== null) sessionStorage.setItem("demo-tema", t);
    t = sessionStorage.getItem("demo-tema");
    if (t && /^[a-z0-9-]+$/.test(t)) {
      document.documentElement.setAttribute("data-tema", t);
      document.write('<link rel="stylesheet" href="temas/' + t + '.css">');
    }
  } catch (e) {}
})();
