#!/bin/sh
# Prepara la web para publicarla en Netlify: copia en _site/ solo lo que es
# público, con el idioma que toca en la raíz. Hay un proyecto de Netlify por
# dominio, todos desde este repositorio; cada uno dice su idioma con la
# variable IDIOMA (Project configuration › Environment variables):
#
#   fluivia.es   IDIOMA=es (o sin poner)   español (raíz del repositorio)
#   fluivia.ai   IDIOMA=en                 inglés, internacional (en/)
#   fluivia.dk   IDIOMA=da                 danés (da/)
#
#   Comando de compilación:  sh herramientas/construir.sh
#   Carpeta de salida:       _site
#
# También se puede llamar a mano: sh herramientas/construir.sh da
set -e
IDIOMA="${1:-${IDIOMA:-es}}"
case "$IDIOMA" in
  es) ORIGEN="." ; DOMINIO="https://fluivia.es" ;;
  en) ORIGEN="en"; DOMINIO="https://fluivia.ai" ;;
  da) ORIGEN="da"; DOMINIO="https://fluivia.dk" ;;
  *) echo "IDIOMA tiene que ser es, en o da (es «$IDIOMA»)"; exit 1 ;;
esac

rm -rf _site
mkdir -p _site
for f in "$ORIGEN"/*.html "$ORIGEN/sitemap.xml"; do cp "$f" _site/; done
# Fuera de la raíz, las páginas suben un nivel para llegar a assets/: en su
# dominio ya están en la raíz.
if [ "$ORIGEN" != "." ]; then
  sed -i.bak -E 's#(href|src)="\.\./#\1="#g' _site/*.html && rm -f _site/*.bak
fi
for f in favicon.ico site.webmanifest _headers; do
  [ -e "$f" ] && cp "$f" _site/
done
for d in assets d; do
  [ -d "$d" ] && cp -R "$d" _site/
done
printf 'User-agent: *\nAllow: /\n\nSitemap: %s/sitemap.xml\n' "$DOMINIO" > _site/robots.txt
# Las direcciones antiguas de los otros idiomas (fluivia.es/en/…) van a su dominio.
if [ "$IDIOMA" = "es" ]; then
  printf '/en/*  https://fluivia.ai/:splat  301!\n/da/*  https://fluivia.dk/:splat  301!\n' > _site/_redirects
fi
echo "Web en «$IDIOMA» lista en _site/ ($(find _site -type f | wc -l) archivos)"
