import React, { useState } from 'react';
import { 
  Settings, 
  Sparkles, 
  Key, 
  Trash2, 
  RefreshCw, 
  Check, 
  ShieldCheck, 
  User, 
  Palette, 
  Target, 
  Info,
  ChevronRight,
  Eye, 
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { ConceptType, Constitution } from '../types';
import { motion } from 'motion/react';

interface SettingsPanelProps {
  conceptId: ConceptType;
  activeConceptName: string;
  onSelectConcept: (concept: ConceptType) => void;
  activeProjectKey: string;
  onSelectProject: (key: string) => void;
  projects: Record<string, { name: string; tag: string; constitution: Constitution }>;
  onTriggerNewProject: () => void;
  currentUser: string | null;
  onLogout: () => void;
  onResetOnboarding: () => void;
  userDossier: { role: string; philosophy: string; workEthos: string[] } | null;
}

export default function SettingsPanel({
  conceptId,
  activeConceptName,
  onSelectConcept,
  activeProjectKey,
  onSelectProject,
  projects,
  onTriggerNewProject,
  currentUser,
  onLogout,
  onResetOnboarding,
  userDossier
}: SettingsPanelProps) {
  
  // BYOK States loaded directly from localStorage to align with secure client-side model fetcher
  const [byokProvider, setByokProvider] = useState<string>(() => localStorage.getItem('sandboxer_byok_provider') || 'gemini');
  const [byokApiKey, setByokApiKey] = useState<string>(() => localStorage.getItem('sandboxer_byok_api_key') || '');
  const [byokModel, setByokModel] = useState<string>(() => localStorage.getItem('sandboxer_byok_model') || 'gemini-3.5-flash');
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSaveBYOK = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('sandboxer_byok_provider', byokProvider);
    localStorage.setItem('sandboxer_byok_api_key', byokApiKey);
    localStorage.setItem('sandboxer_byok_model', byokModel);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  const handleClearBYOK = () => {
    localStorage.removeItem('sandboxer_byok_provider');
    localStorage.removeItem('sandboxer_byok_api_key');
    localStorage.removeItem('sandboxer_byok_model');
    setByokProvider('gemini');
    setByokApiKey('');
    setByokModel('gemini-3.5-flash');
    setIsSaved(false);
  };

  // Dynamic Theme Styling matching our 3 concepts
  const getContainerStyles = () => {
    switch (conceptId) {
      case 'A':
        return 'bg-warm-cream border-sketch shadow-notebook p-6 md:p-8 space-y-8 font-sans';
      case 'B':
        return 'bg-white rounded-3xl border-2 border-charcoal shadow-sandbox-card p-6 md:p-8 space-y-8 font-sans';
      case 'C':
        return 'bg-white border border-technical-steel/20 rounded shadow-md p-6 md:p-8 space-y-8 font-sans';
    }
  };

  const getSectionHeaderStyles = () => {
    switch (conceptId) {
      case 'A':
        return 'font-display font-extrabold text-sm uppercase tracking-wider text-charcoal border-b border-charcoal/15 pb-2 mb-4';
      case 'B':
        return 'font-display font-bold text-xs uppercase tracking-widest text-[#E89C3D] border-b-2 border-charcoal/10 pb-1.5 mb-4';
      case 'C':
        return 'font-mono text-xs uppercase tracking-widest text-deep-navy border-b border-technical-steel/20 pb-2 mb-4 font-semibold';
    }
  };

  const getInputStyles = () => {
    return 'w-full text-xs p-2.5 bg-[#FFFDF9] border border-charcoal/25 rounded-md font-sans focus:ring-1 focus:ring-charcoal outline-none transition-all';
  };

  const getButtonStyles = () => {
    switch (conceptId) {
      case 'A':
        return 'bg-notebook-crimson hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase py-2 px-4 rounded shadow-sm transition-colors cursor-pointer';
      case 'B':
        return 'bg-charcoal hover:bg-neutral-800 text-white font-sans text-xs font-bold uppercase py-2 px-4 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer';
      case 'C':
        return 'bg-deep-navy hover:bg-neutral-800 text-white font-mono text-xs font-semibold uppercase py-2 px-4 rounded shadow transition-all cursor-pointer';
    }
  };

  return (
    <div className={getContainerStyles()}>
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-charcoal/10 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-display font-black text-charcoal flex items-center gap-2">
            <Settings className="w-5 h-5 text-notebook-crimson animate-spin-slow" />
            <span>⚙️ SYSTEM SETTINGS CONTROLS</span>
          </h2>
          <p className="text-xs text-pencil-gray mt-1 leading-relaxed">
            Configure private credentials, alternate between branding skins, switch active strategic projects, and review sandbox constraints.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono bg-charcoal/5 border border-charcoal/10 text-charcoal px-3 py-1 rounded-full font-semibold">
            SECURE CLIENT SANDBOX MODE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: VISUAL SKINS & PROJECT CONFIGURATION */}
        <div className="space-y-6">
          
          {/* SECTION 1: VISUAL SKIN THEME SELECTOR */}
          <div>
            <h3 className={getSectionHeaderStyles()}>
              🎨 Brand UI Skin Theme (Concept Variant)
            </h3>
            <p className="text-xs text-pencil-gray mb-3.5 leading-normal">
              Each skin represents a distinct psychological layout designed to impact how you approach your strategic planning tasks.
            </p>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { 
                  id: 'A' as ConceptType, 
                  name: "Founder's Notebook Theme", 
                  desc: "Soft warm cream tones, handwritten margins, sketch strokes, and maximum psychological relief to plan wild ideas without stress.",
                  icon: "📓",
                  accent: "border-[#B83F3F]"
                },
                { 
                  id: 'B' as ConceptType, 
                  name: "Creative Sandbox Theme", 
                  desc: "Modern crisp yellow accent, cute rounded cards, floating post-it aesthetic, and cursor simulation layers tailored for serial builders.",
                  icon: "🎨",
                  accent: "border-[#E89C3D]"
                },
                { 
                  id: 'C' as ConceptType, 
                  name: "Product Workshop Theme", 
                  desc: "High density industrial margins, razor-sharp technical boundaries, grid blueprints, and deep slate typography for surgical operations.",
                  icon: "📐",
                  accent: "border-[#1A365D]"
                }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => onSelectConcept(style.id)}
                  className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex gap-3 text-charcoal cursor-pointer relative ${
                    conceptId === style.id 
                      ? `${style.accent} bg-white shadow-md font-bold` 
                      : 'border-charcoal/10 bg-white/40 hover:bg-white/90 hover:border-charcoal/30'
                  }`}
                >
                  <span className="text-xl select-none">{style.icon}</span>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xs font-bold text-charcoal">{style.name}</span>
                      {conceptId === style.id && (
                        <span className="text-[9px] font-mono uppercase bg-emerald-50 text-emerald-800 px-1 py-0.2 rounded border border-emerald-300 font-extrabold">
                          ACTIVE SKIN
                        </span>
                      )}
                    </div>
                    <p className="text-[10.5px] font-sans text-pencil-gray leading-normal font-normal">
                      {style.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 2: ACTIVE BLUEPRINT CONFIGURATION */}
          <div>
            <h3 className={getSectionHeaderStyles()}>
              📒 Active Project Core Selection
            </h3>
            <p className="text-xs text-pencil-gray mb-3 leading-normal">
              Directly activate, manage or launch dynamic strategic workspace configurations.
            </p>

            <div className="bg-white/70 border border-charcoal/15 p-4 rounded-xl space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] font-mono text-pencil-gray uppercase font-bold block">
                  Select Swappable Project Capsule:
                </label>
                <select
                  value={activeProjectKey}
                  onChange={(e) => onSelectProject(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-charcoal/20 rounded-md font-mono focus:ring-1 focus:ring-charcoal outline-none cursor-pointer"
                >
                  {Object.entries(projects).map(([key, item]) => {
                    const prefix = key === 'creator_launch' ? '📒 ' : key === 'creator_launch_val' ? '🔍 ' : key === 'creator_launch_growth' ? '📈 ' : '🚀 ';
                    return (
                      <option key={key} value={key}>
                        {prefix}{item.name} ({item.tag})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="pt-2 border-t border-charcoal/10 flex items-center justify-between gap-4">
                <span className="text-[9.5px] font-sans text-pencil-gray leading-tight">
                  Need another project charter? Build interactive goals live.
                </span>
                <button
                  type="button"
                  onClick={onTriggerNewProject}
                  className="px-3 py-1.5 bg-charcoal hover:bg-neutral-800 text-white font-mono text-[9.5px] font-black uppercase rounded transition-all active:scale-[0.97] cursor-pointer shrink-0"
                >
                  + New Constitution
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: BYOK SETTINGS & FOUNDER DOSSIER */}
        <div className="space-y-6">
          
          {/* SECTION 3: BRING YOUR OWN KEY SECURE INTEGRATION */}
          <form onSubmit={handleSaveBYOK} className="space-y-4">
            <div>
              <h3 className={getSectionHeaderStyles()}>
                🔑 Bring Your Own Key API Strategic Core
              </h3>
              <p className="text-xs text-pencil-gray mb-3 leading-normal">
                Connecting any major LLM provider delivers personalized live anti-drift workspace analysis directly in your local browser, strictly bypasses intermediary telemetry servers.
              </p>

              <div className="bg-[#FFFDF4] p-4 rounded-xl border border-charcoal/20 space-y-3.5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1">
                  <span className="bg-notebook-yellow text-charcoal font-mono text-[8.5px] uppercase px-1.5 py-0.5 rounded font-black tracking-wider">
                    Client-Direct SECURE
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-[#7D6B4E] uppercase font-black block">
                    API Provider Endpoint:
                  </label>
                  <select
                    value={byokProvider}
                    onChange={(e) => {
                      const p = e.target.value;
                      setByokProvider(p);
                      let def = 'gemini-3.5-flash';
                      if (p === 'openai') def = 'gpt-4o-mini';
                      if (p === 'anthropic') def = 'claude-3-5-sonnet-20241022';
                      if (p === 'deepseek') def = 'deepseek-chat';
                      setByokModel(def);
                    }}
                    className="w-full text-xs p-2 bg-white border border-charcoal/20 rounded font-sans"
                  >
                    <option value="gemini">Google Gemini AI</option>
                    <option value="openai">OpenAI GPT Core</option>
                    <option value="deepseek">DeepSeek (API Cloud)</option>
                    <option value="anthropic">Anthropic Claude API</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center bg-transparent">
                    <label className="text-[9px] font-mono text-[#7D6B4E] uppercase font-black">
                      Private Key Credentials:
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="text-[9px] font-mono text-[#B83F3F] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {showApiKey ? (
                        <>
                          <EyeOff className="w-3 h-3" />
                          <span>hide key</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3 h-3" />
                          <span>reveal</span>
                        </>
                      )}
                    </button>
                  </div>
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    placeholder={`Paste secure client-direct ${byokProvider} API key...`}
                    value={byokApiKey || ''}
                    onChange={(e) => setByokApiKey(e.target.value)}
                    className={getInputStyles()}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-[#7D6B4E] uppercase font-black block">
                    Full Model Identifier (e.g. model alias):
                  </label>
                  <input
                    type="text"
                    placeholder="Enter targeted model identifier name..."
                    value={byokModel}
                    onChange={(e) => setByokModel(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-charcoal/20 rounded font-mono"
                  />
                </div>

                {byokApiKey ? (
                  <div className="p-2 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded text-[10.5px] font-sans flex items-start gap-1.5 leading-snug">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Living strategy models will automatically activate!</strong> Your parameters will render custom analysis inside the workspace in real-time.
                    </div>
                  </div>
                ) : (
                  <div className="p-2 bg-amber-50 text-amber-900 border border-amber-200 rounded text-[10.5px] font-sans flex items-start gap-1.5 leading-normal">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      Leaving client credentials blank activates high-fidelity **local simulated models** so you can preview strategic outputs without and external key.
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2 border-t border-charcoal/10 justify-between">
                  {byokApiKey && (
                    <button
                      type="button"
                      onClick={handleClearBYOK}
                      className="text-[9px] font-mono text-notebook-crimson hover:underline font-black uppercase flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Disconnect key</span>
                    </button>
                  )}
                  <div className="flex gap-2 ml-auto">
                    <button
                      type="submit"
                      className={getButtonStyles()}
                    >
                      {isSaved ? '✓ SAVED PROPERTIES' : '✓ PERSIST KEYS'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* SECTION 4: ACTIVE FOUNDER DOSSIER BRIEF */}
          <div>
            <h3 className={getSectionHeaderStyles()}>
              👤 Core Founder Dossier & Profile
            </h3>
            
            <div className="bg-white/70 border border-charcoal/15 p-4 rounded-xl space-y-3 font-sans text-xs">
              <div className="flex justify-between items-center">
                <span className="text-pencil-gray font-mono text-[10px] uppercase font-bold">Authorized Account:</span>
                <span className="font-bold text-charcoal font-sans">{currentUser || 'zhaoceaser@gmail.com'}</span>
              </div>

              {userDossier && (
                <div className="space-y-2 pt-2 border-t border-charcoal/5">
                  <div>
                    <span className="text-pencil-gray font-mono text-[9px] uppercase font-bold block">Archetype Orientation Roles:</span>
                    <span className="text-charcoal font-mono capitalize bg-charcoal/5 px-2 py-0.5 rounded block w-max mt-0.5 text-[11px] font-bold">
                      👤 {userDossier.role?.replace(/_/g, ' ') || 'Strategic Creator'}
                    </span>
                  </div>

                  <div>
                    <span className="text-pencil-gray font-mono text-[9px] uppercase font-bold block">Methodological Philosophy:</span>
                    <p className="text-charcoal font-serif italic text-xs mt-0.5">
                      "{userDossier.philosophy || 'Build minimum viable components that collect pre-interest payments.'}"
                    </p>
                  </div>

                  {userDossier.workEthos && userDossier.workEthos.length > 0 && (
                    <div>
                      <span className="text-pencil-gray font-mono text-[9px] uppercase font-bold block mb-1">Enforced Operational Creeds:</span>
                      <div className="flex flex-wrap gap-1">
                        {userDossier.workEthos.map((eth, idx) => (
                          <span key={idx} className="bg-notebook-yellow/30 text-charcoal text-[9.5px] px-2 py-0.5 rounded border border-notebook-yellow font-medium">
                            ✓ {eth}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-2 border-t border-charcoal/10 flex items-center justify-between gap-3 bg-transparent">
                <button
                  type="button"
                  onClick={onResetOnboarding}
                  className="text-[9.5px] font-mono text-[#7D6B4E] hover:underline flex items-center gap-1 cursor-pointer font-bold uppercase"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Re-enter Founder Onboarding</span>
                </button>

                <button
                  type="button"
                  onClick={onLogout}
                  className="bg-red-50 hover:bg-red-100 border border-red-200 text-rose-800 text-[9.5px] font-mono font-bold px-2.5 py-1 rounded cursor-pointer uppercase"
                >
                  Disconnect Session
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* FOOTER MANIFESTO COMPACT LOG */}
      <div className="border-t border-charcoal/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] font-mono text-pencil-gray select-none">
        <span className="flex items-center gap-1.5 text-[#B83F3F] font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ESTABLISHED TO PROTECT CRITICAL VELOCITY CRITERIA</span>
        </span>
        <span>SYSTEM VER 1.4 // BYOK PRIVACY ENFORCED</span>
      </div>

    </div>
  );
}
