import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Check, HelpCircle, PenTool, Lightbulb, Zap, Radio, ShieldCheck, Heart } from 'lucide-react';

interface FounderSetupProps {
  conceptId: 'A' | 'B' | 'C';
  onComplete: (data: { role: string; idea: string; thinkingStyle: string }) => void;
  onExit: () => void;
}

export default function FounderSetup({ conceptId, onComplete, onExit }: FounderSetupProps) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [ideaText, setIdeaText] = useState('');
  const [selectedThinkingStyle, setSelectedThinkingStyle] = useState('');

  // Sticky Note definitions (colors and styles)
  const stickyNotes = [
    { label: 'Content Creator', emoji: '🎥', bg: 'bg-[#FFE8E8]', border: 'border-red-300/60', text: 'text-rose-950', rotation: '-rotate-2' },
    { label: 'Indie Hacker', emoji: '🛠', bg: 'bg-[#E3F2FD]', border: 'border-blue-300/60', text: 'text-blue-950', rotation: 'rotate-1' },
    { label: 'Startup Founder', emoji: '🚀', bg: 'bg-[#FFF9C4]', border: 'border-yellow-400/60', text: 'text-amber-950', rotation: '-rotate-1' },
    { label: 'Student Builder', emoji: '🎓', bg: 'bg-[#FFF0E0]', border: 'border-orange-300/60', text: 'text-orange-950', rotation: 'rotate-2' },
    { label: 'Designer', emoji: '🎨', bg: 'bg-[#F3E5F5]', border: 'border-purple-300/60', text: 'text-purple-950', rotation: '-rotate-2' },
    { label: 'Other', emoji: '📦', bg: 'bg-[#E8F5E9]', border: 'border-green-300/60', text: 'text-green-950', rotation: 'rotate-1' },
  ];

  const presets = [
    '帮助创作者卖数字产品',
    'AI个人助理',
    '学生实习平台'
  ];

  const thinkingStyles = [
    {
      id: 'fast',
      title: '⚡ Fast Blueprint',
      description: '5分钟得到执行方案',
      benefit: '适合快速测试核心概念',
      bg: 'bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/20',
      accentText: 'text-amber-600',
    },
    {
      id: 'vision',
      title: '🎯 Vision Workshop',
      description: '深入推导产品愿景',
      benefit: '适合长期和方向性探索',
      bg: 'bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20',
      accentText: 'text-emerald-700',
    },
    {
      id: 'antidrift',
      title: '🥊 Anti-Drift Mode',
      description: '严格限制功能膨胀',
      benefit: '适合对抗拖延与防范范围蔓延',
      bg: 'bg-rose-500/5 hover:bg-rose-500/10 border-rose-500/20',
      accentText: 'text-rose-600',
    }
  ];

  // Advancing to step 2 automatically after clicking a role
  const handleSelectRole = (role: string) => {
    setSelectedRole(role);
    setTimeout(() => {
      setStep(2);
    }, 400); // Small fluid delay to let user see selection
  };

  const handleNextStep2 = () => {
    if (!ideaText.trim()) {
      // Default placeholder if left empty
      setIdeaText('帮助创作者卖数字产品');
    }
    setStep(3);
  };

  const handleSelectStyle = (styleId: string) => {
    setSelectedThinkingStyle(styleId);
    
    // Complete configuration data immediately and trigger the callback
    const finalIdea = ideaText.trim() || '帮助创作者卖数字产品';
    setTimeout(() => {
      onComplete({
        role: selectedRole || 'Startup Founder',
        idea: finalIdea,
        thinkingStyle: styleId
      });
    }, 500);
  };

  // Tactile color schemes depending on the current concept style setting
  const getContainerStyles = () => {
    switch (conceptId) {
      case 'A':
        return 'bg-ruled-paper border-sketch shadow-notebook max-w-2xl w-full p-8 text-charcoal';
      case 'B':
        return 'bg-[#FFFDF6] rounded-3xl border-3 border-charcoal shadow-sandbox-card max-w-2xl w-full p-8 text-charcoal';
      default:
        return 'bg-white border-2 border-deep-navy shadow-md rounded max-w-2xl w-full p-8 text-charcoal border-l-8 border-l-deep-navy font-sans';
    }
  };

  return (
    <div className="fixed inset-0 bg-charcoal/65 backdrop-blur-md z-[250] flex justify-center items-center p-4 overflow-y-auto">
      <div className={`${getContainerStyles()} relative space-y-8 animate-fade-in`}>
        
        {/* Binder rings simulation ornamental border */}
        {conceptId === 'A' && (
          <div className="absolute top-0 bottom-0 left-2.5 w-1 flex flex-col justify-around pointer-events-none opacity-20 z-10 select-none">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full bg-charcoal" />
            ))}
          </div>
        )}

        {/* Setup Navigation Header */}
        <div className="flex justify-between items-center border-b border-charcoal/15 pb-4">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-pencil-gray leading-none font-bold uppercase tracking-wider">
            <span className="text-notebook-crimson font-extrabold bg-red-100 px-1.5 py-0.5 rounded mr-1">FOUNDER SETUP</span>
            <span>Step {step} of 3</span>
          </div>
          
          {/* Simple step indicators */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  step === num 
                    ? 'bg-notebook-crimson scale-110' 
                    : step > num ? 'bg-emerald-600' : 'bg-charcoal/15'
                }`} 
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Who are you? (Tactile Sticky Notes) */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-serif font-black text-charcoal tracking-tight">
                Who are you?
              </h2>
              <p className="text-xs text-pencil-gray font-sans max-w-md mx-auto">
                Select your primary perspective to feed your strategic gravity. Completed in under 5 seconds.
              </p>
            </div>

            {/* Post-it Notes Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
              {stickyNotes.map((note) => {
                const isSelected = selectedRole === note.label;
                return (
                  <motion.button
                    key={note.label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectRole(note.label)}
                    className={`p-5 text-center cursor-pointer rounded-lg border shadow-sm relative ${note.bg} ${note.border} ${note.rotation} transition-all duration-150 flex flex-col justify-between items-center aspect-square ${
                      isSelected ? 'ring-3 ring-notebook-crimson ring-offset-2 scale-102 font-black shadow-md' : ''
                    }`}
                  >
                    {/* Simulated push pin */}
                    <div className="absolute -top-2 left-[50%] -translate-x-[50%] w-3 h-3 bg-red-600 rounded-full shadow-inner opacity-80" />
                    
                    <span className="text-3xl block filter drop-shadow-sm mt-2">{note.emoji}</span>
                    <span className={`text-[13px] font-bold tracking-tight block ${note.text} font-sans`}>
                      {note.label}
                    </span>
                    
                    {isSelected ? (
                      <div className="w-5 h-5 bg-notebook-crimson rounded-full flex items-center justify-center text-white absolute bottom-2 right-2 shadow-sm animate-fade-in">
                        <Check className="w-3 h-3" />
                      </div>
                    ) : (
                      <span className="text-[9px] text-pencil-gray/50 block font-mono">click to select</span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: What are you trying to build? */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-serif font-black text-charcoal tracking-tight">
                What are you trying to build?
              </h2>
              <p className="text-xs text-pencil-gray font-sans max-w-md mx-auto">
                Bring your dream to life. Use simple phrases to specify the core focus and launch your initial draft.
              </p>
            </div>

            <div className="space-y-5 max-w-lg mx-auto">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-charcoal font-bold tracking-widest block font-sans">
                  What impossible thing are you thinking about?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 帮助创作者卖数字产品"
                    value={ideaText}
                    onChange={(e) => setIdeaText(e.target.value)}
                    className="w-full bg-[#FFFBF2] border-2 border-charcoal/30 px-5 py-4 focus:border-notebook-crimson focus:ring-0 rounded-2xl text-base outline-none font-sans text-charcoal shadow-inner"
                    autoFocus
                  />
                  <Lightbulb className="absolute right-4 top-4 w-5 h-5 text-amber-500" />
                </div>
              </div>

              {/* Quick Helper click triggers */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-pencil-gray font-bold tracking-wide block">
                  💡 Tap to Quick Fill:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {presets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setIdeaText(preset)}
                      className="text-xs bg-charcoal/5 hover:bg-notebook-yellow/30 text-charcoal font-sans px-3 py-2 rounded-xl border border-charcoal/10 transition-all font-medium cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Button */}
              <div className="pt-6">
                <button
                  onClick={handleNextStep2}
                  disabled={!ideaText.trim()}
                  className="w-full py-4 text-xs font-bold text-white bg-charcoal hover:bg-neutral-800 rounded-xl flex items-center justify-center gap-2 tracking-widest uppercase transition-all shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Choose Thinking Style →</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Choose Your Thinking Style */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-serif font-black text-charcoal tracking-tight">
                Choose Your Thinking Style
              </h2>
              <p className="text-xs text-pencil-gray font-sans max-w-md mx-auto">
                This configures the strategic constraints and system guidelines to align your workspace.
              </p>
            </div>

            {/* Thinking styles options list with dividing rules */}
            <div className="space-y-4 max-w-lg mx-auto">
              {thinkingStyles.map((style) => {
                const isSelected = selectedThinkingStyle === style.id;
                return (
                  <motion.button
                    key={style.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleSelectStyle(style.id)}
                    className={`w-full p-5 text-left border rounded-2xl flex items-start gap-4 transition-all cursor-pointer relative overflow-hidden ${style.bg} ${
                      isSelected 
                        ? 'ring-3 ring-notebook-crimson border-notebook-crimson shadow-md' 
                        : 'border-charcoal/15'
                    }`}
                  >
                    <div className={`p-2 bg-white border border-charcoal/10 rounded-xl shrink-0 ${style.accentText}`}>
                      {style.id === 'fast' && <Zap className="w-5 h-5" />}
                      {style.id === 'vision' && <Radio className="w-5 h-5 animate-pulse" />}
                      {style.id === 'antidrift' && <ShieldCheck className="w-5 h-5" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-black text-sm uppercase text-charcoal tracking-wide">
                          {style.title}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] bg-notebook-crimson text-white px-2 py-0.5 rounded font-mono font-bold uppercase animate-bounce mt-0.5">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-serif font-black text-notebook-crimson">
                        {style.description}
                      </p>
                      <p className="text-[11px] text-pencil-gray font-sans pt-1">
                        {style.benefit}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="absolute right-4 top-4 text-[#A33434]">
                        <Check className="w-5 h-5 font-bold" />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer info line stating absolute commitment to privacy */}
        <div className="text-center font-mono text-[9px] text-[#A33434]/70 select-none uppercase border-t border-charcoal/5 pt-4">
          ⛔ WE DO NOT ASK FOR COMPANY NAME, TEAM SIZE, INDUSTRY, OR PHONE. ONLY CORE INTENT.
        </div>

      </div>
    </div>
  );
}
