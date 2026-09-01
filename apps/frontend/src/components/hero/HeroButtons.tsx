import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import UploadButton from "../upload/UploadButton";

interface HeroButtonsProps {
  onFileSelected: (file: File) => void;
  loading: boolean;
}

const HeroButtons = ({ onFileSelected, loading }: HeroButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
      <UploadButton onFileSelected={onFileSelected} loading={loading} />

      <Link
        to="/dashboard"
        className="px-7 py-3.5 rounded-full font-bold text-sm text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
      >
        <ShieldCheck className="w-4 h-4 text-indigo-500 dark:text-cyan-400" />
        <span>View Demo Dashboard</span>
      </Link>
    </div>
  );
};

export default HeroButtons;