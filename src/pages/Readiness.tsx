import { workPackages } from "../data/seed";

const fmt = (n: number) => n.toLocaleString("es-CL");

export default function Readiness() {
  const iwps = workPackages.filter(
    (w) => w.type === "IWP" && w.constraints && w.estado !== "Cerrado"
  );

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <h2 className="font-semibold text-ink-900">
          Constraints abiertos por IWP
        </h2>
        <p className="text-sm text-ink-500">
          Un IWP solo se libera cuando los 8 constraints están verdes — esto
          evita re-trabajo y pérdidas por equipos detenidos en terreno (regla
          AWP).
        </p>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[1100px]">
          <thead className="bg-ink-50 text-ink-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3 sticky left-0 bg-ink-50">
                IWP
              </th>
              <th className="text-left px-3 py-3">HH</th>
              <th className="text-left px-3 py-3">Inicio</th>
              <th className="text-center px-3 py-3">Ing.</th>
              <th className="text-center px-3 py-3">Mat.</th>
              <th className="text-center px-3 py-3">Equip.</th>
              <th className="text-center px-3 py-3">M.O.</th>
              <th className="text-center px-3 py-3">Permisos</th>
              <th className="text-center px-3 py-3">HSE</th>
              <th className="text-center px-3 py-3">Acceso</th>
              <th className="text-center px-3 py-3">QA/QC</th>
              <th className="text-center px-3 py-3">Score</th>
              <th className="text-left px-3 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {iwps.map((w) => {
              const c = w.constraints!;
              const ok = c.filter((x) => x.ok).length;
              const score = Math.round((ok / c.length) * 100);
              const scoreColor =
                score === 100
                  ? "text-emerald-700 bg-emerald-100"
                  : score >= 75
                    ? "text-amber-700 bg-amber-100"
                    : "text-rose-700 bg-rose-100";
              return (
                <tr key={w.id} className="border-t border-ink-100">
                  <td className="px-4 py-3 sticky left-0 bg-white">
                    <div className="font-mono text-xs text-ink-600">
                      {w.code}
                    </div>
                    <div className="text-ink-900">{w.nombre}</div>
                  </td>
                  <td className="px-3 py-3 text-ink-700">{fmt(w.hh)}</td>
                  <td className="px-3 py-3 text-ink-700 text-xs">
                    {w.inicioPlan}
                  </td>
                  {c.map((x) => (
                    <td key={x.key} className="px-3 py-3 text-center">
                      {x.ok ? (
                        <span className="inline-flex w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 items-center justify-center text-xs font-bold">
                          ✓
                        </span>
                      ) : (
                        <span
                          className="inline-flex w-6 h-6 rounded-full bg-rose-100 text-rose-700 items-center justify-center text-xs font-bold"
                          title={`Resp: ${x.responsable}`}
                        >
                          ✕
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="px-3 py-3 text-center">
                    <span className={`pill ${scoreColor}`}>{score}%</span>
                  </td>
                  <td className="px-3 py-3">
                    {score === 100 ? (
                      <button className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700">
                        Liberar IWP
                      </button>
                    ) : (
                      <span className="pill bg-rose-100 text-rose-700">
                        No liberable
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="card p-5">
        <h3 className="font-semibold text-ink-900 mb-3">
          Constraints críticas abiertas
        </h3>
        <ul className="space-y-2 text-sm">
          {iwps
            .flatMap((w) =>
              w.constraints!
                .filter((c) => !c.ok)
                .map((c) => ({ wp: w, c }))
            )
            .map(({ wp, c }, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg border border-ink-200 bg-white"
              >
                <span className="w-2 h-2 mt-1.5 rounded-full bg-rose-500" />
                <div className="flex-1">
                  <div className="text-ink-900">
                    <span className="font-mono text-xs text-ink-500">
                      {wp.code}
                    </span>{" "}
                    · {c.label}
                  </div>
                  <div className="text-xs text-ink-500">
                    Responsable: {c.responsable} · Inicio IWP:{" "}
                    {wp.inicioPlan}
                  </div>
                </div>
                <button className="text-xs text-brand-700 hover:underline">
                  Asignar acción
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
