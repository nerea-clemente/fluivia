# Fluivia · web

Web corporativa de **Fluivia**, automatización e IA para pequeñas empresas.
*Procesos que fluyen.*

Es una web estática de varias páginas (HTML, CSS y JavaScript, sin dependencias ni proceso de build) construida con el kit de marca aprobado: paleta de cuatro colores, Plus Jakarta Sans (alojada en `assets/fonts`) y los logos SVG originales.

## Estructura

```
index.html            Inicio: portada, situaciones, qué hacemos, pasos y diferencias
servicios.html        Los 6 servicios y cómo empezar
soluciones.html       Soluciones por área, desarrollos a medida y agentes de IA
sectores.html         Ejemplos por sector (con anclas: #gestorias, #inmobiliarias…)
como-trabajamos.html  Proceso, qué nos diferencia y preguntas frecuentes
contacto.html         Formulario de contacto
aviso-legal.html      Aviso legal (LSSI) con campos a completar
privacidad.html       Política de privacidad (RGPD) con campos a completar
assets/css/           Estilos (tokens de marca en :root)
assets/js/main.js     Menú móvil, pestañas, índice de sectores, animaciones y formulario
assets/fonts/         Plus Jakarta Sans en WOFF2 + licencia OFL
assets/img/           Logos, isotipo y favicons del kit
```

## Ver en local

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Antes de publicar

1. **Formulario de contacto** — en `assets/js/main.js`, dentro de `CONFIG`:
   - `CONTACT_EMAIL`: tu correo real.
   - `FORM_ENDPOINT` (opcional): URL de Formspree, Getform o un webhook de Make/n8n. Si se deja vacío, el formulario abre el programa de correo del visitante con el mensaje ya redactado.
2. **Textos legales** — completa los campos entre corchetes de `aviso-legal.html` y `privacidad.html` (titular, NIF, domicilio, email, proveedores).
3. **Open Graph** — cuando tengas dominio, cambia `og:image` en `index.html` por una URL absoluta.

## Publicar

Se puede alojar tal cual en Netlify, Vercel, Cloudflare Pages o GitHub Pages: no requiere compilación, solo subir la carpeta.

La cabecera y el pie están repetidos en cada página: si cambias el menú, actualízalo en todos los `.html`.

## Demo para clientes

`d/r5x0kruj/` es una demo interactiva con datos ficticios para enseñar en reuniones o enviar por email. No está enlazada desde la web y lleva `noindex`. Los textos de cada sector de ejemplo están en `d/r5x0kruj/data.js`; para añadir un sector, copia un bloque y cambia sus textos.
