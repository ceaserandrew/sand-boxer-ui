import React, { useState, FormEvent, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Trash2, 
  Plus, 
  Check, 
  X, 
  ShieldAlert, 
  Award, 
  ListTodo, 
  Flag, 
  Activity, 
  Compass, 
  Eye, 
  History, 
  HelpCircle, 
  ArrowRight, 
  AlertCircle, 
  Radio, 
  Bookmark, 
  Save, 
  Flame, 
  GitCommit, 
  Layers, 
  Zap, 
  FileDown, 
  TrendingUp, 
  CheckSquare, 
  Unlock,
  AlertTriangle
} from 'lucide-react';
import { ConceptType, SandboxCard } from '../types';

interface WorkspaceMockupProps {
  conceptId: ConceptType;
  cards: SandboxCard[];
  onUpdateCard: (id: string, newContent: string) => void;
  onAddCard: (type: SandboxCard['type']) => void;
  onDeleteCard: (id: string) => void;
  activeStartupName: string;
  onBackToLibrary?: () => void;
}

interface Assumption {
  id: string;
  text: string;
  status: 'unvalidated' | 'validated' | 'busted';
}

interface TimelineEvent {
  id: string;
  time: string;
  type: 'creation' | 'correction' | 'pivot' | 'milestone';
  description: string;
}

export default function WorkspaceMockup({
  conceptId,
  cards,
  onUpdateCard,
  onAddCard,
  onDeleteCard,
  activeStartupName,
  onBackToLibrary
}: WorkspaceMockupProps) {
  // LEFT PANEL: Accordion/Mental tab selection to navigate the "Founder Brain"
  const [activeBrainSection, setActiveBrainSection] = useState<'vision' | 'assumptions' | 'mvp' | 'roadmap' | 'decisions'>('vision');

  // Interactive local states for high fidelity
  const [assumptions, setAssumptions] = useState<Assumption[]>([
    { id: 'asm-1', text: 'Customers will pay $10/month upfront for a raw handwritten-grade product architecture workspace.', status: 'unvalidated' },
    { id: 'asm-2', text: 'Non-technical creators actually care more about avoiding bloat than writing code scripts.', status: 'validated' },
    { id: 'asm-3', text: 'We do not need a complex SQL database sync to prove immediate customer onboarding demand.', status: 'validated' },
    { id: 'asm-4', text: 'Establishing automated notification systems on Day 1 is critical for product success.', status: 'busted' }
  ]);

  // MVP constraints checkbox control
  const [mvpChecks, setMvpChecks] = useState([
    { id: 'mvp-1', text: 'Eliminate standard signup/login password loops (use simple URL tokens instead)', checked: true },
    { id: 'mvp-2', text: 'No complex Relational Database setup; persist strictly inside safe LocalStorage/Text first', checked: true },
    { id: 'mvp-3', text: 'Deploy as single-viewport high-impact web sandbox under 30 total coding hours', checked: true },
    { id: 'mvp-4', text: 'Ban secondary multi-room active notifications and chat feeds or dynamic dashboards', checked: true }
  ]);

  // ROTATING STRATEGIC UNRESOLVED QUESTIONS for Today's Focus
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const focusQuestions = [
    {
      id: 'fq-1',
      question: 'Who is your absolute first customer who would pay $10 right now? Describe them specifically.',
      hint: 'Avoid generic "SMBs" or "everyone". Think of someone who complained about this exact problem this week.',
      type: 'user' as const
    },
    {
      id: 'fq-2',
      question: 'Which core assumption in your startup will kill you first if it proves completely wrong?',
      hint: 'It is usually your distribution assumption, or assumptions about willingness to pay.',
      type: 'problem' as const
    },
    {
      id: 'fq-3',
      question: 'What is the absolute single most important feature we must REMOVE immediately to prevent bloated drift?',
      hint: 'Think of features that feel nice to have (e.g. social share, notifications, detailed charts) but add zero core utility.',
      type: 'mvp' as const
    },
    {
      id: 'fq-4',
      question: 'Why has no one solved this pain point adequately before? What is the secret insight of your solution?',
      hint: 'Your insight cannot just be "I have AI". It is usually high-tactile simplicity or unique distribution channels.',
      type: 'vision' as const
    }
  ];

  const [currentAnswerText, setCurrentAnswerText] = useState('');
  const [savedFocusAnswers, setSavedFocusAnswers] = useState<Record<string, string>>({
    'fq-1': 'A digital creator who writes daily on Substack but gets exhausted spending 3 hours configuring Notion calendars.',
  });

  // FOUNDER TIMELINE state - list of key strategic decisions
  const [timeline, setTimeline] = useState<TimelineEvent[]>([
    { id: 't-1', time: '17:45', type: 'creation', description: `Drafted primary SandBoxer focus: "${activeStartupName}"` },
    { id: 't-2', time: '17:46', type: 'correction', description: 'Enforced scope boundaries: Banned server-side authentication & databases.' },
    { id: 't-3', time: '17:48', type: 'pivot', description: 'Changed Success Checkpoint: Aiming for 10 passionate paid users over generic metrics.' },
    { id: 't-4', time: '17:50', type: 'milestone', description: 'Locked down raw core principles inside active Product Constitution.' }
  ]);
  const [newTimelineText, setNewTimelineText] = useState('');

  // Permanent Forbidden Features state that the user can actively "STRIKE OUT" (Prune)
  const [forbiddenFeatures, setForbiddenFeatures] = useState([
    { text: 'Complex user authentication, password resets, and multi-team roles', struck: false },
    { text: 'Interactive AI Chatbot text bubbles and spammy pop-up customer support', struck: false },
    { text: 'Analytics dashboard with colorful charts, graphs, and live traffic trackers', struck: false },
    { text: 'Feed systems, user profiles, liking/bookmarking structures, social share grids', struck: false }
  ]);

  // STICKY NOTES for brain-dumps
  const [stickyBrainDump, setStickyBrainDump] = useState<string>('');
  const [stickies, setStickies] = useState<Array<{ id: string; text: string; color: string; angle: number }>>([
    { id: 'st-1', text: '💡 Core Insight: Real paper doesn\'t crash or force updates. Keep the UX raw!', color: 'bg-amber-100 text-amber-950 border-amber-300', angle: -2 },
    { id: 'st-2', text: '🥊 Challenger critique: Make sure they pay BEFORE we design the billing loops!', color: 'bg-rose-100 text-rose-950 border-rose-300', angle: 2 }
  ]);

  // Functions to manipulate local arrays
  const toggleAssumption = (id: string, nextStatus: 'unvalidated' | 'validated' | 'busted') => {
    setAssumptions(assumptions.map(a => a.id === id ? { ...a, status: nextStatus } : a));
    
    // Log in timeline
    const updatedAsm = assumptions.find(a => a.id === id);
    if (updatedAsm) {
      appendTimelineEvent('correction', `Assessed assumption: "${updatedAsm.text.slice(0, 30)}..." to ${nextStatus.toUpperCase()}`);
    }
  };

  const toggleMvpCheck = (id: string) => {
    setMvpChecks(mvpChecks.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleStrikeForbidden = (index: number) => {
    const updated = [...forbiddenFeatures];
    updated[index].struck = !updated[index].struck;
    setForbiddenFeatures(updated);

    appendTimelineEvent('correction', `${updated[index].struck ? 'Struck out and approved removal of' : 'Restored'} forbidden feature: "${updated[index].text.slice(0, 25)}..."`);
  };

  const appendTimelineEvent = (type: TimelineEvent['type'], desc: string) => {
    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newEvent: TimelineEvent = {
      id: `t-new-${Date.now()}`,
      time: timeString,
      type,
      description: desc
    };
    setTimeline(prev => [newEvent, ...prev]);
  };

  const handlePostTimelinePivot = (e: FormEvent) => {
    e.preventDefault();
    if (!newTimelineText.trim()) return;
    appendTimelineEvent('pivot', `Decision logged: ${newTimelineText.trim()}`);
    setNewTimelineText('');
  };

  const handleAnswerSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentAnswerText.trim()) return;

    const activeQ = focusQuestions[currentQuestionIndex];
    setSavedFocusAnswers(prev => ({
      ...prev,
      [activeQ.id]: currentAnswerText.trim()
    }));

    // Log in timeline
    appendTimelineEvent('milestone', `Resolved Focus Question (Type: ${activeQ.type.toUpperCase()}): "${currentAnswerText.slice(0, 45)}..."`);

    // Dynamic prompt suggestion to add as strategy card in the parent app
    onAddCard(activeQ.type);

    setCurrentAnswerText('');
    
    // Auto advance question index
    if (currentQuestionIndex < focusQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    }
  };

  const handleSpawnStickyNote = (e: FormEvent) => {
    e.preventDefault();
    if (!stickyBrainDump.trim()) return;

    const colors = [
      'bg-amber-100 text-amber-950 border-amber-300',
      'bg-blue-100 text-blue-950 border-blue-300',
      'bg-emerald-100 text-emerald-950 border-emerald-300',
      'bg-purple-100 text-purple-950 border-purple-300'
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomAngle = Math.random() * 6 - 3; // -3 to 3 deg

    const newNote = {
      id: `st-new-${Date.now()}`,
      text: stickyBrainDump.trim(),
      color: randomColor,
      angle: randomAngle
    };

    setStickies([...stickies, newNote]);
    setStickyBrainDump('');
    appendTimelineEvent('creation', `Brainstorm note added to margins: "${newNote.text.slice(0, 25)}..."`);
  };

  const handleDiscardSticky = (id: string) => {
    setStickies(stickies.filter(s => s.id !== id));
  };

  // DYNAMIC COMPUTE METRICS for the Decision Radar
  const validationProgress = useMemo(() => {
    const validated = assumptions.filter(a => a.status === 'validated').length;
    return Math.round((validated / assumptions.length) * 100);
  }, [assumptions]);

  const alignmentScore = useMemo(() => {
    // Starts at 100%. Decrease if there are forbidden features left un-struck,
    // or if cards mention forbidden keywords.
    let base = 100;
    
    // Penalty for unstruck forbidden features
    const unstruckCount = forbiddenFeatures.filter(f => !f.struck).length;
    base -= (unstruckCount * 6);

    // Scan cards for critical words
    const flatContent = cards.map(c => c.content.toLowerCase()).join(' ');
    const redFlagWords = ['chatbot', 'ai chat', 'database', 'social', 'dashboard', 'analytics', 'postgres', 'mongo'];
    
    redFlagWords.forEach(word => {
      if (flatContent.includes(word)) {
        base -= 5;
      }
    });

    return Math.max(25, base);
  }, [forbiddenFeatures, cards]);

  const driftRisk = useMemo(() => {
    if (alignmentScore >= 85) return { text: 'Low 🌿', color: 'text-emerald-700 bg-emerald-50 border-emerald-300' };
    if (alignmentScore >= 65) return { text: 'Moderate ⚠️', color: 'text-amber-700 bg-amber-50 border-amber-300' };
    return { text: 'Critical Danger 🚨', color: 'text-rose-700 bg-rose-50 border-rose-300' };
  }, [alignmentScore]);

  const complexityLevel = useMemo(() => {
    // Complexity grows as total cards increase
    const count = cards.length;
    if (count <= 4) return { text: '2 / 10 (Lightweight)', color: 'text-emerald-700' };
    if (count <= 6) return { text: '5 / 10 (Moderate)', color: 'text-amber-700' };
    return { text: '8 / 10 (Over-engineered)', color: 'text-rose-700 animate-pulse font-black' };
  }, [cards]);

  // COLOR THEMES BASED ON ACTIVE CONCEPTID
  const getWorkspaceStyles = () => {
    switch (conceptId) {
      case 'A': // Notebook theme
        return {
          wrapper: 'bg-[#FAF6EC] text-charcoal',
          paper: 'bg-[#FFFDF4] border-charcoal/15 shadow-notebook',
          pencilText: 'font-hand font-medium text-charcoal/90 text-sm md:text-base',
          ruledLine: 'bg-ruled-paper',
          borderAccent: 'border-2 border-charcoal',
          headerBg: 'bg-[#FFF9EA] border-b-2 border-charcoal'
        };
      case 'B': // Sandbox theme
        return {
          wrapper: 'bg-[#FCF8E9] text-[#2C2B24]',
          paper: 'bg-white border-2 border-charcoal rounded-3xl shadow-sandbox-card',
          pencilText: 'font-sans font-medium text-[#2C2B24] text-xs md:text-sm',
          ruledLine: 'bg-dot-matrix',
          borderAccent: 'border-3 border-charcoal',
          headerBg: 'bg-[#FFFDF4] border-b-3 border-charcoal'
        };
      case 'C': // Workshop Blueprint
        return {
          wrapper: 'bg-[#F9FAF2] text-[#23395B]',
          paper: 'bg-white border-2 border-[#3E424B] shadow-sm',
          pencilText: 'font-mono text-xs text-[#23395B]',
          ruledLine: 'bg-graph-grid',
          borderAccent: 'border-2 border-[#3E424B]',
          headerBg: 'bg-gradient-to-r from-white to-[#F0F2EB] border-b-2 border-[#3E424B]'
        };
    }
  };

  const styles = getWorkspaceStyles();

  // Dynamic advice from a Margins Product Strategist, based on current alignment and status
  const marginsCoachTips = [
    { text: "Are we sure about the Success Metric? It must strictly measure value validated, not code completed.", source: "Anti-Drift Guardian" },
    { text: "Avoid standard signups on Day 1. Simple checkout with temporary token access is 10x faster.", source: "Challenger Coach" },
    { text: "Your insight must stand out. A simple text workflow on landing pages often converts higher than deep features.", source: "Founder Mind Model" }
  ];

  return (
    <div className={`w-full min-h-screen p-1 md:p-4 rounded-3xl overflow-hidden ${styles.wrapper} select-none`}>
      
      {/* 1. Header Area: Tactile notebook spine/header */}
      <div className={`p-4 md:p-6 mb-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${styles.headerBg} ${styles.borderAccent} shadow-sm relative overflow-hidden`}>
        {/* Binder spiral rings mockups to anchor the paper metaphor */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-charcoal/10 flex justify-around px-8 items-center pointer-events-none select-none">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="w-3.5 h-4 bg-charcoal rounded-b-sm shadow-md opacity-20 transform -translate-y-1.5" />
          ))}
        </div>

        <div className="space-y-1 mt-1">
          <div className="flex flex-wrap items-center gap-2">
            {onBackToLibrary && (
              <button
                type="button"
                onClick={onBackToLibrary}
                className="flex items-center gap-1 bg-notebook-crimson text-white hover:bg-neutral-800 rounded px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 cursor-pointer mr-1"
                id="workspace-back-button"
              >
                <span>← Back to Shelf</span>
              </button>
            )}
            <span className="font-mono text-[9px] bg-notebook-crimson text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              ACTIVE BLUEPRINT CANVAS
            </span>
            <span className="font-mono text-[10px] text-zinc-500 uppercase">
              • Concept {conceptId} Space
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-black text-charcoal flex items-center gap-2">
            📓 {activeStartupName} <span className="text-xs font-mono font-medium text-pencil-gray/70">/ founder_thinking_notebook_v1</span>
          </h2>
        </div>

        {/* Global Action Tools */}
        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-between border-t md:border-t-0 border-charcoal/10 pt-3 md:pt-0">
          <div className="flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-notebook-crimson animate-pulse" />
            <span className="font-mono text-xs font-extrabold text-[#943F3F]">
              CO-FOUNDER CRITIQUE ENGAGED
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              // Export Simulation
              alert(`Exporting ${activeStartupName} Product Constitution as high-focus raw blueprint... `);
              appendTimelineEvent('milestone', `Compiled and exported complete Constitution draft.`);
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-charcoal hover:bg-neutral-800 text-white rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Export Specs</span>
          </button>
        </div>
      </div>

      {/* THREE PANEL STRUCTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ==============================================
            LEFT PANEL: Project Brain (Founder registers)
            ============================================== */}
        <div className={`lg:col-span-3 space-y-4`}>
          <div className={`bg-white rounded-2xl p-4 ${styles.borderAccent} shadow-sm relative overflow-hidden`}>
            {/* Paper clip ornament */}
            <div className="absolute top-2 right-4 transform rotate-12 z-20 opacity-40">
              <span className="text-lg">📎</span>
            </div>

            <div className="border-b border-charcoal/10 pb-3 mb-4 space-y-1">
              <h3 className="text-sm font-mono font-black text-charcoal uppercase tracking-widest flex items-center gap-2">
                🧠 Project Brain
              </h3>
              <p className="text-[10px] text-pencil-gray font-sans select-text">
                Your structured system-of-intent. Click components to review tactical assumptions and boundaries.
              </p>
            </div>

            {/* Accordion List to act as interactive Brain Navigation */}
            <div className="space-y-2.5">
              
              {/* Brain Section: Vision Statement */}
              <div 
                onClick={() => setActiveBrainSection('vision')}
                className={`p-3 rounded-xl border border-charcoal/15 cursor-pointer transition-all ${
                  activeBrainSection === 'vision' 
                    ? 'bg-notebook-yellow/35 border-notebook-crimson shadow-sm' 
                    : 'bg-white hover:bg-charcoal/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-sans flex items-center gap-2 text-charcoal">
                    🎯 Primary Concept Vision
                  </span>
                  <span className={`w-2 h-2 rounded-full ${activeBrainSection === 'vision' ? 'bg-notebook-crimson' : 'bg-transparent'}`} />
                </div>
                {activeBrainSection === 'vision' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-3.5 space-y-2 font-sans text-xs text-charcoal/95 border-t border-dashed border-charcoal/10 mt-2"
                  >
                    <p className="italic leading-relaxed font-semibold">
                      "{activeStartupName} eliminates standard startup over-engineering."
                    </p>
                    <div className="flex items-center gap-1.5 text-[9px] text-[#A33434] font-mono mt-1 font-black">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Bespoke focus locked in SETUP onboarding</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Brain Section: Assumptions List (Highly interactive) */}
              <div 
                onClick={() => setActiveBrainSection('assumptions')}
                className={`p-3 rounded-xl border border-charcoal/15 cursor-pointer transition-all ${
                  activeBrainSection === 'assumptions' 
                    ? 'bg-notebook-yellow/35 border-notebook-crimson shadow-sm' 
                    : 'bg-white hover:bg-charcoal/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-sans flex items-center gap-2 text-charcoal">
                    ⏱️ Assumptions Matrix ({assumptions.filter(a => a.status === 'validated').length}/{assumptions.length})
                  </span>
                  <span className={`w-2 h-2 rounded-full ${activeBrainSection === 'assumptions' ? 'bg-notebook-crimson' : 'bg-transparent'}`} />
                </div>
                {activeBrainSection === 'assumptions' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-3.5 space-y-3 font-sans text-xs text-charcoal border-t border-dashed border-charcoal/10 mt-2"
                  >
                    <p className="text-[10px] text-pencil-gray font-sans">
                      Test these before writing code. Flag their status below to dynamically update your Validation Progress:
                    </p>
                    <div className="space-y-2.5">
                      {assumptions.map((asm) => (
                        <div key={asm.id} className="p-2 bg-white/70 rounded-lg border border-charcoal/10 space-y-1.5">
                          <span className="text-xs font-sans text-charcoal leading-relaxed font-semibold block select-text">
                            - {asm.text}
                          </span>
                          <div className="flex items-center gap-1.5 self-start pt-1">
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleAssumption(asm.id, 'validated'); }}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-colors shrink-0 ${
                                asm.status === 'validated' ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-100 hover:bg-emerald-50 text-zinc-500'
                              }`}
                            >
                              Validated ✓
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleAssumption(asm.id, 'busted'); }}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-colors shrink-0 ${
                                asm.status === 'busted' ? 'bg-rose-100 text-rose-800' : 'bg-zinc-100 hover:bg-rose-50 text-zinc-500'
                              }`}
                            >
                              Busted ❌
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleAssumption(asm.id, 'unvalidated'); }}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-colors shrink-0 ${
                                asm.status === 'unvalidated' ? 'bg-amber-100 text-amber-800' : 'bg-zinc-100 hover:bg-amber-50 text-zinc-500'
                              }`}
                            >
                              Pending ⏳
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Brain Section: MVP Bounds Checked Limits */}
              <div 
                onClick={() => setActiveBrainSection('mvp')}
                className={`p-3 rounded-xl border border-charcoal/15 cursor-pointer transition-all ${
                  activeBrainSection === 'mvp' 
                    ? 'bg-notebook-yellow/35 border-notebook-crimson shadow-sm' 
                    : 'bg-white hover:bg-charcoal/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-sans flex items-center gap-2 text-charcoal">
                    🛑 Hard Scope Core Limits
                  </span>
                  <span className={`w-2 h-2 rounded-full ${activeBrainSection === 'mvp' ? 'bg-notebook-crimson' : 'bg-transparent'}`} />
                </div>
                {activeBrainSection === 'mvp' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-3.5 space-y-2 font-sans text-xs text-charcoal border-t border-dashed border-charcoal/10 mt-2"
                  >
                    <p className="text-[10px] text-pencil-gray font-sans mb-2">
                      Rigid architectural gates designed by the Sandbox system to stop feature creep at the roots:
                    </p>
                    <div className="space-y-2">
                      {mvpChecks.map(item => (
                        <label 
                          key={item.id} 
                          onClick={(e) => e.stopPropagation()} 
                          className="flex items-start gap-2 p-1.5 rounded hover:bg-white/40 cursor-pointer text-[11px]"
                        >
                          <input 
                            type="checkbox" 
                            checked={item.checked} 
                            onChange={() => toggleMvpCheck(item.id)}
                            className="mt-0.5 rounded text-notebook-crimson focus:ring-notebook-crimson border-charcoal/35"
                          />
                          <span className={item.checked ? 'line-through text-pencil-gray leading-tight' : 'text-charcoal leading-tight font-semibold'}>
                            {item.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Brain Section: Roadmap Flow */}
              <div 
                onClick={() => setActiveBrainSection('roadmap')}
                className={`p-3 rounded-xl border border-charcoal/15 cursor-pointer transition-all ${
                  activeBrainSection === 'roadmap' 
                    ? 'bg-notebook-yellow/35 border-notebook-crimson shadow-sm' 
                    : 'bg-white hover:bg-charcoal/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-sans flex items-center gap-2 text-charcoal">
                    🗺️ Product Milestones
                  </span>
                  <span className={`w-2 h-2 rounded-full ${activeBrainSection === 'roadmap' ? 'bg-notebook-crimson' : 'bg-transparent'}`} />
                </div>
                {activeBrainSection === 'roadmap' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-3.5 space-y-2 border-t border-dashed border-charcoal/10 mt-2"
                  >
                    <div className="space-y-2.5 pl-2 border-l border-notebook-crimson/30">
                      <div className="relative">
                        <div className="absolute -left-[12.5px] top-1 w-2.5 h-2.5 rounded-full bg-notebook-crimson border border-white" />
                        <h4 className="text-xs font-bold text-charcoal">Milestone 1: Clean Blueprint Mock</h4>
                        <p className="text-[10px] text-pencil-gray leading-tight">Map problems and customer tribe lists in the offline journal.</p>
                      </div>
                      <div className="relative opacity-65">
                        <div className="absolute -left-[12.5px] top-1 w-2.5 h-2.5 rounded-full bg-charcoal border border-white" />
                        <h4 className="text-xs font-bold text-charcoal">Milestone 2: Seed Verification Access</h4>
                        <p className="text-[10px] text-pencil-gray leading-tight">Launch a single clean static layout to capture early intention.</p>
                      </div>
                      <div className="relative opacity-40">
                        <div className="absolute -left-[12.5px] top-1 w-2.5 h-2.5 rounded-full bg-charcoal border border-white" />
                        <h4 className="text-xs font-bold text-charcoal">Milestone 3: First Ten Dollars</h4>
                        <p className="text-[10px] text-pencil-gray leading-tight">Validate willingness to commit with instant value delivery loop.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Brain Section: Strategic Decision Registry */}
              <div 
                onClick={() => setActiveBrainSection('decisions')}
                className={`p-3 rounded-xl border border-charcoal/15 cursor-pointer transition-all ${
                  activeBrainSection === 'decisions' 
                    ? 'bg-notebook-yellow/35 border-notebook-crimson shadow-sm' 
                    : 'bg-white hover:bg-charcoal/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-sans flex items-center gap-2 text-charcoal">
                    🛡️ Log Quick Pivot Choice
                  </span>
                  <span className={`w-2 h-2 rounded-full ${activeBrainSection === 'decisions' ? 'bg-notebook-crimson' : 'bg-transparent'}`} />
                </div>
                {activeBrainSection === 'decisions' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-3.5 space-y-3.5 border-t border-dashed border-charcoal/10 mt-2"
                  >
                    <form onSubmit={handlePostTimelinePivot} onClick={(e) => e.stopPropagation()} className="space-y-2">
                      <label className="text-[9px] font-mono text-zinc-500 uppercase block">Add a direct custom strategic constraint/pivot:</label>
                      <input 
                        type="text"
                        placeholder="e.g., Removed the payment processor, replaced with direct buy links"
                        value={newTimelineText}
                        onChange={(e) => setNewTimelineText(e.target.value)}
                        className="w-full text-xs p-2 bg-notebook-yellow/10 border border-charcoal/25 rounded outline-none placeholder-zinc-400 font-sans"
                      />
                      <button 
                        type="submit"
                        disabled={!newTimelineText.trim()}
                        className="w-full bg-charcoal text-white text-[10px] font-mono font-bold uppercase py-1.5 rounded shadow-sm disabled:opacity-40"
                      >
                        ✓ Stamp into Timeline
                      </button>
                    </form>
                  </motion.div>
                )}
              </div>

            </div>

          </div>

          {/* Quick Brain Dump Sticky Note interface (spawn notes directly in margin!) */}
          <div className="bg-[#FFFCEE] p-4 rounded-2xl border-2 border-charcoal shadow-sm space-y-3">
            <h4 className="text-xs font-mono font-bold text-charcoal uppercase tracking-wider block">
              💡 Spark Margin Post-It
            </h4>
            <form onSubmit={handleSpawnStickyNote} className="space-y-2">
              <textarea 
                placeholder="Spit-shine a wild brainstorm annotation... e.g. What if we do a 2-click payout system?"
                value={stickyBrainDump}
                onChange={(e) => setStickyBrainDump(e.target.value)}
                className="w-full text-xs font-hand h-16 p-2 bg-white/70 border border-charcoal/15 rounded-lg outline-none resize-none leading-relaxed text-charcoal placeholder-neutral-400 font-bold"
              />
              <button 
                type="submit"
                disabled={!stickyBrainDump.trim()}
                className="w-full bg-notebook-crimson text-white text-[9px] font-mono font-bold uppercase py-1.5 rounded-lg hover:bg-red-800 disabled:opacity-40 transition-colors"
              >
                + Stick to Notebook Margin
              </button>
            </form>
          </div>

        </div>

        {/* ==============================================
            CENTER PANEL: Today's Focus, Product Map, Timeline
            ============================================== */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* TODAY'S FOCUS: Heart of the Workspace */}
          <div className={`p-4 md:p-6 ${styles.paper} relative overflow-hidden transition-all duration-300`}>
            {/* Ruled lines pattern underlying Today's Focus */}
            <div className={`absolute inset-0 ${styles.ruledLine} opacity-[0.06] pointer-events-none select-none`} />

            {/* Notebook Margin Line */}
            <div className="absolute top-0 bottom-0 left-4 md:left-8 w-[1px] bg-red-400/40 pointer-events-none select-none" />

            {/* Inner Content */}
            <div className="relative z-10 pl-4 md:pl-8 space-y-4">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-charcoal/15 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-notebook-crimson animate-ping" />
                  <span className="font-mono text-xs font-black tracking-widest text-[#A33434] uppercase">
                    ☄️ Today's Focus Checkpoint
                  </span>
                </div>
                
                {/* Question switcher tabs */}
                <div className="flex items-center gap-1.5">
                  {focusQuestions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentQuestionIndex(i)}
                      className={`w-5 h-5 rounded-full text-[9px] font-mono font-bold flex items-center justify-center border transition-all ${
                        currentQuestionIndex === i 
                          ? 'bg-charcoal text-white border-charcoal' 
                          : 'bg-white hover:bg-neutral-100 border-charcoal/20 text-charcoal'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* ACTIVE STRATEGIC UNRESOLVED QUESTION */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase bg-notebook-yellow/40 px-2 py-0.5 rounded text-charcoal/80">
                  CRITICAL HOOK: {focusQuestions[currentQuestionIndex].type.toUpperCase()} BLOCKER
                </span>
                
                <h3 className="text-base md:text-lg font-serif font-black text-charcoal leading-snug select-text">
                  "{focusQuestions[currentQuestionIndex].question}"
                </h3>
                
                <p className="text-xs text-pencil-gray font-sans italic leading-relaxed">
                  💡 Hint: {focusQuestions[currentQuestionIndex].hint}
                </p>
              </div>

              {/* Hand-written interactive answering notepad */}
              <div className="bg-[#FFFDF4] border-2 border-dashed border-charcoal/30 rounded-xl p-3 md:p-4 mt-3 relative transform rotate-[-0.5deg]">
                <form onSubmit={handleAnswerSubmit} className="space-y-3">
                  <span className="text-[9px] font-mono text-notebook-crimson font-bold block uppercase tracking-wider">
                     FOUNDER ANSWER PAD (INK YOUR THOUGHTS):
                  </span>
                  
                  <textarea
                    placeholder="Type your strategic conclusion directly into the thinking log..."
                    value={currentAnswerText}
                    onChange={(e) => setCurrentAnswerText(e.target.value)}
                    className="w-full bg-transparent border-none placeholder-zinc-300 resize-none h-24 md:h-28 outline-none text-sm md:text-base font-hand font-bold leading-relaxed text-charcoal"
                  />

                  <div className="flex justify-between items-center pt-2 border-t border-charcoal/5">
                    <span className="font-mono text-[9px] text-pencil-gray/60 italic">
                      *inking this spawns a strategy node inside your blueprint
                    </span>
                    
                    <button
                      type="submit"
                      disabled={!currentAnswerText.trim()}
                      className="px-4 py-2 bg-notebook-yellow hover:bg-amber-300 border-2 border-charcoal rounded-lg font-mono text-[10px] font-bold text-charcoal uppercase tracking-wider transition-all hover:translate-y-[-1px] cursor-pointer disabled:opacity-40"
                    >
                      Ink as Strategy Node ✓
                    </button>
                  </div>
                </form>
              </div>

              {/* Answers history margin checklist */}
              {Object.keys(savedFocusAnswers).length > 0 && (
                <div className="space-y-2 pt-2 border-t border-charcoal/10">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                    📝 RECORDED DECISION ANCHORS:
                  </span>
                  <div className="space-y-2">
                    {focusQuestions.map((q) => {
                      const answer = savedFocusAnswers[q.id];
                      if (!answer) return null;
                      return (
                        <div key={q.id} className="text-xs bg-[#FFFDEE] border border-charcoal/10 p-2.5 rounded-lg font-sans space-y-1">
                          <span className="font-bold text-charcoal text-[11px] block">
                            Q: {q.question}
                          </span>
                          <p className="font-hand font-bold text-sm text-[#A33434] pl-2 select-text">
                            ✏️ "{answer}"
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* ACTIVE CARDS: Render the dynamic strategy blueprint cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-2">
              <span className="font-mono text-xs font-black text-charcoal uppercase">
                ⚙️ Blueprinted Strategy Cards ({cards.length})
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onAddCard('mvp')}
                  className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-[#FFFDF4] border border-charcoal text-charcoal rounded font-mono text-[9px] font-bold uppercase cursor-pointer"
                >
                  + Spawn MVP Node
                </button>
                <button
                  type="button"
                  onClick={() => onAddCard('user')}
                  className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-[#FFFDF4] border border-charcoal text-charcoal rounded font-mono text-[9px] font-bold uppercase cursor-pointer"
                >
                  + Tribe Node
                </button>
              </div>
            </div>

            {cards.length === 0 ? (
              <div className="bg-white/40 border-2 border-dashed border-charcoal/20 p-8 rounded-2xl text-center">
                <p className="text-xs text-pencil-gray font-sans">No strategy cards active. Answer focus questions to auto-spawn cards!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cards.map((card, i) => {
                  const rotatedDeg = i % 2 === 0 ? '-rotate-0.5' : 'rotate-0.5';
                  return (
                    <motion.div
                      key={card.id || i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-[#FFFDF3] p-4 rounded-xl border-2 border-charcoal shadow-sm space-y-3 relative overflow-hidden flex flex-col justify-between ${rotatedDeg}`}
                    >
                      {/* Paperclip sticker mock */}
                      <div className="absolute top-1 left-4 w-6 h-1.5 bg-notebook-crimson/15 transform -rotate-12 select-none pointer-events-none" />
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border-b border-charcoal/5 pb-1">
                          <span className="text-[9px] font-mono uppercase font-black text-notebook-crimson">
                            #{card.type} block
                          </span>
                          <button
                            type="button"
                            onClick={() => onDeleteCard(card.id)}
                            className="text-pencil-gray hover:text-red-600 transition-colors"
                            title="Prune this node"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <input 
                          type="text"
                          value={card.title}
                          onChange={(e) => {
                            // Let parents update if they support custom title, or simple UI representation
                          }}
                          className="font-serif font-black text-sm text-charcoal bg-transparent border-none outline-none focus:ring-0 p-0 w-full"
                        />

                        <textarea
                          rows={3}
                          value={card.content}
                          onChange={(e) => onUpdateCard(card.id, e.target.value)}
                          className="w-full bg-transparent border-none outline-none focus:ring-0 resize-none font-sans text-xs text-charcoal/90 leading-relaxed p-0 selection:bg-notebook-yellow/40"
                          placeholder="Flesh out critical tactical variables here..."
                        />
                      </div>

                      <div className="pt-2 border-t border-charcoal/5 flex justify-between items-center text-[9px] font-mono text-pencil-gray/70">
                        <span>Status: <strong className="text-emerald-700 uppercase">{card.status || 'Active'}</strong></span>
                        <span>✏️ click lines to rewrite</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* PRODUCT MAP: Living Blueprint of Strategy */}
          <div className="bg-white rounded-2xl p-4 md:p-5 border-2 border-charcoal shadow-sm space-y-3.5 relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-charcoal/10 pb-2">
              <div className="space-y-0.5">
                <span className="font-mono text-[9px] text-notebook-crimson font-black uppercase block">
                  🎨 EVOLUTION VISUAL BOARD
                </span>
                <h4 className="text-xs font-mono font-bold text-charcoal uppercase tracking-wide">
                  Living Product Blueprint Map
                </h4>
              </div>
              <span className="text-[10px] font-mono text-pencil-gray bg-charcoal/5 px-2 py-0.5 rounded">
                Evolving in Realtime
              </span>
            </div>

            {/* Simulated Hand-Drawn Road Map */}
            <div className="min-h-[146px] relative rounded-xl border border-charcoal/10 bg-[#FAF9F5] p-3 overflow-hidden flex flex-col justify-around">
              {/* Connected guide vector stroke path */}
              <div className="absolute top-[52%] left-10 right-10 h-[2px] border-b-2 border-dashed border-charcoal/20 z-0" />
              
              <div className="grid grid-cols-5 gap-1.5 z-10 relative">
                
                {/* Node 1 */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-charcoal flex items-center justify-center text-sm shadow-sm">
                    💡
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono font-bold uppercase text-emerald-800">Spark Node</span>
                    <p className="text-[8px] text-pencil-gray leading-none">Concept Locked</p>
                  </div>
                </div>

                {/* Node 2 */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`w-10 h-10 rounded-full border-2 border-charcoal flex items-center justify-center text-sm shadow-sm transition-all ${
                    savedFocusAnswers['fq-1'] ? 'bg-emerald-100' : 'bg-amber-50 animate-pulse'
                  }`}>
                    👥
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono font-bold uppercase text-charcoal">Tribe Capture</span>
                    <p className="text-[8px] text-pencil-gray leading-none">
                      {savedFocusAnswers['fq-1'] ? 'Completed ✓' : 'Resolving Focus'}
                    </p>
                  </div>
                </div>

                {/* Node 3 */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`w-10 h-10 rounded-full border-2 border-charcoal flex items-center justify-center text-sm shadow-sm ${
                    assumptions.some(a => a.status === 'validated') ? 'bg-emerald-100' : 'bg-neutral-100'
                  }`}>
                    ⚖️
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono font-bold uppercase text-charcoal">Assumption Gates</span>
                    <p className="text-[8px] text-pencil-gray leading-none">
                      {validationProgress > 0 ? `${validationProgress}% Validated` : 'Unvalidated'}
                    </p>
                  </div>
                </div>

                {/* Node 4 */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`w-10 h-10 rounded-full border-2 border-charcoal flex items-center justify-center text-sm shadow-sm ${
                    alignmentScore > 80 ? 'bg-[#FFFCDF]' : 'bg-neutral-100'
                  }`}>
                    🛑
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono font-bold uppercase text-charcoal">Discipline Wall</span>
                    <p className="text-[8px] text-pencil-gray leading-none">
                      Align: {alignmentScore}%
                    </p>
                  </div>
                </div>

                {/* Node 5 */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 border-2 border-charcoal flex items-center justify-center text-sm shadow-sm">
                    🪙
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono font-bold uppercase text-charcoal">First Dollar</span>
                    <p className="text-[8px] text-pencil-gray leading-none">Launch Target</p>
                  </div>
                </div>

              </div>
            </div>
            
            <p className="text-[10px] text-pencil-gray text-center font-sans">
              ℹ️ Nodes automatically illuminate as focus questions get solved and assumptions convert to validated.
            </p>
          </div>

          {/* FOUNDER TIMELINE: Replay the Thinking Evolution */}
          <div className="bg-white rounded-2xl p-4 md:p-5 border-2 border-charcoal shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-charcoal/10 pb-2">
              <History className="w-4 h-4 text-notebook-crimson" />
              <h4 className="text-xs font-mono font-bold text-charcoal uppercase tracking-wider">
                Founder Thinking Timeline & Record
              </h4>
            </div>

            <div className="space-y-3.5 max-h-[178px] overflow-y-auto pr-1">
              {timeline.map((event) => (
                <div key={event.id} className="flex gap-2.5 items-start text-xs text-charcoal">
                  <span className="font-mono text-[10px] text-notebook-crimson/70 font-semibold pt-0.5 select-none text-right w-10 shrink-0">
                    [{event.time}]
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[8px] font-mono uppercase font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        event.type === 'creation' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                        event.type === 'correction' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        event.type === 'pivot' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-charcoal/90 leading-normal pl-0.5 select-text">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* ==============================================
            RIGHT PANEL: Constitution Dock & Decision Radar
            ============================================== */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* CONSTITUTION DOCK: Locked Rules & Forbidden Feature Block */}
          <div className="bg-white rounded-2xl p-4 md:p-5 border-3 border-charcoal shadow-sandbox-card relative overflow-hidden">
            
            {/* Gravity system marker badge */}
            <div className="absolute top-0 right-0 bg-notebook-crimson text-white font-mono text-[8px] font-black uppercase px-2 py-1 tracking-wider z-10 rounded-bl-xl shadow-sm">
              GRAVITY CORE LOCKED
            </div>

            <div className="border-b-2 border-charcoal pb-2 mb-4">
              <span className="font-mono text-[9px] text-[#A33434] font-black uppercase block select-none">
                📕 LAUNCH SAFETY MECHANISM
              </span>
              <h3 className="text-sm font-serif font-black text-charcoal uppercase tracking-tight">
                Constitution Dock
              </h3>
            </div>

            <div className="space-y-4">
              
              {/* Success Metric Lock Block */}
              <div className="bg-[#FFFCEE] border-2 border-charcoal rounded-xl p-3 relative transform rotate-1 space-y-1">
                <span className="text-[8px] font-mono text-zinc-500 uppercase block font-bold">
                  🗝️ LOCKED SUCCESS checkpoint:
                </span>
                <span className="italic font-display font-bold text-xs text-notebook-crimson block select-text">
                  "Validate 5 actual paid customers under 7 days."
                </span>
              </div>

              {/* Core Principles */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">
                  ⚖️ Strategic Directives:
                </span>
                <ul className="space-y-1.5 pl-3 border-l-2 border-zinc-200 text-xs">
                  <li className="font-sans text-[11px] leading-relaxed text-charcoal select-text">
                    1. <strong>Value before scaffolds:</strong> Stop building server-side features until we collect upfront deposits.
                  </li>
                  <li className="font-sans text-[11px] leading-relaxed text-[#A33434] select-text">
                    2. <strong>Rigid constraint compliance:</strong> Adhere strictly to the co-founder challenge engine constraints.
                  </li>
                </ul>
              </div>

              {/* Forbidden Features Section with Strike Out Interaction */}
              <div className="space-y-2.5 pt-2 border-t border-charcoal/15">
                <div>
                  <span className="text-[10px] font-mono text-[#A33434] font-black uppercase tracking-wide block">
                    🚫 Forbidden Feature Wall
                  </span>
                  <p className="text-[9px] text-pencil-gray font-sans">
                    Actively pruning these items boosts your **Alignment Score** and drops complexity:
                  </p>
                </div>

                <div className="space-y-2">
                  {forbiddenFeatures.map((item, index) => (
                    <div 
                      key={index}
                      onClick={() => handleStrikeForbidden(index)}
                      className={`text-[10.5px] leading-snug p-2 rounded-lg border cursor-pointer transition-all flex items-start gap-2 ${
                        item.struck 
                          ? 'bg-zinc-50 border-zinc-200 text-zinc-400 line-through decoration-zinc-400 decoration-1' 
                          : 'bg-rose-50/50 hover:bg-rose-50 border-rose-200/50 text-[#852C32]'
                      }`}
                    >
                      <button 
                        type="button"
                        className="mt-0.5 text-zinc-500 hover:text-red-600 font-bold font-mono text-[9px] shrink-0"
                      >
                        {item.struck ? '[Struck]' : '[Prune]'}
                      </button>
                      <span className="font-sans select-text">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Environmental Constraints */}
              <div className="space-y-1 bg-[#F9FAF2] p-2.5 rounded-xl border border-charcoal/10 text-[10px] text-[#23395B]">
                <div className="flex items-center gap-1.5 font-bold font-mono">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#E05A47]" />
                  <span>ENVIRONMENT CONSTRAINTS:</span>
                </div>
                <span className="block font-mono mt-1 text-[9.5px]">
                  • Maximum of 30 total hours.
                </span>
                <span className="block font-mono text-[9.5px]">
                  • Zero external database API calls.
                </span>
              </div>

            </div>

          </div>

          {/* DECISION RADAR: Alignment, Drift, Complexity */}
          <div className="bg-[#FFFDF6] rounded-2xl p-4 md:p-5 border-2 border-charcoal shadow-sm space-y-4">
            
            <div className="border-b border-charcoal/10 pb-2">
              <span className="font-mono text-[9px] text-[#A33434] font-black uppercase block">
                ⚡ LIVE RADAR METRICS
              </span>
              <h4 className="text-xs font-mono font-bold text-charcoal uppercase tracking-wider">
                Founder Decision Radar
              </h4>
            </div>

            <div className="space-y-3.5 text-xs text-charcoal">
              
              {/* Metric 1: Alignment Score */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold flex items-center gap-1">
                    🎯 Pitch Alignment Score
                  </span>
                  <span className={`font-mono font-black ${alignmentScore > 80 ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {alignmentScore}%
                  </span>
                </div>
                {/* Custom Hand Sketched styled progress bar */}
                <div className="h-2.5 bg-zinc-100 border border-charcoal rounded-full overflow-hidden select-none">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      alignmentScore >= 80 ? 'bg-emerald-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${alignmentScore}%` }}
                  />
                </div>
              </div>

              {/* Metric 2: Drift Risk */}
              <div className="space-y-1">
                <span className="font-bold text-[11px] block">
                  🧭 Product Drift Risk
                </span>
                <div className={`p-2 rounded-lg border text-center font-mono text-[10px] font-bold uppercase ${driftRisk.color}`}>
                  {driftRisk.text}
                </div>
              </div>

              {/* Metric 3: Complexity Level */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold">
                    ⚔️ Structural Complexity
                  </span>
                </div>
                <span className={`font-sans text-xs block font-extrabold ${complexityLevel.color}`}>
                  {complexityLevel.text}
                </span>
              </div>

              {/* Metric 4: Validation Progress */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold">
                    🧪 Assumptions Validated
                  </span>
                  <span className="font-mono font-black text-emerald-800">
                    {validationProgress}%
                  </span>
                </div>
                <div className="h-2 bg-zinc-100 border border-charcoal rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-600 transition-all duration-500"
                    style={{ width: `${validationProgress}%` }}
                  />
                </div>
              </div>

            </div>

          </div>

          {/* AI Behavioral Ink/Sticky suggestions margin critique */}
          <div className="relative pt-4 overflow-hidden">
            {/* Ink doodle annotation on margin */}
            <div className="p-3 bg-[#FFF9E4] border border-dashed border-charcoal/30 rounded-xl relative transform -rotate-1">
              <span className="font-mono text-[9px] text-zinc-500 block font-bold uppercase">
                🧠 ANTI-DRIFT MENTOR OBSERVES:
              </span>
              <p className="font-hand font-extrabold text-sm text-[#A33434] leading-relaxed mt-1 select-text">
                "Strikethrough of password loops completed. Splendid effort. We saved three days of waste right there. Secure those early deposits."
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Margins Coach Tips footer */}
      <div className="mt-8 border-t-2 border-charcoal/10 pt-4 pb-2 text-center">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2.5">
          <span className="font-mono text-[10px] text-zinc-500 uppercase font-bold">💡 Margin Comment Tracker:</span>
          <div className="flex flex-wrap justify-center gap-2">
            {marginsCoachTips.map((tip, i) => (
              <span key={i} className="text-[10px] font-sans font-medium text-charcoal bg-white border border-charcoal/10 px-2.5 py-1 rounded-full shadow-sm">
                📌 <strong>{tip.source}:</strong> "{tip.text}"
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
