import { useState, useEffect } from 'react';
import { ConceptType } from '../types';
import { Lightbulb, Compass, Users, ShieldAlert, Sparkles, Box, ScrollText, CheckCircle2, Play } from 'lucide-react';

interface InteractiveBlueprintGeneratorProps {
  conceptId: ConceptType;
  initialInput?: string;
}

export default function InteractiveBlueprintGenerator({ conceptId, initialInput = '' }: InteractiveBlueprintGeneratorProps) {
  const [userInput, setUserInput] = useState(initialInput);
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1 = idle
  const [isGenerating, setIsGenerating] = useState(false);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [activeLogIndex, setActiveLogIndex] = useState(0);

  // Preloaded template blueprints that match user actions
  const PRESET_BLUEPRINTS: Record<string, any> = {
    content_creator: {
      name: 'Creator Hub',
      idea: 'Help video editors sell sound effects and custom LUT packs easily.',
      vision: 'To build a secure, zero-overhead ledger enabling creators to list and self-monetize raw audio assets inside 5 minutes.',
      user: 'Independent video editors & micro-creators with under 10k followers.',
      problem: 'Complex, expensive e-commerce setups require monthly subscriptions and take massive cuts of low-volume transactions.',
      mvp: 'A simple single-link payment widget that pipes proceeds to Stripe with minimal listing sheets.',
      constitution: {
        successMetric: 'First $20 organic sale',
        forbiddenVec: '❌ No social networks, zero user forums, no complex affiliate layers'
      }
    },
    indie_hacker: {
      name: 'Micro-SaaS Inlay',
      idea: 'An analytics dashboard for indie hackers to tracking project refunds.',
      vision: 'Inject clarity into bootstrapper finances by highlighting chargeback rates and refund leaks in real-time.',
      user: 'Solopreneurs managing 3+ lightweight Stripe/Paddle digital apps.',
      problem: 'Stripe dashboards hide refund tracking metrics in dense tabular accounting lists, costing creators key cash leaks.',
      mvp: 'A lightweight webhook listener that logs chargebacks and sends notification alerts.',
      constitution: {
        successMetric: 'Reduce churn rate by 15%',
        forbiddenVec: '❌ No automatic email campaigns, zero automated chat boxes'
      }
    },
    low_code_founder: {
      name: 'NoCode Sentry',
      idea: 'A diagnostic logger for bubble workflows.',
      vision: 'Promote analytical rigor to low-code developers by tracking api failures and sluggish operations.',
      user: 'Freelance Bubble agencies and solo founders running production web applets.',
      problem: 'Workflow failures crash silently in the background, alienating users with no server-side diagnostic tools.',
      mvp: 'A single script snippet integration showing active workflow latency logs.',
      constitution: {
        successMetric: 'Diagnostic time cut below 2 mins',
        forbiddenVec: '❌ No heavy auto-fixing algorithms, zero code-builder tools'
      }
    },
    default: {
      name: 'Custom Product Lab',
      idea: 'A highly structured startup designed to address a critical user pain with zero waste.',
      vision: 'Fulfill the primary strategic promise while enforcing rigid scope limitations over bloated setups.',
      user: 'Targeted early beachhead customer segment suffering from direct friction point.',
      problem: 'Unoptimized alternative products force users into complex, confusing multi-step dashboards.',
      mvp: 'A concentrated 3-step pipeline designed to test market validation without heavy boilerplate.',
      constitution: {
        successMetric: 'Immediate proof of value',
        forbiddenVec: '❌ No unvetted auto-responses, zero database overheads'
      }
    }
  };

  // Sync initial input updates
  useEffect(() => {
    if (initialInput) {
      setUserInput(initialInput);
      handleTriggerGeneration(initialInput);
    }
  }, [initialInput]);

  const generationLogs = [
    '🔍 Analyzing raw intent parameters...',
    '🌿 Formulating product compass & strategic vision...',
    '👥 Identifying high-pain early beachhead users...',
    '🚨 Isolating the core emotional friction point...',
    '📐 Establishing minimalist MVP boundaries...',
    '📜 Enforcing safety policies & Product Constitution...',
    '✨ Strategic Blueprint Finalized!'
  ];

  const getActivePreset = (input: string) => {
    const textIn = input.toLowerCase();
    if (textIn.includes('video') || textIn.includes('creator') || textIn.includes('sell') || textIn.includes('editor')) {
      return PRESET_BLUEPRINTS.content_creator;
    }
    if (textIn.includes('analytics') || textIn.includes('indie') || textIn.includes('hacker') || textIn.includes('refund')) {
      return PRESET_BLUEPRINTS.indie_hacker;
    }
    if (textIn.includes('bubble') || textIn.includes('nocode') || textIn.includes('logger') || textIn.includes('diagnose')) {
      return PRESET_BLUEPRINTS.low_code_founder;
    }
    
    // Create custom dynamic blueprint based on their actual words to seem super alive!
    return {
      name: input.length > 15 ? input.slice(0, 15) + '...' : input || 'My Startup Custom Spec',
      idea: input || 'A concentrated startup project.',
      vision: `To empower users to instantly achieve results for "${input}" through absolute, verified structural focus.`,
      user: `Early adopters and creators struggling with current options for "${input}".`,
      problem: `Current solutions for "${input}" are overly complex, bloated with widgets, and completely generic.`,
      mvp: `A highly concentrated single-screen application targeting the absolute fastest path to core validation.`,
      constitution: {
        successMetric: 'First 50 verified signups',
        forbiddenVec: '❌ No complex multi-user databases, no automatic social hooks'
      }
    };
  };

  const activeSpec = getActivePreset(userInput);

  const handleTriggerGeneration = (customInput?: string) => {
    const textToGenerateVal = customInput || userInput;
    if (!textToGenerateVal.trim()) return;
    
    setIsGenerating(true);
    setCurrentStep(0);
    setLogMessages([generationLogs[0]]);
    setActiveLogIndex(0);
  };

  useEffect(() => {
    if (!isGenerating) return;

    if (currentStep < generationLogs.length - 1) {
      const timer = setTimeout(() => {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        setLogMessages(prev => [...prev, generationLogs[nextStep]]);
        setActiveLogIndex(nextStep);
      }, 1000); // Progress every 1000ms
      return () => clearTimeout(timer);
    } else {
      setIsGenerating(false);
    }
  }, [currentStep, isGenerating]);

  // Decorative frames
  const getCardThemeClass = () => {
    if (conceptId === 'A') {
      return 'bg-[#FFF8E7] border-sketch shadow-notebook text-charcoal';
    } else if (conceptId === 'B') {
      return 'bg-[#FFFDF4] rounded-3xl border-2 border-charcoal shadow-sandbox-card';
    } else {
      return 'bg-white border border-technical-steel/20 rounded shadow-md border-l-4 border-l-deep-navy';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      
      {/* LEFT COLUMN: Input Terminal Console */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        
        {/* Input box */}
        <div className={`p-6 relative ${getCardThemeClass()}`}>
          {conceptId === 'A' && (
            <div className="absolute top-1 right-2 font-hand text-[11px] text-notebook-crimson font-bold rotate-2">[sandbox_v1]</div>
          )}
          
          <div className="flex items-center gap-1.5 mb-3 border-b border-charcoal/10 pb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-notebook-crimson shrink-0" />
            <h4 className={`text-xs uppercase tracking-wider font-extrabold text-charcoal ${conceptId === 'C' ? 'font-mono' : 'font-display'}`}>
              Inscribe Strategic Ideal
            </h4>
          </div>

          <p className="text-xs text-pencil-gray mb-4 leading-relaxed font-sans">
            Type your raw product idea or dream. SandBoxer will not produce bloated, faulty code. Instead, we extract its architectural gravity.
          </p>

          <div className="space-y-4">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder='Try typing "An app to help video editors sell sound packs" or click templates...'
              rows={4}
              disabled={isGenerating}
              className={`w-full p-3 bg-charcoal/5 border border-charcoal/15 rounded-lg text-charcoal text-sm outline-none focus:border-notebook-yellow placeholder:text-pencil-gray/60 resize-none ${
                conceptId === 'A' ? 'font-hand text-lg' : conceptId === 'C' ? 'font-mono text-xs' : 'font-sans'
              }`}
            />

            <button
              onClick={() => handleTriggerGeneration()}
              disabled={isGenerating || !userInput.trim()}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold cursor-pointer transition-all duration-300 ${
                isGenerating 
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed' 
                  : 'bg-charcoal text-[#fff8e7] hover:bg-neutral-800 hover:scale-101 active:scale-100 shadow-md'
              }`}
            >
              <Play className="w-4 h-4 fill-[#fff8e7]" />
              <span>{isGenerating ? 'Compiling Blueprint...' : 'Extract Core Blueprint →'}</span>
            </button>
          </div>
        </div>

        {/* Real-time Generative Logs Terminal */}
        <div className="p-4 bg-charcoal text-[#e1d6be] border border-charcoal/20 rounded-xl relative overflow-hidden min-h-[160px] flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#E89C3D] font-bold">● COGNITIVE_GRAVITY_COMPILER</span>
            <span className="font-mono text-[9px] text-[#cbc0aa]">SEC_01</span>
          </div>

          <div className="flex-1 space-y-1.5 font-mono text-[10px] overflow-y-auto max-h-[110px] pr-2">
            {currentStep === -1 ? (
              <p className="text-pencil-gray italic">Standing by... input your startup vision to begin compilation sequence.</p>
            ) : (
              logMessages.map((msg, index) => (
                <div key={index} className="flex gap-2 items-center text-emerald-300 animate-fade-in font-mono">
                  {index === currentStep && isGenerating ? (
                    <span className="w-1.5 h-1.5 bg-notebook-yellow rounded-full animate-ping shrink-0" />
                  ) : (
                    <span className="text-notebook-yellow shrink-0 font-bold">✔</span>
                  )}
                  <span className={`${index === currentStep ? 'text-[#fff8e7] font-bold' : 'text-neutral-400'}`}>
                    {msg}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-white/5 pt-2 mt-2 flex justify-between items-center text-[9px] font-mono text-pencil-gray text-right">
            <span>VOLTAGAGE: SECURE // OFF_LINE</span>
            <span className="animate-pulse text-[#E89C3D]">
              {isGenerating ? 'ANALYZING...' : currentStep === generationLogs.length - 1 ? 'READY' : 'STANDBY'}
            </span>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Live Blueprint Display Sheet */}
      <div className="lg:col-span-7">
        <div 
          className={`w-full h-full relative transition-all duration-500 overflow-hidden min-h-[440px] ${
            conceptId === 'A' 
              ? 'bg-ruled-paper border-sketch p-6 shadow-notebook rounded-xl' 
              : conceptId === 'B' 
                ? 'bg-[#FCF9EE] rounded-[2rem] border-2 border-charcoal p-6 shadow-sandbox-card' 
                : 'bg-graph-grid border-2 border-technical-steel/20 rounded-lg p-6 shadow-md'
          }`}
        >
          {/* Notebook binding rings replica for style A */}
          {conceptId === 'A' && (
            <div className="absolute top-0 bottom-0 left-2 w-1.5 flex flex-col justify-around pointer-events-none opacity-30 select-none">
              {[...Array(14)].map((_, i) => (
                <div key={i} className="w-3.5 h-3.5 rounded-full bg-[#ccc3af] border border-charcoal/30 select-none" />
              ))}
            </div>
          )}

          {/* Grid annotations tag for concept C */}
          {conceptId === 'C' && (
            <div className="absolute top-2 right-4 font-mono text-[9px] text-[#3E424B]/40 uppercase select-none">
              [SHEET_NO_A4] // BOUNDARIES: RIGID
            </div>
          )}

          {currentStep === -1 ? (
            // Empty / Welcome state illustration
            <div className="h-full flex flex-col justify-center items-center text-center p-6 space-y-4 m-auto">
              <div className="w-14 h-14 bg-notebook-yellow/70 border border-charcoal/20 flex items-center justify-center rounded-2xl animate-bounce shadow-sm">
                <Lightbulb className="w-7 h-7 text-charcoal" />
              </div>
              <h5 className={`text-lg font-black text-charcoal uppercase ${conceptId === 'C' ? 'font-mono' : 'font-display'}`}>
                Awaiting Strategic Scribe
              </h5>
              <p className="text-xs text-pencil-gray max-w-sm leading-relaxed font-sans">
                Submit an idea on the left, or select one of the Dreamer templates below, and witness SandBoxer analyze the ideas into structural blocks page-by-page.
              </p>
            </div>
          ) : (
            // Generated Blueprint Active Cards
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-center border-b-2 border-charcoal/15 pb-2">
                <div>
                  <h4 className={`text-lg text-charcoal font-black uppercase ${conceptId === 'A' ? 'font-serif' : 'font-display'}`}>
                    {activeSpec.name}
                  </h4>
                  <p className="text-[10px] text-pencil-gray font-mono">COMPILED BLUEPRINT // PAGE_101</p>
                </div>
                {currentStep === generationLogs.length - 1 && (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-300 rounded-full text-emerald-800 text-[10px] font-mono leading-none animate-pulse">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ALIGNED_VALIDATED</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. IDEA */}
                {currentStep >= 0 && (
                  <div className={`p-3 border rounded-lg transition-all animate-fade-in ${
                    conceptId === 'A' ? 'bg-[#FFFBF2] border-charcoal/25 rotate-1 shadow-sm' : 'bg-white rounded-xl border-charcoal/20 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-mono text-[9px] uppercase font-bold text-charcoal">Idea Spark</span>
                    </div>
                    <p className={`text-xs text-pencil-gray leading-snug ${conceptId === 'A' ? 'font-hand text-base text-charcoal' : 'font-sans'}`}>
                      {activeSpec.idea}
                    </p>
                  </div>
                )}

                {/* 2. VISION */}
                {currentStep >= 1 && (
                  <div className={`p-3 border rounded-lg transition-all animate-fade-in ${
                    conceptId === 'A' ? 'bg-[#FFFBF2] border-charcoal/25 -rotate-1 shadow-sm border-l-4 border-l-notebook-crimson' : 'bg-white rounded-xl border-charcoal/20 shadow-sm border-l-4 border-l-muted-orange'
                  }`}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Compass className="w-3.5 h-3.5 text-rose-500" />
                      <span className="font-mono text-[9px] uppercase font-bold text-charcoal text-rose-500">Ultimate Vision</span>
                    </div>
                    <p className={`text-xs text-pencil-gray leading-snug ${conceptId === 'A' ? 'font-hand text-base text-charcoal' : 'font-sans'}`}>
                      {activeSpec.vision}
                    </p>
                  </div>
                )}

                {/* 3. USER */}
                {currentStep >= 2 && (
                  <div className={`p-3 border rounded-lg transition-all animate-fade-in ${
                    conceptId === 'A' ? 'bg-[#FFFBF2] border-charcoal/25 rotate-2 shadow-sm' : 'bg-white rounded-xl border-charcoal/20 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Users className="w-3.5 h-3.5 text-green-600" />
                      <span className="font-mono text-[9px] uppercase font-bold text-charcoal">Target Dreamer</span>
                    </div>
                    <p className={`text-xs text-pencil-gray leading-snug ${conceptId === 'A' ? 'font-hand text-base text-charcoal' : 'font-sans'}`}>
                      {activeSpec.user}
                    </p>
                  </div>
                )}

                {/* 4. PROBLEM */}
                {currentStep >= 3 && (
                  <div className={`p-3 border rounded-lg transition-all animate-fade-in ${
                    conceptId === 'A' ? 'bg-[#FFFBF2] border-charcoal/25 -rotate-2 shadow-sm' : 'bg-white rounded-xl border-charcoal/20 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                      <span className="font-mono text-[9px] uppercase font-bold text-charcoal">Core Friction</span>
                    </div>
                    <p className={`text-xs text-pencil-gray leading-snug ${conceptId === 'A' ? 'font-hand text-base text-charcoal' : 'font-sans'}`}>
                      {activeSpec.problem}
                    </p>
                  </div>
                )}

                {/* 5. MVP BOUNDS */}
                {currentStep >= 4 && (
                  <div className={`p-3 border rounded-lg transition-all animate-fade-in ${
                    conceptId === 'A' ? 'bg-[#FFFBF2] border-charcoal/25 rotate-1 shadow-sm' : 'bg-white rounded-xl border-charcoal/20 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Box className="w-3.5 h-3.5 text-pink-500" />
                      <span className="font-mono text-[9px] uppercase font-bold text-charcoal">Minimum Architecture</span>
                    </div>
                    <p className={`text-xs text-pencil-gray leading-snug ${conceptId === 'A' ? 'font-hand text-base text-charcoal' : 'font-sans'}`}>
                      {activeSpec.mvp}
                    </p>
                  </div>
                )}

                {/* 6. PRODUCT CONSTITUTION */}
                {currentStep >= 5 && (
                  <div className={`p-3 border rounded-lg transition-all animate-fade-in col-span-1 md:col-span-2 ${
                    conceptId === 'A' ? 'bg-[#FCF6DF] border-charcoal/30 shadow-notebook border-t-4 border-t-notebook-crimson' : 'bg-white rounded-xl border-charcoal/20 shadow-sm border-t-4 border-t-indigo-600'
                  }`}>
                    <div className="flex items-center gap-1.5 mb-1.5 border-b border-charcoal/10 pb-1">
                      <ScrollText className="w-3.5 h-3.5 text-purple-600" />
                      <span className="font-mono text-[9px] uppercase font-bold text-charcoal">Project Gravity Constitution</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-mono text-pencil-gray uppercase block font-bold">Success Metric:</span>
                        <p className={`font-semibold text-emerald-800 ${conceptId === 'A' ? 'font-hand text-base text-charcoal' : 'font-sans'}`}>
                          ✔ {activeSpec.constitution.successMetric}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-pencil-gray uppercase block font-bold">Forbidden Scope Walls:</span>
                        <p className={`text-rose-700 italic ${conceptId === 'A' ? 'font-hand text-base text-charcoal' : 'font-sans'}`}>
                          {activeSpec.constitution.forbiddenVec}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
