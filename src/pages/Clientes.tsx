import { useState } from "react";
import { clientes } from "../data/crm";
import type { Cliente } from "../data/types";

const fmtCLP = (n: number) =>
  n === 0
    ? "—"
    : new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
      }).format(n);

const etapaColor: Record<string, string> = {
  Prospecto: "bg-ink-100 text-ink-700",
  Propuesta: "bg-amber-100 text-amber-700",
  Negociación: "bg-brand-100 text-brand-700",
  Ganada: "bg-emerald-100 text-emerald-700",
  Perdida: "bg-rose-100 text-rose-700",
};

function npsColor(n: number) {
  if (n >= 70) return "text-emerald-700";
  if (n >= 50) return "text-amber-700";
  return "text-rose-700";
}

export default function Clientes() {
  const [sel, setSel] = useState<Cliente>(clientes[0]);
  const pipeline = clientes
    .flatMap((c) => c.oportunidades)
    .filter((o) => o.etapa !== "Ganada" && o.etapa !== "Perdida");
  const totalPipeline = pipeline.reduce(
    (a, o) => a + (o.monto * o.probabilidad) / 100,
    0
  );
  const ingresoTotal = clientes.reduce((a, c) => a + c.ingresoAnual, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Cuentas activas
          </div>
          <div className="mt-1 text-2xl font-semibold">
            {clientes.filter((c) => c.proyectosActivos > 0).length} de{" "}
            {clientes.length}
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Ingreso recurrente anual
          </div>
          <div className="mt-1 text-2xl font-semibold">
            {fmtCLP(ingresoTotal)}
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Pipeline ponderado
          </div>
          <div className="mt-1 text-2xl font-semibold">
            {fmtCLP(totalPipeline)}
          </div>
          <div className="text-xs text-ink-500 mt-1">
            {pipeline.length} oportunidades abiertas
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div className="card overflow-hidden">
          <div className="px-4 py-3 border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wider text-ink-600 font-medium">
            Cartera
          </div>
          <ul>
            {clientes.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setSel(c)}
                  className={`w-full text-left px-4 py-3 border-b border-ink-100 hover:bg-ink-50 transition-colors ${
                    sel.id === c.id ? "bg-brand-50" : ""
                  }`}
                >
                  <div className="font-medium text-ink-900">
                    {c.razonSocial}
                  </div>
                  <div className="text-xs text-ink-500 flex items-center gap-2 mt-0.5">
                    <span>{c.sector}</span>
                    <span>·</span>
                    <span className={npsColor(c.nps)}>NPS {c.nps}</span>
                    {c.proyectosActivos > 0 && (
                      <span className="pill bg-brand-100 text-brand-700">
                        {c.proyectosActivos} proy.
                      </span>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="card p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-lg font-semibold text-ink-900">
                  {sel.razonSocial}
                </h2>
                <p className="text-sm text-ink-500">
                  {sel.sector} · {sel.pais} · RUT {sel.rut} · cliente desde{" "}
                  {sel.desde}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg text-sm font-medium border border-ink-200 text-ink-700 hover:bg-ink-50">
                  Nueva reunión
                </button>
                <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-brand-600 text-white hover:bg-brand-700">
                  Nueva oportunidad
                </button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-ink-500">Proyectos activos</div>
                <div className="text-lg font-semibold">
                  {sel.proyectosActivos}
                </div>
              </div>
              <div>
                <div className="text-xs text-ink-500">Ingreso anual</div>
                <div className="text-lg font-semibold">
                  {fmtCLP(sel.ingresoAnual)}
                </div>
              </div>
              <div>
                <div className="text-xs text-ink-500">NPS</div>
                <div className={`text-lg font-semibold ${npsColor(sel.nps)}`}>
                  {sel.nps}
                </div>
              </div>
              <div>
                <div className="text-xs text-ink-500">Oportunidades</div>
                <div className="text-lg font-semibold">
                  {sel.oportunidades.length}
                </div>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-ink-900 mb-3">Contactos clave</h3>
            <ul className="divide-y divide-ink-100">
              {sel.contactos.map((c, i) => (
                <li key={i} className="py-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-ink-900 font-medium">{c.nombre}</div>
                    <div className="text-xs text-ink-500">{c.cargo}</div>
                  </div>
                  <div className="text-xs text-ink-600 text-right">
                    <div>{c.email}</div>
                    {c.telefono && <div>{c.telefono}</div>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card overflow-hidden">
            <div className="px-5 pt-5">
              <h3 className="font-semibold text-ink-900">
                Pipeline comercial
              </h3>
              <p className="text-sm text-ink-500 mb-3">
                Oportunidades activas con esta cuenta
              </p>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-ink-50 text-ink-600 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-5 py-3">Oportunidad</th>
                  <th className="text-left px-5 py-3">Etapa</th>
                  <th className="text-left px-5 py-3">Monto</th>
                  <th className="text-left px-5 py-3">Prob.</th>
                  <th className="text-left px-5 py-3">Cierre estimado</th>
                </tr>
              </thead>
              <tbody>
                {sel.oportunidades.map((o) => (
                  <tr key={o.id} className="border-t border-ink-100">
                    <td className="px-5 py-3 text-ink-900">{o.nombre}</td>
                    <td className="px-5 py-3">
                      <span className={`pill ${etapaColor[o.etapa]}`}>
                        {o.etapa}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-ink-700">
                      {fmtCLP(o.monto)}
                    </td>
                    <td className="px-5 py-3 text-ink-700">
                      {o.probabilidad}%
                    </td>
                    <td className="px-5 py-3 text-ink-700">
                      {o.cierreEstimado}
                    </td>
                  </tr>
                ))}
                {sel.oportunidades.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-6 text-center text-ink-500"
                    >
                      Sin oportunidades abiertas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
