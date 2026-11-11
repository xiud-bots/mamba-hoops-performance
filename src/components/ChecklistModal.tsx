import React, { useState, useEffect } from 'react';
import { X, Check, Save, Sparkles, Smile, Meh, Frown, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChecklistModal: React.FC<ChecklistModalProps> = ({ isOpen, onClose }) => {
  const [painLevel, setPainLevel] = useState<number>(0);
  const [morningStiffness, setMorningStiffness] = useState<'none' | 'mild' | 'moderate' | 'severe'>('none');
  const [rpe, setRpe] = useState<number>(7);
  const [notes, setNotes] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Load last saved record from localStorage if available
    const saved = localStorage.getItem('mamba_athlete_feedback');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPainLevel(parsed.painLevel ?? 0);
        setMorningStiffness(parsed.morningStiffness ?? 'none');
        setRpe(parsed.rpe ?? 7);
        setNotes(parsed.notes ?? '');
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  if (!isOpen) return null;

  const handleSave = () => {
    const feedback = {
      timestamp: new Date().toISOString(),
      painLevel,
      morningStiffness,
      rpe,
      notes,
    };
    localStorage.setItem('mamba_athlete_feedback', JSON.stringify(feedback));
    setSavedSuccess(true);
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#10b981', '#38bdf8', '#8b5cf6'],
    });
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-mamba-card border border-mamba-border rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-mamba-border bg-mamba-surface/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-mamba-gold/20 text-mamba-gold border border-mamba-gold/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Checklist do Atleta & Regra 24h
              </h2>
              <p className="text-xs text-mamba-muted">
                Registro de sensações diárias e tolerância articular
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-mamba-dark hover:bg-mamba-border text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          {/* Pain Scale (0-10) */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-mono font-medium text-slate-300 uppercase">
                Dor no Joelho Esquerdo (0 a 10)
              </label>
              <span className={`text-sm font-mono font-bold px-2 py-0.5 rounded ${
                painLevel <= 2 
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' 
                  : painLevel <= 4 
                  ? 'bg-amber-950 text-amber-400 border border-amber-500/30' 
                  : 'bg-rose-950 text-rose-400 border border-rose-500/30'
              }`}>
                Nível {painLevel} {painLevel === 0 ? '(Zero Dor)' : painLevel <= 3 ? '(Aceitável)' : '(Alerta)'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={painLevel}
              onChange={(e) => setPainLevel(parseInt(e.target.value, 10))}
              className="w-full accent-mamba-cyan cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-mamba-muted mt-1 font-mono">
              <span>0 (Sem dor)</span>
              <span>5 (Moderada)</span>
              <span>10 (Incapacitante)</span>
            </div>
          </div>

          {/* Morning Stiffness */}
          <div>
            <label className="text-xs font-mono font-medium text-slate-300 uppercase block mb-2">
              Rigidez Matinal (Primeiros 10 passos ao acordar)
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setMorningStiffness('none')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                  morningStiffness === 'none'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                    : 'bg-mamba-dark border-mamba-border text-slate-400'
                }`}
              >
                <Smile className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-semibold block">Nenhuma</span>
                  <span className="text-[10px] text-mamba-muted">&lt; 1 min normal</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMorningStiffness('mild')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                  morningStiffness === 'mild'
                    ? 'bg-emerald-950/30 border-emerald-500/60 text-emerald-300'
                    : 'bg-mamba-dark border-mamba-border text-slate-400'
                }`}
              >
                <Smile className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-semibold block">Leve (&lt; 5 min)</span>
                  <span className="text-[10px] text-mamba-muted">Sobe com facilidade</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMorningStiffness('moderate')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                  morningStiffness === 'moderate'
                    ? 'bg-amber-950/40 border-amber-500 text-amber-300'
                    : 'bg-mamba-dark border-mamba-border text-slate-400'
                }`}
              >
                <Meh className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="font-semibold block">Moderada (5-15 min)</span>
                  <span className="text-[10px] text-mamba-muted">Precisa aquecer</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMorningStiffness('severe')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                  morningStiffness === 'severe'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                    : 'bg-mamba-dark border-mamba-border text-slate-400'
                }`}
              >
                <Frown className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <span className="font-semibold block">Severa (&gt; 15 min)</span>
                  <span className="text-[10px] text-mamba-muted">Alerta de carga</span>
                </div>
              </button>
            </div>
          </div>

          {/* RPE of session */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-mono font-medium text-slate-300 uppercase flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-mamba-gold" />
                RPE Global da Sessão (Esforço Percebido 1-10)
              </label>
              <span className="text-sm font-mono font-bold text-mamba-gold">
                RPE {rpe}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={rpe}
              onChange={(e) => setRpe(parseInt(e.target.value, 10))}
              className="w-full accent-mamba-gold cursor-pointer"
            />
          </div>

          {/* Sensation notes */}
          <div>
            <label className="text-xs font-mono font-medium text-slate-300 uppercase block mb-1.5">
              Anotações Adicionais do Atleta
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: No agachamento búlgaro senti excelente estabilidade mantendo a trava a 90°. Sem desconforto posterior..."
              className="w-full bg-mamba-dark border border-mamba-border rounded-xl p-3 text-xs text-slate-200 placeholder-mamba-muted focus:outline-none focus:border-mamba-cyan"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-mamba-border bg-mamba-surface/80 flex items-center justify-between">
          <span className="text-[11px] text-mamba-muted font-mono">
            {savedSuccess ? '✅ Registro salvo com sucesso!' : 'Salvo localmente no dispositivo'}
          </span>
          <button
            onClick={handleSave}
            disabled={savedSuccess}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-mamba-cyan hover:bg-mamba-sky text-mamba-dark font-bold text-xs transition-all shadow-glow-cyan"
          >
            {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {savedSuccess ? 'Salvo!' : 'Salvar Relatório'}
          </button>
        </div>
      </div>
    </div>
  );
};
