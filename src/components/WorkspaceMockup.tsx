import React, { useState, FormEvent, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Trash2, 
  Plus, 
  Check, 
  X, 
  ShieldAlert, 
  Award, 
  ListTodo, 
  Flag, 
  Activity, 
  Compass, 
  Eye, 
  History, 
  HelpCircle, 
  ArrowRight, 
  AlertCircle, 
  Radio, 
  Bookmark, 
  Save, 
  Flame, 
  GitCommit, 
  Layers, 
  Zap, 
  FileDown, 
  TrendingUp, 
  CheckSquare, 
  Unlock,
  AlertTriangle
} from 'lucide-react';
import { ConceptType, SandboxCard, Constitution } from '../types';

interface WorkspaceMockupProps {
  conceptId: ConceptType;
  cards: SandboxCard[];
  onUpdateCard: (id: string, newContent: string) => void;
  onAddCard: (type: SandboxCard['type']) => void;
  onDeleteCard: (id: string) => void;
  activeStartupName: string;
  onBackToLibrary?: () => void;
  constitution?: Constitution;
  onUpdateConstitution?: (updated: Constitution) => void;
}

interface Assumption {
  id: string;
  text: string;
  status: 'unvalidated' | 'validated' | 'busted';
}

interface TimelineEvent {
  id: string;
  time: string;
  type: 'creation' | 'correction' | 'pivot' | 'milestone';
  description: string;
}

export default function WorkspaceMockup({
  conceptId,
  cards,
  onUpdateCard,
  onAddCard,
  onDeleteCard,
  activeStartupName,
  onBackToLibrary,
  constitution,
  onUpdateConstitution
}: WorkspaceMockupProps) {
  // LEFT PANEL: Accordion/Mental tab selection to navigate the "Founder Brain"
  const [activeBrainSection, setActiveBrainSection] = useState<'vision' | 'assumptions' | 'mvp' | 'roadmap' | 'decisions'>('vision');

  // Interactive local states for high fidelity
  const [assumptions, setAssumptions] = useState<Assumption[]>([
    { id: 'asm-1', text: 'Customers will pay $10/month upfront for a raw handwritten-grade product architecture workspace.', status: 'unvalidated' },
    { id: 'asm-2', text: 'Non-technical creators actually care more about avoiding bloat than writing code scripts.', status: 'validated' },
    { id: 'asm-3', text: 'We do not need a complex SQL database sync to prove immediate customer onboarding demand.', status: 'validated' },
    { id: 'asm-4', text: 'Establishing automated notification systems on Day 1 is critical for product success.', status: 'busted' }
  ]);

  // MVP constraints checkbox control
  const [mvpChecks, setMvpChecks] = useState([
    { id: 'mvp-1', text: 'Eliminate standard signup/login password loops (use simple URL tokens instead)', checked: true },
    { id: 'mvp-2', text: 'No complex Relational Database setup; persist strictly inside safe LocalStorage/Text first', checked: true },
    { id: 'mvp-3', text: 'Deploy as single-viewport high-impact web sandbox under 30 total coding hours', checked: true },
    { id: 'mvp-4', text: 'Ban secondary multi-room active notifications and chat feeds or dynamic dashboards', checked: true }
  ]);

  // ROTATING STRATEGIC UNRESOLVED QUESTIONS for Today's Focus
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const focusQuestions = [
    {
      id: 'fq-1',
      question: 'Who is your absolute first customer who would pay $10 right now? Describe them specifically.',
      hint: 'Avoid generic "SMBs" or "everyone". Think of someone who complained about this exact problem this week.',
      type: 'user' as const
    },
    {
      id: 'fq-2',
      question: 'Which core assumption in your startup will kill you first if it proves completely wrong?',
      hint: 'It is usually your distribution assumption, or assumptions about willingness to pay.',
      type: 'problem' as const
    },
    {
      id: 'fq-3',
      question: 'What is the absolute single most important feature we must REMOVE immediately to prevent bloated drift?',
      hint: 'Think of features that feel nice to have (e.g. social share, notifications, detailed charts) but add zero core utility.',
      type: 'mvp' as const
    },
    {
      id: 'fq-4',
      question: 'Why has no one solved this pain point adequately before? What is the secret insight of your solution?',
      hint: 'Your insight cannot just be "I have AI". It is usually high-tactile simplicity or unique distribution channels.',
      type: 'vision' as const
    }
  ];

  const [currentAnswerText, setCurrentAnswerText] = useState('');
  const [savedFocusAnswers, setSavedFocusAnswers] = useState<Record<string, string>>({
    'fq-1': 'A digital creator who writes daily on Substack but gets exhausted spending 3 hours configuring Notion calendars.',
  });

  // FOUNDER TIMELINE state - list of key strategic decisions
  const [timeline, setTimeline] = useState<TimelineEvent[]>([
    { id: 't-1', time: '17:45', type: 'creation', description: `Drafted primary SandBoxer focus: "${activeStartupName}"` },
    { id: 't-2', time: '17:46', type: 'correction', description: 'Enforced scope boundaries: Banned server-side authentication & databases.' },
    { id: 't-3', time: '17:48', type: 'pivot', description: 'Changed Success Checkpoint: Aiming for 10 passionate paid users over generic metrics.' },
    { id: 't-4', time: '17:50', type: 'milestone', description: 'Locked down raw core principles inside active Product Constitution.' }
  ]);
  const [newTimelineText, setNewTimelineText] = useState('');

  // 🔑 BYOK API Engine States
  const [byokProvider, setByokProvider] = useState<string>(() => localStorage.getItem('sandboxer_byok_provider') || 'gemini');
  const [byokApiKey, setByokApiKey] = useState<string>(() => localStorage.getItem('sandboxer_byok_api_key') || '');
  const [byokModel, setByokModel] = useState<string>(() => localStorage.getItem('sandboxer_byok_model') || 'gemini-3.5-flash');
  const [isConfiguringKey, setIsConfiguringKey] = useState<boolean>(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('');

  // Keep BYOK in sync with localStorage whenever the workspace renders
  React.useEffect(() => {
    setByokProvider(localStorage.getItem('sandboxer_byok_provider') || 'gemini');
    setByokApiKey(localStorage.getItem('sandboxer_byok_api_key') || '');
    setByokModel(localStorage.getItem('sandboxer_byok_model') || 'gemini-3.5-flash');
  }, []);

  // 🛡️ Bottom-level Rule System Live Audit State
  const [isAuditingRules, setIsAuditingRules] = useState<boolean>(false);
  const [auditReport, setAuditReport] = useState<{
    score: number;
    violations: string[];
    traps: string[];
    advice: string;
  } | null>(null);

  // 🔄 Vision-driven Reverse-Engineering State
  const [isPruningVision, setIsPruningVision] = useState<boolean>(false);
  const [customVisionInput, setCustomVisionInput] = useState<string>('');
  const [pruningResult, setPruningResult] = useState<{
    mvpGoal: string;
    forbiddenFeatures: string[];
    directives: string[];
    challengePrompt: string;
  } | null>(null);

  // Permanent Forbidden Features state that the user can actively "STRIKE OUT" (Prune)
  const [forbiddenFeatures, setForbiddenFeatures] = useState([
    { text: 'Complex user authentication, password resets, and multi-team roles', struck: false },
    { text: 'Interactive AI Chatbot text bubbles and spammy pop-up customer support', struck: false },
    { text: 'Analytics dashboard with colorful charts, graphs, and live traffic trackers', struck: false },
    { text: 'Feed systems, user profiles, liking/bookmarking structures, social share grids', struck: false }
  ]);

  // Synchronize local forbidden features list with active constitution prop
  React.useEffect(() => {
    if (constitution?.forbiddenFeatures) {
      setForbiddenFeatures(
        constitution.forbiddenFeatures.map(feat => {
          const existing = forbiddenFeatures.find(f => f.text === feat);
          return {
            text: feat,
            struck: existing ? existing.struck : false
          };
        })
      );
    }
  }, [constitution]);

  // 🛠️ Secure client-byok LLM fetcher helper
  const callBYOKAI = async (promptText: string, provider: string, key: string, selectedModel: string): Promise<string> => {
    if (provider === 'gemini') {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${key}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Gemini API Error: ${errText || response.statusText}`);
      }
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } else if (provider === 'openai') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [{ role: 'user', content: promptText }]
        })
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`OpenAI API Error: ${errText || response.statusText}`);
      }
      const data = await response.json();
      return data.choices?.[0]?.message?.content || '';
    } else if (provider === 'deepseek') {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: promptText }]
        })
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`DeepSeek API Error: ${errText || response.statusText}`);
      }
      const data = await response.json();
      return data.choices?.[0]?.message?.content || '';
    } else if (provider === 'anthropic') {
      // Direct raw fetch (requires a CORS allowance on the requester side or user trust)
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'dangerouslyAllowBrowser': 'true'
        } as any,
        body: JSON.stringify({
          model: selectedModel,
          max_tokens: 1512,
          messages: [{ role: 'user', content: promptText }]
        })
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Anthropic API Error: ${errText || response.statusText}`);
      }
      const data = await response.json();
      return data.content?.[0]?.text || '';
    }
    throw new Error('Unsupported provider.');
  };

  const parseJSONFromLLM = (text: string) => {
    let cleaned = text.trim();
    if (cleaned.startsWith('```json')) cleaned = cleaned.substring(7);
    else if (cleaned.startsWith('```')) cleaned = cleaned.substring(3);
    if (cleaned.endsWith('```')) cleaned = cleaned.substring(0, cleaned.length - 3);
    cleaned = cleaned.trim();
    try {
      return JSON.parse(cleaned);
    } catch (error) {
      const first = cleaned.indexOf('{');
      const last = cleaned.lastIndexOf('}');
      if (first !== -1 && last !== -1) {
        try {
          return JSON.parse(cleaned.substring(first, last + 1));
        } catch (inner) {
          throw new Error('Malformed JSON output from strategic AI.');
        }
      }
      throw error;
    }
  };

  // 🛡️ Trigger rule audits
  const handleRunIntegrityAudit = async () => {
    setIsAuditingRules(true);
    setApiErrorMessage('');
    
    // Core parameters to send
    const directText = (constitution?.corePrinciples || []).join(', ');
    const forbiddenText = forbiddenFeatures.map(f => f.text).join(', ');
    const cardsText = cards.map(c => `[Node ${c.type}] Title: ${c.title} - Description: ${c.content}`).join('\n');
    const stickiesText = stickies.map(s => s.text).join('\n');

    if (!byokApiKey) {
      // Fallback local simulated audit
      setTimeout(() => {
        const report = runLocalAuditMock();
        setAuditReport(report);
        setIsAuditingRules(false);
        appendTimelineEvent('milestone', `Performed Local Simulated Audit: Found ${report.violations.length} micro-breaches.`);
      }, 750);
      return;
    }

    const auditPrompt = `
You are Sandboxer AI Engine (Anti-Drift Guardian).
The founder's active Constitution is:
Directives: ${directText}
Forbidden Features: ${forbiddenText}

Active Workspace Strategy Cards:
${cardsText}

Custom Sticky Brain-Dumps:
${stickiesText}

Please perform a "Bottom-Level Rule System" audit. Evaluate if cards/stickies violate the forbidden features or general constraints.
Output exactly a JSON object having these fields:
{
  "score": number (0 to 100, be strict about scope additions),
  "violations": string[] (specific occurrences of feature additions),
  "traps": string[] (cognitive pitfalls matching their strategy, e.g. Build-before-Validate trap),
  "advice": string (concrete guidance on stripping down to achieve the exact same user value under 3 hours of code)
}
Do not write anything except the pure JSON structure.
`;

    try {
      const completionText = await callBYOKAI(auditPrompt, byokProvider, byokApiKey, byokModel);
      const parsed = parseJSONFromLLM(completionText);
      setAuditReport({
        score: typeof parsed.score === 'number' ? parsed.score : 80,
        violations: Array.isArray(parsed.violations) ? parsed.violations : [],
        traps: Array.isArray(parsed.traps) ? parsed.traps : [],
        advice: parsed.advice || 'Keep it ultra lean.'
      });
      appendTimelineEvent('milestone', `Executed Live LLM Integrity Check (Score: ${parsed.score}%).`);
    } catch (err: any) {
      console.error(err);
      setApiErrorMessage(err.message || 'Error occurred during AI check.');
      // Graceful fallback to simulated to prevent tool locks
      const report = runLocalAuditMock();
      setAuditReport(report);
      appendTimelineEvent('correction', 'AI Engine timed out/refused credentials. Fell back to Local Audit rules.');
    } finally {
      setIsAuditingRules(false);
    }
  };

  const runLocalAuditMock = () => {
    const flatContent = cards.map(c => c.content.toLowerCase()).join(' ') + ' ' + 
                        stickies.map(s => s.text.toLowerCase()).join(' ') + ' ' + 
                        cards.map(c => c.title.toLowerCase()).join(' ') + ' ' +
                        stickyBrainDump.toLowerCase();
    const violations: string[] = [];
    const traps: string[] = [];
    let advice = "";
    let score = 100;

    const checkList = [
      { word: 'database', penalty: 15, text: "Found 'database' node. Database schema and adapters increase the complexity. Store inside localStorage or client state first!" },
      { word: 'sql', penalty: 12, text: "Found 'SQL' keyword. Schema migrations and database connections add heavy initial coding drag. Keep data offline!" },
      { word: 'chatbot', penalty: 15, text: "Found chat/chatbot keywords. Prompts histories and state syncs are infinite debugging loops. Use a static form!" },
      { word: 'ai chat', penalty: 15, text: "Found 'AI Chat' references. Suggest using form input boxes returning flat summaries." },
      { word: 'dashboard', penalty: 12, text: "Found 'dashboard' node. Complex chart configurations and widgets require high state control. Deliver simple lists." },
      { word: 'analytics', penalty: 10, text: "Found 'analytics'. Keep statistics external or manually tracked rather than coding complex engines." },
      { word: 'login', penalty: 15, text: "Found 'login'. Login walls and cookie authorizations slow down client validation. Use guest url hashes." },
      { word: 'auth', penalty: 15, text: "Found 'auth' references. Standard signups require email verification server setups." },
      { word: 'social', penalty: 10, text: "Found 'social' references. Social networks require complex multi-user syncs. Keep it single-user." },
      { word: 'notification', penalty: 10, text: "Found 'notification'. Real-time sockets or email triggers introduce heavy latency bugs." }
    ];

    checkList.forEach(item => {
      if (flatContent.includes(item.word)) {
        violations.push(item.text);
        score -= item.penalty;
      }
    });

    const unstruck = forbiddenFeatures.filter(f => !f.struck);
    unstruck.forEach(feat => {
      const keywords = feat.text.toLowerCase().split(/[ ,]+/);
      const mentions = keywords.some(kw => kw.length > 4 && flatContent.includes(kw));
      if (mentions) {
        violations.push(`Unstruck drift: Your strategy aligns with forbidden feature "${feat.text}". Trim it away.`);
        score -= 10;
      }
    });

    if (score < 100) {
      traps.push("The Build-Before-Validate Trap: Writing scaffolding lines (databases, signup layers) before collecting deposits.");
      traps.push("Scope Bloat Bias: Accumulating secondary features instead of driving a hyper-focused value hook.");
      advice = "Outsource all database, auth, and complex pipelines. Use static Airtables, Calendlies, or Stripe checkout urls. You can launch under 3 hours this way.";
    } else {
      advice = "Core workspace matches maximum simplicity. Focus entirely on distributing this blueprint to 5 actual clients today!";
    }

    return {
      score: Math.max(20, score),
      violations,
      traps,
      advice
    };
  };

  // 🔄 Trigger grand vision reverse-pruning
  const handlePruneGrandVision = async () => {
    if (!customVisionInput.trim()) return;
    setIsPruningVision(true);
    setApiErrorMessage('');

    if (!byokApiKey) {
      // Local preset simulation mock
      setTimeout(() => {
        const result = runLocalPruningMock(customVisionInput);
        setPruningResult(result);
        setIsPruningVision(false);
        appendTimelineEvent('pivot', 'Triggered Local Simulated Vision-Pruning against grandiose concept.');
      }, 750);
      return;
    }

    const pruningPrompt = `
You are Sandboxer AI Engine (Anti-Drift Guardian).
Your core methodology is "Vision-Driven Function Reverse-Engineering" (用愿景反推功能/底线).
The founder's grandiose/bloated business vision is:
"${customVisionInput}"

Please strip away all auxiliary/scaffolding layers. Focus exclusively on validating willingness to pay under 7 days (zero databases, zero custom auth, zero backend servers).
Provide a pruned strategic specification.
Output exactly a JSON object having these fields:
{
  "mvpGoal": "string (the Hyper-focused 7-day validation path)",
  "forbiddenFeatures": ["string", "string", "string", "string"] (4 specific features they must forbid to block scope drift),
  "directives": ["string", "string"] (2 core strategic guides),
  "challengePrompt": "string (a strict query challenging an underlying assumption)"
}
Do not write anything except the pure JSON structure.
`;

    try {
      const completionText = await callBYOKAI(pruningPrompt, byokProvider, byokApiKey, byokModel);
      const parsed = parseJSONFromLLM(completionText);
      setPruningResult({
        mvpGoal: parsed.mvpGoal || 'Collect pre-orders using a mock landing grid.',
        forbiddenFeatures: Array.isArray(parsed.forbiddenFeatures) ? parsed.forbiddenFeatures : [],
        directives: Array.isArray(parsed.directives) ? parsed.directives : [],
        challengePrompt: parsed.challengePrompt || 'Is this feature necessary today?'
      });
      appendTimelineEvent('pivot', 'Executed Live LLM Vision-driven Reverse-Engineering of grand concept.');
    } catch (err: any) {
      console.error(err);
      setApiErrorMessage(err.message || 'Error occurred during AI check.');
      const result = runLocalPruningMock(customVisionInput);
      setPruningResult(result);
      appendTimelineEvent('correction', 'AI Engine timed out/refused credentials. Fell back to Local Vision-Pruning mock.');
    } finally {
      setIsPruningVision(false);
    }
  };

  const runLocalPruningMock = (grandVision: string) => {
    const lowercase = grandVision.toLowerCase();
    let mvpGoal = "Set up a clean static lander explaining the main value, with direct buttons to pay upfront deposits.";
    let forbidden = [
      "Dynamic SQL relational databases and core persistent server schemas",
      "Interactive AI Chatbots and real-time chat text support blocks",
      "Complex signup paths, email verifications, and user dashboards",
      "Interactive social feed groups, directories, and post likers"
    ];
    let directives = [
      "Prioritize manually delivering results through email/PDF inside 12 hours.",
      "Axe individual account profiles entirely; handle authentication via encrypted invitation hashes."
    ];
    let challenge = "Does the user buying this really care about password settings, or are they after the raw primary benefit today?";

    if (lowercase.includes("ai") || lowercase.includes("model") || lowercase.includes("chat")) {
      mvpGoal = "Build a static form feeding your custom prompt into a single static page output pre-authored by you.";
      forbidden = [
        "Dynamic prompt history databases, account-credits, and ledger trackers",
        "Interactive chatbot conversation bubbles and voice-synthesizers",
        "Full user logins, profile galleries, and team permissions",
        "Real-time custom prompt fine-tuning dashboard"
      ];
      directives = [
        "Run the model queries purely behind a simple secured Cloud function.",
        "Limit maximum token usage using simple client-side cookies."
      ];
      challenge = "Is your customer paying you for a complex model fine-tuning deck, or do they just want a simple 2-line strategic report?";
    } else if (lowercase.includes("ecom") || lowercase.includes("store") || lowercase.includes("shop") || lowercase.includes("market") || lowercase.includes("payment")) {
      mvpGoal = "Launch a raw landing showcase holding 3 handcoded slots, linked to Stripe/LemonSqueezy pre-configured links.";
      forbidden = [
        "Dynamic cart databases, calculation models, and inventory trackers",
        "Dual buyer/seller chat rooms and real-time support panels",
        "Advanced custom analytics dashboards with charts",
        "Global tag search indexes and item directories"
      ];
      directives = [
        "Outsource and offload all cart checkouts directly to Stripe checkout widgets.",
        "Handle stock depletion manually or via simple email confirmation counters."
      ];
      challenge = "Why write cart math code when standard checkout buttons prove paying demand in 10 seconds of onboarding?";
    } else if (lowercase.includes("social") || lowercase.includes("find") || lowercase.includes("match") || lowercase.includes("share")) {
      mvpGoal = "Deploy a pre-populated static directory of 15 premium verified resources, with a submission form for custom entries.";
      forbidden = [
        "Real-time instant matchmaking websockets and active phone alerts",
        "Custom direct messaging profiles, feeds, liking boards",
        "Database structures holding full friend connection variables",
        "Multi-tier user reviews, comments, and rating grids"
      ];
      directives = [
        "Axe custom chats; trigger auto-emails that connect matched founders manually.",
        "Query raw listings from a simple static text object."
      ];
      challenge = "Why construct dynamic mutual matchmaking scripts when a manual, warm introduction email is 100x more valuable?";
    }

    return {
      mvpGoal,
      forbiddenFeatures: forbidden,
      directives,
      challengePrompt: challenge
    };
  };

  const handleApplyPruningResult = () => {
    if (!pruningResult || !onUpdateConstitution || !constitution) return;

    // Overwrite parent constitution
    const updatedConst: Constitution = {
      ...constitution,
      vision: pruningResult.mvpGoal,
      corePrinciples: pruningResult.directives,
      forbiddenFeatures: pruningResult.forbiddenFeatures
    };

    onUpdateConstitution(updatedConst);

    // Sync local lists
    setForbiddenFeatures(pruningResult.forbiddenFeatures.map(ft => ({ text: ft, struck: false })));

    appendTimelineEvent('milestone', 'Applied Vision-driven reverse spec: Rewrote SACRED CONSTITUTION & updated Forbidden Features!');
    setPruningResult(null);
  };

  // STICKY NOTES for brain-dumps
  const [stickyBrainDump, setStickyBrainDump] = useState<string>('');
  const [stickies, setStickies] = useState<Array<{ id: string; text: string; color: string; angle: number }>>([
    { id: 'st-1', text: '💡 Core Insight: Real paper doesn\'t crash or force updates. Keep the UX raw!', color: 'bg-amber-100 text-amber-950 border-amber-300', angle: -2 },
    { id: 'st-2', text: '🥊 Challenger critique: Make sure they pay BEFORE we design the billing loops!', color: 'bg-rose-100 text-rose-950 border-rose-300', angle: 2 }
  ]);

  // Functions to manipulate local arrays
  const toggleAssumption = (id: string, nextStatus: 'unvalidated' | 'validated' | 'busted') => {
    setAssumptions(assumptions.map(a => a.id === id ? { ...a, status: nextStatus } : a));
    
    // Log in timeline
    const updatedAsm = assumptions.find(a => a.id === id);
    if (updatedAsm) {
      appendTimelineEvent('correction', `Assessed assumption: "${updatedAsm.text.slice(0, 30)}..." to ${nextStatus.toUpperCase()}`);
    }
  };

  const toggleMvpCheck = (id: string) => {
    setMvpChecks(mvpChecks.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleStrikeForbidden = (index: number) => {
    const updated = [...forbiddenFeatures];
    updated[index].struck = !updated[index].struck;
    setForbiddenFeatures(updated);

    appendTimelineEvent('correction', `${updated[index].struck ? 'Struck out and approved removal of' : 'Restored'} forbidden feature: "${updated[index].text.slice(0, 25)}..."`);
  };

  const appendTimelineEvent = (type: TimelineEvent['type'], desc: string) => {
    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newEvent: TimelineEvent = {
      id: `t-new-${Date.now()}`,
      time: timeString,
      type,
      description: desc
    };
    setTimeline(prev => [newEvent, ...prev]);
  };

  const handlePostTimelinePivot = (e: FormEvent) => {
    e.preventDefault();
    if (!newTimelineText.trim()) return;
    appendTimelineEvent('pivot', `Decision logged: ${newTimelineText.trim()}`);
    setNewTimelineText('');
  };

  const handleAnswerSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentAnswerText.trim()) return;

    const activeQ = focusQuestions[currentQuestionIndex];
    setSavedFocusAnswers(prev => ({
      ...prev,
      [activeQ.id]: currentAnswerText.trim()
    }));

    // Log in timeline
    appendTimelineEvent('milestone', `Resolved Focus Question (Type: ${activeQ.type.toUpperCase()}): "${currentAnswerText.slice(0, 45)}..."`);

    // Dynamic prompt suggestion to add as strategy card in the parent app
    onAddCard(activeQ.type);

    setCurrentAnswerText('');
    
    // Auto advance question index
    if (currentQuestionIndex < focusQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    }
  };

  const handleSpawnStickyNote = (e: FormEvent) => {
    e.preventDefault();
    if (!stickyBrainDump.trim()) return;

    const colors = [
      'bg-amber-100 text-amber-950 border-amber-300',
      'bg-blue-100 text-blue-950 border-blue-300',
      'bg-emerald-100 text-emerald-950 border-emerald-300',
      'bg-purple-100 text-purple-950 border-purple-300'
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomAngle = Math.random() * 6 - 3; // -3 to 3 deg

    const newNote = {
      id: `st-new-${Date.now()}`,
      text: stickyBrainDump.trim(),
      color: randomColor,
      angle: randomAngle
    };

    setStickies([...stickies, newNote]);
    setStickyBrainDump('');
    appendTimelineEvent('creation', `Brainstorm note added to margins: "${newNote.text.slice(0, 25)}..."`);
  };

  const handleDiscardSticky = (id: string) => {
    setStickies(stickies.filter(s => s.id !== id));
  };

  // DYNAMIC COMPUTE METRICS for the Decision Radar
  const validationProgress = useMemo(() => {
    const validated = assumptions.filter(a => a.status === 'validated').length;
    return Math.round((validated / assumptions.length) * 100);
  }, [assumptions]);

  const alignmentScore = useMemo(() => {
    if (auditReport && typeof auditReport.score === 'number') {
      return auditReport.score;
    }

    let base = 100;
    const unstruckCount = forbiddenFeatures.filter(f => !f.struck).length;
    base -= (unstruckCount * 6);

    const flatContent = cards.map(c => c.content.toLowerCase()).join(' ') + ' ' + 
                        stickies.map(s => s.text.toLowerCase()).join(' ') + ' ' +
                        stickyBrainDump.toLowerCase();
    const redFlagWords = ['chatbot', 'ai chat', 'database', 'social', 'dashboard', 'analytics', 'postgres', 'mongo', 'sql', 'auth', 'login', 'feed', 'notification'];
    
    redFlagWords.forEach(word => {
      if (flatContent.includes(word)) {
        base -= 8;
      }
    });

    return Math.max(20, base);
  }, [forbiddenFeatures, cards, stickies, stickyBrainDump, auditReport]);

  const driftRisk = useMemo(() => {
    if (alignmentScore >= 85) return { text: 'Low 🌿', color: 'text-emerald-700 bg-emerald-50 border-emerald-300' };
    if (alignmentScore >= 65) return { text: 'Moderate ⚠️', color: 'text-amber-700 bg-amber-50 border-amber-300' };
    return { text: 'Critical Danger 🚨', color: 'text-rose-700 bg-rose-50 border-rose-300' };
  }, [alignmentScore]);

  const complexityLevel = useMemo(() => {
    // Complexity grows as total cards increase
    const count = cards.length;
    if (count <= 4) return { text: '2 / 10 (Lightweight)', color: 'text-emerald-700' };
    if (count <= 6) return { text: '5 / 10 (Moderate)', color: 'text-amber-700' };
    return { text: '8 / 10 (Over-engineered)', color: 'text-rose-700 animate-pulse font-black' };
  }, [cards]);

  // COLOR THEMES BASED ON ACTIVE CONCEPTID
  const getWorkspaceStyles = () => {
    switch (conceptId) {
      case 'A': // Notebook theme
        return {
          wrapper: 'bg-[#FAF6EC] text-charcoal',
          paper: 'bg-[#FFFDF4] border-charcoal/15 shadow-notebook',
          pencilText: 'font-hand font-medium text-charcoal/90 text-sm md:text-base',
          ruledLine: 'bg-ruled-paper',
          borderAccent: 'border-2 border-charcoal',
          headerBg: 'bg-[#FFF9EA] border-b-2 border-charcoal'
        };
      case 'B': // Sandbox theme
        return {
          wrapper: 'bg-[#FCF8E9] text-[#2C2B24]',
          paper: 'bg-white border-2 border-charcoal rounded-3xl shadow-sandbox-card',
          pencilText: 'font-sans font-medium text-[#2C2B24] text-xs md:text-sm',
          ruledLine: 'bg-dot-matrix',
          borderAccent: 'border-3 border-charcoal',
          headerBg: 'bg-[#FFFDF4] border-b-3 border-charcoal'
        };
      case 'C': // Workshop Blueprint
        return {
          wrapper: 'bg-[#F9FAF2] text-[#23395B]',
          paper: 'bg-white border-2 border-[#3E424B] shadow-sm',
          pencilText: 'font-mono text-xs text-[#23395B]',
          ruledLine: 'bg-graph-grid',
          borderAccent: 'border-2 border-[#3E424B]',
          headerBg: 'bg-gradient-to-r from-white to-[#F0F2EB] border-b-2 border-[#3E424B]'
        };
    }
  };

  const styles = getWorkspaceStyles();

  // Dynamic advice from a Margins Product Strategist, based on current alignment and status
  const marginsCoachTips = [
    { text: "Are we sure about the Success Metric? It must strictly measure value validated, not code completed.", source: "Anti-Drift Guardian" },
    { text: "Avoid standard signups on Day 1. Simple checkout with temporary token access is 10x faster.", source: "Challenger Coach" },
    { text: "Your insight must stand out. A simple text workflow on landing pages often converts higher than deep features.", source: "Founder Mind Model" }
  ];

  return (
    <div className={`w-full min-h-screen p-1 md:p-4 rounded-3xl overflow-hidden ${styles.wrapper} select-none`}>
      
      {/* 1. Header Area: Tactile notebook spine/header */}
      <div className={`p-4 md:p-6 mb-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${styles.headerBg} ${styles.borderAccent} shadow-sm relative overflow-hidden`}>
        {/* Binder spiral rings mockups to anchor the paper metaphor */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-charcoal/10 flex justify-around px-8 items-center pointer-events-none select-none">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="w-3.5 h-4 bg-charcoal rounded-b-sm shadow-md opacity-20 transform -translate-y-1.5" />
          ))}
        </div>

        <div className="space-y-1 mt-1">
          <div className="flex flex-wrap items-center gap-2">
            {onBackToLibrary && (
              <button
                type="button"
                onClick={onBackToLibrary}
                className="flex items-center gap-1 bg-notebook-crimson text-white hover:bg-neutral-800 rounded px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 cursor-pointer mr-1"
                id="workspace-back-button"
              >
                <span>← Back to Shelf</span>
              </button>
            )}
            <span className="font-mono text-[9px] bg-notebook-crimson text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              ACTIVE BLUEPRINT CANVAS
            </span>
            <span className="font-mono text-[10px] text-zinc-500 uppercase">
              • Concept {conceptId} Space
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-black text-charcoal flex items-center gap-2">
            📓 {activeStartupName} <span className="text-xs font-mono font-medium text-pencil-gray/70">/ founder_thinking_notebook_v1</span>
          </h2>
        </div>

        {/* Global Action Tools */}
        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-between border-t md:border-t-0 border-charcoal/10 pt-3 md:pt-0">
          <div className="flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-notebook-crimson animate-pulse" />
            <span className="font-mono text-xs font-extrabold text-[#943F3F]">
              CO-FOUNDER CRITIQUE ENGAGED
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              // Export Simulation
              alert(`Exporting ${activeStartupName} Product Constitution as high-focus raw blueprint... `);
              appendTimelineEvent('milestone', `Compiled and exported complete Constitution draft.`);
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-charcoal hover:bg-neutral-800 text-white rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Export Specs</span>
          </button>
        </div>
      </div>

      {/* THREE PANEL STRUCTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ==============================================
            LEFT PANEL: Project Brain (Founder registers)
            ============================================== */}
        <div className={`lg:col-span-3 space-y-4`}>
          <div className={`bg-white rounded-2xl p-4 ${styles.borderAccent} shadow-sm relative overflow-hidden`}>
            {/* Paper clip ornament */}
            <div className="absolute top-2 right-4 transform rotate-12 z-20 opacity-40">
              <span className="text-lg">📎</span>
            </div>

            <div className="border-b border-charcoal/10 pb-3 mb-4 space-y-1">
              <h3 className="text-sm font-mono font-black text-charcoal uppercase tracking-widest flex items-center gap-2">
                🧠 Project Brain
              </h3>
              <p className="text-[10px] text-pencil-gray font-sans select-text">
                Your structured system-of-intent. Click components to review tactical assumptions and boundaries.
              </p>
            </div>

            {/* Accordion List to act as interactive Brain Navigation */}
            <div className="space-y-2.5">
              
              {/* Brain Section: Vision Statement */}
              <div 
                onClick={() => setActiveBrainSection('vision')}
                className={`p-3 rounded-xl border border-charcoal/15 cursor-pointer transition-all ${
                  activeBrainSection === 'vision' 
                    ? 'bg-notebook-yellow/35 border-notebook-crimson shadow-sm' 
                    : 'bg-white hover:bg-charcoal/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-sans flex items-center gap-2 text-charcoal">
                    🎯 Primary Concept Vision
                  </span>
                  <span className={`w-2 h-2 rounded-full ${activeBrainSection === 'vision' ? 'bg-notebook-crimson' : 'bg-transparent'}`} />
                </div>
                {activeBrainSection === 'vision' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-3.5 space-y-2 font-sans text-xs text-charcoal/95 border-t border-dashed border-charcoal/10 mt-2"
                  >
                    <p className="italic leading-relaxed font-semibold">
                      "{activeStartupName} eliminates standard startup over-engineering."
                    </p>
                    <div className="flex items-center gap-1.5 text-[9px] text-[#A33434] font-mono mt-1 font-black">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Bespoke focus locked in SETUP onboarding</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Brain Section: Assumptions List (Highly interactive) */}
              <div 
                onClick={() => setActiveBrainSection('assumptions')}
                className={`p-3 rounded-xl border border-charcoal/15 cursor-pointer transition-all ${
                  activeBrainSection === 'assumptions' 
                    ? 'bg-notebook-yellow/35 border-notebook-crimson shadow-sm' 
                    : 'bg-white hover:bg-charcoal/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-sans flex items-center gap-2 text-charcoal">
                    ⏱️ Assumptions Matrix ({assumptions.filter(a => a.status === 'validated').length}/{assumptions.length})
                  </span>
                  <span className={`w-2 h-2 rounded-full ${activeBrainSection === 'assumptions' ? 'bg-notebook-crimson' : 'bg-transparent'}`} />
                </div>
                {activeBrainSection === 'assumptions' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-3.5 space-y-3 font-sans text-xs text-charcoal border-t border-dashed border-charcoal/10 mt-2"
                  >
                    <p className="text-[10px] text-pencil-gray font-sans">
                      Test these before writing code. Flag their status below to dynamically update your Validation Progress:
                    </p>
                    <div className="space-y-2.5">
                      {assumptions.map((asm) => (
                        <div key={asm.id} className="p-2 bg-white/70 rounded-lg border border-charcoal/10 space-y-1.5">
                          <span className="text-xs font-sans text-charcoal leading-relaxed font-semibold block select-text">
                            - {asm.text}
                          </span>
                          <div className="flex items-center gap-1.5 self-start pt-1">
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleAssumption(asm.id, 'validated'); }}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-colors shrink-0 ${
                                asm.status === 'validated' ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-100 hover:bg-emerald-50 text-zinc-500'
                              }`}
                            >
                              Validated ✓
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleAssumption(asm.id, 'busted'); }}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-colors shrink-0 ${
                                asm.status === 'busted' ? 'bg-rose-100 text-rose-800' : 'bg-zinc-100 hover:bg-rose-50 text-zinc-500'
                              }`}
                            >
                              Busted ❌
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleAssumption(asm.id, 'unvalidated'); }}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-colors shrink-0 ${
                                asm.status === 'unvalidated' ? 'bg-amber-100 text-amber-800' : 'bg-zinc-100 hover:bg-amber-50 text-zinc-500'
                              }`}
                            >
                              Pending ⏳
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Brain Section: MVP Bounds Checked Limits */}
              <div 
                onClick={() => setActiveBrainSection('mvp')}
                className={`p-3 rounded-xl border border-charcoal/15 cursor-pointer transition-all ${
                  activeBrainSection === 'mvp' 
                    ? 'bg-notebook-yellow/35 border-notebook-crimson shadow-sm' 
                    : 'bg-white hover:bg-charcoal/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-sans flex items-center gap-2 text-charcoal">
                    🛑 Hard Scope Core Limits
                  </span>
                  <span className={`w-2 h-2 rounded-full ${activeBrainSection === 'mvp' ? 'bg-notebook-crimson' : 'bg-transparent'}`} />
                </div>
                {activeBrainSection === 'mvp' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-3.5 space-y-2 font-sans text-xs text-charcoal border-t border-dashed border-charcoal/10 mt-2"
                  >
                    <p className="text-[10px] text-pencil-gray font-sans mb-2">
                      Rigid architectural gates designed by the Sandbox system to stop feature creep at the roots:
                    </p>
                    <div className="space-y-2">
                      {mvpChecks.map(item => (
                        <label 
                          key={item.id} 
                          onClick={(e) => e.stopPropagation()} 
                          className="flex items-start gap-2 p-1.5 rounded hover:bg-white/40 cursor-pointer text-[11px]"
                        >
                          <input 
                            type="checkbox" 
                            checked={item.checked} 
                            onChange={() => toggleMvpCheck(item.id)}
                            className="mt-0.5 rounded text-notebook-crimson focus:ring-notebook-crimson border-charcoal/35"
                          />
                          <span className={item.checked ? 'line-through text-pencil-gray leading-tight' : 'text-charcoal leading-tight font-semibold'}>
                            {item.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Brain Section: Roadmap Flow */}
              <div 
                onClick={() => setActiveBrainSection('roadmap')}
                className={`p-3 rounded-xl border border-charcoal/15 cursor-pointer transition-all ${
                  activeBrainSection === 'roadmap' 
                    ? 'bg-notebook-yellow/35 border-notebook-crimson shadow-sm' 
                    : 'bg-white hover:bg-charcoal/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-sans flex items-center gap-2 text-charcoal">
                    🗺️ Product Milestones
                  </span>
                  <span className={`w-2 h-2 rounded-full ${activeBrainSection === 'roadmap' ? 'bg-notebook-crimson' : 'bg-transparent'}`} />
                </div>
                {activeBrainSection === 'roadmap' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-3.5 space-y-2 border-t border-dashed border-charcoal/10 mt-2"
                  >
                    <div className="space-y-2.5 pl-2 border-l border-notebook-crimson/30">
                      <div className="relative">
                        <div className="absolute -left-[12.5px] top-1 w-2.5 h-2.5 rounded-full bg-notebook-crimson border border-white" />
                        <h4 className="text-xs font-bold text-charcoal">Milestone 1: Clean Blueprint Mock</h4>
                        <p className="text-[10px] text-pencil-gray leading-tight">Map problems and customer tribe lists in the offline journal.</p>
                      </div>
                      <div className="relative opacity-65">
                        <div className="absolute -left-[12.5px] top-1 w-2.5 h-2.5 rounded-full bg-charcoal border border-white" />
                        <h4 className="text-xs font-bold text-charcoal">Milestone 2: Seed Verification Access</h4>
                        <p className="text-[10px] text-pencil-gray leading-tight">Launch a single clean static layout to capture early intention.</p>
                      </div>
                      <div className="relative opacity-40">
                        <div className="absolute -left-[12.5px] top-1 w-2.5 h-2.5 rounded-full bg-charcoal border border-white" />
                        <h4 className="text-xs font-bold text-charcoal">Milestone 3: First Ten Dollars</h4>
                        <p className="text-[10px] text-pencil-gray leading-tight">Validate willingness to commit with instant value delivery loop.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Brain Section: Strategic Decision Registry */}
              <div 
                onClick={() => setActiveBrainSection('decisions')}
                className={`p-3 rounded-xl border border-charcoal/15 cursor-pointer transition-all ${
                  activeBrainSection === 'decisions' 
                    ? 'bg-notebook-yellow/35 border-notebook-crimson shadow-sm' 
                    : 'bg-white hover:bg-charcoal/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-sans flex items-center gap-2 text-charcoal">
                    🛡️ Log Quick Pivot Choice
                  </span>
                  <span className={`w-2 h-2 rounded-full ${activeBrainSection === 'decisions' ? 'bg-notebook-crimson' : 'bg-transparent'}`} />
                </div>
                {activeBrainSection === 'decisions' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-3.5 space-y-3.5 border-t border-dashed border-charcoal/10 mt-2"
                  >
                    <form onSubmit={handlePostTimelinePivot} onClick={(e) => e.stopPropagation()} className="space-y-2">
                      <label className="text-[9px] font-mono text-zinc-500 uppercase block">Add a direct custom strategic constraint/pivot:</label>
                      <input 
                        type="text"
                        placeholder="e.g., Removed the payment processor, replaced with direct buy links"
                        value={newTimelineText}
                        onChange={(e) => setNewTimelineText(e.target.value)}
                        className="w-full text-xs p-2 bg-notebook-yellow/10 border border-charcoal/25 rounded outline-none placeholder-zinc-400 font-sans"
                      />
                      <button 
                        type="submit"
                        disabled={!newTimelineText.trim()}
                        className="w-full bg-charcoal text-white text-[10px] font-mono font-bold uppercase py-1.5 rounded shadow-sm disabled:opacity-40"
                      >
                        ✓ Stamp into Timeline
                      </button>
                    </form>
                  </motion.div>
                )}
              </div>

            </div>

          </div>

          {/* 🔑 BYOK STRATEGIC AI ENGINE CORE */}
          <div className="bg-[#FFFDF4] rounded-2xl p-4 border-2 border-charcoal shadow-sm space-y-3.5 relative overflow-hidden transform rotate-[0.5deg]">
            {/* Hand Drawn binder ring */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-notebook-crimson/10 flex justify-around px-4 pointer-events-none" />
            
            <div className="border-b border-charcoal/10 pb-1.5 flex items-center justify-between">
              <h4 className="text-xs font-mono font-black text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                🔑 BYOK Strategic AI Core
              </h4>
              <span className={`w-2.5 h-2.5 rounded-full ${byokApiKey ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
            </div>

            <div className="space-y-2 text-xs">
              {byokApiKey ? (
                <div className="bg-[#EDFDF1] border border-emerald-300 p-2.5 rounded-lg space-y-1">
                  <div className="flex justify-between items-center text-[9px] font-mono text-emerald-800 font-extrabold uppercase">
                    <span>● Engine Active</span>
                    <span>{byokProvider.toUpperCase()}</span>
                  </div>
                  <p className="text-[10px] font-sans text-emerald-900 leading-relaxed">
                    Live Anti-Drift checks are active using your secure browser-direct key. No request passes our servers!
                  </p>
                  <div className="flex items-center gap-2 pt-1 border-t border-emerald-200/50 mt-1">
                    <button
                      type="button"
                      onClick={() => setIsConfiguringKey(true)}
                      className="text-[9px] font-mono text-emerald-700 hover:underline font-bold"
                    >
                      Configure Settings
                    </button>
                    <span className="text-emerald-300 text-[9px] font-mono">|</span>
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem('sandboxer_byok_api_key');
                        setByokApiKey('');
                        setAuditReport(null);
                        appendTimelineEvent('correction', 'Deactivated live BYOK AI key. Switched back to high-fidelity Local preset models.');
                      }}
                      className="text-[9px] font-mono text-rose-700 hover:underline font-bold"
                    >
                      Disconnect Key
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50/50 border border-amber-200 p-2.5 rounded-lg text-[10.5px] space-y-1.5 leading-relaxed text-charcoal">
                  <p className="font-bold text-amber-900 flex items-center gap-1">
                    <span>○ Offline/Local Simulation Mode</span>
                  </p>
                  <p className="text-[10px] text-pencil-gray">
                    Get instant simulated alignment feedback. Input your private endpoint key to unleash customized living strategy critiques!
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsConfiguringKey(true)}
                    className="text-[9.5px] font-mono bg-charcoal hover:bg-neutral-800 text-white font-black uppercase px-2.5 py-1 rounded shadow-sm cursor-pointer"
                  >
                    Setup API Key
                  </button>
                </div>
              )}

              {apiErrorMessage && (
                <div className="p-2 bg-red-50 border border-red-200 text-red-800 text-[10px] font-sans rounded-lg">
                  ⚠️ <strong>Error:</strong> {apiErrorMessage}
                </div>
              )}

              {isConfiguringKey && (
                <div className="p-3 bg-white border border-charcoal/25 rounded-xl space-y-2.5 transform -rotate-1 shadow-md">
                  <div className="flex justify-between items-center text-[9px] font-mono uppercase font-black border-b border-charcoal/5 pb-1">
                    <span>Configure Secure Key</span>
                    <button type="button" onClick={() => setIsConfiguringKey(false)} className="text-pencil-gray hover:text-charcoal">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[8.5px] font-mono text-pencil-gray uppercase block font-bold">Select AI Provider:</label>
                    <select
                      value={byokProvider}
                      onChange={(e) => {
                        const p = e.target.value;
                        setByokProvider(p);
                        localStorage.setItem('sandboxer_byok_provider', p);
                        let def = 'gemini-3.5-flash';
                        if (p === 'openai') def = 'gpt-4o-mini';
                        if (p === 'anthropic') def = 'claude-3-5-sonnet-20241022';
                        if (p === 'deepseek') def = 'deepseek-chat';
                        setByokModel(def);
                        localStorage.setItem('sandboxer_byok_model', def);
                      }}
                      className="w-full text-xs p-1 bg-[#FFFDF9] border border-charcoal/25 rounded font-sans"
                    >
                      <option value="gemini">Google Gemini API</option>
                      <option value="openai">OpenAI API</option>
                      <option value="deepseek">DeepSeek API (Fast)</option>
                      <option value="anthropic">Anthropic Claude</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8.5px] font-mono text-pencil-gray uppercase block font-bold">Private API Key:</label>
                    <input
                      type="password"
                      placeholder={`Enter your secure ${byokProvider} key...`}
                      value={byokApiKey}
                      onChange={(e) => {
                        const k = e.target.value;
                        setByokApiKey(k);
                        localStorage.setItem('sandboxer_byok_api_key', k);
                      }}
                      className="w-full text-xs p-1 bg-[#FFFDF9] border border-charcoal/25 rounded font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8.5px] font-mono text-pencil-gray uppercase block font-bold">Model Name / Alias:</label>
                    <input
                      type="text"
                      placeholder="e.g. model path"
                      value={byokModel}
                      onChange={(e) => {
                        const m = e.target.value;
                        setByokModel(m);
                        localStorage.setItem('sandboxer_byok_model', m);
                      }}
                      className="w-full text-xs p-1 bg-[#FFFDF9] border border-charcoal/25 rounded font-sans font-mono"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsConfiguringKey(false);
                      if (byokApiKey) {
                        appendTimelineEvent('milestone', `Successfully saved secure credential endpoints for [${byokProvider.toUpperCase()}]`);
                      }
                    }}
                    className="w-full bg-notebook-crimson hover:bg-neutral-800 text-white font-mono text-[9px] font-bold uppercase py-1.5 rounded shadow-sm cursor-pointer transition-colors"
                  >
                    ✓ Save Key Settings
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Brain Dump Sticky Note interface (spawn notes directly in margin!) */}
          <div className="bg-[#FFFCEE] p-4 rounded-2xl border-2 border-charcoal shadow-sm space-y-3">
            <h4 className="text-xs font-mono font-bold text-charcoal uppercase tracking-wider block">
              💡 Spark Margin Post-It
            </h4>
            <form onSubmit={handleSpawnStickyNote} className="space-y-2">
              <textarea 
                placeholder="Spit-shine a wild brainstorm annotation... e.g. What if we do a 2-click payout system?"
                value={stickyBrainDump}
                onChange={(e) => setStickyBrainDump(e.target.value)}
                className="w-full text-xs font-hand h-16 p-2 bg-white/70 border border-charcoal/15 rounded-lg outline-none resize-none leading-relaxed text-charcoal placeholder-neutral-400 font-bold"
              />
              <button 
                type="submit"
                disabled={!stickyBrainDump.trim()}
                className="w-full bg-notebook-crimson text-white text-[9px] font-mono font-bold uppercase py-1.5 rounded-lg hover:bg-red-800 disabled:opacity-40 transition-colors"
              >
                + Stick to Notebook Margin
              </button>
            </form>
          </div>

        </div>

        {/* ==============================================
            CENTER PANEL: Today's Focus, Product Map, Timeline
            ============================================== */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* TODAY'S FOCUS: Heart of the Workspace */}
          <div className={`p-4 md:p-6 ${styles.paper} relative overflow-hidden transition-all duration-300`}>
            {/* Ruled lines pattern underlying Today's Focus */}
            <div className={`absolute inset-0 ${styles.ruledLine} opacity-[0.06] pointer-events-none select-none`} />

            {/* Notebook Margin Line */}
            <div className="absolute top-0 bottom-0 left-4 md:left-8 w-[1px] bg-red-400/40 pointer-events-none select-none" />

            {/* Inner Content */}
            <div className="relative z-10 pl-4 md:pl-8 space-y-4">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-charcoal/15 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-notebook-crimson animate-ping" />
                  <span className="font-mono text-xs font-black tracking-widest text-[#A33434] uppercase">
                    ☄️ Today's Focus Checkpoint
                  </span>
                </div>
                
                {/* Question switcher tabs */}
                <div className="flex items-center gap-1.5">
                  {focusQuestions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentQuestionIndex(i)}
                      className={`w-5 h-5 rounded-full text-[9px] font-mono font-bold flex items-center justify-center border transition-all ${
                        currentQuestionIndex === i 
                          ? 'bg-charcoal text-white border-charcoal' 
                          : 'bg-white hover:bg-neutral-100 border-charcoal/20 text-charcoal'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* ACTIVE STRATEGIC UNRESOLVED QUESTION */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase bg-notebook-yellow/40 px-2 py-0.5 rounded text-charcoal/80">
                  CRITICAL HOOK: {focusQuestions[currentQuestionIndex].type.toUpperCase()} BLOCKER
                </span>
                
                <h3 className="text-base md:text-lg font-serif font-black text-charcoal leading-snug select-text">
                  "{focusQuestions[currentQuestionIndex].question}"
                </h3>
                
                <p className="text-xs text-pencil-gray font-sans italic leading-relaxed">
                  💡 Hint: {focusQuestions[currentQuestionIndex].hint}
                </p>
              </div>

              {/* Hand-written interactive answering notepad */}
              <div className="bg-[#FFFDF4] border-2 border-dashed border-charcoal/30 rounded-xl p-3 md:p-4 mt-3 relative transform rotate-[-0.5deg]">
                <form onSubmit={handleAnswerSubmit} className="space-y-3">
                  <span className="text-[9px] font-mono text-notebook-crimson font-bold block uppercase tracking-wider">
                     FOUNDER ANSWER PAD (INK YOUR THOUGHTS):
                  </span>
                  
                  <textarea
                    placeholder="Type your strategic conclusion directly into the thinking log..."
                    value={currentAnswerText}
                    onChange={(e) => setCurrentAnswerText(e.target.value)}
                    className="w-full bg-transparent border-none placeholder-zinc-300 resize-none h-24 md:h-28 outline-none text-sm md:text-base font-hand font-bold leading-relaxed text-charcoal"
                  />

                  <div className="flex justify-between items-center pt-2 border-t border-charcoal/5">
                    <span className="font-mono text-[9px] text-pencil-gray/60 italic">
                      *inking this spawns a strategy node inside your blueprint
                    </span>
                    
                    <button
                      type="submit"
                      disabled={!currentAnswerText.trim()}
                      className="px-4 py-2 bg-notebook-yellow hover:bg-amber-300 border-2 border-charcoal rounded-lg font-mono text-[10px] font-bold text-charcoal uppercase tracking-wider transition-all hover:translate-y-[-1px] cursor-pointer disabled:opacity-40"
                    >
                      Ink as Strategy Node ✓
                    </button>
                  </div>
                </form>
              </div>

              {/* Answers history margin checklist */}
              {Object.keys(savedFocusAnswers).length > 0 && (
                <div className="space-y-2 pt-2 border-t border-charcoal/10">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                    📝 RECORDED DECISION ANCHORS:
                  </span>
                  <div className="space-y-2">
                    {focusQuestions.map((q) => {
                      const answer = savedFocusAnswers[q.id];
                      if (!answer) return null;
                      return (
                        <div key={q.id} className="text-xs bg-[#FFFDEE] border border-charcoal/10 p-2.5 rounded-lg font-sans space-y-1">
                          <span className="font-bold text-charcoal text-[11px] block">
                            Q: {q.question}
                          </span>
                          <p className="font-hand font-bold text-sm text-[#A33434] pl-2 select-text">
                            ✏️ "{answer}"
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* 🔄 VISION-DRIVEN FUNCTION REVERSE-ENGINEERING CONSOLE */}
          <div className="bg-white rounded-2xl p-5 border-2 border-charcoal shadow-sm space-y-4 relative overflow-hidden transform rotate-[-0.5deg]">
            <div className="absolute top-1 right-2 bg-charcoal/5 px-2 py-0.5 rounded font-mono text-[8px] uppercase text-pencil-gray">
              Vision Pruner Core
            </div>

            <div className="border-b border-charcoal/10 pb-2.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4.5 h-4.5 text-amber-500 animate-spin-slow" />
                <span className="font-mono text-xs font-black tracking-wider text-notebook-crimson uppercase">
                  🔄 Vision-Driven Function Reverse-Engineering
                </span>
              </div>
              <p className="text-[11px] text-pencil-gray font-sans mt-1">
                Enter an ambitious or bloated product idea. SandBoxer will auto-peel the features list down to a hyper-lean 7-day validation path and generate its Sacred Constitution.
              </p>
            </div>

            <textarea
              placeholder="Describe your grandiose design (e.g. 'Build an AI real-estate matchmaking app with real-time video tours, double-entry Stripe ledgers, built-in chatrooms, custom email databases...')"
              value={customVisionInput}
              onChange={(e) => setCustomVisionInput(e.target.value)}
              className="w-full text-xs p-3 bg-[#FFFDF7] border border-charcoal/25 rounded-xl h-20 font-sans text-charcoal outline-none placeholder-zinc-300 resize-none leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="text-[9.5px] font-mono text-pencil-gray/70 italic">
                *BYOK key connects live providers
              </span>
              <button
                type="button"
                onClick={handlePruneGrandVision}
                disabled={isPruningVision || !customVisionInput.trim()}
                className="px-3 py-1.5 bg-charcoal hover:bg-neutral-800 disabled:opacity-45 text-white rounded font-mono text-[9.5px] font-bold uppercase cursor-pointer flex items-center gap-1.5"
              >
                {isPruningVision ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Pruning Idea...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Run Reverse-Engineering</span>
                  </>
                )}
              </button>
            </div>

            {/* Display Pruning Result inline */}
            {pruningResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-amber-50/40 border border-charcoal/20 rounded-xl space-y-3"
              >
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-black text-charcoal block">🎯 Pruned Validation Goal (7-Day MVP):</span>
                    <p className="font-serif italic text-charcoal leading-relaxed pl-2 bg-white/50 p-1.5 rounded border border-charcoal/5 mt-1 select-text">
                      "{pruningResult.mvpGoal}"
                    </p>
                  </div>

                  <div>
                    <span className="font-black text-charcoal block">🚫 Auto-Generated Sacred Forbidden Feature Bounds:</span>
                    <ul className="list-disc pl-5 mt-1 text-[#A33434] space-y-1 font-sans text-[11px]">
                      {pruningResult.forbiddenFeatures.map((ft, idx) => (
                        <li key={idx} className="select-text">{ft}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-black text-[#324D28] block">⚖️ Strategic Directives:</span>
                    <ul className="list-decimal pl-5 mt-1 text-[#3B4D31] space-y-1 font-sans text-[11px]">
                      {pruningResult.directives.map((dr, idx) => (
                        <li key={idx} className="select-text">{dr}</li>
                      ))}
                    </ul>
                  </div>

                  {pruningResult.challengePrompt && (
                    <div className="p-2.5 bg-[#FFFCE3] border border-dashed border-amber-300 rounded-lg text-[11px] text-amber-950 font-sans leading-relaxed select-text">
                      <strong>🥊 Anti-Drift Challenge Prompt:</strong> "{pruningResult.challengePrompt}"
                    </div>
                  )}

                  <div className="pt-2 border-t border-charcoal/5">
                    <button
                      type="button"
                      onClick={handleApplyPruningResult}
                      className="w-full bg-notebook-crimson hover:bg-neutral-800 text-white font-mono text-[9px] font-black uppercase py-2 rounded shadow-md cursor-pointer transition-all active:translate-y-[1px]"
                    >
                      ✓ Override Active Constitution Rules & Overwrite Workspace Limits
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* ACTIVE CARDS: Render the dynamic strategy blueprint cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-2">
              <span className="font-mono text-xs font-black text-charcoal uppercase">
                ⚙️ Blueprinted Strategy Cards ({cards.length})
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onAddCard('mvp')}
                  className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-[#FFFDF4] border border-charcoal text-charcoal rounded font-mono text-[9px] font-bold uppercase cursor-pointer"
                >
                  + Spawn MVP Node
                </button>
                <button
                  type="button"
                  onClick={() => onAddCard('user')}
                  className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-[#FFFDF4] border border-charcoal text-charcoal rounded font-mono text-[9px] font-bold uppercase cursor-pointer"
                >
                  + Tribe Node
                </button>
              </div>
            </div>

            {cards.length === 0 ? (
              <div className="bg-white/40 border-2 border-dashed border-charcoal/20 p-8 rounded-2xl text-center">
                <p className="text-xs text-pencil-gray font-sans">No strategy cards active. Answer focus questions to auto-spawn cards!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cards.map((card, i) => {
                  const rotatedDeg = i % 2 === 0 ? '-rotate-0.5' : 'rotate-0.5';
                  return (
                    <motion.div
                      key={card.id || i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-[#FFFDF3] p-4 rounded-xl border-2 border-charcoal shadow-sm space-y-3 relative overflow-hidden flex flex-col justify-between ${rotatedDeg}`}
                    >
                      {/* Paperclip sticker mock */}
                      <div className="absolute top-1 left-4 w-6 h-1.5 bg-notebook-crimson/15 transform -rotate-12 select-none pointer-events-none" />
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border-b border-charcoal/5 pb-1">
                          <span className="text-[9px] font-mono uppercase font-black text-notebook-crimson">
                            #{card.type} block
                          </span>
                          <button
                            type="button"
                            onClick={() => onDeleteCard(card.id)}
                            className="text-pencil-gray hover:text-red-600 transition-colors"
                            title="Prune this node"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <input 
                          type="text"
                          value={card.title}
                          onChange={(e) => {
                            // Let parents update if they support custom title, or simple UI representation
                          }}
                          className="font-serif font-black text-sm text-charcoal bg-transparent border-none outline-none focus:ring-0 p-0 w-full"
                        />

                        <textarea
                          rows={3}
                          value={card.content}
                          onChange={(e) => onUpdateCard(card.id, e.target.value)}
                          className="w-full bg-transparent border-none outline-none focus:ring-0 resize-none font-sans text-xs text-charcoal/90 leading-relaxed p-0 selection:bg-notebook-yellow/40"
                          placeholder="Flesh out critical tactical variables here..."
                        />
                      </div>

                      <div className="pt-2 border-t border-charcoal/5 flex justify-between items-center text-[9px] font-mono text-pencil-gray/70">
                        <span>Status: <strong className="text-emerald-700 uppercase">{card.status || 'Active'}</strong></span>
                        <span>✏️ click lines to rewrite</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* PRODUCT MAP: Living Blueprint of Strategy */}
          <div className="bg-white rounded-2xl p-4 md:p-5 border-2 border-charcoal shadow-sm space-y-3.5 relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-charcoal/10 pb-2">
              <div className="space-y-0.5">
                <span className="font-mono text-[9px] text-notebook-crimson font-black uppercase block">
                  🎨 EVOLUTION VISUAL BOARD
                </span>
                <h4 className="text-xs font-mono font-bold text-charcoal uppercase tracking-wide">
                  Living Product Blueprint Map
                </h4>
              </div>
              <span className="text-[10px] font-mono text-pencil-gray bg-charcoal/5 px-2 py-0.5 rounded">
                Evolving in Realtime
              </span>
            </div>

            {/* Simulated Hand-Drawn Road Map */}
            <div className="min-h-[146px] relative rounded-xl border border-charcoal/10 bg-[#FAF9F5] p-3 overflow-hidden flex flex-col justify-around">
              {/* Connected guide vector stroke path */}
              <div className="absolute top-[52%] left-10 right-10 h-[2px] border-b-2 border-dashed border-charcoal/20 z-0" />
              
              <div className="grid grid-cols-5 gap-1.5 z-10 relative">
                
                {/* Node 1 */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-charcoal flex items-center justify-center text-sm shadow-sm">
                    💡
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono font-bold uppercase text-emerald-800">Spark Node</span>
                    <p className="text-[8px] text-pencil-gray leading-none">Concept Locked</p>
                  </div>
                </div>

                {/* Node 2 */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`w-10 h-10 rounded-full border-2 border-charcoal flex items-center justify-center text-sm shadow-sm transition-all ${
                    savedFocusAnswers['fq-1'] ? 'bg-emerald-100' : 'bg-amber-50 animate-pulse'
                  }`}>
                    👥
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono font-bold uppercase text-charcoal">Tribe Capture</span>
                    <p className="text-[8px] text-pencil-gray leading-none">
                      {savedFocusAnswers['fq-1'] ? 'Completed ✓' : 'Resolving Focus'}
                    </p>
                  </div>
                </div>

                {/* Node 3 */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`w-10 h-10 rounded-full border-2 border-charcoal flex items-center justify-center text-sm shadow-sm ${
                    assumptions.some(a => a.status === 'validated') ? 'bg-emerald-100' : 'bg-neutral-100'
                  }`}>
                    ⚖️
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono font-bold uppercase text-charcoal">Assumption Gates</span>
                    <p className="text-[8px] text-pencil-gray leading-none">
                      {validationProgress > 0 ? `${validationProgress}% Validated` : 'Unvalidated'}
                    </p>
                  </div>
                </div>

                {/* Node 4 */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`w-10 h-10 rounded-full border-2 border-charcoal flex items-center justify-center text-sm shadow-sm ${
                    alignmentScore > 80 ? 'bg-[#FFFCDF]' : 'bg-neutral-100'
                  }`}>
                    🛑
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono font-bold uppercase text-charcoal">Discipline Wall</span>
                    <p className="text-[8px] text-pencil-gray leading-none">
                      Align: {alignmentScore}%
                    </p>
                  </div>
                </div>

                {/* Node 5 */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 border-2 border-charcoal flex items-center justify-center text-sm shadow-sm">
                    🪙
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono font-bold uppercase text-charcoal">First Dollar</span>
                    <p className="text-[8px] text-pencil-gray leading-none">Launch Target</p>
                  </div>
                </div>

              </div>
            </div>
            
            <p className="text-[10px] text-pencil-gray text-center font-sans">
              ℹ️ Nodes automatically illuminate as focus questions get solved and assumptions convert to validated.
            </p>
          </div>

          {/* FOUNDER TIMELINE: Replay the Thinking Evolution */}
          <div className="bg-white rounded-2xl p-4 md:p-5 border-2 border-charcoal shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-charcoal/10 pb-2">
              <History className="w-4 h-4 text-notebook-crimson" />
              <h4 className="text-xs font-mono font-bold text-charcoal uppercase tracking-wider">
                Founder Thinking Timeline & Record
              </h4>
            </div>

            <div className="space-y-3.5 max-h-[178px] overflow-y-auto pr-1">
              {timeline.map((event) => (
                <div key={event.id} className="flex gap-2.5 items-start text-xs text-charcoal">
                  <span className="font-mono text-[10px] text-notebook-crimson/70 font-semibold pt-0.5 select-none text-right w-10 shrink-0">
                    [{event.time}]
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[8px] font-mono uppercase font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        event.type === 'creation' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                        event.type === 'correction' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        event.type === 'pivot' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-charcoal/90 leading-normal pl-0.5 select-text">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* ==============================================
            RIGHT PANEL: Constitution Dock & Decision Radar
            ============================================== */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* CONSTITUTION DOCK: Locked Rules & Forbidden Feature Block */}
          <div className="bg-white rounded-2xl p-4 md:p-5 border-3 border-charcoal shadow-sandbox-card relative overflow-hidden">
            
            {/* Gravity system marker badge */}
            <div className="absolute top-0 right-0 bg-notebook-crimson text-white font-mono text-[8px] font-black uppercase px-2 py-1 tracking-wider z-10 rounded-bl-xl shadow-sm">
              GRAVITY CORE LOCKED
            </div>

            <div className="border-b-2 border-charcoal pb-2 mb-4">
              <span className="font-mono text-[9px] text-[#A33434] font-black uppercase block select-none">
                📕 LAUNCH SAFETY MECHANISM
              </span>
              <h3 className="text-sm font-serif font-black text-charcoal uppercase tracking-tight">
                Constitution Dock
              </h3>
            </div>

            <div className="space-y-4">
              
              {/* Success Metric Lock Block */}
              <div className="bg-[#FFFCEE] border-2 border-charcoal rounded-xl p-3 relative transform rotate-1 space-y-1">
                <span className="text-[8px] font-mono text-zinc-500 uppercase block font-bold">
                  🗝️ LOCKED SUCCESS checkpoint:
                </span>
                <span className="italic font-display font-bold text-xs text-notebook-crimson block select-text">
                  "Validate 5 actual paid customers under 7 days."
                </span>
              </div>

              {/* Core Principles */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">
                  ⚖️ Strategic Directives:
                </span>
                <ul className="space-y-1.5 pl-3 border-l-2 border-zinc-200 text-xs">
                  <li className="font-sans text-[11px] leading-relaxed text-charcoal select-text">
                    1. <strong>Value before scaffolds:</strong> Stop building server-side features until we collect upfront deposits.
                  </li>
                  <li className="font-sans text-[11px] leading-relaxed text-[#A33434] select-text">
                    2. <strong>Rigid constraint compliance:</strong> Adhere strictly to the co-founder challenge engine constraints.
                  </li>
                </ul>
              </div>

              {/* Forbidden Features Section with Strike Out Interaction */}
              <div className="space-y-2.5 pt-2 border-t border-charcoal/15">
                <div>
                  <span className="text-[10px] font-mono text-[#A33434] font-black uppercase tracking-wide block">
                    🚫 Forbidden Feature Wall
                  </span>
                  <p className="text-[9px] text-pencil-gray font-sans">
                    Actively pruning these items boosts your **Alignment Score** and drops complexity:
                  </p>
                </div>

                <div className="space-y-2">
                  {forbiddenFeatures.map((item, index) => (
                    <div 
                      key={index}
                      onClick={() => handleStrikeForbidden(index)}
                      className={`text-[10.5px] leading-snug p-2 rounded-lg border cursor-pointer transition-all flex items-start gap-2 ${
                        item.struck 
                          ? 'bg-zinc-50 border-zinc-200 text-zinc-400 line-through decoration-zinc-400 decoration-1' 
                          : 'bg-rose-50/50 hover:bg-rose-50 border-rose-200/50 text-[#852C32]'
                      }`}
                    >
                      <button 
                        type="button"
                        className="mt-0.5 text-zinc-500 hover:text-red-600 font-bold font-mono text-[9px] shrink-0"
                      >
                        {item.struck ? '[Struck]' : '[Prune]'}
                      </button>
                      <span className="font-sans select-text">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Environmental Constraints */}
              <div className="space-y-1 bg-[#F9FAF2] p-2.5 rounded-xl border border-charcoal/10 text-[10px] text-[#23395B]">
                <div className="flex items-center gap-1.5 font-bold font-mono">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#E05A47]" />
                  <span>ENVIRONMENT CONSTRAINTS:</span>
                </div>
                <span className="block font-mono mt-1 text-[9.5px]">
                  • Maximum of 30 total hours.
                </span>
                <span className="block font-mono text-[9.5px]">
                  • Zero external database API calls.
                </span>
              </div>

            </div>

          </div>

          {/* 🛡️ BOTTOM-LEVEL RULE SYSTEM LIVE AUDITOR */}
          <div className="bg-white rounded-2xl p-4 md:p-5 border-3 border-charcoal shadow-sandbox-card relative overflow-hidden transform rotate-[0.5deg]">
            <div className="border-b border-charcoal/10 pb-2 mb-2 flex justify-between items-center">
              <div className="space-y-0.5">
                <span className="font-mono text-[9px] text-zinc-500 block font-bold uppercase">
                  🛡️ SYSTEM SECURITY ENFORCED
                </span>
                <h4 className="text-xs font-mono font-bold text-charcoal uppercase tracking-wider">
                  Rule Integrity Auditor
                </h4>
              </div>
              <span className="text-[9px] font-mono text-pencil-gray bg-charcoal/5 px-2 py-0.5 rounded">
                Real-Time Check
              </span>
            </div>

            <p className="text-[10.5px] text-pencil-gray font-sans leading-relaxed select-text">
              Reviews active cards, sticky-notes, and custom brainstorm statements against constitutional barriers to intercept creep.
            </p>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleRunIntegrityAudit}
                disabled={isAuditingRules}
                className="w-full bg-[#FFFCE5] hover:bg-[#FFF9CC] border-2 border-charcoal text-charcoal font-mono text-[10px] font-black uppercase py-2 rounded-xl transition-all shadow-sm active:translate-y-[1px] cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isAuditingRules ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
                    <span>Auditing Lines...</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4 text-notebook-crimson animate-pulse" />
                    <span>Run Live Integrity Audit</span>
                  </>
                )}
              </button>

              {auditReport && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-2.5 pt-1.5"
                >
                  <div className="flex items-center justify-between border-t border-dashed border-charcoal/10 pt-2.5">
                    <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase">Integrity Score:</span>
                    <span className={`text-xs font-mono font-extrabold px-1.5 py-0.5 rounded ${
                      auditReport.score >= 80 ? 'bg-emerald-100 text-emerald-800' :
                      auditReport.score >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {auditReport.score}%
                    </span>
                  </div>

                  {/* Violations */}
                  {auditReport.violations && auditReport.violations.length > 0 ? (
                    <div className="bg-red-50/50 border border-red-200 p-2.5 rounded-lg space-y-1">
                      <span className="text-[9px] font-mono text-red-700 font-bold uppercase flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        CONSTITUTION BREACH WARNINGS:
                      </span>
                      <ul className="text-[10.5px] space-y-1 pl-3 font-sans list-disc text-red-950">
                        {auditReport.violations.map((v, i) => (
                          <li key={i} className="select-text">{v}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-[10.5px] text-emerald-900 leading-normal font-sans">
                      ✓ <strong>Compliant Sandbox:</strong> No active creeps. The product boundaries are strictly locked!
                    </div>
                  )}

                  {/* Cognitive Traps */}
                  {auditReport.traps && auditReport.traps.length > 0 && (
                    <div className="text-[10.5px] text-amber-950 bg-amber-50/30 border border-amber-200 p-2.5 rounded-lg space-y-1">
                      <span className="font-mono text-[8.5px] text-amber-800 font-bold uppercase block">⚠️ COGNITIVE DRIFT TRAPS:</span>
                      <ul className="list-disc pl-3.5 space-y-0.5">
                        {auditReport.traps.map((tr, idx) => (
                          <li key={idx} className="select-text">{tr}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Advisor Guidance */}
                  {auditReport.advice && (
                    <div className="p-2.5 bg-neutral-50 rounded-lg border border-charcoal/10 text-[10px] text-charcoal select-text">
                      <span className="font-mono text-[8.5px] text-[#A33434] font-black uppercase block border-b border-charcoal/5 pb-1 mb-1">
                        ⚓ ADVISOR RETROFIT REMEDY:
                      </span>
                      <p className="font-sans leading-normal italic">
                        "{auditReport.advice}"
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* DECISION RADAR: Alignment, Drift, Complexity */}
          <div className="bg-[#FFFDF6] rounded-2xl p-4 md:p-5 border-2 border-charcoal shadow-sm space-y-4">
            
            <div className="border-b border-charcoal/10 pb-2">
              <span className="font-mono text-[9px] text-[#A33434] font-black uppercase block">
                ⚡ LIVE RADAR METRICS
              </span>
              <h4 className="text-xs font-mono font-bold text-charcoal uppercase tracking-wider">
                Founder Decision Radar
              </h4>
            </div>

            <div className="space-y-3.5 text-xs text-charcoal">
              
              {/* Metric 1: Alignment Score */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold flex items-center gap-1">
                    🎯 Pitch Alignment Score
                  </span>
                  <span className={`font-mono font-black ${alignmentScore > 80 ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {alignmentScore}%
                  </span>
                </div>
                {/* Custom Hand Sketched styled progress bar */}
                <div className="h-2.5 bg-zinc-100 border border-charcoal rounded-full overflow-hidden select-none">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      alignmentScore >= 80 ? 'bg-emerald-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${alignmentScore}%` }}
                  />
                </div>
              </div>

              {/* Metric 2: Drift Risk */}
              <div className="space-y-1">
                <span className="font-bold text-[11px] block">
                  🧭 Product Drift Risk
                </span>
                <div className={`p-2 rounded-lg border text-center font-mono text-[10px] font-bold uppercase ${driftRisk.color}`}>
                  {driftRisk.text}
                </div>
              </div>

              {/* Metric 3: Complexity Level */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold">
                    ⚔️ Structural Complexity
                  </span>
                </div>
                <span className={`font-sans text-xs block font-extrabold ${complexityLevel.color}`}>
                  {complexityLevel.text}
                </span>
              </div>

              {/* Metric 4: Validation Progress */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold">
                    🧪 Assumptions Validated
                  </span>
                  <span className="font-mono font-black text-emerald-800">
                    {validationProgress}%
                  </span>
                </div>
                <div className="h-2 bg-zinc-100 border border-charcoal rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-600 transition-all duration-500"
                    style={{ width: `${validationProgress}%` }}
                  />
                </div>
              </div>

            </div>

          </div>

          {/* AI Behavioral Ink/Sticky suggestions margin critique */}
          <div className="relative pt-4 overflow-hidden">
            {/* Ink doodle annotation on margin */}
            <div className="p-3 bg-[#FFF9E4] border border-dashed border-charcoal/30 rounded-xl relative transform -rotate-1">
              <span className="font-mono text-[9px] text-zinc-500 block font-bold uppercase">
                🧠 ANTI-DRIFT MENTOR OBSERVES:
              </span>
              <p className="font-hand font-extrabold text-sm text-[#A33434] leading-relaxed mt-1 select-text">
                "Strikethrough of password loops completed. Splendid effort. We saved three days of waste right there. Secure those early deposits."
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Margins Coach Tips footer */}
      <div className="mt-8 border-t-2 border-charcoal/10 pt-4 pb-2 text-center">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2.5">
          <span className="font-mono text-[10px] text-zinc-500 uppercase font-bold">💡 Margin Comment Tracker:</span>
          <div className="flex flex-wrap justify-center gap-2">
            {marginsCoachTips.map((tip, i) => (
              <span key={i} className="text-[10px] font-sans font-medium text-charcoal bg-white border border-charcoal/10 px-2.5 py-1 rounded-full shadow-sm">
                📌 <strong>{tip.source}:</strong> "{tip.text}"
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
