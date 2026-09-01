import { FiClock, FiDownload, FiRefreshCw } from "react-icons/fi";

import type { Project, ScanSummary } from "../../../types/scan";
import { getRiskDisplay } from "../../../utils/risk";

interface ProjectHeaderProps {
  project: Project;
  summary: ScanSummary;
}

const ProjectHeader = ({
  project,
  summary,
}: ProjectHeaderProps) => {
  const risk = getRiskDisplay(summary.riskLevel);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          Project: {project.name ?? "Unknown Project"}
        </h1>

        <div className="flex items-center gap-4 text-sm font-medium text-secondary">
          <span
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${
              summary.riskLevel === "LOW"
                ? "bg-green-50 text-green-700 border-green-100"
                : summary.riskLevel === "MEDIUM"
                ? "bg-yellow-50 text-yellow-700 border-yellow-100"
                : summary.riskLevel === "HIGH"
                ? "bg-orange-50 text-orange-700 border-orange-100"
                : "bg-red-50 text-red-700 border-red-100"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                summary.riskLevel === "LOW"
                  ? "bg-green-500"
                  : summary.riskLevel === "MEDIUM"
                  ? "bg-yellow-500"
                  : summary.riskLevel === "HIGH"
                  ? "bg-orange-500"
                  : "bg-red-500"
              }`}
            />

            {risk.label}
          </span>

          <span className="flex items-center gap-1.5">
            <FiClock className="w-4 h-4" />
            Latest Scan
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="px-6 py-3 bg-white border border-gray-200 rounded-full font-semibold text-sm hover:bg-gray-50 transition shadow-sm flex items-center gap-2">
          <FiDownload className="w-4 h-4" />
          Export
        </button>

        <button className="px-6 py-3 bg-primary text-white rounded-full font-semibold text-sm hover:bg-opacity-90 transition shadow-lg flex items-center gap-2">
          <FiRefreshCw className="w-4 h-4" />
          Rescan
        </button>
      </div>
    </div>
  );
};

export default ProjectHeader;