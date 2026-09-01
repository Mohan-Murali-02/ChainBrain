import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { ScanResult } from '../common/interfaces/ScanResult';

@Injectable()
export class ScannerService {
  async scan(projects: any[]): Promise<ScanResult[]> {
    const scannedPackages = new Set<string>();

    const packages: {
      package: string;
      version: string;
    }[] = [];

    for (const project of projects) {
      const dependencies = {
        ...(project.dependencies || {}),
        ...(project.devDependencies || {}),
      };

      for (const [name, version] of Object.entries(dependencies)) {
        if (scannedPackages.has(name)) continue;

        scannedPackages.add(name);

        packages.push({
          package: name,
          version: (version as string).replace(/^[~^]/, ''),
        });
      }
    }

    /*
      Limit to 10 simultaneous requests
    */
    const limit = 10;
    return this.executeWithConcurrencyLimit(packages, limit, async (pkg) => {
      try {
        const response = await axios.post(
          'https://api.osv.dev/v1/query',
          {
            package: {
              ecosystem: 'npm',
              name: pkg.package,
            },
            version: pkg.version,
          },
        );

        return {
          package: pkg.package,
          version: pkg.version,
          vulnerabilities: response.data.vulns ?? [],
        };
      } catch {
        return {
          package: pkg.package,
          version: pkg.version,
          vulnerabilities: [],
          error: 'Failed to scan',
        };
      }
    });
  }

  private async executeWithConcurrencyLimit<T, R>(
    items: T[],
    limit: number,
    fn: (item: T) => Promise<R>,
  ): Promise<R[]> {
    const results: R[] = new Array(items.length);
    let index = 0;
    const workers = Array.from(
      { length: Math.min(limit, items.length) },
      async () => {
        while (index < items.length) {
          const current = index++;
          results[current] = await fn(items[current]);
        }
      },
    );
    await Promise.all(workers);
    return results;
  }
}