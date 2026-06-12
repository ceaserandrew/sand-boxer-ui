import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Lightbulb, 
  Zap, 
  Radio, 
  ShieldCheck, 
  Eye, 
  Compass, 
  Target, 
  Clock, 
  Edit3, 
  MousePointerClick,
  FileCheck2,
  Lock,
  ChevronLeft
} from 'lucide-react';

interface FounderSetupProps {
  conceptId: 'A' | 'B' | 'C';
  onComplete: (data: { 
    idea: string; 
    archetype: string; 
    thinkingMode: string; 
    successDefinition: string;
    constitution: {
      vision: string;
      corePrinciples: string[];
      successMetrics: string[];
      constraints: string[];
      forbiddenFeatures: string[];
    }
  }) => void;
  onExit: () => void;
}

export default function FounderSetup({ conceptId, onComplete, onExit }: FounderSetupProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 'generation'>(1);
  const [ideaText, setIdeaText] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState('');
  const [selectedThinkingMode, setSelectedThinkingMode] = useState('');
  const [selectedSuccess, setSelectedSuccess] = useState('');
  const [customSuccess, setCustomSuccess] = useState('');
  
  // Hand-drawn sketch doodles representation
  const archetypes = [
    {
      id: 'startup',
      title: '🚀 Startup',
      tagline: 'Venture Vehicle',
      description: 'A scalable future enterprise seeking market validation and high-impact momentum.',
      rotation: 'rotate-1',
      bg: 'bg-[#FFF9E6]',
      border: 'border-yellow-600/30 text-amber-950'
    },
    {
      id: 'creator',
      title: '🎥 Creator Business',
      tagline: 'Direct-to-Audience',
      description: 'Monetizing personal creativity, community buy-in, and premium digital products directly.',
      rotation: '-rotate-1',
      bg: 'bg-[#FFEBF0]',
      border: 'border-rose-600/30 text-rose-950'
    },
    {
      id: 'saas',
      title: '🛠 SaaS Product',
      tagline: 'Utility Engine',
      description: 'A pure software utility engineered to resolve a single recurring high-frequency pain point.',
      rotation: 'rotate-2',
      bg: 'bg-[#EBF7FF]',
      border: 'border-blue-600/30 text-blue-950'
    },
    {
      id: 'community',
      title: '📚 Community Group',
      tagline: 'Grafted Tribe',
      description: 'Fostering peer connections, curated events, and alignment around a shared cultural interest.',
      rotation: '-rotate-2',
      bg: 'bg-[#EBFFF3]',
      border: 'border-emerald-600/30 text-emerald-950'
    },
    {
      id: 'experiment',
      title: '🎮 Experiment',
      tagline: 'Wild Hypothesis',
      description: 'A quick disposable code probe trying to verify a single crazy hypothesis under 48 hours.',
      rotation: 'rotate-1',
      bg: 'bg-[#F2EBFF]',
      border: 'border-purple-600/30 text-purple-950'
    },
    {
      id: 'something_new',
      title: '✨ Something New',
      tagline: 'The Unclassified',
      description: 'An unclassified product, movement, physical good or physical asset defying standard categories.',
      rotation: '-rotate-1',
      bg: 'bg-[#FFFDE6]',
      border: 'border-amber-600/30 text-amber-950'
    }
  ];

  // Thinking modes mapped accurately 
  const thinkingModes = [
    {
      id: 'explorer',
      title: '🌱 Explorer Persona',
      tagline: 'Discover possibilities',
      description: 'Encourages divergent play, uncovers adjacent use-cases, and acts as a supportive ideation companion.',
      accent: 'text-emerald-700 bg-emerald-50 border-emerald-300',
    },
    {
      id: 'founder',
      title: '🎯 Founder Mind',
      tagline: 'Pragmatic & commercial',
      description: 'Focuses strictly on user willingness to pay, unit economics, market launch, and core loops.',
      accent: 'text-amber-700 bg-amber-50 border-amber-300',
    },
    {
      id: 'challenger',
      title: '🥊 Challenger Mode',
      tagline: 'Devil\'s advocate challenge',
      description: 'Highlights silent product risks, hidden technical debt, distribution bottlenecks, and customer doubts.',
      accent: 'text-rose-700 bg-rose-50 border-rose-300',
    },
    {
      id: 'antidrift',
      title: '🧭 Anti-Drift Guardian',
      tagline: 'Rigid scope controller',
      description: 'Aggressively cuts unneeded features, holds scope to absolute minimum, and stops feature accumulation.',
      accent: 'text-purple-700 bg-purple-50 border-purple-300',
    }
  ];

  // Success options presets
  const successPresets = [
    'Launch fully functional MVP',
    'Achieve my first paid sale',
    'Get my first 100 passionate users',
    'Validate true user demand index',
    'Assemble active audience of 500 email leads',
  ];

  // Interactive placeholders acting like handwritten suggestions
  const paperPlaceholders = [
    '帮助独立音乐人一键出售独家音效底噪',
    '做一个极简纯文本 AI 每日邮件复盘助理',
    '专为学生提供7天急速入司机会的实习平台',
    '一键将 Figma 标注转换成纯手绘风插图'
  ];

  const handleArchetypeSelect = (id: string) => {
    setSelectedArchetype(id);
    setTimeout(() => {
      setStep(3);
    }, 350);
  };

  const handleThinkingModeSelect = (id: string) => {
    setSelectedThinkingMode(id);
    setTimeout(() => {
      setStep(4);
    }, 350);
  };

  const handleSuccessSelect = (preset: string) => {
    setSelectedSuccess(preset);
  };

  const currentSuccessValue = selectedSuccess === 'custom' ? customSuccess : selectedSuccess;

  // Run dynamic calculation to build a personalized Product Constitution
  const generateConstitutionAndComplete = () => {
    const finalIdea = ideaText.trim() || '帮助独立音乐人一键出售独家音效底噪';
    const finalArchetype = archetypes.find(a => a.id === selectedArchetype)?.title || '🚀 Startup';
    const finalMode = thinkingModes.find(t => t.id === selectedThinkingMode)?.title || '🎯 Founder Mind';
    const finalSuccess = currentSuccessValue.trim() || '验证核心痛点的真实付费需求';

    // Formulate bespoke constraints and principles based on setup answers
    let customVision = `让${finalArchetype}创作者能在7天之内实现【${finalIdea.slice(0, 24)}】的安全落地并完成 "${finalSuccess}"！`;
    
    let corePrinciples = [
      `第一生产力: 特性必须为 【${finalArchetype}】 用户交付关于【${finalIdea.slice(0, 15)}】的最高价值。`,
      "克制即是品质: 坚定拒绝编写二级角色权限或繁重登录注册系统。",
      `思想风格对齐: 遵循 [${finalMode}] 提供的行为监督。`
    ];

    let constraints = [
      "不可搭载大型 UI 基础库，采用纯原生极简排版交付。",
      `开发和维护周期必须限制在 30 小时极限工作时长以内。`,
    ];

    let forbiddenFeatures = [
      "强烈禁止: 复杂的二次注册认证机制，邀请团队，以及多子层管理。 ",
      "强烈禁止: 智能 AI 对话机器、智能聊天客服、社区讨论动态广场等耗能板块。"
    ];

    if (selectedThinkingMode === 'antidrift') {
      constraints.push("严厉反思：在没有达成 10 个首批验证意向之前，严禁编写任何带有自动化工作流后台的代码！");
      forbiddenFeatures.push("严禁开发：用户自定义通知设置、全平台深色主题自动切换、三方社交大礼包分享。");
    } else if (selectedThinkingMode === 'challenger') {
      constraints.push("反向质询：首个交付版本中必须包含一处强制向用户索要真实反馈/拒绝因由的反馈浮窗。");
    }

    const compiledConstitution = {
      vision: customVision,
      corePrinciples,
      successMetrics: [finalSuccess, "首周跳出率控制在 40% 以下", "在开发期间记录下 5 次本能的 scope 膨胀阻断过程"],
      constraints,
      forbiddenFeatures
    };

    setStep('generation');

    // Deliver a magical wow animation delay to simulate calculation, rearraging cards, and print
    setTimeout(() => {
      onComplete({
        idea: finalIdea,
        archetype: finalArchetype,
        thinkingMode: finalMode,
        successDefinition: finalSuccess,
        constitution: compiledConstitution
      });
    }, 2800);
  };

  return (
    <div className="fixed inset-0 bg-[#342D24]/75 backdrop-blur-md z-[300] flex justify-center items-center p-3 md:p-6 overflow-y-auto font-sans">
      
      {/* Outer folder background mockup */}
      <div className="relative max-w-3xl w-full min-h-[580px] bg-[#fcf8eb] border-4 border-charcoal rounded-[2rem] shadow-2xl p-4 md:p-8 overflow-hidden transition-all duration-300">
        
        {/* Binder spirals on top edge to render the absolute founder notebook feel */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-charcoal/10 flex justify-around px-8 items-center pointer-events-none select-none">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-4 h-6 bg-charcoal rounded-b-md shadow-md border-t-2 border-white/20 transform -translate-y-2" />
          ))}
        </div>

        {/* Paper Ruled lines simulation inside */}
        <div className="absolute inset-0 bg-ruled-paper opacity-[0.06] pointer-events-none select-none" />

        {/* Red side ledger line */}
        <div className="absolute top-0 bottom-0 left-6 md:left-12 w-[1.5px] bg-red-400/40 pointer-events-none select-none" />

        {/* Setup Navigation Bar */}
        {step !== 'generation' && (
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-charcoal/15 pb-4 mb-6 mt-4 pl-6 md:pl-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] bg-notebook-crimson text-white px-2 py-0.5 rounded uppercase font-bold tracking-widest">
                  SANDBOXER
                </span>
                <span className="font-hand text-charcoal text-xs font-black rotate-1 font-semibold">
                  *first_page_of_startup
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-serif font-black text-charcoal tracking-tight mt-1">
                Draft My Future Creation
              </h1>
            </div>

            <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end">
              {/* Back navigation step control */}
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((step - 1) as any)}
                  className="flex items-center gap-1 font-mono text-[10px] text-pencil-gray hover:text-charcoal font-bold uppercase cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>
              )}
              
              {/* Progress step markers */}
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-pencil-gray font-bold">
                <span className="text-notebook-crimson font-black bg-notebook-crimson/10 px-2 py-1 rounded">
                  STEP {step} OF 4
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 pl-6 md:pl-10 py-2">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Idea prompt with large handwritten input */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-3xl font-serif font-black text-charcoal tracking-tight leading-tight">
                    What are you trying to create?
                  </h2>
                  <p className="text-xs text-pencil-gray max-w-lg font-sans">
                    Define your core idea in your own terms. Do not refine it yet. Let it remain raw, beautiful, and full of initial energy.
                  </p>
                </div>

                {/* Big tactile yellow notebook card for the idea input */}
                <div className="bg-[#FFFCEF] border-3 border-charcoal/70 p-5 md:p-6 rounded-3xl shadow-sandbox-card relative transform -rotate-1 mt-4">
                  {/* Push Pin */}
                  <div className="absolute -top-3 left-[50%] -translate-x-[50%] w-4 h-4 bg-red-600 rounded-full shadow-inner border border-red-700 select-none pointer-events-none" />
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono text-notebook-crimson uppercase font-bold tracking-widest block select-none">
                      ✍ FOUNDER IDEATION PAD:
                    </label>
                    
                    <textarea
                      placeholder="e.g. 我要做一个极简纯文本 AI 每日邮件复盘助理，免去复杂的看板配置..."
                      value={ideaText}
                      onChange={(e) => setIdeaText(e.target.value)}
                      className="w-full bg-transparent border-none placeholder-charcoal/30 resize-none h-28 md:h-36 outline-none text-base md:text-lg font-hand font-bold leading-relaxed text-charcoal"
                      autoFocus
                    />
                    
                    <div className="flex justify-between items-center text-[10px] font-mono text-pencil-gray border-t border-charcoal/10 pt-2 selection:bg-none">
                      <span>*write like writing on real paper</span>
                      <span className="font-bold">{ideaText.length} characters</span>
                    </div>
                  </div>
                </div>

                {/* Simulated hand penciled notes presets */}
                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#A33434] uppercase font-black">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    <span>💡 Tap any placeholder preset to ink instantly:</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {paperPlaceholders.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setIdeaText(preset)}
                        className="text-left font-hand text-xs md:text-sm bg-notebook-yellow/15 hover:bg-notebook-yellow/50 text-charcoal border border-charcoal/15 hover:border-charcoal/40 p-3 rounded-2xl transition-all duration-150 cursor-pointer shadow-sm flex items-start gap-2 active:scale-98"
                      >
                        <span className="text-notebook-crimson mt-0.5 select-none font-bold">✓</span>
                        <span className="font-bold line-clamp-2">{preset}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Next CTA Step */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!ideaText.trim()}
                    className="px-8 py-3.5 bg-charcoal hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed select-none"
                  >
                    <span>Define Archetype</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Project Archetype Selector */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-3xl font-serif font-black text-charcoal tracking-tight leading-tight">
                    What kind of thing are you creating?
                  </h2>
                  <p className="text-xs text-pencil-gray max-w-lg font-sans">
                    This sets your core business model boundaries and aligns custom product blueprints. Select the most accurate blueprint chassis.
                  </p>
                </div>

                {/* Handdrawn Cards list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                  {archetypes.map((archetype) => {
                    const isSelected = selectedArchetype === archetype.id;
                    return (
                      <div
                        key={archetype.id}
                        onClick={() => handleArchetypeSelect(archetype.id)}
                        className={`p-4 rounded-2xl border-2 border-charcoal shadow-sm cursor-pointer transition-all duration-200 ${archetype.bg} ${archetype.rotation} ${
                          isSelected 
                            ? 'ring-4 ring-notebook-crimson border-notebook-crimson shadow-sandbox-card scale-103 z-10' 
                            : 'hover:scale-[1.02] hover:shadow-sm'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-mono font-bold text-notebook-crimson uppercase tracking-wide">
                            {archetype.tagline}
                          </span>
                          {isSelected && (
                            <span className="w-4 h-4 bg-notebook-crimson rounded-full flex items-center justify-center text-white p-0.5">
                              <Check className="w-3 h-3 font-bold" />
                            </span>
                          )}
                        </div>
                        
                        <h3 className="font-display font-black text-base text-charcoal mb-1">
                          {archetype.title}
                        </h3>
                        <p className="text-[11px] text-pencil-gray/95 font-sans leading-relaxed">
                          {archetype.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center font-mono text-[9px] text-pencil-gray pt-2">
                  🌿 select an archetype to advance immediately
                </div>
              </motion.div>
            )}

            {/* STEP 3: Thinking Challenge Mode */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-3xl font-serif font-black text-charcoal tracking-tight leading-tight">
                    How should SandBoxer challenge you?
                  </h2>
                  <p className="text-xs text-pencil-gray max-w-lg font-sans">
                    Choose your AI co-founder companion style. This defines the core cognitive guidance and bounds checks during your design loops.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {thinkingModes.map((mode) => {
                    const isSelected = selectedThinkingMode === mode.id;
                    return (
                      <div
                        key={mode.id}
                        onClick={() => handleThinkingModeSelect(mode.id)}
                        className={`p-5 rounded-2xl border-2 border-charcoal text-left cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                          isSelected 
                            ? 'ring-4 ring-notebook-crimson border-notebook-crimson shadow-sandbox-card bg-[#fffcf5] scale-102 z-10' 
                            : 'bg-white hover:bg-[#fffdf9]'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${mode.accent}`}>
                            {mode.tagline}
                          </span>
                          {isSelected && (
                            <span className="w-5 h-5 bg-[#A33434] rounded-full flex items-center justify-center text-white">
                              <Check className="w-3.5 h-3.5 font-bold" />
                            </span>
                          )}
                        </div>

                        <h3 className="font-display font-black text-base text-charcoal uppercase tracking-wide">
                          {mode.title}
                        </h3>
                        <p className="text-xs text-pencil-gray font-sans mt-2 leading-relaxed">
                          {mode.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center font-mono text-[9px] text-pencil-gray pt-2">
                  🌿 tap any challenge companion structure to proceed
                </div>
              </motion.div>
            )}

            {/* STEP 4: Success Definition */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-3xl font-serif font-black text-charcoal tracking-tight leading-tight">
                    What would make this project successful?
                  </h2>
                  <p className="text-xs text-pencil-gray max-w-lg font-sans">
                    Anchor your focus around a single quantitative success metric. This metric stays hard-locked inside your active Constitution to guard your direction.
                  </p>
                </div>

                {/* Preset List block */}
                <div className="space-y-3 max-w-xl">
                  {successPresets.map((preset) => {
                    const isSelected = selectedSuccess === preset;
                    return (
                      <div
                        key={preset}
                        onClick={() => handleSuccessSelect(preset)}
                        className={`p-3.5 rounded-xl border-2 border-charcoal text-xs font-semibold font-sans cursor-pointer transition-all flex items-center justify-between ${
                          isSelected 
                            ? 'bg-notebook-yellow/30 border-notebook-crimson text-charcoal shadow-sm' 
                            : 'bg-white hover:bg-charcoal/5 text-pencil-gray hover:text-charcoal'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded-full border border-charcoal flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-notebook-crimson border-notebook-crimson' : 'bg-transparent'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span>{preset}</span>
                        </div>
                        <span className="font-mono text-[9px] text-pencil-gray/60 uppercase select-none">preset</span>
                      </div>
                    );
                  })}

                  {/* Custom selection option */}
                  <div
                    onClick={() => setSelectedSuccess('custom')}
                    className={`p-3.5 rounded-xl border-2 border-charcoal cursor-pointer transition-all space-y-2.5 ${
                      selectedSuccess === 'custom' 
                        ? 'bg-notebook-yellow/30 border-notebook-crimson text-charcoal shadow-sm' 
                        : 'bg-white hover:bg-charcoal/5 text-pencil-gray'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border border-charcoal flex items-center justify-center shrink-0 ${
                        selectedSuccess === 'custom' ? 'bg-notebook-crimson border-notebook-crimson' : 'bg-transparent'
                      }`}>
                        {selectedSuccess === 'custom' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="text-xs font-semibold font-sans">Provide a custom metric parameter</span>
                    </div>

                    {selectedSuccess === 'custom' && (
                      <input
                        type="text"
                        placeholder="e.g. 7天内拿到 5 个意向付费用户，或收获 1500+ 有机主页访问"
                        value={customSuccess}
                        onChange={(e) => setCustomSuccess(e.target.value)}
                        className="w-full bg-[#FFFCEF] border border-charcoal/30 font-sans text-xs px-3 py-2.5 rounded-lg outline-none focus:border-notebook-crimson"
                        autoFocus
                      />
                    )}
                  </div>
                </div>

                {/* Complete Trigger button */}
                <div className="pt-4 flex justify-between items-center max-w-xl">
                  <span className="text-[10px] font-mono text-pencil-gray italic">
                    {selectedSuccess ? '✨ Lock in and compile your active draft constitution' : '⚠️ select success parameter'}
                  </span>
                  
                  <button
                    type="button"
                    onClick={generateConstitutionAndComplete}
                    disabled={!selectedSuccess || (selectedSuccess === 'custom' && !customSuccess.trim())}
                    className="px-8 py-3.5 bg-notebook-crimson hover:bg-red-800 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed select-none shadow-md"
                  >
                    <span>Assemble Startup Draft →</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* FINAL COMPLETION LOADING AND wow CONSTITUTION SHOWCASE STATE */}
            {step === 'generation' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-6 min-h-[460px] flex flex-col justify-center items-center"
              >
                {/* Visual loading/animation state */}
                <div className="space-y-4 max-w-md">
                  <div className="relative w-24 h-24 mx-auto">
                    {/* Pulsing and spinning orbits */}
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-notebook-crimson/20 animate-spin-slow" />
                    <div className="absolute inset-2 rounded-full border-4 border-double border-notebook-crimson animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center text-3xl select-none">
                      📓
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-serif font-black text-charcoal">
                      Assembling Your Product Constitution...
                    </h3>
                    <p className="text-xs text-pencil-gray font-mono max-w-xs mx-auto animate-pulse">
                      Generating strategy cards... Matching Anti-Drift parameters... Binding co-founder challenges.
                    </p>
                  </div>
                  
                  {/* Faux progress indicators ticking by */}
                  <div className="space-y-1.5 pt-4 max-w-xs mx-auto font-mono text-[9px] text-left text-pencil-gray bg-white/40 border border-charcoal/5 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span>✓ Defining Ideal Tribe Client</span>
                      <span className="text-emerald-700 font-bold">READY</span>
                    </div>
                    <div className="flex justify-between">
                      <span>✓ Generating Core Visual Consts</span>
                      <span className="text-emerald-700 font-bold">LOCKED</span>
                    </div>
                    <div className="flex justify-between">
                      <span>✓ Formulating Tactical Scope Blockers</span>
                      <span className="text-emerald-700 font-bold">ENFORCED</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Tactile absolute layout details: small hand-written warnings */}
        <div className="absolute bottom-3 right-4 font-mono text-[9px] text-[#A33434]/55 select-none uppercase pointer-events-none">
          📔 SANDBOXER SYSTEM // SECURE NO-SQL DRAFT BLOCK
        </div>

        {/* Small sticker badge in corners */}
        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-notebook-yellow/30 border border-charcoal/10 rounded-full rotate-45 select-none pointer-events-none" />

      </div>
    </div>
  );
}
