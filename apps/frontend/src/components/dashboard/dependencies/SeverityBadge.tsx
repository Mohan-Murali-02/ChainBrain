interface SeverityBadgeProps {
  severity: string;
}

const config: Record<
  string,
  {
    bg: string;
    text: string;
    border: string;
  }
> = {
  SECURE: {
    bg: "bg-emerald-50 dark:bg-emerald-950/80",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  LOW: {
    bg: "bg-blue-50 dark:bg-blue-950/80",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
  },
  MEDIUM: {
    bg: "bg-amber-50 dark:bg-amber-950/80",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
  },
  MODERATE: {
    bg: "bg-amber-50 dark:bg-amber-950/80",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
  },
  HIGH: {
    bg: "bg-orange-50 dark:bg-orange-950/80",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-200 dark:border-orange-800",
  },
  CRITICAL: {
    bg: "bg-rose-50 dark:bg-rose-950/80",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-800",
  },
  UNKNOWN: {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-700 dark:text-slate-300",
    border: "border-slate-200 dark:border-slate-700",
  },
};

const SeverityBadge = ({ severity }: SeverityBadgeProps) => {
  const normalized = severity?.toUpperCase() ?? "UNKNOWN";
  const style = config[normalized] ?? config.UNKNOWN;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold border ${style.bg} ${style.text} ${style.border}`}
    >
      {normalized}
    </span>
  );
};

export default SeverityBadge;