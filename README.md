# Pacha AWP

**Plataforma interna de Advanced Work Packaging, readiness y auditoría ISO 19650 — diseñada para [Sonqollay](https://sonqollay.cl).**

Sonqollay es una consultora chilena especializada en gestión de proyectos para minería, energía e industria usando metodologías **BIM, AWP (Advanced Work Packaging), Lean Construction e ISO 19650**, con 30 años de experiencia y más de **16 millones de horas-hombre empaquetadas en terreno**.

Hoy gran parte de ese trabajo se realiza con planillas Excel, documentos Word y reportes manuales. Pacha AWP digitaliza ese flujo en una sola herramienta.

## Qué resuelve

| Módulo | Dolor que automatiza |
| --- | --- |
| **Dashboard** | Reportes ejecutivos del portafolio (HH, riesgo, ISO 19650) que hoy se arman a mano en Power Point |
| **Work Packages** | Jerarquía CWA → CWP → EWP → IWP con avance y responsables, en vez de planillas dispersas |
| **Readiness IWP** | Matriz de 8 constraints AWP (ingeniería, materiales, equipos, M.O., permisos, HSE, accesos, QA/QC) con regla de liberación automática — núcleo del método AWP |
| **Path of Construction** | Vista tipo Gantt con disciplinas y línea de hoy, sincronizada al modelo BIM |
| **Auditoría ISO 19650** | Checklist vivo del cumplimiento de gestión de información, en vez de auditorías Word/Excel |
| **AURA AI** | Asistente que sugiere packaging, detecta clashes y predice constraints faltantes — continuación del proyecto AURA AWP (Sonqollay · AC3E USM · CORFO) |

## Stack

- **Vite + React 18 + TypeScript** — SPA rápida, fácil de empaquetar
- **Tailwind CSS v4** — diseño consistente con la paleta de Sonqollay (cyan + slate)
- **React Router** — navegación entre módulos
- **Recharts** — gráficos del dashboard
- Datos seed embebidos (`src/data/seed.ts`) — listos para reemplazar por una API REST hacia el CDE / ERP del cliente

## Cómo correr

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

## Roadmap sugerido

1. **Integración con CDE** (Autodesk Construction Cloud, Trimble Connect, BIM 360) para leer modelos IFC y cantidades.
2. **Persistencia real** (PostgreSQL + API REST en Node/FastAPI).
3. **Multi-tenant** — un workspace por cliente de Sonqollay.
4. **Export oficial** del dossier ISO 19650-2 (TIDP / MIDP / BEP) en PDF.
5. **Conexión a AURA AWP** (modelo CORFO) vía endpoint para activar sugerencias reales.
6. **App móvil** para que el supervisor de terreno marque constraints OK desde el celular.

## Estructura

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── components/
│   ├── Sidebar.tsx
│   ├── Topbar.tsx
│   └── KpiCard.tsx
├── data/
│   ├── types.ts
│   └── seed.ts
└── pages/
    ├── Dashboard.tsx
    ├── WorkPackages.tsx
    ├── Readiness.tsx
    ├── PathOfConstruction.tsx
    ├── Audit.tsx
    └── Aura.tsx
```
