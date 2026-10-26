/* Demo · Estate agency (fictional example) · English */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "inmobiliaria",
  etiqueta: "Estate agency",
  tipo: "Estate agency",
  negocio: "Brisa Homes",
  lema: "Your next home, without the rush or the surprises",
  cliente: "Buyer",
  software: { actual: "your property CRM and the property portals", medida: "a CRM built around the way you work" },
  marca: {
    m1: "#C2553D", m1t: "#FFFFFF", m2: "#F6D9BE", m2t: "#3A2620", suave: "#F8F2EC", tinta: "#2B2220",
    fuente: "'DM Serif Display', Georgia, serif", radio: "14px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#C2553D"/><path d="M9 20 20 11l11 9M13 17.5V29h14V17.5" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 29v-6h4v6" fill="none" stroke="#F2C9A0" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  panel: ["Enquiries", "Viewings", "Properties", "Valuations", "Sales"],
  situacion: "Three agents, around 40 properties on the books and enquiries coming in from the portals, the website and the phone. Much of the day goes on replying, arranging viewings and chasing paperwork.",
  dolores: [
    ["Leads that go cold", "Someone enquires through a portal at 21:30 and nobody replies until the next day. By then they've called another agency."],
    ["Viewings by endless messages", "Arranging one viewing takes ten messages, and afterwards nobody asks what they thought."],
    ["Sellers asking for updates", "The seller asks “how's it going with mine?” and, without viewing data, it's hard to talk about lowering the price."],
    ["Paperwork until the signing", "The title documents, the energy certificate and the mortgage papers are spread across emails and folders."]
  ],
  casos: [
    {
      id: "contactos",
      montaje: { plazo: "2 weeks", con: "Portal alerts, your CRM and WhatsApp Business" },
      nav: "Portal enquiries",
      titulo: "Portal enquiries, answered within a minute",
      hoy: "Enquiries from the property portals land in the inbox at any hour. They get answered when someone has time, sometimes the next day.",
      con: "Every enquiry gets a reply within a minute, answers a few key questions and reaches the agent already qualified, with a viewing offered.",
      pasos: [
        { quien: "auto", t: "An enquiry comes in from a portal at 21:30", d: "Elena is interested in the flat on Elm Street. Tom is having dinner and doesn't see it.", boton: "See what happens" },
        { quien: "auto", t: "Within a minute, Elena has a reply", d: "On WhatsApp, with the property details and two questions to see if she's serious: is it to live in, and how would she pay for it.", boton: "Elena replies" },
        { quien: "auto", t: "Tom gets a qualified lead", d: "Elena's answers fill in her record and she's marked as a priority. She's also shown another flat that suits her.", boton: "Offer a viewing" },
        { quien: "cliente", nombre: "Elena, buyer", t: "Elena picks a viewing time", d: "She sees Tom's free slots and chooses one. The viewing goes into his diary without a single phone call.", boton: "See the result" }
      ],
      final: { antes: "Enquiries answered the next day and phone calls to find out who's serious.", ahora: "By 21:32 Elena has a reply and a viewing, and Tom sees it all in the morning with her record filled in." },
      escena: function (x) {
        var u = UI, out;
        var piso = { titulo: "Flat at 14 Elm Street", zona: "City centre", m2: 95, hab: 3, banos: 2, tono: ["#E9C9A8", "#C98A64"] };
        var atico = { titulo: "Penthouse with terrace", zona: "Riverside", m2: 110, hab: 3, banos: 2, tono: ["#CFDCE3", "#7F9DAE"] };
        if (x.p === 0) {
          return u.ventana({ quien: "Agency inbox", seccion: "Enquiries", cuerpo:
            u.mail({ de: "Property portal", sinLogo: true, asunto: "New enquiry for “Flat at 14 Elm Street”", clase: " anim", cuerpo:
              "<p><strong>Elena Novak</strong> · elena.novak@mail.com</p><p>“Hi, I'm interested in the flat. Is it still available? Could I see it this week?”</p><p class=\"tenue\">Received at 21:30</p>" }) +
            '<div class="fila">' + u.chip("Tom is offline", "pend") + u.btn("See what happens", true) + "</div>"
          });
        }
        var chat = u.ellos("Hi Elena, this is the Brisa Homes assistant. Yes, it's still available!" + u.inmueble(piso) + "So we can show you the right things: is it to live in or to invest? And how would you pay for it?", "21:31", x.n(1));
        if (x.p === 1) chat += u.respuestas(["To live in, mortgage already approved in principle"], 0);
        if (x.p >= 2) chat += u.yo("To live in. My mortgage is approved in principle, up to 260,000. It's the two of us and a little one.", "21:31");
        if (x.p === 3) {
          chat += u.ellos("Perfect. Tom, the agent handling the flat, can show you round. What time suits you?", "21:32", x.n(3)) +
            (x.fin ? u.respuestas(["Thu 17:00", "Fri 10:00", "Sat 11:00"], null, 0) +
              u.ellos("Viewing confirmed: <strong>Thursday at 17:00</strong> at 14 Elm Street. I'll send you a reminder the day before.", "21:32", " anim")
              : u.respuestas(["Thu 17:00", "Fri 10:00", "Sat 11:00"], 0));
        }
        out = u.movil({ quien: "Elena's phone", app: "wa", hora: "21:32", cuerpo: chat });

        var cuerpo;
        if (x.p === 1) {
          cuerpo = u.tabla(["Lead", "Property", "In at", "Status"], [
            ["Elena Novak", "14 Elm Street", "21:30", u.chip("Replied in 1 min", "ok")],
            ["Mark Gilbert", "Riverside penthouse", "19:12", u.chip("Waiting for reply", "info")],
            ["Sonia Lang", "Meadow Cottage", "17:40", u.chip("Viewing on Saturday", "ok")]
          ], ["is-resaltada"]);
        } else {
          cuerpo = '<div class="entre"><strong>Elena Novak</strong>' + u.chip("Priority", "alerta") + "</div>" +
            '<div class="anim">' + u.ficha([
              ["Looking for", "Main home · 3 bedrooms"], ["Household", "Couple with a young child"],
              ["Finance", "Mortgage approved in principle"], ["Budget", "Up to €260,000"],
              ["Agent", "Tom"]
            ]) + "</div>" +
            '<div class="caja caja-suave anim anim-2"><h5>She might also like</h5>' + u.inmueble(atico) + "</div>" +
            (x.p === 2 ? '<div class="fila">' + u.btn("Offer a viewing", true) + "</div>" : !x.fin ? '<p class="tenue">Viewing offered to Elena with Tom\'s free slots.</p>' :
              '<div class="caja anim"><h5>' + u.icono("calendario") + "Viewing in Tom's diary</h5><p>Thursday 17:00 · 14 Elm Street · Elena Novak</p></div>");
        }
        return out + u.ventana({ quien: "Tom's computer", seccion: "Enquiries", cuerpo: cuerpo });
      }
    },

    {
      id: "visitas",
      montaje: { plazo: "2 weeks", con: "Your calendar and your CRM, or a new one" },
      nav: "Viewings and feedback",
      titulo: "Confirmed viewings and feedback that reaches the seller",
      hoy: "Viewings are confirmed by hand, some people don't turn up and nobody asks what they thought. The seller only knows what the agent tells them.",
      con: "A reminder with confirmation, a daily route for the agent, a short question after each viewing and a weekly report for the seller.",
      pasos: [
        { quien: "auto", t: "The day before, a reminder to confirm", d: "Elena gets the address, the time and who'll meet her. She confirms with one tap.", boton: "Elena confirms" },
        { quien: "equipo", nombre: "Tom, agent", t: "Tom has his route for the day on his phone", d: "Each viewing shows what the buyer is looking for, so he doesn't have to scroll back through messages.", boton: "Viewing done" },
        { quien: "auto", t: "Two hours later, a question for Elena", d: "What did she think, in one tap. If she's unsure, she's asked what's holding her back.", boton: "Elena replies" },
        { quien: "auto", t: "The seller gets a weekly report", d: "Viewings, interested buyers and the feedback that keeps coming up. With data, the price conversation gets easier.", boton: "See the result" }
      ],
      final: { antes: "No-shows, lost feedback and a seller calling every week.", ahora: "Viewings confirm themselves, you know what each buyer thinks and the seller gets the numbers every Friday." },
      escena: function (x) {
        var u = UI, movil, ventana = "";
        if (x.p === 0) {
          movil = u.movil({ quien: "Elena's phone", app: "wa", hora: "18:00", cuerpo:
            u.fecha("Wednesday") +
            u.ellos("Hi Elena. See you tomorrow at <strong>17:00</strong> at Flat 3B, 14 Elm Street. Tom will meet you at the front door.", "18:00", " anim") +
            u.respuestas(["Confirm", "Change time"], 0)
          });
          ventana = u.ventana({ quien: "Agency computer", seccion: "Viewings", cuerpo:
            u.agenda([["10:00", "<strong>Riverside penthouse</strong><small>Mark Gilbert · confirmed</small>"], ["12:30", "<strong>Meadow Cottage</strong><small>Sonia Lang · confirmed</small>"], ["17:00", "<strong>14 Elm Street</strong><small>Elena Novak · waiting for confirmation</small>", "libre"], ["18:30", "<strong>14 Elm Street</strong><small>Owen Price · confirmed</small>"]])
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Tom's phone", equipo: true, hora: "16:50", titulo: "Today's viewings", cuerpo:
            u.agenda([
              ["10:00", "<strong>Riverside penthouse</strong><small>Done</small>"],
              ["12:30", "<strong>Meadow Cottage</strong><small>Done</small>"],
              ["17:00", "<strong>14 Elm Street · Elena Novak</strong><small>Main home, couple with a young child. Mortgage approved in principle.</small>", "nueva"]
            ]) +
            '<div class="caja caja-suave"><h5>' + u.icono("ubicacion") + "Flat 3B, 14 Elm Street</h5><p class=\"tenue\">Keys: office key box, hook 7</p></div>" +
            u.btn("Viewing done", true, "ancho")
          });
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Elena's phone", app: "wa", hora: "19:00", cuerpo:
            u.ellos("Hi Elena. What did you think of the flat on Elm Street?", "19:00", " anim") +
            u.respuestas(["Loved it", "Not sure", "Not for me"], null, 1) +
            u.ellos("Thanks. What's holding you back most?", "19:01", " anim anim-2") +
            u.respuestas(["The kitchen is small"], 0)
          });
          ventana = u.ventana({ quien: "Tom's computer", seccion: "Viewings", cuerpo:
            u.tabla(["Viewer", "Property", "Feedback"], [
              ["Elena Novak", "14 Elm Street", u.chip("Not sure", "pend")],
              ["Sonia Lang", "Meadow Cottage", u.chip("Loved it", "ok")],
              ["Mark Gilbert", "Riverside penthouse", u.chip("Not for him", "alerta")]
            ], ["is-resaltada"])
          });
        } else {
          movil = u.movil({ quien: "Seller's phone", app: "mail", hora: "18:00", cuerpo:
            u.mail({ asunto: "Your flat on Elm Street this week", clase: " anim", cuerpo:
              "<p>Hi James,</p><ul><li><strong>6 viewings</strong>, 2 people very interested</li><li>What they like most: the light and the area</li><li>What holds them back: <strong>the kitchen</strong> (3 of 6)</li><li>Portal views: 412 (+18%)</li></ul><p>I'll call you on Monday to talk it through. Tom</p>" })
          });
          ventana = u.ventana({ quien: "Tom's computer", seccion: "Properties", cuerpo:
            '<div class="entre"><strong>14 Elm Street · week 3</strong>' + u.chip("Report sent to seller", "ok") + "</div>" +
            u.kpis([["6", "viewings"], ["2", "very interested", "ok"], ["3 of 6", "put off by the kitchen", "alerta"]]) +
            u.tabla(["Buyer", "Feedback", "Holding them back"], [["Elena Novak", u.chip("Not sure", "pend"), "The kitchen"], ["Owen Price", u.chip("Loves it", "ok"), "—"], ["Clara Moss", u.chip("Not sure", "pend"), "The kitchen"]])
          });
        }
        return movil + ventana;
      }
    },

    {
      id: "captacion",
      montaje: { plazo: "2 to 3 weeks", con: "Your website and sales data for your area" },
      nav: "Winning new listings",
      titulo: "Homeowners requesting a valuation from your website",
      hoy: "Homeowners who want to sell call three agencies to find out what their home is worth. Whoever answers first, and best, wins.",
      con: "A valuation form on the website gives an instant price range, and the agency gets the owner's details with a market report already drafted.",
      pasos: [
        { quien: "cliente", nombre: "James, homeowner", t: "James requests a valuation on the website", d: "Address, size, bedrooms, condition and when he wants to sell. Two minutes.", boton: "See my valuation" },
        { quien: "auto", t: "He gets an instant price range", d: "Based on recent sales in the area, with an invitation for an agent to visit and give a precise figure.", boton: "Book a valuation visit" },
        { quien: "auto", t: "Tom gets the listing lead ready to go", d: "With the property details, how soon James wants to sell and a draft market report with comparable sales.", boton: "Review the report" },
        { quien: "equipo", nombre: "Tom, agent", t: "Tom reviews the report and sends it", d: "He adjusts it after the visit and sends it in the agency's branding. He always sets the final price himself.", boton: "See the result" }
      ],
      final: { antes: "Valuations over the phone, reports put together late at night and owners who go with another agency.", ahora: "The owner gets a first figure straight away and Tom arrives at the visit with the report ready." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        if (x.p === 0) {
          movil = u.movil({ quien: "James's phone", hora: "20:15", titulo: "What's your home worth?", cuerpo:
            u.campos([
              ["Address", "Flat 2A, 8 High Street"],
              ["Size", "88 m²"],
              ["Bedrooms", u.opc(["1", "2", "3", "4+"], 2)],
              ["Condition", u.opc(["Needs work", "Good", "Renovated"], 1)],
              ["When do you want to sell?", u.opc(["Now", "Within 3 months", "Just curious"], 1)]
            ]) + u.btn("See my valuation", true, "ancho")
          });
          cuerpo = '<p class="tenue">No new valuation requests today.</p>';
        } else if (x.p === 1) {
          movil = u.movil({ quien: "James's phone", hora: "20:16", titulo: "Your valuation", cuerpo:
            '<div class="caja caja-suave anim" style="text-align:center"><p class="tenue">Estimated range</p><p class="marca-fuente" style="font-size:26px;line-height:1.2">€210,000 – €235,000</p><p class="tenue">Based on 8 recent sales in your area</p></div>' +
            '<p class="peq anim anim-2">For a precise price, an agent needs to see your home. It\'s free, with no obligation.</p>' +
            u.btn("Book a valuation visit", true, "ancho")
          });
          cuerpo = '<p class="tenue">James is looking at his valuation…</p>';
        } else {
          movil = "";
          cuerpo = '<div class="entre"><strong>James Shaw · Flat 2A, 8 High Street</strong>' + u.chip("Wants to sell within 3 months", "alerta") + "</div>" +
            u.ficha([["Property", "88 m² · 3 bed · good condition"], ["Range sent", "€210,000 – €235,000"], ["Valuation visit", "Monday 11:00"]]) +
            '<div class="caja caja-ia' + x.n(2) + '"><h5>' + u.icono("doc") + "Draft market report</h5>" +
            u.tabla(["Comparable", "m²", "Sold for"], [["22 High Street", "92", "€228,000"], ["3 Market Square", "85", "€214,000"], ["40 New Road", "90", "€231,000"]]) + "</div>" +
            (x.p === 2 ? '<div class="fila">' + u.btn("Review the report", true) + "</div>" :
              '<div class="caja anim"><div class="entre"><strong>Report for James Shaw.pdf</strong>' + u.chip("Reviewed by Tom", "ok") + '</div><p class="tenue">Recommended price after the visit: €229,000</p></div>' +
              u.nota("The range is only an estimate. The agent sets the asking price after seeing the property."));
        }
        return movil + u.ventana({ quien: "Tom's computer", seccion: "Valuations", cuerpo: cuerpo });
      }
    },

    {
      id: "operacion",
      montaje: { plazo: "2 to 3 weeks", con: "Your CRM or a custom sale tracker" },
      nav: "Paperwork to signing",
      titulo: "The paperwork for each sale, all the way to signing",
      hoy: "Title documents, energy certificate, property tax bill, payslips for the bank… every document arrives a different way and someone has to remember to ask for it.",
      con: "Each sale has its own tracker showing what's missing and who needs to provide it. Buyer and seller get reminders and can follow progress on their phones.",
      pasos: [
        { quien: "equipo", nombre: "Tom, agent", t: "Tom opens the sale", d: "With the signing date set, the document list is created along with who needs to provide each one.", boton: "Send reminders" },
        { quien: "auto", t: "The seller is only asked for his part", d: "James still needs to provide the energy certificate. He can upload it or ask the agency to arrange it.", boton: "James replies" },
        { quien: "cliente", nombre: "Elena, buyer", t: "Elena follows her purchase on her phone", d: "She sees where things stand, the signing date and what she needs to upload.", boton: "Upload payslips" },
        { quien: "auto", t: "Everything ready for signing", d: "Once it's all in, the lawyer is notified and buyer and seller get the appointment with what to bring.", boton: "See the result" }
      ],
      final: { antes: "Emails and calls to gather documents, and a scare or two in signing week.", ahora: "Everyone knows what's theirs to do, reminders go out on their own and you arrive at the signing with everything." },
      escena: function (x) {
        var u = UI, movil;
        var ce = x.p >= 2 ? ["Energy certificate", "ok", "Arranged by the agency · assessor on Tuesday"] : ["Energy certificate", x.p === 1 ? "falta" : "pend", "Seller"];
        var nom = x.p >= 3 ? ["Payslips and proof of employment", "ok", "Buyer · uploaded"] : ["Payslips and proof of employment", "pend", "Buyer"];
        var tas = x.p >= 3 ? ["Bank valuation", "ok", "Bank · €231,000"] : ["Bank valuation", "pend", "Bank"];
        var lista = [["Land registry extract", "ok", "Agency · requested from the registry"], ce, ["Latest property tax bill", "ok", "Seller"], ["Buyers' ID", "ok", "Buyer"], nom, tas];
        if (x.p === 0) movil = "";
        else if (x.p === 1) {
          movil = u.movil({ quien: "James's phone (seller)", app: "wa", hora: "10:00", cuerpo:
            u.ellos("Hi James. For the signing on <strong>20 Nov</strong>, the only thing missing is the <strong>energy certificate</strong> for your flat.<br><br>Do you have one, or would you like us to arrange an assessor?", "10:00", " anim") +
            u.respuestas(["Please arrange it", "I already have it"], 0)
          });
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Elena's phone (buyer)", hora: "13:20", titulo: "My purchase", cuerpo:
            u.inmueble({ titulo: "Flat at 14 Elm Street", zona: "City centre", m2: 95, hab: 3, banos: 2, tono: ["#E9C9A8", "#C98A64"] }) +
            u.check([["Offer", "ok", "Accepted"], ["Deposit", "ok", "Paid on 15 Oct"], ["Mortgage", "pend", "The bank needs your payslips"], ["Signing", "pend", "20 Nov, 12:00"]]) +
            u.btn(u.icono("subir") + "Upload payslips", true, "ancho")
          });
        } else {
          movil = u.movil({ quien: "Elena's phone (buyer)", app: "wa", hora: "9:00", cuerpo:
            u.ellos("All set, Elena! The signing is on <strong>20 Nov at 12:00</strong> at Hart & Cole, 5 King Street.<br><br>Bring your ID. Tom will be there with you.", "9:00", " anim")
          });
        }
        var cuerpo = '<div class="entre"><strong>Sale · 14 Elm Street</strong>' + u.chip("Signing: 20 Nov", "marca") + "</div>" +
          u.barra(lista.filter(function (l) { return l[1] === "ok"; }).length, lista.length, "Documents in") +
          u.check(lista);
        if (x.p === 0) cuerpo += '<div class="fila">' + u.btn("Send reminders", true) + "</div>";
        if (x.p === 3) cuerpo += '<div class="caja caja-suave anim"><h5>' + u.icono("correo") + "Documents sent to the lawyer</h5><p>Appointment confirmed with buyer and seller.</p></div>";
        return movil + u.ventana({ quien: "Tom's computer", seccion: "Sales", cuerpo: cuerpo });
      }
    }
  ]
});
