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

export interface Contacto {
  nombre: string;
  cargo: string;
  email: string;
  telefono?: string;
}

export interface Oportunidad {
  id: string;
  nombre: string;
  etapa: "Prospecto" | "Propuesta" | "Negociación" | "Ganada" | "Perdida";
  monto: number;
  probabilidad: number;
  cierreEstimado: string;
}

export interface Cliente {
  id: string;
  razonSocial: string;
  sector: "Minería" | "Energía" | "Industria" | "Infraestructura" | "Pública";
  pais: string;
  rut: string;
  desde: string;
  proyectosActivos: number;
  ingresoAnual: number;
  nps: number;
  contactos: Contacto[];
  oportunidades: Oportunidad[];
}

export interface Acuerdo {
  id: string;
  descripcion: string;
  responsable: string;
  due: string;
  estado: "Abierto" | "En curso" | "Cerrado";
  proyectoId?: string;
}

export interface Reunion {
  id: string;
  titulo: string;
  fecha: string;
  hora: string;
  duracionMin: number;
  modalidad: "Presencial" | "Online" | "Híbrida";
  proyectoId?: string;
  clienteId?: string;
  organizador: string;
  asistentes: string[];
  agenda: string[];
  minuta?: string;
  acuerdos: Acuerdo[];
  estado: "Programada" | "Realizada" | "Cancelada";
}

export interface Curso {
  id: string;
  titulo: string;
  categoria: "AWP" | "BIM" | "ISO 19650" | "Lean Construction";
  modalidad: "Online" | "Presencial" | "B-Learning";
  duracionHoras: number;
  precio: number;
  proximaCohorte: string;
  inscritos: number;
  cupos: number;
  instructor: string;
  rating: number;
}

export interface Consultor {
  id: string;
  nombre: string;
  rol: string;
  especialidades: string[];
  utilizacion: number;
  cargaPorProyecto: { proyectoId: string; horas: number }[];
  certificaciones: string[];
  avatar: string;
}
