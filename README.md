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
| **CDE · Documentos** | Repositorio en los 4 estados ISO 19650 (WIP / Shared / Published / Archived) con buscador y filtros |
| **Integraciones** | Hub de sistemas conectados (Autodesk ACC, Trimble, Primavera P6, Power BI, Defontana, Teams, Aula Virtual Moodle, Entra ID, AURA AI…) con estado, scopes y log de eventos |
| **Partners & Proveedores** | Red externa: alianzas académicas (USM AC3E, AWP University, CII), estatales (CORFO), software (Autodesk), asociaciones (buildingSMART) y subcontratos |
| **Stakeholders** | Mapa visual por proyecto con todos los actores (mandante, EPC, subcontratos, autoridades, partners) y su matriz influencia × interés |
| **Clientes (CRM)** | Cartera de cuentas con contactos clave, NPS, ingreso anual y pipeline de oportunidades ponderado |
| **Reuniones** | Agenda de comités con minuta, asistentes y **acuerdos vinculados a proyectos** — fin de los compromisos olvidados en Word |
| **Academia** | Catálogo de cursos del Aula Virtual (AWP, BIM, ISO 19650, Lean) con inscritos, ocupación e ingreso proyectado |
| **Equipo** | Consultores con utilización (objetivo 75-85%), especialidades, carga por proyecto y certificaciones |

## Identidad visual

La paleta está inspirada en la raíz andina del nombre **Sonqollay** (del quechua *sonqo*, "corazón") y en el sector minero/energético chileno donde opera la consultora:

| Token | Hex | Uso |
| --- | --- | --- |
| `brand-500` (cobre) | `#EA580C` | Primario, CTAs, KPIs destacados |
| `brand-700` (cobre oscuro) | `#9A3412` | Hover, textos sobre cobre claro |
| `gold-400` (sol andino) | `#FBBF24` | Acento, sello de calidad |
| `ink-900` (azul noche andina) | `#0B1F3A` | Sidebar, texto principal |
| `ink-50` (cordillera neutra) | `#F6F4F0` | Fondo de la app |

Logos en `public/`:

- `sonqollay-logo.svg` — logo + wordmark horizontal (220×64)
- `sonqollay-mark.svg` — isotipo cuadrado (48×48)
- `favicon.svg` — favicon con fondo navy

> ⚠️ Estos archivos son una interpretación basada en el significado del nombre y el sector. Para reemplazarlos por los oficiales de Sonqollay, sobrescribe los SVG en `public/` con el mismo nombre (o ajusta la ruta en `src/components/Sidebar.tsx` y `index.html`). Los colores se cambian en un solo lugar: el bloque `@theme` de `src/index.css`.

## Stack

- **Vite + React 18 + TypeScript** — SPA rápida, fácil de empaquetar
- **Tailwind CSS v4** — diseño consistente con la paleta de Sonqollay (cyan + slate)
- **React Router** — navegación entre módulos
- **Recharts** — gráficos del dashboard
- Datos seed embebidos (`src/data/seed.ts`) — listos para reemplazar por una API REST hacia el CDE / ERP del cliente

## Ayuda y productividad

- **`?`** — abre la guía contextual de la pantalla actual + conceptos AWP/ISO relevantes
- **`⌘K` / `Ctrl K`** — paleta de comandos para saltar a cualquier proyecto, IWP, cliente, reunión
- **`Esc`** — cierra cualquier modal
- **Campana en topbar** — notificaciones automáticas (IWP listos, IWP bloqueados, acuerdos abiertos)
- **Glosario integrado** — desde el modal de ayuda, accesible en cada pantalla (CWA, CWP, EWP, IWP, BEP, MIDP, OIR, AIR, etc.)

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
    ├── Aura.tsx
    ├── Clientes.tsx
    ├── Reuniones.tsx
    ├── Academia.tsx
    └── Equipo.tsx
```
