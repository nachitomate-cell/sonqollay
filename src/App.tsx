import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import WorkPackages from "./pages/WorkPackages";
import Readiness from "./pages/Readiness";
import PathOfConstruction from "./pages/PathOfConstruction";
import Audit from "./pages/Audit";
import Aura from "./pages/Aura";

export default function App() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-auto p-6 lg:p-8 bg-ink-50">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/work-packages" element={<WorkPackages />} />
            <Route path="/readiness" element={<Readiness />} />
            <Route path="/path" element={<PathOfConstruction />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/aura" element={<Aura />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
