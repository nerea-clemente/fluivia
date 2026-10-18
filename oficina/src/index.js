// ---------------------------------------------------------------------------
// Worker de la Oficina de Fluivia (fluivia-oficina).
//
// Acceso: se entra con un código de 6 cifras que llega por correo (Resend), solo
// para los emails de EMAILS_PERMITIDOS. La sesión es una cookie HttpOnly de 7
// días; en el servidor solo se guarda su hash. Todo (páginas y API) exige sesión,
// menos la página de entrada y los formularios de la web.
//
// Formularios de la web (sin sesión, solo desde WEB_ORIGENES):
//   POST /api/publico/demo       pedir la demo: crea o completa el contacto,
//                                le manda la demo y te avisa
//   POST /api/publico/contacto   formulario de contacto: crea o completa el
//                                contacto y te avisa
//
// Desde Netlify (la web está allí, con Netlify Forms, como Study and Beyond):
//   POST /api/entrada/web        lo manda netlify/functions/submission-created.mjs,
//                                firmado con «Authorization: Bearer ENTRADA_SECRETO».
//                                Crea o completa el contacto y te avisa; la demo
//                                ya la ha mandado Netlify.
//
// API con sesión:
//   GET  /api/yo · GET /api/contactos · GET /api/contactos.csv
//   GET/PUT/DELETE /api/contactos/:id
//   POST /api/contactos/:id/correo   enviar un correo y apuntarlo en el historial
//   POST /api/contactos/:id/vies     comprobar su NIF-IVA en VIES
//   GET  /api/plantillas?contacto=:id   enlace de su demo y plantillas ya rellenas
//   POST /api/acceso/salir · POST /api/acceso/salir-todas
//
// Tareas programadas: copia de seguridad en R2 (02:30 UTC) y resumen de
// «hoy te toca» por correo (06:45 UTC).
// ---------------------------------------------------------------------------
import { Oficina } from './store.js';
import * as C from './contactos.js';
import * as Correo from './correo.js';
import * as Vies from './vies.js';

export { Oficina };

const SESION_DIAS = 7;
const PUBLICAS = ['/entrar.html', '/css/oficina.css', '/js/entrar.js', '/img/logo.svg', '/img/favicon.svg', '/favicon.ico'];

const json = (datos, status = 200, extra = {}) => new Response(JSON.stringify(datos), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra } });
const cookie = (req, nombre) => (req.headers.get('cookie') || '').split(/;\s*/).map((c) => c.split('=')).find(([k]) => k === nombre)?.[1];
const lista = (v) => String(v || '').split(',').map((x) => x.trim().toLowerCase()).filter(Boolean);

async function sha256(t) {
  return [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)))].map((b) => b.toString(16).padStart(2, '0')).join('');
}
// En producción, los datos viven en la UE. En local (DEV=1) no existe esa opción.
const almacen = (env) => env.OFICINA.get(env.DEV === '1' ? env.OFICINA.idFromName('oficina') : env.OFICINA.jurisdiction('eu').idFromName('oficina'));

// Cabeceras de seguridad para todo lo que sirve la Oficina.
function seguro(res) {
  const r = new Response(res.body, res);
  r.headers.set('x-frame-options', 'DENY');
  r.headers.set('x-content-type-options', 'nosniff');
  r.headers.set('referrer-policy', 'same-origin');
  r.headers.set('x-robots-tag', 'noindex, nofollow');
  r.headers.set('content-security-policy', "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
  return r;
}

// ---- Acceso --------------------------------------------------------------------
async function acceso(req, env, store, url) {
  if (req.method !== 'POST') return json({ error: 'Método no permitido' }, 405);
  let b = {};
  try { b = await req.json(); } catch { return json({ error: 'Datos no válidos' }, 400); }
  const email = String(b.email || '').trim().toLowerCase();
  const permitidos = lista(env.EMAILS_PERMITIDOS);
  const ip = req.headers.get('cf-connecting-ip') || 'local';

  if (url.pathname === '/api/acceso/codigo') {
    if (!(await store.limitar(`ip:${ip}`, 20, 3600)) || !(await store.limitar(`codigo:${email}`, 5, 3600))) {
      return json({ error: 'Demasiados intentos. Prueba dentro de un rato.' }, 429);
    }
    // Se responde igual tanto si el email está permitido como si no.
    if (permitidos.includes(email)) {
      const codigo = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, '0');
      await store.guardarCodigo(email, await sha256(`${email}:${codigo}`), Date.now() + 10 * 60000);
      const texto = `Tu código para entrar en la Oficina de Fluivia es:\n\n${codigo}\n\nCaduca en 10 minutos. Si no lo has pedido tú, ignora este correo.`;
      if (env.DEV === '1') console.log(`[oficina] código para ${email}: ${codigo}`);
      else {
        try { await Correo.enviar(env, { to: [email], subject: `Código para la Oficina: ${codigo}`, text: texto, html: Correo.html(texto) }); }
        catch (e) { console.error('[acceso]', e); return json({ error: 'No se ha podido enviar el código.' }, 502); }
      }
    }
    return json({ ok: true });
  }

  if (url.pathname === '/api/acceso/entrar') {
    if (!(await store.limitar(`entrar:${ip}`, 30, 3600))) return json({ error: 'Demasiados intentos. Prueba dentro de un rato.' }, 429);
    const codigo = String(b.codigo || '').trim();
    if (!/^\d{6}$/.test(codigo) || !permitidos.includes(email)) return json({ error: 'Revisa el código' }, 400);
    const r = await store.comprobarCodigo(email, await sha256(`${email}:${codigo}`));
    if (r !== 'ok') return json({ error: r === 'mal' ? 'El código no es correcto' : 'El código ha caducado. Pide otro.' }, 400);
    const token = [...crypto.getRandomValues(new Uint8Array(32))].map((x) => x.toString(16).padStart(2, '0')).join('');
    await store.crearSesion(await sha256(token), email, Date.now() + SESION_DIAS * 864e5);
    const segura = url.protocol === 'https:' ? '; Secure' : '';
    return json({ ok: true }, 200, { 'set-cookie': `of_sesion=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESION_DIAS * 86400}${segura}` });
  }
  return json({ error: 'No encontrado' }, 404);
}

// ---- Formularios de la web -------------------------------------------------------
const SECTOR_DE_TEXTO = [
  [/gestor|asesor/i, 'gestoria'], [/inmobiliar/i, 'inmobiliaria'], [/cl[ií]nica|salud/i, 'clinica'],
  [/academia|formaci/i, 'academia'], [/distribu/i, 'distribucion'], [/consultor|agencia/i, 'consultoria'], [/comercio|tienda/i, 'comercio'],
];
const sectorDe = (v) => (C.SECTORES.includes(v) && v ? v : (SECTOR_DE_TEXTO.find(([re]) => re.test(v || '')) || [null, 'otro'])[1]);
const limpio = (v, max) => String(v || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);

function cors(req, env) {
  const origen = req.headers.get('origin') || '';
  const ok = lista(env.WEB_ORIGENES).includes(origen.toLowerCase());
  return { ok, cab: ok ? { 'access-control-allow-origin': origen, 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type', vary: 'origin' } : {} };
}

async function publico(req, env, store, url, ctx) {
  const { ok, cab } = cors(req, env);
  if (req.method === 'OPTIONS') return new Response(null, { status: ok ? 204 : 403, headers: cab });
  if (req.method !== 'POST') return json({ error: 'Método no permitido' }, 405, cab);
  if (!ok) return json({ error: 'Origen no permitido' }, 403, cab);

  let b;
  const tipoCuerpo = req.headers.get('content-type') || '';
  try {
    if (tipoCuerpo.includes('application/json')) b = await req.json();
    else b = Object.fromEntries(await req.formData());
  } catch { return json({ error: 'Datos no válidos' }, 400, cab); }

  // Trampa para bots: campo oculto relleno o envío en menos de 3 segundos.
  if (b.web || (b.segundos !== undefined && Number(b.segundos) < 3)) return json({ ok: true }, 200, cab);
  const ip = req.headers.get('cf-connecting-ip') || 'local';
  if (!(await store.limitar(`web:${ip}`, 10, 3600))) return json({ error: 'Demasiados envíos' }, 429, cab);

  const tipo = url.pathname.endsWith('/demo') ? 'demo' : 'contacto';
  const e = {
    tipo,
    nombre: limpio(b.nombre, 120), email: limpio(b.email, 200).toLowerCase(),
    empresa: limpio(b.negocio || b.empresa, 60), telefono: limpio(b.telefono, 40),
    sector: sectorDe(limpio(b.sector, 60)), mensaje: String(b.mensaje || '').trim().slice(0, 4000),
    idioma: ['es', 'en', 'da'].includes(b.idioma) ? b.idioma : (/\/(en|da)\//.exec(req.headers.get('referer') || '') || [])[1] || 'es',
  };
  if (!e.nombre || !C.EMAIL_OK.test(e.email) || (tipo === 'demo' && !e.empresa) || (tipo === 'contacto' && !e.mensaje)) {
    return json({ error: 'Faltan datos' }, 400, cab);
  }
  if (!(await store.limitar(`email:${e.email}`, 3, 600))) return json({ ok: true }, 200, cab);

  if (tipo === 'demo') {
    e.enlace = Correo.enlaceDemo(env, e.sector, e.empresa);
    try { await Correo.enviar(env, Correo.correoDemo(env, e, e.enlace)); }
    catch (err) { console.error('[demo]', err); return json({ error: 'No se ha podido enviar' }, 502, cab); }
  }
  const r = await store.contactoDeLaWeb(e);
  // El aviso no retrasa la respuesta.
  ctx.waitUntil(avisar(env, e, r, url).catch((err) => console.error('[aviso]', err)));
  return json({ ok: true }, 200, cab);
}

// Entrada desde Netlify: misma ficha y mismo aviso que los formularios públicos.
async function entradaWeb(req, env, store, url, ctx) {
  if (req.method !== 'POST') return json({ error: 'Método no permitido' }, 405);
  // Se llama ENTRADA_SECRETO, pero también vale con el nombre que tiene en Netlify.
  const secreto = String(env.ENTRADA_SECRETO || env.OFICINA_SECRETO || '');
  const dado = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (secreto.length < 16 || !(await mismoSecreto(dado, secreto))) return json({ error: 'No autorizado' }, 401);
  let b;
  try { b = await req.json(); } catch { return json({ error: 'Datos no válidos' }, 400); }
  const tipo = b.tipo === 'demo' ? 'demo' : 'contacto';
  const e = {
    tipo,
    nombre: limpio(b.nombre, 120), email: limpio(b.email, 200).toLowerCase(),
    empresa: limpio(b.empresa, 60), telefono: limpio(b.telefono, 40),
    sector: sectorDe(limpio(b.sector, 60)), mensaje: String(b.mensaje || '').trim().slice(0, 4000),
    idioma: ['es', 'en', 'da'].includes(b.idioma) ? b.idioma : 'es',
  };
  if (!e.nombre || !C.EMAIL_OK.test(e.email)) return json({ error: 'Faltan datos' }, 400);
  if (tipo === 'demo' && b.demoEnviada && /^https:\/\//.test(b.enlace || '')) e.enlace = String(b.enlace).slice(0, 600);
  const r = await store.contactoDeLaWeb(e);
  ctx.waitUntil(avisar(env, e, r, url).catch((err) => console.error('[aviso]', err)));
  return json({ ok: true, id: r.id });
}

// Compara dos secretos sin dar pistas por el tiempo que tarda.
async function mismoSecreto(a, b) {
  const h = async (x) => new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(x)));
  const [x, y] = await Promise.all([h(a), h(b)]);
  let dif = 0;
  for (let i = 0; i < x.length; i++) dif |= x[i] ^ y[i];
  return dif === 0;
}

async function avisar(env, e, r, url) {
  if (!env.AVISOS) return;
  const ficha = `${url.origin}/ficha.html?id=${r.id}`;
  const que = e.tipo === 'demo' ? `ha pedido la demo para ${e.empresa}` : 'te ha escrito desde la web';
  const texto = [`${e.nombre} ${que}${r.nuevo ? '' : ' (ya estaba en tus contactos)'}.`,
    `Correo: ${e.email}${e.telefono ? `\nTeléfono: ${e.telefono}` : ''}\nSector: ${Correo.sectorTexto(e.sector).una}`,
    e.mensaje ? `Mensaje:\n${e.mensaje}` : '', `Ficha: ${ficha}`].filter(Boolean).join('\n\n');
  await Correo.enviar(env, { to: lista(env.AVISOS), reply_to: e.email, subject: e.tipo === 'demo' ? `Demo pedida: ${e.empresa}` : `Mensaje de la web: ${e.nombre}`, text: texto });
}

// ---- API de contactos -------------------------------------------------------------
async function api(req, env, store, url, email) {
  const partes = url.pathname.split('/').filter(Boolean); // api, contactos, :id, accion
  if (url.pathname === '/api/yo') return json({ email });
  if (url.pathname === '/api/contactos' && req.method === 'GET') return json(await store.contactos());
  if (url.pathname === '/api/contactos.csv' && req.method === 'GET') {
    return new Response(C.csv(await store.contactos()), { headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': `attachment; filename="contactos-fluivia-${C.hoy()}.csv"`, 'cache-control': 'no-store' } });
  }
  if (url.pathname === '/api/plantillas' && req.method === 'GET') {
    const c = await store.leerContacto(url.searchParams.get('contacto') || '');
    if (!c) return json({ error: 'No existe ese contacto' }, 404);
    return json({
      demo: Correo.enlaceDemo(env, c.sector, c.empresa),
      plantillas: Object.entries(Correo.PLANTILLAS).map(([k, p]) => ({ k, nombre: p.nombre, asunto: Correo.rellenar(p.asunto, c, env), texto: Correo.rellenar(p.texto, c, env) })),
    });
  }
  if (partes[1] === 'contactos' && C.idValido(partes[2])) {
    const id = partes[2];
    if (!partes[3]) {
      if (req.method === 'GET') { const c = await store.leerContacto(id); return c ? json(c) : json({ error: 'No existe ese contacto' }, 404); }
      if (req.method === 'PUT') {
        const b = await req.json();
        const d = C.limpiar(b);
        if (!d.nombre && !d.empresa && !d.email) return json({ error: 'Pon al menos un nombre, una empresa o un email' }, 400);
        if (d.email && !C.EMAIL_OK.test(d.email)) return json({ error: 'El email no es válido' }, 400);
        const otro = d.email ? await store.porEmail(d.email) : null;
        if (otro && otro !== id) return json({ error: 'Ya hay otro contacto con ese email', id: otro }, 409);
        const r = await store.guardarDesdeFicha(id, d, email, typeof b.actualizado === 'string' ? b.actualizado : '');
        return r.conflicto ? json({ error: 'Alguien ha cambiado esta ficha mientras la editabas. Recarga para ver la última versión.', actual: r.actual }, 409) : json(r);
      }
      if (req.method === 'DELETE') return json(await store.borrarContacto(id));
    }
    if (partes[3] === 'vies' && req.method === 'POST') {
      const c = await store.leerContacto(id);
      if (!c) return json({ error: 'No existe ese contacto' }, 404);
      if (!C.nifConFormato(c.nif)) return json({ error: 'Guarda primero un NIF-IVA con el prefijo del país (por ejemplo ESB12345678)' }, 400);
      if (!(await store.limitar(`vies:${email}`, 30, 3600))) return json({ error: 'Demasiadas comprobaciones seguidas. Prueba dentro de un rato.' }, 429);
      const r = await Vies.comprobar(c.nif, env.DEV === '1' && env.VIES_PRUEBA === '1' ? viesSimulado : undefined);
      return json(await store.guardarVies(id, { ...r, nif: c.nif }, email));
    }
    if (partes[3] === 'correo' && req.method === 'POST') {
      const c = await store.leerContacto(id);
      if (!c) return json({ error: 'No existe ese contacto' }, 404);
      if (!C.EMAIL_OK.test(c.email || '')) return json({ error: 'Este contacto no tiene un email válido' }, 400);
      if (c.noEscribir) return json({ error: 'Este contacto pidió no recibir más correos' }, 400);
      const b = await req.json();
      const asunto = String(b.asunto || '').trim().slice(0, 200), texto = String(b.texto || '').trim().slice(0, 10000);
      if (!asunto || !texto) return json({ error: 'Falta el asunto o el texto' }, 400);
      try { await Correo.enviar(env, { to: [c.email], reply_to: lista(env.AVISOS)[0] || undefined, subject: asunto, text: texto, html: Correo.html(texto) }); }
      catch (e) { console.error('[correo]', e); return json({ error: 'No se ha podido enviar el correo' }, 502); }
      return json(await store.anadirHistorial(id, { tipo: 'correo', asunto, texto }, email));
    }
  }
  return json({ error: 'No encontrado' }, 404);
}

// Solo en local (DEV=1 y VIES_PRUEBA=1): VIES simulado. Los NIF con «0000» salen no válidos.
const viesSimulado = async (url) => new Response(JSON.stringify(/0000/.test(url)
  ? { isValid: false, userError: 'INVALID' } : { isValid: true, userError: 'VALID', name: 'EMPRESA DE PRUEBA SL', address: 'CALLE MAYOR 1\n28001 MADRID' }));

// ---- Tareas programadas ---------------------------------------------------------------
async function copia(env) {
  if (!env.COPIAS) return;
  const store = almacen(env);
  const datos = { fecha: new Date().toISOString(), ...(await store.exportar()) };
  await env.COPIAS.put(`copias/${C.hoy()}.json`, JSON.stringify(datos), { httpMetadata: { contentType: 'application/json' } });
  // Se guardan 60 días.
  const viejas = await env.COPIAS.list({ prefix: 'copias/' });
  const limite = new Date(Date.now() - 60 * 864e5).toISOString().slice(0, 10);
  for (const o of viejas.objects) if (o.key.slice(7, 17) < limite) await env.COPIAS.delete(o.key);
}

export function teToca(lista_) {
  const h = C.hoy();
  return lista_.filter((c) => c.proxima?.fecha && c.proxima.fecha <= h && !['cliente', 'perdido'].includes(c.etapa))
    .sort((a, b) => (a.proxima.fecha < b.proxima.fecha ? -1 : 1));
}

async function resumenDiario(env, origen) {
  if (!env.AVISOS) return;
  const store = almacen(env);
  const toca = teToca(await store.contactos());
  if (!toca.length) return;
  const lineas = toca.map((c) => `· ${c.empresa || c.nombre}${c.empresa && c.nombre ? ` (${c.nombre})` : ''}: ${c.proxima.texto || 'sin detalle'}${c.proxima.fecha < C.hoy() ? ` · desde el ${c.proxima.fecha.split('-').reverse().join('/')}` : ''}`);
  const texto = [`Buenos días. Hoy te toca escribir o llamar a ${toca.length} ${toca.length === 1 ? 'contacto' : 'contactos'}:`, lineas.join('\n'), `Ábrelos en la Oficina: ${origen}/`].join('\n\n');
  await Correo.enviar(env, { to: lista(env.AVISOS), subject: `Hoy te toca: ${toca.length} ${toca.length === 1 ? 'contacto' : 'contactos'}`, text: texto });
}

// ---- Entrada ----------------------------------------------------------------------------
export default {
  async fetch(req, env, ctx) {
    try { return seguro(await atender(req, env, ctx)); }
    catch (e) { console.error('[oficina]', e); return seguro(json({ error: 'Error en la Oficina' }, 500)); }
  },
  async scheduled(evento, env, ctx) {
    if (evento.cron === '30 2 * * *') ctx.waitUntil(copia(env));
    else ctx.waitUntil(resumenDiario(env, env.OFICINA_URL || 'https://fluivia-oficina.info-fluivia.workers.dev'));
  },
};

async function atender(req, env, ctx) {
  const url = new URL(req.url);
  const store = almacen(env);

  if (url.pathname.startsWith('/api/publico/')) return publico(req, env, store, url, ctx);
  if (url.pathname === '/api/entrada/web') return entradaWeb(req, env, store, url, ctx);
  if (url.pathname.startsWith('/api/acceso/') && !url.pathname.startsWith('/api/acceso/salir')) return acceso(req, env, store, url);
  if (PUBLICAS.includes(url.pathname) || url.pathname.startsWith('/fonts/')) return env.ASSETS.fetch(req);

  const t = cookie(req, 'of_sesion');
  const email = t ? await store.sesion(await sha256(t)) : null;
  if (!email) {
    if (url.pathname.startsWith('/api/')) return json({ error: 'Sesión caducada' }, 401);
    return Response.redirect(`${url.origin}/entrar.html`, 302);
  }

  // Las peticiones que cambian datos solo desde la propia Oficina.
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const origen = req.headers.get('origin');
    if (origen && origen !== url.origin) return json({ error: 'Origen no permitido' }, 403);
  }

  if (url.pathname === '/api/acceso/salir') {
    await store.cerrarSesion(await sha256(t));
    return json({ ok: true }, 200, { 'set-cookie': 'of_sesion=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0' });
  }
  if (url.pathname === '/api/acceso/salir-todas') {
    const n = await store.cerrarTodas();
    return json({ ok: true, sesiones: n }, 200, { 'set-cookie': 'of_sesion=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0' });
  }
  if (url.pathname.startsWith('/api/')) return api(req, env, store, url, email);
  const res = await env.ASSETS.fetch(url.pathname === '/' ? new Request(`${url.origin}/index.html`, req) : req);
  const r = new Response(res.body, res);
  r.headers.set('cache-control', 'no-store');
  return r;
}
