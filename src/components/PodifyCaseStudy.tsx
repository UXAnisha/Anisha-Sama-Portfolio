import React, { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

interface PodifyCaseStudyProps {
  onBackToProjects?: () => void;
  onBack?: () => void;
}

export default function PodifyCaseStudy({ onBackToProjects, onBack }: PodifyCaseStudyProps) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBackToMoreProjects = () => {
    navigate("/more-projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousProject = () => {
    navigate("/projects/cookmate");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextProject = () => {
    navigate("/projects/visual-narratives");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#FAFAF7] text-[#111111] pt-28 sm:pt-32 pb-32 px-5 sm:px-8 md:px-12 relative z-30 font-sans selection:bg-[#583A89] selection:text-white"
    >
      <div className="max-w-[1100px] mx-auto space-y-16 sm:space-y-24">
        
        {/* HEADER NAVIGATION */}
        <div className="border-b border-[#D9D9D4] pb-6">
          <button
            onClick={handleBackToMoreProjects}
            aria-label="Back to More Projects index"
            className="group inline-flex items-center space-x-2 font-sans text-xs uppercase tracking-[0.2em] text-[#686868] hover:text-[#111111] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>← BACK TO MORE PROJECTS</span>
          </button>
        </div>

        {/* HERO HEADER */}
        <header className="space-y-8">
          <div className="space-y-4">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              UX/UI PRODUCT DESIGN · MOBILE PODCAST APP
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] leading-tight">
              Podify
            </h1>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#583A89] font-normal leading-snug max-w-3xl pt-2">
              A focused mobile experience for discovering, organizing, and listening to podcasts.
            </p>
          </div>

          {/* INTRODUCTION */}
          <div className="space-y-4 font-sans text-base sm:text-lg text-[#111111] font-light leading-relaxed max-w-3xl border-l-2 border-[#8A73B9] pl-5 py-2 bg-[#F1F1EC]/80 rounded-r">
            <p>
              Podify is a mobile podcast application designed to reduce friction across content discovery, library management, and continuous playback. The experience brings search, saved shows, episode information, and listening controls into one dedicated product rather than placing podcasts inside a broader music-streaming interface.
            </p>
          </div>
        </header>

        {/* PROJECT INFORMATION METADATA BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 bg-[#F1F1EC] p-6 sm:p-8 rounded-none border border-[#8A73B9]/20">
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8A73B9] font-bold block">PROJECT TYPE</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">Independent UX/UI Project</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8A73B9] font-bold block">ROLE</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">UX/UI Designer</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8A73B9] font-bold block">PLATFORM</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">Mobile Application</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8A73B9] font-bold block">DESIGN TOOL</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">Figma</p>
          </div>
          <div className="space-y-1 sm:col-span-2 md:col-span-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8A73B9] font-bold block">FOCUS</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">Product Structure · Interaction Design · Visual Interface</p>
          </div>
        </div>

        {/* SECTION 01 — PROJECT CONTEXT */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              01 / PROJECT CONTEXT
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              A mobile podcast experience built around discovery, organization, and uninterrupted listening.
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            <p>
              Podify explores how listeners move from finding a podcast to saving and playing it without losing context. The mobile experience brings discovery, search, library management, episode information, and playback into one connected system.
            </p>
            <p>
              My work focused on organizing these connected tasks into a consistent interface that supports both intentional searches and open-ended browsing.
            </p>
          </div>

          {/* IMAGE 01 */}
          <div className="pt-2">
            <img
              src="/assets/podify-case-study-01.png"
              alt="Podify project introduction showing the mobile podcast interface and project overview."
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
              className="w-full h-auto object-contain rounded-none border border-[#8A73B9]/20"
            />
          </div>
        </section>

        {/* SECTION 02 — DESIGN OPPORTUNITY */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              02 / DESIGN OPPORTUNITY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Turning common podcast frustrations into clearer product priorities.
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            <p>
              The original project documented recurring concerns around difficult navigation, slow search, limited saved-content organization, readability, and delayed access to new episodes. These concerns shaped three priorities for the product experience.
            </p>
          </div>

          {/* THREE EDITORIAL BLOCKS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-2">
              <span className="font-mono text-xs text-[#8A73B9] font-bold uppercase tracking-wider block">DISCOVER</span>
              <p className="font-sans text-xs sm:text-sm text-[#111111] leading-relaxed">
                Help listeners find podcasts through search, categories, recommendations, and recognizable artwork.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-2">
              <span className="font-mono text-xs text-[#8A73B9] font-bold uppercase tracking-wider block">ORGANIZE</span>
              <p className="font-sans text-xs sm:text-sm text-[#111111] leading-relaxed">
                Make saved podcasts easier to locate, sort, filter, and revisit.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-2">
              <span className="font-mono text-xs text-[#8A73B9] font-bold uppercase tracking-wider block">LISTEN</span>
              <p className="font-sans text-xs sm:text-sm text-[#111111] leading-relaxed">
                Maintain playback continuity while listeners continue browsing the application.
              </p>
            </div>
          </div>

          {/* IMAGE 02 */}
          <div className="pt-2">
            <img
              src="/assets/podify-case-study-02.png"
              alt="Usability concerns and design opportunities identified for the Podify podcast experience."
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
              className="w-full h-auto object-contain rounded-none border border-[#8A73B9]/20"
            />
          </div>
        </section>

        {/* SECTION 03 — PRODUCT STRUCTURE */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              03 / PRODUCT STRUCTURE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Organizing the product around the listener’s repeated tasks.
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            <p>
              The product structure connects four primary areas: Home for personalized discovery, Discover for search and categories, My Podcasts for saved content, and Settings for account preferences. Podcast and episode pages sit between discovery and playback, allowing listeners to inspect content before deciding to save or play it.
            </p>
          </div>

          {/* IMAGE 03 */}
          <div className="pt-2">
            <img
              src="/assets/podify-case-study-03.png"
              alt="Podify product structure showing navigation, onboarding, and the relationship between core listening tasks."
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
              className="w-full h-auto object-contain rounded-none border border-[#8A73B9]/20"
            />
          </div>
        </section>

        {/* SECTION 04 — DISCOVERY EXPERIENCE */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              04 / DISCOVERY EXPERIENCE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Supporting both purposeful search and open-ended discovery.
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            <p>
              The Home experience separates personal subscriptions, trending podcasts, categories, and new episodes so listeners can understand why content appears. Search supports specific queries, while categories provide an alternative path when the listener does not have an exact podcast in mind.
            </p>
          </div>

          {/* IMAGE 04 */}
          <div className="pt-2">
            <img
              src="/assets/podify-case-study-04.png"
              alt="Podify discovery experience showing home content, podcast search, and category browsing."
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
              className="w-full h-auto object-contain rounded-none border border-[#8A73B9]/20"
            />
          </div>
        </section>

        {/* SECTION 05 — LIBRARY AND PLAYBACK */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              05 / LIBRARY AND PLAYBACK
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Keeping saved content and playback connected.
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            <p>
              My Podcasts gives listeners a dedicated place to manage saved content through visible sorting and filtering controls. Podcast details, episode information, saving, and playback actions remain close to the relevant content.
            </p>
          </div>

          {/* FOUR COMPACT EDITORIAL DECISION BLOCKS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-1">
              <h3 className="font-serif text-base font-bold text-[#111111]">Persistent playback</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                A compact player retains the current episode and progress while the listener continues browsing.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-1">
              <h3 className="font-serif text-base font-bold text-[#111111]">Visible episode actions</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Duration, release information, saving, and playback controls are positioned close to each episode.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-1">
              <h3 className="font-serif text-base font-bold text-[#111111]">Library management</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Sorting and filtering help listeners manage a growing collection without changing the primary navigation.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-1">
              <h3 className="font-serif text-base font-bold text-[#111111]">Listening continuity</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Consistent controls connect podcast details, the mini-player, and the full playback experience.
              </p>
            </div>
          </div>

          {/* IMAGE 05 */}
          <div className="pt-2">
            <img
              src="/assets/podify-case-study-05.png"
              alt="Podify saved-podcast library, episode details, mini-player, and full playback experience."
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
              className="w-full h-auto object-contain rounded-none border border-[#8A73B9]/20"
            />
          </div>
        </section>

        {/* SECTION 06 — VISUAL SYSTEM */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              06 / VISUAL SYSTEM
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Creating continuity across discovery, organization, and playback.
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            <p>
              The interface uses deep purple for primary navigation and actions, with pink highlighting active progress and selected elements. Generous white space separates dense podcast artwork, while repeated cards, navigation patterns, and playback controls create consistency across the experience.
            </p>
          </div>

          {/* IMAGE 06 */}
          <div className="pt-2">
            <img
              src="/assets/podify-case-study-06.png"
              alt="Podify visual system, interface components, and final design reflection."
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
              className="w-full h-auto object-contain rounded-none border border-[#8A73B9]/20"
            />
          </div>
        </section>

        {/* SECTION 07 — REFLECTION AND NEXT STEPS */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              07 / REFLECTION AND NEXT STEPS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Designing a content-rich product as one connected system.
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            <p>
              Podify strengthened my ability to organize a content-rich mobile experience around connected user tasks rather than isolated screens. The main design challenge was maintaining continuity while the listener moved between browsing, inspecting, saving, and playing content.
            </p>
            <p>
              In a future iteration, I would test the clarity of search, saved-content organization, readability, and playback continuity with podcast listeners. These findings would guide improvements to navigation, filtering, and episode-level actions.
            </p>
          </div>
        </section>

        {/* FOOTER PROJECT NAVIGATION */}
        <div className="border-t border-[#D9D9D4] pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={handlePreviousProject}
            className="group flex items-center space-x-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] p-2 rounded"
          >
            <div className="w-10 h-10 rounded-full border border-[#D9D9D4] flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#686868] uppercase tracking-wider block">PREVIOUS PROJECT</span>
              <span className="font-serif text-lg font-bold text-[#111111] group-hover:text-[#583A89] transition-colors">Cookmate</span>
            </div>
          </button>

          <button
            onClick={handleNextProject}
            className="group flex items-center space-x-3 text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] p-2 rounded"
          >
            <div>
              <span className="font-mono text-[10px] text-[#686868] uppercase tracking-wider block">NEXT PROJECT</span>
              <span className="font-serif text-lg font-bold text-[#111111] group-hover:text-[#583A89] transition-colors">Visual Narratives</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-[#D9D9D4] flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>

      </div>
    </motion.article>
  );
}
