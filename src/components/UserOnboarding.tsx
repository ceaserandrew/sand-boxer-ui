import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Sparkles, 
  Check, 
  Terminal, 
  Trophy, 
  Award,
  Zap,
  ArrowRight,
  ShieldAlert,
  Dribbble,
  BookOpen
} from 'lucide-react';
import { ConceptType } from '../types';

interface UserOnboardingProps {
  conceptId: ConceptType;
  onComplete: (userData: {
    username: string;
    role: string;
    workEthos: string[];
    philosophy: string;
  }) => void;
  defaultUsername: string;
}

export default function UserOnboarding({ conceptId, onComplete, defaultUsername }: UserOnboardingProps) {
  const [username, setUsername] = useState(defaultUsername);
  const [selectedRole, setSelectedRole] = useState('Indie Hacker');
  const [philosophies] = useState([
    { id: 'zero_bloat', label: 'Zero-Bloat Philosophy', desc: 'No complex servers or authentication on week one. Code only what proves demand.' },
    { id: 'visual_soul', label: 'Visual Soul Alignment', desc: 'Beautiful typography and spatial layout are first-class commercial values.' },
    { id: 'fail_fast', label: 'Fail-Fast Testing', desc: 'Draft hypotheses, validate within 48 hours, prune unengaged ideas aggressively.' }
  ]);
  const [selectedPhilosophy, setSelectedPhilosophy] = useState('zero_bloat');
  
  const [ethos, setEthos] = useState([
    { id: 'et-1', text: 'I pledge to resist scope creep and over-engineering.', checked: true },
    { id: 'et-2', text: 'I will validate willingness to pay before building deep features.', checked: true },
    { id: 'et-3', text: 'I believe the best products solve a single clear user pain point.', checked: true }
  ]);

  const toggleEthos = (id: string) => {
    setEthos(ethos.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleComplete = () => {
    onComplete({
      username: username ? `@${username.replace('@', '')}` : '@Sarah',
      role: selectedRole,
      workEthos: ethos.filter(e => e.checked).map(e => e.text),
      philosophy: philosophies.find(p => p.id === selectedPhilosophy)?.label || 'Zero-Bloat Philosophy'
    });
  };

  const roles = [
    { title: 'Indie Hacker 🛠️', desc: 'Rapid prototyping, minimal stack, instant shipping.' },
    { title: 'Substack Creator 🎥', desc: 'Direct audience monetization, community core.' },
    { title: 'UX Alchemist 🎨', desc: 'Extreme visual alignment, pristine typography first.' },
    { title: 'Pragmatic Founder 💼', desc: 'Unit economics, commercial demand validation.' }
  ];

  return (
    <div className="max-w-xl w-full mx-auto p-4 md:p-8 bg-[#fffcf5] border-4 border-charcoal rounded-[2.5rem] shadow-2xl relative overflow-hidden font-sans">
      
      {/* Handdrawn wire spine aesthetics */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-charcoal/10 flex justify-around px-8 items-center pointer-events-none select-none">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-4 h-5 bg-charcoal rounded-b-md shadow-md" />
        ))}
      </div>

      <div className="absolute inset-0 bg-ruled-paper opacity-[0.05] pointer-events-none" />

      {/* Profile Dossier Setup card */}
      <div className="space-y-6 pt-4 relative z-10 pl-2">
        <div className="text-center space-y-1.5">
          <span className="font-mono text-[9px] bg-notebook-crimson text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            FOUNDER IMMERSION REGISTER
          </span>
          <h2 className="text-2xl font-serif font-black text-charcoal">
            Establish Your Founder Dossier
          </h2>
          <p className="text-xs text-pencil-gray font-sans max-w-sm mx-auto">
            Before entering the thinking environment, customize your founder persona constraints to guard your headspace.
          </p>
        </div>

        {/* Username form line */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-charcoal font-bold uppercase tracking-wider block">
            ✏️ Chosen User Pseudonym:
          </label>
          <div className="relative">
            <span className="absolute left-3 top-[50%] -translate-y-[50%] font-mono text-charcoal font-black text-sm">@</span>
            <input 
              type="text"
              value={username.replace('@', '')}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="zhaoceaser"
              className="w-full pl-8 pr-3 py-2.5 bg-[#FFFCEF] border-2 border-charcoal rounded-xl outline-none font-hand text-lg text-charcoal font-bold"
            />
          </div>
        </div>

        {/* Roles grid list Selection */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-charcoal font-bold uppercase tracking-wider block">
            🧬 Select Your Workspace Persona Avatar:
          </label>
          <div className="grid grid-cols-2 gap-3">
            {roles.map((r) => {
              const selected = selectedRole === r.title;
              return (
                <div
                  key={r.title}
                  onClick={() => setSelectedRole(r.title)}
                  className={`p-3 rounded-xl border-2 border-charcoal cursor-pointer transition-all ${
                    selected ? 'bg-notebook-yellow/30 border-notebook-crimson shadow-sm scale-102' : 'bg-white hover:bg-neutral-50'
                  }`}
                >
                  <h4 className="text-xs font-bold text-charcoal font-sans">{r.title}</h4>
                  <p className="text-[10px] text-pencil-gray mt-1 leading-snug">{r.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Philosophies selection */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-charcoal font-bold uppercase tracking-wider block">
            🪐 Select Primary Core Philosophy Gate:
          </label>
          <div className="space-y-2">
            {philosophies.map((p) => {
              const selected = selectedPhilosophy === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPhilosophy(p.id)}
                  className={`p-2.5 rounded-lg border border-charcoal text-left cursor-pointer transition-colors ${
                    selected ? 'bg-notebook-yellow/30 border-notebook-crimson text-charcoal' : 'bg-white text-zinc-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full border border-charcoal flex items-center justify-center shrink-0 ${selected ? 'bg-notebook-crimson border-notebook-crimson' : 'bg-transparent'}`}>
                      {selected && <div className="w-1 h-1 rounded-full bg-white" />}
                    </div>
                    <span className="text-xs font-bold font-sans">{p.label}</span>
                  </div>
                  <p className="text-[9px] text-pencil-gray leading-normal pl-5 mt-0.5">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Work Ethic Checkbox Pledge list */}
        <div className="space-y-2 bg-[#FFFDF7] border-2 border-dashed border-charcoal/40 p-4 rounded-xl relative rotate-[0.5deg]">
          <span className="text-[9px] font-mono text-notebook-crimson font-black block uppercase tracking-widest">
            🛡️ FOUNDER WORK ETHICS DECALOGUE:
          </span>
          <div className="space-y-1.5 pt-1.5">
            {ethos.map((item) => (
              <label key={item.id} className="flex gap-2.5 items-start cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={item.checked} 
                  onChange={() => toggleEthos(item.id)}
                  className="mt-0.5 rounded text-notebook-crimson focus:ring-notebook-crimson border-charcoal/30 cursor-pointer"
                />
                <span className={`text-[10.5px] leading-tight font-sans text-charcoal ${item.checked ? 'font-semibold' : 'opacity-50 line-through'}`}>
                  {item.text}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Activate Sandbox workspace CTA */}
        <div className="pt-3 space-y-2">
          <button
            type="button"
            onClick={handleComplete}
            className="w-full py-4 bg-charcoal hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-99"
            id="register-activate-button"
          >
            <span>Activate SandBoxer Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onComplete({
              username: '@zhaoceaser',
              role: 'Pragmatic Founder 💼',
              workEthos: [
                'I pledge to resist scope creep and over-engineering.',
                'I will validate willingness to pay before building deep features.',
                'I believe the best products solve a single clear user pain point.'
              ],
              philosophy: 'Zero-Bloat Philosophy'
            })}
            className="w-full py-2 bg-transparent text-pencil-gray hover:text-charcoal hover:bg-black/5 font-mono text-[10.5px] font-bold uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            id="register-skip-button"
          >
            <span>✕ Skip Onboarding & Enter Library</span>
          </button>
        </div>

      </div>
    </div>
  );
}
