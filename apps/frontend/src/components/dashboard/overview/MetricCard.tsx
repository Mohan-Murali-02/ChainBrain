import type { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  valueClassName?: string;
  icon: ReactNode;
  iconContainerClassName: string;
  cardClassName?: string;
}

const MetricCard = ({
  title,
  value,
  suffix,
  valueClassName = "",
  icon,
  iconContainerClassName,
  cardClassName = "",
}: MetricCardProps) => {
  return (
    <div
      className={`bg-white/85 dark:bg-slate-900/85 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm dark:shadow-lg backdrop-blur-xl flex items-center justify-between transition-all hover:-translate-y-0.5 hover:shadow-md ${cardClassName}`}
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
          {title}
        </p>

        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight ${valueClassName}`}>
            {value}
          </span>

          {suffix && (
            <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
              {suffix}
            </span>
          )}
        </div>
      </div>

      <div
        className={`w-13 h-13 rounded-2xl flex items-center justify-center border shadow-inner ${iconContainerClassName}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default MetricCard;