import { useState } from 'react';
import { ConceptType } from '../types';
import { Compass, Lightbulb, Users, ShieldAlert, Sparkles, Box, ScrollText, ArrowRight } from 'lucide-react';

interface MethodTimelineProps {
  conceptId: ConceptType;
}

export default function MethodTimeline({ conceptId }: MethodTimelineProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      id: 0,
      name: 'Idea ( intuition )',
      brief: 'Capture Raw Sparks',
      icon: Lightbulb,
      color: 'bg-amber-100 hover:bg-amber-100/95 border-amber-300',
      desc: 'Inscribe your raw, unfiltered product ideas onto paper before any database configuration or code-bloat distracts your strategic focus.'
    },
    {
      id: 1,
      name: 'Vision Discovery',
      brief: 'Define the Core "Why"',
      icon: Compass,
      color: 'bg-rose-100 hover:bg-rose-100/95 border-rose-300',
      desc: "Architect the true value shift. If this startup succeeds, how exactly does the world change? What is the product's ultimate compass?"
    },
    {
      id: 2,
      name: 'User Clarity',
      brief: 'Pinpoint Your Audience',
      icon: Users,
      color: 'bg-green-100 hover:bg-green-100/95 border-green-300',
      desc: 'Reject broad target demographics like "everyone." Identify the precise user type with fewer than 10,000 followers, or estate host, etc.'
    },
    {
      id: 3,
      name: 'Problem Extraction',
      brief: 'Map Real Human Pain',
      icon: ShieldAlert,
      color: 'bg-blue-100 hover:bg-blue-100/95 border-blue-300',
      desc: 'Isolate the acute emotional or economic struggle. If they do nothing, what happens? Protect and defend the priority of the problem.'
    },
    {
      id: 4,
      name: 'MVP Boundary',
      brief: 'Design Minimum Footprint',
      icon: Box,
      color: 'bg-pink-100 hover:bg-pink-100/95 border-pink-300',
      desc: 'Formulate the absolute smallest design frame to validate your strategic assumptions without writing massive boilerplate code.'
    },
    {
      id: 5,
      name: 'Constitution',
      brief: 'Establish Scope Gravity',
      icon: ScrollText,
      color: 'bg-purple-100 hover:bg-purple-100/95 border-purple-300',
      desc: 'Lock down success metrics and forbidden columns (e.g. no chat bubbles, zero login setups) to act as a fail-safe against code bloat.'
    },
    {
      id: 6,
      name: 'Blueprint Spec',
      brief: 'Draft Architecture Book',
      icon: Sparkles,
      color: 'bg-indigo-100 hover:bg-indigo-100/95 border-indigo-300',
      desc: 'Amalgamate the strategic components into a coherent architectural blueprint ready for rapid implementation or backer pitches.'
    }
  ];

  return (
    <div className="w-full py-8">
      <div className="text-center mb-8 relative">
        <span className="font-mono text-[10px] text-pencil-gray uppercase tracking-widest font-bold">
          The SandBoxer Pipeline
        </span>
        <h3 className={`text-2xl md:text-3xl font-black text-charcoal mt-1 ${conceptId === 'A' ? 'font-serif' : 'font-display'}`}>
          The 7-Step Architectural Method
        </h3>
        <p className="text-xs text-pencil-gray max-w-xl mx-auto mt-2 font-sans">
          Hover over each interactive card on the board to discover how the SandBoxer strategy system holds ideas to supreme standards.
        </p>
      </div>

      {/* Horizontal Scroll Timeline Stage */}
      <div className="relative overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-charcoal/20">
        <div className="flex min-w-[1000px] justify-between items-center px-4 relative">
          
          {/* Subtle connecting spline drawing */}
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-charcoal/15 -translate-y-1/2 z-0" />
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isHovered = hoveredStep === idx;
            
            // Concept dynamic styling overrides
            let cardStyle = '';
            let lineIconColor = '';
            
            if (conceptId === 'A') {
              // Notebook paper look
              cardStyle = `bg-[#FFF8E7] border-sketch p-4 shadow-notebook rounded-lg transform ${
                idx % 2 === 0 ? 'rotate-1' : '-rotate-1 hover:rotate-1'
              } duration-200 cursor-pointer ${isHovered ? 'scale-105 border-notebook-crimson' : 'border-charcoal/40'}`;
              lineIconColor = isHovered ? 'text-notebook-crimson' : 'text-charcoal';
            } else if (conceptId === 'B') {
              // Playing sticky note look
              cardStyle = `${step.color} p-4 rounded-3xl border-2 border-charcoal shadow-sandbox-card transform ${
                idx % 3 === 0 ? 'rotate-1' : idx % 3 === 1 ? '-rotate-2' : 'rotate-2'
              } hover:rotate-0 hover:scale-105 duration-300 cursor-pointer ${isHovered ? 'border-muted-orange ring-4 ring-muted-orange/15 shadow-lg' : ''}`;
              lineIconColor = 'text-charcoal';
            } else {
              // Engineering drafting blueprint unit
              cardStyle = `bg-white p-4 border border-technical-steel/30 rounded shadow-sm text-left relative cursor-pointer hover:border-deep-navy hover:scale-103 duration-150 ${
                isHovered ? 'border-l-4 border-l-corrective-coral shadow-md' : 'border-l-4 border-l-deep-navy'
              }`;
              lineIconColor = 'text-deep-navy';
            }

            return (
              <div 
                key={step.id} 
                className="w-[130px] flex flex-col items-center text-center z-10 relative"
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Stage Index Metric */}
                <div className="font-mono text-[10px] text-pencil-gray mb-2 flex items-center gap-1 font-bold">
                  <span>STEP_0{step.id}</span>
                </div>

                {/* Tactile Board Card */}
                <div className={`${cardStyle} w-full aspect-square flex flex-col justify-between items-center text-center`}>
                  <div className={`p-2 rounded-xl bg-charcoal/5 ${lineIconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-bold tracking-tight text-charcoal leading-tight uppercase ${conceptId === 'C' ? 'font-mono' : 'font-display'}`}>
                    {step.name.split(' (')[0]}
                  </span>
                  
                  {conceptId === 'A' && (
                    <span className="font-hand text-[10px] text-notebook-crimson/80 leading-none">
                      {step.brief.toLowerCase()}
                    </span>
                  )}
                  {conceptId !== 'A' && (
                    <span className="text-[9px] text-pencil-gray leading-none">
                      {step.brief}
                    </span>
                  )}
                </div>

                {/* SVG step connector arrows */}
                {idx < steps.length - 1 && (
                  <div className="absolute right-[-24px] top-[50%] -translate-y-1/2 hidden md:block">
                    <ArrowRight className="w-4 h-4 text-charcoal/30" />
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>

      {/* Explanatory annotation ledger */}
      <div className="max-w-xl mx-auto mt-6 px-4">
        {hoveredStep !== null ? (
          <div className="animate-fade-in">
            <div className={`p-4 transition-all ${
              conceptId === 'A' 
                ? 'bg-warm-cream border-sketch shadow-notebook rounded-lg' 
                : conceptId === 'B' 
                  ? 'bg-white rounded-2xl border-2 border-charcoal shadow-sandbox-card' 
                  : 'bg-white border-2 border-deep-navy rounded p-4'
            }`}>
              <div className="flex items-center gap-2 border-b border-charcoal/10 pb-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-notebook-crimson animate-pulse" />
                <span className="font-mono text-xs uppercase text-charcoal font-black">
                  Stage_0{steps[hoveredStep].id} // Focus Mechanics
                </span>
              </div>
              <h4 className={`text-base font-black text-charcoal ${conceptId === 'A' ? 'font-serif' : 'font-display'}`}>
                {steps[hoveredStep].name}
              </h4>
              <p className={`text-xs text-pencil-gray leading-relaxed mt-1 ${conceptId === 'A' ? 'font-hand text-lg text-charcoal' : 'font-sans'}`}>
                {steps[hoveredStep].desc}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center p-3 border border-dashed border-charcoal/15 rounded-lg bg-charcoal/5">
            <p className="font-hand text-base text-pencil-gray leading-none italic">
              ✨ Hover or touch a strategy card to inspect details of the design-thinking method.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
