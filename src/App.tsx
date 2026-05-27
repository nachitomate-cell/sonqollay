import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import HelpModal from "./components/HelpModal";
import CommandPalette from "./components/CommandPalette";
import Dashboard from "./pages/Dashboard";
import WorkPackages from "./pages/WorkPackages";
import Readiness from "./pages/Readiness";
import PathOfConstruction from "./pages/PathOfConstruction";
import Audit from "./pages/Audit";
import Aura from "./pages/Aura";
import Clientes from "./pages/Clientes";
import Reuniones from "./pages/Reuniones";
import Academia from "./pages/Academia";
import Equipo from "./pages/Equipo";
import Documentos from "./pages/Documentos";

export default function App() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inField =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (!inField && e.key === "?") {
        e.preventDefault();
        setHelpOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenHelp={() => setHelpOpen(true)}
        />
        <main className="flex-1 overflow-auto p-6 lg:p-8 bg-ink-50">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/work-packages" element={<WorkPackages />} />
            <Route path="/readiness" element={<Readiness />} />
            <Route path="/path" element={<PathOfConstruction />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/aura" element={<Aura />} />
            <Route path="/documentos" element={<Documentos />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/reuniones" element={<Reuniones />} />
            <Route path="/academia" element={<Academia />} />
            <Route path="/equipo" element={<Equipo />} />
          </Routes>
        </main>
      </div>

      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
}
