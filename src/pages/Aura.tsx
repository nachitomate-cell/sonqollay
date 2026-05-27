import { useState } from "react";

const sugerencias = [
  {
    tipo: "Packaging",
    icono: "✦",
    color: "bg-brand-100 text-brand-700",
    titulo: "Dividir IWP-200-MEC-003 en dos paquetes",
    detalle:
      "La carga estimada (5.200 HH) supera el umbral recomendado de 4.000 HH. Sugiero separar 'descarga molino SAG' en (a) prefabricación en taller y (b) montaje en terreno, alineado al hito de izaje del 12-jul.",
    fuente: "Modelo BIM federado v2.3 · Cantidades + Path of Construction",
  },
  {
    tipo: "Riesgo",
    icono: "⚠",
    color: "bg-amber-100 text-amber-700",
    titulo: "Interferencia detectada entre piping y bandejas eléctricas",
    detalle:
      "En sala MCC nivel +3.200 hay 4 clashes entre EWP-200-MEC-02 y EWP-200-ELE-04. Recomiendo coordinar antes de liberar IWP-200-ELE-021.",
    fuente: "Detección de clashes IFC · ISO 19650 estado Shared",
  },
  {
    tipo: "Productividad",
    icono: "▲",
    color: "bg-emerald-100 text-emerald-700",
    titulo: "Oportunidad de nivelar cuadrillas civiles",
    detalle:
      "Entre el 15-jun y 30-jun la cuadrilla civil queda subutilizada al 62%. Adelantar IWP-200-CIV-015 a esa ventana mejora utilización a 91% sin afectar ruta crítica.",
    fuente: "Modelo de carga de recursos · Lean Last Planner",
  },
  {
    tipo: "Ingeniería",
    icono: "◈",
    color: "bg-indigo-100 text-indigo-700",
    titulo: "EWP-200-MEC-02 al 80% — riesgo de bloqueo",
    detalle:
      "Si EWP-200-MEC-02 no cierra antes del 30-jun, IWP-200-MEC-002 perderá su ventana de liberación (impacto: 3.100 HH).",
    fuente: "Cruce Path of Construction × EWP delivery",
  },
];

export default function Aura() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="space-y-6">
      <div className="card p-6 andean-gradient text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-2xl text-white shadow-md">
            ✦
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">AURA · AWP Intelligence</h2>
            <p className="text-ink-300 text-sm mt-1">
              Asistente AI que cruza el modelo BIM, el Path of Construction y
              el estado de constraints para sugerir packaging óptimo, detectar
              riesgos y proponer mitigaciones. Heredero del proyecto AURA AWP
              (Sonqollay · AC3E USM · CORFO).
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Pregúntame: ¿qué IWP puedo liberar la próxima semana sin sobrecargar mecánica?"
            className="flex-1 bg-ink-950/60 border border-ink-700 rounded-lg px-4 py-2.5 text-sm placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
          <button className="px-4 py-2.5 rounded-lg brand-gradient text-white font-semibold text-sm hover:opacity-90">
            Preguntar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sugerencias.map((s, i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className={`pill ${s.color}`}>
                {s.icono} {s.tipo}
              </span>
            </div>
            <h3 className="font-semibold text-ink-900">{s.titulo}</h3>
            <p className="text-sm text-ink-600 mt-2">{s.detalle}</p>
            <div className="text-[11px] text-ink-500 mt-3 italic">
              Fuente: {s.fuente}
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1.5 rounded-md bg-brand-600 text-white text-xs font-medium hover:bg-brand-700">
                Aplicar sugerencia
              </button>
              <button className="px-3 py-1.5 rounded-md border border-ink-200 text-ink-700 text-xs font-medium hover:bg-ink-50">
                Descartar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <h3 className="font-semibold text-ink-900">Cómo se entrena AURA</h3>
        <ul className="mt-3 space-y-2 text-sm text-ink-700 list-disc pl-5">
          <li>
            Lee modelos IFC del CDE en estado <em>Shared</em> y extrae
            cantidades, ubicaciones y disciplinas.
          </li>
          <li>
            Cruza con el Path of Construction y el histórico de productividad
            (Sonqollay tiene +16M HH empaquetadas).
          </li>
          <li>
            Sugiere paquetes IWP equilibrados (HH, disciplina, área) y predice
            constraints faltantes 3 semanas antes del inicio en terreno.
          </li>
          <li>
            Aprende del feedback del Planner — cada sugerencia aplicada o
            descartada mejora el modelo.
          </li>
        </ul>
      </div>
    </div>
  );
}
