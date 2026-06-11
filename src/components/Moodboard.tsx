import { useState } from 'react';
import { ConceptType, ColorSpec, FontSpec, BrandManifesto } from '../types';
import { Sparkles, Copy, Check, Eye, ChevronRight } from 'lucide-react';

interface MoodboardProps {
  conceptId: ConceptType;
  palette: ColorSpec[];
  typography: FontSpec[];
  manifesto: BrandManifesto;
  activeConceptName: string;
}

export default function Moodboard({
  conceptId,
  palette,
  typography,
  manifesto,
  activeConceptName
}: MoodboardProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeColorTest, setActiveColorTest] = useState<string | null>(palette[0].hex);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: Philosophical Narrative & Strengths / Weaknesses */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* Aesthetic Statement Card */}
        <div 
          className={`p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${
            conceptId === 'A' 
              ? 'bg-warm-cream border-sketch shadow-notebook text-charcoal' 
              : conceptId === 'B'
                ? 'bg-white rounded-3xl border-2 border-charcoal shadow-sandbox-card text-charcoal'
                : 'bg-white border-2 border-deep-navy shadow-md text-charcoal'
          }`}
          id="aesthetic-statement-card"
        >
          {/* Subtle notebook/grid backdrop overlays inside specific concepts */}
          {conceptId === 'A' && (
            <div className="absolute top-0 right-0 w-24 h-24 bg-ruled-paper opacity-5 pointer-events-none transform rotate-12" />
          )}
          {conceptId === 'C' && (
            <div className="absolute inset-0 bg-graph-grid opacity-3 pointer-events-none" />
          )}

          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-xl ${conceptId === 'A' ? 'bg-notebook-yellow' : conceptId === 'B' ? 'bg-muted-orange/20' : 'bg-deep-navy/15'}`}>
              <Sparkles className={`w-5 h-5 ${conceptId === 'C' ? 'text-deep-navy' : 'text-muted-orange'}`} />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-pencil-gray font-bold">
              Concept {conceptId} // Editorial Philosophy
            </span>
          </div>

          <div className="mb-6 mt-4">
            <h2 className={`text-4xl md:text-6xl font-black mb-4 leading-[0.95] tracking-tighter uppercase font-serif ${conceptId === 'C' ? 'text-deep-navy font-display border-b-4 border-deep-navy/10 pb-4' : 'text-charcoal'}`}>
              CONCEPT {conceptId}:<br />
              {conceptId === 'A' ? "FOUNDER'S" : conceptId === 'B' ? "CREATIVE" : "PRODUCT"}<br />
              {conceptId === 'A' ? "NOTEBOOK." : conceptId === 'B' ? "SANDBOX." : "WORKSHOP."}
            </h2>
          </div>

          <h3 className={`text-xl md:text-2xl font-display font-medium tracking-tight mb-4 italic ${conceptId === 'C' ? 'text-deep-navy' : 'text-charcoal/80'}`}>
            "{manifesto.tagline}"
          </h3>

          <p className="font-sans text-sm md:text-base leading-relaxed text-pencil-gray mb-6">
            {manifesto.philosophy}
          </p>

          <div className="border-t border-dashed border-pencil-gray/20 pt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono block text-pencil-gray uppercase">Core Metaphor</span>
              <span className={`text-sm font-medium ${conceptId === 'C' ? 'font-mono' : 'font-sans'}`}>
                {manifesto.metaphor}
              </span>
            </div>
            {conceptId === 'A' && (
              <span className="font-hand text-xl text-notebook-crimson font-bold transform -rotate-3 block">
                ✍️ "Ideas over code"
              </span>
            )}
          </div>
        </div>

        {/* Strengths & Weaknesses (Friction & Flight Matrix) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Strengths (Flight) */}
          <div 
            className={`p-6 relative ${
              conceptId === 'A' 
                ? 'bg-warm-cream border-sketch shadow-notebook' 
                : conceptId === 'B' 
                  ? 'bg-green-50/70 rounded-3xl border-2 border-charcoal shadow-sandbox-card' 
                  : 'bg-white border border-technical-steel/20 rounded shadow-sm'
            }`}
            id="brand-strengths-grid"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
              <h4 className="font-display font-bold text-sm tracking-widest uppercase text-charcoal">
                Visual Strengths // Flight
              </h4>
            </div>
            <ul className="space-y-3">
              {manifesto.strengths.map((strength, idx) => (
                <li key={idx} className="flex gap-2.5 text-xs md:text-sm text-pencil-gray items-start leading-relaxed">
                  <span className="text-green-600 font-bold font-mono">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses (Friction) */}
          <div 
            className={`p-6 relative ${
              conceptId === 'A' 
                ? 'bg-warm-cream border-sketch shadow-notebook' 
                : conceptId === 'B' 
                  ? 'bg-rose-50/70 rounded-3xl border-2 border-charcoal shadow-sandbox-card' 
                  : 'bg-white border border-technical-steel/20 rounded shadow-sm'
            }`}
            id="brand-weaknesses-grid"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
              <h4 className="font-display font-bold text-sm tracking-widest uppercase text-charcoal">
                Visual Risks // Friction
              </h4>
            </div>
            <ul className="space-y-3">
              {manifesto.weaknesses.map((weakness, idx) => (
                <li key={idx} className="flex gap-2.5 text-xs md:text-sm text-pencil-gray items-start leading-relaxed">
                  <span className="text-rose-500 font-bold font-mono">✕</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* RIGHT COLUMN: Typography & Swatches & Style Tester */}
      <div className="lg:col-span-5 space-y-8">
        
        {/* Interactive Color System Swatches */}
        <div 
          className={`p-6 relative ${
            conceptId === 'A' 
              ? 'bg-warm-cream border-sketch shadow-notebook' 
              : conceptId === 'B' 
                ? 'bg-white rounded-3xl border-2 border-charcoal shadow-sandbox-card' 
                : 'bg-white border-2 border-deep-navy shadow-sm'
          }`}
          id="color-system-swatches"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-display font-extrabold text-sm tracking-wider uppercase text-charcoal">
              Color Architecture
            </h4>
            <span className="font-mono text-[10px] text-pencil-gray uppercase font-bold">Hex Copy Enabled</span>
          </div>

          {/* Color List */}
          <div className="space-y-3 mb-6">
            {palette.map((color) => (
              <div 
                key={color.name}
                onClick={() => setActiveColorTest(color.hex)}
                className={`flex items-center justify-between p-2.5 rounded-xl border border-charcoal/10 cursor-pointer transition-all ${
                  activeColorTest === color.hex 
                    ? 'shadow-md border-charcoal scale-[1.02] bg-charcoal/5' 
                    : 'hover:bg-charcoal/5 bg-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg border border-charcoal/35 shadow-sm shrink-0 transition-transform duration-300 hover:scale-110" 
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <p className={`text-xs font-bold leading-tight ${conceptId === 'C' ? 'font-mono' : 'font-sans'}`}>
                      {color.name}
                    </p>
                    <p className="text-[10px] text-pencil-gray font-mono mt-0.5">{color.hex}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyHex(color.hex);
                    }}
                    className="p-1.5 hover:bg-charcoal/10 rounded-lg text-pencil-gray hover:text-charcoal transition-colors"
                    title="Copy HEX Code"
                  >
                    {copiedHex === color.hex ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Active Spectrum Test */}
          <div 
            className="p-4 rounded-xl border-2 border-dashed border-charcoal/20 transition-all duration-300"
            style={{ 
              backgroundColor: activeColorTest || '#fff8e7',
              color: palette.find(c => c.hex === activeColorTest)?.darkText ? '#2b2b2b' : '#fff8e7' 
            }}
          >
            <p className="font-mono text-[10px] uppercase font-bold mb-1 opacity-70">
              Palette Swatch Application Preview
            </p>
            <p className={`text-xs md:text-sm leading-snug font-medium`}>
              {palette.find(c => c.hex === activeColorTest)?.role}
            </p>
          </div>
        </div>

        {/* Typography pair specimens */}
        <div 
          className={`p-6 relative ${
            conceptId === 'A' 
              ? 'bg-warm-cream border-sketch shadow-notebook' 
              : conceptId === 'B' 
                ? 'bg-white rounded-3xl border-2 border-charcoal shadow-sandbox-card' 
                : 'bg-white border bg-graph-grid opacity-90 border-technical-steel/20 rounded shadow-sm'
          }`}
          id="typography-pair-specimens"
        >
          <div className="flex items-center justify-between mb-4 border-b border-charcoal/10 pb-3">
            <h4 className="font-display font-extrabold text-sm tracking-wider uppercase text-charcoal">
              Aesthetic Typography
            </h4>
            <span className="font-mono text-[10px] text-pencil-gray uppercase font-bold">Specimen Scale</span>
          </div>

          <div className="space-y-5">
            {typography.map((font, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] font-mono text-pencil-gray uppercase font-semibold">
                    {font.category} // {font.usage}
                  </span>
                  <span className="text-[10px] text-pencil-gray italic font-sans">
                    {font.name}
                  </span>
                </div>
                <p 
                  className={`text-lg md:text-xl font-bold border-b border-dashed border-charcoal/5 pb-2 cursor-default transition-all hover:pl-1 duration-250 ${
                    idx === 0 
                      ? 'font-display tracking-tight text-xl font-black' 
                      : idx === 1 
                        ? 'font-hand text-2xl text-notebook-crimson/90' 
                        : idx === 2
                          ? 'font-sans text-sm font-medium leading-relaxed text-charcoal'
                          : 'font-mono text-xs text-pencil-gray'
                  }`}
                  style={{ color: idx === 1 && conceptId === 'C' ? '#E05A47' : undefined }}
                >
                  {font.example}
                </p>
                <p className="text-[10px] text-pencil-gray/80 font-sans">
                  <span className="font-bold uppercase text-[9px] text-charcoal mr-1">Tuning:</span>
                  {font.pairing}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
