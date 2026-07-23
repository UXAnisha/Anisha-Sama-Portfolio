import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectSection from "./components/ProjectSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import CustomCursor from "./components/CustomCursor";
import CaseStudyPage from "./components/CaseStudyPage";
import BhavnagarCaseStudy from "./components/BhavnagarCaseStudy";
import PineappleHealthCaseStudy from "./components/PineappleHealthCaseStudy";
import DarkPatternsCaseStudy from "./components/DarkPatternsCaseStudy";
import AboutPage from "./components/AboutPage";
import MoreProjectsPage from "./components/MoreProjectsPage";
import CookmateCaseStudy from "./components/CookmateCaseStudy";
import PodifyCaseStudy from "./components/PodifyCaseStudy";
import VisualNarrativesCaseStudy from "./components/VisualNarrativesCaseStudy";
import { projectsData } from "./data";
import { Project } from "./types";

gsap.registerPlugin(ScrollTrigger);

function HomePage({ onSelectProject }: { onSelectProject: (project: Project) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <Hero />
      <ProjectSection onSelectProject={onSelectProject} />
      <SkillsSection />
      <ContactSection />
    </motion.div>
  );
}

function CaseStudyRouteWrapper({ onBackToProjects }: { onBackToProjects: () => void }) {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  if (
    slug === "dark-patterns-generative-ai" ||
    slug === "dark-patterns" ||
    location.pathname.includes("dark-patterns")
  ) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <DarkPatternsCaseStudy
          onBackToProjects={onBackToProjects}
          onBack={onBackToProjects}
        />
      </motion.div>
    );
  }

  if (slug === "bhavnagar-heritage" || location.pathname.includes("bhavnagar-heritage")) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <BhavnagarCaseStudy
          onBackToProjects={onBackToProjects}
          onBack={onBackToProjects}
        />
      </motion.div>
    );
  }

  if (
    slug === "pineapple-health" ||
    slug === "pineapple-healthcare" ||
    location.pathname.includes("pineapple-health") ||
    location.pathname.includes("pineapple-healthcare")
  ) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <PineappleHealthCaseStudy
          onBackToProjects={onBackToProjects}
          onBack={onBackToProjects}
        />
      </motion.div>
    );
  }

  if (slug === "cookmate" || location.pathname.includes("cookmate")) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <CookmateCaseStudy
          onBackToProjects={onBackToProjects}
          onBack={onBackToProjects}
        />
      </motion.div>
    );
  }

  if (slug === "podify" || location.pathname.includes("podify")) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <PodifyCaseStudy
          onBackToProjects={onBackToProjects}
          onBack={onBackToProjects}
        />
      </motion.div>
    );
  }

  if (slug === "visual-narratives" || location.pathname.includes("visual-narratives") || slug === "narratives") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <VisualNarrativesCaseStudy
          onBackToProjects={onBackToProjects}
          onBack={onBackToProjects}
        />
      </motion.div>
    );
  }

  const project = projectsData.find(
    (p) => p.path === location.pathname || p.path.endsWith(`/${slug}`)
  );

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <CaseStudyPage
        project={project}
        onBack={onBackToProjects}
        onBackToProjects={onBackToProjects}
      />
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on location change and refresh GSAP ScrollTrigger
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const tickHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickHandler);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickHandler);
    };
  }, []);

  const navigateToProjects = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("projects");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      ScrollTrigger.refresh();
    }, 120);
  };

  const handleSelectProject = (project: Project) => {
    navigate(project.path);
  };

  const isLightPage =
    location.pathname.includes("bhavnagar-heritage") ||
    location.pathname.includes("pineapple-health") ||
    location.pathname.includes("pineapple-healthcare") ||
    location.pathname.includes("dark-patterns") ||
    location.pathname.includes("cookmate") ||
    location.pathname.includes("podify") ||
    location.pathname.includes("visual-narratives") ||
    location.pathname.includes("narratives") ||
    location.pathname.includes("about");

  return (
    <div className={`relative min-h-screen w-full overflow-x-hidden transition-colors duration-300 ${
      isLightPage ? "bg-[#FAFAF7] text-[#111111]" : "bg-[#060605] text-white"
    }`}>
      {/* Canvas-based ambient custom cursor with fading trail */}
      <CustomCursor />

      {/* Sticky header branding */}
      <Navbar currentPath={location.pathname} />

      {/* Main content route views with animated transitions */}
      <main className="w-full">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route
              path="/"
              element={<HomePage onSelectProject={handleSelectProject} />}
            />
            <Route
              path="/about"
              element={<AboutPage />}
            />
            <Route
              path="/work"
              element={<HomePage onSelectProject={handleSelectProject} />}
            />
            <Route
              path="/more-projects"
              element={<MoreProjectsPage />}
            />
            <Route
              path="/projects/cookmate"
              element={<CookmateCaseStudy onBackToProjects={navigateToProjects} onBack={navigateToProjects} />}
            />
            <Route
              path="/projects/podify"
              element={<PodifyCaseStudy onBackToProjects={navigateToProjects} onBack={navigateToProjects} />}
            />
            <Route
              path="/projects/visual-narratives"
              element={<VisualNarrativesCaseStudy onBackToProjects={navigateToProjects} onBack={navigateToProjects} />}
            />
            <Route
              path="/work/:slug"
              element={<CaseStudyRouteWrapper onBackToProjects={navigateToProjects} />}
            />
            <Route
              path="/projects/:slug"
              element={<CaseStudyRouteWrapper onBackToProjects={navigateToProjects} />}
            />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

