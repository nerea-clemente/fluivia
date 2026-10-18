// ---------------------------------------------------------------------------
// Contactos: el CRM de Fluivia. Empresas y personas desde el primer contacto
// (web, demo, prospección) hasta que son clientes.
//
// Cada ficha se guarda como JSON en la tabla contactos del Durable Object; el
// email y la etapa van también en columnas para buscar y contar.
// ---------------------------------------------------------------------------

export const ETAPAS = ['nuevo', 'contactado', 'reunion', 'propuesta', 'cliente', 'perdido'];
export const SECTORES = ['gestoria', 'inmobiliaria', 'clinica', 'academia', 'distribucion', 'consultoria', 'comercio', 'otro', ''];
export const ORIGENES = ['web-demo', 'web-contacto', 'prospeccion', 'linkedin', 'recomendacion', 'evento', 'manual', 'otro'];
export const INTERESES = ['consultas', 'citas', 'documentos', 'a-medida', 'marketing', 'formacion'];
export const TIPOS = ['nota', 'llamada', 'correo', 'reunion', 'whatsapp', 'linkedin', 'web', 'etapa', 'demo', 'fiscal'];
// País del cliente a efectos de IVA: España, Dinamarca u otro país de la UE.
export const PAISES = ['ES', 'DK', 'UE'];
export const VIES_ESTADOS = ['valido', 'no-valido', 'no-disponible'];
// Sectores cuya actividad suele estar exenta de IVA en España (sanidad y enseñanza).
export const SECTORES_EXENTOS = ['clinica', 'academia'];

// NIF-IVA en mayúsculas, sin espacios ni signos, con el prefijo del país.
export function normalizarNif(v, pais = 'ES') {
  let n = String(v ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16);
  if (!n) return '';
  // España y Dinamarca: si falta el prefijo del país, se pone (en el resto de la UE se escribe con él).
  if ((pais === 'ES' || pais === 'DK') && !n.startsWith(pais)) n = pais + n;
  return n;
}
export const nifConFormato = (n) => /^[A-Z]{2}[A-Z0-9]{2,13}$/.test(n || '');

const txt = (v, n) => String(v ?? '').replace(/\u0000/g, '').slice(0, n);
const fechaIso = (v) => (/^\d{4}-\d{2}-\d{2}T[\d:.]+Z$/.test(v || '') ? v : '');
const dia = (v) => (/^\d{4}-\d{2}-\d{2}$/.test(v || '') ? v : '');
const euros = (v) => { const n = Math.round(Number(v)); return Number.isFinite(n) && n >= 0 && n < 10_000_000 ? n : 0; };
export const hoy = () => new Date().toISOString().slice(0, 10);
export const masDias = (n) => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);

export const EMAIL_OK = /^[^\s@<>"'`\\()[\];,]+@[^\s@<>"'`\\()[\];,]+\.[a-z]{2,}$/i;
export const idValido = (id) => /^[a-z0-9-]{1,80}$/.test(id || '');
export const nuevoId = () => `c-${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36)}`;

// Solo la página de empresa (o de persona) de LinkedIn, con https.
const linkedin = (v) => { const u = txt(v, 300).trim(); return /^https:\/\/([a-z]{2,3}\.)?linkedin\.com\/(company|in|school)\/[^\s]+$/i.test(u) ? u : ''; };
const conHttps = (v) => { const u = txt(v, 300).trim(); return !u || /^https?:\/\//i.test(u) ? u : `https://${u}`; };

const etiquetas = (v) => [...new Set((Array.isArray(v) ? v : []).map((x) => txt(x, 40).trim()).filter(Boolean))].slice(0, 20);

// Deja solo lo que se espera, con tamaños acotados.
export function limpiar(b = {}) {
  const d = {
    nombre: txt(b.nombre, 200).trim(),
    empresa: txt(b.empresa, 200).trim(),
    cargo: txt(b.cargo, 120).trim(),
    email: txt(b.email, 200).trim().toLowerCase(),
    telefono: txt(b.telefono, 60).trim(),
    web: txt(b.web, 300).trim(),
    linkedin: linkedin(b.linkedin),
    // De dónde salen los datos (prospección): la página donde se comprobaron.
    fuente: txt(b.fuente, 300).trim(),
    ciudad: txt(b.ciudad, 120).trim(),
    sector: SECTORES.includes(b.sector) ? b.sector : '',
    origen: ORIGENES.includes(b.origen) ? b.origen : 'manual',
    etapa: ETAPAS.includes(b.etapa) ? b.etapa : 'nuevo',
    intereses: [...new Set((Array.isArray(b.intereses) ? b.intereses : []).filter((x) => INTERESES.includes(x)))],
    implantacion: euros(b.implantacion),
    cuota: euros(b.cuota),
    mensaje: txt(b.mensaje, 4000),
    notas: txt(b.notas, 8000),
    motivo: txt(b.motivo, 300),
    etiquetas: etiquetas(b.etiquetas),
    creado: fechaIso(b.creado) || new Date().toISOString(),
    // Facturación
    pais: PAISES.includes(b.pais) ? b.pais : 'ES',
    razonSocial: txt(b.razonSocial, 200).trim(),
    nif: normalizarNif(b.nif, PAISES.includes(b.pais) ? b.pais : 'ES'),
    direccion: txt(b.direccion, 400).trim(),
  };
  d.etapas = Object.fromEntries(ETAPAS.filter((k) => dia(b.etapas?.[k])).map((k) => [k, b.etapas[k]]));
  if (!d.etapas[d.etapa]) d.etapas[d.etapa] = hoy();
  d.proxima = { fecha: dia(b.proxima?.fecha), texto: txt(b.proxima?.texto, 300).trim() };
  d.historial = (Array.isArray(b.historial) ? b.historial : []).slice(-400)
    .map((h) => ({
      fecha: fechaIso(h.fecha) || new Date().toISOString(),
      tipo: TIPOS.includes(h.tipo) ? h.tipo : 'nota',
      texto: txt(h.texto, 8000),
      asunto: txt(h.asunto, 300),
      ...(h.auto === true ? { auto: true } : {}),
      ...(txt(h.autor, 200) ? { autor: txt(h.autor, 200) } : {}),
    }))
    .filter((h) => h.texto || h.asunto);
  d.demo = b.demo && fechaIso(b.demo.fecha) ? { fecha: b.demo.fecha, enlace: txt(b.demo.enlace, 600) } : null;
  // Dejó de recibir correos (rebote o petición): no se le vuelve a escribir.
  d.noEscribir = b.noEscribir === true;
  // Resultado de la última comprobación en VIES (solo lo pone el servidor; ver fusionar).
  d.vies = b.vies && fechaIso(b.vies.fecha) && VIES_ESTADOS.includes(b.vies.estado)
    ? { estado: b.vies.estado, fecha: b.vies.fecha, nif: txt(b.vies.nif, 20), nombre: txt(b.vies.nombre, 300), direccion: txt(b.vies.direccion, 400) } : null;
  return d;
}

// Al guardar desde la ficha no se pisa lo que la web ha añadido mientras tanto.
export function fusionar(prev, d) {
  if (!prev) return d;
  const hay = new Set(d.historial.map((h) => h.fecha));
  const perdidos = (prev.historial || []).filter((h) => (h.auto || h.tipo === 'web' || h.tipo === 'demo') && !hay.has(h.fecha));
  if (perdidos.length) d.historial = [...d.historial, ...perdidos].sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  if (!d.demo && prev.demo) d.demo = prev.demo;
  // La comprobación de VIES no se cambia desde la ficha, y deja de valer si cambia el NIF.
  d.vies = prev.vies && prev.vies.nif === d.nif ? prev.vies : null;
  return d;
}

// Lo que llega de la web: si el email ya existe, se añade a esa ficha.
// tipo: 'demo' (pidió la demo) o 'contacto' (formulario de contacto).
export function deLaWeb(existente, e) {
  const ahora = new Date().toISOString();
  const c = existente ? structuredClone(existente) : {
    nombre: e.nombre, empresa: e.empresa, email: e.email, telefono: e.telefono, sector: e.sector,
    origen: e.tipo === 'demo' ? 'web-demo' : 'web-contacto', etapa: 'nuevo', etapas: { nuevo: hoy() },
    historial: [], creado: ahora,
  };
  for (const k of ['nombre', 'empresa', 'telefono', 'sector']) if (!c[k] && e[k]) c[k] = e[k];
  const enIdioma = e.idioma === 'en' ? ' (desde la web en inglés)' : e.idioma === 'da' ? ' (desde la web en danés)' : '';
  const texto = e.tipo === 'demo'
    ? `Ha pedido la demo desde la web${enIdioma}${e.empresa ? ` para ${e.empresa}` : ''}. Se le ha enviado por correo.`
    : [`Ha escrito desde el formulario de contacto${enIdioma}.`, e.mensaje ? `Mensaje: ${e.mensaje}` : ''].filter(Boolean).join('\n\n');
  c.historial = [...(c.historial || []), { fecha: ahora, tipo: e.tipo === 'demo' ? 'demo' : 'web', texto, auto: true }];
  if (e.tipo === 'demo' && e.enlace) c.demo = { fecha: ahora, enlace: e.enlace };
  if (e.mensaje && e.tipo !== 'demo') c.mensaje = [c.mensaje, e.mensaje].filter(Boolean).join('\n\n—\n\n');
  // Si ya es cliente o está perdido, no se cambia la etapa; si no, toca escribirle.
  if (!['cliente', 'perdido'].includes(c.etapa)) {
    c.proxima = e.tipo === 'demo'
      ? { fecha: masDias(2), texto: 'Preguntarle qué le ha parecido la demo' }
      : { fecha: hoy(), texto: 'Contestar a su mensaje' };
  }
  return limpiar(c);
}

// Una empresa de la lista de prospección: ficha nueva en «nuevo», con la próxima
// acción repartida para no tener que escribir a todas el mismo día.
export function deProspeccion(e, fecha, autor) {
  const pais = ['ES', 'DK'].includes(e.pais) ? e.pais : 'ES';
  const canal = linkedin(e.linkedin) ? 'linkedin' : (EMAIL_OK.test(e.email || '') ? 'correo' : (e.telefono ? 'llamada' : 'web'));
  const QUE = {
    linkedin: 'Primer mensaje por LinkedIn',
    correo: 'Primer correo (corto y personal)',
    llamada: 'Llamar para presentarte',
    web: 'Buscar cómo contactar (web o LinkedIn)',
  };
  const ahora = new Date().toISOString();
  return limpiar({
    empresa: e.empresa, nombre: e.persona ? String(e.persona).split(',')[0] : '', cargo: e.persona && String(e.persona).includes(',') ? String(e.persona).split(',').slice(1).join(',').trim() : '',
    email: EMAIL_OK.test(e.email || '') ? e.email : '', telefono: e.telefono, web: conHttps(e.web), ciudad: e.ciudad,
    linkedin: e.linkedin, fuente: e.fuente, sector: SECTORES.includes(e.sector) ? e.sector : 'otro',
    origen: 'prospeccion', etapa: 'nuevo', pais, nif: pais === 'DK' && /^\d{8}$/.test(String(e.cvr || '').replace(/\D/g, '')) ? 'DK' + String(e.cvr).replace(/\D/g, '') : '',
    notas: txt(e.nota, 1000), etiquetas: ['prospección', pais === 'DK' ? 'Dinamarca' : 'España'],
    proxima: { fecha, texto: QUE[canal] }, creado: ahora,
    historial: [{ fecha: ahora, tipo: 'nota', texto: `Añadida a la lista de prospección.${e.fuente ? ` Datos de ${txt(e.fuente, 300)}` : ''}`, auto: true, ...(autor ? { autor } : {}) }],
  });
}

// Para no repetir empresas: por correo, por web (sin www) o por nombre y ciudad.
export function clavesDe(c) {
  const n = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
  let host = '';
  try { host = c.web ? new URL(/^https?:/i.test(c.web) ? c.web : `https://${c.web}`).hostname.replace(/^www\./, '') : ''; } catch { host = ''; }
  return [c.email ? `e:${String(c.email).toLowerCase()}` : '', host ? `w:${host}` : '', c.empresa ? `n:${n(c.empresa)}|${n(c.ciudad)}` : ''].filter(Boolean);
}

// Cambio de etapa con su apunte en el historial.
export function cambiarEtapa(c, etapa, autor) {
  if (!ETAPAS.includes(etapa) || c.etapa === etapa) return c;
  const n = structuredClone(c);
  n.historial.push({ fecha: new Date().toISOString(), tipo: 'etapa', texto: `${NOMBRE_ETAPA[c.etapa]} → ${NOMBRE_ETAPA[etapa]}`, autor });
  n.etapa = etapa;
  n.etapas = { ...n.etapas, [etapa]: hoy() };
  if (['cliente', 'perdido'].includes(etapa)) n.proxima = { fecha: '', texto: '' };
  return limpiar(n);
}

export const NOMBRE_ETAPA = { nuevo: 'Nuevo', contactado: 'Contactado', reunion: 'Reunión', propuesta: 'Propuesta', cliente: 'Cliente', perdido: 'Perdido' };

// Para el CSV: una fila por contacto.
export function csv(lista) {
  const cols = ['nombre', 'empresa', 'cargo', 'email', 'telefono', 'linkedin', 'web', 'sector', 'ciudad', 'origen', 'etapa', 'implantacion', 'cuota', 'proxima_fecha', 'proxima', 'pais', 'razonSocial', 'nif', 'vies', 'direccion', 'creado'];
  const celda = (v) => {
    let s = String(v ?? '');
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`; // que una hoja de cálculo no lo tome por fórmula
    return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const filas = lista.map((c) => cols.map((k) => celda(k === 'proxima_fecha' ? c.proxima?.fecha : k === 'proxima' ? c.proxima?.texto : k === 'vies' ? (c.vies?.estado || '') : c[k])).join(';'));
  return '﻿' + [cols.join(';'), ...filas].join('\r\n');
}
