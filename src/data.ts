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
  creator_launch: {
    name: "Creator Launch (MVP)",
    tag: "Help creators achieve their first digital sale in 7 days.",
    constitution: {
      vision: "Help content creators & indie authors achieve their first digital product sale within 7 days, circumventing complex setups.",
      corePrinciples: [
        "Keep it simple.",
        "Focus on action.",
        "Reduce uncertainty.",
        "Prioritize speed."
      ],
      successMetrics: [
        "First Sale Completed within 7 Days",
        "Conversion rate of landing page > 5%",
        "Under 10 minutes setup time for authors"
      ],
      constraints: [
        "Must launch in 7 days with zero custom backend development.",
        "Target newsletter creators exclusively for validation phase."
      ],
      forbiddenFeatures: [
        "Community platform (drift hazard)",
        "Creator marketplace (adds massive scope bleed)",
        "Enterprise dashboards & complex real-time analytics",
        "Team permissions and multi-user collaboration",
        "Full CRM and custom emailing servers"
      ]
    },
    cards: [
      { id: 'cl-1', type: 'vision', title: 'The First Sale Sprint', content: 'Focused on a single product page to make creators earn their first dollar.' },
      { id: 'cl-2', type: 'user', title: 'Newsletter Creators', content: 'Writers on Substack, Beehiiv or Mailchimp who have 500+ fans but zero products.' },
      { id: 'cl-3', type: 'problem', title: 'Over-engineered Platforms', content: 'Writers get stuck setting up complex courses or membership systems, and quit.' },
      { id: 'cl-4', type: 'mvp', title: 'One-Click Checkout & PDF', content: 'An ultra-focused product checkout page that delivers a PDF immediately.' },
      { id: 'cl-5', type: 'roadmap', title: 'Phase 1: 7-day Setup Wizard', content: 'Generate simple pre-configured payment links linked with Stripe.' }
    ]
  },
  creator_launch_val: {
    name: "Creator Launch (Validation)",
    tag: "Validate demand before building digital material.",
    constitution: {
      vision: "Prove creator demand and core willingness to pay via simple pre-orders before writing books or courses.",
      corePrinciples: [
        "Sell before you build.",
        "Validate true fan passion indicators first.",
        "Acknowledge early rejection as a design pivot."
      ],
      successMetrics: [
        "Reach 15 pre-orders before launching actual writing phase",
        "Page view conversion rate higher than 3%"
      ],
      constraints: [
        "No digital assets generated until checkout criteria is met.",
        "Maximum budget $50 for validation infrastructure."
      ],
      forbiddenFeatures: [
        "Automated video course players & transcripts (unnecessary)",
        "Affiliate networks or promoter tools"
      ]
    },
    cards: [
      { id: 'clv-1', type: 'vision', title: 'Pre-order Landing Canvas', content: 'Validate educational concepts via visual outline draft page.' },
      { id: 'clv-2', type: 'user', title: 'Aspiring Technical Educators', content: 'Engineers who want to teach but are afraid of writing 200 pages for 0 sales.' },
      { id: 'clv-3', type: 'problem', title: 'Sunk Cost in Unvalidated Books', content: 'Spending 3 months coding and writing, to find there is zero market appetite.' },
      { id: 'clv-4', type: 'mvp', title: 'Audience Pre-Order Sheet', content: 'Simple outline page with Stripe pre-orders.' },
      { id: 'clv-5', type: 'roadmap', title: 'Phase 1: Audience survey hook', content: 'Validate high intent topics before printing digital blueprints.' }
    ]
  },
  creator_launch_growth: {
    name: "Creator Launch (Growth)",
    tag: "Optimize high-performing newsletter funnels.",
    constitution: {
      vision: "Introduce programmatic newsletter newsletter sponsorships and optimized sales links to triple conversion rates.",
      corePrinciples: [
        "Double down on verified newsletter creators.",
        "Scale with clean text links.",
        "Strictly avoid heavy enterprise dashboards."
      ],
      successMetrics: [
        "Average basket increase of creators > 25%",
        "Checkout speed under 1.5 seconds"
      ],
      constraints: [
        "Platform fee must stay under 2%.",
        "Retain 100% offline-first author drafting."
      ],
      forbiddenFeatures: [
        "SaaS billing matrix tools (drift hazard)",
        "Enterprise permissions control setups"
      ]
    },
    cards: [
      { id: 'clg-1', type: 'vision', title: 'Frictionless Growth Loops', content: 'Embed small checkout widgets directly inside substack newsletters.' },
      { id: 'clg-2', type: 'user', title: 'Automated Creator Hubs', content: 'Creators with 10k+ readers who require bulletproof conversion links.' },
      { id: 'clg-3', type: 'problem', title: 'Leaky Checkout Funnels', content: 'Bulky pages containing headers/footers distract customers from purchasing.' },
      { id: 'clg-4', type: 'mvp', title: 'Optimized Text Sales Conduit', content: 'High-speed payment checkout window popping directly inside email flows.' },
      { id: 'clg-5', type: 'roadmap', title: 'Phase 1: Beehiiv native embed', content: 'Establish API hooks for simple text embeds.' }
    ]
  }
};
