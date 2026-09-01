import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { ScanSummary } from '../common/interfaces/ScanSummary';
import { ScanResult } from '../common/interfaces/ScanResult';
import { Recommendation } from '../common/interfaces/Recommendation';
import { AiReport } from '../common/interfaces/AiReport';

export interface ChatMessageDto {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequestDto {
  message: string;
  history?: ChatMessageDto[];
  context?: {
    projectName?: string;
    summary?: ScanSummary;
    results?: ScanResult[];
    recommendations?: Recommendation[];
    aiReport?: AiReport;
  };
}

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Body() body: ChatRequestDto) {
    const reply = await this.aiService.chat(body);
    return {
      status: 'success',
      reply,
    };
  }
}
