export type Discipline =
  | "Civil"
  | "Estructural"
  | "Mecánica"
  | "Piping"
  | "Eléctrica"
  | "Instrumentación"
  | "Arquitectura";

export type WPType = "CWA" | "CWP" | "EWP" | "IWP";

export type ConstraintKey =
  | "ingenieria"
  | "materiales"
  | "equipos"
  | "manoObra"
  | "permisos"
  | "seguridad"
  | "accesos"
  | "qaQc";

export interface Constraint {
  key: ConstraintKey;
  label: string;
  ok: boolean;
  responsable: string;
  fechaCompromiso: string;
}

export interface WorkPackage {
  id: string;
  type: WPType;
  code: string;
  nombre: string;
  parentId?: string;
  cwa?: string;
  disciplina?: Discipline;
  hh: number;
  hhEjecutadas: number;
  progreso: number;
  inicioPlan: string;
  finPlan: string;
  responsable: string;
  estado: "Planificado" | "Listo" | "En ejecución" | "Cerrado" | "Bloqueado";
  constraints?: Constraint[];
}

export interface Project {
  id: string;
  nombre: string;
  cliente: string;
  sector: "Minería" | "Energía" | "Industria" | "Infraestructura";
  ubicacion: string;
  bimMadurez: "Nivel 1" | "Nivel 2" | "Nivel 3";
  iso19650: number;
  inicio: string;
  fin: string;
  hhTotales: number;
  hhEjecutadas: number;
  riesgo: "Bajo" | "Medio" | "Alto";
}

export interface AuditItem {
  id: string;
  capitulo: string;
  requisito: string;
  estado: "Conforme" | "Observación" | "No conforme" | "N/A";
  evidencia?: string;
  responsable: string;
}
