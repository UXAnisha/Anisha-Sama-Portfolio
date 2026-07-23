import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Maximize2, Sparkles, CheckCircle2, MessageSquare, Utensils, Users, Video, Calendar, Hand, Lightbulb } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import ImageLightbox from "./ImageLightbox";

interface CookmateCaseStudyProps {
  onBackToProjects?: () => void;
  onBack?: () => void;
}

export default function CookmateCaseStudy({ onBackToProjects, onBack }: CookmateCaseStudyProps) {
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

  const handleNextProject = () => {
    navigate("/projects/podify");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Lightbox items for research artifacts & journey maps
  const lightboxItems = [
    {
      title: "User Journey Map — Jenny's Cooking Experience",
      caption:
        "Mapping Jenny's emotional journey, pain points, and opportunities while planning, preparing, and sharing a meal virtually with her friend James.",
      customRender: (
        <div className="w-full bg-[#FAFAF7] text-[#111111] p-6 sm:p-8 rounded-lg border border-[#D9D9D4] space-y-6">
          <div className="border-b border-[#D9D9D4] pb-4">
            <span className="font-mono text-xs text-[#D96B43] uppercase tracking-widest font-bold">RESEARCH ARTIFACT 01</span>
            <h3 className="font-serif text-2xl font-bold text-[#111111]">Jenny's Virtual Cooking Journey Map</h3>
            <p className="font-sans text-xs text-[#686868] mt-1">Goal: Prepare dinner with a distant friend despite busy schedules & hands-busy cooking environment.</p>
          </div>

          {/* Journey Map Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                stage: "1. Scheduling",
                action: "Deciding recipe & finding matching available time",
                feeling: "Neutral / Excited",
                pain: "Disorganized messaging across apps & timezone confusion",
                opportunity: "Integrated event creation & calendar sync",
              },
              {
                stage: "2. Preparation",
                action: "Gathering ingredients & preparing workspace",
                feeling: "Slight Anxiety",
                pain: "Unclear if friend bought same ingredients",
                opportunity: "Shared ingredient checklist & smart substitutes",
              },
              {
                stage: "3. Cooking",
                action: "Active chopping, boiling, and following steps",
                feeling: "Engaged / Busy",
                pain: "Hands are dirty/sticky; touching phone screen is messy",
                opportunity: "Hands-free gestural controls & audio cues",
              },
              {
                stage: "4. Dining Together",
                action: "Eating & video chatting virtually",
                feeling: "Connected & Happy",
                pain: "Camera placement and video angle issues",
                opportunity: "Optimized video orientation & photo sharing",
              },
              {
                stage: "5. Reflection",
                action: "Saving recipe & sharing food photo",
                feeling: "Satisfied",
                pain: "Recipe notes lost after call ends",
                opportunity: "Shared recipe memory journal",
              },
            ].map((col, idx) => (
              <div key={idx} className="bg-[#F1F1EC] p-4 rounded-lg border border-[#D9D9D4] space-y-2">
                <span className="font-mono text-[11px] text-[#D96B43] font-bold block">{col.stage}</span>
                <p className="font-sans text-xs font-bold text-[#111111]">{col.action}</p>
                <div className="text-[11px] text-[#686868]">
                  <strong className="text-[#111111]">Pain Point:</strong> {col.pain}
                </div>
                <div className="text-[11px] text-[#D96B43] font-medium pt-1">
                  <strong className="text-[#111111]">Opportunity:</strong> {col.opportunity}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Human-Centered Design & Lean UX Process",
      caption:
        "Iterative workflow encompassing discovery, qualitative interviews, paper wireframe testing, gesture interaction testing, and high-fidelity interface design.",
      customRender: (
        <div className="w-full bg-[#FAFAF7] text-[#111111] p-6 rounded-lg border border-[#D9D9D4] space-y-4">
          <div className="border-b border-[#D9D9D4] pb-3">
            <span className="font-mono text-xs text-[#D96B43] uppercase tracking-widest font-bold">PROCESS ARTIFACT 02</span>
            <h3 className="font-serif text-2xl font-bold text-[#111111]">Lean UX & Human-Centered Workflow</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { phase: "Discover", items: ["5 Contextual Interviews", "Competitive Audit", "Domain Mapping"] },
              { phase: "Define", items: ["Persona (Jenny)", "Journey Mapping", "3 Core Pain Points"] },
              { phase: "Develop", items: ["How Might We Ideation", "Paper Wireframes", "Gesture Testing"] },
              { phase: "Deliver", items: ["Second Iteration Sketches", "Hi-Fi Mobile Interfaces", "Usability Learnings"] },
            ].map((p, i) => (
              <div key={i} className="bg-[#F1F1EC] p-4 rounded border border-[#D9D9D4] space-y-2">
                <span className="font-mono text-xs text-[#D96B43] font-bold uppercase">{p.phase}</span>
                <ul className="space-y-1 text-xs text-[#686868]">
                  {p.items.map((item, j) => (
                    <li key={j}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const openLightbox = (index: number) => {
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
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D96B43] font-bold block">
              UX RESEARCH · PRODUCT DESIGN · MOBILE APP
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111]">
              Cookmate
            </h1>
            <p className="font-serif text-xl sm:text-2xl text-[#686868] font-normal leading-snug max-w-3xl pt-1">
              Bringing friends and family together through a shared virtual cooking experience.
            </p>
          </div>

          <p className="font-sans text-base sm:text-lg text-[#111111] font-light leading-relaxed max-w-3xl border-l-2 border-[#D96B43] pl-4 py-1 bg-[#F1F1EC]/60 rounded-r">
            Living far from family and relying on video calls while cooking inspired the exploration of a product that could help people connect through a communal cooking experience.
          </p>
        </header>

        {/* METADATA BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#F1F1EC] p-6 sm:p-8 rounded-xl border border-[#D9D9D4]">
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">ROLE</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">UX Designer</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">DURATION</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">4 weeks</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">TEAM</span>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111]">Individual project</p>
          </div>
          <div className="space-y-1 col-span-2 md:col-span-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">METHODS</span>
            <p className="font-sans text-xs font-medium text-[#111111] leading-normal">
              User Interviews · Competitive Analysis · Journey Mapping · Sketching · Paper Prototype Testing · Interface Design
            </p>
          </div>
        </div>

        {/* 01 / OVERVIEW */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              01 / OVERVIEW
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Connecting through communal cooking across distances
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            Cooking has historically served as a central cultural ritual for bonding, sharing knowledge, and building closeness. However, as family members and friends move across cities and time zones, maintaining these shared meal preparation moments becomes challenging. Cookmate addresses this by creating a dedicated mobile experience designed explicitly for synchronous, remote communal cooking.
          </p>
        </section>

        {/* 02 / THE PROBLEM */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              02 / THE PROBLEM
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              The challenge of remote cooking together
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            Long-distance friends, family members, amateur cooks, and food enthusiasts currently lack an integrated platform to coordinate recipes, synchronize preparation, and share the experience of cooking together. Standard video calling applications are not tailored for cooking environments where hands are dirty, phone screens get smudged, and recipe steps need step-by-step synchronization.
          </p>
        </section>

        {/* 03 / THE SOLUTION */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              03 / THE SOLUTION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Cookmate as a social cooking app
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            Cookmate brings remote communal cooking into one cohesive mobile app that empowers users to:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {[
              "Browse recipes with ingredient lists",
              "Receive recipe recommendations",
              "Create custom cooking events",
              "Invite friends and family to join",
              "Cook together through audio/video",
              "Follow step-by-step cooking progress",
              "Share dish photographs & memories",
            ].map((feat, idx) => (
              <div key={idx} className="bg-[#F1F1EC] p-4 rounded-lg border border-[#D9D9D4] flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#D96B43] mt-0.5 flex-shrink-0" />
                <span className="font-sans text-xs font-semibold text-[#111111]">{feat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 04 / KEY EXPERIENCE */}
        <section className="space-y-10 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              04 / KEY EXPERIENCE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Three core interaction pillars
            </h2>
          </div>

          <div className="space-y-8">
            {/* Pillar 1 */}
            <div className="bg-[#111111] text-[#F7F7F2] p-6 sm:p-8 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3">
                <span className="font-mono text-xs text-[#D96B43] font-bold uppercase tracking-wider">PILLAR 01</span>
                <h3 className="font-serif text-2xl font-bold text-white">Browse and Discover Recipes</h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  Discover curated recipes designed for group cooking, tailored based on available prep time, dietary preferences, and ingredient availability.
                </p>
              </div>
              <div className="md:col-span-5 bg-[#1C1C1A] p-4 rounded-lg border border-neutral-800 space-y-2">
                <div className="flex items-center space-x-2 text-[#D96B43] text-xs font-bold font-mono">
                  <Utensils className="w-4 h-4" />
                  <span>Recipe Catalog</span>
                </div>
                <div className="text-xs text-white font-serif font-bold">Rustic Tomato Penne</div>
                <div className="text-[10px] text-neutral-400">Prep: 15 min • Serves 4 • Beginner Friendly</div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#111111] text-[#F7F7F2] p-6 sm:p-8 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3">
                <span className="font-mono text-xs text-[#D96B43] font-bold uppercase tracking-wider">PILLAR 02</span>
                <h3 className="font-serif text-2xl font-bold text-white">Create a Cooking Event</h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  Easily schedule virtual kitchen sessions, send automated calendar invites to friends, and ensure everyone has the right grocery shopping checklist in advance.
                </p>
              </div>
              <div className="md:col-span-5 bg-[#1C1C1A] p-4 rounded-lg border border-neutral-800 space-y-2">
                <div className="flex items-center space-x-2 text-[#D96B43] text-xs font-bold font-mono">
                  <Calendar className="w-4 h-4" />
                  <span>Event Scheduler</span>
                </div>
                <div className="text-xs text-white font-serif font-bold">Sunday Dinner with James</div>
                <div className="text-[10px] text-neutral-400">Scheduled: Oct 14 at 6:30 PM • 2 Guests RSVP'd</div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#111111] text-[#F7F7F2] p-6 sm:p-8 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3">
                <span className="font-mono text-xs text-[#D96B43] font-bold uppercase tracking-wider">PILLAR 03</span>
                <h3 className="font-serif text-2xl font-bold text-white">Cook and Share Together</h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  Join a live virtual kitchen audio/video room with synchronized step indicators, hands-free gestural control, and post-meal photograph sharing.
                </p>
              </div>
              <div className="md:col-span-5 bg-[#1C1C1A] p-4 rounded-lg border border-neutral-800 space-y-2">
                <div className="flex items-center space-x-2 text-[#D96B43] text-xs font-bold font-mono">
                  <Video className="w-4 h-4" />
                  <span>Live Virtual Kitchen</span>
                </div>
                <div className="text-xs text-white font-serif font-bold">Step 4: Simmer Sauce</div>
                <div className="text-[10px] text-emerald-400 font-mono">● Live Sync • Audio Active</div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 / DESIGN PROCESS */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
                05 / DESIGN PROCESS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                Human-Centered & Lean UX Framework
              </h2>
            </div>
            <button
              onClick={() => openLightbox(1)}
              className="inline-flex items-center space-x-2 text-xs font-bold text-[#D96B43] hover:underline cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Enlarge Process Diagram</span>
            </button>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            The project followed Human-Centered Design and Lean UX principles, moving continuously between qualitative discovery, persona formulation, rapid paper wireframe evaluation, gesture prototype testing, and interface refinement.
          </p>

          <div
            onClick={() => openLightbox(1)}
            className="bg-[#F1F1EC] p-6 rounded-xl border border-[#D9D9D4] cursor-pointer hover:border-[#D96B43] transition-colors group"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { step: "01 / Discover", title: "Empathy & Research", desc: "Interviews & competitive audit" },
                { step: "02 / Define", title: "Synthesize Needs", desc: "Persona & journey mapping" },
                { step: "03 / Develop", title: "Ideate & Prototype", desc: "Sketches & paper testing" },
                { step: "04 / Deliver", title: "Refine & Polish", desc: "Hi-Fi mobile experience" },
              ].map((s, idx) => (
                <div key={idx} className="bg-[#FAFAF7] p-4 rounded border border-[#D9D9D4] space-y-1">
                  <span className="font-mono text-[10px] text-[#D96B43] font-bold uppercase">{s.step}</span>
                  <h4 className="font-sans text-xs font-bold text-[#111111]">{s.title}</h4>
                  <p className="font-sans text-[11px] text-[#686868]">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-xs text-[#D96B43] font-medium group-hover:underline">
              Click to enlarge process detail artifact →
            </div>
          </div>
        </section>

        {/* 06 / USER RESEARCH */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              06 / USER RESEARCH
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Qualitative interviews and competitor analysis
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F1F1EC] p-6 rounded-xl border border-[#D9D9D4] space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#111111]">User Research Scope</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#686868]">
                <li className="flex items-start space-x-2">
                  <span className="text-[#D96B43] font-bold">•</span>
                  <span><strong>5 Qualitative Interviews</strong> conducted with amateur cooks and food enthusiasts.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#D96B43] font-bold">•</span>
                  <span>Explored cooking routines, culinary frustrations, and remote social habits.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#D96B43] font-bold">•</span>
                  <span>Investigated how people attempt to stay connected through food across distances.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#D96B43] font-bold">•</span>
                  <span>Synthesized interview findings into an empathetic user journey map.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#F1F1EC] p-6 rounded-xl border border-[#D9D9D4] space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#111111]">Three Principal Pain Points Identified</h3>
              <div className="space-y-2">
                {[
                  { num: "01", title: "Asynchronous Coordination", desc: "Difficulty aligning recipes, ingredient lists, and free time slots across locations." },
                  { num: "02", title: "Hands-Busy Physical Friction", desc: "Messy hands while cooking make tapping mobile screens frustrating and dirty." },
                  { num: "03", title: "Disconnected Video Calls", desc: "Generic video platforms lack recipe step synchronization and shared meal memories." },
                ].map((p) => (
                  <div key={p.num} className="bg-[#FAFAF7] p-3 rounded border border-[#D9D9D4] space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-[#D96B43]">{p.num}</span>
                      <h4 className="font-sans text-xs font-bold text-[#111111]">{p.title}</h4>
                    </div>
                    <p className="font-sans text-[11px] text-[#686868]">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 07 / TARGET AUDIENCE */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              07 / TARGET AUDIENCE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Target Persona — Jenny
            </h2>
          </div>

          <div className="bg-[#F1F1EC] p-6 sm:p-8 rounded-xl border border-[#D9D9D4] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 bg-[#FAFAF7] p-6 rounded-lg border border-[#D9D9D4] text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#D96B43] text-white font-serif font-bold text-2xl flex items-center justify-center mx-auto">
                J
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#111111]">Jenny, 28</h3>
                <p className="font-sans text-xs text-[#D96B43] font-semibold">Relocated Young Professional</p>
              </div>
              <p className="font-sans text-xs text-[#686868] italic">
                “I recently moved to a new city for work. I miss cooking family recipes with my friends back home.”
              </p>
            </div>

            <div className="md:col-span-8 space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#111111]">Persona Background & Needs</h4>
              <p className="font-sans text-xs sm:text-sm text-[#686868] leading-relaxed">
                Jenny represents an adult who recently moved to a new city and wants to remain connected with friends and family back home. She enjoys cooking home-style meals, values shared social rituals, but finds current video calling tools awkward when trying to cook synchronously.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-[#FAFAF7] p-3 rounded border border-[#D9D9D4]">
                  <span className="font-sans text-xs font-bold text-[#111111] block mb-1">Core Goals</span>
                  <p className="font-sans text-xs text-[#686868]">Cook together easily, share food photos, keep in touch regularly without scheduling headaches.</p>
                </div>
                <div className="bg-[#FAFAF7] p-3 rounded border border-[#D9D9D4]">
                  <span className="font-sans text-xs font-bold text-[#111111] block mb-1">Frustrations</span>
                  <p className="font-sans text-xs text-[#686868]">Greasy fingers smudging phone screen, losing place in recipe, awkward video angles.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 08 / USER JOURNEY */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
                08 / USER JOURNEY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                Jenny & James's Virtual Meal Experience
              </h2>
            </div>
            <button
              onClick={() => openLightbox(0)}
              className="inline-flex items-center space-x-2 text-xs font-bold text-[#D96B43] hover:underline cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Enlarge Journey Map</span>
            </button>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            The authentic journey map examines Jenny’s emotional experience while preparing a meal and connecting with her friend James across five sequential stages: Scheduling, Prep, Cooking, Dining, and Reflection.
          </p>

          <div
            onClick={() => openLightbox(0)}
            className="bg-[#F1F1EC] p-6 rounded-xl border border-[#D9D9D4] cursor-pointer hover:border-[#D96B43] transition-colors group space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#FAFAF7] p-4 rounded border border-[#D9D9D4] space-y-1">
                <span className="font-mono text-xs text-[#D96B43] font-bold block">BEFORE SESSION</span>
                <h4 className="font-sans text-xs font-bold text-[#111111]">Scheduling & Prep</h4>
                <p className="font-sans text-[11px] text-[#686868]">Recipe selection, matching calendars, ingredient list synchronization.</p>
              </div>
              <div className="bg-[#FAFAF7] p-4 rounded border border-[#D9D9D4] space-y-1">
                <span className="font-mono text-xs text-[#D96B43] font-bold block">DURING SESSION</span>
                <h4 className="font-sans text-xs font-bold text-[#111111]">Live Cooking Room</h4>
                <p className="font-sans text-[11px] text-[#686868]">Synchronized recipe steps, gesture interaction for hands-busy moments.</p>
              </div>
              <div className="bg-[#FAFAF7] p-4 rounded border border-[#D9D9D4] space-y-1">
                <span className="font-mono text-xs text-[#D96B43] font-bold block">AFTER SESSION</span>
                <h4 className="font-sans text-xs font-bold text-[#111111]">Dining & Memories</h4>
                <p className="font-sans text-[11px] text-[#686868]">Sharing dish photographs and storing shared cooking history in memory archive.</p>
              </div>
            </div>
            <div className="text-center text-xs text-[#D96B43] font-medium group-hover:underline">
              Click to open accessible full-screen Lightbox viewer →
            </div>
          </div>
        </section>

        {/* 09 / IDEATION */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              09 / IDEATION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Brainstorming, How Might We, and early sketches
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            Framing core questions around <em>“How might we reduce friction during hands-busy cooking?”</em> led to initial feature concepts: quick gesture navigation, integrated event invitations, and automated ingredient checklists.
          </p>
        </section>

        {/* 10 / PAPER PROTOTYPE TESTING */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              10 / PAPER PROTOTYPE TESTING
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Testing wireframes with five participants
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#686868] leading-relaxed max-w-3xl">
            Paper wireframes were tested with five participants to evaluate screen navigation, task flow clarity when creating a cooking event, and the usability of live cooking step controls.
          </p>
        </section>

        {/* 11 / DESIGN ITERATION */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              11 / DESIGN ITERATION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Verified design improvements
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Event Separation", desc: "Separated new-event creation from existing scheduled events on the homepage." },
              { title: "Homepage Discoverability", desc: "Made upcoming cooking sessions immediately visible upon opening the app." },
              { title: "Efficient Event Start", desc: "Helped users start scheduled events with a single tap from reminders." },
              { title: "Automated Reminders", desc: "Added automated notifications for upcoming group cooking sessions." },
              { title: "Gestural Interaction", desc: "Explored hands-busy gesture swipes to navigate recipe steps without touching screen." },
              { title: "Onboarding Cards", desc: "Introduced onboarding cards to introduce gestural interaction smoothly." },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#F1F1EC] p-5 rounded-lg border border-[#D9D9D4] space-y-2">
                <span className="font-mono text-xs text-[#D96B43] font-bold">0{idx + 1}</span>
                <h4 className="font-sans text-sm font-bold text-[#111111]">{item.title}</h4>
                <p className="font-sans text-xs text-[#686868] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 12 / FINAL INTERFACE */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              12 / FINAL INTERFACE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              High-fidelity mobile experience
            </h2>
          </div>

          {/* Authentic Mobile Screen Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-[#111111] text-white p-5 rounded-2xl border border-neutral-800 space-y-3">
              <span className="font-mono text-[10px] text-[#D96B43] uppercase tracking-wider font-bold">SCREEN 01</span>
              <h4 className="font-serif text-lg font-bold">Home & Upcoming Events</h4>
              <p className="font-sans text-xs text-neutral-400">Quick access to upcoming cooking sessions, recommended recipes, and friend status.</p>
            </div>
            <div className="bg-[#111111] text-white p-5 rounded-2xl border border-neutral-800 space-y-3">
              <span className="font-mono text-[10px] text-[#D96B43] uppercase tracking-wider font-bold">SCREEN 02</span>
              <h4 className="font-serif text-lg font-bold">Recipe & Ingredient Prep</h4>
              <p className="font-sans text-xs text-neutral-400">Clear ingredient checklists, dietary tags, and automated grocery sync for all event guests.</p>
            </div>
            <div className="bg-[#111111] text-white p-5 rounded-2xl border border-neutral-800 space-y-3">
              <span className="font-mono text-[10px] text-[#D96B43] uppercase tracking-wider font-bold">SCREEN 03</span>
              <h4 className="font-serif text-lg font-bold">Live Kitchen & Gestures</h4>
              <p className="font-sans text-xs text-neutral-400">Simultaneous video call, step-by-step progress tracking, and hands-free gesture control.</p>
            </div>
          </div>
        </section>

        {/* 13 / NEXT STEPS */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              13 / NEXT STEPS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Future research & design explorations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Test hand gestures using a complete, multi-step recipe in a live kitchen environment",
              "Explore Wizard-of-Oz testing before engineering full gesture detection algorithms",
              "Expand testing to a broader demographic, including older family members",
              "Explore gestural interaction across additional hands-busy areas of the application",
              "Explore recipe recommendations based on available ingredients in user's pantry",
            ].map((step, idx) => (
              <div key={idx} className="bg-[#F1F1EC] p-4 rounded-lg border border-[#D9D9D4] flex items-start space-x-3">
                <span className="font-mono text-xs font-bold text-[#D96B43] mt-0.5">•</span>
                <span className="font-sans text-xs text-[#111111] font-medium leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 14 / LEARNINGS */}
        <section className="space-y-6 border-t border-[#D9D9D4] pt-12">
          <div className="space-y-2">
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#858585] font-bold block">
              14 / LEARNINGS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Key takeaways
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#F1F1EC] p-6 rounded-xl border border-[#D9D9D4] space-y-2">
              <h4 className="font-serif text-base font-bold text-[#111111]">Turning Feedback into Opportunity</h4>
              <p className="font-sans text-xs text-[#686868] leading-relaxed">
                Initial testing feedback regarding dirty hands led directly to the innovative gesture control exploration.
              </p>
            </div>
            <div className="bg-[#F1F1EC] p-6 rounded-xl border border-[#D9D9D4] space-y-2">
              <h4 className="font-serif text-base font-bold text-[#111111]">Root Issue vs. Surface Symptom</h4>
              <p className="font-sans text-xs text-[#686868] leading-relaxed">
                Focusing on fundamental social connection issues created a far more meaningful product than simply adding recipe cards.
              </p>
            </div>
            <div className="bg-[#F1F1EC] p-6 rounded-xl border border-[#D9D9D4] space-y-2">
              <h4 className="font-serif text-base font-bold text-[#111111]">Designer ≠ User</h4>
              <p className="font-sans text-xs text-[#686868] leading-relaxed">
                Validating assumptions continuously with real participants ensured the final workflow remained intuitive and accessible.
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM NAVIGATION */}
        <footer className="border-t border-[#D9D9D4] pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={handleBackToMoreProjects}
            className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#686868] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>BACK TO MORE PROJECTS</span>
          </button>

          <button
            onClick={handleNextProject}
            className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-bold text-[#D96B43] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <span>NEXT PROJECT: PODIFY</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </footer>

      </div>

      {/* LIGHTBOX MODAL */}
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
