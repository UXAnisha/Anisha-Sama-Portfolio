import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Maximize2, BookOpen, TreePine, Sparkles, Image as ImageIcon, QrCode } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import ImageLightbox from "./ImageLightbox";

interface VisualNarrativesCaseStudyProps {
  onBackToProjects?: () => void;
  onBack?: () => void;
}

export default function VisualNarrativesCaseStudy({ onBackToProjects, onBack }: VisualNarrativesCaseStudyProps) {
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
    navigate("/projects/podify");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReturnHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Lightbox items for poster gallery, tree tags, journals, and catalogues
  const galleryItems = [
    {
      title: "Poster Series — INTACH Heritage & Culture",
      caption: "Part of a collection of 75+ event posters designed to engage the local Bhavnagar community in heritage conservation.",
      customRender: (
        <div className="w-full bg-[#FAFAF7] text-[#111111] p-6 rounded-lg border border-[#D9D9D4] space-y-4">
          <div className="border-b border-[#D9D9D4] pb-2">
            <span className="font-mono text-xs text-[#E5A93C] uppercase font-bold">GALLERY ITEM 01</span>
            <h3 className="font-serif text-xl font-bold">INTACH Bhavnagar Event Poster Series</h3>
          </div>
          <p className="font-sans text-xs text-[#686868]">
            High-impact visual communication combining bilingual typography, heritage motifs, and event details.
          </p>
        </div>
      ),
    },
    {
      title: "Heritage Tree Awareness Tag Design",
      caption: "Bright yellow weatherproof tags featuring local Gujarati tree names, scientific classification, and QR codes linking to ecological archives.",
      customRender: (
        <div className="w-full bg-[#FAFAF7] text-[#111111] p-6 rounded-lg border border-[#D9D9D4] space-y-4">
          <div className="border-b border-[#D9D9D4] pb-2">
            <span className="font-mono text-xs text-[#E5A93C] uppercase font-bold">GALLERY ITEM 02</span>
            <h3 className="font-serif text-xl font-bold">Bhavnagar Heritage Tree Awareness Tags</h3>
          </div>
          <div className="bg-[#E5A93C]/20 border-2 border-[#E5A93C] p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-[#111111]">
              <span>વડ (Banyan / Ficus benghalensis)</span>
              <span className="bg-[#E5A93C] text-black px-2 py-0.5 rounded text-[10px]">INTACH TAG</span>
            </div>
            <p className="text-[11px] text-[#111111]">Scan QR code to read ecological history, age estimation, and local lore.</p>
          </div>
        </div>
      ),
    },
    {
      title: "Heritage & Biodiversity Monthly Journal",
      caption: "Yearly publication spreads with distinct visual tones for natural biodiversity and historic architectural monuments.",
      customRender: (
        <div className="w-full bg-[#FAFAF7] text-[#111111] p-6 rounded-lg border border-[#D9D9D4] space-y-4">
          <div className="border-b border-[#D9D9D4] pb-2">
            <span className="font-mono text-xs text-[#E5A93C] uppercase font-bold">GALLERY ITEM 03</span>
            <h3 className="font-serif text-xl font-bold">Heritage & Biodiversity Journal Spreads</h3>
          </div>
          <p className="font-sans text-xs text-[#686868]">Editorial grid layouts balancing high-resolution photography, historical essays, and regional maps.</p>
        </div>
      ),
    },
    {
      title: "Local Craft & Embroidery Catalogue",
      caption: "Promotional catalogue distributed through Bhavnagar hotels to support regional artisans, beadwork, and embroidery.",
      customRender: (
        <div className="w-full bg-[#FAFAF7] text-[#111111] p-6 rounded-lg border border-[#D9D9D4] space-y-4">
          <div className="border-b border-[#D9D9D4] pb-2">
            <span className="font-mono text-xs text-[#E5A93C] uppercase font-bold">GALLERY ITEM 04</span>
            <h3 className="font-serif text-xl font-bold">Bhavnagar Artisan Craft Catalogue</h3>
          </div>
          <p className="font-sans text-xs text-[#686868]">Earthy color schemes, artisan stories, product pricing, and direct contact details for tourists.</p>
        </div>
      ),
    },
  ];

  const openGalleryItem = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

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
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#E5A93C] font-bold block">
              VISUAL COMMUNICATION · CULTURAL STORYTELLING
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111]">
              Visual Narratives
            </h1>
            <p className="font-serif text-xl sm:text-2xl text-[#686868] font-normal leading-snug max-w-3xl pt-1">
              Using visual design to make cultural and environmental stories more accessible.
            </p>
          </div>

          <p className="font-sans text-base sm:text-lg text-[#111111] font-light leading-relaxed max-w-3xl border-l-2 border-[#E5A93C] pl-4 py-1 bg-[#F1F1EC]/60 rounded-r">
            A collaborative initiative with the Indian National Trust for Art & Cultural Heritage (INTACH), Bhavnagar Chapter, spanning event posters, digital newsletters, heritage publications, tree-awareness tags, and local craft catalogues.
          </p>
        </header>

        {/* METADATA BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#F1F1EC] p-6 sm:p-8 rounded-xl border border-[#D9D9D4]">
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">PARTNER</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">INTACH Bhavnagar Chapter</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">FOCUS</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">Visual & Editorial Design</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">SCOPE</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">75+ Posters, Tags, Catalogues</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">MEDIA</span>
            <p className="font-sans text-xs font-medium text-[#111111]">Print, Environmental Tags, Publications</p>
          </div>
        </div>

        {/* 01 / COMMUNICATING HERITAGE */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              01 / COMMUNICATING HERITAGE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Fostering community awareness and engagement
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            Cultural and environmental conservation relies heavily on community participation. By translating historical records and ecological research into engaging, clear visual assets, the project helped raise public awareness and participation across Bhavnagar's heritage initiatives.
          </p>
        </section>

        {/* 02 / POSTER DESIGN */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              02 / POSTER DESIGN
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Collection of 75+ posters and e-newsletters
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            The poster design system was guided by four core communication principles:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: "01", title: "Audience Analysis", desc: "Understanding the diverse demographics of local residents and global visitors." },
              { num: "02", title: "Tailored Communication", desc: "Adapting language, tone, and visual cues for specific event topics." },
              { num: "03", title: "Visual Clarity & Engagement", desc: "Using high-contrast typography and authentic historical motifs." },
              { num: "04", title: "Feedback & Iteration", desc: "Continuously refining layouts based on event turnout and community response." },
            ].map((p) => (
              <div key={p.num} className="bg-[#F1F1EC] p-4 rounded-lg border border-[#D9D9D4] space-y-2">
                <span className="font-mono text-xs text-[#E5A93C] font-bold block">{p.num}</span>
                <h4 className="font-sans text-xs font-bold text-[#111111]">{p.title}</h4>
                <p className="font-sans text-[11px] text-[#686868] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Asymmetric Gallery Preview */}
          <div
            onClick={() => openGalleryItem(0)}
            className="bg-[#111111] text-white p-6 rounded-xl border border-neutral-800 cursor-pointer hover:border-[#E5A93C] transition-colors group space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-[#E5A93C] uppercase font-bold">EDITORIAL GALLERY PREVIEW</span>
              <span className="text-xs text-[#E5A93C] group-hover:underline flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5" /> Enlarge Gallery
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1A1812] p-4 rounded border border-neutral-800 space-y-1">
                <h5 className="font-serif text-sm font-bold text-white">Heritage Walks Poster Series</h5>
                <p className="text-[11px] text-neutral-400">Promoting monthly walking tours across historic Bhavnagar neighborhoods.</p>
              </div>
              <div className="bg-[#1A1812] p-4 rounded border border-neutral-800 space-y-1">
                <h5 className="font-serif text-sm font-bold text-white">Conservation Seminars</h5>
                <p className="text-[11px] text-neutral-400">Academic and public lectures on preserving regional architecture.</p>
              </div>
              <div className="bg-[#1A1812] p-4 rounded border border-neutral-800 space-y-1">
                <h5 className="font-serif text-sm font-bold text-white">Digital Newsletters</h5>
                <p className="text-[11px] text-neutral-400">E-bulletins distributed to INTACH members and cultural partners.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 03 / HERITAGE TREE AWARENESS */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              03 / HERITAGE TREE AWARENESS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Weatherproof tree-awareness tags
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            To foster environmental stewardship, tree tags were designed for ancient and significant heritage trees across Bhavnagar.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Local Tree Names", desc: "Common Gujarati names clearly displayed for immediate recognition." },
              { label: "Scientific Names", desc: "Botanical classification for educational and ecological research." },
              { label: "High-Visibility Yellow", desc: "Bright yellow tag material ensuring high visibility in public parks." },
              { label: "QR Code Archives", desc: "Scannable codes linking visitors to digital tree histories and age estimates." },
            ].map((t, i) => (
              <div key={i} className="bg-[#F1F1EC] p-4 rounded-lg border border-[#D9D9D4] space-y-2">
                <span className="font-mono text-xs text-[#E5A93C] font-bold block">0{i + 1}</span>
                <h4 className="font-sans text-xs font-bold text-[#111111]">{t.label}</h4>
                <p className="font-sans text-[11px] text-[#686868] leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 04 / HERITAGE AND BIODIVERSITY JOURNAL */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              04 / HERITAGE AND BIODIVERSITY JOURNAL
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Yearly publication and monthly thematic structure
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            The journal alternates between natural biodiversity features and monumental historic architecture. Consistent typographic grid systems and subtle tone variations distinguish environmental articles from architectural preservation essays, instilling regional pride and awareness.
          </p>
        </section>

        {/* 05 / LOCAL CRAFT CATALOGUE */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              05 / LOCAL CRAFT CATALOGUE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Promoting regional embroidery and beadwork
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            Created specifically to support local Bhavnagar artisans, the catalogue was distributed across major local hotels to introduce tourists to authentic regional craftwork:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Tourist-focused audience distribution through hotel lounges",
              "Earthy color schemes inspired by traditional natural dyes",
              "Artisan profile stories detailing generational craft methods",
              "Clear product specifications, pricing, and contact information",
              "Direct QR codes connecting buyers with artisan cooperatives",
            ].map((c, i) => (
              <div key={i} className="bg-[#F1F1EC] p-4 rounded-lg border border-[#D9D9D4] flex items-start space-x-3">
                <span className="font-mono text-xs font-bold text-[#E5A93C] mt-0.5">•</span>
                <span className="font-sans text-xs text-[#111111] font-medium leading-relaxed">{c}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 06 / MORE WORK — INTACH LINK */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="bg-[#111111] text-white p-8 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#E5A93C] uppercase font-bold tracking-wider">INTACH BHAVNAGAR</span>
              <h3 className="font-serif text-2xl font-bold">Explore More INTACH Bhavnagar Community Works</h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-400">
                View ongoing heritage walks, ecological tagging, and community stories on Instagram.
              </p>
            </div>
            <a
              href="https://www.instagram.com/intach_bhavnagar/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#E5A93C] text-black hover:bg-[#F0B342] transition-colors font-sans text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg flex-shrink-0"
            >
              <span>VIEW INTACH BHAVNAGAR</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* BOTTOM NAVIGATION */}
        <footer className="border-t border-[#D9D9D4] pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={handlePreviousProject}
            className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#686868] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>← PREVIOUS: PODIFY</span>
          </button>

          <button
            onClick={handleBackToMoreProjects}
            className="text-xs uppercase tracking-[0.2em] font-semibold text-[#686868] hover:text-[#111111] transition-colors cursor-pointer"
          >
            BACK TO MORE PROJECTS
          </button>

          <button
            onClick={handleReturnHome}
            className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-bold text-[#E5A93C] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <span>RETURN HOME</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </footer>

      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={galleryItems}
        currentIndex={lightboxIndex}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </motion.article>
  );
}
