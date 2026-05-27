interface Props {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  hint?: string;
}

export default function KpiCard({ label, value, delta, trend, hint }: Props) {
  const trendColor =
    trend === "up"
      ? "text-emerald-600"
      : trend === "down"
        ? "text-rose-600"
        : "text-ink-500";
  const arrow = trend === "up" ? "↑" : trend === "down" ? "↓" : "·";
  return (
    <div className="card p-5">
      <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold text-ink-900">{value}</div>
      <div className="mt-2 flex items-center gap-2 text-sm">
        {delta && (
          <span className={`font-medium ${trendColor}`}>
            {arrow} {delta}
          </span>
        )}
        {hint && <span className="text-ink-500">{hint}</span>}
      </div>
    </div>
  );
}
