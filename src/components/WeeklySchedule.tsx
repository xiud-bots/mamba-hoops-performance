import React from 'react';
import { Calendar, Trophy, HeartPulse, ChevronRight, Zap } from 'lucide-react';

interface WeeklyScheduleProps {
  activeDayId: string;
  onSelectDay: (id: 'treino-a' | 'treino-b' | 'treino-c' | 'treino-d') => void;
}

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ activeDayId, onSelectDay }) => {
  const scheduleDays = [
    {
      id: 'treino-a',
      day: 'Segunda',
      title: 'Treino A',
      focus: 'Aceleração Linear & Terra Trap Bar',
      type: 'workout',
      color: '#38bdf8',
      tag: '50-60 min',
    },
    {
      id: 'treino-b',
      day: 'Terça',
      title: 'Treino B',
      focus: 'Potência Rotacional & Supino / Manguito',
      type: 'workout',
      color: '#8b5cf6',
      tag: '50-55 min',
    },
    {
      id: 'quarta-rec',
      day: 'Quarta',
      title: 'Recuperação Ativa',
      focus: 'Mobilidade Torácica & Fáscia Plantar',
      type: 'rest',
      color: '#64748b',
      tag: 'Off-Articular',
    },
    {
      id: 'treino-c',
      day: 'Quinta',
      title: 'Treino C',
      focus: 'Impulsão Vertical & Búlgaro 90°',
      type: 'workout',
      color: '#10b981',
      tag: '55-60 min',
    },
    {
      id: 'treino-d',
      day: 'Sexta',
      title: 'Treino D (Opcional)',
      focus: 'Agilidade Lateral & Tiros RSA 1:5',
      type: 'workout',
      color: '#f59e0b',
      tag: '35-40 min',
    },
    {
      id: 'sabado-court',
      day: 'Sábado',
      title: 'Dia de Quadra',
      focus: 'Basquete Real com Máximo Frescor do SNC',
      type: 'game',
      color: '#ec4899',
      tag: 'MATCH DAY 🏀',
    },
    {
      id: 'domingo-rest',
      day: 'Domingo',
      title: 'Descanso Total',
      focus: 'Supercompensação & Blindagem',
      type: 'rest',
      color: '#64748b',
      tag: 'Regeneração',
    },
  ];

  return (
    <div className="bg-mamba-card border border-mamba-border rounded-2xl p-4 sm:p-6 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-mamba-border">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-mamba-cyan" />
          <h2 className="text-base sm:text-lg font-bold text-slate-100">
            Microciclo Semanal de Preparação Física
          </h2>
        </div>
        <span className="text-xs font-mono text-mamba-muted bg-mamba-surface px-2.5 py-1 rounded-md border border-mamba-border">
          Fase 1: Semanas 1 a 4
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
        {scheduleDays.map((item) => {
          const isSelected = activeDayId === item.id;
          const isInteractive = item.type === 'workout';

          return (
            <div
              key={item.id}
              onClick={() => {
                if (isInteractive) {
                  onSelectDay(item.id as 'treino-a' | 'treino-b' | 'treino-c' | 'treino-d');
                }
              }}
              className={`rounded-xl p-3 border transition-all flex flex-col justify-between ${
                isInteractive ? 'cursor-pointer' : 'cursor-default'
              } ${
                isSelected
                  ? 'bg-mamba-surface border-mamba-cyan shadow-glow-cyan/20 ring-1 ring-mamba-cyan'
                  : 'bg-mamba-dark/70 border-mamba-border/80 hover:border-mamba-muted/50'
              } ${item.type === 'game' ? 'bg-gradient-to-b from-pink-950/20 to-mamba-dark border-pink-500/30' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono text-mamba-muted uppercase">
                    {item.day}
                  </span>
                  <span
                    className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                      border: `1px solid ${item.color}40`,
                    }}
                  >
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  {item.title}
                  {item.type === 'game' && <Trophy className="w-3.5 h-3.5 text-pink-400" />}
                </h3>

                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {item.focus}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-mamba-border/50 flex items-center justify-between text-[10px] font-mono">
                {isInteractive ? (
                  <span className="text-mamba-cyan flex items-center gap-1">
                    Ver Exercícios <ChevronRight className="w-3 h-3" />
                  </span>
                ) : item.type === 'game' ? (
                  <span className="text-pink-400 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Pico de Jogo
                  </span>
                ) : (
                  <span className="text-slate-500 flex items-center gap-1">
                    <HeartPulse className="w-3 h-3" /> Regenerativo
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
