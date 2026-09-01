import { FolderGit2, ArrowUpRight } from "lucide-react";
import { useScanStore } from "../../../store/useScanStore";

const RecentProjects = () => {
  const scanResult = useScanStore((state) => state.scanResult);

  if (!scanResult) return null;

  const riskLevel = scanResult.scanResults.summary.riskLevel;

  return (
    <section className="glass-card rounded-3xl p-7 md:p-8 lg:col-span-1 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-cyan-400">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Scanned Modules
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
            {scanResult.projects.length} Total
          </span>
        </div>

        <ul className="space-y-3">
          {scanResult.projects.map((project, index) => (
            <li
              key={index}
              className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between hover:border-indigo-400 dark:hover:border-cyan-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="min-w-0 flex-1 pr-2">
                <p className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                  {project.name || "Main Package"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-mono">
                  {project.path || "package.json"}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    riskLevel === "LOW"
                      ? "bg-emerald-500 shadow-sm shadow-emerald-500/50"
                      : riskLevel === "MEDIUM"
                      ? "bg-amber-500 shadow-sm shadow-amber-500/50"
                      : "bg-rose-500 shadow-sm shadow-rose-500/50 animate-pulse"
                  }`}
                />
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span>Security Engine</span>
          <span className="font-bold text-indigo-600 dark:text-cyan-400">OSV.dev + NVD</span>
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;