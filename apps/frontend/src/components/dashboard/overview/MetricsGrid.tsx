import {
  Package,
  Shield,
  ShieldCheck,
  TriangleAlert,
  ShieldAlert,
} from "lucide-react";
import MetricCard from "./MetricCard";
import { useScanStore } from "../../../store/useScanStore";

const MetricsGrid = () => {
  const summary = useScanStore(
    (state) => state.scanResult?.scanResults.summary
  );

  if (!summary) return null;

  const isCritical = summary.riskLevel === "CRITICAL" || summary.riskLevel === "HIGH";

  const riskColor =
    summary.riskLevel === "LOW"
      ? "text-emerald-600 dark:text-emerald-400"
      : summary.riskLevel === "MEDIUM"
      ? "text-amber-600 dark:text-amber-400"
      : "text-rose-600 dark:text-rose-400";

  const riskIcon =
    summary.riskLevel === "LOW"
      ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
      : summary.riskLevel === "MEDIUM"
      ? "bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800"
      : "bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <MetricCard
        title="Security Score"
        value={summary.securityScore ?? 100 - (summary.riskScore || 0)}
        suffix="/100"
        valueClassName={
          (summary.securityScore ?? 100) >= 80
            ? "text-emerald-600 dark:text-emerald-400"
            : (summary.securityScore ?? 100) >= 50
            ? "text-amber-600 dark:text-amber-400"
            : "text-rose-600 dark:text-rose-400"
        }
        icon={<ShieldCheck className="w-6 h-6" />}
        iconContainerClassName="bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-cyan-400 border-blue-200 dark:border-blue-800"
      />

      <MetricCard
        title="Risk Level"
        value={summary.riskLevel}
        valueClassName={`text-2xl ${riskColor}`}
        icon={
          isCritical ? (
            <ShieldAlert className="w-6 h-6" />
          ) : (
            <Shield className="w-6 h-6" />
          )
        }
        iconContainerClassName={riskIcon}
      />

      <MetricCard
        title="Total Packages"
        value={summary.totalPackages}
        icon={<Package className="w-6 h-6" />}
        iconContainerClassName="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
      />

      <MetricCard
        title="Vulnerable Packages"
        value={summary.vulnerablePackages}
        valueClassName={
          summary.vulnerablePackages > 0
            ? "text-rose-600 dark:text-rose-400"
            : "text-emerald-600 dark:text-emerald-400"
        }
        icon={<TriangleAlert className="w-6 h-6" />}
        iconContainerClassName={
          summary.vulnerablePackages > 0
            ? "bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800"
            : "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
        }
      />
    </div>
  );
};

export default MetricsGrid;