import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Plus, 
  HelpCircle, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Bookmark, 
  Lock, 
  Clock, 
  ShieldAlert,
  ThumbsDown,
  ThumbsUp,
  Award
} from 'lucide-react';

interface CreatorLaunchDemoWizardProps {
  onClose: () => void;
  onActivateDemoProject: (projectKey: string) => void;
}

export default function CreatorLaunchDemoWizard({
  onClose,
  onActivateDemoProject
}: CreatorLaunchDemoWizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [driftAction, setDriftAction] = useState<'none' | 'accepted' | 'rejected'>('none');
  const [alignmentScore, setAlignmentScore] = useState<number>(92);
  const [simulatedLog, setSimulatedLog] = useState<string[]>([]);

  // Steps definitions
  // Step 1: The Seed Idea
  // Step 2: The Sacred Constitution
  // Step 3: The Drift Temptation (Interactive Drift Propose)
  // Step 4: The Strategic Blueprint Evolved

  const handleChooseAcceptDrift = () => {
    setDriftAction('accepted');
    setAlignmentScore(68);
    setSimulatedLog(prev => [
      ...prev,
      "⚠️ Drift Event: User proposed 'Add a community forum' of overboarding scale.",
      "❌ Deviation Detected: Violated 'Keep it simple' & 'Prioritize speed'.",
      "📉 Alignment Score plunged: 92% ➔ 68%."
    ]);
  };

  const handleChooseRejectDrift = () => {
    setDriftAction('rejected');
    setAlignmentScore(95);
    setSimulatedLog(prev => [
      ...prev,
      "🛡️ Alignment Maintained: User rejected 'Add a community forum' proposal successfully.",
      "✅ Verified: Remained aligned with the the First-Sale 7-day constraint.",
      "📈 Alignment Score stabilized: 92% ➔ 95% (Perfect Integrity)."
    ]);
  };

  const finishDemo = () => {
    onActivateDemoProject('creator_launch');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-charcoal/90 backdrop-blur-sm z-50 flex justify-center items-center p-4 overflow-y-auto animate-fade-in">
      <div 
        className="bg-[#FFFDF3] border-4 border-charcoal text-charcoal w-full max-w-3xl rounded-[2.5rem] p-6 md:p-8 relative shadow-2xl overflow-hidden min-h-[580px] flex flex-col justify-between"
        id="tutorial-demo-wizard-modal"
      >
        {/* Retro dots backdrop */}
        <div className="absolute inset-0 bg-dot-matrix opacity-[0.06] pointer-events-none" />
        
        {/* Ribbon banner ornament */}
        <div className="absolute top-0 left-12 w-32 h-6 bg-notebook-crimson text-white text-[9px] font-mono font-black uppercase text-center flex items-center justify-center tracking-widest shadow-sm">
          🌟 COMPASS DEMO GUIDE
        </div>

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-charcoal/60 hover:text-notebook-crimson p-1 rounded-full hover:bg-black/5 transition-all cursor-pointer"
          id="close-wizard-modal-button"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header Indicators of Progress */}
        <div className="pt-4 border-b border-charcoal/10 pb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="font-mono text-[9px] text-[#B83F3F] font-black uppercase tracking-widest">
              STEP {currentStep} OF 4 // SandBoxer Founder Academy
            </span>
            <span className="font-mono text-[10px] text-zinc-500 font-bold">
              Target: CreatorLaunch
            </span>
          </div>

          <h3 className="text-2xl font-serif font-black tracking-tight flex items-center gap-2">
            <span>The Blueprint Journey Demo</span>
            <span className="text-xs bg-notebook-yellow border border-charcoal px-2 py-0.5 rounded font-mono font-black uppercase tracking-wider">
              How Sandboxer Resists Bloat
            </span>
          </h3>

          {/* Dots Indicator */}
          <div className="flex gap-2 mt-3">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentStep === s 
                    ? 'w-12 bg-notebook-crimson' 
                    : s < currentStep 
                      ? 'w-3 bg-charcoal' 
                      : 'w-3 bg-charcoal/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP VIEWS */}
        <div className="my-6 flex-1 flex flex-col justify-center">
          
          {/* STEP 1: THE IDEA STAGE */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 flex justify-center">
                  <div className="w-28 h-36 bg-notebook-crimson text-white rounded-r-2xl border-4 border-charcoal shadow-xl relative flex flex-col justify-between p-3 rotate-[-2deg]">
                    <span className="text-3xl select-none">📒</span>
                    <span className="font-mono text-[10px] uppercase font-black tracking-wider text-notebook-yellow">CreatorLaunch</span>
                    <div className="absolute top-3 right-3 w-5 h-5 bg-[#FAF3D1] text-charcoal rounded-full flex items-center justify-center font-mono text-[9px] font-black">
                      1
                    </div>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-3">
                  <span className="text-[10px] font-mono bg-charcoal/5 px-2 py-0.5 rounded border border-charcoal text-pencil-gray font-bold uppercase inline-block">
                    CONCEPTION ROOT IDEA
                  </span>
                  <h4 className="text-xl font-serif font-black text-charcoal leading-snug">
                    "Help content creators achieve their first digital product sale within 7 days."
                  </h4>
                  <p className="text-xs text-pencil-gray leading-relaxed font-sans">
                    Every startup founder has too many vague ideas. SandBoxer forces you to synthesize them immediately into one single, crystal-clear metric. For **CreatorLaunch**, the metric is simple: **First Sale Completed.**
                  </p>

                  <div className="p-3 bg-[#FCF6DF]/40 border border-[#E9D2AC] rounded-xl flex items-center gap-2 text-xs">
                    <span className="text-xl">💡</span>
                    <div>
                      <strong className="block font-mono text-[11px] uppercase text-[#B83F3F] leading-none">The Pragmatic Strategy</strong>
                      <span className="text-pencil-gray">No complex community forum, no marketplace, no CRM. Just a clean PDF checkout.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: THE CONSTITUTION (SACRED LIMITS) */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-white border-2 border-charcoal rounded-2xl p-4 md:p-5 relative shadow-sm">
                <div className="absolute -top-3 left-4 bg-charcoal text-[#fff8e7] px-2.5 py-0.5 rounded font-mono text-[9px] font-black uppercase tracking-wider">
                  📜 SACRED CONSTITUTION: CREATORLAUNCH
                </div>
                
                <p className="text-xs text-pencil-gray italic mb-4 leading-normal">
                  "The constitution lists forbidden features and constraints. It is the protective shield that guards the founder's mental resources from drift."
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Focus Rules column */}
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-emerald-800 font-extrabold uppercase block pb-1 border-b border-emerald-100">
                      🟢 CORE PRINCIPLES OF INTEGRITY
                    </span>
                    <ul className="space-y-1.5 text-xs text-charcoal font-medium">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Keep it simple (Instant 1-page Checkout).</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Focus on creator speed (Launch in 7 days).</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Validate true willingness to pay.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Forbidden features column */}
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-[#B83F3F] font-extrabold uppercase block pb-1 border-b border-red-100">
                      ❌ FORBIDDEN DRIFT HAZARDS
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-500 font-semibold italic">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B83F3F]" />
                        <span>Community Forums / Chat channels</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B83F3F]" />
                        <span>Comprehensive Creator Marketplace</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B83F3F]" />
                        <span>Enterprise level dashboards & raw CRM</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: THE DRIFT TEMPTATION (INTERACTIVE TRIAL) */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-3 border-dashed border-[#B83F3F] bg-[#FFF5F5] rounded-3xl p-5 relative overflow-hidden">
                {/* Simulated Notification Box */}
                <span className="absolute top-2 right-4 text-[9px] font-mono text-[#B83F3F] font-black border border-[#B83F3F]/30 bg-white px-2 rounded animate-pulse">
                  ⚖️ DECISION TEST EVENT
                </span>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <span className="text-2xl">💭</span>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 block uppercase font-bold">PROPOSED PILOT FEATURE:</span>
                      <h4 className="font-hand text-xl font-bold text-charcoal leading-tight">
                        "Hey Founder, our beta readers want a community forum to hang out. Let's add real-time messaging slots!"
                      </h4>
                    </div>
                  </div>

                  {driftAction === 'none' ? (
                    <div className="space-y-3 pt-2">
                      <p className="text-xs text-pencil-gray leading-normal">
                        <strong>Test your founder instincts:</strong> Will you accept this feature proposal, or reject it to protect the CreatorLaunch 7-day constitution?
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={handleChooseAcceptDrift}
                          className="flex-1 py-3 border-2 border-charcoal bg-white hover:bg-neutral-50 rounded-xl font-mono text-xs font-black text-charcoal flex items-center justify-center gap-2 group cursor-pointer transition-transform hover:scale-102"
                        >
                          <ThumbsUp className="w-4 h-4 text-emerald-600" />
                          <span>Accept & Code This Feature</span>
                        </button>
                        
                        <button
                          onClick={handleChooseRejectDrift}
                          className="flex-1 py-3 border-2 border-charcoal bg-[#B83F3F] hover:bg-neutral-800 rounded-xl font-mono text-xs font-black text-white flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-102"
                        >
                          <ThumbsDown className="w-4 h-4 text-white" />
                          <span>Reject (Stay Aligned to Speed)</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-3 border-t border-dashed border-charcoal/10 space-y-4">
                      {driftAction === 'accepted' ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-notebook-crimson font-black uppercase text-xs">
                            <AlertTriangle className="w-4 h-4 text-notebook-crimson animate-bounce" />
                            <span>📉 DRIFT HAZARD WARNING STRIFE!</span>
                          </div>
                          
                          <p className="text-xs text-pencil-gray leading-relaxed">
                            <strong>Oh no! Uncontrolled drift happened!</strong> Your alignment rating just plummeted from <span className="font-bold">92% to 68%</span>. A community forum adds databases, mod structures, and messaging queues—instantly inflating your 7-day roadmap by 3 weeks!
                          </p>

                          <button
                            onClick={handleChooseRejectDrift}
                            className="text-xs font-mono font-black border-2 border-charcoal bg-white px-4 py-2 rounded-lg hover:bg-yellow-100 transition-colors uppercase leading-none"
                          >
                            🔄 Pivot: Reject Community Option Instead!
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold uppercase text-xs">
                            <CheckCircle className="w-4 h-4 text-emerald-600 animate-pulse" />
                            <span>📈 ALIGNMENT PRESERVED (Perfect Integrity!)</span>
                          </div>

                          <p className="text-xs text-pencil-gray leading-relaxed">
                            <strong>Fantastic choice!</strong> You successfully resisted scope creep. You understand that the community can wait. By rejecting the bait, you saved your startup timeline, keeping startup alignment solid at <span className="text-emerald-700 font-black">95%</span>!
                          </p>
                        </div>
                      )}

                      {/* Micro log trail */}
                      <div className="bg-[#1C1C1E] text-[#DCE6E1] font-mono text-[9.5px] p-2.5 rounded border border-charcoal space-y-1">
                        {simulatedLog.map((log, index) => (
                          <div key={index} className="leading-snug">{log}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: THE PRODUCT BLUEPRINT REVEALED */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in relative text-center pb-6">
              <div className="w-16 h-16 bg-notebook-yellow border-3 border-charcoal rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                <Award className="w-8 h-8 text-notebook-crimson" />
              </div>

              <h4 className="text-xl font-serif font-black text-charcoal">
                Interactive Model Roadmap Evolved!
              </h4>

              <div className="max-w-md mx-auto bg-white border border-charcoal/10 rounded-2xl p-4 text-left space-y-2.5 relative">
                <div className="absolute top-2 right-4 font-mono text-[8px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded leading-none uppercase font-extrabold">
                  {alignmentScore}% CONSCIOUS ALIGNED
                </div>

                <span className="font-mono text-[10px] text-zinc-400 block uppercase font-bold">CREATORLAUNCH BLUEPRINT MAP OVERVIEW:</span>
                
                {/* Visual cascade */}
                <div className="text-[11px] font-mono space-y-1">
                  <div>💡 <span className="text-zinc-600">Idea</span> ➔ Help newsletter authors earn dollars in 7 days.</div>
                  <div>🎯 <span className="text-zinc-600">Vision</span> ➔ Keep it simple. First sale metric validation.</div>
                  <div>👤 <span className="text-zinc-600">User</span> ➔ Substack writers desiring low-friction setup.</div>
                  <div>🔥 <span className="text-zinc-600">Problem</span> ➔ Sunk costs in unvalidated 3-month course structures.</div>
                  <div>🗺️ <span className="text-[#B83F3F] font-extrabold">Active MVP</span> ➔ One-Click PDF Product pre-orders page.</div>
                </div>
              </div>

              <p className="text-xs text-pencil-gray max-w-lg mx-auto leading-relaxed mt-4">
                You've successfully completed the SandBoxer core training scenario. You are now equipped with the anti-drift mental framework necessary to keep your dreams lean and clean!
              </p>
            </div>
          )}

        </div>

        {/* Navigation Step Control */}
        <div className="border-t border-charcoal/10 pt-4 flex justify-between items-center relative z-10">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-4 py-2 border-2 border-charcoal text-charcoal bg-white rounded-xl font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 hover:bg-charcoal/5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-5 py-2.5 bg-charcoal text-white rounded-xl font-mono text-xs font-black uppercase tracking-widest flex items-center gap-1.5 hover:bg-neutral-800 cursor-pointer"
              id="wizard-next-button"
            >
              <span>Continue Step</span>
              <ArrowRight className="w-4 h-4 text-notebook-yellow" />
            </button>
          ) : (
            <button
              onClick={finishDemo}
              className="px-6 py-3 bg-notebook-red border-3 border-charcoal bg-[#B83F3F] text-white rounded-xl font-mono text-xs font-black uppercase tracking-widest flex items-center gap-1.5 shadow-md hover:bg-neural-800 transition-all cursor-pointer"
              id="wizard-complete-button"
            >
              <span>Mount CreatorLaunch Blueprint & Exit</span>
              <Sparkles className="w-4 h-4 text-notebook-yellow" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
