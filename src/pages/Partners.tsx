import { useState } from "react";
import { partners } from "../data/partners";
import type { TipoPartner } from "../data/partners";

const tipoColor: Record<TipoPartner, string> = {
  Académico: "bg-indigo-100 text-indigo-800",
  Estatal: "bg-emerald-100 text-emerald-800",
  Tecnología: "bg-amber-100 text-amber-800",
  Software: "bg-brand-100 text-brand-800",
  "EPC / Constructora": "bg-rose-100 text-rose-800",
  Subcontrato: "bg-ink-200 text-ink-800",
  Asociación: "bg-purple-100 text-purple-800",
};

const tipos: TipoPartner[] = [
  "Académico",
  "Estatal",
  "Tecnología",
  "Software",
  "EPC / Constructora",
  "Subcontrato",
  "Asociación",
];

export default function Partners() {
  const [tipo, setTipo] = useState<TipoPartner | "all">("all");
  const visible =
    tipo === "all" ? partners : partners.filter((p) => p.tipo === tipo);

  const porTipo = tipos.map((t) => ({
    tipo: t,
    n: partners.filter((p) => p.tipo === t).length,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Partners totales
          </div>
          <div className="mt-1 text-2xl font-semibold">{partners.length}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Contratos vigentes
          </div>
          <div className="mt-1 text-2xl font-semibold text-emerald-700">
            {partners.filter((p) => p.contratoVigente).length}
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Proyectos compartidos
          </div>
          <div className="mt-1 text-2xl font-semibold">
            {partners.reduce((a, p) => a + p.proyectosCompartidos, 0)}
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            NPS promedio (medibles)
          </div>
          <div className="mt-1 text-2xl font-semibold">
            {Math.round(
              partners
                .filter((p) => typeof p.nps === "number")
                .reduce((a, p) => a + (p.nps ?? 0), 0) /
                partners.filter((p) => typeof p.nps === "number").length
            )}
          </div>
        </div>
      </div>

      <div className="card p-4 flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setTipo("all")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
            tipo === "all"
              ? "bg-brand-600 text-white border-brand-600"
              : "bg-white text-ink-700 border-ink-200 hover:bg-ink-50"
          }`}
        >
          Todos ({partners.length})
        </button>
        {porTipo.map((t) => (
          <button
            key={t.tipo}
            onClick={() => setTipo(t.tipo)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
              tipo === t.tipo
                ? "bg-brand-600 text-white border-brand-600"
                : "bg-white text-ink-700 border-ink-200 hover:bg-ink-50"
            }`}
          >
            {t.tipo} ({t.n})
          </button>
        ))}
        <button className="ml-auto px-3 py-1.5 rounded-lg text-sm font-medium bg-ink-900 text-white hover:bg-ink-800">
          + Nuevo partner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {visible.map((p) => (
          <div key={p.id} className="card p-5 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <span className={`pill ${tipoColor[p.tipo]}`}>{p.tipo}</span>
              {!p.contratoVigente && (
                <span className="pill bg-rose-100 text-rose-700">
                  Sin contrato
                </span>
              )}
            </div>
            <h3 className="mt-3 font-semibold text-ink-900 leading-snug">
              {p.nombre}
            </h3>
            <div className="text-xs text-ink-500 mt-1">
              {p.pais} · desde {p.desde}
            </div>
            <p className="text-sm text-ink-700 mt-3 leading-snug">
              {p.relacion}
            </p>
            {p.notas && (
              <p className="text-xs text-ink-500 mt-2 italic">{p.notas}</p>
            )}
            <div className="mt-4 pt-3 border-t border-ink-100 grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="uppercase tracking-wider text-[10px] text-ink-500">
                  Proyectos
                </div>
                <div className="text-ink-900 font-semibold">
                  {p.proyectosCompartidos}
                </div>
              </div>
              <div>
                <div className="uppercase tracking-wider text-[10px] text-ink-500">
                  NPS
                </div>
                <div
                  className={`font-semibold ${
                    p.nps && p.nps >= 70
                      ? "text-emerald-700"
                      : p.nps && p.nps >= 50
                        ? "text-amber-700"
                        : "text-ink-700"
                  }`}
                >
                  {p.nps ?? "—"}
                </div>
              </div>
            </div>
            <div className="mt-3 text-xs text-ink-500">
              <div>{p.contactoPrincipal}</div>
              <a
                href={`mailto:${p.contactoEmail}`}
                className="text-brand-700 hover:underline"
              >
                {p.contactoEmail}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
