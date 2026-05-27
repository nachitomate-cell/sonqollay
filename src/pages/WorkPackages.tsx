import { useMemo, useState } from "react";
import { workPackages } from "../data/seed";
import type { WorkPackage } from "../data/types";

const fmt = (n: number) => n.toLocaleString("es-CL");

const typeColor: Record<string, string> = {
  CWA: "bg-indigo-100 text-indigo-700",
  CWP: "bg-brand-100 text-brand-700",
  EWP: "bg-amber-100 text-amber-700",
  IWP: "bg-emerald-100 text-emerald-700",
};

const estadoColor: Record<string, string> = {
  Planificado: "bg-ink-100 text-ink-700",
  Listo: "bg-emerald-100 text-emerald-700",
  "En ejecución": "bg-brand-100 text-brand-700",
  Cerrado: "bg-ink-200 text-ink-700",
  Bloqueado: "bg-rose-100 text-rose-700",
};

function Row({
  wp,
  level,
  childrenMap,
  open,
  toggle,
}: {
  wp: WorkPackage;
  level: number;
  childrenMap: Map<string, WorkPackage[]>;
  open: Set<string>;
  toggle: (id: string) => void;
}) {
  const kids = childrenMap.get(wp.id) ?? [];
  const isOpen = open.has(wp.id);
  return (
    <>
      <tr className="border-t border-ink-100 hover:bg-ink-50/50">
        <td className="px-3 py-3">
          <div
            className="flex items-center gap-2"
            style={{ paddingLeft: level * 18 }}
          >
            {kids.length > 0 ? (
              <button
                onClick={() => toggle(wp.id)}
                className="w-5 h-5 rounded border border-ink-200 text-ink-600 text-xs hover:bg-ink-100"
              >
                {isOpen ? "−" : "+"}
              </button>
            ) : (
              <span className="w-5" />
            )}
            <span className={`pill ${typeColor[wp.type]}`}>{wp.type}</span>
            <span className="font-mono text-xs text-ink-600">{wp.code}</span>
          </div>
        </td>
        <td className="px-3 py-3 text-ink-900">{wp.nombre}</td>
        <td className="px-3 py-3 text-ink-700">{wp.disciplina ?? "—"}</td>
        <td className="px-3 py-3 text-ink-700">{fmt(wp.hh)}</td>
        <td className="px-3 py-3">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-24 bg-ink-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-500"
                style={{ width: `${wp.progreso}%` }}
              />
            </div>
            <span className="text-xs text-ink-600">{wp.progreso}%</span>
          </div>
        </td>
        <td className="px-3 py-3">
          <span className={`pill ${estadoColor[wp.estado]}`}>{wp.estado}</span>
        </td>
        <td className="px-3 py-3 text-ink-700 text-xs">{wp.responsable}</td>
      </tr>
      {isOpen &&
        kids.map((c) => (
          <Row
            key={c.id}
            wp={c}
            level={level + 1}
            childrenMap={childrenMap}
            open={open}
            toggle={toggle}
          />
        ))}
    </>
  );
}

export default function WorkPackages() {
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<Set<string>>(
    new Set(workPackages.map((w) => w.id))
  );

  const childrenMap = useMemo(() => {
    const m = new Map<string, WorkPackage[]>();
    workPackages.forEach((w) => {
      if (w.parentId) {
        const arr = m.get(w.parentId) ?? [];
        arr.push(w);
        m.set(w.parentId, arr);
      }
    });
    return m;
  }, []);

  const roots = workPackages.filter((w) => !w.parentId);
  const filtered =
    filter === "all" ? roots : roots.filter((r) => r.type === filter);

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="card p-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          {["all", "CWA", "CWP", "EWP", "IWP"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                filter === t
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-white text-ink-700 border-ink-200 hover:bg-ink-50"
              }`}
            >
              {t === "all" ? "Todos" : t}
            </button>
          ))}
        </div>
        <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-ink-900 text-white hover:bg-ink-800">
          + Nuevo Work Package
        </button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-ink-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-3 py-3">Código</th>
              <th className="text-left px-3 py-3">Nombre</th>
              <th className="text-left px-3 py-3">Disciplina</th>
              <th className="text-left px-3 py-3">HH</th>
              <th className="text-left px-3 py-3">Avance</th>
              <th className="text-left px-3 py-3">Estado</th>
              <th className="text-left px-3 py-3">Responsable</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <Row
                key={r.id}
                wp={r}
                level={0}
                childrenMap={childrenMap}
                open={open}
                toggle={toggle}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
