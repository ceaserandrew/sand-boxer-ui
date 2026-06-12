import { useState } from 'react';
import { ConceptType, Constitution } from '../types';
import { Sparkles, Trash2, Plus, Lock, ShieldAlert, CheckCircle, HelpCircle } from 'lucide-react';

interface ConstitutionMockupProps {
  conceptId: ConceptType;
  constitution: Constitution;
  onUpdateConstitution: (updated: Constitution) => void;
  onBackToLibrary?: () => void;
}

export default function ConstitutionMockup({
  conceptId,
  constitution,
  onUpdateConstitution,
  onBackToLibrary
}: ConstitutionMockupProps) {
  const [newPrinciple, setNewPrinciple] = useState('');
  const [newMetric, setNewMetric] = useState('');
  const [newConstraint, setNewConstraint] = useState('');
  const [newForbidden, setNewForbidden] = useState('');

  const handleUpdateVision = (text: string) => {
    onUpdateConstitution({ ...constitution, vision: text });
  };

  const handleAddField = (field: 'corePrinciples' | 'successMetrics' | 'constraints' | 'forbiddenFeatures', value: string, setter: (v: string) => void) => {
    if (!value.trim()) return;
    const updatedList = [...constitution[field], value.trim()];
    onUpdateConstitution({ ...constitution, [field]: updatedList });
    setter('');
  };

  const handleRemoveField = (field: 'corePrinciples' | 'successMetrics' | 'constraints' | 'forbiddenFeatures', index: number) => {
    const updatedList = constitution[field].filter((_, idx) => idx !== index);
    onUpdateConstitution({ ...constitution, [field]: updatedList });
  };

  return (
    <div 
      className={`relative overflow-hidden p-6 md:p-8 transition-all duration-300 ${
        conceptId === 'A' 
          ? 'bg-warm-cream border-sketch shadow-notebook' 
          : conceptId === 'B' 
            ? 'bg-white rounded-3xl border-2 border-charcoal shadow-sandbox-card' 
            : 'bg-white border-2 border-deep-navy shadow-md rounded-md'
      }`}
      id="product-constitution-interactive"
    >
      {/* Decorative Ribbon Bookmark down the side for Concept A */}
      {conceptId === 'A' && (
        <div className="absolute top-0 right-12 w-6 h-36 bg-notebook-crimson shadow-md rounded-b duration-300 transform origin-top hover:scale-y-110 pointer-events-none z-10 flex flex-col justify-end pb-3 items-center">
          <div className="w-1.5 h-1.5 bg-yellow-200 rounded-full opacity-60 animate-pulse" />
        </div>
      )}

      {/* Grid measures for Concept C */}
      {conceptId === 'C' && (
        <div className="absolute top-3 right-4 font-mono text-[9px] text-[#E05A47] font-bold border border-[#E05A47]/30 px-2 py-0.5 rounded uppercase select-none tracking-widest">
          🛡️ CONST_LOCK_V1 // REFL_ACT
        </div>
      )}

      {/* Main Title Section */}
      <div className="mb-6 pb-4 border-b border-charcoal/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {onBackToLibrary && (
              <button
                type="button"
                onClick={onBackToLibrary}
                className="flex items-center gap-1 bg-notebook-crimson text-white hover:bg-neutral-800 rounded px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 cursor-pointer mr-1"
                id="constitution-back-button"
              >
                <span>← Back to Shelf</span>
              </button>
            )}
            <span className={`p-1.5 rounded-lg ${conceptId === 'A' ? 'bg-notebook-yellow' : conceptId === 'B' ? 'bg-[#FFE2D1]' : 'bg-charcoal/10'}`}>
              <Lock className={`w-4 h-4 ${conceptId === 'C' ? 'text-deep-navy' : 'text-notebook-crimson'}`} />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#2f2f2f] font-extrabold">
              Product Gravity Core
            </span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-display font-black text-charcoal tracking-tight ${conceptId === 'C' ? 'text-deep-navy font-mono' : ''}`}>
            {conceptId === 'A' ? '📜 The Product Constitution' : conceptId === 'B' ? '🪐 Product Gravity System' : 'SPEC_CONSTITUTION // SHIELD_LAWS'}
          </h2>
        </div>
        <div className="sm:text-right">
          <span className="text-[10px] uppercase font-mono bg-charcoal/10 px-2 py-1 rounded text-charcoal font-semibold">
            Status: Immutable Guide
          </span>
          <p className="text-[10px] text-pencil-gray font-sans mt-1">Every newly pitched workspace card is filtered against these parameters.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COMPONENT: Primary Vision Frame (Gravity Center) */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`p-5 rounded-2xl relative ${conceptId === 'A' ? 'bg-notebook-yellow/30 border-sketch-sm' : conceptId === 'B' ? 'bg-amber-50/50 rounded-2xl border-2 border-charcoal' : 'bg-white border-l-4 border-deep-navy border'}`}>
            <h3 className={`text-xs uppercase font-extrabold tracking-wider text-charcoal mb-3 flex items-center gap-1.5 ${conceptId === 'C' ? 'font-mono text-deep-navy' : ''}`}>
              <Sparkles className="w-3.5 h-3.5 text-[#A26D2B]" /> Gravity Core // The Vision
            </h3>
            
            <textarea 
              value={constitution.vision}
              onChange={(e) => handleUpdateVision(e.target.value)}
              rows={5}
              placeholder="State the absolute ultimate reason this product exists..."
              className={`w-full bg-transparent resize-none outline-none border-none py-1 text-sm text-charcoal focus:ring-0 leading-relaxed ${
                conceptId === 'A' ? 'font-hand text-xl' : conceptId === 'C' ? 'font-mono text-xs' : 'font-sans'
              }`}
            />
            
            <div className="mt-4 flex justify-between items-center text-[10px] text-pencil-gray/80 font-mono">
              <span>*Core Purpose*</span>
              <span>Filter Rank: 1.0</span>
            </div>
          </div>

          {/* Aesthetic Constitution Rule Explanation Callout */}
          <div className="p-4 rounded-xl border border-charcoal/10 bg-charcoal/5 text-xs text-pencil-gray space-y-2 leading-relaxed">
            <p className="font-bold uppercase text-[10px] text-charcoal tracking-wider">How Gravity Filtration works:</p>
            <p>
              SandBoxer doesn't let developers build arbitrary components. Clicking "Generate Scaffold" uses an active Gemini Strategy Agent to verify the cards against the **Product Constitution Constraints**. If the pitch is divergent, the Sandbox triggers an instant design violation and locks the branch.
            </p>
          </div>
        </div>

        {/* RIGHT COMPONENT: Immutable Lists and Constraints */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Core Principles */}
          <div className="space-y-2.5">
            <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-charcoal">
              Core Principles ({constitution.corePrinciples.length})
            </h4>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {constitution.corePrinciples.map((principle, idx) => (
                <div key={idx} className="flex gap-2.5 text-xs items-center justify-between group p-1.5 hover:bg-charcoal/5 rounded transition-colors">
                  <span className="flex gap-2 text-pencil-gray leading-tight">
                    <span className="text-notebook-crimson font-mono font-bold">{idx + 1}.</span>
                    <span className={conceptId === 'A' ? 'font-hand text-lg text-charcoal' : conceptId === 'C' ? 'font-mono' : 'font-sans'}>{principle}</span>
                  </span>
                  <button 
                    onClick={() => handleRemoveField('corePrinciples', idx)}
                    className="p-1 hover:bg-red-50 text-pencil-gray hover:text-red-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete Principle"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Spawn Principle form */}
            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="Add critical principle..."
                value={newPrinciple}
                onChange={(e) => setNewPrinciple(e.target.value)}
                className="flex-1 bg-charcoal/5 border border-charcoal/10 rounded-lg px-2.5 py-1 text-xs text-charcoal font-sans outline-none focus:border-charcoal"
              />
              <button 
                onClick={() => handleAddField('corePrinciples', newPrinciple, setNewPrinciple)}
                className="bg-charcoal hover:bg-charcoal/90 text-white rounded-lg px-3 py-1 text-xs font-bold shrink-0 cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* 2. Success Metrics */}
          <div className="space-y-2.5 border-t border-dashed border-charcoal/10 pt-4">
            <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-charcoal">
              Success Metrics ({constitution.successMetrics.length})
            </h4>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {constitution.successMetrics.map((metric, idx) => (
                <div key={idx} className="flex gap-2.5 text-xs items-center justify-between group p-1.5 hover:bg-charcoal/5 rounded transition-colors">
                  <span className="flex gap-2 text-pencil-gray leading-tight">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    <span className={conceptId === 'A' ? 'font-hand text-lg text-charcoal' : conceptId === 'C' ? 'font-mono' : 'font-sans'}>{metric}</span>
                  </span>
                  <button 
                    onClick={() => handleRemoveField('successMetrics', idx)}
                    className="p-1 hover:bg-red-50 text-pencil-gray hover:text-red-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete Metric"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Spawn Metric Form */}
            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="Add metric (e.g. scope is reduced by 30%)..."
                value={newMetric}
                onChange={(e) => setNewMetric(e.target.value)}
                className="flex-1 bg-charcoal/5 border border-charcoal/10 rounded-lg px-2.5 py-1 text-xs text-charcoal font-sans outline-none focus:border-charcoal"
              />
              <button 
                onClick={() => handleAddField('successMetrics', newMetric, setNewMetric)}
                className="bg-charcoal hover:bg-charcoal/90 text-white rounded-lg px-3 py-1 text-xs font-bold shrink-0 cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* 3. Constraints & Forbidden Features Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-dashed border-charcoal/10 pt-4">
            
            {/* Constraints */}
            <div className="space-y-2.5">
              <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-charcoal flex items-center gap-1">
                <Lock className="w-3 h-3 text-notebook-crimson" /> Constraints
              </h4>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {constitution.constraints.map((constraint, idx) => (
                  <div key={idx} className="flex gap-1.5 text-xs justify-between items-start group">
                    <span className={`text-pencil-gray leading-tight ${conceptId === 'A' ? 'font-hand text-lg text-charcoal' : conceptId === 'C' ? 'font-mono text-[11px]' : 'font-sans'}`}>
                      • {constraint}
                    </span>
                    <button 
                      onClick={() => handleRemoveField('constraints', idx)}
                      className="p-0.5 hover:bg-red-50 text-pencil-gray hover:text-red-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete Constraint"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-1.5">
                <input 
                  type="text"
                  placeholder="e.g. offline-first..."
                  value={newConstraint}
                  onChange={(e) => setNewConstraint(e.target.value)}
                  className="flex-1 bg-charcoal/5 border border-charcoal/10 rounded-lg px-2 py-1 text-[11px] text-charcoal outline-none font-sans focus:border-charcoal"
                />
                <button 
                  onClick={() => handleAddField('constraints', newConstraint, setNewConstraint)}
                  className="bg-charcoal hover:bg-charcoal/90 text-white rounded-lg px-2 py-1 text-[10px] font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Forbidden Features */}
            <div className="space-y-2.5">
              <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-red-600 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Forbidden Features
              </h4>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {constitution.forbiddenFeatures.map((forbidden, idx) => (
                  <div key={idx} className="flex gap-1.5 text-xs justify-between items-start group text-red-700/90 font-medium">
                    <span className={`leading-tight ${conceptId === 'A' ? 'font-hand text-lg' : conceptId === 'C' ? 'font-mono text-[11px]' : 'font-sans'}`}>
                      🚫 {forbidden}
                    </span>
                    <button 
                      onClick={() => handleRemoveField('forbiddenFeatures', idx)}
                      className="p-0.5 hover:bg-red-50 text-pencil-gray hover:text-red-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove Forbidden Feature"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-1.5">
                <input 
                  type="text"
                  placeholder="e.g. infinite chat bubbles..."
                  value={newForbidden}
                  onChange={(e) => setNewForbidden(e.target.value)}
                  className="flex-1 bg-charcoal/5 border border-charcoal/10 rounded-lg px-2 py-1 text-[11px] text-charcoal outline-none font-sans focus:border-charcoal"
                />
                <button 
                  onClick={() => handleAddField('forbiddenFeatures', newForbidden, setNewForbidden)}
                  className="bg-charcoal hover:bg-charcoal/90 text-white rounded-lg px-2 py-1 text-[10px] font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
