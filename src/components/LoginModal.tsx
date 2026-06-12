import React, { useState } from 'react';
import { ConceptType } from '../types';
import { 
  KeyRound, Mail, User, ShieldAlert, ArrowRight, X, 
  CheckCircle, Database, Lock, Eye, EyeOff, Sparkles, BookOpen, Terminal
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
  conceptId: ConceptType;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess, conceptId }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'form' | 'docs'>('form');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email) {
      setErrorMessage('Please enter an email address.');
      return;
    }
    if (!password || password.length < 5) {
      setErrorMessage('Password must be at least 5 characters long.');
      return;
    }
    if (isSignUp && !username) {
      setErrorMessage('Please choose a founder username.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API authorization response latency
    setTimeout(() => {
      setIsSubmitting(false);
      const displayUser = username || email.split('@')[0] || 'Sarah';
      onLoginSuccess(displayUser);
      onClose();
    }, 1000);
  };

  const handleQuickLogin = (role: 'founder' | 'analyst') => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(role === 'founder' ? 'Sarah (Founder)' : 'Liam (Analyst)');
      onClose();
    }, 800);
  };

  // Concept dynamic container styles
  const getModalStyles = () => {
    switch (conceptId) {
      case 'A':
        return {
          container: 'bg-ruled-paper border-sketch shadow-notebook max-w-lg w-full p-8 text-charcoal relative',
          input: 'bg-[#FFFBF2] border-charcoal/30 font-hand text-lg focus:border-notebook-crimson placeholder:text-pencil-gray/50 text-charcoal',
          buttonPrimary: 'bg-charcoal text-[#fff8e7] hover:bg-neutral-800 border-sketch font-bold font-display cursor-pointer transition-all active:scale-98',
          buttonDemo: 'bg-notebook-yellow/30 text-charcoal hover:bg-notebook-yellow/60 border-sketch-sm font-hand text-base font-bold transition-all cursor-pointer',
          closeIcon: 'text-notebook-crimson hover:bg-notebook-yellow/20',
          titleFont: 'font-serif font-black underline decoration-notebook-crimson decoration-wavy underline-offset-4',
        };
      case 'B':
        return {
          container: 'bg-[#FFFDF6] rounded-3xl border-3 border-charcoal shadow-sandbox-card max-w-lg w-full p-8 text-charcoal relative transform rotate-1',
          input: 'bg-white rounded-xl border-2 border-charcoal/60 px-4 py-2.5 focus:border-[#E89C3D] focus:ring-2 focus:ring-[#E89C3D]/20 text-sm font-sans',
          buttonPrimary: 'bg-charcoal text-white hover:bg-neutral-800 rounded-2xl border-2 border-charcoal shadow-sm font-bold font-display cursor-pointer transition-transform hover:-translate-y-0.5 active:translate-y-0',
          buttonDemo: 'bg-white text-charcoal hover:bg-neutral-50 rounded-2xl border-2 border-charcoal font-sans text-xs font-bold transition-all cursor-pointer',
          closeIcon: 'text-charcoal hover:bg-charcoal/10 rounded-full p-1',
          titleFont: 'font-display uppercase tracking-tight',
        };
      case 'C':
        return {
          container: 'bg-white border-2 border-deep-navy shadow-md rounded max-w-lg w-full p-8 text-charcoal relative border-l-8 border-l-deep-navy font-mono',
          input: 'bg-[#FAFAF5] border border-technical-steel/30 text-xs px-3 py-2 outline-none focus:border-deep-navy',
          buttonPrimary: 'bg-deep-navy text-white hover:bg-deep-navy/90 text-xs tracking-wider uppercase py-2.5 font-bold transition-all cursor-pointer',
          buttonDemo: 'bg-transparent text-deep-navy border border-deep-navy/30 hover:bg-deep-navy/5 text-xs font-mono py-2 font-bold transition-all cursor-pointer',
          closeIcon: 'text-deep-navy hover:bg-deep-navy/15',
          titleFont: 'font-mono text-sm tracking-widest font-black uppercase',
        };
    }
  };

  const style = getModalStyles();

  return (
    <div className="fixed inset-0 bg-charcoal/65 backdrop-blur-sm z-[200] flex justify-center items-center p-4 overflow-y-auto animate-fade-in">
      <div className={`${style.container} shadow-2xl`}>
        
        {/* Binder rings simulation ornament for style A */}
        {conceptId === 'A' && (
          <div className="absolute top-0 bottom-0 left-2.5 w-1 flex flex-col justify-around pointer-events-none opacity-20 z-10 select-none">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full bg-charcoal select-none" />
            ))}
          </div>
        )}

        {/* Close Button */}
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors cursor-pointer ${style.closeIcon}`}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors cursor-pointer ${style.closeIcon}`}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ---------------------------------------------------- */}
        {/* STREAMLINED AUTHENTICATE AREA                        */}
        {/* ---------------------------------------------------- */}
        <div className="space-y-6 pt-4">
          <div className="space-y-1.5 text-center">
            <span className="font-mono text-[9px] text-[#A33434] bg-red-100 rounded px-2.5 py-0.5 uppercase tracking-wider font-semibold inline-block">
              Secure Founder Gate
            </span>
            <h2 className={`text-xl font-black text-gray-900 ${style.titleFont}`}>
              Sign In to SandBoxer
            </h2>
            <p className="text-xs text-pencil-gray font-sans max-w-sm mx-auto">
              Authenticate your identity to open safe-keeping strategic drafts, customized workspace timelines, and visual blueprints.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg flex gap-2 items-center">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span className="font-sans leading-none">{errorMessage}</span>
            </div>
          )}

          {/* Core Federerated Buttons Container */}
          <div className="space-y-3 pt-2">
            
            {/* Google Identity Mock Button */}
            <button
              onClick={() => {
                setIsSubmitting(true);
                setErrorMessage('');
                setTimeout(() => {
                  setIsSubmitting(false);
                  onLoginSuccess('zhaoceaser_google');
                  onClose();
                }, 750);
              }}
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-white hover:bg-neutral-50 text-charcoal font-sans font-bold text-xs rounded-xl border border-charcoal/20 shadow-sm flex items-center justify-center gap-3 active:scale-99 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Authorizing with Google Secure API...</span>
              ) : (
                <>
                  {/* Google Custom colored SVG */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 14.98 1 12 1 7.35 1 3.4 3.65 1.54 7.54l3.85 2.99C6.3 7.54 8.94 5.04 12 5.04z" />
                    <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.43c-.28 1.44-1.1 2.67-2.33 3.5l3.62 2.81c2.11-1.95 3.77-5.11 3.77-8.46z" />
                    <path fill="#FBBC05" d="M5.39 14.54c-.24-.71-.38-1.47-.38-2.54s.14-1.83.38-2.54L1.54 6.47C.56 8.35 0 10.48 0 12.7c0 2.22.56 4.35 1.54 6.23l3.85-2.99z" />
                    <path fill="#34A853" d="M12 23c3.24 0 5.96-1.08 7.95-2.92l-3.62-2.81c-1.11.75-2.54 1.19-4.33 1.19-3.06 0-5.7-2.5-6.61-5.49l-3.85 2.99C3.4 20.35 7.35 23 12 23z" />
                  </svg>
                  <span>Continue with Google Secure Auth</span>
                </>
              )}
            </button>

            {/* GitHub Identity Mock Button */}
            <button
              onClick={() => {
                setIsSubmitting(true);
                setErrorMessage('');
                setTimeout(() => {
                  setIsSubmitting(false);
                  onLoginSuccess('zhaoceaser_github');
                  onClose();
                }, 750);
              }}
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-charcoal hover:bg-neutral-800 text-white font-sans font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-3 active:scale-99 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Authorizing with GitHub secure pipe...</span>
              ) : (
                <>
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>Continue with GitHub Developer Auth</span>
                </>
              )}
            </button>

          </div>

          {/* Secure disclaimer */}
          <div className="text-center font-mono text-[9px] text-pencil-gray pt-1">
            🌿 Isolated Sandboxer Env // No Password Collected
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* VIEW 2: DEVELOPER DOCUMENTATION VIEW                  */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'docs' && (
          <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 scrollbar-thin">
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-[#A33434] bg-red-100 rounded px-2 py-0.5 uppercase tracking-wider font-bold inline-block">
                Production Stack Architecture
              </span>
              <h2 className="text-base font-black text-charcoal uppercase">
                Enterprise Integration specs
              </h2>
              <p className="text-xs text-pencil-gray font-sans">
                Below are the vetted, production-ready structures for the active **Supabase backend**, **PayPal payment gateway**, and **Cloudflare edge deployment**.
              </p>
            </div>

            <div className="space-y-3 font-sans text-xs text-left">
              
              {/* Supabase Integration Block */}
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg space-y-2">
                <div className="flex items-center gap-1.5 text-charcoal font-bold font-display uppercase tracking-wide text-[11px]">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>1. Supabase Backend & Database</span>
                </div>
                <p className="text-[11px] text-pencil-gray leading-relaxed font-sans">
                  Use the Supabase JS SDK (`@supabase/supabase-js`) to manage database states, persistent blueprint templates, and user-specific workspace schemas.
                </p>
                <pre className="p-2 bg-charcoal text-[#e1d6be] text-[10px] font-mono rounded overflow-x-auto">
{`// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetching saved blueprints safely:
export async function loadBlueprints(userId: string) {
  const { data, error } = await supabase
    .from('blueprints')
    .select('*')
    .eq('user_id', userId);
  return data;
}`}
                </pre>
              </div>

              {/* PayPal Checkout Block */}
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg space-y-2">
                <div className="flex items-center gap-1.5 text-charcoal font-bold font-display uppercase tracking-wide text-[11px]">
                  <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                  <span>2. PayPal Checkout Integration</span>
                </div>
                <p className="text-[11px] text-pencil-gray leading-relaxed font-sans">
                  Enable high-converting payment streams with the PayPal JavaScript SDK. Synchronize active premium sandbox tokens instantly on successful execution.
                </p>
                <pre className="p-2 bg-charcoal text-[#e1d6be] text-[10px] font-mono rounded overflow-x-auto">
{`// src/components/PaypalButton.tsx
import { useEffect } from 'react';

export function PaypalButton({ onApprove }: { onApprove: () => void }) {
  useEffect(() => {
    // Load paypal SDK dynamically
    // Render PayPal Smart Buttons element:
    window.paypal?.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{ amount: { value: '19.00' } }]
        });
      },
      onApprove: async (data: any, actions: any) => {
        const order = await actions.order.capture();
        onApprove(); // activate workspace
      }
    }).render('#paypal-button-container');
  }, []);

  return <div id="paypal-button-container" className="w-full" />;
}`}
                </pre>
              </div>

              {/* Cloudflare Pages and Workers Block */}
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg space-y-1.5">
                <div className="font-bold flex items-center gap-1 text-[11px] uppercase font-display text-charcoal tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>3. Cloudflare Edge Deployment</span>
                </div>
                <p className="text-[11px] text-pencil-gray leading-relaxed font-sans">
                  Deploy instantly via Cloudflare Pages. Write lightweight, zero-cold-start proxy APIs using Cloudflare Workers to shield Supabase key calls and coordinate webhooks.
                </p>
                <pre className="p-2 bg-charcoal text-[#e1d6be] text-[10px] font-mono rounded overflow-x-auto border border-white/5">
{`# wrangler.toml (Cloudflare Pages deployment configuration)
name = "sandboxer-studio"
compatibility_date = "2026-06-11"

[vars]
VITE_SUPABASE_URL = "https://your-instance.supabase.co"`}
                </pre>
              </div>

            </div>

            <p className="text-[10px] font-mono text-pencil-gray text-center italic pt-2">
              For complete reference specifications, see file: `AUTH_INTEGRATION.md`
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
