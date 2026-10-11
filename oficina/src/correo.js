// ---------------------------------------------------------------------------
// Correo: envío con Resend, el correo de la demo y las plantillas de la ficha.
// Con DEV=1 (o sin RESEND_API_KEY) no se envía nada: se escribe en el registro.
// ---------------------------------------------------------------------------

export const esc = (t) => String(t ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const SECTOR_TEXTO = {
  gestoria: { una: 'una gestoría', plural: 'gestorías' },
  inmobiliaria: { una: 'una inmobiliaria', plural: 'inmobiliarias' },
  clinica: { una: 'una clínica', plural: 'clínicas' },
  academia: { una: 'una academia', plural: 'academias' },
  distribucion: { una: 'una empresa de distribución', plural: 'empresas de distribución' },
  consultoria: { una: 'una consultoría o agencia', plural: 'consultorías y agencias' },
  comercio: { una: 'un comercio', plural: 'comercios' },
};
export const sectorTexto = (s) => SECTOR_TEXTO[s] || { una: 'tu negocio', plural: 'pequeñas empresas' };
export const tieneDemo = (s) => !!SECTOR_TEXTO[s];

export async function enviar(env, correo) {
  if (env.DEV === '1' || !env.RESEND_API_KEY) {
    console.log(`[correo] (sin enviar) a ${[].concat(correo.to).join(', ')} · ${correo.subject}\n${correo.text || ''}`);
    return { id: `dev-${Date.now()}` };
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env.REMITENTE, ...correo }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

// Texto plano a un HTML sencillo con la marca: párrafos y enlaces.
export function html(texto, pie = '') {
  const cuerpo = String(texto).split(/\n{2,}/).map((p) => {
    const t = esc(p).replace(/\n/g, '<br>').replace(/(https:\/\/[^\s<]+)/g, '<a href="$1" style="color:#123F35;font-weight:bold">$1</a>');
    return `<p style="margin:0 0 16px">${t}</p>`;
  }).join('');
  return `<!doctype html><html lang="es"><body style="margin:0;background:#F1F4F3;font-family:Arial,sans-serif;color:#123F35">
  <div style="max-width:560px;margin:0 auto;padding:28px 18px">
    <div style="background:#fff;border-radius:16px;padding:28px 26px;font-size:16px;line-height:1.6">${cuerpo}</div>
    ${pie ? `<p style="font-size:12px;color:#5B6662;text-align:center;margin-top:14px">${esc(pie)}</p>` : ''}
  </div></body></html>`;
}

export function enlaceDemo(env, sector, empresa) {
  const url = new URL(env.DEMO_URL || 'https://fluivia.es/d/r5x0kruj/');
  if (tieneDemo(sector)) url.searchParams.set('s', sector);
  if (empresa) url.searchParams.set('n', empresa.slice(0, 60));
  const responder = (env.AVISOS || '').split(',')[0].trim();
  if (responder) url.searchParams.set('r', responder);
  return url.toString();
}

// El correo que recibe quien pide la demo desde la web.
export function correoDemo(env, d, enlace) {
  const s = sectorTexto(d.sector);
  const intro = tieneDemo(d.sector)
    ? `Son cuatro situaciones del día a día de ${s.una}, contadas paso a paso. Se recorre en unos cinco minutos.`
    : 'Todavía no tenemos una demo de tu sector, así que te mando la general. Respóndeme contándome a qué te dedicas y te preparo una con tus casos.';
  const cita = env.CITA_URL
    ? `Si prefieres verla conmigo, reserva una llamada de 20 minutos: ${env.CITA_URL}`
    : 'Si prefieres verla conmigo, responde a este correo y buscamos un hueco de 20 minutos.';
  const texto = [`Hola, ${d.nombre}:`, `Aquí tienes la demo de Fluivia preparada para ${d.empresa}:`, enlace, intro, cita, 'Un saludo,\nFluivia'].join('\n\n');
  return {
    to: [d.email], reply_to: (env.AVISOS || '').split(',')[0].trim() || undefined,
    subject: `Tu demo de Fluivia para ${d.empresa}`, text: texto,
    html: html(texto, 'Recibes este correo porque has pedido la demo en la web de Fluivia.'),
  };
}

// Plantillas para escribir desde la ficha. Se rellenan y se pueden cambiar antes de enviar.
export const PLANTILLAS = {
  'primer-contacto': {
    nombre: 'Primer contacto (prospección)',
    asunto: 'Una demo para {empresa}',
    texto: 'Hola, {nombre}:\n\nTrabajo con {sector_plural} para quitarles tareas que se repiten cada semana: pedir documentación, responder las mismas preguntas o pasar datos de un sitio a otro.\n\nTe he preparado una demo con el nombre de {empresa}, para que veas en cinco minutos cómo quedaría:\n{demo}\n\nSi te encaja, lo vemos juntos en una llamada de 20 minutos.\n\nUn saludo,\nFluivia',
  },
  'tras-demo': {
    nombre: 'Después de la demo',
    asunto: '¿Qué te ha parecido la demo?',
    texto: 'Hola, {nombre}:\n\nTe escribo para saber qué te ha parecido la demo de {empresa}. ¿Hay algún caso que te quitaría más trabajo que los demás?\n\nSi quieres, lo vemos en una llamada de 20 minutos y te cuento cómo lo montaríamos con lo que ya usáis.\n\nUn saludo,\nFluivia',
  },
  seguimiento: {
    nombre: 'Seguimiento',
    asunto: 'Retomamos lo de {empresa}',
    texto: 'Hola, {nombre}:\n\nRetomo nuestra conversación. ¿Has podido darle una vuelta? Si te surge alguna duda o quieres cambiar algo de lo que hablamos, dímelo y lo ajusto.\n\nUn saludo,\nFluivia',
  },
  propuesta: {
    nombre: 'Envío de propuesta',
    asunto: 'Propuesta para {empresa}',
    texto: 'Hola, {nombre}:\n\nComo hablamos, te mando la propuesta para {empresa}: qué montaríamos, en cuánto tiempo y lo que cuesta.\n\nCualquier duda, respóndeme a este correo o llámame y lo vemos.\n\nUn saludo,\nFluivia',
  },
};

export function rellenar(t, c, env) {
  const s = sectorTexto(c.sector);
  const nombre = (c.nombre || '').split(/\s+/)[0] || '';
  const vals = { nombre, empresa: c.empresa || 'tu negocio', sector_plural: s.plural, sector: s.una, demo: enlaceDemo(env, c.sector, c.empresa) };
  return String(t).replace(/\{(\w+)\}/g, (m, k) => (k in vals ? vals[k] : m));
}
