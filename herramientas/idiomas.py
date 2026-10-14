#!/usr/bin/env python3
"""Pone al día las tres versiones de la web (español en la raíz, inglés en en/ y
danés en da/): idioma de la página, selector de idioma, enlaces hreflang,
dirección canónica, rutas a assets/ y el sitemap.

Las traducciones solo tienen que cambiar el texto: todo lo demás lo deja bien
este script. Ejecútalo desde la raíz del repositorio después de tocar páginas:

    python3 herramientas/idiomas.py
"""
import os
import re
import html

DOMINIO = "https://fluivia.es/"
FECHA = "2026-10-14"

IDIOMAS = {
    # código: (carpeta, nombre en su idioma, og:locale)
    "es": ("", "Español", "es_ES"),
    "en": ("en/", "English", "en_GB"),
    "da": ("da/", "Dansk", "da_DK"),
}
ETIQUETA_SELECTOR = {"es": "Idioma", "en": "Language", "da": "Sprog"}

PAGINAS = [
    "index.html", "servicios.html", "sectores.html", "caso-real.html", "como-trabajamos.html",
    "demo.html", "contacto.html",
    "automatizacion-gestorias.html", "automatizacion-inmobiliarias.html", "automatizacion-clinicas.html",
    "automatizacion-academias.html", "automatizacion-distribucion.html",
    "aviso-legal.html", "privacidad.html",
]
PRIORIDAD = {"index.html": "1.0", "servicios.html": "0.9", "como-trabajamos.html": "0.7", "contacto.html": "0.7",
             "aviso-legal.html": "0.2", "privacidad.html": "0.2"}

def url(idioma, pagina):
    carpeta = IDIOMAS[idioma][0]
    return DOMINIO + carpeta + ("" if pagina == "index.html" else pagina)

def existe(idioma, pagina):
    return os.path.exists(IDIOMAS[idioma][0] + pagina)

def selector(idioma, pagina):
    # Desplegable (<details>): funciona sin JavaScript; main.js lo cierra al pulsar fuera.
    # Rutas relativas desde la carpeta de la página actual.
    subir = "../" if IDIOMAS[idioma][0] else ""
    items = []
    for cod, (carpeta, nombre, _) in IDIOMAS.items():
        destino = pagina if existe(cod, pagina) else "index.html"
        href = subir + carpeta + destino
        actual = ' aria-current="true"' if cod == idioma else ""
        items.append(f'<li><a href="{href}" lang="{cod}" hreflang="{cod}"{actual}>{nombre}</a></li>')
    return (f'<details class="lang-menu"><summary aria-label="{ETIQUETA_SELECTOR[idioma]}: {IDIOMAS[idioma][1]}">'
            f'<svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.8 3.9 6 3.9 9.5s-1.3 6.7-3.9 9.5c-2.6-2.8-3.9-6-3.9-9.5s1.3-6.7 3.9-9.5z"/></svg>'
            f'{idioma.upper()}</summary><ul>' + "".join(items) + "</ul></details>")

def poner_al_dia(idioma, pagina):
    ruta = IDIOMAS[idioma][0] + pagina
    s = open(ruta, encoding="utf-8").read()
    carpeta = IDIOMAS[idioma][0]

    # 1. Idioma de la página
    s = re.sub(r'<html lang="[^"]*">', f'<html lang="{idioma}">', s, count=1)
    s = re.sub(r'<meta property="og:locale" content="[^"]*">', f'<meta property="og:locale" content="{IDIOMAS[idioma][2]}">', s)

    # 2. Rutas a los archivos comunes (en en/ y da/ hay que subir un nivel)
    if carpeta:
        s = re.sub(r'((?:href|src)=")(?!\.\./|https?:|mailto:|#|/)(assets/|favicon\.ico|site\.webmanifest)', r'\1../\2', s)

    # 3. Dirección canónica, og:url y hreflang (se quitan y se vuelven a poner)
    s = re.sub(r'\n\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*">', "", s)
    s = re.sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url(idioma, pagina)}">', s, count=1)
    s = re.sub(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{url(idioma, pagina)}">', s, count=1)
    alternos = [f'<link rel="alternate" hreflang="{cod}" href="{url(cod, pagina)}">' for cod in IDIOMAS if existe(cod, pagina)]
    alternos.append(f'<link rel="alternate" hreflang="x-default" href="{url("es", pagina)}">')
    s = s.replace('<link rel="canonical"', "\n  ".join(alternos) + '\n  <link rel="canonical"', 1)

    # 4. Selector de idioma: en el menú, o junto al botón en las páginas legales
    s = re.sub(r'\s*<ul class="lang-switch".*?</ul>', "", s, flags=re.S)
    s = re.sub(r'\s*<details class="lang-menu">.*?</details>', "", s, flags=re.S)
    nav = re.search(r'(<nav class="main-nav" id="main-nav"[^>]*>\s*<ul>.*?</ul>)', s, re.S)
    if nav:
        s = s.replace(nav.group(1), nav.group(1) + "\n        " + selector(idioma, pagina), 1)
    else:
        m = re.search(r'(\n\s*)(<a class="btn btn-primary btn-sm"[^>]*>[^<]*</a>\s*</div>\s*</header>)', s)
        if m:
            s = s.replace(m.group(0), m.group(1) + selector(idioma, pagina) + m.group(1) + m.group(2), 1)

    open(ruta, "w", encoding="utf-8").write(s)

def sitemap():
    filas = []
    for pagina in PAGINAS:
        for cod in IDIOMAS:
            if not existe(cod, pagina):
                continue
            alternos = "".join(f'\n    <xhtml:link rel="alternate" hreflang="{c}" href="{url(c, pagina)}"/>' for c in IDIOMAS if existe(c, pagina))
            filas.append(f'  <url>\n    <loc>{url(cod, pagina)}</loc>\n    <lastmod>{FECHA}</lastmod>\n    <priority>{PRIORIDAD.get(pagina, "0.8")}</priority>{alternos}\n  </url>')
    open("sitemap.xml", "w", encoding="utf-8").write(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
        + "\n".join(filas) + "\n</urlset>\n")

if __name__ == "__main__":
    hechas = 0
    for cod in IDIOMAS:
        for pagina in PAGINAS:
            if existe(cod, pagina):
                poner_al_dia(cod, pagina)
                hechas += 1
    sitemap()
    print(f"{hechas} páginas al día y sitemap.xml regenerado")
