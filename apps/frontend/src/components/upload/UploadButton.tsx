import { useRef } from "react";
import { UploadCloud, Loader2 } from "lucide-react";

interface UploadButtonProps {
  onFileSelected: (file: File) => void;
  loading?: boolean;
}

const UploadButton = ({
  onFileSelected,
  loading = false,
}: UploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".zip")) {
      alert("Please select a ZIP project archive.");
      return;
    }

    onFileSelected(file);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".zip"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-indigo-500/25 transition-all duration-300 flex items-center gap-2.5 disabled:opacity-60 hover:scale-105 active:scale-95 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Scanning Dependencies...</span>
          </>
        ) : (
          <>
            <UploadCloud className="w-4 h-4 text-white" />
            <span>Analyze Project ZIP</span>
          </>
        )}
      </button>
    </>
  );
};

export default UploadButton;