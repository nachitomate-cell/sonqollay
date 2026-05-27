import { useLocation } from "react-router-dom";
import { projects } from "../data/seed";
import Notifications from "./Notifications";

const titles: Record<string, { t: string; s: string }> = {
  "/dashboard": {
    t: "Dashboard del portafolio",
    s: "Vista consolidada del estado de los proyectos en consultoría",
  },
  "/work-packages": {
    t: "Work Packages",
    s: "Jerarquía CWA → CWP → EWP → IWP",
  },
  "/readiness": {
    t: "Readiness de IWP",
    s: "Levantamiento de constraints antes de liberar paquetes a terreno",
  },
  "/path": {
    t: "Path of Construction",
    s: "Secuencia constructiva y carga de HH proyectada",
  },
  "/audit": {
    t: "Auditoría ISO 19650",
    s: "Checklist de cumplimiento de gestión de información",
  },
  "/aura": {
    t: "AURA · Asistente AI",
    s: "Sugerencias de packaging y detección de riesgos sobre el modelo BIM",
  },
  "/clientes": {
    t: "Clientes",
    s: "CRM con cuentas, contactos, NPS y pipeline de oportunidades",
  },
  "/reuniones": {
    t: "Reuniones",
    s: "Agenda, minutas y acuerdos vinculados a proyectos y clientes",
  },
  "/academia": {
    t: "Academia Sonqollay",
    s: "Catálogo de cursos AWP, BIM, ISO 19650 y Lean Construction",
  },
  "/equipo": {
    t: "Equipo de consultores",
    s: "Capacidad, utilización y asignación a proyectos",
  },
  "/documentos": {
    t: "CDE · Documentos",
    s: "Entorno común de datos en los 4 estados de ISO 19650",
  },
};

interface Props {
  onOpenSearch: () => void;
  onOpenHelp: () => void;
}

export default function Topbar({ onOpenSearch, onOpenHelp }: Props) {
  const loc = useLocation();
  const meta = titles[loc.pathname] ?? { t: "Pacha AWP", s: "" };

  const isMac =
    typeof navigator !== "undefined" &&
    navigator.platform.toLowerCase().includes("mac");
  const kCombo = isMac ? "⌘K" : "Ctrl K";

  return (
    <header className="bg-white border-b border-ink-200 px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight text-ink-900 truncate">
          {meta.t}
        </h1>
        <p className="text-sm text-ink-500 truncate">{meta.s}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg border border-ink-200 bg-ink-50 hover:bg-white text-sm text-ink-500 min-w-[230px]"
          title="Buscar (Cmd/Ctrl + K)"
        >
          <span>⌕</span>
          <span className="flex-1 text-left">Buscar…</span>
          <kbd className="text-[10px] text-ink-500 bg-white border border-ink-200 px-1.5 py-0.5 rounded">
            {kCombo}
          </kbd>
        </button>

        <button
          onClick={onOpenSearch}
          className="md:hidden w-9 h-9 rounded-lg border border-ink-200 bg-white hover:bg-ink-50 flex items-center justify-center text-ink-600"
          aria-label="Buscar"
        >
          ⌕
        </button>

        <select
          defaultValue="P-001"
          className="hidden lg:block text-sm border border-ink-200 rounded-lg px-3 h-9 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>

        <Notifications />

        <button
          onClick={onOpenHelp}
          className="w-9 h-9 rounded-lg border border-ink-200 bg-white hover:bg-ink-50 flex items-center justify-center text-ink-600 font-bold"
          aria-label="Ayuda"
          title="Ayuda contextual ( ? )"
        >
          ?
        </button>

        <div
          className="w-9 h-9 rounded-full brand-gradient text-white flex items-center justify-center text-sm font-semibold shadow-sm"
          title="Ignacio (usuario)"
        >
          IM
        </div>
      </div>
    </header>
  );
}
