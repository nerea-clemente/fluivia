/* Demo · Wholesale distribution (fictional example) · English */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "distribucion",
  etiqueta: "Wholesale",
  tipo: "Food & drink wholesaler",
  negocio: "Harbourside Wholesale",
  lema: "Food and drink for cafés, restaurants and delis",
  cliente: "Customer",
  software: { actual: "your accounting and order software", medida: "a custom dashboard for orders, routes and payments" },
  marca: {
    m1: "#1C4E80", m1t: "#FFFFFF", m2: "#FFE3BF", m2t: "#3A2A12", suave: "#EEF3F8", tinta: "#14263B",
    fuente: "'Barlow', 'Arial Narrow', sans-serif", radio: "8px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="8" fill="#1C4E80"/><path d="M7 25V14h15v11M22 17.5h5.5L32 22v3h-10" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linejoin="round"/><circle cx="12.5" cy="27" r="2.8" fill="#F28C28"/><circle cx="27" cy="27" r="2.8" fill="#F28C28"/></svg>'
  },
  panel: ["Orders", "Routes", "Delivery notes", "Payments", "Customers"],
  situacion: "Eight people, five delivery vans and around 300 cafés, restaurants and delis as customers. Orders come in by WhatsApp, email, phone, and sometimes by word of mouth to the driver.",
  dolores: [
    ["WhatsApp orders typed in by hand", "Every morning someone copies dozens of messages, voice notes and photos of lists into the system. And now and then an order stays stuck on a phone."],
    ["Paper delivery notes", "They get signed in the van and come back to the office crumpled. If a case is missing or broken, nobody writes it down."],
    ["“What time are you coming?”", "Customers ring to ask when the delivery will arrive, and the office rings the driver to find out."],
    ["Payments that drag on", "Some overdue invoices never get chased in time, because it feels awkward or there's simply no time."]
  ],
  casos: [
    {
      id: "pedidos",
      montaje: { plazo: "3 to 4 weeks", con: "WhatsApp Business, your email and your order software" },
      nav: "WhatsApp orders",
      titulo: "WhatsApp orders that go straight into the system",
      hoy: "Orders arrive on WhatsApp as loose messages, voice notes or photos of a list. Someone types them into the system by hand, and sometimes gets one wrong or misses it.",
      con: "Each order is read as it arrives, turned into lines with your product codes and checked against stock. The customer gets a confirmation and the order appears in your system.",
      pasos: [
        { quien: "cliente", nombre: "Marco, The Corner Café", t: "Marco orders the usual way, on WhatsApp", d: "At 23:40, after closing up. No forms, no new apps: he writes it however he likes.", boton: "Send the order" },
        { quien: "auto", t: "The order is understood and sorted", d: "Products are matched to your catalogue, with code and pack size. “The usual” is the beer Marco orders every week.", boton: "Check stock" },
        { quien: "auto", t: "Stock is checked and the order confirmed", d: "There are only 3 cases of sparkling water left. Marco is offered an alternative, picks one and gets a confirmation with the delivery time.", boton: "Marco chooses" },
        { quien: "equipo", nombre: "Sam, office", t: "In the morning, the orders are already in the system", d: "Sam finds last night's orders already entered. He only checks the ones with a note.", boton: "See the result" }
      ],
      final: { antes: "An hour every morning typing up WhatsApp orders, and a mistake or two on every round.", ahora: "Last night's orders are in the system before anyone gets to the office." },
      escena: function (x) {
        var u = UI;
        var prod = function (n, c) { return n + '<br><span class="tenue">' + c + "</span>"; };
        var pedido = "Hi! For tomorrow: 4 kegs of the usual, 3 cases of Coke, 5 of sparkling water and 1 net of lemons. Thanks";
        var chat = u.fecha("Wednesday") + u.yo(pedido, "23:40", x.n(0));
        if (x.p === 0) chat += u.btn(u.icono("enviar") + "Send", true);
        if (x.p === 1) chat += u.ellos("Got it, Marco. We're putting it together.", "23:40", " anim");
        if (x.p >= 2) chat += u.ellos("Got it, Marco. We're putting it together.", "23:40") +
          u.ellos("We only have 3 cases of <strong>sparkling water</strong> left. Shall we send 3 sparkling and 2 still, or just the 3?", "23:41", x.n(2)) +
          (x.p === 2 ? u.respuestas(["3 sparkling and 2 still", "Just the 3"], 0) : u.respuestas(["3 sparkling and 2 still", "Just the 3"], null, 0));
        if (x.p === 3) chat += u.ellos("Order confirmed for <strong>tomorrow, Thursday, 9:00 to 11:00</strong>:<br>· 4 kegs of lager, 30 L<br>· 3 cases of Coke<br>· 3 cases of sparkling water and 2 of still<br>· 1 net of lemons", "23:41", " anim");
        var movil = u.movil({ quien: "Marco's phone", app: "wa", hora: "23:41", cuerpo: chat });

        var cuerpo;
        if (x.p === 0) {
          cuerpo = '<p class="peq"><strong>Tonight\'s orders</strong></p>' +
            u.tabla(["Customer", "Lines", "Received", "Status"], [
              ["Lighthouse Restaurant", "6", "22:15", u.chip("In the system", "ok")],
              ["Sunny Side Café", "3", "22:52", u.chip("In the system", "ok")]
            ]);
        } else if (x.p < 3) {
          var agua = x.p === 1 ? [prod("Sparkling water 24 × 50 cl", "AG-224"), "5 cases", u.chip("Checking", "info")] : [prod("Sparkling water 24 × 50 cl", "AG-224"), "5 cases", u.chip("Only 3 left", "alerta")];
          cuerpo = '<div class="entre"><strong>Order from The Corner Café</strong>' + u.chip("Received at 23:40", "info") + "</div>" +
            '<div class="anim">' + u.tabla(["Product", "Quantity", "Stock"], [
              [prod("Lager keg 30 L", "CB-030"), "4", u.chip("In stock", "ok")],
              [prod("Coca-Cola 24 cans", "RF-124"), "3 cases", u.chip("In stock", "ok")],
              agua,
              [prod("Lemons, 5 kg net", "FR-005"), "1", u.chip("In stock", "ok")]
            ], ["", "", x.p === 2 ? "is-resaltada" : ""]) + "</div>" +
            '<div class="caja caja-ia anim anim-2"><h5>How it was read</h5><p>“The usual” is the 30 L lager keg: he has ordered it every week for two years.</p></div>' +
            (x.p === 1 ? '<div class="fila">' + u.btn("Check stock", true) + "</div>" : "");
        } else {
          cuerpo = '<div class="anim">' + u.kpis([["23", "WhatsApp orders tonight"], ["21", "entered automatically", "ok"], ["2", "with a note to check", "alerta"]]) + "</div>" +
            u.tabla(["Customer", "Lines", "Received", "Status"], [
              ["The Corner Café", "5", "23:40", u.chip("In the system", "ok")],
              ["Seaview Hotel", "9", "00:12", u.chip("Asks for a special price", "pend")],
              ["Lighthouse Restaurant", "6", "22:15", u.chip("In the system", "ok")],
              ["Coral Deli", "4", "06:30", u.chip("Unknown product", "pend")]
            ], ["is-resaltada"]) +
            u.nota("Orders with something unusual, like a special price or a product that isn't in the catalogue, wait for someone to look at them.");
        }
        return movil + u.ventana({ quien: "Office computer", seccion: "Orders", cuerpo: cuerpo });
      }
    },

    {
      id: "albaranes",
      montaje: { plazo: "2 to 3 weeks", con: "A web app for your drivers and your order software" },
      nav: "Delivery notes",
      titulo: "Delivery notes signed on the phone, with photos and issues",
      hoy: "The delivery note is signed on paper in the van and comes back to the office at the end of the day, if it comes back at all. If a case is missing or broken, nobody writes it down.",
      con: "The driver delivers with their phone. The customer signs on screen, any issue is logged with a photo, and the signed note reaches the customer and the office straight away.",
      pasos: [
        { quien: "equipo", nombre: "Tom, driver", t: "Tom arrives at the café with the order", d: "He opens the delivery on his phone: he sees what to drop off and ticks what he unloads.", boton: "Report an issue" },
        { quien: "equipo", nombre: "Tom, driver", t: "A case arrives damaged and is logged with a photo", d: "A case of Coke has dented cans. Tom marks it, takes a photo and takes it back with him.", boton: "Go to signature" },
        { quien: "cliente", nombre: "Marco, The Corner Café", t: "Marco signs on the screen", d: "With his finger, on Tom's phone. No paper to file or lose.", boton: "Sign" },
        { quien: "auto", t: "The customer and the office have it straight away", d: "Marco gets the signed delivery note by email. The office has it saved with the order, and the damaged case is flagged for a credit note.", boton: "See the result" }
      ],
      final: { antes: "Delivery notes that come back crumpled or not at all, and issues argued about weeks later.", ahora: "Every delivery is signed, with photos, in the system and in the customer's inbox straight away." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        var lineas = function (rota) {
          return u.check([
            ["4 kegs of lager, 30 L", "ok"],
            ["3 cases of Coke", rota ? "alerta" : "ok", rota ? "1 case damaged · going back" : ""],
            ["3 cases of sparkling water", "ok"],
            ["2 cases of still water", "ok"],
            ["1 net of lemons", "ok"]
          ]);
        };
        if (x.p === 0) {
          movil = u.movil({ quien: "Tom's phone", equipo: true, hora: "10:08", titulo: "Delivery 7 of 14", cuerpo:
            '<div class="caja caja-suave"><strong>The Corner Café</strong><p class="tenue">21 High Street · Marco Rossi</p></div>' +
            lineas(false) +
            u.btn(u.icono("alerta") + "Report an issue", true, "sec")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Tom's phone", equipo: true, hora: "10:10", titulo: "Issue", cuerpo:
            '<div class="caja caja-alerta anim"><h5>' + u.icono("alerta") + "3 cases of Coke</h5><p>1 case damaged</p></div>" +
            u.foto(["#C9CED4", "#8C3B32"], "<span class=\"peq\">Photo of the case</span>", " anim anim-2") +
            u.campos([["Note", "Dented cans. Taking it back."]]) +
            u.btn("Go to signature", true, "ancho")
          });
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Tom's phone", equipo: true, hora: "10:12", titulo: "Customer signature", cuerpo:
            '<p class="peq"><strong>The Corner Café</strong> receives:</p>' + lineas(true) +
            u.firma(false) + u.btn("Sign", true, "ancho")
          });
        } else {
          movil = u.movil({ quien: "Marco's email", app: "mail", hora: "10:12", cuerpo:
            u.mail({ asunto: "Delivery note DN-04512 · today's delivery", clase: " anim", cuerpo:
              "<p>Hi Marco,</p><p>Here's the signed delivery note for today's delivery at 10:12.</p><ul><li>4 kegs of lager, 30 L</li><li>2 cases of Coke (1 returned, damaged)</li><li>3 cases of sparkling water and 2 of still</li><li>1 net of lemons</li></ul><p>We'll credit the damaged case on your next invoice.</p>" })
          });
        }
        if (x.p < 3) {
          cuerpo = '<div class="entre"><strong>North route · Tom</strong>' + u.chip("7 of 14 deliveries", "info") + "</div>" +
            u.agenda([
              ["9:20", "<strong>Sunny Side Café</strong><small>Delivered and signed</small>"],
              ["9:45", "<strong>Lighthouse Restaurant</strong><small>Delivered and signed</small>"],
              ["10:10", "<strong>The Corner Café</strong><small>" + (x.p === 0 ? "Delivering" : "Delivering · 1 issue") + "</small>", "nueva"],
              ["10:40", "<strong>Seaview Hotel</strong><small>To do</small>", "libre"]
            ]);
        } else {
          cuerpo = '<div class="entre"><strong>Delivery note DN-04512</strong>' + u.chip("Signed", "ok") + "</div>" +
            u.ficha([["Customer", "The Corner Café"], ["Delivered", "Thursday at 10:12"], ["Signed by", "Marco Rossi"], ["Driver", "Tom"]]) +
            '<div class="anim">' + lineas(true) + "</div>" +
            '<div class="fila anim anim-2">' + u.chip("Emailed to the customer", "ok") + u.chip("Credit note due: 1 case", "pend") + "</div>";
        }
        return movil + u.ventana({ quien: "Office computer", seccion: x.p < 3 ? "Routes" : "Delivery notes", cuerpo: cuerpo });
      }
    },

    {
      id: "reparto",
      montaje: { plazo: "2 weeks", con: "Your route planning and WhatsApp Business" },
      nav: "Delivery updates",
      titulo: "Updates so customers know when the delivery is coming",
      hoy: "Customers ring to ask what time the delivery will arrive, and the office has to ring the driver to find out.",
      con: "The customer gets their delivery window the evening before and a message when the van is on its way. If there's a delay, they're told automatically.",
      pasos: [
        { quien: "auto", t: "The evening before, the delivery window", d: "Once the route is planned, every customer is told when their order will arrive and who's bringing it.", boton: "See delivery day" },
        { quien: "auto", t: "When the van is on its way, a message", d: "Tom finishes the previous drop and Marco gets “We'll be there in about 15 minutes”. Nobody had to type it.", boton: "There's a delay" },
        { quien: "auto", t: "If there's a delay, customers are told", d: "Traffic puts the route 25 minutes behind. The remaining customers get the new time and can say if they won't be in.", boton: "The hotel replies" },
        { quien: "equipo", nombre: "Sam, office", t: "The office sees the route without calling anyone", d: "Sam sees where each van is and which customers have flagged something. Seaview Hotel won't be in, so their delivery moves to the afternoon.", boton: "See the result" }
      ],
      final: { antes: "Calls back and forth between customers, office and drivers all morning.", ahora: "Every customer knows when their order is coming, and the office sees all the routes on one screen." },
      escena: function (x) {
        var u = UI, movil;
        if (x.p === 0) {
          movil = u.movil({ quien: "Marco's phone", app: "wa", hora: "19:00", cuerpo:
            u.fecha("Wednesday") +
            u.ellos("Hi Marco. Your order arrives tomorrow, Thursday, <strong>between 9:00 and 11:00</strong>. Tom is bringing it.", "19:00", " anim")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Marco's phone", app: "wa", hora: "9:55", cuerpo:
            u.fecha("Wednesday") +
            u.ellos("Hi Marco. Your order arrives tomorrow, Thursday, <strong>between 9:00 and 11:00</strong>. Tom is bringing it.", "19:00") +
            u.fecha("Thursday") +
            u.ellos("Tom is on his way to you: <strong>there in about 15 minutes</strong>.", "9:55", " anim")
          });
        } else {
          movil = u.movil({ quien: "Seaview Hotel's phone", app: "wa", hora: "10:20", cuerpo:
            u.fecha("Thursday") +
            u.ellos("Hello. The Harbourside Wholesale delivery is running late: we'll arrive at <strong>11:05</strong> instead of 10:40. Will someone be in?", "10:20", x.n(2)) +
            (x.p === 2 ? u.respuestas(["Yes, we're here", "Not today"], 1) :
              u.respuestas(["Yes, we're here", "Not today"], null, 1) +
              u.ellos("Thanks for letting us know. We'll bring it this afternoon, between 16:00 and 18:00.", "10:21", " anim"))
          });
        }
        var cuerpo;
        if (x.p === 0) {
          cuerpo = '<p class="peq"><strong>Tomorrow\'s routes</strong></p>' +
            u.tabla(["Route", "Driver", "Deliveries", "Messages"], [
              ["North", "Tom", "14", u.chip("Sent", "ok")],
              ["Centre", "Jonas", "18", u.chip("Sent", "ok")],
              ["Coast", "Priya", "11", u.chip("Sent", "ok")]
            ]) +
            '<div class="fila">' + u.btn("See delivery day", true) + "</div>";
        } else {
          var ret = x.p >= 2;
          cuerpo = '<div class="entre"><strong>North route · Tom</strong>' + (ret ? u.chip("Running 25 minutes late", "alerta") : u.chip("On time", "ok")) + "</div>" +
            u.agenda([
              ["9:20", "<strong>Sunny Side Café</strong><small>Delivered</small>"],
              ["9:45", "<strong>Lighthouse Restaurant</strong><small>Delivered</small>"],
              ["10:10", "<strong>The Corner Café</strong><small>" + (ret ? "Delivered" : "Message sent: there in 15 minutes") + "</small>", ret ? "" : "nueva", ret ? "" : x.n(1)],
              [ret ? "11:05" : "10:40", "<strong>Seaview Hotel</strong><small>" + (x.p === 3 ? "Won't be in: moved to 16:00 to 18:00" : ret ? "New time sent" : "To do") + "</small>", x.p === 3 ? "hueco" : "libre", x.p === 3 ? " anim" : ""],
              [ret ? "11:30" : "11:05", "<strong>Coral Deli</strong><small>" + (ret ? "New time sent" : "To do") + "</small>", "libre"]
            ]);
          if (x.p === 2) cuerpo += '<div class="caja caja-alerta anim"><h5>' + u.icono("alerta") + "25-minute delay</h5><p>The 6 customers left on the route have been told.</p></div>";
          if (x.p === 3) cuerpo += '<div class="anim anim-2">' + u.kpis([["43", "deliveries today"], ["86", "messages sent automatically", "ok"], ["1", "delivery moved to the afternoon"]]) + "</div>";
        }
        return movil + u.ventana({ quien: "Office computer", seccion: "Routes", cuerpo: cuerpo });
      }
    },

    {
      id: "cobros",
      montaje: { plazo: "2 to 3 weeks", con: "Your accounting software and your email or WhatsApp" },
      nav: "Payment reminders",
      titulo: "Overdue invoices, chased on time",
      hoy: "Overdue invoices pile up because chasing them feels awkward and there's never time. By the time someone gets to it, some are three months old.",
      con: "Every overdue invoice gets friendly reminders, step by step, with the invoice attached. Accounts sees who owes what and decides on the tricky ones.",
      pasos: [
        { quien: "auto", t: "An invoice falls due and a friendly reminder goes out", d: "Three days after the due date, the customer gets a reminder with the invoice attached and the payment details.", boton: "See the next reminder" },
        { quien: "auto", t: "If it's still unpaid, a more direct follow-up", d: "After 15 days, on WhatsApp. If the customer replies that they've already paid or that there's a problem with the invoice, the reminders stop and accounts is told.", boton: "Lucy replies" },
        { quien: "equipo", nombre: "Hannah, accounts", t: "Hannah sees who owes what", d: "Debts by age and what each customer has replied. Key accounts, or anyone with an open dispute, get no reminder unless Hannah says so.", boton: "See the result" }
      ],
      final: { antes: "Invoices months overdue and awkward phone calls to chase them.", ahora: "Routine invoices get paid after automatic reminders, and Hannah spends her time on the cases that need her." },
      escena: function (x) {
        var u = UI, movil;
        if (x.p === 0) {
          movil = u.movil({ quien: "Lucy's email (Sunny Side Café)", app: "mail", hora: "9:00", cuerpo:
            u.mail({ asunto: "Reminder: invoice INV-0387", clase: " anim", cuerpo:
              "<p>Hi Lucy,</p><p>Just a reminder that invoice <strong>INV-0387 for €486.20</strong> was due on 5 Oct. If you've already paid it, please ignore this message.</p><p>You can pay by bank transfer to the account shown on the invoice.</p><p>Thanks,<br>Accounts</p><p class=\"tenue\">Attached: INV-0387.pdf</p>" })
          });
        } else {
          movil = u.movil({ quien: "Lucy's phone (Sunny Side Café)", app: "wa", hora: "10:02", cuerpo:
            u.fecha("20 Oct") +
            u.ellos("Hi Lucy. Invoice INV-0387 (€486.20) is now 15 days overdue. Could you let us know when you'll be able to pay it?", "10:00", x.n(1)) +
            (x.p === 1 ? u.respuestas(["It's already paid", "I'll pay it this week", "There's a mistake on the invoice"], 1) :
              u.respuestas(["It's already paid", "I'll pay it this week", "There's a mistake on the invoice"], null, 1) +
              u.ellos("Great, thanks. We've made a note.", "10:02", " anim"))
          });
        }
        var sol = x.p === 0 ? u.chip("1st reminder sent", "info") : x.p === 1 ? u.chip("2nd reminder sent", "info") : u.chip("Paying this week", "ok");
        var cuerpo = (x.p === 2 ? '<div class="anim">' + u.kpis([["€12,480", "overdue"], ["€3,210", "paid this month after a reminder", "ok"], ["2", "cases for Hannah", "alerta"]]) + "</div>" : u.kpis([["€12,480", "overdue"], ["27", "overdue invoices"]])) +
          u.tabla(["Customer", "Invoice", "Amount", "Overdue", "Status"], [
            ["Sunny Side Café", "INV-0387", "€486.20", x.p === 0 ? "3 days" : "15 days", sol],
            ["Lighthouse Restaurant", "INV-0352", "€1,240.00", "32 days", u.chip("For Hannah: key account", "alerta")],
            ["Bistro Nova", "INV-0401", "€96.50", "5 days", u.chip("1st reminder sent", "info")],
            ["Seaview Hotel", "INV-0298", "€2,310.00", "61 days", u.chip("Says there's a mistake", "alerta")]
          ], ["is-resaltada"]);
        if (x.p === 2) cuerpo += u.nota("This only sends reminders: invoices are still issued from your usual accounting software.");
        return movil + u.ventana({ quien: "Hannah's computer", seccion: "Payments", cuerpo: cuerpo });
      }
    }
  ]
});
