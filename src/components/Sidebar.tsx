import { NavLink } from "react-router-dom";

const groups: { titulo: string; items: { to: string; label: string; icon: string }[] }[] = [
  {
    titulo: "Operación",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: "▦" },
      { to: "/work-packages", label: "Work Packages", icon: "▤" },
      { to: "/readiness", label: "Readiness IWP", icon: "✓" },
      { to: "/path", label: "Path of Construction", icon: "→" },
      { to: "/audit", label: "Auditoría ISO 19650", icon: "◉" },
      { to: "/documentos", label: "CDE · Documentos", icon: "▥" },
      { to: "/aura", label: "AURA AI", icon: "✦" },
    ],
  },
  {
    titulo: "Comercial & Gestión",
    items: [
      { to: "/clientes", label: "Clientes (CRM)", icon: "♟" },
      { to: "/reuniones", label: "Reuniones", icon: "▣" },
      { to: "/academia", label: "Academia", icon: "✎" },
      { to: "/equipo", label: "Equipo", icon: "◭" },
    ],
  },
  {
    titulo: "Conexiones",
    items: [
      { to: "/integraciones", label: "Integraciones", icon: "⇄" },
      { to: "/partners", label: "Partners & Proveedores", icon: "⌬" },
      { to: "/stakeholders", label: "Stakeholders", icon: "◯" },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-ink-900 text-ink-100 flex flex-col">
      <div className="p-5 border-b border-ink-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/95 flex items-center justify-center shadow-sm">
            <img
              src="/sonqollay-mark.svg"
              alt=""
              className="w-8 h-8"
              aria-hidden="true"
            />
          </div>
          <div>
            <div className="font-bold tracking-tight text-white">Sonqollay</div>
            <div className="text-[10px] text-gold-400 uppercase tracking-[0.18em] font-semibold">
              Pacha AWP
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 overflow-y-auto">
        {groups.map((g) => (
          <div key={g.titulo} className="mb-4">
            <div className="px-3 mb-1 text-[10px] uppercase tracking-widest text-ink-500 font-semibold">
              {g.titulo}
            </div>
            <div className="space-y-1">
              {g.items.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-brand-500/20 text-brand-200"
                        : "text-ink-300 hover:bg-ink-800 hover:text-white",
                    ].join(" ")
                  }
                >
                  <span className="w-5 text-center text-brand-300">
                    {l.icon}
                  </span>
                  <span>{l.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-ink-800 text-[11px] text-ink-400 leading-snug">
        <div>v0.2 · piloto interno</div>
        <div className="mt-1 text-ink-500">
          © Sonqollay · BIM · AWP · Lean · ISO 19650
        </div>
      </div>
    </aside>
  );
}
