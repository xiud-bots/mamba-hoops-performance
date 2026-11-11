import React, { useState } from 'react';
import { WORKOUT_DAYS, WorkoutDay } from './data/workouts';
import { Navbar } from './components/Navbar';
import { ExerciseCard } from './components/ExerciseCard';
import { WeeklySchedule } from './components/WeeklySchedule';
import { BiomechanicalGuidelinesModal } from './components/BiomechanicalGuidelinesModal';
import { ChecklistModal } from './components/ChecklistModal';
import { 
  Clock, 
  Target, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Mail, 
  Calendar
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeDayId, setActiveDayId] = useState<'treino-a' | 'treino-b' | 'treino-c' | 'treino-d'>('treino-a');
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState<boolean>(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState<boolean>(false);
  const [gymMode, setGymMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const currentDay: WorkoutDay = WORKOUT_DAYS.find((d) => d.id === activeDayId) || WORKOUT_DAYS[0];

  return (
    <div className={`min-h-screen flex flex-col bg-mamba-dark text-slate-100 ${gymMode ? 'bg-[#050608]' : ''}`}>
      {/* Top Navigation */}
      <Navbar
        activeDayId={activeDayId}
        onSelectDay={(id) => setActiveDayId(id)}
        onOpenGuidelines={() => setIsGuidelinesOpen(true)}
        onOpenChecklist={() => setIsChecklistOpen(true)}
        gymMode={gymMode}
        onToggleGymMode={() => setGymMode(!gymMode)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Day Header Banner */}
        <section 
          className="rounded-3xl p-6 sm:p-8 border relative overflow-hidden transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${currentDay.accentColor}12 0%, #10121a 100%)`,
            borderColor: `${currentDay.accentColor}40`,
            boxShadow: `0 10px 30px -10px ${currentDay.accentColor}20`,
          }}
        >
          {/* Decorative laser circle */}
          <div 
            className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ backgroundColor: currentDay.accentColor }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span 
                  className="text-xs font-mono font-bold px-3 py-1 rounded-full border tracking-wide uppercase"
                  style={{
                    backgroundColor: `${currentDay.accentColor}20`,
                    color: currentDay.accentColor,
                    borderColor: `${currentDay.accentColor}50`,
                  }}
                >
                  {currentDay.tag}
                </span>
                <span className="text-xs font-mono text-mamba-muted bg-mamba-dark/60 px-2.5 py-1 rounded-md border border-mamba-border flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {currentDay.dayOfWeek}
                </span>
                <span className="text-xs font-mono text-mamba-muted bg-mamba-dark/60 px-2.5 py-1 rounded-md border border-mamba-border flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {currentDay.duration}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
                {currentDay.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {currentDay.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Target className="w-4 h-4 text-mamba-cyan" />
                  <span>Foco Biomecânico: <strong className="text-slate-100">{currentDay.focus}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Zap className="w-4 h-4 text-mamba-gold" />
                  <span>Sistema Energético: <strong className="text-slate-100">{currentDay.energySystem}</strong></span>
                </div>
              </div>
            </div>

            {/* Quick stats badge */}
            <div className="flex flex-row lg:flex-col gap-3 shrink-0">
              <div className="bg-mamba-dark/80 backdrop-blur-sm border border-mamba-border rounded-2xl p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-mamba-emerald/20 text-mamba-emerald border border-mamba-emerald/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-mamba-muted uppercase block">Proteção</span>
                  <span className="text-xs font-bold text-slate-200">Trava 90° Joelho E.</span>
                </div>
              </div>

              <div className="bg-mamba-dark/80 backdrop-blur-sm border border-mamba-border rounded-2xl p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-mamba-purple/20 text-mamba-purple border border-mamba-purple/30">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-mamba-muted uppercase block">Volume Total</span>
                  <span className="text-xs font-bold text-slate-200">
                    {currentDay.blocks.reduce((acc, b) => acc + b.exercises.length, 0)} Exercícios
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Schedule Roadmap */}
        <WeeklySchedule
          activeDayId={activeDayId}
          onSelectDay={(id) => setActiveDayId(id)}
        />

        {/* Workout Blocks & Exercises */}
        <div className="space-y-10">
          {currentDay.blocks.map((block, bIdx) => (
            <section key={bIdx} className="space-y-4">
              {/* Block Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-mamba-border">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-mamba-surface border border-mamba-border text-mamba-cyan font-mono font-bold text-sm flex items-center justify-center">
                    {bIdx + 1}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-100">
                      {block.name}
                    </h3>
                    <p className="text-xs text-mamba-muted mt-0.5">
                      Objetivo: {block.goal} • Estimado: {block.duration}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400 self-start sm:self-auto">
                  {block.exercises.length} {block.exercises.length === 1 ? 'exercício' : 'exercícios'}
                </span>
              </div>

              {/* Grid of Exercises */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                {block.exercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    workoutColor={currentDay.accentColor}
                    gymMode={gymMode}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="border-t border-mamba-border bg-mamba-dark/95 py-8 mt-12 text-xs text-mamba-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-mamba-surface border border-mamba-border flex items-center justify-center text-mamba-purple font-black">
              M
            </div>
            <div>
              <p className="font-semibold text-slate-300">
                Mamba Hoops Performance • Biomecânica & Blindagem Articular
              </p>
              <p className="text-[11px] text-mamba-muted">
                Plano de Preparação Física para Basquetebol • Fase 1 (Semanas 1 a 4)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsGuidelinesOpen(true)}
              className="hover:text-mamba-cyan transition-colors"
            >
              Diretrizes Clínicas
            </button>
            <span>•</span>
            <button
              onClick={() => setIsChecklistOpen(true)}
              className="hover:text-mamba-gold transition-colors"
            >
              Checklist 24h
            </button>
            <span>•</span>
            <a
              href="mailto:xiudsales@gmail.com"
              className="flex items-center gap-1 hover:text-slate-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              xiudsales@gmail.com
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <BiomechanicalGuidelinesModal
        isOpen={isGuidelinesOpen}
        onClose={() => setIsGuidelinesOpen(false)}
      />

      <ChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
    </div>
  );
};
