import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

interface DarkPatternsCaseStudyProps {
  onBackToProjects?: () => void;
  onBack?: () => void;
}

export default function DarkPatternsCaseStudy({
  onBackToProjects,
  onBack,
}: DarkPatternsCaseStudyProps) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBackToProjects = () => {
    if (onBackToProjects) {
      onBackToProjects();
    } else if (onBack) {
      onBack();
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  const handlePreviousProject = () => {
    navigate("/projects/pineapple-health");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextProject = () => {
    navigate("/work/bhavnagar-heritage");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mailtoUrl =
    "mailto:anishasama8687@gmail.com?subject=Dark%20Patterns%20in%20Generative%20AI%20%E2%80%94%20Study%20Inquiry";

  const researchAreas = [
    {
      num: "01",
      title: "USER AUTONOMY",
      desc: "How interface and conversational choices may affect a person’s ability to make informed and independent decisions.",
    },
    {
      num: "02",
      title: "TRUST",
      desc: "How system language, presentation, and behavior may shape perceptions of reliability and credibility.",
    },
    {
      num: "03",
      title: "TRANSPARENCY",
      desc: "How clearly an AI experience communicates its behavior, limitations, and influence.",
    },
    {
      num: "04",
      title: "USER CONTROL",
      desc: "How effectively people can question, redirect, refuse, or recover from an AI-generated interaction.",
    },
  ];

  const metadataItems = [
    { label: "PROJECT TYPE", value: "Responsible AI Research" },
    { label: "FOCUS", value: "Human–AI Interaction" },
    { label: "ROLE", value: "UX Researcher" },
    {
      label: "METHODS",
      value: "UX Auditing · Literature Review · Qualitative Analysis",
    },
    { label: "STATUS", value: "Restricted Research Access" },
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#FAFAF7] text-[#111111] pt-28 md:pt-32 pb-32 px-5 sm:px-8 md:px-12 relative z-30 font-sans selection:bg-[#111111] selection:text-[#FAFAF7] overflow-x-hidden"
    >
      <div className="max-w-[1100px] mx-auto space-y-16 sm:space-y-20">
        {/* TOP NAVIGATION */}
        <nav aria-label="Breadcrumb navigation">
          <button
            onClick={handleBackToProjects}
            className="group inline-flex items-center space-x-2 font-sans text-xs uppercase tracking-[0.2em] text-[#686868] hover:text-[#111111] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-sm py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>← BACK TO CURATED PROJECTS</span>
          </button>
        </nav>

        {/* HERO SECTION */}
        <header className="space-y-6 max-w-4xl">
          <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-[#686868] font-bold block">
            RESPONSIBLE AI RESEARCH · HUMAN–AI INTERACTION
          </span>

          <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] text-[#111111]">
            Dark Patterns in Generative AI
          </h1>

          <p className="font-serif font-normal text-xl sm:text-2xl text-[#111111] leading-relaxed max-w-3xl">
            Examining how generative AI experiences may influence user trust,
            choices, and autonomy.
          </p>
        </header>

        {/* INTRODUCTION */}
        <section className="space-y-6 font-sans text-base sm:text-lg text-[#686868] leading-relaxed max-w-3xl font-normal">
          <p>
            Dark Patterns in Generative AI examines how interface and
            conversational patterns in generative AI systems may influence
            user choices, trust, and autonomy. The study explores moments where
            persuasive language, unclear system behavior, or limited user
            control can shape how people interact with AI-generated responses.
          </p>
          <p>
            The research brings together UX auditing, literature review, and
            qualitative analysis to identify recurring concerns and consider
            opportunities for more transparent, responsible, and
            autonomy-supportive AI experiences.
          </p>
        </section>

        {/* PROJECT METADATA */}
        <section
          aria-label="Project Metadata"
          className="border-y border-[#D9D9D4] py-8 sm:py-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {metadataItems.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#686868] font-bold block">
                  {item.label}
                </span>
                <p className="font-sans text-xs sm:text-sm text-[#111111] font-medium leading-relaxed">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* RESEARCH FOCUS SECTION */}
        <section className="space-y-10 pt-4">
          <div className="space-y-3 max-w-3xl">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#686868] font-bold block">
              01 / RESEARCH FOCUS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-snug">
              Understanding influence within AI-mediated interactions.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {researchAreas.map((area) => (
              <div
                key={area.num}
                className="p-6 sm:p-8 bg-[#F1F1EC] border border-[#D9D9D4] space-y-3.5"
              >
                <span className="font-mono text-xs text-[#686868] font-bold block">
                  {area.num}
                </span>
                <h3 className="font-sans text-xs uppercase tracking-[0.18em] text-[#111111] font-bold">
                  {area.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT THE STUDY SECTION (FULL-WIDTH DARK SECTION) */}
        <section
          aria-label="About the Study"
          className="w-full bg-[#111111] text-[#F7F7F2] p-8 sm:p-12 md:p-16 my-16 space-y-8 border border-neutral-900"
        >
          <div className="space-y-3 max-w-3xl">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#858585] font-bold block">
              02 / ABOUT THE STUDY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#F7F7F2] leading-snug">
              Examining patterns of influence in generative AI experiences.
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl">
            <p className="font-sans text-sm sm:text-base text-[#D9D9D4] leading-relaxed font-normal">
              This study draws on a review of existing research on dark
              patterns, deceptive design, and responsible AI. The work examines
              interface and conversational patterns across generative AI
              experiences to understand how design choices may influence user
              trust, autonomy, transparency, and control.
            </p>
            <p className="font-sans text-sm sm:text-base text-[#D9D9D4] leading-relaxed font-normal">
              The research includes UX auditing, literature review, qualitative
              analysis, and the development of a structured approach for
              documenting recurring interaction concerns. These observations
              are being translated into practical design considerations for
              more transparent and autonomy-supportive AI experiences.
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#858585] leading-relaxed font-normal pt-2">
              To learn more about this study, email the author.
            </p>
          </div>

          <div className="pt-2">
            <a
              href={mailtoUrl}
              className="inline-flex items-center space-x-2.5 border border-[#F7F7F2] text-[#F7F7F2] hover:bg-[#F7F7F2] hover:text-[#111111] transition-all duration-200 px-6 py-3.5 font-sans text-xs uppercase tracking-[0.18em] font-medium rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F7F2]"
            >
              <span>EMAIL AUTHOR ↗</span>
            </a>
          </div>
        </section>

        {/* END NAVIGATION */}
        <footer className="border-t border-[#D9D9D4] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={handlePreviousProject}
            className="group inline-flex items-center space-x-2 font-sans text-xs uppercase tracking-[0.2em] text-[#686868] hover:text-[#111111] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-sm py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>← PREVIOUS PROJECT</span>
          </button>

          <button
            onClick={handleBackToProjects}
            className="font-sans text-xs uppercase tracking-[0.2em] text-[#111111] font-bold hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-sm py-1"
          >
            BACK TO CURATED PROJECTS
          </button>

          <button
            onClick={handleNextProject}
            className="group inline-flex items-center space-x-2 font-sans text-xs uppercase tracking-[0.2em] text-[#686868] hover:text-[#111111] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-sm py-1"
          >
            <span>NEXT PROJECT →</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </footer>
      </div>
    </motion.article>
  );
}
