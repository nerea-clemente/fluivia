/* Demo · Consultancy or agency (fictional example) · English */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "consultoria",
  etiqueta: "Consultancy or agency",
  tipo: "Marketing agency",
  negocio: "Candela Studio",
  lema: "Marketing and communications for small businesses and local shops",
  cliente: "Client",
  software: { actual: "your project tool (Asana, Trello or Notion) and your Google Drive", medida: "a custom dashboard for clients, proposals and approvals" },
  marca: {
    m1: "#4A2C5E", m1t: "#FFFFFF", m2: "#FFE1D1", m2t: "#5A2A14", suave: "#F5F0F7", tinta: "#2B1B37",
    fuente: "'Outfit', 'Segoe UI', sans-serif", radio: "10px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#4A2C5E"/><path d="M27 13.6a9 9 0 1 0 0 12.8" fill="none" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round"/><circle cx="27.6" cy="20" r="3" fill="#FFB38A"/></svg>'
  },
  panel: ["Clients", "Proposals", "Projects", "Approvals", "Reports"],
  situacion: "Six people and around 25 clients on monthly retainers: social media, ads and the odd website for local small businesses. Almost everything goes through email, and the rest through WhatsApp.",
  dolores: [
    ["Proposals that take days", "After every meeting, someone rebuilds a proposal by copying the last one sent. Meanwhile, the prospect goes cold."],
    ["Half-finished onboarding", "Questionnaire, logins, folders, tasks: every new client is set up by hand and something's always missing. The first week goes on chasing passwords."],
    ["Approvals lost in email", "“Here's version 3”, a reply in another thread and a voice note on WhatsApp. In the end nobody knows which version was final or who said yes."],
    ["Reports that eat two days", "At the start of each month, pulling numbers from Meta, Google and the website, pasting them into slides and writing conclusions, client by client."]
  ],
  casos: [
    {
      id: "propuestas",
      montaje: { plazo: "2 to 3 weeks", con: "Your templates and rates, your video call tool and a way to accept proposals online" },
      nav: "Proposals",
      titulo: "Proposals ready on the day of the meeting",
      hoy: "After every first meeting, someone rebuilds a proposal from the last one sent. It takes two or three days, and then nobody knows if the client has read it.",
      con: "A draft is built from what was said in the meeting and your rates. Whoever ran the meeting reviews it, sets the price and sends it. You see when the client opens it, and they accept with one click.",
      ganas: ["The proposal goes out the same day", "Prices in line with your rates", "You know when to call"],
      pasos: [
        { quien: "equipo", nombre: "Irene, partner", t: "Irene has a first meeting with a prospect", d: "A 40-minute video call with Hearth Bakery, a bakery with two shops. With their permission it's transcribed, and Irene jots down three notes.", boton: "Prepare the proposal" },
        { quien: "auto", t: "A draft comes out with your rates", d: "Goal, scope, timeline and price, in your template. Anything that doesn't match what was discussed is flagged for Irene to decide.", boton: "Review the draft" },
        { quien: "equipo", nombre: "Irene, partner", t: "Irene adjusts the price and sends it", d: "She splits the proposal into two options and leaves the web shop for later. She sets the price, not the draft.", boton: "Send the proposal" },
        { quien: "cliente", nombre: "Daniel, Hearth Bakery", t: "Daniel reads it on his phone and accepts", d: "He picks one of the two options and accepts with one click. Irene sees when he opened it. If five days go by with no reply, she gets a reminder to call him.", boton: "Accept the proposal" }
      ],
      final: { antes: "Two or three days per proposal, copying from the last one, with no idea if the client had read it.", ahora: "The proposal goes out on the day of the meeting. Irene reviews a draft instead of starting from scratch, and she still sets the price." },
      escena: function (x) {
        var u = UI;
        if (x.p === 0) {
          return u.ventana({ quien: "Irene's computer", seccion: "Proposals", cuerpo:
            '<div class="entre"><strong>Hearth Bakery · first meeting</strong>' + u.chip("Today, 10:00 · 40 min", "info") + "</div>" +
            u.ficha([["With", "Daniel Hart and his sister Mia"], ["Business", "Bakery with its own kitchen and two shops"], ["Came via", "Referred by Ruiz Dental Clinic"]]) +
            '<div class="caja anim"><h5>' + u.icono("mic") + 'What was said</h5><p class="tenue">“We want to take cake orders on the website. Right now it's all by phone.” · “My sister does Instagram when she has time.” · “We were thinking around €600 a month, not much more.”</p></div>' +
            u.campos([["Irene's notes", "Start with social and local ads. Both siblings decide. They want it running before Christmas."]]) +
            '<div class="fila">' + u.btn("Prepare the proposal", true) + "</div>"
          });
        }
        if (x.p === 1) {
          return u.ventana({ quien: "Irene's computer", seccion: "Proposals", cuerpo:
            '<div class="entre"><strong>Proposal for Hearth Bakery</strong>' + u.chip("Draft", "pend") + "</div>" +
            '<div class="caja caja-ia anim"><h5>Draft ready</h5>' + u.ficha([
              ["Goal", "Take cake orders on the website before Christmas"],
              ["Scope", "Social media (12 posts a month) and local ads on Instagram and Google"],
              ["Timeline", "3 months, from 3 Nov"],
              ["Price", "€750 a month, based on your rates"]
            ]) + "</div>" +
            '<div class="anim anim-2">' + u.check([
              ["Price is above what they mentioned", "alerta", "Daniel said around €600 a month. Irene decides."],
              ["Similar case to show", "ok", "Mirto Patisserie, last year"],
              ["Start date", "pend", "Suggested: Tuesday 3 Nov"]
            ]) + "</div>" +
            '<div class="fila">' + u.btn("Review the draft", true) + "</div>" +
            u.nota("The draft is built from your templates, rates and past proposals. Nothing is sent until a person has reviewed it.")
          });
        }
        if (x.p === 2) {
          return u.ventana({ quien: "Irene's computer", seccion: "Proposals", cuerpo:
            '<div class="entre"><strong>Proposal for Hearth Bakery</strong>' + u.chip("Reviewed by Irene", "ok") + "</div>" +
            '<div class="anim">' + u.tabla(["Option", "Includes", "Per month"], [
              ["<strong>Social</strong>", "12 posts plus stories", "€480"],
              ['<strong>Social and ads</strong><br><span class="tenue">Our recommendation</span>', "All of the above, plus local ads on Instagram and Google", "€690"]
            ], ["", "is-resaltada"]) + "</div>" +
            '<div class="caja caja-suave anim anim-2"><h5>Irene\'s changes</h5><p>Two options instead of one, and an adjusted price. Ad spend is separate and the client decides it. The web shop moves to a second phase.</p></div>' +
            '<div class="fila">' + u.btn("Send the proposal", true) + u.btn("Edit", false, "sec") + "</div>"
          });
        }
        var movil = u.movil({ quien: "Daniel's phone", hora: x.fin ? "9:12" : "21:32", titulo: "Proposal for Hearth Bakery", cuerpo:
          '<p class="peq">Hi Daniel. Here\'s what we discussed on Monday. Pick the option you prefer.</p>' +
          u.campos([["Option", u.opc(["Social · €480 a month", "Social and ads · €690 a month"], 1)]]) +
          u.ficha([["Timeline", "3 months, from 3 Nov"], ["Ad spend", "Separate, from €150 a month. You decide."], ["Your team", "Marcus, with Laia on design"]]) +
          (x.fin ? '<div class="caja caja-suave anim"><h5>' + u.icono("check") + "Proposal accepted</h5><p>Thanks, Daniel. You'll get an email today with the first steps.</p></div>" :
            u.btn("Accept the proposal", true, "ancho"))
        });
        var cuerpo = '<div class="entre"><strong>Hearth Bakery</strong>' + (x.fin ? u.chip("Accepted", "ok") : u.chip("Sent", "info")) + "</div>" +
          u.agenda([
            ["13:10", "<strong>Proposal sent</strong><small>Monday, the day of the meeting</small>"],
            ["21:32", "<strong>Daniel opens it</strong><small>Monday, on his phone</small>"],
            x.fin ? ["9:12", "<strong>Accepted: social and ads</strong><small>Tuesday · onboarding starts</small>", "nueva", " anim"] :
              ["Sat", "<strong>No reply? A reminder for Irene</strong><small>To call him, not to chase by email</small>", "libre"]
          ]);
        if (x.fin) cuerpo += u.nota("What's offered, and at what price, is always decided by whoever signs the proposal.");
        return movil + u.ventana({ quien: "Irene's computer", seccion: "Proposals", cuerpo: cuerpo });
      }
    },

    {
      id: "alta",
      montaje: { plazo: "2 weeks", con: "Your project tool (Asana, Trello or Notion), your Google Drive and your calendar" },
      nav: "Client onboarding",
      titulo: "New client: from signature to kick-off without chasing anyone",
      hoy: "When a client signs, someone sends the questionnaire, asks for logins, creates folders and tasks, and finds a slot for the meeting. Something's always missing, and the first week goes on chasing passwords.",
      con: "When they accept the proposal, the client gets a welcome with a questionnaire and a list of access to grant themselves, without sending passwords. The folder, tasks and kick-off meeting are created automatically.",
      ganas: ["No half-finished onboarding", "No passwords by email", "The team starts with everything to hand"],
      pasos: [
        { quien: "auto", t: "Once they accept, the welcome goes out", d: "Daniel gets an email explaining the first two weeks, who runs his account and a link to his questionnaire.", boton: "Open the questionnaire" },
        { quien: "cliente", nombre: "Daniel, Hearth Bakery", t: "Daniel describes his business and grants access", d: "Who he sells to, what he doesn't want on his social media and who approves posts. He grants access to Instagram and Meta from each platform: nobody sends passwords.", boton: "Submit" },
        { quien: "auto", t: "Folder, tasks and kick-off meeting, created", d: "The client folder with his questionnaire, the first two weeks of tasks in your project tool, and the meeting at the time Daniel chose.", boton: "See what's missing" },
        { quien: "equipo", nombre: "Marcus, accounts", t: "Marcus only looks at what's missing", d: "Google Analytics access is still pending. Daniel gets a reminder; Marcus only steps in if it's still missing on Friday.", boton: "See the result" }
      ],
      final: { antes: "A week of emails asking for questionnaires, logins and dates, and tasks that depend on someone remembering.", ahora: "The client provides everything in one place, and the team arrives at kick-off with the folder and tasks ready." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        var estado = function (k) {
          return u.check([
            ["Proposal accepted", "ok", "Social and ads · €690 a month"],
            ["Welcome sent", "ok", "With the first two weeks explained"],
            ["Questionnaire", k >= 2 ? "ok" : "pend", k >= 2 ? "Filled in by Daniel" : "Sent, not filled in"],
            ["Instagram and Meta access", k >= 2 ? "ok" : "pend", k >= 2 ? "Granted by Daniel from each platform" : "Pending"],
            ["Google Analytics access", x.fin ? "ok" : "pend", x.fin ? "Granted by Daniel on Thursday" : k >= 3 ? "Reminder sent. If still missing on Friday, Marcus is told." : "Pending"],
            ["Folder, tasks and kick-off meeting", k >= 2 ? "ok" : "pend", k >= 2 ? "Tue 3 Nov, 10:00 · invite sent" : "Created once the questionnaire is in"]
          ]);
        };
        var cab = '<div class="entre"><strong>Hearth Bakery</strong>' + u.chip("New client", "marca") + "</div>";
        var quien = function (t, q) { return t + '<br><span class="tenue">' + q + "</span>"; };
        if (x.p === 0) {
          movil = u.movil({ quien: "Daniel's email", app: "mail", hora: "9:20", cuerpo:
            u.mail({ asunto: "Welcome: your first two weeks", clase: " anim", cuerpo:
              "<p>Hi Daniel,</p><p>Thanks for choosing us. Here's what happens next:</p><ul><li><strong>This week:</strong> tell us about your business in a 10-minute questionnaire and give us access to your accounts.</li><li><strong>Tue 3 Nov:</strong> kick-off meeting with Marcus, who runs your account.</li><li><strong>Week 2:</strong> your first content calendar, ready for you to approve.</li></ul>" +
              "<p>" + u.btn("Open the questionnaire", true) + "</p>" })
          });
          cuerpo = cab + estado(0);
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Daniel's phone", hora: "9:31", titulo: "Before we start", cuerpo:
            '<p class="peq">It takes 10 minutes. The whole team will read what you tell us here.</p>' +
            u.campos([
              ["What do you sell, and to whom?", "Sourdough bread and cakes. Locals, plus a few offices for breakfast."],
              ["What don't you want on your social media?", "Stock photos and over-the-top offers."],
              ["Who approves posts?", "Me. If I'm away, my sister Mia."],
              ["Kick-off meeting", u.opc(["Tue 3 · 10:00", "Tue 3 · 16:00", "Wed 4 · 10:00"], 0)]
            ]) +
            '<p class="peq"><strong>Access</strong></p>' +
            u.check([
              ["Instagram", "ok", "Collaborator access granted in the app"],
              ["Meta Business", "ok", "Partner access granted"],
              ["Google Analytics", "pend", "I'll do it later"]
            ]) +
            u.btn("Submit", true, "ancho")
          });
          cuerpo = cab + estado(1);
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Daniel's email", app: "mail", hora: "9:33", cuerpo:
            u.mail({ asunto: "Kick-off meeting · Tue 3 Nov, 10:00", clase: " anim", cuerpo:
              "<p>Hi Daniel,</p><p>Thanks for the questionnaire. See you on <strong>Tuesday 3 Nov at 10:00</strong> at your bakery, with Marcus and Laia.</p><p>We just need Google Analytics access. Here are the steps: it takes two minutes.</p>" })
          });
          cuerpo = '<div class="entre"><strong>Hearth Bakery · kick-off</strong>' + u.chip("Created automatically", "ok") + "</div>" +
            '<div class="caja anim"><h5>' + u.icono("doc") + 'Client folder</h5><ul class="lista-simple">' +
              "<li><span>01 Accepted proposal</span><span class=\"tenue\">PDF</span></li>" +
              "<li><span>02 Questionnaire</span><span class=\"tenue\">From Daniel</span></li>" +
              "<li><span>03 Brand: logos and photos</span><span class=\"tenue\">Requested at kick-off</span></li>" +
              "<li><span>04 Reports</span><span class=\"tenue\">Empty</span></li>" +
            "</ul></div>" +
            '<div class="anim anim-2">' + u.tabla(["Task", "Due"], [
              [quien("Read the questionnaire", "Marcus"), "Mon 2 Nov"],
              [quien("Review current social accounts", "Laia"), "Mon 2 Nov"],
              [quien("Kick-off meeting", "Marcus and Laia"), "Tue 3 Nov"],
              [quien("First content calendar", "Laia"), "Fri 6 Nov"]
            ]) + "</div>";
        } else {
          var chat = u.fecha("Thursday") +
            u.ellos("Hi Daniel. To prepare your first report we still need access to <strong>Google Analytics</strong>. It takes two minutes." + u.btn("See the steps", false), "10:00", x.n(3));
          if (x.fin) chat += u.yo("Done, you should have it now", "12:41") + u.ellos("Got it, thanks. See you on Tuesday!", "12:42", " anim");
          movil = u.movil({ quien: "Daniel's phone", app: "wa", hora: x.fin ? "12:42" : "10:00", cuerpo: chat });
          cuerpo = cab + estado(3) + u.nota("Passwords never travel by email: the client grants each access from their own account and can remove it whenever they like.");
        }
        return movil + u.ventana({ quien: "Marcus's computer", seccion: x.p === 2 ? "Projects" : "Clients", cuerpo: cuerpo });
      }
    },

    {
      id: "aprobaciones",
      montaje: { plazo: "3 to 4 weeks", con: "A web portal for your clients, with nothing to download, and your post scheduling tool" },
      nav: "Approvals",
      titulo: "Approvals in one place, not twenty emails",
      hoy: "Designs and copy go out by email, the client replies in another thread or on WhatsApp, and in the end nobody knows which version is final or who said yes.",
      con: "The client sees each piece at a link, comments right on it and approves with one click. Every change is saved as a version, and nothing is scheduled without approval.",
      ganas: ["One final version", "Comments right on the piece", "Clear record of who approved what, and when"],
      pasos: [
        { quien: "equipo", nombre: "Laia, design", t: "Laia uploads the week's posts", d: "Three posts for Hearth Bakery's Instagram. As soon as she uploads them, Daniel gets a notification with a link.", boton: "Send to Daniel" },
        { quien: "cliente", nombre: "Daniel, Hearth Bakery", t: "Daniel comments on each piece", d: "He views them on his phone, approves two and asks for a change on the third: the cheesecake price is wrong.", boton: "Request the change" },
        { quien: "equipo", nombre: "Laia, design", t: "The change reaches Laia as a task", d: "With the comment, the piece and the day it goes live. Laia fixes the price and uploads version 2.", boton: "Upload version 2" },
        { quien: "cliente", nombre: "Daniel, Hearth Bakery", t: "Daniel approves and it's on record", d: "He gets a notification, sees the new version and approves it. Who approved each version and when is saved, and all three posts are scheduled.", boton: "Approve" }
      ],
      final: { antes: "Email threads with crossed versions, voice notes on WhatsApp and the odd post that went out with an error already fixed.", ahora: "Each piece has its own link, comments and versions. What goes live is what the client approved." },
      escena: function (x) {
        var u = UI, movil;
        var t1 = ["#C99A5B", "#7A4F22"], t2 = ["#B98E6E", "#5E3B22"], t3 = ["#C46A85", "#7A2E46"];
        var pieza = function (tono, txt, clase) { return u.foto(tono, '<span class="peq"><strong>' + txt + "</strong></span>", clase); };
        var sale = function (t, d) { return t + '<br><span class="tenue">Goes live ' + d + "</span>"; };
        var pie = function (dia, txt) { return '<p class="peq"><strong>' + dia + "</strong> · " + txt + "</p>"; };
        if (x.p === 0) {
          return u.ventana({ quien: "Laia's computer", seccion: "Approvals", cuerpo:
            '<div class="entre"><strong>Hearth Bakery · week of 9 Nov</strong>' + u.chip("3 posts", "info") + "</div>" +
            '<div class="dos">' +
              "<div>" + pieza(t1, "Inside our sourdough") + pie("Mon 9", "48 hours of proving") + "</div>" +
              "<div>" + pieza(t2, "Order your Christmas cake") + pie("Wed 11", "Christmas orders") + "</div>" +
              "<div>" + pieza(t3, "Cheesecake · €22") + pie("Fri 13", "Cake of the week") + "</div>" +
            "</div>" +
            u.campos([["Message for Daniel", "Next week's posts. Before Thursday, if you can."]]) +
            '<div class="fila">' + u.btn("Send to Daniel", true) + "</div>"
          });
        }
        if (x.p === 1) {
          movil = u.movil({ quien: "Daniel's phone", hora: "19:42", titulo: "To review", cuerpo:
            '<p class="peq">Laia has sent you 3 posts for the week of 9 Nov.</p>' +
            pieza(t1, "Inside our sourdough") + '<div class="entre">' + pie("Mon 9", "sourdough") + u.chip("Approved", "ok") + "</div>" +
            pieza(t2, "Order your Christmas cake") + '<div class="entre">' + pie("Wed 11", "Christmas") + u.chip("Approved", "ok") + "</div>" +
            pieza(t3, "Cheesecake · €22") + pie("Fri 13", "cake of the week") +
            u.campos([["Your comment", "A whole cheesecake is €24, not €22."]]) +
            u.btn("Request the change", true, "ancho")
          });
          return movil + u.ventana({ quien: "Laia's computer", seccion: "Approvals", cuerpo:
            '<div class="entre"><strong>Hearth Bakery · week of 9 Nov</strong>' + u.chip("Sent to Daniel", "ok") + "</div>" +
            u.tabla(["Post", "Status"], [
              [sale("Inside our sourdough", "Mon 9"), u.chip("Pending", "pend")],
              [sale("Order your Christmas cake", "Wed 11"), u.chip("Pending", "pend")],
              [sale("Cheesecake", "Fri 13"), u.chip("Pending", "pend")]
            ])
          });
        }
        if (x.p === 2) {
          return u.ventana({ quien: "Laia's computer", seccion: "Approvals", cuerpo:
            '<div class="entre"><strong>Cheesecake · Fri 13</strong>' + u.chip("Change requested", "alerta") + "</div>" +
            '<div class="caja anim"><h5>' + u.icono("chat") + "Daniel's comment</h5><p>“A whole cheesecake is €24, not €22.”</p><p class=\"tenue\">On version 1 · Monday at 19:42</p></div>" +
            '<div class="dos anim anim-2">' +
              "<div>" + pieza(t3, "Cheesecake · €22") + '<p class="peq tenue">Version 1</p></div>' +
              "<div>" + pieza(t3, "Cheesecake · €24") + '<p class="peq"><strong>Version 2</strong> · price fixed</p></div>' +
            "</div>" +
            u.tabla(["Post", "Goes live", "Status"], [
              ["Inside our sourdough", "Mon 9", u.chip("Approved", "ok")],
              ["Order your Christmas cake", "Wed 11", u.chip("Approved", "ok")],
              ["Cheesecake", "Fri 13", u.chip("Change requested", "alerta")]
            ], ["", "", "is-resaltada"]) +
            '<div class="fila">' + u.btn("Upload version 2", true) + "</div>"
          });
        }
        movil = u.movil({ quien: "Daniel's phone", hora: x.fin ? "9:31" : "9:16", titulo: "To review", cuerpo:
          u.aviso("Candela Studio", "Laia has uploaded version 2 of Friday 13's post.", x.n(3)) +
          pieza(t3, "Cheesecake · €24") +
          pie("Fri 13", "version 2, price fixed") +
          (x.fin ? '<div class="caja caja-suave anim"><h5>' + u.icono("check") + "Approved</h5><p>Goes live on Friday 13 at 12:00.</p></div>" : u.btn("Approve", true, "ancho"))
        });
        var cuerpo = '<div class="entre"><strong>Hearth Bakery · week of 9 Nov</strong>' + (x.fin ? u.chip("All 3 scheduled", "ok") : u.chip("1 waiting for Daniel", "pend")) + "</div>" +
          u.agenda([
            ["10:02", "<strong>Laia uploads 3 posts</strong><small>Monday · version 1</small>"],
            ["19:40", "<strong>Daniel approves 2</strong><small>Monday · sourdough and Christmas cake</small>"],
            ["19:42", "<strong>Daniel requests a change</strong><small>Monday · cheesecake price</small>"],
            ["9:15", "<strong>Laia uploads version 2</strong><small>Tuesday · price fixed</small>"],
            x.fin ? ["9:31", "<strong>Daniel approves version 2</strong><small>Tuesday · all 3 scheduled</small>", "nueva", " anim"] :
              ["", "<strong>Waiting for Daniel</strong><small>Cheesecake, version 2</small>", "libre"]
          ]);
        if (x.fin) cuerpo += u.nota("Nothing is scheduled without the client's approval, and who approved each version is saved.");
        return movil + u.ventana({ quien: "Laia's computer", seccion: "Approvals", cuerpo: cuerpo });
      }
    },

    {
      id: "informes",
      montaje: { plazo: "3 to 4 weeks", con: "Connections to Meta, Google Ads, Google Analytics and your time tracker, plus your report template" },
      nav: "Monthly reports",
      titulo: "Monthly reports that build themselves, checked by a person",
      hoy: "At the start of each month, someone spends two days pulling numbers from Meta, Google, the website and the timesheets for each client, pasting them into slides and writing conclusions.",
      con: "On the 1st, each client's numbers and logged hours are collected and the report is built in your format. AI suggests a summary; the account lead corrects it, adds their view and sends it.",
      ganas: ["No more copying and pasting numbers", "Hours used, visible to the client", "Every report is signed off by a person"],
      pasos: [
        { quien: "auto", t: "On the 1st, the numbers come in", d: "From Instagram, Meta and Google ads, the website and your time tracker, for all 25 clients. If a connection has dropped, you're told.", boton: "Build the reports" },
        { quien: "auto", t: "The report is built with a suggested summary", d: "In your format, compared with the previous month, with hours used against the retainer. AI suggests the summary from the numbers and it stays as a draft.", boton: "Review the report" },
        { quien: "equipo", nombre: "Marcus, accounts", t: "Marcus reviews it and adds what only he knows", d: "He corrects one conclusion: part of the rise came from the food market on the 17th, not the ads. And he adds his plan for November.", boton: "Send to Carmen" },
        { quien: "cliente", nombre: "Carmen, Mirto Patisserie", t: "Carmen gets the key points in one email", d: "Three numbers, hours used and Marcus's plan, kept short. The full report is attached for anyone who wants the detail.", boton: "See the result" }
      ],
      final: { antes: "Two days of copying and pasting at the start of each month, and conclusions written in a rush.", ahora: "Reports are built on the 1st. The time goes on reviewing them and planning the next month." },
      escena: function (x) {
        var u = UI, cuerpo;
        var revisa = function (c, q) { return c + '<br><span class="tenue">Reviewed by ' + q + "</span>"; };
        var cifras = [["41", "web orders"], ["+18%", "website visits"], ["€4.20", "cost per order from ads"], ["18 of 20", "retainer hours used"]];
        if (x.p === 0) {
          return u.ventana({ quien: "Marcus's computer", seccion: "Reports", cuerpo:
            '<div class="entre"><strong>October reports</strong>' + u.chip("1 Nov, 7:00", "info") + "</div>" +
            '<div class="anim">' + u.barra(23, 25, "Clients with data collected") + "</div>" +
            u.tabla(["Client", "Data from", "Status"], [
              ["Mirto Patisserie", "Instagram, Meta and Google ads, website, hours", u.chip("Collected", "ok")],
              ["Ruiz Dental Clinic", "Google ads, website, hours", u.chip("Collected", "ok")],
              ["Oak Lodge Hotel", "Instagram and Meta ads", u.chip("Meta needs reconnecting", "alerta")],
              ["Forma Gym", "Instagram, website, hours", u.chip("Collected", "ok")]
            ], ["", "", "is-resaltada"]) +
            '<div class="fila">' + u.btn("Build the reports", true) + "</div>"
          });
        }
        if (x.p === 1) {
          return u.ventana({ quien: "Marcus's computer", seccion: "Reports", cuerpo:
            '<div class="entre"><strong>Mirto Patisserie · October</strong>' + u.chip("Draft", "pend") + "</div>" +
            '<div class="anim">' + u.kpis(cifras) + "</div>" +
            u.grafico([3.1, 3.4, 3.3, 4.2, 5.0], ["Jun", "Jul", "Aug", "Sep", "Oct"], "Average Instagram engagement (%)") +
            '<div class="caja caja-ia anim anim-2"><h5>Suggested summary</h5><p>October was the best month of the year for web orders: 41, nine more than in September. Website visits are up 18%, and Instagram ads bring in the most orders.</p></div>' +
            '<div class="fila">' + u.btn("Review the report", true) + "</div>"
          });
        }
        if (x.p === 2) {
          return u.ventana({ quien: "Marcus's computer", seccion: "Reports", cuerpo:
            '<div class="entre"><strong>Mirto Patisserie · October</strong>' + u.chip("Reviewed by Marcus", "ok") + "</div>" +
            u.kpis(cifras) +
            '<div class="caja caja-suave anim"><h5>Marcus\'s summary</h5><p>October was the best month of the year for web orders: 41, nine more than in September. Note: part of the rise came from the food market on the 17th, not just the ads.</p><p>For November, we suggest starting Christmas orders now, from the 15th.</p></div>' +
            '<div class="anim anim-2">' + u.check([
              ["Corrected: where the visits came from", "ok", "The market on the 17th brought visits that didn't come from ads"],
              ["Added: plan for November", "ok", "Christmas orders campaign"]
            ]) + "</div>" +
            '<div class="fila">' + u.btn("Send to Carmen", true) + u.btn("Edit", false, "sec") + "</div>"
          });
        }
        var movil = u.movil({ quien: "Carmen's email", app: "mail", hora: "11:05", cuerpo:
          u.mail({ asunto: "Your October report", clase: x.n(3), cuerpo:
            "<p>Hi Carmen,</p><p>The key points from this month, in short:</p>" +
            u.kpis([["41", "web orders"], ["+18%", "website visits"], ["18 of 20", "hours used"]]) +
            "<p>It was your best month of the year for orders. Part of the rise came from the market on the 17th. For November, we suggest starting Christmas orders now. Shall we talk it through on Thursday?</p><p>Marcus</p><p class=\"tenue\">Attached: Mirto-October.pdf</p>" })
        });
        cuerpo = '<div class="anim">' + u.kpis([["21 of 25", "reviewed and sent", "ok"], ["2", "in review"], ["2", "waiting for data", "alerta"]]) + "</div>" +
          u.tabla(["Client", "Status"], [
            [revisa("Mirto Patisserie", "Marcus"), u.chip("Sent", "ok")],
            [revisa("Ruiz Dental Clinic", "Irene"), u.chip("Sent", "ok")],
            [revisa("Forma Gym", "Irene"), u.chip("In review", "pend")],
            [revisa("Oak Lodge Hotel", "Marcus"), u.chip("Data missing", "alerta")]
          ], ["is-resaltada"]) +
          u.nota("The numbers come from each platform and your time tracker. The conclusions and next month's plan are written or reviewed by the account lead.");
        return movil + u.ventana({ quien: "Marcus's computer", seccion: "Reports", cuerpo: cuerpo });
      }
    }
  ]
});
