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
  autoescuela: { una: 'una autoescuela', plural: 'autoescuelas' },
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
    headers: { Authorization: `Bearer ${String(env.RESEND_API_KEY).trim()}`, 'Content-Type': 'application/json' },
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

// Idioma de la demo para un contacto: el que eligió en la web; si no, danés para Dinamarca.
export const idiomaDe = (c) => (['es', 'en', 'da'].includes(c.idioma) ? c.idioma : c.pais === 'DK' ? 'da' : 'es');

// La demo existe en español, inglés y danés (las autoescuelas, solo en español).
export function enlaceDemo(env, sector, empresa, idioma = 'es') {
  const url = new URL(env.DEMO_URL || 'https://fluivia.es/d/r5x0kruj/');
  if (idioma === 'en' || idioma === 'da') url.searchParams.set('lang', idioma);
  if (tieneDemo(sector)) url.searchParams.set('s', sector);
  if (empresa) url.searchParams.set('n', empresa.slice(0, 60));
  const responder = (env.AVISOS || '').split(',')[0].trim();
  if (responder) url.searchParams.set('r', responder);
  return url.toString();
}

// El correo que recibe quien pide la demo desde la web, en el idioma de la web
// desde la que la pidió (español, inglés o danés). La demo está en español.
const SECTOR_EN = { autoescuela: 'a driving school', gestoria: 'an accountancy firm', inmobiliaria: 'an estate agency', clinica: 'a clinic', academia: 'a school', distribucion: 'a distribution business', consultoria: 'a consultancy or agency', comercio: 'a shop' };
const SECTOR_DA = { autoescuela: 'en køreskole', gestoria: 'et bogholderi', inmobiliaria: 'en ejendomsmægler', clinica: 'en klinik', academia: 'en skole', distribucion: 'en distributionsvirksomhed', consultoria: 'et konsulenthus eller bureau', comercio: 'en butik' };

export function correoDemo(env, d, enlace) {
  const idioma = ['en', 'da'].includes(d.idioma) ? d.idioma : 'es';
  const responder = (env.AVISOS || '').split(',')[0].trim() || undefined;
  const conDemo = tieneDemo(d.sector);
  let asunto, partes, pie;
  if (idioma === 'en') {
    asunto = `Your Fluivia demo for ${d.empresa}`;
    partes = [`Hi ${d.nombre},`, `Here is the Fluivia demo prepared for ${d.empresa}:`, enlace,
      conDemo ? `It shows four everyday situations for ${SECTOR_EN[d.sector]}, step by step. It takes about five minutes. If you prefer, just reply to this email and I will walk you through it.`
        : 'We do not have a demo for your industry yet, so here is the general one. Reply and tell me what you do, and I will prepare one with your own cases.',
      env.CITA_URL ? `If you prefer to see it with me, book a 20-minute call: ${env.CITA_URL}` : 'If you prefer to see it with me, reply to this email and we will find a 20-minute slot.',
      'Best regards,\nFluivia'];
    pie = 'You are receiving this email because you requested the demo on the Fluivia website.';
  } else if (idioma === 'da') {
    asunto = `Din Fluivia-demo til ${d.empresa}`;
    partes = [`Hej ${d.nombre}`, `Her er Fluivia-demoen, som vi har lavet til ${d.empresa}:`, enlace,
      conDemo ? `Den viser fire situationer fra hverdagen i ${SECTOR_DA[d.sector]}, trin for trin, og tager omkring fem minutter. Svar gerne på denne mail, hvis du hellere vil have, at jeg viser dig den.`
        : 'Vi har endnu ikke en demo til din branche, så her er den generelle. Svar og fortæl, hvad I laver, så laver jeg en med jeres egne eksempler.',
      env.CITA_URL ? `Vil du hellere se den sammen med mig, kan du booke et opkald på 20 minutter: ${env.CITA_URL}` : 'Vil du hellere se den sammen med mig, så svar på denne mail, så finder vi 20 minutter.',
      'Venlig hilsen\nFluivia'];
    pie = 'Du får denne mail, fordi du har bedt om demoen på Fluivias hjemmeside.';
  } else {
    const s = sectorTexto(d.sector);
    asunto = `Tu demo de Fluivia para ${d.empresa}`;
    partes = [`Hola, ${d.nombre}:`, `Aquí tienes la demo de Fluivia preparada para ${d.empresa}:`, enlace,
      conDemo ? `Son cuatro situaciones del día a día de ${s.una}, contadas paso a paso. Se recorre en unos cinco minutos.`
        : 'Todavía no tenemos una demo de tu sector, así que te mando la general. Respóndeme contándome a qué te dedicas y te preparo una con tus casos.',
      env.CITA_URL ? `Si prefieres verla conmigo, reserva una llamada de 20 minutos: ${env.CITA_URL}` : 'Si prefieres verla conmigo, responde a este correo y buscamos un hueco de 20 minutos.',
      'Un saludo,\nFluivia'];
    pie = 'Recibes este correo porque has pedido la demo en la web de Fluivia.';
  }
  const texto = partes.join('\n\n');
  return { to: [d.email], reply_to: responder, subject: asunto, text: texto, html: html(texto, pie) };
}

// Confirmación para quien escribe desde el formulario de contacto, en su idioma.
export function correoRecibido(env, d) {
  const idioma = ['en', 'da'].includes(d.idioma) ? d.idioma : 'es';
  const responder = (env.AVISOS || '').split(',')[0].trim() || undefined;
  const T = {
    es: { asunto: 'Hemos recibido tu mensaje', partes: [`Hola, ${d.nombre}:`, 'Gracias por escribirnos. Hemos recibido tu mensaje y te contestamos en un día laborable como mucho.', 'Si quieres añadir algo, responde a este correo.', 'Un saludo,\nFluivia'], pie: 'Recibes este correo porque has escrito desde la web de Fluivia.' },
    en: { asunto: 'We have received your message', partes: [`Hi ${d.nombre},`, 'Thank you for getting in touch. We have received your message and will reply within one working day.', 'If you would like to add anything, just reply to this email.', 'Best regards,\nFluivia'], pie: 'You are receiving this email because you wrote to us through the Fluivia website.' },
    da: { asunto: 'Vi har modtaget din besked', partes: [`Hej ${d.nombre}`, 'Tak fordi du skrev til os. Vi har modtaget din besked og svarer senest inden for en arbejdsdag.', 'Vil du tilføje noget, så svar bare på denne mail.', 'Venlig hilsen\nFluivia'], pie: 'Du får denne mail, fordi du har skrevet til os via Fluivias hjemmeside.' },
  }[idioma];
  const texto = T.partes.join('\n\n');
  return { to: [d.email], reply_to: responder, subject: T.asunto, text: texto, html: html(texto, T.pie) };
}

// Plantillas para escribir desde la ficha. Se rellenan y se pueden cambiar antes de enviar.
export const PLANTILLAS = {
  'primer-contacto': {
    nombre: 'Primer correo (España)',
    asunto: 'Una idea para {empresa}',
    texto: 'Hola, {nombre}:\n\nTe escribo porque trabajo con {sector_plural} para quitarles tareas que se repiten cada semana: pedir documentación, contestar las mismas preguntas o pasar datos de un sitio a otro.\n\nHe preparado una demo con el nombre de {empresa}, para que veas en cinco minutos cómo quedaría:\n{demo}\n\nSi te encaja, lo vemos en una llamada de 20 minutos. Y si no te interesa, dímelo y no te vuelvo a escribir.\n\nUn saludo,\nFluivia',
  },
  'linkedin-es': {
    nombre: 'Mensaje de LinkedIn (España)',
    asunto: 'Primer contacto',
    texto: 'Hola, {nombre}. Trabajo con {sector_plural} automatizando tareas que se repiten cada semana (documentación, consultas, citas). He preparado una demo corta con el nombre de {empresa}. ¿Te la paso y me dices si te encaja?',
  },
  'primer-contacto-dk': {
    nombre: 'Første mail (Danmark)',
    asunto: 'En idé til {empresa}',
    texto: 'Hej {nombre}\n\nJeg skriver, fordi jeg hjælper {sector_plural_da} med at automatisere de opgaver, der gentager sig hver uge: indhente dokumenter, svare på de samme spørgsmål eller flytte data fra ét system til et andet.\n\nHar du 20 minutter i næste uge? Så viser jeg dig, hvordan det kunne se ud hos {empresa}.\n\nOg hvis det ikke er relevant, så sig til, så skriver jeg ikke igen.\n\nVenlig hilsen\nFluivia',
  },
  'linkedin-dk': {
    nombre: 'LinkedIn-besked (Danmark)',
    asunto: 'Første kontakt',
    texto: 'Hej {nombre}. Jeg hjælper {sector_plural_da} med at automatisere opgaver, der gentager sig hver uge (dokumenter, henvendelser, bookinger). Må jeg vise dig på 20 minutter, hvordan det kunne se ud hos {empresa}?',
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
  'datos-facturacion': {
    nombre: 'Pedir los datos para facturar',
    asunto: 'Datos para la factura de {empresa}',
    texto: 'Hola, {nombre}:\n\nPara preparar la factura necesito estos datos:\n\n· Razón social\n· NIF\n· Dirección fiscal\n\nTe facturo desde Dinamarca, que también es UE, así que la factura irá sin IVA y con «inversión del sujeto pasivo»: el IVA lo declaráis vosotros en vuestra declaración trimestral. Para eso vuestro NIF tiene que estar dado de alta en el registro de operaciones intracomunitarias (ROI). Si no lo está, vuestra gestoría lo hace en un momento con el modelo 036.\n\nGracias,\nFluivia',
  },
  propuesta: {
    nombre: 'Envío de propuesta',
    asunto: 'Propuesta para {empresa}',
    texto: 'Hola, {nombre}:\n\nComo hablamos, te mando la propuesta para {empresa}: qué montaríamos, en cuánto tiempo y lo que cuesta.\n\nCualquier duda, respóndeme a este correo o llámame y lo vemos.\n\nUn saludo,\nFluivia',
  },
};

const SECTOR_DA_PLURAL = { autoescuela: 'køreskoler', gestoria: 'bogholderier og revisorer', inmobiliaria: 'ejendomsmæglere', clinica: 'klinikker', academia: 'skoler og kursuscentre', distribucion: 'grossister', consultoria: 'konsulenthuse og bureauer', comercio: 'butikker' };

export function rellenar(t, c, env) {
  const s = sectorTexto(c.sector);
  const nombre = (c.nombre || '').split(/\s+/)[0] || '';
  const dk = c.pais === 'DK';
  const vals = { nombre, empresa: c.empresa || (dk ? 'jer' : 'tu negocio'), sector_plural: s.plural, sector: s.una,
    sector_plural_da: SECTOR_DA_PLURAL[c.sector] || 'små virksomheder', demo: enlaceDemo(env, c.sector, c.empresa, idiomaDe(c)) };
  // Sin nombre de persona: «Hola:» / «Hej» en vez de «Hola, :».
  return String(t).replace(/\{(\w+)\}/g, (m, k) => (k in vals ? vals[k] : m))
    .replace(/^Hola, ([:.])/, 'Hola$1').replace(/^Hej ([.\n])/, (m, x) => (x === '.' ? 'Hej.' : 'Hej\n'));
}
