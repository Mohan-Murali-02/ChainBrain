import {
  ShieldCheck,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { useScanStore } from "../../../store/useScanStore";

const AISummary = () => {
  const aiReport = useScanStore(
    (state) => state.scanResult?.aiReport
  );

  if (!aiReport) return null;

  const isBlock = aiReport.deploymentRecommendation === "BLOCK";
  const isCaution = aiReport.deploymentRecommendation === "CAUTION";

  return (
    <div className="glass-card rounded-3xl p-7 md:p-9 lg:col-span-2 shadow-lg">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              AI Security Intelligence
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Automated executive assessment & remediation roadmap
            </p>
          </div>
        </div>

        {/* Deployment Recommendation Badge */}
        {aiReport.deploymentRecommendation && (
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
              isBlock
                ? "bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800"
                : isCaution
                ? "bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                : "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
            }`}
          >
            {isBlock ? (
              <ShieldAlert className="w-4 h-4 text-rose-500" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            )}
            <span>Deployment Status: {aiReport.deploymentRecommendation}</span>
          </div>
        )}
      </div>

      {/* Overall Assessment */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-2.5">
          <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-700 dark:text-slate-200">
            Overall Assessment
          </h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 font-normal">
          {aiReport.overallAssessment}
        </p>
      </div>

      {/* Key Findings */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-700 dark:text-slate-200">
            Key Findings
          </h3>
        </div>
        <ul className="space-y-2.5">
          {aiReport.keyFindings.map((finding: string, index: number) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-slate-900/40 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60"
            >
              <CheckCircle2 className="w-4 h-4 mt-0.5 text-indigo-500 dark:text-cyan-400 shrink-0" />
              <span className="leading-relaxed font-medium">{finding}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Priority Packages */}
      {aiReport.priorityPackages && aiReport.priorityPackages.length > 0 && (
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Priority Packages to Remediate
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {aiReport.priorityPackages.map((pkg, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/80 dark:bg-slate-900/60 shadow-sm"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {pkg.package}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {pkg.reason}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${
                    pkg.severity === "CRITICAL"
                      ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                      : pkg.severity === "HIGH"
                      ? "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-800"
                      : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                  }`}
                >
                  {pkg.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-700 dark:text-slate-200">
            Actionable Recommendations
          </h3>
        </div>
        <ul className="space-y-2">
          {aiReport.recommendations.map((recommendation: string, index: number) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200"
            >
              <ArrowRight className="w-4 h-4 mt-0.5 text-indigo-500 dark:text-cyan-400 shrink-0" />
              <span className="leading-relaxed">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Conclusion */}
      {aiReport.conclusion && (
        <div className="pt-5 border-t border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 italic">
          💡 {aiReport.conclusion}
        </div>
      )}
    </div>
  );
};

export default AISummary;