import { Injectable } from '@nestjs/common';

import { ScanResult } from '../common/interfaces/ScanResult';
import { ScanSummary } from '../common/interfaces/ScanSummary';

@Injectable()
export class RiskService {
  calculate(results: ScanResult[]): ScanSummary {
    const totalPackages = results.length;

    let vulnerablePackages = 0;
    let totalVulnerabilities = 0;

    let critical = 0;
    let high = 0;
    let medium = 0;
    let low = 0;

    for (const pkg of results) {
      if (pkg.vulnerabilities.length > 0) {
        vulnerablePackages++;
      }

      for (const vuln of pkg.vulnerabilities) {
        totalVulnerabilities++;

        const severity =
          vuln.database_specific?.severity?.toUpperCase() ??
          'LOW';

        switch (severity) {
          case 'CRITICAL':
            critical++;
            break;

          case 'HIGH':
            high++;
            break;

          case 'MODERATE':
          case 'MEDIUM':
            medium++;
            break;

          default:
            low++;
            break;
        }
      }
    }

    const securePackages =
      totalPackages - vulnerablePackages;

    /*
     * Weighted Risk Model
     *
     * CRITICAL = 10
     * HIGH     = 7
     * MEDIUM   = 4
     * LOW      = 1
     */

    const weightedRisk =
      critical * 10 +
      high * 7 +
      medium * 4 +
      low;

    /*
     * Normalize against project size.
     *
     * Prevent division by zero for empty projects.
     */

    const maxPossibleRisk =
      Math.max(totalPackages, 1) * 10;

    const normalizedRisk =
      (weightedRisk / maxPossibleRisk) * 100;

    const riskScore = Math.min(
      100,
      Math.round(normalizedRisk),
    );

    const securityScore = Math.max(
      0,
      100 - riskScore,
    );

    let riskLevel: ScanSummary['riskLevel'];

    if (riskScore >= 70) {
      riskLevel = 'CRITICAL';
    } else if (riskScore >= 45) {
      riskLevel = 'HIGH';
    } else if (riskScore >= 20) {
      riskLevel = 'MEDIUM';
    } else {
      riskLevel = 'LOW';
    }

    return {
      totalPackages,

      securePackages,

      vulnerablePackages,

      totalVulnerabilities,

      securityScore,

      riskScore,

      riskLevel,

      severityCounts: {
        critical,
        high,
        medium,
        low,
      },
    };
  }
}