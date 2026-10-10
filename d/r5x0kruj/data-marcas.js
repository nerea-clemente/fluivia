/* Fluivia · Demo para clientes
   Marca y detalles propios de cada negocio de ejemplo (todo ficticio).
   Se combina con data.js. */
window.DEMO_MARCAS = {
  gestoria: {
    marca: {
      m1: "#1F3A5F", m1t: "#FFFFFF", m2: "#C9A227", m2t: "#1F3A5F", suave: "#F2F4F8", tinta: "#1B2533",
      fuente: "'Lora', Georgia, serif", radio: "6px",
      logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="8" fill="#1F3A5F"/><path d="M13 30V10h8.5a6 6 0 0 1 0 12H13m7.5 0 7 8" fill="none" stroke="#C9A227" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      lema: "Asesoría fiscal, laboral y contable desde 1998",
      web: "gestoriaribera.es"
    },
    portal: { titulo: "Mi área de cliente", info: [["Próximo plazo", "IVA del 3.er trimestre · 20 de octubre"], ["Tu gestora", "Ana Ribera"]] },
    citas: { titulo: "Pide cita en la gestoría", paso0: "¿Qué necesitas?" },
    gastos: {
      lista: [["Papelería Central", "Material de oficina", 23.4, 21, -9], ["Proveedor de internet", "Suministros", 45.98, 21, -8], ["Restaurante La Plaza", "Comidas con clientes", 38.5, 10, -6], ["Programa de contabilidad", "Software", 29, 21, -4], ["Parking Juzgados", "Desplazamientos", 6.5, 21, -2, true]],
      nuevo: { comercio: "Copistería Rápida", linea: "Copias y encuadernación", categoria: "Material de oficina", total: 18.15, ivaPct: 21 }
    }
  },

  inmobiliaria: {
    marca: {
      m1: "#C2553D", m1t: "#FFFFFF", m2: "#F2C9A0", m2t: "#3A2620", suave: "#F8F2EC", tinta: "#2B2220",
      fuente: "'DM Serif Display', Georgia, serif", radio: "14px",
      logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#C2553D"/><path d="M9 20 20 11l11 9M13 17.5V29h14V17.5" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 29v-6h4v6" fill="none" stroke="#F2C9A0" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      lema: "Tu casa, sin prisas y sin sorpresas",
      web: "inmobiliariabrisa.es"
    },
    portal: { titulo: "Mi compra", info: [["Vivienda", "C/ Colón 14 · 3.º B"], ["Firma prevista", "20 de noviembre en la notaría"]] },
    citas: { titulo: "Reserva tu visita", paso0: "¿Qué vivienda quieres ver?" },
    inmuebles: [
      { titulo: "Piso en C/ Colón 14", zona: "Centro", precio: "245.000 €", m2: 95, hab: 3, banos: 2, tono: ["#E9C9A8", "#C98A64"] },
      { titulo: "Ático con terraza", zona: "Ensanche", precio: "318.000 €", m2: 110, hab: 3, banos: 2, tono: ["#CFDCE3", "#7F9DAE"] },
      { titulo: "Casa con jardín", zona: "La Vega", precio: "389.000 €", m2: 160, hab: 4, banos: 3, tono: ["#D5E2C8", "#8FA977"] }
    ],
    gastos: {
      lista: [["Gasolinera Ruta 7", "Desplazamientos", 52, 21, -9], ["Fotografía Luz Estudio", "Fotografía de inmuebles", 217.8, 21, -7], ["Imprenta Gráficas Sur", "Carteles y folletos", 64.13, 21, -5], ["Cafetería El Puerto", "Comidas con clientes", 14.3, 10, -3], ["Llaves Rápidas", "Copias de llaves", 12, 21, -1, true]],
      nuevo: { comercio: "Ferretería Centro", linea: "Cartel «Se vende» x2", categoria: "Carteles y folletos", total: 24.2, ivaPct: 21 }
    }
  },

  academia: {
    marca: {
      m1: "#4B3FD1", m1t: "#FFFFFF", m2: "#FFC93C", m2t: "#2A2272", suave: "#F3F1FF", tinta: "#221C4F",
      fuente: "'Nunito', 'Trebuchet MS', sans-serif", radio: "18px",
      logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="20" fill="#4B3FD1"/><path d="M13.5 27V14l13 13V14" fill="none" stroke="#FFC93C" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      lema: "Idiomas y refuerzo escolar con grupos reducidos",
      web: "academianexo.es"
    },
    portal: { titulo: "Mi academia", info: [["Tu grupo", "Inglés B1 · lunes y miércoles, 18:00"], ["Tu profesora", "Sara Medina"], ["Asistencia", "92 % este trimestre"]] },
    citas: { titulo: "Reserva en la academia", paso0: "¿Qué quieres reservar?" },
    gastos: {
      lista: [["Editorial Aula Viva", "Libros y material", 299.52, 4, -9], ["Papelería Escolar", "Material de clase", 36.3, 21, -7], ["Plataforma de videollamadas", "Software", 14.99, 21, -5], ["Copistería Rápida", "Fotocopias", 22.6, 21, -3], ["Pastelería Dulce", "Fiesta fin de trimestre", 28, 10, -1, true]],
      nuevo: { comercio: "Papelería Escolar", linea: "Rotuladores pizarra x24", categoria: "Material de clase", total: 31.46, ivaPct: 21 }
    }
  },

  clinica: {
    marca: {
      m1: "#0F7C7E", m1t: "#FFFFFF", m2: "#BFE8E1", m2t: "#0B4F50", suave: "#EEF8F6", tinta: "#123B3C",
      fuente: "'Figtree', 'Segoe UI', sans-serif", radio: "12px",
      logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#0F7C7E"/><path d="M11 25a9 9 0 0 1 18 0" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/><path d="M8 29h24M20 10v3M12.5 13.5l2 2M27.5 13.5l-2 2" fill="none" stroke="#BFE8E1" stroke-width="2.6" stroke-linecap="round"/></svg>',
      lema: "Fisioterapia y pilates terapéutico",
      web: "clinicaalba.es"
    },
    portal: { titulo: "Mi tratamiento", info: [["Tratamiento", "Cervicales · sesión 4 de 8"], ["Próxima cita", "Jueves a las 18:00 con Laura"], ["Ejercicios para casa", "3 vídeos nuevos"]] },
    citas: { titulo: "Pide cita en la clínica", paso0: "¿Qué tipo de cita necesitas?" },
    profesionales: ["Laura Pons · Fisioterapia deportiva", "Jorge Sanz · Fisioterapia general", "Me da igual"],
    gastos: {
      lista: [["Suministros Fisio Pro", "Material sanitario", 411.4, 21, -9], ["Lavandería Blanco", "Lavandería de toallas", 58.08, 21, -7], ["Farmacia Central", "Material sanitario", 23.9, 21, -5], ["Programa de agenda", "Software", 39, 21, -3], ["Mercado del barrio", "Agua para la sala", 9.6, 10, -1, true]],
      nuevo: { comercio: "Suministros Fisio Pro", linea: "Vendaje neuromuscular x6", categoria: "Material sanitario", total: 47.19, ivaPct: 21 }
    }
  }
};
