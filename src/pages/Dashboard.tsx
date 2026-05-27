import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "react-router-dom";
import KpiCard from "../components/KpiCard";
import { projects, workPackages } from "../data/seed";
import { reuniones } from "../data/crm";

const fmt = (n: number) => n.toLocaleString("es-CL");

export default function Dashboard() {
  const hhPlan = projects.reduce((a, p) => a + p.hhTotales, 0);
  const hhEjec = projects.reduce((a, p) => a + p.hhEjecutadas, 0);
  const iwps = workPackages.filter((w) => w.type === "IWP");
  const listos = iwps.filter((w) => w.estado === "Listo").length;
  const bloqueados = iwps.filter((w) => w.estado === "Bloqueado").length;
  const isoAvg =
    projects.reduce((a, p) => a + p.iso19650, 0) / projects.length;

  const dataPorSector = ["Minería", "Energía", "Industria"].map((s) => ({
    sector: s,
    hh: projects
      .filter((p) => p.sector === s)
      .reduce((a, p) => a + p.hhTotales, 0),
  }));

  const dataRiesgo = [
    {
      name: "Bajo",
      value: projects.filter((p) => p.riesgo === "Bajo").length,
      color: "#10b981",
    },
    {
      name: "Medio",
      value: projects.filter((p) => p.riesgo === "Medio").length,
      color: "#f59e0b",
    },
    {
      name: "Alto",
      value: projects.filter((p) => p.riesgo === "Alto").length,
      color: "#ef4444",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          label="HH empaquetadas (portafolio)"
          value={fmt(hhPlan)}
          hint={`${fmt(hhEjec)} ejecutadas`}
          delta={`${Math.round((hhEjec / hhPlan) * 100)}%`}
          trend="up"
        />
        <KpiCard
          label="Proyectos activos"
          value={String(projects.length)}
          hint="3 sectores"
        />
        <KpiCard
          label="IWP listos para liberar"
          value={String(listos)}
          delta={`${bloqueados} bloqueados`}
          trend={bloqueados > 0 ? "down" : "up"}
        />
        <KpiCard
          label="Cumplimiento ISO 19650"
          value={`${isoAvg.toFixed(0)}%`}
          delta="meta 90%"
          trend={isoAvg < 90 ? "down" : "up"}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="card p-5 xl:col-span-2">
          <h2 className="font-semibold text-ink-900">HH por sector</h2>
          <p className="text-sm text-ink-500 mb-4">
            Distribución de horas-hombre empaquetadas en proyectos vigentes
          </p>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={dataPorSector}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="sector" stroke="#64748b" fontSize={12} />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
                />
                <Tooltip formatter={(v: number) => fmt(v) + " HH"} />
                <Bar dataKey="hh" fill="#EA580C" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-5">
          <h2 className="font-semibold text-ink-900">Riesgo del portafolio</h2>
          <p className="text-sm text-ink-500 mb-4">Proyectos por nivel</p>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={dataRiesgo}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {dataRiesgo.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-ink-900">Próximas reuniones</h2>
            <Link
              to="/reuniones"
              className="text-xs font-semibold text-brand-700 hover:text-brand-800"
            >
              Ver agenda →
            </Link>
          </div>
          <ul className="divide-y divide-ink-100">
            {reuniones
              .filter((r) => r.estado === "Programada")
              .slice(0, 4)
              .map((r) => (
                <li key={r.id} className="py-2.5 flex items-start gap-3">
                  <div className="text-xs text-ink-500 font-mono w-20 shrink-0">
                    {r.fecha}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-ink-900 truncate">
                      {r.titulo}
                    </div>
                    <div className="text-xs text-ink-500">
                      {r.hora} · {r.modalidad}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-ink-900">
              Acuerdos pendientes
            </h2>
            <Link
              to="/reuniones"
              className="text-xs font-semibold text-brand-700 hover:text-brand-800"
            >
              Ver todos →
            </Link>
          </div>
          <ul className="divide-y divide-ink-100">
            {reuniones
              .flatMap((r) => r.acuerdos)
              .filter((a) => a.estado !== "Cerrado")
              .slice(0, 5)
              .map((a) => (
                <li key={a.id} className="py-2.5 flex items-start gap-3">
                  <span
                    className={`w-2 h-2 mt-1.5 rounded-full ${
                      a.estado === "Abierto"
                        ? "bg-amber-500"
                        : "bg-brand-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-ink-900">
                      {a.descripcion}
                    </div>
                    <div className="text-xs text-ink-500">
                      {a.responsable} · vence {a.due}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="px-5 pt-5">
          <h2 className="font-semibold text-ink-900">Proyectos en consultoría</h2>
          <p className="text-sm text-ink-500 mb-4">
            Estado consolidado por cliente
          </p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-ink-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">Proyecto</th>
              <th className="text-left px-5 py-3">Cliente</th>
              <th className="text-left px-5 py-3">Sector</th>
              <th className="text-left px-5 py-3">BIM / ISO</th>
              <th className="text-left px-5 py-3">Avance</th>
              <th className="text-left px-5 py-3">Riesgo</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => {
              const pct = Math.round((p.hhEjecutadas / p.hhTotales) * 100);
              const riskColor =
                p.riesgo === "Alto"
                  ? "bg-rose-100 text-rose-700"
                  : p.riesgo === "Medio"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-emerald-100 text-emerald-700";
              return (
                <tr key={p.id} className="border-t border-ink-100">
                  <td className="px-5 py-3 font-medium text-ink-900">
                    {p.nombre}
                  </td>
                  <td className="px-5 py-3 text-ink-700">{p.cliente}</td>
                  <td className="px-5 py-3 text-ink-700">{p.sector}</td>
                  <td className="px-5 py-3 text-ink-700">
                    {p.bimMadurez} · {p.iso19650}%
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-32 bg-ink-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-ink-600">{pct}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`pill ${riskColor}`}>{p.riesgo}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
