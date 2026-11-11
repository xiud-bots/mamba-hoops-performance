import React from 'react';
import { WORKOUT_DAYS, WorkoutDay } from '../data/workouts';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Zap, 
  ShieldAlert, 
  ClipboardCheck, 
  Dumbbell, 
  Flame, 
  HeartPulse, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface WorkoutHubProps {
  onSelectWorkout: (workoutId: 'treino-a' | 'treino-b' | 'treino-c' | 'treino-d') => void;
  onOpenGuidelines: () => void;
  onOpenChecklist: () => void;
}

export const WorkoutHub: React.FC<WorkoutHubProps> = ({
  onSelectWorkout,
  onOpenGuidelines,
  onOpenChecklist,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn pb-24 md:pb-8">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-mamba-purple/30 bg-gradient-to-br from-mamba-purple/15 via-[#10121a] to-mamba-dark shadow-2xl">
        <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-mamba-purple/20 blur-3xl pointer-events-none" />
        <div className="absolute right-12 bottom-0 opacity-10 pointer-events-none hidden lg:block">
          <Dumbbell className="w-64 h-64 text-mamba-purple" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-mamba-purple/25 text-mamba-purple border border-mamba-purple/40 uppercase tracking-wider">
              Fase 1 • Semanas 1 a 4
            </span>
            <span className="text-xs font-mono text-mamba-muted bg-mamba-dark/70 px-2.5 py-1 rounded-md border border-mamba-border flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-mamba-emerald" />
              Blindagem Articular & Explosão
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight leading-tight">
            Programa de Preparação Física para Basquetebol
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Selecione a sessão do dia para entrar no <strong className="text-mamba-cyan font-semibold">modo de treino focado</strong> com animações em tempo real, cronômetro de descanso auditivo e controle de volume por série.
          </p>

          {/* Quick Action Badges */}
          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={onOpenGuidelines}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-mamba-cyan/15 text-mamba-cyan border border-mamba-cyan/30 hover:bg-mamba-cyan/25 transition-all shadow-sm active:scale-95"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Diretrizes de Fisioterapia</span>
            </button>
            <button
              onClick={onOpenChecklist}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-mamba-gold/15 text-mamba-gold border border-mamba-gold/30 hover:bg-mamba-gold/25 transition-all shadow-sm active:scale-95"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Diário de Dor & RPE (24h)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid of Workouts (Cards Móveis Otimizados) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-mamba-border">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-mamba-cyan" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-100">
              Sessões do Microciclo Semanal
            </h2>
          </div>
          <span className="text-xs font-mono text-mamba-muted">
            4 Treinos + Recuperação Ativa
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {WORKOUT_DAYS.map((workout: WorkoutDay) => {
            const totalExercises = workout.blocks.reduce((acc, b) => acc + b.exercises.length, 0);

            return (
              <div
                key={workout.id}
                onClick={() => onSelectWorkout(workout.id)}
                className="group relative rounded-2xl p-5 sm:p-6 border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between hover:translate-y-[-2px] active:scale-[0.99]"
                style={{
                  background: `linear-gradient(135deg, ${workout.accentColor}0a 0%, #10121a 100%)`,
                  borderColor: `${workout.accentColor}30`,
                  boxShadow: `0 8px 24px -10px ${workout.accentColor}15`,
                }}
              >
                {/* Accent glow on hover */}
                <div 
                  className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-2xl opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none"
                  style={{ backgroundColor: workout.accentColor }}
                />

                <div className="space-y-4 relative z-10">
                  {/* Card Header Top */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span 
                        className="text-xs font-mono font-bold px-3 py-1 rounded-full border tracking-wide uppercase"
                        style={{
                          backgroundColor: `${workout.accentColor}20`,
                          color: workout.accentColor,
                          borderColor: `${workout.accentColor}50`,
                        }}
                      >
                        {workout.dayOfWeek}
                      </span>
                      <span className="text-xs font-mono text-mamba-muted flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {workout.duration}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold text-slate-400 bg-mamba-surface px-2.5 py-1 rounded-lg border border-mamba-border">
                      {totalExercises} exercícios
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-100 group-hover:text-white transition-colors">
                      {workout.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      {workout.subtitle}
                    </p>
                  </div>

                  {/* Focus & Energy Details */}
                  <div className="p-3 rounded-xl bg-mamba-dark/80 border border-mamba-border space-y-1.5 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Zap className="w-3.5 h-3.5 text-mamba-cyan shrink-0" />
                      <span className="line-clamp-1">Foco: <strong className="text-slate-100">{workout.focus}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-mamba-muted">
                      <Flame className="w-3.5 h-3.5 text-mamba-gold shrink-0" />
                      <span className="line-clamp-1">Via: {workout.energySystem}</span>
                    </div>
                  </div>

                  {/* Exercise Preview List Pills */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-mamba-muted uppercase tracking-wider block">
                      Blocos da sessão:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {workout.blocks.map((b, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono bg-mamba-surface/90 text-slate-300 border border-mamba-border px-2 py-0.5 rounded-md"
                        >
                          {b.name.split('—')[0].trim()} ({b.exercises.length})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Big Action Button (Mobile Touch Friendly) */}
                <div className="mt-6 pt-4 border-t border-mamba-border/80 flex items-center justify-between relative z-10">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-mamba-cyan" />
                    Página Única do Treino
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectWorkout(workout.id);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight text-slate-950 transition-all shadow-md group-hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: workout.accentColor,
                    }}
                  >
                    <span>Abrir Treino</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Active Recovery Card (Quarta-Feira / Descanso Ativo) */}
          <div className="rounded-2xl p-5 sm:p-6 border border-mamba-emerald/30 bg-gradient-to-br from-mamba-emerald/10 via-[#10121a] to-mamba-dark flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-mamba-emerald/20 text-mamba-emerald border border-mamba-emerald/40 uppercase">
                  Quarta-Feira • Recuperação Ativa
                </span>
                <span className="text-xs font-mono text-mamba-muted">
                  30-40 min
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                  Mobilidade de Tornozelo & Liberação Miofascial
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Dia estratégico sem sobrecarga axial nem pliometria. Foco em restaurar amplitude do tornozelo e descontrair a fossa poplítea.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-mamba-dark/80 border border-mamba-border text-xs font-mono space-y-1.5 text-slate-300">
                <div className="flex items-center gap-2 text-mamba-emerald">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Liberação de fáscia plantar com bolinha de lacrosse (5 min/pé)</span>
                </div>
                <div className="flex items-center gap-2 text-mamba-emerald">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Knee-to-wall com foco em dorsiflexão sem valgo (3x10 reps)</span>
                </div>
                <div className="flex items-center gap-2 text-mamba-emerald">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Mobilidade de quadril 90/90 e respiração diafragmática</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-mamba-border flex items-center justify-between">
              <span className="text-xs font-mono text-mamba-muted">
                Sem impacto articular
              </span>
              <button
                onClick={onOpenGuidelines}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-mamba-emerald/20 text-mamba-emerald border border-mamba-emerald/40 hover:bg-mamba-emerald/30 transition-all"
              >
                <span>Ver Protocolo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
