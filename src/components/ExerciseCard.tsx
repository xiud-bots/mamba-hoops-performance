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
  const [activeTab, setActiveTab] = useState<'gif' | 'biomech'>('gif');
  
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
        <div className="flex items-center bg-mamba-dark p-0.5 rounded-lg border border-mamba-border text-xs">
          <button
            onClick={() => setActiveTab('gif')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
              activeTab === 'gif'
                ? 'bg-mamba-surface text-slate-100 shadow-sm font-medium'
                : 'text-mamba-muted hover:text-slate-200'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-mamba-cyan" />
            <span className="hidden sm:inline">Animação</span> GIF
          </button>
          <button
            onClick={() => setActiveTab('biomech')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
              activeTab === 'biomech'
                ? 'bg-mamba-surface text-slate-100 shadow-sm font-medium'
                : 'text-mamba-muted hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-mamba-purple" />
            <span className="hidden sm:inline">Modelo</span> Biomecânico
          </button>
        </div>
      </div>

      {/* Title & Core Prescription */}
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-snug">
          {exercise.name}
        </h3>
        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-mamba-muted">
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
      <div className="mb-4 rounded-xl overflow-hidden border border-mamba-border bg-mamba-dark relative">
        {activeTab === 'gif' ? (
          <div className="relative w-full h-56 bg-mamba-dark/95 flex items-center justify-center overflow-hidden">
            <img
              src={exercise.gifUrl}
              alt={exercise.name}
              className="max-h-full max-w-full object-contain filter contrast-105"
              loading="lazy"
              onError={(e) => {
                // Fallback to biomech avatar if gif CDN fails
                (e.target as HTMLElement).style.display = 'none';
                setActiveTab('biomech');
              }}
            />
            <div className="absolute bottom-2 right-2 bg-mamba-dark/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 border border-mamba-border/60 flex items-center gap-1">
              <Eye className="w-3 h-3 text-mamba-cyan" />
              Execução Contínua
            </div>
          </div>
        ) : (
          <BiomechanicalAvatar 
            type={exercise.svgModelType} 
            jointAngles={exercise.jointAngles} 
          />
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
      <div className="pt-4 border-t border-mamba-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Set Checklist */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-mamba-muted mr-1">Séries:</span>
          {completedSets.map((done, idx) => (
            <button
              key={idx}
              onClick={() => toggleSet(idx)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-all ${
                done
                  ? 'bg-mamba-emerald/20 text-mamba-emerald border-mamba-emerald/50'
                  : 'bg-mamba-dark hover:bg-mamba-surface text-slate-400 border-mamba-border'
              }`}
            >
              {done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-mamba-emerald" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-mamba-muted" />
              )}
              <span>#{idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Rest Countdown Timer */}
        <div className="flex items-center gap-3 bg-mamba-dark px-3.5 py-2.5 rounded-xl border border-mamba-border shadow-inner">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-mamba-cyan uppercase font-bold tracking-wider">Descanso</span>
            <span className={`text-lg sm:text-xl font-mono font-black tracking-tight leading-none ${timeLeft <= 5 && timeLeft > 0 ? 'text-mamba-rose animate-pulse' : 'text-slate-100'}`}>
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          </div>

          {/* Mini progress bar */}
          <div className="w-16 h-1.5 bg-mamba-border rounded-full overflow-hidden hidden xs:block">
            <div 
              className="h-full bg-mamba-cyan transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTimer}
              className={`p-1.5 rounded-lg border transition-all ${
                isRunning
                  ? 'bg-mamba-gold/20 text-mamba-gold border-mamba-gold/50 hover:bg-mamba-gold/30'
                  : 'bg-mamba-cyan/20 text-mamba-cyan border-mamba-cyan/50 hover:bg-mamba-cyan/30'
              }`}
              title={isRunning ? 'Pausar' : 'Iniciar descanso'}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={resetTimer}
              className="p-1.5 rounded-lg bg-mamba-surface hover:bg-mamba-border text-slate-400 hover:text-slate-200 border border-mamba-border"
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
