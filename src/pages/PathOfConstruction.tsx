import { workPackages } from "../data/seed";

const start = new Date("2025-10-01").getTime();
const end = new Date("2027-03-01").getTime();
const total = end - start;

function pct(d: string) {
  const t = new Date(d).getTime();
  return ((t - start) / total) * 100;
}

const discColor: Record<string, string> = {
  Civil: "#0891b2",
  Mecánica: "#7c3aed",
  Piping: "#0ea5e9",
  Eléctrica: "#f59e0b",
  Instrumentación: "#ef4444",
  Estructural: "#10b981",
  Arquitectura: "#ec4899",
};

const months: { label: string; pos: number }[] = [];
for (let y = 2025; y <= 2027; y++) {
  for (let m = 0; m < 12; m++) {
    const d = new Date(y, m, 1).getTime();
    if (d < start || d > end) continue;
    months.push({
      label: new Date(y, m, 1).toLocaleDateString("es-CL", {
        month: "short",
        year: "2-digit",
      }),
      pos: ((d - start) / total) * 100,
    });
  }
}

export default function PathOfConstruction() {
  const rows = workPackages.filter((w) => w.type !== "CWA");
  const todayPct = pct("2026-05-27");

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <h2 className="font-semibold text-ink-900">
          Secuencia constructiva (Path of Construction)
        </h2>
        <p className="text-sm text-ink-500">
          Orden lógico en que el trabajo en terreno debe ocurrir — base para
          empaquetar IWP y nivelar carga de cuadrillas.
        </p>
      </div>

      <div className="card p-5 overflow-x-auto">
        <div className="min-w-[900px]">
          {/* header months */}
          <div className="relative h-8 border-b border-ink-200 ml-72">
            {months.map((m, i) => (
              <div
                key={i}
                className="absolute top-0 text-[10px] uppercase tracking-wider text-ink-500"
                style={{ left: `${m.pos}%` }}
              >
                <div className="h-3 border-l border-ink-200" />
                {m.label}
              </div>
            ))}
            <div
              className="absolute top-0 bottom-0 border-l-2 border-rose-500"
              style={{ left: `${todayPct}%` }}
              title="Hoy"
            >
              <span className="absolute -top-5 -translate-x-1/2 text-[10px] text-rose-600 font-semibold">
                HOY
              </span>
            </div>
          </div>

          {rows.map((w) => {
            const left = pct(w.inicioPlan);
            const right = pct(w.finPlan);
            const width = Math.max(2, right - left);
            const color =
              discColor[w.disciplina ?? "Civil"] ?? "#06b6d4";
            return (
              <div
                key={w.id}
                className="flex items-center border-b border-ink-100 py-2"
              >
                <div className="w-72 pr-4 shrink-0">
                  <div className="font-mono text-[11px] text-ink-500">
                    {w.code}
                  </div>
                  <div className="text-sm text-ink-900 truncate">
                    {w.nombre}
                  </div>
                </div>
                <div className="relative flex-1 h-7">
                  <div
                    className="absolute top-0 bottom-0 border-l-2 border-rose-500"
                    style={{ left: `${todayPct}%` }}
                  />
                  <div
                    className="absolute top-1 h-5 rounded-md shadow-sm"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                      background: color,
                    }}
                    title={`${w.inicioPlan} → ${w.finPlan}`}
                  >
                    <div
                      className="h-full rounded-md bg-black/25"
                      style={{ width: `${w.progreso}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-ink-600">
          {Object.entries(discColor).map(([k, c]) => (
            <span key={k} className="inline-flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ background: c }}
              />
              {k}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
