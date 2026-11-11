import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Circle, 
  Activity, 
  ShieldAlert, 
  Eye, 
  Film, 
  Zap, 
  Flame, 
  Clock 
} from 'lucide-react';
import { Exercise } from '../data/workouts';
import { BiomechanicalAvatar } from './BiomechanicalAvatar';
import { playTick, playTimerDone } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ExerciseCardProps {
  exercise: Exercise;
  workoutColor: string;
  onSetComplete?: () => void;
  gymMode?: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
  exercise, 
  workoutColor, 
  gymMode = false 
}) => {
  // Animation visual view: 'gif' | 'biomech'
  const [activeTab, setActiveTab] = useState<'gif' | 'biomech'>(exercise.defaultView || 'gif');
  const [gifLoadError, setGifLoadError] = useState<boolean>(false);
  const [isGifLoading, setIsGifLoading] = useState<boolean>(true);
  
  // Parse number of sets from string (e.g. "3 séries" -> 3, "4x6 reps" -> 4)
  const totalSets = Math.min(
    Math.max(
      parseInt(exercise.sets.replace(/\D/g, '') || '3', 10),
      1
    ),
    6
  );
  
  // State of completed sets
  const [completedSets, setCompletedSets] = useState<boolean[]>(
    new Array(totalSets).fill(false)
  );

  // Timer states
  const [timeLeft, setTimeLeft] = useState<number>(exercise.restSec);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 4 && prev > 1) {
            playTick();
          } else if (prev === 1) {
            playTimerDone();
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(exercise.restSec);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(exercise.restSec);
  };

  const addThirtySeconds = () => {
    setTimeLeft((prev) => prev + 30);
  };

  const toggleSet = (index: number) => {
    const updated = [...completedSets];
    updated[index] = !updated[index];
    setCompletedSets(updated);

    // If just completed a set, auto-start rest timer
    if (updated[index] && timeLeft === exercise.restSec && !isRunning) {
      setIsRunning(true);
    }

    // If all sets completed, fire mini confetti
    if (updated.every((s) => s)) {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.8 },
        colors: [workoutColor, '#10b981', '#38bdf8'],
      });
    }
  };

  const progressPercent = Math.round(
    ((exercise.restSec - timeLeft) / exercise.restSec) * 100
  );

  return (
    <div 
      className={`rounded-2xl border transition-all duration-300 relative overflow-hidden ${
        completedSets.every(Boolean)
          ? 'bg-mamba-surface/40 border-mamba-emerald/40'
          : 'bg-mamba-card border-mamba-border hover:border-mamba-muted/40 shadow-lg'
      } ${gymMode ? 'p-5 sm:p-7' : 'p-4 sm:p-6'}`}
    >
      {/* Category & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span 
            className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-semibold border"
            style={{ 
              backgroundColor: `${workoutColor}15`, 
              color: workoutColor, 
              borderColor: `${workoutColor}40` 
            }}
          >
            {exercise.category}
          </span>
          {exercise.rpe && (
            <span className="text-[11px] font-mono bg-mamba-gold/10 text-mamba-gold border border-mamba-gold/30 px-2 py-0.5 rounded-md font-medium">
              {exercise.rpe}
            </span>
          )}
          {exercise.cadence && (
            <span className="text-[11px] font-mono bg-mamba-surface text-slate-300 border border-mamba-border px-2 py-0.5 rounded-md">
              Cadência: {exercise.cadence}
            </span>
          )}
        </div>

        {/* Animation Switcher Tabs */}
        <div className="flex items-center bg-mamba-dark p-0.5 rounded-xl border border-mamba-border text-xs">
          <button
            onClick={() => {
              if (!gifLoadError) setActiveTab('gif');
            }}
            disabled={gifLoadError}
            title={gifLoadError ? 'Asset GIF indisponível na CDN — Modo Biomecânico ativo' : 'Ver animação GIF'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all min-h-[34px] ${
              activeTab === 'gif'
                ? 'bg-mamba-surface text-slate-100 shadow-sm font-semibold'
                : gifLoadError
                ? 'text-mamba-muted/40 cursor-not-allowed opacity-60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-mamba-cyan" />
            <span>GIF</span>
            {gifLoadError && (
              <span className="text-[9px] font-mono text-amber-400 bg-amber-400/10 px-1 py-0.2 rounded border border-amber-400/20 ml-0.5">
                Fallback
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('biomech')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all min-h-[34px] ${
              activeTab === 'biomech'
                ? 'bg-mamba-surface text-slate-100 shadow-sm font-semibold'
                : 'text-violet-300/80 hover:text-violet-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-mamba-purple" />
            <span>Biomecânico</span>
          </button>
        </div>
      </div>

      {/* Title & Core Prescription */}
      <div className="mb-3">
        <h3 className="text-base sm:text-xl font-bold text-slate-100 leading-snug">
          {exercise.name}
        </h3>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-xs text-mamba-muted">
          <div className="flex items-center gap-1 text-slate-200 font-medium">
            <Flame className="w-3.5 h-3.5 text-mamba-gold" />
            <span>{exercise.sets}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1 text-slate-200 font-medium">
            <Zap className="w-3.5 h-3.5 text-mamba-cyan" />
            <span>{exercise.reps}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1 text-slate-300 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Descanso: {exercise.restSec}s</span>
          </div>
        </div>
      </div>

      {/* Visual Animation Container */}
      <div className="mb-3 rounded-xl overflow-hidden border border-mamba-border bg-mamba-dark relative">
        {activeTab === 'gif' && !gifLoadError ? (
          <div className="relative w-full h-44 sm:h-52 bg-mamba-dark/95 flex items-center justify-center overflow-hidden">
            {isGifLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-mamba-dark/90 z-10">
                <div className="w-6 h-6 border-2 border-mamba-cyan border-t-transparent rounded-full animate-spin mb-2" />
                <span className="text-[11px] font-mono text-slate-400">Carregando animação...</span>
              </div>
            )}
            <img
              src={exercise.gifUrl}
              alt={exercise.name}
              className="max-h-full max-w-full object-contain filter contrast-105"
              loading="lazy"
              onLoad={() => setIsGifLoading(false)}
              onError={(e) => {
                // Fallback to biomech avatar if gif CDN fails
                (e.target as HTMLElement).style.display = 'none';
                setGifLoadError(true);
                setIsGifLoading(false);
                setActiveTab('biomech');
              }}
            />
            <div className="absolute bottom-2 right-2 bg-mamba-dark/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 border border-mamba-border/60 flex items-center gap-1">
              <Eye className="w-3 h-3 text-mamba-cyan" />
              Execução Contínua
            </div>
          </div>
        ) : (
          <div className="relative w-full">
            <BiomechanicalAvatar 
              type={exercise.svgModelType} 
              jointAngles={exercise.jointAngles} 
            />
            {gifLoadError && (
              <div className="absolute top-2 left-2 bg-amber-500/15 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 z-10 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                Fallback Biomecânico Ativo
              </div>
            )}
          </div>
        )}
      </div>

      {/* Biomechanical Gold Cue */}
      <div className="mb-3 p-3 rounded-xl bg-mamba-surface/60 border border-mamba-border/80">
        <div className="flex items-start gap-2">
          <div className="p-1 rounded bg-mamba-cyan/10 text-mamba-cyan mt-0.5 shrink-0">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-mamba-cyan font-bold block">
              Dica de Ouro Biomecânica
            </span>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-relaxed">
              {exercise.biomechanicalCue}
            </p>
          </div>
        </div>
      </div>

      {/* Physiotherapy Alert / Knee Guard */}
      <div className="mb-4 p-3 rounded-xl bg-mamba-emerald/5 border border-mamba-emerald/25">
        <div className="flex items-start gap-2">
          <div className="p-1 rounded bg-mamba-emerald/15 text-mamba-emerald mt-0.5 shrink-0">
            <ShieldAlert className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-mamba-emerald font-bold block">
              Blindagem do Joelho Esquerdo & Fisioterapia
            </span>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-relaxed">
              {exercise.physioNote}
            </p>
          </div>
        </div>
      </div>

      {/* Muscle Tags */}
      <div className="flex flex-wrap items-center gap-1.5 mb-5">
        <span className="text-[10px] font-mono uppercase text-mamba-muted mr-1">Foco:</span>
        {exercise.primaryMuscles.map((m, idx) => (
          <span 
            key={idx}
            className="text-[10px] font-medium bg-mamba-purple/15 text-mamba-purple border border-mamba-purple/30 px-2 py-0.5 rounded"
          >
            {m}
          </span>
        ))}
        {exercise.secondaryMuscles.map((m, idx) => (
          <span 
            key={idx}
            className="text-[10px] font-medium bg-mamba-surface text-slate-300 border border-slate-700/80 px-2 py-0.5 rounded"
          >
            {m}
          </span>
        ))}
      </div>

      {/* Interactive Rest Timer & Set Checklist Row */}
      <div className="pt-4 border-t border-mamba-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Set Checklist with Thumb-friendly targets */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <span className="text-xs font-mono text-mamba-muted">Séries concluídas:</span>
            {completedSets.every(Boolean) && (
              <span className="text-[11px] font-mono text-mamba-emerald font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Completo!
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {completedSets.map((done, idx) => (
              <button
                key={idx}
                onClick={() => toggleSet(idx)}
                className={`flex items-center justify-center gap-1.5 min-w-[44px] min-h-[42px] px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all active:scale-95 ${
                  done
                    ? 'bg-mamba-emerald/25 text-mamba-emerald border-mamba-emerald/50 shadow-sm'
                    : 'bg-mamba-dark hover:bg-mamba-surface text-slate-300 border-mamba-border'
                }`}
                title={done ? `Série #${idx + 1} concluída (clique para desmarcar)` : `Marcar série #${idx + 1} como feita`}
              >
                {done ? (
                  <CheckCircle2 className="w-4 h-4 text-mamba-emerald" />
                ) : (
                  <Circle className="w-4 h-4 text-mamba-muted" />
                )}
                <span>#{idx + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Rest Countdown Timer */}
        <div className="flex items-center justify-between sm:justify-end gap-3 bg-mamba-dark px-3.5 py-2.5 rounded-xl border border-mamba-border shadow-inner">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-mamba-cyan uppercase font-bold tracking-wider">Descanso</span>
            <span className={`text-xl sm:text-2xl font-mono font-black tracking-tight leading-none ${timeLeft <= 5 && timeLeft > 0 ? 'text-mamba-rose animate-pulse' : 'text-slate-100'}`}>
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          </div>

          {/* Mini progress bar */}
          <div className="w-14 h-1.5 bg-mamba-border rounded-full overflow-hidden hidden xs:block">
            <div 
              className="h-full bg-mamba-cyan transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTimer}
              className={`min-w-[42px] min-h-[40px] px-2.5 py-1.5 rounded-xl border font-mono font-bold text-xs flex items-center justify-center transition-all active:scale-95 ${
                isRunning
                  ? 'bg-mamba-gold/20 text-mamba-gold border-mamba-gold/50 hover:bg-mamba-gold/30'
                  : 'bg-mamba-cyan/20 text-mamba-cyan border-mamba-cyan/50 hover:bg-mamba-cyan/30'
              }`}
              title={isRunning ? 'Pausar' : 'Iniciar descanso'}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={addThirtySeconds}
              className="min-h-[40px] px-2 py-1.5 rounded-xl bg-mamba-surface hover:bg-mamba-border text-slate-300 hover:text-white border border-mamba-border text-[11px] font-mono font-semibold transition-all active:scale-95"
              title="Adicionar 30 segundos"
            >
              +30s
            </button>
            <button
              onClick={resetTimer}
              className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-mamba-surface hover:bg-mamba-border text-slate-400 hover:text-slate-200 border border-mamba-border flex items-center justify-center transition-all active:scale-95"
              title="Reiniciar tempo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
