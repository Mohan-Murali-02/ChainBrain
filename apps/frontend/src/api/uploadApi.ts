import axios from "axios";
import type { UploadResponse } from "../types/upload";

const API_BASE_URL = "http://localhost:3000";

export async function uploadProject(
  file: File
): Promise<UploadResponse> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post<UploadResponse>(
    `${API_BASE_URL}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}