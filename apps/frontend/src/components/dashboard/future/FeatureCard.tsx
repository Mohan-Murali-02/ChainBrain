import type { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  icon: ReactNode;
  badge?: string;
  onClick?: () => void;
}

const FeatureCard = ({
  title,
  icon,
  badge = "Active",
  onClick,
}: FeatureCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="glass-card rounded-3xl p-6 flex flex-col items-center justify-center gap-3.5 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-400 dark:hover:border-cyan-400/50 transition-all duration-300 group relative text-center"
    >
      <div className="w-13 h-13 rounded-2xl bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-cyan-400 group-hover:scale-110 transition-transform shadow-inner">
        {icon}
      </div>

      <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
        {title}
      </span>

      {badge && (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
          {badge}
        </span>
      )}
    </button>
  );
};

export default FeatureCard;