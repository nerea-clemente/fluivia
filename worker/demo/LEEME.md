# Envío automático de la demo

Cuando alguien rellena «Recíbela por correo» en `demo.html`, este Worker:

1. le manda un correo con su demo personalizada (con el nombre de su negocio y su sector);
2. te manda a ti un aviso con sus datos, para que puedas hacer seguimiento.

Usa Cloudflare Workers y Resend, igual que Study and Beyond.

## Puesta en marcha

1. **Dominio en Resend.** Verifica tu dominio en Resend (añadiendo los registros DNS que te indica) y crea una clave de API.
2. **Configura `wrangler.toml`:**
   - `FROM`, `NOTIFY_TO` y `REPLY_TO` con tu correo del dominio verificado.
   - `ALLOWED_ORIGINS` y `DEMO_URL`: si cambias a un dominio propio, pon aquí el nuevo.
   - `CITA_URL`: tu enlace de reservas (opcional).
3. **Sube la clave y publica:**
   ```
   cd worker/demo
   npx wrangler secret put RESEND_API_KEY
   npx wrangler deploy
   ```
4. **Conecta la web:** copia la dirección que te da `wrangler deploy` (algo como `https://fluivia-demo.tu-cuenta.workers.dev`) en `DEMO_ENDPOINT`, dentro de `assets/js/main.js`. Pon también ahí `CITA_URL`.

Mientras `DEMO_ENDPOINT` esté vacío, el formulario abre el correo del visitante con la petición preparada para `CONTACT_EMAIL`, y la demo se manda a mano.

## Protección

- Solo acepta peticiones desde las webs de `ALLOWED_ORIGINS`.
- Campo oculto y tiempo mínimo de 3 segundos para frenar bots.
- Opcional: límite de una demo cada 10 minutos por correo con KV (ver `wrangler.toml`).
