import { useState, FormEvent } from 'react';
import { ConceptType, SandboxCard, StickyNote } from '../types';
import { Plus, Trash2, ArrowUpRight, MousePointer, Paperclip, Move, User, Sparkles, AlertTriangle } from 'lucide-react';

interface WorkspaceMockupProps {
  conceptId: ConceptType;
  cards: SandboxCard[];
  onUpdateCard: (id: string, newContent: string) => void;
  onAddCard: (type: SandboxCard['type']) => void;
  onDeleteCard: (id: string) => void;
  activeStartupName: string;
}

export default function WorkspaceMockup({
  conceptId,
  cards,
  onUpdateCard,
  onAddCard,
  onDeleteCard,
  activeStartupName
}: WorkspaceMockupProps) {
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([
    { id: 'st-1', text: '💡 Core Obsession: No internet needed inside writers tunnel.', x: 12, y: 8, color: 'yellow', handwritten: true, angle: -2 },
    { id: 'st-2', text: '🛠️ Must test mason safety ratings with castle masonry trials.', x: 74, y: 15, color: 'green', handwritten: true, angle: 3 },
    { id: 'st-3', text: '📈 Target: $5M preservation fund in Year 1!', x: 40, y: 72, color: 'blue', handwritten: true, angle: -1 }
  ]);
  const [newStickyText, setNewStickyText] = useState('');
  const [selectedStickyColor, setSelectedStickyColor] = useState<StickyNote['color']>('yellow');

  // Simulated multi-user active cursors for Concept B (Collaborative)
  const cohortCursors = [
    { name: 'Sarah (Co-founder)', x: '72%', y: '18%', color: 'bg-green-500' },
    { name: 'Liam (Lead Architect)', x: '25%', y: '64%', color: 'bg-indigo-500' }
  ];

  const handleSpawnSticky = (e: FormEvent) => {
    e.preventDefault();
    if (!newStickyText.trim()) return;

    const newSticky: StickyNote = {
      id: `st-${Date.now()}`,
      text: newStickyText,
      x: Math.floor(Math.random() * 50) + 15,
      y: Math.floor(Math.random() * 50) + 20,
      color: selectedStickyColor,
      handwritten: true,
      angle: Math.floor(Math.random() * 8) - 4 // random angle -4 to 3
    };

    setStickyNotes([...stickyNotes, newSticky]);
    setNewStickyText('');
  };

  const handleDeleteSticky = (id: string) => {
    setStickyNotes(stickyNotes.filter(n => n.id !== id));
  };

  const getStickyColorClasses = (color: StickyNote['color']) => {
    switch (color) {
      case 'yellow': return 'bg-[#fff6bd] text-charcoal border-[#ecd983]';
      case 'pink': return 'bg-[#ffc6d9] text-charcoal border-[#eba1bb]';
      case 'blue': return 'bg-[#c3ecf6] text-charcoal border-[#a1dbec]';
      case 'green': return 'bg-[#d0f4de] text-charcoal border-[#addcb8]';
      case 'orange': return 'bg-[#ffd3b6] text-charcoal border-[#eba983]';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* SPANNING CONTROL BAR: Live creation tools */}
      <div 
        className={`p-4 flex flex-col md:flex-row gap-4 items-center justify-between ${
          conceptId === 'A' 
            ? 'bg-warm-cream border-sketch shadow-notebook' 
            : conceptId === 'B' 
              ? 'bg-white rounded-2xl border-2 border-charcoal shadow-sm' 
              : 'bg-white border border-technical-steel/20 rounded-md shadow-sm'
        }`}
        id="sandbox-workspace-controls"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase text-pencil-gray font-extrabold mr-2">
            Spawn Strategy Nodes:
          </span>
          <button 
            onClick={() => onAddCard('vision')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Vision Card
          </button>
          <button 
            onClick={() => onAddCard('user')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 text-xs font-bold rounded-lg transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> User Card
          </button>
          <button 
            onClick={() => onAddCard('problem')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 text-xs font-bold rounded-lg transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Problem Card
          </button>
          <button 
            onClick={() => onAddCard('mvp')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-lg transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> MVP Code Limit
          </button>
        </div>

        {/* Mini Spawn Sticky Form */}
        <form onSubmit={handleSpawnSticky} className="flex items-center gap-2 w-full md:w-auto mt-3 md:mt-0">
          <input 
            type="text" 
            placeholder="Stick a raw brainstorm thought..."
            value={newStickyText}
            onChange={(e) => setNewStickyText(e.target.value)}
            className="flex-1 placeholder-pencil-gray/60 bg-charcoal/5 border border-charcoal/10 text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-charcoal text-charcoal font-sans"
          />
          
          <div className="flex gap-1">
            {(['yellow', 'pink', 'blue', 'green', 'orange'] as const).map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedStickyColor(color)}
                className={`w-4 h-4 rounded-full border border-charcoal/20 transition-transform ${
                  selectedStickyColor === color ? 'scale-125 border-charcoal' : 'hover:scale-110'
                }`}
                style={{
                  backgroundColor: 
                    color === 'yellow' ? '#fff6bd' : 
                    color === 'pink' ? '#ffc6d9' : 
                    color === 'blue' ? '#c3ecf6' : 
                    color === 'green' ? '#d0f4de' : '#ffd3b6'
                }}
              />
            ))}
          </div>

          <button 
            type="submit"
            className="bg-charcoal hover:bg-charcoal/90 text-white rounded-lg px-3 py-1.5 text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Stick
          </button>
        </form>
      </div>

      {/* CORE SPATIAL THINKING CANVAS STAGE */}
      <div 
        className={`relative overflow-auto p-6 md:p-8 select-none transition-all duration-300 min-h-[550px] max-h-[700px] border-2 max-w-full ${
          conceptId === 'A' 
            ? 'bg-ruled-paper border-sketch shadow-notebook' 
            : conceptId === 'B' 
              ? 'bg-dot-matrix rounded-[2.5rem] border-3 border-charcoal shadow-sandbox-card' 
              : 'bg-graph-grid border-deep-navy/30 rounded-lg'
        }`}
        id="sandbox-spatial-thinking-canvas"
      >
        {/* Subtle Concept Grid Background coordinates */}
        {conceptId === 'C' && (
          <div className="absolute top-2 left-3 font-mono text-[9px] text-pencil-gray pointer-events-none select-none">
            [WORKSPACE_ACTIVE_SPECTRA // DRAWING_SHEET_V2]
          </div>
        )}

        {/* Notebook paper spine line for Concept A */}
        {conceptId === 'A' && (
          <div className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-[#d7caaf] opacity-50 transform -translate-x-1/2 flex flex-col justify-around py-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-4 h-2 bg-charcoal/30 border-sketch-sm rounded transform -translate-x-1.5" />
            ))}
          </div>
        )}

        {/* Live Active Collaborator Cursors (Concept B) */}
        {conceptId === 'B' && cohortCursors.map((c, i) => (
          <div 
            key={i} 
            className="absolute z-40 pointer-events-none flex items-center gap-1.5 animate-pulse"
            style={{ left: c.x, top: c.y }}
          >
            <MousePointer className="w-4 h-4 text-charcoal fill-current" />
            <span className={`text-[10px] font-mono text-white px-2 py-0.5 rounded-full ${c.color} shadow-sm font-semibold`}>
              {c.name}
            </span>
          </div>
        ))}

        {/* SPATIAL CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 relative z-10">
          
          {/* Main Strategy Node Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, index) => {
              const rotAngle = index % 4 === 0 ? '-rotate-1' : index % 4 === 1 ? 'rotate-1' : index % 4 === 2 ? 'rotate-2' : '-rotate-2';
              return (
                <div 
                  key={card.id}
                  className={`p-5 transition-all duration-300 relative select-text flex flex-col justify-between ${
                    conceptId === 'A' 
                      ? `bg-warm-cream border-sketch shadow-notebook ${rotAngle}`
                      : conceptId === 'B' 
                        ? `bg-white rounded-3xl border-2 border-charcoal shadow-sandbox-card hover:translate-x-0.5 ${rotAngle}` 
                        : 'bg-white border-2 border-deep-navy shadow-sm rounded relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-deep-navy'
                  }`}
                >
                  {/* Paperclip asset representation for Concept A */}
                  {conceptId === 'A' && index % 2 === 0 && (
                    <div className="absolute -top-4 left-6 transform rotate-12 z-20">
                      <Paperclip className="w-6 h-6 text-notebook-crimson opacity-70" />
                    </div>
                  )}

                  {/* Blueprint dimension tick lines for Concept C */}
                  {conceptId === 'C' && (
                    <div className="absolute -top-3 -left-3 font-mono text-[9px] text-[red] bg-white px-1">
                      W_ID: {index + 1}
                    </div>
                  )}

                  <div>
                    {/* Header: Title and Type badge */}
                    <div className="flex items-center justify-between mb-3 border-b border-charcoal/5 pb-2">
                      <div className="flex items-center gap-2">
                        <span className={`p-1 rounded-md ${
                          card.type === 'vision' ? 'bg-indigo-50 text-indigo-700' :
                          card.type === 'user' ? 'bg-green-50 text-green-700' :
                          card.type === 'problem' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {card.type === 'vision' ? <Sparkles className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </span>
                        <span className={`text-xs uppercase font-extrabold tracking-wider text-charcoal ${conceptId === 'C' ? 'font-mono' : 'font-display'}`}>
                          {card.title}
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => onDeleteCard(card.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-pencil-gray hover:text-red-500 transition-all absolute top-2 right-2 text-xs"
                        title="Delete Card"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Active Editable text editor card */}
                    <textarea 
                      value={card.content}
                      rows={4}
                      onChange={(e) => onUpdateCard(card.id, e.target.value)}
                      className={`w-full bg-transparent resize-none outline-none border-none border-t border-dashed border-charcoal/5 pt-1 focus:ring-0 leading-relaxed text-xs md:text-sm text-charcoal ${
                        conceptId === 'A' ? 'font-hand text-lg' : conceptId === 'C' ? 'font-mono text-xs' : 'font-sans'
                      }`}
                      placeholder="Capture raw blueprint specifications..."
                    />
                  </div>

                  {/* Tiny author tag */}
                  <div className="mt-4 flex items-center justify-between text-[10px] text-pencil-gray font-mono border-t border-dashed border-charcoal/10 pt-2">
                    <span className="flex items-center gap-1 font-bold">
                      <User className="w-3 h-3" /> {card.author || 'Local Creator'}
                    </span>
                    <span className="uppercase text-[9px] text-[#A26D2B] bg-[#FFF8E7] px-1.5 font-semibold py-0.5 border border-[#ecd983]/30 rounded">
                      {card.status || 'Draft'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Draggable Sticky Notes Column / Quick brainstorm side panel */}
          <div className="lg:col-span-4 space-y-6 relative">
            <div className={`p-4 ${conceptId === 'A' ? 'bg-[#fffaee] border-sketch' : conceptId === 'B' ? 'bg-white rounded-3xl border-2 border-charcoal' : 'bg-white border border-technical-steel/20 rounded shadow-sm'}`}>
              <h5 className="font-display font-extrabold text-xs uppercase tracking-widest text-charcoal mb-3 border-b border-charcoal/10 pb-2">
                Brainstorm Sticky Board ({stickyNotes.length})
              </h5>

              {stickyNotes.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-xs text-pencil-gray font-sans">No brainstorm notes left. Spawn some using the control center!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stickyNotes.map((note) => (
                    <div 
                      key={note.id}
                      className={`p-4 relative transition-transform shadow-paper-curl border-2 flex flex-col justify-between ${getStickyColorClasses(note.color)}`}
                      style={{ transform: `rotate(${note.angle}deg)` }}
                    >
                      <button 
                        onClick={() => handleDeleteSticky(note.id)}
                        className="absolute top-1.5 right-1.5 text-charcoal/40 hover:text-red-600 transition-colors"
                        title="Discard Note"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>

                      <p className="font-hand text-lg leading-snug break-words mb-2 select-text">
                        {note.text}
                      </p>
                      
                      <div className="flex justify-between items-center text-[9px] font-mono opacity-60">
                        <span>#postit // active</span>
                        {conceptId === 'B' && <span className="flex items-center gap-0.5"><Move className="w-2.5 h-2.5" /> Spatial</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Simulated Live Constraints Feed Indicator */}
            <div className={`p-4 rounded-xl border-2 border-dashed ${
              conceptId === 'C' ? 'bg-[#FFEAEB] border-red-300 text-[#852C32]' : 'bg-[#FFFCEC] border-[#e1d6be] text-charcoal'
            }`}>
              <div className="flex items-center gap-2 mb-2 font-bold font-display text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: conceptId === 'C' ? '#E05A47' : '#E89C3D' }} />
                <span>Active Constitution Guards</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">
                Any mock feature which includes keywords like <span className="p-0.5 font-bold font-mono bg-charcoal/15 rounded">"chatbot"</span> or <span className="p-0.5 font-bold font-mono bg-charcoal/15 rounded">"messenger"</span> violates the **Product Constitution Constraints Panel**.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
