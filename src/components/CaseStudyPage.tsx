import { ArrowLeft, CheckCircle2, ChevronRight, FileText, Sparkles } from "lucide-react";
import { Project } from "../types";
import { motion } from "motion/react";
import BhavnagarCaseStudy from "./BhavnagarCaseStudy";
import DarkPatternsCaseStudy from "./DarkPatternsCaseStudy";

interface CaseStudyPageProps {
  project: Project;
  onBack: () => void;
  onBackToProjects?: () => void;
}

export default function CaseStudyPage({ project, onBack, onBackToProjects }: CaseStudyPageProps) {
  if (project.path.includes("dark-patterns")) {
    return <DarkPatternsCaseStudy onBackToProjects={onBackToProjects || onBack} onBack={onBackToProjects || onBack} />;
  }

  if (project.path === "/projects/bhavnagar-heritage") {
    return <BhavnagarCaseStudy onBackToProjects={onBackToProjects || onBack} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-[#060605] text-white pt-24 pb-36 px-6 md:px-12 relative z-30"
    >
      {/* Grid line guidelines */}
      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-[0.02]">
        <div className="border-r border-white h-full" />
        <div className="border-r border-white h-full" />
        <div className="border-r border-white h-full" />
        <div className="h-full" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 space-y-16">
        
        {/* Navigation back */}
        <button
          onClick={onBackToProjects || onBack}
          className="group inline-flex items-center space-x-2.5 font-sans text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>← Back to Projects</span>
        </button>

        {/* HEADER SECTION */}
        <div className="space-y-6 max-w-4xl border-b border-neutral-900 pb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-400 bg-neutral-900/40 border border-neutral-800/60 px-3.5 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none text-white">
            {project.title}
          </h1>

          {/* Subtitle / Intro Paragraph */}
          <p className="font-sans text-lg sm:text-xl text-neutral-300 font-light leading-relaxed max-w-3xl">
            {project.subtitle}
          </p>
        </div>

        {/* METADATA GRID: METHODS & OUTCOMES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-neutral-900 pb-12">
          <div className="space-y-3 p-6 bg-neutral-950/40 border border-neutral-900 rounded-[16px]">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold block">
              Core Methodologies
            </span>
            <p className="font-sans text-sm text-neutral-200 leading-relaxed font-medium">
              {project.methods || "UX Research · Usability Testing"}
            </p>
          </div>

          <div className="space-y-3 p-6 bg-neutral-950/40 border border-neutral-900 rounded-[16px]">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold block">
              Strategic Outcome
            </span>
            <p className="font-serif text-sm text-neutral-200 leading-relaxed italic">
              {project.outcome || "A highly accessible platform for digital storytelling."}
            </p>
          </div>
        </div>

        {/* DETAILED CONTENT: CHALLENGE & RESEARCH INSIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-4">
          
          {/* Main content columns */}
          <div className="md:col-span-2 space-y-12">
            
            {/* The Challenge */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-2xl tracking-tight text-white">
                The UX Challenge
              </h3>
              <p className="font-sans text-sm text-neutral-400 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* The Process / Steps */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-2xl tracking-tight text-white">
                Audit &amp; Research Synthesis
              </h3>
              <div className="space-y-4">
                {project.process.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-4 p-4 bg-neutral-950/20 border border-neutral-900/60 rounded-[12px]"
                  >
                    <span className="font-mono text-xs text-neutral-600 bg-neutral-900 px-2.5 py-1 rounded">
                      0{idx + 1}
                    </span>
                    <p className="font-sans text-sm text-neutral-300 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* The Solution */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-2xl tracking-tight text-white">
                The Final Architecture
              </h3>
              <p className="font-sans text-sm text-neutral-400 leading-relaxed">
                {project.solution}
              </p>
            </div>

          </div>

          {/* Right rail columns - Insights & Metrics */}
          <div className="space-y-10 md:pl-4">
            
            {/* Key Metrics */}
            <div className="space-y-5">
              <h4 className="font-serif font-bold text-lg text-white tracking-tight">
                Case Impact Metrics
              </h4>
              <div className="space-y-4">
                {project.metrics.map((metric, idx) => {
                  const [value, ...rest] = metric.split(" ");
                  const label = rest.join(" ");
                  return (
                    <div
                      key={idx}
                      className="border border-neutral-900 p-5 bg-neutral-950/60 rounded-[16px] flex flex-col justify-between hover:border-neutral-800 transition-colors"
                    >
                      <span className="font-serif font-bold text-2xl text-white tracking-tight mb-1">
                        {value}
                      </span>
                      <span className="font-sans text-[11px] uppercase tracking-wider text-neutral-500 leading-normal">
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Research Insight */}
            <div className="border border-neutral-900/80 p-6 bg-neutral-950/20 rounded-[20px] space-y-3">
              <div className="flex items-center space-x-2 text-neutral-300">
                <Sparkles className="w-4 h-4 text-neutral-400" />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold">
                  Key Insight
                </span>
              </div>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed italic">
                "{project.researchInsight}"
              </p>
            </div>

          </div>

        </div>

        {/* BOTTOM ACTION: Back to Projects button */}
        <div className="pt-16 border-t border-neutral-900 flex justify-center">
          <button
            onClick={onBackToProjects || onBack}
            className="group flex items-center justify-center space-x-3 bg-white text-black hover:bg-neutral-200 transition-all px-8 py-5 text-xs font-sans font-black uppercase tracking-widest rounded-none shadow-md cursor-pointer"
          >
            <span>← Back to Projects</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
}
