export interface GlossaryEntry {
  term: string;
  full?: string;
  categoria: "AWP" | "BIM" | "ISO 19650" | "Lean" | "General";
  definicion: string;
}

export const glossary: GlossaryEntry[] = [
  {
    term: "AWP",
    full: "Advanced Work Packaging",
    categoria: "AWP",
    definicion:
      "Metodología que descompone el alcance de un proyecto en paquetes alineados a la secuencia constructiva, integrando ingeniería, suministros y construcción desde el día uno.",
  },
  {
    term: "CWA",
    full: "Construction Work Area",
    categoria: "AWP",
    definicion:
      "Área constructiva: división geográfica/funcional del proyecto (ej. molienda, lixiviación). Contiene varios CWP.",
  },
  {
    term: "CWP",
    full: "Construction Work Package",
    categoria: "AWP",
    definicion:
      "Paquete de construcción que agrupa trabajo similar dentro de una CWA. Típicamente 40-80 mil HH.",
  },
  {
    term: "EWP",
    full: "Engineering Work Package",
    categoria: "AWP",
    definicion:
      "Paquete de ingeniería alineado a un CWP. Define qué entregables de diseño se necesitan para construir ese paquete.",
  },
  {
    term: "IWP",
    full: "Installation Work Package",
    categoria: "AWP",
    definicion:
      "Paquete de instalación ejecutable en terreno (1-3 semanas, 500-5.000 HH). Solo se libera cuando los 8 constraints están OK.",
  },
  {
    term: "POC",
    full: "Path of Construction",
    categoria: "AWP",
    definicion:
      "Secuencia lógica en que el trabajo debe ocurrir en terreno. Es la base sobre la que se empaquetan los IWP.",
  },
  {
    term: "Constraints",
    categoria: "AWP",
    definicion:
      "Restricciones que deben removerse antes de liberar un IWP: ingeniería, materiales, equipos, mano de obra, permisos, HSE, accesos y QA/QC.",
  },
  {
    term: "ROS",
    full: "Required-on-Site",
    categoria: "AWP",
    definicion:
      "Fecha en que un material o entregable debe estar en obra para no bloquear el IWP que lo necesita.",
  },
  {
    term: "BIM",
    full: "Building Information Modeling",
    categoria: "BIM",
    definicion:
      "Modelado de información de construcción. Modelo 3D paramétrico que contiene cantidades, propiedades y secuencia constructiva.",
  },
  {
    term: "IFC",
    full: "Industry Foundation Classes",
    categoria: "BIM",
    definicion:
      "Formato abierto e interoperable para intercambiar modelos BIM entre distintos softwares.",
  },
  {
    term: "Clash detection",
    categoria: "BIM",
    definicion:
      "Detección automática de interferencias entre disciplinas (piping vs eléctrico, estructura vs mecánico) sobre el modelo federado.",
  },
  {
    term: "CDE",
    full: "Common Data Environment",
    categoria: "ISO 19650",
    definicion:
      "Entorno común de datos. Repositorio único del proyecto con estados WIP, Shared, Published y Archived.",
  },
  {
    term: "BEP",
    full: "BIM Execution Plan",
    categoria: "ISO 19650",
    definicion:
      "Plan de ejecución BIM. Hay versión pre-contrato y post-contrato; define cómo se gestionará la información en el proyecto.",
  },
  {
    term: "OIR",
    full: "Organizational Information Requirements",
    categoria: "ISO 19650",
    definicion:
      "Requisitos de información a nivel organizacional del mandante.",
  },
  {
    term: "AIR",
    full: "Asset Information Requirements",
    categoria: "ISO 19650",
    definicion:
      "Requisitos de información para la operación del activo durante su vida útil.",
  },
  {
    term: "EIR",
    full: "Exchange Information Requirements",
    categoria: "ISO 19650",
    definicion:
      "Requisitos de intercambio de información: qué entrega cada equipo, cuándo y en qué formato.",
  },
  {
    term: "MIDP",
    full: "Master Information Delivery Plan",
    categoria: "ISO 19650",
    definicion:
      "Plan maestro de entrega de información del proyecto. Consolida los TIDP de cada equipo.",
  },
  {
    term: "TIDP",
    full: "Task Information Delivery Plan",
    categoria: "ISO 19650",
    definicion:
      "Plan de entrega por equipo de trabajo (estructura, MEP, etc.). Insumo del MIDP.",
  },
  {
    term: "As Built",
    categoria: "ISO 19650",
    definicion:
      "Modelo y documentación que refleja la obra realmente construida, listo para entregar al operador.",
  },
  {
    term: "Last Planner",
    full: "Last Planner System",
    categoria: "Lean",
    definicion:
      "Sistema Lean de planificación colaborativa con compromisos confiables del último planificador (capataz / supervisor).",
  },
  {
    term: "Takt",
    full: "Takt Planning",
    categoria: "Lean",
    definicion:
      "Planificación por ritmo: divide la obra en zonas y secuencia el trabajo de cuadrillas con cadencia fija, eliminando esperas.",
  },
  {
    term: "PPC",
    full: "Percent Plan Complete",
    categoria: "Lean",
    definicion:
      "Indicador Last Planner: % de actividades comprometidas que se cumplieron en la semana.",
  },
];
