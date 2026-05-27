import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "▦" },
  { to: "/work-packages", label: "Work Packages", icon: "▤" },
  { to: "/readiness", label: "Readiness IWP", icon: "✓" },
  { to: "/path", label: "Path of Construction", icon: "→" },
  { to: "/audit", label: "Auditoría ISO 19650", icon: "◉" },
  { to: "/aura", label: "AURA AI", icon: "✦" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-ink-900 text-ink-100 flex flex-col">
      <div className="p-5 border-b border-ink-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-800 flex items-center justify-center text-white font-bold">
            P
          </div>
          <div>
            <div className="font-bold tracking-tight">Pacha AWP</div>
            <div className="text-[11px] text-ink-400 uppercase tracking-widest">
              by Sonqollay
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map((l) => (
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
            <span className="w-5 text-center text-brand-300">{l.icon}</span>
            <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-ink-800 text-[11px] text-ink-400 leading-snug">
        <div>v0.1 · piloto interno</div>
        <div className="mt-1">© Sonqollay · BIM · AWP · Lean · ISO 19650</div>
      </div>
    </aside>
  );
}
