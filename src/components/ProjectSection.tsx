import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "../data";
import { Project } from "../types";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

interface ProjectSectionProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectSection({ onSelectProject }: ProjectSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isMoreHovered, setIsMoreHovered] = useState(false);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".project-card-wrapper");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative bg-[#060605] text-white py-12 sm:py-16 md:py-20 z-30 overflow-hidden border-t border-neutral-950 flex flex-col justify-center min-h-[calc(100vh-80px)]"
    >
      {/* Premium dark grid line accents */}
      <div className="absolute inset-0 grid grid-cols-3 pointer-events-none opacity-[0.02]">
        <div className="border-r border-white h-full" />
        <div className="border-r border-white h-full" />
        <div className="h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 space-y-8 md:space-y-10">
        
        {/* Section Intro Block */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2.5 max-w-3xl">
            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block">
              01 / CURATED PROJECTS
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-snug text-white">
              Curated Research &amp; Design
            </h2>
            <p className="font-sans text-xs sm:text-sm tracking-normal text-neutral-400 max-w-xl leading-relaxed font-light">
              Research-led design projects exploring human behavior, digital experiences, healthcare, and cultural storytelling.
            </p>
          </div>

          {/* More Projects Link */}
          <div className="sm:pt-1 flex-shrink-0">
            <button
              onClick={() => {
                navigate("/more-projects");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onMouseEnter={() => setIsMoreHovered(true)}
              onMouseLeave={() => setIsMoreHovered(false)}
              aria-label="View more projects index page"
              className="group inline-flex items-center space-x-1.5 text-neutral-400 hover:text-white transition-colors text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-sm py-1 select-none"
              style={{
                fontWeight: isMoreHovered ? 700 : 500,
                transition: "font-weight 300ms ease, color 200ms ease",
              }}
            >
              <span>MORE PROJECTS</span>
              <span
                className="inline-flex items-center transform transition-transform duration-200"
                style={{
                  transform: isMoreHovered ? "translateX(4px)" : "translateX(0px)",
                }}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Project Grid Layout */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch"
        >
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className={`project-card-wrapper h-full ${
                index === 2 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <ProjectCard
                project={project}
                onSelect={onSelectProject}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
