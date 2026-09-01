import type { ReactNode } from "react";
import { Cpu, Radar, Gauge, Sparkles } from "lucide-react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}

const iconMap: Record<string, ReactNode> = {
  memory: <Cpu className="w-6 h-6" />,
  radar: <Radar className="w-6 h-6" />,
  speed: <Gauge className="w-6 h-6" />,
  auto_awesome: <Sparkles className="w-6 h-6" />,
};

export const FeatureCard = ({
  icon,
  title,
  description,
  iconBg,
  iconColor,
}: FeatureCardProps) => {
  return (
    <div className="glass-card rounded-3xl p-7 md:p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between">
      <div>
        <div
          className={`w-13 h-13 rounded-2xl flex items-center justify-center mb-6 ${iconBg} ${iconColor} shadow-inner`}
        >
          {iconMap[icon]}
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2.5 tracking-tight">
          {title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center text-xs font-bold text-indigo-600 dark:text-cyan-400">
        <span>Learn more &rarr;</span>
      </div>
    </div>
  );
};

export default FeatureCard;