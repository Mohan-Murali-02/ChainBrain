import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as unzipper from 'unzipper';
import { Readable } from 'stream';

import { ScannerService } from '../scanner/scanner.service';
import { RiskService } from '../risk/risk.service';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { RecommendationService } from '../recommendation/recommendation.service';


@Injectable()
export class UploadService {
  constructor(
    private readonly scannerService: ScannerService,
    private readonly riskService: RiskService,
    private readonly recommendationService: RecommendationService,
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  async processZip(buffer: Buffer) {
    const extractPath = path.join(
      'uploads',
      'extracted',
      Date.now().toString(),
    );

    await fs.ensureDir(extractPath);

    await Readable.from(buffer)
      .pipe(unzipper.Extract({ path: extractPath }))
      .promise();

    const packageJsonFiles = await this.findPackageJsons(extractPath);

    const projects: {
      path: string;
      name: string;
      version: string;
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    }[] = [];

    for (const packageJsonPath of packageJsonFiles) {
      const packageJson = await fs.readJson(packageJsonPath);

      projects.push({
        path: packageJsonPath,
        name: packageJson.name,
        version: packageJson.version,
        dependencies: packageJson.dependencies || {},
        devDependencies: packageJson.devDependencies || {},
      });
    }

    const results = await this.scannerService.scan(projects);

    const summary = this.riskService.calculate(results);

    const recommendations =
      this.recommendationService.generate(results);

    const aiReport =
      await this.aiService.generateReport({
        summary,
        results,
        recommendations,
    });

    await this.prisma.scan.create({
      data: {
        projectName: projects[0]?.name ?? 'Unknown Project',

        totalPackages: summary.totalPackages,

        vulnerablePackages: summary.vulnerablePackages,

        totalVulnerabilities: summary.totalVulnerabilities,
      },
    });

    return {
      status: 'success',

      extractPath,

      projects,

      scanResults: {
        summary,
        results
      },
      recommendations,
      aiReport,
    };
  }

  private async findPackageJsons(dir: string): Promise<string[]> {
    let results: string[] = [];

    const entries = await fs.readdir(dir);

    for (const entry of entries) {
      const fullPath = path.join(dir, entry);

      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        if (entry === 'node_modules') continue;

        results.push(...(await this.findPackageJsons(fullPath)));
      } else if (entry === 'package.json') {
        results.push(fullPath);
      }
    }

    return results;
  }
}