import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { projects, workPackages } from "../data/seed";
import { clientes, reuniones } from "../data/crm";

interface Result {
  icon: string;
  tipo: string;
  label: string;
  sub: string;
  to: string;
}

function buildIndex(): Result[] {
  return [
    ...projects.map((p) => ({
      icon: "▦",
      tipo: "Proyecto",
      label: p.nombre,
      sub: `${p.cliente} · ${p.sector}`,
      to: "/dashboard",
    })),
    ...workPackages.map((w) => ({
      icon: "▤",
      tipo: w.type,
      label: `${w.code} — ${w.nombre}`,
      sub: `${w.disciplina ?? "—"} · ${w.estado}`,
      to: "/work-packages",
    })),
    ...clientes.map((c) => ({
      icon: "♟",
      tipo: "Cliente",
      label: c.razonSocial,
      sub: `${c.sector} · NPS ${c.nps}`,
      to: "/clientes",
    })),
    ...reuniones.map((r) => ({
      icon: "▣",
      tipo: "Reunión",
      label: r.titulo,
      sub: `${r.fecha} · ${r.modalidad}`,
      to: "/reuniones",
    })),
    {
      icon: "✦",
      tipo: "AI",
      label: "Preguntar a AURA",
      sub: "Asistente AWP",
      to: "/aura",
    },
    {
      icon: "◉",
      tipo: "Auditoría",
      label: "Checklist ISO 19650",
      sub: "Cumplimiento",
      to: "/audit",
    },
    {
      icon: "✓",
      tipo: "Readiness",
      label: "Matriz de constraints IWP",
      sub: "8 constraints",
      to: "/readiness",
    },
  ];
}

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    if (!q.trim()) return index.slice(0, 8);
    const lower = q.toLowerCase();
    return index
      .filter(
        (r) =>
          r.label.toLowerCase().includes(lower) ||
          r.sub.toLowerCase().includes(lower) ||
          r.tipo.toLowerCase().includes(lower)
      )
      .slice(0, 12);
  }, [q, index]);

  function go(r: Result) {
    navigate(r.to);
    onClose();
    setQ("");
  }

  return (
    <Modal open={open} onClose={onClose} size="md">
      <div className="-m-6">
        <div className="border-b border-ink-100 px-5 py-3 flex items-center gap-3">
          <span className="text-ink-400 text-lg">⌕</span>
          <input
            autoFocus
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter" && results[active]) {
                go(results[active]);
              }
            }}
            placeholder="Buscar proyectos, IWPs, clientes, reuniones…"
            className="flex-1 outline-none text-base placeholder:text-ink-400"
          />
          <kbd className="text-[10px] text-ink-500 bg-ink-100 px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        <ul className="max-h-[55vh] overflow-y-auto">
          {results.map((r, i) => (
            <li key={i}>
              <button
                onClick={() => go(r)}
                onMouseEnter={() => setActive(i)}
                className={`w-full text-left px-5 py-3 flex items-center gap-3 ${
                  active === i ? "bg-brand-50" : "hover:bg-ink-50"
                }`}
              >
                <span className="w-6 text-center text-brand-600">
                  {r.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-ink-900 truncate">
                    {r.label}
                  </div>
                  <div className="text-xs text-ink-500 truncate">{r.sub}</div>
                </div>
                <span className="pill bg-ink-100 text-ink-600">{r.tipo}</span>
              </button>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-5 py-10 text-center text-ink-500 text-sm">
              Sin resultados para "{q}"
            </li>
          )}
        </ul>

        <div className="border-t border-ink-100 px-5 py-2 text-[11px] text-ink-500 flex items-center gap-4">
          <span>
            <kbd className="bg-ink-100 px-1 rounded">↑↓</kbd> navegar
          </span>
          <span>
            <kbd className="bg-ink-100 px-1 rounded">↵</kbd> abrir
          </span>
          <span className="ml-auto">{results.length} resultados</span>
        </div>
      </div>
    </Modal>
  );
}
