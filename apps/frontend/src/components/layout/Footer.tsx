import { Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              ChainBrain
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              AI-Powered Software Composition Analysis
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <a href="#scanner" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
            Scanner
          </a>
          <a href="#features" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
            Capabilities
          </a>
          <Link to="/dashboard" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
            Security Console
          </Link>
          <a
            href="https://github.com/Mohan-Murali-02/ChainBrain"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
          © 2026 ChainBrain. Built with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" /> for modern developers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;