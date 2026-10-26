/* Demo · Accounting firm (fictional example) · English */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "gestoria",
  etiqueta: "Accounting firm",
  tipo: "Accounting and bookkeeping",
  negocio: "Ridgeway Accounting",
  lema: "Bookkeeping, tax and payroll for small businesses since 1998",
  cliente: "Client",
  software: { actual: "your accounting software and your client portal", medida: "a client portal and a dashboard built for you" },
  marca: {
    m1: "#1F3A5F", m1t: "#FFFFFF", m2: "#E6DDBF", m2t: "#1F3A5F", suave: "#F2F4F8", tinta: "#1B2533",
    fuente: "'Lora', Georgia, serif", radio: "6px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="8" fill="#1F3A5F"/><path d="M13 30V10h8.5a6 6 0 0 1 0 12H13m7.5 0 7 8" fill="none" stroke="#C9A227" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  panel: ["Quarter close", "Clients", "Receipts", "Questions", "Onboarding"],
  situacion: "Five people handle the bookkeeping, VAT and payroll for around 140 freelancers and small companies. Every quarter it's the same race to the deadline.",
  dolores: [
    ["Chasing paperwork", "Every quarter someone writes to 140 clients one by one asking for invoices and bank statements, and keeps a spreadsheet of who's missing."],
    ["Receipts in every format", "Photos of till receipts, PDFs and crumpled paper come in, and someone types them into the accounting software one by one."],
    ["The same questions", "Clients ask on WhatsApp, at any hour, “when is my VAT due?” or “can I claim my car?”."],
    ["Slow onboarding", "Taking on a new client means several emails, and there's always a document missing."]
  ],
  casos: [
    {
      id: "cierre",
      montaje: { plazo: "2 to 3 weeks", con: "Your client portal or a new one, with WhatsApp and email" },
      nav: "Quarterly paperwork",
      titulo: "Quarterly paperwork that arrives on its own",
      hoy: "Anna sends 140 messages one by one and tracks who has sent what in a spreadsheet. The last days before the deadline are a race.",
      con: "Each client gets their own checklist and a link to their portal. Reminders go out on their own and only ask for what's missing.",
      pasos: [
        { quien: "auto", t: "On 1 October, the request goes out to everyone", d: "Each client gets what applies to them. Marco, a self-employed plumber, is asked for his sales invoices, his expense receipts and his bank statement.", boton: "Marco opens his portal" },
        { quien: "cliente", nombre: "Marco, self-employed", t: "Marco uploads what he has from his phone", d: "He takes photos or uploads PDFs. The firm sees them straight away in its dashboard, with no digging through email or WhatsApp.", boton: "Upload the documents" },
        { quien: "auto", t: "The reminder only asks for what's missing", d: "Five days later, Marco gets a message with the one thing left: his September bank statement.", boton: "Marco uploads the statement" },
        { quien: "equipo", nombre: "Anna, accountant", t: "Anna sees who's done and who isn't", d: "Instead of checking 140 conversations, she looks at one list. She only needs to call the few who haven't replied.", boton: "See the result" }
      ],
      final: { antes: "140 messages by hand, a spreadsheet and phone calls in the last few days.", ahora: "Most clients upload everything themselves and Anna only calls 6 people." },
      escena: function (x) {
        var u = UI, movil;
        var docs = function (a, b, c) {
          return u.check([
            ["Sales invoices (July to September)", a ? "ok" : "pend", a ? "3 files uploaded" : ""],
            ["Expense receipts", b ? "ok" : "pend", b ? "11 photos uploaded" : ""],
            ["September bank statement", c ? "ok" : "pend", c ? "1 PDF uploaded" : ""]
          ]);
        };
        if (x.p === 0) {
          movil = u.movil({ quien: "Marco's phone", app: "wa", hora: "9:00", cuerpo:
            u.fecha("1 Oct") +
            u.ellos("Hi Marco. It's time to close <strong>Q3</strong>. To prepare your VAT return we need:<br>· Sales invoices from July to September<br>· Expense receipts<br>· Your bank statement<br><br>Please send them by <strong>15 Oct</strong>." + u.btn("Open my client portal", true), "9:00", " anim")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Marco's phone", hora: "19:40", titulo: "My client portal", cuerpo:
            '<div class="caja caja-suave"><strong>Q3 close</strong><p class="tenue">Send by 15 Oct</p></div>' +
            docs(false, false, false) +
            '<div class="dos">' + u.btn(u.icono("camara") + "Take photo", false, "sec") + u.btn(u.icono("subir") + "Upload file", false, "sec") + "</div>" +
            u.btn("Upload the documents", true, "ancho")
          });
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Marco's phone", app: "wa", hora: "9:00", cuerpo:
            u.fecha("6 Oct") +
            u.ellos("Hi Marco. We've got your invoices, thanks. <strong>We just need your September bank statement.</strong> You can upload it here by the 15th." + u.btn("Upload the statement", true), "9:00", " anim")
          });
        } else {
          movil = u.movil({ quien: "Marco's phone", hora: "9:12", titulo: "My client portal", cuerpo:
            '<div class="caja caja-suave"><strong>Q3 close</strong><p class="tenue">Send by 15 Oct</p></div>' +
            '<div class="anim">' + docs(true, true, true) + "</div>" +
            '<div class="caja anim anim-2"><h5>' + u.icono("check") + "You're all set</h5><p>Anna will prepare your VAT return and check in with you before filing it.</p></div>"
          });
        }

        var filaMarco = x.p === 0 ? ["Marco Bianchi", "Plumber · self-employed", "0 of 3", u.chip("Request sent", "info")]
          : x.p === 1 ? ["Marco Bianchi", "Plumber · self-employed", "2 of 3", u.chip("Statement missing", "pend")]
          : x.p === 2 ? ["Marco Bianchi", "Plumber · self-employed", "2 of 3", u.chip("Reminder sent", "info")]
          : ["Marco Bianchi", "Plumber · self-employed", "3 of 3", u.chip("Complete", "ok")];
        var listos = [0, 61, 98, 134][x.p];
        var cuerpo = u.barra(listos, 140, "Clients with everything in") +
          u.kpis([["140", "requests sent"], [String(listos), "complete", "ok"], [String(140 - listos), "still missing something"]]);
        if (x.p < 3) {
          cuerpo += u.tabla(["Client", "Business", "Documents", "Status"], [
            filaMarco,
            ["Sofia Lind", "Hair salon · self-employed", x.p ? "3 of 3" : "0 of 3", x.p ? u.chip("Complete", "ok") : u.chip("Request sent", "info")],
            ["Kessler Motors Ltd", "Car repairs", x.p > 1 ? "4 of 4" : "1 of 4", x.p > 1 ? u.chip("Complete", "ok") : u.chip("3 missing", "pend")],
            ["Bea Novak", "Designer · self-employed", "0 of 3", u.chip(x.p ? "Reminder sent" : "Request sent", "info")]
          ], ["is-resaltada"]);
        } else {
          cuerpo += '<p class="peq anim"><strong>Reminders weren\'t enough for these 6</strong></p>' +
            '<div class="anim">' + u.tabla(["Client", "Missing", "Reminders", ""], [
              ["Bea Novak", "Everything", "3", u.btn(u.icono("telefono") + "Call", false, "sec")],
              ["Gill Brothers", "Expense receipts", "3", u.btn(u.icono("telefono") + "Call", false, "sec")],
              ["Jonas Weber", "Bank statement", "3", u.btn(u.icono("telefono") + "Call", false, "sec")]
            ]) + '</div><p class="tenue">And 3 more.</p>';
        }
        return movil + u.ventana({ quien: "Anna's computer", seccion: "Quarter close", cuerpo: cuerpo });
      }
    },

    {
      id: "facturas",
      montaje: { plazo: "3 to 4 weeks", con: "Exports in your accounting software's import format" },
      nav: "Receipts that read themselves",
      titulo: "Expense receipts that read themselves",
      hoy: "Clients send photos of receipts and PDFs. Someone on the team opens them one by one and types the figures into the accounting software.",
      con: "Each receipt is read as it arrives, picking out the supplier, VAT number, date, net amount, VAT and total, with a suggested account. The team only checks the unclear ones.",
      pasos: [
        { quien: "cliente", nombre: "Marco, self-employed", t: "Marco takes a photo of the receipt", d: "From his portal or by forwarding it on WhatsApp. He doesn't need to sort anything.", boton: "Send the photo" },
        { quien: "auto", t: "The figures are pulled out automatically", d: "The receipt is read and the bookkeeping fields are filled in, with an account suggested based on Marco's line of work.", boton: "Open the inbox" },
        { quien: "equipo", nombre: "Bookkeeping team", t: "The team only looks at the unclear ones", d: "Of 46 receipts, 41 are clear. The other 5 come with a reason: a receipt with no VAT number, VAT that doesn't add up, a meal that might be personal.", boton: "Review the unclear one" },
        { quien: "equipo", nombre: "Bookkeeping team", t: "Everything goes into the accounting software", d: "One click creates the import file. Nobody has typed in a single receipt.", boton: "See the result" }
      ],
      final: { antes: "Hours of typing in receipts every quarter, with mistakes along the way.", ahora: "Receipts arrive already read and the team spends its time on the 5 that need a decision." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        var recibo = u.recibo({ comercio: "SOUTHSIDE TRADE SUPPLIES", dato: "VAT no. 41234567 · 12 Sep 2026", lineas: [["Multilayer pipe 20 mm x10", "38.50"], ["Brass elbows x12", "26.40"], ["PTFE tape x6", "17.50"]], total: "€99.70" });
        if (x.p === 0) {
          movil = u.movil({ quien: "Marco's phone", hora: "13:10", titulo: "Add an expense", cuerpo:
            '<div class="caja caja-suave" style="display:grid;place-items:center;padding:22px 10px">' + recibo + "</div>" +
            '<p class="tenue">Photo ready. You don\'t need to fill anything in.</p>' +
            u.btn(u.icono("enviar") + "Send to your accountant", true, "ancho")
          });
          cuerpo = u.kpis([["45", "receipts this quarter"], ["40", "ready"], ["5", "unclear", "alerta"]]) +
            '<p class="tenue">Waiting for new receipts…</p>';
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Marco's phone", hora: "13:10", titulo: "Add an expense", cuerpo:
            '<div class="caja caja-suave"><h5>' + u.icono("check") + "Received</h5><p>Southside Trade Supplies · €99.70</p></div>"
          });
          cuerpo = '<div class="dos"><div style="display:grid;place-items:center">' + recibo + "</div>" +
            '<div class="anim">' + u.ficha([
              ["Supplier", "Southside Trade Supplies"], ["VAT number", "41234567"], ["Date", "12 Sep 2026"],
              ["Net amount", "€82.40"], ["VAT 21%", "€17.30"], ["Total", "€99.70"],
              ["Suggested account", "5000 · Materials"]
            ]) + "</div></div>" +
            '<div class="fila anim anim-2">' + u.chip("Clear scan", "ok") + u.chip("Net + VAT adds up", "ok") + "</div>" +
            '<div class="fila">' + u.btn("Open the inbox", true) + "</div>";
        } else if (x.p === 2) {
          cuerpo = u.kpis([["46", "receipts in"], ["41", "ready", "ok"], ["5", "unclear", "alerta"]]) +
            u.tabla(["Supplier", "Total", "Reason", ""], [
              ["The Harbour Kitchen", "€64.80", u.chip("Client lunch or personal?", "pend"), u.btn("Review", true, "sec")],
              ["Ringway Fuel", "€52.00", u.chip("No VAT number", "pend"), ""],
              ["Online shop", "€18.99", u.chip("VAT doesn't add up", "pend"), ""],
              ["Southside Trade Supplies", "€99.70", u.chip("Ready", "ok"), ""]
            ], ["is-resaltada"]);
          movil = "";
        } else {
          cuerpo = u.kpis([["46", "receipts in"], ["46", "checked", "ok"], ["0", "typed by hand"]]) +
            '<div class="caja caja-suave anim"><h5>' + u.icono("descarga") + "Exported to the accounting software</h5><p>46 entries for Marco Bianchi · Q3. Import file ready.</p></div>" +
            u.nota("Nothing unclear is ever booked automatically: a person on the team decides.");
          movil = "";
        }
        if (x.p === 2) {
          cuerpo += '<div class="caja caja-alerta anim"><h5>' + u.icono("alerta") + "The Harbour Kitchen · €64.80</h5><p>Tuesday 14:30, two set lunches. Marco didn't say who he was with. If it's personal, it can't be claimed.</p></div>" +
            u.respuestas(["Client lunch", "Personal expense", "Ask Marco"], null);
        }
        return movil + u.ventana({ quien: "Team computer", seccion: "Receipts", cuerpo: cuerpo });
      }
    },

    {
      id: "consultas",
      montaje: { plazo: "2 weeks", con: "WhatsApp Business and each client's tax calendar" },
      nav: "Client questions",
      titulo: "The usual questions, answered at any hour",
      hoy: "The same questions come in on WhatsApp at all hours. Answering them interrupts the work, and real advice gets mixed up with simple admin.",
      con: "An assistant answers the general questions using the firm's data and the client's own. Anything that needs advice goes to Anna with a summary.",
      pasos: [
        { quien: "cliente", nombre: "Sofia, hairdresser", t: "Sofia asks a question at 22:40", d: "A deadline question that comes up hundreds of times every quarter.", boton: "Send the question" },
        { quien: "auto", t: "An instant answer, with her details", d: "Not a generic reply: it knows Sofia pays her VAT by direct debit and that one document is still missing.", boton: "Ask a trickier question" },
        { quien: "auto", t: "Anything that needs advice goes to Anna", d: "Whether a limited company makes sense depends on her situation. The assistant doesn't give an opinion: it passes the question to Anna with a summary and the useful details.", boton: "Open Anna's inbox" },
        { quien: "equipo", nombre: "Anna, accountant", t: "Anna replies with everything in front of her", d: "She sees the question, the context and a suggested reply offering a meeting. She makes the call.", boton: "See the result" }
      ],
      final: { antes: "Anna answers WhatsApp messages about deadlines at night and in between returns.", ahora: "Deadline questions answer themselves and Anna only gets what needs her judgement." },
      escena: function (x) {
        var u = UI;
        var chat = u.fecha("Today") + u.yo("Hi, when is my VAT due this quarter?", "22:40", x.n(0));
        if (x.p === 0) chat += u.btn(u.icono("enviar") + "Send", true);
        if (x.p >= 1) chat += u.ellos("Hi Sofia. Your Q3 VAT return is due on <strong>31 Oct</strong>. You pay by direct debit, so the payment will go out that day.<br><br>To prepare it, we still need your <strong>September bank statement</strong>. Could you upload it by the 15th?", "22:40", x.n(1));
        if (x.p === 1) chat += u.respuestas(["Would a limited company be better for me?"], 0);
        if (x.p >= 2) chat += u.yo("One more thing: would a limited company be better for me?", "22:42") +
          u.ellos("That depends on your numbers and your plans, so Anna needs to look at it. I've passed your question on and she'll message you tomorrow to find a time.", "22:42", x.n(2));
        var movil = u.movil({ quien: "Sofia's phone", app: "wa", hora: "22:42", cuerpo: chat });
        if (x.p < 2) {
          return movil + u.ventana({ quien: "Anna's computer", seccion: "Questions", cuerpo:
            u.kpis([["31", "questions answered automatically this week", "ok"], ["6", "passed to Anna"]]) +
            u.tabla(["Client", "Question", "Status"], [
              ["Sofia Lind", x.p ? "When is my VAT due?" : "…", x.p ? u.chip("Answered automatically", "ok") : u.chip("Coming in", "info")],
              ["Marco Bianchi", "Can I pay my VAT in instalments?", u.chip("Answered automatically", "ok")],
              ["Kessler Motors Ltd", "When will the payslips be ready?", u.chip("Answered automatically", "ok")]
            ], [x.p ? "is-resaltada" : ""])
          });
        }
        return movil + u.ventana({ quien: "Anna's computer", seccion: "Questions", cuerpo:
          '<div class="entre"><strong>Sofia Lind · hair salon</strong>' + u.chip("For Anna", "pend") + "</div>" +
          '<div class="caja caja-ia' + x.n(2) + '"><h5>Summary</h5><p>Asks whether a limited company would be better for her. Self-employed since 2019, turnover of around €68,000 a year, one employee. Mentioned in June that she wants to open a second salon.</p></div>' +
          (x.p === 3 ? '<div class="caja anim"><h5>Suggested reply</h5><p>Hi Sofia. Good question. With your numbers it\'s worth looking at properly. Does Thursday at 10:00 work for a 30-minute call?</p></div>' +
            '<div class="fila">' + u.btn("Send", false) + u.btn("Edit", false, "sec") + "</div>" : "") +
          u.nota("The assistant doesn't give tax advice: it answers deadlines and client details, and passes everything else on.")
        });
      }
    },

    {
      id: "alta",
      montaje: { plazo: "2 weeks", con: "Your website and your client management software, or a new one" },
      nav: "New client onboarding",
      titulo: "A new client onboarded in a day",
      hoy: "Taking on a client takes several emails asking for their ID, business registration, last year's tax return and bank details, and something is always missing or out of date.",
      con: "The client fills in a form and gets the exact list of what they need to send. Documents are checked as they're uploaded and the tax calendar is set up automatically.",
      pasos: [
        { quien: "cliente", nombre: "Daniel, new client", t: "Daniel fills in the sign-up form", d: "On the firm's website. He says how he trades (sole trader or company), what he does and whether he has premises or staff.", boton: "Send the form" },
        { quien: "auto", t: "He gets his own checklist, and only his", d: "As a sole trader with rented premises, he's asked for photo ID, his business registration, last year's tax return and the lease. Nothing else.", boton: "Upload the documents" },
        { quien: "auto", t: "Documents are checked as they're uploaded", d: "His ID has expired. He's told straight away, instead of someone finding out a week later.", boton: "Daniel uploads his new ID" },
        { quien: "equipo", nombre: "Anna, accountant", t: "Complete record and tax calendar ready", d: "Anna finds the client set up with everything checked, his deadlines in the calendar and the welcome email sent.", boton: "See the result" }
      ],
      final: { antes: "Two weeks of emails to finish onboarding, and expired documents spotted too late.", ahora: "The client has everything in within a day and Anna just checks it and says welcome." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        if (x.p === 0) {
          movil = u.movil({ quien: "Daniel's phone", hora: "18:30", titulo: "Become a client", cuerpo:
            u.campos([
              ["Name", "Daniel Moreau"],
              ["How do you trade?", u.opc(["Sole trader", "Company"], 0)],
              ["What do you do?", "Physiotherapist with my own practice"],
              ["Do you have premises?", u.opc(["Yes, rented", "No"], 0)],
              ["Do you have staff?", u.opc(["Yes", "No"], 1)],
              ["What do you need?", u.opc(["Tax", "Bookkeeping", "Payroll"], [0, 1])]
            ]) +
            u.btn("Send", true, "ancho")
          });
          cuerpo = '<p class="tenue">No new clients waiting.</p>';
        } else {
          var dni = x.p === 1 ? ["Photo ID", "pend", "To upload"] : x.p === 2 ? ["Photo ID", "alerta", "Expired in March 2026. We've asked for a valid one.", " anim"] : ["Photo ID", "ok", "Valid until 2035", x.n(3)];
          var lista = [
            dni,
            ["Business registration", x.p > 1 ? "ok" : "pend", x.p > 1 ? "Checked: activity matches" : "To upload"],
            ["Last year's tax return", x.p > 1 ? "ok" : "pend", x.p > 1 ? "Checked" : "To upload"],
            ["Lease for the premises", x.p > 1 ? "ok" : "pend", x.p > 1 ? "Checked: rent includes VAT" : "To upload"]
          ];
          if (x.p === 1) {
            movil = u.movil({ quien: "Daniel's phone", hora: "18:31", titulo: "Your sign-up", cuerpo:
              '<p class="peq anim">Thanks, Daniel. As a <strong>sole trader with rented premises</strong>, here\'s what we need:</p>' +
              '<div class="anim anim-2">' + u.check(lista) + "</div>" +
              u.btn(u.icono("subir") + "Upload documents", true, "ancho")
            });
          } else if (x.p === 2) {
            movil = u.movil({ quien: "Daniel's phone", hora: "18:36", titulo: "Your sign-up", cuerpo:
              u.check(lista) + u.btn(u.icono("camara") + "Take a photo of your new ID", true, "ancho")
            });
          } else {
            movil = u.movil({ quien: "Daniel's phone", app: "mail", hora: "9:00", cuerpo:
              u.mail({ asunto: "Welcome to Ridgeway Accounting", clase: " anim", cuerpo:
                "<p>Hi Daniel,</p><p>You're all set up. Your accountant is Anna Ridgeway. Here are your next dates:</p><ul><li>31 Oct: Q3 VAT return</li><li>31 Jan: annual tax return</li></ul><p>We'll remind you before each one.</p>" })
            });
          }
          cuerpo = '<div class="entre"><strong>Daniel Moreau · physiotherapist</strong>' + u.chip(x.p === 3 ? "Onboarding complete" : "Onboarding in progress", x.p === 3 ? "ok" : "pend") + "</div>" +
            u.ficha([["Type", "Sole trader with rented premises"], ["Services", "Tax and bookkeeping"], ["Accountant", "Anna Ridgeway"]]) +
            u.check(lista);
          if (x.p === 3) {
            cuerpo += '<div class="caja caja-suave anim anim-2"><h5>' + u.icono("calendario") + "Tax calendar created</h5>" +
              '<ul class="lista-simple"><li><span>VAT return</span><strong>Quarterly</strong></li><li><span>Bookkeeping review</span><strong>Monthly</strong></li><li><span>Tax payment on account</span><strong>Twice a year</strong></li><li><span>Annual tax return</span><strong>Yearly</strong></li></ul></div>';
          }
        }
        return movil + u.ventana({ quien: "Anna's computer", seccion: "Onboarding", cuerpo: cuerpo });
      }
    }
  ]
});
