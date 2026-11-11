import React, { useState } from 'react';
import { WorkoutDay } from '../data/workouts';
import { ExerciseCard } from './ExerciseCard';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Zap, 
  Target, 
  ShieldCheck, 
  ShieldAlert,
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  ClipboardCheck,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WorkoutDetailViewProps {
  workout: WorkoutDay;
  onBackToHub: () => void;
  onNavigateToWorkout: (workoutId: 'treino-a' | 'treino-b' | 'treino-c' | 'treino-d') => void;
  onOpenGuidelines: () => void;
  onOpenChecklist: () => void;
  gymMode: boolean;
}

export const WorkoutDetailView: React.FC<WorkoutDetailViewProps> = ({
  workout,
  onBackToHub,
  onNavigateToWorkout,
  onOpenGuidelines,
  onOpenChecklist,
  gymMode,
}) => {
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | 'all'>('all');

  const totalExercises = workout.blocks.reduce((acc, b) => acc + b.exercises.length, 0);

  // Filtered blocks
  const visibleBlocks = selectedBlockIndex === 'all' 
    ? workout.blocks 
    : [workout.blocks[selectedBlockIndex]];

  // Navigation order
  const order: ('treino-a' | 'treino-b' | 'treino-c' | 'treino-d')[] = [
    'treino-a',
    'treino-b',
    'treino-c',
    'treino-d',
  ];
  const currentIndex = order.indexOf(workout.id);
  const prevWorkoutId = currentIndex > 0 ? order[currentIndex - 1] : null;
  const nextWorkoutId = currentIndex < order.length - 1 ? order[currentIndex + 1] : null;

  const handleFinishWorkout = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    onOpenChecklist();
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-24 md:pb-12">
      {/* Top Bar / Header with Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <button
          onClick={onBackToHub}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold bg-mamba-surface hover:bg-mamba-border text-slate-200 border border-mamba-border transition-all active:scale-95 w-fit shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-mamba-cyan" />
          <span>Voltar ao Hub de Treinos</span>
        </button>

        {/* Quick Prev / Next Switcher for Desktop & Mobile */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {prevWorkoutId && (
            <button
              onClick={() => {
                setSelectedBlockIndex('all');
                onNavigateToWorkout(prevWorkoutId);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-mamba-surface text-slate-300 hover:text-white border border-mamba-border flex items-center gap-1 active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>
          )}

          {nextWorkoutId && (
            <button
              onClick={() => {
                setSelectedBlockIndex('all');
                onNavigateToWorkout(nextWorkoutId);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-mamba-surface text-slate-300 hover:text-white border border-mamba-border flex items-center gap-1 active:scale-95"
            >
              <span>Próximo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Dedicated Workout Hero Banner */}
      <section 
        className="rounded-3xl p-5 sm:p-8 border relative overflow-hidden transition-all duration-300 shadow-xl"
        style={{
          background: `linear-gradient(135deg, ${workout.accentColor}15 0%, #10121a 100%)`,
          borderColor: `${workout.accentColor}40`,
        }}
      >
        <div 
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ backgroundColor: workout.accentColor }}
        />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span 
              className="text-xs font-mono font-bold px-3 py-1 rounded-full border tracking-wide uppercase"
              style={{
                backgroundColor: `${workout.accentColor}25`,
                color: workout.accentColor,
                borderColor: `${workout.accentColor}50`,
              }}
            >
              {workout.tag}
            </span>
            <span className="text-xs font-mono text-mamba-muted bg-mamba-dark/70 px-2.5 py-1 rounded-md border border-mamba-border flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {workout.dayOfWeek}
            </span>
            <span className="text-xs font-mono text-mamba-muted bg-mamba-dark/70 px-2.5 py-1 rounded-md border border-mamba-border flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {workout.duration}
            </span>
            <span className="text-xs font-mono text-mamba-emerald bg-mamba-dark/70 px-2.5 py-1 rounded-md border border-mamba-border flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Proteção Patelar 90°
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
            {workout.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {workout.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Target className="w-4 h-4 text-mamba-cyan shrink-0" />
                <span>Foco: <strong className="text-slate-100">{workout.focus}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Zap className="w-4 h-4 text-mamba-gold shrink-0" />
                <span>Via Energética: <strong className="text-slate-100">{workout.energySystem}</strong></span>
              </div>
            </div>

            <button
              onClick={onOpenGuidelines}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-mamba-cyan/15 text-mamba-cyan border border-mamba-cyan/30 hover:bg-mamba-cyan/25 transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Ver Diretrizes Articulares</span>
            </button>
          </div>
        </div>
      </section>

      {/* Block Filter Pills (Horizontal Scroll on Mobile) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-mamba-muted px-1">
          <span className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-mamba-cyan" />
            Navegar por Bloco:
          </span>
          <span>{totalExercises} exercícios totais</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
          <button
            onClick={() => setSelectedBlockIndex('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap border transition-all active:scale-95 shrink-0 ${
              selectedBlockIndex === 'all'
                ? 'bg-slate-100 text-slate-950 border-slate-100 shadow-md'
                : 'bg-mamba-surface text-slate-300 hover:text-white border-mamba-border'
            }`}
          >
            Todos os Blocos ({totalExercises})
          </button>

          {workout.blocks.map((block, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedBlockIndex(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap border transition-all active:scale-95 shrink-0 ${
                selectedBlockIndex === idx
                  ? 'bg-mamba-cyan text-slate-950 border-mamba-cyan shadow-md'
                  : 'bg-mamba-surface text-slate-300 hover:text-white border-mamba-border'
              }`}
            >
              {block.name.split('—')[0].trim()} ({block.exercises.length})
            </button>
          ))}
        </div>
      </div>

      {/* Blocks & Exercise Cards Grid */}
      <div className="space-y-8">
        {visibleBlocks.map((block, bIdx) => (
          <section key={bIdx} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-mamba-border">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-mamba-surface border border-mamba-border text-mamba-cyan font-mono font-bold text-sm flex items-center justify-center">
                  {selectedBlockIndex === 'all' ? bIdx + 1 : Number(selectedBlockIndex) + 1}
                </span>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                    {block.name}
                  </h2>
                  <p className="text-xs text-mamba-muted mt-0.5">
                    Meta: {block.goal} • Estimado: {block.duration}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-400 self-start sm:self-auto">
                {block.exercises.length} {block.exercises.length === 1 ? 'exercício' : 'exercícios'}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {block.exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  workoutColor={workout.accentColor}
                  gymMode={gymMode}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Session Finish & Bottom Quick Navigation Card */}
      <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-mamba-surface via-[#131622] to-mamba-surface border border-mamba-border flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-mamba-gold text-xs font-mono font-bold uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Conclusão da Sessão</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
            Finalizou o {workout.title.split('•')[0]}?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Registre o índice de dor patelar (EVA 0-10) e a intensidade subjetiva (RPE) no seu diário de 24 horas.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
          <button
            onClick={handleFinishWorkout}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-mamba-gold text-slate-950 hover:bg-mamba-gold/90 transition-all shadow-lg active:scale-95 min-h-[48px]"
          >
            <ClipboardCheck className="w-5 h-5" />
            <span>Registrar no Diário</span>
          </button>

          <button
            onClick={onBackToHub}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-mono font-bold bg-mamba-dark text-slate-200 border border-mamba-border hover:bg-mamba-surface transition-all active:scale-95 min-h-[48px]"
          >
            <span>Voltar ao Hub</span>
          </button>
        </div>
      </div>
    </div>
  );
};
