import { create } from "zustand";
import type { UploadResponse } from "../types/upload";

interface ScanStore {
  scanResult: UploadResponse | null;

  setScanResult: (data: UploadResponse) => void;

  clearScanResult: () => void;
}

export const useScanStore = create<ScanStore>((set) => ({
  scanResult: null,

  setScanResult: (data) =>
    set({
      scanResult: data,
    }),

  clearScanResult: () =>
    set({
      scanResult: null,
    }),
}));