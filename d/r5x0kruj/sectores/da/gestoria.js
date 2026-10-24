/* Demo · Bogholderi og regnskab (fiktivt eksempel, dansk version) */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "gestoria",
  etiqueta: "Bogholderi og revisor",
  tipo: "Bogholderi og regnskab",
  negocio: "Ravn Regnskab",
  lema: "Bogføring, moms og årsregnskab siden 1998",
  cliente: "Kunden",
  software: { actual: "jeres regnskabsprogram (fx e-conomic eller Dinero) og jeres kundeportal", medida: "en kundeportal og et kontrolpanel" },
  marca: {
    m1: "#1F3A5F", m1t: "#FFFFFF", m2: "#E6DDBF", m2t: "#1F3A5F", suave: "#F2F4F8", tinta: "#1B2533",
    fuente: "'Lora', Georgia, serif", radio: "6px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="8" fill="#1F3A5F"/><path d="M13 30V10h8.5a6 6 0 0 1 0 12H13m7.5 0 7 8" fill="none" stroke="#C9A227" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  panel: ["Kvartalsafslutning", "Kunder", "Bilag", "Spørgsmål", "Nye kunder"],
  situacion: "Fem medarbejdere klarer bogføring, moms og løn for omkring 140 selvstændige og små virksomheder. Hvert kvartal starter det samme ræs mod momsfristen.",
  dolores: [
    ["Jagten på bilag", "Hvert kvartal skriver I til 140 kunder én for én for at få fakturaer og kontoudtog. Og et regneark holder styr på, hvem der mangler."],
    ["Bilag i alle formater", "Fotos af kvitteringer, PDF'er, krøllede papirer. En medarbejder taster dem ind i regnskabsprogrammet ét for ét."],
    ["De samme spørgsmål", "»Hvornår skal momsen være betalt?« »Kan jeg trække bilen fra?« På alle tider af døgnet og på sms."],
    ["Nye kunder tager tid", "Det kræver en håndfuld mails at få en ny kunde på plads, og der mangler altid et papir."]
  ],
  casos: [
    {
      id: "cierre",
      montaje: { plazo: "2-3 uger", con: "Jeres kundeportal eller en ny, med sms og mail" },
      nav: "Kvartalets bilag",
      titulo: "Kvartalets bilag, uden at jagte nogen",
      hoy: "Anne sender 140 beskeder én for én og noterer i et regneark, hvem der har sendt hvad. Dagene før fristen er et ræs.",
      con: "Hver kunde får sin egen liste og et link til sin side. Påmindelserne sendes automatisk og beder kun om det, der mangler.",
      ganas: ["Du slipper for at jagte kunder", "Du ser med det samme, hvem der mangler", "Mindre travlhed op til fristen"],
      pasos: [
        { quien: "auto", t: "Den 1. oktober får alle besked", d: "Hver kunde får at vide, præcis hvad der skal bruges. Mads, der er selvstændig VVS'er, bliver bedt om salgsfakturaer, købsbilag og kontoudtog fra banken.", boton: "Mads åbner sin side" },
        { quien: "cliente", nombre: "Mads, selvstændig", t: "Mads uploader det, han har, fra mobilen", d: "Han tager billeder eller uploader PDF'er. Bogholderiet ser det med det samme i kontrolpanelet uden at lede i mails og beskeder.", boton: "Upload bilagene" },
        { quien: "auto", t: "Påmindelsen beder kun om det, der mangler", d: "Fem dage senere får Mads en besked med det eneste, han mangler: kontoudtoget for september.", boton: "Mads uploader kontoudtoget" },
        { quien: "equipo", nombre: "Anne, bogholder", t: "Anne ser, hvem der er klar, og hvem der ikke er", d: "I stedet for at gå 140 samtaler igennem kigger hun på én liste. Hun skal kun ringe til de få, der ikke svarer.", boton: "Se resultatet" }
      ],
      final: { antes: "140 beskeder i hånden, et regneark og opkald de sidste dage.", ahora: "De fleste uploader selv, og Anne ringer kun til 6 kunder." },
      escena: function (x) {
        var u = UI, movil;
        var docs = function (a, b, c) {
          return u.check([
            ["Salgsfakturaer (juli-september)", a ? "ok" : "pend", a ? "3 filer uploadet" : ""],
            ["Købsbilag", b ? "ok" : "pend", b ? "11 billeder uploadet" : ""],
            ["Kontoudtog for september", c ? "ok" : "pend", c ? "1 PDF uploadet" : ""]
          ]);
        };
        if (x.p === 0) {
          movil = u.movil({ quien: "Mads' mobil", app: "wa", hora: "9.00", cuerpo:
            u.fecha("1. okt.") +
            u.ellos("Hej Mads. <strong>3. kvartal</strong> er slut, og vi går i gang med din moms. Vi skal bruge:<br>· Salgsfakturaer fra juli til september<br>· Købsbilag<br>· Kontoudtog fra banken<br><br>Send dem senest <strong>25. okt.</strong>" + u.btn("Åbn min side", true), "9.00", " anim")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Mads' mobil", hora: "19.40", titulo: "Min side", cuerpo:
            '<div class="caja caja-suave"><strong>Moms for 3. kvartal</strong><p class="tenue">Send bilag senest 25. okt.</p></div>' +
            docs(false, false, false) +
            '<div class="dos">' + u.btn(u.icono("camara") + "Tag billede", false, "sec") + u.btn(u.icono("subir") + "Upload fil", false, "sec") + "</div>" +
            u.btn("Upload bilagene", true, "ancho")
          });
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Mads' mobil", app: "wa", hora: "9.00", cuerpo:
            u.fecha("6. okt.") +
            u.ellos("Hej Mads. Tak for fakturaerne. <strong>Vi mangler kun kontoudtoget for september.</strong> Du kan uploade det her inden 25. okt." + u.btn("Upload kontoudtoget", true), "9.00", " anim")
          });
        } else {
          movil = u.movil({ quien: "Mads' mobil", hora: "9.12", titulo: "Min side", cuerpo:
            '<div class="caja caja-suave"><strong>Moms for 3. kvartal</strong><p class="tenue">Send bilag senest 25. okt.</p></div>' +
            '<div class="anim">' + docs(true, true, true) + "</div>" +
            '<div class="caja anim anim-2"><h5>' + u.icono("check") + "Du har sendt det hele</h5><p>Anne laver din momsangivelse og giver dig besked, før den sendes til SKAT.</p></div>"
          });
        }

        var filaMads = x.p === 0 ? ["Mads Kjeldsen", "VVS · enkeltmandsvirksomhed", "0 af 3", u.chip("Besked sendt", "info")]
          : x.p === 1 ? ["Mads Kjeldsen", "VVS · enkeltmandsvirksomhed", "2 af 3", u.chip("Mangler kontoudtog", "pend")]
          : x.p === 2 ? ["Mads Kjeldsen", "VVS · enkeltmandsvirksomhed", "2 af 3", u.chip("Påmindelse sendt", "info")]
          : ["Mads Kjeldsen", "VVS · enkeltmandsvirksomhed", "3 af 3", u.chip("Komplet", "ok")];
        var listos = [0, 61, 98, 134][x.p];
        var cuerpo = u.barra(listos, 140, "Kunder med alle bilag") +
          u.kpis([["140", "beskeder sendt"], [String(listos), "komplette", "ok"], [String(140 - listos), "mangler noget"]]);
        if (x.p < 3) {
          cuerpo += u.tabla(["Kunde", "Branche", "Bilag", "Status"], [
            filaMads,
            ["Sofie Lund", "Frisør · enkeltmandsvirksomhed", x.p ? "3 af 3" : "0 af 3", x.p ? u.chip("Komplet", "ok") : u.chip("Besked sendt", "info")],
            ["Holm Autoværksted ApS", "Autoværksted", x.p > 1 ? "4 af 4" : "1 af 4", x.p > 1 ? u.chip("Komplet", "ok") : u.chip("Mangler 3", "pend")],
            ["Ida Thomsen", "Grafisk designer · enkeltmandsvirksomhed", "0 af 3", u.chip(x.p ? "Påmindelse sendt" : "Besked sendt", "info")]
          ], ["is-resaltada"]);
        } else {
          cuerpo += '<p class="peq anim"><strong>Påmindelserne var ikke nok for disse 6</strong></p>' +
            '<div class="anim">' + u.tabla(["Kunde", "Mangler", "Påmindelser", ""], [
              ["Ida Thomsen", "Alt", "3", u.btn(u.icono("telefono") + "Ring op", false, "sec")],
              ["Brdr. Kjær I/S", "Købsbilag", "3", u.btn(u.icono("telefono") + "Ring op", false, "sec")],
              ["Jonas Berg", "Kontoudtog", "3", u.btn(u.icono("telefono") + "Ring op", false, "sec")]
            ]) + '</div><p class="tenue">Og 3 mere.</p>';
        }
        return movil + u.ventana({ quien: "Annes computer", seccion: "Kvartalsafslutning", cuerpo: cuerpo });
      }
    },

    {
      id: "facturas",
      montaje: { plazo: "3-4 uger", con: "Eksporterer direkte til e-conomic, Dinero eller Billy" },
      nav: "Bilag, der læser sig selv",
      titulo: "Købsbilag, der læser sig selv",
      hoy: "Kunderne sender billeder af kvitteringer og PDF'er. En fra bogholderiet åbner dem én ad gangen og taster tallene ind i regnskabsprogrammet.",
      con: "Hvert bilag bliver læst, så snart det kommer ind: leverandør, CVR-nr., dato, beløb, moms og total, med et forslag til konto. Bogholderiet kigger kun på dem, der er tvivl om.",
      ganas: ["Langt mindre indtastning", "Færre tastefejl", "Tvivlsspørgsmål bliver markeret"],
      pasos: [
        { quien: "cliente", nombre: "Mads, selvstændig", t: "Mads tager et billede af kvitteringen", d: "Fra sin side eller ved at videresende den i en besked. Han skal ikke sortere noget.", boton: "Send billedet" },
        { quien: "auto", t: "Tallene bliver hentet ud automatisk", d: "Bilaget bliver læst, og bogføringsdata udfyldes med en konto, der passer til Mads' branche.", boton: "Se indbakken" },
        { quien: "equipo", nombre: "Bogholderiet", t: "Bogholderiet kigger kun på tvivlstilfældene", d: "Af 46 bilag er 41 helt klare. De 5 tvivlstilfælde har en begrundelse: en bon uden CVR-nr., moms der ikke stemmer, en middag der kan være privat.", boton: "Tjek tvivlstilfældet" },
        { quien: "equipo", nombre: "Bogholderiet", t: "Alt ryger over i regnskabsprogrammet", d: "Med ét klik bliver posteringerne sendt til e-conomic. Ingen har tastet et eneste bilag.", boton: "Se resultatet" }
      ],
      final: { antes: "Timevis af indtastning hvert kvartal og fejl, når tallene skulle skrives af.", ahora: "Bilagene kommer ind færdiglæste, og bogholderiet bruger tiden på de 5, der er tvivl om." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        var recibo = u.recibo({ comercio: "VVS-GROSSISTEN NORD", dato: "CVR 31 24 56 78 · 12.09.2026", lineas: [["Alupex-rør 20 mm", "289,00"], ["Messingvinkler x12", "198,00"], ["Teflontape x6", "110,75"]], total: "597,75 kr." });
        if (x.p === 0) {
          movil = u.movil({ quien: "Mads' mobil", hora: "13.10", titulo: "Upload udgift", cuerpo:
            '<div class="caja caja-suave" style="display:grid;place-items:center;padding:22px 10px">' + recibo + "</div>" +
            '<p class="tenue">Billedet er klar. Du skal ikke udfylde noget.</p>' +
            u.btn(u.icono("enviar") + "Send til bogholderiet", true, "ancho")
          });
          cuerpo = u.kpis([["45", "bilag modtaget i kvartalet"], ["40", "klar"], ["5", "tvivlstilfælde", "alerta"]]) +
            '<p class="tenue">Venter på nye bilag …</p>';
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Mads' mobil", hora: "13.10", titulo: "Upload udgift", cuerpo:
            '<div class="caja caja-suave"><h5>' + u.icono("check") + "Modtaget</h5><p>VVS-Grossisten Nord · 597,75 kr.</p></div>"
          });
          cuerpo = '<div class="dos"><div style="display:grid;place-items:center">' + recibo + "</div>" +
            '<div class="anim">' + u.ficha([
              ["Leverandør", "VVS-Grossisten Nord"], ["CVR-nr.", "31 24 56 78"], ["Dato", "12.09.2026"],
              ["Beløb ekskl. moms", "478,20 kr."], ["Moms 25 %", "119,55 kr."], ["Total", "597,75 kr."],
              ["Foreslået konto", "Materialer til opgaver"]
            ]) + "</div></div>" +
            '<div class="fila anim anim-2">' + u.chip("Tydeligt bilag", "ok") + u.chip("Beløb + moms stemmer", "ok") + "</div>" +
            '<div class="fila">' + u.btn("Se indbakken", true) + "</div>";
        } else if (x.p === 2) {
          cuerpo = u.kpis([["46", "bilag modtaget"], ["41", "klar", "ok"], ["5", "tvivlstilfælde", "alerta"]]) +
            u.tabla(["Leverandør", "Total", "Begrundelse", ""], [
              ["Restaurant Havnen", "642,00 kr.", u.chip("Forretningsmiddag eller privat?", "pend"), u.btn("Tjek", true, "sec")],
              ["Tankstation", "450,00 kr.", u.chip("Bon uden CVR-nr.", "pend"), ""],
              ["Webshop", "149,00 kr.", u.chip("Momsen stemmer ikke", "pend"), ""],
              ["VVS-Grossisten Nord", "597,75 kr.", u.chip("Klar", "ok"), ""]
            ], ["is-resaltada"]);
          movil = "";
        } else {
          cuerpo = u.kpis([["46", "bilag modtaget"], ["46", "gennemgået", "ok"], ["0", "tastet i hånden"]]) +
            '<div class="caja caja-suave anim"><h5>' + u.icono("descarga") + "Sendt til e-conomic</h5><p>46 posteringer for Mads Kjeldsen · 3. kvartal. Klar til momsangivelsen.</p></div>" +
            u.nota("Tvivlstilfælde bliver aldrig bogført automatisk: det afgør en fra bogholderiet.");
          movil = "";
        }
        if (x.p === 2) {
          cuerpo += '<div class="caja caja-alerta anim"><h5>' + u.icono("alerta") + "Restaurant Havnen · 642,00 kr.</h5><p>Tirsdag kl. 12.30, to frokostretter. Mads har ikke skrevet, hvem han spiste med. Er det en forretningsmiddag, kan han kun trække 25 % af momsen fra. Er det privat, intet.</p></div>" +
            u.respuestas(["Forretningsmiddag", "Privat udgift", "Spørg Mads"], null);
        }
        return movil + u.ventana({ quien: "Bogholderiets computer", seccion: "Bilag", cuerpo: cuerpo });
      }
    },

    {
      id: "consultas",
      montaje: { plazo: "2 uger", con: "Sms eller chat og hver kundes egne frister" },
      nav: "Spørgsmål fra kunder",
      titulo: "De faste spørgsmål, besvaret på alle tider af døgnet",
      hoy: "De samme spørgsmål tikker ind på sms på alle tider af døgnet. Hvert svar afbryder arbejdet, og rådgivning blandes sammen med alt det andet.",
      con: "En assistent svarer på de generelle spørgsmål med bogholderiets og kundens egne oplysninger. Det, der kræver rådgivning, går videre til Anne med et resumé.",
      ganas: ["Færre afbrydelser", "Svar med det samme", "Rådgivningen kommer stadig fra Anne"],
      pasos: [
        { quien: "cliente", nombre: "Sofie, frisør", t: "Sofie spørger kl. 22.40", d: "Et spørgsmål om frister, som kommer hundredvis af gange hvert kvartal.", boton: "Send spørgsmålet" },
        { quien: "auto", t: "Svar med det samme, med hendes egne tal", d: "Det er ikke et standardsvar: assistenten ved, at bogholderiet indberetter Sofies moms, og at hun mangler et bilag.", boton: "Stil et sværere spørgsmål" },
        { quien: "auto", t: "Rådgivning går videre til Anne", d: "Om det kan betale sig at lave firmaet om til et ApS afhænger af hendes situation. Assistenten giver ikke sin mening, men sender spørgsmålet til Anne med et resumé og de vigtigste tal.", boton: "Se Annes indbakke" },
        { quien: "equipo", nombre: "Anne, bogholder", t: "Anne svarer med det hele foran sig", d: "Hun ser spørgsmålet, baggrunden og et forslag til et svar, der foreslår et møde. Hun bestemmer selv.", boton: "Se resultatet" }
      ],
      final: { antes: "Anne svarer på sms'er om frister om aftenen og mellem to momsangivelser.", ahora: "Spørgsmål om frister bliver besvaret automatisk, og Anne får kun det, der kræver hendes vurdering." },
      escena: function (x) {
        var u = UI;
        var chat = u.fecha("I dag") + u.yo("Hej, hvornår skal momsen for det her kvartal være betalt?", "22.40", x.n(0));
        if (x.p === 0) chat += u.btn(u.icono("enviar") + "Send", true);
        if (x.p >= 1) chat += u.ellos("Hej Sofie. Momsen for 3. kvartal skal angives og betales senest <strong>1. december</strong>. Vi indberetter den for dig, og du betaler via din skattekonto.<br><br>Vi mangler dit <strong>kontoudtog for september</strong>. Kan du uploade det inden 25. okt.?", "22.40", x.n(1));
        if (x.p === 1) chat += u.respuestas(["Kan det betale sig at lave mit firma om til et ApS?"], 0);
        if (x.p >= 2) chat += u.yo("En anden ting: kan det betale sig at lave mit firma om til et ApS?", "22.42") +
          u.ellos("Det afhænger af dine tal og dine planer, så det skal Anne se på. Jeg har sendt dit spørgsmål videre, og hun skriver til dig i morgen for at finde en tid.", "22.42", x.n(2));
        var movil = u.movil({ quien: "Sofies mobil", app: "wa", hora: "22.42", cuerpo: chat });
        if (x.p < 2) {
          return movil + u.ventana({ quien: "Annes computer", seccion: "Spørgsmål", cuerpo:
            u.kpis([["31", "spørgsmål besvaret automatisk i denne uge", "ok"], ["6", "sendt videre til Anne"]]) +
            u.tabla(["Kunde", "Spørgsmål", "Status"], [
              ["Sofie Lund", x.p ? "Hvornår skal momsen være betalt?" : "…", x.p ? u.chip("Besvaret automatisk", "ok") : u.chip("Kommer ind", "info")],
              ["Mads Kjeldsen", "Kan jeg betale B-skatten senere?", u.chip("Besvaret automatisk", "ok")],
              ["Holm Autoværksted ApS", "Hvornår er lønnen klar?", u.chip("Besvaret automatisk", "ok")]
            ], [x.p ? "is-resaltada" : ""])
          });
        }
        return movil + u.ventana({ quien: "Annes computer", seccion: "Spørgsmål", cuerpo:
          '<div class="entre"><strong>Sofie Lund · frisørsalon</strong>' + u.chip("Til Anne", "pend") + "</div>" +
          '<div class="caja caja-ia' + x.n(2) + '"><h5>Resumé</h5><p>Spørger, om det kan betale sig at lave enkeltmandsvirksomheden om til et ApS. Selvstændig siden 2019, omsætning på ca. 820.000 kr. om året, én ansat. Nævnte i juni, at hun gerne vil åbne en salon mere.</p></div>' +
          (x.p === 3 ? '<div class="caja anim"><h5>Forslag til svar</h5><p>Hej Sofie. Godt spørgsmål, og med dine tal er det værd at kigge ordentligt på. Passer det dig torsdag kl. 10.00? Så tager vi det på 30 minutter.</p></div>' +
            '<div class="fila">' + u.btn("Send", false) + u.btn("Ret", false, "sec") + "</div>" : "") +
          u.nota("Assistenten giver ikke skatterådgivning: den svarer på frister og kundens egne oplysninger og sender resten videre.")
        });
      }
    },

    {
      id: "alta",
      montaje: { plazo: "2 uger", con: "Jeres hjemmeside og kundesystem, eller et nyt" },
      nav: "Ny kunde",
      titulo: "En ny kunde på plads på én dag",
      hoy: "Det kræver en del mails at få en ny kunde i gang: legitimation, CVR-oplysninger, adgang til SKAT, lejekontrakt … og der mangler altid noget, eller det er udløbet.",
      con: "Kunden udfylder en formular og får præcis den liste, der passer til virksomheden. Dokumenterne bliver tjekket, når de uploades, og alle frister bliver sat op automatisk.",
      ganas: ["Ny kunde på én dag, ikke to uger", "Intet udløbet eller halvfærdigt", "Et godt første indtryk"],
      pasos: [
        { quien: "cliente", nombre: "Rasmus, ny kunde", t: "Rasmus udfylder formularen", d: "På bogholderiets hjemmeside. Han skriver, hvilken virksomhedsform han har, hvad han laver, og om han har lokaler eller ansatte.", boton: "Send formularen" },
        { quien: "auto", t: "Han får sin egen liste, og kun sin", d: "Han har enkeltmandsvirksomhed med lejet klinik, så han bliver bedt om legitimation, CVR-registrering, fuldmagt til SKAT og lejekontrakten. Ikke mere.", boton: "Upload dokumenterne" },
        { quien: "auto", t: "Dokumenterne bliver tjekket med det samme", d: "Hans pas er udløbet. Han får besked med det samme i stedet for en uge senere.", boton: "Rasmus uploader et gyldigt ID" },
        { quien: "equipo", nombre: "Anne, bogholder", t: "Kundekort og frister er klar", d: "Anne finder en kunde, der er oprettet og tjekket, med alle frister i kalenderen og velkomstmailen sendt.", boton: "Se resultatet" }
      ],
      final: { antes: "To ugers mails for at få en kunde i gang og papirer, der viser sig at være udløbet.", ahora: "Kunden har styr på det hele på én dag, og Anne skal kun tjekke og byde velkommen." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        if (x.p === 0) {
          movil = u.movil({ quien: "Rasmus' mobil", hora: "18.30", titulo: "Bliv kunde", cuerpo:
            u.campos([
              ["Navn", "Rasmus Holt"],
              ["Virksomhedsform", u.opc(["Enkeltmand", "ApS"], 0)],
              ["Hvad laver du?", "Fysioterapeut med egen klinik"],
              ["Har du lokaler?", u.opc(["Ja, lejede", "Nej"], 0)],
              ["Har du ansatte?", u.opc(["Ja", "Nej"], 1)],
              ["Hvad skal du bruge?", u.opc(["Bogføring", "Årsregnskab", "Løn"], [0, 1])]
            ]) +
            u.btn("Send", true, "ancho")
          });
          cuerpo = '<p class="tenue">Ingen nye kunder på vej.</p>';
        } else {
          var dni = x.p === 1 ? ["Pas eller kørekort", "pend", "Mangler"] : x.p === 2 ? ["Pas eller kørekort", "alerta", "Passet udløb i marts 2026. Vi har bedt om et gyldigt ID.", " anim"] : ["Pas eller kørekort", "ok", "Kørekort, gyldigt til 2035", x.n(3)];
          var lista = [
            dni,
            ["CVR-registrering", x.p > 1 ? "ok" : "pend", x.p > 1 ? "Tjekket: branchekoden passer" : "Mangler"],
            ["Fuldmagt til SKAT", x.p > 1 ? "ok" : "pend", x.p > 1 ? "Givet med MitID i TastSelv Erhverv" : "Mangler"],
            ["Lejekontrakt for klinikken", x.p > 1 ? "ok" : "pend", x.p > 1 ? "Tjekket: husleje 9.500 kr. om måneden" : "Mangler"]
          ];
          if (x.p === 1) {
            movil = u.movil({ quien: "Rasmus' mobil", hora: "18.31", titulo: "Din oprettelse", cuerpo:
              '<p class="peq anim">Tak, Rasmus. Du har <strong>enkeltmandsvirksomhed med lejet klinik</strong>, så vi skal bruge:</p>' +
              '<div class="anim anim-2">' + u.check(lista) + "</div>" +
              u.btn(u.icono("subir") + "Upload dokumenter", true, "ancho")
            });
          } else if (x.p === 2) {
            movil = u.movil({ quien: "Rasmus' mobil", hora: "18.36", titulo: "Din oprettelse", cuerpo:
              u.check(lista) + u.btn(u.icono("camara") + "Tag billede af gyldigt ID", true, "ancho")
            });
          } else {
            movil = u.movil({ quien: "Rasmus' mobil", app: "mail", hora: "9.00", cuerpo:
              u.mail({ asunto: "Velkommen til Ravn Regnskab", clase: " anim", cuerpo:
                "<p>Hej Rasmus</p><p>Nu er du kunde hos os. Din bogholder er Anne Ravn. Her er dine næste frister:</p><ul><li>20. nov.: B-skat (rate)</li><li>1. juli: oplysningsskema til SKAT</li></ul><p>Vi giver dig besked inden hver frist.</p>" })
            });
          }
          cuerpo = '<div class="entre"><strong>Rasmus Holt · fysioterapeut</strong>' + u.chip(x.p === 3 ? "Oprettet" : "Oprettes nu", x.p === 3 ? "ok" : "pend") + "</div>" +
            u.ficha([["Type", "Enkeltmandsvirksomhed med lejet klinik"], ["Ydelser", "Bogføring og årsregnskab"], ["Bogholder", "Anne Ravn"]]) +
            u.check(lista);
          if (x.p === 3) {
            cuerpo += '<div class="caja caja-suave anim anim-2"><h5>' + u.icono("calendario") + "Frister oprettet</h5>" +
              '<ul class="lista-simple"><li><span>B-skat</span><strong>10 rater om året</strong></li><li><span>Moms</span><strong>Ikke momspligtig (sundhedsydelse)</strong></li><li><span>Årsregnskab</span><strong>Årligt</strong></li><li><span>Oplysningsskema</span><strong>Årligt · 1. juli</strong></li></ul></div>';
          }
        }
        return movil + u.ventana({ quien: "Annes computer", seccion: "Nye kunder", cuerpo: cuerpo });
      }
    }
  ]
});
