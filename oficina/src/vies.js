// ---------------------------------------------------------------------------
// Comprobación del NIF-IVA en VIES, la base de datos de la Comisión Europea.
// Un NIF válido en VIES es la prueba de que facturas a una empresa de otro país
// de la UE: la factura va sin IVA danés y con inversión del sujeto pasivo.
// ---------------------------------------------------------------------------

const URL_VIES = 'https://ec.europa.eu/taxation_customs/vies/rest-api/ms';

// Devuelve { estado: 'valido' | 'no-valido' | 'no-disponible', nombre, direccion, detalle }.
export async function comprobar(nif, fetcher = fetch) {
  const pais = nif.slice(0, 2), numero = nif.slice(2);
  // Grecia usa «EL» en VIES aunque su código de país sea GR.
  const ms = pais === 'GR' ? 'EL' : pais;
  let res;
  try {
    res = await fetcher(`${URL_VIES}/${encodeURIComponent(ms)}/vat/${encodeURIComponent(numero)}`, { headers: { accept: 'application/json' } });
  } catch (e) {
    return { estado: 'no-disponible', detalle: 'No se ha podido conectar con VIES' };
  }
  if (!res.ok) return { estado: 'no-disponible', detalle: `VIES respondió ${res.status}` };
  let d;
  try { d = await res.json(); } catch { return { estado: 'no-disponible', detalle: 'Respuesta de VIES no válida' }; }
  const valido = d.isValid === true || d.valid === true;
  const errorUsuario = String(d.userError || '');
  // VIES responde «no válido» también cuando el servicio de ese país está caído.
  if (!valido && errorUsuario && errorUsuario !== 'VALID' && errorUsuario !== 'INVALID') {
    return { estado: 'no-disponible', detalle: `VIES no ha podido comprobarlo ahora (${errorUsuario})` };
  }
  const limpio = (t) => (t && t !== '---' ? String(t).replace(/\s*\n\s*/g, ', ').trim().slice(0, 400) : '');
  return { estado: valido ? 'valido' : 'no-valido', nombre: limpio(d.name), direccion: limpio(d.address) };
}
