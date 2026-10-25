/* Demo · Physiotherapy clinic (fictional example) · English */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "clinica",
  etiqueta: "Physiotherapy clinic",
  tipo: "Physiotherapy clinic",
  negocio: "Alba Physiotherapy",
  lema: "Physiotherapy and clinical Pilates",
  cliente: "Patient",
  software: { actual: "your booking and patient records software", medida: "a booking system and patient records built for you" },
  marca: {
    m1: "#0F7C7E", m1t: "#FFFFFF", m2: "#CDEFE9", m2t: "#0B4F50", suave: "#EEF8F6", tinta: "#123B3C",
    fuente: "'Figtree', 'Segoe UI', sans-serif", radio: "12px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#0F7C7E"/><path d="M11 25a9 9 0 0 1 18 0" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/><path d="M8 29h24M20 10v3M12.5 13.5l2 2M27.5 13.5l-2 2" fill="none" stroke="#BFE8E1" stroke-width="2.6" stroke-linecap="round"/></svg>'
  },
  panel: ["Diary", "Patients", "Records", "Treatment plans", "Reviews"],
  situacion: "Three physios, a part-time receptionist and around 180 sessions a week. The phone rings during treatments and gaps in the diary stay empty.",
  dolores: [
    ["The phone interrupts sessions", "Appointments are booked by phone. If nobody picks up, the patient tries another clinic."],
    ["Empty slots from no-shows", "Every week 4 or 5 patients don't turn up or cancel late, and the slot is lost."],
    ["Paperwork at the first visit", "The intake form, consent and privacy notice are filled in on paper, and that takes 15 minutes of the session."],
    ["Unfinished treatment", "Once they feel better, many patients stop coming and skip their home exercises."]
  ],
  casos: [
    {
      id: "citas",
      montaje: { plazo: "2 to 3 weeks", con: "Your booking software or a new one, and WhatsApp Business" },
      nav: "Bookings and free slots",
      titulo: "Online booking and slots that fill up again",
      hoy: "Appointments are arranged by phone and, when someone cancels the day before, the slot stays empty.",
      con: "Patients book on their phone at any hour, get a reminder with buttons and, if they cancel, the slot is offered to the waiting list automatically.",
      pasos: [
        { quien: "cliente", nombre: "Lucy, new patient", t: "Lucy books at 22:15 from her phone", d: "She picks what's wrong, who she'd like to see and a time. No phone call, no waiting for you to open.", boton: "Book the appointment" },
        { quien: "auto", t: "The day before, she gets a reminder", d: "With buttons to confirm, change or cancel. Something has come up for Lucy, so she cancels with one tap.", boton: "Lucy cancels" },
        { quien: "auto", t: "The slot is offered to the waiting list", d: "Ruben had asked for the earliest possible appointment. He gets the offer straight away. Nobody at the clinic had to pick up the phone.", boton: "Ruben takes the slot" },
        { quien: "equipo", nombre: "Reception", t: "The diary is already updated", d: "Reception sees the change made and the month's summary. They only step in if something looks off.", boton: "See the result" }
      ],
      final: { antes: "Calls in the middle of sessions and 4 or 5 lost slots every week.", ahora: "Bookings come in on their own at any hour and almost every cancellation gets filled again." },
      escena: function (x) {
        var u = UI;
        var movil;
        if (x.p === 0) {
          movil = u.movil({ quien: "Lucy's phone", hora: "22:15", titulo: "Book an appointment", cuerpo:
            u.campos([
              ["What's wrong?", u.opc(["Back or neck pain", "Sports injury", "Pelvic health", "Clinical Pilates"], 0)],
              ["Who with?", u.opc(["Laura Berg", "Jordan Hale", "No preference"], 0)],
              ["Thursday 15 Oct", u.opc(["17:00", "18:00", "19:30"], 1)]
            ]) +
            '<p class="tenue">First visit: 50 minutes. Wear something comfortable.</p>' +
            u.btn("Book Thursday at 18:00", true, "ancho")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Lucy's phone", app: "wa", hora: "10:00", cuerpo:
            u.fecha("Monday") +
            u.ellos("You're booked: <strong>Thursday 15 Oct at 18:00</strong> with Laura Berg. We'll send you a short form to fill in before you come.", "22:15") +
            u.fecha("Wednesday") +
            u.ellos("Hi Lucy, just a reminder of your appointment <strong>tomorrow at 18:00</strong> with Laura.<br>Can you confirm?", "10:00", " anim") +
            u.respuestas(["Confirm", "Change time", "I can't make it"], 2)
          });
        } else {
          movil = u.movil({ quien: "Ruben's phone (waiting list)", app: "wa", hora: "10:02", cuerpo:
            u.fecha("Wednesday") +
            u.ellos("Hi Ruben. A slot has come up <strong>tomorrow, Thursday, at 18:00</strong> with Laura. Would you like it?", "10:02", x.n(2)) +
            (x.p === 2 ? u.respuestas(["Yes, I'll take it", "No, thanks"], 0) :
              u.respuestas(["Yes, I'll take it", "No, thanks"], null, 0) +
              u.ellos("Done. See you tomorrow at 18:00. Session 5 of 8 for your knee.", "10:03", " anim"))
          });
        }

        var f18;
        if (x.p === 0) f18 = ["18:00", "Free", "libre"];
        else if (x.p === 1) f18 = ["18:00", "<strong>Lucy Martin</strong><small>First visit · back · booked online</small>", "nueva", x.n(1)];
        else if (x.p === 2) f18 = ["18:00", "<strong>Lucy Martin has cancelled</strong><small>Offered to the waiting list (3 people)</small>", "hueco", " anim"];
        else f18 = ["18:00", "<strong>Ruben Hayes</strong><small>Knee · session 5 of 8 · slot filled</small>", "nueva", " anim"];

        var cuerpo = '<div class="entre"><strong>Thursday 15 Oct · Laura Berg</strong>' + u.chip("4 online bookings today", "info") + "</div>" +
          u.agenda([
            ["16:00", "<strong>Martha Gill</strong><small>Neck · session 3 of 6</small>"],
            ["17:00", "<strong>Peter Lyons</strong><small>Shoulder · session 2 of 8</small>"],
            f18,
            ["19:00", "<strong>Clinical Pilates</strong><small>Group of 4 · full</small>"]
          ]);
        if (x.p === 3) {
          cuerpo += '<div class="anim anim-2">' + u.kpis([["96", "online bookings this month"], ["23", "cancellations"], ["19", "slots filled again", "ok"]]) + "</div>";
        }
        return movil + u.ventana({ quien: "Reception computer", seccion: "Diary", cuerpo: cuerpo });
      }
    },

    {
      id: "primera-visita",
      montaje: { plazo: "2 weeks", con: "Your patient records software or a custom record" },
      nav: "First visit",
      titulo: "A first visit with no paperwork",
      hoy: "The patient arrives, fills in the intake form, consent and privacy notice by hand, and later someone types it all into the computer.",
      con: "Before coming in, the patient fills in their form and signs on their phone. The physio gets a summary with the important points flagged.",
      pasos: [
        { quien: "auto", t: "When she books, she gets her form", d: "Six questions designed for physiotherapy: where it hurts, since when, how much, and whether she takes medication or has had surgery.", boton: "Send the form" },
        { quien: "cliente", nombre: "Lucy, new patient", t: "She signs the consent form with her finger", d: "Informed consent and privacy notice, on her phone. It's saved to her record with the date and time.", boton: "Sign" },
        { quien: "auto", t: "Laura gets a summary before the session", d: "The important things are at the top and flagged: in this case, that she takes blood thinners. The summary helps prepare the session; the assessment is the physio's.", boton: "Laura finishes the session" },
        { quien: "equipo", nombre: "Laura, physiotherapist", t: "Laura dictates the session notes", d: "When she's done, she speaks into her phone for 30 seconds and a tidy note appears in the record. She checks it and saves it.", boton: "Save the note" }
      ],
      final: { antes: "15 minutes of paperwork at every first visit and notes written up at night.", ahora: "The patient arrives with everything done and the record is up to date when the session ends." },
      escena: function (x) {
        var u = UI, movil, ventana;
        var docs = function (ficha, consent) {
          return u.check([
            ["First visit form", ficha ? "ok" : "pend", ficha ? "Filled in on her phone" : "Sent, not filled in yet"],
            ["Informed consent", consent ? "ok" : "pend", consent ? "Signed Monday at 22:19" : "Waiting for signature"],
            ["Privacy notice", consent ? "ok" : "pend", consent ? "Accepted" : "Pending"]
          ]);
        };
        if (x.p === 0) {
          movil = u.movil({ quien: "Lucy's phone", hora: "22:17", titulo: "Your form before you come", cuerpo:
            '<p class="peq">Hi Lucy. It takes 3 minutes and means we can use the whole session.</p>' +
            u.campos([
              ["What's wrong?", "Lower back pain, mostly when sitting"],
              ["Since when?", u.opc(["Under 1 week", "1 to 4 weeks", "Over 1 month"], 1)],
              ["Do you take any medication?", "Warfarin (blood thinner)"],
              ["Have you ever had surgery?", "No"],
              ["What do you do for work?", "Office job, 8 hours sitting"]
            ]) +
            u.escala(10, 7, "How much does it hurt right now? (0 to 10)") +
            u.btn("Next", true, "ancho")
          });
          ventana = u.ventana({ quien: "Clinic computer", seccion: "Records", cuerpo: '<div class="entre"><strong>Lucy Martin · 34</strong>' + u.chip("First visit Thursday 18:00", "info") + "</div>" + docs(false, false) });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Lucy's phone", hora: "22:18", titulo: "Consent", cuerpo:
            '<p class="peq"><strong>Consent to physiotherapy treatment</strong></p>' +
            '<p class="tenue">Your physiotherapist will explain the assessment and techniques before using them. You can withdraw this consent at any time.</p>' +
            u.check([["I have read the treatment information", "ok"], ["I accept the privacy policy", "ok"], ["I'd like reminders on WhatsApp", "ok"]]) +
            u.firma(false) +
            u.btn("Sign and send", true, "ancho")
          });
          ventana = u.ventana({ quien: "Clinic computer", seccion: "Records", cuerpo: '<div class="entre"><strong>Lucy Martin · 34</strong>' + u.chip("First visit Thursday 18:00", "info") + '</div><div class="anim">' + docs(true, false) + "</div>" });
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Lucy's phone", hora: "22:19", titulo: "Consent", cuerpo:
            u.firma(true) +
            '<div class="caja caja-suave anim anim-2"><h5>' + u.icono("check") + "All done</h5><p>See you on Thursday at 18:00 with Laura. If anything comes up, you can change your appointment from the reminder.</p></div>"
          });
          ventana = u.ventana({ quien: "Laura's computer", seccion: "Records", cuerpo:
            '<div class="entre"><strong>Lucy Martin · 34</strong>' + u.chip("Today 18:00", "marca") + "</div>" +
            '<div class="caja caja-alerta anim"><h5>' + u.icono("alerta") + "Please note</h5><p>Takes <strong>blood thinners (warfarin)</strong>. Check before any invasive technique or dry needling.</p></div>" +
            '<div class="caja caja-ia anim anim-2"><h5>Form summary</h5><p>Lower back pain for 3 weeks, 7 out of 10. Worse when sitting. Office job, 8 hours a day. No previous surgery.</p></div>' +
            docs(true, true) +
            '<div class="fila">' + u.btn("Start the session", true) + "</div>" +
            u.nota("The summary is based on what the patient wrote. The physio decides on the assessment and treatment.")
          });
        } else {
          movil = u.movil({ quien: "Laura's phone", equipo: true, hora: "18:52", titulo: "Session note", cuerpo:
            '<p class="peq"><strong>Lucy Martin</strong> · session 1</p>' +
            '<div class="caja caja-suave"><h5>' + u.icono("mic") + "Recording · 0:28</h5><p class=\"tenue\">“Mechanical low back pain, no radiating pain. Straight leg raise negative. Manual therapy and motor control exercises. Review in one week, send home exercises.”</p></div>" +
            u.btn("Recording sent", false, "claro")
          });
          ventana = u.ventana({ quien: "Laura's computer", seccion: "Records", cuerpo:
            '<div class="entre"><strong>Lucy Martin · session 1</strong>' + u.chip("Draft: Laura to check", "pend") + "</div>" +
            '<div class="anim">' + u.ficha([
              ["Reason", "Lower back pain for 3 weeks, 7/10"],
              ["Assessment", "Mechanical low back pain, no radiating pain. Straight leg raise negative."],
              ["Treatment", "Manual therapy and motor control exercises"],
              ["Plan", "Review in 1 week. Home exercises."],
              ["Caution", "On blood thinners (warfarin)"]
            ]) + "</div>" +
            '<div class="fila">' + u.btn("Save to record", true) + u.btn("Edit", false, "sec") + "</div>"
          });
        }
        return movil + ventana;
      }
    },

    {
      id: "tratamiento",
      montaje: { plazo: "3 to 4 weeks", con: "Your exercise videos and a web app for patients, nothing to download" },
      nav: "Exercises and follow-up",
      titulo: "Home exercises and treatment plans that get finished",
      hoy: "Exercises are explained on the treatment table and forgotten at home. Once patients feel better, they stop coming before the plan is finished.",
      con: "Each patient has their treatment plan on their phone: videos of their exercises, reminders and how their pain is changing. If someone stops booking, the clinic knows.",
      pasos: [
        { quien: "equipo", nombre: "Laura, physiotherapist", t: "Laura assigns exercises in a minute", d: "She picks three videos from the clinic's library, adjusts the reps and sends them.", boton: "Send to Lucy" },
        { quien: "cliente", nombre: "Lucy, patient", t: "Lucy has them on her phone", d: "She sees her exercise videos and how many sessions she's done, and ticks off what she does. If she forgets one day, she gets a reminder.", boton: "Mark as done" },
        { quien: "cliente", nombre: "Lucy, patient", t: "Each week she says how her pain is", d: "One question, one number. Laura sees the trend on a chart without asking at every session.", boton: "Send" },
        { quien: "auto", t: "If someone stops coming, you get an alert", d: "Ruben hasn't booked for 3 weeks and still has sessions left. He gets a message and reception sees him on their list.", boton: "See the result" }
      ],
      final: { antes: "Exercises on a sheet of paper that gets lost, and patients who disappear halfway through.", ahora: "Each patient follows their plan on their phone and the clinic knows who's dropping off." },
      escena: function (x) {
        var u = UI, out = "";
        var t1 = ["#BFE8E1", "#0F7C7E"], t2 = ["#D9E7F5", "#4A78A8"], t3 = ["#F3E3C9", "#B9874A"], t4 = ["#E7E1F3", "#7A68A8"];
        if (x.p === 0) {
          return u.ventana({ quien: "Laura's computer", seccion: "Treatment plans", cuerpo:
            '<div class="entre"><strong>Lucy Martin · lower back pain</strong>' + u.chip("Session 1 of 6", "info") + "</div>" +
            '<p class="peq"><strong>Clinic exercise library</strong></p>' +
            '<div class="dos">' +
              u.video("Cat-camel", "2 sets of 10", t1, u.chip("Selected", "ok")) +
              u.video("Glute bridge", "3 sets of 12", t2, u.chip("Selected", "ok")) +
              u.video("Bird dog", "3 sets of 8 each side", t3, u.chip("Selected", "ok")) +
              u.video("Hip flexor stretch", "30 seconds each side", t4) +
            "</div>" +
            u.campos([["Note for Lucy", "Do them in the morning and stop short of pain. If anything hurts, stop and let me know."]]) +
            '<div class="fila">' + u.btn("Send to Lucy", true) + "</div>"
          });
        }
        if (x.p === 1) {
          out = u.movil({ quien: "Lucy's phone", hora: "8:05", titulo: "My treatment", cuerpo:
            u.aviso("Alba Physiotherapy", "Morning, Lucy. Today's exercises take 10 minutes.", " anim") +
            '<div class="caja caja-suave"><div class="entre"><strong>Lower back pain</strong>' + u.chip("Session 2 of 6", "marca") + '</div><p class="tenue">Next appointment: Monday at 18:00 with Laura</p></div>' +
            '<p class="peq"><strong>Today\'s exercises</strong></p>' +
            u.video("Cat-camel", "2 sets of 10", t1) +
            u.video("Glute bridge", "3 sets of 12", t2) +
            u.video("Bird dog", "3 sets of 8 each side", t3) +
            u.btn("Mark as done", true, "ancho")
          });
          return out + u.ventana({ quien: "Laura's computer", seccion: "Treatment plans", cuerpo:
            '<div class="entre"><strong>Lucy Martin · lower back pain</strong>' + u.chip("Sent to Lucy", "ok") + "</div>" +
            u.check([["Cat-camel", "ok", "2 × 10"], ["Glute bridge", "ok", "3 × 12"], ["Bird dog", "ok", "3 × 8 each side"]])
          });
        }
        if (x.p === 2) {
          out = u.movil({ quien: "Lucy's phone", hora: "20:30", titulo: "My treatment", cuerpo:
            u.check([["Cat-camel", "ok", "Done today"], ["Glute bridge", "ok", "Done today"], ["Bird dog", "ok", "Done today"]]) +
            '<div class="caja anim"><h5>This week\'s question</h5>' + u.escala(10, 4, "How much does it hurt today? (0 to 10)") + "</div>" +
            u.btn("Send", true, "ancho")
          });
          return out + u.ventana({ quien: "Laura's computer", seccion: "Treatment plans", cuerpo:
            '<div class="entre"><strong>Lucy Martin · lower back pain</strong>' + u.chip("Session 2 of 6", "info") + "</div>" +
            u.kpis([["11 of 14", "days with exercises done", "ok"], ["2", "sessions done"]]) +
            u.grafico([7, 6, 6, 5], ["Wk 1", "Wk 2", "Wk 3", "Wk 4"], "Pain reported by Lucy (0 to 10)")
          });
        }
        out = u.movil({ quien: "Ruben's phone", app: "wa", hora: "11:00", cuerpo:
          u.ellos("Hi Ruben. It's been 3 weeks since your last session and you have <strong>4 left on your knee plan</strong>. Shall we find you a slot this week?", "11:00", " anim") +
          u.respuestas(["Yes, Tuesday afternoon", "Not right now"], 0)
        });
        return out + u.ventana({ quien: "Reception computer", seccion: "Patients", cuerpo:
          u.grafico([7, 6, 6, 5, 4], ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Today"], "Lucy's pain: from 7 to 4 in a month") +
          '<p class="peq anim anim-2"><strong>Patients dropping off</strong></p>' +
          '<div class="anim anim-2">' + u.tabla(["Patient", "Treatment", "Last session", "Left", "Status"], [
            ["Ruben Hayes", "Knee", "3 weeks ago", "4", u.chip("Message sent", "info")],
            ["Carmen Vidal", "Shoulder", "4 weeks ago", "2", u.chip("Call", "alerta")],
            ["Ivan Petrov", "Ankle", "2 weeks ago", "3", u.chip("Message sent", "info")]
          ], ["is-resaltada"]) + "</div>"
        });
      }
    },

    {
      id: "resenas",
      montaje: { plazo: "1 week", con: "Your Google Business Profile and WhatsApp Business" },
      nav: "Reviews and returning patients",
      titulo: "Google reviews and patients who come back",
      hoy: "Happy patients leave without writing a review, and you don't hear from them again until their next injury.",
      con: "When a patient is discharged, they're asked for feedback with a direct link to leave a review. Months later, they get a message suggesting a check-up or Pilates.",
      pasos: [
        { quien: "auto", t: "At discharge, he's asked for feedback", d: "Two days after his last session, Ruben gets a short message with a direct link to the clinic's Google profile.", boton: "Ruben leaves a review" },
        { quien: "equipo", nombre: "Nina, practice manager", t: "The reply comes ready to go", d: "The review shows up in the dashboard with a suggested reply in the clinic's tone. Nina reads it, edits it if she wants and posts it.", boton: "Post the reply" },
        { quien: "auto", t: "Six months later, a message to come back", d: "A knee check-up, and clinical Pilates to help avoid a relapse.", boton: "Ruben books a check-up" },
        { quien: "equipo", nombre: "Nina, practice manager", t: "Nina sees the month's results", d: "New reviews, average rating and patients who came back thanks to these messages.", boton: "See the result" }
      ],
      final: { antes: "Three or four reviews a year, and discharged patients you never hear from again.", ahora: "New reviews every week, all answered, and former patients booking again." },
      escena: function (x) {
        var u = UI, movil;
        var respuesta = "Thanks, Ruben. It's great to see you running again. We'll pass your message on to Laura. If the knee ever plays up again, you know where we are.";
        var resena = '<div class="caja' + x.n(1) + '"><div class="entre"><strong>Ruben Hayes</strong>' + u.estrellas(5) + '</div><p>I came in unable to walk down the stairs and I\'ve finished the treatment running. Laura explains everything really well and reception always finds you a slot.</p><p class="tenue">Google review · 10 minutes ago</p></div>';
        var invita = "Hi Ruben. Well done on finishing your knee treatment!<br><br>If we've helped, would you tell others on Google? It's the best way for people to find us.";
        if (x.p === 0) {
          movil = u.movil({ quien: "Ruben's phone", app: "wa", hora: "12:00", cuerpo:
            u.ellos(invita + u.btn("Write my review", true), "12:00", " anim")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Ruben's phone", app: "wa", hora: "12:04", cuerpo:
            u.ellos(invita, "12:00") +
            u.yo("Done. Thanks so much for everything.", "12:04")
          });
        } else {
          movil = u.movil({ quien: "Ruben's phone", app: "wa", hora: "10:00", cuerpo:
            u.fecha("Six months later") +
            u.ellos("Hi Ruben. It's been six months since we signed off your knee. How's it doing?<br><br>If you like, we can do a <strong>30-minute check-up</strong>. And if you want something to stop it coming back, we run <strong>clinical Pilates</strong> groups of 4.", "10:00", x.n(2)) +
            (x.p === 2 ? u.respuestas(["Book a check-up", "Pilates info", "All good, thanks"], 0) :
              u.respuestas(["Book a check-up", "Pilates info", "All good, thanks"], null, 0) + u.ellos("You're booked for Tuesday at 17:30 with Laura. See you soon!", "10:01", " anim"))
          });
        }
        var cuerpo;
        if (x.p === 0) {
          cuerpo = u.kpis([["4.7", "average Google rating"], ["3", "new reviews this month"]]) +
            '<p class="tenue">Waiting for reviews from patients discharged this week (6).</p>';
        } else if (x.p === 1) {
          cuerpo = '<p class="peq"><strong>New review</strong></p>' + resena +
            '<div class="caja caja-ia anim anim-2"><h5>Suggested reply</h5><p>' + respuesta + '</p></div>' +
            '<div class="fila">' + u.btn("Post the reply", true) + u.btn("Edit", false, "sec") + "</div>";
        } else {
          cuerpo = (x.p === 3 ? '<div class="anim">' + u.kpis([["4.9", "average Google rating"], ["14", "new reviews this month", "ok"], ["14 of 14", "answered"], ["9", "patients who came back"]]) + "</div>" : "") +
            resena.replace(" anim", "") +
            '<div class="caja caja-suave"><div class="entre"><strong>Reply from Alba Physiotherapy</strong>' + u.chip("Posted", "ok") + "</div><p>" + respuesta + "</p></div>";
        }
        return movil + u.ventana({ quien: "Nina's computer", seccion: "Reviews", cuerpo: cuerpo });
      }
    }
  ]
});
