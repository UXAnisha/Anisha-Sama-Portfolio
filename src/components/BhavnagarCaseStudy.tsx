import React, { useEffect } from "react";
import { ArrowLeft, ExternalLink, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import heroShowcaseImg from "../assets/images/regenerated_image_1784761424040.png";

interface BhavnagarCaseStudyProps {
  onBackToProjects?: () => void;
  onBack?: () => void;
}

const navAnchors = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "understanding-content", label: "Content" },
  { id: "information-architecture", label: "Architecture" },
  { id: "key-visitor-journeys", label: "Journeys" },
  { id: "visual-language", label: "Design" },
  { id: "live-outcome", label: "Outcome" },
];

export default function BhavnagarCaseStudy({ onBackToProjects, onBack }: BhavnagarCaseStudyProps) {
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

  const handleNextProject = () => {
    navigate("/projects/pineapple-health");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#FAFAF7] text-[#111111] pt-28 md:pt-32 pb-32 px-5 sm:px-8 md:px-12 relative z-30 font-sans selection:bg-[#111111] selection:text-[#FAFAF7]"
    >
      <div className="max-w-[1200px] mx-auto space-y-20 md:space-y-28">

        {/* TOP HEADER NAVIGATION & MINIMAL DESKTOP SECTION NAVIGATOR */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D9D9D4] pb-5">
            <button
              onClick={handleBackToProjects}
              className="group inline-flex items-center space-x-2 font-sans text-xs uppercase tracking-[0.2em] text-[#686868] hover:text-[#111111] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>← BACK TO CURATED PROJECTS</span>
            </button>

            {/* MINIMAL DESKTOP SECTION NAVIGATOR */}
            <nav className="hidden lg:flex items-center space-x-1 sm:space-x-2 bg-[#F1F1EC] p-1.5 rounded-full border border-[#D9D9D4]">
              {navAnchors.map((anchor) => (
                <button
                  key={anchor.id}
                  onClick={() => scrollToSection(anchor.id)}
                  className="px-3.5 py-1.5 rounded-full font-sans text-[11px] uppercase tracking-[0.12em] text-[#686868] hover:text-[#111111] hover:bg-[#FAFAF7] transition-all cursor-pointer font-medium"
                >
                  {anchor.label}
                </button>
              ))}
            </nav>
          </div>

          {/* MOBILE / TABLET HORIZONTAL SECTION NAVIGATOR */}
          <div className="lg:hidden overflow-x-auto no-scrollbar flex items-center space-x-2 pb-2">
            {navAnchors.map((anchor) => (
              <button
                key={anchor.id}
                onClick={() => scrollToSection(anchor.id)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#F1F1EC] border border-[#D9D9D4] font-sans text-[10px] uppercase tracking-[0.15em] text-[#686868] active:text-[#111111] font-semibold"
              >
                {anchor.label}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 01 — PROJECT HERO */}
        <header className="space-y-10">
          <div className="space-y-6 max-w-4xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              01 / LIVE CLIENT PROJECT
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#111111] leading-[1.06]">
              Bhavnagar Heritage
            </h1>

            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#111111]/90 font-light leading-snug pt-2">
              Structuring Bhavnagar’s cultural knowledge into an accessible public-facing website.
            </p>

            <p className="font-sans text-base sm:text-lg text-[#686868] font-normal leading-relaxed max-w-3xl pt-2">
              Designed and built from the ground up for INTACH Bhavnagar, the platform brings the city’s landmarks, traditional crafts, conservation initiatives, archives, educational resources, and cultural stories into one connected digital experience.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="https://www.bhavnagarheritage.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-[#111111] hover:bg-[#333333] text-[#F7F7F2] font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              >
                <span>VISIT LIVE WEBSITE ↗</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#858585]" />
              </a>

              <button
                onClick={() => scrollToSection("overview")}
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-transparent hover:bg-[#F1F1EC] text-[#111111] border border-[#D9D9D4] font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-md cursor-pointer"
              >
                <span>EXPLORE THE PROCESS ↓</span>
              </button>
            </div>
          </div>

          {/* CHATGPT AUTHENTIC HERO SHOWCASE IMAGE */}
          <div className="pt-4">
            <div className="rounded-2xl border border-[#262626] bg-[#0A0A0A] p-2 sm:p-4 md:p-6 shadow-2xl overflow-hidden group">
              <img
                src={heroShowcaseImg}
                alt="Bhavnagar Heritage authentic website homepage designed for INTACH Bhavnagar"
                referrerPolicy="no-referrer"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                className="w-full h-auto max-h-[780px] object-contain mx-auto rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>
          </div>
        </header>

        {/* SECTION 02 — PROJECT SNAPSHOT */}
        <section className="border-y border-[#D9D9D4] py-10 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Snapshot metadata items */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">
                  Client
                </span>
                <p className="font-sans text-sm md:text-base text-[#111111] font-medium">
                  INTACH Bhavnagar
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">
                  Role
                </span>
                <p className="font-sans text-sm md:text-base text-[#111111] font-medium">
                  Sole UX/UI Designer &amp; Website Builder
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">
                  Scope
                </span>
                <p className="font-sans text-xs sm:text-sm text-[#111111] font-medium leading-relaxed">
                  Information Architecture, Content Strategy, UI Design, Responsive Web Design
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">
                  Platform / Status
                </span>
                <p className="font-sans text-sm text-[#111111] font-medium">
                  Wix · Live Client Website
                </p>
              </div>
            </div>

            {/* Impact Statement */}
            <div className="lg:col-span-4 lg:border-l lg:border-[#D9D9D4] lg:pl-8 pt-6 lg:pt-0 border-t lg:border-t-0 border-[#D9D9D4] flex items-center justify-start lg:justify-center">
              <div>
                <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#111111] leading-none block">
                  1,400+
                </span>
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#858585] font-bold mt-2 block">
                  SUBSCRIBERS
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03 — OVERVIEW */}
        <section id="overview" className="space-y-10 scroll-mt-28">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              02 / OVERVIEW
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Bringing Bhavnagar’s cultural legacy into one connected digital experience.
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl font-sans text-base sm:text-lg text-[#686868] leading-relaxed">
            <p>
              Bhavnagar Heritage is a public-facing cultural platform that brings together built heritage, traditional crafts, archival material, conservation initiatives, educational resources, community stories, magazine editions, and opportunities for public participation.
            </p>
            <p>
              As the sole designer and website builder, I led the experience from content organization and information architecture through interface design, responsive implementation, stakeholder review, and launch. The platform was designed to support both focused tasks—such as finding a landmark or magazine edition—and open-ended exploration of Bhavnagar’s wider cultural identity.
            </p>
          </div>

          {/* At a Glance Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 md:p-8 bg-[#F1F1EC] border border-[#D9D9D4] rounded-lg space-y-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">
                THE NEED
              </span>
              <p className="font-sans text-sm sm:text-base text-[#111111] font-medium leading-relaxed">
                Bring a large and varied body of heritage information into one understandable public platform.
              </p>
            </div>

            <div className="p-6 md:p-8 bg-[#F1F1EC] border border-[#D9D9D4] rounded-lg space-y-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">
                THE RESPONSE
              </span>
              <p className="font-sans text-sm sm:text-base text-[#111111] font-medium leading-relaxed">
                Create a scalable content architecture organized around Protect, Preserve, and Promote.
              </p>
            </div>

            <div className="p-6 md:p-8 bg-[#F1F1EC] border border-[#D9D9D4] rounded-lg space-y-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">
                THE OUTCOME
              </span>
              <p className="font-sans text-sm sm:text-base text-[#111111] font-medium leading-relaxed">
                A live, expanding cultural platform serving more than 1,400 subscribers.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 04 — THE CHALLENGE */}
        <section id="challenge" className="space-y-10 scroll-mt-28">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              03 / THE CHALLENGE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Preserving the depth of the material without overwhelming the visitor.
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl font-sans text-base sm:text-lg text-[#686868] leading-relaxed">
            <p>
              Bhavnagar’s heritage extends across architecture, royal history, public institutions, traditional crafts, archives, conservation work, education, community memories, publications, and physical locations. Each content type required a different form of presentation, yet the overall experience needed to feel connected and understandable.
            </p>
            <p>
              The design challenge was not simply to display historical information. It was to create meaningful relationships between places, stories, preservation activities, educational resources, and opportunities for participation.
            </p>
          </div>

          {/* Large Pull Quote */}
          <div className="p-8 sm:p-10 bg-[#F1F1EC] border-l-4 border-[#111111] rounded-r-lg">
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-[#111111] leading-snug italic">
              “How might Bhavnagar’s varied cultural knowledge be organized into an experience that is understandable, discoverable, and meaningful to the public?”
            </blockquote>
          </div>

          {/* 5 Challenge Points */}
          <div className="space-y-4 pt-2">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#858585] font-bold block">
              KEY DESIGN CHALLENGES
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Organizing a large and continually expanding content collection",
                "Creating useful entry points for visitors with different interests",
                "Balancing historical depth with readable digital content",
                "Connecting online stories with physical heritage locations",
                "Building a structure that could continue growing after launch",
              ].map((point, i) => (
                <div key={i} className="p-5 bg-[#FAFAF7] border border-[#D9D9D4] rounded-md flex items-start space-x-3">
                  <span className="font-mono text-xs text-[#858585] font-bold pt-0.5">0{i + 1}</span>
                  <p className="font-sans text-sm text-[#111111] font-medium leading-normal">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 05 — INTENDED AUDIENCES */}
        <section className="space-y-10 scroll-mt-28">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              04 / AUDIENCE NEEDS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Designing for different ways of discovering heritage.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#FAFAF7] border border-[#D9D9D4] rounded-lg space-y-3">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#111111] font-bold block border-b border-[#D9D9D4] pb-2">
                LOCAL RESIDENTS
              </span>
              <p className="font-sans text-sm text-[#686868] leading-relaxed">
                Rediscover familiar places, community stories, events, and conservation initiatives.
              </p>
            </div>

            <div className="p-6 bg-[#FAFAF7] border border-[#D9D9D4] rounded-lg space-y-3">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#111111] font-bold block border-b border-[#D9D9D4] pb-2">
                VISITORS AND TOURISTS
              </span>
              <p className="font-sans text-sm text-[#686868] leading-relaxed">
                Learn about landmarks, understand their significance, and access heritage-walk and location information.
              </p>
            </div>

            <div className="p-6 bg-[#FAFAF7] border border-[#D9D9D4] rounded-lg space-y-3">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#111111] font-bold block border-b border-[#D9D9D4] pb-2">
                STUDENTS AND RESEARCHERS
              </span>
              <p className="font-sans text-sm text-[#686868] leading-relaxed">
                Explore documented sites, archival resources, educational opportunities, and detailed historical information.
              </p>
            </div>

            <div className="p-6 bg-[#FAFAF7] border border-[#D9D9D4] rounded-lg space-y-3">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#111111] font-bold block border-b border-[#D9D9D4] pb-2">
                HERITAGE ENTHUSIASTS
              </span>
              <p className="font-sans text-sm text-[#686868] leading-relaxed">
                Discover architecture, traditional crafts, cultural narratives, publications, and preservation work.
              </p>
            </div>
          </div>

          <p className="font-sans text-xs text-[#858585] italic">
            “Intended audiences based on the platform’s content and stakeholder requirements—not formal research personas.”
          </p>
        </section>

        {/* SECTION 06 — CONTENT AND STAKEHOLDER DISCOVERY */}
        <section id="understanding-content" className="space-y-10 scroll-mt-28">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              05 / UNDERSTANDING THE CONTENT
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              The experience began with understanding the material.
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl font-sans text-base sm:text-lg text-[#686868] leading-relaxed">
            <p>
              The platform needed to support very different forms of content, including landmark documentation, Gujarati and English landmark names, traditional crafts, archival books, conservation projects, educational resources, historical stories, community initiatives, magazine editions, heritage routes, local businesses, and opportunities to volunteer.
            </p>
            <p>
              I reviewed and organized this material according to its purpose, relationship to other content, and the way visitors might expect to discover it. The structure evolved through feedback from the Convener of INTACH Bhavnagar and members of Bhavnagar’s erstwhile royal family.
            </p>
          </div>

          {/* Content Inventory Grid */}
          <div className="space-y-4 pt-2">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#858585] font-bold block">
              CONTENT INVENTORY SPECTRUM
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                "Built Heritage",
                "Traditional Crafts",
                "Historic Records",
                "Conservation Projects",
                "Educational Resources",
                "History and Stories",
                "Community Initiatives",
                "Magazine Editions",
                "Heritage Walks",
                "Participation & Volunteering",
                "Local Bazaar",
                "Contact & Subscription",
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-[#F1F1EC] border border-[#D9D9D4] rounded text-center">
                  <span className="font-sans text-xs font-medium text-[#111111] block">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PROCESS VISUAL 01 — CONTENT CLUSTERING DIAGRAM */}
          <div className="p-6 md:p-10 bg-[#FAFAF7] border border-[#D9D9D4] rounded-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D9D9D4] pb-4 gap-2">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">
                  PROCESS VISUAL 01
                </span>
                <h3 className="font-serif text-xl font-normal text-[#111111]">Content Affinity Mapping</h3>
              </div>
              <span className="font-sans text-xs text-[#858585] italic">
                Raw Content → 6 Core Clusters → Architectural Pillars
              </span>
            </div>

            {/* Clusters Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-2">
              <div className="p-4 bg-[#F1F1EC] border border-[#D9D9D4] rounded space-y-2">
                <span className="font-sans text-xs uppercase tracking-wider font-bold text-[#111111] block">PLACES</span>
                <p className="font-sans text-xs text-[#686868] leading-normal">
                  Palaces, schools, libraries, temples, civic buildings, gardens and heritage landmarks
                </p>
              </div>

              <div className="p-4 bg-[#F1F1EC] border border-[#D9D9D4] rounded space-y-2">
                <span className="font-sans text-xs uppercase tracking-wider font-bold text-[#111111] block">PRACTICES</span>
                <p className="font-sans text-xs text-[#686868] leading-normal">
                  Metalwork, embroidery, beadwork and traditional craftsmanship
                </p>
              </div>

              <div className="p-4 bg-[#F1F1EC] border border-[#D9D9D4] rounded space-y-2">
                <span className="font-sans text-xs uppercase tracking-wider font-bold text-[#111111] block">RECORDS</span>
                <p className="font-sans text-xs text-[#686868] leading-normal">
                  Archives, historic books, documents and research material
                </p>
              </div>

              <div className="p-4 bg-[#F1F1EC] border border-[#D9D9D4] rounded space-y-2">
                <span className="font-sans text-xs uppercase tracking-wider font-bold text-[#111111] block">PRESERVATION</span>
                <p className="font-sans text-xs text-[#686868] leading-normal">
                  Conservation projects and heritage education
                </p>
              </div>

              <div className="p-4 bg-[#F1F1EC] border border-[#D9D9D4] rounded space-y-2">
                <span className="font-sans text-xs uppercase tracking-wider font-bold text-[#111111] block">STORIES</span>
                <p className="font-sans text-xs text-[#686868] leading-normal">
                  History Bytes, community narratives, events and cultural memories
                </p>
              </div>

              <div className="p-4 bg-[#F1F1EC] border border-[#D9D9D4] rounded space-y-2">
                <span className="font-sans text-xs uppercase tracking-wider font-bold text-[#111111] block">PARTICIPATION</span>
                <p className="font-sans text-xs text-[#686868] leading-normal">
                  Heritage walks, guides, volunteering, magazine subscription and local businesses
                </p>
              </div>
            </div>

            {/* Connecting Output Pillars */}
            <div className="pt-4 border-t border-[#D9D9D4] flex flex-wrap items-center justify-between gap-4">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#858585] font-bold">
                INFORMED FRAMEWORK PILLARS:
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-[#111111] text-[#F7F7F2] font-sans text-xs font-bold uppercase rounded">PROTECT</span>
                <span className="px-3 py-1 bg-[#111111] text-[#F7F7F2] font-sans text-xs font-bold uppercase rounded">PRESERVE</span>
                <span className="px-3 py-1 bg-[#111111] text-[#F7F7F2] font-sans text-xs font-bold uppercase rounded">PROMOTE</span>
                <span className="px-3 py-1 bg-[#F1F1EC] border border-[#D9D9D4] text-[#111111] font-sans text-xs font-bold uppercase rounded">SUPPORTING ACTIONS</span>
              </div>
            </div>

            <p className="font-sans text-xs text-[#858585] italic border-t border-[#D9D9D4] pt-4">
              “Retrospective process documentation based on the launched website.”
            </p>
          </div>
        </section>

        {/* SECTION 07 — INFORMATION ARCHITECTURE */}
        <section id="information-architecture" className="space-y-10 scroll-mt-28">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              06 / INFORMATION ARCHITECTURE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Turning the organization’s mission into the navigation.
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl font-sans text-base sm:text-lg text-[#686868] leading-relaxed">
            <p>
              The central information-architecture decision was to organize the primary experience around three meaningful actions: Protect, Preserve, and Promote. This reduced a long list of unrelated subjects into three memorable pathways while making the organization’s heritage mission visible through the navigation itself.
            </p>
          </div>

          {/* 3 Columns Framework */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 md:p-8 bg-[#F1F1EC] border border-[#D9D9D4] rounded-lg space-y-4">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-black text-[#111111] block border-b border-[#D9D9D4] pb-3">
                PROTECT
              </span>
              <p className="font-sans text-xs text-[#858585] font-medium">
                What makes Bhavnagar’s heritage significant.
              </p>
              <ul className="space-y-2 pt-2">
                <li className="font-sans text-sm font-semibold text-[#111111] flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                  <span>Heritage Sites</span>
                </li>
                <li className="font-sans text-sm font-semibold text-[#111111] flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                  <span>Heritage Crafts</span>
                </li>
              </ul>
            </div>

            <div className="p-6 md:p-8 bg-[#F1F1EC] border border-[#D9D9D4] rounded-lg space-y-4">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-black text-[#111111] block border-b border-[#D9D9D4] pb-3">
                PRESERVE
              </span>
              <p className="font-sans text-xs text-[#858585] font-medium">
                How heritage is documented, conserved, and passed forward.
              </p>
              <ul className="space-y-2 pt-2">
                <li className="font-sans text-sm font-semibold text-[#111111] flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                  <span>Archives</span>
                </li>
                <li className="font-sans text-sm font-semibold text-[#111111] flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                  <span>Conservation</span>
                </li>
                <li className="font-sans text-sm font-semibold text-[#111111] flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                  <span>Education</span>
                </li>
              </ul>
            </div>

            <div className="p-6 md:p-8 bg-[#F1F1EC] border border-[#D9D9D4] rounded-lg space-y-4">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-black text-[#111111] block border-b border-[#D9D9D4] pb-3">
                PROMOTE
              </span>
              <p className="font-sans text-xs text-[#858585] font-medium">
                How stories, people, and publications keep heritage visible.
              </p>
              <ul className="space-y-2 pt-2">
                <li className="font-sans text-sm font-semibold text-[#111111] flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                  <span>History Bytes</span>
                </li>
                <li className="font-sans text-sm font-semibold text-[#111111] flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                  <span>Community</span>
                </li>
                <li className="font-sans text-sm font-semibold text-[#111111] flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                  <span>Bhavnagar Heritage Magazine</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Supporting Actions Row */}
          <div className="p-6 bg-[#FAFAF7] border border-[#D9D9D4] rounded-lg space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#858585] font-bold block">
              SUPPORTING UTILITY &amp; PARTICIPATION PATHWAYS
            </span>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {[
                "Self-Guided Heritage Walk",
                "Shop / Bhavnagar Bazaar",
                "Get Involved",
                "Contact",
                "Subscribe",
              ].map((act, i) => (
                <span key={i} className="px-3.5 py-1.5 bg-[#F1F1EC] border border-[#D9D9D4] text-xs font-sans font-medium text-[#111111] rounded">
                  {act}
                </span>
              ))}
            </div>
          </div>

          {/* PROCESS VISUAL 02 — SITEMAP */}
          <div className="p-6 md:p-10 bg-[#FAFAF7] border border-[#D9D9D4] rounded-xl space-y-6">
            <div className="border-b border-[#D9D9D4] pb-4">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">
                PROCESS VISUAL 02
              </span>
              <h3 className="font-serif text-xl font-normal text-[#111111]">Information Architecture &amp; Top-Down Sitemap</h3>
            </div>

            {/* Sitemap Visual Tree */}
            <div className="p-6 bg-[#F1F1EC] border border-[#D9D9D4] rounded-lg overflow-x-auto no-scrollbar font-sans">
              <div className="min-w-[680px] space-y-6 text-xs text-[#111111]">
                <div className="flex justify-center">
                  <div className="px-6 py-2 bg-[#111111] text-[#F7F7F2] font-bold uppercase tracking-widest rounded shadow-sm">
                    Home
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 pt-4 border-t border-[#D9D9D4] relative">
                  <div className="p-3 bg-[#FAFAF7] border border-[#D9D9D4] rounded space-y-2">
                    <span className="font-bold uppercase tracking-wider block text-[#111111] border-b border-[#D9D9D4] pb-1">
                      Protect
                    </span>
                    <p className="text-[#686868] font-mono text-[11px]">├─ Heritage Sites</p>
                    <p className="text-[#686868] font-mono text-[11px]">└─ Heritage Crafts</p>
                  </div>

                  <div className="p-3 bg-[#FAFAF7] border border-[#D9D9D4] rounded space-y-2">
                    <span className="font-bold uppercase tracking-wider block text-[#111111] border-b border-[#D9D9D4] pb-1">
                      Preserve
                    </span>
                    <p className="text-[#686868] font-mono text-[11px]">├─ Archives</p>
                    <p className="text-[#686868] font-mono text-[11px]">├─ Conservation</p>
                    <p className="text-[#686868] font-mono text-[11px]">└─ Education</p>
                  </div>

                  <div className="p-3 bg-[#FAFAF7] border border-[#D9D9D4] rounded space-y-2">
                    <span className="font-bold uppercase tracking-wider block text-[#111111] border-b border-[#D9D9D4] pb-1">
                      Promote
                    </span>
                    <p className="text-[#686868] font-mono text-[11px]">├─ History Bytes</p>
                    <p className="text-[#686868] font-mono text-[11px]">├─ Community</p>
                    <p className="text-[#686868] font-mono text-[11px]">└─ Magazine</p>
                  </div>

                  <div className="p-3 bg-[#FAFAF7] border border-[#D9D9D4] rounded space-y-2">
                    <span className="font-bold uppercase tracking-wider block text-[#111111] border-b border-[#D9D9D4] pb-1">
                      Utilities
                    </span>
                    <p className="text-[#686868] font-mono text-[11px]">├─ Heritage Walk</p>
                    <p className="text-[#686868] font-mono text-[11px]">├─ Bazaar / Shop</p>
                    <p className="text-[#686868] font-mono text-[11px]">└─ Get Involved / Contact</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="font-sans text-xs text-[#858585] italic">
              “Retrospective process documentation based on the launched website.”
            </p>
          </div>
        </section>

        {/* SECTION 08 — KEY VISITOR JOURNEYS */}
        <section id="key-visitor-journeys" className="space-y-10 scroll-mt-28">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              07 / KEY JOURNEYS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Supporting purposeful visits and open-ended discovery.
            </h2>
          </div>

          {/* Journeys List */}
          <div className="space-y-6">
            {/* JOURNEY 01 */}
            <div className="p-6 bg-[#FAFAF7] border border-[#D9D9D4] rounded-xl space-y-4">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#111111] block">
                JOURNEY 01 — DISCOVER A LANDMARK
              </span>
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 overflow-x-auto no-scrollbar pt-2 font-sans text-xs">
                {[
                  "Explore Heritage Sites",
                  "Select a Landmark",
                  "Understand Its History",
                  "View Related Information",
                  "Access the Map or Walk",
                  "Plan a Visit",
                ].map((step, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div className="p-3 bg-[#F1F1EC] border border-[#D9D9D4] rounded font-medium text-[#111111] whitespace-nowrap">
                      {step}
                    </div>
                    {idx < arr.length - 1 && (
                      <span className="text-[#858585] hidden md:inline font-bold px-1">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* JOURNEY 02 */}
            <div className="p-6 bg-[#FAFAF7] border border-[#D9D9D4] rounded-xl space-y-4">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#111111] block">
                JOURNEY 02 — UNDERSTAND CONSERVATION WORK
              </span>
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 overflow-x-auto no-scrollbar pt-2 font-sans text-xs">
                {[
                  "Explore Conservation",
                  "Select a Project",
                  "Understand the Intervention",
                  "Discover Related Landmark",
                  "Continue Exploring Heritage",
                ].map((step, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div className="p-3 bg-[#F1F1EC] border border-[#D9D9D4] rounded font-medium text-[#111111] whitespace-nowrap">
                      {step}
                    </div>
                    {idx < arr.length - 1 && (
                      <span className="text-[#858585] hidden md:inline font-bold px-1">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* JOURNEY 03 */}
            <div className="p-6 bg-[#FAFAF7] border border-[#D9D9D4] rounded-xl space-y-4">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#111111] block">
                JOURNEY 03 — ACCESS THE MAGAZINE
              </span>
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 overflow-x-auto no-scrollbar pt-2 font-sans text-xs">
                {[
                  "Discover the Magazine",
                  "Browse Editions by Year",
                  "Preview a Sample Edition",
                  "Understand Digital & Print",
                  "Subscribe",
                ].map((step, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div className="p-3 bg-[#F1F1EC] border border-[#D9D9D4] rounded font-medium text-[#111111] whitespace-nowrap">
                      {step}
                    </div>
                    {idx < arr.length - 1 && (
                      <span className="text-[#858585] hidden md:inline font-bold px-1">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <p className="font-sans text-xs text-[#858585] italic">
            “Retrospective process documentation based on the launched website.”
          </p>
        </section>

        {/* SECTION 08 — INFORMATION STRUCTURE */}
        <section id="information-structure" className="space-y-10 scroll-mt-28">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#6B1C23] font-bold block">
              08 / INFORMATION STRUCTURE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#6B1C23] leading-tight max-w-3xl">
              Structuring the experience before styling the interface.
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl font-sans text-base sm:text-lg text-[#686868] leading-relaxed">
            <p>
              The layouts needed to support both highly visual discovery and detailed historical reading. Landmark pages introduce a place through a strong image, title, Gujarati name, and concise description before allowing visitors to explore deeper historical and architectural information.
            </p>
            <p>
              Magazine, conservation, archive, and education pages required different structures, but they needed to remain part of the same overall experience.
            </p>
          </div>

          {/* Thin maroon horizontal divider below introductory text */}
          <div className="w-full h-[1px] bg-[#6B1C23]/25" />

          {/* 3 Image Spaces Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              {/* Homepage Image */}
              <div
                id="bhavnagar-homepage-image-slot"
                className="w-full aspect-[4/3] min-h-[220px] bg-[#F1F1EC] border border-[#6B1C23] rounded-none flex items-center justify-center p-6 text-center transition-all"
                style={{ objectFit: 'contain' }}
              >
                <span className="font-sans text-xs uppercase tracking-wider text-[#6B1C23] font-medium">
                  Homepage Image
                </span>
              </div>
              <span className="font-sans text-xs text-[#111111] font-medium block pt-1">
                1. Homepage Wireframe
              </span>
            </div>

            <div className="space-y-3">
              {/* Heritage Landmark Detail Image */}
              <div
                id="bhavnagar-landmark-image-slot"
                className="w-full aspect-[4/3] min-h-[220px] bg-[#F1F1EC] border-2 border-[#6B1C23] rounded-none flex items-center justify-center p-6 text-center transition-all"
                style={{ objectFit: 'contain' }}
              >
                <span className="font-sans text-xs uppercase tracking-wider text-[#6B1C23] font-medium">
                  Heritage Landmark Detail Image
                </span>
              </div>
              <span className="font-sans text-xs text-[#111111] font-medium block pt-1">
                2. Heritage Landmark Detail Wireframe
              </span>
            </div>

            <div className="space-y-3">
              {/* Magazine Archive Image */}
              <div
                id="bhavnagar-magazine-image-slot"
                className="w-full aspect-[4/3] bg-[#F1F1EC] border border-[#6B1C23] rounded-none flex items-center justify-center p-6 text-center transition-all"
                style={{ objectFit: 'contain' }}
              >
                <span className="font-sans text-xs uppercase tracking-wider text-[#6B1C23] font-medium">
                  Magazine Archive Image
                </span>
              </div>
              <span className="font-sans text-xs text-[#111111] font-medium block pt-1">
                3. Magazine Archive Wireframe
              </span>
            </div>
          </div>

          <p className="font-sans text-xs text-[#858585] italic">
            “Reconstructed wireframes documenting the structure of the launched experience.”
          </p>
        </section>

        {/* SECTION 10 — VISUAL LANGUAGE */}
        <section id="visual-language" className="space-y-10 scroll-mt-28">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              09 / VISUAL LANGUAGE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Balancing cultural character with an approachable editorial experience.
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl font-sans text-base sm:text-lg text-[#686868] leading-relaxed">
            <p>
              The interface uses cultural imagery and editorial presentation to give historical material a strong visual presence. Clear headings, reusable content cards, structured text sections, image-led discovery, and consistent calls to action help visitors move between detailed stories and broader exploration.
            </p>
            <p>
              The original Bhavnagar Heritage colors and imagery should only appear inside authentic website screenshots and interface examples. The surrounding portfolio presentation must remain white, black, and gray.
            </p>
          </div>

          {/* Placeholders breakdown for 8 UI elements */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {[
              "Project Color Palette",
              "Heading & Body Typography",
              "Landmark Cards",
              "Magazine Cards",
              "Image Captions",
              "Buttons & Links",
              "Navigation Patterns",
              "Desktop & Mobile Grids",
            ].map((elem, idx) => (
              <div key={idx} className="p-4 bg-[#F1F1EC] border border-[#D9D9D4] rounded text-center space-y-1">
                <span className="font-sans text-xs font-bold text-[#111111] block">{elem}</span>
                <span className="font-mono text-[10px] text-[#858585] uppercase block">Visual Spec</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 11 — KEY EXPERIENCE DECISIONS */}
        <section className="space-y-12 scroll-mt-28">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              10 / DESIGN DECISIONS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Designing relationships between places, stories, and action.
            </h2>
          </div>

          <div className="space-y-8 divide-y divide-[#D9D9D4]">
            {/* DECISION 01 */}
            <div className="pt-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#858585] font-bold block">
                DECISION 01
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#111111]">
                Making the mission part of the navigation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-sans text-sm">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#858585] font-bold block">Need</span>
                  <p className="text-[#686868]">Visitors required a clear way to understand a wide range of heritage content.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#858585] font-bold block">Decision</span>
                  <p className="text-[#111111] font-medium">Organize the primary content around Protect, Preserve, and Promote.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#858585] font-bold block">Value</span>
                  <p className="text-[#686868]">The navigation communicates both the platform’s structure and INTACH Bhavnagar’s broader heritage purpose.</p>
                </div>
              </div>
            </div>

            {/* DECISION 02 */}
            <div className="pt-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#858585] font-bold block">
                DECISION 02
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#111111]">
                Connecting digital stories with physical places
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-sans text-sm">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#858585] font-bold block">Need</span>
                  <p className="text-[#686868]">Landmark content needed to support learning as well as real-world exploration.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#858585] font-bold block">Decision</span>
                  <p className="text-[#111111] font-medium">Connect landmark information with location details, mapped monuments, and self-guided heritage routes.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#858585] font-bold block">Value</span>
                  <p className="text-[#686868]">Visitors can move from discovering a place online to finding and experiencing it in person.</p>
                </div>
              </div>
            </div>

            {/* DECISION 03 */}
            <div className="pt-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#858585] font-bold block">
                DECISION 03
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#111111]">
                Connecting related forms of content
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-sans text-sm">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#858585] font-bold block">Need</span>
                  <p className="text-[#686868]">Landmarks, conservation work, history, education, and community stories are interconnected rather than isolated topics.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#858585] font-bold block">Decision</span>
                  <p className="text-[#111111] font-medium">Create pathways between related places, preservation initiatives, publications, archives, and stories.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#858585] font-bold block">Value</span>
                  <p className="text-[#686868]">Visitors can continue discovering content without repeatedly returning to the main navigation.</p>
                </div>
              </div>
            </div>

            {/* DECISION 04 */}
            <div className="pt-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#858585] font-bold block">
                DECISION 04
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#111111]">
                Balancing historical depth with visual discovery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-sans text-sm">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#858585] font-bold block">Need</span>
                  <p className="text-[#686868]">Detailed cultural information was important, but dense pages could discourage reading.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#858585] font-bold block">Decision</span>
                  <p className="text-[#111111] font-medium">Break information into understandable sections supported by headings, images, summaries, bilingual landmark names, and related-content cards.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#858585] font-bold block">Value</span>
                  <p className="text-[#686868]">The experience maintains cultural depth while remaining approachable and scannable.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 12 — FINAL EXPERIENCE */}
        <section className="space-y-10 scroll-mt-28">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              11 / FINAL EXPERIENCE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              A platform for documentation, discovery, and participation.
            </h2>
          </div>

          <div className="space-y-12">
            {/* EXPERIENCE 01 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAFAF7] border border-[#D9D9D4] rounded-xl p-6 md:p-8">
              <div className="lg:col-span-6 space-y-3">
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#858585] block">
                  EXPERIENCE 01
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#111111]">Heritage Discovery</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  The Heritage Sites collection documents palaces, schools, libraries, temples, public buildings, gardens, and other culturally significant places. Landmark cards combine imagery, English and Gujarati names, and concise descriptions to encourage exploration.
                </p>
              </div>
              <div className="lg:col-span-6">
                <div className="aspect-[16/10] bg-[#F1F1EC] border border-dashed border-[#D9D9D4] rounded flex items-center justify-center p-6 text-center">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#858585] font-bold">
                    INSERT AUTHENTIC HERITAGE SITES SCREENSHOT
                  </span>
                </div>
              </div>
            </div>

            {/* EXPERIENCE 02 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAFAF7] border border-[#D9D9D4] rounded-xl p-6 md:p-8">
              <div className="lg:col-span-6 lg:order-2 space-y-3">
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#858585] block">
                  EXPERIENCE 02
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#111111]">Conservation and Education</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  The preservation experience brings together conservation projects such as Raj Samadhi, Gandhi Smriti, Barton Library, and Gangaderi, alongside archives and heritage-education resources.
                </p>
              </div>
              <div className="lg:col-span-6 lg:order-1">
                <div className="aspect-[16/10] bg-[#F1F1EC] border border-dashed border-[#D9D9D4] rounded flex items-center justify-center p-6 text-center">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#858585] font-bold">
                    INSERT AUTHENTIC CONSERVATION OR EDUCATION SCREENSHOT
                  </span>
                </div>
              </div>
            </div>

            {/* EXPERIENCE 03 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAFAF7] border border-[#D9D9D4] rounded-xl p-6 md:p-8">
              <div className="lg:col-span-6 space-y-3">
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#858585] block">
                  EXPERIENCE 03
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#111111]">Self-Guided Heritage Walk</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  The self-guided walk connects digital landmark stories with routes, approximate distances, practical visiting information, and a marked map of important monuments.
                </p>
              </div>
              <div className="lg:col-span-6">
                <div className="bg-[#F1F1EC] border border-[#D9D9D4] rounded-lg overflow-hidden shadow-sm group">
                  <img
                    src="/bhavnagar-heritage-hero.png"
                    alt="Self-Guided Heritage Walk experience - Barton Library Bhavnagar"
                    referrerPolicy="no-referrer"
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                    className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </div>
              </div>
            </div>

            {/* EXPERIENCE 04 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAFAF7] border border-[#D9D9D4] rounded-xl p-6 md:p-8">
              <div className="lg:col-span-6 lg:order-2 space-y-3">
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#858585] block">
                  EXPERIENCE 04
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#111111]">Magazine and Community</h3>
                <p className="font-sans text-sm text-[#686868] leading-relaxed">
                  Visitors can browse magazine editions by year, access samples, learn about digital and print subscriptions, explore community stories, and participate in preserving Bhavnagar’s cultural memory.
                </p>
              </div>
              <div className="lg:col-span-6 lg:order-1">
                <div className="bg-[#F1F1EC] border border-[#D9D9D4] rounded-lg overflow-hidden shadow-sm group">
                  <img
                    src="/bhavnagar_heritage_magazine.svg"
                    alt="Bhavnagar Heritage Magazine experience screenshot"
                    referrerPolicy="no-referrer"
                    style={{ objectFit: 'contain' }}
                    className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 13 — RESPONSIVE EXPERIENCE */}
        <section id="responsive-experience" className="space-y-10 scroll-mt-28">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              12 / RESPONSIVE DESIGN
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Making content-heavy pages work across screens.
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl font-sans text-base sm:text-lg text-[#686868] leading-relaxed">
            <p>
              The responsive experience adapts navigation, imagery, content cards, and long-form reading for smaller screens. Detailed historical pages move into a single reading column, images scale without losing important content, and actions such as viewing a location, exploring a route, or accessing a magazine edition remain visible and touch-friendly.
            </p>
          </div>

          {/* Placeholders for Desktop, Tablet, Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Desktop View", "Tablet View", "Mobile View"].map((view, idx) => (
              <div key={idx} className="aspect-[4/3] bg-[#F1F1EC] border border-dashed border-[#D9D9D4] rounded-lg flex flex-col items-center justify-center p-6 text-center space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#858585] font-bold">
                  INSERT AUTHENTIC RESPONSIVE SCREENSHOT
                </span>
                <span className="font-sans text-xs text-[#111111] font-semibold">{view}</span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-[#FAFAF7] border border-[#D9D9D4] rounded-lg space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#858585] font-bold block">
              RESPONSIVE ADAPTATION HIGHLIGHTS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Simplified mobile navigation",
                "Single-column long-form reading",
                "Scalable heritage imagery",
                "Clear heading hierarchy",
                "Touch-friendly actions",
                "Visible location & subscription links",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs font-sans text-[#111111]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#111111]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 14 — STAKEHOLDER COLLABORATION */}
        <section className="space-y-10 scroll-mt-28">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              13 / COLLABORATION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Balancing public accessibility with cultural accuracy.
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl font-sans text-base sm:text-lg text-[#686868] leading-relaxed">
            <p>
              The website evolved through feedback from the Convener of INTACH Bhavnagar and members of Bhavnagar’s erstwhile royal family. Their input helped review cultural information, visual representation, content priorities, and the way Bhavnagar’s heritage was communicated to a wider audience.
            </p>
            <p>
              As the sole designer and builder, I translated this feedback into changes to content organization, page hierarchy, presentation, and website functionality.
            </p>
          </div>

          <div className="p-6 bg-[#F1F1EC] border border-[#D9D9D4] rounded-lg inline-block">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-black text-[#111111] block">
              STAKEHOLDER FEEDBACK &amp; DESIGN REVIEW
            </span>
          </div>
        </section>

        {/* SECTION 15 — LIVE OUTCOME (FULL-WIDTH DARK CONTRAST CONTAINER) */}
        <section id="live-outcome" className="scroll-mt-28 bg-[#111111] text-[#F7F7F2] -mx-5 sm:-mx-8 md:-mx-12 px-5 sm:px-8 md:px-12 py-16 md:py-20 rounded-2xl space-y-10">
          <div className="max-w-[1200px] mx-auto space-y-8">
            <div className="space-y-3">
              <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
                14 / LIVE OUTCOME
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-[#F7F7F2]">
                From heritage material to a living digital platform.
              </h2>
            </div>

            {/* Big Metrics */}
            <div className="flex flex-wrap items-center gap-10 border-y border-[#333333] py-8">
              <div>
                <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#F7F7F2] block leading-none">
                  1,400+
                </span>
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#858585] font-bold mt-2 block">
                  SUBSCRIBERS
                </span>
              </div>
              <div className="h-12 w-px bg-[#333333] hidden sm:block" />
              <div>
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F7F7F2] block leading-none">
                  LIVE
                </span>
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#858585] font-bold mt-2 block">
                  PUBLIC-FACING WEBSITE
                </span>
              </div>
            </div>

            <p className="font-sans text-base sm:text-lg text-[#F7F7F2]/80 leading-relaxed max-w-3xl">
              The project resulted in a publicly launched platform that brings Bhavnagar’s landmarks, crafts, archives, conservation work, educational resources, cultural stories, magazine content, and opportunities for participation into one expanding digital destination.
            </p>

            {/* Outcome points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {[
                "Designed and launched from the ground up for INTACH Bhavnagar",
                "Established the Protect, Preserve, and Promote content framework",
                "Created a growing collection of documented heritage landmarks",
                "Connected cultural stories with physical heritage locations",
                "Supported magazine, conservation, education, and community content",
                "Built a responsive platform that can continue expanding",
                "Reached more than 1,400 subscribers",
              ].map((out, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-sm font-sans text-[#F7F7F2]">
                  <CheckCircle2 className="w-4 h-4 text-[#F7F7F2] mt-0.5 shrink-0" />
                  <span>{out}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="https://www.bhavnagarheritage.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2.5 px-6 py-3.5 border border-[#F7F7F2] hover:bg-[#F7F7F2] hover:text-[#111111] text-[#F7F7F2] font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-md"
              >
                <span>EXPLORE THE LIVE WEBSITE ↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 16 — NEXT PHASE */}
        <section className="space-y-10 scroll-mt-28">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              15 / NEXT PHASE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Evaluating the live experience with different audiences.
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl font-sans text-base sm:text-lg text-[#686868] leading-relaxed">
            <p>
              The next phase will be a retrospective usability evaluation of the live website. The study will examine how local residents, students, heritage enthusiasts, and visitors unfamiliar with Bhavnagar navigate the platform and understand its content architecture.
            </p>
          </div>

          <div className="p-6 md:p-8 bg-[#FAFAF7] border border-[#D9D9D4] rounded-xl space-y-4">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#111111] block border-b border-[#D9D9D4] pb-2">
              PROPOSED EVALUATION TASKS
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 font-sans text-xs text-[#111111]">
              {[
                "Find information about a specific landmark",
                "Locate the landmark for an in-person visit",
                "Find information about a conservation project",
                "Access a magazine edition",
                "Find how to subscribe or become involved",
                "Explain the difference between Protect, Preserve, and Promote",
              ].map((task, idx) => (
                <div key={idx} className="p-3 bg-[#F1F1EC] border border-[#D9D9D4] rounded flex items-center space-x-2">
                  <span className="font-mono text-[#858585] font-bold">0{idx + 1}.</span>
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="font-sans text-xs text-[#858585] italic font-semibold">
            “PLANNED RETROSPECTIVE USABILITY EVALUATION”
          </p>
        </section>

        {/* SECTION 17 — REFLECTION */}
        <section id="reflection" className="space-y-10 scroll-mt-28">
          <div className="space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              16 / REFLECTION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight max-w-3xl">
              Information architecture can become a form of storytelling.
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl font-sans text-base sm:text-lg text-[#686868] leading-relaxed">
            <p>
              This project strengthened my understanding of how content structure shapes the way people experience history and culture. Designing the platform required more than presenting information visually—it required creating relationships between places, stories, conservation activities, community knowledge, and opportunities for participation.
            </p>
            <p>
              Working independently also strengthened my ability to translate stakeholder feedback into a live, responsive experience while maintaining consistency across a large and continually evolving body of content.
            </p>
          </div>

          <div className="p-8 bg-[#F1F1EC] border-l-4 border-[#111111] rounded-r-lg">
            <p className="font-serif text-lg sm:text-xl md:text-2xl font-normal text-[#111111] leading-snug italic">
              “Cultural storytelling becomes more meaningful when information is not only preserved, but also made understandable, discoverable, and connected.”
            </p>
          </div>
        </section>

        {/* END NAVIGATION */}
        <footer className="pt-12 border-t border-[#D9D9D4] flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={handleBackToProjects}
            className="group inline-flex items-center space-x-2.5 font-sans text-xs uppercase tracking-[0.2em] text-[#686868] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← BACK TO CURATED PROJECTS</span>
          </button>

          <button
            onClick={handleNextProject}
            className="group inline-flex items-center space-x-2.5 font-sans text-xs uppercase tracking-[0.2em] text-[#111111] font-bold hover:opacity-75 transition-opacity cursor-pointer"
          >
            <span>NEXT PROJECT →</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </footer>

      </div>
    </motion.article>
  );
}
