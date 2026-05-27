import { useMemo, useState } from "react";
import { clientes, reuniones } from "../data/crm";
import { projects } from "../data/seed";
import type { Reunion } from "../data/types";

const estadoColor: Record<string, string> = {
  Programada: "bg-brand-100 text-brand-700",
  Realizada: "bg-emerald-100 text-emerald-700",
  Cancelada: "bg-rose-100 text-rose-700",
};

const acuerdoColor: Record<string, string> = {
  Abierto: "bg-amber-100 text-amber-700",
  "En curso": "bg-brand-100 text-brand-700",
  Cerrado: "bg-emerald-100 text-emerald-700",
};

function lookupProyecto(id?: string) {
  return id ? projects.find((p) => p.id === id)?.nombre : undefined;
}
function lookupCliente(id?: string) {
  return id ? clientes.find((c) => c.id === id)?.razonSocial : undefined;
}

export default function Reuniones() {
  const sorted = useMemo(
    () => [...reuniones].sort((a, b) => a.fecha.localeCompare(b.fecha)),
    []
  );
  const [sel, setSel] = useState<Reunion>(sorted[0]);

  const allAcuerdos = reuniones.flatMap((r) =>
    r.acuerdos.map((a) => ({ a, r }))
  );
  const abiertos = allAcuerdos.filter(({ a }) => a.estado !== "Cerrado");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Reuniones próximas (14 días)
          </div>
          <div className="mt-1 text-2xl font-semibold">
            {reuniones.filter((r) => r.estado === "Programada").length}
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Acuerdos abiertos
          </div>
          <div className="mt-1 text-2xl font-semibold text-amber-700">
            {abiertos.length}
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Cierre on-time (últimos 90 días)
          </div>
          <div className="mt-1 text-2xl font-semibold text-emerald-700">
            87%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        <div className="card overflow-hidden">
          <div className="px-4 py-3 border-b border-ink-200 bg-ink-50 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-ink-600 font-medium">
              Agenda
            </span>
            <button className="text-xs font-semibold text-brand-700 hover:text-brand-800">
              + Nueva
            </button>
          </div>
          <ul>
            {sorted.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => setSel(r)}
                  className={`w-full text-left px-4 py-3 border-b border-ink-100 hover:bg-ink-50 transition-colors ${
                    sel.id === r.id ? "bg-brand-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs text-ink-500">
                    <span className="font-mono">
                      {r.fecha} · {r.hora}
                    </span>
                    <span className={`pill ${estadoColor[r.estado]}`}>
                      {r.estado}
                    </span>
                  </div>
                  <div className="font-medium text-ink-900 mt-0.5">
                    {r.titulo}
                  </div>
                  <div className="text-xs text-ink-500 mt-0.5">
                    {r.modalidad} · {r.duracionMin} min ·{" "}
                    {lookupCliente(r.clienteId) ?? "Interna"}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div className="card p-5">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h2 className="text-lg font-semibold text-ink-900">
                  {sel.titulo}
                </h2>
                <p className="text-sm text-ink-500">
                  {sel.fecha} · {sel.hora} hrs · {sel.duracionMin} min ·{" "}
                  {sel.modalidad}
                </p>
              </div>
              <span className={`pill ${estadoColor[sel.estado]}`}>
                {sel.estado}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
                  Cliente
                </div>
                <div>{lookupCliente(sel.clienteId) ?? "—"}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
                  Proyecto
                </div>
                <div>{lookupProyecto(sel.proyectoId) ?? "—"}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
                  Organiza
                </div>
                <div>{sel.organizador}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
                  Asistentes
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {sel.asistentes.map((a) => (
                    <span
                      key={a}
                      className="pill bg-ink-100 text-ink-700"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-ink-900 mb-2">Agenda</h3>
            <ol className="space-y-1 text-sm text-ink-700 list-decimal pl-5">
              {sel.agenda.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ol>
            {sel.minuta && (
              <>
                <h3 className="font-semibold text-ink-900 mt-5 mb-2">
                  Minuta
                </h3>
                <p className="text-sm text-ink-700">{sel.minuta}</p>
              </>
            )}
          </div>

          <div className="card overflow-hidden">
            <div className="px-5 pt-5 flex items-center justify-between">
              <h3 className="font-semibold text-ink-900">
                Acuerdos y compromisos
              </h3>
              <button className="text-xs font-semibold text-brand-700 hover:text-brand-800">
                + Agregar acuerdo
              </button>
            </div>
            <table className="w-full text-sm mt-3">
              <thead className="bg-ink-50 text-ink-600 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-5 py-3">Descripción</th>
                  <th className="text-left px-5 py-3">Responsable</th>
                  <th className="text-left px-5 py-3">Due</th>
                  <th className="text-left px-5 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {sel.acuerdos.map((a) => (
                  <tr key={a.id} className="border-t border-ink-100">
                    <td className="px-5 py-3 text-ink-900">{a.descripcion}</td>
                    <td className="px-5 py-3 text-ink-700">{a.responsable}</td>
                    <td className="px-5 py-3 text-ink-700">{a.due}</td>
                    <td className="px-5 py-3">
                      <span className={`pill ${acuerdoColor[a.estado]}`}>
                        {a.estado}
                      </span>
                    </td>
                  </tr>
                ))}
                {sel.acuerdos.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-6 text-center text-ink-500"
                    >
                      Aún no se han registrado acuerdos.
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
