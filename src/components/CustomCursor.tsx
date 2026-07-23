import { useEffect, useRef, useState } from "react";

// Hook to check if the user prefers reduced motion
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);
  return reduced;
}

interface Point {
  x: number;
  y: number;
  age: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const pointsRef = useRef<Point[]>([]);
  const isHoveringRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches || window.innerWidth < 768;
      setIsTouchDevice(isTouch);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    // Check if user prefers reduced motion or is on a touch/mobile device
    if (prefersReducedMotion || isTouchDevice) {
      document.body.classList.remove("cursor-none");
      const clickableElements = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, .cursor-pointer"
      );
      clickableElements.forEach((el) => el.classList.remove("cursor-none"));
      return;
    }

    // Apply global CSS to hide default cursor on desktop with mouse
    document.body.classList.add("cursor-none");
    const clickableElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, .cursor-pointer"
    );
    clickableElements.forEach((el) => el.classList.add("cursor-none"));

    return () => {
      document.body.classList.remove("cursor-none");
      clickableElements.forEach((el) => el.classList.remove("cursor-none"));
    };
  }, [prefersReducedMotion, isVisible]); // Re-evaluate occasionally to clean up dynamic items

  useEffect(() => {
    if (prefersReducedMotion || isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;

      // Add trail point
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
      });

      // Cap trail points
      if (pointsRef.current.length > 25) {
        pointsRef.current.shift();
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Check for pointer-hover classes to expand the custom cursor
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer") ||
        target.getAttribute("role") === "button" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA";

      isHoveringRef.current = !!isClickable;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    // Easing variables for smooth cursor following
    let currentX = 0;
    let currentY = 0;
    let hoverScale = 1;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      // Smoothly interpolate the primary cursor dot position (lerp)
      currentX += (mouse.targetX - currentX) * 0.25;
      currentY += (mouse.targetY - currentY) * 0.25;

      // Smoothly interpolate cursor target hover size
      const targetScale = isHoveringRef.current ? 2.0 : 1.0;
      hoverScale += (targetScale - hoverScale) * 0.2;

      if (isVisible && !prefersReducedMotion) {
        // 1. Draw the fading cursor trail
        const points = pointsRef.current;
        if (points.length > 1) {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
          ctx.lineWidth = 1;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
            // Smoothly curve the trail lines
            const xc = (points[i].x + points[i - 1].x) / 2;
            const yc = (points[i].y + points[i - 1].y) / 2;
            ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
          }
          ctx.stroke();
        }

        // Age points and remove dead ones
        points.forEach((p) => p.age++);
        pointsRef.current = points.filter((p) => p.age < 12);

        // 2. Draw outer interactive cursor ring
        ctx.beginPath();
        ctx.arc(currentX, currentY, 14 * hoverScale, 0, Math.PI * 2);
        ctx.strokeStyle = isHoveringRef.current ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // 3. Draw inner solid feedback dot
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, prefersReducedMotion]);

  if (prefersReducedMotion || isTouchDevice) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{ mixBlendMode: "difference" }}
    />
  );
}
