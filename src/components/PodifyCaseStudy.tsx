import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Maximize2, Headphones, Play, Bookmark, Search, Star, ListFilter, Sparkles, Layers, Sliders } from "lucide-react";
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
      title: "Podify User Flow Architecture",
      caption: "Mapping user routes from initial splash discovery to episode playback, playlist organization, and rating reviews.",
      customRender: (
        <div className="w-full bg-[#FAFAF7] text-[#111111] p-6 sm:p-8 rounded-lg border border-[#D9D9D4] space-y-6">
          <div className="border-b border-[#D9D9D4] pb-3">
            <span className="font-mono text-xs text-[#8A73B9] uppercase tracking-widest font-bold">FLOW ARTIFACT 01</span>
            <h3 className="font-serif text-2xl font-bold text-[#111111]">Podify Architectural Navigation Map</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { stage: "Discovery", steps: "Splash → Category Selection → Trending Feed" },
              { stage: "Navigation", steps: "Home → Search & Filter → Show Details" },
              { stage: "Organization", steps: "Save Episode → Custom Queue → Downloads" },
              { stage: "Listening", steps: "Playback Player → Speed Control → Ratings" },
            ].map((f, i) => (
              <div key={i} className="bg-[#F1F1EC] p-4 rounded border border-[#D9D9D4] space-y-2">
                <span className="font-mono text-xs text-[#8A73B9] font-bold block">{f.stage}</span>
                <p className="font-sans text-xs text-[#111111] font-medium">{f.steps}</p>
              </div>
            ))}
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
      className="min-h-screen bg-[#FAFAF7] text-[#111111] pt-28 sm:pt-32 pb-32 px-5 sm:px-8 md:px-12 relative z-30 font-sans selection:bg-[#111111] selection:text-[#FAFAF7]"
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

        {/* HERO SECTION */}
        <header className="space-y-6">
          <div className="space-y-3">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#8A73B9] font-bold block">
              MOBILE APP · UX/UI DESIGN
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111]">
              Podify
            </h1>
            <p className="font-serif text-xl sm:text-2xl text-[#686868] font-normal leading-snug max-w-3xl pt-1">
              A more focused way to discover, organize, and enjoy podcasts.
            </p>
          </div>

          <p className="font-sans text-base sm:text-lg text-[#111111] font-light leading-relaxed max-w-3xl border-l-2 border-[#8A73B9] pl-4 py-1 bg-[#F1F1EC]/60 rounded-r">
            The project grew from reviewing podcast experiences within music applications and identifying opportunities to improve navigation, content discovery, and accessibility.
          </p>
        </header>

        {/* METADATA BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#F1F1EC] p-6 sm:p-8 rounded-xl border border-[#D9D9D4]">
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">FOCUS</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">UX/UI Design</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">PLATFORM</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">Mobile App (iOS/Android)</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">ROLE</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">Product Designer</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">METHODS</span>
            <p className="font-sans text-xs font-medium text-[#111111]">App Store Review Audit · User Flows · Wireframing · UI Design</p>
          </div>
        </div>

        {/* 01 / DESIGN OPPORTUNITY */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              01 / DESIGN OPPORTUNITY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Identifying podcast navigation friction
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            Many popular audio applications embed podcasts alongside music streaming, resulting in complex navigation hierarchies and cluttered interfaces. Podify addresses this by dedicating a clean, specialized workspace solely to podcast exploration, episode queueing, and tailored category discovery.
          </p>
        </section>

        {/* 02 / APPROACH */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              02 / APPROACH
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Core experience goals
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#F1F1EC] p-6 rounded-xl border border-[#D9D9D4] space-y-2">
              <span className="font-mono text-xs text-[#8A73B9] font-bold">01</span>
              <h4 className="font-serif text-lg font-bold text-[#111111]">Improving User Experience</h4>
              <p className="font-sans text-xs text-[#686868] leading-relaxed">
                Streamlining episode discovery, saving shows, and organizing listening queues without unnecessary menus.
              </p>
            </div>
            <div className="bg-[#F1F1EC] p-6 rounded-xl border border-[#D9D9D4] space-y-2">
              <span className="font-mono text-xs text-[#8A73B9] font-bold">02</span>
              <h4 className="font-serif text-lg font-bold text-[#111111]">Modern Interface</h4>
              <p className="font-sans text-xs text-[#686868] leading-relaxed">
                Applying spacious typography, intuitive visual hierarchy, and high-contrast controls for effortless readability.
              </p>
            </div>
            <div className="bg-[#F1F1EC] p-6 rounded-xl border border-[#D9D9D4] space-y-2">
              <span className="font-mono text-xs text-[#8A73B9] font-bold">03</span>
              <h4 className="font-serif text-lg font-bold text-[#111111]">Responding to Pain Points</h4>
              <p className="font-sans text-xs text-[#686868] leading-relaxed">
                Directly addressing user complaints regarding lost progress, difficult search filtering, and cumbersome episode management.
              </p>
            </div>
          </div>
        </section>

        {/* 03 / RESEARCH */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              03 / RESEARCH
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              App-store feedback & audience conversations
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            The research process involved reviewing public user feedback across major app-store reviews and speaking directly with active podcast listeners. Common themes included frustration with buried saved shows, difficulty filtering search results by episode duration, and clunky playback speed adjustments.
          </p>
        </section>

        {/* 04 / USER FLOW */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
                04 / USER FLOW
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                Information architecture and app flow
              </h2>
            </div>
            <button
              onClick={() => {
                setLightboxIndex(0);
                setLightboxOpen(true);
              }}
              className="inline-flex items-center space-x-2 text-xs font-bold text-[#8A73B9] hover:underline cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Enlarge Flow Diagram</span>
            </button>
          </div>

          <div
            onClick={() => {
              setLightboxIndex(0);
              setLightboxOpen(true);
            }}
            className="bg-[#F1F1EC] p-6 rounded-xl border border-[#D9D9D4] cursor-pointer hover:border-[#8A73B9] transition-colors group"
          >
            <p className="font-sans text-xs text-[#686868] leading-relaxed mb-4">
              Mapping a clean path from initial onboarding and category preferences to home feed exploration, episode selection, and playback controls.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-[#8A73B9]">
              <span className="bg-[#FAFAF7] px-3 py-1.5 rounded border border-[#D9D9D4]">1. Onboarding</span>
              <span>→</span>
              <span className="bg-[#FAFAF7] px-3 py-1.5 rounded border border-[#D9D9D4]">2. Home Feed</span>
              <span>→</span>
              <span className="bg-[#FAFAF7] px-3 py-1.5 rounded border border-[#D9D9D4]">3. Show Page</span>
              <span>→</span>
              <span className="bg-[#FAFAF7] px-3 py-1.5 rounded border border-[#D9D9D4]">4. Player</span>
            </div>
          </div>
        </section>

        {/* 05 / WIREFRAMING */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              05 / WIREFRAMING
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Pencil-and-paper wireframes to digital explorations
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            Initial pencil-and-paper sketches allowed rapid iteration over player controls, queue layouts, and category tag positioning before transitioning into digital high-fidelity mockups.
          </p>
        </section>

        {/* 06 / INTERFACE DESIGN */}
        <section className="space-y-8 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              06 / INTERFACE DESIGN
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Art-directed interface sequence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { num: "01", name: "Login & Onboarding", desc: "Minimalist authentication with fast social login options." },
              { num: "02", name: "Splash & Category Discovery", desc: "Interactive topic tags for instant preference matching." },
              { num: "03", name: "Home Feed", desc: "Personalized daily podcast recommendations and continue-listening bar." },
              { num: "04", name: "Saved Podcasts", desc: "Organized library with offline downloads and custom playlists." },
              { num: "05", name: "Search & Filtering", desc: "Granular duration, language, and topic filter controls." },
              { num: "06", name: "Trending Shows", desc: "Curated chart rankings across popular categories." },
              { num: "07", name: "Podcast Details", desc: "Comprehensive episode logs, host bio, and trailer previews." },
              { num: "08", name: "Playback Experience", desc: "Full-screen player with speed toggles, sleep timer, and transcript view." },
              { num: "09", name: "Ratings & Reviews", desc: "Transparent listener ratings and community reviews." },
            ].map((screen) => (
              <div key={screen.num} className="bg-[#111111] text-white p-5 rounded-xl border border-neutral-800 space-y-2">
                <span className="font-mono text-xs text-[#8A73B9] font-bold">{screen.num}</span>
                <h4 className="font-serif text-base font-bold">{screen.name}</h4>
                <p className="font-sans text-xs text-neutral-400 font-light">{screen.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 07 / VISUAL IDENTITY */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              07 / VISUAL IDENTITY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Brand identity & logo exploration
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            The Podify logo mark merges soundwave forms with an enclosed capsule silhouette, symbolizing focused audio listening. The deep violet color palette balances calm focus with modern digital aesthetics.
          </p>
        </section>

        {/* 08 / FINAL CONCEPT */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              08 / FINAL CONCEPT
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Centralized podcast experience
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            Podify establishes a dedicated podcast environment that harmonizes discovery, playlist management, personalized recommendations, and listening controls into one clear, focused application.
          </p>
        </section>

        {/* BOTTOM NAVIGATION */}
        <footer className="border-t border-[#D9D9D4] pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
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
