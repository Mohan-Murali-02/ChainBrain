import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: "memory",
    title: "AI Dependency Analysis",
    description:
      "Deep contextual analysis of your dependency tree and transitive package interactions.",
    iconBg: "bg-indigo-50 dark:bg-indigo-950",
    iconColor: "text-indigo-600 dark:text-cyan-400",
  },
  {
    icon: "radar",
    title: "Live CVE Intelligence",
    description:
      "Real-time matching against OSV, GitHub Advisory, and National Vulnerability Databases.",
    iconBg: "bg-rose-50 dark:bg-rose-950",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  {
    icon: "speed",
    title: "Quantitative Risk Engine",
    description:
      "Standardized CVSS risk score calculation from 0 to 100 with deployment readiness gates.",
    iconBg: "bg-amber-50 dark:bg-amber-950",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: "auto_awesome",
    title: "AI Remediation Chat",
    description:
      "Interactive assistant that provides precise upgrade shell commands and compatibility advice.",
    iconBg: "bg-cyan-50 dark:bg-cyan-950",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
];

const Features = () => {
  return (
    <section id="features" className="w-full my-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Everything you need for dependency security
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Transform complex CVE reports into clear, developer-friendly remediation steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default Features;