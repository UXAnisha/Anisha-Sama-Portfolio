import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import ContactSection from "./ContactSection";

interface RowData {
  id: string;
  num: string;
  title: string;
  supportingDetail: string;
  personalSentence: string;
  bgDefault: string;
  bgHover: string;
  textColor: string;
  bgWord: string;
  linkText?: string;
  linkUrl?: string;
  cursorLabel?: string;
  rowType: "writer" | "museums" | "pizza" | "paddleboarding" | "hiking" | "listening";
}

const ROWS: RowData[] = [
  {
    id: "writer",
    num: "01",
    title: "WRITER",
    supportingDetail: "Bhavnagar Heritage Magazine",
    personalSentence: "Turning heritage research into stories people can connect with.",
    bgDefault: "#F3C969",
    bgHover: "#EBBF5C",
    textColor: "#242016",
    bgWord: "STORIES",
    linkText: "READ THE MAGAZINE ↗",
    linkUrl: "https://bhavnagarheritage.org",
    cursorLabel: "READ ↗",
    rowType: "writer",
  },
  {
    id: "museums",
    num: "02",
    title: "MUSEUMS",
    supportingDetail: "Former Volunteer Art Interpreter · Seattle Art Museum",
    personalSentence: "I can spend hours in a museum and still feel like I left too soon.",
    bgDefault: "#C9B8E8",
    bgHover: "#BEA9E2",
    textColor: "#211B2C",
    bgWord: "OBSERVE",
    rowType: "museums",
  },
  {
    id: "pizza",
    num: "03",
    title: "PIZZA",
    supportingDetail: "Anytime · Any day",
    personalSentence: "There is almost never a wrong time for pizza.",
    bgDefault: "#F37B5F",
    bgHover: "#EC6B4E",
    textColor: "#2A1712",
    bgWord: "ALWAYS",
    rowType: "pizza",
  },
  {
    id: "paddleboarding",
    num: "04",
    title: "PADDLEBOARDING",
    supportingDetail: "My favorite reset",
    personalSentence: "Quiet water, open space, and nowhere to rush.",
    bgDefault: "#8CCFD3",
    bgHover: "#79C3C7",
    textColor: "#132528",
    bgWord: "RESET",
    rowType: "paddleboarding",
  },
  {
    id: "hiking",
    num: "05",
    title: "HIKING",
    supportingDetail: "Away from the screen",
    personalSentence: "Long trails are where my mind becomes quiet again.",
    bgDefault: "#A9C68E",
    bgHover: "#98B77C",
    textColor: "#172313",
    bgWord: "EXPLORE",
    rowType: "hiking",
  },
  {
    id: "listening",
    num: "06",
    title: "ON REPEAT",
    supportingDetail: '"Better Days" — Martin Lou',
    personalSentence: "The current soundtrack to my everyday life.",
    bgDefault: "#292738",
    bgHover: "#201E2E",
    textColor: "#F7F3E8",
    bgWord: "LISTEN",
    linkText: "LISTEN ↗",
    linkUrl: "https://open.spotify.com/search/Martin%20Lou%20Better%20Days",
    cursorLabel: "LISTEN ↗",
    rowType: "listening",
  },
];

export default function AboutPage() {
  const navigate = useNavigate();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  // Floating cursor state for linked rows on desktop
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeCursorLabel, setActiveCursorLabel] = useState<string | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", motionHandler);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(hover: none)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      mediaQuery.removeEventListener("change", motionHandler);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent, cursorLabel?: string) => {
    if (prefersReducedMotion || isMobile) return;
    setCursorPos({ x: e.clientX, y: e.clientY });
    if (cursorLabel) {
      setActiveCursorLabel(cursorLabel);
    } else {
      setActiveCursorLabel(null);
    }
  };

  const handleMouseLeaveRow = () => {
    setHoveredRowId(null);
    setActiveCursorLabel(null);
  };

  const handleBackToProjects = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  // Render subject-specific motion vector details
  const renderSubjectMotion = (type: RowData["rowType"]) => {
    switch (type) {
      case "writer":
        return (
          <span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left pointer-events-none"
          />
        );

      case "museums":
        return (
          <div
            aria-hidden="true"
            className="absolute right-12 md:right-32 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block opacity-20"
          >
            <div className="relative w-28 h-20">
              <div className="absolute inset-0 border border-current rounded-xs transition-transform duration-500 ease-out group-hover:-translate-x-4" />
              <div className="absolute inset-2 border border-current rounded-xs transition-transform duration-500 ease-out group-hover:translate-x-4" />
            </div>
          </div>
        );

      case "pizza":
        return (
          <div
            aria-hidden="true"
            className="absolute right-12 md:right-32 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block opacity-25"
          >
            <svg
              className="w-16 h-16 transition-transform duration-500 ease-out group-hover:rotate-12"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="50" cy="50" r="44" strokeDasharray="6 5" />
            </svg>
          </div>
        );

      case "paddleboarding":
        return (
          <div
            aria-hidden="true"
            className="absolute right-12 md:right-32 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block opacity-30"
          >
            <svg
              className="w-24 h-8 transition-transform duration-500 ease-out group-hover:translate-x-3"
              viewBox="0 0 120 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M0 10 Q 15 2, 30 10 T 60 10 T 90 10 T 120 10" />
              <path d="M0 20 Q 15 12, 30 20 T 60 20 T 90 20 T 120 20" />
            </svg>
          </div>
        );

      case "hiking":
        return (
          <div
            aria-hidden="true"
            className="absolute right-12 md:right-32 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block opacity-25"
          >
            <svg
              className="w-32 h-16 transition-transform duration-500 ease-out group-hover:-translate-y-2"
              viewBox="0 0 160 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M10 70 C 40 40, 80 80, 150 50" />
              <path d="M10 50 C 50 20, 90 60, 150 30" />
              <path d="M10 30 C 60 10, 100 40, 150 10" />
            </svg>
          </div>
        );

      case "listening":
        return (
          <div
            aria-hidden="true"
            className="absolute right-12 md:right-32 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex items-end space-x-1.5 h-7 opacity-70"
          >
            <span className="w-1 bg-current rounded-full h-3 animate-[bounce_1.2s_infinite_100ms]" />
            <span className="w-1 bg-current rounded-full h-7 animate-[bounce_1.2s_infinite_300ms]" />
            <span className="w-1 bg-current rounded-full h-4 animate-[bounce_1.2s_infinite_200ms]" />
            <span className="w-1 bg-current rounded-full h-6 animate-[bounce_1.2s_infinite_400ms]" />
          </div>
        );

      default:
        return null;
    }
  };

  const headingPhrases = ["A few things ", "that make me, ", "me."];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#FAFAF7] text-[#111111] pt-28 md:pt-36 pb-20 relative z-10 font-sans selection:bg-[#111111] selection:text-white overflow-x-hidden"
    >
      {/* Floating Desktop Custom Cursor Label for Linked Rows */}
      {!prefersReducedMotion && !isMobile && activeCursorLabel && (
        <div
          aria-hidden="true"
          className="fixed pointer-events-none z-[100] px-3.5 py-1.5 rounded-full bg-[#111111] text-white font-sans text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        >
          {activeCursorLabel}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12 md:space-y-16">
        {/* Top Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb navigation">
          <button
            onClick={handleBackToProjects}
            className="group inline-flex items-center space-x-2 font-sans text-xs uppercase tracking-[0.2em] text-[#686868] hover:text-[#111111] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-sm py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>← BACK TO CURATED PROJECTS</span>
          </button>
        </nav>

        {/* SECTION INTRODUCTION */}
        <header className="space-y-3 max-w-3xl">
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#686868] font-bold block">
            BEYOND THE PORTFOLIO
          </span>

          <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-[#111111]">
            {headingPhrases.map((phrase, i) => (
              <span key={i} className="inline-block overflow-hidden align-top mr-[0.18em]">
                <motion.span
                  initial={prefersReducedMotion ? { y: 0 } : { y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.5,
                    delay: prefersReducedMotion ? 0 : i * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {phrase}
                </motion.span>
              </span>
            ))}
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-[#555550] leading-relaxed font-light pt-2">
            Stories I write, places I return to, and things I rarely say no to.
          </p>
        </header>

        {/* FULL-WIDTH STACKED EDITORIAL ROWS */}
        <section aria-label="A Personal Index - Beyond the Portfolio" className="pt-4">
          <div className="w-full flex flex-col divide-y-0 shadow-sm rounded-none overflow-hidden">
            {ROWS.map((row, index) => {
              const isHovered = hoveredRowId === row.id;
              const currentBg = isHovered && !prefersReducedMotion ? row.bgHover : row.bgDefault;

              return (
                <motion.div
                  key={row.id}
                  initial={
                    prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.45,
                    delay: prefersReducedMotion ? 0 : index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseEnter={() => {
                    setHoveredRowId(row.id);
                    if (row.cursorLabel) setActiveCursorLabel(row.cursorLabel);
                  }}
                  onMouseLeave={handleMouseLeaveRow}
                  onMouseMove={(e) => handleMouseMove(e, row.cursorLabel)}
                  style={{
                    backgroundColor: currentBg,
                    color: row.textColor,
                    transitionProperty: "background-color, padding, transform",
                    transitionDuration: "400ms",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  className="group relative w-full px-6 sm:px-10 md:px-14 py-8 md:py-10 border-b border-black/10 last:border-b-0 overflow-hidden cursor-default"
                >
                  {/* OVERSIZED BACKGROUND WORD */}
                  <span
                    aria-hidden="true"
                    className="font-serif font-bold text-[clamp(4.5rem,15vw,13rem)] leading-none uppercase tracking-wider opacity-[0.08] select-none pointer-events-none absolute right-4 md:right-16 top-1/2 -translate-y-1/2 transition-transform duration-500 ease-out md:group-hover:translate-x-6"
                  >
                    {row.bgWord}
                  </span>

                  {/* CUSTOM SUBJECT MOTION */}
                  {!prefersReducedMotion && renderSubjectMotion(row.rowType)}

                  {/* ROW MAIN CONTENT GRID */}
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 max-w-6xl mx-auto">
                    {/* LEFT & CENTER: INDEX + TITLE + PERSONAL SENTENCE */}
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-10 flex-1">
                      {/* Index Number */}
                      <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] opacity-60 shrink-0">
                        {row.num}
                      </span>

                      {/* Title & Personal Sentence Block */}
                      <div className="space-y-1.5 flex-1">
                        <div className="relative inline-block">
                          <h2 className="font-serif font-bold text-[clamp(2.4rem,5vw,5.5rem)] leading-none tracking-tight transition-transform duration-400 ease-out md:group-hover:translate-x-4">
                            {row.title}
                          </h2>

                          {/* Writer underline motion */}
                          {row.rowType === "writer" &&
                            !prefersReducedMotion &&
                            renderSubjectMotion("writer")}
                        </div>

                        {/* Personal Sentence: Always visible on mobile, revealed on hover on desktop */}
                        <p
                          className={`font-sans text-sm sm:text-base md:text-lg font-normal leading-relaxed opacity-90 transition-all duration-300 ease-out ${
                            isMobile || prefersReducedMotion
                              ? "block pt-2 opacity-100"
                              : "max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:pt-2 overflow-hidden"
                          }`}
                        >
                          {row.personalSentence}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: SUPPORTING DETAIL + LINK */}
                    <div className="flex flex-col md:items-end text-left md:text-right space-y-2 shrink-0 transition-transform duration-400 ease-out md:group-hover:-translate-y-1">
                      <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.16em] font-medium opacity-80 max-w-xs leading-snug">
                        {row.supportingDetail}
                      </span>

                      {/* Destination Link if present */}
                      {row.linkUrl && row.linkText && (
                        <a
                          href={row.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center space-x-1.5 font-sans font-bold text-xs uppercase tracking-[0.18em] underline underline-offset-4 decoration-1 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current rounded-xs pt-1 cursor-pointer"
                        >
                          <span>{row.linkText}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Navigation Call-to-action */}
        <section className="pt-10 border-t border-[#E8E8E2] flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={handleBackToProjects}
            className="group inline-flex items-center space-x-2 font-sans text-xs uppercase tracking-[0.2em] text-[#686868] hover:text-[#111111] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-sm py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>← VIEW CURATED PROJECTS</span>
          </button>

          <button
            onClick={() => {
              navigate("/#connect");
              setTimeout(() => {
                const el = document.getElementById("connect");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 150);
            }}
            className="group inline-flex items-center space-x-2 font-sans text-xs uppercase tracking-[0.2em] text-[#686868] hover:text-[#111111] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-sm py-1"
          >
            <span>REACH OUT &rarr;</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </section>

        {/* Contact Section Component */}
        <div className="pt-8">
          <ContactSection />
        </div>
      </div>
    </motion.div>
  );
}
