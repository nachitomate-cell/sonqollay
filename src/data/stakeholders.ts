export type RolStakeholder =
  | "Mandante"
  | "Owner Engineer"
  | "EPC"
  | "Subcontrato"
  | "Autoridad"
  | "Sonqollay"
  | "Partner";

export interface Stakeholder {
  id: string;
  nombre: string;
  rol: RolStakeholder;
  entidad: string;
  influencia: "Alta" | "Media" | "Baja";
  interes: "Alto" | "Medio" | "Bajo";
  contacto: string;
  proyectoId: string;
}

export const stakeholders: Stakeholder[] = [
  // P-001 Expansión Concentradora Norte — Andes Cobre
  {
    id: "S-1",
    nombre: "Carolina Fuentes",
    rol: "Mandante",
    entidad: "Minera Andes Cobre",
    influencia: "Alta",
    interes: "Alto",
    contacto: "cfuentes@andescobre.cl",
    proyectoId: "P-001",
  },
  {
    id: "S-2",
    nombre: "Eduardo Rojas",
    rol: "Mandante",
    entidad: "Minera Andes Cobre · BIM Manager",
    influencia: "Media",
    interes: "Alto",
    contacto: "erojas@andescobre.cl",
    proyectoId: "P-001",
  },
  {
    id: "S-3",
    nombre: "Sigdo Koppers",
    rol: "EPC",
    entidad: "Sigdo Koppers S.A.",
    influencia: "Alta",
    interes: "Alto",
    contacto: "pmo@sigdokoppers.cl",
    proyectoId: "P-001",
  },
  {
    id: "S-4",
    nombre: "MEC-A Montajes",
    rol: "Subcontrato",
    entidad: "MEC-A Mecánicos",
    influencia: "Media",
    interes: "Alto",
    contacto: "obra@mec-a.cl",
    proyectoId: "P-001",
  },
  {
    id: "S-5",
    nombre: "ELE-C",
    rol: "Subcontrato",
    entidad: "ELE-C Eléctricos del Norte",
    influencia: "Media",
    interes: "Medio",
    contacto: "ele-c@correo.cl",
    proyectoId: "P-001",
  },
  {
    id: "S-6",
    nombre: "SERNAGEOMIN",
    rol: "Autoridad",
    entidad: "Servicio Nacional de Geología y Minería",
    influencia: "Alta",
    interes: "Medio",
    contacto: "fiscalizacion@sernageomin.cl",
    proyectoId: "P-001",
  },
  {
    id: "S-7",
    nombre: "SEC",
    rol: "Autoridad",
    entidad: "Superintendencia de Electricidad y Combustibles",
    influencia: "Media",
    interes: "Bajo",
    contacto: "tramites@sec.cl",
    proyectoId: "P-001",
  },
  {
    id: "S-8",
    nombre: "Luis Maturana",
    rol: "Sonqollay",
    entidad: "Sonqollay · AWP Lead",
    influencia: "Alta",
    interes: "Alto",
    contacto: "l.maturana@sonqollay.cl",
    proyectoId: "P-001",
  },
  {
    id: "S-9",
    nombre: "Katy Vásquez",
    rol: "Sonqollay",
    entidad: "Sonqollay · BIM Lead",
    influencia: "Media",
    interes: "Alto",
    contacto: "k.vasquez@sonqollay.cl",
    proyectoId: "P-001",
  },
  {
    id: "S-10",
    nombre: "Autodesk",
    rol: "Partner",
    entidad: "Autodesk Latam",
    influencia: "Baja",
    interes: "Medio",
    contacto: "acc-mining@autodesk.com",
    proyectoId: "P-001",
  },

  // P-002 Hidrógeno Magallanes
  {
    id: "S-11",
    nombre: "Daniela Pinto",
    rol: "Mandante",
    entidad: "Energía Austral",
    influencia: "Alta",
    interes: "Alto",
    contacto: "dpinto@energiaaustral.com",
    proyectoId: "P-002",
  },
  {
    id: "S-12",
    nombre: "Owner Engineer Externo",
    rol: "Owner Engineer",
    entidad: "Worley Chile",
    influencia: "Media",
    interes: "Alto",
    contacto: "po@worley.cl",
    proyectoId: "P-002",
  },
  {
    id: "S-13",
    nombre: "Sonqollay AWP Cell",
    rol: "Sonqollay",
    entidad: "Sonqollay",
    influencia: "Media",
    interes: "Alto",
    contacto: "consultora@sonqollay.cl",
    proyectoId: "P-002",
  },
  {
    id: "S-14",
    nombre: "SEA Magallanes",
    rol: "Autoridad",
    entidad: "Servicio de Evaluación Ambiental",
    influencia: "Alta",
    interes: "Medio",
    contacto: "magallanes@sea.gob.cl",
    proyectoId: "P-002",
  },

  // P-003 Subestación Atacama
  {
    id: "S-15",
    nombre: "Pablo Mendoza",
    rol: "Mandante",
    entidad: "Transmisión Norte",
    influencia: "Alta",
    interes: "Alto",
    contacto: "pmendoza@transnorte.cl",
    proyectoId: "P-003",
  },
  {
    id: "S-16",
    nombre: "SEC",
    rol: "Autoridad",
    entidad: "Superintendencia de Electricidad y Combustibles",
    influencia: "Alta",
    interes: "Alto",
    contacto: "tramites@sec.cl",
    proyectoId: "P-003",
  },
  {
    id: "S-17",
    nombre: "Katy Vásquez",
    rol: "Sonqollay",
    entidad: "Sonqollay · BIM Lead",
    influencia: "Media",
    interes: "Alto",
    contacto: "k.vasquez@sonqollay.cl",
    proyectoId: "P-003",
  },
];
