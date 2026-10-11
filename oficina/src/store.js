// ---------------------------------------------------------------------------
// Los datos de la Oficina: un Durable Object con SQLite, creado en la UE.
// Tablas: contactos, accesos (códigos, sesiones y límites) y meta.
// ---------------------------------------------------------------------------
import { DurableObject } from 'cloudflare:workers';
import * as Contactos from './contactos.js';

const TABLAS_DATOS = ['contactos', 'meta'];

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
    c.historial = [...(c.historial || []), { fecha: new Date().toISOString(), ...entrada, autor }];
    return this.guardarContacto(id, Contactos.limpiar(c), autor);
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

  // ---- Copias de seguridad ------------------------------------------------------
  exportar() {
    return Object.fromEntries(TABLAS_DATOS.map((t) => [t, this.sql.exec(`SELECT * FROM ${t}`).toArray()]));
  }
}
