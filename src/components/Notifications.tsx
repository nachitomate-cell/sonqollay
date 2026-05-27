import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { workPackages } from "../data/seed";
import { reuniones } from "../data/crm";

interface Notif {
  icon: string;
  color: string;
  label: string;
  sub: string;
  to: string;
}

function build(): Notif[] {
  const out: Notif[] = [];

  workPackages
    .filter((w) => w.type === "IWP" && w.estado === "Listo")
    .forEach((w) =>
      out.push({
        icon: "✓",
        color: "bg-emerald-100 text-emerald-700",
        label: `${w.code} listo para liberar`,
        sub: `Inicio plan: ${w.inicioPlan}`,
        to: "/readiness",
      })
    );

  workPackages
    .filter((w) => w.type === "IWP" && w.estado === "Bloqueado")
    .forEach((w) => {
      const faltan = w.constraints?.filter((c) => !c.ok).length ?? 0;
      out.push({
        icon: "⚠",
        color: "bg-rose-100 text-rose-700",
        label: `${w.code} bloqueado`,
        sub: `${faltan} constraints abiertos`,
        to: "/readiness",
      });
    });

  reuniones
    .flatMap((r) => r.acuerdos.map((a) => ({ a, r })))
    .filter(({ a }) => a.estado === "Abierto")
    .forEach(({ a, r }) =>
      out.push({
        icon: "▣",
        color: "bg-amber-100 text-amber-700",
        label: a.descripcion,
        sub: `${a.responsable} · vence ${a.due} · ${r.titulo}`,
        to: "/reuniones",
      })
    );

  return out;
}

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const items = build();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative w-9 h-9 rounded-lg border border-ink-200 bg-white hover:bg-ink-50 flex items-center justify-center text-ink-600"
        aria-label="Notificaciones"
        title="Notificaciones"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full brand-gradient text-white text-[10px] font-bold flex items-center justify-center shadow">
            {items.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-96 max-h-[70vh] overflow-y-auto bg-white border border-ink-200 rounded-xl shadow-xl z-40">
          <div className="px-4 py-3 border-b border-ink-100 flex items-center justify-between">
            <div className="font-semibold text-ink-900">Notificaciones</div>
            <button className="text-xs text-brand-700 hover:text-brand-800 font-semibold">
              Marcar todas leídas
            </button>
          </div>
          <ul className="divide-y divide-ink-100">
            {items.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-ink-50"
                >
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${n.color}`}
                  >
                    {n.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-ink-900 leading-snug">
                      {n.label}
                    </div>
                    <div className="text-xs text-ink-500 truncate">
                      {n.sub}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
            {items.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-ink-500">
                Sin notificaciones pendientes.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
