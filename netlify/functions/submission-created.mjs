// ---------------------------------------------------------------------------
// Respuestas automáticas a los formularios de la web (igual que en Study and Beyond).
//
// Netlify llama a esta función cada vez que valida un envío (el evento se llama
// "submission-created" y va por el nombre del archivo). Según el formulario:
//
//   demo       demo.html       le manda la demo por correo, en su idioma
//   contacto   contacto.html   le confirma que hemos recibido su mensaje
//
// Y, en los dos casos, pasa el contacto a la Oficina (Contactos), que además te
// avisa por correo. Los textos de los correos están en oficina/src/correo.js.
//
// Variables de entorno en Netlify:
//   RESEND_API_KEY   clave de Resend (sin ella no se manda ningún correo)
//   OFICINA_SECRETO  el mismo valor que ENTRADA_SECRETO en el Worker de la Oficina
//   OFICINA_URL      (opcional) dirección de la Oficina, si no es la de por defecto
//   CITA_URL         (opcional) enlace para reservar llamada
//
// Si falta algo, la función no falla: registra el motivo y devuelve 200, para
// que el envío no se pierda nunca (sigue guardado en Netlify › Forms).
// ---------------------------------------------------------------------------

import * as Correo from '../../oficina/src/correo.js';
import { EMAIL_OK } from '../../oficina/src/contactos.js';

// Los correos salen de hola@fluivia.ai (el único dominio verificado en Resend) y
// las respuestas van a la dirección del país de la web, que llega al mismo buzón.
const RESPONDER = { es: 'hola@fluivia.es', en: 'hola@fluivia.ai', da: 'hola@fluivia.dk' };
const ENV = {
  RESEND_API_KEY: process.env.RESEND_API_KEY || '',
  REMITENTE: 'Fluivia <hola@fluivia.ai>',
  DEMO_URL: (process.env.URL || 'https://fluivia.ai').replace(/\/$/, '') + '/d/r5x0kruj/',
  CITA_URL: process.env.CITA_URL || '',
};
const OFICINA_URL = (process.env.OFICINA_URL || 'https://fluivia-oficina.fluivia.workers.dev').replace(/\/$/, '');
const SECTORES = ['gestoria', 'inmobiliaria', 'clinica', 'academia', 'distribucion', 'consultoria', 'comercio', 'otro'];
const limpio = (v, n) => String(v ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, n);

async function enviarAOficina(e) {
  const secreto = (process.env.OFICINA_SECRETO || '').trim();
  if (!secreto) { console.log('Sin OFICINA_SECRETO: el contacto no se pasa a la Oficina.'); return; }
  try {
    const r = await fetch(`${OFICINA_URL}/api/entrada/web`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${secreto}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(e),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) console.error('La Oficina respondió', r.status, await r.text());
  } catch (err) {
    console.error('No se pudo pasar el contacto a la Oficina:', err);
  }
}

export default async (req) => {
  const ok = () => new Response('ok', { status: 200 });
  let formulario = '';
  let d = {};
  try {
    const cuerpo = await req.json();
    formulario = String(cuerpo?.payload?.form_name ?? '');
    d = cuerpo?.payload?.data ?? {};
  } catch (err) {
    console.error('No se pudo leer el envío:', err);
    return ok();
  }
  if (!['demo', 'contacto'].includes(formulario)) return ok();

  const e = {
    tipo: formulario,
    nombre: limpio(d.nombre, 120), email: limpio(d.email, 200).toLowerCase(),
    empresa: limpio(d.negocio || d.empresa, 60), telefono: limpio(d.telefono, 40),
    sector: SECTORES.includes(d.sector) ? d.sector : 'otro',
    mensaje: String(d.mensaje ?? '').trim().slice(0, 4000),
    idioma: ['es', 'en', 'da'].includes(d.idioma) ? d.idioma : 'es',
  };
  if (!e.nombre || !EMAIL_OK.test(e.email)) { console.log('Envío sin nombre o sin correo válido: no se responde.'); return ok(); }

  const env = { ...ENV, AVISOS: RESPONDER[e.idioma] };

  // Primero la respuesta al visitante; luego, a la Oficina (con el enlace de la demo enviada).
  if (ENV.RESEND_API_KEY) {
    try {
      if (e.tipo === 'demo' && e.empresa) {
        e.enlace = Correo.enlaceDemo(env, e.sector, e.empresa);
        await Correo.enviar(env, Correo.correoDemo(env, e, e.enlace));
        e.demoEnviada = true;
      } else if (e.tipo === 'contacto') {
        await Correo.enviar(env, Correo.correoRecibido(env, e));
      }
    } catch (err) {
      console.error('No se pudo mandar la respuesta automática:', err);
    }
  } else {
    console.log('Sin RESEND_API_KEY: no se envía ninguna respuesta automática.');
  }

  await enviarAOficina(e);
  return ok();
};
