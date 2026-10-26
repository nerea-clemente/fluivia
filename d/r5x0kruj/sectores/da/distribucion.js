/* Demo · Grossist (fiktivt eksempel, dansk version) */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "distribucion",
  etiqueta: "Grossist",
  tipo: "Grossist til caféer og restauranter",
  negocio: "Fjordland Engros",
  lema: "Drikkevarer og fødevarer til caféer, restauranter og butikker",
  cliente: "Kunden",
  software: { actual: "jeres ordresystem og e-conomic eller Dinero", medida: "et skræddersyet overblik over ordrer, ruter og betalinger" },
  marca: {
    m1: "#1C4E80", m1t: "#FFFFFF", m2: "#FFE3BF", m2t: "#3A2A12", suave: "#EEF3F8", tinta: "#14263B",
    fuente: "'Barlow', 'Arial Narrow', sans-serif", radio: "8px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="8" fill="#1C4E80"/><path d="M7 25V14h15v11M22 17.5h5.5L32 22v3h-10" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linejoin="round"/><circle cx="12.5" cy="27" r="2.8" fill="#F28C28"/><circle cx="27" cy="27" r="2.8" fill="#F28C28"/></svg>'
  },
  panel: ["Ordrer", "Ruter", "Følgesedler", "Betalinger", "Kunder"],
  situacion: "Otte medarbejdere, fem varebiler og omkring 300 caféer, restauranter og butikker som kunder. Ordrerne kommer på sms, mail, telefon og mundtligt til chaufføren.",
  dolores: [
    ["Sms-ordrer, der tastes ind i hånden", "Hver morgen sidder nogen og skriver snesevis af sms'er, mails og billeder af indkøbslister ind i ordresystemet. Og en gang imellem bliver en ordre liggende på en telefon."],
    ["Følgesedler på papir", "De bliver skrevet under i bilen og kommer krøllede tilbage til kontoret. Mangler der en kasse, eller er en gået i stykker, bliver det ikke skrevet ned."],
    ["»Hvornår kommer I?«", "Kunderne ringer for at høre, hvornår varerne kommer, og kontoret ringer til chaufføren for at spørge."],
    ["Betalinger, der trækker ud", "Der er forfaldne fakturaer, som ingen når at rykke for, fordi det er ubehageligt, eller fordi der ikke er tid."]
  ],
  casos: [
    {
      id: "pedidos",
      montaje: { plazo: "3-4 uger", con: "Jeres sms-nummer, ordremailen og jeres ordresystem" },
      nav: "Ordrer på sms og mail",
      titulo: "Ordrer på sms og mail, der selv lander i systemet",
      hoy: "Ordrerne kommer som løse sms'er, mails eller billeder af en liste. Nogen taster dem ind i ordresystemet i hånden, og nogle gange går det galt, eller en ordre bliver glemt.",
      con: "Hver ordre bliver læst, når den kommer, lavet om til ordrelinjer med jeres varenumre, og lageret bliver tjekket. Kunden får en bekræftelse, og ordren ligger i jeres system.",
      pasos: [
        { quien: "cliente", nombre: "Jesper, Café Hjørnet", t: "Jesper bestiller, som han plejer, på sms", d: "Kl. 23.40, når caféen lukker. Ingen formularer eller nye apps: han skriver, som det falder ham ind.", boton: "Send ordren" },
        { quien: "auto", t: "Ordren bliver forstået og sat i system", d: "Varerne bliver genkendt i jeres sortiment med varenummer og enhed. »Den sædvanlige« er den pilsner, Jesper bestiller hver uge.", boton: "Tjek lageret" },
        { quien: "auto", t: "Lageret bliver tjekket, og ordren bekræftet", d: "Der er kun 3 kasser danskvand tilbage. Jesper får et alternativ, vælger og får en bekræftelse med leveringstiden.", boton: "Jesper vælger" },
        { quien: "equipo", nombre: "Søren, kontoret", t: "Om morgenen ligger ordrerne allerede i systemet", d: "Søren finder nattens ordrer i ordresystemet. Han kigger kun på dem, der har en note.", boton: "Se resultatet" }
      ],
      final: { antes: "En time hver morgen med at taste sms-ordrer ind og en fejl eller to på hver tur.", ahora: "Nattens ordrer ligger i systemet, før nogen møder ind på kontoret." },
      escena: function (x) {
        var u = UI;
        var prod = function (n, c) { return n + '<br><span class="tenue">' + c + "</span>"; };
        var ordre = "Hej! Til i morgen: 4 fustager af den sædvanlige, 3 kasser cola, 5 kasser danskvand og 1 net citroner. Tak";
        var chat = u.fecha("Onsdag") + u.yo(ordre, "23.40", x.n(0));
        if (x.p === 0) chat += u.btn(u.icono("enviar") + "Send", true);
        if (x.p === 1) chat += u.ellos("Modtaget, Jesper. Vi er i gang med den.", "23.40", " anim");
        if (x.p >= 2) chat += u.ellos("Modtaget, Jesper. Vi er i gang med den.", "23.40") +
          u.ellos("Vi har kun 3 kasser <strong>danskvand</strong> tilbage. Skal vi sende 3 danskvand og 2 kildevand, eller kun de 3?", "23.41", x.n(2)) +
          (x.p === 2 ? u.respuestas(["3 danskvand og 2 kildevand", "Kun de 3"], 0) : u.respuestas(["3 danskvand og 2 kildevand", "Kun de 3"], null, 0));
        if (x.p === 3) chat += u.ellos("Ordren er bekræftet til <strong>i morgen, torsdag, kl. 9-11</strong>:<br>· 4 fustager pilsner 30 l<br>· 3 kasser Coca-Cola<br>· 3 kasser danskvand og 2 kildevand<br>· 1 net citroner", "23.41", " anim");
        var movil = u.movil({ quien: "Jespers mobil", app: "wa", sub: "Sms", hora: "23.41", cuerpo: chat });

        var cuerpo;
        if (x.p === 0) {
          cuerpo = '<p class="peq"><strong>Nattens ordrer</strong></p>' +
            u.tabla(["Kunde", "Linjer", "Modtaget", "Status"], [
              ["Restaurant Fyret", "6", "22.15", u.chip("I systemet", "ok")],
              ["Café Solsikken", "3", "22.52", u.chip("I systemet", "ok")]
            ]);
        } else if (x.p < 3) {
          var vand = x.p === 1 ? [prod("Danskvand 24 × 50 cl", "DV-224"), "5 kasser", u.chip("Tjekker", "info")] : [prod("Danskvand 24 × 50 cl", "DV-224"), "5 kasser", u.chip("Kun 3 tilbage", "alerta")];
          cuerpo = '<div class="entre"><strong>Ordre fra Café Hjørnet</strong>' + u.chip("Modtaget kl. 23.40", "info") + "</div>" +
            '<div class="anim">' + u.tabla(["Vare", "Antal", "Lager"], [
              [prod("Pilsner, fustage 30 l", "PF-030"), "4", u.chip("På lager", "ok")],
              [prod("Coca-Cola 24 dåser", "RF-124"), "3 kasser", u.chip("På lager", "ok")],
              vand,
              [prod("Citroner, net 5 kg", "FR-005"), "1", u.chip("På lager", "ok")]
            ], ["", "", x.p === 2 ? "is-resaltada" : ""]) + "</div>" +
            '<div class="caja caja-ia anim anim-2"><h5>Sådan er den forstået</h5><p>»Den sædvanlige« er pilsner i 30 l-fustage: Jesper har bestilt den hver uge i to år.</p></div>' +
            (x.p === 1 ? '<div class="fila">' + u.btn("Tjek lageret", true) + "</div>" : "");
        } else {
          cuerpo = '<div class="anim">' + u.kpis([["23", "ordrer på sms og mail i nat"], ["21", "lagt i systemet automatisk", "ok"], ["2", "med en note til gennemsyn", "alerta"]]) + "</div>" +
            u.tabla(["Kunde", "Linjer", "Modtaget", "Status"], [
              ["Café Hjørnet", "5", "23.40", u.chip("I systemet", "ok")],
              ["Hotel Havblik", "9", "00.12", u.chip("Beder om særpris", "pend")],
              ["Restaurant Fyret", "6", "22.15", u.chip("I systemet", "ok")],
              ["Strandkiosken", "4", "06.30", u.chip("Ukendt vare", "pend")]
            ], ["is-resaltada"]) +
            u.nota("Ordrer med noget usædvanligt, fx en særpris eller en vare, der ikke er i sortimentet, venter på, at en person kigger på dem.");
        }
        return movil + u.ventana({ quien: "Computeren på kontoret", seccion: "Ordrer", cuerpo: cuerpo });
      }
    },

    {
      id: "albaranes",
      montaje: { plazo: "2-3 uger", con: "En webapp til chaufførerne og jeres ordresystem" },
      nav: "Følgesedler og levering",
      titulo: "Følgesedler underskrevet på mobilen, med billeder og afvigelser",
      hoy: "Følgesedlen bliver skrevet under på papir i bilen og kommer tilbage til kontoret sidst på dagen, hvis den kommer. Mangler der en kasse, eller er en gået i stykker, bliver det ikke skrevet ned.",
      con: "Chaufføren leverer med mobilen. Kunden skriver under på skærmen, afvigelser bliver noteret med foto, og den underskrevne følgeseddel går med det samme til kunden og kontoret.",
      pasos: [
        { quien: "equipo", nombre: "Tobias, chauffør", t: "Tobias kommer til caféen med varerne", d: "Han åbner leveringen på mobilen, ser, hvad der skal af, og krydser af, hvad han læsser af.", boton: "Meld en afvigelse" },
        { quien: "equipo", nombre: "Tobias, chauffør", t: "En kasse er beskadiget og bliver noteret med foto", d: "En kasse cola har bulede dåser. Tobias markerer den, tager et billede og tager den med retur.", boton: "Gå til underskrift" },
        { quien: "cliente", nombre: "Jesper, Café Hjørnet", t: "Jesper skriver under på skærmen", d: "Med fingeren på Tobias' mobil. Intet papir at gemme eller miste.", boton: "Skriv under" },
        { quien: "auto", t: "Kunden og kontoret har den med det samme", d: "Jesper får den underskrevne følgeseddel på mail. På kontoret ligger den sammen med ordren, og den beskadigede kasse står klar til en kreditnota.", boton: "Se resultatet" }
      ],
      final: { antes: "Følgesedler, der kommer krøllede tilbage eller slet ikke, og afvigelser, der bliver diskuteret uger efter.", ahora: "Hver levering er underskrevet, med fotos, i systemet og i kundens indbakke med det samme." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        var linjer = function (beskadiget) {
          return u.check([
            ["4 fustager pilsner 30 l", "ok"],
            ["3 kasser Coca-Cola", beskadiget ? "alerta" : "ok", beskadiget ? "1 kasse beskadiget · tages retur" : ""],
            ["3 kasser danskvand", "ok"],
            ["2 kasser kildevand", "ok"],
            ["1 net citroner", "ok"]
          ]);
        };
        if (x.p === 0) {
          movil = u.movil({ quien: "Tobias' mobil", equipo: true, hora: "10.08", titulo: "Levering 7 af 14", cuerpo:
            '<div class="caja caja-suave"><strong>Café Hjørnet</strong><p class="tenue">Storegade 21 · Jesper Holm</p></div>' +
            linjer(false) +
            u.btn(u.icono("alerta") + "Meld en afvigelse", true, "sec")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Tobias' mobil", equipo: true, hora: "10.10", titulo: "Afvigelse", cuerpo:
            '<div class="caja caja-alerta anim"><h5>' + u.icono("alerta") + "3 kasser Coca-Cola</h5><p>1 kasse beskadiget</p></div>" +
            u.foto(["#C9CED4", "#8C3B32"], "<span class=\"peq\">Foto af kassen</span>", " anim anim-2") +
            u.campos([["Note", "Bulede dåser. Jeg tager den med retur."]]) +
            u.btn("Gå til underskrift", true, "ancho")
          });
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Tobias' mobil", equipo: true, hora: "10.12", titulo: "Kundens underskrift", cuerpo:
            '<p class="peq"><strong>Café Hjørnet</strong> modtager:</p>' + linjer(true) +
            u.firma(false) + u.btn("Skriv under", true, "ancho")
          });
        } else {
          movil = u.movil({ quien: "Jespers mail", app: "mail", hora: "10.12", cuerpo:
            u.mail({ asunto: "Følgeseddel 4512 · dagens levering", clase: " anim", cuerpo:
              "<p>Hej Jesper</p><p>Her er den underskrevne følgeseddel fra dagens levering kl. 10.12.</p><ul><li>4 fustager pilsner 30 l</li><li>2 kasser Coca-Cola (1 taget retur, beskadiget)</li><li>3 kasser danskvand og 2 kildevand</li><li>1 net citroner</li></ul><p>Den beskadigede kasse krediterer vi på næste faktura.</p>" })
          });
        }
        if (x.p < 3) {
          cuerpo = '<div class="entre"><strong>Rute Nord · Tobias</strong>' + u.chip("7 af 14 leveringer", "info") + "</div>" +
            u.agenda([
              ["9.20", "<strong>Café Solsikken</strong><small>Leveret og underskrevet</small>"],
              ["9.45", "<strong>Restaurant Fyret</strong><small>Leveret og underskrevet</small>"],
              ["10.10", "<strong>Café Hjørnet</strong><small>" + (x.p === 0 ? "Leverer nu" : "Leverer nu · 1 afvigelse") + "</small>", "nueva"],
              ["10.40", "<strong>Hotel Havblik</strong><small>Venter</small>", "libre"]
            ]);
        } else {
          cuerpo = '<div class="entre"><strong>Følgeseddel 4512</strong>' + u.chip("Underskrevet", "ok") + "</div>" +
            u.ficha([["Kunde", "Café Hjørnet"], ["Leveret", "Torsdag kl. 10.12"], ["Underskrevet af", "Jesper Holm"], ["Chauffør", "Tobias"]]) +
            '<div class="anim">' + linjer(true) + "</div>" +
            '<div class="fila anim anim-2">' + u.chip("Sendt til kunden på mail", "ok") + u.chip("Kreditnota på vej: 1 kasse", "pend") + "</div>";
        }
        return movil + u.ventana({ quien: "Computeren på kontoret", seccion: x.p < 3 ? "Ruter" : "Følgesedler", cuerpo: cuerpo });
      }
    },

    {
      id: "reparto",
      montaje: { plazo: "2 uger", con: "Jeres ruteplanlægning og sms" },
      nav: "Besked om levering",
      titulo: "Beskeder, så kunden ved, hvornår varerne kommer",
      hoy: "Kunderne ringer for at høre, hvornår varerne kommer, og kontoret må ringe til chaufføren for at finde ud af det.",
      con: "Kunden får leveringsvinduet dagen før og en besked, når bilen er på vej. Bliver I forsinket, får kunden automatisk besked.",
      pasos: [
        { quien: "auto", t: "Dagen før: leveringsvinduet", d: "Når ruten er planlagt, får hver kunde at vide, hvornår varerne kommer, og hvem der kører.", boton: "Se leveringsdagen" },
        { quien: "auto", t: "En besked, når bilen er på vej", d: "Tobias afslutter leveringen før, og Jesper får »Vi er der om ca. 15 minutter«. Ingen har skullet skrive den.", boton: "Der er forsinkelse" },
        { quien: "auto", t: "Ved forsinkelse får kunderne besked automatisk", d: "En kø forsinker ruten 25 minutter. De resterende kunder får det nye tidspunkt og kan svare, hvis de ikke er der.", boton: "Hotellet svarer" },
        { quien: "equipo", nombre: "Søren, kontoret", t: "Kontoret følger ruten uden at ringe rundt", d: "Søren kan se, hvor hver bil er, og hvilke kunder der har givet besked. Hotel Havblik er der ikke, så leveringen bliver flyttet til eftermiddagen.", boton: "Se resultatet" }
      ],
      final: { antes: "Opkald frem og tilbage mellem kunder, kontor og chauffører hele formiddagen.", ahora: "Hver kunde ved, hvornår varerne kommer, og kontoret følger ruterne på én skærm." },
      escena: function (x) {
        var u = UI, movil;
        var dagenFor = "Hej Jesper. I morgen, torsdag, kommer dine varer <strong>mellem kl. 9 og 11</strong>. Det er Tobias, der kører.";
        if (x.p === 0) {
          movil = u.movil({ quien: "Jespers mobil", app: "wa", sub: "Sms", hora: "19.00", cuerpo:
            u.fecha("Onsdag") +
            u.ellos(dagenFor, "19.00", " anim")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Jespers mobil", app: "wa", sub: "Sms", hora: "9.55", cuerpo:
            u.fecha("Onsdag") +
            u.ellos(dagenFor, "19.00") +
            u.fecha("Torsdag") +
            u.ellos("Tobias er på vej til dig: <strong>han er der om ca. 15 minutter</strong>.", "9.55", " anim")
          });
        } else {
          movil = u.movil({ quien: "Hotel Havbliks mobil", app: "wa", sub: "Sms", hora: "10.20", cuerpo:
            u.fecha("Torsdag") +
            u.ellos("Hej. Vi er lidt forsinkede: vi er der <strong>kl. 11.05</strong> i stedet for kl. 10.40. Er I der?", "10.20", x.n(2)) +
            (x.p === 2 ? u.respuestas(["Ja, vi er her", "Vi er her ikke i dag"], 1) :
              u.respuestas(["Ja, vi er her", "Vi er her ikke i dag"], null, 1) +
              u.ellos("Tak for besked. Vi kommer i eftermiddag mellem kl. 16 og 18.", "10.21", " anim"))
          });
        }
        var cuerpo;
        if (x.p === 0) {
          cuerpo = '<p class="peq"><strong>Morgendagens ruter</strong></p>' +
            u.tabla(["Rute", "Chauffør", "Leveringer", "Beskeder"], [
              ["Nord", "Tobias", "14", u.chip("Sendt", "ok")],
              ["Midt", "Lars", "18", u.chip("Sendt", "ok")],
              ["Kysten", "Anne", "11", u.chip("Sendt", "ok")]
            ]) +
            '<div class="fila">' + u.btn("Se leveringsdagen", true) + "</div>";
        } else {
          var sen = x.p >= 2;
          cuerpo = '<div class="entre"><strong>Rute Nord · Tobias</strong>' + (sen ? u.chip("25 minutter forsinket", "alerta") : u.chip("Til tiden", "ok")) + "</div>" +
            u.agenda([
              ["9.20", "<strong>Café Solsikken</strong><small>Leveret</small>"],
              ["9.45", "<strong>Restaurant Fyret</strong><small>Leveret</small>"],
              ["10.10", "<strong>Café Hjørnet</strong><small>" + (sen ? "Leveret" : "Besked sendt: der om 15 minutter") + "</small>", sen ? "" : "nueva", sen ? "" : x.n(1)],
              [sen ? "11.05" : "10.40", "<strong>Hotel Havblik</strong><small>" + (x.p === 3 ? "Er der ikke: flyttet til kl. 16-18" : sen ? "Nyt tidspunkt sendt" : "Venter") + "</small>", x.p === 3 ? "hueco" : "libre", x.p === 3 ? " anim" : ""],
              [sen ? "11.30" : "11.05", "<strong>Strandkiosken</strong><small>" + (sen ? "Nyt tidspunkt sendt" : "Venter") + "</small>", "libre"]
            ]);
          if (x.p === 2) cuerpo += '<div class="caja caja-alerta anim"><h5>' + u.icono("alerta") + "25 minutters forsinkelse</h5><p>De 6 kunder, der er tilbage på ruten, har fået besked.</p></div>";
          if (x.p === 3) cuerpo += '<div class="anim anim-2">' + u.kpis([["43", "leveringer i dag"], ["86", "beskeder sendt automatisk", "ok"], ["1", "levering flyttet til eftermiddagen"]]) + "</div>";
        }
        return movil + u.ventana({ quien: "Computeren på kontoret", seccion: "Ruter", cuerpo: cuerpo });
      }
    },

    {
      id: "cobros",
      montaje: { plazo: "2-3 uger", con: "e-conomic eller Dinero og jeres mail og sms" },
      nav: "Betalingspåmindelser",
      titulo: "Forfaldne fakturaer, der bliver fulgt op i tide",
      hoy: "Forfaldne fakturaer hober sig op, fordi det er ubehageligt at rykke, og fordi der aldrig er tid. Når nogen endelig tager fat, er nogle af dem tre måneder gamle.",
      con: "Hver forfalden faktura får først en venlig påmindelse og derefter en rykker, med fakturaen vedhæftet. Bogholderiet kan se, hvem der skylder hvad, og bestemmer selv i de svære sager.",
      pasos: [
        { quien: "auto", t: "En faktura forfalder, og der går en venlig påmindelse ud", d: "Tre dage efter forfald får kunden en påmindelse uden gebyr, med fakturaen vedhæftet og oplysningerne til at betale.", boton: "Se næste påmindelse" },
        { quien: "auto", t: "Betaler kunden ikke, kommer der en rykker", d: "Efter 15 dage, på sms og med et rykkergebyr på 100 kr. Svarer kunden, at der er betalt, eller at der er fejl i fakturaen, stopper rykkerne, og bogholderiet får besked.", boton: "Pia svarer" },
        { quien: "equipo", nombre: "Rikke, bogholderiet", t: "Rikke kan se, hvem der skylder hvad", d: "Gælden sorteret efter alder og det, hver kunde har svaret. Store kunder, offentlige kunder med EAN-faktura og sager med en indsigelse får ingen rykker, uden at Rikke har sagt god for det.", boton: "Se resultatet" }
      ],
      final: { antes: "Forfaldne fakturaer fra måneder tilbage og ubehagelige opkald for at få pengene ind.", ahora: "Det almindelige bliver betalt efter automatiske påmindelser, og Rikke bruger sin tid på de sager, der kræver det." },
      escena: function (x) {
        var u = UI, movil;
        if (x.p === 0) {
          movil = u.movil({ quien: "Pias mail (Café Solsikken)", app: "mail", hora: "9.00", cuerpo:
            u.mail({ asunto: "Venlig påmindelse: faktura 387", clase: " anim", cuerpo:
              "<p>Hej Pia</p><p>Vi kan se, at faktura <strong>387 på 486,20 kr.</strong> forfaldt den 5. oktober. Har du allerede betalt, kan du se bort fra denne mail.</p><p>Du kan betale med indbetalingskortet (+71) på fakturaen eller via bankoverførsel.</p><p>Venlig hilsen<br>Bogholderiet</p><p class=\"tenue\">Vedhæftet: Faktura-387.pdf</p>" })
          });
        } else {
          movil = u.movil({ quien: "Pias mobil (Café Solsikken)", app: "wa", sub: "Sms", hora: "10.02", cuerpo:
            u.fecha("20. oktober") +
            u.ellos("Hej Pia. Faktura 387 (486,20 kr.) er nu 15 dage over forfald, og der er lagt et rykkergebyr på 100 kr. til. Hvornår kan du betale?", "10.00", x.n(1)) +
            (x.p === 1 ? u.respuestas(["Den er betalt", "Jeg betaler i denne uge", "Der er fejl i fakturaen"], 1) :
              u.respuestas(["Den er betalt", "Jeg betaler i denne uge", "Der er fejl i fakturaen"], null, 1) +
              u.ellos("Perfekt, tak. Det har vi noteret.", "10.02", " anim"))
          });
        }
        var sol = x.p === 0 ? u.chip("Påmindelse sendt", "info") : x.p === 1 ? u.chip("Rykker 1 sendt", "info") : u.chip("Betaler i denne uge", "ok");
        var cuerpo = (x.p === 2 ? '<div class="anim">' + u.kpis([["93.640 kr.", "forfaldent"], ["24.080 kr.", "betalt denne måned efter en påmindelse", "ok"], ["3", "sager til Rikke", "alerta"]]) + "</div>" : u.kpis([["93.640 kr.", "forfaldent"], ["27", "forfaldne fakturaer"]])) +
          u.tabla(["Kunde", "Faktura", "Beløb", "Over forfald", "Status"], [
            ["Café Solsikken", "387", "486,20 kr.", x.p === 0 ? "3 dage" : "15 dage", sol],
            ["Restaurant Fyret", "352", "9.240,00 kr.", "32 dage", u.chip("Til Rikke: stor kunde", "alerta")],
            ["Værtshuset Ankeret", "401", "696,50 kr.", "5 dage", u.chip("Påmindelse sendt", "info")],
            ["Plejecenter Engly", "374", "4.118,75 kr.", "21 dage", u.chip("EAN-faktura afvist: mangler ordrenr.", "alerta")],
            ["Hotel Havblik", "298", "17.310,00 kr.", "61 dage", u.chip("Siger, der er fejl", "alerta")]
          ], ["is-resaltada"]);
        if (x.p === 2) cuerpo += u.nota("Her bliver der kun fulgt op på fakturaerne. De bliver stadig lavet i e-conomic eller Dinero, som I plejer.");
        return movil + u.ventana({ quien: "Rikkes computer", seccion: "Betalinger", cuerpo: cuerpo });
      }
    }
  ]
});
