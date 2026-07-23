import { useEffect, useRef, useState, MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavbarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

interface LiquidWordmarkProps {
  text: string;
  onClick: () => void;
}

function LiquidWordmark({ text, onClick }: LiquidWordmarkProps) {
  const [scale, setScale] = useState(0);
  const [seed, setSeed] = useState(1);
  const [baseFreq, setBaseFreq] = useState({ x: 0.035, y: 0.06 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchOrMobile, setIsTouchOrMobile] = useState(false);

  const animRef = useRef<number | null>(null);
  const targetScaleRef = useRef(0);
  const currentScaleRef = useRef(0);
  const seedRef = useRef(1);

  const filterId = "liquid-warp-wordmark";

  useEffect(() => {
    const checkTouch = () => {
      const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches || window.innerWidth < 768;
      setIsTouchOrMobile(isTouch);
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

  useEffect(() => {
    if (prefersReducedMotion || isTouchOrMobile) return;

    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smoothly interpolate currentScale towards targetScale
      const diff = targetScaleRef.current - currentScaleRef.current;
      currentScaleRef.current += diff * Math.min(1, dt * 7);

      if (Math.abs(diff) < 0.01 && targetScaleRef.current === 0) {
        currentScaleRef.current = 0;
      }

      if (currentScaleRef.current > 0.01) {
        seedRef.current += dt * 1.8;
      }

      setScale(currentScaleRef.current);
      setSeed(seedRef.current);

      if (isHovered || currentScaleRef.current > 0.01) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        animRef.current = null;
      }
    };

    if (isHovered || currentScaleRef.current > 0.01) {
      if (!animRef.current) {
        lastTime = performance.now();
        animRef.current = requestAnimationFrame(animate);
      }
    }

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };
  }, [isHovered, prefersReducedMotion, isTouchOrMobile]);

  const handleMouseEnter = () => {
    if (isTouchOrMobile) return;
    setIsHovered(true);
    if (!prefersReducedMotion) {
      targetScaleRef.current = 7;
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || isTouchOrMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    targetScaleRef.current = 5.5 + xRatio * 3.5;
    setBaseFreq({
      x: 0.03 + xRatio * 0.015,
      y: 0.05 + (1 - xRatio) * 0.02,
    });
  };

  const handleMouseLeave = () => {
    if (isTouchOrMobile) return;
    setIsHovered(false);
    targetScaleRef.current = 0;
  };

  return (
    <>
      {!prefersReducedMotion && !isTouchOrMobile && (
        <svg className="absolute w-0 h-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <defs>
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency={`${baseFreq.x} ${baseFreq.y}`}
                numOctaves={2}
                seed={Math.floor(seed)}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={scale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}

      <button
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          fontFamily: '"Instrument Sans", sans-serif',
          fontWeight: 500,
          fontSize: isTouchOrMobile ? "12px" : "14px",
          letterSpacing: "0.20em",
          lineHeight: 1,
          filter: scale > 0.05 && !prefersReducedMotion && !isTouchOrMobile ? `url(#${filterId})` : "none",
        }}
        className="uppercase text-neutral-300 hover:text-white active:scale-[0.97] transition-all duration-200 ease-out cursor-pointer leading-none select-none origin-left py-1"
      >
        {text}
      </button>
    </>
  );
}

export default function Navbar({ currentPath, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const activePath = currentPath || location.pathname;
  const isLightPage =
    activePath.includes("bhavnagar-heritage") ||
    activePath.includes("pineapple-health") ||
    activePath.includes("pineapple-healthcare") ||
    activePath.includes("dark-patterns");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    if (activePath !== "/") {
      if (onNavigate) {
        onNavigate("/");
      } else {
        navigate("/");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (item: { id: string; label: string; path: string }) => {
    setIsMobileMenuOpen(false);
    if (item.path === "/about") {
      if (onNavigate) {
        onNavigate("/about");
      } else {
        navigate("/about");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (activePath !== "/") {
        if (onNavigate) {
          onNavigate("/");
        } else {
          navigate("/");
        }
        setTimeout(() => {
          const el = document.getElementById(item.id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        const el = document.getElementById(item.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const navItems = [
    { id: "about", label: "ME.", path: "/about" },
    { id: "projects", label: "WORK", path: "/#projects" },
    { id: "connect", label: "REACH OUT", path: "/#connect" },
  ];

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isLightPage
          ? scrolled
            ? "bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#D9D9D4] py-3.5 shadow-sm"
            : "bg-[#FAFAF7]/80 backdrop-blur-sm border-b border-[#D9D9D4]/60 py-4.5"
          : scrolled
            ? "bg-[#060605]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg"
            : "bg-[#060605]/60 backdrop-blur-sm border-b border-white/5 py-4.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo / Name Wordmark */}
        <LiquidWordmark text="ANISHA SAMA" onClick={handleLogoClick} />

        {/* Desktop Navigation Items */}
        <nav className="hidden md:flex space-x-2 sm:space-x-4 md:space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              style={{
                fontFamily: '"Instrument Sans", sans-serif',
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "0.16em",
                lineHeight: 1,
              }}
              className={`group relative px-4 py-2 rounded-full overflow-hidden uppercase transition-colors duration-200 ease-out cursor-pointer flex items-center justify-center select-none ${
                isLightPage
                  ? "text-[#111111] hover:text-[#FAFAF7]"
                  : "text-neutral-300 hover:text-black"
              }`}
            >
              <span className={`absolute inset-0 rounded-full -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-250 ease-out pointer-events-none ${
                isLightPage ? "bg-[#111111]" : "bg-white"
              }`} />
              <span className="relative z-10 transition-colors duration-200 ease-out">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className={`md:hidden p-2 active:scale-95 transition-transform cursor-pointer focus:outline-none ${
            isLightPage ? "text-[#111111]" : "text-neutral-300 hover:text-white"
          }`}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`md:hidden fixed inset-x-0 top-[52px] px-6 py-6 flex flex-col space-y-3 shadow-2xl z-40 ${
              isLightPage
                ? "bg-[#FAFAF7]/98 backdrop-blur-2xl border-b border-[#D9D9D4]"
                : "bg-[#060605]/95 backdrop-blur-2xl border-b border-white/10"
            }`}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                style={{
                  fontFamily: '"Instrument Sans", sans-serif',
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                }}
                className={`text-left font-sans text-xs uppercase py-3.5 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-between border active:scale-[0.98] ${
                  isLightPage
                    ? "text-[#111111] hover:bg-[#F1F1EC] border-[#D9D9D4]"
                    : "text-neutral-200 hover:text-white active:bg-white/10 border-white/5"
                }`}
              >
                <span>{item.label}</span>
                <span className={isLightPage ? "text-[#686868]" : "text-neutral-500"}>&rarr;</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
