import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle, TrendingUp, Cpu } from "lucide-react";
import { Project } from "../types";

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  // Lock body scroll when modal is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    // Listen for Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-[#0B0B0A] overflow-y-auto flex flex-col"
    >
      {/* Absolute top grid lines to emphasize precision & design framework */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10 pointer-events-none" />
      
      {/* Top sticky action panel */}
      <div className="sticky top-0 bg-[#0B0B0A]/95 backdrop-blur-md border-b border-white/10 py-5 px-6 md:px-12 flex justify-between items-center z-10">
        <button
          onClick={onClose}
          className="group flex items-center space-x-3 text-[11px] font-sans font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:line-through transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
        </button>
        <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
          CASE STUDY_0{project.id} // SYSTEM READY
        </span>
      </div>

      {/* Main Container */}
      <div className="flex-grow max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24 w-full">
        <motion.div
          layoutId={`card-container-${project.id}`}
          className="bg-[#0B0B0A] border border-white/10 p-8 md:p-16 mb-16 space-y-8 relative overflow-hidden"
        >
          {/* Subtle abstract crosshair graphic */}
          <div className="absolute top-0 right-0 w-16 h-16 border-b border-l border-white/10 pointer-events-none flex items-center justify-center">
            <span className="font-mono text-[9px] text-neutral-700">0x{project.id}</span>
          </div>

          <div className="space-y-4">
            <motion.div
              layoutId={`card-tag-${project.id}`}
              className="font-sans text-xs uppercase tracking-[0.22em] text-neutral-400 font-bold"
            >
              {project.tags.join(" · ")}
            </motion.div>
            
            <motion.h1
              layoutId={`card-title-${project.id}`}
              className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white leading-none"
            >
              {project.title}
            </motion.h1>

            <motion.p
              layoutId={`card-subtitle-${project.id}`}
              className="font-sans text-sm md:text-base uppercase tracking-wider text-neutral-400 max-w-2xl leading-relaxed"
            >
              {project.subtitle}
            </motion.p>
          </div>

          <motion.div
            layoutId={`card-meta-${project.id}`}
            className="w-16 h-px bg-white/20"
          />
        </motion.div>

        {/* Dynamic Details Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Panel: Challenge & Impact Indicators */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* The Challenge */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Cpu className="w-4 h-4 text-neutral-400" />
                <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-white font-black">
                  The Problem & Challenge
                </h3>
              </div>
              <p className="font-sans text-base text-neutral-400 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Research & Methodology Process */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-neutral-400" />
                <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-white font-black">
                  Methodology & Process
                </h3>
              </div>
              <ul className="space-y-4 font-sans text-sm text-neutral-400">
                {project.process.map((step, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="font-mono text-xs text-white mr-4 bg-neutral-900 border border-white/10 w-6 h-6 flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Design Solution */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-white font-black">
                The Final Design Strategy
              </h3>
              <p className="font-sans text-base text-neutral-400 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Right Panel: Metrics, Quote & Tech Insights */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Hard Metrics & Achievements */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-4 h-4 text-neutral-400" />
                <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-white font-black">
                  Empirical Results
                </h3>
              </div>
              <div className="space-y-4">
                {project.metrics.map((metric, idx) => {
                  const parts = metric.split(" ");
                  const value = parts[0];
                  const label = parts.slice(1).join(" ");
                  return (
                    <div key={idx} className="border border-white/10 p-5 bg-neutral-950/50 flex flex-col justify-between">
                      <span className="font-serif font-bold text-3xl tracking-tight text-white mb-1">
                        {value}
                      </span>
                      <span className="font-sans text-xs uppercase tracking-wider text-neutral-500">
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Psychological Insight Card */}
            <div className="bg-white text-[#0B0B0A] p-8 space-y-4">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500 block">
                CORE BEHAVIORAL DISCOVERY
              </span>
              <p className="font-sans text-base font-medium leading-relaxed italic">
                &ldquo;{project.researchInsight}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Back navigation at the very bottom */}
        <div className="mt-20 pt-10 border-t border-white/10 flex justify-center">
          <button
            onClick={onClose}
            className="group flex items-center space-x-3 text-xs font-sans font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:line-through transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Portfolio Home</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
