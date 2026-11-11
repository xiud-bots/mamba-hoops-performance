import React from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2,
  Dumbbell
} from 'lucide-react';
import { WORKOUT_DAYS } from '../data/workouts';
import { playBeep } from '../utils/audio';

interface NavbarProps {
  activeDayId: string;
  onSelectDay: (id: 'treino-a' | 'treino-b' | 'treino-c' | 'treino-d') => void;
  onOpenGuidelines: () => void;
  onOpenChecklist: () => void;
  gymMode: boolean;
  onToggleGymMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeDayId,
  onSelectDay,
  onOpenGuidelines,
  onOpenChecklist,
  gymMode,
  onToggleGymMode,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-mamba-dark/90 backdrop-blur-md border-b border-mamba-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        {/* Top row: Brand & Global Tools */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-mamba-border/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mamba-purple to-mamba-violet p-0.5 shadow-glow-purple flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-mamba-dark rounded-[10px] flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-mamba-cyan" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-100 uppercase">
                  Mamba Hoops Performance
                </h1>
                <span className="text-[10px] font-mono bg-mamba-purple/20 text-mamba-purple border border-mamba-purple/40 px-2 py-0.5 rounded font-bold">
                  FASE 1
                </span>
              </div>
              <p className="text-[11px] text-mamba-muted flex items-center gap-1.5">
                <span>Atleta: <strong>Gabriel</strong></span>
                <span>•</span>
                <span>Preparador: <strong>@mamba</strong></span>
                <span>•</span>
                <span className="text-mamba-emerald">Fisioterapia & Biomecânica</span>
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onOpenGuidelines}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-mamba-card hover:bg-mamba-surface text-slate-200 border border-mamba-border text-xs font-medium transition-all"
            >
              <ShieldAlert className="w-4 h-4 text-mamba-emerald" />
              <span>Diretrizes Fisioterapia</span>
            </button>

            <button
              onClick={onOpenChecklist}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-mamba-card hover:bg-mamba-surface text-slate-200 border border-mamba-border text-xs font-medium transition-all"
            >
              <Sparkles className="w-4 h-4 text-mamba-gold" />
              <span>Checklist 24h</span>
            </button>

            <button
              onClick={onToggleGymMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                gymMode
                  ? 'bg-mamba-cyan/20 text-mamba-cyan border-mamba-cyan/50 shadow-glow-cyan'
                  : 'bg-mamba-card hover:bg-mamba-surface text-slate-300 border-mamba-border'
              }`}
              title="Modo Academia com alto contraste e foco"
            >
              {gymMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span className="hidden sm:inline">Modo</span> Academia
            </button>

            <button
              onClick={() => {
                onToggleSound();
                if (!soundEnabled) {
                  playBeep(880, 0.1);
                }
              }}
              className="p-1.5 rounded-xl bg-mamba-card hover:bg-mamba-surface text-slate-400 hover:text-slate-100 border border-mamba-border transition-colors"
              title={soundEnabled ? 'Silenciar beeps' : 'Ativar avisos sonoros'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-mamba-cyan" /> : <VolumeX className="w-4 h-4 text-mamba-muted" />}
            </button>
          </div>
        </div>

        {/* Bottom row: Day Switcher Tabs */}
        <nav className="flex items-center gap-2 pt-3 overflow-x-auto no-scrollbar">
          {WORKOUT_DAYS.map((day) => {
            const isActive = activeDayId === day.id;
            return (
              <button
                key={day.id}
                onClick={() => onSelectDay(day.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-mamba-surface text-slate-100 shadow-md'
                    : 'bg-mamba-dark/60 text-mamba-muted hover:text-slate-200 border-transparent hover:border-mamba-border'
                }`}
                style={{
                  borderColor: isActive ? day.accentColor : undefined,
                  boxShadow: isActive ? `0 0 15px -3px ${day.accentColor}30` : undefined,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: day.accentColor }}
                />
                <span>{day.title.split('•')[0].trim()}</span>
                <span className="text-[10px] font-mono text-mamba-muted hidden md:inline">
                  ({day.dayOfWeek})
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
