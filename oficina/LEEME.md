# Oficina de Fluivia

La herramienta interna de Fluivia. Por ahora tiene:

- **Contactos**: todas las empresas con las que hablas, desde el primer contacto hasta que son clientes. Etapas (nuevo, contactado, reunión, propuesta, cliente, perdido), próxima acción, historial de todo lo que ha pasado, intereses, importes y notas. Se ve en lista o en tablero (arrastrando una tarjeta cambias su etapa) y se exporta a CSV.
- **Entrada automática desde la web**: quien pide la demo o escribe en el formulario de contacto entra solo como contacto (o se añade a su ficha si ya existía), con la próxima acción puesta. A ti te llega un aviso por correo con el enlace a su ficha.
- **Envío de la demo**: quien la pide desde la web la recibe por correo, con el nombre de su negocio y su sector.
- **Correos desde la ficha**: con plantillas (primer contacto, después de la demo, seguimiento, propuesta) que se rellenan solas y puedes cambiar antes de enviar. Salen desde tu dominio y quedan en el historial.
- **Su demo personalizada**: cada ficha tiene el enlace a la demo con el nombre y el sector de esa empresa, para copiarlo o abrirlo.
- **Facturación e IVA**: en cada contacto, el país, la razón social, la dirección fiscal y el NIF-IVA, con un botón para comprobarlo en VIES (la base de datos de la Comisión Europea). La ficha te dice qué IVA lleva su factura: sin IVA y con inversión del sujeto pasivo si el NIF es válido, 25 % de *moms* si es danés, y un aviso si no es válido (suele ser que no está dado de alta en el ROI). Si cambias el NIF, hay que volver a comprobarlo. Avisa también de que clínicas y academias suelen estar exentas de IVA. Los contactos en propuesta o clientes sin NIF-IVA válido salen marcados en la lista, el tablero y el resumen, y te pide confirmación antes de pasarlos a cliente. Hay una plantilla de correo para pedir los datos de facturación.
- **País con el que trabajas**: arriba, «Todos · España · Dinamarca». Filtra el resumen, los contactos (lista y tablero) y el correo de «hoy te toca» de cada mañana. Se recuerda hasta que lo cambies.
- **Correos programados**: en la ficha, «Programar» deja el correo listo para que salga solo a la hora que elijas (como mucho a 60 días). Se ven en la ficha y en el resumen, y se pueden cancelar hasta que salen. Cuando sale, queda en el historial como cualquier otro correo. Funciona con la alarma del Durable Object, así que no depende de tener la Oficina abierta.
- **Firma de Nerea**: los correos en español (desde la ficha, programados, de prueba y los automáticos de la web) salen como «Nerea de Fluivia», sin tarjeta, como escritos a mano, y con la firma de Nerea Clemente, el isotipo, el WhatsApp (+34 635 369 915), info@fluivia.es y fluivia.es. Los de inglés y danés siguen saliendo como Fluivia.
- **Filtro por sector**: en Contactos, una fila con los sectores que tienen contactos y cuántos hay de cada uno. «Academia de idiomas» es un sector aparte de «Academia» (refuerzo y formación); su demo es la de academias.
- **Pruebas**: «Enviarme una prueba» en la ficha te manda a ti el correo tal como lo tienes escrito, con «[Prueba]» en el asunto y sin apuntarlo en el historial. En el resumen puedes mandarte también los correos que salen solos (la demo y la confirmación del formulario, en los tres idiomas).
- **Resumen**: lo que te toca hoy, contactos nuevos, importes en propuestas y cuotas de clientes.
- **Cada mañana**, un correo con «hoy te toca» si hay algo pendiente.
- **Cada noche**, una copia de seguridad en R2, en la UE (se guardan 60 días).

- **Prospección**: en Contactos, «Importar empresas» carga una lista (CSV o JSON) de empresas para contactar. Columnas: `empresa; ciudad; pais (ES/DK); sector; web; telefono; email; linkedin; persona; cvr; nota; fuente` (hay un ejemplo en `plantilla-prospeccion.csv`). Puede traer también `etiquetas` y un correo preparado (`borrador_asunto` y `borrador_texto` en CSV, o `borrador: {asunto, texto}` en JSON): a las empresas que ya están se les añaden a su ficha, y el correo aparece listo en la caja de correo hasta que lo envías. No repite las que ya están (por correo, web o nombre y ciudad), las deja en «Nuevo» con origen «Prospección» y reparte la próxima acción: cuántas al día lo eliges al importar. La próxima acción dice el canal: LinkedIn si tiene página, si no correo, si no llamada. En la ficha hay plantillas de primer correo y de mensaje de LinkedIn en español y en danés, y «Copiar el texto» para pegarlo en LinkedIn. En la lista se filtra por país.

  Ojo: en España (LSSI, art. 21) y en Dinamarca (Markedsføringsloven, § 10), los correos comerciales sin consentimiento previo están prohibidos, también a empresas. LinkedIn y el teléfono no tienen ese problema; si se manda correo, que sea poco, a mano, a direcciones genéricas y con la opción de no volver a escribir.

Se entra con un código que llega al correo, solo para los emails de `EMAILS_PERMITIDOS`. Los datos se guardan en un Durable Object con SQLite en la UE.

## Puesta en marcha

Igual que Study and Beyond: la web en Netlify (con Netlify Forms) y la Oficina
en Cloudflare, pero en una cuenta de Cloudflare propia de Fluivia, con el
subdominio `info-fluivia` en workers.dev. Hace falta Resend con
`fluivia.ai` verificado (los correos salen de `info@fluivia.ai`).

```
cd oficina
npm install
npx wrangler login
npx wrangler r2 bucket create fluivia-oficina-copias --jurisdiction eu
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put ENTRADA_SECRETO
npx wrangler deploy
```

`ENTRADA_SECRETO` es una clave larga inventada (por ejemplo, la que da
`openssl rand -hex 32`). En Netlify va el mismo valor, como `OFICINA_SECRETO`.

Después:

1. **Dirección:** `wrangler deploy` te da `https://fluivia-oficina.<tu-cuenta>.workers.dev`. Si no es `fluivia-oficina.info-fluivia.workers.dev`, cámbiala en `OFICINA_URL` (aquí) y ponla también en Netlify como variable `OFICINA_URL`.
2. **Revisa `wrangler.jsonc`:** `EMAILS_PERMITIDOS` (quién puede entrar), `AVISOS` (a dónde llegan los avisos) y `CITA_URL` (tu enlace de reservas). Vuelve a hacer `npx wrangler deploy` si cambias algo.
3. **La web ya está conectada:** los formularios van a Netlify Forms y `netlify/functions/submission-created.mjs` manda la demo (o la confirmación) por correo y pasa el contacto a la Oficina por `POST /api/entrada/web`. En Netlify hacen falta las variables `RESEND_API_KEY` y `OFICINA_SECRETO`.

Los formularios públicos `/api/publico/*` siguen funcionando para una web que no esté en Netlify (solo desde `WEB_ORIGENES`).

## Probar en local

```
cd oficina
printf 'DEV=1\n' > .dev.vars
npx wrangler dev
```

Con `DEV=1` no se envía ningún correo: el código para entrar y los correos se escriben en la terminal. Para probar la comprobación de VIES sin conexión, arranca con `--var VIES_PRUEBA:1`: los NIF que contienen «0000» salen no válidos y el resto válidos.

## Protección

- Entrada desde Netlify: solo con `ENTRADA_SECRETO`. Formularios públicos: solo desde `WEB_ORIGENES`, campo oculto y tiempo mínimo contra bots, y límite de envíos por IP y por correo.
- Acceso: código de 6 cifras que caduca en 10 minutos, 5 intentos, límite de peticiones; sesión de 7 días en una cookie HttpOnly (en el servidor solo se guarda su hash).
- Las peticiones que cambian datos solo se aceptan desde la propia Oficina.
- Cabeceras de seguridad (sin incrustar en otras webs, sin indexar, política de contenido estricta).
