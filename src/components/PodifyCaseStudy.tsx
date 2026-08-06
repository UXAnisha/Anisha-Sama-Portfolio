import React, { useEffect } from "react";
import { ArrowLeft, ArrowRight, Smartphone, Search, Bookmark, Sliders, Play, Headphones, Volume2, Settings } from "lucide-react";
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

        {/* SECTION 01 — PROJECT OVERVIEW */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              01 / PROJECT OVERVIEW
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Creating a dedicated space for podcast listening.
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            <p>
              Podcast listening involves more than pressing play. Listeners move between discovering new content, returning to unfinished episodes, organizing saved shows, reviewing episode details, and controlling playback. Podify brings these connected activities into one consistent mobile experience.
            </p>
            <p>
              The project focuses on creating clearer pathways between browsing and listening while keeping important content and playback controls accessible throughout the application.
            </p>
          </div>
        </section>

        {/* SECTION 02 — DESIGN OPPORTUNITY */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              02 / DESIGN OPPORTUNITY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Reducing the effort between finding a podcast and beginning to listen.
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            <p>
              When podcast content is combined with music and other audio formats, discovery and library navigation can become difficult to scan. Episode information, saved content, and playback controls may be distributed across multiple interface levels.
            </p>
            <p>
              Podify explores how a podcast-specific product could create a more direct experience through recognizable navigation, structured content groups, flexible search, library controls, and persistent playback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-[#F1F1EC] p-6 border border-[#8A73B9]/20 space-y-3">
              <span className="font-mono text-xs text-[#8A73B9] font-bold">DISCOVER</span>
              <h3 className="font-serif text-lg font-bold text-[#111111]">Find content easily</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Support both directed search and open-ended browsing through topics, categories, trending shows, and new episodes.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border border-[#8A73B9]/20 space-y-3">
              <span className="font-mono text-xs text-[#8A73B9] font-bold">ORGANIZE</span>
              <h3 className="font-serif text-lg font-bold text-[#111111]">Manage your library</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Make followed and saved podcasts easier to scan, sort, filter, and revisit.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border border-[#8A73B9]/20 space-y-3">
              <span className="font-mono text-xs text-[#8A73B9] font-bold">LISTEN</span>
              <h3 className="font-serif text-lg font-bold text-[#111111]">Seamless playback</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Maintain episode context and playback progress as listeners move through the application.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 03 — PRODUCT STRUCTURE */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              03 / PRODUCT STRUCTURE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Organizing the experience around recurring listening tasks.
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            The application is structured around four persistent destinations: Home, Search, Bookmarks, and Settings. This navigation separates personal content from broader discovery while keeping frequently used destinations predictable.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-2">
              <div className="flex items-center space-x-2 text-[#583A89]">
                <Smartphone className="w-4 h-4" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">HOME</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Brings personal podcasts, trending content, and newly released episodes into clearly separated groups.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-2">
              <div className="flex items-center space-x-2 text-[#583A89]">
                <Search className="w-4 h-4" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">SEARCH</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Supports direct queries by podcast, creator, or genre, alongside category-based browsing.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-2">
              <div className="flex items-center space-x-2 text-[#583A89]">
                <Bookmark className="w-4 h-4" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">BOOKMARKS</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Provides a dedicated place for saved shows and episodes, supported by sorting and filtering controls.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-2">
              <div className="flex items-center space-x-2 text-[#583A89]">
                <Settings className="w-4 h-4" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">SETTINGS</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Centralizes preferences and account-level controls without interrupting the primary listening experience.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 04 — CORE MOBILE EXPERIENCE */}
        <section className="space-y-10 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              04 / CORE MOBILE EXPERIENCE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Connecting discovery, organization, and playback.
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            Podify uses a consistent navigation and content hierarchy across the primary listening journey. Each screen supports a specific task while maintaining continuity with the rest of the product.
          </p>

          <div className="space-y-12 pt-4">
            
            {/* Subsection 1: Home and discovery */}
            <div className="bg-[#F1F1EC] p-6 sm:p-8 border border-[#8A73B9]/20 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#8A73B9] font-bold block">SUBSECTION 01</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">Home and discovery</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  Personal subscriptions, trending podcasts, and new releases are grouped into clearly delineated rows, allowing users to scan recommendations according to their immediate context.
                </p>
              </div>

              {/* Home Screen Image Container */}
              <div id="podify-home-screen-slot" className="space-y-2">
                <img
                  src="/assets/podify-home-discovery-experience.png"
                  alt="Podify home screen showing personal podcasts, trending shows, and new episodes"
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                  className="w-full h-auto object-contain rounded-none border border-[#8A73B9]/30"
                />
                <p className="font-sans text-xs text-[#686868] italic text-center">
                  The Home experience separates personal podcasts, trending content, and new episodes into recognizable groups.
                </p>
              </div>
            </div>

            {/* Subsection 2: Search and categories */}
            <div className="bg-[#F1F1EC] p-6 sm:p-8 border border-[#8A73B9]/20 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#8A73B9] font-bold block">SUBSECTION 02</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">Search and categories</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  Search combines responsive input with genre and topic chips, making it straightforward to search for a specific show title or explore broader categories like design, technology, or storytelling.
                </p>
              </div>
              <div
                id="podify-search-screen-slot"
                className="w-full aspect-[16/9] max-h-[280px] bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-6 text-center"
              >
                <Search className="w-8 h-8 text-[#8A73B9] mb-2" />
                <span className="font-sans text-xs font-semibold text-[#8A73B9] uppercase tracking-wider">
                  Search and categories Interface
                </span>
              </div>
            </div>

            {/* Subsection 3: Saved podcasts */}
            <div className="bg-[#F1F1EC] p-6 sm:p-8 border border-[#8A73B9]/20 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#8A73B9] font-bold block">SUBSECTION 03</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">Saved podcasts</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  The Bookmarks view acts as a personal media library where users can immediately access followed shows, bookmarked episodes, and download queues without digging through nested submenus.
                </p>
              </div>
              <div
                id="podify-my-podcasts-screen-slot"
                className="w-full aspect-[16/9] max-h-[280px] bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-6 text-center"
              >
                <Bookmark className="w-8 h-8 text-[#8A73B9] mb-2" />
                <span className="font-sans text-xs font-semibold text-[#8A73B9] uppercase tracking-wider">
                  Saved Podcasts Library View
                </span>
              </div>
            </div>

            {/* Subsection 4: Sorting and filtering */}
            <div className="bg-[#F1F1EC] p-6 sm:p-8 border border-[#8A73B9]/20 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#8A73B9] font-bold block">SUBSECTION 04</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">Sorting and filtering</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  Dedicated filter bars allow users to sort bookmarked content by episode duration, release recency, or completion status, simplifying library management as collections grow.
                </p>
              </div>
              <div
                id="podify-sorting-filtering-slot"
                className="w-full aspect-[16/9] max-h-[280px] bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-6 text-center"
              >
                <Sliders className="w-8 h-8 text-[#8A73B9] mb-2" />
                <span className="font-sans text-xs font-semibold text-[#8A73B9] uppercase tracking-wider">
                  Sorting and Filtering Controls
                </span>
              </div>
            </div>

            {/* Subsection 5: Podcast and episode details */}
            <div className="bg-[#F1F1EC] p-6 sm:p-8 border border-[#8A73B9]/20 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#8A73B9] font-bold block">SUBSECTION 05</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">Podcast and episode details</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  Podcast landing pages display artwork, creator notes, subscription status, and full episode listings with explicit durations and release dates right upfront.
                </p>
              </div>
              <div
                id="podify-podcast-detail-screen-slot"
                className="w-full aspect-[16/9] max-h-[280px] bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-6 text-center"
              >
                <Headphones className="w-8 h-8 text-[#8A73B9] mb-2" />
                <span className="font-sans text-xs font-semibold text-[#8A73B9] uppercase tracking-wider">
                  Podcast and Episode Details View
                </span>
              </div>
            </div>

            {/* Subsection 6: Persistent mini-player */}
            <div className="bg-[#F1F1EC] p-6 sm:p-8 border border-[#8A73B9]/20 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#8A73B9] font-bold block">SUBSECTION 06</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">Persistent mini-player</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  A persistent mini-player docks above the bottom navigation, preserving active listening context and quick play/pause toggles as users browse other areas of the application.
                </p>
              </div>
              <div
                id="podify-my-podcasts-player-slot"
                className="w-full aspect-[16/9] max-h-[280px] bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-6 text-center"
              >
                <Play className="w-8 h-8 text-[#8A73B9] mb-2" />
                <span className="font-sans text-xs font-semibold text-[#8A73B9] uppercase tracking-wider">
                  Persistent Mini-Player Bar
                </span>
              </div>
            </div>

            {/* Subsection 7: Full playback controls */}
            <div className="bg-[#F1F1EC] p-6 sm:p-8 border border-[#8A73B9]/20 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#8A73B9] font-bold block">SUBSECTION 07</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">Full playback controls</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  Expanding the mini-player reveals comprehensive controls including playback speed adjustments, chapter navigation, progress scrubbing, download management, and episode sharing.
                </p>
              </div>
              <div
                id="podify-full-player-screen-slot"
                className="w-full aspect-[16/9] max-h-[280px] bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-6 text-center"
              >
                <Volume2 className="w-8 h-8 text-[#8A73B9] mb-2" />
                <span className="font-sans text-xs font-semibold text-[#8A73B9] uppercase tracking-wider">
                  Full Playback Control Screen
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 05 — INTERACTION DECISIONS */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              05 / INTERACTION DECISIONS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Making repeated listening actions easier to recognize and complete.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#111111]">Persistent playback</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                A compact player retains the current episode and progress while the listener continues browsing.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#111111]">Scannable content groups</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Personal subscriptions, trending podcasts, and new episodes are separated to clarify why content is appearing.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#111111]">Flexible discovery</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Search supports specific queries, while categories offer an alternative path when the listener does not have an exact title in mind.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#111111]">Visible episode actions</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Duration, release information, saving, and playback actions are positioned close to the relevant episode.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-2 sm:col-span-2">
              <h3 className="font-serif text-lg font-bold text-[#111111]">Library management</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Sorting and filtering controls help listeners manage a growing collection without changing the underlying navigation.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 06 — VISUAL SYSTEM */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              06 / VISUAL SYSTEM
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              A consistent interface across discovery and playback.
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            <p>
              The visual system uses deep purple for primary navigation and actions, pink for emphasis and active progress, and generous white space to separate dense podcast artwork. Large cover images support recognition, while repeated component patterns create continuity between browsing, details, saved content, and playback.
            </p>
          </div>
        </section>

        {/* SECTION 07 — OUTCOME AND REFLECTION */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              07 / OUTCOME AND REFLECTION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Designing a content-rich product as one connected listening system.
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            <p>
              Podify strengthened my ability to organize a content-rich mobile experience around connected user tasks rather than isolated screens. The project required balancing visual discovery with practical controls for saving, filtering, inspecting, and playing podcast content.
            </p>
            <p>
              The most important design challenge was maintaining continuity as the listener moved between browsing and playback. Persistent navigation, visible episode information, and consistent interaction patterns helped make the experience feel like one system rather than a collection of separate interfaces.
            </p>
          </div>

          <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#8A73B9] space-y-2 max-w-3xl">
            <span className="font-mono text-xs text-[#8A73B9] font-bold uppercase tracking-wider block">
              Future Development Note
            </span>
            <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
              Podify may later be extended through additional interaction concepts. Any future exploration will be documented separately from the original mobile project.
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
