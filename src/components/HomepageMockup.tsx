import { useState } from 'react';
import { ConceptType, ColorSpec } from '../types';
import { 
  Sparkles, ArrowRight, NotebookPen, HelpCircle, Compass, 
  Smile, ClipboardList, PenTool, Check, Ban, AlertOctagon, 
  Flame, HardDrive, Target, Layers, Play, Github
} from 'lucide-react';
import MethodTimeline from './MethodTimeline';
import InteractiveBlueprintGenerator from './InteractiveBlueprintGenerator';

interface HomepageMockupProps {
  conceptId: ConceptType;
  palette: ColorSpec[];
  activeStartup: {
    name: string;
    tag: string;
    cards: { id: string; type: string; title: string; content: string }[];
  };
  onStartBuilding?: () => void;
}

export default function HomepageMockup({ conceptId, palette, activeStartup, onStartBuilding }: HomepageMockupProps) {
  // Setup interactive demo trigger states
  const [demoInput, setDemoInput] = useState('');
  
  // Quick pre-select inputs based on identity cards
  const selectIdentityPreset = (presetText: string) => {
    setDemoInput(presetText);
    // Smoothly scroll down to the interactive demo stage
    const demoStage = document.getElementById('sandbox-interactive-demo-sheet');
    if (demoStage) {
      demoStage.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getPrimaryHex = (name: string, fallback: string) => {
    return palette.find(c => c.name.toLowerCase().includes(name))?.hex || fallback;
  };

  // Extract core theme variables
  const notebookCrimson = '#A33434';
  const mutedOrange = '#E89C3D';
  const deepNavy = '#1E2229';

  return (
    <div 
      className={`w-full overflow-hidden transition-all duration-300 relative ${
        conceptId === 'A' 
          ? 'bg-ruled-paper border-sketch shadow-notebook p-4 md:p-8' 
          : conceptId === 'B' 
            ? 'bg-dot-matrix rounded-[2.5rem] border-3 border-charcoal shadow-sandbox-card p-6 md:p-10' 
            : 'bg-graph-grid border-2 border-technical-steel/30 rounded-lg p-6 md:p-10'
      }`}
      id="homepage-mockup-stage"
    >
      {/* Visual Ring Bindings for Concept A (Notebook Cover feel) */}
      {conceptId === 'A' && (
        <div className="absolute left-3 top-0 bottom-0 w-3 flex flex-col justify-around pointer-events-none opacity-40 select-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-5 h-5 rounded-full bg-[#cbbfab] border border-charcoal/20 transform -translate-x-1/2" />
          ))}
        </div>
      )}

      {/* Grid Coordinates Overlay for Concept C (Engineering Blueprints) */}
      {conceptId === 'C' && (
        <div className="absolute top-3 left-4 right-4 flex justify-between font-mono text-[9px] text-[#3E424B]/40 pointer-events-none select-none">
          <span>LAT_GRID_0.84 // SYSTEM: STABLE</span>
          <span>DRAFT_SCALE 1:1.5 // (2026_SANDBOXER)</span>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* SECTION 1: HEADER & ABOVE THE FOLD                  */}
      {/* ---------------------------------------------------- */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-charcoal/15 pb-6 mb-12">
        <div className="flex items-center gap-3">
          {/* Real Dynamic Brand Logo pointing to /logo.png */}
          <div className="flex items-center gap-2.5">
            <img 
              src="/logo.png" 
              alt="SandBoxer Logo" 
              referrerPolicy="no-referrer"
              className="w-9 h-9 object-contain rounded-lg border border-charcoal/15 rotate-1 hover:rotate-0 transition-transform" 
            />
            <div>
              <span className={`text-2xl font-black text-charcoal tracking-tight ${conceptId === 'A' ? 'font-serif' : conceptId === 'B' ? 'font-display uppercase' : 'font-mono'}`}>
                SandBoxer
              </span>
              <span className="font-hand text-xs text-notebook-crimson font-semibold block leading-none transform -rotate-1 select-none">
                notebk_v1.0
              </span>
            </div>
          </div>
        </div>

        {/* Tactical Header Navigation Links */}
        <nav className="flex items-center gap-6 font-mono text-xs text-pencil-gray">
          <span className="hover:text-charcoal cursor-pointer font-bold transition-colors">Manifesto</span>
          <span className="hover:text-charcoal cursor-pointer font-bold transition-colors">The Method</span>
          <span className="hover:text-charcoal cursor-pointer font-bold transition-colors">Workspace</span>
          {conceptId === 'A' ? (
            <button 
              onClick={onStartBuilding}
              className="font-hand text-lg border-sketch bg-notebook-yellow hover:bg-amber-200/90 px-4 py-1.5 font-bold text-charcoal transition-all cursor-pointer rotate-1"
            >
              Open Notebook ↗
            </button>
          ) : conceptId === 'B' ? (
            <button 
              onClick={onStartBuilding}
              className="bg-white hover:bg-neutral-50 px-5 py-2 rounded-full border-2 border-charcoal font-bold text-xs text-charcoal shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Start Sandbox
            </button>
          ) : (
            <button 
              onClick={onStartBuilding}
              className="bg-deep-navy hover:bg-deep-navy/90 text-white px-4 py-2 border border-technical-steel text-[10px] font-bold tracking-widest uppercase hover:opacity-95 cursor-pointer"
            >
              INITIALIZE_WORKSPACE_RUN //
            </button>
          )}
        </nav>
      </header>

      {/* CORE HERO WRAPPER */}
      <div className="my-10">
        <div className="text-center max-w-3xl mx-auto space-y-6 relative mb-12">
          
          {conceptId === 'A' && (
            <div className="inline-block relative transform -rotate-2 select-none">
              <span className="font-hand text-base text-notebook-crimson font-black bg-notebook-yellow/30 px-3.5 py-1.5 border-sketch-sm">
                📓 "A notebook for products that don't exist yet."
              </span>
            </div>
          )}

          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-charcoal tracking-tight ${
              conceptId === 'A' ? 'font-serif' : conceptId === 'B' ? 'font-display uppercase tracking-tighter' : 'font-mono'
            }`}
          >
            Build the <span className="underline decoration-wavy decoration-notebook-crimson decoration-3 underline-offset-6">right thing</span> before building anything.
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-pencil-gray leading-relaxed font-sans">
            Transform vague thoughts into bullet-proof startup blueprints. Vision-first product design environment architected for serious creators, indie hackers, and low-code founders. Prevent code bloat before writing a single API.
          </p>
        </div>

        {/* Live Generation Component on Hero Stage */}
        <div className="my-12">
          <InteractiveBlueprintGenerator conceptId={conceptId} initialInput={demoInput} />
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* SECTION 2: WHY PRODUCTS FAIL                         */}
      {/* ---------------------------------------------------- */}
      <section className="my-16 py-10 border-t border-b border-charcoal/10 relative">
        <div className="text-center mb-10">
          <span className="font-mono text-[10px] text-pencil-gray uppercase tracking-widest font-bold">The Hard Reality Check</span>
          <h2 className={`text-2xl md:text-4xl font-black text-charcoal mt-1 ${conceptId === 'A' ? 'font-serif' : 'font-display'}`}>
            Most products fail before the first line of code.
          </h2>
          <p className="text-xs text-pencil-gray max-w-md mx-auto mt-2 font-sans">
            Not because developers are slow or servers crash. They fail because the original dream gets lost in a swamp of micro-features.
          </p>
        </div>

        {/* Fail Cards Bento Connected with SVGs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto relative z-10">
          
          {/* Card 1: Features */}
          <div className={`p-5 transition-all duration-300 transform -rotate-1 hover:rotate-0 hover:scale-102 ${
            conceptId === 'A' ? 'bg-[#FFF8E7] border-sketch shadow-notebook' : 'bg-neutral-50 border-2 border-charcoal shadow-sm rounded-2xl'
          }`}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-bold font-mono text-notebook-crimson">01</span>
              <Ban className="w-5 h-5 text-notebook-crimson" />
            </div>
            <h4 className="font-bold text-charcoal text-sm uppercase tracking-wide">Too many features</h4>
            <p className={`text-xs text-pencil-gray mt-1.5 leading-relaxed ${conceptId === 'A' ? 'font-hand text-base text-charcoal' : 'font-sans'}`}>
              Adding tabs, feeds, analytics, and social share metrics before verifying if anybody cares about the primary transaction.
            </p>
          </div>

          {/* Card 2: No User */}
          <div className={`p-5 transition-all duration-300 transform rotate-1 hover:rotate-0 hover:scale-102 ${
            conceptId === 'A' ? 'bg-[#FFF8E7] border-sketch shadow-notebook' : 'bg-neutral-50 border-2 border-charcoal shadow-sm rounded-2xl'
          }`}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-bold font-mono text-notebook-crimson">02</span>
              <AlertOctagon className="w-5 h-5 text-notebook-crimson" />
            </div>
            <h4 className="font-bold text-charcoal text-sm uppercase tracking-wide">No Ideal User</h4>
            <p className={`text-xs text-pencil-gray mt-1.5 leading-relaxed ${conceptId === 'A' ? 'font-hand text-base text-charcoal' : 'font-sans'}`}>
              Designing targeting mechanisms for "everyone." Rejecting specificity to play safe, eventually resulting in zero retention.
            </p>
          </div>

          {/* Card 3: Constant Drift */}
          <div className={`p-5 transition-all duration-300 transform -rotate-2 hover:rotate-0 hover:scale-102 ${
            conceptId === 'A' ? 'bg-[#FFF8E7] border-sketch shadow-notebook' : 'bg-neutral-50 border-2 border-charcoal shadow-sm rounded-2xl'
          }`}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-bold font-mono text-notebook-crimson">03</span>
              <Flame className="w-5 h-5 text-notebook-crimson" />
            </div>
            <h4 className="font-bold text-charcoal text-sm uppercase tracking-wide">Unbounded Drift</h4>
            <p className={`text-xs text-pencil-gray mt-1.5 leading-relaxed ${conceptId === 'A' ? 'font-hand text-base text-charcoal' : 'font-sans'}`}>
              Endless conversations on Slack and Discord altering the fundamental architecture daily. Zero alignment framework.
            </p>
          </div>

          {/* Card 4: No Vision */}
          <div className={`p-5 transition-all duration-300 transform rotate-2 hover:rotate-0 hover:scale-102 ${
            conceptId === 'A' ? 'bg-[#FFF8E7] border-sketch shadow-notebook' : 'bg-neutral-50 border-2 border-charcoal shadow-sm rounded-2xl'
          }`}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-bold font-mono text-notebook-crimson">04</span>
              <HardDrive className="w-5 h-5 text-notebook-crimson" />
            </div>
            <h4 className="font-bold text-charcoal text-sm uppercase tracking-wide">No Gravity Center</h4>
            <p className={`text-xs text-pencil-gray mt-1.5 leading-relaxed ${conceptId === 'A' ? 'font-hand text-base text-charcoal' : 'font-sans'}`}>
              With no formal project constitution, any cool idea from a competitor gets copied immediately, bloating the system codebase.
            </p>
          </div>

        </div>

        {/* Handdrawn look SVG line background indicators */}
        <div className="absolute inset-0 pointer-events-none opacity-20 hidden lg:block select-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M120,180 Q250,220 380,180 T680,190 T905,175" fill="none" stroke="red" strokeWidth="2.5" strokeDasharray="5,5" />
          </svg>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 3: THE SANDBOXER METHOD                     */}
      {/* ---------------------------------------------------- */}
      <section className="my-16">
        <MethodTimeline conceptId={conceptId} />
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 4: PRODUCT CONSTITUTION SHOWCASE             */}
      {/* ---------------------------------------------------- */}
      <section className="my-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Description Copy left side */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-[10px] text-notebook-crimson uppercase tracking-widest font-black">
              📜 The Project Gravity Lock
            </span>
            <h3 className={`text-2xl md:text-3xl lg:text-4xl font-black text-charcoal tracking-tight ${conceptId === 'A' ? 'font-serif' : 'font-display'}`}>
              Every startup needs an anchor.
            </h3>
            <p className="text-xs md:text-sm text-pencil-gray leading-relaxed font-sans">
              The <strong>Product Constitution</strong> acts as your strategic gravity system. It lists everything your project IS, and equally importantly, everything your project is <strong>STRONGLY FORBIDDEN</strong> from doing. It keeps the core vision clear.
            </p>
            <div className="space-y-2 pt-2 text-xs font-mono">
              <div className="flex gap-2 items-center text-charcoal">
                <Check className="w-4 h-4 text-emerald-600 font-bold shrink-0" />
                <span>Prevents Competitor Copy-Cat Panic</span>
              </div>
              <div className="flex gap-2 items-center text-charcoal">
                <Check className="w-4 h-4 text-emerald-600 font-bold shrink-0" />
                <span>Locks Success Metrics into Daily View</span>
              </div>
              <div className="flex gap-2 items-center text-charcoal">
                <Check className="w-4 h-4 text-emerald-600 font-bold shrink-0" />
                <span>Enforces Rigid Core Metaphor Principles</span>
              </div>
            </div>
          </div>

          {/* Interactive Simulated Constitution Slate Card right side */}
          <div className="lg:col-span-7">
            <div className={`p-6 transition-all duration-200 relative ${
              conceptId === 'A' 
                ? 'bg-ruled-paper border-sketch shadow-notebook' 
                : 'bg-white border-2 border-charcoal shadow-sandbox-card rounded-[2rem]'
            }`}>
              
              {conceptId === 'A' && (
                <div className="absolute top-2 right-4 font-hand text-xs text-notebook-crimson font-black rotate-3 select-none">
                  📓 rule_no_17
                </div>
              )}

              <div className="flex items-center gap-2 border-b-2 border-charcoal/15 pb-2.5 mb-4">
                <NotebookPen className="w-5 h-5 text-notebook-crimson shrink-0" />
                <div>
                  <h4 className={`text-base font-black text-charcoal uppercase ${conceptId === 'A' ? 'font-serif' : 'font-sans'}`}>
                    📜 ACTIVE PRODUCT CONSTITUTION
                  </h4>
                  <p className="text-[9px] font-mono text-pencil-gray">SPECIFICATION FRAME FOR: CastleBnB (Aesthetic Rental)</p>
                </div>
              </div>

              <div className="space-y-4 text-xs md:text-sm">
                
                {/* Vision block */}
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-pencil-gray uppercase tracking-widest font-bold">1. Core Vision</span>
                  <p className={`font-semibold text-charcoal leading-snug pl-2 border-l-2 border-l-[#A33434] ${conceptId === 'A' ? 'font-hand text-lg text-charcoal' : 'font-sans'}`}>
                    Enable independent travelers to discover and lease certified, hand-vetted medieval ruins within Europe under 48 hours.
                  </p>
                </div>

                {/* Core principles */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-pencil-gray uppercase tracking-widest font-bold">2. Core Principles</span>
                    <ul className={`space-y-1 pl-1 list-disc list-inside text-pencil-gray ${conceptId === 'A' ? 'font-hand text-base text-charcoal' : 'font-sans'}`}>
                      <li>Historical over Modern</li>
                      <li>Absolute Privacy Guarantee</li>
                      <li>Curated Senses Only</li>
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-pencil-gray uppercase tracking-widest font-bold">3. Success Metrics</span>
                    <ul className={`space-y-1 pl-1 text-emerald-800 font-semibold list-disc list-inside ${conceptId === 'A' ? 'font-hand text-base text-charcoal' : 'font-sans'}`}>
                      <li>First rental booking</li>
                      <li>7-Day repeat intent &gt;50%</li>
                    </ul>
                  </div>
                </div>

                {/* Forbidden Section - highlighted cleanly */}
                <div className="bg-rose-50 border border-rose-300 p-3 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-1.5 text-rose-800 font-bold font-mono text-[10px] uppercase">
                    <Ban className="w-3.5 h-3.5" />
                    <span>4. Absolute Forbidden Features (Scope Creep Guard)</span>
                  </div>
                  <div className={`grid grid-cols-2 gap-2 text-[11px] leading-tight text-rose-900 ${conceptId === 'A' ? 'font-hand text-lg text-charcoal' : 'font-sans'}`}>
                    <div>❌ No AI Chat message boxes</div>
                    <div>❌ No Social review feeds</div>
                    <div>❌ No complex permission layers</div>
                    <div>❌ No multi-tier calendar tools</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 5: BEFORE / AFTER DESIGN MODULE              */}
      {/* ---------------------------------------------------- */}
      <section className="my-20 py-10 border-t border-charcoal/10">
        <div className="text-center mb-10">
          <span className="font-mono text-[10px] text-pencil-gray uppercase tracking-widest font-bold">Mental Transformation</span>
          <h2 className={`text-2xl md:text-4xl font-black text-charcoal mt-1 ${conceptId === 'A' ? 'font-serif' : 'font-display'}`}>
            Sort out the clutter. Find the gravity.
          </h2>
          <p className="text-xs text-pencil-gray max-w-sm mx-auto mt-2 font-sans">
            Compare the typical chaotic state of a founder’s mind to the serene structure of a SandBoxer architectural blueprint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* Before: Founder's Mind Chaos */}
          <div className="border border-dashed border-charcoal/30 bg-charcoal/5 p-6 rounded-2xl flex flex-col justify-between text-center relative overflow-hidden min-h-[280px]">
            {/* Absolute vector background clutter */}
            <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center select-none font-hand text-6xl">
              ❔ ❔ 💡 💡 ⚡ ⚙ ❔ 💡 
            </div>
            
            <div className="relative z-10">
              <span className="font-mono text-[9px] text-[#A33434] bg-red-100 rounded px-2 py-0.5 uppercase tracking-wider font-bold">
                Before: Founder's Mind
              </span>
              <h4 className="font-serif font-black text-xl text-charcoal mt-2">Unbounded Multi-task Chaos</h4>
              <p className="text-xs text-pencil-gray mt-2 max-w-xs mx-auto leading-relaxed">
                What framework? Stripe or LemonSqueezy? Should I write a blog? What if Google copies this? Let's add real-time multiplayer!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mt-6 text-[10px] font-mono text-center">
              <span className="p-1 px-2 border border-charcoal/15 bg-white rounded truncate line-through">DB_SCHEMA_SETUP</span>
              <span className="p-1 px-2 border border-charcoal/15 bg-white rounded truncate line-through">SOCIAL_SHARING</span>
              <span className="p-1 px-2 border border-charcoal/15 bg-white rounded truncate line-through">VITE_HMR_SERVER</span>
            </div>
          </div>

          {/* After: SandBoxer Blueprint */}
          <div className={`p-6 rounded-2xl flex flex-col justify-between text-left relative overflow-hidden min-h-[280px] shadow-md border-2 border-charcoal ${
            conceptId === 'A' ? 'bg-[#FCF6DF] border-sketch shadow-notebook' : 'bg-white'
          }`}>
            <div className="border-b border-charcoal/10 pb-2 flex justify-between items-center">
              <div>
                <span className="font-mono text-[9px] text-emerald-800 bg-emerald-100 rounded px-2 py-0.5 uppercase tracking-wider font-bold">
                  After: SandBoxer Blueprint
                </span>
                <h4 className={`font-black text-xl text-charcoal mt-2 ${conceptId === 'A' ? 'font-serif' : 'font-display'}`}>
                  Aligned Strategy Board
                </h4>
              </div>
              <Compass className="w-5 h-5 text-emerald-600 animate-spin-slow shrink-0" />
            </div>

            <div className="space-y-2 mt-4 text-xs font-mono">
              <div className="flex gap-2">
                <span className="text-emerald-600 block shrink-0 font-black">[✔] VISION:</span>
                <span className="text-charcoal leading-none">Enable travelers to book hand-vetted ruins.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-emerald-600 block shrink-0 font-black">[✔] TARGET:</span>
                <span className="text-charcoal leading-none">Busy historians and premium vacationers.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-emerald-600 block shrink-0 font-black">[✔] BOUNDS:</span>
                <span className="text-charcoal leading-none">Single landing widget + SMS coordinate pipes.</span>
              </div>
              <div className="flex gap-2 text-rose-700 italic">
                <span className="block shrink-0 font-black">[❌] FORBIDDEN:</span>
                <span className="leading-none">No chat system, zero custom analytics.</span>
              </div>
            </div>

            <p className="font-hand text-base text-notebook-crimson text-center mt-6 select-none font-bold">
              ✨ Code represents cost. Design represents value.
            </p>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 6: BUILT FOR DREAMERS                        */}
      {/* ---------------------------------------------------- */}
      <section className="my-20">
        <div className="text-center mb-10">
          <span className="font-mono text-[10px] text-pencil-gray uppercase tracking-widest font-bold">Our Audience Focus</span>
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-black text-charcoal mt-1 ${conceptId === 'A' ? 'font-serif' : 'font-display'}`}>
            Built for those who live in the future.
          </h2>
          <p className="text-xs text-pencil-gray max-w-md mx-auto mt-2 font-sans">
            We don't sell database capacity or cloud hosting. We provide clarity for different founder personas. Click a tribe card below to test their strategic blueprint automatically!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Card 1: Content Creator */}
          <div 
            onClick={() => selectIdentityPreset('video editor sell sound packs')}
            className={`p-6 text-center cursor-pointer duration-200 transition-all transform hover:scale-[1.03] rotate-1 ${
              conceptId === 'A' ? 'bg-[#FFF8E7] border-sketch shadow-notebook hover:rotate-2' : 'bg-white rounded-3xl border-2 border-charcoal shadow-sm hover:border-notebook-crimson'
            }`}
          >
            <div className="w-12 h-12 bg-rose-100 border border-charcoal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎥</span>
            </div>
            <h4 className="font-display font-extrabold uppercase text-sm tracking-wide text-charcoal">Content Creators</h4>
            <span className="text-[10px] font-mono text-notebook-crimson block mt-1 uppercase font-bold">Self-Monetizers</span>
            <p className="text-xs text-pencil-gray leading-relaxed mt-2.5 font-sans">
              Help editors and musicians list high-premium sound packs or presets under 5 minutes without establishing multi-tier Shopify sites.
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono font-bold text-notebook-crimson border-b border-notebook-crimson/30">
              <span>Preview Spec</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Indie Hackers */}
          <div 
            onClick={() => selectIdentityPreset('analytics dashboard to track stripe refunds')}
            className={`p-6 text-center cursor-pointer duration-200 transition-all transform hover:scale-[1.03] -rotate-1 ${
              conceptId === 'A' ? 'bg-[#FFF8E7] border-sketch shadow-notebook hover:-rotate-2' : 'bg-white rounded-3xl border-2 border-charcoal shadow-sm hover:border-notebook-crimson'
            }`}
          >
            <div className="w-12 h-12 bg-amber-100 border border-charcoal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛠</span>
            </div>
            <h4 className="font-display font-extrabold uppercase text-sm tracking-wide text-charcoal">Indie Hackers</h4>
            <span className="text-[10px] font-mono text-notebook-crimson block mt-1 uppercase font-bold">Micro-SaaS Solos</span>
            <p className="text-xs text-pencil-gray leading-relaxed mt-2.5 font-sans">
              Verify workflow assumptions, target micro-niches clearly, and write diagnostic webhooks before creating massive servers.
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono font-bold text-notebook-crimson border-b border-notebook-crimson/30">
              <span>Preview Spec</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Low-Code Founders */}
          <div 
            onClick={() => selectIdentityPreset('bubble diagnostic workflow logger')}
            className={`p-6 text-center cursor-pointer duration-200 transition-all transform hover:scale-[1.03] rotate-2 ${
              conceptId === 'A' ? 'bg-[#FFF8E7] border-sketch shadow-notebook hover:rotate-1' : 'bg-white rounded-3xl border-2 border-charcoal shadow-sm hover:border-notebook-crimson'
            }`}
          >
            <div className="w-12 h-12 bg-green-100 border border-charcoal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h4 className="font-display font-extrabold uppercase text-sm tracking-wide text-charcoal">Low-Code Founders</h4>
            <span className="text-[10px] font-mono text-notebook-crimson block mt-1 uppercase font-bold">Visual Builders</span>
            <p className="text-xs text-pencil-gray leading-relaxed mt-2.5 font-sans">
              Bubble builders and FlutterFlow solopreneurs looking to isolate diagnostic APIs or track server anomalies with absolute strategic clarity.
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono font-bold text-notebook-crimson border-b border-notebook-crimson/30">
              <span>Preview Spec</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 7: INTERACTIVE DEMO CONTAINER anchor        */}
      {/* ---------------------------------------------------- */}
      <span id="sandbox-interactive-demo-sheet" className="block h-1" />

      {/* ---------------------------------------------------- */}
      {/* FINAL CTA: THE BLANK LAPTOP NOTEBOOK SHEET           */}
      {/* ---------------------------------------------------- */}
      <section className="my-20 mt-28">
        <div className="max-w-4xl mx-auto rounded-3xl border-3 border-charcoal bg-white p-8 md:p-14 text-center relative overflow-hidden shadow-notebook">
          
          {/* Subtle notebook guidelines vertical margin line */}
          <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-red-300 pointer-events-none select-none" />

          {/* Grid annotations for detail */}
          <div className="absolute top-3 right-6 font-mono text-[9px] text-[#A33434]/50 select-none uppercase">
            [SHEET_A_19 // GRAVITY_ENFORCED]
          </div>

          <div className="space-y-6 relative z-10 max-w-2xl mx-auto">
            <span className="text-3xl md:text-4xl text-charcoal font-serif block select-none">✍</span>
            
            <h3 className={`text-4xl md:text-5xl font-black text-charcoal tracking-tight ${conceptId === 'A' ? 'font-serif' : 'font-display uppercase'}`}>
              Every product starts with a thought.
            </h3>
            
            <p className="text-sm text-pencil-gray leading-relaxed font-sans max-w-md mx-auto">
              Draft your startup architecture, specify MVP boundaries, and synchronize strategic gravity before coding. Connect or bring your own AI key.
            </p>

            <div className="pt-4 flex flex-col items-center space-y-4">
              <button 
                onClick={onStartBuilding}
                className="inline-flex items-center justify-center gap-2 bg-notebook-yellow hover:bg-amber-300 text-charcoal border-3 border-charcoal font-black rounded-xl px-12 py-4 shadow-sandbox-card hover:translate-y-[-2px] active:translate-y-0 transition-all font-display text-base cursor-pointer"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </button>

              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 font-mono text-[10px] text-pencil-gray font-bold uppercase pt-2">
                <span>⚡ No credit card required</span>
                <span>🌿 Bring Your Own AI Key</span>
                <span>🔒 Pure Local Draft Storage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* FOOTER & MANIFESTO ROADMAP LINKS                     */}
      {/* ---------------------------------------------------- */}
      <footer className="border-t border-charcoal/15 pt-10 pb-4 mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs font-mono text-[#3e424bb0]">
        
        {/* Left identity logo and motto */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" referrerPolicy="no-referrer" className="w-5 h-5 object-contain" />
            <span className="font-bold text-charcoal">SANDBOXER // SPEC</span>
          </div>
          <p className="text-[11px] leading-relaxed max-w-xs font-sans text-pencil-gray">
            SandBoxer helps solopreneurs and creators decide what to build before they write code. Dedicated to strategic focus, absolute visual alignment, and scope containment.
          </p>
          <p className="text-[10px] font-bold">© 2026 SandBoxer Inc. All drafts preserved local.</p>
        </div>

        {/* Middle map links */}
        <div className="md:col-span-4 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="font-bold text-charcoal text-[11px]">PROJECT MAP</span>
            <ul className="space-y-1.5 font-sans text-pencil-gray text-[11px]">
              <li className="hover:text-charcoal cursor-pointer">Manifesto</li>
              <li className="hover:text-charcoal cursor-pointer">Our Method</li>
              <li className="hover:text-charcoal cursor-pointer">Constitutions</li>
              <li className="hover:text-charcoal cursor-pointer">Strategic Sandbox</li>
            </ul>
          </div>
          <div className="space-y-2">
            <span className="font-bold text-charcoal text-[11px]">RESOURCES</span>
            <ul className="space-y-1.5 font-sans text-pencil-gray text-[11px]">
              <li className="hover:text-charcoal cursor-pointer">Scribe Docs</li>
              <li className="hover:text-charcoal cursor-pointer">Product Flow v1</li>
              <li className="hover:text-charcoal cursor-pointer">Design System</li>
              <li className="hover:text-charcoal cursor-pointer">Developer Hub</li>
            </ul>
          </div>
        </div>

        {/* Right community handles */}
        <div className="md:col-span-3 space-y-3 md:text-right">
          <span className="font-bold text-charcoal text-[11px] block">COMMUNITY HANDLES</span>
          <div className="flex xl:justify-end gap-3.5 text-charcoal">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 border border-charcoal/10 hover:border-charcoal/40 rounded-lg transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="p-2 border border-charcoal/10 hover:border-charcoal/40 rounded-lg transition-colors font-bold text-[10px]">
              Discord
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 border border-charcoal/10 hover:border-charcoal/40 rounded-lg transition-colors font-bold text-[10px]">
              Twitter/X
            </a>
          </div>
          <p className="text-[10px] font-sans text-pencil-gray">Piped securely through Cloud Run.</p>
        </div>

      </footer>

    </div>
  );
}
