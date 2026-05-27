import { cursos } from "../data/crm";

const fmtCLP = (n: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(n);

const catColor: Record<string, string> = {
  AWP: "bg-brand-100 text-brand-700",
  BIM: "bg-indigo-100 text-indigo-700",
  "ISO 19650": "bg-emerald-100 text-emerald-700",
  "Lean Construction": "bg-amber-100 text-amber-700",
};

export default function Academia() {
  const totalInscritos = cursos.reduce((a, c) => a + c.inscritos, 0);
  const ingresoEstimado = cursos.reduce(
    (a, c) => a + c.inscritos * c.precio,
    0
  );
  const ocupacionPromedio =
    cursos.reduce((a, c) => a + c.inscritos / c.cupos, 0) / cursos.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Cursos activos
          </div>
          <div className="mt-1 text-2xl font-semibold">{cursos.length}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Alumnos inscritos
          </div>
          <div className="mt-1 text-2xl font-semibold">{totalInscritos}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Ocupación promedio
          </div>
          <div className="mt-1 text-2xl font-semibold">
            {(ocupacionPromedio * 100).toFixed(0)}%
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
            Ingreso próxima ronda
          </div>
          <div className="mt-1 text-2xl font-semibold">
            {fmtCLP(ingresoEstimado)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {cursos.map((c) => {
          const ocup = c.inscritos / c.cupos;
          const ocupPct = Math.round(ocup * 100);
          return (
            <div key={c.id} className="card p-5 flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <span className={`pill ${catColor[c.categoria]}`}>
                  {c.categoria}
                </span>
                <span className="text-xs text-amber-600 font-semibold">
                  ★ {c.rating}
                </span>
              </div>
              <h3 className="mt-3 font-semibold text-ink-900 leading-snug">
                {c.titulo}
              </h3>
              <div className="text-xs text-ink-500 mt-1">
                {c.modalidad} · {c.duracionHoras} hrs · {c.instructor}
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Próxima cohorte</span>
                  <span className="font-medium text-ink-900">
                    {c.proximaCohorte}
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-ink-500 mb-1">
                    <span>
                      Inscritos {c.inscritos}/{c.cupos}
                    </span>
                    <span>{ocupPct}%</span>
                  </div>
                  <div className="h-1.5 bg-ink-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        ocup >= 0.85
                          ? "bg-emerald-500"
                          : ocup >= 0.6
                            ? "bg-brand-500"
                            : "bg-amber-500"
                      }`}
                      style={{ width: `${ocupPct}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-ink-500">Inversión</span>
                  <span className="font-semibold text-ink-900">
                    {fmtCLP(c.precio)}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <button className="flex-1 px-3 py-1.5 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700">
                  Ver detalle
                </button>
                <button className="px-3 py-1.5 rounded-md border border-ink-200 text-ink-700 text-sm font-medium hover:bg-ink-50">
                  Inscritos
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
