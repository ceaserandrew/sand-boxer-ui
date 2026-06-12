import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  Plus, 
  Compass, 
  Clock, 
  HelpCircle, 
  Bookmark, 
  Layers, 
  Activity, 
  BrainCircuit, 
  CheckCircle, 
  Heart,
  TrendingUp,
  AlertTriangle,
  History,
  GitCommit,
  Share2,
  Trash2,
  Minimize2,
  Zap,
  ArrowRight
} from 'lucide-react';
import { SandboxCard, Constitution } from '../types';

interface ProjectNotebook {
  id: string;
  name: string;
  tag: string;
  stage: 'Ideation' | 'Validation' | 'MVP' | 'Growth';
  alignmentScore: number;
  riskScore: number;
  lastDecision: string;
  lastActivity: string;
  visionStatement: string;
  dormant: boolean;
  coverColor: string;
  handwrittenNote?: string;
  tags: string[];
  connections: string[];
  sharedAudience: string;
  sharedRisks: string[];
}

interface FounderLibraryProps {
  startupBlueprints: Record<string, {
    name: string;
    tag: string;
    constitution: Constitution;
    cards: SandboxCard[];
  }>;
  onSelectProject: (key: string) => void;
  activeProjectKey: string;
  onCreateProject: () => void;
  onDeleteProject: (key: string) => void;
  conceptId: 'A' | 'B' | 'C';
  onTriggerDemoWizard?: () => void;
}

export default function FounderLibrary({
  startupBlueprints,
  onSelectProject,
  activeProjectKey,
  onCreateProject,
  onDeleteProject,
  conceptId,
  onTriggerDemoWizard
}: FounderLibraryProps) {
  // Modes of the Library
  const [libraryMode, setLibraryMode] = useState<'shelf' | 'grid' | 'universe' | 'timeline' | 'decisions'>('shelf');
  const [hoveredNotebook, setHoveredNotebook] = useState<string | null>(null);
  const [zoomNotebookDetail, setZoomNotebookDetail] = useState<ProjectNotebook | null>(null);

  // Map state startups into richer project metadata for visual representation
  const projects: Record<string, ProjectNotebook> = {
    creator_launch: {
      id: 'creator_launch',
      name: "Creator Launch (MVP)",
      tag: "Help creators achieve their first digital sale in 7 days.",
      stage: 'MVP',
      alignmentScore: 92,
      riskScore: 24,
      lastDecision: "Killed the 'Community Forum' widget expansion proposal. Focus strictly on First Sale completed.",
      lastActivity: "3 hours ago",
      visionStatement: "Help content creators & indie authors achieve their first digital product sale within 7 days, circumventing complex setups.",
      dormant: false,
      coverColor: "bg-notebook-crimson text-white",
      handwrittenNote: "Must resist standard complex dashboards setup. Retain focused PDF drop.",
      tags: ["Creator Economy", "Stripe Checkout", "Offline First"],
      connections: ["creator_launch_val"],
      sharedAudience: "Newsletter Creators & Substack Writers",
      sharedRisks: ["High competition from traditional course builders"]
    },
    creator_launch_val: {
      id: 'creator_launch_val',
      name: "Creator Launch (Validation)",
      tag: "Validate demand before building digital material.",
      stage: 'Validation',
      alignmentScore: 71,
      riskScore: 68,
      lastDecision: "Rejected complex automated surveys. Setup live Stripe pre-order checkout instead.",
      lastActivity: "Yesterday",
      visionStatement: "Prove creator demand and core willingness to pay via simple pre-orders before writing books or courses.",
      dormant: true,
      coverColor: "bg-emerald-800 text-yellow-50",
      handwrittenNote: "Upkeep validation overhead. Audience surveys represent main validator bottleneck.",
      tags: ["Audience First", "Pre-Orders", "High Leverage"],
      connections: ["creator_launch"],
      sharedAudience: "Technical Bloggers & Educators",
      sharedRisks: ["Requires pre-existing newsletter followers or partner networks"]
    },
    creator_launch_growth: {
      id: 'creator_launch_growth',
      name: "Creator Launch (Growth)",
      tag: "Optimize high-performing newsletter funnels.",
      stage: 'Growth',
      alignmentScore: 85,
      riskScore: 35,
      lastDecision: "Rejected enterprise dashboards to retain highly focused individual user metrics.",
      lastActivity: "4 days ago",
      visionStatement: "Introduce programmatic newsletter sponsorships and optimized sales links to triple conversion rates.",
      dormant: false,
      coverColor: "bg-slate-700 text-amber-50",
      handwrittenNote: "Single-sales landing optimization is the key multiplier.",
      tags: ["Funnel Optimization", "Mailchimp Embed", "Scale Phase"],
      connections: ["creator_launch"],
      sharedAudience: "Serial Solopreneurs & High Volume Fans",
      sharedRisks: ["Adversary platform API updates changing email layout structures"]
    }
  };

  // Supplement user-created projects
  Object.keys(startupBlueprints).forEach((key) => {
    if (!projects[key]) {
      const blueprint = startupBlueprints[key];
      projects[key] = {
        id: key,
        name: blueprint.name,
        tag: blueprint.tag || "Custom Blueprint draft",
        stage: 'Ideation',
        alignmentScore: 80,
        riskScore: 45,
        lastDecision: "Initialized project constitution rules.",
        lastActivity: "Freshly Created",
        visionStatement: blueprint.constitution?.vision || "A new startup seed designed to challenge excess.",
        dormant: false,
        coverColor: "bg-amber-800 text-yellow-50",
        handwrittenNote: "Fresh notebook. Clean slate.",
        tags: ["Custom Project", "Sovereign Venture"],
        connections: ["creator_launch"],
        sharedAudience: "Undiscovered Niche",
        sharedRisks: ["Unproven initial market willingness to pay"]
      };
    }
  });

  const projectList = Object.values(projects);

  // Timeline events of founder decisions
  const timelineEvents = [
    {
      date: "Jun 11, 19:34",
      project: "Creator Launch (MVP)",
      type: "pivotal",
      desc: "Swapped out over-engineered auto-transcripts card drafts. Retained typewriter-simple PDF drop.",
      gain: "+12% Alignment"
    },
    {
      date: "Jun 10, 14:15",
      project: "Creator Launch (Validation)",
      type: "risk",
      desc: "Rejected complex creator subscription systems. Kept single product pre-order setup.",
      gain: "Scope Reduced"
    },
    {
      date: "Jun 08, 09:12",
      project: "Creator Launch (Growth)",
      type: "strategic",
      desc: "Rejected premium team permission tiers to retain focused individual workflow.",
      gain: "Perfect Focus"
    },
    {
      date: "Jun 05, 11:30",
      project: "Creator Launch (MVP)",
      type: "creation",
      desc: "Opened empty yellow sketchbook. Set core principle 'Focus on action' for first sales sprint.",
      gain: "First Seed"
    }
  ];

  return (
    <div className="font-sans text-charcoal">
      {/* Intro Header Section */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-2 border-charcoal/10 pb-4">
        <div>
          <span className="font-mono text-[10px] text-notebook-crimson font-black uppercase tracking-widest block mb-1">
            📓 THE CHRONICLES OF ENDEAVOR
          </span>
          <h2 className="text-3xl font-serif font-black tracking-tight text-charcoal">
            Founder Library
          </h2>
          <p className="text-xs text-pencil-gray font-sans max-w-xl mt-1 leading-relaxed">
            The private archive of your startup universe. Click any notebook to open its strategy cards, or explore the galaxy and your timeline below to navigate connections.
          </p>
        </div>

        {/* View Mode Switching Controls */}
        <div className="flex flex-wrap items-center bg-[#FFFBEB] p-1.5 border-2 border-charcoal rounded-xl shadow-sm gap-1">
          {[
            { id: 'shelf', label: '🪵 Bookshelf View', desc: 'Tactile stacked spine view' },
            { id: 'grid', label: '🎴 Journal Cards', desc: 'Detailed covers grid' },
            { id: 'universe', label: '🌌 Brain Universe', desc: 'Cosmic project connections' },
            { id: 'timeline', label: '⏳ Journey Timeline', desc: 'Historical pivot track' },
            { id: 'decisions', label: '⚖️ Risk Assessment', desc: 'Evaluation dashboard' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setLibraryMode(mode.id as any)}
              className={`px-3 py-1.5 text-[10.5px] font-mono font-bold uppercase rounded-lg transition-all ${
                libraryMode === mode.id
                  ? 'bg-charcoal text-white shadow-inner scale-102 font-black'
                  : 'text-charcoal/70 hover:bg-charcoal/5 hover:text-charcoal'
              }`}
              title={mode.desc}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Tutorial Banner */}
      {onTriggerDemoWizard && (
        <div className="bg-gradient-to-r from-amber-50 to-[#FCF6DF] border-3 border-dashed border-[#B83F3F]/60 p-5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 mb-6 shadow-sm relative overflow-hidden animate-fade-in group" id="intro-tutorial-guided-banner">
          <div className="absolute top-0 right-0 px-2.5 py-1 bg-notebook-crimson text-white text-[9px] font-mono font-black uppercase tracking-widest rounded-bl-xl border-b border-l border-charcoal/30">
            CLASSROOM TRIAL
          </div>
          <div className="flex items-start gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-notebook-yellow border-2 border-charcoal flex items-center justify-center shrink-0 shadow-sm animate-bounce">
              <Sparkles className="w-5 h-5 text-notebook-crimson" />
            </div>
            <div>
              <h4 className="font-serif font-black text-[#B83F3F] flex items-center gap-2">
                <span>Explore SandBoxer Core: The CreatorLaunch Interactive Demo!</span>
              </h4>
              <p className="text-[11px] text-pencil-gray mt-1 leading-relaxed font-sans max-w-xl">
                Learn how SandBoxer prevents <strong>product bloat</strong> (drift) by making active strategic decisions for the canonical <strong>CreatorLaunch</strong> project. Live-test your founder instincts!
              </p>
            </div>
          </div>
          <button
            onClick={onTriggerDemoWizard}
            className="px-4 py-2 bg-charcoal text-[#fff8e7] hover:bg-neutral-800 rounded-xl font-mono text-[10.5px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm hover:scale-102 cursor-pointer shrink-0"
            id="trigger-demo-wizard-shelf-button"
          >
            <span>Start Interactive Demo Guide</span>
            <ArrowRight className="w-4 h-4 text-notebook-yellow shrink-0 animate-pulse" />
          </button>
        </div>
      )}

      {/* RENDER MODES */}
      <div className="space-y-6">

        {/* MODE 1: BOOKSHELF CONTAINER */}
        {libraryMode === 'shelf' && (
          <div className="space-y-8 animate-fade-in">
            {/* Shelf Graphic Area */}
            <div className="bg-[#FAF3D1]/50 border-4 border-charcoal p-6 rounded-3xl shadow-notebook relative overflow-hidden min-h-[420px] flex flex-col justify-between">
              <div className="absolute inset-0 bg-dot-matrix opacity-[0.08] pointer-events-none" />
              
              {/* Shelf header labels */}
              <div className="flex justify-between items-center border-b border-charcoal/15 pb-2 border-dashed relative z-10">
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-black">
                  SHELF 1 // ACTIVE STRATEGIES & PIVOT RUNS
                </span>
                <span className="text-[10px] font-mono text-notebook-crimson font-black">
                  {projectList.length} BOOKS SEEDED
                </span>
              </div>

              {/* The Books Layout */}
              <div className="flex items-end justify-center gap-4 py-8 relative z-10 shrink-0 flex-wrap overflow-y-visible">
                
                {/* Visual stacked book spines */}
                {projectList.map((notebook, index) => {
                  const isActive = activeProjectKey === notebook.id;
                  const isHovered = hoveredNotebook === notebook.id;
                  
                  // Vary lengths of books slightly for human feel
                  const bookHeight = notebook.dormant ? 'h-[250px] opacity-75' : index % 2 === 0 ? 'h-[280px]' : 'h-[295px]';
                  const bookWidth = index % 3 === 0 ? 'w-11' : 'w-12';
                  
                  // Color codes
                  let bookColor = 'bg-notebook-crimson';
                  if (notebook.id === 'creator_launch_val') bookColor = 'bg-[#1e4e3e]';
                  if (notebook.id === 'creator_launch_growth') bookColor = 'bg-[#3b445c]';
                  if (notebook.id.startsWith('project_')) bookColor = 'bg-[#82441a]';
                  
                  return (
                    <div
                      key={notebook.id}
                      onMouseEnter={() => setHoveredNotebook(notebook.id)}
                      onMouseLeave={() => setHoveredNotebook(null)}
                      onClick={() => onSelectProject(notebook.id)}
                      className={`relative cursor-pointer transition-all duration-300 transform origin-bottom hover:-translate-y-5 flex flex-col justify-between items-center rounded-t-md border-3 border-charcoal pb-4 shadow-xl ${bookHeight} ${bookWidth} ${bookColor} ${
                        isActive ? 'ring-4 ring-offset-2 ring-notebook-crimson scale-102 -translate-y-2' : ''
                      }`}
                      style={{
                        transform: isHovered ? 'scale(1.03) translateY(-14px) rotate(1deg)' : isActive ? 'translateY(-8px)' : 'rotate(0deg)'
                      }}
                    >
                      {/* Book spine elements */}
                      <div className="w-full text-center py-2 h-full flex flex-col justify-between items-center font-mono">
                        {/* Book banding strip */}
                        <div className="w-full h-2 bg-charcoal/25 border-b border-white/20" />
                        
                        {/* Upright vertical spine text */}
                        <div 
                          className="text-[11px] font-black tracking-wider uppercase text-white/90 select-none pb-4 font-display flex flex-col gap-1 items-center justify-center [writing-mode:vertical-lr] shrink-0"
                          style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.4)', direction: 'rtl' }}
                        >
                          <span className="mb-2 text-notebook-yellow font-sans shrink-0">
                            {notebook.id === 'creator_launch_val' ? '🔍' : notebook.id === 'creator_launch_growth' ? '📈' : '📒'}
                          </span>
                          {notebook.name}
                        </div>

                        {/* Visual alignment meter on spine */}
                        <div className="w-4/5 px-0.5 space-y-1">
                          <div className="text-[7.5px] font-bold text-white/80 scale-90">{notebook.alignmentScore}%</div>
                          <div className="w-full h-1 bg-charcoal/40 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-notebook-yellow" 
                              style={{ width: `${notebook.alignmentScore}%` }} 
                            />
                          </div>
                        </div>

                        {/* Ribbon bookmark hanging out of book */}
                        {isActive && (
                          <div className="absolute -bottom-6 left-1/3 w-2.5 h-7 bg-notebook-crimson border-r-2 border-b-2 border-charcoal rounded-b shadow-sm z-25 opacity-100" />
                        )}
                        
                        {/* Dust overlay if dormant */}
                        {notebook.dormant && (
                          <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px] rounded-t-sm pointer-events-none border-b border-dashed border-white/20" title="Dormant" />
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* THE NEW FRESH BOOK CONTAINER FOR CTA */}
                <div
                  onClick={onCreateProject}
                  className="h-[250px] w-12 border-3 border-dashed border-charcoal/40 hover:border-charcoal bg-white/60 hover:bg-[#FFFDF3] rounded-t-md flex flex-col justify-center items-center cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-4 group relative"
                  title="Open a Fresh Notebook"
                >
                  <div className="relative text-center font-mono text-[9px] text-charcoal/60 group-hover:text-charcoal uppercase block [writing-mode:vertical-lr] py-4 font-extrabold tracking-widest gap-2">
                    <Plus className="w-4 h-4 rotate-90 text-notebook-crimson stroke-[3px]" />
                    <span>OPEN FRESH notebook</span>
                  </div>
                </div>

              </div>

              {/* Visual Wooden Bookshelf bar structure */}
              <div className="w-full h-7 bg-[#8B5E3C] border-4 border-charcoal rounded-md shadow-2xl relative flex items-center justify-between px-6">
                {/* Wood grains aesthetic lines */}
                <div className="absolute inset-0 bg-wood-grain pointer-events-none opacity-20" />
                <div className="w-16 h-1 bg-[#D2B48C] rounded-full opacity-40" />
                <div className="w-24 h-1 bg-[#D2B48C] rounded-full opacity-40 ml-auto" />
              </div>

              {/* HOVER NOTEBOOK SUMMARY FLOATING DESK NOTE */}
              <div className="h-28 mt-4 bg-white/95 border-3 border-charcoal relative p-3 rounded-2xl rotate-[-0.5deg] shadow-lg flex items-center justify-between">
                <div className="absolute -top-3 left-4 bg-charcoal text-white rounded font-mono text-[8.5px] uppercase font-black px-2 py-0.5">
                  📁 Active Desk Workspace Reader
                </div>

                {hoveredNotebook || activeProjectKey ? (
                  (() => {
                    const focusNotebook = projects[hoveredNotebook || activeProjectKey];
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 w-full">
                        <div className="md:col-span-5 space-y-1">
                          <h4 className="font-serif font-black text-lg text-charcoal flex items-center gap-1.5 leading-none">
                            <span>{focusNotebook.name}</span>
                            <span className="text-[10px] bg-charcoal/5 px-2 py-0.5 rounded border border-charcoal text-pencil-gray font-mono font-bold uppercase shrink-0">
                              {focusNotebook.stage}
                            </span>
                          </h4>
                          <p className="text-[11px] text-pencil-gray leading-tight line-clamp-2">
                            "{focusNotebook.visionStatement}"
                          </p>
                        </div>

                        <div className="md:col-span-4 space-y-1 border-t md:border-t-0 md:border-l border-charcoal/15 pl-0 md:pl-4">
                          <span className="text-[8.5px] font-mono text-charcoal block uppercase tracking-wider font-extrabold">
                            💡 RECENT MAJOR DECISION:
                          </span>
                          <p className="text-[10px] text-notebook-crimson font-hand font-semibold leading-snug line-clamp-2">
                            "{focusNotebook.lastDecision}"
                          </p>
                        </div>

                        <div className="md:col-span-3 text-right flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-charcoal/15 pl-0 md:pl-4">
                          <div>
                            <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block font-black">
                              ALIGNMENT RATING
                            </span>
                            <span className="font-display font-black text-xl text-charcoal leading-none">
                              {focusNotebook.alignmentScore}%
                            </span>
                          </div>
                          
                          <button
                            onClick={() => onSelectProject(focusNotebook.id)}
                            className="bg-notebook-yellow hover:bg-yellow-400 text-charcoal border-2 border-charcoal px-3 py-1 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider flex items-center gap-1 transition-all"
                          >
                            <span>Open Cards Deck</span>
                            <BookOpen className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="flex items-center gap-2 justify-center w-full text-zinc-400">
                    <HelpCircle className="w-5 h-5 text-zinc-300" />
                    <span className="font-mono text-xs italic">Hover over any startup notebook spine on the shelf to preview its state parameters...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Empty state nudge */}
            {projectList.length === 0 && (
              <div className="bg-white border-4 border-charcoal p-8 text-center rounded-[2.5rem] relative shadow-lg">
                <span className="font-hand text-3xl text-notebook-crimson block mb-2">No startup books on the rack...</span>
                <p className="text-sm text-pencil-gray font-sans max-w-sm mx-auto mb-4">
                  Every seasoned founder starts with an empty shelf. Open a crisp fresh notebook to write down your initial vision guidelines!
                </p>
                <button
                  onClick={onCreateProject}
                  className="px-6 py-3 bg-charcoal text-white rounded-xl font-mono text-xs font-black uppercase tracking-widest hover:bg-neutral-800 transition-transform hover:scale-102"
                >
                  ✏️ Open Your First Notebook
                </button>
              </div>
            )}
          </div>
        )}


        {/* MODE 2: TACTILE GRID VIEW */}
        {libraryMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {projectList.map((notebook) => {
              const isActive = activeProjectKey === notebook.id;
              
              return (
                <div
                  key={notebook.id}
                  onClick={() => onSelectProject(notebook.id)}
                  className={`bg-white border-3 border-charcoal rounded-[2rem] p-5 relative cursor-pointer hover:shadow-2xl transition-all hover:scale-[1.01] ${
                    isActive ? 'bg-[#FCF9EC] ring-3 ring-notebook-crimson border-notebook-crimson' : 'shadow-notebook'
                  }`}
                >
                  {/* Bookmark tag ornament */}
                  <div className={`absolute top-0 right-6 w-8 h-10 border-b-2 border-charcoal shadow-sm flex items-end justify-center pb-1 ${
                    notebook.id === 'creator_launch_val' ? 'bg-[#1e4e3e] text-white' : notebook.id === 'creator_launch_growth' ? 'bg-[#3b445c] text-white' : 'bg-notebook-crimson text-white'
                  }`}>
                    <span className="text-[10px] font-mono font-bold leading-none select-none uppercase">
                      {notebook.alignmentScore}%
                    </span>
                  </div>

                  <div className="space-y-4 pr-10">
                    <div>
                      <span className="font-mono text-[9px] bg-charcoal/5 text-[#E05A47] px-2 py-0.5 rounded font-black uppercase">
                        STAGE: {notebook.stage}
                      </span>
                      <h3 className="text-xl font-serif font-black text-charcoal mt-1 flex items-center gap-1">
                        <span>{notebook.name}</span>
                        {notebook.dormant && <span className="text-[9px] text-[#A2A2A2] font-mono font-bold">(Dormant)</span>}
                      </h3>
                      <p className="text-[10.5px] text-pencil-gray font-mono italic leading-tight mt-0.5">
                        {notebook.tag}
                      </p>
                    </div>

                    <p className="text-xs text-pencil-gray leading-normal bg-charcoal/[0.02] p-2.5 rounded-lg border border-charcoal/5 font-sans">
                      "{notebook.visionStatement}"
                    </p>

                    {/* Handwriting notes slot */}
                    {notebook.handwrittenNote && (
                      <div className="pt-2 border-t border-dashed border-charcoal/10 relative">
                        <div className="absolute top-2 left-0 text-[10px] font-mono text-zinc-300 select-none bg-white px-1 -translate-y-3.5">
                          ✏️ SKETCH RULE
                        </div>
                        <p className="font-hand text-base text-notebook-crimson font-medium leading-normal pt-1.5">
                          "{notebook.handwrittenNote}"
                        </p>
                      </div>
                    )}

                    {/* Tags footprint */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {notebook.tags.map(t => (
                        <span key={t} className="text-[9px] font-mono border border-charcoal/15 text-zinc-500 rounded bg-[#FFFDF7] px-1.5 py-0.5 font-semibold">
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[9.5px] text-zinc-400 font-mono">
                        Last synced: {notebook.lastActivity}
                      </span>
                      <span className="text-xs font-mono font-black text-notebook-crimson hover:underline uppercase tracking-wide flex items-center gap-1">
                        <span>Edit Cards</span>
                        <Zap className="w-3 h-3" />
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}


        {/* MODE 3: FOUNDER UNIVERSE (CONNECTION STELLAR GALAXY) */}
        {libraryMode === 'universe' && (
          <div className="bg-[#121214] text-[#fff8e7] border-4 border-charcoal p-6 rounded-3xl shadow-2xl relative overflow-hidden min-h-[480px] flex flex-col justify-between animate-fade-in">
            {/* Retro grid dot backdrop */}
            <div className="absolute inset-0 bg-dot-matrix opacity-[0.06] pointer-events-none" />
            
            {/* Title HUD overlay */}
            <div className="flex justify-between items-start relative z-10">
              <div>
                <span className="font-mono text-[9px] text-[#E89C3D] font-black uppercase tracking-widest block">
                  🛡️ CONSTELLATION MAPPING MATRIX
                </span>
                <h3 className="text-xl font-display font-black text-white">
                  Founder Universe Galaxy
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  Tracing cross-startup synergy overlaps, asset connections, and recycled assumptions.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-2 rounded-lg text-[9.5px] font-mono space-y-1 text-right max-w-xs">
                <span className="text-emerald-300 font-bold block">🟢 AUDIENCE RETENTION CONDUIT:</span>
                <span className="text-zinc-300 block">Indie hackers & Creators carry zero boilerplates from Scribe Slate straight into SandBoxer!</span>
              </div>
            </div>

            {/* The Interactive Galaxy space */}
            <div className="relative h-[250px] w-full flex items-center justify-center my-6">
              
              {/* Cosmic center core representing "The Founder's Brain" */}
              <div className="absolute w-28 h-28 bg-[#E89C3D]/10 rounded-full border-2 border-dashed border-[#E89C3D]/40 flex flex-col items-center justify-center animate-spin" style={{ animationDuration: '40s' }} />
              <div className="absolute w-20 h-20 bg-stone-900 rounded-full border-3 border-[#E89C3D] flex flex-col items-center justify-center p-2 text-center shadow-lg relative z-25">
                <BrainCircuit className="w-5 h-5 text-[#E89C3D] animate-pulse" />
                <span className="text-[8.5px] font-mono font-black text-white mt-1 uppercase leading-none">
                  Core Mind
                </span>
              </div>

              {/* Orbit rings */}
              <div className="absolute w-64 h-64 rounded-full border border-white/20 pointer-events-none" />
              <div className="absolute w-96 h-96 rounded-full border border-white/5 pointer-events-none" />

              {/* Draw connected nodes in orbital angles */}
              {projectList.map((notebook, idx) => {
                const angle = (idx * (360 / projectList.length) * Math.PI) / 180;
                const radius = 130; // Orbit distance
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                const isFocus = activeProjectKey === notebook.id;
                
                return (
                  <div
                    key={notebook.id}
                    onClick={() => onSelectProject(notebook.id)}
                    className="absolute cursor-pointer group transition-transform hover:scale-105 z-20 flex flex-col items-center"
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                  >
                    {/* Filament Connection line drawing outward */}
                    <div 
                      className="absolute w-0.5 bg-dashed border-l border-white/20 origin-top pointer-events-none"
                      style={{
                        height: `${radius}px`,
                        transform: `rotate(${angle + Math.PI/2}rad) translateY(-${radius}px)`,
                        zIndex: -1
                      }}
                    />

                    {/* Glowing project orb */}
                    <div className={`w-12 h-12 rounded-full border-2 border-white flex items-center justify-center shadow-lg transition-all ${
                      isFocus ? 'bg-[#E89C3D] border-[#E89C3D] shadow-[#E89C3D]/30 scale-110' : 'bg-charcoal border-white/40 group-hover:border-white'
                    }`}>
                      <span className="text-lg leading-none">
                        {notebook.id === 'creator_launch_val' ? '🔍' : notebook.id === 'creator_launch_growth' ? '📈' : '📒'}
                      </span>
                    </div>

                    {/* Overlaid label */}
                    <div className="mt-1 bg-black/75 border border-white/10 rounded px-2 py-0.5 text-center text-[9px] font-mono select-none">
                      <div className="font-bold text-white uppercase">{notebook.name}</div>
                      <div className="text-emerald-400 font-extrabold text-[8px]">{notebook.alignmentScore}% Aligned</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Insight Panel */}
            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl relative z-10 text-[10.5px] space-y-1">
              <div className="flex items-center gap-1.5 text-notebook-yellow font-black uppercase text-[9px]">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>COGNITIVE OVERVIEW MATRIX PATTERN:</span>
              </div>
              <p className="text-zinc-300 font-sans">
                Notice: **Creator Launch (MVP)** and **Creator Launch (Validation)** are highly coupled because they share the core user persona segment (Newsletter Authors who value speed). Any validation findings from audience pre-orders automatically refine the MVP's focused checkout page layout.
              </p>
            </div>
          </div>
        )}


        {/* MODE 4: JOURNEY TIMELINE OF ENTREPRENEUR PIVOTS */}
        {libraryMode === 'timeline' && (
          <div className="bg-[#FFFDF3] border-4 border-charcoal p-6 rounded-3xl shadow-notebook animate-fade-in relative">
            <div className="absolute inset-0 bg-ruled-paper opacity-[0.05] pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="border-b border-charcoal/10 pb-2">
                <span className="font-mono text-[9px] text-[#B83F3F] font-black uppercase tracking-widest block">
                  ⌛ HISTORIC REVISION ARCHIVE
                </span>
                <h3 className="text-xl font-serif font-black text-charcoal">
                  Entrepreneurial Evolution Chronicle
                </h3>
              </div>

              {/* Timeline graphic flow */}
              <div className="relative pl-6 border-l-2 border-charcoal/40 space-y-8 ml-2 py-2">
                {timelineEvents.map((ev, index) => (
                  <div key={index} className="relative group">
                    {/* Stepping node circle */}
                    <div className="absolute -left-9 top-1 w-5 h-5 rounded-full bg-white border-3 border-charcoal flex items-center justify-center group-hover:bg-[#F6E7A8] transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-notebook-crimson" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                        <span className="text-[#B83F3F] font-extrabold block">
                          [{ev.date}]
                        </span>
                        <span className="bg-charcoal text-white font-bold px-1.5 py-0.5 rounded uppercase font-mono text-[8.5px]">
                          {ev.project}
                        </span>
                        <span className="text-zinc-400 font-bold">»</span>
                        <span className="text-emerald-700 font-black uppercase tracking-wider text-[9px] bg-emerald-50 border border-emerald-200 px-1.5 rounded">
                          {ev.gain}
                        </span>
                      </div>
                      <p className="font-hand text-lg text-charcoal leading-snug font-medium pl-1">
                        "{ev.desc}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom incentive statement */}
              <div className="border-t border-dashed border-charcoal/15 pt-4 text-center">
                <p className="text-[11px] text-pencil-gray font-mono italic">
                  "Pivoting is the currency of survival. Every rule removed prevents visual bloat."
                </p>
              </div>
            </div>
          </div>
        )}


        {/* MODE 5: RISK EVALUATION ASSESSMENT */}
        {libraryMode === 'decisions' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Box A: Most Strategic Aligned Blueprints */}
              <div className="bg-[#FAFDF6] border-3 border-charcoal rounded-3xl p-5 shadow-notebook space-y-4">
                <div className="flex items-center gap-1.5 text-emerald-800 border-b border-charcoal/10 pb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <h4 className="font-display font-black text-xs uppercase tracking-wider text-[#1e4e3e]">
                    Highly Aligned Blueprints
                  </h4>
                </div>

                <div className="space-y-3">
                  {projectList
                    .filter(p => !p.dormant)
                    .sort((a,b) => b.alignmentScore - a.alignmentScore)
                    .map(nb => (
                      <div key={nb.id} className="p-3 bg-white border border-charcoal/10 rounded-xl flex justify-between items-center">
                        <div>
                          <span className="text-xs font-bold font-serif text-charcoal">{nb.name}</span>
                          <span className="text-[9.5px] text-zinc-400 font-mono block">Stage: {nb.stage}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-xs text-emerald-700 font-black block">{nb.alignmentScore}% score</span>
                          <span className="text-[8px] uppercase tracking-wide bg-emerald-50 text-emerald-800 border border-emerald-200 px-1 py-0.5 rounded font-mono font-bold leading-none block mt-1">
                            Minimal Risk Path
                          </span>
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              {/* Box B: Riskiest Unvalidated Projects needing customer validation */}
              <div className="bg-[#FFF7F6] border-3 border-charcoal rounded-3xl p-5 shadow-notebook space-y-4">
                <div className="flex items-center gap-1.5 text-amber-800 border-b border-charcoal/10 pb-2">
                  <AlertTriangle className="w-4 h-4 text-[#EAD2AC]" />
                  <h4 className="font-display font-black text-xs uppercase tracking-wider text-charcoal">
                    Riskiest Assumptions Pending
                  </h4>
                </div>

                <div className="space-y-3">
                  {projectList
                    .sort((a,b) => b.riskScore - a.riskScore)
                    .map(nb => (
                      <div key={nb.id} className="p-3 bg-white border border-charcoal/10 rounded-xl relative overflow-hidden space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold font-serif text-charcoal">{nb.name}</span>
                          <span className="font-mono text-xs text-red-600 font-black">{nb.riskScore}% risk</span>
                        </div>
                        <p className="text-[10px] text-pencil-gray font-mono italic leading-tight bg-red-50/50 p-2 rounded border border-red-100">
                          Assumed risk: "{nb.sharedRisks[0] || 'No risks registered yet.'}"
                        </p>
                      </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
