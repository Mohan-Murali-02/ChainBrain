import { Search, ShieldAlert, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import DependencyRow from "./DependencyRow";
import { useScanStore } from "../../../store/useScanStore";

const DependencyTable = () => {
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "vulnerable" | "secure">("all");

  const results = useScanStore(
    (state) => state.scanResult?.scanResults.results ?? []
  );

  const filtered = useMemo(() => {
    return results.filter((pkg) => {
      const matchesSearch = pkg.package
        .toLowerCase()
        .includes(search.toLowerCase());

      const isVulnerable = pkg.vulnerabilities && pkg.vulnerabilities.length > 0;

      if (!matchesSearch) return false;
      if (filterMode === "vulnerable") return isVulnerable;
      if (filterMode === "secure") return !isVulnerable;
      return true;
    });
  }, [results, search, filterMode]);

  const vulnerableCount = results.filter((p) => p.vulnerabilities?.length > 0).length;
  const secureCount = results.length - vulnerableCount;

  return (
    <div className="glass-card rounded-3xl p-7 md:p-9 shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dependency Inventory
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Deep SBOM package analysis with live advisory checks ({results.length} total)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Pills */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setFilterMode("all")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filterMode === "all"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              All ({results.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("vulnerable")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                filterMode === "vulnerable"
                  ? "bg-rose-500 text-white shadow-sm"
                  : "text-slate-500 hover:text-rose-500"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Vulnerable ({vulnerableCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("secure")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                filterMode === "secure"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-slate-500 hover:text-emerald-500"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Secure ({secureCount})</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              className="pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-indigo-500/20 w-60 shadow-sm transition-all"
              placeholder="Filter package name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-100/70 dark:bg-slate-800/70 border-b border-slate-200/80 dark:border-slate-800/80">
            <tr>
              <th className="py-3.5 pl-6 pr-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Package Name
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Installed Version
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Risk Tier
              </th>
              <th className="py-3.5 pl-4 pr-6 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Security Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-400 text-xs">
                  No packages matched your search criteria.
                </td>
              </tr>
            ) : (
              filtered.map((pkg) => (
                <DependencyRow
                  key={pkg.package}
                  packageName={pkg.package}
                  version={pkg.version}
                  vulnerabilities={pkg.vulnerabilities ?? []}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DependencyTable;