import { useState, FormEvent } from 'react';
import { ConceptType, ColorSpec } from '../types';
import { Sparkles, ArrowRight, NotebookPen, HelpCircle, Compass, Smile, ClipboardList, PenTool } from 'lucide-react';

interface HomepageMockupProps {
  conceptId: ConceptType;
  palette: ColorSpec[];
  activeStartup: {
    name: string;
    tag: string;
    cards: { id: string; type: string; title: string; content: string }[];
  };
}

export default function HomepageMockup({ conceptId, palette, activeStartup }: HomepageMockupProps) {
  const [typedIdea, setTypedIdea] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const getPrimaryHex = (name: string, fallback: string) => {
    return palette.find(c => c.name.toLowerCase().includes(name))?.hex || fallback;
  };

  const mainBgColor = getPrimaryHex('paper', getPrimaryHex('notebook', '#fcf6df'));
  const accentColor = getPrimaryHex('crimson', getPrimaryHex('orange', getPrimaryHex('coral', '#e89c3d')));

  const handleInteractiveSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!typedIdea.trim()) return;
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setTypedIdea('');
    }, 4000);
  };

  return (
    <div 
      className={`w-full overflow-hidden transition-all duration-300 relative ${
        conceptId === 'A' 
          ? 'bg-ruled-paper border-sketch shadow-notebook p-6 md:p-10' 
          : conceptId === 'B' 
            ? 'bg-dot-matrix rounded-[2.5rem] border-3 border-charcoal shadow-sandbox-card p-6 md:p-12' 
            : 'bg-graph-grid border-2 border-technical-steel/30 rounded-lg p-6 md:p-12'
      }`}
      id="homepage-mockup-stage"
      style={{ minHeight: '620px' }}
    >
      {/* Background Decorative Rings/Grip marks */}
      {conceptId === 'A' && (
        <div className="absolute left-4 top-0 bottom-0 w-3 flex flex-col justify-around pointer-events-none opacity-40">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-5 h-5 rounded-full bg-[#cbc0aa] border border-charcoal/20 transform -translate-x-1/2" />
          ))}
        </div>
      )}

      {/* Grid Coordinates Overlay for Concept C */}
      {conceptId === 'C' && (
        <div className="absolute top-3 left-4 right-4 flex justify-between font-mono text-[10px] text-pencil-gray pointer-events-none select-none">
          <span>LAT_GRID_0.3 // RULER_ENG</span>
          <span>SCALE 1:1 // 2026_SANDBOXER</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 pb-6 border-b border-charcoal/10">
        <div className="flex items-center gap-3">
          {conceptId === 'A' ? (
            <div className="flex items-center gap-2">
              <span className="font-hand text-3xl font-extrabold text-charcoal tracking-tight">SandBoxer</span>
              <span className="font-hand text-sm text-notebook-crimson font-semibold border-b-2 border-notebook-crimson/50 px-1 transform rotate-1">
                journal_v1
              </span>
            </div>
          ) : conceptId === 'B' ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border-2 border-charcoal shadow-sm">
              <div className="w-3.5 h-3.5 rounded-full bg-muted-orange" />
              <span className="font-display font-black text-xl tracking-wider text-charcoal">SANDBOXER.</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 font-mono text-sm tracking-widest font-extrabold text-deep-navy">
              <Compass className="w-5 h-5 text-corrective-coral animate-spin-slow" />
              <span>[SANDBOXER_PROTO_SPEC]</span>
            </div>
          )}
        </div>

        <nav className="flex items-center gap-6 font-mono text-xs text-pencil-gray">
          <span className="hover:text-charcoal cursor-pointer">Manifesto</span>
          <span className="hover:text-charcoal cursor-pointer">Constitutions</span>
          <span className="hover:text-charcoal cursor-pointer">Pricing</span>
          {conceptId === 'A' ? (
            <button className="font-hand text-lg border-sketch-sm bg-notebook-yellow hover:bg-paper-yellow/90 px-4 py-1 font-bold text-charcoal transition-all">
              Open Notebook ↗
            </button>
          ) : conceptId === 'B' ? (
            <button className="bg-white hover:bg-neutral-50 px-4 py-1.5 rounded-full border-2 border-charcoal font-bold text-xs text-charcoal shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0">
              Start Workspace
            </button>
          ) : (
            <button className="bg-deep-navy hover:bg-deep-navy/90 text-white px-4 py-1.5 rounded border border-technical-steel text-xs font-semibold tracking-wider hover:opacity-90">
              BUILD_SPEC // GO
            </button>
          )}
        </nav>
      </header>

      {/* CORE HERO PORTION */}
      <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 my-8 relative">
        {conceptId === 'A' && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-notebook-yellow/50 text-notebook-crimson border-sketch-sm font-hand text-base md:text-lg px-4 py-1 rotate-1 hover:rotate-0 transition-transform cursor-pointer">
            📓 "Every product starts with a dream & an obsession"
          </div>
        )}

        <h1 
          className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-charcoal leading-none ${
            conceptId === 'A' 
              ? 'font-display font-black leading-tight' 
              : conceptId === 'B' 
                ? 'font-display text-5xl md:text-6xl uppercase tracking-tighter' 
                : 'font-mono text-3xl md:text-5xl tracking-normal text-deep-navy'
          }`}
        >
          {conceptId === 'A' && (
            <span>The thinking room for <span className="underline decoration-wavy decoration-notebook-crimson decoration-3 underline-offset-8">founders</span></span>
          )}
          {conceptId === 'B' && (
            <span>Ideation without the <span className="bg-white border-2 border-dashed border-charcoal px-3 py-1 inline-block transform -rotate-1 rounded-2xl text-muted-orange">bloat</span></span>
          )}
          {conceptId === 'C' && (
            <span>DECIDE_WHAT_TO_BUILD_FIRST.</span>
          )}
        </h1>

        <p 
          className={`max-w-xl mx-auto text-sm md:text-base text-pencil-gray leading-relaxed ${
            conceptId === 'C' ? 'font-mono text-xs border-l-2 border-corrective-coral pl-4 text-left' : 'font-sans'
          }`}
        >
          {conceptId === 'C' 
            ? 'VERIFY: SandBoxer is not a generator. It is an architectural sandbox that holds ideas accountable. We combine Vision with extreme procedural constraints to save you months of faulty builder code.'
            : 'Most startups build the wrong things because code is written too quickly. Stop building feature lists. SandBoxer helps creators find the Core Metaphor and discipline backing their product.'}
        </p>

        {/* Dynamic Concept Interactive Action */}
        <div className="max-w-lg mx-auto py-4">
          <form 
            onSubmit={handleInteractiveSubmit}
            className={`flex flex-col sm:flex-row gap-3 p-2 relative ${
              conceptId === 'A' 
                ? 'bg-warm-cream border-sketch shadow-notebook' 
                : conceptId === 'B' 
                  ? 'bg-white rounded-2xl border-2 border-charcoal shadow-sandbox-card' 
                  : 'bg-white border border-technical-steel/30 rounded p-1.5'
            }`}
          >
            {conceptId === 'B' && (
              <div className="absolute -top-6 -right-6 font-hand text-sm text-muted-orange font-extrabold transform rotate-6 border border-dashed border-muted-orange/50 px-2 py-0.5 rounded">
                Try it Live! ✨
              </div>
            )}

            <input 
              type="text" 
              value={typedIdea}
              onChange={(e) => setTypedIdea(e.target.value)}
              placeholder={
                conceptId === 'A' 
                  ? "✍️ Jot down your raw product dream..." 
                  : conceptId === 'B' 
                    ? "🚀 Sketch an idea (e.g. Uber for dogs)..." 
                    : "ENTER_VAGUE_IDEA_KEYWORD..."
              }
              className={`flex-1 min-w-0 bg-transparent text-charcoal outline-none border-none py-2 px-3 text-sm focus:ring-0 ${
                conceptId === 'A' ? 'font-hand text-lg' : conceptId === 'C' ? 'font-mono' : 'font-sans'
              }`}
            />
            {conceptId === 'A' ? (
              <button 
                type="submit"
                className="font-hand text-lg font-bold bg-notebook-crimson hover:bg-neutral-800 text-white rounded px-5 py-1.5 flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
              >
                Inscribe Idea <ArrowRight className="w-4 h-4" />
              </button>
            ) : conceptId === 'B' ? (
              <button 
                type="submit" 
                className="bg-muted-orange hover:bg-neutral-900 hover:text-white text-charcoal font-display font-bold text-xs rounded-xl px-5 py-2 flex items-center justify-center gap-2 border-2 border-charcoal transition-transform hover:-translate-y-0.5 shrink-0"
              >
                SPARK <Sparkles className="w-4 h-4" />
              </button>
            ) : (
              <button 
                type="submit"
                className="bg-deep-navy text-white hover:bg-technical-steel border border-deep-navy font-mono text-[11px] uppercase tracking-wider font-bold rounded px-4 py-2 shrink-0 transition-all"
              >
                PARSE_CONCEPT //
              </button>
            )}
          </form>

          {successMsg && (
            <div className="mt-3 animate-fade-in">
              {conceptId === 'A' ? (
                <p className="font-hand text-lg text-notebook-crimson font-bold text-center">
                  ✏️ "Ah! Inscribed onto page 1. Now we extract its gravity..."
                </p>
              ) : conceptId === 'B' ? (
                <div className="flex items-center justify-center gap-2 text-xs font-mono text-green-700 bg-green-50 rounded-lg p-2.5 border border-green-200">
                  <Smile className="w-4 h-4" /> Spark detected! Generating spatial sandbox maps below...
                </div>
              ) : (
                <p className="font-mono text-xs text-corrective-coral text-center uppercase tracking-widest font-semibold mt-2 animate-pulse">
                  STATUS: COMPILING SPECIFICATION TREE // VALIDATING CONCEIVABILITY
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SAMPLE STRATEGY ROW - RENDERING OF CORRESPONDING DYNAMIC IDEAS */}
      <div className="mt-12">
        <p className="font-mono text-[10px] uppercase tracking-widest text-center text-pencil-gray mb-6">
          Interactive Specimen: Real Strategy Blocks for <span className="font-bold underline decoration-solid decoration-charcoal/20">{activeStartup.name}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {activeStartup.cards.slice(0, 3).map((card, index) => (
            <div 
              key={card.id}
              className={`p-5 transition-all relative group ${
                conceptId === 'A' 
                  ? 'bg-warm-cream border-sketch shadow-notebook hover:rotate-1 duration-200' 
                  : conceptId === 'B' 
                    ? `bg-white rounded-2xl border-2 border-charcoal shadow-sandbox-card hover:scale-[1.02] duration-250 ${
                        index % 3 === 0 ? 'rotate-1' : index % 3 === 1 ? '-rotate-1' : 'rotate-2'
                      }` 
                    : 'bg-white border border-technical-steel/20 rounded-md shadow-sm relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-deep-navy'
              }`}
            >
              {/* Concept-specific decorative embellishments */}
              {conceptId === 'A' && (
                <div className="absolute -top-3 left-4 transform rotate-1 bg-amber-200/50 text-[10px] border-sketch-sm font-hand px-2 py-0.5 text-pencil-gray select-none">
                  📓 block {index + 1}
                </div>
              )}
              {conceptId === 'B' && (
                <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-red-100 border border-charcoal flex items-center justify-center overflow-hidden">
                  <div className="w-1 h-1 bg-red-500 rounded-full" />
                </div>
              )}
              {conceptId === 'C' && (
                <div className="absolute top-2 right-2 font-mono text-[9px] text-pencil-gray">
                  [S_0{index + 1}]
                </div>
              )}

              <div className="flex items-center gap-2 mb-3 mt-2 md:mt-0">
                {card.type === 'vision' ? (
                  <Compass className={`w-4 h-4 ${conceptId === 'A' ? 'text-notebook-crimson' : conceptId === 'B' ? 'text-muted-orange' : 'text-deep-navy'}`} />
                ) : card.type === 'user' ? (
                  <Smile className="w-4 h-4 text-green-600" />
                ) : (
                  <HelpCircle className="w-4 h-4 text-orange-500" />
                )}
                <span className={`text-xs uppercase tracking-wider font-extrabold text-charcoal ${conceptId === 'C' ? 'font-mono' : 'font-display'}`}>
                  {card.title}
                </span>
              </div>

              <p 
                className={`text-xs md:text-sm text-pencil-gray leading-relaxed ${
                  conceptId === 'A' ? 'font-hand text-lg text-charcoal' : conceptId === 'C' ? 'font-mono' : 'font-sans'
                }`}
              >
                {card.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
