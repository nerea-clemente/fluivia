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
  idiomas: { una: 'una academia de idiomas', plural: 'academias de idiomas' },
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
  // Las academias de idiomas ven la demo de academia (con los simulacros de Cambridge).
  if (tieneDemo(sector)) url.searchParams.set('s', sector === 'idiomas' ? 'academia' : sector);
  if (empresa) url.searchParams.set('n', empresa.slice(0, 60));
  const responder = (env.AVISOS || '').split(',')[0].trim();
  if (responder) url.searchParams.set('r', responder);
  return url.toString();
}

// El correo que recibe quien pide la demo desde la web, en el idioma de la web
// desde la que la pidió (español, inglés o danés). La demo está en español.
const SECTOR_EN = { autoescuela: 'a driving school', gestoria: 'an accountancy firm', inmobiliaria: 'an estate agency', clinica: 'a clinic', idiomas: 'a language school', academia: 'a school', distribucion: 'a distribution business', consultoria: 'a consultancy or agency', comercio: 'a shop' };
const SECTOR_DA = { autoescuela: 'en køreskole', gestoria: 'et bogholderi', inmobiliaria: 'en ejendomsmægler', clinica: 'en klinik', idiomas: 'en sprogskole', academia: 'en skole', distribucion: 'en distributionsvirksomhed', consultoria: 'et konsulenthus eller bureau', comercio: 'en butik' };

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
    asunto = `Aquí tienes la demo de ${d.empresa}`;
    partes = [`Hola, ${d.nombre}:`, `Aquí tienes la demo de Fluivia preparada para ${d.empresa}:`, enlace,
      conDemo ? `Son cuatro situaciones del día a día de ${s.una}, contadas paso a paso. Se recorre en unos cinco minutos.`
        : 'Todavía no tenemos una demo de tu sector, así que te mando la general. Respóndeme contándome a qué te dedicas y te preparo una con tus casos.',
      env.CITA_URL ? `Si prefieres verla conmigo, reserva una llamada de 20 minutos: ${env.CITA_URL}` : 'Si prefieres verla conmigo, responde a este correo y buscamos un hueco de 20 minutos.',
      'Un saludo,\nNerea'];
    pie = 'Recibes este correo porque has pedido la demo en la web de Fluivia.';
  }
  const texto = partes.join('\n\n');
  if (idioma === 'es') return { to: [d.email], reply_to: responder, ...personal(env, { asunto, texto, pie }) };
  return { to: [d.email], reply_to: responder, subject: asunto, text: texto, html: html(texto, pie) };
}

// Confirmación para quien escribe desde el formulario de contacto, en su idioma.
export function correoRecibido(env, d) {
  const idioma = ['en', 'da'].includes(d.idioma) ? d.idioma : 'es';
  const responder = (env.AVISOS || '').split(',')[0].trim() || undefined;
  const cita = /^https:\/\//.test(env.CITA_URL || '') ? env.CITA_URL : '';
  const T = {
    es: { asunto: 'He recibido tu mensaje', partes: [`Hola, ${d.nombre}:`, 'Gracias por escribirme. He recibido tu mensaje y te contesto en un día laborable como mucho.', cita ? `Si prefieres contármelo en una llamada, reserva aquí 20 minutos:\n${cita}` : '', 'Si quieres añadir algo, responde a este correo o escríbeme por WhatsApp.', 'Un saludo,\nNerea'], pie: 'Recibes este correo porque has escrito desde la web de Fluivia.' },
    en: { asunto: 'We have received your message', partes: [`Hi ${d.nombre},`, 'Thank you for getting in touch. We have received your message and will reply within one working day.', cita ? `If you would rather talk it through on a call, book 20 minutes here:\n${cita}` : '', 'If you would like to add anything, just reply to this email.', 'Best regards,\nFluivia'], pie: 'You are receiving this email because you wrote to us through the Fluivia website.' },
    da: { asunto: 'Vi har modtaget din besked', partes: [`Hej ${d.nombre}`, 'Tak fordi du skrev til os. Vi har modtaget din besked og svarer senest inden for en arbejdsdag.', cita ? `Vil du hellere tage det i et opkald, kan du booke 20 minutter her:\n${cita}` : '', 'Vil du tilføje noget, så svar bare på denne mail.', 'Venlig hilsen\nFluivia'], pie: 'Du får denne mail, fordi du har skrevet til os via Fluivias hjemmeside.' },
  }[idioma];
  const texto = T.partes.filter(Boolean).join('\n\n');
  if (idioma === 'es') return { to: [d.email], reply_to: responder, ...personal(env, { asunto: T.asunto, texto, pie: T.pie }) };
  return { to: [d.email], reply_to: responder, subject: T.asunto, text: texto, html: html(texto, T.pie) };
}

// Plantillas para escribir desde la ficha. Se rellenan y se pueden cambiar antes de enviar.
// Las de España las firma Nerea (la firma completa, con el WhatsApp, la añade personal()).
export const PLANTILLAS = {
  'primer-contacto': {
    nombre: 'Primer correo (España)',
    asunto: '{asunto_sector}',
    texto: 'Hola, {nombre}:\n\nSoy Nerea, de Fluivia. Ayudo a {sector_plural} a quitarse de encima las tareas que se repiten cada semana.\n\n{gancho} Eso es justo lo que automatizamos, y sin que [[tengas|tengáis]] que cambiar los programas que ya [[usas|usáis]].\n\n{oferta}\n\nPara que no [[tengas que imaginártelo|tengáis que imaginároslo]], [[te|os]] he preparado una demo con el nombre de {empresa}. Se ve en cinco minutos:\n{demo}\n\nSi [[te|os]] encaja, [[te|os]] lo enseño en una llamada de 20 minutos y [[te|os]] digo qué tendría sentido en [[tu|vuestro]] caso y cuánto costaría. [[Puedes|Podéis]] elegir el hueco aquí:\n{cita}\n\nY si no es el momento, [[dímelo|decídmelo]] y no [[te|os]] vuelvo a escribir.\n\nUn saludo,\nNerea',
  },
  'segundo-contacto': {
    nombre: 'Segundo correo, si no contesta (España)',
    asunto: 'Re: {asunto_sector}',
    texto: 'Hola, {nombre}:\n\n[[Te|Os]] escribí hace unos días con una demo para {empresa} y no quería que se quedara perdida en la bandeja de entrada.\n\nPor si [[te ayuda a hacerte|os ayuda a haceros]] una idea, en Study and Beyond, una empresa pequeña, montamos el seguimiento de contactos, los recordatorios y los documentos de cada cliente. Ahora el equipo dedica ese tiempo a atender a la gente. Lo [[tienes|tenéis]] contado aquí:\nhttps://fluivia.es/caso-real.html\n\n[[Tu|Vuestra]] demo sigue aquí:\n{demo}\n\n¿[[Te|Os]] viene bien una llamada de 20 minutos esta semana o la que viene?\n{cita}\n\nUn saludo,\nNerea',
  },
  'linkedin-es': {
    nombre: 'Mensaje de LinkedIn (España)',
    asunto: 'Primer contacto',
    texto: 'Hola, {nombre}. Soy Nerea, de Fluivia. Ayudo a {sector_plural} a automatizar lo que se repite cada semana. {gancho} He preparado una demo de cinco minutos con el nombre de {empresa}. ¿[[Te|Os]] la paso?',
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
    asunto: '¿Qué [[te|os]] ha parecido la demo?',
    texto: 'Hola, {nombre}:\n\n[[Te|Os]] escribo para saber qué [[te|os]] pareció la demo de {empresa}. Casi siempre hay un caso que [[te|os]] ahorraría más tiempo que los demás. ¿Cuál sería el [[tuyo|vuestro]]?\n\nSi [[quieres|queréis]], lo vemos en 20 minutos y [[te|os]] digo cómo lo montaríamos con lo que ya [[usas|usáis]], en cuánto tiempo estaría funcionando y cuánto costaría. [[Reserva|Reservad]] el hueco que mejor [[te|os]] venga:\n{cita}\n\nUn saludo,\nNerea',
  },
  seguimiento: {
    nombre: 'Seguimiento',
    asunto: '¿[[Has|Habéis]] podido darle una vuelta?',
    texto: 'Hola, {nombre}:\n\nRetomo lo que hablamos. ¿[[Has|Habéis]] podido darle una vuelta? Si [[te|os]] ha surgido alguna duda, o [[quieres|queréis]] empezar por una parte más pequeña para probar, [[dímelo|decídmelo]] y lo ajusto.\n\nUn saludo,\nNerea',
  },
  'datos-facturacion': {
    nombre: 'Pedir los datos para facturar',
    asunto: 'Lo que necesito para la factura',
    texto: 'Hola, {nombre}:\n\nPara preparar la factura necesito estos datos:\n\n· Razón social\n· NIF\n· Dirección fiscal\n\n[[Te|Os]] facturo desde Dinamarca, que también es UE, así que la factura irá sin IVA y con «inversión del sujeto pasivo»: el IVA lo declaráis vosotros en vuestra declaración trimestral. Para eso vuestro NIF tiene que estar dado de alta en el registro de operaciones intracomunitarias (ROI). Si no lo está, vuestra gestoría lo hace en un momento con el modelo 036.\n\nGracias,\nNerea',
  },
  propuesta: {
    nombre: 'Envío de propuesta',
    asunto: 'La propuesta para {empresa}',
    texto: 'Hola, {nombre}:\n\nComo hablamos, [[te|os]] mando la propuesta para {empresa}: qué montaríamos, en cuánto tiempo y lo que cuesta.\n\nSi [[quieres|queréis]] repasarla juntos, [[respóndeme|respondedme]] a este correo o [[escríbeme|escribidme]] por WhatsApp y lo vemos.\n\nUn saludo,\nNerea',
  },
};

// El asunto del primer correo: corto y sobre algo que les pasa de verdad.
const ASUNTO = {
  gestoria: '¿Y si [[tus|vuestros]] clientes mandaran las facturas sin que se las [[pidas|pidáis]]?',
  inmobiliaria: '¿Quién contesta en {empresa} a un contacto de Idealista a las 21:30?',
  clinica: '¿Cuántas citas se [[te|os]] quedan vacías cada semana?',
  academia: '¿Y si los exámenes de práctica de {empresa} se corrigieran solos?',
  idiomas: '¿Y si los simulacros de {empresa} se corrigieran solos?',
  autoescuela: '¿Y si [[tus|vuestros]] alumnos reservaran las prácticas sin escribir[[te|os]]?',
  distribucion: '¿Cuánto tarda {empresa} en pasar los pedidos de WhatsApp?',
  consultoria: '¿Y si la propuesta saliera el mismo día de la reunión?',
  comercio: '¿Cuántos WhatsApps [[contestas|contestáis]] mientras [[atiendes|atendéis]] el mostrador?',
};

// La frase del primer correo que muestra que sabemos cómo es su día a día.
const GANCHO = {
  gestoria: 'En muchas gestorías, cada trimestre se va media semana persiguiendo facturas y contestando «¿hasta cuándo tengo para el IVA?».',
  inmobiliaria: 'En muchas inmobiliarias, un contacto que escribe desde Idealista a las nueve de la noche ya ha llamado a otra agencia cuando se le contesta al día siguiente.',
  clinica: 'En muchas clínicas, el teléfono suena en mitad de las sesiones y los huecos de las cancelaciones se quedan vacíos.',
  academia: 'En muchas academias, las matrículas de septiembre y las renovaciones de junio se comen horas, y las familias preguntan lo mismo cada semana.',
  idiomas: 'En muchas academias de idiomas, corregir simulacros se lleva las tardes del profesorado y el alumno se entera de en qué falla cuando ya es tarde.',
  autoescuela: 'En muchas autoescuelas, las prácticas se cuadran por WhatsApp y cada cancelación de última hora es un coche parado.',
  distribucion: 'En muchas distribuidoras, cada mañana alguien pasa a mano los pedidos que llegan por WhatsApp, audios incluidos.',
  consultoria: 'En muchas consultorías y agencias, cada propuesta se rehace copiando la anterior y cada cliente nuevo empieza persiguiendo accesos.',
  comercio: 'En muchos comercios, las mismas preguntas llegan por WhatsApp e Instagram mientras se atiende el mostrador.',
};

// Lo que más vendemos en cada sector, para el primer correo (si no hay, el párrafo no sale).
const OFERTA_ACADEMIA = 'También montamos plataformas para que [[tus|vuestros]] alumnos practiquen con exámenes modelo al estilo de Cambridge o IELTS, que se corrigen solos. Ellos practican desde donde quieran, [[te ahorras|os ahorráis]] horas de corrección y, desde el área del profesorado, [[ves|veis]] de un vistazo quién está listo para presentarse y qué partes conviene repasar en clase.\n\nY si [[tienes|tenéis]] en mente otros recursos digitales, los hacemos a medida. Por ejemplo, listas de vocabulario interactivas, listenings con [[tus|vuestros]] propios audios, un banco de writings con los comentarios del profesor, ejercicios dinámicos para la pizarra, una plataforma de aprendizaje completa para complementar el libro o sustituirlo, o un área para que las familias vean cómo avanza cada alumno.';
const OFERTA = {
  academia: OFERTA_ACADEMIA,
  idiomas: OFERTA_ACADEMIA,
  autoescuela: 'También montamos un portal con el nombre de [[tu|vuestra]] autoescuela donde los alumnos hacen tests del teórico que se corrigen solos y reservan sus prácticas desde el móvil. [[Ves|Veis]] quién está listo para el examen y qué temas le cuestan, y si alguien cancela, el hueco se ofrece solo a la lista de espera.',
};

// ---- Correos en español: los firma Nerea, como en Study and Beyond -------------
// Remitente «Nerea de Fluivia», texto sin tarjeta (parece escrito a mano) y, al
// final, la firma con el isotipo y el WhatsApp de España.
export const WHATSAPP_ES = '+34 635 369 915';
const WHATSAPP_URL = 'https://wa.me/34635369915';
const FIRMA_IMG = 'https://fluivia.es/assets/img/firma-correo.png';
export const FIRMA_TEXTO_ES = `Nerea Clemente\nFluivia\nWhatsApp: ${WHATSAPP_ES}\ninfo@fluivia.es\nfluivia.es`;
const direccion = (env) => (/<([^>]+)>/.exec(env.REMITENTE || '') || [])[1] || 'info@fluivia.ai';
export const remitenteNerea = (env) => `Nerea de Fluivia <${direccion(env)}>`;
export const firmaNerea = (c) => idiomaDe(c) === 'es';

export function personal(env, { asunto, texto, pie = '' }) {
  const t = String(texto).replace(/\r/g, '').trim();
  const enlace = (x) => esc(x).replace(/(https:\/\/[^\s<]+[^\s<.,;:!?)])/g, '<a href="$1" style="color:#123F35;font-weight:bold">$1</a>');
  const parrafos = t.split(/\n\s*\n/).map((p) => `<p style="margin:0 0 14px">${p.split('\n').map(enlace).join('<br>')}</p>`).join('\n');
  const F = 'Arial,Helvetica,sans-serif';
  const firma = `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:22px"><tr>
  <td style="vertical-align:top;padding:2px 14px 0 0"><img src="${FIRMA_IMG}" width="56" height="56" alt="Fluivia" style="display:block;width:56px;height:56px;border:0;border-radius:12px"></td>
  <td style="vertical-align:top;font-family:${F}">
    <div style="font:bold 17px/1.3 ${F};color:#123F35">Nerea Clemente</div>
    <div style="font:15px/1.4 ${F};color:#5B6662">Fluivia</div>
    <div style="font:14px/1.7 ${F};margin-top:8px">
      <a href="${WHATSAPP_URL}" style="color:#123F35">WhatsApp: ${WHATSAPP_ES}</a><br>
      <a href="mailto:info@fluivia.es" style="color:#123F35;text-decoration:none">info@fluivia.es</a><br>
      <a href="https://fluivia.es" style="color:#123F35;text-decoration:none">fluivia.es</a>
    </div>
  </td></tr></table>`;
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:16px;background:#FFFFFF"><div style="max-width:600px;font:15px/1.6 ${F};color:#1C2B27">
${parrafos}
${firma}
${pie ? `<p style="font-size:12px;color:#5B6662;margin-top:22px">${esc(pie)}</p>` : ''}
</div></body></html>`;
  return { from: remitenteNerea(env), subject: String(asunto).replace(/\s+/g, ' ').trim(), text: `${t}\n\n--\n${FIRMA_TEXTO_ES}`, html };
}

// El correo que se escribe desde la ficha: firmado por Nerea si es en español.
export function deFicha(env, c, asunto, texto) {
  return firmaNerea(c) ? personal(env, { asunto, texto }) : { subject: asunto, text: texto, html: html(texto) };
}

const SECTOR_DA_PLURAL = { autoescuela: 'køreskoler', idiomas: 'sprogskoler', gestoria: 'bogholderier og revisorer', inmobiliaria: 'ejendomsmæglere', clinica: 'klinikker', academia: 'skoler og kursuscentre', distribucion: 'grossister', consultoria: 'konsulenthuse og bureauer', comercio: 'butikker' };

export function rellenar(t, c, env) {
  const s = sectorTexto(c.sector);
  const nombre = (c.nombre || '').split(/\s+/)[0] || '';
  const dk = c.pais === 'DK';
  const vals = { nombre, empresa: c.empresa || (dk ? 'jer' : 'tu negocio'), sector_plural: s.plural, sector: s.una,
    sector_plural_da: SECTOR_DA_PLURAL[c.sector] || 'små virksomheder', demo: enlaceDemo(env, c.sector, c.empresa, idiomaDe(c)), cita: env.CITA_URL || 'responde a este correo y buscamos un hueco',
    oferta: OFERTA[c.sector] || '',
    asunto_sector: ASUNTO[c.sector] || 'He preparado una demo para {empresa}',
    gancho: GANCHO[c.sector] || 'Muchas pequeñas empresas pierden horas cada semana contestando lo mismo, pidiendo papeles o pasando datos de un sitio a otro.' };
  // Sin nombre de persona: «Hola:» / «Hej» en vez de «Hola, :».
  // Dos pasadas: algunos valores (el asunto del sector) llevan a su vez {empresa}.
  const poner = (x) => x.replace(/\{(\w+)\}/g, (m, k) => (k in vals ? vals[k] : m));
  return poner(poner(String(t))).replace(/\n{3,}/g, '\n\n')
    // Con nombre de persona se le habla de tú; sin él, de vosotros: [[tú|vosotros]].
    .replace(/\[\[([^|\]]*)\|([^\]]*)\]\]/g, (m, tu, vos) => (nombre ? tu : vos))
    .replace(/^Hola, ([:.])/, 'Hola$1').replace(/^Hej ([.\n])/, (m, x) => (x === '.' ? 'Hej.' : 'Hej\n'));
}
