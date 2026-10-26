/* Demo · Sprogskole og lektiehjælp (fiktivt eksempel, dansk version) */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "academia",
  etiqueta: "Sprogskole",
  tipo: "Sprogskole og lektiehjælp",
  negocio: "Nexo Sprogskole",
  lema: "Sprog og lektiehjælp på små hold",
  cliente: "Familien",
  software: { actual: "jeres elevsystem", medida: "et skræddersyet system til hold, elever og familier" },
  marca: {
    m1: "#4B3FD1", m1t: "#FFFFFF", m2: "#FFE08A", m2t: "#2A2272", suave: "#F3F1FF", tinta: "#221C4F",
    fuente: "'Nunito', 'Trebuchet MS', sans-serif", radio: "18px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="20" fill="#4B3FD1"/><path d="M13.5 27V14l13 13V14" fill="none" stroke="#FFC93C" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  panel: ["Prøver", "Hold", "Elever", "Fremmøde", "Tilmeldinger"],
  situacion: "Omkring 180 elever, fra folkeskolen og gymnasiet til voksne, på 22 hold i engelsk, tysk og lektiehjælp. Fire hold, både unge og voksne, læser op til Cambridge-prøver. Mette leder skolen og underviser også selv. I august og juni når hun det ikke.",
  dolores: [
    ["Øveprøver, ingen når at rette", "B2- og C1-holdene vil gerne have øveprøver, men det tager hele eftermiddage at rette dem. Og resultatet kommer, når det ikke kan bruges mere."],
    ["August er kaos", "Tilmeldingerne kommer på papir, niveauet skal findes over telefonen, og hold bliver fulde, uden at nogen opdager det i tide."],
    ["Fravær, ingen hører om", "Når en elev bliver væk, hører familien det først til statussamtalen. Og ingen ser, hvem der er ved at falde fra."],
    ["Juni uden at vide, hvem der fortsætter", "Halvdelen af familierne svarer ikke, om de fortsætter efter sommerferien, så holdene bliver planlagt i blinde."]
  ],
  casos: [
    {
      id: "examenes",
      montaje: { plazo: "3-4 uger", con: "Jeres hjemmeside, jeres hold og de opgaver, lærerne selv laver" },
      nav: "Øveprøver",
      titulo: "Cambridge-øveprøver, der retter sig selv",
      hoy: "B2- og C1-holdene vil have øveprøver, men rettearbejdet æder lærernes eftermiddage. Og indtil eksamen ved ingen rigtig, hvem der halter i Listening.",
      con: "Eleverne tager øveprøver i stil med B2 First og C1 Advanced på mobilen eller computeren. De retter sig selv, med forklaring, og skolen ser, hvordan hvert hold klarer hver del.",
      pasos: [
        { quien: "cliente", nombre: "Freja, 16 år", t: "Freja tager Use of English på mobilen", d: "Huller med fire svarmuligheder og orddannelse. Hvert svar bliver rettet med det samme, og hun får at vide hvorfor.", boton: "Videre til Reading" },
        { quien: "cliente", nombre: "Freja, 16 år", t: "Reading, med svaret markeret i teksten", d: "En kort tekst med spørgsmål. Svarer hun forkert, ser hun den sætning i teksten, hvor svaret stod.", boton: "Videre til Listening" },
        { quien: "cliente", nombre: "Freja, 16 år", t: "Listening, som til eksamen", d: "Hun hører lydklippet to gange og skriver, hvad hun hører. Her bliver svarene først rettet til sidst.", boton: "Afslut prøven" },
        { quien: "auto", t: "Point for hver del, forventet niveau og hvad der skal øves", d: "Freja ser, at hun er på vej mod B2, og hvor hun fejler mest. Sofie, hendes lærer, ser det samme i sit panel.", boton: "Se, hvordan holdene klarer sig" },
        { quien: "equipo", nombre: "Sofie, lærer", t: "Sofie ser, hvem der har brug for hjælp, og sender den næste øveprøve", d: "Hold for hold og del for del. Listening halter på B2-holdet for unge, så hun sender dem en ny prøve og ekstra træning i den del.", boton: "Send til holdet" }
      ],
      final: { antes: "Øveprøver på papir, der bliver rettet derhjemme flere dage efter, og elever, der går til eksamen uden at vide, hvad de mangler.", ahora: "Hver øveprøve bliver rettet med det samme, og Sofie tilrettelægger den næste efter det, holdet halter i." },
      escena: function (x) {
        var u = UI, movil, cuerpo, p = x.p;
        var titulo = "Prøve 4 · " + ["Use of English", "Reading", "Listening"][Math.min(p, 2)] + " · " + (p + 1) + " af 3";

        if (p === 0) {
          movil = u.movil({ quien: "Frejas mobil", hora: "17.40", titulo: titulo, cuerpo:
            '<div class="caja anim"><p class="peq"><strong>Part 1 · Vælg det ord, der mangler</strong></p><p>On her first night in Dublin, Marta ___ up a conversation with the woman next door.</p>' + u.opc(["A struck", "B made", "C took", "D set"], 1) + "</div>" +
            u.check([["Det var »struck«, ikke »made«", "falta", "Man siger »strike up a conversation«: at falde i snak med nogen. »Make« hører sammen med »friends«.", " anim anim-2"]]) +
            '<div class="caja"><p class="peq"><strong>Part 3 · Dan det rigtige ord</strong></p><p>Losing the final was a huge ___ for the team. <span class="tenue">(DISAPPOINT)</span></p></div>' +
            u.check([["disappointment", "ok", "Godt: efter »a huge« skal der et navneord."]]) +
            u.btn("Videre til Reading", true, "ancho")
          });
        } else if (p === 1) {
          movil = u.movil({ quien: "Frejas mobil", hora: "17.52", titulo: titulo, cuerpo:
            '<div class="caja anim"><p class="peq"><strong>The night library</strong></p><p class="peq">Every Thursday, the library in Hartfield stays open until midnight. Students asked for it: they had nowhere quiet to revise. “We expected five people,” says Joan, the librarian. “Forty <mark>turned up</mark>.”</p></div>' +
            '<div class="fila">' + u.chip("1 ✓", "ok") + u.chip("2 ✓", "ok") + u.chip("3 ✗", "alerta") + u.chip("4 …", "info") + "</div>" +
            '<div class="caja"><p class="peq"><strong>3. What does “turned up” mean?</strong></p>' + u.opc(["A arrived", "B left", "C complained", "D signed up"], 3) + "</div>" +
            u.check([["Det var »arrived«, ikke »signed up«", "falta", "»Turn up« betyder at dukke op: de regnede med fem, og der kom fyrre. »Sign up« er at melde sig til.", " anim anim-2"]]) +
            u.btn("Videre til Listening", true, "ancho")
          });
        } else if (p === 2) {
          movil = u.movil({ quien: "Frejas mobil", hora: "18.05", titulo: titulo, cuerpo:
            '<div class="caja caja-suave anim"><div style="display:flex;gap:12px;align-items:center">' +
              '<span style="display:grid;place-items:center;width:44px;height:44px;flex:none;border-radius:50%;background:var(--m1);color:var(--m1t)"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg></span>' +
              '<div style="flex:1;min-width:0"><strong class="peq">Part 2 · En cykeltur langs floden</strong>' +
              '<div class="barra-fondo" style="margin:7px 0 4px"><i style="width:58%"></i></div>' +
              '<div class="entre tenue"><span>1:52</span><span>3:15</span></div></div></div>' +
              '<p class="tenue" style="margin-top:8px">Anden gennemlytning af to, som til eksamen.</p></div>' +
            u.campos([
              ["6. The tour starts at the old ___ station.", "railway"],
              ["7. Riders must bring their own ___.", "helmet"],
              ["8. The longest stop is for a ___ by the water.", "picnic"]
            ]) +
            '<p class="tenue">Svarene bliver rettet, når du er færdig.</p>' +
            u.btn("Afslut prøven", true, "ancho")
          });
        } else if (p === 3) {
          movil = u.movil({ quien: "Frejas mobil", hora: "18.14", titulo: "Resultat · Prøve 4", cuerpo:
            '<div class="caja caja-suave anim" style="text-align:center"><p class="tenue">Forventet niveau</p><p class="marca-fuente" style="font-size:24px;line-height:1.2">Du er på vej mod B2</p><p class="tenue">Cirka 166 point. B2 starter ved 160.</p></div>' +
            u.barra(20, 28, "Use of English") + u.barra(31, 42, "Reading") + u.barra(17, 30, "Listening") +
            u.check([["Listening 7: det var »water bottle«", "falta", "Du skrev »helmet«, men hjelmen får man udleveret: “Just bring a water bottle.”", " anim anim-2"]]) +
            '<div class="caja caja-alerta anim anim-2"><h5>' + u.icono("alerta") + 'Det skal du øve</h5><ul class="lista-simple"><li><span>Listening Part 2</span><strong>3 fejl</strong></li><li><span>Phrasal verbs med »up«</span><strong>2 fejl</strong></li></ul></div>'
          });
        } else {
          movil = u.movil({ quien: "Frejas mobil", hora: x.fin ? "19.02" : "18.30", titulo: "Mine prøver", cuerpo:
            (x.fin ? u.aviso("Ny øveprøve fra Sofie", "Prøve 5 og en ekstra Listening Part 2. Til fredag.", " anim") : "") +
            u.grafico([5.1, 5.8, 6.4, 6.9], ["Nr. 1", "Nr. 2", "Nr. 3", "Nr. 4"], "Dit resultat i hver prøve (ud af 10)") +
            u.check([
              ["Prøve 4", "ok", "6,9 · på vej mod B2"],
              ["Prøve 3", "ok", "6,4 · høj B1"],
              x.fin ? ["Prøve 5", "pend", "Sendt af Sofie · til fredag", " anim"] : ["Prøve 5", "pend", "Ikke sendt endnu"]
            ])
          });
        }

        if (p < 3) {
          var fre = [
            "<strong>Freja Holm</strong>",
            p === 0 ? u.chip("I gang", "info") : "71 %",
            p === 0 ? "—" : p === 1 ? u.chip("I gang", "info") : "74 %",
            p < 2 ? "—" : u.chip("I gang", "info"),
            "—"
          ];
          cuerpo = '<div class="entre"><strong>Prøve 4 · B2 First, unge</strong>' + u.chip("Til fredag", "marca") + "</div>" +
            u.kpis([["8 af 12", "afleveret"], ["1", "i gang nu", "ok"], ["3", "ikke startet"]]) +
            u.tabla(["Elev", "Use of English", "Reading", "Listening", "Niveau"], [
              fre,
              ["Oliver Kjær", "86 %", "83 %", "80 %", u.chip("Høj B2", "ok")],
              ["Noah Bak", "79 %", "77 %", "55 %", u.chip("B2", "ok")],
              ["Ida Lund", "63 %", "70 %", "48 %", u.chip("Høj B1", "pend")],
              ["Emil Friis", "60 %", "58 %", "52 %", u.chip("Høj B1", "pend")]
            ], ["is-resaltada"]) +
            '<p class="tenue">Skolens egne opgaver i stil med B2 First. Det er ikke officielt materiale fra Cambridge.</p>';
        } else if (p === 3) {
          cuerpo = '<div class="entre"><strong>Prøve 4 · B2 First, unge</strong>' + u.chip("Til fredag", "marca") + "</div>" +
            u.kpis([["9 af 12", "afleveret", "ok"], ["0", "i gang nu"], ["3", "ikke startet"]]) +
            u.tabla(["Elev", "Use of English", "Reading", "Listening", "Niveau"], [
              ["<strong>Freja Holm</strong>", "71 %", "74 %", "57 %", u.chip("B2", "ok")],
              ["Oliver Kjær", "86 %", "83 %", "80 %", u.chip("Høj B2", "ok")],
              ["Noah Bak", "79 %", "77 %", "55 %", u.chip("B2", "ok")],
              ["Ida Lund", "63 %", "70 %", "48 %", u.chip("Høj B1", "pend")],
              ["Emil Friis", "60 %", "58 %", "52 %", u.chip("Høj B1", "pend")]
            ], ["is-resaltada"]) +
            '<div class="caja caja-ia anim anim-2"><h5>På dette hold</h5><p>Listening er den svageste del: 58 % i gennemsnit. Næsten alle fejl er i Part 2, hvor man skal skrive konkrete oplysninger ned.</p></div>' +
            '<div class="fila">' + u.btn("Se, hvordan holdene klarer sig", true) + "</div>";
        } else {
          cuerpo = '<div class="entre"><strong>Sådan klarer holdene sig</strong>' + u.chip("Prøve 4", "info") + "</div>" +
            u.tabla(["Hold", "Use of English", "Reading", "Listening", "Samlet"], [
              ["B2 First, unge (12)", "72 %", "75 %", u.chip("58 %", "alerta"), "Knap B2"],
              ["B2 First, voksne (9)", "68 %", "80 %", "71 %", "B2"],
              ["C1 Advanced, voksne (7)", u.chip("61 %", "alerta"), "78 %", "74 %", "Knap C1"]
            ], ["is-resaltada"]) +
            '<div class="caja caja-alerta"><h5>' + u.icono("alerta") + 'Hvem har brug for hjælp</h5><ul class="lista-simple">' +
              "<li><span>Listening Part 2 · B2, unge</span><strong>Freja, Ida, Emil, Noah</strong></li>" +
              "<li><span>Word formation · C1, voksne</span><strong>Hanne, Torben</strong></li></ul></div>" +
            '<div class="caja' + (x.fin ? " caja-suave" : " anim") + '"><h5>Næste øveprøve</h5>' +
              u.campos([
                ["Hold", "B2 First, unge · 12 elever"],
                ["Hvad sender du?", u.opc(["Hele prøve 5", "Ekstra Listening Part 2", "Word formation"], [0, 1])],
                ["Frist", "Fredag den 6. november"]
              ]) +
              '<div class="fila" style="margin-top:10px">' + (x.fin ? u.chip("Sendt til 12 elever", "ok") + '<span class="tenue">De har fået den på mobilen</span>' : u.btn("Send til holdet", true)) + "</div></div>";
        }
        return movil + u.ventana({ quien: "Sofies computer", seccion: "Prøver", cuerpo: cuerpo });
      }
    },

    {
      id: "matricula",
      montaje: { plazo: "3 uger", con: "Jeres hjemmeside, jeres elevsystem og Betalingsservice eller MobilePay, som I allerede bruger" },
      nav: "Tilmelding online",
      titulo: "Tilmelding online med niveautest",
      hoy: "Familierne kommer forbi skolen og udfylder papirer. Og eleven skal niveautestes på stedet, før de kan få at vide, hvilket hold der passer.",
      con: "Familien tilmelder sig på mobilen med deres oplysninger, en kort niveautest, et forslag til hold med ledige pladser og accept af reglerne. Skolen får det hele på plads.",
      pasos: [
        { quien: "cliente", nombre: "Line, mor til Viggo", t: "Line tilmelder Viggo på mobilen", d: "Elevens oplysninger, hvad han vil lære, og hvilke eftermiddage han kan. En søndag aften, uden at ringe.", boton: "Næste" },
        { quien: "cliente", nombre: "Viggo, 12 år", t: "Viggo tager en kort niveautest", d: "Ti minutters spørgsmål, der tilpasser sig hans svar. Testen viser niveauet. Man kan ikke dumpe.", boton: "Afslut testen" },
        { quien: "auto", t: "Han får et forslag til hold med rigtige ledige pladser", d: "Ud fra niveau, alder og skema. Line reserverer pladsen og accepterer regler og databeskyttelse i samme trin.", boton: "Reservér pladsen" },
        { quien: "equipo", nombre: "Mette, leder", t: "Mette ser holdene blive fyldt op", d: "Hun ser, hvor mange pladser der er tilbage på hvert hold, og hvornår det kan betale sig at oprette et nyt. Lærerne får deres elevlister.", boton: "Se resultatet" }
      ],
      final: { antes: "Kø i august, niveautest af én elev ad gangen og hold, der ikke hænger sammen.", ahora: "Familierne tilmelder sig selv, og holdene bliver sat efter hver elevs niveau." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        var grupos = function (extra) {
          return u.tabla(["Hold", "Tidspunkt", "Pladser"], [
            ["Engelsk A2+ (11-13 år)", "man. og ons. · 16.30", (8 + extra) + " af 10"],
            ["Engelsk B1 (12-14 år)", "tirs. og tors. · 16.30", "10 af 10 " + u.chip("Fuldt", "alerta")],
            ["Tysk A1 (voksne)", "tirs. og tors. · 19.00", "5 af 8"],
            ["Lektiehjælp i matematik (7.-9. kl.)", "fre. · 14.30", "6 af 8"]
          ], [extra ? "is-resaltada" : ""]);
        };
        if (x.p === 0) {
          movil = u.movil({ quien: "Lines mobil", hora: "21.50", titulo: "Tilmelding 2026/27", cuerpo:
            u.campos([
              ["Elev", "Viggo Thomsen · 12 år"],
              ["Klasse i skolen", "6. klasse"],
              ["Hvad vil han lære?", u.opc(["Engelsk", "Tysk", "Lektiehjælp"], 0)],
              ["Ledige eftermiddage", u.opc(["Man", "Tir", "Ons", "Tor", "Fre"], [0, 2])]
            ]) + u.btn("Næste: niveautest", true, "ancho")
          });
          cuerpo = u.kpis([["126", "tilmeldt"], ["38", "ledige pladser"]]) + grupos(0);
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Lines mobil (Viggo bruger den)", hora: "21.55", titulo: "Niveautest · 7 af 12", cuerpo:
            u.barra(7, 12, "Spørgsmål") +
            '<div class="caja anim"><p class="peq"><strong>Choose the right option:</strong></p><p>Last summer we ___ to Portugal with my cousins.</p></div>' +
            u.opc(["go", "went", "have gone", "were go"], 1) +
            '<div class="caja anim anim-2"><p class="peq"><strong>Lyt og svar</strong></p><p class="tenue">Lydklip på 20 sekunder om en togplan.</p></div>' +
            u.btn("Afslut testen", true, "ancho")
          });
          cuerpo = u.kpis([["126", "tilmeldt"], ["38", "ledige pladser"]]) + grupos(0);
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Lines mobil", hora: "22.01", titulo: "Forslag til hold", cuerpo:
            '<div class="caja caja-suave anim"><p class="tenue">Viggos vejledende niveau</p><p class="marca-fuente" style="font-size:24px">Høj A2</p></div>' +
            '<div class="caja anim anim-2"><h5>Engelsk A2+ (11-13 år)</h5><p>Mandag og onsdag kl. 16.30-17.30 · Lærer: Camilla Ravn</p><p>1.250 kr. om måneden</p><p>' + u.chip("2 pladser tilbage", "pend") + "</p></div>" +
            u.check([["Jeg accepterer skolens regler", "ok"], ["Jeg accepterer privatlivspolitikken", "ok"], ["Billeder af Viggo i undervisningen må bruges", "falta", "Ikke tilladt"]]) +
            u.btn("Reservér pladsen", true, "ancho")
          });
          cuerpo = u.kpis([["126", "tilmeldt"], ["38", "ledige pladser"]]) + grupos(0);
        } else {
          movil = u.movil({ quien: "Lines mobil", app: "mail", hora: "22.02", cuerpo:
            u.mail({ asunto: "Plads reserveret til Viggo", clase: " anim", cuerpo:
              "<p>Hej Line</p><p>Viggo starter <strong>mandag den 17. august kl. 16.30</strong> på holdet Engelsk A2+ hos Camilla.</p><p>Første betaling på 1.250 kr. bliver trukket via Betalingsservice den 1. september. Vi sender dig også materialelisten og årets kalender. Vi ses!</p>" })
          });
          cuerpo = u.kpis([["127", "tilmeldt", "ok"], ["37", "ledige pladser"]]) + grupos(1) +
            '<div class="caja caja-alerta anim anim-2"><h5>' + u.icono("alerta") + "Engelsk B1 er fuldt</h5><p>6 familier står på venteliste til tirsdag og torsdag kl. 16.30. Med 4 mere kan der oprettes et nyt hold.</p></div>" +
            '<div class="caja caja-suave"><div class="entre"><strong>Viggo Thomsen</strong>' + u.chip("Ny", "marca") + '</div><p class="tenue">Høj A2 · ingen billedtilladelse · elevliste sendt til Camilla</p></div>';
        }
        return movil + u.ventana({ quien: "Mettes computer", seccion: x.p === 3 ? "Hold" : "Tilmeldinger", cuerpo: cuerpo });
      }
    },

    {
      id: "asistencia",
      montaje: { plazo: "2 uger", con: "En webapp til lærerne og sms eller WhatsApp" },
      nav: "Fravær og familier",
      titulo: "Fravær meldt til familien samme dag",
      hoy: "Lærerne krydser af på papir. Når en elev bliver væk, hører familien det ikke. Og ingen ser, hvem der er ved at falde fra, før det er for sent.",
      con: "Læreren tager fremmøde på mobilen, familien får besked med lektierne, og skolen ser, hvem der samler fravær op.",
      pasos: [
        { quien: "equipo", nombre: "Camilla, lærer", t: "Camilla tager fremmøde på 20 sekunder", d: "På mobilen, når timen starter. Viggo er ikke kommet.", boton: "Gem fremmødet" },
        { quien: "auto", t: "Familien får besked med lektierne", d: "Line ved med det samme, at Viggo ikke er mødt op. Og hun har dagens lektier, så han ikke kommer bagud.", boton: "Line svarer" },
        { quien: "auto", t: "Mette ser, hvem der er ved at falde fra", d: "Viggos fravær er meldt. Og hun får en advarsel om de elever, der har meget fravær i denne måned, så hun kan ringe i tide.", boton: "Se statusrapporten" },
        { quien: "auto", t: "Statusrapporten laver sig selv", d: "Fremmøde, fremskridt og en kommentar fra læreren til hver familie. Camilla skriver kun kommentaren.", boton: "Se resultatet" }
      ],
      final: { antes: "Fremmøde på papir, familier, der først hører om fraværet til statussamtalen, og elever, der stopper uden at sige det.", ahora: "Fravær bliver meldt samme dag, og skolen ringer til dem, der er ved at falde fra, før de er væk." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        var al = function (n, ok) { return [n, ok ? "ok" : "falta", ok ? "Til stede" : "Ikke mødt"]; };
        if (x.p === 0) {
          movil = u.movil({ quien: "Camillas mobil", equipo: true, hora: "16.32", titulo: "Engelsk A2+ · mandag 16.30", cuerpo:
            u.check([al("Alma Møller", true), al("Viggo Thomsen", false), al("Malthe Krog", true), al("Clara Nielsen", true), al("William Dahl", true), al("Ella Juhl", true)]) +
            u.campos([["Dagens lektier", "Unit 4: øvelse 2-5 på side 38"]]) +
            u.btn("Gem fremmødet", true, "ancho")
          });
          cuerpo = '<p class="tenue">Venter på fremmøde fra holdene kl. 16.30 …</p>';
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Lines mobil", app: "wa", hora: "16.33", cuerpo:
            u.ellos("Hej Line. Viggo er ikke mødt op til engelsk i dag (kl. 16.30). Er alt i orden?<br><br>Dagens lektier: <strong>Unit 4, øvelse 2-5 på side 38</strong>.", "16.33", " anim") +
            u.respuestas(["Han er syg", "Vi har glemt det", "Ring til mig"], 0)
          });
          cuerpo = u.tabla(["Elev", "Hold", "Besked"], [["Viggo Thomsen", "Engelsk A2+", u.chip("Familien har fået besked", "info")], ["Lucas Berg", "Lektiehjælp, mat.", u.chip("Familien har fået besked", "info")]], ["is-resaltada"]);
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Lines mobil", app: "wa", hora: "16.35", cuerpo:
            u.ellos("Hej Line. Viggo er ikke mødt op til engelsk i dag (kl. 16.30). Er alt i orden?<br><br>Dagens lektier: <strong>Unit 4, øvelse 2-5 på side 38</strong>.", "16.33") +
            u.yo("Han er syg og har feber.", "16.35") +
            u.ellos("Tak, fordi du siger til. God bedring! Vi giver Camilla besked.", "16.35", " anim")
          });
          cuerpo = u.tabla(["Elev", "Hold", "Besked"], [["Viggo Thomsen", "Engelsk A2+", u.chip("Meldt: syg", "ok")]]) +
            '<div class="caja caja-alerta anim anim-2"><h5>' + u.icono("alerta") + "3 elever har været væk 3 gange eller mere i denne måned</h5>" +
            u.tabla(["Elev", "Fravær", ""], [["Ida Lund", "4", u.btn(u.icono("telefono") + "Ring", false, "sec")], ["Emil Friis", "3", u.btn(u.icono("telefono") + "Ring", false, "sec")], ["Lucas Berg", "3", u.btn(u.icono("telefono") + "Ring", false, "sec")]]) + "</div>" +
            '<div class="fila">' + u.btn("Se statusrapporten", true) + "</div>";
        } else {
          movil = u.movil({ quien: "Lines mobil", app: "mail", hora: "17.00", cuerpo:
            u.mail({ asunto: "Viggos status før jul", clase: " anim", cuerpo:
              u.kpis([["92 %", "fremmøde"], ["Høj A2", "niveau"]]) +
              "<p><strong>Camillas kommentar:</strong> Viggo deltager meget aktivt og er blevet bedre til at tale engelsk. Han skal øve de uregelmæssige verber.</p>" })
          });
          cuerpo = '<div class="entre"><strong>Statusrapporter før jul</strong>' + u.chip("Sendt til 178 familier", "ok") + "</div>" +
            u.tabla(["Elev", "Fremmøde", "Kommentar", ""], [
              ["Viggo Thomsen", "92 %", "Skrevet af Camilla", u.chip("Sendt", "ok")],
              ["Alma Møller", "100 %", "Skrevet af Camilla", u.chip("Sendt", "ok")],
              ["Ida Lund", "71 %", "Skrevet af Sofie", u.chip("Sendt", "ok")]
            ]);
        }
        return movil + u.ventana({ quien: "Mettes computer", seccion: "Fremmøde", cuerpo: cuerpo });
      }
    },

    {
      id: "renovaciones",
      montaje: { plazo: "1-2 uger", con: "Sms, WhatsApp eller mail og jeres elevliste" },
      nav: "Gentilmelding før sommer",
      titulo: "Vid allerede i juni, hvem der fortsætter i august",
      hoy: "I juni svarer halvdelen af familierne ikke, om de fortsætter. I august mangler der pladser på nogle hold, mens andre står halvtomme.",
      con: "I maj får hver familie et forslag til næste års hold. Med svarene kan skolen planlægge holdene og ved, hvorfor dem, der stopper, gør det.",
      pasos: [
        { quien: "auto", t: "I maj kommer forslaget til næste skoleår", d: "Line får det hold, vi anbefaler til Viggo næste år, og de går forud for nye familier.", boton: "Line beholder pladsen" },
        { quien: "auto", t: "Dem, der stopper, siger hvorfor", d: "Ét spørgsmål og ét tryk. Skolen ved, om de stopper på grund af tidspunktet, prisen eller en flytning.", boton: "Se svarene" },
        { quien: "equipo", nombre: "Mette, leder", t: "Mette planlægger næste år ud fra tal", d: "Hun ser, hvem der fortsætter, hvem der skifter, og hvem der ikke har svaret. De sidste får automatisk en påmindelse. Og hun ser, hvilke hold der skal oprettes.", boton: "Se resultatet" }
      ],
      final: { antes: "Hold, der bliver planlagt i blinde i august, og elever, der stopper, uden at nogen ved hvorfor.", ahora: "I juni ved Mette, hvor mange hold hun får, og hvad hun skal ændre, så ikke flere stopper." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        if (x.p === 0) {
          movil = u.movil({ quien: "Lines mobil", app: "wa", hora: "10.00", cuerpo:
            u.fecha("15. maj") +
            u.ellos("Hej Line. Viggo har haft et rigtig godt år!<br><br>Næste år anbefaler vi <strong>Engelsk B1 (12-14 år)</strong>, mandag og onsdag kl. 16.30, hos Camilla.<br><br>Nuværende familier har fortrinsret til den 31. maj. Skal vi holde pladsen til jer?", "10.00", " anim") +
            u.respuestas(["Ja, hold den til os", "Andet tidspunkt", "Vi stopper"], 0)
          });
        } else {
          movil = u.movil({ quien: "Familien Lunds mobil", app: "wa", hora: "20.10", cuerpo:
            u.fecha("17. maj") +
            u.ellos("Hej Tina. Skal vi holde Idas plads til næste år?", "10.00") +
            u.respuestas(["Ja, hold den til os", "Andet tidspunkt", "Vi stopper"], null, 2) +
            u.ellos("Tak, fordi I siger det. Vil du fortælle os hvorfor? Det hjælper os til at blive bedre.", "20.10", x.n(1)) +
            u.respuestas(["Tidspunktet passer ikke", "Prisen", "Vi flytter", "Andet"], null, 0)
          });
        }
        var datos = x.p === 0 ? [["1", "svar", ""], ["179", "mangler svar", ""]] :
          [["132", "fortsætter", "ok"], ["18", "skifter hold", ""], ["12", "stopper", "alerta"], ["18", "mangler svar", ""]];
        cuerpo = u.kpis(datos);
        if (x.p >= 1) {
          cuerpo += '<div class="caja' + x.n(1) + '"><h5>Hvorfor de stopper (12)</h5><ul class="lista-simple"><li><span>Tidspunktet passer ikke</span><strong>7</strong></li><li><span>De flytter</span><strong>3</strong></li><li><span>Prisen</span><strong>2</strong></li></ul></div>';
        }
        if (x.p === 1) cuerpo += '<div class="fila">' + u.btn("Se svarene", true) + "</div>";
        if (x.p === 2) {
          cuerpo += '<div class="caja caja-ia anim"><h5>Til næste skoleår</h5><p>7 familier stopper på grund af tidspunktet, og 5 af dem vil gerne have fredag eftermiddag. Med et engelskhold fredag kl. 15.00 kan du sikkert beholde dem.</p><p>Engelsk B1 får 14 elever: der skal oprettes et hold mere.</p></div>' +
            u.tabla(["Mangler svar", "Påmindelser", ""], [["Familien Mortensen", "2", u.chip("Får en påmindelse mandag", "info")], ["Familien Bak", "2", u.chip("Får en påmindelse mandag", "info")]]);
        }
        return movil + u.ventana({ quien: "Mettes computer", seccion: "Elever", cuerpo: '<div class="entre"><strong>Gentilmelding 2026/27</strong>' + u.chip("Frist: 31. maj", "marca") + "</div>" + cuerpo });
      }
    }
  ]
});
