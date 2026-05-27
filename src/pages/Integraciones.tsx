import { useMemo, useState } from "react";
import { integraciones, syncLog } from "../data/integraciones";
import type { CategoriaInt, Integracion } from "../data/integraciones";

const estadoStyle: Record<string, string> = {
  Conectada: "bg-emerald-100 text-emerald-800",
  "En piloto": "bg-amber-100 text-amber-800",
  Error: "bg-rose-100 text-rose-800",
  Disponible: "bg-ink-100 text-ink-700",
};

const eventStyle: Record<string, string> = {
  sync: "text-emerald-700",
  error: "text-rose-700",
  webhook: "text-brand-700",
  auth: "text-indigo-700",
};

const categorias: CategoriaInt[] = [
  "BIM / Modelado",
  "Planificación",
  "ERP / Finanzas",
  "Colaboración",
  "BI / Datos",
  "Aprendizaje",
  "Identidad",
  "IA",
];

function Tile({ i, onClick }: { i: Integracion; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="card p-5 text-left hover:shadow-md transition-shadow flex flex-col h-full"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
          style={{ background: i.color }}
        >
          {i.iconLetter}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-ink-900 truncate">{i.nombre}</div>
          <div className="text-xs text-ink-500 truncate">{i.proveedor}</div>
        </div>
        <span className={`pill ${estadoStyle[i.estado]} shrink-0`}>
          {i.estado}
        </span>
      </div>
      <p className="text-sm text-ink-600 mt-3 leading-snug">{i.descripcion}</p>
      <div className="mt-4 pt-3 border-t border-ink-100 text-xs text-ink-500 grid grid-cols-2 gap-2">
        <div>
          <div className="uppercase tracking-wider text-[10px]">Última sync</div>
          <div className="text-ink-700">{i.ultimaSync ?? "—"}</div>
        </div>
        <div>
          <div className="uppercase tracking-wider text-[10px]">Eventos 24h</div>
          <div className="text-ink-700">{i.eventos24h ?? "—"}</div>
        </div>
      </div>
    </button>
  );
}

export default function Integraciones() {
  const [cat, setCat] = useState<CategoriaInt | "all">("all");
  const [sel, setSel] = useState<Integracion | null>(null);

  const visible = useMemo(
    () => (cat === "all" ? integraciones : integraciones.filter((i) => i.categoria === cat)),
    [cat]
  );
  const conectadas = integraciones.filter((i) => i.estado === "Conectada").length;
  const errores = integraciones.filter((i) => i.estado === "Error").length;
  const eventos = integraciones.reduce((a, i) => a + (i.eventos24h ?? 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Integraciones conectadas
          </div>
          <div className="mt-1 text-2xl font-semibold text-emerald-700">
            {conectadas} / {integraciones.length}
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Eventos en 24h
          </div>
          <div className="mt-1 text-2xl font-semibold">{eventos}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Errores activos
          </div>
          <div className={`mt-1 text-2xl font-semibold ${errores > 0 ? "text-rose-700" : "text-emerald-700"}`}>
            {errores}
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Webhooks / API tokens
          </div>
          <div className="mt-1 text-2xl font-semibold">14</div>
          <div className="text-xs text-ink-500">2 rotan en 30 días</div>
        </div>
      </div>

      <div className="card p-4 flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setCat("all")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${cat === "all" ? "bg-brand-600 text-white border-brand-600" : "bg-white text-ink-700 border-ink-200 hover:bg-ink-50"}`}
        >
          Todas
        </button>
        {categorias.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${cat === c ? "bg-brand-600 text-white border-brand-600" : "bg-white text-ink-700 border-ink-200 hover:bg-ink-50"}`}
          >
            {c}
          </button>
        ))}
        <button className="ml-auto px-3 py-1.5 rounded-lg text-sm font-medium bg-ink-900 text-white hover:bg-ink-800">
          + Nueva integración
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {visible.map((i) => (
          <Tile key={i.id} i={i} onClick={() => setSel(i)} />
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="px-5 pt-5">
          <h2 className="font-semibold text-ink-900">Registro de actividad</h2>
          <p className="text-sm text-ink-500">
            Últimas sincronizaciones, webhooks y eventos de autenticación
          </p>
        </div>
        <table className="w-full text-sm mt-3">
          <thead className="bg-ink-50 text-ink-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">Timestamp</th>
              <th className="text-left px-5 py-3">Integración</th>
              <th className="text-left px-5 py-3">Tipo</th>
              <th className="text-left px-5 py-3">Detalle</th>
            </tr>
          </thead>
          <tbody>
            {syncLog.map((e) => {
              const i = integraciones.find((x) => x.id === e.integracionId);
              return (
                <tr key={e.id} className="border-t border-ink-100">
                  <td className="px-5 py-3 text-ink-700 font-mono text-xs">{e.ts}</td>
                  <td className="px-5 py-3 text-ink-900">{i?.nombre}</td>
                  <td className={`px-5 py-3 font-semibold ${eventStyle[e.tipo]}`}>
                    {e.tipo}
                  </td>
                  <td className="px-5 py-3 text-ink-700">{e.detalle}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sel && (
        <div
          className="fixed inset-0 z-40 bg-ink-950/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSel(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                style={{ background: sel.color }}
              >
                {sel.iconLetter}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-ink-900">{sel.nombre}</div>
                <div className="text-xs text-ink-500">{sel.proveedor} · {sel.categoria}</div>
              </div>
              <button
                onClick={() => setSel(null)}
                className="text-ink-400 hover:text-ink-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="mt-4 text-sm text-ink-700">{sel.descripcion}</p>
            <dl className="mt-4 text-sm divide-y divide-ink-100">
              <div className="py-2 flex justify-between">
                <dt className="text-ink-500">Estado</dt>
                <dd>
                  <span className={`pill ${estadoStyle[sel.estado]}`}>{sel.estado}</span>
                </dd>
              </div>
              <div className="py-2 flex justify-between">
                <dt className="text-ink-500">Alcance / Scopes</dt>
                <dd className="text-ink-900 text-right">{sel.alcance ?? "—"}</dd>
              </div>
              <div className="py-2 flex justify-between">
                <dt className="text-ink-500">Cuenta</dt>
                <dd className="text-ink-900 text-right">{sel.cuenta ?? "—"}</dd>
              </div>
              <div className="py-2 flex justify-between">
                <dt className="text-ink-500">Última sincronización</dt>
                <dd className="text-ink-900">{sel.ultimaSync ?? "—"}</dd>
              </div>
            </dl>
            <div className="mt-5 flex gap-2">
              {sel.estado === "Disponible" ? (
                <button className="flex-1 px-3 py-2 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700">
                  Conectar ahora
                </button>
              ) : (
                <>
                  <button className="flex-1 px-3 py-2 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700">
                    Sincronizar ahora
                  </button>
                  <button className="px-3 py-2 rounded-md border border-ink-200 text-ink-700 text-sm font-medium hover:bg-ink-50">
                    Desconectar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
