/* Demo · Fysioterapiklinik (fiktivt eksempel, dansk version) */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "clinica",
  etiqueta: "Fysioterapi",
  tipo: "Fysioterapiklinik",
  negocio: "Lysholm Fysioterapi",
  lema: "Fysioterapi og genoptræningspilates",
  cliente: "Patienten",
  software: { actual: "jeres booking- og journalsystem", medida: "et skræddersyet booking- og journalsystem" },
  marca: {
    m1: "#0F7C7E", m1t: "#FFFFFF", m2: "#CDEFE9", m2t: "#0B4F50", suave: "#EEF8F6", tinta: "#123B3C",
    fuente: "'Figtree', 'Segoe UI', sans-serif", radio: "12px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#0F7C7E"/><path d="M11 25a9 9 0 0 1 18 0" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/><path d="M8 29h24M20 10v3M12.5 13.5l2 2M27.5 13.5l-2 2" fill="none" stroke="#BFE8E1" stroke-width="2.6" stroke-linecap="round"/></svg>'
  },
  panel: ["Kalender", "Patienter", "Journaler", "Forløb", "Anmeldelser"],
  situacion: "Tre fysioterapeuter, en sekretær på deltid og omkring 180 behandlinger om ugen. Telefonen ringer midt i behandlingerne, og der står huller i kalenderen, som ingen får fyldt.",
  dolores: [
    ["Telefonen afbryder behandlingerne", "Tider bliver booket over telefonen. Tager ingen den, prøver patienten en anden klinik."],
    ["Tomme tider, fordi folk glemmer", "Hver uge er der 4-5 patienter, der ikke dukker op eller melder afbud for sent, og tiden går tabt."],
    ["Papirer ved første konsultation", "Skema, samtykke og persondata bliver udfyldt på papir, og det tager 15 minutter af behandlingen."],
    ["Forløb, der ikke bliver gjort færdige", "Når det går bedre, stopper mange med at komme og laver ikke øvelserne derhjemme."]
  ],
  casos: [
    {
      id: "citas",
      montaje: { plazo: "2-3 uger", con: "Jeres bookingsystem eller et nyt, og sms" },
      nav: "Booking og ledige tider",
      titulo: "Onlinebooking og ledige tider, der bliver fyldt igen",
      hoy: "Tider bliver aftalt over telefonen, og melder nogen afbud dagen før, står tiden tom.",
      con: "Patienten booker fra mobilen på alle tider af døgnet, får en påmindelse på sms med knapper, og melder patienten afbud, bliver tiden automatisk tilbudt til ventelisten.",
      pasos: [
        { quien: "cliente", nombre: "Sara, ny patient", t: "Sara booker en tid fra mobilen kl. 22.15", d: "Hun vælger, hvad der er galt, hvem hun vil til, og hvornår. Uden at ringe og uden at vente på, at I åbner.", boton: "Book tiden" },
        { quien: "auto", t: "Dagen før får hun en påmindelse", d: "Med knapper til at bekræfte, flytte eller aflyse. Sara er blevet forhindret og melder afbud med ét tryk.", boton: "Sara melder afbud" },
        { quien: "auto", t: "Tiden bliver tilbudt til ventelisten", d: "Rasmus har bedt om en tid »så hurtigt som muligt«. Han får besked med det samme. Ingen fra klinikken har ringet.", boton: "Rasmus tager tiden" },
        { quien: "equipo", nombre: "Sekretæren", t: "Kalenderen er allerede på plads igen", d: "Sekretæren ser ændringen og månedens tal. Hun skal kun gribe ind, hvis noget ikke passer.", boton: "Se resultatet" }
      ],
      final: { antes: "Opkald midt i behandlingerne og 4-5 tabte tider hver uge.", ahora: "Bookingerne kommer ind af sig selv på alle tider af døgnet, og næsten alle afbud bliver fyldt igen." },
      escena: function (x) {
        var u = UI;
        var movil;
        if (x.p === 0) {
          movil = u.movil({ quien: "Saras mobil", hora: "22.15", titulo: "Book tid", cuerpo:
            u.campos([
              ["Hvad drejer det sig om?", u.opc(["Ondt i ryg eller nakke", "Sportsskade", "Bækkenbund", "Genoptræningspilates"], 0)],
              ["Hvem vil du til?", u.opc(["Mette Lind", "Jonas Krogh", "Ligegyldigt"], 0)],
              ["Torsdag 16. okt.", u.opc(["17.00", "18.00", "19.30"], 1)],
              ["Sygesikring »danmark«", u.opc(["Ja", "Nej"], 0)]
            ]) +
            '<p class="tenue">Første konsultation: 50 minutter. Tag behageligt tøj på.</p>' +
            u.btn("Book torsdag kl. 18.00", true, "ancho")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Saras mobil", app: "wa", hora: "10.00", cuerpo:
            u.fecha("Mandag") +
            u.ellos("Din tid er booket: <strong>torsdag 16. okt. kl. 18.00</strong> hos Mette Lind. Inden du kommer, sender vi dig et kort skema.", "22.15") +
            u.fecha("Onsdag") +
            u.ellos("Hej Sara. Husk din tid <strong>i morgen kl. 18.00</strong> hos Mette.<br>Kan du bekræfte?", "10.00", " anim") +
            u.respuestas(["Jeg kommer", "Flyt tiden", "Jeg kan ikke"], 2)
          });
        } else {
          movil = u.movil({ quien: "Rasmus' mobil (venteliste)", app: "wa", hora: "10.02", cuerpo:
            u.fecha("Onsdag") +
            u.ellos("Hej Rasmus. Der er blevet en tid ledig <strong>i morgen, torsdag, kl. 18.00</strong> hos Mette. Vil du have den?", "10.02", x.n(2)) +
            (x.p === 2 ? u.respuestas(["Ja tak, den tager jeg", "Nej tak"], 0) :
              u.respuestas(["Ja tak, den tager jeg", "Nej tak"], null, 0) +
              u.ellos("Super. Vi ses i morgen kl. 18.00. Det er behandling 5 af 8 for dit knæ.", "10.03", " anim"))
          });
        }

        var f18;
        if (x.p === 0) f18 = ["18.00", "Ledig", "libre"];
        else if (x.p === 1) f18 = ["18.00", "<strong>Sara Nielsen</strong><small>Første konsultation · ryg · booket online</small>", "nueva", x.n(1)];
        else if (x.p === 2) f18 = ["18.00", "<strong>Sara Nielsen har meldt afbud</strong><small>Tilbudt til ventelisten (3 personer)</small>", "hueco", " anim"];
        else f18 = ["18.00", "<strong>Rasmus Bach</strong><small>Knæ · behandling 5 af 8 · tid fyldt igen</small>", "nueva", " anim"];

        var cuerpo = '<div class="entre"><strong>Torsdag 16. okt. · Mette Lind</strong>' + u.chip("4 onlinebookinger i dag", "info") + "</div>" +
          u.agenda([
            ["16.00", "<strong>Marie Dahl</strong><small>Nakke · behandling 3 af 6</small>"],
            ["17.00", "<strong>Henrik Lund</strong><small>Skulder · behandling 2 af 8</small>"],
            f18,
            ["19.00", "<strong>Genoptræningspilates</strong><small>Hold på 4 · fuldt</small>"]
          ]);
        if (x.p === 3) {
          cuerpo += '<div class="anim anim-2">' + u.kpis([["96", "tider booket online i denne måned"], ["23", "afbud"], ["19", "tider fyldt igen", "ok"]]) + "</div>";
        }
        return movil + u.ventana({ quien: "Sekretærens computer", seccion: "Kalender", cuerpo: cuerpo });
      }
    },

    {
      id: "primera-visita",
      montaje: { plazo: "2 uger", con: "Jeres journalsystem eller et skræddersyet skema" },
      nav: "Første konsultation",
      titulo: "Første konsultation uden papirer",
      hoy: "Patienten kommer, udfylder skema, samtykke og persondata i hånden, og bagefter skal nogen taste det ind på computeren.",
      con: "Patienten udfylder skemaet og skriver under på mobilen, inden besøget. Fysioterapeuten får et resumé, hvor det vigtige er markeret.",
      pasos: [
        { quien: "auto", t: "Når hun booker, får hun et skema", d: "Seks spørgsmål lavet til fysioterapi: hvor det gør ondt, hvor længe, hvor meget, og om hun tager medicin eller er blevet opereret.", boton: "Send skemaet" },
        { quien: "cliente", nombre: "Sara, ny patient", t: "Hun skriver under på samtykket med fingeren", d: "Samtykke til behandling og persondata direkte på mobilen. Det bliver gemt i journalen med dato og klokkeslæt.", boton: "Skriv under" },
        { quien: "auto", t: "Mette får et resumé før behandlingen", d: "Det vigtige står øverst og er markeret: her at Sara tager blodfortyndende medicin. Resuméet hjælper med at forberede behandlingen. Undersøgelsen laver fysioterapeuten.", boton: "Mette afslutter behandlingen" },
        { quien: "equipo", nombre: "Mette, fysioterapeut", t: "Mette dikterer journalnotatet", d: "Når hun er færdig, taler hun 30 sekunder ind i mobilen, og der ligger et ordnet notat i journalen. Hun læser det igennem og gemmer det.", boton: "Gem notatet" }
      ],
      final: { antes: "15 minutters papirarbejde ved hver første konsultation og notater, der skal skrives rent om aftenen.", ahora: "Patienten kommer med det hele udfyldt, og journalen er opdateret, når behandlingen slutter." },
      escena: function (x) {
        var u = UI, movil, ventana;
        var docs = function (ficha, consent) {
          return u.check([
            ["Skema til første konsultation", ficha ? "ok" : "pend", ficha ? "Udfyldt på mobilen" : "Sendt, ikke udfyldt"],
            ["Samtykke til behandling", consent ? "ok" : "pend", consent ? "Underskrevet mandag kl. 22.19" : "Mangler underskrift"],
            ["Persondata (GDPR)", consent ? "ok" : "pend", consent ? "Accepteret" : "Mangler"]
          ]);
        };
        if (x.p === 0) {
          movil = u.movil({ quien: "Saras mobil", hora: "22.17", titulo: "Dit skema før første besøg", cuerpo:
            '<p class="peq">Hej Sara. Det tager 3 minutter, og så får vi mest muligt ud af behandlingen.</p>' +
            u.campos([
              ["Hvad drejer det sig om?", "Ondt i lænden, især når jeg sidder ned"],
              ["Hvor længe har det stået på?", u.opc(["Under 1 uge", "1-4 uger", "Over 1 måned"], 1)],
              ["Tager du medicin?", "Marevan (blodfortyndende)"],
              ["Er du blevet opereret?", "Nej"],
              ["Hvad arbejder du med?", "Kontorarbejde, sidder ned 8 timer"]
            ]) +
            u.escala(10, 7, "Hvor ondt gør det lige nu? (0-10)") +
            u.btn("Næste", true, "ancho")
          });
          ventana = u.ventana({ quien: "Klinikkens computer", seccion: "Journaler", cuerpo: '<div class="entre"><strong>Sara Nielsen · 34 år</strong>' + u.chip("Første konsultation torsdag kl. 18.00", "info") + "</div>" + docs(false, false) });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Saras mobil", hora: "22.18", titulo: "Samtykke", cuerpo:
            '<p class="peq"><strong>Samtykke til fysioterapeutisk behandling</strong></p>' +
            '<p class="tenue">Din fysioterapeut forklarer undersøgelsen og behandlingen, før den går i gang. Du kan altid trække dit samtykke tilbage.</p>' +
            u.check([["Jeg har læst informationen om behandlingen", "ok"], ["Jeg accepterer klinikkens privatlivspolitik", "ok"], ["Jeg vil gerne have påmindelser på sms", "ok"]]) +
            u.firma(false) +
            u.btn("Skriv under og send", true, "ancho")
          });
          ventana = u.ventana({ quien: "Klinikkens computer", seccion: "Journaler", cuerpo: '<div class="entre"><strong>Sara Nielsen · 34 år</strong>' + u.chip("Første konsultation torsdag kl. 18.00", "info") + '</div><div class="anim">' + docs(true, false) + "</div>" });
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Saras mobil", hora: "22.19", titulo: "Samtykke", cuerpo:
            u.firma(true) +
            '<div class="caja caja-suave anim anim-2"><h5>' + u.icono("check") + "Du er klar</h5><p>Vi ses torsdag kl. 18.00 hos Mette. Bliver du forhindret, kan du flytte tiden fra påmindelsen.</p></div>"
          });
          ventana = u.ventana({ quien: "Mettes computer", seccion: "Journaler", cuerpo:
            '<div class="entre"><strong>Sara Nielsen · 34 år</strong>' + u.chip("I dag kl. 18.00", "marca") + "</div>" +
            '<div class="caja caja-alerta anim"><h5>' + u.icono("alerta") + "Vær opmærksom på</h5><p>Tager <strong>blodfortyndende medicin (Marevan)</strong>. Tjek før invasive teknikker eller dry needling.</p></div>" +
            '<div class="caja caja-ia anim anim-2"><h5>Resumé af skemaet</h5><p>Lændesmerter i 3 uger, 7 ud af 10. Værre, når hun sidder. Kontorarbejde, 8 timer om dagen. Ingen operationer.</p></div>' +
            docs(true, true) +
            '<div class="fila">' + u.btn("Start behandlingen", true) + "</div>" +
            u.nota("Resuméet bygger på det, patienten selv har skrevet. Undersøgelse og behandling afgør fysioterapeuten.")
          });
        } else {
          movil = u.movil({ quien: "Mettes mobil", equipo: true, hora: "18.52", titulo: "Journalnotat", cuerpo:
            '<p class="peq"><strong>Sara Nielsen</strong> · behandling 1</p>' +
            '<div class="caja caja-suave"><h5>' + u.icono("mic") + "Optager · 0:28</h5><p class=\"tenue\">»Mekaniske lændesmerter uden udstråling. Lasègue negativ. Manuel behandling og motorisk kontroltræning. Opfølgning om en uge, send hjemmeøvelser.«</p></div>" +
            u.btn("Optagelse sendt", false, "claro")
          });
          ventana = u.ventana({ quien: "Mettes computer", seccion: "Journaler", cuerpo:
            '<div class="entre"><strong>Sara Nielsen · behandling 1</strong>' + u.chip("Kladde: Mette gennemgår den", "pend") + "</div>" +
            '<div class="anim">' + u.ficha([
              ["Årsag", "Lændesmerter i 3 uger, 7/10"],
              ["Undersøgelse", "Mekaniske lændesmerter uden udstråling. Lasègue negativ."],
              ["Behandling", "Manuel behandling og motorisk kontroltræning"],
              ["Plan", "Opfølgning om 1 uge. Hjemmeøvelser."],
              ["Forsigtighed", "Blodfortyndende (Marevan)"]
            ]) + "</div>" +
            '<div class="fila">' + u.btn("Gem i journalen", true) + u.btn("Ret", false, "sec") + "</div>"
          });
        }
        return movil + ventana;
      }
    },

    {
      id: "tratamiento",
      montaje: { plazo: "3-4 uger", con: "Jeres øvelsesvideoer og en webapp til patienten, uden download" },
      nav: "Øvelser og opfølgning",
      titulo: "Hjemmeøvelser og forløb, der bliver gjort færdige",
      hoy: "Øvelserne bliver vist på briksen og glemt derhjemme. Når patienterne får det bedre, stopper mange med at komme, før forløbet er færdigt.",
      con: "Hver patient har sit forløb på mobilen, med videoer af øvelserne, påmindelser og hvordan smerterne udvikler sig. Holder nogen op med at booke, får klinikken det at vide.",
      pasos: [
        { quien: "equipo", nombre: "Mette, fysioterapeut", t: "Mette vælger øvelserne på et minut", d: "Hun tager tre videoer fra klinikkens bibliotek, tilpasser antallet af gentagelser og sender dem.", boton: "Send til Sara" },
        { quien: "cliente", nombre: "Sara, patient", t: "Sara har dem på mobilen", d: "Hun ser sine øvelser på video, hvor langt hun er i forløbet, og krydser af, hvad hun har lavet. Glemmer hun det en dag, får hun en påmindelse.", boton: "Marker som lavet" },
        { quien: "cliente", nombre: "Sara, patient", t: "Hver uge fortæller hun, hvordan smerterne er", d: "Et spørgsmål og et tal. Mette ser udviklingen i en graf uden at skulle spørge ved hver behandling.", boton: "Send" },
        { quien: "auto", t: "Holder nogen op med at komme, får I besked", d: "Rasmus har ikke booket i 3 uger og har behandlinger tilbage. Han får en besked, og sekretæren ser ham på sin liste.", boton: "Se resultatet" }
      ],
      final: { antes: "Øvelser på et stykke papir, der forsvinder, og patienter, der stopper midt i forløbet.", ahora: "Hver patient følger sin plan på mobilen, og klinikken ved, hvem der er ved at falde fra." },
      escena: function (x) {
        var u = UI, out = "";
        var t1 = ["#BFE8E1", "#0F7C7E"], t2 = ["#D9E7F5", "#4A78A8"], t3 = ["#F3E3C9", "#B9874A"], t4 = ["#E7E1F3", "#7A68A8"];
        if (x.p === 0) {
          return u.ventana({ quien: "Mettes computer", seccion: "Forløb", cuerpo:
            '<div class="entre"><strong>Sara Nielsen · lændesmerter</strong>' + u.chip("Behandling 1 af 6", "info") + "</div>" +
            '<p class="peq"><strong>Klinikkens øvelsesbibliotek</strong></p>' +
            '<div class="dos">' +
              u.video("Kat og ko", "2 sæt à 10", t1, u.chip("Valgt", "ok")) +
              u.video("Bækkenløft", "3 sæt à 12", t2, u.chip("Valgt", "ok")) +
              u.video("Bird dog", "3 sæt à 8 til hver side", t3, u.chip("Valgt", "ok")) +
              u.video("Udstrækning af hoftebøjer", "30 sekunder til hver side", t4) +
            "</div>" +
            u.campos([["Besked til Sara", "Lav dem om morgenen, og stop før det gør ondt. Hvis noget generer, så sig det til mig."]]) +
            '<div class="fila">' + u.btn("Send til Sara", true) + "</div>"
          });
        }
        if (x.p === 1) {
          out = u.movil({ quien: "Saras mobil", hora: "8.05", titulo: "Mit forløb", cuerpo:
            u.aviso("Lysholm Fysioterapi", "Godmorgen, Sara. Dagens øvelser tager 10 minutter.", " anim") +
            '<div class="caja caja-suave"><div class="entre"><strong>Lændesmerter</strong>' + u.chip("Behandling 2 af 6", "marca") + '</div><p class="tenue">Næste tid: mandag kl. 18.00 hos Mette</p></div>' +
            '<p class="peq"><strong>Dagens øvelser</strong></p>' +
            u.video("Kat og ko", "2 sæt à 10", t1) +
            u.video("Bækkenløft", "3 sæt à 12", t2) +
            u.video("Bird dog", "3 sæt à 8 til hver side", t3) +
            u.btn("Marker som lavet", true, "ancho")
          });
          return out + u.ventana({ quien: "Mettes computer", seccion: "Forløb", cuerpo:
            '<div class="entre"><strong>Sara Nielsen · lændesmerter</strong>' + u.chip("Sendt til Sara", "ok") + "</div>" +
            u.check([["Kat og ko", "ok", "2 × 10"], ["Bækkenløft", "ok", "3 × 12"], ["Bird dog", "ok", "3 × 8 til hver side"]])
          });
        }
        if (x.p === 2) {
          out = u.movil({ quien: "Saras mobil", hora: "20.30", titulo: "Mit forløb", cuerpo:
            u.check([["Kat og ko", "ok", "Lavet i dag"], ["Bækkenløft", "ok", "Lavet i dag"], ["Bird dog", "ok", "Lavet i dag"]]) +
            '<div class="caja anim"><h5>Ugens spørgsmål</h5>' + u.escala(10, 4, "Hvor ondt gør det i dag? (0-10)") + "</div>" +
            u.btn("Send", true, "ancho")
          });
          return out + u.ventana({ quien: "Mettes computer", seccion: "Forløb", cuerpo:
            '<div class="entre"><strong>Sara Nielsen · lændesmerter</strong>' + u.chip("Behandling 2 af 6", "info") + "</div>" +
            u.kpis([["11 af 14", "dage med øvelser", "ok"], ["2", "behandlinger gennemført"]]) +
            u.grafico([7, 6, 6, 5], ["Uge 1", "Uge 2", "Uge 3", "Uge 4"], "Saras smerter (0-10)")
          });
        }
        out = u.movil({ quien: "Rasmus' mobil", app: "wa", hora: "11.00", cuerpo:
          u.ellos("Hej Rasmus. Det er 3 uger siden din sidste behandling, og du har <strong>4 tilbage i dit knæforløb</strong>. Skal vi finde en tid i denne uge?", "11.00", " anim") +
          u.respuestas(["Ja, tirsdag eftermiddag", "Ikke lige nu"], 0)
        });
        return out + u.ventana({ quien: "Sekretærens computer", seccion: "Patienter", cuerpo:
          u.grafico([7, 6, 6, 5, 4], ["Uge 1", "Uge 2", "Uge 3", "Uge 4", "I dag"], "Saras smerter: fra 7 til 4 på en måned") +
          '<p class="peq anim anim-2"><strong>Patienter, der er ved at falde fra</strong></p>' +
          '<div class="anim anim-2">' + u.tabla(["Patient", "Forløb", "Sidste behandling", "Tilbage", "Status"], [
            ["Rasmus Bach", "Knæ", "3 uger siden", "4", u.chip("Besked sendt", "info")],
            ["Karen Vestergaard", "Skulder", "4 uger siden", "2", u.chip("Ring op", "alerta")],
            ["Oliver Friis", "Ankel", "2 uger siden", "3", u.chip("Besked sendt", "info")]
          ], ["is-resaltada"]) + "</div>"
        });
      }
    },

    {
      id: "resenas",
      montaje: { plazo: "1 uge", con: "Jeres Google-profil og sms" },
      nav: "Anmeldelser og patienter, der vender tilbage",
      titulo: "Anmeldelser på Google og patienter, der kommer igen",
      hoy: "Tilfredse patienter går uden at skrive en anmeldelse, og I hører først fra dem igen, når de har skadet sig på ny.",
      con: "Når et forløb slutter, bliver alle patienter spurgt, hvad de syntes, med et direkte link til at skrive en anmeldelse. Et halvt år senere får de en besked om et tjek eller pilates.",
      pasos: [
        { quien: "auto", t: "Når forløbet slutter, bliver han spurgt", d: "To dage efter sidste behandling får Rasmus en kort besked med et direkte link til klinikkens Google-profil.", boton: "Rasmus skriver en anmeldelse" },
        { quien: "equipo", nombre: "Camilla, klinikchef", t: "Svaret ligger klar", d: "Anmeldelsen dukker op i kontrolpanelet med et forslag til svar i klinikkens tone. Camilla læser det, retter det, hvis hun vil, og udgiver det.", boton: "Udgiv svaret" },
        { quien: "auto", t: "Et halvt år senere: en besked om at komme igen", d: "Et tjek af knæet og et tilbud om genoptræningspilates, så han ikke får tilbagefald.", boton: "Rasmus booker et tjek" },
        { quien: "equipo", nombre: "Camilla, klinikchef", t: "Camilla ser månedens resultat", d: "Nye anmeldelser, gennemsnit og patienter, der er kommet igen takket være beskederne.", boton: "Se resultatet" }
      ],
      final: { antes: "Tre-fire anmeldelser om året og afsluttede patienter, I aldrig hører fra igen.", ahora: "Nye anmeldelser hver uge, alle besvaret, og tidligere patienter, der booker igen." },
      escena: function (x) {
        var u = UI, movil;
        var resena = '<div class="caja' + x.n(1) + '"><div class="entre"><strong>Rasmus Bach</strong>' + u.estrellas(5) + '</div><p>Jeg kom ind og kunne knap gå på trapper, og nu løber jeg igen. Mette forklarer alting rigtig godt, og der er altid en tid at få.</p><p class="tenue">Google-anmeldelse · for 10 minutter siden</p></div>';
        var svar = "Tak, Rasmus. Hvor er det dejligt at se dig løbe igen. Mette er rigtig glad for din hilsen. Hvis knæet driller igen, ved du, hvor vi er.";
        if (x.p === 0) {
          movil = u.movil({ quien: "Rasmus' mobil", app: "wa", hora: "12.00", cuerpo:
            u.ellos("Hej Rasmus. Tillykke med at være færdig med dit knæforløb!<br><br>Har vi hjulpet dig, vil du så fortælle det på Google? Det er det, der hjælper mest, når andre skal finde os." + u.btn("Skriv min anmeldelse", true), "12.00", " anim")
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Rasmus' mobil", app: "wa", hora: "12.04", cuerpo:
            u.ellos("Hej Rasmus. Tillykke med at være færdig med dit knæforløb!<br><br>Har vi hjulpet dig, vil du så fortælle det på Google? Det er det, der hjælper mest, når andre skal finde os.", "12.00") +
            u.yo("Klaret. Mange tak for hjælpen.", "12.04")
          });
        } else {
          movil = u.movil({ quien: "Rasmus' mobil", app: "wa", hora: "10.00", cuerpo:
            u.fecha("Et halvt år senere") +
            u.ellos("Hej Rasmus. Det er et halvt år siden, du blev færdig med dit knæforløb. Hvordan går det?<br><br>Hvis du vil, kan vi lave et <strong>tjek på 30 minutter</strong>. Og vil du undgå tilbagefald, har vi <strong>genoptræningspilates</strong> på hold med 4 personer.", "10.00", x.n(2)) +
            (x.p === 2 ? u.respuestas(["Book et tjek", "Info om pilates", "Det går fint, tak"], 0) :
              u.respuestas(["Book et tjek", "Info om pilates", "Det går fint, tak"], null, 0) + u.ellos("Du er booket tirsdag kl. 17.30 hos Mette. Vi ses!", "10.01", " anim"))
          });
        }
        var cuerpo;
        if (x.p === 0) {
          cuerpo = u.kpis([["4,7", "gennemsnit på Google"], ["3", "nye anmeldelser i denne måned"]]) +
            '<p class="tenue">Venter på anmeldelser fra patienter, der er afsluttet i denne uge (6).</p>';
        } else if (x.p === 1) {
          cuerpo = '<p class="peq"><strong>Ny anmeldelse</strong></p>' + resena +
            '<div class="caja caja-ia anim anim-2"><h5>Forslag til svar</h5><p>' + svar + '</p></div>' +
            '<div class="fila">' + u.btn("Udgiv svaret", true) + u.btn("Ret", false, "sec") + "</div>";
        } else {
          cuerpo = (x.p === 3 ? '<div class="anim">' + u.kpis([["4,9", "gennemsnit på Google"], ["14", "nye anmeldelser i denne måned", "ok"], ["14 af 14", "besvaret"], ["9", "patienter, der er kommet igen"]]) + "</div>" : "") +
            resena.replace(" anim", "") +
            '<div class="caja caja-suave"><div class="entre"><strong>Svar fra Lysholm Fysioterapi</strong>' + u.chip("Udgivet", "ok") + "</div><p>" + svar + "</p></div>";
        }
        return movil + u.ventana({ quien: "Camillas computer", seccion: "Anmeldelser", cuerpo: cuerpo });
      }
    }
  ]
});
