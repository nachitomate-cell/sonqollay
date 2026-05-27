export type TipoPartner =
  | "Académico"
  | "Estatal"
  | "Tecnología"
  | "Software"
  | "EPC / Constructora"
  | "Subcontrato"
  | "Asociación";

export interface Partner {
  id: string;
  nombre: string;
  tipo: TipoPartner;
  pais: string;
  relacion: string;
  desde: string;
  proyectosCompartidos: number;
  contactoPrincipal: string;
  contactoEmail: string;
  contratoVigente: boolean;
  nps?: number;
  notas?: string;
}

export const partners: Partner[] = [
  {
    id: "PT-1",
    nombre: "USM AC3E — Centro Avanzado de Ingeniería Eléctrica y Electrónica",
    tipo: "Académico",
    pais: "Chile",
    relacion: "Co-desarrollo proyecto AURA AWP (IA aplicada a packaging)",
    desde: "2024-02-01",
    proyectosCompartidos: 1,
    contactoPrincipal: "Dra. M. Fernández",
    contactoEmail: "ac3e-aura@usm.cl",
    contratoVigente: true,
    nps: 88,
    notas:
      "Investigadores aportan modelos de optimización combinatoria. Cofinanciamiento CORFO vigente.",
  },
  {
    id: "PT-2",
    nombre: "CORFO — Programa Crea y Valida",
    tipo: "Estatal",
    pais: "Chile",
    relacion: "Cofinanciamiento del proyecto AURA AWP",
    desde: "2024-06-15",
    proyectosCompartidos: 1,
    contactoPrincipal: "Ejecutivo regional Valparaíso",
    contactoEmail: "creayvalida@corfo.cl",
    contratoVigente: true,
    notas: "Rendición trimestral. Próximo hito: agosto 2026.",
  },
  {
    id: "PT-3",
    nombre: "AWP University",
    tipo: "Académico",
    pais: "EE.UU. / Latam",
    relacion: "Alianza estratégica para profesionalización AWP en Chile y Perú",
    desde: "2023-09-20",
    proyectosCompartidos: 0,
    contactoPrincipal: "Director Latam",
    contactoEmail: "partners@awpuniversity.com",
    contratoVigente: true,
    nps: 76,
    notas: "Co-marca de cursos AWP avanzado y certificación.",
  },
  {
    id: "PT-4",
    nombre: "Construction Industry Institute (CII)",
    tipo: "Asociación",
    pais: "EE.UU.",
    relacion: "Acceso al body of knowledge AWP / AWP Champion network",
    desde: "2022-01-01",
    proyectosCompartidos: 0,
    contactoPrincipal: "Membership office",
    contactoEmail: "membership@cii.utexas.edu",
    contratoVigente: true,
  },
  {
    id: "PT-5",
    nombre: "Autodesk — Partner Latam",
    tipo: "Software",
    pais: "Chile / Latam",
    relacion:
      "Acceso preferente a Autodesk Construction Cloud y licencias para clientes.",
    desde: "2021-04-10",
    proyectosCompartidos: 3,
    contactoPrincipal: "Account Executive Mining",
    contactoEmail: "acc-mining@autodesk.com",
    contratoVigente: true,
    nps: 70,
  },
  {
    id: "PT-6",
    nombre: "buildingSMART Chile",
    tipo: "Asociación",
    pais: "Chile",
    relacion:
      "Capítulo nacional del estándar openBIM y certificación ISO 19650.",
    desde: "2020-11-05",
    proyectosCompartidos: 0,
    contactoPrincipal: "Comité técnico",
    contactoEmail: "contacto@buildingsmart.cl",
    contratoVigente: true,
  },
  {
    id: "PT-7",
    nombre: "Sigdo Koppers — EPC",
    tipo: "EPC / Constructora",
    pais: "Chile",
    relacion:
      "EPC contratista en Expansión Concentradora Norte. Sonqollay apoya BIM/AWP.",
    desde: "2025-08-12",
    proyectosCompartidos: 1,
    contactoPrincipal: "Project Director SK",
    contactoEmail: "pmo@sigdokoppers.cl",
    contratoVigente: true,
    nps: 64,
  },
  {
    id: "PT-8",
    nombre: "MEC-A Montajes Mecánicos",
    tipo: "Subcontrato",
    pais: "Chile",
    relacion:
      "Subcontrato de montaje mecánico en CWA-200. Recibe IWP liberados desde Pacha AWP.",
    desde: "2026-03-01",
    proyectosCompartidos: 1,
    contactoPrincipal: "Jefe de obra",
    contactoEmail: "obra@mec-a.cl",
    contratoVigente: true,
    nps: 58,
  },
  {
    id: "PT-9",
    nombre: "ELE-C Eléctricos del Norte",
    tipo: "Subcontrato",
    pais: "Chile",
    relacion: "Subcontrato instalaciones eléctricas CWA-200.",
    desde: "2026-04-01",
    proyectosCompartidos: 1,
    contactoPrincipal: "Coordinador eléctrico",
    contactoEmail: "ele-c@correo.cl",
    contratoVigente: true,
  },
  {
    id: "PT-10",
    nombre: "Tecnoglobal Cloud (DataCenter)",
    tipo: "Tecnología",
    pais: "Chile",
    relacion: "Hosting privado del CDE para proyectos con datos sensibles.",
    desde: "2023-02-14",
    proyectosCompartidos: 4,
    contactoPrincipal: "SLA Manager",
    contactoEmail: "sla@tecnoglobal.cl",
    contratoVigente: true,
    nps: 82,
  },
];
