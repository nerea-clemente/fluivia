// ---------------------------------------------------------------------------
// Los datos de la Oficina: un Durable Object con SQLite, creado en la UE.
// Tablas: contactos, accesos (códigos, sesiones y límites) y meta.
// ---------------------------------------------------------------------------
import { DurableObject } from 'cloudflare:workers';
import * as Contactos from './contactos.js';
import * as Correo from './correo.js';

const TABLAS_DATOS = ['contactos', 'meta', 'programados'];

export class Oficina extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec(`CREATE TABLE IF NOT EXISTS contactos (
      id TEXT PRIMARY KEY, email TEXT, etapa TEXT, datos TEXT NOT NULL, autor TEXT, actualizado TEXT NOT NULL)`);
    this.sql.exec('CREATE INDEX IF NOT EXISTS contactos_email ON contactos (email)');
    this.sql.exec('CREATE TABLE IF NOT EXISTS codigos (email TEXT PRIMARY KEY, hash TEXT NOT NULL, expira INTEGER NOT NULL, intentos INTEGER NOT NULL DEFAULT 0)');
    this.sql.exec('CREATE TABLE IF NOT EXISTS sesiones (token_hash TEXT PRIMARY KEY, email TEXT NOT NULL, expira INTEGER NOT NULL, creada TEXT NOT NULL)');
    this.sql.exec('CREATE TABLE IF NOT EXISTS limites (clave TEXT NOT NULL, ts INTEGER NOT NULL)');
    this.sql.exec('CREATE TABLE IF NOT EXISTS meta (clave TEXT PRIMARY KEY, valor TEXT)');
    // Correos programados: salen solos a su hora con la alarma del Durable Object.
    this.sql.exec(`CREATE TABLE IF NOT EXISTS programados (
      id TEXT PRIMARY KEY, contacto TEXT NOT NULL, asunto TEXT NOT NULL, texto TEXT NOT NULL,
      cuando INTEGER NOT NULL, autor TEXT, creado TEXT NOT NULL, estado TEXT NOT NULL DEFAULT 'pendiente', error TEXT)`);
  }

  // ---- Acceso ----------------------------------------------------------------
  // true si todavía se puede: como mucho `max` veces en `ventana` segundos.
  limitar(clave, max, ventana) {
    const t = Date.now();
    this.sql.exec('DELETE FROM limites WHERE ts < ?', t - 86400000);
    const n = this.sql.exec('SELECT COUNT(*) AS n FROM limites WHERE clave = ? AND ts > ?', clave, t - ventana * 1000).one().n;
    if (n >= max) return false;
    this.sql.exec('INSERT INTO limites (clave, ts) VALUES (?, ?)', clave, t);
    return true;
  }
  guardarCodigo(email, hash, expira) {
    this.sql.exec(`INSERT INTO codigos (email, hash, expira, intentos) VALUES (?, ?, ?, 0)
      ON CONFLICT(email) DO UPDATE SET hash = excluded.hash, expira = excluded.expira, intentos = 0`, email, hash, expira);
  }
  comprobarCodigo(email, hash) {
    const c = this.sql.exec('SELECT * FROM codigos WHERE email = ?', email).toArray()[0];
    if (!c || c.expira < Date.now() || c.intentos >= 5) return 'caducado';
    if (c.hash !== hash) { this.sql.exec('UPDATE codigos SET intentos = intentos + 1 WHERE email = ?', email); return 'mal'; }
    this.sql.exec('DELETE FROM codigos WHERE email = ?', email);
    return 'ok';
  }
  crearSesion(token_hash, email, expira) {
    this.sql.exec('DELETE FROM sesiones WHERE expira < ?', Date.now());
    this.sql.exec('INSERT INTO sesiones (token_hash, email, expira, creada) VALUES (?, ?, ?, ?)', token_hash, email, expira, new Date().toISOString());
  }
  sesion(token_hash) {
    return this.sql.exec('SELECT email FROM sesiones WHERE token_hash = ? AND expira > ?', token_hash, Date.now()).toArray()[0]?.email || null;
  }
  cerrarSesion(token_hash) { this.sql.exec('DELETE FROM sesiones WHERE token_hash = ?', token_hash); }
  cerrarTodas() { return this.sql.exec('DELETE FROM sesiones RETURNING token_hash').toArray().length; }

  // ---- Meta (estado de la web, últimos avisos) ---------------------------------
  anotar(clave, valor) { this.sql.exec('INSERT INTO meta (clave, valor) VALUES (?, ?) ON CONFLICT(clave) DO UPDATE SET valor = excluded.valor', clave, JSON.stringify(valor)); }
  leerClave(clave) { const r = this.sql.exec('SELECT valor FROM meta WHERE clave = ?', clave).toArray()[0]; return r ? JSON.parse(r.valor) : null; }

  // ---- Contactos --------------------------------------------------------------
  contactos() {
    return this.sql.exec('SELECT id, datos, actualizado FROM contactos').toArray()
      .map((r) => ({ id: r.id, actualizado: r.actualizado, ...JSON.parse(r.datos) }));
  }
  leerContacto(id) {
    const r = this.sql.exec('SELECT datos, actualizado FROM contactos WHERE id = ?', id).toArray()[0];
    return r ? { id, actualizado: r.actualizado, ...JSON.parse(r.datos) } : null;
  }
  guardarContacto(id, d, autor) {
    const actualizado = new Date().toISOString();
    const datos = { ...d }; delete datos.id; delete datos.actualizado;
    this.sql.exec(`INSERT INTO contactos (id, email, etapa, datos, autor, actualizado) VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET email = excluded.email, etapa = excluded.etapa, datos = excluded.datos, autor = excluded.autor, actualizado = excluded.actualizado`,
      id, datos.email || '', datos.etapa, JSON.stringify(datos), autor || '', actualizado);
    return { id, actualizado, ...datos };
  }
  // Guardar desde la ficha: el cambio de etapa queda en el historial y no se pisa
  // lo que haya entrado desde la web mientras tanto. `antes` es la fecha de la
  // versión que se editó: si alguien la cambió después, se avisa.
  guardarDesdeFicha(id, d, autor, antes) {
    const prev = this.leerContacto(id);
    if (prev && antes && prev.actualizado !== antes) {
      const nuevasWeb = (prev.historial || []).some((h) => (h.tipo === 'web' || h.tipo === 'demo') && h.fecha > antes);
      if (!nuevasWeb && prev.actualizado > antes) return { conflicto: true, actual: prev };
    }
    let n = Contactos.fusionar(prev, d);
    if (prev && prev.etapa !== n.etapa) {
      const etapa = n.etapa; n.etapa = prev.etapa;
      n = Contactos.cambiarEtapa(n, etapa, autor);
    }
    if (!prev) n.historial = [{ fecha: new Date().toISOString(), tipo: 'nota', texto: 'Contacto creado a mano.', auto: true, autor }, ...n.historial];
    return this.guardarContacto(id, n, autor);
  }
  anadirHistorial(id, entrada, autor) {
    const c = this.leerContacto(id);
    if (!c) return null;
    if (entrada.tipo === 'correo') c.borrador = null;
    c.historial = [...(c.historial || []), { fecha: new Date().toISOString(), ...entrada, autor }];
    return this.guardarContacto(id, Contactos.limpiar(c), autor);
  }
  // Resultado de VIES: se guarda en la ficha y queda en el historial.
  guardarVies(id, r, autor) {
    const c = this.leerContacto(id);
    if (!c) return null;
    const fecha = new Date().toISOString();
    if (r.estado !== 'no-disponible') c.vies = { estado: r.estado, fecha, nif: r.nif, nombre: r.nombre || '', direccion: r.direccion || '' };
    const texto = r.estado === 'valido' ? `NIF-IVA ${r.nif} válido en VIES${r.nombre ? `: ${r.nombre}` : ''}. Se le puede facturar sin IVA danés, con inversión del sujeto pasivo.`
      : r.estado === 'no-valido' ? `NIF-IVA ${r.nif} no válido en VIES. Hasta que se dé de alta en operaciones intracomunitarias (ROI), habría que cobrarle el 25 % de IVA danés.`
      : `No se ha podido comprobar el NIF-IVA ${r.nif} en VIES. ${r.detalle || ''}`.trim();
    c.historial = [...(c.historial || []), { fecha, tipo: 'fiscal', texto, autor }];
    const g = this.guardarContacto(id, Contactos.limpiar(c), autor);
    return { ...g, viesResultado: r };
  }
  borrarContacto(id) { this.sql.exec('DELETE FROM contactos WHERE id = ?', id); return { ok: true }; }
  porEmail(email) { return this.sql.exec('SELECT id FROM contactos WHERE email = ? LIMIT 1', email).toArray()[0]?.id || null; }
  // Entrada desde la web (demo o contacto): nueva ficha o se añade a la que ya hay.
  contactoDeLaWeb(e) {
    const id = this.porEmail(e.email);
    const prev = id ? this.leerContacto(id) : null;
    const d = Contactos.deLaWeb(prev, e);
    const guardado = this.guardarContacto(id || Contactos.nuevoId(), d, 'web');
    this.anotar('web_ultima', { fecha: new Date().toISOString(), tipo: e.tipo, email: e.email });
    return { id: guardado.id, nuevo: !id };
  }

  // Lista de prospección: añade las empresas que no estén ya (por correo, web o
  // nombre y ciudad). La próxima acción se reparte: `porDia` empresas cada día laborable.
  importarProspeccion(lista, autor, porDia = 10) {
    const vistas = new Set(this.contactos().flatMap((c) => Contactos.clavesDe(c)));
    const dias = [];
    const d = new Date();
    let nuevos = 0, repetidos = 0, actualizados = 0;
    const porClave = new Map(this.contactos().flatMap((c) => Contactos.clavesDe(c).map((k) => [k, c])));
    const fechaPara = (i) => {
      while (dias.length <= Math.floor(i / porDia)) {
        while ([0, 6].includes(d.getUTCDay())) d.setUTCDate(d.getUTCDate() + 1);
        dias.push(d.toISOString().slice(0, 10));
        d.setUTCDate(d.getUTCDate() + 1);
      }
      return dias[Math.floor(i / porDia)];
    };
    for (const e of lista) {
      const claves = Contactos.clavesDe({ ...e, web: e.web });
      if (!e.empresa) { repetidos++; continue; }
      if (claves.some((k) => vistas.has(k))) {
        // Ya estaba: si la lista trae etiquetas o un correo preparado, se añaden a su ficha.
        const prev = claves.map((k) => porClave.get(k)).find(Boolean);
        const etiq = Contactos.etiquetasDe(e), borr = Contactos.borradorDe(e);
        if (prev && (etiq.length || borr)) {
          const n = { ...prev, etiquetas: [...new Set([...(prev.etiquetas || []), ...etiq])] };
          if (borr) {
            n.borrador = borr;
            if (!['cliente', 'perdido'].includes(n.etapa)) n.proxima = { fecha: fechaPara(nuevos + actualizados), texto: 'Enviar el correo preparado' };
          }
          this.guardarContacto(prev.id, Contactos.limpiar(n), autor);
          actualizados++;
        } else repetidos++;
        continue;
      }
      const c = Contactos.deProspeccion(e, fechaPara(nuevos + actualizados), autor);
      this.guardarContacto(Contactos.nuevoId(), c, autor);
      claves.forEach((k) => vistas.add(k));
      nuevos++;
    }
    const total = nuevos + actualizados;
    return { nuevos, repetidos, actualizados, hasta: total ? fechaPara(total - 1) : '' };
  }

  // ---- Correos programados ---------------------------------------------------
  // estado: pendiente, enviado, error o cancelado.
  async programar({ contacto, asunto, texto, cuando, autor }) {
    const id = `p-${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36)}`;
    this.sql.exec('INSERT INTO programados (id, contacto, asunto, texto, cuando, autor, creado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      id, contacto, asunto, texto, cuando, autor || '', new Date().toISOString());
    await this.siguienteAlarma();
    return this.programado(id);
  }
  programado(id) {
    const r = this.sql.exec('SELECT * FROM programados WHERE id = ?', id).toArray()[0];
    return r ? { ...r, cuando: new Date(r.cuando).toISOString() } : null;
  }
  // Los pendientes y los que han fallado (de uno o de todos los contactos).
  programados(contacto = '') {
    const filas = contacto
      ? this.sql.exec("SELECT * FROM programados WHERE contacto = ? AND estado IN ('pendiente', 'error') ORDER BY cuando", contacto).toArray()
      : this.sql.exec("SELECT * FROM programados WHERE estado IN ('pendiente', 'error') ORDER BY cuando").toArray();
    return filas.map((r) => ({ ...r, cuando: new Date(r.cuando).toISOString() }));
  }
  async cancelarProgramado(id) {
    const n = this.sql.exec("UPDATE programados SET estado = 'cancelado' WHERE id = ? AND estado IN ('pendiente', 'error') RETURNING id", id).toArray().length;
    await this.siguienteAlarma();
    return { ok: n > 0 };
  }
  async siguienteAlarma() {
    const r = this.sql.exec("SELECT MIN(cuando) AS t FROM programados WHERE estado = 'pendiente'").one();
    if (r.t) await this.ctx.storage.setAlarm(Math.max(r.t, Date.now() + 1000));
    else await this.ctx.storage.deleteAlarm();
  }
  // Llega la hora: se envían los que tocan y quedan en el historial del contacto.
  async alarm() {
    const ahora = Date.now();
    const toca = this.sql.exec("SELECT * FROM programados WHERE estado = 'pendiente' AND cuando <= ? ORDER BY cuando", ahora + 5000).toArray();
    for (const p of toca) {
      const c = this.leerContacto(p.contacto);
      let estado = 'enviado', error = null;
      if (!c) { estado = 'cancelado'; error = 'El contacto ya no existe'; }
      else if (c.noEscribir) { estado = 'cancelado'; error = 'Pidió no recibir más correos'; }
      else if (!Contactos.EMAIL_OK.test(c.email || '')) { estado = 'error'; error = 'El contacto no tiene un email válido'; }
      else {
        try {
          const avisos = String(this.env.AVISOS || '').split(',')[0].trim();
          await Correo.enviar(this.env, { to: [c.email], reply_to: avisos || undefined, ...Correo.deFicha(this.env, c, p.asunto, p.texto) });
        } catch (e) { console.error('[programado]', e); estado = 'error'; error = 'No se ha podido enviar'; }
      }
      this.sql.exec('UPDATE programados SET estado = ?, error = ? WHERE id = ?', estado, error, p.id);
      if (c && estado === 'enviado') {
        let n = { ...c, borrador: null, historial: [...(c.historial || []), { fecha: new Date().toISOString(), tipo: 'correo', asunto: p.asunto, texto: p.texto, autor: p.autor || undefined }] };
        n = Contactos.limpiar(n);
        if (n.etapa === 'nuevo') n = Contactos.cambiarEtapa(n, 'contactado', p.autor || 'oficina');
        this.guardarContacto(c.id, n, p.autor || 'oficina');
      }
    }
    await this.siguienteAlarma();
  }

  // ---- Copias de seguridad ------------------------------------------------------
  exportar() {
    return Object.fromEntries(TABLAS_DATOS.map((t) => [t, this.sql.exec(`SELECT * FROM ${t}`).toArray()]));
  }
}
