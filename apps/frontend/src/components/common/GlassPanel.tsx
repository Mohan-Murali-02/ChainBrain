import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

const GlassPanel = ({
  children,
  className = "",
}: GlassPanelProps) => {
  return (
    <div className={`glass-card ${className}`}>
      {children}
    </div>
  );
};

export default GlassPanel;