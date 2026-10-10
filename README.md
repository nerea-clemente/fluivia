# Fluivia · web

Web corporativa de **Fluivia**, automatización e IA para pequeñas empresas.
*Procesos que fluyen.*

Es una web estática (HTML, CSS y JavaScript, sin dependencias ni proceso de build) construida con el kit de marca aprobado: paleta de cuatro colores, Plus Jakarta Sans (alojada en `assets/fonts`) y los logos SVG originales.

## Estructura

```
index.html          Página principal (una sola página con secciones)
aviso-legal.html    Aviso legal (LSSI) con campos a completar
privacidad.html     Política de privacidad (RGPD) con campos a completar
assets/css/         Estilos (tokens de marca en :root)
assets/js/main.js   Menú móvil, pestañas de sectores, animaciones y formulario
assets/fonts/       Plus Jakarta Sans en WOFF2 + licencia OFL
assets/img/         Logos, isotipo y favicons del kit
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
