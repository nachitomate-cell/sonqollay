import { useMemo, useState } from "react";
import { stakeholders } from "../data/stakeholders";
import type { RolStakeholder, Stakeholder } from "../data/stakeholders";
import { projects } from "../data/seed";

const rolBg: Record<RolStakeholder, string> = {
  Mandante: "bg-brand-600",
  "Owner Engineer": "bg-amber-600",
  EPC: "bg-rose-600",
  Subcontrato: "bg-emerald-600",
  Autoridad: "bg-indigo-600",
  Sonqollay: "bg-ink-900",
  Partner: "bg-purple-600",
};

const rolHex: Record<RolStakeholder, string> = {
  Mandante: "#C2410C",
  "Owner Engineer": "#D97706",
  EPC: "#E11D48",
  Subcontrato: "#059669",
  Autoridad: "#4338CA",
  Sonqollay: "#0B1F3A",
  Partner: "#9333EA",
};

const infColor: Record<string, string> = {
  Alta: "bg-rose-100 text-rose-800",
  Media: "bg-amber-100 text-amber-800",
  Baja: "bg-ink-100 text-ink-700",
};

function initials(n: string) {
  return n
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function StakeholderNode({
  s,
  angle,
  radius,
  centerX,
  centerY,
}: {
  s: Stakeholder;
  angle: number;
  radius: number;
  centerX: number;
  centerY: number;
}) {
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);
  const r = s.influencia === "Alta" ? 26 : s.influencia === "Media" ? 22 : 18;
  return (
    <g>
      <line
        x1={centerX}
        y1={centerY}
        x2={x}
        y2={y}
        stroke="#D9D1C2"
        strokeWidth={s.influencia === "Alta" ? 2 : 1}
        strokeDasharray={s.interes === "Bajo" ? "4 4" : "0"}
      />
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={rolHex[s.rol]}
        stroke="white"
        strokeWidth="3"
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize="11"
        fill="white"
        fontWeight="700"
      >
        {initials(s.nombre)}
      </text>
      <text
        x={x}
        y={y + r + 14}
        textAnchor="middle"
        fontSize="10"
        fill="#34425E"
      >
        {s.nombre.length > 18 ? s.nombre.slice(0, 17) + "…" : s.nombre}
      </text>
      <text
        x={x}
        y={y + r + 26}
        textAnchor="middle"
        fontSize="9"
        fill="#7E8AA0"
      >
        {s.rol}
      </text>
    </g>
  );
}

export default function Stakeholders() {
  const [pid, setPid] = useState("P-001");
  const visible = useMemo(
    () => stakeholders.filter((s) => s.proyectoId === pid),
    [pid]
  );
  const proyecto = projects.find((p) => p.id === pid);

  const w = 760;
  const h = 480;
  const cx = w / 2;
  const cy = h / 2;
  const radius = 170;

  return (
    <div className="space-y-6">
      <div className="card p-4 flex items-center gap-3 flex-wrap">
        <span className="text-sm text-ink-600">Proyecto:</span>
        <select
          value={pid}
          onChange={(e) => setPid(e.target.value)}
          className="text-sm border border-ink-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
        <span className="ml-auto text-xs text-ink-500">
          {visible.length} stakeholders identificados
        </span>
      </div>

      <div className="card p-5">
        <h2 className="font-semibold text-ink-900">
          Mapa de stakeholders — {proyecto?.nombre}
        </h2>
        <p className="text-sm text-ink-500">
          Líneas continuas = interés alto/medio · líneas punteadas = interés bajo · tamaño = influencia
        </p>

        <div className="mt-4 overflow-x-auto">
          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="w-full max-w-3xl mx-auto block"
          >
            {/* central node = proyecto */}
            <circle
              cx={cx}
              cy={cy}
              r="58"
              fill="#0B1F3A"
              stroke="#EA580C"
              strokeWidth="4"
            />
            <text
              x={cx}
              y={cy - 4}
              textAnchor="middle"
              fontSize="13"
              fill="white"
              fontWeight="700"
            >
              {proyecto?.id}
            </text>
            <text
              x={cx}
              y={cy + 14}
              textAnchor="middle"
              fontSize="10"
              fill="#FBBF24"
            >
              PROYECTO
            </text>

            {visible.map((s, i) => {
              const angle = (2 * Math.PI * i) / visible.length - Math.PI / 2;
              return (
                <StakeholderNode
                  key={s.id}
                  s={s}
                  angle={angle}
                  radius={radius}
                  centerX={cx}
                  centerY={cy}
                />
              );
            })}
          </svg>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-ink-600 justify-center">
          {Object.entries(rolHex).map(([k, hex]) => (
            <span key={k} className="inline-flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: hex }}
              />
              {k}
            </span>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="px-5 pt-5">
          <h2 className="font-semibold text-ink-900">
            Matriz de influencia × interés
          </h2>
          <p className="text-sm text-ink-500">
            Base para definir estrategia de comunicación con cada actor
          </p>
        </div>
        <table className="w-full text-sm mt-3">
          <thead className="bg-ink-50 text-ink-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">Stakeholder</th>
              <th className="text-left px-5 py-3">Entidad</th>
              <th className="text-left px-5 py-3">Rol</th>
              <th className="text-left px-5 py-3">Influencia</th>
              <th className="text-left px-5 py-3">Interés</th>
              <th className="text-left px-5 py-3">Contacto</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((s) => (
              <tr key={s.id} className="border-t border-ink-100">
                <td className="px-5 py-3 text-ink-900">{s.nombre}</td>
                <td className="px-5 py-3 text-ink-700">{s.entidad}</td>
                <td className="px-5 py-3">
                  <span className={`pill ${rolBg[s.rol]} text-white`}>
                    {s.rol}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className={`pill ${infColor[s.influencia]}`}>
                    {s.influencia}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className={`pill ${infColor[s.interes]}`}>
                    {s.interes}
                  </span>
                </td>
                <td className="px-5 py-3 text-xs text-brand-700">
                  <a
                    href={`mailto:${s.contacto}`}
                    className="hover:underline"
                  >
                    {s.contacto}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
