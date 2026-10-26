/* Demo · Rådgivning og bureau (fiktivt eksempel, dansk version) */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "consultoria",
  etiqueta: "Rådgivning og bureau",
  tipo: "Marketingbureau",
  negocio: "Studio Glød",
  lema: "Marketing og kommunikation for små virksomheder og lokale butikker",
  cliente: "Kunden",
  software: { actual: "jeres projektværktøj (Asana, Trello eller Podio), jeres timeregistrering og Google Drive", medida: "et skræddersyet overblik over kunder, tilbud og godkendelser" },
  marca: {
    m1: "#4A2C5E", m1t: "#FFFFFF", m2: "#FFE1D1", m2t: "#5A2A14", suave: "#F5F0F7", tinta: "#2B1B37",
    fuente: "'Outfit', 'Segoe UI', sans-serif", radio: "10px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#4A2C5E"/><path d="M27 13.6a9 9 0 1 0 0 12.8" fill="none" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round"/><circle cx="27.6" cy="20" r="3" fill="#FFB38A"/></svg>'
  },
  panel: ["Kunder", "Tilbud", "Projekter", "Godkendelser", "Rapporter"],
  situacion: "Seks medarbejdere og omkring 25 kunder på fast månedlig aftale: sociale medier, annoncer og en gang imellem en hjemmeside for mindre virksomheder i området. Næsten alt går over mail, og resten over Messenger og sms.",
  dolores: [
    ["Tilbud, der tager flere dage", "Efter hvert møde sidder nogen og laver et tilbud ved at kopiere det sidste. Imens bliver kunden kold."],
    ["Halve opstarter", "Hver ny kunde bliver sat op i hånden, med spørgeskema, adgange, mapper og opgaver, og der mangler altid noget. Første uge går med at jagte adgangskoder."],
    ["Godkendelser, der forsvinder i indbakken", "»Her er version 3«, svar i en anden tråd og en talebesked på Messenger. Til sidst ved ingen, hvilken version der var den rigtige, eller hvem der sagde ja."],
    ["Rapporter og fakturaer, der æder to dage", "I starten af måneden skal tal fra Meta, Google og hjemmesiden ind i en præsentation, timerne tælles sammen, og fakturaerne laves, kunde for kunde."]
  ],
  casos: [
    {
      id: "propuestas",
      montaje: { plazo: "2-3 uger", con: "Jeres skabeloner og priser, jeres videomødeværktøj og et system til at acceptere tilbud online" },
      nav: "Tilbud",
      titulo: "Tilbud klar samme dag som mødet",
      hoy: "Efter hvert første møde laver nogen et tilbud ud fra det sidste, der blev sendt. Det tager to-tre dage, og bagefter ved ingen, om kunden har læst det.",
      con: "Ud fra det, der blev sagt på mødet, og jeres priser kommer der et udkast. Den, der holdt mødet, gennemgår det, sætter prisen og sender det. Du kan se, når kunden åbner det, og kunden accepterer med ét klik.",
      pasos: [
        { quien: "equipo", nombre: "Ida, partner", t: "Ida har første møde med en mulig kunde", d: "Et videomøde på 40 minutter med Bageriet Holm, et håndværksbageri med to butikker. Med deres samtykke bliver mødet transskriberet, og Ida skriver tre noter.", boton: "Lav tilbuddet" },
        { quien: "auto", t: "Der kommer et udkast med jeres priser", d: "Mål, indhold, periode og pris i jeres skabelon. Det, der ikke passer med det, der blev sagt på mødet, bliver markeret, så Ida kan tage stilling.", boton: "Gennemgå udkastet" },
        { quien: "equipo", nombre: "Ida, partner", t: "Ida justerer prisen og sender tilbuddet", d: "Hun deler tilbuddet op i to muligheder og gemmer webshoppen til senere. Det er hende, der bestemmer prisen, ikke udkastet.", boton: "Send tilbuddet" },
        { quien: "cliente", nombre: "Anders, Bageriet Holm", t: "Anders læser det på mobilen og accepterer", d: "Han vælger en af de to muligheder og accepterer med ét klik. Ida kan se, hvornår han har åbnet det. Går der fem dage uden svar, får hun en påmindelse om at ringe.", boton: "Acceptér tilbuddet" }
      ],
      final: { antes: "To-tre dage per tilbud, kopieret fra det sidste, og ingen anelse om, hvorvidt kunden har læst det.", ahora: "Tilbuddet går ud samme dag som mødet. Ida gennemgår et udkast i stedet for at starte fra bunden, og det er stadig hende, der sætter prisen." },
      escena: function (x) {
        var u = UI;
        if (x.p === 0) {
          return u.ventana({ quien: "Idas computer", seccion: "Tilbud", cuerpo:
            '<div class="entre"><strong>Bageriet Holm · første møde</strong>' + u.chip("I dag kl. 10.00 · 40 min.", "info") + "</div>" +
            u.ficha([["Med", "Anders Holm og hans søster Lise"], ["Virksomhed", "Håndværksbageri med to butikker"], ["Kom via", "Anbefalet af Tandlæge Ravn"]]) +
            '<div class="caja anim"><h5>' + u.icono("mic") + 'Det, der blev sagt</h5><p class="tenue">»Vi vil gerne sælge lagkager på bestilling via hjemmesiden. Lige nu foregår det hele over telefonen.« · »Min søster tager sig af Instagram, når hun har tid.« · »Vi havde tænkt omkring 4.500 kr. om måneden, ikke meget mere.«</p></div>' +
            u.campos([["Idas noter", "Start med sociale medier og lokale annoncer. Begge søskende skal sige ja. De vil gerne i gang før jul."]]) +
            '<div class="fila">' + u.btn("Lav tilbuddet", true) + "</div>"
          });
        }
        if (x.p === 1) {
          return u.ventana({ quien: "Idas computer", seccion: "Tilbud", cuerpo:
            '<div class="entre"><strong>Tilbud til Bageriet Holm</strong>' + u.chip("Udkast", "pend") + "</div>" +
            '<div class="caja caja-ia anim"><h5>Udkastet er klar</h5>' + u.ficha([
              ["Mål", "Sælge lagkager på bestilling via hjemmesiden før jul"],
              ["Indhold", "Sociale medier (12 opslag om måneden) og annoncer på Instagram og Google i lokalområdet"],
              ["Periode", "3 måneder fra 3. november"],
              ["Pris", "5.500 kr. om måneden ekskl. moms efter jeres prisliste"]
            ]) + "</div>" +
            '<div class="anim anim-2">' + u.check([
              ["Prisen er højere end det, de nævnte", "alerta", "Anders talte om ca. 4.500 kr. om måneden. Ida bestemmer."],
              ["Lignende case at vise frem", "ok", "Konditori Myrte, sidste år"],
              ["Startdato", "pend", "Forslag: tirsdag d. 3. november"]
            ]) + "</div>" +
            '<div class="fila">' + u.btn("Gennemgå udkastet", true) + "</div>" +
            u.nota("Udkastet bygger på jeres skabeloner, priser og tidligere tilbud. Intet bliver sendt, før et menneske har gennemgået det.")
          });
        }
        if (x.p === 2) {
          return u.ventana({ quien: "Idas computer", seccion: "Tilbud", cuerpo:
            '<div class="entre"><strong>Tilbud til Bageriet Holm</strong>' + u.chip("Gennemgået af Ida", "ok") + "</div>" +
            '<div class="anim">' + u.tabla(["Mulighed", "Indhold", "Pr. måned"], [
              ["<strong>Sociale medier</strong>", "12 opslag og stories", "3.600 kr."],
              ['<strong>Sociale medier og annoncer</strong><br><span class="tenue">Den, vi anbefaler</span>', "Det hele plus annoncer på Instagram og Google i lokalområdet", "5.200 kr."]
            ], ["", "is-resaltada"]) + "</div>" +
            '<div class="caja caja-suave anim anim-2"><h5>Idas ændringer</h5><p>To muligheder i stedet for én og en justeret pris. Annoncebudgettet kommer oveni, og det bestemmer kunden selv. Webshoppen venter til en fase 2.</p></div>' +
            '<div class="fila">' + u.btn("Send tilbuddet", true) + u.btn("Redigér", false, "sec") + "</div>"
          });
        }
        var movil = u.movil({ quien: "Anders' mobil", hora: x.fin ? "9.12" : "21.32", titulo: "Tilbud til Bageriet Holm", cuerpo:
          '<p class="peq">Hej Anders. Her er det, vi talte om mandag. Vælg den løsning, du foretrækker.</p>' +
          u.campos([["Mulighed", u.opc(["Sociale medier · 3.600 kr./md.", "Sociale medier og annoncer · 5.200 kr./md."], 1)]]) +
          u.ficha([["Periode", "3 måneder fra 3. november"], ["Annoncer", "Oveni, fra 1.000 kr. om måneden. Det bestemmer du."], ["Priser", "Ekskl. moms"], ["Jeres kontakt", "Mikkel, med Laura på design"]]) +
          (x.fin ? '<div class="caja caja-suave anim"><h5>' + u.icono("check") + "Tilbuddet er accepteret</h5><p>Tak, Anders. Du får en mail i dag med de første skridt.</p></div>" :
            u.btn("Acceptér tilbuddet", true, "ancho"))
        });
        var cuerpo = '<div class="entre"><strong>Bageriet Holm</strong>' + (x.fin ? u.chip("Accepteret", "ok") : u.chip("Sendt", "info")) + "</div>" +
          u.agenda([
            ["13.10", "<strong>Tilbud sendt</strong><small>Mandag, samme dag som mødet</small>"],
            ["21.32", "<strong>Anders åbner det</strong><small>Mandag, på mobilen</small>"],
            x.fin ? ["9.12", "<strong>Accepteret: sociale medier og annoncer</strong><small>Tirsdag · opstarten går i gang</small>", "nueva", " anim"] :
              ["Lør.", "<strong>Intet svar? Påmindelse til Ida</strong><small>Om at ringe, ikke om at sende endnu en mail</small>", "libre"]
          ]);
        if (x.fin) cuerpo += u.nota("Det er altid den, der skriver under på tilbuddet, der bestemmer, hvad der bliver tilbudt, og til hvilken pris.");
        return movil + u.ventana({ quien: "Idas computer", seccion: "Tilbud", cuerpo: cuerpo });
      }
    },

    {
      id: "alta",
      montaje: { plazo: "2 uger", con: "Jeres projektværktøj (Asana, Trello eller Podio), Google Drive og jeres kalender" },
      nav: "Nye kunder",
      titulo: "Nye kunder, der kommer i gang af sig selv",
      hoy: "Når en kunde skriver under, sender nogen spørgeskemaet, beder om adgange, opretter mapper og opgaver og finder en tid til opstartsmødet. Der mangler altid noget, og første uge går med at jagte adgangskoder.",
      con: "Når tilbuddet er accepteret, får kunden en velkomst med et spørgeskema og en liste over adgange, som kunden selv giver, uden at sende adgangskoder. Mappen, opgaverne og opstartsmødet bliver oprettet automatisk.",
      pasos: [
        { quien: "auto", t: "Når tilbuddet er accepteret, kommer velkomsten", d: "Anders får en mail om, hvad der sker de første to uger, hvem der er hans kontaktperson, og et link til spørgeskemaet.", boton: "Åbn spørgeskemaet" },
        { quien: "cliente", nombre: "Anders, Bageriet Holm", t: "Anders fortæller om bageriet og giver adgang", d: "Hvem han sælger til, hvad han ikke vil se på sine sociale medier, og hvem der godkender opslagene. Adgang til Instagram og Meta giver han selv fra hver platform: ingen sender adgangskoder.", boton: "Send" },
        { quien: "auto", t: "Mappe, opgaver og opstartsmøde er oprettet", d: "Kundens mappe med spørgeskemaet, opgaverne for de første to uger i jeres projektværktøj og mødet på det tidspunkt, Anders valgte.", boton: "Se, hvad der mangler" },
        { quien: "equipo", nombre: "Mikkel, kundeansvarlig", t: "Mikkel kigger kun på det, der mangler", d: "Adgangen til Google Analytics mangler stadig. Anders får en påmindelse, og Mikkel blander sig kun, hvis den stadig mangler fredag.", boton: "Se resultatet" }
      ],
      final: { antes: "En uges mails for at få spørgeskemaer, adgange og datoer på plads, og opgaver, der afhænger af, hvem der husker dem.", ahora: "Kunden giver det hele ét sted, og teamet møder op til opstartsmødet med mappen og opgaverne klar." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        var status = function (k) {
          return u.check([
            ["Tilbud accepteret", "ok", "Sociale medier og annoncer · 5.200 kr./md."],
            ["Velkomst sendt", "ok", "Med de første to uger forklaret"],
            ["Spørgeskema", k >= 2 ? "ok" : "pend", k >= 2 ? "Udfyldt af Anders" : "Sendt, ikke udfyldt"],
            ["Adgang til Instagram og Meta", k >= 2 ? "ok" : "pend", k >= 2 ? "Givet af Anders fra hver platform" : "Mangler"],
            ["Adgang til Google Analytics", x.fin ? "ok" : "pend", x.fin ? "Givet af Anders torsdag" : k >= 3 ? "Påmindelse sendt. Mangler den fredag, får Mikkel besked." : "Mangler"],
            ["Mappe, opgaver og opstartsmøde", k >= 2 ? "ok" : "pend", k >= 2 ? "Tirsdag d. 3. kl. 10.00 · invitation sendt" : "Bliver oprettet, når spørgeskemaet er udfyldt"]
          ]);
        };
        var cab = '<div class="entre"><strong>Bageriet Holm</strong>' + u.chip("Ny kunde", "marca") + "</div>";
        var hvem = function (t, q) { return t + '<br><span class="tenue">' + q + "</span>"; };
        if (x.p === 0) {
          movil = u.movil({ quien: "Anders' mail", app: "mail", hora: "9.20", cuerpo:
            u.mail({ asunto: "Velkommen: dine første to uger", clase: " anim", cuerpo:
              "<p>Hej Anders</p><p>Tak, fordi du valgte os. Her er, hvad der sker nu:</p><ul><li><strong>Denne uge:</strong> du fortæller om bageriet i et spørgeskema på 10 minutter og giver os adgang til jeres konti.</li><li><strong>Tirsdag d. 3.:</strong> opstartsmøde med Mikkel, der er din kontaktperson.</li><li><strong>Uge 2:</strong> den første opslagsplan, som du godkender.</li></ul>" +
              "<p>" + u.btn("Åbn spørgeskemaet", true) + "</p>" })
          });
          cuerpo = cab + status(0);
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Anders' mobil", hora: "9.31", titulo: "Før vi går i gang", cuerpo:
            '<p class="peq">Det tager 10 minutter. Det, du skriver her, læser hele teamet.</p>' +
            u.campos([
              ["Hvad sælger du, og til hvem?", "Surdejsbrød og lagkager. Folk fra kvarteret og nogle virksomheder, der køber morgenbrød."],
              ["Hvad vil du ikke se på dine sociale medier?", "Stockfotos og vilde tilbud."],
              ["Hvem godkender opslagene?", "Mig. Er jeg her ikke, så min søster Lise."],
              ["Opstartsmøde", u.opc(["Tir. 3. · 10.00", "Tir. 3. · 16.00", "Ons. 4. · 10.00"], 0)]
            ]) +
            '<p class="peq"><strong>Adgange</strong></p>' +
            u.check([
              ["Instagram", "ok", "Adgang givet via Meta Business"],
              ["Meta Business", "ok", "Partneradgang givet"],
              ["Google Analytics", "pend", "Det gør jeg senere"]
            ]) +
            u.btn("Send", true, "ancho")
          });
          cuerpo = cab + status(1);
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Anders' mail", app: "mail", hora: "9.33", cuerpo:
            u.mail({ asunto: "Opstartsmøde · tirsdag d. 3. kl. 10.00", clase: " anim", cuerpo:
              "<p>Hej Anders</p><p>Tak for svarene. Vi ses <strong>tirsdag d. 3. november kl. 10.00</strong> i bageriet med Mikkel og Laura.</p><p>Vi mangler kun adgangen til Google Analytics. Her er en vejledning: det tager to minutter.</p>" })
          });
          cuerpo = '<div class="entre"><strong>Bageriet Holm · opstart</strong>' + u.chip("Oprettet automatisk", "ok") + "</div>" +
            '<div class="caja anim"><h5>' + u.icono("doc") + 'Kundens mappe</h5><ul class="lista-simple">' +
              "<li><span>01 Accepteret tilbud</span><span class=\"tenue\">PDF</span></li>" +
              "<li><span>02 Spørgeskema</span><span class=\"tenue\">Fra Anders</span></li>" +
              "<li><span>03 Brand: logoer og fotos</span><span class=\"tenue\">Hentes ved opstarten</span></li>" +
              "<li><span>04 Rapporter</span><span class=\"tenue\">Tom</span></li>" +
            "</ul></div>" +
            '<div class="anim anim-2">' + u.tabla(["Opgave", "Frist"], [
              [hvem("Læs spørgeskemaet", "Mikkel"), "Mandag d. 2."],
              [hvem("Gennemgå de nuværende sociale medier", "Laura"), "Mandag d. 2."],
              [hvem("Opstartsmøde", "Mikkel og Laura"), "Tirsdag d. 3."],
              [hvem("Første opslagsplan", "Laura"), "Fredag d. 6."]
            ]) + "</div>";
        } else {
          var chat = u.fecha("Torsdag") +
            u.ellos("Hej Anders. Til din første rapport mangler vi adgang til <strong>Google Analytics</strong>. Det tager to minutter." + u.btn("Se vejledningen", false), "10.00", x.n(3));
          if (x.fin) chat += u.yo("Så er det klaret", "12.41") + u.ellos("Modtaget, tak. Vi ses på tirsdag!", "12.42", " anim");
          movil = u.movil({ quien: "Anders' mobil", app: "wa", sub: "Sms", hora: x.fin ? "12.42" : "10.00", cuerpo: chat });
          cuerpo = cab + status(3) + u.nota("Adgangskoder bliver aldrig sendt på mail: kunden giver hver adgang fra sin egen konto og kan fjerne den, når som helst.");
        }
        return movil + u.ventana({ quien: "Mikkels computer", seccion: x.p === 2 ? "Projekter" : "Kunder", cuerpo: cuerpo });
      }
    },

    {
      id: "aprobaciones",
      montaje: { plazo: "3-4 uger", con: "En kundeportal på nettet uden downloads og jeres værktøj til at planlægge opslag" },
      nav: "Godkendelser",
      titulo: "Kundernes godkendelser samlet ét sted i kundeportalen",
      hoy: "Design og tekster bliver sendt på mail, kunden svarer i en anden tråd eller på Messenger, og til sidst ved ingen, hvilken version der er den rigtige, eller hvem der sagde ja.",
      con: "Kunden ser hvert opslag i kundeportalen, kommenterer direkte på det og godkender med ét klik. Hver ændring får sin egen version, og intet bliver planlagt uden godkendelse.",
      pasos: [
        { quien: "equipo", nombre: "Laura, design", t: "Laura lægger ugens opslag op", d: "Tre opslag til Bageriet Holms Instagram. Når de er lagt op, får Anders en besked med et link.", boton: "Send til Anders" },
        { quien: "cliente", nombre: "Anders, Bageriet Holm", t: "Anders kommenterer på hvert opslag", d: "Han ser dem på mobilen, godkender to og beder om en rettelse i det tredje: prisen på drømmekagen er forkert.", boton: "Bed om en rettelse" },
        { quien: "equipo", nombre: "Laura, design", t: "Rettelsen lander hos Laura som en opgave", d: "Med kommentaren, opslaget og dagen, det skal ud. Laura retter prisen og lægger version 2 op.", boton: "Læg version 2 op" },
        { quien: "cliente", nombre: "Anders, Bageriet Holm", t: "Anders godkender, og det bliver gemt", d: "Han får en besked, ser den nye version og godkender den. Det bliver gemt, hvem der godkendte hvilken version og hvornår, og de tre opslag bliver planlagt.", boton: "Godkend" }
      ],
      final: { antes: "Mailtråde med versioner på kryds og tværs, talebeskeder på Messenger og et opslag, der røg ud med en fejl, som allerede var rettet.", ahora: "Hvert opslag har sit link, sine kommentarer og sine versioner. Det, der bliver udgivet, er det, kunden har godkendt." },
      escena: function (x) {
        var u = UI, movil;
        var t1 = ["#C99A5B", "#7A4F22"], t2 = ["#B98E6E", "#5E3B22"], t3 = ["#C46A85", "#7A2E46"];
        var opslag = function (tono, txt, clase) { return u.foto(tono, '<span class="peq"><strong>' + txt + "</strong></span>", clase); };
        var udgives = function (t, d) { return t + '<br><span class="tenue">Udgives ' + d.toLowerCase() + "</span>"; };
        var pie = function (dag, txt) { return '<p class="peq"><strong>' + dag + "</strong> · " + txt + "</p>"; };
        if (x.p === 0) {
          return u.ventana({ quien: "Lauras computer", seccion: "Godkendelser", cuerpo:
            '<div class="entre"><strong>Bageriet Holm · uge 46</strong>' + u.chip("3 opslag", "info") + "</div>" +
            '<div class="dos">' +
              "<div>" + opslag(t1, "Surdej indefra") + pie("Mandag d. 9.", "48 timers hævning") + "</div>" +
              "<div>" + opslag(t2, "Bestil julekringlen") + pie("Onsdag d. 11.", "Julebestillinger") + "</div>" +
              "<div>" + opslag(t3, "Drømmekage · 85 kr.") + pie("Fredag d. 13.", "Ugens kage") + "</div>" +
            "</div>" +
            u.campos([["Besked til Anders", "Opslagene til næste uge. Gerne inden torsdag, hvis du kan."]]) +
            '<div class="fila">' + u.btn("Send til Anders", true) + "</div>"
          });
        }
        if (x.p === 1) {
          movil = u.movil({ quien: "Anders' mobil", hora: "19.42", titulo: "Til godkendelse", cuerpo:
            '<p class="peq">Laura har sendt dig 3 opslag til uge 46.</p>' +
            opslag(t1, "Surdej indefra") + '<div class="entre">' + pie("Mandag d. 9.", "surdej") + u.chip("Godkendt", "ok") + "</div>" +
            opslag(t2, "Bestil julekringlen") + '<div class="entre">' + pie("Onsdag d. 11.", "jul") + u.chip("Godkendt", "ok") + "</div>" +
            opslag(t3, "Drømmekage · 85 kr.") + pie("Fredag d. 13.", "ugens kage") +
            u.campos([["Din kommentar", "En hel drømmekage koster 95 kr., ikke 85 kr."]]) +
            u.btn("Bed om en rettelse", true, "ancho")
          });
          return movil + u.ventana({ quien: "Lauras computer", seccion: "Godkendelser", cuerpo:
            '<div class="entre"><strong>Bageriet Holm · uge 46</strong>' + u.chip("Sendt til Anders", "ok") + "</div>" +
            u.tabla(["Opslag", "Status"], [
              [udgives("Surdej indefra", "Mandag d. 9."), u.chip("Afventer", "pend")],
              [udgives("Bestil julekringlen", "Onsdag d. 11."), u.chip("Afventer", "pend")],
              [udgives("Drømmekage", "Fredag d. 13."), u.chip("Afventer", "pend")]
            ])
          });
        }
        if (x.p === 2) {
          return u.ventana({ quien: "Lauras computer", seccion: "Godkendelser", cuerpo:
            '<div class="entre"><strong>Drømmekage · fredag d. 13.</strong>' + u.chip("Rettelse ønsket", "alerta") + "</div>" +
            '<div class="caja anim"><h5>' + u.icono("chat") + "Kommentar fra Anders</h5><p>»En hel drømmekage koster 95 kr., ikke 85 kr.«</p><p class=\"tenue\">Til version 1 · mandag kl. 19.42</p></div>" +
            '<div class="dos anim anim-2">' +
              "<div>" + opslag(t3, "Drømmekage · 85 kr.") + '<p class="peq tenue">Version 1</p></div>' +
              "<div>" + opslag(t3, "Drømmekage · 95 kr.") + '<p class="peq"><strong>Version 2</strong> · prisen er rettet</p></div>' +
            "</div>" +
            u.tabla(["Opslag", "Udgives", "Status"], [
              ["Surdej indefra", "Mandag d. 9.", u.chip("Godkendt", "ok")],
              ["Bestil julekringlen", "Onsdag d. 11.", u.chip("Godkendt", "ok")],
              ["Drømmekage", "Fredag d. 13.", u.chip("Rettelse ønsket", "alerta")]
            ], ["", "", "is-resaltada"]) +
            '<div class="fila">' + u.btn("Læg version 2 op", true) + "</div>"
          });
        }
        movil = u.movil({ quien: "Anders' mobil", hora: x.fin ? "9.31" : "9.16", titulo: "Til godkendelse", cuerpo:
          u.aviso("Studio Glød", "Laura har lagt version 2 af fredagens opslag op.", x.n(3)) +
          opslag(t3, "Drømmekage · 95 kr.") +
          pie("Fredag d. 13.", "version 2 med den rettede pris") +
          (x.fin ? '<div class="caja caja-suave anim"><h5>' + u.icono("check") + "Godkendt</h5><p>Udgives fredag d. 13. kl. 12.00.</p></div>" : u.btn("Godkend", true, "ancho"))
        });
        var cuerpo = '<div class="entre"><strong>Bageriet Holm · uge 46</strong>' + (x.fin ? u.chip("Alle 3 er planlagt", "ok") : u.chip("1 venter på Anders", "pend")) + "</div>" +
          u.agenda([
            ["10.02", "<strong>Laura lægger 3 opslag op</strong><small>Mandag · version 1</small>"],
            ["19.40", "<strong>Anders godkender 2</strong><small>Mandag · surdej og julekringle</small>"],
            ["19.42", "<strong>Anders beder om en rettelse</strong><small>Mandag · prisen på drømmekagen</small>"],
            ["9.15", "<strong>Laura lægger version 2 op</strong><small>Tirsdag · prisen er rettet</small>"],
            x.fin ? ["9.31", "<strong>Anders godkender version 2</strong><small>Tirsdag · alle 3 bliver planlagt</small>", "nueva", " anim"] :
              ["", "<strong>Venter på Anders</strong><small>Version 2 af drømmekagen</small>", "libre"]
          ]);
        if (x.fin) cuerpo += u.nota("Intet bliver planlagt uden kundens godkendelse, og det bliver gemt, hvem der godkendte hver version.");
        return movil + u.ventana({ quien: "Lauras computer", seccion: "Godkendelser", cuerpo: cuerpo });
      }
    },

    {
      id: "informes",
      montaje: { plazo: "3-4 uger", con: "Forbindelse til Meta, Google Ads og Google Analytics, jeres timeregistrering, e-conomic og jeres rapportskabelon" },
      nav: "Månedsrapporter",
      titulo: "Månedsrapporter, der bygger sig selv, og som et menneske gennemgår",
      hoy: "I starten af måneden bruger nogen to dage på at hente tal fra Meta, Google og hjemmesiden for hver kunde, sætte dem ind i en præsentation, skrive konklusioner og tælle timer sammen til fakturaen.",
      con: "Den 1. bliver hver kundes tal hentet, og rapporten bliver bygget i jeres format sammen med månedens timer. Et resumé bliver foreslået automatisk, og den kundeansvarlige retter det, tilføjer sin vurdering og sender det. Fakturaen ligger klar som kladde i e-conomic.",
      pasos: [
        { quien: "auto", t: "Den 1. bliver tallene hentet", d: "Fra Instagram, annoncerne på Meta og Google og hjemmesiden for hver af jeres 25 kunder, og timerne fra timeregistreringen. Er en forbindelse faldet ud, får I besked.", boton: "Byg rapporterne" },
        { quien: "auto", t: "Rapporten bliver bygget med et forslag til resumé", d: "I jeres format og sammenlignet med måneden før. Resuméet er et AI-forslag ud fra tallene og ligger som udkast.", boton: "Gennemgå rapporten" },
        { quien: "equipo", nombre: "Mikkel, kundeansvarlig", t: "Mikkel gennemgår den og tilføjer det, kun han ved", d: "Han retter en konklusion: en del af stigningen kom fra efterårsmarkedet på torvet d. 17., ikke fra annoncerne. Og han skriver, hvad han foreslår for november.", boton: "Send til Karen" },
        { quien: "cliente", nombre: "Karen, Konditori Myrte", t: "Karen får det vigtigste i en mail", d: "Tre tal og Mikkels forslag, kort og godt. Hele rapporten er vedhæftet, hvis hun vil se detaljerne, og fakturaen for oktober ligger klar i e-conomic.", boton: "Se resultatet" }
      ],
      final: { antes: "To dage med copy-paste i starten af måneden, timer, der skal tælles sammen, og konklusioner skrevet i en fart.", ahora: "Rapporterne er klar den 1., og timerne ligger på fakturakladden. Tiden går med at gennemgå dem og tænke over næste måned." },
      escena: function (x) {
        var u = UI, cuerpo;
        var gennemgas = function (k, q) { return k + '<br><span class="tenue">Gennemgås af ' + q + "</span>"; };
        var tal = [["41", "bestillinger via hjemmesiden"], ["+18 %", "besøg på hjemmesiden"], ["31,50 kr.", "pr. bestilling via annoncer"]];
        if (x.p === 0) {
          return u.ventana({ quien: "Mikkels computer", seccion: "Rapporter", cuerpo:
            '<div class="entre"><strong>Rapporter for oktober</strong>' + u.chip("1. november kl. 7.00", "info") + "</div>" +
            '<div class="anim">' + u.barra(23, 25, "Kunder med hentede tal") + "</div>" +
            u.tabla(["Kunde", "Tal fra", "Status"], [
              ["Konditori Myrte", "Instagram, Meta- og Google-annoncer, hjemmeside", u.chip("Hentet", "ok")],
              ["Tandlæge Ravn", "Google-annoncer og hjemmeside", u.chip("Hentet", "ok")],
              ["Egelund Kro", "Instagram og Meta-annoncer", u.chip("Meta skal forbindes igen", "alerta")],
              ["Form Fitness", "Instagram og hjemmeside", u.chip("Hentet", "ok")]
            ], ["", "", "is-resaltada"]) +
            '<div class="fila">' + u.btn("Byg rapporterne", true) + "</div>"
          });
        }
        if (x.p === 1) {
          return u.ventana({ quien: "Mikkels computer", seccion: "Rapporter", cuerpo:
            '<div class="entre"><strong>Konditori Myrte · oktober</strong>' + u.chip("Udkast", "pend") + "</div>" +
            '<div class="anim">' + u.kpis(tal) + "</div>" +
            u.grafico([3.1, 3.4, 3.3, 4.2, 5.0], ["Jun.", "Jul.", "Aug.", "Sep.", "Okt."], "Gennemsnitligt engagement på Instagram (%)") +
            '<div class="caja caja-ia anim anim-2"><h5>Forslag til resumé</h5><p>Oktober var årets bedste måned for bestillinger via hjemmesiden: 41, ni flere end i september. Besøgene på hjemmesiden steg 18 %, og Instagram-annoncerne gav flest bestillinger.</p></div>' +
            '<div class="fila">' + u.btn("Gennemgå rapporten", true) + "</div>"
          });
        }
        if (x.p === 2) {
          return u.ventana({ quien: "Mikkels computer", seccion: "Rapporter", cuerpo:
            '<div class="entre"><strong>Konditori Myrte · oktober</strong>' + u.chip("Gennemgået af Mikkel", "ok") + "</div>" +
            u.kpis(tal) +
            '<div class="caja caja-suave anim"><h5>Mikkels resumé</h5><p>Oktober var årets bedste måned for bestillinger via hjemmesiden: 41, ni flere end i september. Men en del af stigningen kom fra efterårsmarkedet på torvet d. 17., ikke kun fra annoncerne.</p><p>I november foreslår vi, at vi går i gang med julebestillingerne allerede fra d. 15.</p></div>' +
            '<div class="anim anim-2">' + u.check([
              ["Rettet: hvor besøgene kommer fra", "ok", "Efterårsmarkedet d. 17. gav besøg, der ikke kom fra annoncer"],
              ["Tilføjet: forslag til november", "ok", "Kampagne for julebestillinger"],
              ["Timer i oktober: 22 af 24 i aftalen", "ok", "Fra timeregistreringen · ingen ekstra timer at fakturere"]
            ]) + "</div>" +
            '<div class="fila">' + u.btn("Send til Karen", true) + u.btn("Redigér", false, "sec") + "</div>"
          });
        }
        var movil = u.movil({ quien: "Karens mail", app: "mail", hora: "11.05", cuerpo:
          u.mail({ asunto: "Din rapport for oktober", clase: x.n(3), cuerpo:
            "<p>Hej Karen</p><p>Det vigtigste fra måneden, kort og godt:</p>" +
            u.kpis([["41", "bestillinger via hjemmesiden"], ["+18 %", "besøg på hjemmesiden"]]) +
            "<p>Det var årets bedste måned for bestillinger. En del af stigningen kom fra efterårsmarkedet d. 17. I november foreslår vi, at vi går i gang med julebestillingerne nu. Skal vi tage en snak om det på torsdag?</p><p>Mikkel</p><p class=\"tenue\">Vedhæftet: Myrte-oktober.pdf</p>" })
        });
        cuerpo = '<div class="anim">' + u.kpis([["21 af 25", "gennemgået og sendt", "ok"], ["2", "under gennemgang"], ["2", "venter på tal", "alerta"]]) + "</div>" +
          u.tabla(["Kunde", "Status"], [
            [gennemgas("Konditori Myrte", "Mikkel"), u.chip("Sendt", "ok")],
            [gennemgas("Tandlæge Ravn", "Ida"), u.chip("Sendt", "ok")],
            [gennemgas("Form Fitness", "Ida"), u.chip("Under gennemgang", "pend")],
            [gennemgas("Egelund Kro", "Mikkel"), u.chip("Mangler tal", "alerta")]
          ], ["is-resaltada"]) +
          '<div class="caja caja-suave anim anim-2"><h5>' + u.icono("doc") + "Fakturakladder i e-conomic</h5><p>21 fakturaer for oktober ligger klar med den faste månedspris og eventuelle ekstra timer. Ida godkender og sender dem.</p></div>" +
          u.nota("Tallene kommer fra hver platform. Konklusionerne og forslaget til næste måned bliver skrevet eller gennemgået af den kundeansvarlige.");
        return movil + u.ventana({ quien: "Mikkels computer", seccion: "Rapporter", cuerpo: cuerpo });
      }
    }
  ]
});
