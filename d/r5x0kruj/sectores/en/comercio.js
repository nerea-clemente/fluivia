/* Demo · Independent shop (fictional example) · English */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "comercio",
  etiqueta: "Independent shop",
  tipo: "Bookshop and stationer",
  negocio: "Driftwood Books",
  lema: "Books, stationery and a reading club in the neighbourhood, and online too",
  cliente: "Customer",
  software: { actual: "your till system and your web shop", medida: "a custom dashboard for orders, stock and suppliers" },
  marca: {
    m1: "#B5482A", m1t: "#FFFFFF", m2: "#FBE3CC", m2t: "#4A2410", suave: "#FBF3EC", tinta: "#3A1E13",
    fuente: "'Fraunces', Georgia, serif", radio: "6px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="6" fill="#B5482A"/><path d="M20 12.5c-3-2-7-2.5-11-2v16c4-.5 8 0 11 2 3-2 7-2.5 11-2v-16c-4-.5-8 0-11 2zM20 12.5v16" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linejoin="round"/><path d="M9 33c2.5-1.6 5-1.6 7.5 0s5 1.6 7.5 0 5-1.6 7.5 0" fill="none" stroke="#FBD3B0" stroke-width="2" stroke-linecap="round"/></svg>'
  },
  panel: ["Messages", "Orders", "Suppliers", "Customers", "Reviews"],
  situacion: "Two booksellers, one person in the afternoons and around 12,000 books in the shop. A small web shop, a reading club, and WhatsApp and Instagram messages that come in while someone is serving at the till.",
  dolores: [
    ["“Do you have this book?” all day long", "People ask on WhatsApp, on Instagram and by phone, and to answer someone has to leave the till and check the computer."],
    ["Special orders in a notebook", "The book arrives from the distributor and nobody remembers to tell the customer, or they're told twice."],
    ["Delivery notes and invoices everywhere", "They come from ten distributors and publishers, on paper and by email, and at the end of the quarter the accountant asks for whatever's missing."],
    ["Customers who come once", "Plenty of people buy a Christmas present and never come back. And happy customers don't leave reviews."]
  ],
  casos: [
    {
      id: "mensajes",
      montaje: { plazo: "3 to 4 weeks", con: "WhatsApp Business, Instagram and your till system, for stock" },
      nav: "Customer messages",
      titulo: "Customer messages answered with real stock",
      hoy: "People ask on WhatsApp or Instagram if you have a book, when you open or if you can put one aside. Answering means leaving the till and checking the system.",
      con: "The everyday questions get an instant answer, using the stock in your till system and your opening hours. Anything that needs a bookseller, like a recommendation or a complaint, is passed on.",
      pasos: [
        { quien: "cliente", nombre: "Elena, customer", t: "Elena asks on Instagram at 21:30", d: "She's looking for a book a friend recommended and wants to know if you're open on Saturday.", boton: "Send the question" },
        { quien: "auto", t: "The answer uses real stock and opening hours", d: "There are 2 copies in the shop, and on Saturday you're open 10:00 to 14:00. She's offered to have one put aside.", boton: "Elena asks to reserve one" },
        { quien: "auto", t: "The copy is put aside", d: "It's held in stock so it can't sell on the web shop, until Saturday at 14:00. And it goes on Nora's list to put on the collection shelf.", boton: "See the next morning" },
        { quien: "equipo", nombre: "Nora, bookseller", t: "In the morning, Nora sees what's left for her", d: "What was answered automatically, and what needs a bookseller: a recommendation for a child who won't read and a complaint about a web order.", boton: "See the result" }
      ],
      final: { antes: "Messages unanswered until the next day, and trips from the till to the computer to check stock.", ahora: "The everyday questions are answered automatically with real data, and Nora spends her time on the ones that need a bookseller." },
      escena: function (x) {
        var u = UI, cuerpo;
        var de = function (t, q) { return t + '<br><span class="tenue">' + q + "</span>"; };
        var resp = "Hi Elena! Yes, we have <strong>2 copies</strong> of <em>The Lighthouse Year</em> by Clara Weiss in paperback (€10.95). On Saturday we're open <strong>10:00 to 14:00</strong>. Would you like us to put one aside for you?";
        var chat = u.fecha("Thursday") + u.yo("Hi! Do you have <em>The Lighthouse Year</em> by Clara Weiss? And are you open on Saturday?", "21:32", x.n(0));
        if (x.p === 0) chat += u.btn(u.icono("enviar") + "Send", true);
        if (x.p >= 1) chat += u.ellos(resp, "21:32", x.n(1)) +
          (x.p === 1 ? u.respuestas(["Yes, please", "No need"], 0) : u.respuestas(["Yes, please", "No need"], null, 0));
        if (x.p >= 2) chat += u.ellos("Done. We're holding one under Elena until Saturday at 14:00. You pay when you collect.", "21:33", x.n(2));
        var movil = u.movil({ quien: "Elena's phone (Instagram)", app: "wa", sub: "Instagram messages", hora: x.p >= 2 ? "21:33" : "21:32", cuerpo: chat });

        if (x.p === 0) {
          cuerpo = '<p class="peq"><strong>Today\'s messages</strong></p>' +
            u.tabla(["Question", "Status"], [
              [de("Do you have A4 sketchbooks?", "Luis M. · WhatsApp, 18:05"), u.chip("Answered", "ok")],
              [de("Do you ship to Lyon?", "Anna P. · Instagram, 19:40"), u.chip("Answered", "ok")]
            ]);
        } else if (x.p === 1) {
          cuerpo = '<div class="entre"><strong>Elena G. · Instagram</strong>' + u.chip("21:32", "info") + "</div>" +
            '<div class="caja caja-ia anim"><h5>What the answer was based on</h5>' + u.ficha([
              ["Book", "<em>The Lighthouse Year</em>, Clara Weiss · paperback"],
              ["Shop stock", "2 copies, from the till system"],
              ["Price", "€10.95"],
              ["Saturday hours", "10:00 to 14:00"]
            ]) + "</div>";
        } else if (x.p === 2) {
          cuerpo = '<div class="entre"><strong>Elena G. · Instagram</strong>' + u.chip("On hold", "ok") + "</div>" +
            '<div class="anim">' + u.ficha([
              ["Book", "<em>The Lighthouse Year</em>, Clara Weiss · paperback"],
              ["Stock", "1 for sale · 1 on hold"],
              ["On hold until", "Saturday at 14:00"],
              ["Payment", "On collection"]
            ]) + "</div>" +
            '<div class="anim anim-2">' + u.check([["Put on the collection shelf", "pend", "On Nora's list for tomorrow"]]) + "</div>";
        } else {
          cuerpo = '<div class="anim">' + u.kpis([["17", "messages tonight"], ["14", "answered automatically", "ok"], ["3", "waiting for a bookseller", "alerta"]]) + "</div>" +
            u.tabla(["Message", "Status"], [
              [de("Do you have <em>The Lighthouse Year</em>?", "Elena G."), u.chip("On hold", "ok")],
              [de("Looking for a book for my 9-year-old, who won't read anything", "James R."), u.chip("For Nora", "pend")],
              [de("The book I ordered online arrived with a bent cover", "Rosa T."), u.chip("Complaint", "alerta")],
              [de("Are you open on 26 Dec?", "Luis M."), u.chip("Answered", "ok")]
            ], ["", "is-resaltada", "is-resaltada"]) +
            u.nota("Recommendations and complaints are always answered by a person. The everyday ones, like stock, opening hours or shipping, go out automatically using your data.");
        }
        return movil + u.ventana({ quien: "Till computer", seccion: "Messages", cuerpo: cuerpo });
      }
    },

    {
      id: "encargos",
      montaje: { plazo: "2 weeks", con: "Your till system, your web shop and WhatsApp Business" },
      nav: "Orders to collect",
      titulo: "Special orders and click & collect that tell customers when they're ready",
      hoy: "If a book isn't in stock, it goes in a notebook, gets ordered from the distributor and, when it arrives, someone has to remember to call the customer.",
      con: "The order is logged with the customer's details, from the till or the web shop, and added to the next distributor order. When the delivery note is booked in, the customer gets a message to say it's ready to collect.",
      pasos: [
        { quien: "equipo", nombre: "Nora, bookseller", t: "Paul orders a book at the till", d: "He wants a cycling route guide you don't have. Nora logs it in the dashboard in half a minute, with his phone number.", boton: "Save the order" },
        { quien: "auto", t: "Paul gets a confirmation", d: "With the book, the price and the distributor's usual lead time. The order goes into the next distributor order.", boton: "The delivery arrives" },
        { quien: "auto", t: "The delivery arrives and the orders are spotted", d: "When the delivery note is booked in, each ordered book is set aside with the customer's name.", boton: "Book in the delivery" },
        { quien: "cliente", nombre: "Paul, customer", t: "Paul gets the message and says when he'll come", d: "It's held for 10 days. If he doesn't come, he gets one reminder; after that, Nora decides whether the book goes back on the shelf.", boton: "Reply" }
      ],
      final: { antes: "Orders in a notebook, calls one by one and the odd book waiting weeks behind the till.", ahora: "Every order sends its own message when it arrives, and Nora always knows what's waiting to be collected." },
      escena: function (x) {
        var u = UI, movil;
        var libro = function (t, s) { return t + '<br><span class="tenue">' + s + "</span>"; };
        if (x.p === 0) {
          return u.ventana({ quien: "Till computer", seccion: "Orders", cuerpo:
            '<div class="entre"><strong>New order</strong>' + u.chip("Saturday, 12:10", "info") + "</div>" +
            u.campos([
              ["Book", libro("<strong>Cycling the Coast: 30 Routes</strong>", "Northwind Press · €22.50")],
              ["Customer", "Paul Fischer · +** *** *** 412"],
              ["Order from", u.opc(["Atlantic Book Distribution", "Direct from the publisher"], 0)],
              ["Payment", u.opc(["On collection", "Deposit now"], 0)]
            ]) +
            '<div class="fila">' + u.btn("Save the order", true) + "</div>"
          });
        }
        var filas = function (pablo) {
          return u.tabla(["Order", "Status"], [
            [libro("Cycling the Coast: 30 Routes", "For Paul Fischer · at the till"), pablo],
            [libro("A Field Guide to Mushrooms", "For Carmen Diaz · web shop, click & collect"), x.p >= 3 ? u.chip("Told", "ok") : u.chip("Ordered", "info")],
            [libro("Calligraphy Workbook 3", "For Marta Ruiz · web shop, click & collect"), u.chip("Not collected for 9 days", "pend")]
          ], ["is-resaltada"]);
        };
        if (x.p === 1) {
          movil = u.movil({ quien: "Paul's phone", app: "wa", hora: "12:11", cuerpo:
            u.fecha("Saturday") +
            u.ellos("Hi Paul. We've ordered <strong>Cycling the Coast: 30 Routes</strong> for you (€22.50). It usually takes 3 to 4 working days. We'll message you here as soon as it's in the shop.", "12:11", " anim")
          });
          return movil + u.ventana({ quien: "Till computer", seccion: "Orders", cuerpo:
            '<p class="peq"><strong>Open orders</strong></p>' + filas(u.chip("Ordered", "info"))
          });
        }
        if (x.p === 2) {
          return u.ventana({ quien: "Till computer", seccion: "Suppliers", cuerpo:
            '<div class="entre"><strong>Delivery note from Atlantic Book Distribution</strong>' + u.chip("Arrived today, 11:20", "info") + "</div>" +
            '<div class="anim">' + u.tabla(["Book", "Qty", "For"], [
              [libro("<em>The Lighthouse Year</em>", "Clara Weiss · paperback"), "3", "Shop"],
              ["Cycling the Coast: 30 Routes", "1", u.chip("Paul's order", "marca")],
              ["A Field Guide to Mushrooms", "1", u.chip("Carmen's order", "marca")],
              [libro("November new releases", "9 titles"), "14", "Shop"]
            ], ["", "is-resaltada", "is-resaltada", ""]) + "</div>" +
            '<div class="fila">' + u.btn("Book in the delivery", true) + "</div>"
          });
        }
        var chat = u.fecha("Saturday") +
          u.ellos("Hi Paul. We've ordered <strong>Cycling the Coast: 30 Routes</strong> for you (€22.50). It usually takes 3 to 4 working days. We'll message you here as soon as it's in the shop.", "12:11") +
          u.fecha("Tuesday") +
          u.ellos("Paul, your book is in at Driftwood Books: <strong>Cycling the Coast: 30 Routes</strong>. We'll hold it for 10 days. When can you pop in?", "11:22", x.n(3));
        chat += x.fin ? u.respuestas(["This afternoon", "On Friday"], null, 1) +
            u.ellos("Great, see you on Friday. We're open 10:00 to 13:30 and 15:00 to 19:00.", "11:30", " anim") :
          u.respuestas(["This afternoon", "On Friday"], 1);
        movil = u.movil({ quien: "Paul's phone", app: "wa", hora: x.fin ? "11:30" : "11:22", cuerpo: chat });
        var cuerpo = '<p class="peq"><strong>Open orders</strong></p>' +
          filas(x.fin ? u.chip("Coming on Friday", "ok") : u.chip("Told", "ok"));
        if (x.fin) {
          cuerpo += '<div class="anim">' + u.kpis([["12", "orders this month"], ["12", "customers told without a call", "ok"], ["1", "not collected, for Nora", "alerta"]]) + "</div>" +
            u.nota("If an order isn't collected, the customer gets one reminder. After that, Nora decides whether the book goes back on the shelf.");
        }
        return movil + u.ventana({ quien: "Till computer", seccion: "Orders", cuerpo: cuerpo });
      }
    },

    {
      id: "facturas",
      montaje: { plazo: "2 to 3 weeks", con: "Your email, the shop phone and a folder shared with your accountant" },
      nav: "Supplier invoices",
      titulo: "Supplier delivery notes and invoices, sorted for your accountant",
      hoy: "Delivery notes arrive on paper with the boxes, and invoices by email. They pile up in a tray, and at the end of the quarter the accountant asks for the missing ones.",
      con: "Every delivery note and invoice you receive, on paper with a photo or by email, is read and filed. The invoice is checked against the delivery notes, and your accountant's folder is always up to date.",
      pasos: [
        { quien: "equipo", nombre: "Nora, bookseller", t: "Nora takes a photo of the delivery note", d: "The boxes from the distributor arrive with a paper delivery note. One photo from the shop phone and the paper can go in the file.", boton: "Take the photo" },
        { quien: "auto", t: "It's read and checked against the order", d: "Books, quantities, net amount and VAT are read. One book that was ordered isn't there: it's noted.", boton: "The invoice arrives" },
        { quien: "auto", t: "The monthly invoice is checked against the delivery notes", d: "The distributor emails the invoice. It's picked up automatically, matched with the month's three delivery notes, and a difference shows up.", boton: "See the folder" },
        { quien: "equipo", nombre: "Iris, owner", t: "Your accountant's folder is up to date", d: "The quarter's purchase invoices, in order, with their details in a spreadsheet. Before paying, Iris decides what to do about the differences.", boton: "See the result" }
      ],
      final: { antes: "A tray of paper, invoices in the inbox and the accountant asking for what's missing at the end of the quarter.", ahora: "Every delivery note and invoice is filed and checked the day it arrives, and Iris sees the differences before she pays." },
      escena: function (x) {
        var u = UI, movil;
        var tit = function (t, s) { return t + '<br><span class="tenue">' + s + "</span>"; };
        var albaran = function (clase) {
          return u.recibo({ comercio: "Atlantic Book Distribution", dato: "Delivery note 26-1187 · 3 Nov", clase: clase || "", lineas: [
            ["3 Lighthouse Year (pb)", "€24.63"],
            ["1 Cycling the Coast", "€15.75"],
            ["14 New releases Nov", "€127.12"],
            ["Net", "€167.50"],
            ["VAT 4%", "€6.70"]
          ], total: "€174.20" });
        };
        if (x.p === 0) {
          movil = u.movil({ quien: "Shop phone", equipo: true, hora: "11:25", titulo: "Upload a delivery note or invoice", cuerpo:
            '<p class="peq">Take a photo of the paper. It\'s read automatically.</p>' +
            albaran() +
            u.btn(u.icono("camara") + "Take the photo", true, "ancho")
          });
          return movil + u.ventana({ quien: "Shop computer", seccion: "Suppliers", cuerpo:
            '<p class="peq"><strong>Latest documents received</strong></p>' +
            u.tabla(["Document", "Status"], [
              [tit("Invoice PN-0912", "North Paper Co. · €241.79"), u.chip("Filed", "ok")],
              [tit("Delivery note T-0451", "Northwind Press · €88.40"), u.chip("Filed", "ok")]
            ])
          });
        }
        if (x.p === 1) {
          return u.ventana({ quien: "Shop computer", seccion: "Suppliers", cuerpo:
            '<div class="entre"><strong>Delivery note 26-1187 · photo at 11:25</strong>' + u.chip("To claim: 1 book", "pend") + "</div>" +
            '<div class="anim">' + u.tabla(["Book", "Ordered", "On the note"], [
              [tit("<em>The Lighthouse Year</em>", "Clara Weiss · paperback"), "3", u.chip("3 received", "ok")],
              ["Cycling the Coast: 30 Routes", "1", u.chip("Received", "ok")],
              [tit("November new releases", "9 titles"), "14", u.chip("14 received", "ok")],
              [tit("Atlas of Coastal Birds", "€18.90 + VAT"), "1", u.chip("Missing", "alerta")]
            ], ["", "", "", "is-resaltada"]) + "</div>" +
            '<div class="caja caja-ia anim anim-2"><h5>What was read</h5>' + u.ficha([
              ["Supplier", "Atlantic Book Distribution"],
              ["Delivery note", "26-1187 · 3 Nov"],
              ["Net", "€167.50"],
              ["VAT (4%)", "€6.70"],
              ["Total", "€174.20"]
            ]) + "</div>"
          });
        }
        if (x.p === 2) {
          movil = u.movil({ quien: "Shop email", app: "mail", hora: "9:02", cuerpo:
            u.mail({ de: "Atlantic Book Distribution", sinLogo: true, asunto: "Invoice INV-26/3391 · November", clase: " anim", cuerpo:
              "<p>Good morning,</p><p>Please find attached the invoice for November's deliveries.</p><p>Kind regards,<br>Accounts</p><p class=\"tenue\">Attached: INV-26-3391.pdf</p>" })
          });
          return movil + u.ventana({ quien: "Shop computer", seccion: "Suppliers", cuerpo:
            '<div class="entre"><strong>Invoice INV-26/3391</strong>' + u.chip("€604.40", "info") + "</div>" +
            '<div class="anim">' + u.tabla(["Delivery note", "On the invoice"], [
              [tit("26-1187 · €174.20", "3 Nov"), u.chip("€193.86", "alerta")],
              [tit("26-1203 · €312.10", "10 Nov"), u.chip("Matches", "ok")],
              [tit("26-1240 · €98.44", "17 Nov"), u.chip("Matches", "ok")]
            ], ["is-resaltada"]) + "</div>" +
            '<div class="caja caja-alerta anim anim-2"><h5>' + u.icono("alerta") + "Difference of €19.66</h5><p>The invoice charges for the <em>Atlas of Coastal Birds</em>, which wasn't on delivery note 26-1187. It's flagged for Iris to decide before paying.</p></div>"
          });
        }
        return u.ventana({ quien: "Iris's computer", seccion: "Suppliers", cuerpo:
          '<div class="entre"><strong>Purchase invoices · Q4</strong>' + u.chip("Folder shared with your accountant", "ok") + "</div>" +
          '<div class="anim">' + u.kpis([["31", "invoices received"], ["29", "match their delivery notes", "ok"], ["2", "with differences, for Iris", "alerta"]]) + "</div>" +
          u.tabla(["Supplier", "Invoice", "Status"], [
            ["Atlantic Book Distribution", tit("INV-26/3391", "€604.40"), u.chip("Difference: for Iris", "alerta")],
            ["North Paper Co.", tit("PN-0912", "€241.79"), u.chip("Matches", "ok")],
            ["Northwind Press", tit("T-0118", "€88.40"), u.chip("Matches", "ok")],
            ["Shop electricity", tit("November", "€131.22"), u.chip("Filed", "ok")]
          ], ["is-resaltada"]) +
          '<div class="caja caja-suave anim anim-2"><h5>' + u.icono("doc") + 'What your accountant sees</h5><ul class="lista-simple">' +
            '<li><span>Invoices as PDFs, by month</span><span class="tenue">31</span></li>' +
            '<li><span>Spreadsheet with supplier, date, net, VAT and total</span><span class="tenue">Up to date</span></li>' +
          "</ul></div>" +
          u.nota("This only files the invoices you receive. Your receipts and sales invoices still come from your till system.")
        });
      }
    },

    {
      id: "fidelidad",
      montaje: { plazo: "1 to 2 weeks", con: "Your Google Business Profile, WhatsApp Business and your till system" },
      nav: "Reviews and repeat customers",
      titulo: "Google reviews and customers who come back",
      hoy: "Happy customers leave without writing a review. And someone who came in for a present in December doesn't hear from the shop again until next year.",
      con: "Customers who leave their number and agree to messages get one asking for a Google review. When a new release matches what they bought, they're told.",
      pasos: [
        { quien: "auto", t: "The day after a purchase, a request for a review", d: "Only to people who left their number and agreed to messages. A short message with a direct link to your Google profile.", boton: "Elena leaves a review" },
        { quien: "equipo", nombre: "Iris, owner", t: "The reply arrives ready to go", d: "The review appears in the dashboard with a suggested reply in the shop's voice. Iris reads it, changes it if she wants and posts it.", boton: "Post the reply" },
        { quien: "auto", t: "A new release comes out and the right people hear about it", d: "Lukas bought the first two books in a series in December and hasn't been back. The third comes out and he gets a message. Iris chooses what's announced and to whom.", boton: "Lukas reserves it" },
        { quien: "equipo", nombre: "Iris, owner", t: "Iris sees how the month went", d: "New reviews, replies posted and customers who came back after a message.", boton: "See the result" }
      ],
      final: { antes: "The odd review now and then, and Christmas customers you never hear from again.", ahora: "New reviews every week, all answered, and customers who come back when something they'll like comes out." },
      escena: function (x) {
        var u = UI, movil;
        var pide = "Hi Elena. Thanks for coming into Driftwood Books yesterday. If you enjoyed your visit, would you leave us a Google review? It's the best way for other local readers to find us.";
        var respuesta = "Thank you, Elena. We're glad <em>The Lighthouse Year</em> was waiting for you and that Nora's recommendation worked out. When you've finished it, come and tell us what you thought.";
        var resena = '<div class="caja' + x.n(1) + '"><div class="entre"><strong>Elena Garcia</strong>' + u.estrellas(5) + '</div><p>I asked about a book on a Thursday night and by Saturday they had it waiting for me. Nora recommended another one and I\'m already halfway through. A proper neighbourhood bookshop.</p><p class="tenue">Google review · 15 minutes ago</p></div>';
        if (x.p === 0) {
          movil = u.movil({ quien: "Elena's phone", app: "wa", hora: "11:00", cuerpo:
            u.fecha("Sunday") + u.ellos(pide + u.btn("Write my review", true), "11:00", " anim")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Elena's phone", app: "wa", hora: "11:06", cuerpo:
            u.fecha("Sunday") + u.ellos(pide, "11:00") + u.yo("Done. Thank you!", "11:06")
          });
        } else {
          var serie = ["Yes, please hold one", "I'll come to the launch", "Not now"];
          movil = u.movil({ quien: "Lukas's phone", app: "wa", hora: "18:00", cuerpo:
            u.fecha("March") +
            u.ellos("Hi Lukas. In December you picked up the first two Inspector Hale mysteries. The third, <strong>Black Tide</strong>, is out now, and Lola Sanz is launching it at the shop on Thursday at 19:00. Shall we hold a copy for you?", "18:00", x.n(2)) +
            (x.p === 2 ? u.respuestas(serie, 0) :
              u.respuestas(serie, null, 0) + u.ellos("Done, we'll hold it until Saturday. And if you fancy it, we'd love to see you on Thursday.", "18:01", " anim"))
          });
        }
        var cuerpo;
        if (x.p === 0) {
          cuerpo = u.kpis([["4.6", "average Google rating"], ["2", "new reviews this month"]]) +
            '<p class="tenue">Yesterday, 9 customers were asked for a review, all of whom had agreed to messages.</p>';
        } else if (x.p === 1) {
          cuerpo = '<p class="peq"><strong>New review</strong></p>' + resena +
            '<div class="caja caja-ia anim anim-2"><h5>Suggested reply</h5><p>' + respuesta + "</p></div>" +
            '<div class="fila">' + u.btn("Post the reply", true) + u.btn("Edit", false, "sec") + "</div>";
        } else if (x.p === 2) {
          return movil + u.ventana({ quien: "Iris's computer", seccion: "Customers", cuerpo:
            '<div class="entre"><strong>Message: <em>Black Tide</em></strong>' + u.chip("Chosen by Iris", "ok") + "</div>" +
            '<div class="anim">' + u.ficha([
              ["Who", "People who bought the first two in the series and agreed to messages"],
              ["How many", "23 customers"],
              ["The offer", "Hold a copy for them, plus Thursday's launch"],
              ["When", "The day the book arrives in the shop"]
            ]) + "</div>" +
            u.nota("Nobody gets messages they haven't agreed to, and anyone can opt out by replying “stop”.")
          });
        } else {
          cuerpo = '<div class="anim">' + u.kpis([["4.7", "average Google rating"], ["11", "new reviews this month", "ok"], ["11 of 11", "answered"], ["8", "reservations after the new-release message"]]) + "</div>" +
            resena.replace(" anim", "") +
            '<div class="caja caja-suave"><div class="entre"><strong>Reply from Driftwood Books</strong>' + u.chip("Posted", "ok") + "</div><p>" + respuesta + "</p></div>";
        }
        return movil + u.ventana({ quien: "Iris's computer", seccion: "Reviews", cuerpo: cuerpo });
      }
    }
  ]
});
