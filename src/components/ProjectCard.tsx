import { useState, useRef, useEffect, MouseEvent, KeyboardEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [arrowOffset, setArrowOffset] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches || window.innerWidth < 768;
      setIsTouchDevice(isTouch);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;

    // Spotlight calculation
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightPos({ x, y });

    // Magnetic arrow calculation
    if (!arrowRef.current) return;
    const arrowRect = arrowRef.current.getBoundingClientRect();
    const arrowCenterX = arrowRect.left + arrowRect.width / 2;
    const arrowCenterY = arrowRect.top + arrowRect.height / 2;

    const dx = e.clientX - arrowCenterX;
    const dy = e.clientY - arrowCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 80) {
      const pullStrength = (80 - distance) / 80;
      setArrowOffset({
        x: dx * pullStrength * 0.25,
        y: dy * pullStrength * 0.25,
      });
    } else {
      setArrowOffset({ x: 0, y: 0 });
    }
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsHovered(false);
      setArrowOffset({ x: 0, y: 0 });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(project);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`View case study for ${project.title}`}
      onClick={() => onSelect(project)}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.99 }}
      className={`relative flex flex-col justify-between h-full bg-[#090908] border border-neutral-900 rounded-[16px] md:rounded-[20px] overflow-hidden p-5 md:p-6 cursor-pointer select-none group transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:border-neutral-500 ${
        !isTouchDevice
          ? "hover:border-neutral-700 hover:shadow-[0_12px_32px_rgba(0,0,0,0.7)]"
          : "active:border-neutral-700"
      }`}
    >
      {/* Card Content Block */}
      <div className="space-y-3.5 md:space-y-4">
        {/* Tags at top */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="font-sans text-[8.5px] uppercase tracking-[0.18em] text-neutral-400 font-bold bg-neutral-950 border border-neutral-900 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Project Title */}
        <h3 className="font-serif font-bold text-xl md:text-2xl tracking-tight text-white leading-tight group-hover:text-neutral-100 transition-colors">
          {project.title}
        </h3>

        {/* Short One-Line Summary */}
        <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light line-clamp-3">
          {project.subtitle}
        </p>
      </div>

      {/* Footer / Call To Action */}
      <div className="flex justify-between items-center pt-4 mt-5 md:mt-6 border-t border-neutral-900/60">
        <span className="font-sans text-[9.5px] uppercase tracking-[0.22em] text-neutral-400 group-hover:text-white transition-colors font-bold inline-flex items-center space-x-1.5">
          <span>View Case Study</span>
          <span className={`transition-all text-neutral-400 group-hover:text-white ${!isTouchDevice ? "opacity-0 group-hover:opacity-100 group-hover:translate-x-1" : "opacity-100 ml-1"}`}>
            &rarr;
          </span>
        </span>

        {/* Soft Arrow Button */}
        <div ref={arrowRef} className="p-1 -mr-1">
          <motion.div
            animate={{ x: isTouchDevice ? 0 : arrowOffset.x, y: isTouchDevice ? 0 : arrowOffset.y }}
            transition={{ type: "spring", stiffness: 220, damping: 15 }}
            className={`w-8 h-8 md:w-9 md:h-9 border border-neutral-800 rounded-[10px] md:rounded-[12px] flex items-center justify-center bg-neutral-950 transition-all shadow-inner ${
              !isTouchDevice ? "group-hover:border-neutral-500 group-hover:bg-neutral-900 group-hover:translate-x-[3.5px] group-hover:-translate-y-[3.5px]" : ""
            }`}
          >
            <ArrowUpRight className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 ${!isTouchDevice ? "group-hover:text-white group-hover:rotate-45" : ""}`} />
          </motion.div>
        </div>
      </div>

      {/* Subtle Spotlight Hover Effect (Desktop Only) */}
      {!isTouchDevice && (
        <motion.div
          className="absolute inset-0 pointer-events-none hidden md:block"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle 180px at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255,255,255,0.04), transparent)`
          }}
        />
      )}
    </motion.div>
  );
}
