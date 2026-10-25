/* Demo · Ejendomsmægler (fiktivt eksempel, dansk version) */
(window.DEMO_SECTORES = window.DEMO_SECTORES || []).push({
  id: "inmobiliaria",
  etiqueta: "Ejendomsmægler",
  tipo: "Ejendomsmæglerforretning",
  negocio: "Fjordbolig",
  lema: "Dit hjem solgt i ro og mag, uden overraskelser",
  cliente: "Køberen",
  software: { actual: "jeres mæglersystem og boligportalerne", medida: "et skræddersyet mæglersystem" },
  marca: {
    m1: "#C2553D", m1t: "#FFFFFF", m2: "#F6D9BE", m2t: "#3A2620", suave: "#F8F2EC", tinta: "#2B2220",
    fuente: "'DM Serif Display', Georgia, serif", radio: "14px",
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#C2553D"/><path d="M9 20 20 11l11 9M13 17.5V29h14V17.5" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 29v-6h4v6" fill="none" stroke="#F2C9A0" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  panel: ["Henvendelser", "Fremvisninger", "Boliger", "Salgsvurderinger", "Handler"],
  situacion: "Tre mæglere, omkring 40 boliger til salg og henvendelser fra Boligsiden, Boliga, hjemmesiden og telefonen. En stor del af dagen går med at svare, planlægge fremvisninger og jagte papirer.",
  dolores: [
    ["Interesserede, der bliver kolde", "En køber skriver via Boligsiden kl. 21.30 og får først svar næste dag. Til den tid har hun ringet til en anden mægler."],
    ["Fremvisninger via sms-ping-pong", "Det tager ti beskeder at finde en tid, og bagefter spørger ingen, hvad køberen syntes."],
    ["Sælgere, der spørger", "Sælgeren spørger »hvordan går det med vores hus?«, og uden tal fra fremvisningerne er det svært at tale om at sætte prisen ned."],
    ["Papirer frem til overtagelsen", "Tilstandsrapporten, energimærket og lånetilbuddet ligger spredt ud over mails og mapper."]
  ],
  casos: [
    {
      id: "contactos",
      montaje: { plazo: "2 uger", con: "Henvendelser fra Boligsiden og Boliga, jeres mæglersystem og sms" },
      nav: "Henvendelser fra portaler",
      titulo: "Henvendelser fra portalerne, besvaret på et minut",
      hoy: "Henvendelserne fra portalerne lander i indbakken på alle tider af døgnet. De bliver besvaret, når nogen har tid, nogle gange først næste dag.",
      con: "Alle henvendelser får svar inden for et minut. Køberen får de vigtigste spørgsmål og når frem til mægleren med en kvalificeret profil og et forslag til fremvisning.",
      pasos: [
        { quien: "auto", t: "En henvendelse kommer ind via Boligsiden kl. 21.30", d: "Emma er interesseret i lejligheden på Vestergade. Peter sidder ved middagsbordet og opdager det ikke.", boton: "Se, hvad der sker" },
        { quien: "auto", t: "Et minut senere har Emma fået svar", d: "I en besked med boligens nøgletal og to spørgsmål, der viser, om hun er seriøs: skal hun selv bo der, og hvordan er finansieringen på plads?", boton: "Emma svarer" },
        { quien: "auto", t: "Peter får en kvalificeret køber", d: "Emmas svar fylder hendes profil ud, og hun bliver markeret som prioritet. Hun får også forslag til en anden bolig, der passer til hende.", boton: "Tilbyd en fremvisning" },
        { quien: "cliente", nombre: "Emma, køber", t: "Emma vælger en tid til fremvisning", d: "Hun ser Peters ledige tider og vælger selv. Fremvisningen lander i hans kalender uden et eneste opkald.", boton: "Se resultatet" }
      ],
      final: { antes: "Henvendelser, der først bliver besvaret næste dag, og opkald for at finde ud af, om køberen er seriøs.", ahora: "Kl. 21.32 har Emma fået svar og en fremvisning, og Peter ser det hele om morgenen med profilen udfyldt." },
      escena: function (x) {
        var u = UI, out;
        var piso = { titulo: "Lejlighed, Vestergade 14", zona: "Centrum", m2: 95, hab: 3, banos: 2, tono: ["#E9C9A8", "#C98A64"] };
        var atico = { titulo: "Penthouse med tagterrasse", zona: "Havnen", m2: 110, hab: 3, banos: 2, tono: ["#CFDCE3", "#7F9DAE"] };
        if (x.p === 0) {
          return u.ventana({ quien: "Mæglerens indbakke", seccion: "Henvendelser", cuerpo:
            u.mail({ de: "Boligsiden", sinLogo: true, asunto: "Ny henvendelse om »Lejlighed, Vestergade 14«", clase: " anim", cuerpo:
              "<p><strong>Emma Lund</strong> · 20 12 34 56</p><p>»Hej. Jeg er interesseret i lejligheden. Er den stadig til salg? Kan jeg se den i denne uge?«</p><p class=\"tenue\">Modtaget kl. 21.30</p>" }) +
            '<div class="fila">' + u.chip("Peter er ikke online", "pend") + u.btn("Se, hvad der sker", true) + "</div>"
          });
        }
        var chat = u.ellos("Hej Emma. Jeg er Fjordboligs assistent. Ja, lejligheden er stadig til salg!" + u.inmueble(piso) + "Så vi kan vise dig den rigtige bolig: skal du selv bo i den? Og har du talt med din bank?", "21.31", x.n(1));
        if (x.p === 1) chat += u.respuestas(["Til os selv, og banken har forhåndsgodkendt os"], 0);
        if (x.p >= 2) chat += u.yo("Til os selv. Banken har forhåndsgodkendt os til 3,2 mio. kr. Vi er to voksne og et barn.", "21.31");
        if (x.p === 3) {
          chat += u.ellos("Perfekt. Peter, der er mægler på lejligheden, viser dig gerne rundt. Hvornår passer det dig?", "21.32", x.n(3)) +
            (x.fin ? u.respuestas(["Tor. kl. 17.00", "Fre. kl. 10.00", "Lør. kl. 11.00"], null, 0) +
              u.ellos("Fremvisningen er bekræftet: <strong>torsdag kl. 17.00</strong> på Vestergade 14. Du får en påmindelse dagen før.", "21.32", " anim")
              : u.respuestas(["Tor. kl. 17.00", "Fre. kl. 10.00", "Lør. kl. 11.00"], 0));
        }
        out = u.movil({ quien: "Emmas mobil", app: "wa", hora: "21.32", cuerpo: chat });

        var cuerpo;
        if (x.p === 1) {
          cuerpo = u.tabla(["Henvendelse", "Bolig", "Modtaget", "Status"], [
            ["Emma Lund", "Vestergade 14", "21.30", u.chip("Besvaret på 1 min.", "ok")],
            ["Mikkel Hansen", "Penthouse, Havnen", "19.12", u.chip("Venter på svar", "info")],
            ["Line Bech", "Villa, Engvej", "17.40", u.chip("Fremvisning lørdag", "ok")]
          ], ["is-resaltada"]);
        } else {
          cuerpo = '<div class="entre"><strong>Emma Lund</strong>' + u.chip("Prioritet", "alerta") + "</div>" +
            '<div class="anim">' + u.ficha([
              ["Søger", "Bolig til sig selv · 3 værelser"], ["Husstand", "Par med et barn"],
              ["Finansiering", "Forhåndsgodkendt i banken"], ["Budget", "Op til 3.200.000 kr."],
              ["Mægler", "Peter"]
            ]) + "</div>" +
            '<div class="caja caja-suave anim anim-2"><h5>Kunne også passe hende</h5>' + u.inmueble(atico) + "</div>" +
            (x.p === 2 ? '<div class="fila">' + u.btn("Tilbyd en fremvisning", true) + "</div>" : !x.fin ? '<p class="tenue">Emma har fået Peters ledige tider.</p>' :
              '<div class="caja anim"><h5>' + u.icono("calendario") + "Fremvisning i Peters kalender</h5><p>Torsdag kl. 17.00 · Vestergade 14 · Emma Lund</p></div>");
        }
        return out + u.ventana({ quien: "Peters computer", seccion: "Henvendelser", cuerpo: cuerpo });
      }
    },

    {
      id: "visitas",
      montaje: { plazo: "2 uger", con: "Jeres kalender og mæglersystem, eller et nyt" },
      nav: "Fremvisninger og feedback",
      titulo: "Bekræftede fremvisninger og feedback, der når frem til sælger",
      hoy: "Fremvisninger bliver bekræftet i hånden, nogle købere dukker ikke op, og ingen spørger, hvad de syntes. Sælger ved kun det, mægleren fortæller.",
      con: "En påmindelse med bekræftelse, en dagsplan til mægleren, et kort spørgsmål efter hver fremvisning og en ugerapport til sælger.",
      pasos: [
        { quien: "auto", t: "Dagen før: påmindelse med bekræftelse", d: "Emma får adresse, tidspunkt og navnet på den, der tager imod hende. Hun bekræfter med ét tryk.", boton: "Emma bekræfter" },
        { quien: "equipo", nombre: "Peter, mægler", t: "Peter har dagens plan på mobilen", d: "Hver fremvisning med det, køberen leder efter, så han ikke skal læse beskederne igennem igen.", boton: "Fremvisningen er slut" },
        { quien: "auto", t: "To timer senere: et spørgsmål til Emma", d: "Hvad syntes hun? Ét tryk. Er hun i tvivl, bliver hun spurgt, hvad der holder hende tilbage.", boton: "Emma svarer" },
        { quien: "auto", t: "Sælger får sin ugerapport", d: "Fremvisninger, interesserede og det, der går igen. Med tal i hånden er det lettere at tale om prisen.", boton: "Se resultatet" }
      ],
      final: { antes: "Købere, der ikke dukker op, feedback, der forsvinder, og en sælger, der ringer hver uge.", ahora: "Fremvisningerne bliver bekræftet automatisk, du ved, hvad hver køber synes, og sælger får sine tal hver fredag." },
      escena: function (x) {
        var u = UI, movil, ventana = "";
        if (x.p === 0) {
          movil = u.movil({ quien: "Emmas mobil", app: "wa", hora: "18.00", cuerpo:
            u.fecha("Onsdag") +
            u.ellos("Hej Emma. Vi ses i morgen kl. <strong>17.00</strong> på Vestergade 14, 3. th. Peter tager imod dig ved hoveddøren.", "18.00", " anim") +
            u.respuestas(["Jeg kommer", "Skift tidspunkt"], 0)
          });
          ventana = u.ventana({ quien: "Mæglerens computer", seccion: "Fremvisninger", cuerpo:
            u.agenda([["10.00", "<strong>Penthouse, Havnen</strong><small>Mikkel Hansen · bekræftet</small>"], ["12.30", "<strong>Villa, Engvej</strong><small>Line Bech · bekræftet</small>"], ["17.00", "<strong>Vestergade 14</strong><small>Emma Lund · venter på bekræftelse</small>", "libre"], ["18.30", "<strong>Vestergade 14</strong><small>Jakob Storm · bekræftet</small>"]])
          });
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Peters mobil", equipo: true, hora: "16.50", titulo: "Mine fremvisninger i dag", cuerpo:
            u.agenda([
              ["10.00", "<strong>Penthouse, Havnen</strong><small>Afholdt</small>"],
              ["12.30", "<strong>Villa, Engvej</strong><small>Afholdt</small>"],
              ["17.00", "<strong>Vestergade 14 · Emma Lund</strong><small>Skal selv bo der, par med et barn. Forhåndsgodkendt i banken.</small>", "nueva"]
            ]) +
            '<div class="caja caja-suave"><h5>' + u.icono("ubicacion") + "Vestergade 14, 3. th.</h5><p class=\"tenue\">Nøgler: nøgleskabet på kontoret, krog 7</p></div>" +
            u.btn("Fremvisningen er slut", true, "ancho")
          });
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Emmas mobil", app: "wa", hora: "19.00", cuerpo:
            u.ellos("Hej Emma. Hvad syntes du om lejligheden på Vestergade?", "19.00", " anim") +
            u.respuestas(["Jeg er vild med den", "Jeg er i tvivl", "Ikke noget for mig"], null, 1) +
            u.ellos("Tak. Hvad er det, der holder dig tilbage?", "19.01", " anim anim-2") +
            u.respuestas(["Køkkenet er for lille"], 0)
          });
          ventana = u.ventana({ quien: "Peters computer", seccion: "Fremvisninger", cuerpo:
            u.tabla(["Køber", "Bolig", "Feedback"], [
              ["Emma Lund", "Vestergade 14", u.chip("I tvivl", "pend")],
              ["Line Bech", "Villa, Engvej", u.chip("Vild med den", "ok")],
              ["Mikkel Hansen", "Penthouse, Havnen", u.chip("Ikke noget for ham", "alerta")]
            ], ["is-resaltada"])
          });
        } else {
          movil = u.movil({ quien: "Sælgers mobil", app: "mail", hora: "18.00", cuerpo:
            u.mail({ asunto: "Din lejlighed på Vestergade i denne uge", clase: " anim", cuerpo:
              "<p>Hej Jens</p><ul><li><strong>6 fremvisninger</strong>, 2 meget interesserede</li><li>Det, folk kan lide: lyset og beliggenheden</li><li>Det, der holder dem tilbage: <strong>køkkenet</strong> (3 af 6)</li><li>Visninger på Boligsiden: 412 (+18 %)</li></ul><p>Jeg ringer mandag, så vi kan tale om det. Peter</p>" })
          });
          ventana = u.ventana({ quien: "Peters computer", seccion: "Boliger", cuerpo:
            '<div class="entre"><strong>Vestergade 14 · uge 3</strong>' + u.chip("Rapport sendt til sælger", "ok") + "</div>" +
            u.kpis([["6", "fremvisninger"], ["2", "meget interesserede", "ok"], ["3 af 6", "synes, køkkenet er for lille", "alerta"]]) +
            u.tabla(["Køber", "Feedback", "Holder igen på grund af"], [["Emma Lund", u.chip("I tvivl", "pend"), "Køkkenet"], ["Jakob Storm", u.chip("Vild med den", "ok"), "-"], ["Clara Møller", u.chip("I tvivl", "pend"), "Køkkenet"]])
          });
        }
        return movil + ventana;
      }
    },

    {
      id: "captacion",
      montaje: { plazo: "2-3 uger", con: "Jeres hjemmeside og salgsdata fra jeres område" },
      nav: "Nye sælgere",
      titulo: "Sælgere, der beder om en vurdering via hjemmesiden",
      hoy: "Når folk vil sælge, ringer de til tre mæglere for at høre, hvad boligen er værd. Den, der svarer først og bedst, vinder.",
      con: "En vurderingsformular på hjemmesiden giver et vejledende prisniveau med det samme, og mægleren får sælger ind med alle oplysninger og en markedsanalyse klar.",
      pasos: [
        { quien: "cliente", nombre: "Jens, sælger", t: "Jens beder om en vurdering via hjemmesiden", d: "Adresse, kvadratmeter, værelser, stand og hvornår han vil sælge. To minutter.", boton: "Se min vurdering" },
        { quien: "auto", t: "Han får et vejledende prisniveau med det samme", d: "Beregnet ud fra nylige salg i området og med en invitation til, at en mægler kommer forbi og giver en præcis salgsvurdering.", boton: "Book en salgsvurdering" },
        { quien: "auto", t: "Peter får en forberedt sag", d: "Med boligens data, hvor hurtigt Jens vil sælge, og et udkast til markedsanalyse med sammenlignelige salg.", boton: "Gennemgå analysen" },
        { quien: "equipo", nombre: "Peter, mægler", t: "Peter gennemgår analysen og sender den", d: "Han retter det, han ser ved besøget, og sender den med jeres logo. Udbudsprisen sætter han altid selv.", boton: "Se resultatet" }
      ],
      final: { antes: "Vurderinger over telefonen, analyser lavet i hånden om aftenen og sælgere, der går til en anden mægler.", ahora: "Sælger har et første bud med det samme, og Peter møder op med analysen klar." },
      escena: function (x) {
        var u = UI, movil, cuerpo;
        if (x.p === 0) {
          movil = u.movil({ quien: "Jens' mobil", hora: "20.15", titulo: "Hvad er din bolig værd?", cuerpo:
            u.campos([
              ["Adresse", "Storegade 8, 2. tv."],
              ["Boligareal", "88 m²"],
              ["Værelser", u.opc(["1", "2", "3", "4+"], 2)],
              ["Stand", u.opc(["Trænger til renovering", "God", "Nyrenoveret"], 1)],
              ["Hvornår vil du sælge?", u.opc(["Nu", "Om 3 måneder", "Er bare nysgerrig"], 1)]
            ]) + u.btn("Se min vurdering", true, "ancho")
          });
          cuerpo = '<p class="tenue">Ingen nye vurderinger i dag.</p>';
        } else if (x.p === 1) {
          movil = u.movil({ quien: "Jens' mobil", hora: "20.16", titulo: "Din vurdering", cuerpo:
            '<div class="caja caja-suave anim" style="text-align:center"><p class="tenue">Vejledende prisniveau</p><p class="marca-fuente" style="font-size:26px;line-height:1.2">2,95-3,2 mio. kr.</p><p class="tenue">Ud fra 8 nylige salg i dit område</p></div>' +
            '<p class="peq anim anim-2">For at give dig en præcis pris skal en mægler se din bolig. Det er gratis og uforpligtende.</p>' +
            u.btn("Book en salgsvurdering", true, "ancho")
          });
          cuerpo = '<p class="tenue">Jens kigger på sin vurdering …</p>';
        } else {
          movil = "";
          cuerpo = '<div class="entre"><strong>Jens Sørensen · Storegade 8, 2. tv.</strong>' + u.chip("Vil sælge om 3 måneder", "alerta") + "</div>" +
            u.ficha([["Bolig", "88 m² · 3 vær. · god stand"], ["Prisniveau sendt", "2,95-3,2 mio. kr."], ["Salgsvurdering", "Mandag kl. 11.00"]]) +
            '<div class="caja caja-ia' + x.n(2) + '"><h5>' + u.icono("doc") + "Udkast til markedsanalyse</h5>" +
            u.tabla(["Solgt bolig", "m²", "Salgspris"], [["Storegade 22", "92", "3.150.000 kr."], ["Torvet 3", "85", "2.975.000 kr."], ["Nygade 40", "90", "3.195.000 kr."]]) + "</div>" +
            (x.p === 2 ? '<div class="fila">' + u.btn("Gennemgå analysen", true) + "</div>" :
              '<div class="caja anim"><div class="entre"><strong>Salgsvurdering Jens Sørensen.pdf</strong>' + u.chip("Godkendt af Peter", "ok") + '</div><p class="tenue">Anbefalet udbudspris efter besøget: 3.095.000 kr.</p></div>' +
              u.nota("Prisniveauet er vejledende. Udbudsprisen fastsætter mægleren, når han har set boligen."));
        }
        return movil + u.ventana({ quien: "Peters computer", seccion: "Salgsvurderinger", cuerpo: cuerpo });
      }
    },

    {
      id: "operacion",
      montaje: { plazo: "2-3 uger", con: "Jeres mæglersystem eller et skræddersyet sagsoverblik" },
      nav: "Fra købsaftale til nøgler",
      titulo: "Fra købsaftale til overtagelse, uden papirer, der forsvinder",
      hoy: "Tilstandsrapport, energimærke, lånetilbud, advokatgodkendelse … hvert dokument kommer fra sit eget sted, og nogen skal huske at bede om det.",
      con: "Hver handel har sit eget overblik over, hvad der mangler, og hvem der skal levere det. Køber og sælger får besked og kan følge med på mobilen.",
      pasos: [
        { quien: "equipo", nombre: "Peter, mægler", t: "Peter opretter handlen", d: "Ud fra overtagelsesdatoen bliver der lavet en liste over dokumenter, og hvem der skal levere hvad.", boton: "Send beskeder" },
        { quien: "auto", t: "Sælger bliver kun bedt om sit eget", d: "Jens mangler energimærket. Han kan uploade det eller bede mægleren om at bestille det.", boton: "Jens svarer" },
        { quien: "cliente", nombre: "Emma, køber", t: "Emma følger sin bolighandel på mobilen", d: "Hun kan se, hvor langt handlen er, hvornår hun overtager, og hvad hun selv skal uploade.", boton: "Upload lønsedler" },
        { quien: "auto", t: "Alt er klar til overtagelsen", d: "Når alt er på plads, får begge advokater besked, og køber og sælger får en aftale om nøgleoverdragelsen.", boton: "Se resultatet" }
      ],
      final: { antes: "Mails og opkald for at samle dokumenter og et par forskrækkelser i ugen op til overtagelsen.", ahora: "Alle ved, hvad de skal gøre, beskederne sendes automatisk, og handlen er klar til tiden." },
      escena: function (x) {
        var u = UI, movil;
        var ce = x.p >= 2 ? ["Energimærke", "ok", "Bestilt af mægleren · energikonsulent tirsdag"] : ["Energimærke", x.p === 1 ? "falta" : "pend", "Sælger"];
        var nom = x.p >= 3 ? ["Lønsedler til banken", "ok", "Køber · uploadet"] : ["Lønsedler til banken", "pend", "Køber"];
        var tas = x.p >= 3 ? ["Lånetilbud fra banken", "ok", "Banken · lån godkendt"] : ["Lånetilbud fra banken", "pend", "Banken"];
        var lista = [["Tilstandsrapport og elrapport", "ok", "Sælger · uploadet"], ce, ["BBR-meddelelse", "ok", "Mægler · hentet"], ["Købsaftale underskrevet med MitID", "ok", "Køber og sælger"], nom, tas];
        if (x.p === 0) movil = "";
        else if (x.p === 1) {
          movil = u.movil({ quien: "Jens' mobil (sælger)", app: "wa", hora: "10.00", cuerpo:
            u.ellos("Hej Jens. Inden overtagelsen <strong>1. december</strong> mangler vi kun <strong>energimærket</strong> for din lejlighed.<br><br>Har du det, eller skal vi bestille en energikonsulent?", "10.00", " anim") +
            u.respuestas(["Bestil det for mig", "Jeg har det"], 0)
          });
        } else if (x.p === 2) {
          movil = u.movil({ quien: "Emmas mobil (køber)", hora: "13.20", titulo: "Min bolighandel", cuerpo:
            u.inmueble({ titulo: "Lejlighed, Vestergade 14", zona: "Centrum", m2: 95, hab: 3, banos: 2, tono: ["#E9C9A8", "#C98A64"] }) +
            u.check([["Købsaftale", "ok", "Underskrevet 15. okt."], ["Advokatforbehold", "ok", "Godkendt af din advokat"], ["Finansiering", "pend", "Banken mangler dine lønsedler"], ["Overtagelse", "pend", "1. dec. kl. 12.00"]]) +
            u.btn(u.icono("subir") + "Upload lønsedler", true, "ancho")
          });
        } else {
          movil = u.movil({ quien: "Emmas mobil (køber)", app: "wa", hora: "9.00", cuerpo:
            u.ellos("Alt er klar, Emma! Du overtager lejligheden <strong>1. december kl. 12.00</strong>.<br><br>Peter møder dig på Vestergade 14 og giver dig nøglerne. Husk at aflæse målerne sammen med ham.", "9.00", " anim")
          });
        }
        var cuerpo = '<div class="entre"><strong>Handel: Vestergade 14</strong>' + u.chip("Overtagelse: 1. dec.", "marca") + "</div>" +
          u.barra(lista.filter(function (l) { return l[1] === "ok"; }).length, lista.length, "Dokumenter på plads") +
          u.check(lista);
        if (x.p === 0) cuerpo += '<div class="fila">' + u.btn("Send beskeder", true) + "</div>";
        if (x.p === 3) cuerpo += '<div class="caja caja-suave anim"><h5>' + u.icono("correo") + "Dokumenter sendt til begge advokater</h5><p>Køber og sælger har fået tid til nøgleoverdragelsen.</p></div>";
        return movil + u.ventana({ quien: "Peters computer", seccion: "Handler", cuerpo: cuerpo });
      }
    }
  ]
});
