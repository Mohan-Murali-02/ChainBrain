export interface Vulnerability {
  id?: string;
  cve?: string;
  severity?: string;
  description?: string;
  fixVersion?: string;
}

export interface PackageScan {
  package: string;
  version: string;
  vulnerabilities: Vulnerability[];
}

export interface ScanSummary {
  totalPackages: number;
  vulnerablePackages: number;
  totalVulnerabilities: number;
  riskScore: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

export interface ScanResults {
  summary: ScanSummary;
  results: PackageScan[];
}

export interface Project {
  path: string;
  name?: string;
  version?: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export interface ScanResponse {
  status: string;
  extractPath: string;
  projects: Project[];
  scanResults: ScanResults;
  aiReport: string;
}