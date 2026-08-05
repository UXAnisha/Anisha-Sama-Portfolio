import { Project, SkillCategory, AdditionalProject } from "./types";

export const projectsData: Project[] = [
  {
    id: "01",
    title: "Dark Patterns in Generative AI",
    subtitle: "Examining how generative AI interface patterns influence user trust, autonomy, and decision-making, with a focus on more transparent and responsible AI experiences.",
    designFocus: "An interface audit framework evaluating transparency, trust, user autonomy, and cognitive models during interactive LLM generations.",
    researchInsight: "Unpredictable AI latency and dynamic content updates frequently trigger user anxiety. Introducing structured anticipation patterns significantly mitigates user friction and improves overall interactive trust.",
    imageSeed: "ai_patterns",
    tags: ["Human–AI Interaction", "UX Auditing", "Responsible AI"],
    challenge: "Generative AI systems introduce dynamic, highly variable response states. This research investigates the prevalence of dark patterns and trust-undermining cues in conversational interfaces, and how they manipulate user trust, decision-making, and autonomy.",
    process: [
      "Conducted literature reviews on trust and dark patterns in interactive software.",
      "Audited 12 popular consumer generative AI conversational interfaces.",
      "Synthesized design heuristics for transparent and autonomous AI interactions.",
      "Formulated a comprehensive UX evaluation framework for dynamic AI response systems."
    ],
    metrics: [
      "12 Conversational AI interfaces audited",
      "4 Primary trust-undermining patterns identified",
      "100% Core heuristics evaluated and documented"
    ],
    solution: "A structured UX framework outlining design principles that promote user autonomy, mitigate dynamic response anxiety, and establish transparent feedback loops in generative AI systems.",
    methods: "UX Audit · Literature Review · Thematic Analysis · Ethical Design",
    outcome: "Responsible AI design recommendations focused on transparency, user autonomy, and safer interaction patterns.",
    path: "/work/dark-patterns-generative-ai"
  },
  {
    id: "02",
    title: "Bhavnagar Heritage",
    subtitle: "Transforming heritage research and cultural narratives into a structured, accessible, and engaging digital storytelling experience.",
    designFocus: "A visual and cultural archive focusing on typographic rhythm, rich historical storytelling layouts, and lightweight accessible archives.",
    researchInsight: "Heritage platforms often fail by overwhelming visitors with dense text blocks. Translating archive files into highly structured visual paths increases exploration depth and retention.",
    imageSeed: "heritage",
    tags: ["Cultural Storytelling", "Information Architecture", "Web Design"],
    challenge: "Bhavnagar holds deep historical and architectural significance, but its cultural narratives are fragmented and inaccessible. The objective was to create a digital workspace that honors these stories through structured experience design, making archival content intuitive and engaging for global visitors.",
    process: [
      "Collaborated with historians and archivists to gather primary cultural records.",
      "Developed a curated visual narrative map highlighting significant historical epochs.",
      "Created modular, responsive page layouts balancing imagery, typography, and negative space.",
      "Conducted standard usability tests to ensure cross-device legibility and navigation ease."
    ],
    metrics: [
      "30+ Historical archives curated and mapped",
      "0% Dependency on complex, slow external libraries",
      "100% WCAG-accessible content layouts"
    ],
    solution: "A beautiful, content-first digital platform that preserves and elevates Bhavnagar's rich cultural legacy. By employing editorial-inspired grids and deep storytelling paths, we developed a fast, legible, and universally accessible archive.",
    methods: "Content Strategy · Website Design · Visual Storytelling · Information Architecture",
    outcome: "A client-facing digital platform that makes Bhavnagar’s cultural and architectural heritage easier to explore, understand, and access.",
    path: "/work/bhavnagar-heritage"
  },
  {
    id: "03",
    title: "Podify",
    subtitle: "A podcast experience designed to make discovering, organizing, and listening to favorite shows more intuitive.",
    designFocus: "A dedicated podcast application focusing on seamless episode queueing, personalized discovery, and intuitive category browsing.",
    researchInsight: "Embedding podcasts inside general audio streaming apps creates cluttered navigation. A dedicated podcast workspace significantly enhances content discovery and listening focus.",
    imageSeed: "podify",
    tags: ["Interface Design", "User Experience", "Mobile App"],
    challenge: "Many audio streaming platforms mix music and podcasts together, creating cluttered interfaces and buried queue controls. Podify addresses this with a specialized environment designed purely for podcast discovery and queue management.",
    process: [
      "Audited user interaction flows across existing audio and podcast applications.",
      "Developed custom wireframes for episode queueing and category navigation.",
      "Created high-fidelity interactive prototypes with custom visual soundwave branding.",
      "Validated layout hierarchy and player accessibility across mobile viewports."
    ],
    metrics: [
      "1 Dedicated podcast discovery architecture",
      "25+ Custom Figma component screens",
      "100% Focused mobile listening experience"
    ],
    solution: "A mobile application tailored exclusively to podcast listeners with clean discovery feeds, responsive player controls, and smart queue management.",
    methods: "Interface Design · Wireframing · Interactive Prototyping · Visual Identity",
    outcome: "A dedicated mobile concept that simplifies podcast discovery, playlist curation, and listening interactions.",
    path: "/projects/podify"
  }
];

export const skillsData: SkillCategory[] = [
  {
    title: "Research Methods",
    skills: [
      "User Interviews",
      "Cognitive Walkthroughs",
      "Eye Tracking",
      "Usability Testing",
      "Heuristic Evaluation",
      "A/B Testing",
      "Persona Development",
      "Task Analysis",
      "Affinity Mapping"
    ]
  },
  {
    title: "Design & Craft",
    skills: [
      "Interface Design",
      "Interactive Prototyping",
      "Design Systems",
      "Typography & Grid Systems",
      "Information Architecture",
      "Accessibility (WCAG 2.2 AA)",
      "Wireframing",
      "User Flows",
      "Visual Hierarchy"
    ]
  },
  {
    title: "Core Technologies & Tools",
    skills: [
      "Figma / FigJam",
      "React / Vite",
      "GSAP / ScrollTrigger",
      "CSS / Tailwind CSS",
      "Lenis Smooth Scroll",
      "Hotjar Analytics",
      "Optimal Workshop",
      "Git / GitHub"
    ]
  }
];

export const additionalProjectsData: AdditionalProject[] = [
  {
    id: "A-01",
    title: "Aether Health Assistant",
    tag: "Voice UI · Accessibility Audit",
    year: "2025"
  },
  {
    id: "A-02",
    title: "Krypton Web3 Terminal",
    tag: "Information Architecture · Heuristic Evaluation",
    year: "2025"
  },
  {
    id: "A-03",
    title: "Velo Bike-Share Dashboard",
    tag: "Spatial UI · Usability Study",
    year: "2024"
  },
  {
    id: "A-04",
    title: "Apex Learning Platform",
    tag: "Interaction Design · Cognitive Walkthrough",
    year: "2024"
  },
  {
    id: "A-05",
    title: "Echo Audio Synthesis App",
    tag: "Acoustic Design · User Research",
    year: "2023"
  }
];

