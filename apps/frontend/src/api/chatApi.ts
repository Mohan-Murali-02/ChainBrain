import axios from "axios";
import type { UploadResponse } from "../types/upload";

const API_BASE_URL = "http://localhost:3000";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatRequestPayload {
  message: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
  context?: {
    projectName?: string;
    summary?: UploadResponse["scanResults"]["summary"];
    results?: UploadResponse["scanResults"]["results"];
    recommendations?: UploadResponse["recommendations"];
    aiReport?: UploadResponse["aiReport"];
  };
}

export interface ChatResponse {
  status: string;
  reply: string;
}

export async function sendChatMessage(
  payload: ChatRequestPayload
): Promise<string> {
  const response = await axios.post<ChatResponse>(
    `${API_BASE_URL}/ai/chat`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 20000,
    }
  );

  return response.data.reply;
}
