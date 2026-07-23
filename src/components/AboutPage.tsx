import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ContactSection from "./ContactSection";

interface ExperienceData {
  id: string;
  num: string;
  keyword: string;
  role: string;
  organization: string;
  dates: string;
  employmentType?: string;
  location?: string;
  description: string;
  accentColor: string;
}

const EXPERIENCES: ExperienceData[] = [
  {
    id: "raise-lab",
    num: "01",
    keyword: "RESEARCH",
    role: "Graduate Research Assistant",
    organization:
      "RAISE Lab (Responsible AI Systems and Societal Experiences) · DePaul University",
    dates: "Dec 2025 – Present",
    description:
      "Contributing to responsible AI research examining how generative AI interfaces can influence user trust, autonomy, and decision-making.",
    accentColor: "#C9B8E8",
  },
  {
    id: "content",
    num: "02",
    keyword: "CONTENT",
    role: "Content Strategist and Writer",
    organization: "Bhavnagar Heritage",
    dates: "Feb 2022 – 2025",
    description:
      "Developed cultural and heritage content by transforming research into accessible stories, publications, and digital narratives.",
    accentColor: "#F3C969",
  },
  {
    id: "intach",
    num: "03",
    keyword: "COMMUNICATION",
    role: "Visual Communication Designer",
    organization: "Indian National Trust for Art and Cultural Heritage (INTACH)",
    dates: "2022 – 2025",
    description:
      "Created visual communication materials for cultural and architectural heritage initiatives, including publications, exhibitions, awareness campaigns, and public-facing content.",
    accentColor: "#F37B5F",
  },
  {
    id: "energy",
    num: "04",
    keyword: "ENERGY",
    role: "Solar Thermal Energy",
    organization: "CSIR-CSMCRI (Central Salt and Marine Chemical Research Institute)",
    dates: "2024",
    employmentType: "Internship",
    location: "Bhavnagar, Gujarat, India · On-site",
    description:
      "Supported work related to solar thermal energy within a scientific research environment.",
    accentColor: "#8CCFD3",
  },
  {
    id: "ux-design",
    num: "05",
    keyword: "UX DESIGN",
    role: "User Experience Designer",
    organization: "The Seven IT Solutions (EINSCO)",
    dates: "Feb 2021 – Jan 2022",
    employmentType: "Full-time",
    description:
      "Worked on user experience design for digital products by supporting interface design, user flows, and the organization of product information.",
    accentColor: "#A9C68E",
  },
];

interface HobbyRowData {
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

const HOBBY_ROWS: HobbyRowData[] = [
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

  const renderSubjectMotion = (type: HobbyRowData["rowType"]) => {
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

  const renderExperienceSVG = (id: string, accentColor: string) => {
    if (prefersReducedMotion) return null;

    if (id === "raise-lab") {
      return (
        <div
          aria-hidden="true"
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        >
          <svg className="w-28 h-20" viewBox="0 0 120 90" fill="none">
            <path
              d="M 10 45 L 45 25 L 85 25"
              stroke={accentColor}
              strokeWidth="1.5"
              className="transition-all duration-500"
            />
            <path
              d="M 45 25 L 85 65"
              stroke={accentColor}
              strokeWidth="1.2"
              className="transition-all duration-500 ease-out group-hover:translate-x-1"
            />
            <path
              d="M 10 45 L 45 65 L 100 65"
              stroke={accentColor}
              strokeWidth="1.2"
              className="transition-all duration-500 ease-out group-hover:-translate-x-1"
            />
            <circle cx="10" cy="45" r="3.5" fill={accentColor} className="transition-transform duration-400 group-hover:-translate-x-1" />
            <circle cx="45" cy="25" r="3" fill={accentColor} className="transition-transform duration-400 group-hover:-translate-y-1" />
            <circle cx="85" cy="25" r="3" fill={accentColor} className="transition-transform duration-400 group-hover:translate-x-2" />
            <circle cx="45" cy="65" r="3" fill={accentColor} className="transition-transform duration-400 group-hover:translate-y-1" />
            <circle cx="100" cy="65" r="3.5" fill={accentColor} className="transition-transform duration-400 group-hover:translate-x-2" />
          </svg>
        </div>
      );
    }

    if (id === "content") {
      return (
        <div
          aria-hidden="true"
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        >
          <svg className="w-28 h-20" viewBox="0 0 120 80" fill="none">
            <line x1="10" y1="20" x2="100" y2="20" stroke={accentColor} strokeWidth="1.5" className="transition-transform duration-500 group-hover:translate-x-2" />
            <line x1="10" y1="36" x2="80" y2="36" stroke={accentColor} strokeWidth="1.2" strokeDasharray="3 3" className="transition-transform duration-500 group-hover:translate-x-3" />
            <line x1="10" y1="52" x2="95" y2="52" stroke={accentColor} strokeWidth="1.2" className="transition-transform duration-500 group-hover:translate-x-1" />
          </svg>
        </div>
      );
    }

    if (id === "intach") {
      return (
        <div
          aria-hidden="true"
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        >
          <svg className="w-28 h-20" viewBox="0 0 120 80" fill="none">
            <rect x="15" y="15" width="50" height="50" stroke={accentColor} strokeWidth="1.2" className="transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-1" />
            <rect x="40" y="25" width="55" height="40" stroke={accentColor} strokeWidth="1.2" strokeDasharray="4 3" className="transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-1" />
          </svg>
        </div>
      );
    }

    if (id === "energy") {
      return (
        <div
          aria-hidden="true"
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        >
          <svg className="w-28 h-20" viewBox="0 0 120 80" fill="none">
            <path d="M 20 60 A 40 40 0 0 1 100 60" stroke={accentColor} strokeWidth="1.5" className="transition-transform duration-500 group-hover:-translate-y-1" />
            <line x1="60" y1="10" x2="60" y2="25" stroke={accentColor} strokeWidth="1.2" className="transition-transform duration-400 group-hover:-translate-y-1" />
            <line x1="30" y1="25" x2="40" y2="33" stroke={accentColor} strokeWidth="1.2" className="transition-transform duration-400 group-hover:-translate-x-1" />
            <line x1="90" y1="25" x2="80" y2="33" stroke={accentColor} strokeWidth="1.2" className="transition-transform duration-400 group-hover:translate-x-1" />
          </svg>
        </div>
      );
    }

    if (id === "ux-design") {
      return (
        <div
          aria-hidden="true"
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        >
          <svg className="w-28 h-20" viewBox="0 0 120 80" fill="none">
            <rect x="10" y="15" width="35" height="25" rx="3" stroke={accentColor} strokeWidth="1.2" className="transition-transform duration-400 group-hover:-translate-x-1" />
            <rect x="65" y="15" width="45" height="25" rx="3" stroke={accentColor} strokeWidth="1.2" className="transition-transform duration-400 group-hover:translate-x-1" />
            <path d="M 45 28 L 65 28" stroke={accentColor} strokeWidth="1.2" strokeDasharray="2 2" className="transition-all duration-300" />
            <rect x="25" y="50" width="70" height="18" rx="3" stroke={accentColor} strokeWidth="1.2" className="transition-transform duration-400 group-hover:translate-y-1" />
          </svg>
        </div>
      );
    }

    return null;
  };

  const headingPhrases = ["A few things ", "that make me, ", "me."];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#FAFAF7] text-[#111111] pt-28 md:pt-36 pb-20 relative z-10 font-sans selection:bg-[#111111] selection:text-[#FAFAF7] overflow-x-hidden"
    >
      {/* Floating Desktop Custom Cursor Label for Linked Rows */}
      {!prefersReducedMotion && !isMobile && activeCursorLabel && (
        <div
          aria-hidden="true"
          className="fixed pointer-events-none z-[100] px-3.5 py-1.5 rounded-full bg-[#111111] text-[#FAFAF7] font-sans text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
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

        {/* 1. ME. HERO SECTION */}
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

          <p className="font-sans text-sm sm:text-base md:text-lg text-[#555555] leading-relaxed font-light pt-2">
            Stories I write, places I return to, and things I rarely say no to.
          </p>
        </header>

        {/* 2. EXPERIENCE SECTION */}
        <section aria-label="Experience Index" className="pt-4 space-y-6">
          <div className="space-y-2 max-w-3xl border-b border-[#D9D9D4] pb-5">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#686868] font-bold block">
              EXPERIENCE
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#111111]">
              Where I’ve contributed.
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base text-[#686868] leading-relaxed font-light">
              Research, design, and cultural storytelling across academic and community-focused work.
            </p>
          </div>

          {/* FIVE EDITORIAL EXPERIENCE ROWS */}
          <div className="w-full border-t border-b border-[#D9D9D4] divide-y divide-[#D9D9D4]">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative w-full py-6 md:py-7 transition-all duration-350 cursor-default overflow-hidden"
              >
                {/* Thin animated colored accent line on hover */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-[2px] w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left pointer-events-none z-10"
                  style={{ backgroundColor: exp.accentColor }}
                />

                {/* SVG Subject Motion in background */}
                {renderExperienceSVG(exp.id, exp.accentColor)}

                {/* DESKTOP LAYOUT (md and above) */}
                <div className="hidden md:grid md:grid-cols-12 md:gap-6 md:items-start relative z-10">
                  {/* Column 1: Keyword */}
                  <div className="md:col-span-2 pt-1">
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#686868] font-bold block">
                      {exp.keyword}
                    </span>
                  </div>

                  {/* Column 2: Number */}
                  <div className="md:col-span-1 pt-0.5">
                    <span className="font-serif text-base font-bold text-[#888888] group-hover:translate-x-1 group-hover:text-[#111111] transition-all duration-350 block">
                      {exp.num}
                    </span>
                  </div>

                  {/* Column 3: Role title, Organization & Dates / Metadata */}
                  <div className="md:col-span-4 space-y-1.5">
                    <h3 className="font-serif text-[clamp(1.2rem,1.8vw,1.8rem)] font-semibold text-[#111111] tracking-tight leading-snug group-hover:translate-x-2 transition-transform duration-350 ease-out">
                      {exp.role}
                    </h3>
                    <p className="font-sans text-[0.88rem] text-[#555555] font-normal leading-snug">
                      {exp.organization}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-2 text-[0.78rem] text-[#777777] font-mono pt-0.5">
                      <span>{exp.dates}</span>
                      {exp.employmentType && (
                        <>
                          <span>·</span>
                          <span>{exp.employmentType}</span>
                        </>
                      )}
                      {exp.location && (
                        <>
                          <span>·</span>
                          <span>{exp.location}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Column 4: Description */}
                  <div className="md:col-span-5 pt-0.5">
                    <p className="font-sans text-[0.92rem] text-[#333333] font-light leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* TABLET & MOBILE LAYOUT (< md) */}
                <div className="md:hidden flex flex-col space-y-2.5 relative z-10">
                  <div className="flex items-center justify-between font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#686868]">
                    <span className="font-bold text-[#111111]">{exp.keyword}</span>
                    <span className="text-[#888888] font-serif font-bold">{exp.num}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-semibold text-[#111111] leading-snug">
                      {exp.role}
                    </h3>
                    <p className="font-sans text-xs text-[#555555] font-normal">
                      {exp.organization}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-1.5 text-[0.75rem] text-[#777777] font-mono pt-0.5">
                      <span>{exp.dates}</span>
                      {exp.employmentType && <span>· {exp.employmentType}</span>}
                      {exp.location && <span>· {exp.location}</span>}
                    </div>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#333333] font-light leading-relaxed pt-1">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. BEYOND WORK / PERSONAL INDEX TRANSITION */}
        <section aria-label="Beyond Work Intro" className="pt-12">
          {/* Subtle accent line transition */}
          <div className="w-12 h-[2px] bg-[#D9D9D4] mb-8" />

          <div className="space-y-2 max-w-3xl border-b border-[#D9D9D4] pb-6">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#686868] font-bold block">
              BEYOND WORK
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#111111]">
              The personal index.
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base text-[#686868] leading-relaxed font-light">
              What keeps me curious, grounded, and away from the screen.
            </p>
          </div>
        </section>

        {/* 4. SIX EXISTING HOBBY INDEX ROWS */}
        <section aria-label="A Personal Index - Beyond the Portfolio" className="pt-2">
          <div className="w-full flex flex-col divide-y-0 shadow-sm rounded-none overflow-hidden">
            {HOBBY_ROWS.map((row, index) => {
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
                          <h3 className="font-serif font-bold text-[clamp(2.4rem,5vw,5.5rem)] leading-none tracking-tight transition-transform duration-400 ease-out md:group-hover:translate-x-4">
                            {row.title}
                          </h3>

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

        {/* 5. NAVIGATION CALL TO ACTION */}
        <section className="pt-10 border-t border-[#D9D9D4] flex flex-col sm:flex-row items-center justify-between gap-6">
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

        {/* 6. CONTACT SECTION FOOTER */}
        <div className="pt-8">
          <ContactSection />
        </div>
      </div>
    </motion.div>
  );
}
