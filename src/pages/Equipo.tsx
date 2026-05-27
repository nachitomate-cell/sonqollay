import { consultores } from "../data/crm";
import { projects } from "../data/seed";

function utilColor(u: number) {
  if (u >= 90) return "bg-rose-500";
  if (u >= 75) return "bg-emerald-500";
  if (u >= 50) return "bg-brand-500";
  return "bg-amber-500";
}

function pName(id: string) {
  return projects.find((p) => p.id === id)?.nombre ?? id;
}

export default function Equipo() {
  const promedio =
    consultores.reduce((a, c) => a + c.utilizacion, 0) / consultores.length;
  const sobrecargados = consultores.filter((c) => c.utilizacion >= 90).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Consultores activos
          </div>
          <div className="mt-1 text-2xl font-semibold">{consultores.length}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Utilización promedio
          </div>
          <div className="mt-1 text-2xl font-semibold">
            {promedio.toFixed(0)}%
          </div>
          <div className="text-xs text-ink-500 mt-1">objetivo 75–85%</div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            En sobrecarga (≥90%)
          </div>
          <div className="mt-1 text-2xl font-semibold text-rose-700">
            {sobrecargados}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {consultores.map((c) => (
          <div key={c.id} className="card p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full brand-gradient text-white flex items-center justify-center font-bold shadow-sm">
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-ink-900">{c.nombre}</div>
                    <div className="text-xs text-ink-500">{c.rol}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase text-ink-500">
                      Utilización
                    </div>
                    <div className="text-lg font-bold text-ink-900">
                      {c.utilizacion}%
                    </div>
                  </div>
                </div>

                <div className="mt-3 h-1.5 bg-ink-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${utilColor(c.utilizacion)}`}
                    style={{ width: `${c.utilizacion}%` }}
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.especialidades.map((e) => (
                    <span
                      key={e}
                      className="pill bg-brand-100 text-brand-700"
                    >
                      {e}
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="text-xs uppercase tracking-wider text-ink-500 font-medium mb-1">
                    Asignación
                  </div>
                  <ul className="space-y-1 text-sm">
                    {c.cargaPorProyecto.map((p) => (
                      <li
                        key={p.proyectoId}
                        className="flex items-center justify-between text-ink-700"
                      >
                        <span className="truncate pr-3">
                          {pName(p.proyectoId)}
                        </span>
                        <span className="font-mono text-xs text-ink-500">
                          {p.horas} hrs/mes
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 text-xs text-ink-500">
                  Certificaciones: {c.certificaciones.join(" · ")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
