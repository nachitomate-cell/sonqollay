export type CategoriaInt =
  | "BIM / Modelado"
  | "Planificación"
  | "ERP / Finanzas"
  | "Colaboración"
  | "BI / Datos"
  | "Aprendizaje"
  | "Identidad"
  | "IA";

export interface Integracion {
  id: string;
  nombre: string;
  categoria: CategoriaInt;
  proveedor: string;
  descripcion: string;
  estado: "Conectada" | "Disponible" | "Error" | "En piloto";
  ultimaSync?: string;
  alcance?: string;
  cuenta?: string;
  eventos24h?: number;
  iconLetter: string;
  color: string;
}

export interface SyncEvent {
  id: string;
  integracionId: string;
  ts: string;
  tipo: "sync" | "error" | "webhook" | "auth";
  detalle: string;
}

export const integraciones: Integracion[] = [
  {
    id: "I-1",
    nombre: "Autodesk Construction Cloud",
    categoria: "BIM / Modelado",
    proveedor: "Autodesk",
    descripcion:
      "Sincroniza modelos IFC, planos y transmittals del CDE. Aplica los estados ISO 19650 a los documentos.",
    estado: "Conectada",
    ultimaSync: "2026-05-27 03:42",
    alcance: "Project Files (R/W) · Issues (R)",
    cuenta: "bim-sonqollay@andescobre.cl",
    eventos24h: 184,
    iconLetter: "A",
    color: "#000000",
  },
  {
    id: "I-2",
    nombre: "Trimble Connect",
    categoria: "BIM / Modelado",
    proveedor: "Trimble",
    descripcion:
      "Federación de modelos multidisciplina y detección de clashes. Importa snapshots semanales al modelo de AURA.",
    estado: "Conectada",
    ultimaSync: "2026-05-26 21:08",
    alcance: "Models (R) · Comments (R/W)",
    eventos24h: 32,
    iconLetter: "T",
    color: "#0063A3",
  },
  {
    id: "I-3",
    nombre: "Primavera P6",
    categoria: "Planificación",
    proveedor: "Oracle",
    descripcion:
      "Importa el cronograma maestro y exporta las fechas de IWP liberados al programador del cliente.",
    estado: "Conectada",
    ultimaSync: "2026-05-27 05:00",
    alcance: "Activities (R/W) · Resources (R)",
    cuenta: "API key · sa-sonqollay",
    eventos24h: 6,
    iconLetter: "P",
    color: "#C72F2F",
  },
  {
    id: "I-4",
    nombre: "Power BI",
    categoria: "BI / Datos",
    proveedor: "Microsoft",
    descripcion:
      "Publica dataset semanal de portafolio (HH, readiness, ISO 19650) para los dashboards del cliente.",
    estado: "Conectada",
    ultimaSync: "2026-05-27 04:00",
    alcance: "Workspace publish (W)",
    eventos24h: 1,
    iconLetter: "P",
    color: "#F2C811",
  },
  {
    id: "I-5",
    nombre: "Defontana",
    categoria: "ERP / Finanzas",
    proveedor: "Defontana",
    descripcion:
      "Sincroniza facturación electrónica al SII y gastos por proyecto. Conecta horas del equipo a la facturación al cliente.",
    estado: "Conectada",
    ultimaSync: "2026-05-26 23:55",
    alcance: "DTE (R/W) · Centros de costo (R)",
    cuenta: "consultora@sonqollay.cl",
    eventos24h: 12,
    iconLetter: "D",
    color: "#0E7C66",
  },
  {
    id: "I-6",
    nombre: "Microsoft Teams",
    categoria: "Colaboración",
    proveedor: "Microsoft",
    descripcion:
      "Envía notificaciones a canales por proyecto: IWP liberados, constraints vencidos, comentarios de auditoría.",
    estado: "Conectada",
    ultimaSync: "—",
    alcance: "Chat.Send · Channels.Read",
    eventos24h: 41,
    iconLetter: "T",
    color: "#4B53BC",
  },
  {
    id: "I-7",
    nombre: "Aula Virtual (Moodle)",
    categoria: "Aprendizaje",
    proveedor: "aulavirtual.sonqollay.cl",
    descripcion:
      "Sincroniza inscritos, asistencia y certificados de cursos AWP / BIM / ISO 19650.",
    estado: "Conectada",
    ultimaSync: "2026-05-27 02:30",
    alcance: "Enrollments (R) · Completions (R)",
    eventos24h: 8,
    iconLetter: "M",
    color: "#FF7900",
  },
  {
    id: "I-8",
    nombre: "AURA AWP Engine",
    categoria: "IA",
    proveedor: "Sonqollay · USM AC3E",
    descripcion:
      "Motor de IA propio (CORFO Crea y Valida). Recibe el modelo IFC + Path of Construction y devuelve sugerencias de packaging.",
    estado: "En piloto",
    ultimaSync: "2026-05-26 18:12",
    alcance: "Models (R) · Suggestions (W)",
    eventos24h: 3,
    iconLetter: "✦",
    color: "#EA580C",
  },
  {
    id: "I-9",
    nombre: "Microsoft Entra ID (SSO)",
    categoria: "Identidad",
    proveedor: "Microsoft",
    descripcion:
      "Autenticación corporativa y aprovisionamiento de usuarios desde Active Directory.",
    estado: "Conectada",
    ultimaSync: "2026-05-27 06:00",
    alcance: "OpenID Connect · SCIM",
    cuenta: "tenant: sonqollay.onmicrosoft.com",
    iconLetter: "E",
    color: "#1F70C1",
  },
  {
    id: "I-10",
    nombre: "Buk (HR Chile)",
    categoria: "ERP / Finanzas",
    proveedor: "Buk",
    descripcion:
      "Trae nómina, vacaciones y disponibilidad real del equipo al cálculo de utilización.",
    estado: "Disponible",
    alcance: "—",
    iconLetter: "B",
    color: "#7A4DFF",
  },
  {
    id: "I-11",
    nombre: "Slack",
    categoria: "Colaboración",
    proveedor: "Salesforce",
    descripcion:
      "Notificaciones alternativas a Teams. Útil para proyectos donde el cliente usa Slack.",
    estado: "Disponible",
    alcance: "—",
    iconLetter: "S",
    color: "#611F69",
  },
  {
    id: "I-12",
    nombre: "Bentley iTwin",
    categoria: "BIM / Modelado",
    proveedor: "Bentley Systems",
    descripcion:
      "Soporte para proyectos modelados en Bentley (frecuente en energía y transmisión eléctrica).",
    estado: "Error",
    ultimaSync: "2026-05-25 12:14",
    alcance: "Models (R)",
    eventos24h: 0,
    iconLetter: "B",
    color: "#9B26B6",
  },
];

export const syncLog: SyncEvent[] = [
  {
    id: "L-1",
    integracionId: "I-1",
    ts: "2026-05-27 03:42",
    tipo: "sync",
    detalle: "184 documentos sincronizados desde ACC · 0 conflictos",
  },
  {
    id: "L-2",
    integracionId: "I-12",
    ts: "2026-05-25 12:14",
    tipo: "error",
    detalle: "401 Unauthorized · token expirado, renovar credencial",
  },
  {
    id: "L-3",
    integracionId: "I-3",
    ts: "2026-05-27 05:00",
    tipo: "sync",
    detalle: "Cronograma P-001 actualizado · 412 actividades",
  },
  {
    id: "L-4",
    integracionId: "I-5",
    ts: "2026-05-26 23:55",
    tipo: "sync",
    detalle: "12 DTE emitidas y enviadas al SII",
  },
  {
    id: "L-5",
    integracionId: "I-6",
    ts: "2026-05-27 07:15",
    tipo: "webhook",
    detalle: "Notificación enviada a canal #andes-cobre — IWP-200-MEC-002 listo",
  },
  {
    id: "L-6",
    integracionId: "I-8",
    ts: "2026-05-26 18:12",
    tipo: "sync",
    detalle: "AURA generó 4 sugerencias nuevas para CWA-200",
  },
  {
    id: "L-7",
    integracionId: "I-9",
    ts: "2026-05-27 06:00",
    tipo: "auth",
    detalle: "Aprovisionamiento SCIM · 1 usuario nuevo, 0 bajas",
  },
  {
    id: "L-8",
    integracionId: "I-7",
    ts: "2026-05-27 02:30",
    tipo: "sync",
    detalle: "8 nuevos inscritos en 'Fundamentos AWP'",
  },
];
