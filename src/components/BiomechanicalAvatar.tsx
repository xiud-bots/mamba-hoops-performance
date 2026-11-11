import React from 'react';

interface BiomechanicalAvatarProps {
  type: 'deadlift' | 'squat' | 'calf' | 'bench' | 'row' | 'pulldown' | 'jump' | 'plank' | 'bridge' | 'sprint' | 'mobility';
  jointAngles?: {
    kneeLimit?: string;
    shinAngle?: string;
    torsoAngle?: string;
  };
}

export const BiomechanicalAvatar: React.FC<BiomechanicalAvatarProps> = ({ type, jointAngles }) => {
  return (
    <div className="relative w-full h-56 bg-mamba-dark/90 rounded-xl border border-mamba-border/80 flex items-center justify-center overflow-hidden p-3 group">
      {/* Background grid representing biomechanics motion capture floor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2433_1px,transparent_1px),linear-gradient(to_bottom,#1f2433_1px,transparent_1px)] bg-[size:16px_16px] opacity-25" />
      
      {/* Scanner laser animation line */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-mamba-cyan to-transparent animate-pulse opacity-40 top-1/4 pointer-events-none" />

      {/* SVG Canvas for specific exercise */}
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full max-h-48 drop-shadow-[0_0_12px_rgba(6,182,212,0.25)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Floor line */}
        <line x1="20" y1="140" x2="180" y2="140" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />
        
        {type === 'squat' && (
          <g className="animate-subtle-squat">
            {/* Spanish Squat / 90 deg limiter */}
            <circle cx="100" cy="30" r="10" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Torso */}
            <line x1="100" y1="40" x2="95" y2="85" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
            {/* Thigh (horizontal 90 deg) */}
            <line x1="95" y1="85" x2="135" y2="85" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" />
            {/* Shin (strictly 90 deg vertical to floor) */}
            <line x1="135" y1="85" x2="135" y2="140" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" />
            {/* Foot */}
            <line x1="135" y1="140" x2="155" y2="140" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
            
            {/* Arms / balance */}
            <line x1="100" y1="50" x2="140" y2="55" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
            
            {/* Band behind knees */}
            <line x1="60" y1="85" x2="135" y2="85" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
            <text x="65" y="80" fill="#f59e0b" fontSize="8" fontFamily="monospace">Band Tensão</text>
            
            {/* 90 degree angle marker */}
            <path d="M 125,85 L 125,95 L 135,95" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <text x="142" y="95" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">90° LOCK</text>
          </g>
        )}

        {type === 'deadlift' && (
          <g>
            {/* Head */}
            <circle cx="85" cy="45" r="10" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Torso with Hip Hinge angle */}
            <line x1="85" y1="55" x2="115" y2="85" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
            {/* Thigh */}
            <line x1="115" y1="85" x2="95" y2="115" stroke="#8b5cf6" strokeWidth="4.5" strokeLinecap="round" />
            {/* Shin */}
            <line x1="95" y1="115" x2="95" y2="140" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" />
            {/* Foot */}
            <line x1="90" y1="140" x2="115" y2="140" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
            {/* Arms holding Trap Bar handle */}
            <line x1="90" y1="62" x2="105" y2="110" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
            {/* Barbell load line / Ground Reaction Force vector */}
            <line x1="105" y1="110" x2="105" y2="140" stroke="#f59e0b" strokeWidth="3" />
            <polygon points="105,75 101,83 109,83" fill="#38bdf8" />
            <line x1="105" y1="80" x2="105" y2="105" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
            <text x="120" y="70" fill="#8b5cf6" fontSize="9" fontWeight="bold" fontFamily="monospace">HIP HINGE</text>
            <text x="110" y="85" fill="#38bdf8" fontSize="8" fontFamily="monospace">▲ Tração F</text>
          </g>
        )}

        {type === 'jump' && (
          <g>
            {/* Jumping / Landing mechanics */}
            <circle cx="100" cy="35" r="9" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2.5" />
            <line x1="100" y1="44" x2="96" y2="80" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
            {/* Knees soft landing 90-110 deg */}
            <line x1="96" y1="80" x2="120" y2="105" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="120" y1="105" x2="105" y2="140" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" />
            {/* Ground reaction force arrow */}
            <polygon points="105,115 101,123 109,123" fill="#10b981" />
            <line x1="105" y1="120" x2="105" y2="140" stroke="#10b981" strokeWidth="2" />
            <text x="115" y="125" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">SILENT LANDING</text>
            <text x="35" y="60" fill="#f59e0b" fontSize="8" fontFamily="monospace">Dissipação Muscular</text>
          </g>
        )}

        {type === 'sprint' && (
          <g>
            {/* 45 degree acceleration angle */}
            <line x1="50" y1="140" x2="140" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
            <circle cx="125" cy="50" r="9" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2.5" />
            {/* 45 degree torso */}
            <line x1="120" y1="58" x2="95" y2="90" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
            {/* Drive leg */}
            <line x1="95" y1="90" x2="125" y2="100" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="125" y1="100" x2="110" y2="125" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" />
            {/* Push leg driving ground */}
            <line x1="95" y1="90" x2="70" y2="115" stroke="#8b5cf6" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="70" y1="115" x2="50" y2="140" stroke="#8b5cf6" strokeWidth="4.5" strokeLinecap="round" />
            <text x="125" y="115" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="monospace">45° SHIN ANGLE</text>
          </g>
        )}

        {type === 'calf' && (
          <g>
            {/* Seated calf / standing calf mechanism */}
            <circle cx="100" cy="35" r="9" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="2.5" />
            <line x1="100" y1="44" x2="100" y2="85" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
            <line x1="100" y1="85" x2="135" y2="85" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
            {/* Knee at 90 deg -> Gastrocnemius slack, Soleus isolated */}
            <line x1="135" y1="85" x2="135" y2="130" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
            <line x1="135" y1="130" x2="155" y2="140" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
            {/* Pad load */}
            <rect x="125" y="75" width="20" height="8" rx="2" fill="#f59e0b" />
            <text x="35" y="95" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">SÓLEO ISOLADO</text>
            <text x="35" y="108" fill="#94a3b8" fontSize="8" fontFamily="monospace">Joelho 90° (Zero dor poplítea)</text>
          </g>
        )}

        {type === 'bench' && (
          <g>
            {/* Bench */}
            <rect x="40" y="95" width="120" height="8" rx="2" fill="#334155" />
            <line x1="60" y1="103" x2="60" y2="140" stroke="#334155" strokeWidth="3" />
            <line x1="140" y1="103" x2="140" y2="140" stroke="#334155" strokeWidth="3" />
            {/* Athlete lying */}
            <circle cx="60" cy="85" r="8" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2" />
            <line x1="68" y1="91" x2="120" y2="91" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
            {/* Leg drive */}
            <line x1="120" y1="91" x2="135" y2="115" stroke="#f1f5f9" strokeWidth="3.5" />
            <line x1="135" y1="115" x2="145" y2="140" stroke="#f1f5f9" strokeWidth="3.5" />
            {/* Arm pressing */}
            <line x1="85" y1="91" x2="85" y2="55" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="75" y1="55" x2="95" y2="55" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
            <text x="100" y="55" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">45° COTOVELO</text>
            <text x="85" y="130" fill="#10b981" fontSize="8" fontFamily="monospace">Leg Drive Estável</text>
          </g>
        )}

        {type === 'row' && (
          <g>
            {/* Incline bench chest supported */}
            <line x1="50" y1="130" x2="110" y2="65" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
            <circle cx="115" cy="55" r="8" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="2" />
            <line x1="110" y1="65" x2="70" y2="110" stroke="#f1f5f9" strokeWidth="4" />
            {/* Arm pulling back with scapula retraction */}
            <line x1="100" y1="75" x2="90" y2="95" stroke="#8b5cf6" strokeWidth="3.5" />
            <circle cx="90" cy="95" r="4" fill="#f59e0b" />
            <text x="110" y="85" fill="#8b5cf6" fontSize="9" fontWeight="bold" fontFamily="monospace">RETRAÇÃO ESCAPULAR</text>
            <text x="30" y="45" fill="#38bdf8" fontSize="8" fontFamily="monospace">Apoio Torácico Total</text>
          </g>
        )}

        {type === 'pulldown' && (
          <g>
            {/* Lat Pulldown */}
            <rect x="70" y="100" width="40" height="6" rx="2" fill="#334155" />
            <circle cx="90" cy="70" r="8" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2" />
            <line x1="90" y1="78" x2="90" y2="105" stroke="#f1f5f9" strokeWidth="4" />
            {/* Arms V shape */}
            <line x1="90" y1="82" x2="70" y2="60" stroke="#38bdf8" strokeWidth="3.5" />
            <line x1="90" y1="82" x2="110" y2="60" stroke="#38bdf8" strokeWidth="3.5" />
            <line x1="55" y1="50" x2="125" y2="50" stroke="#94a3b8" strokeWidth="3" />
            <text x="65" y="40" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">LATÍSSIMO & COSTAS</text>
          </g>
        )}

        {type === 'plank' && (
          <g>
            {/* Long Lever / Copenhagen plank */}
            <line x1="40" y1="120" x2="160" y2="120" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
            {/* Rigid body line */}
            <circle cx="140" cy="95" r="7" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
            <line x1="55" y1="110" x2="135" y2="98" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" />
            {/* Elbows forward (long lever) */}
            <line x1="125" y1="100" x2="130" y2="120" stroke="#f1f5f9" strokeWidth="3" />
            <text x="60" y="80" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">RIGIDEZ LOMBAR 100%</text>
            <text x="60" y="92" fill="#94a3b8" fontSize="8" fontFamily="monospace">Pressão Zero no Joelho</text>
          </g>
        )}

        {type === 'bridge' && (
          <g>
            {/* Glute bridge */}
            <circle cx="60" cy="120" r="7" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="2" />
            {/* Torso diagonal */}
            <line x1="66" y1="122" x2="110" y2="105" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
            {/* Thigh extending up */}
            <line x1="110" y1="105" x2="140" y2="115" stroke="#8b5cf6" strokeWidth="4.5" strokeLinecap="round" />
            {/* Shin */}
            <line x1="140" y1="115" x2="140" y2="140" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
            <text x="80" y="90" fill="#8b5cf6" fontSize="9" fontWeight="bold" fontFamily="monospace">EXTENSÃO DE GLÚTEO</text>
          </g>
        )}

        {type === 'mobility' && (
          <g>
            {/* Dynamic Mobility / Rotational Vector */}
            <circle cx="100" cy="70" r="28" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 3" className="animate-spin origin-center" style={{ animationDuration: '10s' }} />
            <circle cx="100" cy="70" r="8" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2" />
            <path d="M 85,70 Q 100,50 115,70" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            <polygon points="117,72 119,65 112,68" fill="#f59e0b" />
            <text x="65" y="115" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">MOBILIDADE ARTICULAR</text>
            <text x="62" y="128" fill="#94a3b8" fontSize="8" fontFamily="monospace">Amplitude Ativa Segura</text>
          </g>
        )}
      </svg>

      {/* Floating badges */}
      <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-mamba-surface/90 px-2.5 py-1 rounded-md border border-mamba-border text-[10px] text-mamba-muted font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-mamba-cyan animate-ping" />
        Kinematic Vector Engine
      </div>

      {jointAngles && (
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {jointAngles.kneeLimit && (
            <span className="text-[10px] bg-mamba-emerald/20 text-mamba-emerald border border-mamba-emerald/40 px-2 py-0.5 rounded font-mono font-medium">
              {jointAngles.kneeLimit}
            </span>
          )}
          {jointAngles.shinAngle && (
            <span className="text-[10px] bg-mamba-sky/20 text-mamba-sky border border-mamba-sky/40 px-2 py-0.5 rounded font-mono font-medium">
              {jointAngles.shinAngle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
