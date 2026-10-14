#!/bin/sh
# Prepara la web para publicarla (Cloudflare Pages, Netlify…): copia en _site/
# solo lo que es público. La Oficina, las herramientas y los textos internos
# se quedan fuera.
#
#   Comando de compilación:  sh herramientas/construir.sh
#   Carpeta de salida:       _site
set -e
rm -rf _site
mkdir -p _site
for f in *.html robots.txt sitemap.xml favicon.ico site.webmanifest _headers; do
  [ -e "$f" ] && cp "$f" _site/
done
for d in assets d en da; do
  [ -d "$d" ] && cp -R "$d" _site/
done
echo "Web lista en _site/ ($(find _site -type f | wc -l) archivos)"
