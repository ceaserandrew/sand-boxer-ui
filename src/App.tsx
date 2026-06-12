/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ConceptType, TabType, SandboxCard, Constitution } from './types';
import { CONCEPTS, COLOR_PALETTES, TYPOGRAPHY_SPECS, BRAND_MANIFESTOS, PRELOADED_STARTUPS } from './data';
import Moodboard from './components/Moodboard';
import HomepageMockup from './components/HomepageMockup';
import WorkspaceMockup from './components/WorkspaceMockup';
import ConstitutionMockup from './components/ConstitutionMockup';
import LoginModal from './components/LoginModal';
import FounderSetup from './components/FounderSetup';
import UserOnboarding from './components/UserOnboarding';
import { 
  Sparkles, 
  Notebook, 
  Compass, 
  Settings, 
  Smile, 
  Trophy, 
  ShieldAlert, 
  Bookmark, 
  CheckCircle,
  Clock,
  Heart,
  ChevronRight,
  Plus,
  Lock,
  Unlock
} from 'lucide-react';

export default function App() {
  // Current design concept active (A, B, or C)
  const [activeConcept, setActiveConcept] = useState<ConceptType>('A');
  
  // Current preview tab - Default to showing the landing page ('homepage') as requested!
  const [activeTab, setActiveTab] = useState<TabType>('homepage');

  // Pseudo login and profile onboarding states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  
  // Setups separation: 
  // 1. Initial User Profile Onboarding (just after registration/login)
  const [isUserOnboarding, setIsUserOnboarding] = useState<boolean>(false);
  const [userDossier, setUserDossier] = useState<{
    role: string;
    philosophy: string;
    workEthos: string[];
  } | null>(null);

  // 2. Create Project Setup inside the workspace
  const [isCreatingProject, setIsCreatingProject] = useState<boolean>(false);
  
  // Current workspace startup blueprint active (SandBoxer, Fortress, Scribe)
  const [activeStartupKey, setActiveStartupKey] = useState<string>('sandboxer');

  // Dynamic state for Startup models, customizable in real-time
  const [startupBLUEPRINTS, setStartupBlueprints] = useState(PRELOADED_STARTUPS);

  // Active startup data
  const currentStartup = startupBLUEPRINTS[activeStartupKey];

  // Global timezone timestamp
  const currentTime = "2026-06-11 14:34:00 UTC";

  // Handlers for dynamic card edit inside Workspace view
  const handleUpdateCardContent = (id: string, newContent: string) => {
    const updatedCards = currentStartup.cards.map(c => 
      c.id === id ? { ...c, content: newContent } : c
    );
    setStartupBlueprints({
      ...startupBLUEPRINTS,
      [activeStartupKey]: {
        ...currentStartup,
        cards: updatedCards
      }
    });
  };

  const handleAddCard = (type: SandboxCard['type']) => {
    const freshCard: SandboxCard = {
      id: `custom-c-${Date.now()}`,
      type,
      title: `New ${type.toUpperCase()} Card`,
      content: `State critical parameters of your ${type} strategy block here...`,
      author: 'Sarah (Founder)',
      status: 'Draft'
    };

    setStartupBlueprints({
      ...startupBLUEPRINTS,
      [activeStartupKey]: {
        ...currentStartup,
        cards: [...currentStartup.cards, freshCard]
      }
    });
  };

  const handleDeleteCard = (id: string) => {
    const remainingCards = currentStartup.cards.filter(c => c.id !== id);
    setStartupBlueprints({
      ...startupBLUEPRINTS,
      [activeStartupKey]: {
        ...currentStartup,
        cards: remainingCards
      }
    });
  };

  const handleUpdateConstitution = (updatedConst: Constitution) => {
    setStartupBlueprints({
      ...startupBLUEPRINTS,
      [activeStartupKey]: {
        ...currentStartup,
        constitution: updatedConst
      }
    });
  };

  // Helper variables for theme styling injections
  const conceptName = CONCEPTS.find(c => c.id === activeConcept)?.name || '';
  const currentPalette = COLOR_PALETTES[activeConcept];
  const currentTypography = TYPOGRAPHY_SPECS[activeConcept];
  const currentManifesto = BRAND_MANIFESTOS[activeConcept];

  // Helper theme background selector
  const getPageBg = () => {
    switch (activeConcept) {
      case 'A': return 'bg-[#fff8e7] text-charcoal';
      case 'B': return 'bg-[#fbf7e7] text-charcoal';
      case 'C': return 'bg-[#fafaf3] text-charcoal';
    }
  };

  // Conditional Standalone Landing/Homepage View if not logged in
  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen ${getPageBg()} font-sans selection:bg-notebook-yellow selection:text-charcoal transition-all duration-300 p-3 md:p-8 flex justify-center items-center`}>
        <div className="w-full max-w-7xl mx-auto">
          <HomepageMockup 
            conceptId={activeConcept}
            palette={currentPalette}
            activeStartup={currentStartup}
            onStartBuilding={() => setIsLoginModalOpen(true)}
          />

          <LoginModal 
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onLoginSuccess={(username) => {
              setCurrentUser(username);
              setIsLoggedIn(true);
              setIsUserOnboarding(true); // Open User Profile Dossier onboarding first
              setIsLoginModalOpen(false);
            }}
            conceptId={activeConcept}
          />
        </div>
      </div>
    );
  }

  // If logged in but user profile onboarding is pending, show User Dossier Setup
  if (isUserOnboarding) {
    return (
      <div className={`min-h-screen ${getPageBg()} font-sans selection:bg-notebook-yellow selection:text-charcoal transition-all duration-300 p-3 md:p-8 flex justify-center items-center`}>
        <UserOnboarding
          conceptId={activeConcept}
          defaultUsername={currentUser || 'zhaoceaser'}
          onComplete={(userData) => {
            setCurrentUser(userData.username);
            setUserDossier({
              role: userData.role,
              philosophy: userData.philosophy,
              workEthos: userData.workEthos
            });
            setIsUserOnboarding(false); // Enter main workspace directly!
            setActiveTab('workspace'); // Land directly in the workspace tab
          }}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getPageBg()} font-sans selection:bg-notebook-yellow selection:text-charcoal transition-all duration-300 pb-16`}>
      
      {/* 2. MAIN BRAND HEADER BAR (Shown only in logged in mode) */}
      <nav className="border-b border-charcoal/15 py-4 px-6 md:px-12 bg-charcoal text-[#fff8e7] sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl highlight-yellow border border-charcoal/30 flex items-center justify-center text-charcoal shadow-sm">
              <Notebook className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-display font-black text-xl tracking-tight">SandBoxer</span>
                <span className="text-[10px] uppercase tracking-wider bg-notebook-yellow text-charcoal px-1.5 py-0.5 rounded font-mono font-bold">
                  Design Studio
                </span>
              </div>
              <p className="text-[10px] text-[#e1d6be] font-mono mt-0.5">EST. 2026 // VISUAL SOUL DISCOVERY</p>
            </div>
          </div>

          {/* Active Blueprint Template Selector */}
          <div className="flex items-center gap-2 animate-fade-in">
            <span className="font-mono text-[9px] text-[#e1d6be] uppercase bg-white/10 px-2 py-0.5 rounded">
              Active Workspace
            </span>
            <select 
              value={activeStartupKey}
              onChange={(e) => setActiveStartupKey(e.target.value)}
              className="bg-[#2B2B2B] text-[#fff8e7] font-mono text-xs border border-charcoal/20 rounded px-2.5 py-1 outline-none focus:border-notebook-yellow cursor-pointer"
            >
              {Object.entries(startupBLUEPRINTS).map(([key, item]) => {
                const value = item as { name: string; tag: string };
                const prefix = key === 'sandboxer' ? '📔 ' : key === 'castle_bnb' ? '🏰 ' : key === 'scribe_writer' ? '✏️ ' : '🚀 ';
                return (
                  <option key={key} value={key}>
                    {prefix}{value.name}
                  </option>
                );
              })}
            </select>

            <button
              onClick={() => setIsCreatingProject(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-notebook-yellow hover:bg-yellow-400 text-charcoal rounded font-mono text-[10px] font-black uppercase transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Draft New Project Constitution"
            >
              <Plus className="w-3.5 h-3.5 text-charcoal font-black" />
              <span>Project Draft</span>
            </button>
          </div>

          {/* Environmental parameters & Dynamic Auth State */}
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-[#e1d6be]">
            <span className="hidden lg:flex items-center gap-1"><Clock className="w-3 h-3 text-[#E89C3D]" /> {currentTime}</span>
            <span className="hidden lg:flex items-center gap-1"><Heart className="w-3 h-3 text-red-400" /> Founder: zhaoceaser</span>
            
            <div className="flex items-center gap-2 border-l border-white/20 pl-4">
              <div className="flex items-center gap-2">
                <span className="text-[#a4fcd2] flex items-center gap-1 font-bold">
                  <Unlock className="w-3 h-3 text-[#a4fcd2]" /> {currentUser}
                </span>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setCurrentUser(null);
                    setActiveTab('homepage');
                  }}
                  className="bg-[#2B2B2B] hover:bg-red-950/40 text-[#fff8e7] px-2 py-0.5 rounded border border-charcoal/30 text-[9px] uppercase tracking-wider font-extrabold cursor-pointer transition-colors"
                >
                  Out
                </button>
              </div>
            </div>
          </div>

        </div>
      </nav>

      {/* 1. CONCEPT TRANSFORMER PANEL: Centerpiece of turn 1 */}
      <section className="bg-notebook-yellow/50 border-b border-charcoal/10 py-8 px-6 md:px-12 text-center relative overflow-hidden">
        {/* Subtle decorative graph guidelines background */}
        <div className="absolute inset-0 bg-dot-matrix opacity-15 pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="font-mono text-[11px] text-pencil-gray uppercase tracking-widest font-extrabold block">
            🌌 Visual Soul Selection // Switch Directions Below
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-charcoal">
            Choose a Design Direction to Skin the Sandbox
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-pencil-gray font-sans">
            SandBoxer must reject the dark-mode aesthetic. Click any tactile trigger below to transform the entire workspace in real-clock time to see how the code metaphor changes.
          </p>

          {/* Tactile Switch Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-4">
            
            {/* Concept A Button */}
            <button
              onClick={() => setActiveConcept('A')}
              className={`p-4 text-left border-3 transition-all cursor-pointer relative overflow-hidden ${
                activeConcept === 'A' 
                  ? 'bg-warm-cream border-charcoal shadow-notebook scale-102' 
                  : 'bg-white/60 border-dashed border-charcoal/30 hover:bg-white hover:scale-101'
              }`}
            >
              <Bookmark className="absolute -top-1 right-3 text-notebook-crimson w-5 h-5 opacity-80" />
              <div className="font-mono text-[10px] font-bold text-pencil-gray uppercase">Concept A</div>
              <div className="font-display font-black text-base text-charcoal mt-1">Founder's Notebook</div>
              <p className="text-[11px] text-pencil-gray leading-snug mt-1 font-sans">
                Moleskine textures, hand-ruled yellow pages, sketching safety, charcoal borders.
              </p>
            </button>

            {/* Concept B Button */}
            <button
              onClick={() => setActiveConcept('B')}
              className={`p-4 text-left border-3 transition-all cursor-pointer relative overflow-hidden ${
                activeConcept === 'B' 
                  ? 'bg-white rounded-3xl border-charcoal shadow-sandbox-card scale-102' 
                  : 'bg-white/60 border-dashed border-charcoal/30 hover:bg-white hover:scale-101'
              }`}
            >
              <span className="absolute w-3.5 h-3.5 rounded-full bg-muted-orange top-3 right-3 animate-ping" />
              <div className="font-mono text-[10px] font-bold text-pencil-gray uppercase">Concept B</div>
              <div className="font-display font-black text-base text-charcoal mt-1">Creative Sandbox</div>
              <p className="text-[11px] text-pencil-gray leading-snug mt-1 font-sans">
                Infinite whiteboard grid dot, active live connectors, post-its, kinetic playground feel.
              </p>
            </button>

            {/* Concept C Button */}
            <button
              onClick={() => setActiveConcept('C')}
              className={`p-4 text-left border-2 transition-all cursor-pointer relative overflow-hidden ${
                activeConcept === 'C' 
                  ? 'bg-[#ffffff] border-deep-navy shadow-md scale-102 border-l-8' 
                  : 'bg-white/60 border-dashed border-charcoal/30 hover:bg-white hover:scale-101'
              }`}
            >
              <div className="absolute top-2 right-2 font-mono text-[9px] text-deep-navy font-black">[SPEC_ENG]</div>
              <div className="font-mono text-[10px] font-bold text-pencil-gray uppercase">Concept C</div>
              <div className="font-display font-black text-base text-charcoal mt-1">Product Workshop</div>
              <p className="text-[11px] text-pencil-gray leading-snug mt-1 font-sans">
                Disciplined drafting grid, blueprint measures, structured rules with pencil marks.
              </p>
            </button>

          </div>
        </div>
      </section>

      {/* 3. SHOWCASE VIEWPORTS LAYOUT WITH VINTAGE COVER FRAME */}
      <div className="max-w-7xl mx-auto my-12 px-2 md:px-6 relative">
        <div 
          className={`border-[12px] shadow-inner p-6 md:p-8 rounded-2xl relative overflow-hidden transition-all duration-500 z-10 ${
            activeConcept === 'A' 
              ? 'bg-[#F6E7A8] border-[#F4E1A1]' 
              : activeConcept === 'B' 
                ? 'bg-[#FCF9EE] border-charcoal/20' 
                : 'bg-[#FAFAF3] border-deep-navy/20'
          }`}
          id="moleskine-tactile-outer-frame"
        >
          {/* Massive Bold Watermark backdrop */}
          <div className="absolute top-16 left-6 md:left-12 opacity-[0.04] md:opacity-[0.06] pointer-events-none select-none z-0">
            <h1 className="text-[120px] md:text-[250px] leading-none font-black tracking-tighter uppercase font-display text-charcoal">
              {activeConcept === 'A' ? 'SOUL' : activeConcept === 'B' ? 'SANDBOX' : 'WORKSHOP'}
            </h1>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
              
              {/* LEFT COLUMN: Main Showcase Area (9 cols) */}
              <div className="lg:col-span-9 space-y-6">
            
                {/* Main Visual Tabs Selector */}
                <div className="flex border-b-2 border-charcoal/15 overflow-x-auto gap-2">
                  {[
                    { id: 'homepage', label: '🏠 Homepage Concept', icon: Compass },
                    { id: 'overview', label: '🎨 Design Moodboard', icon: Trophy },
                    { id: 'workspace', label: '🛠️ Interactive Workspace', icon: Settings },
                    { id: 'constitution', label: '📜 Product Constitution', icon: Bookmark },
                    { id: 'matrix', label: '📊 Comparative Decision Matrix', icon: ShieldAlert }
                  ].map((tab) => {
                    const IconComp = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabType)}
                        className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-bold tracking-tight uppercase border-t-4 transition-all shrink-0 cursor-pointer ${
                          isActive 
                            ? 'border-notebook-crimson bg-charcoal/5 text-charcoal' 
                            : 'border-transparent text-pencil-gray hover:text-charcoal hover:border-charcoal/20'
                        }`}
                        style={{
                          borderTopColor: isActive ? (activeConcept === 'C' ? '#23395B' : activeConcept === 'B' ? '#E89C3D' : '#B83F3F') : 'transparent'
                        }}
                      >
                        <IconComp className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* DYNAMIC RENDERING OF SELECTED SHARPNESS */}
                <div className="bg-transparent">
                  {activeTab === 'overview' && (
                    <Moodboard 
                      conceptId={activeConcept}
                      palette={currentPalette}
                      typography={currentTypography}
                      manifesto={currentManifesto}
                      activeConceptName={conceptName}
                    />
                  )}

                  {activeTab === 'homepage' && (
                    <HomepageMockup 
                      conceptId={activeConcept}
                      palette={currentPalette}
                      activeStartup={currentStartup}
                      onStartBuilding={() => setActiveTab('workspace')}
                    />
                  )}

                  {activeTab === 'workspace' && (
                    <WorkspaceMockup 
                      conceptId={activeConcept}
                      cards={currentStartup.cards}
                      onUpdateCard={handleUpdateCardContent}
                      onAddCard={handleAddCard}
                      onDeleteCard={handleDeleteCard}
                      activeStartupName={currentStartup.name}
                    />
                  )}

                  {activeTab === 'constitution' && (
                    <ConstitutionMockup 
                      conceptId={activeConcept}
                      constitution={currentStartup.constitution}
                      onUpdateConstitution={handleUpdateConstitution}
                    />
                  )}

                  {activeTab === 'matrix' && (
                    <div 
                      className={`p-6 relative ${
                        activeConcept === 'A' 
                          ? 'bg-warm-cream border-sketch shadow-notebook' 
                          : activeConcept === 'B' 
                            ? 'bg-white rounded-3xl border-2 border-charcoal shadow-sandbox-card' 
                            : 'bg-white border text-charcoal border-technical-steel/20 rounded shadow-md'
                      }`}
                      id="design-matrix-table-card"
                    >
                      <div className="mb-6">
                        <h3 className="text-xl font-display font-extrabold text-charcoal flex items-center gap-2">
                          ⚖️ Founding Design Rubric Matrix
                        </h3>
                        <p className="text-xs text-pencil-gray mt-1 font-sans">
                          A multi-dimensional comparison across parameters that represent critical startup velocity indices.
                        </p>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs md:text-sm">
                          <thead>
                            <tr className="border-b-2 border-charcoal/15 bg-charcoal/5 font-mono text-[10px] uppercase tracking-wider text-charcoal">
                              <th className="p-3">Design Parameter</th>
                              <th className="p-3 bg-[#FCF6DF]/40">Concept A: Founder's Notebook</th>
                              <th className="p-3 bg-indigo-50/40">Concept B: Creative Sandbox</th>
                              <th className="p-3 bg-red-50/20">Concept C: Product Workshop</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-charcoal/15">
                            <tr>
                              <td className="p-3 font-bold font-display uppercase text-charcoal">Visual Memorability</td>
                              <td className="p-3 bg-[#FCF6DF]/20">
                                <span className="text-emerald-700 font-bold">10/10 (Elite)</span> - Ruled margins and notebook binding stick instantly in memory. Perfect for visual branding.
                              </td>
                              <td className="p-3">
                                <span className="text-emerald-700 font-bold">8/10</span> - Memorable post-it arrays look highly playful, but resemble Miro.
                              </td>
                              <td className="p-3">
                                <span className="text-emerald-700 font-bold">7.5/10</span> - Geometric specs look clean, but risks looking slightly corporate.
                              </td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold font-display uppercase text-charcoal">Information Density</td>
                              <td className="p-3 bg-[#FCF6DF]/20">
                                <span className="text-amber-700 font-bold">6/10 (Challenged)</span> - Handwriting style and spacing constraints make dense tables harder to build.
                              </td>
                              <td className="p-3">
                                <span className="text-emerald-700 font-bold">8.5/10</span> - Spatial zoom and canvas scaling allow large maps of complex logic.
                              </td>
                              <td className="p-3">
                                <span className="text-emerald-700 font-bold">9.5/10 (Master)</span> - Technical grids handle compact financial records flawlessly.
                              </td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold font-display uppercase text-charcoal">Mental Safe Environment</td>
                              <td className="p-3 bg-[#FCF6DF]/20">
                                <span className="text-emerald-700 font-bold">9.5/10 (Cozy)</span> - Sketch layers encourage early draft planning without developer pressure.
                              </td>
                              <td className="p-3">
                                <span className="text-emerald-700 font-bold">9.0/10</span> - Post-it notes have low psychological stakes; fast and messy ideation.
                              </td>
                              <td className="p-3">
                                <span className="text-amber-700 font-bold">6.5/10</span> - Rigid lines might compel founders to want high-fidelity plans immediately.
                              </td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold font-display uppercase text-charcoal">Target user match</td>
                              <td className="p-3 bg-[#FCF6DF]/20">
                                <span className="text-emerald-700 font-bold">Indie Hackers & Storytellers</span> - Appeals deeply to romantic vision thinkers.
                              </td>
                              <td className="p-3">
                                <span className="text-emerald-700 font-bold">Serial SaaS Builders</span> - Appeals to modern Product Managers and visual thinkers.
                              </td>
                              <td className="p-3">
                                <span className="text-emerald-700 font-bold">Enterprise Strategists</span> - Appeals to engineers and strict logic operations.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* RIGHT COLUMN: Founding Team Annotation Commentary (3 cols) */}
              <div className="lg:col-span-3 space-y-6">
                
                {/* Active Design Rationale Commentary Sidebar */}
                <div 
                  className={`p-6 relative text-charcoal ${
                    activeConcept === 'A' 
                      ? 'bg-warm-cream border-sketch shadow-notebook' 
                      : activeConcept === 'B' 
                        ? 'bg-white rounded-3xl border-2 border-charcoal shadow-sandbox-card' 
                        : 'bg-white border-2 border-deep-navy shadow-md rounded-md'
                  }`}
                  id="team-feedback-sidebar"
                >
                  <div className="flex items-center gap-1.5 mb-4 border-b border-charcoal/10 pb-2">
                    <span className="w-2 h-2 rounded-full bg-notebook-crimson animate-ping" />
                    <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-charcoal">
                      Team Review Session
                    </h4>
                  </div>

                  {/* Simulated comments tailored to current Concept */}
                  <div className="space-y-4">
                    
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-[9px] text-pencil-gray">
                        <span>@Sarah (Product Designer)</span>
                        <span>14 mins ago</span>
                      </div>
                      <p className="font-hand text-lg text-notebook-crimson font-medium leading-snug">
                        {activeConcept === 'A' 
                          ? "❤️ 'The notebook layout completely changes my mental status. I write my real anxieties here rather than feature checklists. This proves why A stands out.'"
                          : activeConcept === 'B'
                            ? "⚡ 'I like the cursor lines in Concept B! It is incredibly collaborative. Makes brainstorming feel like play rather than work.'"
                            : "⚖️ 'Concept C looks incredibly professional. It signals strategic authority. No developer would dare code garbage features under this specification.'"}
                      </p>
                    </div>

                    <div className="space-y-1 pt-3 border-t border-dashed border-charcoal/10">
                      <div className="flex justify-between font-mono text-[9px] text-pencil-gray">
                        <span>@Liam (Lead Engineer)</span>
                        <span>1 hr ago</span>
                      </div>
                      <p className="font-sans text-xs text-pencil-gray leading-relaxed font-mono">
                        {activeConcept === 'A' 
                          ? "🛠️ 'From an engineering view, we'll need to write SVG sketches carefully to load instantly. It is hard but the brand memorability makes it 100% worth the effort.'"
                          : activeConcept === 'B'
                            ? "📡 'Concept B can be easily integrated using basic canvas nodes. Highly modular. Let's make sure it doesn't look too similar to general whiteboards.'"
                            : "📐 'Concept C is simple to code using standard grids, but we must make sure the red correction guidelines feel organic and not robotic.'"}
                      </p>
                    </div>

                  </div>

                  {/* Add Founding Team Review Note Form */}
                  <div className="border-t border-dashed border-charcoal/15 mt-5 pt-4">
                    <span className="font-mono text-[10px] uppercase text-charcoal block mb-2 font-bold">Leave a Founder Feedback Note:</span>
                    <div className="p-3 bg-yellow-100/50 border border-yellow-200 rounded-lg">
                      <p className="font-hand text-base text-charcoal leading-snug">
                        "Let's select **Notebook Yellow (#F6E7A8)** as our universal background brand signature. Whichever concept we choose, this color is non-negotiable."
                      </p>
                    </div>
                  </div>

                </div>

                {/* Core SandBoxer Manifesto highlights card */}
                <div className="p-5 border-sketch-sm rounded-xl bg-charcoal text-[#fff8e7] space-y-3 shadow-notebook relative overflow-hidden">
                  <h5 className="font-display font-extrabold text-xs uppercase tracking-widest text-notebook-yellow">
                    THE MANIFESTO LAWS
                  </h5>
                  <p className="text-xs text-[#e1d6be] italic leading-relaxed">
                    "Most products fail before a single line of code is written. Not because the market is hard, but because the original idea gets lost in a maze of unstrategic features."
                  </p>
                  <div className="flex items-center justify-between font-mono text-[9px] text-[#e1d6be] pt-2 border-t border-white/5">
                    <span>Section: Vision Core</span>
                    <span className="text-notebook-yellow">PAGE_1</span>
                  </div>
                </div>

              </div>

            </div>

        </div>
      </div>

      {isCreatingProject && (
        <FounderSetup
          conceptId={activeConcept}
          onComplete={(setupData) => {
            const newProjectKey = `project_${Date.now()}`;
            const newBlueprint = {
              name: setupData.idea ? (setupData.idea.length > 14 ? `${setupData.idea.slice(0, 11)}...` : setupData.idea) : "My Project",
              tag: `${setupData.thinkingMode}`,
              constitution: setupData.constitution,
              cards: [
                { 
                  id: `c-1-${Date.now()}`, 
                  type: 'vision' as const, 
                  title: '💡 Raw Idea', 
                  content: setupData.idea,
                  author: currentUser || 'Founder',
                  status: 'Approved' as const
                },
                { 
                  id: `c-2-${Date.now()}`, 
                  type: 'vision' as const, 
                  title: '🎯 Blueprint Vision', 
                  content: setupData.constitution.vision,
                  author: currentUser || 'Founder',
                  status: 'Approved' as const
                },
                { 
                  id: `c-3-${Date.now()}`, 
                  type: 'user' as const, 
                  title: '👤 Target Tribe Persona', 
                  content: `A cohesive segment of the market seeking quick proof of value. Archetype alignment: ${setupData.archetype}.`,
                  author: currentUser || 'Founder',
                  status: 'Approved' as const
                },
                { 
                  id: `c-4-${Date.now()}`, 
                  type: 'problem' as const, 
                  title: '🔥 Core Validated Problem', 
                  content: `No existing solution has a lightweight framework to handle this. Our target success criterion: "${setupData.successDefinition}".`,
                  author: currentUser || 'Founder',
                  status: 'Approved' as const
                },
              ]
            };

            setStartupBlueprints({
              ...startupBLUEPRINTS,
              [newProjectKey]: newBlueprint
            });
            setActiveStartupKey(newProjectKey);
            setIsCreatingProject(false);
            setActiveTab('workspace');
          }}
          onExit={() => setIsCreatingProject(false)}
        />
      )}
    </div>
  );
}
