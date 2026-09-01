import { Sparkles, Shield } from "lucide-react";
import HeroButtons from "./HeroButtons";

interface HeroProps {
  onFileSelected: (file: File) => void;
  loading: boolean;
}

const Hero = ({ onFileSelected, loading }: HeroProps) => {
  return (
    <section className="relative w-full rounded-3xl overflow-hidden glass-card p-8 md:p-16 my-8 hero-gradient border border-slate-200/80 dark:border-slate-800/80 shadow-2xl">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-cyan-500/20 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-100/80 dark:bg-indigo-950/80 text-indigo-700 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-800 shadow-sm animate-pulse-glow">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
          <span>Next-Gen AI Software Composition Analysis (SCA)</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-3xl">
          Secure your dependencies before attackers exploit them.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-normal">
          Upload your project archive to scan every dependency against live CVE databases, calculate enterprise risk scores, and get AI-powered remediation playbooks in seconds.
        </p>

        <HeroButtons onFileSelected={onFileSelected} loading={loading} />

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60 w-full max-w-xl">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            Zero Cloud Storage
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
            Ollama & OSV Powered
          </span>
          <span>•</span>
          <span>Enterprise SBOM Ready</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;