/* Demo · Butik (fiktivt eksempel, dansk version) */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "comercio",
  etiqueta: "Butik",
  tipo: "Boghandel og papirhandel",
  negocio: "Boghandlen Tidevand",
  lema: "Bøger, papir og læseklub i byen, og også i webshoppen",
  cliente: "Kunden",
  software: { actual: "dit kassesystem og din webshop (fx Shopify eller DanDomain)", medida: "et skræddersyet overblik over bestillinger, lager og leverandører" },
  marca: {
    m1: "#B5482A", m1t: "#FFFFFF", m2: "#FBE3CC", m2t: "#4A2410", suave: "#FBF3EC", tinta: "#3A1E13",
    fuente: "'Fraunces', Georgia, serif", radio: "6px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="6" fill="#B5482A"/><path d="M20 12.5c-3-2-7-2.5-11-2v16c4-.5 8 0 11 2 3-2 7-2.5 11-2v-16c-4-.5-8 0-11 2zM20 12.5v16" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linejoin="round"/><path d="M9 33c2.5-1.6 5-1.6 7.5 0s5 1.6 7.5 0 5-1.6 7.5 0" fill="none" stroke="#FBD3B0" stroke-width="2" stroke-linecap="round"/></svg>'
  },
  panel: ["Beskeder", "Bestillinger", "Leverandører", "Kundeklub", "Anmeldelser"],
  situacion: "To boghandlere, en eftermiddagshjælp og omkring 12.000 bøger i butikken. En lille webshop, en kundeklub med nyhedsbrev og beskeder på Messenger, Instagram og sms, der tikker ind, mens der er kunder ved disken.",
  dolores: [
    ["»Har I den her bog?« hele dagen", "På Messenger, Instagram og telefon. For at svare skal man væk fra disken og kigge i systemet."],
    ["Bestillinger i et kladdehæfte", "Bogen kommer fra forlaget, og ingen husker at give kunden besked. Eller også får kunden besked to gange."],
    ["Følgesedler og fakturaer alle vegne", "Fra ti forlag og grossister, på papir og på mail. Når kvartalet slutter, efterlyser bogholderen dem, der mangler."],
    ["Kunder, der kun kommer én gang", "Mange køber en julegave og kommer aldrig igen. Og de glade kunder skriver ikke en anmeldelse."]
  ],
  casos: [
    {
      id: "mensajes",
      montaje: { plazo: "3-4 uger", con: "Messenger, Instagram og dit kassesystem og din webshop, til lagerstatus" },
      nav: "Beskeder fra kunder",
      titulo: "Beskeder fra kunder besvaret med det rigtige lager",
      hoy: "Kunderne spørger på Instagram eller Messenger, om I har en bog, hvornår I har åbent, eller om I kan lægge den til side. For at svare skal man væk fra disken og kigge i systemet.",
      con: "De faste spørgsmål bliver besvaret med det samme ud fra lageret i kassesystemet og jeres åbningstider. Det, der kræver en boghandler, som en anbefaling eller en klage, bliver sendt videre.",
      ganas: ["Svar med det samme, også om aftenen", "Ingen ture væk fra disken for at tjekke lageret", "Et menneske tager sig af det følsomme"],
      pasos: [
        { quien: "cliente", nombre: "Emma, kunde", t: "Emma skriver på Instagram kl. 21.30", d: "Hun leder efter en bog, hun har fået anbefalet, og vil vide, om I har åbent lørdag.", boton: "Send spørgsmålet" },
        { quien: "auto", t: "Svaret bygger på det rigtige lager og de rigtige åbningstider", d: "Der er 2 eksemplarer i butikken, og lørdag har I åbent kl. 10-14. Emma får tilbudt at få lagt et til side.", boton: "Emma vil have den lagt til side" },
        { quien: "auto", t: "Eksemplaret bliver lagt til side", d: "Det bliver reserveret på lageret, så det ikke bliver solgt i webshoppen, indtil lørdag kl. 14. Og det kommer på Nannas liste, så det havner på reservationshylden.", boton: "Se næste morgen" },
        { quien: "equipo", nombre: "Nanna, boghandler", t: "Om morgenen kan Nanna se, hvad der venter på hende", d: "Hvad der er besvaret automatisk, og hvad der kræver en boghandler: en anbefaling til en dreng, der ikke gider læse, og en klage over en webshopordre.", boton: "Se resultatet" }
      ],
      final: { antes: "Beskeder, der først bliver besvaret dagen efter, og ture fra disken til computeren for at tjekke lageret.", ahora: "De faste spørgsmål bliver besvaret automatisk med rigtige data, og Nanna bruger sin tid på dem, der kræver en boghandler." },
      escena: function (x) {
        var u = UI, cuerpo;
        var fra = function (t, q) { return t + '<br><span class="tenue">' + q + "</span>"; };
        var svar = "Hej Emma! Ja, vi har <strong>2 eksemplarer</strong> af <em>Barndom</em> af Tove Ditlevsen som paperback (129,95 kr.). Lørdag har vi åbent <strong>kl. 10-14</strong>. Skal vi lægge et til side til dig?";
        var chat = u.fecha("Torsdag") + u.yo("Hej! Har I <em>Barndom</em> af Tove Ditlevsen? Og har I åbent på lørdag?", "21.32", x.n(0));
        if (x.p === 0) chat += u.btn(u.icono("enviar") + "Send", true);
        if (x.p >= 1) chat += u.ellos(svar, "21.32", x.n(1)) +
          (x.p === 1 ? u.respuestas(["Ja, læg den til side", "Nej tak"], 0) : u.respuestas(["Ja, læg den til side", "Nej tak"], null, 0));
        if (x.p >= 2) chat += u.ellos("Så er den lagt til side i dit navn til lørdag kl. 14. Du betaler med MobilePay eller kort, når du henter den.", "21.33", x.n(2));
        var movil = u.movil({ quien: "Emmas mobil (Instagram)", app: "wa", sub: "Instagram-beskeder", hora: x.p >= 2 ? "21.33" : "21.32", cuerpo: chat });

        if (x.p === 0) {
          cuerpo = '<p class="peq"><strong>Dagens beskeder</strong></p>' +
            u.tabla(["Spørgsmål", "Status"], [
              [fra("Har I A4-skitsebøger?", "Lars M. · Messenger, 18.05"), u.chip("Besvaret", "ok")],
              [fra("Sender I til Aalborg?", "Anna P. · Instagram, 19.40"), u.chip("Besvaret", "ok")]
            ]);
        } else if (x.p === 1) {
          cuerpo = '<div class="entre"><strong>Emma G. · Instagram</strong>' + u.chip("21.32", "info") + "</div>" +
            '<div class="caja caja-ia anim"><h5>Det bygger svaret på</h5>' + u.ficha([
              ["Bog", "<em>Barndom</em>, Tove Ditlevsen · paperback"],
              ["Lager i butikken", "2 eksemplarer ifølge kassesystemet"],
              ["Pris", "129,95 kr."],
              ["Åbent lørdag", "Kl. 10-14"]
            ]) + "</div>";
        } else if (x.p === 2) {
          cuerpo = '<div class="entre"><strong>Emma G. · Instagram</strong>' + u.chip("Lagt til side", "ok") + "</div>" +
            '<div class="anim">' + u.ficha([
              ["Bog", "<em>Barndom</em>, Tove Ditlevsen · paperback"],
              ["Lager", "1 til salg · 1 reserveret"],
              ["Reserveret til", "Lørdag kl. 14"],
              ["Betaling", "Ved afhentning, MobilePay eller kort"]
            ]) + "</div>" +
            '<div class="anim anim-2">' + u.check([["Læg den på reservationshylden", "pend", "På Nannas liste til i morgen"]]) + "</div>";
        } else {
          cuerpo = '<div class="anim">' + u.kpis([["17", "beskeder i aftes"], ["14", "besvaret automatisk", "ok"], ["3", "venter på en boghandler", "alerta"]]) + "</div>" +
            u.tabla(["Besked", "Status"], [
              [fra("Har I <em>Barndom</em>?", "Emma G."), u.chip("Lagt til side", "ok")],
              [fra("Jeg leder efter en bog til min søn på 9, der ikke gider læse", "Jonas R."), u.chip("Til Nanna", "pend")],
              [fra("Bogen fra webshoppen kom med et bøjet omslag", "Sofie T."), u.chip("Klage", "alerta")],
              [fra("Har I åbent juleaftensdag?", "Lars M."), u.chip("Besvaret", "ok")]
            ], ["", "is-resaltada", "is-resaltada"]) +
            u.nota("Anbefalinger og klager bliver altid besvaret af et menneske. Det faste, som lager, åbningstider og forsendelse, bliver besvaret automatisk ud fra jeres egne data.");
        }
        return movil + u.ventana({ quien: "Computeren ved disken", seccion: "Beskeder", cuerpo: cuerpo });
      }
    },

    {
      id: "encargos",
      montaje: { plazo: "2 uger", con: "Dit kassesystem, din webshop og sms" },
      nav: "Bestil og hent",
      titulo: "Bestillinger, der selv giver besked, når de er klar til afhentning",
      hoy: "Er en bog ikke på lager, bliver den skrevet i et hæfte og bestilt hjem, og når den kommer, skal nogen huske at ringe til kunden. Webshopordrer med »Hent i butikken« ligger i en helt anden indbakke.",
      con: "Bestillingen bliver oprettet med kundens oplysninger, uanset om den kommer fra disken eller webshoppen, og kommer med i næste ordre til grossisten. Når følgesedlen bliver tjekket ind, får kunden en sms om, at bogen er klar til afhentning.",
      ganas: ["Ingen glemte bestillinger", "Ingen opkald én for én", "Du ved, hvad der venter på at blive hentet"],
      pasos: [
        { quien: "equipo", nombre: "Nanna, boghandler", t: "Peter bestiller en bog ved disken", d: "Han vil have en bog med cykelruter, som I ikke har inde. Nanna opretter bestillingen på et halvt minut med hans mobilnummer, og han betaler med det samme med MobilePay.", boton: "Gem bestillingen" },
        { quien: "auto", t: "Peter får en bekræftelse", d: "Med bogen, prisen og den forventede leveringstid. Bestillingen kommer med i næste ordre.", boton: "Varerne kommer" },
        { quien: "auto", t: "Varerne kommer, og bestillingerne bliver genkendt", d: "Når følgesedlen bliver tjekket ind, bliver hver bestilt bog sat til side med navnet på den, der har bestilt den. Også dem fra webshoppen.", boton: "Tjek følgesedlen ind" },
        { quien: "cliente", nombre: "Peter, kunde", t: "Peter får besked og svarer, hvornår han kommer", d: "Bogen ligger klar i 10 dage. Kommer han ikke, får han én påmindelse. Derefter bestemmer Nanna, om bogen skal tilbage på hylden.", boton: "Svar" }
      ],
      final: { antes: "Bestillinger i et hæfte, opkald én for én og en bog, der står og venter i ugevis bag disken.", ahora: "Hver bestilling giver selv besked, når den er klar, og Nanna ved hele tiden, hvad der venter på at blive hentet." },
      escena: function (x) {
        var u = UI, movil;
        var bog = function (t, s) { return t + '<br><span class="tenue">' + s + "</span>"; };
        var bekraeft = "Hej Peter. Vi har bestilt <strong>Cykelruter i Midtjylland: 30 ture</strong> hjem til dig (249,95 kr., betalt med MobilePay). Den plejer at komme inden for 3-4 hverdage. Du får en sms, så snart den er i butikken.";
        if (x.p === 0) {
          return u.ventana({ quien: "Computeren ved disken", seccion: "Bestillinger", cuerpo:
            '<div class="entre"><strong>Ny bestilling</strong>' + u.chip("Lørdag kl. 12.10", "info") + "</div>" +
            u.campos([
              ["Bog", bog("<strong>Cykelruter i Midtjylland: 30 ture</strong>", "Forlaget Bakkedal · 249,95 kr.")],
              ["Kunde", "Peter Friis · 20 ** ** 12"],
              ["Bestilles hos", u.opc(["BogNord Distribution", "Direkte fra forlaget"], 0)],
              ["Betaling", u.opc(["Betalt med MobilePay", "Betales ved afhentning"], 0)]
            ]) +
            '<div class="fila">' + u.btn("Gem bestillingen", true) + "</div>"
          });
        }
        var linjer = function (peter) {
          return u.tabla(["Bestilling", "Status"], [
            [bog("Cykelruter i Midtjylland: 30 ture", "Til Peter Friis · ved disken"), peter],
            [bog("Svampe i danske skove", "Til Karin Dahl · webshop, hent i butikken"), x.p >= 3 ? u.chip("Besked sendt", "ok") : u.chip("Bestilt", "info")],
            [bog("Skrivehæfte · skråskrift 3", "Til Maja Rask"), u.chip("Ikke hentet i 9 dage", "pend")]
          ], ["is-resaltada"]);
        };
        if (x.p === 1) {
          movil = u.movil({ quien: "Peters mobil", app: "wa", sub: "Sms", hora: "12.11", cuerpo:
            u.fecha("Lørdag") +
            u.ellos(bekraeft, "12.11", " anim")
          });
          return movil + u.ventana({ quien: "Computeren ved disken", seccion: "Bestillinger", cuerpo:
            '<p class="peq"><strong>Åbne bestillinger</strong></p>' + linjer(u.chip("Bestilt", "info"))
          });
        }
        if (x.p === 2) {
          return u.ventana({ quien: "Computeren ved disken", seccion: "Leverandører", cuerpo:
            '<div class="entre"><strong>Følgeseddel fra BogNord Distribution</strong>' + u.chip("Kom i dag kl. 11.20", "info") + "</div>" +
            '<div class="anim">' + u.tabla(["Bog", "Antal", "Til"], [
              [bog("<em>Barndom</em>", "Tove Ditlevsen · paperback"), "3", "Butikken"],
              ["Cykelruter i Midtjylland: 30 ture", "1", u.chip("Peters bestilling", "marca")],
              ["Svampe i danske skove", "1", u.chip("Karins webshopordre", "marca")],
              [bog("Novembers nyheder", "9 titler"), "14", "Butikken"]
            ], ["", "is-resaltada", "is-resaltada", ""]) + "</div>" +
            '<div class="fila">' + u.btn("Tjek følgesedlen ind", true) + "</div>"
          });
        }
        var chat = u.fecha("Lørdag") +
          u.ellos(bekraeft, "12.11") +
          u.fecha("Tirsdag") +
          u.ellos("Hej Peter. Din bog er klar til afhentning i Boghandlen Tidevand: <strong>Cykelruter i Midtjylland: 30 ture</strong>. Vi gemmer den til dig i 10 dage. Hvornår kommer du forbi?", "11.22", x.n(3));
        chat += x.fin ? u.respuestas(["I eftermiddag", "På fredag"], null, 1) +
            u.ellos("Perfekt, vi ses på fredag. Vi har åbent kl. 10-17.30.", "11.30", " anim") :
          u.respuestas(["I eftermiddag", "På fredag"], 1);
        movil = u.movil({ quien: "Peters mobil", app: "wa", sub: "Sms", hora: x.fin ? "11.30" : "11.22", cuerpo: chat });
        var cuerpo = '<p class="peq"><strong>Åbne bestillinger</strong></p>' +
          linjer(x.fin ? u.chip("Kommer fredag", "ok") : u.chip("Besked sendt", "ok"));
        if (x.fin) {
          cuerpo += '<div class="anim">' + u.kpis([["12", "bestillinger denne måned"], ["12", "kunder fik besked uden et opkald", "ok"], ["1", "ikke hentet, til Nanna", "alerta"]]) + "</div>" +
            u.nota("Bliver en bestilling ikke hentet, får kunden én påmindelse. Derefter bestemmer Nanna, om bogen skal tilbage på hylden.");
        }
        return movil + u.ventana({ quien: "Computeren ved disken", seccion: "Bestillinger", cuerpo: cuerpo });
      }
    },

    {
      id: "facturas",
      montaje: { plazo: "2-3 uger", con: "Jeres mail, butikkens mobil og e-conomic eller Dinero, som bogholderen bruger" },
      nav: "Leverandørfakturaer",
      titulo: "Følgesedler og leverandørfakturaer, klar til bogholderen",
      hoy: "Følgesedlerne kommer på papir med kasserne, og fakturaerne kommer på mail. De hober sig op i en bakke, og når kvartalet slutter, efterlyser bogholderen dem, der mangler.",
      con: "Hver følgeseddel og faktura, du får, på papir via et foto eller på mail, bliver læst og gemt i orden. Fakturaen bliver tjekket mod følgesedlerne, og bilagene ligger klar i e-conomic til bogholderen.",
      ganas: ["Ingen bortkomne fakturaer", "Du ser forskellene, før du betaler", "Bogholderen holder op med at efterlyse bilag"],
      pasos: [
        { quien: "equipo", nombre: "Nanna, boghandler", t: "Nanna tager et billede af følgesedlen", d: "Kasserne fra grossisten kommer med en følgeseddel på papir. Et billede med butikkens mobil, og papiret kan ryge i mappen.", boton: "Tag billedet" },
        { quien: "auto", t: "Følgesedlen bliver læst og sammenlignet med ordren", d: "Bøger, antal, beløb og moms bliver læst. En bog, der var bestilt, er ikke med, og det bliver noteret.", boton: "Fakturaen kommer" },
        { quien: "auto", t: "Månedens faktura bliver tjekket mod følgesedlerne", d: "Grossisten sender fakturaen på mail. Den bliver hentet automatisk og sammenholdt med månedens tre følgesedler, og der dukker en forskel op.", boton: "Se mappen" },
        { quien: "equipo", nombre: "Merete, ejer", t: "Bilagene ligger klar til bogholderen", d: "Kvartalets leverandørfakturaer, sorteret og med alle oplysninger, sendt videre til e-conomic. Før der bliver betalt, bestemmer Merete, hvad der skal ske med forskellene.", boton: "Se resultatet" }
      ],
      final: { antes: "En bakke med papirer, fakturaer i indbakken og en bogholder, der efterlyser bilag, når kvartalet slutter.", ahora: "Hver følgeseddel og faktura bliver gemt og tjekket den dag, den kommer, og Merete ser forskellene, før hun betaler." },
      escena: function (x) {
        var u = UI, movil;
        var tit = function (t, s) { return t + '<br><span class="tenue">' + s + "</span>"; };
        var folgeseddel = function (clase) {
          return u.recibo({ comercio: "BogNord Distribution", dato: "Følgeseddel 26-1187 · 3. november", clase: clase || "", lineas: [
            ["3 Barndom (paperback)", "234,00"],
            ["1 Cykelruter i Midtjylland", "150,00"],
            ["14 Novembers nyheder", "1.596,00"],
            ["Netto", "1.980,00"],
            ["Moms 25 %", "495,00"]
          ], total: "2.475,00 kr." });
        };
        if (x.p === 0) {
          movil = u.movil({ quien: "Butikkens mobil", equipo: true, hora: "11.25", titulo: "Upload følgeseddel eller faktura", cuerpo:
            '<p class="peq">Tag et billede af papiret. Det bliver læst automatisk.</p>' +
            folgeseddel() +
            u.btn(u.icono("camara") + "Tag billedet", true, "ancho")
          });
          return movil + u.ventana({ quien: "Butikkens computer", seccion: "Leverandører", cuerpo:
            '<p class="peq"><strong>Seneste dokumenter</strong></p>' +
            u.tabla(["Dokument", "Status"], [
              [tit("Faktura PN-0912", "Papirhuset Nord · 1.241,79 kr."), u.chip("Gemt", "ok")],
              [tit("Følgeseddel B-0451", "Forlaget Bakkedal · 884,00 kr."), u.chip("Gemt", "ok")]
            ])
          });
        }
        if (x.p === 1) {
          return u.ventana({ quien: "Butikkens computer", seccion: "Leverandører", cuerpo:
            '<div class="entre"><strong>Følgeseddel 26-1187 · billede fra kl. 11.25</strong>' + u.chip("Skal reklameres: 1 bog", "pend") + "</div>" +
            '<div class="anim">' + u.tabla(["Bog", "Bestilt", "På følgesedlen"], [
              [tit("<em>Barndom</em>", "Tove Ditlevsen · paperback"), "3", u.chip("Alle 3", "ok")],
              ["Cykelruter i Midtjylland: 30 ture", "1", u.chip("Med", "ok")],
              [tit("Novembers nyheder", "9 titler"), "14", u.chip("Alle 14", "ok")],
              [tit("Fugle ved kysten", "160,00 kr. + moms"), "1", u.chip("Mangler", "alerta")]
            ], ["", "", "", "is-resaltada"]) + "</div>" +
            '<div class="caja caja-ia anim anim-2"><h5>Det er læst</h5>' + u.ficha([
              ["Leverandør", "BogNord Distribution"],
              ["Følgeseddel", "26-1187 · 3. november"],
              ["Netto", "1.980,00 kr."],
              ["Moms (25 %)", "495,00 kr."],
              ["I alt", "2.475,00 kr."]
            ]) + "</div>"
          });
        }
        if (x.p === 2) {
          movil = u.movil({ quien: "Boghandlens mail", app: "mail", hora: "9.02", cuerpo:
            u.mail({ de: "BogNord Distribution", sinLogo: true, asunto: "Faktura 26/3391 · november", clase: " anim", cuerpo:
              "<p>Hej</p><p>Hermed fakturaen for novembers følgesedler.</p><p>Venlig hilsen<br>Bogholderiet</p><p class=\"tenue\">Vedhæftet: Faktura-26-3391.pdf</p>" })
          });
          return movil + u.ventana({ quien: "Butikkens computer", seccion: "Leverandører", cuerpo:
            '<div class="entre"><strong>Faktura 26/3391</strong>' + u.chip("8.175,00 kr.", "info") + "</div>" +
            '<div class="anim">' + u.tabla(["Følgeseddel", "På fakturaen"], [
              [tit("26-1187 · 2.475,00 kr.", "3. november"), u.chip("2.675,00 kr.", "alerta")],
              [tit("26-1203 · 4.312,50 kr.", "10. november"), u.chip("Stemmer", "ok")],
              [tit("26-1240 · 1.187,50 kr.", "17. november"), u.chip("Stemmer", "ok")]
            ], ["is-resaltada"]) + "</div>" +
            '<div class="caja caja-alerta anim anim-2"><h5>' + u.icono("alerta") + "Forskel på 200,00 kr.</h5><p>Fakturaen opkræver <em>Fugle ved kysten</em>, som ikke var med på følgeseddel 26-1187. Merete tager stilling, før der bliver betalt.</p></div>"
          });
        }
        return u.ventana({ quien: "Meretes computer", seccion: "Leverandører", cuerpo:
          '<div class="entre"><strong>Leverandørfakturaer · 4. kvartal</strong>' + u.chip("Sendt til e-conomic", "ok") + "</div>" +
          '<div class="anim">' + u.kpis([["31", "fakturaer modtaget"], ["29", "stemmer med følgesedlerne", "ok"], ["2", "med forskelle, til Merete", "alerta"]]) + "</div>" +
          u.tabla(["Leverandør", "Faktura", "Status"], [
            ["BogNord Distribution", tit("26/3391", "8.175,00 kr."), u.chip("Forskel: til Merete", "alerta")],
            ["Papirhuset Nord", tit("PN-0912", "1.241,79 kr."), u.chip("Stemmer", "ok")],
            ["Forlaget Bakkedal", tit("B-0118", "884,00 kr."), u.chip("Stemmer", "ok")],
            ["El til butikken", tit("November", "1.312,22 kr."), u.chip("Gemt", "ok")]
          ], ["is-resaltada"]) +
          '<div class="caja caja-suave anim anim-2"><h5>' + u.icono("doc") + 'Det ser bogholderen</h5><ul class="lista-simple">' +
            '<li><span>Bilag i e-conomic med PDF</span><span class="tenue">31</span></li>' +
            '<li><span>Leverandør, dato, netto, moms og total udfyldt</span><span class="tenue">Opdateret</span></li>' +
          "</ul></div>" +
          u.nota("Her bliver kun de fakturaer, du modtager, samlet og tjekket. Dine egne bonner og fakturaer kommer stadig fra kassesystemet og webshoppen.")
        });
      }
    },

    {
      id: "fidelidad",
      montaje: { plazo: "1-2 uger", con: "Jeres Google-profil, sms, kundeklubben og dit kassesystem" },
      nav: "Anmeldelser og kundeklub",
      titulo: "Anmeldelser på Google og kunder, der kommer igen",
      hoy: "Glade kunder går uden at skrive en anmeldelse. Og den, der købte en gave i december, hører ikke fra boghandlen igen før året efter.",
      con: "Medlemmer af kundeklubben, der har sagt ja til beskeder, får en sms med et link til at anmelde jer på Google. Udkommer der en ny bog, der passer til det, de har købt, får de besked.",
      ganas: ["Flere anmeldelser på Google", "Alle besvaret, uden at det tager hele eftermiddage", "Kunder, der kommer igen"],
      pasos: [
        { quien: "auto", t: "Dagen efter købet bliver kunden spurgt om sin mening", d: "Kun medlemmer af kundeklubben, der har sagt ja til beskeder. En kort sms med et direkte link til jeres Google-profil.", boton: "Emma skriver en anmeldelse" },
        { quien: "equipo", nombre: "Merete, ejer", t: "Svaret ligger klar", d: "Anmeldelsen dukker op i overblikket med et forslag til svar i boghandlens tone. Merete læser det, retter det, hvis hun vil, og udgiver det.", boton: "Udgiv svaret" },
        { quien: "auto", t: "En ny bog udkommer, og dem, den passer til, får besked", d: "Jonas købte de to første bøger i en serie i december og er ikke kommet siden. Nu udkommer nummer tre, og han får besked. Merete vælger, hvad der bliver sendt, og til hvem.", boton: "Jonas reserverer den" },
        { quien: "equipo", nombre: "Merete, ejer", t: "Merete ser månedens resultat", d: "Nye anmeldelser, udgivne svar og kunder, der er kommet igen efter en besked.", boton: "Se resultatet" }
      ],
      final: { antes: "En anmeldelse en gang imellem og julekunder, man aldrig hører fra igen.", ahora: "Nye anmeldelser hver uge, alle besvaret, og kunder, der kommer igen, når der udkommer noget, de kan lide." },
      escena: function (x) {
        var u = UI, movil;
        var spoerg = "Hej Emma. Tak, fordi du kiggede forbi Boghandlen Tidevand i går. Var du glad for besøget, vil du så give os en anmeldelse på Google? Det hjælper andre læsere i byen med at finde os.";
        var svar = "Tusind tak, Emma. Hvor er det dejligt, at <em>Barndom</em> lå klar til dig, og at Nannas anbefaling ramte plet. Kom og fortæl os, hvad du synes, når du har læst den.";
        var anmeldelse = '<div class="caja' + x.n(1) + '"><div class="entre"><strong>Emma Gade</strong>' + u.estrellas(5) + '</div><p>Jeg spurgte efter en bog en torsdag aften, og lørdag lå den klar til mig. Nanna anbefalede mig en til, og jeg er allerede halvvejs. En rigtig boghandel.</p><p class="tenue">Google-anmeldelse · for 15 minutter siden</p></div>';
        if (x.p === 0) {
          movil = u.movil({ quien: "Emmas mobil", app: "wa", sub: "Sms", hora: "11.00", cuerpo:
            u.fecha("Søndag") + u.ellos(spoerg + u.btn("Skriv en anmeldelse", true), "11.00", " anim")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Emmas mobil", app: "wa", sub: "Sms", hora: "11.06", cuerpo:
            u.fecha("Søndag") + u.ellos(spoerg, "11.00") + u.yo("Så er den skrevet. Tak til jer!", "11.06")
          });
        } else {
          var serie = ["Ja, læg en til side", "Jeg kommer torsdag", "Ikke nu"];
          movil = u.movil({ quien: "Jonas' mobil", app: "wa", sub: "Sms", hora: "18.00", cuerpo:
            u.fecha("Marts") +
            u.ellos("Hej Jonas. I december købte du de to første bøger om kriminalassistent Holt. Nu er nummer tre, <strong>Sort tidevand</strong>, udkommet, og Lone Saabye fortæller om den i butikken torsdag kl. 19. Skal vi lægge et eksemplar til side til dig?", "18.00", x.n(2)) +
            (x.p === 2 ? u.respuestas(serie, 0) :
              u.respuestas(serie, null, 0) + u.ellos("Så er den lagt til side til lørdag. Og du er meget velkommen torsdag.", "18.01", " anim"))
          });
        }
        var cuerpo;
        if (x.p === 0) {
          cuerpo = u.kpis([["4,6", "gennemsnit på Google"], ["2", "nye anmeldelser denne måned"]]) +
            '<p class="tenue">I går fik 9 kunder en sms. Alle er medlemmer af kundeklubben og har sagt ja til beskeder.</p>';
        } else if (x.p === 1) {
          cuerpo = '<p class="peq"><strong>Ny anmeldelse</strong></p>' + anmeldelse +
            '<div class="caja caja-ia anim anim-2"><h5>Forslag til svar</h5><p>' + svar + "</p></div>" +
            '<div class="fila">' + u.btn("Udgiv svaret", true) + u.btn("Redigér", false, "sec") + "</div>";
        } else if (x.p === 2) {
          return movil + u.ventana({ quien: "Meretes computer", seccion: "Kundeklub", cuerpo:
            '<div class="entre"><strong>Besked: <em>Sort tidevand</em></strong>' + u.chip("Valgt af Merete", "ok") + "</div>" +
            '<div class="anim">' + u.ficha([
              ["Til hvem", "Medlemmer, der har købt de to første i serien og sagt ja til beskeder"],
              ["Hvor mange", "23 medlemmer"],
              ["Kanal", "Sms eller nyhedsbrevet, alt efter hvad medlemmet har valgt"],
              ["Tilbud", "Et eksemplar lagt til side og arrangementet torsdag"],
              ["Hvornår", "Samme dag, som bogen kommer i butikken"]
            ]) + "</div>" +
            u.nota("Ingen får beskeder, de ikke har sagt ja til, og alle kan afmelde sig ved at svare STOP.")
          });
        } else {
          cuerpo = '<div class="anim">' + u.kpis([["4,7", "gennemsnit på Google"], ["11", "nye anmeldelser denne måned", "ok"], ["11 af 11", "besvaret"], ["8", "reservationer efter beskeden om den nye bog"]]) + "</div>" +
            anmeldelse.replace(" anim", "") +
            '<div class="caja caja-suave"><div class="entre"><strong>Svar fra Boghandlen Tidevand</strong>' + u.chip("Udgivet", "ok") + "</div><p>" + svar + "</p></div>";
        }
        return movil + u.ventana({ quien: "Meretes computer", seccion: "Anmeldelser", cuerpo: cuerpo });
      }
    }
  ]
});
