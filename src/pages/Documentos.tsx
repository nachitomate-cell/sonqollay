import { useState } from "react";
import { documentos } from "../data/documentos";
import type { EstadoCDE } from "../data/documentos";

const estados: { key: EstadoCDE; label: string; color: string; desc: string }[] = [
  {
    key: "WIP",
    label: "WIP",
    color: "bg-ink-200 text-ink-800",
    desc: "Trabajo en progreso — borrador",
  },
  {
    key: "Shared",
    label: "Shared",
    color: "bg-amber-100 text-amber-800",
    desc: "Compartido para coordinación",
  },
  {
    key: "Published",
    label: "Published",
    color: "bg-emerald-100 text-emerald-800",
    desc: "Aprobado para construcción",
  },
  {
    key: "Archived",
    label: "Archived",
    color: "bg-ink-100 text-ink-600",
    desc: "Archivado / superado",
  },
];

const fmtKB = (kb: number) =>
  kb > 1000 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;

export default function Documentos() {
  const [filtro, setFiltro] = useState<EstadoCDE | "all">("all");
  const [q, setQ] = useState("");

  const visible = documentos.filter(
    (d) =>
      (filtro === "all" || d.estado === filtro) &&
      (q === "" ||
        d.codigo.toLowerCase().includes(q.toLowerCase()) ||
        d.titulo.toLowerCase().includes(q.toLowerCase()))
  );

  const conteos = Object.fromEntries(
    estados.map((e) => [e.key, documentos.filter((d) => d.estado === e.key).length])
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {estados.map((e) => (
          <button
            key={e.key}
            onClick={() => setFiltro(filtro === e.key ? "all" : e.key)}
            className={`card p-5 text-left transition-shadow ${
              filtro === e.key ? "ring-2 ring-brand-500" : "hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`pill ${e.color}`}>{e.label}</span>
              <span className="text-2xl font-bold text-ink-900">
                {conteos[e.key]}
              </span>
            </div>
            <div className="text-xs text-ink-500 mt-2">{e.desc}</div>
          </button>
        ))}
      </div>

      <div className="card p-4 flex items-center gap-3 flex-wrap">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por código o título…"
          className="flex-1 min-w-[200px] text-sm border border-ink-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
        />
        {filtro !== "all" && (
          <button
            onClick={() => setFiltro("all")}
            className="text-sm text-brand-700 hover:text-brand-800 font-semibold"
          >
            Limpiar filtro: {filtro}
          </button>
        )}
        <button className="ml-auto px-3 py-1.5 rounded-lg text-sm font-medium bg-ink-900 text-white hover:bg-ink-800">
          + Subir documento
        </button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-ink-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Código</th>
              <th className="text-left px-4 py-3">Título</th>
              <th className="text-left px-4 py-3">Disciplina</th>
              <th className="text-left px-4 py-3">Tipo</th>
              <th className="text-left px-4 py-3">Rev.</th>
              <th className="text-left px-4 py-3">Estado</th>
              <th className="text-left px-4 py-3">Actualizado</th>
              <th className="text-left px-4 py-3">Tamaño</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {visible.map((d) => {
              const estado = estados.find((e) => e.key === d.estado)!;
              return (
                <tr key={d.id} className="border-t border-ink-100">
                  <td className="px-4 py-3 font-mono text-xs text-ink-700">
                    {d.codigo}
                  </td>
                  <td className="px-4 py-3 text-ink-900">{d.titulo}</td>
                  <td className="px-4 py-3 text-ink-700">{d.disciplina}</td>
                  <td className="px-4 py-3 text-ink-700">
                    {d.tipo}
                    <span className="text-ink-400 text-xs ml-1">
                      ({d.formato})
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-700 font-mono text-xs">
                    {d.revision}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`pill ${estado.color}`}>
                      {estado.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-700 text-xs">
                    {d.fechaActualizacion}
                  </td>
                  <td className="px-4 py-3 text-ink-700 text-xs">
                    {fmtKB(d.tamanioKB)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-xs text-brand-700 hover:text-brand-800 font-semibold">
                      Ver →
                    </button>
                  </td>
                </tr>
              );
            })}
            {visible.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-ink-500">
                  Sin documentos para el filtro actual.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
