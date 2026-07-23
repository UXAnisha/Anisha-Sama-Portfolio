import React, { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ConstellationNode {
  id: string;
  label: string;
  x: number;
  y: number;
  align: "left" | "right";
}

interface ConstellationEdge {
  id: string;
  from: string;
  to: string;
}

const constellationNodes: ConstellationNode[] = [
  // Column 1: Discovery & Research Inputs (x = 50)
  { id: "n1", label: "Research Planning", x: 50, y: 65, align: "left" },
  { id: "n2", label: "User Interviews", x: 50, y: 155, align: "left" },
  { id: "n3", label: "Qualitative Analysis", x: 50, y: 245, align: "left" },
  { id: "n4", label: "Usability Testing", x: 50, y: 335, align: "left" },
  { id: "n5", label: "ATLAS.ti", x: 50, y: 425, align: "left" },
  { id: "n6", label: "Optimal Workshop", x: 50, y: 495, align: "left" },

  // Column 2: Research Synthesis & Mapping (x = 250)
  { id: "n7", label: "Tree Testing", x: 250, y: 65, align: "left" },
  { id: "n8", label: "Persona Development", x: 250, y: 155, align: "left" },
  { id: "n9", label: "Research Synthesis", x: 250, y: 245, align: "left" },
  { id: "n10", label: "Affinity Mapping", x: 250, y: 335, align: "left" },
  { id: "n11", label: "Journey Mapping", x: 250, y: 425, align: "left" },
  { id: "n12", label: "Miro", x: 250, y: 495, align: "left" },

  // Column 3: Design Architecture & Flows (x = 450)
  { id: "n13", label: "Information Architecture", x: 450, y: 65, align: "left" },
  { id: "n14", label: "Heuristic Evaluation", x: 450, y: 155, align: "left" },
  { id: "n15", label: "User Flows", x: 450, y: 245, align: "left" },
  { id: "n16", label: "Wireframing", x: 450, y: 335, align: "left" },
  { id: "n17", label: "FigJam", x: 450, y: 425, align: "left" },

  // Column 4: Design, Systems & AI Research (x = 660)
  { id: "n18", label: "Interaction Design", x: 660, y: 65, align: "left" },
  { id: "n19", label: "Accessibility-Aware Design", x: 660, y: 155, align: "left" },
  { id: "n20", label: "Visual Design", x: 660, y: 245, align: "left" },
  { id: "n21", label: "Prototyping", x: 660, y: 335, align: "left" },
  { id: "n22", label: "Generative AI Research", x: 660, y: 425, align: "left" },
  { id: "n23", label: "Human–AI Interaction", x: 660, y: 495, align: "left" },

  // Column 5: Emerging AI & Design Tools (x = 940)
  { id: "n24", label: "Responsible AI", x: 940, y: 65, align: "right" },
  { id: "n25", label: "AI Interface Evaluation", x: 940, y: 140, align: "right" },
  { id: "n26", label: "AI-Assisted Prototyping", x: 940, y: 215, align: "right" },
  { id: "n27", label: "Google AI Studio", x: 940, y: 290, align: "right" },
  { id: "n28", label: "Figma", x: 940, y: 365, align: "right" },
  { id: "n29", label: "Wix Studio", x: 940, y: 435, align: "right" },
  { id: "n30", label: "Canva", x: 940, y: 495, align: "right" },
];

const constellationEdges: ConstellationEdge[] = [
  // Core Research → Design Chains
  { id: "e1", from: "n2", to: "n8" },   // User Interviews → Persona Development
  { id: "e2", from: "n8", to: "n18" },  // Persona Development → Interaction Design
  { id: "e3", from: "n4", to: "n14" },  // Usability Testing → Heuristic Evaluation
  { id: "e4", from: "n14", to: "n19" }, // Heuristic Evaluation → Accessibility-Aware Design
  { id: "e5", from: "n9", to: "n10" },  // Research Synthesis → Affinity Mapping
  { id: "e6", from: "n10", to: "n13" }, // Affinity Mapping → Information Architecture
  { id: "e7", from: "n11", to: "n15" }, // Journey Mapping → User Flows
  { id: "e8", from: "n15", to: "n16" }, // User Flows → Wireframing
  { id: "e9", from: "n16", to: "n21" }, // Wireframing → Prototyping
  { id: "e10", from: "n1", to: "n7" },  // Research Planning → Tree Testing
  { id: "e11", from: "n7", to: "n13" }, // Tree Testing → Information Architecture
  { id: "e12", from: "n3", to: "n9" },  // Qualitative Analysis → Research Synthesis

  // AI & Emerging Tech Chain
  { id: "e13", from: "n23", to: "n24" }, // Human–AI Interaction → Responsible AI
  { id: "e14", from: "n24", to: "n25" }, // Responsible AI → AI Interface Evaluation
  { id: "e15", from: "n22", to: "n26" }, // Generative AI Research → AI-Assisted Prototyping
  { id: "e16", from: "n26", to: "n21" }, // AI-Assisted Prototyping → Prototyping

  // Tools → Skills Connections
  { id: "e17", from: "n5", to: "n3" },   // ATLAS.ti → Qualitative Analysis
  { id: "e18", from: "n6", to: "n7" },   // Optimal Workshop → Tree Testing
  { id: "e19", from: "n12", to: "n10" }, // Miro → Affinity Mapping
  { id: "e20", from: "n17", to: "n11" }, // FigJam → Journey Mapping
  { id: "e21", from: "n28", to: "n21" }, // Figma → Prototyping
  { id: "e22", from: "n27", to: "n26" }, // Google AI Studio → AI-Assisted Prototyping
  { id: "e23", from: "n29", to: "n20" }, // Wix Studio → Visual Design
  { id: "e24", from: "n30", to: "n20" }, // Canva → Visual Design
];

const tourClusters = [
  {
    name: "Research Chain",
    nodeIds: new Set(["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12"]),
  },
  {
    name: "Design Chain",
    nodeIds: new Set(["n13", "n14", "n15", "n16", "n17", "n18", "n19", "n20", "n21"]),
  },
  {
    name: "AI & Emerging Tech",
    nodeIds: new Set(["n22", "n23", "n24", "n25", "n26", "n27"]),
  },
  {
    name: "Tools & Integrations",
    nodeIds: new Set(["n5", "n6", "n12", "n17", "n27", "n28", "n29", "n30", "n3", "n7", "n10", "n11", "n20", "n21", "n26"]),
  },
];

const allSkillsList = constellationNodes.map((n) => n.label);

export default function SkillsSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobileOrTouch, setIsMobileOrTouch] = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activeTourClusterIndex, setActiveTourClusterIndex] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(SVGPathElement | null)[]>([]);
  const hasTourPlayedRef = useRef<boolean>(false);
  const tourTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionHandler);

    const touchQuery = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const isTouch = touchQuery.matches || "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsMobileOrTouch(isTouch);
    const touchHandler = (e: MediaQueryListEvent) => setIsMobileOrTouch(e.matches);
    touchQuery.addEventListener("change", touchHandler);

    if (motionQuery.matches || isTouch) {
      setShowHint(true);
    }

    return () => {
      motionQuery.removeEventListener("change", motionHandler);
      touchQuery.removeEventListener("change", touchHandler);
    };
  }, []);

  const clearTourTimers = () => {
    if (tourTimeoutRef.current) {
      clearTimeout(tourTimeoutRef.current);
      tourTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTourTimers();
  }, []);

  // Compute set of connected node IDs when a node is hovered
  const connectedNodeIds = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();
    const set = new Set<string>([hoveredNodeId]);
    constellationEdges.forEach((edge) => {
      if (edge.from === hoveredNodeId) set.add(edge.to);
      if (edge.to === hoveredNodeId) set.add(edge.from);
    });
    return set;
  }, [hoveredNodeId]);

  // Map nodes for fast lookup
  const nodeMap = useMemo(() => {
    const map = new Map<string, ConstellationNode>();
    constellationNodes.forEach((node) => map.set(node.id, node));
    return map;
  }, []);

  // Animate constellation lines on scroll into view & trigger tour
  useEffect(() => {
    if (prefersReducedMotion || isMobileOrTouch || !containerRef.current) {
      setShowHint(true);
      return;
    }

    const validLines = lineRefs.current.filter(Boolean);
    if (validLines.length === 0) return;

    const startClusterTour = () => {
      if (hasTourPlayedRef.current) return;
      hasTourPlayedRef.current = true;

      const runTourStep = (stepIndex: number) => {
        if (stepIndex >= tourClusters.length) {
          setActiveTourClusterIndex(null);
          setShowHint(true);
          return;
        }
        setActiveTourClusterIndex(stepIndex);
        tourTimeoutRef.current = setTimeout(() => {
          runTourStep(stepIndex + 1);
        }, 1800);
      };

      // Delay tour start until lines complete drawing (~1200ms)
      tourTimeoutRef.current = setTimeout(() => {
        runTourStep(0);
      }, 1200);
    };

    const ctx = gsap.context(() => {
      validLines.forEach((line) => {
        if (!line) return;
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      gsap.to(validLines, {
        strokeDashoffset: 0,
        duration: 1.15,
        stagger: 0.03,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            startClusterTour();
          },
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      clearTourTimers();
    };
  }, [prefersReducedMotion, isMobileOrTouch]);

  const handleNodeMouseEnter = (nodeId: string) => {
    clearTourTimers();
    if (activeTourClusterIndex !== null) {
      setActiveTourClusterIndex(null);
    }
    setShowHint(true);
    setHoveredNodeId(nodeId);
  };

  const handleNodeMouseLeave = () => {
    setHoveredNodeId(null);
  };

  // Curved cubic Bezier path for constellation connectors
  const getPathD = (fromNode: ConstellationNode, toNode: ConstellationNode) => {
    const dx = toNode.x - fromNode.x;
    const cx1 = fromNode.x + dx * 0.45;
    const cy1 = fromNode.y;
    const cx2 = fromNode.x + dx * 0.55;
    const cy2 = toNode.y;
    return `M ${fromNode.x} ${fromNode.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${toNode.x} ${toNode.y}`;
  };

  // Active cluster nodes during tour
  const activeClusterNodeIds =
    hoveredNodeId === null && activeTourClusterIndex !== null
      ? tourClusters[activeTourClusterIndex]?.nodeIds
      : null;

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative bg-white text-[#0B0B0A] py-12 sm:py-14 md:py-16 z-30 overflow-hidden border-t border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-6 md:space-y-8">
        {/* Section Header */}
        <div className="space-y-2 max-w-2xl">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold block">
            02 / Competency Index
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-none">
            Research, Design &amp; Emerging Technology.
          </h2>
          <p className="font-sans text-xs sm:text-sm tracking-normal text-neutral-500 max-w-xl leading-relaxed font-light">
            Methods, practices, and tools applied across my research, design, and AI-focused work.
          </p>

          {/* Hint text appearing after auto-tour finishes or immediately */}
          {showHint && !isMobileOrTouch && (
            <div className="flex items-center gap-2 pt-1 font-sans text-[11px] uppercase tracking-wider text-neutral-400 font-medium transition-opacity duration-500">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
              Hover a node to explore its connections
            </div>
          )}
        </div>

        {/* Skill Constellation Diagram (Desktop) vs Wrapped Grid (Mobile) */}
        {!isMobileOrTouch ? (
          <div className="relative w-full max-w-6xl mx-auto py-2 px-1 select-none">
            <svg
              viewBox="0 0 1000 530"
              className="w-full h-auto overflow-visible"
              style={{ maxHeight: "520px" }}
            >
              {/* Constellation Connecting Lines */}
              <g className="edges">
                {constellationEdges.map((edge, index) => {
                  const fromNode = nodeMap.get(edge.from);
                  const toNode = nodeMap.get(edge.to);
                  if (!fromNode || !toNode) return null;

                  let isEdgeConnected = true;
                  if (hoveredNodeId !== null) {
                    isEdgeConnected = edge.from === hoveredNodeId || edge.to === hoveredNodeId;
                  } else if (activeClusterNodeIds !== null) {
                    isEdgeConnected = activeClusterNodeIds.has(edge.from) && activeClusterNodeIds.has(edge.to);
                  }

                  const strokeColor =
                    hoveredNodeId !== null || activeClusterNodeIds !== null
                      ? isEdgeConnected
                        ? "#0B0B0A"
                        : "#f5f5f5"
                      : "#a3a3a3";

                  const strokeOpacity =
                    hoveredNodeId !== null || activeClusterNodeIds !== null
                      ? isEdgeConnected
                        ? 0.95
                        : 0.08
                      : 0.35;

                  const strokeWidth =
                    (hoveredNodeId !== null && isEdgeConnected) ||
                    (activeClusterNodeIds !== null && isEdgeConnected)
                      ? 2.0
                      : 1.25;

                  return (
                    <path
                      key={edge.id}
                      ref={(el) => {
                        lineRefs.current[index] = el;
                      }}
                      d={getPathD(fromNode, toNode)}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeOpacity={strokeOpacity}
                      className="transition-all duration-300 pointer-events-none"
                    />
                  );
                })}
              </g>

              {/* Constellation Nodes */}
              <g className="nodes">
                {constellationNodes.map((node) => {
                  const isHovered = hoveredNodeId === node.id;
                  let isNodeActive = true;
                  if (hoveredNodeId !== null) {
                    isNodeActive = connectedNodeIds.has(node.id);
                  } else if (activeClusterNodeIds !== null) {
                    isNodeActive = activeClusterNodeIds.has(node.id);
                  }

                  const isDirectTarget =
                    isHovered || (activeClusterNodeIds !== null && activeClusterNodeIds.has(node.id));

                  const nodeOpacity = isNodeActive ? 1 : 0.18;
                  const textX = node.align === "left" ? node.x + 12 : node.x - 12;
                  const textAnchor = node.align === "left" ? "start" : "end";

                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer transition-opacity duration-300 group"
                      style={{ opacity: nodeOpacity }}
                      onMouseEnter={() => handleNodeMouseEnter(node.id)}
                      onMouseLeave={handleNodeMouseLeave}
                    >
                      {/* Pulsing Outer Ring */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isDirectTarget ? 12 : 7}
                        fill="none"
                        stroke={isDirectTarget ? "#0B0B0A" : "#737373"}
                        strokeWidth={isDirectTarget ? "1.5" : "1"}
                        className={
                          !prefersReducedMotion ? "constellation-glow-ring" : ""
                        }
                      />

                      {/* Inner Node Dot */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isDirectTarget ? 5 : 3.5}
                        fill={isDirectTarget ? "#0B0B0A" : "#262626"}
                        className="transition-all duration-200"
                      />

                      {/* Node Label Text */}
                      <text
                        x={textX}
                        y={node.y + 3.5}
                        textAnchor={textAnchor}
                        fill={
                          isHovered
                            ? "#0B0B0A"
                            : isNodeActive
                            ? "#171717"
                            : "#a3a3a3"
                        }
                        fontSize="10.5"
                        fontFamily="Inter, sans-serif"
                        fontWeight={isDirectTarget ? "700" : "500"}
                        className="select-none transition-all duration-200 tracking-wider uppercase"
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
        ) : (
          /* Static Wrapped Pill Grid for Mobile / Small Screens */
          <div className="py-2 px-1 max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2.5 sm:gap-3 leading-relaxed">
              {allSkillsList.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block text-[11px] sm:text-xs font-medium uppercase tracking-wider px-3.5 py-1.5 bg-neutral-50 text-neutral-800 border border-neutral-200/90 rounded-full select-none cursor-default shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}



