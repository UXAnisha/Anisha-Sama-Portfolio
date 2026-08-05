import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

interface ProjectRowData {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  path: string;
  accentColor: string;
  imageBg: string;
  renderVisual: React.ReactNode;
}

export default function MoreProjectsPage() {
  const navigate = useNavigate();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBackToHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRowClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const projects: ProjectRowData[] = [
    {
      id: "cookmate",
      number: "01",
      title: "Cookmate",
      category: "UX Research · Product Design · Mobile App",
      description:
        "A social cooking experience designed to help friends and family cook, connect, and share moments together from different locations.",
      path: "/projects/cookmate",
      accentColor: "#D96B43", // Warm terracotta
      imageBg: "bg-[#1A1210]",
      renderVisual: (
        <div className="w-full h-full min-h-[220px] sm:min-h-[260px] md:min-h-[300px] flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-[#241814] to-[#120B09]">
          {/* Authentic Cookmate Mobile Mockup Banner */}
          <div className="w-full max-w-sm bg-[#1C1615] rounded-2xl border border-[#D96B43]/30 shadow-2xl p-4 flex flex-col space-y-3 transform transition-transform duration-500 ease-out group-hover:scale-[1.03]">
            <div className="flex items-center justify-between border-b border-[#D96B43]/20 pb-2">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-[#D96B43] flex items-center justify-center font-bold text-white text-xs">
                  C
                </div>
                <div>
                  <h5 className="font-sans text-xs font-bold text-white">Cookmate Session</h5>
                  <p className="font-sans text-[10px] text-[#D96B43] font-medium">Live with Jenny & James</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#D96B43]/20 text-[#D96B43] font-mono text-[9px] uppercase font-bold tracking-wider">
                Virtual Kitchen
              </span>
            </div>
            {/* Visual Recipe Preview */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#2A201D] p-2.5 rounded-lg border border-neutral-800 space-y-1">
                <span className="text-[10px] text-neutral-400 font-sans block">Today's Recipe</span>
                <p className="text-xs font-bold text-white font-serif">Fresh Tomato Basil Pasta</p>
                <div className="text-[9px] text-[#D96B43] font-mono">Step 3 of 6 • 25 min</div>
              </div>
              <div className="bg-[#2A201D] p-2.5 rounded-lg border border-neutral-800 space-y-1 flex flex-col justify-between">
                <span className="text-[10px] text-neutral-400 font-sans block">Audio Call</span>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-white font-medium">3 Connected</span>
                </div>
                <div className="text-[9px] text-neutral-500 font-mono">Hands-free active</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "pineapple-health",
      number: "02",
      title: "Pineapple Health",
      category: "Academic Team Project · Healthcare UX · HCI 440",
      description:
        "Simplifying appointment booking, insurance decisions, and cost visibility within one connected healthcare experience.",
      path: "/projects/pineapple-health",
      accentColor: "#388E9C", // Healthcare teal
      imageBg: "bg-[#0F1B1F]",
      renderVisual: (
        <div className="w-full h-full min-h-[220px] sm:min-h-[260px] md:min-h-[300px] flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-[#122329] to-[#0A1317]">
          {/* Authentic Pineapple Health Mobile Mockup Banner */}
          <div className="w-full max-w-sm bg-[#132228] rounded-2xl border border-[#388E9C]/30 shadow-2xl p-4 flex flex-col space-y-3 transform transition-transform duration-500 ease-out group-hover:scale-[1.03]">
            <div className="flex items-center justify-between border-b border-[#388E9C]/20 pb-2">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-[#388E9C] flex items-center justify-center font-bold text-white text-xs">
                  P
                </div>
                <div>
                  <h5 className="font-sans text-xs font-bold text-white">Pineapple Health</h5>
                  <p className="font-sans text-[10px] text-[#388E9C] font-medium font-mono">Healthcare &amp; Scheduling</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#388E9C]/20 text-[#388E9C] font-mono text-[9px] uppercase font-bold tracking-wider">
                In-Network
              </span>
            </div>
            {/* Appointment & Cost Estimates Visual */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#1A2D35] p-2.5 rounded-lg border border-neutral-800 space-y-1">
                <span className="text-[10px] text-neutral-400 font-sans block">Primary Care Booking</span>
                <p className="text-xs font-bold text-white font-serif">Dr. Sarah Lin, MD</p>
                <div className="text-[9px] text-[#388E9C] font-mono">Thu, Aug 14 • $20 Copay</div>
              </div>
              <div className="bg-[#1A2D35] p-2.5 rounded-lg border border-neutral-800 space-y-1 flex flex-col justify-between">
                <span className="text-[10px] text-neutral-400 font-sans block">Insurance Verification</span>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-white font-medium">Verified In-Network</span>
                </div>
                <div className="text-[9px] text-neutral-400 font-mono">100% Coverage</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "visual-narratives",
      number: "03",
      title: "Visual Narratives",
      category: "Visual Communication · Cultural Storytelling · Editorial Design",
      description:
        "A collection of posters, publications, heritage tags, and catalogues created to support cultural and environmental awareness.",
      path: "/projects/visual-narratives",
      accentColor: "#E5A93C", // Heritage yellow
      imageBg: "bg-[#1A1810]",
      renderVisual: (
        <div className="w-full h-full min-h-[220px] sm:min-h-[260px] md:min-h-[300px] flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-[#242013] to-[#121008]">
          {/* Authentic Visual Narratives Editorial Banner */}
          <div className="w-full max-w-sm bg-[#1E1B13] rounded-xl border border-[#E5A93C]/30 shadow-2xl p-4 flex flex-col space-y-3 transform transition-transform duration-500 ease-out group-hover:scale-[1.03]">
            <div className="flex items-center justify-between border-b border-[#E5A93C]/20 pb-2">
              <span className="font-serif text-xs font-bold text-[#E5A93C] tracking-wide">
                INTACH Bhavnagar Chapter
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#E5A93C]/20 text-[#E5A93C] font-mono text-[9px] uppercase font-bold tracking-wider">
                Archive Collection
              </span>
            </div>
            {/* Grid of Publication Spreads / Posters */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#2A251B] p-2.5 rounded border border-neutral-800 space-y-1">
                <div className="w-full h-2 bg-[#E5A93C]/40 rounded-sm mb-1" />
                <p className="text-[10px] font-serif font-bold text-white">Heritage Poster Series</p>
                <p className="text-[9px] text-[#E5A93C] font-mono">75+ Public Works</p>
              </div>
              <div className="bg-[#2A251B] p-2.5 rounded border border-neutral-800 space-y-1">
                <div className="w-full h-2 bg-[#E5A93C]/40 rounded-sm mb-1" />
                <p className="text-[10px] font-serif font-bold text-white">Biodiversity Journal</p>
                <p className="text-[9px] text-[#E5A93C] font-mono">Monthly Editions</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#060605] text-white pt-28 sm:pt-32 pb-32 px-6 md:px-12 relative z-30 font-sans"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        
        {/* PAGE HEADER */}
        <header className="space-y-6 border-b border-neutral-900 pb-12">
          {/* Back link */}
          <button
            onClick={handleBackToHome}
            aria-label="Back to home page"
            className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>← BACK TO HOME</span>
          </button>

          <div className="space-y-3 max-w-4xl">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-neutral-500 font-bold block">
              02 / MORE PROJECTS
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Selected explorations in product design and visual storytelling.
            </h1>
            <p className="font-sans text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-2xl pt-1">
              A collection of earlier projects exploring mobile experiences, interface design, cultural communication, and visual storytelling.
            </p>
          </div>
        </header>

        {/* FULL-WIDTH EDITORIAL PROJECT ROWS */}
        <section className="space-y-12 sm:space-y-16">
          {projects.map((proj) => {
            const isHovered = hoveredProject === proj.id;

            return (
              <div
                key={proj.id}
                onClick={() => handleRowClick(proj.path)}
                onMouseEnter={() => setHoveredProject(proj.id)}
                onMouseLeave={() => setHoveredProject(null)}
                tabIndex={0}
                role="button"
                aria-label={`View ${proj.title} project (${proj.category})`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleRowClick(proj.path);
                  }
                }}
                className="group relative border border-neutral-900 rounded-xl bg-[#0C0C0B] hover:border-neutral-800 transition-colors duration-350 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {/* Subtle project accent bar along top edge on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-350"
                  style={{
                    backgroundColor: isHovered ? proj.accentColor : "transparent",
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8 md:p-10 items-center">
                  
                  {/* Left Column: Project Info & Description */}
                  <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                    
                    {/* Number & Category */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-neutral-500 font-bold tracking-wider">
                        {proj.number}
                      </span>
                      <span className="text-neutral-700">•</span>
                      <span
                        className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300"
                        style={{
                          color: isHovered ? proj.accentColor : "#A3A3A3",
                        }}
                      >
                        {proj.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white transition-transform duration-350 ease-out"
                      style={{
                        transform: isHovered ? "translateX(10px)" : "translateX(0px)",
                      }}
                    >
                      {proj.title}
                    </h2>

                    {/* Description */}
                    <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-xl">
                      {proj.description}
                    </p>

                    {/* Action Link */}
                    <div className="pt-2">
                      <span
                        className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300"
                        style={{
                          color: isHovered ? proj.accentColor : "#E5E5E5",
                        }}
                      >
                        <span>VIEW PROJECT</span>
                        <span
                          className="inline-flex items-center transform transition-transform duration-300 ease-out"
                          style={{
                            transform: isHovered ? "translateX(4px)" : "translateX(0px)",
                          }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Authentic Image / Visual Box */}
                  <div className="lg:col-span-5 w-full">
                    <div className="relative w-full rounded-lg overflow-hidden border border-neutral-800/80">
                      <div className="transition-transform duration-500 ease-out group-hover:scale-105">
                        {proj.renderVisual}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </section>

      </div>
    </motion.div>
  );
}
