/* Demo · Clínica de fisioterapia (ejemplo ficticio) */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "clinica",
  etiqueta: "Clínica de fisioterapia",
  tipo: "Clínica de fisioterapia",
  negocio: "Clínica Alba",
  lema: "Fisioterapia y pilates terapéutico",
  cliente: "Paciente",
  software: { actual: "tu programa de agenda y de historias clínicas", medida: "una agenda y unas fichas de paciente a medida" },
  marca: {
    m1: "#0F7C7E", m1t: "#FFFFFF", m2: "#CDEFE9", m2t: "#0B4F50", suave: "#EEF8F6", tinta: "#123B3C",
    fuente: "'Figtree', 'Segoe UI', sans-serif", radio: "12px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#0F7C7E"/><path d="M11 25a9 9 0 0 1 18 0" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/><path d="M8 29h24M20 10v3M12.5 13.5l2 2M27.5 13.5l-2 2" fill="none" stroke="#BFE8E1" stroke-width="2.6" stroke-linecap="round"/></svg>'
  },
  panel: ["Agenda", "Pacientes", "Historias", "Tratamientos", "Reseñas"],
  situacion: "Tres fisios, una recepcionista a media jornada y unas 180 sesiones a la semana. El teléfono suena mientras atienden y en la agenda quedan huecos que nadie rellena.",
  dolores: [
    ["El teléfono interrumpe las sesiones", "Las citas se piden llamando. Si nadie coge, el paciente prueba con otra clínica."],
    ["Huecos vacíos por olvidos", "Cada semana 4 o 5 pacientes no vienen o cancelan tarde, y ese hueco se pierde."],
    ["Papeles en la primera visita", "La ficha, el consentimiento y la protección de datos se rellenan en papel, y en eso se van 15 minutos de la sesión."],
    ["Tratamientos a medias", "Cuando notan mejoría, muchos dejan de venir y no hacen los ejercicios en casa."]
  ],
  casos: [
    {
      id: "citas",
      montaje: { plazo: "2 a 3 semanas", con: "Tu programa de agenda o una agenda nueva, y WhatsApp Business" },
      nav: "Citas y huecos libres",
      titulo: "Citas online y huecos que se vuelven a llenar",
      hoy: "Las citas se cuadran por teléfono y, cuando alguien cancela la víspera, el hueco se queda vacío.",
      con: "El paciente reserva desde el móvil a cualquier hora, recibe un recordatorio con botones y, si cancela, el hueco se ofrece solo a la lista de espera.",
      pasos: [
        { quien: "cliente", nombre: "Lucía, paciente nueva", t: "Lucía pide cita a las 22:15 desde el móvil", d: "Elige qué le pasa, con quién quiere ir y la hora. Sin llamar y sin esperar a que abráis.", boton: "Reservar la cita" },
        { quien: "auto", t: "La víspera le llega un recordatorio", d: "Con botones para confirmar, cambiar o cancelar. A Lucía le ha surgido algo y cancela con un toque.", boton: "Lucía cancela" },
        { quien: "auto", t: "El hueco se ofrece a la lista de espera", d: "Rubén había pedido cita «lo antes posible». Le llega el aviso al momento. Nadie de la clínica ha tenido que llamar.", boton: "Rubén acepta el hueco" },
        { quien: "equipo", nombre: "Recepción", t: "La agenda ya está recolocada", d: "Recepción ve el cambio hecho y el resumen del mes. Solo interviene si algo no cuadra.", boton: "Ver el resultado" }
      ],
      final: { antes: "Llamadas en mitad de las sesiones y 4 o 5 huecos perdidos cada semana.", ahora: "Las citas entran solas a cualquier hora y casi todas las cancelaciones se vuelven a ocupar." },
      escena: function (x) {
        var u = UI;
        var movil;
        if (x.p === 0) {
          movil = u.movil({ quien: "Móvil de Lucía", hora: "22:15", titulo: "Pedir cita", cuerpo:
            u.campos([
              ["¿Qué te pasa?", u.opc(["Dolor de espalda o cuello", "Lesión deportiva", "Suelo pélvico", "Pilates terapéutico"], 0)],
              ["¿Con quién?", u.opc(["Laura Pons", "Jorge Sanz", "Me da igual"], 0)],
              ["Jueves 16", u.opc(["17:00", "18:00", "19:30"], 1)]
            ]) +
            '<p class="tenue">Primera visita: 50 minutos. Trae ropa cómoda.</p>' +
            u.btn("Reservar jueves a las 18:00", true, "ancho")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Móvil de Lucía", app: "wa", hora: "10:00", cuerpo:
            u.fecha("Lunes") +
            u.ellos("Cita reservada: <strong>jueves 16 a las 18:00</strong> con Laura Pons. Antes de venir te mandamos tu ficha para rellenar.", "22:15") +
            u.fecha("Miércoles") +
            u.ellos("Hola, Lucía. Te recordamos tu cita de <strong>mañana a las 18:00</strong> con Laura.<br>¿Nos confirmas?", "10:00", " anim") +
            u.respuestas(["Confirmo", "Cambiar hora", "No puedo ir"], 2)
          });
        } else {
          movil = u.movil({ quien: "Móvil de Rubén (lista de espera)", app: "wa", hora: "10:02", cuerpo:
            u.fecha("Miércoles") +
            u.ellos("Hola, Rubén. Se ha quedado libre un hueco <strong>mañana jueves a las 18:00</strong> con Laura. ¿Lo quieres?", "10:02", x.n(2)) +
            (x.p === 2 ? u.respuestas(["Sí, me lo quedo", "No, gracias"], 0) :
              u.respuestas(["Sí, me lo quedo", "No, gracias"], null, 0) +
              u.ellos("Hecho. Te esperamos mañana a las 18:00. Sesión 5 de 8 de tu rodilla.", "10:03", " anim"))
          });
        }

        var f18;
        if (x.p === 0) f18 = ["18:00", "Libre", "libre"];
        else if (x.p === 1) f18 = ["18:00", "<strong>Lucía Martín</strong><small>Primera visita · espalda · reservada online</small>", "nueva", x.n(1)];
        else if (x.p === 2) f18 = ["18:00", "<strong>Lucía Martín ha cancelado</strong><small>Ofrecido a la lista de espera (3 personas)</small>", "hueco", " anim"];
        else f18 = ["18:00", "<strong>Rubén Sáez</strong><small>Rodilla · sesión 5 de 8 · hueco recuperado</small>", "nueva", " anim"];

        var cuerpo = '<div class="entre"><strong>Jueves 16 · Laura Pons</strong>' + u.chip("4 citas online hoy", "info") + "</div>" +
          u.agenda([
            ["16:00", "<strong>Marta Gil</strong><small>Cervicales · sesión 3 de 6</small>"],
            ["17:00", "<strong>Pedro León</strong><small>Hombro · sesión 2 de 8</small>"],
            f18,
            ["19:00", "<strong>Pilates terapéutico</strong><small>Grupo de 4 · completo</small>"]
          ]);
        if (x.p === 3) {
          cuerpo += '<div class="anim anim-2">' + u.kpis([["96", "citas pedidas online este mes"], ["23", "cancelaciones"], ["19", "huecos recuperados", "ok"]]) + "</div>";
        }
        return movil + u.ventana({ quien: "Ordenador de recepción", seccion: "Agenda", cuerpo: cuerpo });
      }
    },

    {
      id: "primera-visita",
      montaje: { plazo: "2 semanas", con: "Tu programa de historias clínicas o una ficha a medida" },
      nav: "Primera visita",
      titulo: "Primera visita sin papeles",
      hoy: "El paciente llega, rellena a mano la ficha, el consentimiento y la protección de datos, y después alguien lo pasa al ordenador.",
      con: "Antes de venir, el paciente rellena su ficha y firma desde el móvil. La fisio recibe un resumen con lo importante señalado.",
      pasos: [
        { quien: "auto", t: "Al reservar, le llega su ficha", d: "Seis preguntas pensadas para fisioterapia: qué le duele, desde cuándo, cuánto, y si toma medicación o se ha operado.", boton: "Enviar la ficha" },
        { quien: "cliente", nombre: "Lucía, paciente nueva", t: "Firma el consentimiento con el dedo", d: "Consentimiento informado y protección de datos desde el móvil. Queda guardado con fecha y hora en su historia.", boton: "Firmar" },
        { quien: "auto", t: "Laura recibe un resumen antes de la sesión", d: "Lo importante, arriba y señalado: en este caso, que toma anticoagulantes. El resumen ayuda a preparar la sesión; la valoración la hace la fisio.", boton: "Laura termina la sesión" },
        { quien: "equipo", nombre: "Laura, fisioterapeuta", t: "Laura dicta la nota de la sesión", d: "Al acabar, habla 30 segundos al móvil y queda una nota ordenada en la historia. Ella la revisa y la guarda.", boton: "Guardar la nota" }
      ],
      final: { antes: "15 minutos de papeles en cada primera visita y notas que se pasan a limpio por la noche.", ahora: "La paciente llega con todo hecho y la historia queda al día al terminar la sesión." },
      escena: function (x) {
        var u = UI, movil, ventana;
        var docs = function (ficha, consent) {
          return u.check([
            ["Ficha de primera visita", ficha ? "ok" : "pend", ficha ? "Rellenada desde el móvil" : "Enviada, sin rellenar"],
            ["Consentimiento informado", consent ? "ok" : "pend", consent ? "Firmado el lunes a las 22:19" : "Pendiente de firma"],
            ["Protección de datos", consent ? "ok" : "pend", consent ? "Aceptada" : "Pendiente"]
          ]);
        };
        if (x.p === 0) {
          movil = u.movil({ quien: "Móvil de Lucía", hora: "22:17", titulo: "Tu ficha antes de venir", cuerpo:
            '<p class="peq">Hola, Lucía. Son 3 minutos y así aprovechamos toda la sesión.</p>' +
            u.campos([
              ["¿Qué te pasa?", "Dolor en la zona lumbar, sobre todo sentada"],
              ["¿Desde cuándo?", u.opc(["Menos de 1 semana", "1 a 4 semanas", "Más de 1 mes"], 1)],
              ["¿Tomas alguna medicación?", "Sintrom (anticoagulante)"],
              ["¿Te has operado alguna vez?", "No"],
              ["¿A qué te dedicas?", "Administrativa, 8 horas sentada"]
            ]) +
            u.escala(10, 7, "¿Cuánto te duele ahora? (0 a 10)") +
            u.btn("Siguiente", true, "ancho")
          });
          ventana = u.ventana({ quien: "Ordenador de la clínica", seccion: "Historias", cuerpo: '<div class="entre"><strong>Lucía Martín · 34 años</strong>' + u.chip("Primera visita jueves 18:00", "info") + "</div>" + docs(false, false) });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Móvil de Lucía", hora: "22:18", titulo: "Consentimiento", cuerpo:
            '<p class="peq"><strong>Consentimiento para el tratamiento de fisioterapia</strong></p>' +
            '<p class="tenue">La fisioterapeuta te explicará la valoración y las técnicas antes de aplicarlas. Puedes retirar este consentimiento cuando quieras.</p>' +
            u.check([["He leído la información del tratamiento", "ok"], ["Acepto la política de protección de datos", "ok"], ["Quiero recibir recordatorios por WhatsApp", "ok"]]) +
            u.firma(false) +
            u.btn("Firmar y enviar", true, "ancho")
          });
          ventana = u.ventana({ quien: "Ordenador de la clínica", seccion: "Historias", cuerpo: '<div class="entre"><strong>Lucía Martín · 34 años</strong>' + u.chip("Primera visita jueves 18:00", "info") + '</div><div class="anim">' + docs(true, false) + "</div>" });
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Móvil de Lucía", hora: "22:19", titulo: "Consentimiento", cuerpo:
            u.firma(true) +
            '<div class="caja caja-suave anim anim-2"><h5>' + u.icono("check") + "Todo listo</h5><p>Nos vemos el jueves a las 18:00 con Laura. Si te surge algo, puedes cambiar la cita desde el recordatorio.</p></div>"
          });
          ventana = u.ventana({ quien: "Ordenador de Laura", seccion: "Historias", cuerpo:
            '<div class="entre"><strong>Lucía Martín · 34 años</strong>' + u.chip("Hoy 18:00", "marca") + "</div>" +
            '<div class="caja caja-alerta anim"><h5>' + u.icono("alerta") + "A tener en cuenta</h5><p>Toma <strong>anticoagulantes (Sintrom)</strong>. Revisar antes de técnicas invasivas o punción seca.</p></div>" +
            '<div class="caja caja-ia anim anim-2"><h5>Resumen de su ficha</h5><p>Dolor lumbar de 3 semanas, 7 sobre 10. Empeora al estar sentada. Trabajo de oficina, 8 horas al día. Sin operaciones.</p></div>' +
            docs(true, true) +
            '<div class="fila">' + u.btn("Empezar la sesión", true) + "</div>" +
            u.nota("El resumen se prepara con lo que ha escrito la paciente. La valoración y el tratamiento los decide la fisio.")
          });
        } else {
          movil = u.movil({ quien: "Móvil de Laura", equipo: true, hora: "18:52", titulo: "Nota de sesión", cuerpo:
            '<p class="peq"><strong>Lucía Martín</strong> · sesión 1</p>' +
            '<div class="caja caja-suave"><h5>' + u.icono("mic") + "Grabando · 0:28</h5><p class=\"tenue\">«Lumbalgia mecánica sin irradiación. Lasègue negativo. Terapia manual y ejercicios de control motor. Revisar en una semana, mandar ejercicios de casa.»</p></div>" +
            u.btn("Grabación enviada", false, "claro")
          });
          ventana = u.ventana({ quien: "Ordenador de Laura", seccion: "Historias", cuerpo:
            '<div class="entre"><strong>Lucía Martín · sesión 1</strong>' + u.chip("Borrador: lo revisa Laura", "pend") + "</div>" +
            '<div class="anim">' + u.ficha([
              ["Motivo", "Dolor lumbar de 3 semanas, 7/10"],
              ["Exploración", "Lumbalgia mecánica, sin irradiación. Lasègue negativo."],
              ["Tratamiento", "Terapia manual y ejercicios de control motor"],
              ["Plan", "Revisión en 1 semana. Ejercicios para casa."],
              ["Precaución", "Anticoagulada (Sintrom)"]
            ]) + "</div>" +
            '<div class="fila">' + u.btn("Guardar en la historia", true) + u.btn("Editar", false, "sec") + "</div>"
          });
        }
        return movil + ventana;
      }
    },

    {
      id: "tratamiento",
      montaje: { plazo: "3 a 4 semanas", con: "Tus vídeos de ejercicios y una app web para el paciente, sin descargas" },
      nav: "Ejercicios y seguimiento",
      titulo: "Ejercicios en casa y tratamientos que se terminan",
      hoy: "Los ejercicios se explican en la camilla y se olvidan en casa. Cuando el paciente nota mejoría, deja de venir sin terminar.",
      con: "Cada paciente tiene su tratamiento en el móvil: vídeos de sus ejercicios, recordatorios y cómo va su dolor. Si alguien deja de reservar, la clínica se entera.",
      pasos: [
        { quien: "equipo", nombre: "Laura, fisioterapeuta", t: "Laura asigna los ejercicios en un minuto", d: "Elige tres vídeos de la biblioteca de la clínica, ajusta las repeticiones y se los manda.", boton: "Enviar a Lucía" },
        { quien: "cliente", nombre: "Lucía, paciente", t: "Lucía los tiene en el móvil", d: "Ve sus ejercicios en vídeo, cuántas sesiones lleva y marca lo que hace. Si un día se le olvida, le llega un aviso.", boton: "Marcar como hechos" },
        { quien: "cliente", nombre: "Lucía, paciente", t: "Cada semana dice cómo va el dolor", d: "Una pregunta y un número. Laura ve la evolución en un gráfico sin tener que preguntarlo en cada sesión.", boton: "Enviar" },
        { quien: "auto", t: "Si alguien deja de venir, salta un aviso", d: "Rubén lleva 3 semanas sin reservar y le quedan sesiones. Le llega un mensaje y recepción lo ve en su lista.", boton: "Ver el resultado" }
      ],
      final: { antes: "Ejercicios en una hoja que se pierde y pacientes que desaparecen a mitad de tratamiento.", ahora: "Cada paciente sigue su plan desde el móvil y la clínica sabe quién se está quedando por el camino." },
      escena: function (x) {
        var u = UI, out = "";
        var t1 = ["#BFE8E1", "#0F7C7E"], t2 = ["#D9E7F5", "#4A78A8"], t3 = ["#F3E3C9", "#B9874A"], t4 = ["#E7E1F3", "#7A68A8"];
        if (x.p === 0) {
          return u.ventana({ quien: "Ordenador de Laura", seccion: "Tratamientos", cuerpo:
            '<div class="entre"><strong>Lucía Martín · lumbalgia</strong>' + u.chip("Sesión 1 de 6", "info") + "</div>" +
            '<p class="peq"><strong>Biblioteca de ejercicios de la clínica</strong></p>' +
            '<div class="dos">' +
              u.video("Gato-camello", "2 series de 10", t1, u.chip("Elegido", "ok")) +
              u.video("Puente de glúteo", "3 series de 12", t2, u.chip("Elegido", "ok")) +
              u.video("Bird-dog", "3 series de 8 por lado", t3, u.chip("Elegido", "ok")) +
              u.video("Estiramiento de psoas", "30 segundos por lado", t4) +
            "</div>" +
            u.campos([["Nota para Lucía", "Hazlos por la mañana, sin llegar al dolor. Si molesta, para y me lo cuentas."]]) +
            '<div class="fila">' + u.btn("Enviar a Lucía", true) + "</div>"
          });
        }
        if (x.p === 1) {
          out = u.movil({ quien: "Móvil de Lucía", hora: "8:05", titulo: "Mi tratamiento", cuerpo:
            u.aviso("Clínica Alba", "Buenos días, Lucía. Tus ejercicios de hoy te llevan 10 minutos.", " anim") +
            '<div class="caja caja-suave"><div class="entre"><strong>Lumbalgia</strong>' + u.chip("Sesión 2 de 6", "marca") + '</div><p class="tenue">Próxima cita: lunes a las 18:00 con Laura</p></div>' +
            '<p class="peq"><strong>Tus ejercicios de hoy</strong></p>' +
            u.video("Gato-camello", "2 series de 10", t1) +
            u.video("Puente de glúteo", "3 series de 12", t2) +
            u.video("Bird-dog", "3 series de 8 por lado", t3) +
            u.btn("Marcar como hechos", true, "ancho")
          });
          return out + u.ventana({ quien: "Ordenador de Laura", seccion: "Tratamientos", cuerpo:
            '<div class="entre"><strong>Lucía Martín · lumbalgia</strong>' + u.chip("Enviado a Lucía", "ok") + "</div>" +
            u.check([["Gato-camello", "ok", "2 × 10"], ["Puente de glúteo", "ok", "3 × 12"], ["Bird-dog", "ok", "3 × 8 por lado"]])
          });
        }
        if (x.p === 2) {
          out = u.movil({ quien: "Móvil de Lucía", hora: "20:30", titulo: "Mi tratamiento", cuerpo:
            u.check([["Gato-camello", "ok", "Hecho hoy"], ["Puente de glúteo", "ok", "Hecho hoy"], ["Bird-dog", "ok", "Hecho hoy"]]) +
            '<div class="caja anim"><h5>Pregunta de la semana</h5>' + u.escala(10, 4, "¿Cuánto te duele hoy? (0 a 10)") + "</div>" +
            u.btn("Enviar", true, "ancho")
          });
          return out + u.ventana({ quien: "Ordenador de Laura", seccion: "Tratamientos", cuerpo:
            '<div class="entre"><strong>Lucía Martín · lumbalgia</strong>' + u.chip("Sesión 2 de 6", "info") + "</div>" +
            u.kpis([["11 de 14", "días con ejercicios hechos", "ok"], ["2", "sesiones hechas"]]) +
            u.grafico([7, 6, 6, 5], ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4"], "Dolor que indica Lucía (0 a 10)")
          });
        }
        out = u.movil({ quien: "Móvil de Rubén", app: "wa", hora: "11:00", cuerpo:
          u.ellos("Hola, Rubén. Hace 3 semanas de tu última sesión y te quedan <strong>4 del plan de rodilla</strong>. ¿Te buscamos hueco esta semana?", "11:00", " anim") +
          u.respuestas(["Sí, el martes por la tarde", "Ahora no puedo"], 0)
        });
        return out + u.ventana({ quien: "Ordenador de recepción", seccion: "Pacientes", cuerpo:
          u.grafico([7, 6, 6, 5, 4], ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4", "Hoy"], "Dolor de Lucía: de 7 a 4 en un mes") +
          '<p class="peq anim anim-2"><strong>Pacientes que se están quedando por el camino</strong></p>' +
          '<div class="anim anim-2">' + u.tabla(["Paciente", "Tratamiento", "Última sesión", "Le quedan", "Estado"], [
            ["Rubén Sáez", "Rodilla", "hace 3 semanas", "4", u.chip("Mensaje enviado", "info")],
            ["Carmen Vidal", "Hombro", "hace 4 semanas", "2", u.chip("Llamar", "alerta")],
            ["Iván Prieto", "Tobillo", "hace 2 semanas", "3", u.chip("Mensaje enviado", "info")]
          ], ["is-resaltada"]) + "</div>"
        });
      }
    },

    {
      id: "resenas",
      montaje: { plazo: "1 semana", con: "Tu ficha de Google y WhatsApp Business" },
      nav: "Reseñas y pacientes que vuelven",
      titulo: "Reseñas en Google y pacientes que vuelven",
      hoy: "Los pacientes contentos se van sin dejar reseña y no se vuelve a saber de ellos hasta que se lesionan otra vez.",
      con: "Al dar el alta se pide la opinión a todos los pacientes, con un enlace directo para dejar reseña. Meses después, les llega un mensaje para revisar o probar pilates.",
      pasos: [
        { quien: "auto", t: "Al dar el alta, se le pide su opinión", d: "Dos días después del alta, Rubén recibe un mensaje corto con el enlace directo a la ficha de Google de la clínica.", boton: "Rubén deja su reseña" },
        { quien: "equipo", nombre: "Marta, gerente", t: "La respuesta llega preparada", d: "La reseña aparece en el panel con una respuesta propuesta en el tono de la clínica. Marta la lee, la cambia si quiere y la publica.", boton: "Publicar la respuesta" },
        { quien: "auto", t: "Seis meses después, un mensaje para volver", d: "Una revisión de la rodilla y la propuesta de pilates terapéutico para no recaer.", boton: "Rubén reserva la revisión" },
        { quien: "equipo", nombre: "Marta, gerente", t: "Marta ve el resultado del mes", d: "Reseñas nuevas, nota media y pacientes que han vuelto gracias a estos mensajes.", boton: "Ver el resultado" }
      ],
      final: { antes: "Tres o cuatro reseñas al año y pacientes de alta de los que no se vuelve a saber.", ahora: "Reseñas nuevas cada semana, todas respondidas, y antiguos pacientes que vuelven a reservar." },
      escena: function (x) {
        var u = UI, movil;
        var resena = '<div class="caja' + x.n(1) + '"><div class="entre"><strong>Rubén Sáez</strong>' + u.estrellas(5) + '</div><p>Llegué sin poder bajar escaleras y he terminado corriendo. Laura explica todo muy bien y en recepción siempre te encuentran hueco.</p><p class="tenue">Reseña de Google · hace 10 minutos</p></div>';
        if (x.p === 0) {
          movil = u.movil({ quien: "Móvil de Rubén", app: "wa", hora: "12:00", cuerpo:
            u.ellos("Hola, Rubén. ¡Enhorabuena por terminar el tratamiento de rodilla!<br><br>Si te hemos ayudado, ¿nos lo cuentas en Google? Es lo que más ayuda a que otras personas nos encuentren." + u.btn("Escribir mi reseña", true), "12:00", " anim")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Móvil de Rubén", app: "wa", hora: "12:04", cuerpo:
            u.ellos("Hola, Rubén. ¡Enhorabuena por terminar el tratamiento de rodilla!<br><br>Si te hemos ayudado, ¿nos lo cuentas en Google? Es lo que más ayuda a que otras personas nos encuentren.", "12:00") +
            u.yo("Hecho. Muchas gracias por todo.", "12:04")
          });
        } else {
          movil = u.movil({ quien: "Móvil de Rubén", app: "wa", hora: "10:00", cuerpo:
            u.fecha("Seis meses después") +
            u.ellos("Hola, Rubén. Hace seis meses del alta de tu rodilla, ¿qué tal sigue?<br><br>Si quieres, te hacemos una <strong>revisión de 30 minutos</strong>. Y si buscas algo para no recaer, tenemos grupos de <strong>pilates terapéutico</strong> de 4 personas.", "10:00", x.n(2)) +
            (x.p === 2 ? u.respuestas(["Reservar revisión", "Info de pilates", "Todo bien, gracias"], 0) :
              u.respuestas(["Reservar revisión", "Info de pilates", "Todo bien, gracias"], null, 0) + u.ellos("Te he reservado el martes a las 17:30 con Laura. ¡Hasta pronto!", "10:01", " anim"))
          });
        }
        var cuerpo;
        if (x.p === 0) {
          cuerpo = u.kpis([["4,7", "nota media en Google"], ["3", "reseñas nuevas este mes"]]) +
            '<p class="tenue">Esperando reseñas de los pacientes dados de alta esta semana (6).</p>';
        } else if (x.p === 1) {
          cuerpo = '<p class="peq"><strong>Reseña nueva</strong></p>' + resena +
            '<div class="caja caja-ia anim anim-2"><h5>Respuesta propuesta</h5><p>Gracias, Rubén. Nos alegra mucho verte correr otra vez. Laura se queda con tu mensaje. Si la rodilla vuelve a dar guerra, ya sabes dónde estamos.</p></div>' +
            '<div class="fila">' + u.btn("Publicar la respuesta", true) + u.btn("Editar", false, "sec") + "</div>";
        } else {
          cuerpo = (x.p === 3 ? '<div class="anim">' + u.kpis([["4,9", "nota media en Google"], ["14", "reseñas nuevas este mes", "ok"], ["14 de 14", "respondidas"], ["9", "pacientes que han vuelto"]]) + "</div>" : "") +
            resena.replace(" anim", "") +
            '<div class="caja caja-suave"><div class="entre"><strong>Respuesta de Clínica Alba</strong>' + u.chip("Publicada", "ok") + "</div><p>Gracias, Rubén. Nos alegra mucho verte correr otra vez. Laura se queda con tu mensaje. Si la rodilla vuelve a dar guerra, ya sabes dónde estamos.</p></div>";
        }
        return movil + u.ventana({ quien: "Ordenador de Marta", seccion: "Reseñas", cuerpo: cuerpo });
      }
    }
  ]
});
