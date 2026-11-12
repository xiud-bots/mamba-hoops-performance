import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Circle, 
  ShieldAlert, 
  Eye, 
  Film, 
  Zap, 
  Flame, 
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Compass,
  Video
} from 'lucide-react';
import { Exercise } from '../data/workouts';
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
  // Active Media Tab: 'video' (Genuine Athlete Video) | 'v2' (ExerciseDB V2 HD) | 'v1' (Classic GIF)
  const [activeTab, setActiveTab] = useState<'video' | 'v2' | 'v1'>(exercise.defaultView || 'video');
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
  const [isV1Loading, setIsV1Loading] = useState<boolean>(true);
  const [isV2Loading, setIsV2Loading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  
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
        colors: [workoutColor, '#10b981', '#38bdf8', '#a855f7'],
      });
    }
  };

  const progressPercent = Math.round(
    ((exercise.restSec - timeLeft) / exercise.restSec) * 100
  );

  const videoSrc = exercise.videoUrl || `/assets/videos/${exercise.id}.mp4`;
  const posterSrc = exercise.posterUrl || `/assets/posters/${exercise.id}.jpg`;

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

        {/* Media View Mode Switcher */}
        <div className="flex items-center bg-mamba-dark p-0.5 rounded-xl border border-mamba-border text-xs shrink-0">
          {/* Tab Vídeo Real */}
          <button
            type="button"
            onClick={() => setActiveTab('video')}
            title="Visualizar demonstração em vídeo genuíno com atleta real (720p H.264)"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all min-h-[34px] ${
              activeTab === 'video'
                ? 'bg-gradient-to-r from-emerald-950 to-mamba-surface text-emerald-200 shadow-sm font-semibold border border-emerald-500/50'
                : 'text-slate-400 hover:text-emerald-300'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-[11px] font-bold">Vídeo</span>
            <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-1 py-0.2 rounded border border-emerald-500/30">
              HD
            </span>
          </button>

          {/* Tab V2 HD */}
          <button
            type="button"
            onClick={() => setActiveTab('v2')}
            title="Visualizar Anatomia ExerciseDB V2 em Alta Resolução 720p HD"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all min-h-[34px] ${
              activeTab === 'v2'
                ? 'bg-gradient-to-r from-violet-900/60 to-mamba-surface text-violet-200 shadow-sm font-semibold border border-violet-500/40'
                : 'text-violet-300/80 hover:text-violet-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="font-mono text-[11px] font-bold">Anatomia</span>
          </button>

          {/* Tab V1 Classic */}
          <button
            type="button"
            onClick={() => setActiveTab('v1')}
            title="Visualizar animação clássica ExerciseDB V1"
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all min-h-[34px] ${
              activeTab === 'v1'
                ? 'bg-mamba-surface text-slate-100 shadow-sm font-semibold border border-mamba-border/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-mamba-cyan" />
            <span className="font-mono text-[11px]">V1</span>
          </button>
        </div>
      </div>

      {/* Title & Core Prescription */}
      <div className="mb-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-base sm:text-xl font-bold text-slate-100 leading-snug">
            {exercise.name}
          </h3>
          <span className="text-[10px] font-mono text-mamba-muted shrink-0 hidden sm:inline">
            {exercise.v2.equipment}
          </span>
        </div>
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

      {/* Media Window Container (framed diagnostic viewport) */}
      <div className="mb-2 p-1 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-inner">
        {activeTab === 'video' ? (
          /* Genuine Video View */
          <div className="relative w-full h-48 sm:h-56 bg-slate-950 rounded-lg flex items-center justify-center overflow-hidden">
            {isVideoLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm z-10">
                <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mb-2" />
                <span className="text-[11px] font-mono text-emerald-200">Carregando Vídeo Genuíno...</span>
              </div>
            )}
            <video
              key={`vid-${exercise.id}`}
              src={videoSrc}
              poster={posterSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
              onCanPlay={() => setIsVideoLoading(false)}
              onError={() => setIsVideoLoading(false)}
            />
            
            {/* Video Top-Left Badge */}
            <div className="absolute top-2 left-2 bg-slate-950/85 backdrop-blur-sm px-2.5 py-0.5 rounded text-[10px] font-mono text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-sm">
              <Video className="w-3 h-3 text-emerald-400" />
              Vídeo Genuíno • Atleta Real
            </div>

            {/* Video Top-Right Quality Badge */}
            <div className="absolute top-2 right-2 bg-slate-950/85 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 border border-cyan-500/40 flex items-center gap-1 shadow-sm">
              <span>720p H.264</span>
            </div>
          </div>
        ) : activeTab === 'v2' ? (
          /* ExerciseDB V2 View */
          <div className="relative w-full h-48 sm:h-56 bg-white rounded-lg flex items-center justify-center overflow-hidden">
            {isV2Loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-sm z-10">
                <div className="w-6 h-6 border-2 border-violet-400 border-t-transparent rounded-full animate-spin mb-2" />
                <span className="text-[11px] font-mono text-violet-200">Carregando ExerciseDB V2 HD...</span>
              </div>
            )}
            <img
              src={exercise.v2.hdWebpUrl}
              alt={`${exercise.name} - ExerciseDB V2 HD`}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
              onLoad={() => setIsV2Loading(false)}
              onError={() => setIsV2Loading(false)}
            />

            {/* V2 Top-Left Badge */}
            <div className="absolute top-2 left-2 bg-slate-950/85 backdrop-blur-sm px-2.5 py-0.5 rounded text-[10px] font-mono text-violet-300 border border-violet-500/40 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 text-violet-400" />
              ExerciseDB V2 • 720p HD
            </div>

            {/* V2 Top-Right Difficulty Badge */}
            <div className="absolute top-2 right-2 bg-slate-950/85 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-amber-300 border border-amber-500/40 flex items-center gap-1 shadow-sm">
              <span>{exercise.v2.difficulty}</span>
            </div>
          </div>
        ) : (
          /* ExerciseDB V1 View */
          <div className="relative w-full h-48 sm:h-56 bg-white rounded-lg flex items-center justify-center overflow-hidden">
            {isV1Loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-sm z-10">
                <div className="w-6 h-6 border-2 border-mamba-cyan border-t-transparent rounded-full animate-spin mb-2" />
                <span className="text-[11px] font-mono text-white">Carregando ExerciseDB V1...</span>
              </div>
            )}
            <img
              src={exercise.gifUrl}
              alt={`${exercise.name} - ExerciseDB V1`}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
              onLoad={() => setIsV1Loading(false)}
              onError={() => setIsV1Loading(false)}
            />
            
            {/* V1 Top-Left Badge */}
            <div className="absolute top-2 left-2 bg-slate-950/85 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-mamba-cyan border border-mamba-cyan/40 flex items-center gap-1 shadow-sm">
              <Film className="w-3 h-3 text-mamba-cyan" />
              ExerciseDB V1 (Loop)
            </div>

            {/* V1 Bottom-Right Indicator */}
            <div className="absolute bottom-2 right-2 bg-slate-950/85 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 border border-slate-700/60 flex items-center gap-1 shadow-sm">
              <Eye className="w-3 h-3 text-mamba-cyan" />
              Execução Contínua
            </div>
          </div>
        )}
      </div>

      {/* Dedicated Info & Actions Toolbar below Media */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 px-1 py-1 mb-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-300 min-w-0">
          <Dumbbell className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'video' ? 'text-emerald-400' : activeTab === 'v2' ? 'text-violet-400' : 'text-mamba-cyan'}`} />
          <span className="font-mono text-[11px] text-slate-300 leading-snug">{exercise.v2.equipment}</span>
        </div>
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className={`self-end xs:self-auto shrink-0 px-2.5 py-1 rounded-lg border font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
            activeTab === 'video'
              ? 'bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border-emerald-500/40'
              : activeTab === 'v2'
              ? 'bg-violet-950/60 hover:bg-violet-900/60 text-violet-300 border-violet-500/40'
              : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-600/40'
          }`}
        >
          <span>{showDetails ? 'Ocultar Detalhes' : 'Instruções & Biomecânica'}</span>
          {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Step-by-Step Instructions & Pro Tips Drawer */}
      {(showDetails || gymMode) && (
        <div className="mb-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-3 animate-fadeIn">
          {/* Instructions */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
                Passo a Passo Biomecânico Oficial
              </span>
            </div>
            <div className="space-y-1.5">
              {exercise.v2.instructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          {exercise.v2.proTips && exercise.v2.proTips.length > 0 && (
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span className="text-[11px] font-mono text-amber-300 font-semibold">Pro Tips (@mamba & Fisioterapia)</span>
              </div>
              <ul className="space-y-1 text-[11px] text-slate-300">
                {exercise.v2.proTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-slate-300">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

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
        {/* Set Checklist with Thumb-friendly targets (44px) */}
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
