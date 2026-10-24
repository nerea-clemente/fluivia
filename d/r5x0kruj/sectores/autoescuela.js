/* Demo · Autoescuela (ejemplo ficticio) */
(function () {
  // Opciones de una pregunta de test. o: { elegida, buena, avanza } (índices; buena solo cuando ya está corregida)
  function opcionesTest(lista, o) {
    o = o || {};
    var base = "display:flex;gap:9px;align-items:center;width:100%;padding:9px 11px;border-radius:var(--mradio);border:1px solid rgba(0,0,0,.13);background:var(--blanco);font-size:13px;line-height:1.35;text-align:left;font-weight:600;";
    var letra = "display:grid;place-items:center;width:22px;height:22px;flex:none;border-radius:50%;font-weight:700;font-size:12px;";
    return '<div style="display:grid;gap:6px">' + lista.map(function (t, i) {
      var st = base, lt = letra + "background:#F0F2F3;", marca = "";
      if (o.buena === i) {
        st += "background:var(--ok-fondo);border-color:transparent;color:var(--ok);";
        lt = letra + "background:var(--ok);color:#fff;";
        marca = UI.icono("check");
      } else if (o.elegida === i && o.buena != null) {
        st += "background:var(--rojo-fondo);border-color:transparent;color:var(--rojo);";
        lt = letra + "background:var(--rojo);color:#fff;";
        marca = UI.icono("cerrar");
      } else if (o.buena != null) {
        st += "opacity:.55;";
      }
      var dentro = '<span style="' + lt + '">' + "ABC".charAt(i) + '</span><span style="flex:1">' + UI.esc(t) + "</span>" +
        (marca ? '<span style="display:grid;width:16px;height:16px;flex:none">' + marca + "</span>" : "");
      if (o.avanza === i) return '<button type="button" class="pista" data-avanzar style="' + st + '">' + dentro + "</button>";
      return '<div style="' + st + '">' + dentro + "</div>";
    }).join("") + "</div>";
  }

  // La "imagen" de la pregunta: una señal de velocidad mínima dibujada
  var senal = '<div style="display:grid;place-items:center;padding:12px;border-radius:var(--mradio);background:linear-gradient(180deg,#E3EEF6,#F4F7F2)">' +
    '<svg viewBox="0 0 80 112" width="62" height="87" role="img" aria-label="Señal redonda azul con el número 50 en blanco">' +
      '<rect x="37" y="70" width="6" height="42" rx="2" fill="#8A9399"/>' +
      '<circle cx="40" cy="38" r="35" fill="#1F5FAD" stroke="#FFFFFF" stroke-width="3"/>' +
      '<text x="40" y="39" text-anchor="middle" dominant-baseline="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="30" fill="#FFFFFF">50</text>' +
    "</svg></div>";

  var pregunta = ["Velocidad máxima de 50 km/h", "Velocidad mínima obligatoria de 50 km/h", "Velocidad recomendada de 50 km/h"];

  (window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
    id: "autoescuela",
    etiqueta: "Autoescuela",
    tipo: "Autoescuela",
    negocio: "Autoescuela Faro",
    lema: "Carnet de coche y de moto, a tu ritmo",
    cliente: "Alumno",
    software: { actual: "tu programa de gestión de la autoescuela", medida: "una gestión de alumnos, prácticas y exámenes a medida" },
    marca: {
      m1: "#F2B705", m1t: "#2B2410", m2: "#FFF0C2", m2t: "#3D3000", suave: "#FBF6E6", tinta: "#2B2410",
      fuente: "'Barlow', 'Arial Narrow', sans-serif", radio: "10px",
      logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="10" fill="#23272E"/><path d="M20 12.5 33 8.5v8zM20 12.5 7 8.5v8z" fill="#F2B705" opacity=".55"/><rect x="16.8" y="9.5" width="6.4" height="5.5" rx="1.2" fill="#F2B705"/><path d="M16.5 15h7l1.8 15h-10.6z" fill="#FFFFFF"/><path d="M15.8 21h8.4l.4 3.2h-9.2z" fill="#F2B705"/><rect x="11.5" y="30" width="17" height="2.6" rx="1.3" fill="#FFFFFF"/></svg>'
    },
    panel: ["Alumnos", "Teórico", "Prácticas", "Exámenes", "Matrículas"],
    situacion: "Unos 140 alumnos a la vez, tres profesores, tres coches y una moto. Marta lleva la oficina y da las clases de teórico; el teléfono y el WhatsApp no paran entre clase y clase.",
    dolores: [
      ["Alumnos que van al examen sin estar listos", "Cada uno hace tests por su cuenta y nadie sabe en qué tema falla hasta que suspende."],
      ["Las prácticas, en una libreta", "Cambios por WhatsApp a cualquier hora y coches parados cuando alguien no avisa."],
      ["Exámenes preparados a mano", "Listas en papel, avisos uno a uno y siempre hay alguien que llega sin el DNI."],
      ["Las mismas preguntas cada día", "Qué cuesta, qué papeles hacen falta, cuándo empieza el teórico. También los sábados por la noche."]
    ],
    casos: [
      {
        id: "teorico",
        montaje: { plazo: "3 semanas", con: "Tu banco de preguntas y una app web para el alumno, sin descargas" },
        nav: "Tests del teórico",
        titulo: "Tests del teórico que se corrigen solos",
        hoy: "Los alumnos hacen tests en papel o en apps que la autoescuela no ve. Marta no sabe quién está listo para el examen hasta que alguien suspende.",
        con: "El alumno hace tests desde el móvil y ve al momento por qué ha fallado. La autoescuela ve quién está listo para presentarse y quién se ha atascado, y en qué.",
        ganas: ["Alumnos que llegan preparados al examen", "Sabes en qué tema falla cada uno", "Las clases de teórico, donde hacen falta"],
        pasos: [
          { quien: "cliente", nombre: "Nerea, alumna", t: "Nerea hace un test en el autobús", d: "Treinta preguntas desde el móvil, cuando le viene bien. Esta es de señales: tres respuestas y solo una es la buena.", boton: "Responder" },
          { quien: "auto", t: "La corrección llega al momento", d: "Nerea ha fallado. Ve cuál era la buena y por qué, en dos líneas. No tiene que esperar a la clase para entenderlo.", boton: "Terminar el test" },
          { quien: "auto", t: "Sabe en qué falla y si está lista", d: "Al acabar ve sus fallos por tema y cuánto le falta para presentarse. En Faro, cinco tests aprobados seguidos.", boton: "Ver el panel de la autoescuela" },
          { quien: "equipo", nombre: "Marta, directora", t: "Marta sabe a quién presentar y a quién ayudar", d: "Quién está listo para el examen, quién lleva semanas atascado y en qué tema. A Iván le llega una clase de repaso sin que nadie tenga que llamarle.", boton: "Ver el resultado" }
        ],
        final: { antes: "Tests que nadie revisa y alumnos que se presentan al teórico a ver si suena la flauta.", ahora: "Cada alumno sabe qué le falta y Marta presenta al examen a quien de verdad está listo." },
        escena: function (x) {
          var u = UI, movil, cuerpo;
          var tests = function (estadoNerea, resaltar) {
            return u.tabla(["Alumno", "Test", "Resultado"], [
              ["Nerea Soler", "Test 14 · Señales y velocidad", estadoNerea],
              ["Pablo Ferrer", "Test 9 · Prioridad", u.chip("24 de 30 · suspenso", "alerta")],
              ["Aitana Ruiz", "Test 21 · Todos los temas", u.chip("29 de 30 · aprobado", "ok")]
            ], [resaltar ? "is-resaltada" : ""]);
          };
          var kp = u.kpis([["38", "alumnos en el teórico"], ["214", "tests hechos esta semana"]]);

          if (x.p === 0) {
            movil = u.movil({ quien: "Móvil de Nerea", hora: "8:12", titulo: "Test 14 · Señales y velocidad", cuerpo:
              u.barra(12, 30, "Pregunta") +
              senal +
              '<p style="font-size:14px;font-weight:600">¿Qué indica esta señal?</p>' +
              opcionesTest(pregunta, { avanza: 0 })
            });
            cuerpo = kp + tests(u.chip("Haciendo el test · 12 de 30", "info"), true);
          } else if (x.p === 1) {
            movil = u.movil({ quien: "Móvil de Nerea", hora: "8:12", titulo: "Test 14 · Señales y velocidad", cuerpo:
              u.barra(12, 30, "Pregunta") +
              senal +
              '<p style="font-size:14px;font-weight:600">¿Qué indica esta señal?</p>' +
              opcionesTest(pregunta, { elegida: 0, buena: 1 }) +
              '<div class="caja caja-suave anim"><h5>' + u.icono("alerta") + "Era la B</h5><p>Las señales redondas azules obligan. Esta te obliga a ir a 50 km/h como mínimo. La de velocidad máxima es redonda, blanca y con el borde rojo.</p></div>" +
              u.btn("Siguiente pregunta", true, "ancho")
            });
            cuerpo = kp + tests(u.chip("Haciendo el test · 12 de 30", "info"), true) +
              '<div class="caja anim anim-2"><h5>La pregunta que más se falla esta semana</h5><p>Señal de velocidad mínima: la fallan 4 de cada 10 alumnos. Casi todos la confunden con la de velocidad máxima.</p></div>';
          } else if (x.p === 2) {
            movil = u.movil({ quien: "Móvil de Nerea", hora: "8:31", titulo: "Test 14 · resultado", cuerpo:
              '<div class="anim">' + u.kpis([["27 de 30", "aciertos", "ok"], ["3", "fallos"]]) + "</div>" +
              '<div class="caja anim"><h5>Tus fallos por tema</h5><ul class="lista-simple">' +
                "<li><span>Señales</span><strong>2</strong></li>" +
                "<li><span>Alcohol y conducción</span><strong>1</strong></li>" +
                "<li><span>Prioridad</span><strong>0</strong></li>" +
                "<li><span>Velocidad y distancias</span><strong>0</strong></li>" +
              "</ul></div>" +
              '<div class="caja caja-suave anim anim-2"><div class="entre"><strong>¿Lista para el examen?</strong>' + u.chip("Casi", "pend") + "</div>" +
                u.barra(4, 5, "Tests aprobados seguidos") +
                '<p class="tenue">Te falta uno. Aprobar es fallar 3 o menos.</p></div>' +
              u.check([["Fallada: tasa de alcohol de un conductor novel", "falta", "La buena: 0,15 mg/l en aire espirado. Con menos de dos años de carnet, tu límite es más bajo."]]) +
              u.btn("Repasar mis 3 fallos", false, "sec")
            });
            cuerpo = kp + tests(u.chip("27 de 30 · aprobado", "ok"), true) +
              '<div class="fila">' + u.btn("Ver todos los alumnos", true) + "</div>";
          } else {
            movil = u.movil({ quien: "Móvil de Iván", app: "wa", hora: "12:00", cuerpo:
              u.fecha("Hoy") +
              u.ellos("Hola, Iván. Hemos visto que la <strong>prioridad en cruces y rotondas</strong> se te está atravesando. Pasa a todos al principio.<br><br>El jueves a las 19:00 Marta da un repaso solo de eso. ¿Te guardamos sitio?", "12:00", x.n(3)) +
              u.respuestas(["Sí, apúntame", "No puedo el jueves"], null, 0) +
              u.ellos("Apuntado. Te dejamos en el móvil 3 tests solo de prioridad para antes del jueves.", "12:01", x.n(3))
            });
            cuerpo = '<div class="anim">' + u.kpis([["6", "listos para el examen", "ok"], ["9", "casi listos"], ["4", "atascados", "alerta"]]) + "</div>" +
              u.tabla(["Alumno", "Aprobados seguidos", "Le cuesta", "Estado"], [
                ["Aitana Ruiz", "7", "—", u.chip("Lista para examen", "ok")],
                ["Lorena Martí", "5", "—", u.chip("Lista para examen", "ok")],
                ["Nerea Soler", "4 de 5", "Señales", u.chip("Casi lista", "pend")],
                ["Pablo Ferrer", "1", "Prioridad", u.chip("Casi listo", "pend")],
                ["Iván Castro", "0 en 6 semanas", "Prioridad · Distancias", u.chip("Atascado", "alerta")]
              ], ["", "", "", "", "is-resaltada"]) +
              '<div class="caja caja-ia anim anim-2"><h5>Para la clase del jueves</h5><p>7 alumnos fallan sobre todo en prioridad en rotondas. A los 4 atascados se les ha propuesto el repaso de las 19:00.</p></div>' +
              '<div class="fila">' + u.btn("Presentar a examen (6)", false) + u.btn("Ver fallos por tema", false, "sec") + "</div>";
          }
          return movil + u.ventana({ quien: "Ordenador de Marta", seccion: "Teórico", cuerpo: cuerpo });
        }
      },

      {
        id: "practicas",
        montaje: { plazo: "2 a 3 semanas", con: "Tu agenda de prácticas o una nueva, y WhatsApp Business" },
        nav: "Clases prácticas",
        titulo: "Clases prácticas reservadas desde el móvil",
        hoy: "Las prácticas se apuntan en una libreta o en un Excel. Los cambios llegan por WhatsApp a cualquier hora y, si alguien no avisa, el coche y el profesor se quedan parados.",
        con: "El alumno ve los huecos libres de su profesor y de su coche y reserva con un toque. Le llega un recordatorio y, si alguien cancela, el hueco se ofrece solo a la lista de espera.",
        ganas: ["Menos mensajes para cuadrar clases", "Coches y profesores sin horas muertas", "Cada alumno sabe cuántas clases lleva"],
        pasos: [
          { quien: "cliente", nombre: "Aitana, alumna", t: "Aitana reserva su clase desde el móvil", d: "Ve los huecos libres de Javi, su profesor, en el coche con el que practica. Elige el martes a las 17:00.", boton: "Reservar" },
          { quien: "auto", t: "La víspera le llega un recordatorio", d: "Con la hora, el coche y dónde la recogen, y botones para confirmar o cambiar. Aitana confirma con un toque.", boton: "Aitana confirma" },
          { quien: "auto", t: "Si alguien cancela, se avisa a la lista de espera", d: "Carlos no puede ir a su clase de las 18:00. Sergio quería clases cuanto antes: le llega el hueco y lo coge. Nadie ha tenido que llamar.", boton: "Sergio coge el hueco" },
          { quien: "equipo", nombre: "Javi, profesor", t: "Javi tiene su día en el móvil", d: "Con quién va, qué clase es para cada uno y dónde los recoge. En la oficina, Marta ve cómo van los coches esta semana.", boton: "Ver el resultado" }
        ],
        final: { antes: "La libreta de prácticas, mensajes para mover cada clase y horas de coche perdidas por cancelaciones de última hora.", ahora: "Los alumnos reservan y cambian solos, y casi todos los huecos que se liberan se vuelven a ocupar." },
        escena: function (x) {
          var u = UI, movil;
          var f17, f18;
          if (x.p === 0) f17 = ["17:00", "Libre", "libre"];
          else if (x.p === 1) f17 = ["17:00", "<strong>Aitana Ruiz</strong><small>Clase 9 · reservada desde el móvil</small>", "nueva", " anim"];
          else f17 = ["17:00", "<strong>Aitana Ruiz</strong><small>Clase 9 · confirmada</small>"];
          if (x.p < 2) f18 = ["18:00", "<strong>Carlos Gil</strong><small>Clase 27 · recogida en la estación</small>"];
          else if (x.p === 2) f18 = ["18:00", "<strong>Carlos Gil ha cancelado</strong><small>Ofrecido a la lista de espera (3 personas)</small>", "hueco", " anim"];
          else f18 = ["18:00", "<strong>Sergio Lara</strong><small>Clase 3 · hueco recuperado</small>", "nueva", " anim"];

          if (x.p === 0) {
            movil = u.movil({ quien: "Móvil de Aitana", hora: "21:40", titulo: "Reservar clase práctica", cuerpo:
              '<div class="caja caja-suave"><div class="entre"><strong>Llevas 8 clases</strong>' + u.chip("Permiso B", "marca") + '</div><p class="tenue">Profesor: Javi Morales · Coche 2, manual</p></div>' +
              u.campos([
                ["Día", u.opc(["L 2", "M 3", "X 4", "J 5", "V 6"], 1)],
                ["Huecos libres el martes", u.opc(["9:00", "17:00", "19:30"], 1)],
                ["Recogida", u.opc(["En la autoescuela", "En la estación"], 0)]
              ]) +
              '<p class="tenue">Clase de 45 minutos. Puedes cambiarla hasta 24 horas antes.</p>' +
              u.btn("Reservar martes a las 17:00", true, "ancho")
            });
          } else if (x.p === 1) {
            movil = u.movil({ quien: "Móvil de Aitana", app: "wa", hora: "19:00", cuerpo:
              u.fecha("Domingo") +
              u.ellos("Clase reservada: <strong>martes 3 a las 17:00</strong> con Javi. Es tu clase 9.", "21:40") +
              u.fecha("Lunes") +
              u.ellos("Hola, Aitana. Mañana tienes práctica a las <strong>17:00</strong> con Javi, en el <strong>Coche 2</strong>. Te recoge en la puerta de la autoescuela.<br><br>¿Nos confirmas?", "19:00", " anim") +
              u.respuestas(["Confirmo", "Cambiar la hora", "No puedo ir"], 0)
            });
          } else if (x.p === 2) {
            movil = u.movil({ quien: "Móvil de Sergio (lista de espera)", app: "wa", hora: "19:12", cuerpo:
              u.fecha("Lunes") +
              u.ellos("Hola, Sergio. Se ha quedado libre una clase <strong>mañana martes a las 18:00</strong> con Javi, en el Coche 2. ¿La quieres?", "19:12", " anim") +
              u.respuestas(["Sí, me la quedo", "No puedo"], 0)
            });
          } else {
            movil = u.movil({ quien: "Móvil de Javi", equipo: true, hora: "8:30", titulo: "Mi día · martes 3", cuerpo:
              '<div class="entre"><strong>Coche 2</strong>' + u.chip("4 clases", "info") + "</div>" +
              u.agenda([
                ["16:00", "<strong>Pablo Ferrer</strong><small>Clase 14 · aparcar en línea</small>"],
                ["17:00", "<strong>Aitana Ruiz</strong><small>Clase 9 · primera vez en autovía</small>"],
                ["18:00", "<strong>Sergio Lara</strong><small>Clase 3 · recogida en la estación</small>", "nueva", " anim"],
                ["19:00", "<strong>Iván Castro</strong><small>Clase 22 · simulacro de examen</small>"]
              ]) +
              '<p class="tenue">Al acabar cada clase, Javi apunta en un toque qué toca en la siguiente.</p>'
            });
          }

          var cuerpo = '<div class="entre"><strong>Martes 3 · Javi Morales · Coche 2</strong>' + u.chip(x.p >= 3 ? "Lista de espera: 2" : "Lista de espera: 3", "info") + "</div>" +
            u.agenda([
              ["16:00", "<strong>Pablo Ferrer</strong><small>Clase 14 · recogida en la autoescuela</small>"],
              f17, f18,
              ["19:00", "<strong>Iván Castro</strong><small>Clase 22 · simulacro de examen</small>"]
            ]);
          if (x.p === 3) {
            cuerpo += '<div class="anim anim-2">' + u.kpis([["4", "cancelaciones esta semana"], ["4", "huecos recuperados", "ok"], ["27", "cambios hechos desde el móvil"]]) + "</div>" +
              u.tabla(["Coche", "Clases esta semana", "Huecos libres"], [
                ["Coche 1 · Rosa", "38", "2"],
                ["Coche 2 · Javi", "41", "0"],
                ["Coche 3 · Andrés", "36", "3"],
                ["Moto · Andrés", "9", "4"]
              ], ["is-resaltada"]);
          }
          return movil + u.ventana({ quien: "Ordenador de la oficina", seccion: "Prácticas", cuerpo: cuerpo });
        }
      },

      {
        id: "examenes",
        montaje: { plazo: "2 semanas", con: "Tu programa de gestión y WhatsApp Business" },
        nav: "Exámenes de la DGT",
        titulo: "Exámenes de la DGT sin listas a mano",
        hoy: "Marta apunta en un papel quién va a cada examen y avisa uno a uno. Siempre hay alguien que llega sin el DNI o no sabe a qué hora le recogen.",
        con: "Cuando Tráfico da fecha, la autoescuela elige quién va y cada alumno recibe su cita con lo que tiene que llevar. Después se apunta el resultado y quien suspende ya sabe cómo seguir.",
        ganas: ["Nadie llega tarde ni sin papeles", "La lista del examen en un minuto", "Quien suspende no pierde semanas"],
        pasos: [
          { quien: "equipo", nombre: "Marta, directora", t: "Marta monta la lista del examen", d: "Tráfico ha dado fecha para el práctico. El panel propone a los alumnos que su profesor ha marcado como listos. Quién va lo decide Marta.", boton: "Confirmar la lista" },
          { quien: "auto", t: "Cada alumno recibe su cita", d: "Día, hora, dónde le recogen y qué tiene que llevar: el DNI original y las gafas si las usa. La víspera le llega un recordatorio.", boton: "Ver el examen" },
          { quien: "equipo", nombre: "Javi, profesor", t: "Javi apunta los resultados", d: "Desde el móvil, al salir del examen. Aitana aprueba; Carlos no, y Javi anota en qué ha fallado.", boton: "Guardar los resultados" },
          { quien: "auto", t: "Quien suspende ya sabe cómo sigue", d: "Carlos recibe lo que tiene que pulir y dos clases de repaso propuestas. Los aprobados, la enhorabuena y lo que toca ahora.", boton: "Ver el resultado" }
        ],
        final: { antes: "Listas en papel, veinte llamadas antes de cada examen y alumnos suspendidos que tardan semanas en volver a dar clase.", ahora: "La lista sale en un minuto, nadie llega sin papeles y quien suspende tiene sus clases de repaso al día siguiente." },
        escena: function (x) {
          var u = UI;
          var cab = '<div class="entre"><strong>Práctico · jueves 12 de noviembre · 8:30</strong>' + u.chip("5 plazas", "marca") + "</div>";
          if (x.p === 0) {
            return u.ventana({ quien: "Ordenador de Marta", seccion: "Exámenes", cuerpo: cab +
              '<p class="peq">Propuestos: alumnos con el teórico aprobado que su profesor ha marcado como listos.</p>' +
              u.tabla(["Alumno", "Profesor", "Clases", "Estado"], [
                ["Aitana Ruiz", "Javi", "24", u.chip("Lista según Javi", "ok")],
                ["Carlos Gil", "Javi", "31", u.chip("Listo según Javi", "ok")],
                ["Lorena Martí", "Rosa", "22", u.chip("Lista según Rosa", "ok")],
                ["Óscar Pons", "Andrés", "27", u.chip("Listo según Andrés", "ok")],
                ["Pablo Ferrer", "Rosa", "26", u.chip("Listo según Rosa", "ok")],
                ["Iván Castro", "Javi", "29", u.chip("Javi pide 2 clases más", "pend")]
              ]) +
              '<div class="fila">' + u.btn("Confirmar la lista (5)", true) + u.btn("Cambiar alumnos", false, "sec") + "</div>" +
              u.nota("La lista la propone el panel con lo que marcan los profesores. Quién va al examen lo decide Marta.")
            });
          }
          var movil, cuerpo;
          if (x.p === 1) {
            movil = u.movil({ quien: "Móvil de Aitana", app: "wa", hora: "10:05", cuerpo:
              u.fecha("Lunes 2") +
              u.ellos("¡Hola, Aitana! Ya tienes fecha para el <strong>examen práctico</strong>:<br><br><strong>Jueves 12 de noviembre, 8:30</strong><br>Te recogemos en la autoescuela a las 7:45.<br><br>Tienes que llevar:<br>· Tu DNI original, en vigor<br>· Gafas o lentillas, si las usas para conducir<br><br>El martes 10 tienes una última clase con Javi.", "10:05", " anim") +
              u.respuestas(["Entendido", "Tengo una duda"], 0)
            });
            cuerpo = cab + u.kpis([["5 de 5", "citas enviadas", "ok"], ["4", "ya las han leído"]]) +
              u.tabla(["Alumno", "Cita", "Recordatorio"], [
                ["Aitana Ruiz", u.chip("Leída", "ok"), "Miércoles 11, 20:00"],
                ["Carlos Gil", u.chip("Leída", "ok"), "Miércoles 11, 20:00"],
                ["Lorena Martí", u.chip("Leída", "ok"), "Miércoles 11, 20:00"],
                ["Óscar Pons", u.chip("Leída", "ok"), "Miércoles 11, 20:00"],
                ["Pablo Ferrer", u.chip("Enviada", "info"), "Miércoles 11, 20:00"]
              ]);
          } else if (x.p === 2) {
            movil = u.movil({ quien: "Móvil de Javi", equipo: true, hora: "10:20", titulo: "Resultados · jueves 12", cuerpo:
              u.check([
                ["Aitana Ruiz", "ok", "Apta"],
                ["Carlos Gil", "falta", "No apto"],
                ["Lorena Martí", "ok", "Apta"],
                ["Óscar Pons", "ok", "Apto"],
                ["Pablo Ferrer", "pend", "Examinándose ahora"]
              ]) +
              u.campos([["Qué ha fallado Carlos", "Rotonda grande: no cedió al que ya estaba dentro. Un cambio de carril sin señalizar."]]) +
              u.btn("Guardar los resultados", true, "ancho")
            });
            cuerpo = cab + u.tabla(["Alumno", "Profesor", "Resultado"], [
              ["Aitana Ruiz", "Javi", u.chip("Apta", "ok")],
              ["Carlos Gil", "Javi", u.chip("No apto", "alerta")],
              ["Lorena Martí", "Rosa", u.chip("Apta", "ok")],
              ["Óscar Pons", "Andrés", u.chip("Apto", "ok")],
              ["Pablo Ferrer", "Rosa", u.chip("Examinándose", "info")]
            ], ["", "is-resaltada"]);
          } else {
            movil = u.movil({ quien: "Móvil de Carlos", app: "wa", hora: "11:30", cuerpo:
              u.fecha("Jueves 12") +
              u.ellos("Hola, Carlos. Hoy no ha salido, pero estuviste cerca. Javi ha apuntado lo que hay que pulir: <strong>la prioridad en las rotondas grandes</strong> y <strong>señalizar los cambios de carril</strong>.<br><br>Te proponemos 2 clases de repaso y te apuntamos a la próxima fecha que nos den.", "11:30", x.n(3)) +
              u.respuestas(["Reservar las clases", "Llamadme"], null, 0) +
              u.ellos("Hecho: <strong>martes y jueves a las 18:00</strong> con Javi. Te avisamos en cuanto haya fecha de examen.", "11:31", x.n(3))
            });
            cuerpo = cab + '<div class="anim">' + u.kpis([["4 de 5", "aptos", "ok"], ["1", "vuelve a examen"]]) + "</div>" +
              '<div class="caja' + x.n(3) + '"><div class="entre"><strong>Carlos Gil · siguiente intento</strong>' + u.chip("En marcha", "info") + "</div>" +
                u.check([
                  ["2 clases de repaso", "ok", "Martes y jueves, 18:00 con Javi"],
                  ["Próximo examen", "pend", "En la próxima fecha que dé Tráfico"]
                ]) + "</div>" +
              '<div class="caja caja-suave anim anim-2"><h5>' + u.icono("check") + "A los 4 aptos</h5><p>Les ha llegado la enhorabuena, cómo conseguir el permiso provisional y el recordatorio de llevar la L durante el primer año.</p></div>";
          }
          return movil + u.ventana({ quien: "Ordenador de Marta", seccion: "Exámenes", cuerpo: cuerpo });
        }
      },

      {
        id: "matricula",
        montaje: { plazo: "2 a 3 semanas", con: "WhatsApp Business, la tarifa de la autoescuela y tu programa de gestión" },
        nav: "Matrículas y WhatsApp",
        titulo: "Matrículas online y las preguntas de siempre en WhatsApp",
        hoy: "Cada día llegan las mismas preguntas: qué cuesta, qué papeles hacen falta, cuándo empieza el teórico. Y la matrícula se hace en la oficina, con fotocopias.",
        con: "Un asistente responde por WhatsApp con la información de la autoescuela y manda el enlace de matrícula. El alumno se apunta desde el móvil y sube sus documentos. Marta solo revisa.",
        ganas: ["Respuestas a cualquier hora", "Matrículas sin pasar por la oficina", "Los papeles completos desde el principio"],
        pasos: [
          { quien: "cliente", nombre: "Daniel, 18 años", t: "Daniel pregunta un sábado por la noche", d: "Quiere sacarse el carnet de coche este invierno. Escribe por WhatsApp a las 23:10, con la oficina cerrada.", boton: "Enviar" },
          { quien: "auto", t: "Respuesta con lo que necesita saber", d: "La tarifa de la autoescuela, los papeles y cuándo empieza el próximo grupo de teórico. Lo que no sabe, como pagar a plazos, se lo pasa a Marta.", boton: "Matricularme" },
          { quien: "cliente", nombre: "Daniel, 18 años", t: "Se matricula y sube sus documentos", d: "Sus datos, el DNI por las dos caras y una foto de carnet. Si una foto sale borrosa, se lo dice en el momento. El psicotécnico lo puede subir más tarde.", boton: "Enviar la matrícula" },
          { quien: "equipo", nombre: "Marta, directora", t: "El lunes, Marta solo revisa", d: "La matrícula está con los documentos comprobados y Daniel ya tiene acceso a los tests. A Marta le queda contestar lo de los plazos.", boton: "Ver el resultado" }
        ],
        final: { antes: "El WhatsApp de la autoescuela respondido a deshoras y matrículas con fotocopias que faltan.", ahora: "Las preguntas se responden al momento y las matrículas llegan con los papeles. Marta decide lo que necesita su criterio." },
        escena: function (x) {
          var u = UI, movil, cuerpo;
          var tarifa = '<span style="display:flex;gap:8px;align-items:center;margin:8px 0 2px;padding:8px 10px;border-radius:10px;background:#F4F5F6">' + u.icono("doc") + '<span><strong style="display:block;font-size:12.5px">Tarifa Autoescuela Faro.pdf</strong><small style="opacity:.7">Permiso B · qué incluye cada opción</small></span></span>';
          if (x.p < 2) {
            var chat = u.fecha("Sábado") + u.yo("Hola, quiero sacarme el carnet de coche. ¿Cuánto cuesta y qué tengo que llevar?", "23:10", x.n(0));
            if (x.p === 0) chat += u.btn(u.icono("enviar") + "Enviar", true);
            if (x.p === 1) {
              chat += u.ellos("¡Hola, Daniel! Te paso la tarifa de la autoescuela con lo que incluye cada opción." + tarifa, "23:10", " anim") +
                u.ellos("Para matricularte necesitas:<br>· Tu DNI<br>· Una foto de carnet<br>· El informe del reconocimiento médico (psicotécnico), que puedes traer más tarde<br><br>El próximo grupo de teórico empieza el <strong>lunes 9 a las 19:00</strong>.", "23:10", " anim") +
                u.yo("¿Y se puede pagar en varias veces?", "23:12") +
                u.ellos("Eso te lo confirma Marta, la directora. Le paso tu pregunta y te escribe el lunes. Mientras, si quieres, ya puedes hacer la matrícula desde aquí:" + u.btn("Matricularme", true), "23:12", " anim anim-2");
            }
            movil = u.movil({ quien: "Móvil de Daniel", app: "wa", hora: "23:12", cuerpo: chat });
            cuerpo = u.kpis([["31", "preguntas respondidas este fin de semana", "ok"], [x.p ? "2" : "1", "para Marta"]]) +
              u.tabla(["Persona", "Pregunta", "Estado"], [
                ["Elena Ortiz", "¿Hay teórico online?", u.chip("Respondida", "ok")],
                ["Hugo Benet", "¿Cuándo empieza la moto?", u.chip("Respondida", "ok")],
                ["Daniel Navarro", x.p ? "Tarifa, papeles y pago a plazos" : "…", x.p ? u.chip("Plazos: para Marta", "pend") : u.chip("Entrando", "info")]
              ], ["", "", "is-resaltada"]);
          } else if (x.p === 2) {
            movil = u.movil({ quien: "Móvil de Daniel", hora: "23:20", titulo: "Matrícula · Permiso B", cuerpo:
              u.campos([
                ["Alumno", "Daniel Navarro Gil · 18 años"],
                ["Permiso", u.opc(["B · coche", "A2 · moto"], 0)],
                ["Teórico", u.opc(["En la autoescuela", "Online"], 0)]
              ]) +
              '<p class="peq"><strong>Tus documentos</strong></p>' +
              u.check([
                ["DNI por las dos caras", "ok", "La parte de atrás salía borrosa. Repetida y bien."],
                ["Foto de carnet", "ok", "Fondo claro, se ve bien"],
                ["Psicotécnico", "pend", "Lo puedes subir cuando lo tengas"],
                ["Condiciones y protección de datos", "ok", "Aceptadas"]
              ]) +
              u.btn("Enviar la matrícula", true, "ancho")
            });
            cuerpo = '<div class="entre"><strong>Matrícula entrando · Daniel Navarro</strong>' + u.chip("Desde el móvil", "info") + "</div>" +
              '<div class="anim">' + u.check([
                ["DNI", "ok", "Comprobado: se lee bien y está en vigor"],
                ["Foto de carnet", "ok", "Comprobada"],
                ["Psicotécnico", "pend", "Lo sube más tarde"]
              ]) + "</div>";
          } else {
            movil = u.movil({ quien: "Móvil de Daniel", app: "wa", hora: "23:21", cuerpo:
              u.fecha("Sábado") +
              u.ellos("¡Matrícula recibida, Daniel! Empiezas el teórico el <strong>lunes 9 a las 19:00</strong>.<br><br>Ya tienes los tests en el móvil para ir practicando. Cuando tengas el psicotécnico, súbelo desde el mismo enlace.", "23:21", " anim")
            });
            cuerpo = '<div class="anim">' + u.kpis([["9", "matrículas online este mes", "ok"], ["12 de 16", "plazas en el teórico del lunes"]]) + "</div>" +
              '<div class="caja caja-suave"><div class="entre"><strong>Daniel Navarro Gil</strong>' + u.chip("Nuevo", "marca") + "</div>" +
                u.ficha([["Permiso", "B · coche"], ["Teórico", "Lunes y miércoles, 19:00"], ["Documentos", "DNI y foto comprobados · falta el psicotécnico"]]) + "</div>" +
              '<div class="caja caja-ia anim anim-2"><h5>Para Marta</h5><p>Daniel pregunta si puede pagar en varias veces. Empieza el teórico el lunes.</p></div>' +
              '<div class="fila">' + u.btn("Responder a Daniel", false) + u.btn("Ver la matrícula", false, "sec") + "</div>";
          }
          return movil + u.ventana({ quien: "Ordenador de Marta", seccion: "Matrículas", cuerpo: cuerpo });
        }
      }
    ]
  });
})();
