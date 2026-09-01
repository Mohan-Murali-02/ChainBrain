import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { PieChart as PieIcon } from "lucide-react";
import { useScanStore } from "../../../store/useScanStore";

const RiskDistributionChart = () => {
  const summary = useScanStore(
    (state) => state.scanResult?.scanResults.summary
  );

  if (!summary) return null;

  const secureCount = summary.totalPackages - summary.vulnerablePackages;
  const vulnerableCount = summary.vulnerablePackages;

  const data = [
    { name: "Secure Packages", value: secureCount, color: "#10b981" },
    { name: "Vulnerable Packages", value: vulnerableCount, color: "#f43f5e" },
  ];

  return (
    <div className="glass-card rounded-3xl p-7 md:p-8 h-[420px] flex flex-col justify-between shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <PieIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
              Package Health Ratio
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Proportion of secure vs vulnerable dependencies
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
                fontSize: "12px",
                fontWeight: "600",
              }}
            />
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ fontSize: "12px", paddingTop: "12px", fontWeight: "600" }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {summary.totalPackages}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Packages
          </span>
        </div>
      </div>
    </div>
  );
};

export default RiskDistributionChart;