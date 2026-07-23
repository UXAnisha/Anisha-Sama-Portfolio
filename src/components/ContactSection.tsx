import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Mail, FileText, Linkedin, Check, Copy, ArrowUpRight, Hand } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import JSConfetti from "js-confetti";

export default function ContactSection() {
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);
  const [showCelebrationHeadline, setShowCelebrationHeadline] = useState(false);
  const [isTypingDots, setIsTypingDots] = useState(false);
  const [fullNote, setFullNote] = useState("");
  const [displayedNote, setDisplayedNote] = useState("");
  const [isTypewriterActive, setIsTypewriterActive] = useState(false);
  const [noteFinished, setNoteFinished] = useState(false);

  // Contact actions state
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [downloadedResume, setDownloadedResume] = useState(false);
  const [highFiveCount, setHighFiveCount] = useState(14);
  const [highFiveGiven, setHighFiveGiven] = useState(false);

  const [reducedMotion, setReducedMotion] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", listener);
    return () => motionQuery.removeEventListener("change", listener);
  }, []);

  // IntersectionObserver to trigger when section comes into view (once per session)
  useEffect(() => {
    if (!sectionRef.current || hasTriggeredRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          setHasScrolledIntoView(true);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Trigger js-confetti celebration once per session on scroll into view
  useEffect(() => {
    if (!hasScrolledIntoView || reducedMotion) return;

    try {
      const alreadyCelebrated = sessionStorage.getItem("hasSeenConnectCelebration");
      if (alreadyCelebrated) return;
      sessionStorage.setItem("hasSeenConnectCelebration", "true");
    } catch {
      // Fallback for strict storage privacy
    }

    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ["🎈"],
      emojiSize: 60,
      confettiNumber: 25,
    });

    setShowCelebrationHeadline(true);

    const timer = setTimeout(() => {
      setShowCelebrationHeadline(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, [hasScrolledIntoView, reducedMotion]);

  // Calculate day of year & time of day with fast weather lookup (800ms max)
  const getContextData = async () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

    const hour = now.getHours();
    let timeOfDay = "afternoon";
    if (hour < 12) timeOfDay = "morning";
    else if (hour > 17) timeOfDay = "evening";

    let weatherText = "72°F & clear";

    try {
      const weatherRes = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=41.8781&longitude=-87.6298&current_weather=true",
        { signal: AbortSignal.timeout(800) }
      );
      if (weatherRes.ok) {
        const data = await weatherRes.json();
        const tempC = data.current_weather?.temperature;
        const weatherCode = data.current_weather?.weathercode;

        if (typeof tempC === "number") {
          const tempF = Math.round((tempC * 9) / 5 + 32);
          let cond = "partly cloudy";
          if (weatherCode === 0) cond = "clear skies";
          else if (weatherCode >= 1 && weatherCode <= 3) cond = "partly cloudy";
          else if (weatherCode >= 51) cond = "breezy & overcast";

          weatherText = `${tempF}°F & ${cond}`;
        }
      }
    } catch {
      // Fast fallback weather
    }

    return { dayOfYear, timeOfDay, weatherText };
  };

  // Main flow when scrolled into view
  useEffect(() => {
    if (!hasScrolledIntoView) return;

    let isSubscribed = true;

    const runSequence = async () => {
      // Fast context retrieval
      const context = await getContextData();

      if (reducedMotion) {
        // Skip loading dots & typewriter for reduced motion
        try {
          const res = await fetch("/api/note", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(context),
            signal: AbortSignal.timeout(1800),
          });
          const data = await res.json();
          if (isSubscribed) {
            setFullNote(data.note || getFallbackNote(context));
            setDisplayedNote(data.note || getFallbackNote(context));
            setNoteFinished(true);
          }
        } catch {
          if (isSubscribed) {
            const fallback = getFallbackNote(context);
            setFullNote(fallback);
            setDisplayedNote(fallback);
            setNoteFinished(true);
          }
        }
        return;
      }

      // Show minimal subtle loading dot while fetching
      setIsTypingDots(true);

      let fetchedNote = "";
      try {
        const res = await fetch("/api/note", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(context),
          signal: AbortSignal.timeout(1800),
        });
        const data = await res.json();
        fetchedNote = data.note || getFallbackNote(context);
      } catch {
        fetchedNote = getFallbackNote(context);
      }

      if (!isSubscribed) return;
      setIsTypingDots(false);
      setFullNote(fetchedNote);
    };

    runSequence();

    return () => {
      isSubscribed = false;
    };
  }, [hasScrolledIntoView, reducedMotion]);

  // Typewriter streaming effect
  useEffect(() => {
    if (!fullNote || reducedMotion) return;

    setIsTypewriterActive(true);
    setDisplayedNote("");
    let idx = 0;

    const timer = setInterval(() => {
      idx++;
      setDisplayedNote(fullNote.slice(0, idx));
      if (idx >= fullNote.length) {
        clearInterval(timer);
        setIsTypewriterActive(false);
        setNoteFinished(true);
      }
    }, 18);

    return () => clearInterval(timer);
  }, [fullNote, reducedMotion]);

  const getFallbackNote = ({
    dayOfYear,
    weatherText,
  }: {
    dayOfYear: number;
    weatherText: string;
  }) => {
    return `Thanks for making it all the way down here on Day ${dayOfYear} of 2026. It's currently ${weatherText} in Chicago, and I'm usually refining interaction patterns or reviewing research output around this time. If you have a project in mind or just want to chat UX, reach out below.`;
  };

  const handleEmailCopy = () => {
    navigator.clipboard.writeText("anishasama8687@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/Anisha_Sama_UX_Resume.txt";
    link.download = "Anisha_Sama_UX_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadedResume(true);
    setTimeout(() => setDownloadedResume(false), 2000);
  };

  const handleHighFive = () => {
    if (!highFiveGiven) {
      setHighFiveGiven(true);
      setHighFiveCount((prev) => prev + 1);
    }
  };

  return (
    <section
      id="connect"
      ref={sectionRef}
      className="relative bg-[#050505] text-[#F4F1EA] py-24 md:py-36 z-30 border-t border-[#1C1C1C] select-none overflow-hidden"
    >
      <div className="max-w-2xl mx-auto px-5 sm:px-6 md:px-8 w-full space-y-12 relative z-20">
        
        {/* Header Badge & Transient Celebration Headline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-neutral-500 font-sans text-xs font-medium uppercase tracking-[0.2em]">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
              <span>04 / CONNECT</span>
            </div>
            
            <span className="text-neutral-400 font-sans text-xs font-medium tracking-normal">
              Say hi →
            </span>
          </div>

          {/* TRANSIENT CELEBRATION HEADLINE */}
          <AnimatePresence>
            {showCelebrationHeadline && !reducedMotion && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="pt-1 pb-2"
              >
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F4F1EA] leading-tight">
                  You came. You scrolled. You're already my favorite person today :)
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Note Container - Direct on black background, no label, no border box */}
        <div className="space-y-2">
          <div className="relative py-2 min-h-[120px] flex items-center">
            
            {/* MINIMAL LOADING INDICATOR: Single subtle pulsing dot */}
            {isTypingDots && !reducedMotion && (
              <div className="flex items-center space-x-2 py-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-400 animate-pulse" />
              </div>
            )}

            {/* STREAMED / DISPLAYED NOTE TEXT */}
            {(displayedNote || (reducedMotion && fullNote)) && (
              <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#F4F1EA] leading-relaxed font-normal">
                {displayedNote}
                {isTypewriterActive && (
                  <span className="inline-block w-1.5 h-4.5 ml-1 bg-emerald-400 animate-pulse align-middle" />
                )}
              </p>
            )}

            {/* INITIAL BLANK / WAITING STATE BEFORE SCROLL */}
            {!hasScrolledIntoView && !displayedNote && !isTypingDots && (
              <p className="font-serif italic text-base sm:text-lg text-neutral-600">
                Scroll to read a personal note...
              </p>
            )}

          </div>
        </div>

        {/* REVEALED CONTACT LINKS & HIGH FIVE */}
        {(noteFinished || reducedMotion) && (
          <div className="pt-2 space-y-8 animate-fadeIn">
            
            {/* Direct Channels Header */}
            <div className="flex items-center justify-between text-xs font-sans font-medium uppercase tracking-wider text-neutral-400 border-b border-[#1A1A1A] pb-3">
              <span>Direct Channels</span>
              <span className="text-neutral-500 font-normal">Response time: ~24 hrs</span>
            </div>

            {/* Link Cards Layout with Clear Visual Hierarchy */}
            <div className="space-y-3.5">
              
              {/* PRIMARY BUTTON — Email Me */}
              <div className="flex flex-col space-y-1.5">
                <a
                  href="mailto:anishasama8687@gmail.com"
                  onClick={handleEmailCopy}
                  className="w-full flex items-center justify-between p-4 sm:p-5 bg-[#F4F1EA] hover:bg-white text-[#050505] rounded-2xl font-sans transition-all duration-200 hover:scale-[1.02] shadow-xl shadow-white/10 group border border-white cursor-pointer"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center group-hover:bg-black/15 transition-colors flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#050505]" strokeWidth={2.2} />
                    </div>
                    <span className="text-[15px] font-medium tracking-tight text-[#050505]">Email Me</span>
                  </div>

                  <div className="flex items-center space-x-2 text-[13px] font-sans font-medium text-neutral-800 bg-black/5 px-3 py-1.5 rounded-lg group-hover:bg-black/10 transition-colors flex-shrink-0 ml-2">
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-700" strokeWidth={2.2} />
                        <span className="text-emerald-800 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-neutral-700" strokeWidth={2.2} />
                        <span className="hidden sm:inline">Copy Email</span>
                      </>
                    )}
                  </div>
                </a>
              </div>

              {/* SECONDARY BUTTONS — Download CV and LinkedIn */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                
                {/* Download CV */}
                <div className="flex flex-col space-y-1">
                  <button
                    type="button"
                    onClick={handleResumeDownload}
                    className="w-full flex items-center justify-between py-3.5 px-4 sm:px-5 bg-transparent border border-neutral-700/80 hover:border-white hover:bg-white text-neutral-200 hover:text-[#050505] rounded-xl font-sans text-[14px] sm:text-[15px] font-medium transition-all duration-200 group text-left cursor-pointer"
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <FileText className="w-4.5 h-4.5 text-neutral-400 group-hover:text-[#050505] transition-colors flex-shrink-0" strokeWidth={2.2} />
                      <span className="truncate">Download CV</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-[#050505] transition-colors flex-shrink-0 ml-2" strokeWidth={2.2} />
                  </button>
                  {downloadedResume && (
                    <span className="text-xs font-sans text-emerald-400 px-1">
                      Download started!
                    </span>
                  )}
                </div>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between py-3.5 px-4 sm:px-5 bg-transparent border border-neutral-700/80 hover:border-white hover:bg-white text-neutral-200 hover:text-[#050505] rounded-xl font-sans text-[14px] sm:text-[15px] font-medium transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <Linkedin className="w-4.5 h-4.5 text-neutral-400 group-hover:text-[#050505] transition-colors flex-shrink-0" strokeWidth={2.2} />
                    <span className="truncate">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-[#050505] transition-colors flex-shrink-0 ml-2" strokeWidth={2.2} />
                </a>

              </div>

            </div>

            {/* High-Five Interactive Button */}
            <div className="pt-2 flex items-center justify-between bg-[#080807] border border-[#1A1A1A] rounded-xl p-4">
              <div className="text-xs sm:text-[13px] font-sans text-neutral-400">
                Leave a quiet wave if you enjoyed browsing.
              </div>

              <button
                type="button"
                onClick={handleHighFive}
                disabled={highFiveGiven}
                className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs sm:text-[13px] font-sans font-medium transition-all cursor-pointer flex-shrink-0 ml-3 ${
                  highFiveGiven
                    ? "bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 cursor-default"
                    : "bg-[#161615] hover:bg-[#222220] border border-[#2A2A28] text-neutral-200 hover:text-white"
                }`}
              >
                <Hand className={`w-3.5 h-3.5 ${highFiveGiven ? "text-emerald-400" : "text-neutral-400"}`} />
                <span>{highFiveGiven ? "High-Five Logged! 🙏" : `High-Five (${highFiveCount})`}</span>
              </button>
            </div>

          </div>
        )}

        {/* Footer */}
        <div className="pt-8 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between text-neutral-500 font-sans text-xs gap-3">
          <p>© {new Date().getFullYear()} Anisha Sama. All rights reserved.</p>
          <p className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
            Chicago, IL · UX Design &amp; Research
          </p>
        </div>

      </div>
    </section>
  );
}
