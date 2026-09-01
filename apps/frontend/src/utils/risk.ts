export const getRiskDisplay = (
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
) => {
  switch (riskLevel) {
    case "LOW":
      return {
        label: "Low",
        color: "text-green-600",
      };

    case "MEDIUM":
      return {
        label: "Medium",
        color: "text-yellow-600",
      };

    case "HIGH":
      return {
        label: "High",
        color: "text-orange-600",
      };

    case "CRITICAL":
      return {
        label: "Critical",
        color: "text-red-600",
      };
    default:
      return {
        label: riskLevel,
        color: "text-primary",
      };
  }
};