import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Maximize2, Headphones, Play, Bookmark, Search, Sparkles, Layers, Sliders, Mic, Volume2, CheckCircle2, MessageSquare, AlertCircle, RefreshCw, Smartphone, Monitor } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import ImageLightbox from "./ImageLightbox";

interface PodifyCaseStudyProps {
  onBackToProjects?: () => void;
  onBack?: () => void;
}

export default function PodifyCaseStudy({ onBackToProjects, onBack }: PodifyCaseStudyProps) {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  const lightboxItems = [
    {
      title: "Podify Hero Overview",
      caption: "Original mobile interface designed in Figma.",
      customRender: (
        <div className="w-full bg-[#14121A] text-white p-8 rounded-xl border border-[#8A73B9]/30 space-y-4 text-center">
          <span className="font-mono text-xs text-[#8A73B9] uppercase tracking-widest font-bold">HERO MOCKUP</span>
          <h3 className="font-serif text-2xl font-bold">Original Mobile Interface Overview</h3>
          <p className="font-sans text-xs text-neutral-400">Three-phone Podify mockup displaying Home Feed, Discovery, and Full Playback screens.</p>
        </div>
      ),
    },
    {
      title: "Conversational Architecture Flow",
      caption: "Multi-turn dialog flow mapping spoken prompts to screen states and recovery mechanisms.",
      customRender: (
        <div className="w-full bg-[#FAFAF7] text-[#111111] p-6 sm:p-8 rounded-lg border border-[#D9D9D4] space-y-6">
          <div className="border-b border-[#D9D9D4] pb-3">
            <span className="font-mono text-xs text-[#8A73B9] uppercase tracking-widest font-bold">CONCEPT FLOW</span>
            <h3 className="font-serif text-2xl font-bold text-[#111111]">Multimodal Turn Sequence</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-[#F1F1EC] rounded border border-[#D9D9D4]">
              <span className="font-mono text-xs text-[#8A73B9] font-bold">TURN 1: Initial Request</span>
              <p className="font-sans text-xs text-[#111111] mt-1"><strong>Listener:</strong> "Play the latest Hidden Brain episode about motivation."</p>
              <p className="font-sans text-xs text-[#686868]"><strong>Podify Voice:</strong> "I found a 52-minute episode about building motivation. Would you like to play it?"</p>
            </div>
            <div className="p-4 bg-[#F1F1EC] rounded border border-[#D9D9D4]">
              <span className="font-mono text-xs text-[#8A73B9] font-bold">TURN 2: Refinement</span>
              <p className="font-sans text-xs text-[#111111] mt-1"><strong>Listener:</strong> "No, the shorter one."</p>
              <p className="font-sans text-xs text-[#686868]"><strong>Podify Voice:</strong> "Here’s a 28-minute episode about staying motivated. Is this the one?"</p>
            </div>
            <div className="p-4 bg-[#F1F1EC] rounded border border-[#D9D9D4]">
              <span className="font-mono text-xs text-[#8A73B9] font-bold">TURN 3: Compound Action</span>
              <p className="font-sans text-xs text-[#111111] mt-1"><strong>Listener:</strong> "Yes, and save the first one."</p>
              <p className="font-sans text-xs text-[#686868]"><strong>Podify Voice:</strong> "Playing the shorter episode. I saved the first one for later."</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

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
              INDEPENDENT CONCEPT PROJECT
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] leading-tight">
              Podify
            </h1>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#583A89] font-normal leading-snug max-w-3xl pt-2">
              A podcast experience designed for touch, voice, and the moments between them.
            </p>
          </div>

          {/* INTRODUCTION */}
          <div className="space-y-4 font-sans text-base sm:text-lg text-[#111111] font-light leading-relaxed max-w-3xl border-l-2 border-[#8A73B9] pl-5 py-2 bg-[#F1F1EC]/80 rounded-r">
            <p>
              Podify began as a mobile concept for making podcast discovery, organization, and playback more intuitive. The original experience addressed recurring usability problems identified through an audit of public podcast-app reviews, including difficult navigation, inaccessible saved content, slow discovery, and limited playback control.
            </p>
            <p className="text-[#686868] text-sm sm:text-base">
              I later extended the project to explore a multimodal question: How might listeners find, refine, and play podcasts when looking at or touching a screen is inconvenient?
            </p>
          </div>
        </header>

        {/* PROJECT INFORMATION METADATA BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-[#F1F1EC] p-6 sm:p-8 rounded-none border border-[#8A73B9]/20">
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8A73B9] font-bold block">ROLE</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">Product Designer</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8A73B9] font-bold block">ORIGINAL SCOPE</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">Mobile Podcast Experience</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8A73B9] font-bold block">CONCEPT EXTENSION</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">Conversational UX &amp; Multimodal Design</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8A73B9] font-bold block">TOOLS &amp; DELIVERABLES</span>
            <p className="font-sans text-xs text-[#111111]">Figma · FigJam · Mobile App · Conversational Wireframes · Voice Response Map</p>
          </div>
          <div className="sm:col-span-2 md:col-span-4 pt-2 border-t border-[#8A73B9]/15">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#686868] font-bold block">METHODS</span>
            <p className="font-sans text-xs text-[#686868]">
              Public Review Audit · User Flows · Wireframing · Interface Design · Dialog Scripting · Response Mapping · Multimodal Prototyping
            </p>
          </div>
        </div>

        {/* SECTION 01 — OVERVIEW */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              01 / OVERVIEW
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Making podcast discovery and playback feel less fragmented.
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            <p>
              Podcast listening involves more than pressing play. Listeners search across topics, return to unfinished episodes, manage saved shows, compare episode lengths, and control playback in changing environments.
            </p>
            <p>
              Podify brings these actions into one focused mobile experience. The project explores how clearer information hierarchy, persistent playback, accessible saved content, and flexible discovery tools can reduce the effort between deciding what to hear and beginning to listen.
            </p>
          </div>

          {/* Hero Mockup Media Slot */}
          {/* Code Comment: Hero image slot for original mobile interface three-phone mockup */}
          <div className="space-y-3 pt-2">
            <div
              id="podify-hero-mockup-slot"
              onClick={() => {
                setLightboxIndex(0);
                setLightboxOpen(true);
              }}
              className="w-full min-h-[280px] sm:min-h-[360px] bg-[#F1F1EC] border border-[#8A73B9]/30 rounded-none p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#583A89] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[#8A73B9]/10 text-[#583A89] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="font-sans text-xs uppercase tracking-wider text-[#583A89] font-semibold block">
                Original mobile interface designed in Figma
              </span>
              <span className="font-sans text-[11px] text-[#686868] mt-1">
                (Click to view three-phone mockup details)
              </span>
            </div>
            <p className="font-sans text-xs text-[#686868] italic text-center">
              Original mobile interface designed in Figma.
            </p>
          </div>
        </section>

        {/* SECTION 02 — THE PROBLEM */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              02 / THE PROBLEM
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Listeners could find content, but struggled to manage the experience around it.
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            I began by reviewing public feedback about existing podcast applications. The comments repeatedly pointed to difficulty finding saved shows, slow or unreliable search, cluttered interfaces, unreadable text, delayed episode availability, and too many steps between discovery and playback.
          </p>

          {/* Four Themes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-2">
              <span className="font-mono text-xs text-[#8A73B9] font-bold block">01 / DISCOVERY</span>
              <h3 className="font-serif text-lg font-bold text-[#111111]">Discovery friction</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Listeners found it difficult to locate relevant shows and browse by topic.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-2">
              <span className="font-mono text-xs text-[#8A73B9] font-bold block">02 / LIBRARY</span>
              <h3 className="font-serif text-lg font-bold text-[#111111]">Library visibility</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Saved and followed podcasts were not always easy to find again.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-2">
              <span className="font-mono text-xs text-[#8A73B9] font-bold block">03 / CONTINUITY</span>
              <h3 className="font-serif text-lg font-bold text-[#111111]">Playback continuity</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Moving between discovery, episode details, and playback felt disconnected.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border-l-2 border-[#583A89] space-y-2">
              <span className="font-mono text-xs text-[#8A73B9] font-bold block">04 / CLARITY</span>
              <h3 className="font-serif text-lg font-bold text-[#111111]">Interface clarity</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Dense layouts and small typography made routine actions harder to complete.
              </p>
            </div>
          </div>

          {/* Audit Findings Image Slot */}
          {/* Code Comment: Review audit findings image slot for public podcast-app review themes */}
          <div className="space-y-2 pt-2">
            <div
              id="podify-review-audit-slot"
              className="w-full min-h-[200px] bg-[#F1F1EC] border border-[#8A73B9]/30 rounded-none p-6 flex flex-col items-center justify-center text-center"
            >
              <Search className="w-6 h-6 text-[#8A73B9] mb-2" />
              <span className="font-sans text-xs uppercase tracking-wider text-[#583A89] font-semibold">
                Selected themes identified through an audit of public podcast-app reviews
              </span>
            </div>
            <p className="font-sans text-xs text-[#686868] italic">
              Selected themes identified through an audit of public podcast-app reviews.
            </p>
          </div>
        </section>

        {/* SECTION 03 — DESIGN OPPORTUNITY */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              03 / DESIGN OPPORTUNITY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              How might a podcast experience support discovery, organization, and uninterrupted listening within one clear system?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-[#F1F1EC] p-6 border border-[#8A73B9]/20 space-y-3">
              <span className="font-mono text-xs text-[#8A73B9] font-bold">GOAL 01</span>
              <h3 className="font-serif text-lg font-bold text-[#111111]">Find with less effort</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Support direct search, topic browsing, trending content, and useful filters.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border border-[#8A73B9]/20 space-y-3">
              <span className="font-mono text-xs text-[#8A73B9] font-bold">GOAL 02</span>
              <h3 className="font-serif text-lg font-bold text-[#111111]">Return without rebuilding context</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Make followed podcasts, saved episodes, and listening progress easy to recover.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 border border-[#8A73B9]/20 space-y-3">
              <span className="font-mono text-xs text-[#8A73B9] font-bold">GOAL 03</span>
              <h3 className="font-serif text-lg font-bold text-[#111111]">Move smoothly into listening</h3>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Keep episode details and player controls available without interrupting exploration.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 04 — ORIGINAL MOBILE EXPERIENCE */}
        <section className="space-y-10 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              04 / ORIGINAL MOBILE EXPERIENCE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              A screen-first foundation for discovering and managing podcasts.
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            The original Podify concept organized listening around four persistent destinations: Home, Search, Bookmarks, and Settings. The interface separates personal content from broader discovery while keeping playback available as listeners move through the app.
          </p>

          {/* Editorial Sequence of 6 Screens & Annotations */}
          <div className="space-y-12 pt-4">
            
            {/* 1. Home Screen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#F1F1EC] p-6 sm:p-8 border border-[#8A73B9]/20">
              {/* Code Comment: Home Screen media container */}
              <div
                id="podify-home-screen-slot"
                className="w-full aspect-[9/16] max-h-[380px] bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-6 text-center"
              >
                <Smartphone className="w-8 h-8 text-[#8A73B9] mb-2" />
                <span className="font-sans text-xs font-semibold text-[#8A73B9] uppercase tracking-wider">
                  1. Home Screen
                </span>
              </div>
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#8A73B9] font-bold">SCREEN 01</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">Home</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  Personal subscriptions, trending shows, and new episodes are presented as distinct content groups so listeners can recognize where each recommendation comes from.
                </p>
              </div>
            </div>

            {/* 2. Search Screen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#F1F1EC] p-6 sm:p-8 border border-[#8A73B9]/20">
              <div className="space-y-3 order-2 md:order-1">
                <span className="font-mono text-xs text-[#8A73B9] font-bold">SCREEN 02</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">Search</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  Search supports podcast title, creator, and genre queries, while visible topic categories provide a browsing path when listeners do not have an exact title in mind.
                </p>
              </div>
              {/* Code Comment: Search Screen media container */}
              <div
                id="podify-search-screen-slot"
                className="w-full aspect-[9/16] max-h-[380px] bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-6 text-center order-1 md:order-2"
              >
                <Search className="w-8 h-8 text-[#8A73B9] mb-2" />
                <span className="font-sans text-xs font-semibold text-[#8A73B9] uppercase tracking-wider">
                  2. Search Screen
                </span>
              </div>
            </div>

            {/* 3. My Podcasts Screen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#F1F1EC] p-6 sm:p-8 border border-[#8A73B9]/20">
              {/* Code Comment: My Podcasts Screen media container */}
              <div
                id="podify-my-podcasts-screen-slot"
                className="w-full aspect-[9/16] max-h-[380px] bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-6 text-center"
              >
                <Bookmark className="w-8 h-8 text-[#8A73B9] mb-2" />
                <span className="font-sans text-xs font-semibold text-[#8A73B9] uppercase tracking-wider">
                  3. My Podcasts Screen
                </span>
              </div>
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#8A73B9] font-bold">SCREEN 03</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">My Podcasts</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  Saved shows appear in a scannable library with sorting, category, and filter tools for managing a growing collection.
                </p>
              </div>
            </div>

            {/* 4. My Podcasts Screen with Persistent Player */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#F1F1EC] p-6 sm:p-8 border border-[#8A73B9]/20">
              <div className="space-y-3 order-2 md:order-1">
                <span className="font-mono text-xs text-[#8A73B9] font-bold">SCREEN 04</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">Persistent Playback</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  A compact player preserves the current episode and progress while allowing listeners to continue browsing.
                </p>
              </div>
              {/* Code Comment: My Podcasts Screen with Persistent Player media container */}
              <div
                id="podify-my-podcasts-player-slot"
                className="w-full aspect-[9/16] max-h-[380px] bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-6 text-center order-1 md:order-2"
              >
                <Play className="w-8 h-8 text-[#8A73B9] mb-2" />
                <span className="font-sans text-xs font-semibold text-[#8A73B9] uppercase tracking-wider">
                  4. Persistent Player View
                </span>
              </div>
            </div>

            {/* 5. Podcast Detail Screen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#F1F1EC] p-6 sm:p-8 border border-[#8A73B9]/20">
              {/* Code Comment: Podcast Detail Screen media container */}
              <div
                id="podify-podcast-detail-screen-slot"
                className="w-full aspect-[9/16] max-h-[380px] bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-6 text-center"
              >
                <Headphones className="w-8 h-8 text-[#8A73B9] mb-2" />
                <span className="font-sans text-xs font-semibold text-[#8A73B9] uppercase tracking-wider">
                  5. Podcast Detail Screen
                </span>
              </div>
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#8A73B9] font-bold">SCREEN 05</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">Podcast Details</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  Show information, subscription controls, episode length, release date, and individual play actions are brought into one hierarchy.
                </p>
              </div>
            </div>

            {/* 6. Full Playback Screen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#F1F1EC] p-6 sm:p-8 border border-[#8A73B9]/20">
              <div className="space-y-3 order-2 md:order-1">
                <span className="font-mono text-xs text-[#8A73B9] font-bold">SCREEN 06</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">Full Player</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  Playback speed, progress, saving, sharing, and additional controls are grouped around the primary play action.
                </p>
              </div>
              {/* Code Comment: Full Playback Screen media container */}
              <div
                id="podify-full-player-screen-slot"
                className="w-full aspect-[9/16] max-h-[380px] bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-6 text-center order-1 md:order-2"
              >
                <Volume2 className="w-8 h-8 text-[#8A73B9] mb-2" />
                <span className="font-sans text-xs font-semibold text-[#8A73B9] uppercase tracking-wider">
                  6. Full Playback Screen
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 05 — WHY EXTEND BEYOND TOUCH? */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              05 / MULTIMODAL OPPORTUNITY
            </span>
            <span className="px-3 py-1 bg-[#583A89] text-white font-mono text-[10px] uppercase font-bold tracking-widest rounded-none">
              Later concept extension
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
            Listening often happens when the screen is not the primary interface.
          </h2>

          <div className="space-y-4 font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            <p>
              Podcast listeners may be cooking, exercising, driving, cleaning, or moving between devices. In these situations, finding a specific episode or correcting a recommendation through touch can interrupt the activity.
            </p>
            <p>
              I extended Podify to explore how spoken language and visual feedback could work together. Voice provides a fast way to express intent, while the screen supports comparison, confirmation, and continued control.
            </p>
          </div>
        </section>

        {/* SECTION 06 — CONVERSATION DESIGN PRINCIPLES */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              06 / CONVERSATION PRINCIPLES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Designing responses for listening, not simply reading text aloud.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
            {[
              { num: "01", title: "Lead with the result", desc: "State what Podify found or completed before adding supporting details." },
              { num: "02", title: "Keep speech concise", desc: "The spoken response should be shorter than the information visible on screen." },
              { num: "03", title: "Preserve conversational context", desc: "Terms such as “that one,” “the shorter episode,” and “the first result” should refer to the preceding turn." },
              { num: "04", title: "Ask one question at a time", desc: "Request only the clarification necessary to move forward." },
              { num: "05", title: "Make recovery cooperative", desc: "A correction should help the listener continue without suggesting that they made an error." },
              { num: "06", title: "Confirm meaningful actions", desc: "Saving, queuing, downloading, or replacing content should receive a short confirmation." },
            ].map((p) => (
              <div key={p.num} className="bg-[#F1F1EC] p-6 border border-[#8A73B9]/20 space-y-2">
                <span className="font-mono text-xs text-[#8A73B9] font-bold">{p.num}</span>
                <h3 className="font-serif text-base font-bold text-[#111111]">{p.title}</h3>
                <p className="font-sans text-xs text-[#686868] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 07 — CONVERSATIONAL WIREFRAME */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              07 / MULTI-TURN FLOW
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Supporting refinement without making the listener start again.
            </h2>
          </div>

          {/* Flow Sequence (Horizontal on Desktop, Vertical on Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Turn 1 */}
            <div className="bg-[#14121A] text-white p-6 border border-[#8A73B9]/40 space-y-4">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                <span className="font-mono text-xs text-[#8A73B9] font-bold">TURN 1</span>
                <Mic className="w-4 h-4 text-[#8A73B9]" />
              </div>
              <div className="space-y-2">
                <p className="font-sans text-xs text-neutral-400">Listener:</p>
                <p className="font-sans text-sm font-medium text-white italic">"Play the latest Hidden Brain episode about motivation."</p>
              </div>
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <p className="font-sans text-xs text-[#8A73B9]">Podify Response:</p>
                <p className="font-sans text-xs text-neutral-200">"I found a 52-minute episode about building motivation. Would you like to play it?"</p>
              </div>
              <div className="p-3 bg-[#201B2E] rounded border border-[#8A73B9]/20 text-[11px] text-neutral-300">
                <strong>Screen State:</strong> Cover artwork, episode title, duration (52 min), and prominent Play button.
              </div>
            </div>

            {/* Turn 2 */}
            <div className="bg-[#14121A] text-white p-6 border border-[#8A73B9]/40 space-y-4">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                <span className="font-mono text-xs text-[#8A73B9] font-bold">TURN 2</span>
                <RefreshCw className="w-4 h-4 text-[#8A73B9]" />
              </div>
              <div className="space-y-2">
                <p className="font-sans text-xs text-neutral-400">Listener:</p>
                <p className="font-sans text-sm font-medium text-white italic">"No, the shorter one."</p>
              </div>
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <p className="font-sans text-xs text-[#8A73B9]">Podify Response:</p>
                <p className="font-sans text-xs text-neutral-200">"Here’s a 28-minute episode about staying motivated. Is this the one?"</p>
              </div>
              <div className="p-3 bg-[#201B2E] rounded border border-[#8A73B9]/20 text-[11px] text-neutral-300">
                <strong>Screen State:</strong> Selected result updated to 28 min episode while keeping alternatives visible.
              </div>
            </div>

            {/* Turn 3 */}
            <div className="bg-[#14121A] text-white p-6 border border-[#8A73B9]/40 space-y-4">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                <span className="font-mono text-xs text-[#8A73B9] font-bold">TURN 3</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="space-y-2">
                <p className="font-sans text-xs text-neutral-400">Listener:</p>
                <p className="font-sans text-sm font-medium text-white italic">"Yes, and save the first one."</p>
              </div>
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <p className="font-sans text-xs text-[#8A73B9]">Podify Response:</p>
                <p className="font-sans text-xs text-neutral-200">"Playing the shorter episode. I saved the first one for later."</p>
              </div>
              <div className="p-3 bg-[#201B2E] rounded border border-[#8A73B9]/20 text-[11px] text-neutral-300">
                <strong>Screen State:</strong> Active player opens; brief visual toast confirms "Saved first episode to Bookmarks".
              </div>
            </div>
          </div>

          {/* Demonstrated Behaviors */}
          <div className="bg-[#F1F1EC] p-6 border border-[#8A73B9]/20 space-y-3">
            <span className="font-mono text-xs text-[#8A73B9] font-bold uppercase tracking-wider block">
              Behaviors Demonstrated in Flow
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-[#111111]">
              <span className="bg-[#FAFAF7] px-3 py-1 border border-[#D9D9D4]">Context retention</span>
              <span className="bg-[#FAFAF7] px-3 py-1 border border-[#D9D9D4]">Reference resolution</span>
              <span className="bg-[#FAFAF7] px-3 py-1 border border-[#D9D9D4]">Result refinement</span>
              <span className="bg-[#FAFAF7] px-3 py-1 border border-[#D9D9D4]">Compound intent</span>
              <span className="bg-[#FAFAF7] px-3 py-1 border border-[#D9D9D4]">Spoken confirmation</span>
              <span className="bg-[#FAFAF7] px-3 py-1 border border-[#D9D9D4]">Visual continuity</span>
            </div>
          </div>

          <p className="font-sans text-xs text-[#686868] italic">
            Note: This flow represents a conceptual conversation mapping, not usability-test evidence.
          </p>
        </section>

        {/* SECTION 08 — RESPONSE MAPPING */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              08 / RESPONSE MAPPING
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Connecting intent, spoken language, system context, and screen behavior.
            </h2>
          </div>

          {/* Accessible Table */}
          <div className="overflow-x-auto border border-[#8A73B9]/20">
            <table className="w-full text-left font-sans text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#583A89] text-white font-mono text-[11px] uppercase tracking-wider">
                  <th className="p-3 sm:p-4 border-b border-[#8A73B9]/30">Listener Intent</th>
                  <th className="p-3 sm:p-4 border-b border-[#8A73B9]/30">Sample Utterance</th>
                  <th className="p-3 sm:p-4 border-b border-[#8A73B9]/30">Context Required</th>
                  <th className="p-3 sm:p-4 border-b border-[#8A73B9]/30">Spoken Response</th>
                  <th className="p-3 sm:p-4 border-b border-[#8A73B9]/30">Screen Response</th>
                  <th className="p-3 sm:p-4 border-b border-[#8A73B9]/30">Recovery Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#8A73B9]/15 bg-[#F1F1EC] text-[#111111]">
                {/* Row 1 */}
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-[#583A89]">RESUME PLAYBACK</td>
                  <td className="p-3 sm:p-4 italic">"Continue my podcast."</td>
                  <td className="p-3 sm:p-4 text-[#686868]">Listening history and current progress.</td>
                  <td className="p-3 sm:p-4 font-medium">"Resuming Very Bad Wizards from 36 minutes."</td>
                  <td className="p-3 sm:p-4 text-[#686868]">Open the player at the saved position.</td>
                  <td className="p-3 sm:p-4 text-[#686868]">Offer the listener’s three most recent episodes if no single current episode exists.</td>
                </tr>
                {/* Row 2 */}
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-[#583A89]">FIND BY TOPIC</td>
                  <td className="p-3 sm:p-4 italic">"Find a podcast about sleep."</td>
                  <td className="p-3 sm:p-4 text-[#686868]">Topic and available catalog results.</td>
                  <td className="p-3 sm:p-4 font-medium">"I found a few podcasts about sleep. The first is a 32-minute episode from Hidden Brain."</td>
                  <td className="p-3 sm:p-4 text-[#686868]">Show three results with title, source, and duration.</td>
                  <td className="p-3 sm:p-4 text-[#686868]">Ask whether the listener prefers a show or an individual episode.</td>
                </tr>
                {/* Row 3 */}
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-[#583A89]">REFINE BY LENGTH</td>
                  <td className="p-3 sm:p-4 italic">"Something shorter."</td>
                  <td className="p-3 sm:p-4 text-[#686868]">Previous result set and episode durations.</td>
                  <td className="p-3 sm:p-4 font-medium">"Here’s a 19-minute option."</td>
                  <td className="p-3 sm:p-4 text-[#686868]">Update the selected result while retaining alternatives.</td>
                  <td className="p-3 sm:p-4 text-[#686868]">Explain briefly if no shorter result is available.</td>
                </tr>
                {/* Row 4 */}
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-[#583A89]">CORRECT A RESULT</td>
                  <td className="p-3 sm:p-4 italic">"No, not that one."</td>
                  <td className="p-3 sm:p-4 text-[#686868]">Previous selection and remaining results.</td>
                  <td className="p-3 sm:p-4 font-medium">"Okay. Did you mean the episode from Radiolab or Hidden Brain?"</td>
                  <td className="p-3 sm:p-4 text-[#686868]">Highlight the two likely alternatives.</td>
                  <td className="p-3 sm:p-4 text-[#686868]">Ask one clarifying question.</td>
                </tr>
                {/* Row 5 */}
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-[#583A89]">SAVE AN EPISODE</td>
                  <td className="p-3 sm:p-4 italic">"Save this for later."</td>
                  <td className="p-3 sm:p-4 text-[#686868]">Currently selected episode.</td>
                  <td className="p-3 sm:p-4 font-medium">"Saved to your episodes."</td>
                  <td className="p-3 sm:p-4 text-[#686868]">Show a short saved confirmation.</td>
                  <td className="p-3 sm:p-4 text-[#686868]">Explain if the episode has already been saved.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 09 — TTS WRITING AND ITERATION */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              09 / TTS ITERATION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              A useful response must also sound natural when spoken.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Early Response */}
            <div className="bg-[#F1F1EC] p-6 border border-neutral-300 space-y-4">
              <span className="font-mono text-xs text-rose-600 font-bold block">EARLY RESPONSE</span>
              <p className="font-sans text-sm italic text-[#111111] bg-white p-4 border border-neutral-200">
                "I have located three podcast episodes related to productivity. The first result is 54 minutes, the second result is 31 minutes, and the third result is 22 minutes. Which result would you like me to play?"
              </p>
              <div className="space-y-1 text-xs text-[#686868]">
                <span className="font-semibold text-rose-600 block">Issue:</span>
                <p>The response is technically complete but too long. It forces the listener to remember several details before answering.</p>
              </div>
            </div>

            {/* Refined Response */}
            <div className="bg-[#14121A] text-white p-6 border border-[#8A73B9]/40 space-y-4">
              <span className="font-mono text-xs text-emerald-400 font-bold block">REFINED RESPONSE</span>
              <p className="font-sans text-sm italic text-white bg-[#201B2E] p-4 border border-[#8A73B9]/30">
                "I found three episodes about productivity. The shortest is 22 minutes. Want to hear that one?"
              </p>
              <div className="space-y-1 text-xs text-neutral-300">
                <span className="font-semibold text-emerald-400 block">Why it is stronger:</span>
                <ul className="list-disc list-inside space-y-1 text-neutral-400">
                  <li>Leads with the available result</li>
                  <li>Reduces memory demand</li>
                  <li>Uses natural spoken language</li>
                  <li>Provides one clear next action</li>
                  <li>Leaves additional options visible on screen</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="font-sans text-xs text-[#686868] italic">
            The wording was evaluated through read-aloud review for cadence, length, and clarity. Do not describe this as formal usability testing.
          </p>
        </section>

        {/* SECTION 10 — EDGE CASES AND RECOVERY */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              10 / EDGE CASES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Designing beyond the ideal request.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            {/* Scenario 1 */}
            <div className="bg-[#F1F1EC] p-6 border border-[#8A73B9]/20 space-y-4">
              <span className="font-mono text-xs text-[#8A73B9] font-bold block">SCENARIO 01 / AMBIGUOUS TITLE</span>
              <div className="space-y-1 text-xs sm:text-sm">
                <p><strong>Listener:</strong> "Play Home."</p>
                <p className="text-[#583A89]"><strong>Response:</strong> "I found several shows called Home. Do you mean the design podcast or the daily news episode?"</p>
              </div>
              {/* Code Comment: Ambiguous Title Edge Case Media Container */}
              <div
                id="podify-edge-case-ambiguous-slot"
                className="w-full h-36 bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-4 text-center"
              >
                <AlertCircle className="w-5 h-5 text-[#8A73B9] mb-1" />
                <span className="font-sans text-[11px] text-[#8A73B9] font-medium">
                  Ambiguous Title Visual State
                </span>
              </div>
            </div>

            {/* Scenario 2 */}
            <div className="bg-[#F1F1EC] p-6 border border-[#8A73B9]/20 space-y-4">
              <span className="font-mono text-xs text-[#8A73B9] font-bold block">SCENARIO 02 / NO EXACT RESULT</span>
              <div className="space-y-1 text-xs sm:text-sm">
                <p><strong>Listener:</strong> "Play the newest episode about Bauhaus."</p>
                <p className="text-[#583A89]"><strong>Response:</strong> "I couldn’t find an exact match. I found two recent design-history episodes instead."</p>
              </div>
              {/* Code Comment: No Exact Result Edge Case Media Container */}
              <div
                id="podify-edge-case-no-result-slot"
                className="w-full h-36 bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-4 text-center"
              >
                <Search className="w-5 h-5 text-[#8A73B9] mb-1" />
                <span className="font-sans text-[11px] text-[#8A73B9] font-medium">
                  No Exact Result Visual State
                </span>
              </div>
            </div>

            {/* Scenario 3 */}
            <div className="bg-[#F1F1EC] p-6 border border-[#8A73B9]/20 space-y-4">
              <span className="font-mono text-xs text-[#8A73B9] font-bold block">SCENARIO 03 / INTERRUPTED REQUEST</span>
              <div className="space-y-1 text-xs sm:text-sm">
                <p><strong>Listener:</strong> "Play the—actually, show me my saved episodes."</p>
                <p className="text-[#583A89]"><strong>Response:</strong> Open saved episodes and discard the incomplete search.</p>
              </div>
              {/* Code Comment: Interrupted Request Edge Case Media Container */}
              <div
                id="podify-edge-case-interrupted-slot"
                className="w-full h-36 bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-4 text-center"
              >
                <Bookmark className="w-5 h-5 text-[#8A73B9] mb-1" />
                <span className="font-sans text-[11px] text-[#8A73B9] font-medium">
                  Interrupted Request Visual State
                </span>
              </div>
            </div>

            {/* Scenario 4 */}
            <div className="bg-[#F1F1EC] p-6 border border-[#8A73B9]/20 space-y-4">
              <span className="font-mono text-xs text-[#8A73B9] font-bold block">SCENARIO 04 / UNAVAILABLE CONTENT</span>
              <div className="space-y-1 text-xs sm:text-sm">
                <p><strong>Listener:</strong> "Play that episode."</p>
                <p className="text-[#583A89]"><strong>Response:</strong> "That episode isn’t currently available. I can play the next episode from the same show."</p>
              </div>
              {/* Code Comment: Unavailable Content Edge Case Media Container */}
              <div
                id="podify-edge-case-unavailable-slot"
                className="w-full h-36 bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-4 text-center"
              >
                <Volume2 className="w-5 h-5 text-[#8A73B9] mb-1" />
                <span className="font-sans text-[11px] text-[#8A73B9] font-medium">
                  Unavailable Content Visual State
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 11 — VOICE + SCREEN EXPERIENCE */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              11 / MULTIMODAL EXPERIENCE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Voice initiates the action. The screen makes the result inspectable.
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            The concept treats voice and screen as complementary rather than duplicated interfaces. Spoken responses communicate the immediate outcome, while the visual surface preserves episode details, alternatives, progress, and touch controls.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
            {/* Smart Display Concept Slot */}
            {/* Code Comment: Smart display concept media container slot */}
            <div
              id="podify-smart-display-concept-slot"
              className="w-full aspect-[16/10] bg-[#14121A] border border-[#8A73B9]/40 flex flex-col items-center justify-center p-6 text-center"
            >
              <Monitor className="w-8 h-8 text-[#8A73B9] mb-2" />
              <span className="font-sans text-xs font-semibold text-white uppercase tracking-wider">
                Voice + Screen Smart Display Concept
              </span>
            </div>

            <div className="bg-[#F1F1EC] p-6 sm:p-8 border border-[#8A73B9]/20 space-y-4">
              <span className="font-mono text-xs text-[#8A73B9] font-bold block">MULTIMODAL PAIRING</span>
              <div className="space-y-2 border-b border-[#8A73B9]/20 pb-3">
                <span className="font-sans text-xs text-[#583A89] font-bold uppercase tracking-wider block">Spoken Audio:</span>
                <p className="font-sans text-sm italic font-medium text-[#111111]">
                  "I found a 28-minute episode. Want to play it?"
                </p>
              </div>
              <div className="space-y-2">
                <span className="font-sans text-xs text-[#583A89] font-bold uppercase tracking-wider block">Displayed Surface:</span>
                <p className="font-sans text-xs text-[#686868] leading-relaxed">
                  Cover art, title, source, duration, alternatives, and Play action.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 12 — SAMPLE UTTERANCE SET */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              12 / LANGUAGE VARIATIONS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Accounting for different ways listeners may express the same intent.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-2">
            
            {/* PLAY */}
            <div className="bg-[#F1F1EC] p-5 border border-[#8A73B9]/20 space-y-3">
              <span className="font-mono text-xs text-[#8A73B9] font-bold block">PLAY</span>
              <ul className="space-y-2 font-sans text-xs text-[#111111]">
                <li className="italic">"Play the newest episode."</li>
                <li className="italic">"Start the latest one."</li>
                <li className="italic">"Put on today’s episode."</li>
                <li className="italic">"Play the episode at the top."</li>
              </ul>
            </div>

            {/* RESUME */}
            <div className="bg-[#F1F1EC] p-5 border border-[#8A73B9]/20 space-y-3">
              <span className="font-mono text-xs text-[#8A73B9] font-bold block">RESUME</span>
              <ul className="space-y-2 font-sans text-xs text-[#111111]">
                <li className="italic">"Continue where I stopped."</li>
                <li className="italic">"Resume my podcast."</li>
                <li className="italic">"Keep playing the episode from yesterday."</li>
                <li className="italic">"Go back to what I was listening to."</li>
              </ul>
            </div>

            {/* REFINE */}
            <div className="bg-[#F1F1EC] p-5 border border-[#8A73B9]/20 space-y-3">
              <span className="font-mono text-xs text-[#8A73B9] font-bold block">REFINE</span>
              <ul className="space-y-2 font-sans text-xs text-[#111111]">
                <li className="italic">"Something shorter."</li>
                <li className="italic">"Show me a newer one."</li>
                <li className="italic">"Not that host."</li>
                <li className="italic">"Give me another option."</li>
              </ul>
            </div>

            {/* SAVE */}
            <div className="bg-[#F1F1EC] p-5 border border-[#8A73B9]/20 space-y-3">
              <span className="font-mono text-xs text-[#8A73B9] font-bold block">SAVE</span>
              <ul className="space-y-2 font-sans text-xs text-[#111111]">
                <li className="italic">"Save this."</li>
                <li className="italic">"Add it to my episodes."</li>
                <li className="italic">"Keep this for later."</li>
                <li className="italic">"Bookmark this episode."</li>
              </ul>
            </div>

          </div>

          <p className="font-sans text-xs text-[#686868] italic">
            These utterance variations document conceptual language coverage; they are not production training data.
          </p>
        </section>

        {/* SECTION 13 — VISUAL SYSTEM */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              13 / VISUAL SYSTEM
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              A recognizable system across discovery and playback.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pt-2">
            {/* Logo Slot */}
            {/* Code Comment: Podify logo media container slot */}
            <div
              id="podify-logo-slot"
              className="w-full aspect-square max-h-[260px] bg-[#14121A] border border-[#8A73B9]/30 flex flex-col items-center justify-center p-6 text-center"
            >
              <Sparkles className="w-8 h-8 text-[#8A73B9] mb-2" />
              <span className="font-sans text-xs font-semibold text-white uppercase tracking-wider">
                Podify Brand Mark &amp; Identity
              </span>
            </div>

            {/* System Decisions List */}
            <div className="md:col-span-2 bg-[#F1F1EC] p-6 sm:p-8 border border-[#8A73B9]/20 space-y-4">
              <span className="font-mono text-xs text-[#8A73B9] font-bold block">DESIGN SYSTEM DECISIONS</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs text-[#111111]">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#583A89] mt-1 shrink-0" />
                  <span><strong>Deep purple</strong> for primary actions and navigation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500 mt-1 shrink-0" />
                  <span><strong>Pink accent</strong> for dates, emphasis, and active progress</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#583A89] mt-1 shrink-0" />
                  <span><strong>White space</strong> for separating dense podcast artwork</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#583A89] mt-1 shrink-0" />
                  <span><strong>Large cover art</strong> for immediate visual recognition</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#583A89] mt-1 shrink-0" />
                  <span><strong>Persistent playback controls</strong> accessible across views</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#583A89] mt-1 shrink-0" />
                  <span><strong>Consistent rounded interface components</strong> for modern readability</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 14 — OUTCOME AND REFLECTION */}
        <section className="space-y-8 border-t border-[#8A73B9]/20 pt-12">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8A73B9] font-bold block">
              14 / REFLECTION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Expanding from interface states to conversational behavior.
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            <p>
              The original Podify project strengthened my ability to organize a content-rich mobile experience around discovery, saved content, and playback continuity. Extending it into a voice-and-screen concept shifted my focus from designing individual screens to designing system responses across time.
            </p>
            <p>
              The most important challenge was deciding what the listener needed to hear, what could remain visible, and how the system should recover when a request was incomplete or corrected. The extension reinforced that a multimodal experience is not one interface repeated twice: each modality should contribute the information it communicates best.
            </p>
          </div>

          {/* What I Would Do Next */}
          <div className="bg-[#F1F1EC] p-6 sm:p-8 border-l-4 border-[#583A89] space-y-4">
            <span className="font-mono text-xs text-[#8A73B9] font-bold uppercase tracking-wider block">
              WHAT I WOULD DO NEXT
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs text-[#111111]">
              <li className="flex items-start space-x-2">
                <span className="text-[#8A73B9] font-bold">→</span>
                <span>Conduct task-based research with podcast listeners in hands-busy contexts</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#8A73B9] font-bold">→</span>
                <span>Evaluate response cadence and comprehension through moderated voice sessions</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#8A73B9] font-bold">→</span>
                <span>Test ambiguous and interrupted requests</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#8A73B9] font-bold">→</span>
                <span>Validate terminology across mobile and smart-display experiences</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#8A73B9] font-bold">→</span>
                <span>Work with engineering to assess latency, catalog, and context-retention constraints</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#8A73B9] font-bold">→</span>
                <span>Refine dialog variants using findings from real interactions</span>
              </li>
            </ul>
          </div>
        </section>

        {/* BOTTOM NAVIGATION FOOTER */}
        <footer className="border-t border-[#8A73B9]/20 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={handlePreviousProject}
            className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#686868] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>← PREVIOUS: COOKMATE</span>
          </button>

          <button
            onClick={handleBackToMoreProjects}
            className="text-xs uppercase tracking-[0.2em] font-semibold text-[#686868] hover:text-[#111111] transition-colors cursor-pointer"
          >
            BACK TO MORE PROJECTS
          </button>

          <button
            onClick={handleNextProject}
            className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-bold text-[#8A73B9] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <span>NEXT PROJECT: VISUAL NARRATIVES</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </footer>

      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxItems}
        currentIndex={lightboxIndex}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </motion.article>
  );
}
