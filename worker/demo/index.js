/* Fluivia · Envío automático de la demo por correo
   Recibe el formulario de demo.html, manda al visitante su demo personalizada
   y avisa a Fluivia con sus datos. Correo con Resend. */

const SECTORES = {
  gestoria: { texto: "una gestoría", demo: "gestoria" },
  inmobiliaria: { texto: "una inmobiliaria", demo: "inmobiliaria" },
  academia: { texto: "una academia", demo: "academia" },
  clinica: { texto: "una clínica", demo: "clinica" },
  distribucion: { texto: "una empresa de distribución", demo: "distribucion" },
  otro: { texto: "tu negocio", demo: "" }
};

const EMAIL_OK = /^[^\s@<>"]+@[^\s@<>"]+\.[a-z]{2,}$/i;

function esc(t) {
  return String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function cors(origen, env) {
  const permitidos = (env.ALLOWED_ORIGINS || "").split(",").map((o) => o.trim()).filter(Boolean);
  const ok = permitidos.includes(origen);
  return {
    "Access-Control-Allow-Origin": ok ? origen : permitidos[0] || "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}

function respuesta(estado, cuerpo, cabeceras) {
  return new Response(JSON.stringify(cuerpo), { status: estado, headers: { "Content-Type": "application/json", ...cabeceras } });
}

async function enviar(env, correo) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(correo)
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

function enlaceDemo(env, sector, negocio) {
  const url = new URL(env.DEMO_URL);
  if (sector.demo) url.searchParams.set("s", sector.demo);
  url.searchParams.set("n", negocio);
  if (env.REPLY_TO) url.searchParams.set("r", env.REPLY_TO);
  return url.toString();
}

function correoVisitante(env, d, sector, enlace) {
  const cita = env.CITA_URL
    ? `<p>Si prefieres verla conmigo, reserva una llamada de 20 minutos: <a href="${esc(env.CITA_URL)}">elegir hora</a>.</p>`
    : "<p>Si prefieres verla conmigo, responde a este correo y buscamos un hueco de 20 minutos.</p>";
  const otro = sector.demo
    ? `<p>Son cuatro situaciones del día a día de ${sector.texto}, contadas paso a paso. Se recorre en unos cinco minutos.</p>`
    : "<p>Todavía no tenemos una demo de tu sector, así que te mando la general. Respóndeme contándome a qué te dedicas y te preparo una con tus casos.</p>";
  const html = `<!doctype html><html lang="es"><body style="margin:0;background:#F1F4F3;font-family:Arial,sans-serif;color:#123F35">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px">
    <div style="background:#fff;border-radius:16px;padding:32px 28px;font-size:16px;line-height:1.6">
      <p style="margin-top:0">Hola, ${esc(d.nombre)}:</p>
      <p>Aquí tienes la demo de Fluivia preparada para <strong>${esc(d.negocio)}</strong>.</p>
      ${otro}
      <p style="margin:28px 0"><a href="${esc(enlace)}" style="display:inline-block;background:#123F35;color:#fff;text-decoration:none;font-weight:bold;padding:14px 22px;border-radius:999px">Ver la demo</a></p>
      ${cita}
      <p style="margin-bottom:0">Un saludo,<br>Fluivia</p>
    </div>
    <p style="font-size:12px;color:#5B6662;text-align:center;margin-top:16px">Recibes este correo porque has pedido la demo en la web de Fluivia.</p>
  </div></body></html>`;
  const texto = [
    `Hola, ${d.nombre}:`,
    "",
    `Aquí tienes la demo de Fluivia preparada para ${d.negocio}:`,
    enlace,
    "",
    env.CITA_URL ? `Si prefieres verla conmigo, reserva una llamada de 20 minutos: ${env.CITA_URL}` : "Si prefieres verla conmigo, responde a este correo y buscamos un hueco de 20 minutos.",
    "",
    "Un saludo,",
    "Fluivia"
  ].join("\n");
  return {
    from: env.FROM,
    to: [d.email],
    reply_to: env.REPLY_TO || undefined,
    subject: `Tu demo de Fluivia para ${d.negocio}`,
    html,
    text: texto
  };
}

function correoAviso(env, d, sector, enlace) {
  const texto = [
    "Alguien ha pedido la demo desde la web.",
    "",
    `Nombre: ${d.nombre}`,
    `Negocio: ${d.negocio}`,
    `Sector: ${sector.texto}`,
    `Correo: ${d.email}`,
    "",
    `Demo enviada: ${enlace}`
  ].join("\n");
  return { from: env.FROM, to: [env.NOTIFY_TO], reply_to: d.email, subject: `Demo pedida: ${d.negocio}`, text: texto };
}

export default {
  async fetch(request, env) {
    const origen = request.headers.get("Origin") || "";
    const cab = cors(origen, env);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cab });
    if (request.method !== "POST") return respuesta(405, { error: "Método no permitido" }, cab);
    if (!cab["Access-Control-Allow-Origin"] || cab["Access-Control-Allow-Origin"] !== origen) {
      return respuesta(403, { error: "Origen no permitido" }, cab);
    }

    const bruto = await request.text();
    if (bruto.length > 4000) return respuesta(413, { error: "Demasiado largo" }, cab);
    let d;
    try { d = JSON.parse(bruto); } catch { return respuesta(400, { error: "Datos no válidos" }, cab); }

    // Trampa para bots: campo oculto relleno o envío en menos de 3 segundos.
    // Se responde como si todo fuera bien para no darles pistas.
    if (d.web || Number(d.segundos) < 3) return respuesta(200, { ok: true }, cab);

    const limpio = (v, max) => String(v || "").replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
    d = {
      nombre: limpio(d.nombre, 80),
      email: limpio(d.email, 120),
      negocio: limpio(d.negocio, 60),
      sector: limpio(d.sector, 20)
    };
    const sector = SECTORES[d.sector];
    if (!d.nombre || !d.negocio || !sector || !EMAIL_OK.test(d.email)) {
      return respuesta(400, { error: "Faltan datos" }, cab);
    }

    // Límite sencillo por correo: una demo cada 10 minutos (si hay KV configurado)
    if (env.LIMITES) {
      const clave = `demo:${d.email.toLowerCase()}`;
      if (await env.LIMITES.get(clave)) return respuesta(200, { ok: true }, cab);
      await env.LIMITES.put(clave, "1", { expirationTtl: 600 });
    }

    const enlace = enlaceDemo(env, sector, d.negocio);
    try {
      await enviar(env, correoVisitante(env, d, sector, enlace));
      if (env.NOTIFY_TO) await enviar(env, correoAviso(env, d, sector, enlace));
    } catch (err) {
      console.error(err);
      return respuesta(502, { error: "No se ha podido enviar" }, cab);
    }
    return respuesta(200, { ok: true }, cab);
  }
};
