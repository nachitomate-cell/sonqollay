import { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "./Modal";
import { glossary } from "../data/glossary";

interface HelpContent {
  titulo: string;
  proposito: string;
  comoUsar: string[];
  conceptos: string[];
}

const help: Record<string, HelpContent> = {
  "/dashboard": {
    titulo: "Dashboard del portafolio",
    proposito:
      "Vista ejecutiva con el estado consolidado de todos los proyectos en consultoría. Pensado para reuniones de comité quincenal con la dirección.",
    comoUsar: [
      "Revisa los 4 KPI superiores: HH empaquetadas, proyectos activos, IWP listos y cumplimiento ISO 19650.",
      "Los gráficos muestran distribución por sector y nivel de riesgo del portafolio.",
      "Más abajo aparecen las próximas reuniones y acuerdos pendientes — clic en 'Ver agenda' lleva al detalle.",
      "Cambia de proyecto desde el selector del topbar para filtrar la vista.",
    ],
    conceptos: ["AWP", "IWP", "CDE"],
  },
  "/work-packages": {
    titulo: "Work Packages",
    proposito:
      "Jerarquía del alcance: CWA → CWP → EWP → IWP. Es la espina dorsal de un proyecto AWP.",
    comoUsar: [
      "Usa los filtros para ver solo un nivel (ej. solo IWP listos para terreno).",
      "Clic en + para expandir un paquete y ver sus hijos.",
      "Los CWP típicamente tienen 40-80 mil HH; los IWP entre 500-5.000 HH.",
      "Crea nuevos paquetes con el botón superior derecho.",
    ],
    conceptos: ["AWP", "CWA", "CWP", "EWP", "IWP"],
  },
  "/readiness": {
    titulo: "Readiness IWP",
    proposito:
      "Matriz de removal de constraints. Un IWP solo se libera a terreno cuando los 8 constraints están verdes. Es la regla más importante del método AWP.",
    comoUsar: [
      "Cada columna es un constraint (ingeniería, materiales, equipos, M.O., permisos, HSE, accesos, QA/QC).",
      "✓ verde = OK · ✕ rojo = falta · score % muestra cuántos están resueltos.",
      "Los IWP al 100% muestran botón 'Liberar IWP'. Bajo eso, no liberables.",
      "Más abajo verás la lista priorizada de constraints abiertos con responsable.",
    ],
    conceptos: ["IWP", "Constraints", "ROS"],
  },
  "/path": {
    titulo: "Path of Construction",
    proposito:
      "Vista Gantt de la secuencia constructiva. Permite ver carga por disciplina y detectar paquetes que llegan tarde o están al inicio.",
    comoUsar: [
      "Cada fila es un work package coloreado por disciplina.",
      "La línea roja vertical marca el día de hoy.",
      "La franja oscura dentro de cada barra muestra el % de avance.",
      "Usa esta vista para validar con el cliente la secuencia antes de comprometer fechas.",
    ],
    conceptos: ["POC", "IWP", "Takt"],
  },
  "/audit": {
    titulo: "Auditoría ISO 19650",
    proposito:
      "Checklist vivo del cumplimiento de gestión de información según ISO 19650-2 (fase de entrega del activo).",
    comoUsar: [
      "Cada fila es un requisito de la norma con su estado: Conforme / Observación / No conforme / N/A.",
      "El score global excluye los N/A.",
      "Adjunta evidencia (códigos de documento, links al CDE) y asigna responsable.",
      "'Generar informe PDF' produce el informe formal de auditoría.",
    ],
    conceptos: ["BEP", "OIR", "AIR", "EIR", "MIDP", "TIDP", "CDE", "As Built"],
  },
  "/aura": {
    titulo: "AURA · Asistente AI",
    proposito:
      "Asistente que cruza el modelo BIM, el Path of Construction y el estado de constraints. Continuación digital del proyecto AURA AWP (Sonqollay · USM AC3E · CORFO).",
    comoUsar: [
      "Pregúntale en lenguaje natural por el plan de la próxima semana.",
      "Las sugerencias automáticas vienen agrupadas por tipo: Packaging, Riesgo, Productividad, Ingeniería.",
      "Aplica o descarta cada sugerencia — el modelo aprende del feedback.",
      "La sección inferior muestra cómo se entrena AURA con datos del CDE.",
    ],
    conceptos: ["IWP", "Clash detection", "POC"],
  },
  "/clientes": {
    titulo: "Clientes (CRM)",
    proposito:
      "Cartera de cuentas con contactos, NPS, ingresos y pipeline comercial. Reemplaza la planilla manual de seguimiento de clientes.",
    comoUsar: [
      "Lista izquierda: todas las cuentas; selecciona para ver el detalle.",
      "NPS coloreado verde / amarillo / rojo según rango.",
      "El pipeline ponderado calcula monto × probabilidad de cada oportunidad.",
      "Genera nuevas reuniones y oportunidades directamente desde la ficha.",
    ],
    conceptos: [],
  },
  "/reuniones": {
    titulo: "Reuniones",
    proposito:
      "Agenda con minutas y acuerdos vinculados a proyectos/clientes. Cierra el ciclo: lo que se acuerda queda registrado y con responsable.",
    comoUsar: [
      "Lista izquierda: agenda ordenada por fecha (próximas + realizadas).",
      "Selecciona una reunión para ver agenda, asistentes, minuta y acuerdos.",
      "Cada acuerdo tiene responsable, due date y estado (Abierto / En curso / Cerrado).",
      "Los acuerdos vinculados a un proyecto también aparecen en el dashboard.",
    ],
    conceptos: [],
  },
  "/academia": {
    titulo: "Academia Sonqollay",
    proposito:
      "Catálogo de cursos del Aula Virtual. Permite ver ocupación, ingreso proyectado y gestionar inscripciones.",
    comoUsar: [
      "Cada tarjeta es un curso con su categoría (AWP / BIM / ISO 19650 / Lean).",
      "La barra inferior muestra ocupación; verde sobre 85%, ámbar bajo 60%.",
      "'Inscritos' lleva a la lista de alumnos de esa cohorte.",
      "Para crear una nueva cohorte, usa el menú del curso.",
    ],
    conceptos: ["AWP", "BIM"],
  },
  "/equipo": {
    titulo: "Equipo de consultores",
    proposito:
      "Capacidad y carga del equipo. Permite detectar sobrecarga (>90%) o subutilización (<50%) y rebalancear asignaciones.",
    comoUsar: [
      "Cada tarjeta es un consultor con utilización vs. objetivo 75-85%.",
      "La barra roja indica sobrecarga; verde, rango óptimo.",
      "'Asignación' lista horas/mes por proyecto.",
      "Filtra por especialidad cuando necesites armar un equipo nuevo.",
    ],
    conceptos: [],
  },
  "/documentos": {
    titulo: "CDE — Documentos ISO 19650",
    proposito:
      "Entorno común de datos (Common Data Environment). Repositorio único del proyecto con los 4 estados que exige la norma.",
    comoUsar: [
      "Filtra por estado: WIP (trabajo en curso), Shared (compartido para coordinación), Published (aprobado para construcción), Archived.",
      "Cada documento muestra disciplina, autor, revisión y código según ISO 19650-2.",
      "Las transiciones de estado son irreversibles y quedan en el log de actividad.",
    ],
    conceptos: ["CDE", "BEP", "MIDP", "As Built"],
  },
  "/integraciones": {
    titulo: "Integraciones",
    proposito:
      "Hub central de sistemas conectados: BIM, planificación, ERP, BI, identidad y la propia AURA AI. Permite ver salud de cada conexión y rotar credenciales.",
    comoUsar: [
      "Filtra por categoría con los botones superiores.",
      "Estado verde = conectada · ámbar = en piloto · rojo = error (revisar log).",
      "Clic en una tarjeta abre detalle con scopes, cuenta y acciones (sincronizar / desconectar).",
      "El registro de actividad muestra los últimos eventos: sync, webhook, auth, error.",
    ],
    conceptos: ["CDE", "BIM", "IFC"],
  },
  "/partners": {
    titulo: "Partners y proveedores",
    proposito:
      "Red externa de Sonqollay: alianzas académicas (USM AC3E, AWP University), estatales (CORFO), software (Autodesk), subcontratos y asociaciones.",
    comoUsar: [
      "Filtra por tipo de partner con los chips superiores.",
      "Cada tarjeta muestra relación, contrato, proyectos compartidos y NPS donde aplica.",
      "Usa esta vista para gestionar renovaciones y detectar partners con bajo NPS.",
    ],
    conceptos: [],
  },
  "/stakeholders": {
    titulo: "Mapa de stakeholders",
    proposito:
      "Visualiza todos los actores de un proyecto y su nivel de influencia/interés. Base para definir estrategia de comunicación (informar, consultar, involucrar, gestionar de cerca).",
    comoUsar: [
      "Selecciona un proyecto en el selector superior.",
      "En el grafo, tamaño del nodo = influencia · línea continua = interés alto/medio · punteada = interés bajo.",
      "La matriz inferior es la lista detallada con contacto directo (clic en email abre tu cliente de correo).",
    ],
    conceptos: [],
  },
};

export default function HelpModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const loc = useLocation();
  const content = help[loc.pathname] ?? help["/dashboard"];
  const [showGlossary, setShowGlossary] = useState(false);
  const relevantes = glossary.filter((g) => content.conceptos.includes(g.term));

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Ayuda · ${content.titulo}`}
      subtitle="Atajos: ? abre esta ayuda · ⌘K busca · Esc cierra"
      size="lg"
    >
      <div className="space-y-6">
        <section>
          <div className="text-xs uppercase tracking-wider text-brand-700 font-semibold mb-1">
            Propósito
          </div>
          <p className="text-ink-700">{content.proposito}</p>
        </section>

        <section>
          <div className="text-xs uppercase tracking-wider text-brand-700 font-semibold mb-2">
            Cómo usar esta pantalla
          </div>
          <ol className="space-y-2 text-ink-700 list-decimal pl-5">
            {content.comoUsar.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>
        </section>

        {relevantes.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs uppercase tracking-wider text-brand-700 font-semibold">
                Conceptos relevantes
              </div>
              <button
                onClick={() => setShowGlossary((s) => !s)}
                className="text-xs font-semibold text-brand-700 hover:text-brand-800"
              >
                {showGlossary ? "Ocultar todo" : "Ver glosario completo →"}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relevantes.map((g) => (
                <div
                  key={g.term}
                  className="p-3 rounded-lg border border-ink-200 bg-ink-50"
                >
                  <div className="font-semibold text-ink-900">
                    {g.term}
                    {g.full && (
                      <span className="font-normal text-ink-500 text-sm ml-2">
                        ({g.full})
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink-700 mt-1">{g.definicion}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {showGlossary && (
          <section>
            <div className="text-xs uppercase tracking-wider text-brand-700 font-semibold mb-2">
              Glosario completo
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {glossary
                .filter((g) => !content.conceptos.includes(g.term))
                .map((g) => (
                  <div
                    key={g.term}
                    className="p-3 rounded-lg border border-ink-200"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink-900">
                        {g.term}
                      </span>
                      <span className="pill bg-ink-100 text-ink-700">
                        {g.categoria}
                      </span>
                    </div>
                    {g.full && (
                      <div className="text-xs text-ink-500 mt-0.5">
                        {g.full}
                      </div>
                    )}
                    <p className="text-sm text-ink-700 mt-1">{g.definicion}</p>
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>
    </Modal>
  );
}
