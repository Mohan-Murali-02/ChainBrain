import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { uploadProject } from "../api/uploadApi";
import { useScanStore } from "../store/useScanStore";

import type { UploadResponse } from "../types/upload";

export const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const setScanResult = useScanStore(
    (state) => state.setScanResult
  );

  const upload = async (
    file: File
  ): Promise<UploadResponse | null> => {
    try {
      setLoading(true);
      setError(null);

      const data = await uploadProject(file);

      // Save backend response
      setScanResult(data);

      // Navigate to dashboard
      navigate("/dashboard");

      return data;
    } catch (err) {
      setError("Upload failed.");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    upload,
    loading,
    error,
  };
};