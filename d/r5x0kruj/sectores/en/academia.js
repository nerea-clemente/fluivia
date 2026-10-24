/* Demo · Language school (fictional example) · English */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "academia",
  etiqueta: "Language school",
  tipo: "Language school and tutoring",
  negocio: "Nexo Academy",
  lema: "Languages and tutoring in small groups",
  cliente: "Family",
  software: { actual: "your student management system", medida: "a custom system for groups, students and families" },
  marca: {
    m1: "#4B3FD1", m1t: "#FFFFFF", m2: "#FFE08A", m2t: "#2A2272", suave: "#F3F1FF", tinta: "#221C4F",
    fuente: "'Nunito', 'Trebuchet MS', sans-serif", radio: "18px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="20" fill="#4B3FD1"/><path d="M13.5 27V14l13 13V14" fill="none" stroke="#FFC93C" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  panel: ["Exams", "Groups", "Students", "Attendance", "Enrolment"],
  situacion: "Around 180 students, from primary school to adults, in 22 groups for English, French and tutoring. Four groups, teenagers and adults, are preparing for Cambridge exams. Claire runs the school and teaches too. In September and June she can't keep up.",
  dolores: [
    ["Practice papers nobody marks in time", "The B2 and C1 groups want practice exams, but marking them takes whole afternoons. And the results arrive when they're no longer useful."],
    ["September is chaos", "Paper enrolment forms, phone calls to work out levels and groups that fill up before anyone notices."],
    ["Absences nobody reports", "If a student misses class, the family finds out when the report arrives. And nobody sees who is drifting away."],
    ["June without knowing who's staying", "Half the families don't confirm whether they're coming back next year, so groups are planned blind."]
  ],
  casos: [
    {
      id: "examenes",
      montaje: { plazo: "3 to 4 weeks", con: "Your website, your groups and the exercises your teachers write" },
      nav: "Practice exams",
      titulo: "Cambridge-style practice exams that mark themselves",
      hoy: "The B2 and C1 groups ask for mock exams, but marking them eats up the teachers’ afternoons. And until the exam nobody really knows who is struggling with Listening.",
      con: "Students take practice exams in the style of B2 First and C1 Advanced on their phone or laptop. They mark themselves, with explanations, and the school sees how each group is doing in each part.",
      ganas: ["Mock exams without hours of marking", "Every student knows what to revise", "You see who is struggling, and where"],
      pasos: [
        { quien: "cliente", nombre: "Sofia, 16", t: "Sofia does Use of English on her phone", d: "Multiple-choice gaps and word formation. Each answer is marked straight away, with the reason why.", boton: "Go to Reading" },
        { quien: "cliente", nombre: "Sofia, 16", t: "Reading, with the clue in the text", d: "A short text and its questions. If she gets one wrong, she sees the sentence where the answer was.", boton: "Go to Listening" },
        { quien: "cliente", nombre: "Sofia, 16", t: "Listening, just like the exam", d: "She hears it twice and writes what she hears. Here the answers are marked at the end, not before.", boton: "Finish the exam" },
        { quien: "auto", t: "A score for each part, an estimated level and what to revise", d: "Sofia sees she’s on track for B2 and where she loses most marks. Rachel, her teacher, sees it at the same time on her dashboard.", boton: "See how the groups are doing" },
        { quien: "equipo", nombre: "Rachel, teacher", t: "Rachel sees who needs help and sets the next practice", d: "By group and by part. Listening is weak in the teen B2 group, so she sends them a new exam and extra practice for that part.", boton: "Assign to the group" }
      ],
      final: { antes: "Paper mock exams marked at home days later, and students who sit the real exam without knowing what they’re getting wrong.", ahora: "Every practice exam is marked instantly, and Rachel plans the next one around what each group finds hardest." },
      escena: function (x) {
        var u = UI, movil, cuerpo, p = x.p;
        var titulo = "Exam 4 · " + ["Use of English", "Reading", "Listening"][Math.min(p, 2)] + " · " + (p + 1) + " of 3";

        if (p === 0) {
          movil = u.movil({ quien: "Sofia’s phone", hora: "17:40", titulo: titulo, cuerpo:
            '<div class="caja anim"><p class="peq"><strong>Part 1 · Choose the missing word</strong></p><p>On her first night in Dublin, Marta ___ up a conversation with the woman next door.</p>' + u.opc(["A struck", "B made", "C took", "D set"], 1) + "</div>" +
            u.check([["It was ‘struck’, not ‘made’", "falta", "We say ‘strike up a conversation’: to start talking to someone. ‘Make’ goes with ‘friends’.", " anim anim-2"]]) +
            '<div class="caja"><p class="peq"><strong>Part 3 · Form the word</strong></p><p>Losing the final was a huge ___ for the team. <span class="tenue">(DISAPPOINT)</span></p></div>' +
            u.check([["disappointment", "ok", "Correct: after ‘a huge’ you need a noun."]]) +
            u.btn("Go to Reading", true, "ancho")
          });
        } else if (p === 1) {
          movil = u.movil({ quien: "Sofia’s phone", hora: "17:52", titulo: titulo, cuerpo:
            '<div class="caja anim"><p class="peq"><strong>The night library</strong></p><p class="peq">Every Thursday, the library in Hartfield stays open until midnight. Students asked for it: they had nowhere quiet to revise. ‘We expected five people,’ says Joan, the librarian. ‘Forty <mark>turned up</mark>.’</p></div>' +
            '<div class="fila">' + u.chip("1 ✓", "ok") + u.chip("2 ✓", "ok") + u.chip("3 ✗", "alerta") + u.chip("4 …", "info") + "</div>" +
            '<div class="caja"><p class="peq"><strong>3. What does ‘turned up’ mean?</strong></p>' + u.opc(["A arrived", "B left", "C complained", "D signed up"], 3) + "</div>" +
            u.check([["It was ‘arrived’, not ‘signed up’", "falta", "‘Turn up’ means to arrive or appear: they expected five and forty came. ‘Sign up’ means to register.", " anim anim-2"]]) +
            u.btn("Go to Listening", true, "ancho")
          });
        } else if (p === 2) {
          movil = u.movil({ quien: "Sofia’s phone", hora: "18:05", titulo: titulo, cuerpo:
            '<div class="caja caja-suave anim"><div style="display:flex;gap:12px;align-items:center">' +
              '<span style="display:grid;place-items:center;width:44px;height:44px;flex:none;border-radius:50%;background:var(--m1);color:var(--m1t)"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg></span>' +
              '<div style="flex:1;min-width:0"><strong class="peq">Part 2 · A bike tour along the river</strong>' +
              '<div class="barra-fondo" style="margin:7px 0 4px"><i style="width:58%"></i></div>' +
              '<div class="entre tenue"><span>1:52</span><span>3:15</span></div></div></div>' +
              '<p class="tenue" style="margin-top:8px">Second of two listens, as in the exam.</p></div>' +
            u.campos([
              ["6. The tour starts at the old ___ station.", "railway"],
              ["7. Riders must bring their own ___.", "helmet"],
              ["8. The longest stop is for a ___ by the water.", "picnic"]
            ]) +
            '<p class="tenue">Your answers will be marked when you finish.</p>' +
            u.btn("Finish the exam", true, "ancho")
          });
        } else if (p === 3) {
          movil = u.movil({ quien: "Sofia’s phone", hora: "18:14", titulo: "Results · Exam 4", cuerpo:
            '<div class="caja caja-suave anim" style="text-align:center"><p class="tenue">Estimated level</p><p class="marca-fuente" style="font-size:24px;line-height:1.2">You’re on track for B2</p><p class="tenue">About 166 points. B2 starts at 160.</p></div>' +
            u.barra(20, 28, "Use of English") + u.barra(31, 42, "Reading") + u.barra(17, 30, "Listening") +
            u.check([["Listening 7: it was ‘water bottle’", "falta", "You wrote ‘helmet’, but helmets are provided: ‘Just bring a water bottle.’", " anim anim-2"]]) +
            '<div class="caja caja-alerta anim anim-2"><h5>' + u.icono("alerta") + 'To revise</h5><ul class="lista-simple"><li><span>Listening Part 2</span><strong>3 mistakes</strong></li><li><span>Phrasal verbs with ‘up’</span><strong>2 mistakes</strong></li></ul></div>'
          });
        } else {
          movil = u.movil({ quien: "Sofia’s phone", hora: x.fin ? "19:02" : "18:30", titulo: "My exams", cuerpo:
            (x.fin ? u.aviso("New practice from Rachel", "Exam 5 and an extra Listening Part 2. Due Friday.", " anim") : "") +
            u.grafico([5.1, 5.8, 6.4, 6.9], ["Ex. 1", "Ex. 2", "Ex. 3", "Ex. 4"], "Your score in each exam (out of 10)") +
            u.check([
              ["Exam 4", "ok", "6.9 · on track for B2"],
              ["Exam 3", "ok", "6.4 · high B1"],
              x.fin ? ["Exam 5", "pend", "Set by Rachel · due Friday", " anim"] : ["Exam 5", "pend", "Not assigned yet"]
            ])
          });
        }

        if (p < 3) {
          var sof = [
            "<strong>Sofia Marino</strong>",
            p === 0 ? u.chip("In progress", "info") : "71%",
            p === 0 ? "—" : p === 1 ? u.chip("In progress", "info") : "74%",
            p < 2 ? "—" : u.chip("In progress", "info"),
            "—"
          ];
          cuerpo = '<div class="entre"><strong>Exam 4 · B2 First teens</strong>' + u.chip("Due Friday", "marca") + "</div>" +
            u.kpis([["8 of 12", "submitted"], ["1", "doing it now", "ok"], ["3", "not started"]]) +
            u.tabla(["Student", "Use of English", "Reading", "Listening", "Level"], [
              sof,
              ["Leo Novak", "86%", "83%", "80%", u.chip("Strong B2", "ok")],
              ["Daniel Ross", "79%", "77%", "55%", u.chip("B2", "ok")],
              ["Nora Price", "63%", "70%", "48%", u.chip("High B1", "pend")],
              ["Alex Moreno", "60%", "58%", "52%", u.chip("High B1", "pend")]
            ], ["is-resaltada"]) +
            '<p class="tenue">The school’s own exercises, in the style of B2 First. Not official Cambridge material.</p>';
        } else if (p === 3) {
          cuerpo = '<div class="entre"><strong>Exam 4 · B2 First teens</strong>' + u.chip("Due Friday", "marca") + "</div>" +
            u.kpis([["9 of 12", "submitted", "ok"], ["0", "doing it now"], ["3", "not started"]]) +
            u.tabla(["Student", "Use of English", "Reading", "Listening", "Level"], [
              ["<strong>Sofia Marino</strong>", "71%", "74%", "57%", u.chip("B2", "ok")],
              ["Leo Novak", "86%", "83%", "80%", u.chip("Strong B2", "ok")],
              ["Daniel Ross", "79%", "77%", "55%", u.chip("B2", "ok")],
              ["Nora Price", "63%", "70%", "48%", u.chip("High B1", "pend")],
              ["Alex Moreno", "60%", "58%", "52%", u.chip("High B1", "pend")]
            ], ["is-resaltada"]) +
            '<div class="caja caja-ia anim anim-2"><h5>In this group</h5><p>Listening is the weakest part: 58% on average. Almost all the mistakes are in Part 2, when noting down specific details.</p></div>' +
            '<div class="fila">' + u.btn("See how the groups are doing", true) + "</div>";
        } else {
          cuerpo = '<div class="entre"><strong>How the groups are doing</strong>' + u.chip("Exam 4", "info") + "</div>" +
            u.tabla(["Group", "Use of English", "Reading", "Listening", "Overall"], [
              ["B2 First teens (12)", "72%", "75%", u.chip("58%", "alerta"), "Borderline B2"],
              ["B2 First adults (9)", "68%", "80%", "71%", "B2"],
              ["C1 Advanced adults (7)", u.chip("61%", "alerta"), "78%", "74%", "Borderline C1"]
            ], ["is-resaltada"]) +
            '<div class="caja caja-alerta"><h5>' + u.icono("alerta") + 'Who needs help</h5><ul class="lista-simple">' +
              "<li><span>Listening Part 2 · B2 teens</span><strong>Sofia, Nora, Alex, Daniel</strong></li>" +
              "<li><span>Word formation · C1 adults</span><strong>Paula, Marco</strong></li></ul></div>" +
            '<div class="caja' + (x.fin ? " caja-suave" : " anim") + '"><h5>Next practice</h5>' +
              u.campos([
                ["Group", "B2 First teens · 12 students"],
                ["What you’re setting", u.opc(["Full Exam 5", "Extra Listening Part 2", "Word formation"], [0, 1])],
                ["Due", "Friday 6 November"]
              ]) +
              '<div class="fila" style="margin-top:10px">' + (x.fin ? u.chip("Assigned to 12 students", "ok") + '<span class="tenue">It’s on their phones now</span>' : u.btn("Assign to the group", true)) + "</div></div>";
        }
        return movil + u.ventana({ quien: "Rachel’s computer (teacher)", seccion: "Exams", cuerpo: cuerpo });
      }
    },

    {
      id: "matricula",
      montaje: { plazo: "3 weeks", con: "Your website, your management system and the direct debit you already use" },
      nav: "Online enrolment",
      titulo: "Online enrolment with a placement test",
      hoy: "Families come into the school, fill in forms and the student has to do a placement test in person before anyone can tell them which group to join.",
      con: "The family enrols from their phone: details, a short placement test, a suggested group with real places left and the school rules signed. The school sees everything in order.",
      ganas: ["Enrolment at any time of day", "The right groups from day one", "A September without queues"],
      pasos: [
        { quien: "cliente", nombre: "Laura, Hugo’s mum", t: "Laura signs Hugo up from her phone", d: "The student’s details, what he wants to study and which afternoons he’s free. On a Sunday evening, without calling.", boton: "Next" },
        { quien: "cliente", nombre: "Hugo, 12", t: "Hugo takes a short placement test", d: "Ten minutes of questions that adapt to how he answers. It’s there to guide, not to pass or fail.", boton: "Finish the test" },
        { quien: "auto", t: "He’s offered a group with real places left", d: "Based on his level, age and timetable. Laura books the place and accepts the rules and the privacy policy in the same step.", boton: "Book the place" },
        { quien: "equipo", nombre: "Claire, director", t: "Claire watches the groups fill up", d: "She knows how many places are left in each group and when it makes sense to open another. Teachers get their class lists.", boton: "See the result" }
      ],
      final: { antes: "Queues in September, placement tests one by one and groups that don’t quite fit.", ahora: "Families enrol on their own and groups are built around each student’s level." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        var grupos = function (extra) {
          return u.tabla(["Group", "Timetable", "Places"], [
            ["English A2+ (ages 11–13)", "Mon & Wed · 18:00", (8 + extra) + " of 10"],
            ["English B1 (ages 12–14)", "Tue & Thu · 18:00", "10 of 10 " + u.chip("Full", "alerta")],
            ["French A1 (adults)", "Tue & Thu · 19:30", "5 of 8"],
            ["Maths support (Years 9–11)", "Fri · 17:00", "6 of 8"]
          ], [extra ? "is-resaltada" : ""]);
        };
        if (x.p === 0) {
          movil = u.movil({ quien: "Laura’s phone", hora: "21:50", titulo: "Enrolment 2026–27", cuerpo:
            u.campos([
              ["Student", "Hugo Bennett · 12"],
              ["School year", "Year 7"],
              ["What does he want to study?", u.opc(["English", "French", "Tutoring"], 0)],
              ["Free afternoons", u.opc(["Mon", "Tue", "Wed", "Thu", "Fri"], [0, 2])]
            ]) + u.btn("Next: placement test", true, "ancho")
          });
          cuerpo = u.kpis([["126", "enrolled"], ["38", "places left"]]) + grupos(0);
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Laura’s phone (Hugo’s using it)", hora: "21:55", titulo: "Placement test · 7 of 12", cuerpo:
            u.barra(7, 12, "Questions") +
            '<div class="caja anim"><p class="peq"><strong>Choose the right option:</strong></p><p>Last summer we ___ to Portugal with my cousins.</p></div>' +
            u.opc(["go", "went", "have gone", "were go"], 1) +
            '<div class="caja anim anim-2"><p class="peq"><strong>Listen and answer</strong></p><p class="tenue">A 20-second recording about a train timetable.</p></div>' +
            u.btn("Finish the test", true, "ancho")
          });
          cuerpo = u.kpis([["126", "enrolled"], ["38", "places left"]]) + grupos(0);
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Laura’s phone", hora: "22:01", titulo: "Suggested group", cuerpo:
            '<div class="caja caja-suave anim"><p class="tenue">Hugo’s approximate level</p><p class="marca-fuente" style="font-size:24px">High A2</p></div>' +
            '<div class="caja anim anim-2"><h5>English A2+ (ages 11–13)</h5><p>Mondays and Wednesdays, 18:00 to 19:00 · Teacher: Sarah Mills</p><p>€95 a month</p><p>' + u.chip("2 places left", "pend") + "</p></div>" +
            u.check([["I accept the school rules", "ok"], ["I accept the privacy policy", "ok"], ["I allow photos of Hugo in class", "falta", "Not allowed"]]) +
            u.btn("Book the place", true, "ancho")
          });
          cuerpo = u.kpis([["126", "enrolled"], ["38", "places left"]]) + grupos(0);
        } else {
          movil = u.movil({ quien: "Laura’s phone", app: "mail", hora: "22:02", cuerpo:
            u.mail({ asunto: "Hugo’s place is booked", clase: " anim", cuerpo:
              "<p>Hi Laura,</p><p>Hugo starts on <strong>Monday 14 September at 18:00</strong> in the English A2+ group with Sarah.</p><p>The first €95 will be collected by direct debit on 1 October. We’ll also send you the materials list and the calendar for the year. See you soon!</p>" })
          });
          cuerpo = u.kpis([["127", "enrolled", "ok"], ["37", "places left"]]) + grupos(1) +
            '<div class="caja caja-alerta anim anim-2"><h5>' + u.icono("alerta") + "English B1 is full</h5><p>6 families are on the waiting list for Tue & Thu at 18:00. With 4 more, you can open another group.</p></div>" +
            '<div class="caja caja-suave"><div class="entre"><strong>Hugo Bennett</strong>' + u.chip("New", "marca") + '</div><p class="tenue">High A2 · no photo consent · class list sent to Sarah</p></div>';
        }
        return movil + u.ventana({ quien: "Claire’s computer", seccion: x.p === 3 ? "Groups" : "Enrolment", cuerpo: cuerpo });
      }
    },

    {
      id: "asistencia",
      montaje: { plazo: "2 weeks", con: "A web app for teachers and WhatsApp" },
      nav: "Absences and families",
      titulo: "Absences reported to families the same day",
      hoy: "Teachers take the register on paper. If a student misses class, the family doesn’t find out, and nobody sees who is drifting away until it’s too late.",
      con: "The teacher takes the register on her phone, the family gets a message with the homework and the school sees who is missing too many classes.",
      ganas: ["Families informed straight away", "Students who don’t fall behind", "Termly reports without the effort"],
      pasos: [
        { quien: "equipo", nombre: "Sarah, teacher", t: "Sarah takes the register in 20 seconds", d: "On her phone, at the start of class. Hugo isn’t here.", boton: "Save the register" },
        { quien: "auto", t: "The family gets a message with the homework", d: "Laura knows straight away that Hugo didn’t turn up, and she has today’s homework so he doesn’t fall behind.", boton: "Laura replies" },
        { quien: "auto", t: "Claire sees who is drifting away", d: "Hugo’s absence is recorded as justified. And an alert shows the students with several absences this month, so she can call in time.", boton: "See the termly report" },
        { quien: "auto", t: "The termly report writes itself", d: "Attendance, progress and a comment from the teacher for each family. Sarah only writes the comment.", boton: "See the result" }
      ],
      final: { antes: "Paper registers, families who hear about absences when the report arrives, and students who leave without a word.", ahora: "Every absence is reported the same day and the school calls anyone who’s drifting away before they’re gone." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        var al = function (n, ok) { return [n, ok ? "ok" : "falta", ok ? "Present" : "Absent"]; };
        if (x.p === 0) {
          movil = u.movil({ quien: "Sarah’s phone", equipo: true, hora: "18:02", titulo: "English A2+ · Monday 18:00", cuerpo:
            u.check([al("Chloe Evans", true), al("Hugo Bennett", false), al("Max Turner", true), al("Lily Ahmed", true), al("Ben Clarke", true), al("Ava Shaw", true)]) +
            u.campos([["Today’s homework", "Unit 4: exercises 2 to 5 on page 38"]]) +
            u.btn("Save the register", true, "ancho")
          });
          cuerpo = '<p class="tenue">Waiting for the registers from the 18:00 classes…</p>';
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Laura’s phone", app: "wa", hora: "18:03", cuerpo:
            u.ellos("Hi Laura. Hugo didn’t come to English today (18:00). Is everything OK?<br><br>Today’s homework: <strong>Unit 4, exercises 2 to 5 on page 38</strong>.", "18:03", " anim") +
            u.respuestas(["He’s ill", "We forgot", "Please call me"], 0)
          });
          cuerpo = u.tabla(["Student", "Group", "Message"], [["Hugo Bennett", "English A2+", u.chip("Family notified", "info")], ["Tom Walsh", "Maths support", u.chip("Family notified", "info")]], ["is-resaltada"]);
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Laura’s phone", app: "wa", hora: "18:05", cuerpo:
            u.ellos("Hi Laura. Hugo didn’t come to English today (18:00). Is everything OK?<br><br>Today’s homework: <strong>Unit 4, exercises 2 to 5 on page 38</strong>.", "18:03") +
            u.yo("He’s ill, he’s got a temperature.", "18:05") +
            u.ellos("Thanks for letting us know. Hope he feels better soon! We’ll tell Sarah.", "18:05", " anim")
          });
          cuerpo = u.tabla(["Student", "Group", "Message"], [["Hugo Bennett", "English A2+", u.chip("Justified: ill", "ok")]]) +
            '<div class="caja caja-alerta anim anim-2"><h5>' + u.icono("alerta") + "3 students with 3 or more absences this month</h5>" +
            u.tabla(["Student", "Absences", ""], [["Nora Price", "4", u.btn(u.icono("telefono") + "Call", false, "sec")], ["Alex Moreno", "3", u.btn(u.icono("telefono") + "Call", false, "sec")], ["Tom Walsh", "3", u.btn(u.icono("telefono") + "Call", false, "sec")]]) + "</div>" +
            '<div class="fila">' + u.btn("See the termly report", true) + "</div>";
        } else {
          movil = u.movil({ quien: "Laura’s phone", app: "mail", hora: "17:00", cuerpo:
            u.mail({ asunto: "Hugo’s autumn term report", clase: " anim", cuerpo:
              u.kpis([["92%", "attendance"], ["B+", "progress"]]) +
              "<p><strong>Sarah’s comment:</strong> Hugo joins in a lot and his speaking has improved. He needs to revise his irregular verbs.</p>" })
          });
          cuerpo = '<div class="entre"><strong>Autumn term reports</strong>' + u.chip("Sent to 178 families", "ok") + "</div>" +
            u.tabla(["Student", "Attendance", "Comment", ""], [
              ["Hugo Bennett", "92%", "Written by Sarah", u.chip("Sent", "ok")],
              ["Chloe Evans", "100%", "Written by Sarah", u.chip("Sent", "ok")],
              ["Nora Price", "71%", "Written by Rachel", u.chip("Sent", "ok")]
            ]);
        }
        return movil + u.ventana({ quien: "Claire’s computer", seccion: "Attendance", cuerpo: cuerpo });
      }
    },

    {
      id: "renovaciones",
      montaje: { plazo: "1 to 2 weeks", con: "WhatsApp or email and your student list" },
      nav: "Re-enrolment in June",
      titulo: "Knowing in June who’s coming back in September",
      hoy: "In June, half the families don’t say whether they’re staying. In September some groups are short of places and others have too many.",
      con: "In May every family gets a suggested group for next year. With their answers, the school plans its groups and knows why the people who leave are leaving.",
      ganas: ["Groups planned before the summer", "Places kept for those who stay", "You know why people leave"],
      pasos: [
        { quien: "auto", t: "In May, a suggested group for next year", d: "Laura gets the group recommended for Hugo next year, with priority over new families.", boton: "Laura keeps the place" },
        { quien: "auto", t: "Those who leave say why", d: "One question, one tap. The school knows whether they’re leaving because of the timetable, the price or a move.", boton: "See the answers" },
        { quien: "equipo", nombre: "Claire, director", t: "Claire plans next year with real numbers", d: "She sees who’s staying, who’s changing group and who hasn’t replied yet. They get reminders automatically. And she sees which new groups she’ll need.", boton: "See the result" }
      ],
      final: { antes: "Groups organised blind in September and students who leave without anyone knowing why.", ahora: "By June Claire knows how many groups she’ll have and what to change so nobody else leaves." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        if (x.p === 0) {
          movil = u.movil({ quien: "Laura’s phone", app: "wa", hora: "10:00", cuerpo:
            u.fecha("15 May") +
            u.ellos("Hi Laura. Hugo has had a great year!<br><br>For next year we recommend <strong>English B1 (ages 12–14)</strong>, Mondays and Wednesdays at 18:00, with Sarah.<br><br>Current families have priority until 31 May. Shall we keep his place?", "10:00", " anim") +
            u.respuestas(["Yes, please keep it", "Change the timetable", "We’re not continuing"], 0)
          });
        } else {
          movil = u.movil({ quien: "The Price family’s phone", app: "wa", hora: "20:10", cuerpo:
            u.fecha("17 May") +
            u.ellos("Hi Emma. Shall we keep Nora’s place for next year?", "10:00") +
            u.respuestas(["Yes, please keep it", "Change the timetable", "We’re not continuing"], null, 2) +
            u.ellos("Thanks for letting us know. Could you tell us why? It helps us improve.", "20:10", x.n(1)) +
            u.respuestas(["The timetable doesn’t work", "The price", "We’re moving", "Other"], null, 0)
          });
        }
        var datos = x.p === 0 ? [["1", "replies", ""], ["179", "no reply yet", ""]] :
          [["132", "staying", "ok"], ["18", "changing group", ""], ["12", "leaving", "alerta"], ["18", "no reply yet", ""]];
        cuerpo = u.kpis(datos);
        if (x.p >= 1) {
          cuerpo += '<div class="caja' + x.n(1) + '"><h5>Why they’re leaving (12)</h5><ul class="lista-simple"><li><span>The timetable doesn’t work</span><strong>7</strong></li><li><span>Moving away</span><strong>3</strong></li><li><span>The price</span><strong>2</strong></li></ul></div>';
        }
        if (x.p === 1) cuerpo += '<div class="fila">' + u.btn("See the answers", true) + "</div>";
        if (x.p === 2) {
          cuerpo += '<div class="caja caja-ia anim"><h5>For next year</h5><p>7 families are leaving because of the timetable, and 5 of them ask for Friday afternoons. An English group on Fridays at 17:00 could keep them.</p><p>English B1 will have 14 students: you’ll need to open a second group.</p></div>' +
            u.tabla(["No reply", "Reminders", ""], [["The Okafor family", "2", u.chip("Reminder on Monday", "info")], ["The Ross family", "2", u.chip("Reminder on Monday", "info")]]);
        }
        return movil + u.ventana({ quien: "Claire’s computer", seccion: "Students", cuerpo: '<div class="entre"><strong>Re-enrolment 2026–27</strong>' + u.chip("Deadline: 31 May", "marca") + "</div>" + cuerpo });
      }
    }
  ]
});
