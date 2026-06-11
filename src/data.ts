import { ConceptType, ColorSpec, FontSpec, BrandManifesto, SandboxCard, Constitution } from './types';

export const CONCEPTS: { id: ConceptType; name: string; tagline: string; description: string }[] = [
  {
    id: 'A',
    name: "Founder's Notebook",
    tagline: "The intimate digital Moleskine where raw thoughts find structure.",
    description: "Replicates the tactile, trusted companion feeling of sketching a million-dollar idea on high-quality paper. Grounded, personal, and unapologetically human."
  },
  {
    id: 'B',
    name: "Creative Sandbox",
    tagline: "An infinite, kinetic thinking-board where ideas collide.",
    description: "A spatial whiteboard canvas built for discovery. Combines the fluid collaboration of Miro with raw doodles, real pins, and organic connectors that make brainstorming active."
  },
  {
    id: 'C',
    name: "Product Workshop",
    tagline: "A high-discipline architectural blueprint that separates vision from noise.",
    description: "The ultimate synthesis of Vision and Discipline. Structured Swiss layouts and technical frames decorated with sketchy, engineering-grade pencil annotations."
  }
];

export const COLOR_PALETTES: Record<ConceptType, ColorSpec[]> = {
  A: [
    { name: 'Paper Yellow', hex: '#F4E1A1', role: 'Main background canvas for an warm, inviting paper feel', darkText: true },
    { name: 'Warm Cream', hex: '#FFF8E7', role: 'Secondary cards and lighter notebook segments', darkText: true },
    { name: 'Charcoal Black', hex: '#2B2B2B', role: 'Primary typography, sketchy lines, and firm borders', darkText: false },
    { name: 'Pencil Gray', hex: '#6B6B6B', role: 'Secondary commentary, notes, and auxiliary annotations', darkText: false },
    { name: 'Notebook Crimson', hex: '#B83F3F', role: 'Crucial rules, bookmark tabs, and primary action accents', darkText: false }
  ],
  B: [
    { name: 'Notebook Yellow', hex: '#F6E7A8', role: 'Main backdrop for brand recognition', darkText: true },
    { name: 'Creative Cream', hex: '#FDF7E2', role: 'Card backings and post-it bases', darkText: true },
    { name: 'Marker Charcoal', hex: '#232323', role: 'Dense contrast lines representing thick markers', darkText: false },
    { name: 'Playful Sage', hex: '#7D8F69', role: 'Approved ideas, positive metrics, and organic trails', darkText: false },
    { name: 'Muted Orange', hex: '#E89C3D', role: 'Kinetic widgets, active pointers, and interactive highlights', darkText: true }
  ],
  C: [
    { name: 'Blueprint Off-Yellow', hex: '#FAFAF1', role: 'Ultra-clean, crisp structural backing', darkText: true },
    { name: 'Pure White Paper', hex: '#FFFFFF', role: 'High-contrast widget grids and data displays', darkText: true },
    { name: 'Technical Steel', hex: '#3E424B', role: 'Heavy framework dividers and strict guidelines', darkText: false },
    { name: 'Blueprint Navy', hex: '#23395B', role: 'Architectural headings, anchors, and formal blocks', darkText: false },
    { name: 'Corrective Coral', hex: '#E05A47', role: 'Constraints, forbidden feature walls, and edit symbols', darkText: false }
  ]
};

export const TYPOGRAPHY_SPECS: Record<ConceptType, FontSpec[]> = {
  A: [
    { name: 'Playfair Display [Fallback]', category: 'Editorial Serif', usage: 'Cover Titles', pairing: 'Warm, classic, literary feeling', example: 'The SandBoxer Journal' },
    { name: 'Caveat (Interactive)', category: 'Tactile Script', usage: 'Handwritten annotations, doodles & warnings', pairing: 'Human raw ink marks', example: '💡 What if we build this offline first?' },
    { name: 'Inter Medium', category: 'Neutral Sans', usage: 'Body content, card text and readable copy', pairing: 'Perfect clarity over paper texture', example: 'Every feature must strictly justify its place in the Constitution.' },
    { name: 'JetBrains Mono', category: 'Technical Mono', usage: 'Page counters, dates, and metric data', pairing: 'Gives the notebook structural ground', example: 'PAGE_104 // 2026-06-11' }
  ],
  B: [
    { name: 'Space Grotesk Bold', category: 'Playful Display', usage: 'Major headers and main canvas title blocks', pairing: 'Modern, highly expressive, kinetic', example: 'INFINITE CREATIVE SPREAD' },
    { name: 'Caveat Bold', category: 'Marker handwriting', usage: 'Quick-fired ideas, arrows, and custom post-its', pairing: 'Fast ideation marker clicks', example: '🔥 CRITICAL PAIN POINT!' },
    { name: 'Inter Regular', category: 'Clean Sans', usage: 'System menus, input descriptors, and core body', pairing: 'Neutral support for layout energy', example: 'Drag components freely across the infinite thinking stage.' },
    { name: 'JetBrains Mono', category: 'Tech Mono', usage: 'Connection vectors, coordinates, and active cursors', pairing: 'Expresses live collaborative metrics', example: 'CREATOR_X: { x: 492, y: 120 }' }
  ],
  C: [
    { name: 'Space Grotesk Medium', category: 'Geometric display', usage: 'Formal blueprint titles and component labels', pairing: 'Structured, engineering-grade, clean', example: 'SECTION_04: ROADMAP ARCHITECTURE' },
    { name: 'JetBrains Mono Bold', category: 'Analytical Mono', usage: 'Core parameters, success metrics, constraints', pairing: 'Unwavering technical discipline', example: 'FAIL_SAFE_METRIC || BOOTSTRAP_LIMIT' },
    { name: 'Inter Regular', category: 'Structured Sans', usage: 'System documentation, reports, and detail lists', pairing: 'Ultra-legible, reliable interface weight', example: 'Defines the exact operational bounds before launching code.' },
    { name: 'Caveat', category: 'Technical Sketch', usage: 'Pencil corrections, redline cross-out rules', pairing: 'Gives rigid structures a soul', example: '🚫 NO CHAT BUBBLES!' }
  ]
};

export const BRAND_MANIFESTOS: Record<ConceptType, BrandManifesto> = {
  A: {
    philosophy: "Ideas deserve room to breathe in a space that feels physical. A notebook isn't just paper; it is a repository of courage and early dreams. By mimicking ink and warm Moleskine textures, we unlock raw founder honesty.",
    tagline: "Deciding what to build, written in stone and sketched in charcoal.",
    metaphor: "A premium leather journal sitting on a solid oak desk, filled with secrets.",
    accentStyles: "Hand-torn paper edges, horizontal ruling lines, coffee-stain accents, and red bookmark threads.",
    strengths: [
      "Extremely memorable: Looks like zero other software on Earth.",
      "High psychological safety: Ruled lines make draft thoughts feel safe to write.",
      "Beautiful contrast of human ink against warm natural paper."
    ],
    weaknesses: [
      "Rigid column layouts make dense data grids harder to represent.",
      "Can feel too singular-user/private, less 'enterprise multi-player'."
    ]
  },
  B: {
    philosophy: "The sandbox is an active playground. Creativity is messy, non-linear, and spatial. Connecting ideas with sketch threads and placing multi-colored cards on a giant board models the way the human brain actually maps dreams.",
    tagline: "The canvas of possibility where constraints collide with infinite dreams.",
    metaphor: "A massive design studio whiteboard overflowing with colorful sticky notes and live debates.",
    accentStyles: "Loose connectors, multi-user cursor traces, dynamic angle card rotations, paperclip widgets, and glowing active borders.",
    strengths: [
      "Incredibly fluid and scales instantly to large, messy conceptual schemas.",
      "Feels collaborative, energetic, and highly interactive.",
      "Enables fast spatial categorization of problems and user journeys."
    ],
    weaknesses: [
      "Without strict guide lines, the workspace can quickly turn into visual noise.",
      "Requires high interactive dexterity from the user."
    ]
  },
  C: {
    philosophy: "Freedom alone is chaos. The real magic happens when extreme vision meets meticulous discipline. By structuring the canvas inside an engineering blueprint, every raw concept is held accountable by strict constraints.",
    tagline: "The technical scaffolding for modern founders.",
    metaphor: "An architect's drawing board with technical T-squares, compasses, and drafting film.",
    accentStyles: "Grid rulers, dimension ticks, cross-out markers, index headers, outline-only buttons, and red corrective notes.",
    strengths: [
      "Conveys absolute authority, strategic discipline, and analytical precision.",
      "Perfect for managing complex constraints, forbidden features, and financial metrics.",
      "Exquisite fusion of crisp typography and architectural pencil annotations."
    ],
    weaknesses: [
      "Can feel slightly intimidating or cold to early-stage, non-tech dreamers.",
      "Higher visual formality might suppress radical, messy, out-of-the-box brainstorming."
    ]
  }
};

export const PRELOADED_STARTUPS: Record<string, { name: string; tag: string; constitution: Constitution; cards: SandboxCard[] }> = {
  sandboxer: {
    name: "SandBoxer",
    tag: "The Vision-First Product Architect",
    constitution: {
      vision: "To empower non-technical creators and serial founders to fully architect, critique, and clarify their products before writing a single line of wasteful code, restoring strategy over automated code volume.",
      corePrinciples: [
        "Vision before scaffolds: A feature must strictly prove its alignment with user value.",
        "Constraints generate quality: Limit scope early to force creative problem-solving.",
        "Aesthetic tactile companion: The tool must inspire the focused feeling of paper."
      ],
      successMetrics: [
        "Ratio of 'Value decided' vs 'Lines written' > 10x",
        "Average scope reduction of first MVP build by 40%",
        "Founder clarity rating post-session reaches > 9.5/10"
      ],
      constraints: [
        "Must remain 100% offline-first for intellectual privacy.",
        "No complex database boilerplate during the visualization phase."
      ],
      forbiddenFeatures: [
        "Standard AI Chatbots with standard text bubble spam.",
        "Auto-generation of bloated raw React code before strategic blueprinting is finished."
      ]
    },
    cards: [
      { id: 'sb-1', type: 'vision', title: 'The Ultimate Sandbox', content: 'A whiteboard combined with extreme strategic constraints to fight bloat.' },
      { id: 'sb-2', type: 'user', title: 'Founders & Indie Hackers', content: 'People with 100 vague ideas but zero energy to write another unvalidated landing page.' },
      { id: 'sb-3', type: 'problem', title: 'The Code-First Trap', content: 'Founders start coding immediately, build the wrong database, waste 3 months, and burn out.' },
      { id: 'sb-4', type: 'mvp', title: 'The Blueprint Interactive Render', content: 'Produce a spatial, beautiful mock-up book that users can show early backers.' },
      { id: 'sb-5', type: 'roadmap', title: 'Phase 1: Pure Visual Spec', content: 'Polish the design-thinking interactive sheets to absolute founder grade.' }
    ]
  },
  castle_bnb: {
    name: "Fortress BnB",
    tag: "Airbnb for Historic Estates & Fortresses",
    constitution: {
      vision: "To make authentic historic defense estates, active castles, and medieval towers accessible to modern experiential travelers, funding private heritage preservation.",
      corePrinciples: [
        "Uncompromised architectural authenticity.",
        "Direct-to-preservation funding (30% of booking proceeds go straight to brick-and-mortar repairs).",
        "Immersive local hosting: Guests live like castellans."
      ],
      successMetrics: [
        "Average host retention rate over 24 months > 92%",
        "Historic preservation funding generated in Year 1 > $5M",
        "Guest safety & travel rating averages > 4.9 stars"
      ],
      constraints: [
        "Properties must be officially designated historical monuments or over 250 years old.",
        "Zero modifications to original structure allowed."
      ],
      forbiddenFeatures: [
        "Standard modern hotel chains listings.",
        "Fast-track automated booking without host interview."
      ]
    },
    cards: [
      { id: 'c-1', type: 'vision', title: 'Medieval Immersive Stays', content: 'Connecting history buffs with real castles that require preservation funding.' },
      { id: 'c-2', type: 'user', title: 'The Experiential Voyager', content: 'Wealthy culture explorers looking for unique, highly memorable group events or family stays.' },
      { id: 'c-3', type: 'problem', title: 'Crippling Castle Upkeep', content: 'Estates cost $200k/year in basic masonry upkeep. Owners are forced to sell to commercial developers.' },
      { id: 'c-4', type: 'mvp', title: 'Castles of Ireland Curated Registry', content: 'Launch with 12 legendary castle owners willing to accept booking trials.' },
      { id: 'c-5', type: 'roadmap', title: 'Milestone 1: The Booking Registry', content: 'Establish structural insurance coverage structure for historical masonry.' }
    ]
  },
  scribe: {
    name: "Scribe Slate",
    tag: "High-Focus Digital Journaling Companion",
    constitution: {
      vision: "To design a distraction-free digital ecosystem for expressive writing, helping authors capture thoughts without notifications or analytics.",
      corePrinciples: [
        "Absolute digital hermeticism: Zero internet sync while writing is active.",
        "Preserve raw typography: Minimal layouts using monospace fonts to center on words.",
        "Tactile typewriter feedback."
      ],
      successMetrics: [
        "Average session length exceeds 45 uninterrupted minutes",
        "Zero words lost due to local disk failure",
        "User cognitive focus self-score improvement > 35%"
      ],
      constraints: [
        "Must operate perfectly with low battery on e-ink devices.",
        "Maximum 2 active configurations available to user."
      ],
      forbiddenFeatures: [
        "Social sharing hooks like 'Post snippet to Twitter/X'.",
        "Gamified progress streaks and active pop-up push reminders."
      ]
    },
    cards: [
      { id: 'sc-1', type: 'vision', title: 'Unchallenged Focus Room', content: 'A plain dark slate viewport that completely isolates text and typewriter sounds.' },
      { id: 'sc-2', type: 'user', title: 'The Distracted Author', content: 'Creative writers and diarists who find themselves checking notifications in Notion or Word.' },
      { id: 'sc-3', type: 'problem', title: 'The Endless SaaS Feed', content: 'Modern software is designed to feed dopamine, which kills long-form reflective planning.' },
      { id: 'sc-4', type: 'mvp', title: 'The Local Desktop Applet', content: 'Create a single fullscreen keyboard editor with audio typing hums.' },
      { id: 'sc-5', type: 'roadmap', title: 'Milestone 2: Hardware E-Ink Port', content: 'Port the local canvas directly onto Raspberry Pi and Kindle screens.' }
    ]
  }
};
