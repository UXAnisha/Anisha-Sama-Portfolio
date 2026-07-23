import React, { useEffect, useRef, useState, useCallback, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight, RotateCcw } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onNavigate?: (path: string) => void;
}

interface HeroEyebrowLinkProps {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  hoverTextColorClass?: string;
  ariaLabel?: string;
}

const PROMPT_ONE_LINERS = [
  "Occasionally, I prompt.",
  "Sometimes, I synthesize.",
  "Frequently, I iterate.",
  "Rarely, I hallucinate.",
  "Mostly stable. Occasionally weird.",
  "Still learning. Aren't we all.",
];

interface PromptStreamingLineProps {
  progress: number;
}

function PromptStreamingLine({ progress }: PromptStreamingLineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [overrideText, setOverrideText] = useState<string | null>(null);
  const [overrideLength, setOverrideLength] = useState<number | null>(null);
  const [isAutoStreaming, setIsAutoStreaming] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const autoCycleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver to detect if prompt line is in view and pause/resume auto-cycle
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsInView(false);
      } else if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setIsInView(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Map progress (0.0 to 1.0) with a 0.08 start threshold
  const mappedProgress = Math.max(0, Math.min(1, (progress - 0.08) / 0.84));

  // Reset when scrolling back up near top
  useEffect(() => {
    if (mappedProgress < 0.2) {
      setCurrentIndex(0);
      setOverrideText(null);
      setOverrideLength(null);
      setIsAutoStreaming(false);
      if (autoCycleTimerRef.current) clearTimeout(autoCycleTimerRef.current);
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    }
  }, [mappedProgress]);

  const fullText = overrideText ?? PROMPT_ONE_LINERS[currentIndex];

  // Determine displayed length
  let displayedLength = 0;
  if (overrideLength !== null) {
    displayedLength = overrideLength;
  } else if (prefersReducedMotion) {
    displayedLength = mappedProgress > 0.1 ? fullText.length : 0;
  } else {
    displayedLength = Math.floor(mappedProgress * fullText.length);
  }

  const isInitialRevealed = mappedProgress >= 0.98;
  const isFullyRevealed =
    (isInitialRevealed || overrideText !== null) &&
    (overrideLength === null || overrideLength === fullText.length);

  // Helper to advance to next prompt line in typewriter style
  const advanceToNext = useCallback(
    (targetIndex?: number) => {
      const nextIndex =
        targetIndex !== undefined ? targetIndex : (currentIndex + 1) % PROMPT_ONE_LINERS.length;
      const nextText = PROMPT_ONE_LINERS[nextIndex];

      setCurrentIndex(nextIndex);
      setOverrideText(nextText);

      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);

      if (prefersReducedMotion) {
        setOverrideLength(nextText.length);
        setIsAutoStreaming(false);
      } else {
        setIsAutoStreaming(true);
        setOverrideLength(0);
        let len = 0;
        streamIntervalRef.current = setInterval(() => {
          len += 1;
          if (len >= nextText.length) {
            setOverrideLength(nextText.length);
            setIsAutoStreaming(false);
            if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
          } else {
            setOverrideLength(len);
          }
        }, 32);
      }
    },
    [currentIndex, prefersReducedMotion]
  );

  // Handle manual override click
  const handleRegenerate = (e: MouseEvent) => {
    e.stopPropagation();
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 500);

    const nextIndex = (currentIndex + 1) % PROMPT_ONE_LINERS.length;
    advanceToNext(nextIndex);
  };

  // Auto-cycle effect: 3s interval after line finishes streaming
  useEffect(() => {
    if (autoCycleTimerRef.current) {
      clearTimeout(autoCycleTimerRef.current);
      autoCycleTimerRef.current = null;
    }

    if (prefersReducedMotion || !isFullyRevealed || !isInView || isAutoStreaming) {
      return;
    }

    autoCycleTimerRef.current = setTimeout(() => {
      advanceToNext();
    }, 3000);

    return () => {
      if (autoCycleTimerRef.current) clearTimeout(autoCycleTimerRef.current);
    };
  }, [isFullyRevealed, isInView, isAutoStreaming, currentIndex, prefersReducedMotion, advanceToNext]);

  if (displayedLength === 0 && mappedProgress === 0) {
    return null;
  }

  const displayedText = fullText.slice(0, displayedLength);
  const showCursor = isAutoStreaming || (displayedLength > 0 && displayedLength < fullText.length);

  return (
    <div ref={containerRef} className="flex items-center gap-2 select-none">
      <div className="text-sm sm:text-base md:text-lg lg:text-[20px] xl:text-[22px] font-serif font-medium text-neutral-800 tracking-tight leading-tight flex items-center gap-2">
        <span>
          {displayedText}
          {(showCursor || isFullyRevealed) && (
            <span
              className={`inline-block w-[2px] h-[0.85em] bg-neutral-800 align-baseline ml-1 ${
                showCursor ? "opacity-100" : "animate-pulse"
              }`}
            />
          )}
        </span>

        {isFullyRevealed && (
          <button
            onClick={handleRegenerate}
            title="Next prompt line"
            aria-label="Next prompt line"
            className="ml-1 p-0.5 sm:p-1 text-neutral-500 hover:text-black hover:bg-black/5 rounded-full transition-all duration-200 cursor-pointer inline-flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-black/20 group"
          >
            <RotateCcw
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 cursor-pointer transition-transform duration-200 ease-out group-hover:rotate-[18deg] group-hover:scale-110 ${
                isSpinning ? "!rotate-[360deg] !duration-500" : ""
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
}

function HeroEyebrowLink({ label, onClick, hoverTextColorClass, ariaLabel }: HeroEyebrowLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <a
      href="/work"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel || "View Anisha Sama’s UX design and research work."}
      className={`group relative inline-flex items-center gap-1.5 py-1 px-1.5 sm:py-1.5 sm:px-2.5 rounded transition-colors duration-250 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
        hoverTextColorClass || ""
      }`}
    >
      <span className="relative text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-semibold">
        {label}
        {/* Subtle underline beneath the text on hover */}
        <span
          aria-hidden="true"
          className={`absolute -bottom-0.5 left-0 w-full h-[1px] bg-current transition-transform duration-300 ease-out origin-left ${
            isHovered && !prefersReducedMotion ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
        />
      </span>
      <span
        className="inline-flex items-center transition-transform duration-300 ease-out ml-0.5"
        aria-hidden="true"
        style={{
          transform: prefersReducedMotion
            ? "none"
            : isHovered
            ? "translateX(4px)"
            : "translateX(0px)",
        }}
      >
        <ArrowRight className="w-3 h-3" />
      </span>
    </a>
  );
}

function DayCounterHover({
  dateString,
  subtextColorClass = "text-white",
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  dateString: string;
  subtextColorClass?: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      const isTouchDevice =
        window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
        window.innerWidth < 768;
      setIsTouch(isTouchDevice);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div
      onMouseEnter={() => !isTouch && onMouseEnter()}
      onMouseLeave={() => !isTouch && onMouseLeave()}
      className="relative inline-flex flex-col cursor-pointer group py-0.5"
    >
      <span className="transition-colors duration-200">{dateString}</span>
      {!isTouch && (
        <span
          style={{
            transition: prefersReducedMotion
              ? "opacity 150ms ease"
              : "opacity 200ms ease, transform 200ms ease",
            opacity: isHovered ? 0.65 : 0,
            transform: prefersReducedMotion
              ? "none"
              : isHovered
              ? "translateY(0px)"
              : "translateY(4px)",
            pointerEvents: "none",
          }}
          className={`absolute top-full left-0 pt-0.5 text-[7.5px] uppercase tracking-[0.25em] font-semibold ${subtextColorClass} whitespace-nowrap`}
        >
          Make it count.
        </span>
      )}
    </div>
  );
}

export default function Hero({ onNavigate }: HeroProps) {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDayCounterHovered, setIsDayCounterHovered] = useState(false);

  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const handleWorkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/work");
    setTimeout(() => {
      const el = document.getElementById("projects");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (onNavigate) {
        onNavigate("/work");
      }
    }, 100);
  };

  const getDayOfYearString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const startOfYear = new Date(year, 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return `Day ${dayOfYear} of ${year}`;
  };

  const dayOfYearString = getDayOfYearString();

  useEffect(() => {
    if (!heroWrapperRef.current || !scrollIndicatorRef.current) return;

    const ctx = gsap.context(() => {
      const progressObj = { value: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroWrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        progressObj,
        {
          value: 1,
          ease: "none",
          onUpdate: () => {
            setScrollProgress(progressObj.value);
          },
        },
        0
      ).to(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: 20,
          ease: "none",
        },
        0
      );

      if (scrollIndicatorRef.current) {
        const arrow = scrollIndicatorRef.current.querySelector(".arrow-bounce");
        if (arrow) {
          gsap.to(arrow, {
            y: 8,
            repeat: -1,
            yoyo: true,
            duration: 1.2,
            ease: "power1.inOut",
          });
        }
      }
    }, heroWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroWrapperRef}
      id="hero"
      className="relative w-full h-[220vh] bg-[#0B0B0A]"
    >
      <div
        ref={stickyContainerRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex select-none"
      >
        {/* DESKTOP SPLIT LAYOUT (>= 768px) */}
        <div className="hidden md:flex w-full h-full relative">
          {/* Left Half: Black Background, White Text */}
          <div
            ref={leftPanelRef}
            className="absolute left-0 top-0 h-full w-1/2 bg-[#0B0B0A] text-white overflow-hidden z-20 flex items-center justify-end"
          >
            <div className="w-screen h-full flex items-center absolute left-0 px-6 md:px-12 lg:px-24">
              <div className="absolute top-[18%] left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 flex justify-between items-center text-[10px] uppercase tracking-[0.3em] font-semibold text-neutral-400">
                <DayCounterHover
                  dateString={dayOfYearString}
                  subtextColorClass="text-white"
                  isHovered={isDayCounterHovered}
                  onMouseEnter={() => setIsDayCounterHovered(true)}
                  onMouseLeave={() => setIsDayCounterHovered(false)}
                />
                <HeroEyebrowLink
                  label="UX Designer & Researcher"
                  onClick={handleWorkClick}
                  hoverTextColorClass="hover:text-white"
                  ariaLabel="View Anisha Sama’s UX design and research work."
                />
              </div>

              <div className="w-full flex flex-row items-center justify-center font-serif font-bold leading-none">
                <div className="w-1/2 flex items-center justify-end pr-3 md:pr-6 lg:pr-8 text-right">
                  <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight block w-full">
                    I design.
                  </span>
                </div>
                <div className="w-1/2"></div>
              </div>
            </div>
          </div>

          {/* Right Half: White Background, Black Text */}
          <div
            ref={rightPanelRef}
            className="absolute right-0 top-0 h-full w-1/2 bg-white text-[#0B0B0A] overflow-hidden z-10 flex items-center justify-start"
          >
            <div className="w-screen h-full flex items-center absolute right-0 px-6 md:px-12 lg:px-24">
              <div className="absolute top-[18%] left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 flex justify-between items-center text-[10px] uppercase tracking-[0.3em] font-semibold text-neutral-600">
                <DayCounterHover
                  dateString={dayOfYearString}
                  subtextColorClass="text-black"
                  isHovered={isDayCounterHovered}
                  onMouseEnter={() => setIsDayCounterHovered(true)}
                  onMouseLeave={() => setIsDayCounterHovered(false)}
                />
                <HeroEyebrowLink
                  label="UX Designer & Researcher"
                  onClick={handleWorkClick}
                  hoverTextColorClass="hover:text-black"
                  ariaLabel="View Anisha Sama’s UX design and research work."
                />
              </div>

              <div className="w-full flex flex-row items-center justify-center font-serif font-bold leading-none">
                <div className="w-1/2"></div>
                <div className="w-1/2 flex items-center justify-start pl-3 md:pl-6 lg:pl-8 text-left">
                  <div className="relative">
                    <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight block w-full">
                      I research.
                    </span>
                    <div className="absolute top-full left-0 pt-3 sm:pt-4 w-[80vw] max-w-xl">
                      <PromptStreamingLine progress={scrollProgress} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE VERTICAL STACK LAYOUT (< 768px) */}
        <div className="flex md:hidden flex-col w-full h-full relative">
          {/* Top Half: "I design." (Black background, White text) */}
          <div className="h-1/2 w-full bg-[#0B0B0A] text-white flex flex-col justify-between p-6 sm:p-8 relative z-20">
            <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.2em] font-semibold text-neutral-400 w-full pt-10">
              <span>{dayOfYearString}</span>
              <HeroEyebrowLink
                label="UX Designer & Researcher"
                onClick={handleWorkClick}
                hoverTextColorClass="hover:text-white"
                ariaLabel="View Anisha Sama’s UX design and research work."
              />
            </div>

            <div className="my-auto text-center font-serif font-bold leading-none">
              <span className="text-4xl sm:text-5xl tracking-tight block">
                I design.
              </span>
            </div>
          </div>

          {/* Bottom Half: "I research." + Prompt line (White background, Black text) */}
          <div className="h-1/2 w-full bg-white text-[#0B0B0A] flex flex-col justify-between p-6 sm:p-8 relative z-10">
            <div className="my-auto text-center font-serif font-bold leading-none pt-4">
              <div className="relative inline-block text-left">
                <span className="text-4xl sm:text-5xl tracking-tight block">
                  I research.
                </span>
                <div className="mt-3 w-[82vw] max-w-sm">
                  <PromptStreamingLine progress={scrollProgress} />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.2em] font-semibold text-neutral-600 w-full pb-4">
              <span>{dayOfYearString}</span>
              <HeroEyebrowLink
                label="UX Designer & Researcher"
                onClick={handleWorkClick}
                hoverTextColorClass="hover:text-black"
                ariaLabel="View Anisha Sama’s UX design and research work."
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator Overlay */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none"
        >
          <div className="arrow-bounce p-1.5 md:p-2 bg-neutral-900 text-white rounded-full border border-white/10 shadow-lg">
            <ArrowDown className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}


