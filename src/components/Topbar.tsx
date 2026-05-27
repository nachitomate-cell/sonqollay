import { useLocation } from "react-router-dom";
import { projects } from "../data/seed";

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
};

export default function Topbar() {
  const loc = useLocation();
  const meta = titles[loc.pathname] ?? { t: "Pacha AWP", s: "" };
  return (
    <header className="bg-white border-b border-ink-200 px-6 lg:px-8 py-4 flex items-center justify-between gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-ink-900">
          {meta.t}
        </h1>
        <p className="text-sm text-ink-500">{meta.s}</p>
      </div>
      <div className="flex items-center gap-3">
        <select
          defaultValue="P-001"
          className="text-sm border border-ink-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} — {p.cliente}
            </option>
          ))}
        </select>
        <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-semibold">
          IM
        </div>
      </div>
    </header>
  );
}
