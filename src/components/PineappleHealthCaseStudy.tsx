import React, { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, ArrowRight, Copy, Check, Lock, ShieldCheck, Users, Calendar, Search, FileText } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

interface PineappleHealthCaseStudyProps {
  onBackToProjects?: () => void;
  onBack?: () => void;
}

const navAnchors = [
  { id: "overview", label: "Overview" },
  { id: "research", label: "Research" },
  { id: "synthesis", label: "Synthesis" },
  { id: "design", label: "Design" },
  { id: "testing", label: "Testing" },
  { id: "outcome", label: "Outcome" },
];

export default function PineappleHealthCaseStudy({ onBackToProjects, onBack }: PineappleHealthCaseStudyProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const prototypePassword = "HCI440-Pineapple";
  const prototypeUrl = "https://www.figma.com/proto/pineapple-health-prototype";

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
    navigate("/work/bhavnagar-heritage");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextProject = () => {
    navigate("/work/dark-patterns-generative-ai");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCopyPassword = () => {
    try {
      navigator.clipboard.writeText(prototypePassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
              02 / ACADEMIC TEAM PROJECT
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#111111] leading-[1.06]">
              Pineapple Health
            </h1>

            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#111111]/90 font-light leading-snug pt-2">
              Simplifying appointment booking, insurance decisions, and cost visibility within one connected healthcare experience.
            </p>

            <p className="font-sans text-base sm:text-lg text-[#686868] font-normal leading-relaxed max-w-3xl pt-2">
              Pineapple Health is a mobile healthcare concept designed to reduce the confusion people experience when finding providers, verifying insurance, estimating costs, and booking appointments. Developed through a user-centered design process, the project translated research with Chicago healthcare users into a tested interactive prototype.
            </p>

            {/* Actions & Prototype Password Box */}
            <div className="flex flex-col space-y-4 pt-4">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => scrollToSection("overview")}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#111111] hover:bg-[#333333] text-[#F7F7F2] font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-md cursor-pointer"
                >
                  <span>EXPLORE THE CASE STUDY ↓</span>
                </button>

                <a
                  href={prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-transparent hover:bg-[#F1F1EC] text-[#111111] border border-[#D9D9D4] font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                >
                  <span>VIEW FIGMA PROTOTYPE ↗</span>
                </a>
              </div>

              {/* SECTION 02 — DISCREET PASSWORD ACCESS */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#686868]">
                <span className="flex items-center space-x-1.5 font-sans font-medium">
                  <Lock className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Password required · Use: <strong className="font-mono text-[#111111] bg-[#F1F1EC] px-1.5 py-0.5 rounded border border-[#D9D9D4]">{prototypePassword}</strong></span>
                </span>
                <button
                  onClick={handleCopyPassword}
                  aria-label="Copy prototype password"
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#F1F1EC] hover:bg-[#E5E5DF] text-[#111111] border border-[#D9D9D4] rounded font-sans text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#16A34A]" />
                      <span className="text-[#16A34A]">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#686868]" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* AUTHENTIC HERO VISUAL */}
          <div className="pt-4">
            <div className="rounded-2xl border border-[#D9D9D4] bg-[#F1F1EC] p-3 sm:p-5 md:p-6 shadow-sm overflow-hidden group">
              <img
                src="/pineapple-health-hero.svg"
                alt="Pineapple Health Mobile Healthcare Prototype Overview"
                referrerPolicy="no-referrer"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                className="w-full h-auto object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.005]"
              />
            </div>
            <p className="font-sans text-xs text-[#858585] text-center mt-3 font-normal">
              Authentic interactive mobile interface prototype demonstrating provider discovery, insurance verification, cost breakdown, and appointment confirmation.
            </p>
          </div>
        </header>

        {/* SECTION 03 — PROJECT SNAPSHOT */}
        <section className="border-y border-[#D9D9D4] py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 text-left">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#858585] font-bold block mb-1">
                Course
              </span>
              <p className="font-sans text-xs text-[#111111] font-semibold leading-snug">
                HCI 440 — User-Centered Design
              </p>
            </div>

            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#858585] font-bold block mb-1">
                Project Type
              </span>
              <p className="font-sans text-xs text-[#111111] font-semibold leading-snug">
                Academic Team Project · Healthcare UX
              </p>
            </div>

            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#858585] font-bold block mb-1">
                Team
              </span>
              <p className="font-sans text-xs text-[#111111] font-semibold leading-snug">
                Five Members
              </p>
            </div>

            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#858585] font-bold block mb-1">
                Role
              </span>
              <p className="font-sans text-xs text-[#111111] font-semibold leading-snug">
                UX Researcher &amp; UI/UX Designer
              </p>
            </div>

            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#858585] font-bold block mb-1">
                Duration
              </span>
              <p className="font-sans text-xs text-[#111111] font-semibold leading-snug">
                One Academic Quarter
              </p>
            </div>

            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#858585] font-bold block mb-1">
                Deliverable
              </span>
              <p className="font-sans text-xs text-[#111111] font-semibold leading-snug">
                Tested Interactive Prototype
              </p>
            </div>

            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#858585] font-bold block mb-1">
                Tools
              </span>
              <p className="font-sans text-xs text-[#111111] font-semibold leading-snug">
                Figma, FigJam, Zoom
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 04 — OVERVIEW */}
        <section id="overview" className="space-y-10 scroll-mt-28">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              01 / OVERVIEW
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Bringing fragmented healthcare decisions into one understandable experience.
            </h2>
          </div>

          <div className="space-y-6 text-[#686868] text-base leading-relaxed max-w-4xl font-normal">
            <p>
              Finding healthcare often requires people to move between provider directories, insurance portals, hospital websites, scheduling tools, billing systems, and phone calls. Pineapple Health explored how these disconnected activities could be brought into one clearer mobile experience.
            </p>
            <p>
              The concept helps people search for appropriate care, identify insurance-compatible providers, understand estimated costs, review referral requirements, and complete an appointment booking with greater confidence.
            </p>
          </div>

          {/* Three Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-[#F1F1EC] p-6 rounded-lg border border-[#D9D9D4] space-y-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">
                THE PROBLEM
              </span>
              <p className="font-sans text-sm text-[#111111] leading-relaxed font-normal">
                Healthcare information is distributed across disconnected systems, making it difficult to compare providers, verify coverage, anticipate costs, and schedule care.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 rounded-lg border border-[#D9D9D4] space-y-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">
                THE APPROACH
              </span>
              <p className="font-sans text-sm text-[#111111] leading-relaxed font-normal">
                Use contextual interviews, secondary research, competitive analysis, synthesis, prototyping, and usability testing to identify and address key barriers.
              </p>
            </div>

            <div className="bg-[#F1F1EC] p-6 rounded-lg border border-[#D9D9D4] space-y-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#858585] font-bold block">
                THE RESULT
              </span>
              <p className="font-sans text-sm text-[#111111] leading-relaxed font-normal">
                A tested interactive prototype integrating provider discovery, insurance guidance, cost visibility, and appointment booking.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 05 — PROBLEM CONTEXT */}
        <section className="space-y-10 border-t border-[#D9D9D4] pt-16">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              02 / PROBLEM CONTEXT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Booking healthcare involves more than selecting an available appointment.
            </h2>
          </div>

          <p className="font-sans text-base sm:text-lg text-[#686868] leading-relaxed max-w-4xl">
            People must often determine whether a provider accepts their insurance, whether a referral is required, how much the visit may cost, where the provider is located, and whether the available appointment fits their needs. These decisions are frequently spread across multiple platforms and communicated through unfamiliar healthcare terminology.
          </p>

          {/* Prominent Core Design Question */}
          <div className="bg-[#F1F1EC] border-l-4 border-[#0284C7] p-8 rounded-r-lg my-8">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#0284C7] font-bold block mb-2">
              CORE DESIGN QUESTION
            </span>
            <blockquote className="font-serif text-xl sm:text-2xl text-[#111111] italic leading-snug">
              “How might we help people find appropriate healthcare, understand their insurance coverage, and anticipate costs before completing an appointment?”
            </blockquote>
          </div>

          {/* Five Challenge Areas */}
          <div className="space-y-4 pt-2">
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-[#858585] font-bold">
              Five Challenge Areas Identified
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { num: "01", title: "Appointment Scheduling", desc: "Unpredictable availability & rigid booking slots" },
                { num: "02", title: "Insurance Verification", desc: "Confusing network terms & repeat verification forms" },
                { num: "03", title: "Cost & Billing Uncertainty", desc: "Unexpected out-of-pocket fees & hidden pricing" },
                { num: "04", title: "Fragmented Portals", desc: "Disconnected systems across providers & health plans" },
                { num: "05", title: "Communication Gaps", desc: "Unclear referral steps & pre-visit instructions" },
              ].map((item) => (
                <div key={item.num} className="bg-[#FAFAF7] border border-[#D9D9D4] p-5 rounded-lg space-y-2">
                  <span className="font-mono text-xs text-[#0284C7] font-bold block">{item.num}</span>
                  <h4 className="font-sans text-sm font-bold text-[#111111]">{item.title}</h4>
                  <p className="font-sans text-xs text-[#686868] leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 06 — SECONDARY AND COMPETITIVE RESEARCH */}
        <section id="research" className="space-y-10 border-t border-[#D9D9D4] pt-16 scroll-mt-28">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              03 / SECONDARY RESEARCH
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Understanding the broader healthcare-access landscape.
            </h2>
          </div>

          <p className="font-sans text-base text-[#686868] leading-relaxed max-w-4xl">
            The team reviewed national and Chicago-specific healthcare information to understand common access, affordability, insurance, and scheduling challenges.
          </p>

          {/* Restrained Comparison Table */}
          <div className="space-y-4">
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-[#858585] font-bold">
              Competitive Platform Analysis
            </h3>
            <div className="overflow-x-auto border border-[#D9D9D4] rounded-lg bg-[#FAFAF7]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F1F1EC] border-b border-[#D9D9D4] text-[#111111]">
                    <th className="p-4 font-bold font-sans uppercase tracking-wider">Evaluation Dimension</th>
                    <th className="p-4 font-bold font-sans uppercase tracking-wider text-[#0284C7]">Zocdoc</th>
                    <th className="p-4 font-bold font-sans uppercase tracking-wider">One Medical</th>
                    <th className="p-4 font-bold font-sans uppercase tracking-wider">Sesame Care</th>
                    <th className="p-4 font-bold font-sans uppercase tracking-wider">GoodRx Care</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9D9D4] text-[#686868]">
                  <tr>
                    <td className="p-4 font-semibold text-[#111111]">Provider Discovery</td>
                    <td className="p-4">Broad directory search</td>
                    <td className="p-4">Membership clinic network</td>
                    <td className="p-4">Direct marketplace</td>
                    <td className="p-4">Telehealth provider list</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#111111]">Appointment Availability</td>
                    <td className="p-4">Real-time scheduling</td>
                    <td className="p-4">Same-day / Next-day</td>
                    <td className="p-4">Upfront calendar slots</td>
                    <td className="p-4">On-demand virtual slots</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#111111]">Insurance Information</td>
                    <td className="p-4">Basic carrier filter</td>
                    <td className="p-4">In-network primary care</td>
                    <td className="p-4">Self-pay primary focus</td>
                    <td className="p-4">Limited insurance use</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#111111]">Cost Visibility</td>
                    <td className="p-4">Copay estimator varies</td>
                    <td className="p-4">Annual membership fee</td>
                    <td className="p-4">Clear upfront self-pay</td>
                    <td className="p-4">Flat cash prices</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#111111]">Referral Guidance</td>
                    <td className="p-4">Limited referral context</td>
                    <td className="p-4">Internal specialist referral</td>
                    <td className="p-4">None / Direct access</td>
                    <td className="p-4">None / Telehealth only</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#111111]">Records &amp; Claims</td>
                    <td className="p-4">Basic appointment history</td>
                    <td className="p-4">Integrated health records</td>
                    <td className="p-4">Receipts &amp; lab results</td>
                    <td className="p-4">Prescription history</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#111111]">Main Limitation</td>
                    <td className="p-4">Surprise out-of-network bills</td>
                    <td className="p-4">Subscription barrier</td>
                    <td className="p-4">No insurance integration</td>
                    <td className="p-4">Limited in-person scope</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Placeholder for competitive analysis artifact */}
          <div className="aspect-[21/9] bg-[#F1F1EC] border border-dashed border-[#D9D9D4] rounded-lg flex items-center justify-center p-6 text-center">
            <span className="font-mono text-xs uppercase tracking-wider text-[#858585] font-bold">
              INSERT AUTHENTIC COMPETITIVE-ANALYSIS ARTIFACT
            </span>
          </div>
        </section>

        {/* SECTION 07 — RESEARCH PLAN */}
        <section className="space-y-10 border-t border-[#D9D9D4] pt-16">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              04 / PRIMARY RESEARCH
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Learning how people currently navigate healthcare.
            </h2>
          </div>

          {/* Verified Study Details Stat Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F1F1EC] p-6 rounded-lg border border-[#D9D9D4] text-center space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-normal text-[#0284C7] block">12</span>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#111111] font-bold block">
                CONTEXTUAL INTERVIEWS
              </span>
            </div>

            <div className="bg-[#F1F1EC] p-6 rounded-lg border border-[#D9D9D4] text-center space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-normal text-[#0284C7] block">20–72</span>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#111111] font-bold block">
                PARTICIPANT AGE RANGE
              </span>
            </div>

            <div className="bg-[#F1F1EC] p-6 rounded-lg border border-[#D9D9D4] text-center space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-normal text-[#0284C7] block">CHICAGO</span>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#111111] font-bold block">
                RESEARCH CONTEXT
              </span>
            </div>
          </div>

          <div className="space-y-6 text-[#686868] text-base leading-relaxed max-w-4xl font-normal">
            <p>
              The 12 study participants spanned diverse backgrounds across Chicago, including international students, working professionals, and retirees, ensuring a broad perspective across different insurance plans and digital literacy levels.
            </p>
            <p>
              Contextual interviews explored:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#111111]">
              <li>How participants search for providers when experiencing new or recurring health concerns</li>
              <li>How they verify insurance coverage and determine whether providers are in-network</li>
              <li>How they schedule appointments and manage calendar commitments</li>
              <li>How they estimate or understand out-of-pocket costs prior to receiving care</li>
              <li>How they navigate existing patient portals and hospital scheduling software</li>
              <li>Where confusion, repetition, billing anxiety, or system friction occurs during the booking process</li>
            </ul>
          </div>
        </section>

        {/* SECTION 08 — AFFINITY MAPPING */}
        <section id="synthesis" className="space-y-10 border-t border-[#D9D9D4] pt-16 scroll-mt-28">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              05 / SYNTHESIS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Turning individual experiences into recurring patterns.
            </h2>
          </div>

          <p className="font-sans text-base text-[#686868] leading-relaxed max-w-4xl">
            Interview observations were organized through affinity mapping in FigJam to synthesize raw qualitative data, identifying repeated behaviors, operational barriers, patient expectations, and system opportunities.
          </p>

          {/* Clearly Labelled Placeholder for Affinity Mapping */}
          <div className="aspect-[21/9] bg-[#F1F1EC] border border-dashed border-[#D9D9D4] rounded-lg flex items-center justify-center p-6 text-center">
            <span className="font-mono text-xs uppercase tracking-wider text-[#858585] font-bold">
              INSERT AUTHENTIC AFFINITY-MAPPING IMAGE
            </span>
          </div>

          {/* 5 Verified Themes */}
          <div className="space-y-4 pt-4">
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-[#858585] font-bold">
              Five Verified Synthesis Themes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { id: "01", title: "Appointment scheduling & availability barriers" },
                { id: "02", title: "Insurance confusion & repeated verification" },
                { id: "03", title: "Billing distrust & financial anxiety" },
                { id: "04", title: "Healthcare portal usability problems" },
                { id: "05", title: "Communication & coordination gaps" },
              ].map((theme) => (
                <div key={theme.id} className="bg-[#F1F1EC] p-5 rounded-lg border border-[#D9D9D4] space-y-2">
                  <span className="font-serif text-2xl font-normal text-[#0284C7] block">{theme.id}</span>
                  <p className="font-sans text-xs font-bold text-[#111111] leading-snug">{theme.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 09 — KEY FINDINGS */}
        <section className="space-y-10 border-t border-[#D9D9D4] pt-16">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              06 / RESEARCH FINDINGS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              People needed clarity before committing to care.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Network Status Visibility", text: "Participants struggled to determine if doctors were strictly in-network before booking, risking unexpected out-of-network bills." },
              { title: "Referral Requirements", text: "Users were often unaware whether their insurance plan required a primary care referral prior to specialist appointments." },
              { title: "Upfront Cost Estimates", text: "Lack of clear copay and out-of-pocket cost guidance created hesitation and booking drop-off." },
              { title: "Location & Facility Details", text: "Physical address, parking, and clinic accessibility information was often buried or incomplete." },
              { title: "Post-Booking Expectations", text: "Participants expressed uncertainty regarding what pre-appointment forms or documentation were required after selecting a time slot." },
              { title: "Centralized Records & Claims", text: "Users wanted a single place to track past appointments, active claims, and upcoming pre-visit requirements." },
            ].map((finding, idx) => (
              <div key={idx} className="bg-[#FAFAF7] border border-[#D9D9D4] p-6 rounded-lg space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#E0F2FE] flex items-center justify-center font-sans text-xs font-bold text-[#0284C7]">
                  0{idx + 1}
                </div>
                <h3 className="font-sans text-base font-bold text-[#111111]">{finding.title}</h3>
                <p className="font-sans text-xs text-[#686868] leading-relaxed">{finding.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 10 — PERSONAS */}
        <section className="space-y-10 border-t border-[#D9D9D4] pt-16">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              07 / PERSONAS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Representing different healthcare-access needs.
            </h2>
          </div>

          <p className="font-sans text-base text-[#686868] leading-relaxed max-w-4xl">
            Three research-grounded personas were developed to represent primary user archetypes identified during contextual interviews across age groups and healthcare familiarity levels.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="aspect-[4/3] bg-[#F1F1EC] border border-dashed border-[#D9D9D4] rounded-lg flex items-center justify-center p-6 text-center">
              <span className="font-mono text-xs uppercase tracking-wider text-[#858585] font-bold">
                INSERT AUTHENTIC PERSONA 01
              </span>
            </div>
            <div className="aspect-[4/3] bg-[#F1F1EC] border border-dashed border-[#D9D9D4] rounded-lg flex items-center justify-center p-6 text-center">
              <span className="font-mono text-xs uppercase tracking-wider text-[#858585] font-bold">
                INSERT AUTHENTIC PERSONA 02
              </span>
            </div>
            <div className="aspect-[4/3] bg-[#F1F1EC] border border-dashed border-[#D9D9D4] rounded-lg flex items-center justify-center p-6 text-center">
              <span className="font-mono text-xs uppercase tracking-wider text-[#858585] font-bold">
                INSERT AUTHENTIC PERSONA 03
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 11 — DESIGN REQUIREMENTS */}
        <section id="design" className="space-y-10 border-t border-[#D9D9D4] pt-16 scroll-mt-28">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              08 / REQUIREMENTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Translating research into experience requirements.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FUNCTIONAL REQUIREMENTS */}
            <div className="bg-[#F1F1EC] p-8 rounded-lg border border-[#D9D9D4] space-y-6">
              <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-[#0284C7] font-bold block">
                FUNCTIONAL REQUIREMENTS
              </h3>
              <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#111111] leading-relaxed">
                {[
                  "Search by doctor, health concern, hospital, or availability",
                  "Prioritize in-network providers",
                  "Identify out-of-network alternatives clearly",
                  "Show estimated costs before booking",
                  "Explain referral requirements in context",
                  "Compare nearby providers",
                  "Access directions and contact information",
                  "Manage claims and medical records",
                  "Receive appointment notifications",
                  "Complete pre-appointment forms"
                ].map((req, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <span className="text-[#0284C7] font-bold mt-0.5">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* EXPERIENCE REQUIREMENTS */}
            <div className="bg-[#F1F1EC] p-8 rounded-lg border border-[#D9D9D4] space-y-6">
              <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-[#0284C7] font-bold block">
                EXPERIENCE REQUIREMENTS
              </h3>
              <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#111111] leading-relaxed">
                {[
                  "Clear and understandable terminology",
                  "Visible system feedback",
                  "Consistent navigation",
                  "Readable typography",
                  "Touch-friendly controls",
                  "Support for older adults",
                  "Clear insurance and cost information",
                  "Responsive mobile behavior"
                ].map((req, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <span className="text-[#0284C7] font-bold mt-0.5">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 12 — USER FLOW */}
        <section className="space-y-10 border-t border-[#D9D9D4] pt-16">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              09 / USER FLOW
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Connecting provider discovery with informed booking.
            </h2>
          </div>

          {/* Clean Flow Diagram in HTML / CSS */}
          <div className="bg-[#F1F1EC] p-6 sm:p-8 rounded-lg border border-[#D9D9D4] space-y-8">
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-[#858585] font-bold">
              Primary User Flow Sequence
            </h3>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-sans font-medium">
              {[
                "Start",
                "Search for Care",
                "Select Location",
                "Review Providers",
                "Check Insurance Network",
                "Review Cost Estimate",
                "Check Referral Requirement",
                "Select Appointment",
                "Review Details",
                "Confirm Booking",
                "Receive Confirmation"
              ].map((step, idx, arr) => (
                <React.Fragment key={idx}>
                  <span className="bg-[#FAFAF7] border border-[#D9D9D4] text-[#111111] px-3 py-2 rounded-md font-semibold shadow-2xs">
                    {step}
                  </span>
                  {idx < arr.length - 1 && (
                    <span className="text-[#0284C7] font-bold text-sm">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Alternate Paths */}
            <div className="border-t border-[#D9D9D4] pt-6 space-y-3">
              <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-[#858585] font-bold">
                Alternate Decision Pathways
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="bg-[#FAFAF7] p-3.5 rounded border border-[#D9D9D4]">
                  <strong className="text-[#111111] block mb-1">Out-of-Network Provider</strong>
                  <p className="text-[#686868]">Prompt with in-network alternatives or display clear cash rate warning.</p>
                </div>
                <div className="bg-[#FAFAF7] p-3.5 rounded border border-[#D9D9D4]">
                  <strong className="text-[#111111] block mb-1">Referral Required</strong>
                  <p className="text-[#686868]">Offer primary care booking shortcut or PCP document upload option.</p>
                </div>
                <div className="bg-[#FAFAF7] p-3.5 rounded border border-[#D9D9D4]">
                  <strong className="text-[#111111] block mb-1">No Suitable Appointment</strong>
                  <p className="text-[#686868]">Enable waitlist notifications and nearby clinic distance expansion.</p>
                </div>
                <div className="bg-[#FAFAF7] p-3.5 rounded border border-[#D9D9D4] relative">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#0284C7] font-bold block mb-1">
                    IDENTIFIED DURING USABILITY TESTING
                  </span>
                  <strong className="text-[#111111] block mb-1">Uninsured or Guest User</strong>
                  <p className="text-[#686868]">Direct cash price estimator and guest booking access flow.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 13 — CONCEPT EXPLORATION */}
        <section className="space-y-10 border-t border-[#D9D9D4] pt-16">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              10 / CONCEPT EXPLORATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Exploring alternative ways to structure the booking experience.
            </h2>
          </div>

          <p className="font-sans text-base text-[#686868] leading-relaxed max-w-4xl">
            Early conceptual explorations tested different visual layouts for balancing provider search with upfront insurance verification steps.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="aspect-[4/3] bg-[#F1F1EC] border border-dashed border-[#D9D9D4] rounded-lg flex items-center justify-center p-6 text-center">
              <span className="font-mono text-xs uppercase tracking-wider text-[#858585] font-bold">
                CONCEPT A — PROCESS VISUAL TO BE ADDED
              </span>
            </div>
            <div className="aspect-[4/3] bg-[#F1F1EC] border border-dashed border-[#D9D9D4] rounded-lg flex items-center justify-center p-6 text-center">
              <span className="font-mono text-xs uppercase tracking-wider text-[#858585] font-bold">
                CONCEPT B — PROCESS VISUAL TO BE ADDED
              </span>
            </div>
            <div className="aspect-[4/3] bg-[#F1F1EC] border border-dashed border-[#D9D9D4] rounded-lg flex items-center justify-center p-6 text-center">
              <span className="font-mono text-xs uppercase tracking-wider text-[#858585] font-bold">
                CONCEPT C — PROCESS VISUAL TO BE ADDED
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 14 — WIREFRAMES */}
        <section className="space-y-10 border-t border-[#D9D9D4] pt-16">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              11 / WIREFRAMES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Defining hierarchy, decisions, and actions before visual refinement.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Search and Discovery",
              "Provider Results",
              "Provider Details",
              "Insurance and Cost",
              "Appointment Selection",
              "Booking Confirmation"
            ].map((title, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[3/4] bg-[#F1F1EC] border border-dashed border-[#D9D9D4] rounded-lg flex items-center justify-center p-6 text-center">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#858585] font-bold">
                    INSERT AUTHENTIC WIREFRAME
                  </span>
                </div>
                <p className="font-sans text-xs font-bold text-[#111111] text-center">{title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 15 — COGNITIVE WALKTHROUGH */}
        <section className="space-y-10 border-t border-[#D9D9D4] pt-16">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              12 / COGNITIVE WALKTHROUGH
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Evaluating whether each step supported the intended user goal.
            </h2>
          </div>

          <p className="font-sans text-base text-[#686868] leading-relaxed max-w-4xl">
            Before proceeding to interactive prototyping, the team conducted a cognitive walkthrough evaluating whether users would successfully navigate key appointment tasks.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "01", question: "Understand what action to take", note: "Verified that search inputs clearly indicate insurance filtering." },
              { step: "02", question: "Notice the correct control", note: "Ensured in-network tags and cost breakdown triggers are prominent." },
              { step: "03", question: "Connect the control with their goal", note: "Validated that selecting copays correlates directly with booking steps." },
              { step: "04", question: "Understand feedback after acting", note: "Confirmed that post-booking steps provide instant calendar & form guidance." },
            ].map((item) => (
              <div key={item.step} className="bg-[#F1F1EC] p-5 rounded-lg border border-[#D9D9D4] space-y-2">
                <span className="font-mono text-xs text-[#0284C7] font-bold block">{item.step}</span>
                <h3 className="font-sans text-xs font-bold text-[#111111]">{item.question}</h3>
                <p className="font-sans text-xs text-[#686868] leading-normal">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 16 — FINAL PROTOTYPE */}
        <section id="prototype" className="space-y-10 border-t border-[#D9D9D4] pt-16">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              13 / INTERACTIVE PROTOTYPE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Bringing search, insurance, cost, and booking into one flow.
            </h2>
          </div>

          <p className="font-sans text-base text-[#686868] leading-relaxed max-w-4xl">
            The final high-fidelity Figma prototype unified provider discovery, insurance verification, cost breakdown, appointment selection, booking confirmation, claims management, and pre-appointment preparation.
          </p>

          {/* Repeat Prototype Access */}
          <div className="bg-[#F1F1EC] border border-[#D9D9D4] p-6 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-sans text-sm font-bold text-[#111111]">Interactive Figma Prototype</h3>
              <p className="font-sans text-xs text-[#686868]">Password required · Use: <strong className="font-mono text-[#111111]">{prototypePassword}</strong></p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCopyPassword}
                aria-label="Copy prototype password"
                className="inline-flex items-center space-x-1.5 px-3 py-2 bg-[#FAFAF7] hover:bg-[#E5E5DF] text-[#111111] border border-[#D9D9D4] rounded font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span className="text-[#16A34A]">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#686868]" />
                    <span>COPY</span>
                  </>
                )}
              </button>

              <a
                href={prototypeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2 bg-[#111111] hover:bg-[#333333] text-[#F7F7F2] rounded font-sans text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>OPEN INTERACTIVE FIGMA PROTOTYPE ↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 17 — USABILITY TESTING */}
        <section id="testing" className="space-y-10 border-t border-[#D9D9D4] pt-16 scroll-mt-28">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              14 / USABILITY TESTING
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Observing how people understood and moved through the experience.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F1F1EC] p-6 rounded-lg border border-[#D9D9D4] text-center space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-normal text-[#0284C7] block">4</span>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#111111] font-bold block">
                MODERATED REMOTE SESSIONS
              </span>
            </div>

            <div className="bg-[#F1F1EC] p-6 rounded-lg border border-[#D9D9D4] text-center space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-normal text-[#0284C7] block">THINK-ALOUD</span>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#111111] font-bold block">
                TESTING METHOD
              </span>
            </div>

            <div className="bg-[#F1F1EC] p-6 rounded-lg border border-[#D9D9D4] text-center space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-normal text-[#0284C7] block">ZOOM</span>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#111111] font-bold block">
                SESSION PLATFORM
              </span>
            </div>
          </div>

          <p className="font-sans text-base text-[#686868] leading-relaxed max-w-4xl">
            The team conducted four moderated remote usability tests via Zoom. Participants were asked to think aloud while completing representative tasks in the interactive prototype, focusing on provider search, insurance filtering, copay estimation, and booking completion.
          </p>
        </section>

        {/* SECTION 18 — TESTING FINDINGS */}
        <section className="space-y-10 border-t border-[#D9D9D4] pt-16">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              15 / TESTING FINDINGS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Testing revealed where the experience needed greater clarity and inclusion.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "No guest or uninsured pathway",
              "Missing in-network & out-of-network labels",
              "Incomplete location information",
              "No calendar integration",
              "Small text & touch targets",
              "Insufficient guidance for older adults",
              "Mobile responsiveness inconsistencies",
              "Limited confirmation after actions",
            ].map((finding, idx) => (
              <div key={idx} className="bg-[#FAFAF7] border border-[#D9D9D4] p-4 rounded-lg flex items-start space-x-3">
                <span className="font-mono text-xs text-[#0284C7] font-bold">0{idx + 1}</span>
                <p className="font-sans text-xs font-semibold text-[#111111] leading-snug">{finding}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 19 — ITERATIONS */}
        <section className="space-y-10 border-t border-[#D9D9D4] pt-16">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              16 / DESIGN ITERATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Turning observed difficulties into specific interface improvements.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#F1F1EC] p-6 rounded-lg border border-[#D9D9D4] space-y-3">
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-[#858585] font-bold">
                Key Interface Refinements
              </h3>
              <ul className="space-y-2 font-sans text-xs text-[#111111] list-disc pl-4 leading-relaxed">
                <li>Clearer typography &amp; enlarged touch targets (44px+)</li>
                <li>Calmer blue color palette for medical trust</li>
                <li>More visible network status tags (In-Network / Out-of-Network)</li>
                <li>Direct call and directions action buttons</li>
                <li>Accessible-facility indicators (wheelchair, parking)</li>
                <li>Improved location selection &amp; distance filters</li>
                <li>Recent-provider quick access panel</li>
                <li>Automated appointment notifications</li>
                <li>Stronger confirmation feedback screen</li>
                <li>More consistent visual hierarchy across cards</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="aspect-[16/9] bg-[#F1F1EC] border border-dashed border-[#D9D9D4] rounded-lg flex items-center justify-center p-4 text-center">
                <span className="font-mono text-xs uppercase tracking-wider text-[#858585] font-bold">
                  INSERT AUTHENTIC BEFORE SCREEN
                </span>
              </div>
              <div className="aspect-[16/9] bg-[#F1F1EC] border border-dashed border-[#D9D9D4] rounded-lg flex items-center justify-center p-4 text-center">
                <span className="font-mono text-xs uppercase tracking-wider text-[#858585] font-bold">
                  INSERT AUTHENTIC AFTER SCREEN
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 20 — FINAL EXPERIENCE */}
        <section className="space-y-10 border-t border-[#D9D9D4] pt-16">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              17 / FINAL EXPERIENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              A more connected path from searching for care to confirming an appointment.
            </h2>
          </div>

          <div className="space-y-12">
            {[
              {
                num: "01",
                title: "FIND APPROPRIATE CARE",
                desc: "Search by provider, health concern, hospital, location, or earliest availability with smart autosuggest."
              },
              {
                num: "02",
                title: "UNDERSTAND COVERAGE AND COST",
                desc: "Prioritize in-network providers, distinguish alternatives, review estimated costs, and understand referral requirements."
              },
              {
                num: "03",
                title: "COMPLETE THE APPOINTMENT",
                desc: "Select an available time, review appointment details, and receive clear confirmation with Google Calendar integration."
              },
              {
                num: "04",
                title: "MANAGE HEALTHCARE INFORMATION",
                desc: "Access records, claims, notifications, provider information, and pre-appointment forms within the same experience."
              }
            ].map((item, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#F1F1EC] p-6 sm:p-8 rounded-lg border border-[#D9D9D4]">
                <div className="md:col-span-5 space-y-3">
                  <span className="font-mono text-xs text-[#0284C7] font-bold">{item.num}</span>
                  <h3 className="font-sans text-base font-bold text-[#111111]">{item.title}</h3>
                  <p className="font-sans text-xs text-[#686868] leading-relaxed">{item.desc}</p>
                </div>
                <div className="md:col-span-7 bg-[#FAFAF7] border border-[#D9D9D4] rounded-lg p-4 flex items-center justify-center">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#858585] font-bold">
                    AUTHENTIC PROTOTYPE SCREEN — {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 21 — INDIVIDUAL CONTRIBUTION */}
        <section className="space-y-10 border-t border-[#D9D9D4] pt-16">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              18 / MY CONTRIBUTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Contributing across research, interaction design, prototyping, and evaluation.
            </h2>
          </div>

          <div className="space-y-6 font-sans text-base text-[#686868] leading-relaxed max-w-4xl font-normal">
            <p>
              Within the five-person team, I conducted competitive and secondary research across healthcare platforms including Zocdoc, One Medical, Sesame Care, and GoodRx Care. I reviewed user feedback to identify recurring concerns involving costs, referrals, insurance, and scheduling.
            </p>
            <p>
              I also contributed to primary research and synthesis, translated findings into design requirements and early wireframes, created the complete interactive prototype, developed usability-testing questions, supported moderated sessions, documented observations, and refined key screens based on participant feedback.
            </p>
          </div>
        </section>

      </div>

      {/* SECTION 22 — PROJECT OUTCOME (DARK FULL-WIDTH SECTION) */}
      <section id="outcome" className="w-full bg-[#111111] text-[#F7F7F2] py-20 px-5 sm:px-8 md:px-12 my-24 scroll-mt-28">
        <div className="max-w-[1200px] mx-auto space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              19 / PROJECT OUTCOME
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
              A research-informed and tested healthcare prototype.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-y border-neutral-800 py-8">
            <div className="space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-normal text-[#38BDF8] block">12</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold block">
                CONTEXTUAL INTERVIEWS
              </span>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-normal text-[#38BDF8] block">3</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold block">
                RESEARCH-BASED PERSONAS
              </span>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-normal text-[#38BDF8] block">4</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold block">
                MODERATED USABILITY TESTS
              </span>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-normal text-[#38BDF8] block">1</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold block">
                INTERACTIVE PROTOTYPE
              </span>
            </div>
          </div>

          <p className="font-sans text-base sm:text-lg text-neutral-300 leading-relaxed max-w-3xl font-light">
            The project resulted in an interactive healthcare prototype grounded in contextual research and refined through moderated usability testing. The final concept demonstrated how provider discovery, insurance guidance, cost visibility, and appointment booking could be connected within a clearer mobile experience.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto space-y-20">

        {/* SECTION 23 — REFLECTION */}
        <section className="space-y-10 border-t border-[#D9D9D4] pt-16">
          <div className="space-y-4 max-w-3xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold block">
              20 / REFLECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
              Healthcare clarity depends on what people understand before they act.
            </h2>
          </div>

          <div className="space-y-6 font-sans text-base text-[#686868] leading-relaxed max-w-4xl font-normal">
            <p>
              This project strengthened my understanding of how research findings can be translated into concrete interface requirements and design decisions. It also demonstrated that an efficient booking flow is not enough when people remain uncertain about insurance, referrals, costs, location, accessibility, or what happens after selecting an appointment.
            </p>
            <p>
              Working within a team strengthened my ability to connect competitive research, user evidence, interaction design, prototyping, and usability feedback while maintaining a consistent experience across the product.
            </p>
          </div>

          <blockquote className="font-serif text-2xl sm:text-3xl text-[#111111] italic leading-snug border-l-2 border-[#111111] pl-6 pt-2">
            “Reducing healthcare friction requires designing for confidence, not only task completion.”
          </blockquote>
        </section>

        {/* END NAVIGATION */}
        <footer className="border-t border-[#D9D9D4] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={handlePreviousProject}
            className="group inline-flex items-center space-x-2 font-sans text-xs uppercase tracking-[0.2em] text-[#686868] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>← PREVIOUS PROJECT</span>
          </button>

          <button
            onClick={handleBackToProjects}
            className="font-sans text-xs uppercase tracking-[0.2em] text-[#111111] font-bold hover:underline cursor-pointer"
          >
            BACK TO CURATED PROJECTS
          </button>

          <button
            onClick={handleNextProject}
            className="group inline-flex items-center space-x-2 font-sans text-xs uppercase tracking-[0.2em] text-[#686868] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <span>NEXT PROJECT →</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </footer>

      </div>
    </motion.article>
  );
}
