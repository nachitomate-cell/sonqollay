import { auditItems } from "../data/seed";

const estadoStyle: Record<string, string> = {
  Conforme: "bg-emerald-100 text-emerald-700",
  Observación: "bg-amber-100 text-amber-700",
  "No conforme": "bg-rose-100 text-rose-700",
  "N/A": "bg-ink-100 text-ink-600",
};

export default function Audit() {
  const evaluables = auditItems.filter((a) => a.estado !== "N/A");
  const conforme = evaluables.filter((a) => a.estado === "Conforme").length;
  const score = Math.round((conforme / evaluables.length) * 100);

  return (
    <div className="space-y-6">
      <div className="card p-5 flex items-center justify-between gap-6 flex-wrap">
        <div>
          <h2 className="font-semibold text-ink-900">
            ISO 19650-2 · Fase de entrega del activo
          </h2>
          <p className="text-sm text-ink-500">
            Auditoría continua de la gestión de información del proyecto
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs uppercase text-ink-500 tracking-wider">
              Cumplimiento
            </div>
            <div className="text-3xl font-bold text-ink-900">{score}%</div>
          </div>
          <button className="px-3 py-2 rounded-lg text-sm font-medium bg-brand-600 text-white hover:bg-brand-700">
            Generar informe PDF
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-ink-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">Capítulo</th>
              <th className="text-left px-5 py-3">Requisito</th>
              <th className="text-left px-5 py-3">Estado</th>
              <th className="text-left px-5 py-3">Evidencia</th>
              <th className="text-left px-5 py-3">Responsable</th>
            </tr>
          </thead>
          <tbody>
            {auditItems.map((a) => (
              <tr key={a.id} className="border-t border-ink-100">
                <td className="px-5 py-3 text-ink-700 align-top">
                  {a.capitulo}
                </td>
                <td className="px-5 py-3 text-ink-900 align-top">
                  {a.requisito}
                </td>
                <td className="px-5 py-3 align-top">
                  <span className={`pill ${estadoStyle[a.estado]}`}>
                    {a.estado}
                  </span>
                </td>
                <td className="px-5 py-3 text-ink-600 text-xs align-top max-w-xs">
                  {a.evidencia ?? "—"}
                </td>
                <td className="px-5 py-3 text-ink-700 align-top">
                  {a.responsable}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
