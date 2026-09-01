import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "../../store/useThemeStore";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle = ({ className = "", showLabel = false }: ThemeToggleProps) => {
  const { resolvedTheme, toggleTheme } = useThemeStore();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-200 border ${
        isDark
          ? "bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 border-slate-700/60 shadow-inner"
          : "bg-white hover:bg-slate-100 text-indigo-600 border-slate-200 shadow-sm"
      } ${className}`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-300 transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600 transition-transform duration-300 -rotate-12 hover:rotate-0" />
        )}
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-semibold capitalize text-slate-700 dark:text-slate-200">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
