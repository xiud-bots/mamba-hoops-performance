import React from 'react';
import { LayoutGrid, Dumbbell, ShieldAlert, ClipboardCheck, Volume2, VolumeX } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: 'hub' | 'workout';
  onNavigateHub: () => void;
  onNavigateWorkout: () => void;
  onOpenGuidelines: () => void;
  onOpenChecklist: () => void;
  activeDayTag: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigateHub,
  onNavigateWorkout,
  onOpenGuidelines,
  onOpenChecklist,
  activeDayTag,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <nav 
      aria-label="Navegação rápida mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-mamba-dark/95 backdrop-blur-xl border-t border-mamba-border/80 px-2 py-1.5 safe-bottom shadow-[0_-8px_30px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Hub Button */}
        <button
          onClick={onNavigateHub}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[56px] min-h-[48px] ${
            currentView === 'hub'
              ? 'text-mamba-cyan font-bold bg-mamba-cyan/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutGrid className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Hub</span>
        </button>

        {/* Workout Button */}
        <button
          onClick={onNavigateWorkout}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[56px] min-h-[48px] relative ${
            currentView === 'workout'
              ? 'text-mamba-purple font-bold bg-mamba-purple/15'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Dumbbell className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">{activeDayTag || 'Treino'}</span>
          {currentView === 'workout' && (
            <span className="absolute -top-0.5 right-2 w-2 h-2 rounded-full bg-mamba-purple animate-ping" />
          )}
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Silenciar áudio' : 'Ativar áudio'}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-slate-200 min-w-[50px] min-h-[48px]"
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5 text-mamba-cyan mb-0.5" />
          ) : (
            <VolumeX className="w-5 h-5 text-mamba-muted mb-0.5" />
          )}
          <span className="text-[10px] tracking-tight">{soundEnabled ? 'Som ON' : 'Mudo'}</span>
        </button>

        {/* Guidelines / Fisio */}
        <button
          onClick={onOpenGuidelines}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-mamba-cyan min-w-[56px] min-h-[48px]"
        >
          <ShieldAlert className="w-5 h-5 mb-0.5 text-mamba-cyan/90" />
          <span className="text-[10px] tracking-tight">Fisio</span>
        </button>

        {/* Checklist 24h */}
        <button
          onClick={onOpenChecklist}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-mamba-gold min-w-[56px] min-h-[48px]"
        >
          <ClipboardCheck className="w-5 h-5 mb-0.5 text-mamba-gold/90" />
          <span className="text-[10px] tracking-tight">Diário</span>
        </button>
      </div>
    </nav>
  );
};
