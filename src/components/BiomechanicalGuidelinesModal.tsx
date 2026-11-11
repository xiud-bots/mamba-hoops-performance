import React from 'react';
import { X, ShieldAlert, CheckCircle, AlertTriangle, Activity, Zap, Compass, HeartPulse } from 'lucide-react';

interface BiomechanicalGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BiomechanicalGuidelinesModal: React.FC<BiomechanicalGuidelinesModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-mamba-card border border-mamba-border rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-mamba-border bg-mamba-surface/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-mamba-purple/20 text-mamba-purple border border-mamba-purple/30">
              <ShieldAlert className="w-5 h-5 text-mamba-purple" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
                Diretrizes Biomecânicas & Protocolo Fisioterapêutico
              </h2>
              <p className="text-xs text-mamba-muted">
                Prescrição de @mamba (Head of Athletic Performance) • Blindagem Articular
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-mamba-dark hover:bg-mamba-border text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Card 1: Joelho Esquerdo & Fossa Poplítea */}
          <div className="p-4 rounded-xl bg-mamba-dark/80 border border-mamba-rose/30">
            <div className="flex items-center gap-2 text-mamba-rose font-bold text-sm uppercase tracking-wide mb-2">
              <AlertTriangle className="w-4 h-4" />
              1. Joelho Esquerdo: Fossa Poplítea & Posterior sob Flexão Terminal
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 mb-3">
              A queixa na região posterior do joelho esquerdo ocorre tipicamente sob flexão profunda (bunda no calcanhar) ou compressão articular extrema. As estruturas envolvidas são o tendão do <strong>poplíteo</strong>, a inserção proximal da cabeça medial do <strong>gastrocnêmio</strong> ou o corno posterior do <strong>menisco</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-mamba-surface/60 p-3 rounded-lg border border-mamba-border">
              <div>
                <span className="font-semibold text-mamba-emerald flex items-center gap-1.5 mb-1">
                  <CheckCircle className="w-3.5 h-3.5" /> O QUE FAZER
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li>Limitar a flexão de joelho a <strong>90°</strong> (paralelo ao chão) em todos os agachamentos.</li>
                  <li>Priorizar o <strong>Trap Bar Deadlift</strong> em vez do agachamento tradicional (maior hip hinge, menos flexão).</li>
                  <li>Trabalhar panturrilha sentado para isolar o <strong>sóleo</strong> sem estressar o gastrocnêmio proximal.</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-mamba-rose flex items-center gap-1.5 mb-1">
                  <X className="w-3.5 h-3.5" /> O QUE EVITAR
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li>Agachamento profundo ass-to-grass sob carga livre pesada.</li>
                  <li>Leg Press com amplitude além de 90° forçando o joelho esquerdo.</li>
                  <li>Mesa flexora deitada com carga pesada e perna totalmente dobrada.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2: Tendinopatia Patelar & Spanish Squat */}
          <div className="p-4 rounded-xl bg-mamba-dark/80 border border-mamba-cyan/30">
            <div className="flex items-center gap-2 text-mamba-cyan font-bold text-sm uppercase tracking-wide mb-2">
              <Activity className="w-4 h-4" />
              2. Tendinopatia Patelar: O Protocolo da Isometria Espanhola
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 mb-2">
              O <strong>Spanish Squat</strong> (com superband grossa atrás dos joelhos e canelas 100% verticais a 90°) induz <em>inibição cortical motora</em>, reduzindo a dor do tendão patelar por até 45 minutos após a realização.
            </p>
            <div className="p-3 bg-mamba-surface/60 rounded-lg border border-mamba-border text-xs text-slate-300">
              <strong>Como executar:</strong> Prenda a faixa em uma coluna estável. Posicione a fita logo abaixo da dobra posterior do joelho. Dê passos para trás até sentir tração forte. Sente-se a 90° com as canelas retas. Segure 35 a 45 segundos.
            </div>
          </div>

          {/* Card 3: Regra das 24 Horas */}
          <div className="p-4 rounded-xl bg-mamba-dark/80 border border-mamba-gold/30">
            <div className="flex items-center gap-2 text-mamba-gold font-bold text-sm uppercase tracking-wide mb-2">
              <Compass className="w-4 h-4" />
              3. A Regra de Ouro das 24 Horas
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              A resposta do tendão à carga ocorre 24 horas após o estímulo. Avalie seu joelho sempre na <strong>manhã seguinte</strong> ao treino:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300">
                <span className="font-bold block mb-1">🟢 ZONA VERDE</span>
                Sem dor ou rigidez matinal menor que 5 minutos nos primeiros passos. Mantenha as cargas.
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/40 text-amber-300">
                <span className="font-bold block mb-1">🟡 ZONA AMARELA</span>
                Desconforto leve (3/10) que passa em 10 minutos. Mantenha o volume mas reduza a carga em 10-15%.
              </div>
              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300">
                <span className="font-bold block mb-1">🔴 ZONA VERMELHA</span>
                Dor aguda (&gt;4/10) ou inchaço ao acordar. Pause impactos por 48h e foque em isometria analgésica.
              </div>
            </div>
          </div>

          {/* Card 4: Primeiro Passo & Salto Vertical */}
          <div className="p-4 rounded-xl bg-mamba-dark/80 border border-mamba-purple/30">
            <div className="flex items-center gap-2 text-mamba-purple font-bold text-sm uppercase tracking-wide mb-2">
              <Zap className="w-4 h-4" />
              4. Biomecânica de Basquete: O Primeiro Passo e o Sóleo
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              No basquete, a aceleração inicial depende de um <strong>Positive Shin Angle (ângulo positivo de tíbia a 45°)</strong>. O músculo <strong>Sóleo</strong> suporta até 8x o peso corporal em cada passada de desaceleração. Treinar o sóleo pesado garante que o tendão patelar não absorva o choque das paradas bruscas.
            </p>
          </div>

          {/* Card 5: O Sábado de Quadra */}
          <div className="p-4 rounded-xl bg-mamba-dark/80 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-200 font-bold text-sm uppercase tracking-wide mb-2">
              <HeartPulse className="w-4 h-4 text-mamba-cyan" />
              5. Manejo do Dia de Jogo (Sábado)
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              O Treino C (Impulsão) é posicionado na <strong>quinta-feira</strong> para garantir 48 horas de recuperação até o rachão de basquete no sábado. Na sexta-feira, o Treino D é 100% facultativo: se houver cansaço residual, faça apenas mobilidade leve e hidratação.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-mamba-border bg-mamba-surface/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-mamba-purple hover:bg-mamba-violet text-white font-medium text-xs sm:text-sm transition-all shadow-glow-purple"
          >
            Entendido, Fechar Diretrizes
          </button>
        </div>
      </div>
    </div>
  );
};
