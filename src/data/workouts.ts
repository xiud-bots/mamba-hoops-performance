export interface ExerciseDBV2Data {
  hdWebpUrl: string;
  posterUrl: string;
  resolution: '720p' | '1080p';
  equipment: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  targetMuscle: string;
  secondaryMuscles: string[];
  instructions: string[];
  proTips: string[];
}

export interface Exercise {
  id: string;
  name: string;
  category: 'mobilidade' | 'potencia' | 'forca' | 'core' | 'agilidade' | 'esd';
  sets: string;
  reps: string;
  restSec: number;
  cadence?: string;
  rpe?: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  biomechanicalCue: string;
  physioNote: string;
  // ExerciseDB V1 Classic (180p/360p GIF Loop)
  gifUrl: string;
  // ExerciseDB V2 Flagship (720p HD WebP, Step-by-Step Instructions & Pro Tips)
  v2: ExerciseDBV2Data;
  defaultView?: 'v1' | 'v2';
  // Opcionais mantidos para compatibilidade
  svgModelType?: 'deadlift' | 'squat' | 'calf' | 'bench' | 'row' | 'pulldown' | 'jump' | 'plank' | 'bridge' | 'sprint' | 'mobility';
  jointAngles?: {
    kneeLimit?: string;
    shinAngle?: string;
    torsoAngle?: string;
  };
}

export interface WorkoutDay {
  id: 'treino-a' | 'treino-b' | 'treino-c' | 'treino-d';
  title: string;
  subtitle: string;
  dayOfWeek: string;
  duration: string;
  focus: string;
  energySystem: string;
  accentColor: string;
  tag: string;
  blocks: {
    name: string;
    duration: string;
    goal: string;
    exercises: Exercise[];
  }[];
}

const GIF_BASE = 'https://raw.githubusercontent.com/mohamedatef90/exercise-library/main/gifs';

export const WORKOUT_DAYS: WorkoutDay[] = [
  {
    id: 'treino-a',
    title: 'Treino A • Aceleração Linear & Força Bilateral',
    subtitle: 'Primeiro passo explosivo, extensão potente de quadril e tração de solo.',
    dayOfWeek: 'Segunda-Feira',
    duration: '50-60 min',
    focus: 'Ângulo de ataque de canela, extensão potente de quadril e rigidez do sóleo',
    energySystem: 'ATP-CP & Força Máxima Dinâmica',
    accentColor: '#38bdf8', // Cyan
    tag: 'LOWER INTENSITY / EXTENSION',
    blocks: [
      {
        name: 'Bloco 1 — Mobilidade, Ativação & Prehab',
        duration: '10 min',
        goal: 'Inibição cortical da dor patelar e ganho de amplitude de tornozelo',
        exercises: [
          {
            id: 'a-myofascial',
            name: 'Liberação Miofascial (Panturrilha & Planta do Pé)',
            category: 'mobilidade',
            sets: '2 séries',
            reps: '1 min por perna',
            restSec: 30,
            primaryMuscles: ['Gastrocnêmio proximal', 'Fáscia Plantar'],
            secondaryMuscles: ['Sóleo', 'Poplíteo'],
            biomechanicalCue: 'Pressione com firmeza sobre pontos de nós de tensão na panturrilha e na sola do pé. Respire profundamente.',
            physioNote: 'Soltar o gastrocnêmio proximal reduz a tração de estiramento na fossa poplítea do joelho esquerdo.',
            gifUrl: `${GIF_BASE}/17bqEXD.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/a-myofascial-hd.webp',
              posterUrl: '/assets/v2/a-myofascial-poster.webp',
              resolution: '720p',
              equipment: "Rolo de Liberação Miofascial (Foam Roller) / Bolinha Lacrosse",
              difficulty: "Iniciante",
              targetMuscle: "Gastrocnêmio proximal",
              secondaryMuscles: ['Sóleo', 'Poplíteo'],
              instructions: [
                "Posicione o terço proximal da panturrilha sobre o rolo ou bolinha com a perna oposta cruzada por cima para calibrar a pressão.",
                "Deslize lentamente de 2 a 3 cm por segundo procurando pontos-gatilho (trigger points) de maior densidade.",
                "Ao encontrar um ponto doloroso, mantenha a pressão estática por 20 a 30 segundos enquanto realiza flexão e dorsiflexão ativa do tornozelo.",
                "Repita o processo na fáscia plantar pisando sobre a bolinha com pressão progressiva do calcanhar até os metatarsos."
],
              proTips: [
                "Não aplique pressão direta sobre a fossa poplítea (atrás do joelho) para proteger estruturas vasculares e nervosas.",
                "A respiração diafragmática profunda reduz o tônus simpático e facilita a inibição autogênica do fuso muscular."
]
            },
            svgModelType: 'mobility',
          },
          {
            id: 'a-ankle-knee-wall',
            name: 'Dorsiflexão de Tornozelo na Parede (Knee-to-Wall)',
            category: 'mobilidade',
            sets: '2 séries',
            reps: '8 reps cada lado (2s pausa)',
            restSec: 30,
            primaryMuscles: ['Tibial Anterior', 'Sóleo'],
            secondaryMuscles: ['Ligamentos do Tornozelo'],
            biomechanicalCue: 'Mantenha o calcanhar cravado no chão enquanto projeta o joelho em direção à parede em linha reta sobre o 2º dedo.',
            physioNote: 'Dorsiflexão livre previne que o joelho colapse em valgo dinâmico durante acelerações e aterrissagens.',
            gifUrl: `${GIF_BASE}/PzNxakt.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/a-ankle-knee-wall-hd.webp',
              posterUrl: '/assets/v2/a-ankle-knee-wall-poster.webp',
              resolution: '720p',
              equipment: "Parede / Fita Métrica no Solo",
              difficulty: "Iniciante",
              targetMuscle: "Tibial Anterior",
              secondaryMuscles: ['Ligamentos do Tornozelo'],
              instructions: [
                "Fique em posição de meio-ajoelhado ou em pé com o dedão do pé posicionado a 8-10 cm de distância da parede.",
                "Mantenha o calcanhar cravado no chão sem permitir que o arco plantar desabe (pé em tripé).",
                "Projete o joelho para frente em linha reta mirando entre o 2º e 3º dedo até encostar na parede.",
                "Segure a contração isométrica final por 2 segundos sentindo o estiramento profundo do sóleo e retorne lentamente."
],
              proTips: [
                "Se o calcanhar levantar do chão antes de atingir a parede, reduza a distância em 1 cm para manter a integridade da alavanca.",
                "Mantenha a tíbia alinhada com o pé, impedindo que o joelho colapse medialmente (valgo dinâmico)."
]
            },
            svgModelType: 'mobility',
            jointAngles: { shinAngle: '45° ataque' },
          },
          {
            id: 'a-spanish-squat',
            name: 'Isometria Espanhola (Spanish Squat com Superband)',
            category: 'mobilidade',
            sets: '3 séries',
            reps: '35–40 segundos (70% esforço)',
            restSec: 45,
            primaryMuscles: ['Quadríceps (Vasto Medial e Reto Femoral)'],
            secondaryMuscles: ['Glúteo Máximo'],
            biomechanicalCue: 'Superband grossa atrás dos joelhos. Canelas perfeitamente verticais (90° em relação ao chão). Sente-se no vazio.',
            physioNote: 'Induz analgesia imediata no tendão patelar por inibição cortical motora, sem cisalhamento articular.',
            gifUrl: '/assets/spanish-squat-v1.gif',
            v2: {
              hdWebpUrl: '/assets/v2/a-spanish-squat-hd.webp',
              posterUrl: '/assets/v2/a-spanish-squat-poster.webp',
              resolution: '720p',
              equipment: "Superband Extra-Forte (45mm) ancorada em poste/rack",
              difficulty: "Intermediário",
              targetMuscle: "Quadríceps (Vasto Medial e Reto Femoral)]",
              secondaryMuscles: ['Glúteo Máximo'],
              instructions: [
                "Passe a superband atrás dos joelhos (imediatamente abaixo da prega poplítea) com forte tensão horizontal puxando para frente.",
                "Adote a largura de quadril nos pés e distribua o peso nos calcanhares e meio do pé.",
                "Desça flexionando o quadril mantendo as canelas rigorosamente perpendiculares ao solo (tíbias a 90°).",
                "Sustente a isometria por 35 a 45 segundos empurrando ativamente os joelhos para trás contra a faixa elástica."
],
              proTips: [
                "O vetor de tração anterior da elástica anula a força de cisalhamento anterior da tíbia, isolando a contração do quadríceps.",
                "Excelente protocolo analgésico: execute antes de treinos de força para diminuir a dor inibitória no tendão patelar."
]
            },
            defaultView: 'v2',
            svgModelType: 'squat',
            jointAngles: { kneeLimit: 'Trava 90° exata', shinAngle: '90° vertical pura' },
          },
          {
            id: 'a-glute-bridge',
            name: 'Ponte de Glúteo Unilateral (Single-Leg Glute Bridge)',
            category: 'mobilidade',
            sets: '2 séries',
            reps: '10 reps por perna',
            restSec: 45,
            primaryMuscles: ['Glúteo Máximo'],
            secondaryMuscles: ['Isquiotibiais', 'Core'],
            biomechanicalCue: 'Empurre o solo exclusivamente através do calcanhar. Trave o glúteo no topo sem hiperextender a coluna lombar.',
            physioNote: 'Ativação seletiva do motor primário de aceleração no basquete sem compressão de joelho.',
            gifUrl: `${GIF_BASE}/rmEukuS.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/a-glute-bridge-hd.webp',
              posterUrl: '/assets/v2/a-glute-bridge-poster.webp',
              resolution: '720p',
              equipment: "Colchonete de Solo / Peso Corporal",
              difficulty: "Iniciante",
              targetMuscle: "Glúteo Máximo]",
              secondaryMuscles: ['Isquiotibiais', 'Core'],
              instructions: [
                "Deite-se de barriga para cima com os joelhos flexionados a 90° e pés apoiados na largura do quadril.",
                "Tire um dos pés do chão trazendo o joelho flexionado em direção ao peito para travar a pelve em neutro.",
                "Empurre o solo através do calcanhar de apoio estendendo o quadril até formar uma linha reta entre joelho, pelve e ombro.",
                "Sustente a contração máxima do glúteo por 1 a 2 segundos no topo sem hiperestender a coluna lombar e desça com controle."
],
              proTips: [
                "Pressione ativamente o calcanhar de apoio contra o solo para inibir a dominância dos isquiotibiais e focar no glúteo máximo.",
                "Mantenha as costelas abaixadas e abdômen firme durante todo o curso do movimento."
]
            },
            svgModelType: 'bridge',
          },
        ],
      },
      {
        name: 'Bloco 2 — Potência & Aceleração (SNC Fresco)',
        duration: '10 min',
        goal: 'Taxa de desenvolvimento de força (RFD) e rigidez elástica de tornozelo',
        exercises: [
          {
            id: 'a-wall-drill',
            name: 'Wall Drill — Troca de Passada Explosiva (Switch Drill)',
            category: 'potencia',
            sets: '3 séries',
            reps: '6 trocas rápidas por perna',
            restSec: 60,
            primaryMuscles: ['Flexores do Quadril', 'Glúteo Máximo'],
            secondaryMuscles: ['Sóleo', 'Panturrilha'],
            biomechanicalCue: 'Corpo inclinado a 45° em linha reta. Joelho sobe em direção ao peito com o pé em dorsiflexão ativa (toe up). Ataque o chão para trás.',
            physioNote: 'Mecânica pura do Primeiro Passo Explosivo no basquete (positive shin angle).',
            gifUrl: `${GIF_BASE}/PrQbjvB.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/a-wall-drill-hd.webp',
              posterUrl: '/assets/v2/a-wall-drill-poster.webp',
              resolution: '720p',
              equipment: "Parede Firme / Solo Aderente",
              difficulty: "Intermediário",
              targetMuscle: "Flexores do Quadril",
              secondaryMuscles: ['Sóleo', 'Panturrilha'],
              instructions: [
                "Apoie as duas mãos na parede na altura do peito e incline todo o corpo a 45°, formando uma linha reta dos calcanhares à cabeça.",
                "Eleve uma perna em tripla flexão (quadril a 90°, joelho flexionado e tornozelo em dorsiflexão ativa 'toe-up').",
                "Sob comando rápido e agressivo, execute a troca explosiva das pernas: o pé no ar ataca o chão para baixo e para trás enquanto o oposto sobe.",
                "Estabilize instantaneamente a posição de troca sem oscilação da pelve ou perda do ângulo de 45°."
],
              proTips: [
                "Foque em golpear o solo com o antepé rígido, transferindo força na mesma direção da linha de aceleração linear.",
                "Não deixe a coluna lombar curvar durante a troca; mantenha o core travado e glúteos contraídos."
]
            },
            svgModelType: 'sprint',
            jointAngles: { shinAngle: '45° positive shin angle', torsoAngle: '45° alinhado' },
          },
          {
            id: 'a-pogo-jumps',
            name: 'Pogo Jumps Reativos de Tornozelo (Stiff Ankle)',
            category: 'potencia',
            sets: '3 séries',
            reps: '15 segundos contínuos',
            restSec: 60,
            primaryMuscles: ['Tendão de Aquiles', 'Complexo Gastro-Sóleo'],
            secondaryMuscles: ['Fáscia Plantar'],
            biomechanicalCue: 'Joelhos destravados mas quase retos. Contato com o chão o mais curto e explosivo possível. O pé deve agir como uma mola de titânio.',
            physioNote: 'Construção de elasticidade passiva (ciclo de alongamento-encurtamento) para rebotes rápidos.',
            gifUrl: `${GIF_BASE}/mweqJin.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/a-pogo-jumps-hd.webp',
              posterUrl: '/assets/v2/a-pogo-jumps-poster.webp',
              resolution: '720p',
              equipment: "Piso Esportivo de Madeira ou Emborrachado",
              difficulty: "Intermediário",
              targetMuscle: "Tendão de Aquiles",
              secondaryMuscles: ['Fáscia Plantar'],
              instructions: [
                "Fique em pé ereto com os pés na largura do quadril e braços ao lado do corpo ou na cintura.",
                "Inicie pequenos saltos verticais contínuos gerando propulsão primária quase exclusiva pela articulação do tornozelo.",
                "Mantenha os joelhos quase estendidos (apenas microflexão elástica de 10-15° sem agachamento).",
                "Aterrisse e decole no mesmo milissegundo, minimizando o tempo de contato com o solo (GCT < 0.20s)."
],
              proTips: [
                "Mantenha o tornozelo em dorsiflexão pré-ativada no ar para maximizar o reflexo miotático de estiramento-encurtamento (SSC).",
                "Pense em tocar o chão como se ele fosse uma chapa quente, produzindo som seco e silencioso."
]
            },
            svgModelType: 'jump',
          },
        ],
      },
      {
        name: 'Bloco 3 — Força Principal & Estrutural',
        duration: '25 min',
        goal: 'Força máxima de tração e estabilidade mecânica de membros inferiores',
        exercises: [
          {
            id: 'a-trap-bar',
            name: 'Levantamento Terra Trap Bar (Pegada Alta)',
            category: 'forca',
            sets: '4 séries',
            reps: '6 reps',
            cadence: '2-1-X-1',
            rpe: 'RPE 7.5 (2 reps na reserva)',
            restSec: 90,
            primaryMuscles: ['Glúteos', 'Quadríceps', 'Isquiotibiais'],
            secondaryMuscles: ['Eretores da Espinha', 'Trapézio', 'Antebraço'],
            biomechanicalCue: 'Pés no centro da barra, peito aberto, dorsais engatadas. Empurre o chão com os pés como se fosse empurrar a Terra para baixo.',
            physioNote: 'A pegada alta reduz o braço de momento lombar e limita a flexão extrema do joelho esquerdo, eliminando a dor na fossa poplítea.',
            gifUrl: `${GIF_BASE}/jQGwmxN.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/a-trap-bar-hd.webp',
              posterUrl: '/assets/v2/a-trap-bar-poster.webp',
              resolution: '720p',
              equipment: "Hex Bar (Trap Bar Olímpica) com Pegada Alta + Anilhas",
              difficulty: "Avançado",
              targetMuscle: "Glúteos",
              secondaryMuscles: ['Eretores da Espinha', 'Trapézio', 'Antebraço'],
              instructions: [
                "Posicione-se no centro da barra hexagonal com os pés alinhados com o quadril e tíbias próximas ao eixo da carga.",
                "Flexione os quadris para trás (hip hinge) e joelhos moderadamente até alcançar a pegada alta neutra com braços estendidos.",
                "Arme as escápulas ('quebre a barra com as mãos'), encha o abdômen com manobra de Valsalva e tensione a barra antes de subir.",
                "Empurre o chão com os pés estendendo quadril e joelhos simultaneamente até a extensão ereta completa, sem puxar com os braços."
],
              proTips: [
                "A pegada alta reduz a amplitude de flexão do joelho para ângulos seguros (>70°), aliviando o estresse patelar enquanto sobrecarrega a cadeia posterior.",
                "Ao descer, guie a barra com os quadris recuando primeiro, mantendo as costas neutras e a barra sob controle."
]
            },
            svgModelType: 'deadlift',
            jointAngles: { kneeLimit: 'Flexão ~90° segura' },
          },
          {
            id: 'a-db-row-supported',
            name: 'Remada Curvada com Halteres no Banco Inclinado',
            category: 'forca',
            sets: '3 séries',
            reps: '8–10 reps',
            cadence: '2-0-1-1 (1s de contração)',
            restSec: 60,
            primaryMuscles: ['Latíssimo do Dorso', 'Romboides', 'Trapézio Médio'],
            secondaryMuscles: ['Bíceps', 'Deltoide Posterior'],
            biomechanicalCue: 'Peito apoiado no banco inclinado a 30-45°. Puxe os halteres trazendo os cotovelos rentes ao tronco.',
            physioNote: 'Estabilidade da cintura escapular para proteção de bola em infiltração e postura de arremesso.',
            gifUrl: `${GIF_BASE}/7vG5o25.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/a-db-row-supported-hd.webp',
              posterUrl: '/assets/v2/a-db-row-supported-poster.webp',
              resolution: '720p',
              equipment: "Banco Inclinado (30°–45°) + Par de Halteres",
              difficulty: "Intermediário",
              targetMuscle: "Latíssimo do Dorso",
              secondaryMuscles: ['Bíceps', 'Deltoide Posterior'],
              instructions: [
                "Deite-se de bruços com o peito apoiado firmemente no banco inclinado e os pés firmes no solo para estabilização da coluna.",
                "Segure um par de halteres com pegada neutra ou semi-pronada, deixando os braços caírem retos em direção ao solo.",
                "Inicie a puxada retraindo as escápulas e conduzindo os cotovelos para trás e ligeiramente para dentro na direção dos quadris.",
                "Aperte o grande dorsal e romboides no topo do movimento por 1 segundo e desça os halteres em cadência excêntrica de 3 segundos."
],
              proTips: [
                "O apoio total do peito no banco anula a sobrecarga axial na coluna lombar e elimina qualquer movimento compensatório de quadril.",
                "Pense em puxar com os cotovelos e não com as mãos para maximizar a ativação dorsal e diminuir a tensão no bíceps."
]
            },
            svgModelType: 'row',
          },
          {
            id: 'a-seated-calf',
            name: 'Flexão Plantar Sentado na Máquina para Sóleo',
            category: 'forca',
            sets: '3 séries',
            reps: '12 reps',
            cadence: '3-1-1-1 (3s descendo lento)',
            restSec: 60,
            primaryMuscles: ['Músculo Sóleo'],
            secondaryMuscles: ['Tendão de Aquiles'],
            biomechanicalCue: 'Desça bem os calcanhares para alongar a fáscia, faça uma pausa de 1 segundo no fundo e suba com força controlada.',
            physioNote: 'Com o joelho dobrado a 90°, o gastrocnêmio é desativado biomecanicamente, isolando o sóleo e protegendo a fossa poplítea.',
            gifUrl: `${GIF_BASE}/ktsFQAZ.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/a-seated-calf-hd.webp',
              posterUrl: '/assets/v2/a-seated-calf-poster.webp',
              resolution: '720p',
              equipment: "Máquina de Panturrilha Sentado (ou Halter sobre Joelho a 90°)",
              difficulty: "Intermediário",
              targetMuscle: "Músculo Sóleo]",
              secondaryMuscles: ['Tendão de Aquiles'],
              instructions: [
                "Sente-se na máquina com o apoio almofadado ajustado sobre o terço distal das coxas (imediatamente acima dos joelhos).",
                "Apoie apenas as pontas dos pés (cabeças dos metatarsos) na plataforma com calcanhares projetados no vazio.",
                "Desça os calcanhares em dorsiflexão máxima controlada sentindo o estiramento profundo do tendão de Aquiles e sóleo por 2 segundos.",
                "Empurre explosivamente com os metatarsos até a flexão plantar máxima (ponta dos pés) e sustente a contração por 2 segundos no pico."
],
              proTips: [
                "Com os joelhos flexionados a 90°, o gastrocnêmio entra em insuficiência ativa, forçando o músculo sóleo a realizar 85%+ do trabalho mecânico.",
                "O sóleo é o principal desacelerador da tíbia na corrida; sua força é o escudo primário contra a sobrecarga do tendão patelar."
]
            },
            svgModelType: 'calf',
          },
        ],
      },
      {
        name: 'Bloco 4 — Core Antirrotacional',
        duration: '8 min',
        goal: 'Rigidez toraco-lombar e transmissão de força na quadra',
        exercises: [
          {
            id: 'a-pallof-press',
            name: 'Pallof Press na Polia ou Superband',
            category: 'core',
            sets: '3 séries',
            reps: '10 reps cada lado (pausa 2s)',
            restSec: 45,
            primaryMuscles: ['Oblíquos Interno e Externo', 'Transverso do Abdômen'],
            secondaryMuscles: ['Glúteo Médio'],
            biomechanicalCue: 'Base atlética estável. Empurre o cabo para a frente e resista totalmente à força que tenta girar o seu tronco.',
            physioNote: 'Treino antirrotacional essencial para absorver trombadas na marcação sem sobrecarregar a coluna.',
            gifUrl: `${GIF_BASE}/9pa4H5m.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/a-pallof-press-hd.webp',
              posterUrl: '/assets/v2/a-pallof-press-poster.webp',
              resolution: '720p',
              equipment: "Polia com Puxador D ou Superband Ancorada na Altura do Esterno",
              difficulty: "Intermediário",
              targetMuscle: "Oblíquos Interno e Externo",
              secondaryMuscles: ['Glúteo Médio'],
              instructions: [
                "Fique em pé lateralmente à polia com pés na largura do quadril, joelhos destravados e pelve nivelada.",
                "Segure a manopla com as duas mãos junto ao centro do peito (esterno) com o cabo tensionado perpendicularmente ao corpo.",
                "Estenda os dois braços para a frente em linha reta, resistindo ativamente à força rotacional que tenta girar o tronco.",
                "Mantenha a posição estendida por 2 a 3 segundos com o abdômen contraído e retorne a manopla ao peito com controle."
],
              proTips: [
                "Anti-rotação pura: seu objetivo é permanecer imóvel como uma estátua; não deixe os ombros ou quadris girarem em direção à polia.",
                "Ativa intensamente o transverso do abdômen e oblíquos internos e externos, protegendo a coluna em mudanças de direção."
]
            },
            svgModelType: 'plank',
          },
          {
            id: 'a-deadbug',
            name: 'Deadbug com Pressão nas Mãos ou Bola Suíça',
            category: 'core',
            sets: '3 séries',
            reps: '8 reps por perna',
            restSec: 45,
            primaryMuscles: ['Reto Abdominal', 'Transverso'],
            secondaryMuscles: ['Psoas', 'Dorsais'],
            biomechanicalCue: 'Lombar colada no chão durante todo o movimento. Estenda braço e perna opostos soltando todo o ar pela boca.',
            physioNote: 'Dissociação motora de membros sem estresse na coluna lombar.',
            gifUrl: `${GIF_BASE}/iny3m5y.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/a-deadbug-hd.webp',
              posterUrl: '/assets/v2/a-deadbug-poster.webp',
              resolution: '720p',
              equipment: "Bola Suíça ou Colchonete de Solo",
              difficulty: "Iniciante",
              targetMuscle: "Reto Abdominal",
              secondaryMuscles: ['Psoas', 'Dorsais'],
              instructions: [
                "Deite-se de costas no solo, eleve os braços apontando para o teto e flexione quadris e joelhos a 90° (posição 'mesa').",
                "Pressione ativamente a coluna lombar contra o solo eliminando qualquer espaço sob as costas (retroversão pélvica leve).",
                "Estenda lentamente o braço direito para trás da cabeça enquanto estende a perna esquerda para a frente próximo ao chão.",
                "Retorne simultaneamente à posição inicial e alterne os membros opostos mantendo a lombar cravada no chão o tempo todo."
],
              proTips: [
                "Se a coluna lombar arquear do solo em qualquer ponto, reduza o alcance da perna para manter a pressão intra-abdominal ativa.",
                "Expirar ao afastar os membros ajuda a abaixar a caixa torácica e engajar os oblíquos profundos."
]
            },
            svgModelType: 'mobility',
          },
        ],
      },
    ],
  },
  {
    id: 'treino-b',
    title: 'Treino B • Potência Superior, Rotação & Blindagem',
    subtitle: 'Transferência de força pelo tronco, arremesso e proteção escapular.',
    dayOfWeek: 'Terça-Feira',
    duration: '50-55 min',
    focus: 'Potência rotacional de quadril, estabilidade de ombro e manutenção de rigidez patelar',
    energySystem: 'Anaeróbio Alático & Força Hipertrófica',
    accentColor: '#8b5cf6', // Mamba Purple
    tag: 'UPPER POWER & ROTATION',
    blocks: [
      {
        name: 'Bloco 1 — Preparação Escapular & Prehab',
        duration: '10 min',
        goal: 'Mobilidade torácica e ativação patelar',
        exercises: [
          {
            id: 'b-open-books',
            name: 'Mobilidade Torácica Open Books (Deitado de Lado)',
            category: 'mobilidade',
            sets: '2 séries',
            reps: '8 reps cada lado',
            restSec: 30,
            primaryMuscles: ['Coluna Torácica', 'Peitoral Menor'],
            secondaryMuscles: ['Romboides'],
            biomechanicalCue: 'Joelhos flexionados a 90° e travados no chão. Abra o braço acompanhando com o olhar até tocar a escápula no chão oposto.',
            physioNote: 'Rotação torácica livre evita torção compensatória na lombar ao passar ou arremessar.',
            gifUrl: `${GIF_BASE}/jDOKRM5.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/b-open-books-hd.webp',
              posterUrl: '/assets/v2/b-open-books-poster.webp',
              resolution: '720p',
              equipment: "Colchonete de Solo / Foam Roller Opcional",
              difficulty: "Iniciante",
              targetMuscle: "Coluna Torácica",
              secondaryMuscles: ['Romboides'],
              instructions: [
                "Deite-se de lado com os joelhos e quadris flexionados a 90°, empilhados um sobre o outro (ou perna de cima sobre o foam roller).",
                "Estenda ambos os braços para a frente na altura dos ombros com as palmas das mãos unidas.",
                "Inspire e abra o braço superior em um arco amplo sobre o corpo, girando a caixa torácica até a escápula quase encostar no chão oposto.",
                "Acompanhe a mão com o olhar, expire no final da amplitude e retorne lentamente à posição inicial."
],
              proTips: [
                "Mantenha a pelve e os joelhos perfeitamente colados no chão/rolo; o movimento deve vir 100% da coluna torácica e não da lombar.",
                "A mobilidade torácica é essencial para arremessos equilibrados e prevenção de dores nos ombros e região cervical."
]
            },
            svgModelType: 'mobility',
          },
          {
            id: 'b-wall-slides',
            name: 'Wall Slides com Rotação Externa Escapular',
            category: 'mobilidade',
            sets: '2 séries',
            reps: '10 reps',
            restSec: 30,
            primaryMuscles: ['Serrátil Anterior', 'Trapézio Inferior'],
            secondaryMuscles: ['Manguito Rotador'],
            biomechanicalCue: 'Costas e antebraços colados na parede. Deslize para cima mantendo o contato sem arquear a lombar.',
            physioNote: 'Ativação do serrátil para permitir ritmo escapuloumeral suave no arremesso.',
            gifUrl: `${GIF_BASE}/x306lCW.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/b-wall-slides-hd.webp',
              posterUrl: '/assets/v2/b-wall-slides-poster.webp',
              resolution: '720p',
              equipment: "Parede Lisa / Solo Aderente",
              difficulty: "Iniciante",
              targetMuscle: "Serrátil Anterior",
              secondaryMuscles: ['Manguito Rotador'],
              instructions: [
                "Fique em pé encostado na parede com calcanhares a 10 cm, lombar apoiada, escápulas e parte posterior da cabeça coladas na parede.",
                "Posicione os braços em 'W' (cotovelos a 90° e dorso das mãos encostando na parede na altura das orelhas).",
                "Deslize os braços para cima em direção ao teto em formato de 'Y', mantendo contato contínuo dos cotovelos e punhos com a parede.",
                "Atinja a máxima elevação sem arquear a coluna lombar, aperte as escápulas para cima e desça lentamente de volta ao 'W'."
],
              proTips: [
                "Ativação do serrátil anterior e trapézio inferior: crucial para a mecânica de elevação do braço no arremesso de basquete.",
                "Se as mãos descolarem da parede, não force; trabalhe na amplitude disponível mantendo as costelas abaixadas."
]
            },
            svgModelType: 'mobility',
          },
          {
            id: 'b-wall-sit',
            name: 'Isometria de Agachamento na Parede (Wall Sit 90°)',
            category: 'mobilidade',
            sets: '3 séries',
            reps: '30 segundos',
            restSec: 45,
            primaryMuscles: ['Quadríceps'],
            secondaryMuscles: ['Glúteos'],
            biomechanicalCue: 'Costas apoiadas, coxas rigorosamente paralelas ao chão (90° no joelho), calcanhares empurrando o chão.',
            physioNote: 'Dose adicional de remodelamento de colágeno patelar em ângulo estritamente seguro.',
            gifUrl: '/assets/wall-sit-v1.gif',
            v2: {
              hdWebpUrl: '/assets/v2/b-wall-sit-hd.webp',
              posterUrl: '/assets/v2/b-wall-sit-poster.webp',
              resolution: '720p',
              equipment: "Parede Lisa e Firme",
              difficulty: "Intermediário",
              targetMuscle: "Quadríceps]",
              secondaryMuscles: ['Glúteos'],
              instructions: [
                "Encoste as costas totalmente na parede e deslize para baixo até que as coxas fiquem perfeitamente paralelas ao chão.",
                "Garanta que os joelhos fiquem a exatamente 90° de flexão e as tíbias verticais, com os tornozelos posicionados sob os joelhos.",
                "Pressione a coluna lombar e as escápulas firmemente contra a parede e descanse os braços ao lado do tronco (sem apoiar nas coxas).",
                "Sustente a posição imóvel por 45 a 60 segundos respirando de forma controlada e constante."
],
              proTips: [
                "A angulação de 90° com tíbia vertical maximiza o tempo sob tensão do quadríceps reduzindo o torque de cisalhamento patelar.",
                "Concentre a pressão nos calcanhares e na borda externa dos pés para estabilizar as cabeças dos fêmures."
]
            },
            svgModelType: 'squat',
            jointAngles: { kneeLimit: 'Trava 90° estrita' },
          },
        ],
      },
      {
        name: 'Bloco 2 — Potência Balística & Transferência Cinética',
        duration: '10 min',
        goal: 'Velocidade de saída de braço e pivô rotacional de quadril',
        exercises: [
          {
            id: 'b-mb-chest-pass',
            name: 'Arremesso Explosivo de Medicine Ball contra a Parede',
            category: 'potencia',
            sets: '3 séries',
            reps: '6 reps (MB 3-5kg)',
            restSec: 60,
            primaryMuscles: ['Peitorais', 'Tríceps', 'Deltoide Anterior'],
            secondaryMuscles: ['Core'],
            biomechanicalCue: 'Passo à frente dinâmico empurrando o chão e soltando a bola na parede com velocidade máxima de passe de peito.',
            physioNote: 'Desenvolve a aceleração terminal dos membros superiores para passes longos de contra-ataque.',
            gifUrl: `${GIF_BASE}/aDoFKrE.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/b-mb-chest-pass-hd.webp',
              posterUrl: '/assets/v2/b-mb-chest-pass-poster.webp',
              resolution: '720p',
              equipment: "Medicine Ball (3 a 5 kg) + Parede de Concreto",
              difficulty: "Intermediário",
              targetMuscle: "Peitorais",
              secondaryMuscles: ['Core'],
              instructions: [
                "Fique em pé em base atlética e estável (pés na largura dos ombros) a cerca de 1.5 a 2 metros da parede.",
                "Segure a medicine ball com as duas mãos junto ao centro do peito com os cotovelos apontados para fora a 45°.",
                "Faça uma contração rápida do core e arremesse a bola explosivamente contra a parede com a força conjunta do peito, ombros e tríceps.",
                "Receba o rebote da bola amortecendo o impacto de volta ao peito e prepare instantaneamente a repetição seguinte."
],
              proTips: [
                "Intenção máxima de velocidade: o objetivo não é cansar, mas disparar o sistema neuromuscular com potência concêntrica máxima.",
                "Mantenha a base firme e pés cravados; a energia deve fluir dos membros inferiores e core para os membros superiores."
]
            },
            svgModelType: 'bench',
          },
          {
            id: 'b-rotational-slam',
            name: 'Slam Rotacional de Medicine Ball no Chão',
            category: 'potencia',
            sets: '3 séries',
            reps: '5 cada lado',
            restSec: 60,
            primaryMuscles: ['Oblíquos', 'Glúteo Médio/Máximo'],
            secondaryMuscles: ['Dorsais'],
            biomechanicalCue: 'Gire os quadris e arremesse a bola com violência ao lado do pé da frente, absorvendo na posição atlética.',
            physioNote: 'Transferência da força gerada nos pés através do quadril até as mãos.',
            gifUrl: `${GIF_BASE}/jCrtE9b.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/b-rotational-slam-hd.webp',
              posterUrl: '/assets/v2/b-rotational-slam-poster.webp',
              resolution: '720p',
              equipment: "Medicine Ball Slam (Sem Quique, 4 a 7 kg)",
              difficulty: "Intermediário",
              targetMuscle: "Oblíquos",
              secondaryMuscles: ['Dorsais'],
              instructions: [
                "Fique em pé com pés na largura do quadril, segurando a bola à frente do corpo.",
                "Gire o tronco elevando a bola em um arco acima do ombro direito enquanto faz o pivô no pé direito (quadril abre).",
                "Acelere a descida golpeando a bola violentamente contra o chão ao lado do pé esquerdo, usando os oblíquos e dorsal.",
                "Recolha a bola agachando com quadril recuado e repita imediatamente o movimento girando para o lado oposto."
],
              proTips: [
                "O pivô com o pé de trás é fundamental para permitir a rotação livre do quadril sem sobrecarregar a articulação do joelho.",
                "Expire com força no momento do impacto no solo para recrutar a musculatura abdominal profunda de forma balística."
]
            },
            svgModelType: 'mobility',
          },
        ],
      },
      {
        name: 'Bloco 3 — Força Superior & Manguito',
        duration: '25 min',
        goal: 'Força de empurrar, puxar e saúde do ombro de arremesso',
        exercises: [
          {
            id: 'b-db-bench',
            name: 'Supino Reto com Halteres (Dumbbell Bench Press)',
            category: 'forca',
            sets: '4 séries',
            reps: '8 reps',
            cadence: '2-1-X-0',
            rpe: 'RPE 7.5',
            restSec: 90,
            primaryMuscles: ['Peitoral Maior', 'Tríceps'],
            secondaryMuscles: ['Deltoide Anterior'],
            biomechanicalCue: 'Halteres angulados a 45° em relação ao corpo. Pés plantados no chão gerando leg drive contínuo.',
            physioNote: 'O uso de halteres independentes permite rotação natural do punho e protege a cápsula anterior do ombro.',
            gifUrl: `${GIF_BASE}/SpYC0Kp.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/b-db-bench-hd.webp',
              posterUrl: '/assets/v2/b-db-bench-poster.webp',
              resolution: '720p',
              equipment: "Banco Plano + Par de Halteres Pesados",
              difficulty: "Intermediário",
              targetMuscle: "Peitoral Maior",
              secondaryMuscles: ['Deltoide Anterior'],
              instructions: [
                "Sente-se na ponta do banco com os halteres apoiados nas coxas; deite-se para trás trazendo os pesos até a altura do peito.",
                "Posicione os pés cravados no solo, retraia as escápulas contra o banco e mantenha cotovelos a 45° em relação ao tronco.",
                "Empurre os halteres para cima em trajetória convergente até a extensão quase total dos cotovelos (sem bater os pesos).",
                "Desça os halteres em velocidade controlada (2 a 3 segundos) até o nível do peito sentindo o peitoral alongar e repita."
],
              proTips: [
                "O uso de halteres permite pronação/supinação natural dos punhos, poupando a articulação glenoumeral em comparação com a barra rígida.",
                "Mantenha os glúteos colados no banco e mantenha arco torácico fisiológico firme durante toda a série."
]
            },
            svgModelType: 'bench',
          },
          {
            id: 'b-lat-pulldown',
            name: 'Puxada Alta Pronada ou Neutra na Polia (Lat Pulldown)',
            category: 'forca',
            sets: '3 séries',
            reps: '8–10 reps',
            cadence: '3-0-1-1',
            restSec: 60,
            primaryMuscles: ['Latíssimo do Dorso', 'Redondo Maior'],
            secondaryMuscles: ['Bíceps', 'Braquial'],
            biomechanicalCue: 'Puxe a barra em direção à parte superior do esterno, mantendo o peito inflado e os cotovelos apontando para o chão.',
            physioNote: 'Dorsais fortes são fundamentais para rebotes e disputas de espaço aéreo.',
            gifUrl: `${GIF_BASE}/RVwzP10.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/b-lat-pulldown-hd.webp',
              posterUrl: '/assets/v2/b-lat-pulldown-poster.webp',
              resolution: '720p',
              equipment: "Máquina de Puxada Alta (Lat Pulldown) com Barra Neutra ou Reta",
              difficulty: "Intermediário",
              targetMuscle: "Latíssimo do Dorso",
              secondaryMuscles: ['Bíceps', 'Braquial'],
              instructions: [
                "Ajuste os rolos de apoio de coxas para travar as pernas firmemente no banco e segure a barra com pegada ligeiramente mais larga que os ombros.",
                "Sente-se com o peito erguido, coluna neutra e uma leve inclinação de tronco para trás (10-15°).",
                "Inicie o movimento deprimindo as escápulas ('ombros longe das orelhas') e puxe a barra em direção à parte superior do peito.",
                "Segure 1 segundo no ponto de máxima contração dorsal e estenda os braços de volta controlando o peso até alongar completamente o dorsal."
],
              proTips: [
                "Nunca puxe a barra atrás da nuca, pois isso impõe risco mecânico severo ao manguito rotador e coluna cervical.",
                "Conduza a puxada com os cotovelos apontando para baixo e para dentro na direção das costelas laterais."
]
            },
            svgModelType: 'pulldown',
          },
          {
            id: 'b-face-pull',
            name: 'Face Pulls com Rotação Externa na Polia Alta',
            category: 'forca',
            sets: '3 séries',
            reps: '12 reps',
            cadence: '2-0-1-2 (2s segurando atrás)',
            restSec: 60,
            primaryMuscles: ['Deltoide Posterior', 'Infraespinhal', 'Redondo Menor'],
            secondaryMuscles: ['Trapézio Médio/Inferior'],
            biomechanicalCue: 'Puxe a corda em direção aos olhos, terminando com as mãos ao lado das orelhas em posição de duplo bíceps.',
            physioNote: 'Equilibra o excesso de força anterior dos atletas de basquete e previne lesões de manguito rotador.',
            gifUrl: `${GIF_BASE}/ZfyAGhK.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/b-face-pull-hd.webp',
              posterUrl: '/assets/v2/b-face-pull-poster.webp',
              resolution: '720p',
              equipment: "Polia Alta com Corda Dupla de Tríceps",
              difficulty: "Intermediário",
              targetMuscle: "Deltoide Posterior",
              secondaryMuscles: ['Trapézio Médio/Inferior'],
              instructions: [
                "Ajuste a polia na altura do rosto ou ligeiramente acima; segure as pontas da corda com pegada neutra ou com polegares voltados para trás.",
                "Dê um passo para trás em base estável (pés paralelos ou semi-afastados) e incline o tronco sutilmente para trás.",
                "Puxe o centro da corda em direção ao nariz separando as duas pontas e rodando externamente os ombros (cotovelos altos e para trás).",
                "Contraia fortemente os deltoides posteriores e rotadores externos no topo por 2 segundos e retorne com controle."
],
              proTips: [
                "Movimento número um para blindagem de ombros de atletas arremessadores: combate a rotação interna causada por supino e drible.",
                "Certifique-se de que as mãos terminem acima dos cotovelos no final da puxada para garantir a rotação externa do úmero."
]
            },
            svgModelType: 'row',
          },
        ],
      },
      {
        name: 'Bloco 4 — Core Frontal & Isquiotibiais Isométricos',
        duration: '8 min',
        goal: 'Controle pélvico e contração posterior sem flexão de joelho',
        exercises: [
          {
            id: 'b-long-lever-plank',
            name: 'Prancha Frontal com Cotovelos à Frente (Long Lever)',
            category: 'core',
            sets: '3 séries',
            reps: '30 segundos',
            restSec: 45,
            primaryMuscles: ['Reto Abdominal', 'Transverso'],
            secondaryMuscles: ['Glúteos', 'Serrátil'],
            biomechanicalCue: 'Cotovelos posicionados à frente da linha dos ombros. Aperte os glúteos e puxe o umbigo para as costelas.',
            physioNote: 'Aumenta exponencialmente o recrutamento abdominal sem gerar pressão na coluna lombar.',
            gifUrl: `${GIF_BASE}/VBAWRPG.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/b-long-lever-plank-hd.webp',
              posterUrl: '/assets/v2/b-long-lever-plank-poster.webp',
              resolution: '720p',
              equipment: "Colchonete de Solo / Cronômetro",
              difficulty: "Avançado",
              targetMuscle: "Reto Abdominal",
              secondaryMuscles: ['Glúteos', 'Serrátil'],
              instructions: [
                "Posicione-se em prancha frontal com os cotovelos apoiados no solo mais à frente que o habitual (na linha dos olhos ou nariz).",
                "Apoie as pontas dos pés no chão na largura do quadril, encaixe a pelve em retroversão e contraia os glúteos no máximo.",
                "Pressione os antebraços ativamente contra o solo tentando 'puxar os cotovelos em direção aos pés' sem movê-los (tensão isométrica máxima).",
                "Sustente a posição rígida como uma tábua por 25 a 35 segundos sem deixar a lombar desabar."
],
              proTips: [
                "Ao aumentar o braço de alavanca com os cotovelos à frente, o torque sobre a parede abdominal duplica em relação à prancha comum.",
                "Se sentir qualquer desconforto na lombar, recue os cotovelos 5 cm para restaurar o recrutamento anterior do abdômen."
]
            },
            svgModelType: 'plank',
          },
          {
            id: 'b-elevated-glute-bridge',
            name: 'Ponte de Glúteo com Calcanhares Elevados',
            category: 'core',
            sets: '3 séries',
            reps: '10 reps (3s isometria)',
            restSec: 45,
            primaryMuscles: ['Glúteo Máximo', 'Isquiotibiais'],
            secondaryMuscles: ['Eretores'],
            biomechanicalCue: 'Calcanhares sobre um degrau baixo ou anilha. Joelho mantido em ângulo aberto (~100-110°).',
            physioNote: 'Trabalha isquiotibiais em contração isométrica em cadeia cinética fechada sem forçar a dobra do joelho esquerdo.',
            gifUrl: `${GIF_BASE}/qg2PGl6.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/b-elevated-glute-bridge-hd.webp',
              posterUrl: '/assets/v2/b-elevated-glute-bridge-poster.webp',
              resolution: '720p',
              equipment: "Banco Plano (ou Step 30-40cm) + Colchonete",
              difficulty: "Intermediário",
              targetMuscle: "Glúteo Máximo",
              secondaryMuscles: ['Eretores'],
              instructions: [
                "Deite-se no solo de costas e posicione os calcanhares apoiados sobre o banco com os joelhos flexionados a aproximadamente 80-90°.",
                "Braços estendidos ao lado do corpo com as palmas voltadas para baixo para apoio.",
                "Empurre os calcanhares para baixo contra o banco elevando os quadris até a extensão completa em linha com joelhos e ombros.",
                "Sustente a contração máxima nos isquiotibiais e glúteos por 2 segundos no topo e desça sem encostar totalmente o quadril no chão."
],
              proTips: [
                "A elevação dos calcanhares recruta ativamente a porção proximal dos isquiotibiais e glúteo máximo através de maior amplitude.",
                "Mantenha a dorsiflexão ativa dos tornozelos ('dedos apontados para o teto') durante toda a série."
]
            },
            svgModelType: 'bridge',
          },
        ],
      },
    ],
  },
  {
    id: 'treino-c',
    title: 'Treino C • Impulsão Vertical & Cadeia Posterior',
    subtitle: 'Salto vertical, mecânica de aterrissagem suave e força unilateral.',
    dayOfWeek: 'Quinta-Feira',
    duration: '55-60 min',
    focus: 'Aterrissagem silenciosa, agachamento unilateral a 90° e absorção excêntrica',
    energySystem: 'Potência Pliométrica & Força Unilateral',
    accentColor: '#10b981', // Emerald
    tag: 'VERTICAL JUMP & LANDING MECHANICS',
    blocks: [
      {
        name: 'Bloco 1 — Mobilidade & Prehab Específico',
        duration: '10 min',
        goal: 'Preparação do quadril e ativação dos dorsiflexores',
        exercises: [
          {
            id: 'c-fascia-ball',
            name: 'Liberação da Fáscia Plantar com Bolinha',
            category: 'mobilidade',
            sets: '2 séries',
            reps: '1 min por pé',
            restSec: 20,
            primaryMuscles: ['Fáscia Plantar'],
            secondaryMuscles: ['Musculatura Intrínseca do Pé'],
            biomechanicalCue: 'Role a bolinha de tênis/lacrosse com pressão firme do calcanhar até a base dos dedos.',
            physioNote: 'Restaura a mobilidade do arco longitudinal medial do pé para absorção de choque.',
            gifUrl: `${GIF_BASE}/uL9CsKm.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/c-fascia-ball-hd.webp',
              posterUrl: '/assets/v2/c-fascia-ball-poster.webp',
              resolution: '720p',
              equipment: "Bolinha de Lacrosse / Tênis / Madeira Rígida",
              difficulty: "Iniciante",
              targetMuscle: "Fáscia Plantar]",
              secondaryMuscles: ['Musculatura Intrínseca do Pé'],
              instructions: [
                "Fique em pé ou sentado e posicione a bolinha sob o arco plantar de um dos pés descalço.",
                "Transfira gradualmente o peso do corpo sobre o pé, aplicando pressão controlada de 6 a 7 numa escala de 1 a 10.",
                "Role lentamente a bolinha do calcanhar até a base dos metatarsos, pausando 15-20 segundos nos pontos mais rígidos.",
                "Dobre e estenda os dedos do pé ativamente enquanto mantém a pressão estática sobre a fáscia."
],
              proTips: [
                "A fáscia plantar é o início da linha miofascial posterior superficial; relaxá-la melhora a dorsiflexão e alivia o tendão patelar.",
                "Evite aplicar pressão sobre saliências ósseas diretas como a tuberosidade do calcâneo."
]
            },
            svgModelType: 'mobility',
          },
          {
            id: 'c-hip-switches',
            name: '90/90 Hip Switches (Mobilidade Rotacional de Quadril)',
            category: 'mobilidade',
            sets: '2 séries',
            reps: '8 trocas lentas',
            restSec: 30,
            primaryMuscles: ['Rotadores Internos e Externos do Quadril'],
            secondaryMuscles: ['Glúteo Médio', 'Psoas'],
            biomechanicalCue: 'Sentado no chão, pernas em 90° na frente e atrás. Alterne os lados sem usar as mãos para apoio se possível.',
            physioNote: 'Quadril com rotação interna livre é o maior protetor contra lesões no ligamento cruzado anterior (LCA).',
            gifUrl: `${GIF_BASE}/QY39eBr.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/c-hip-switches-hd.webp',
              posterUrl: '/assets/v2/c-hip-switches-poster.webp',
              resolution: '720p',
              equipment: "Colchonete de Solo ou Piso Liso",
              difficulty: "Iniciante",
              targetMuscle: "Rotadores Internos e Externos do Quadril]",
              secondaryMuscles: ['Glúteo Médio', 'Psoas'],
              instructions: [
                "Sente-se no solo com as pernas posicionadas em 90/90: perna dianteira com joelho e quadril a 90°, perna traseira lateral também a 90°.",
                "Mantenha o peito alto com as mãos no chão atrás para apoio (ou mãos no peito para progressão avançada).",
                "Gire os dois joelhos para o lado oposto através de uma rotação suave dos quadris, mantendo os calcanhares pivotando no chão.",
                "Acomode a nova posição 90/90 do lado oposto por 2 segundos e inverta o movimento com cadência controlada."
],
              proTips: [
                "Combina rotação interna do fêmur de um lado com rotação externa do outro, restaurando a mecânica esferóide do quadril.",
                "Quadril móvel dissipa as forças de rotação que de outra forma seriam absorvidas indevidamente pelo joelho esquerdo."
]
            },
            svgModelType: 'mobility',
          },
          {
            id: 'c-tibialis-raise',
            name: 'Ativação de Tibial Anterior na Parede',
            category: 'mobilidade',
            sets: '2 séries',
            reps: '15 reps',
            restSec: 30,
            primaryMuscles: ['Músculo Tibial Anterior'],
            secondaryMuscles: ['Extensor Longo dos Dedos'],
            biomechanicalCue: 'Costas na parede, pernas estendidas à frente. Puxe as pontas dos pés com máxima força para cima.',
            physioNote: 'O tibial anterior é o freio primário do corpo ao aterrissar de um salto; desacelera a tíbia sobre o tálus.',
            gifUrl: `${GIF_BASE}/QsSQWbf.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/c-tibialis-raise-hd.webp',
              posterUrl: '/assets/v2/c-tibialis-raise-poster.webp',
              resolution: '720p',
              equipment: "Parede Firme / Solo Plano",
              difficulty: "Iniciante",
              targetMuscle: "Músculo Tibial Anterior]",
              secondaryMuscles: ['Extensor Longo dos Dedos'],
              instructions: [
                "Encoste os glúteos e as costas em uma parede com as pernas estendidas à frente (calcanhares a 30-40 cm de distância da parede).",
                "Mantenha as pernas estendidas e calcanhares colados no chão.",
                "Puxe as pontas dos pés para cima com força máxima em direção às canelas (dorsiflexão extrema).",
                "Segure 1 a 2 segundos no pico sentindo queimar o músculo anterior da canela e desça os pés suavemente sem bater no chão."
],
              proTips: [
                "O tibial anterior é o freio anatômico de desaceleração do pé na aterrissagem de saltos; sua fraqueza sobrecarrega o tendão patelar.",
                "Quanto mais longe os calcanhares estiverem da parede, maior será a sobrecarga mecânica sobre o tibial anterior."
]
            },
            svgModelType: 'calf',
          },
        ],
      },
      {
        name: 'Bloco 2 — Pliometria & Absorção de Impacto',
        duration: '12 min',
        goal: 'Mecânica de aterrissagem e salto vertical com alinhamento de joelho',
        exercises: [
          {
            id: 'c-snap-downs',
            name: 'Snap Downs (Mecânica de Aterrissagem Silenciosa)',
            category: 'potencia',
            sets: '3 séries',
            reps: '5 reps',
            restSec: 60,
            primaryMuscles: ['Glúteos', 'Isquiotibiais', 'Quadríceps'],
            secondaryMuscles: ['Core'],
            biomechanicalCue: 'Fique na ponta dos pés com os braços altos. Caia rápido para a base atlética (joelhos a 90°, peito firme) sem fazer barulho.',
            physioNote: 'Sem ruído significa que seus músculos estão dissipando a energia mecânica em vez das cartilagens do joelho.',
            gifUrl: `${GIF_BASE}/wfotm7S.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/c-snap-downs-hd.webp',
              posterUrl: '/assets/v2/c-snap-downs-poster.webp',
              resolution: '720p',
              equipment: "Piso Esportivo ou Emborrachado",
              difficulty: "Intermediário",
              targetMuscle: "Glúteos",
              secondaryMuscles: ['Core'],
              instructions: [
                "Inicie em pé com pés na largura do quadril, suba na ponta dos pés com os dois braços estendidos acima da cabeça (tripla extensão).",
                "Sob comando mental explosivo, puxe o corpo violentamente para baixo para a posição atlética de aterrissagem.",
                "Aterrisse em base semi-agachada estável com pés na largura dos ombros, tíbias a 90°, quadris recuados e braços puxados para trás.",
                "Congele na posição como uma estátua por 2 segundos, absorvendo toda a inércia em silêncio absoluto."
],
              proTips: [
                "Ensina o cérebro a desacelerar a massa corporal rapidamente usando os quadris e glúteos em vez dos joelhos.",
                "A aterrissagem deve ser totalmente silenciosa ('aterrissar como um ninja'), sem deixar os joelhos colapsarem em valgo."
]
            },
            svgModelType: 'jump',
            jointAngles: { kneeLimit: 'Trava de aterrissagem 90°' },
          },
          {
            id: 'c-cmj-submax',
            name: 'Countermovement Jump (CMJ) com Aterrissagem Suave',
            category: 'potencia',
            sets: '3 séries',
            reps: '4 reps (qualidade máxima)',
            restSec: 90,
            primaryMuscles: ['Cadeia Posterior Completa', 'Quadríceps'],
            secondaryMuscles: ['Sóleo', 'Tendão Patelar'],
            biomechanicalCue: 'Desça em 1/2 agachamento e salte com explosão vertical. Na aterrissagem, dobre tornozelo, joelho e quadril harmonicamente.',
            physioNote: 'Joelhos alinhados rigorosamente com o 2º dedo do pé. Jamais permita que os joelhos colapsem para dentro (valgo dinâmico).',
            gifUrl: `${GIF_BASE}/6FMU51h.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/c-cmj-submax-hd.webp',
              posterUrl: '/assets/v2/c-cmj-submax-poster.webp',
              resolution: '720p',
              equipment: "Piso Esportivo com Bom Amortecimento",
              difficulty: "Intermediário",
              targetMuscle: "Cadeia Posterior Completa",
              secondaryMuscles: ['Sóleo', 'Tendão Patelar'],
              instructions: [
                "Fique em pé ereto com os pés alinhados na largura dos ombros.",
                "Inicie o contra-movimento flexionando rapidamente os quadris e joelhos a cerca de 60-70° com os braços balançando para trás.",
                "Exploda verticalmente no mesmo instante empurrando o chão e usando os braços para impulsionar o salto a 75-80% do máximo.",
                "No ar, mantenha a postura alinhada e prepare a aterrissagem suave: toque o solo primeiro com o antepé, seguido de calcanhar e flexão de quadril."
],
              proTips: [
                "Foco 100% na qualidade da aterrissagem: tíbias verticais, absorção com glúteos e distribuição simétrica de peso entre as pernas.",
                "Se o joelho esquerdo apresentar qualquer fisgada ou desconforto, reduza a altura do salto para 60% e priorize a biomecânica."
]
            },
            svgModelType: 'jump',
          },
        ],
      },
      {
        name: 'Bloco 3 — Força Unilateral & Cadeia Posterior',
        duration: '23 min',
        goal: 'Simetria de força entre as pernas e proteção de hip hinge',
        exercises: [
          {
            id: 'c-bulgarian-squat',
            name: 'Agachamento Búlgaro com Halteres (Amplitude 90°)',
            category: 'forca',
            sets: '3 séries',
            reps: '6–8 reps por perna',
            cadence: '3-1-1-0 (descida lenta de 3s)',
            restSec: 75,
            primaryMuscles: ['Quadríceps', 'Glúteo Máximo'],
            secondaryMuscles: ['Adutores', 'Glúteo Médio'],
            biomechanicalCue: 'Pé de trás apoiado no banco. Desça com controle até que a coxa da perna da frente fique paralela ao solo (90°).',
            physioNote: 'AJUSTE CRÍTICO: No joelho esquerdo, NUNCA force flexão profunda além de 90°. Canela deve se manter estável.',
            gifUrl: `${GIF_BASE}/qx4fgX7.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/c-bulgarian-squat-hd.webp',
              posterUrl: '/assets/v2/c-bulgarian-squat-poster.webp',
              resolution: '720p',
              equipment: "Banco Plano (ou Caixa 40cm) + Par de Halteres Médios",
              difficulty: "Avançado",
              targetMuscle: "Quadríceps",
              secondaryMuscles: ['Adutores', 'Glúteo Médio'],
              instructions: [
                "Fique de costas para o banco e posicione o peito do pé de trás apoiado no topo do banco; perna da frente a cerca de 3 passos à frente.",
                "Segure um haltere em cada mão ao lado do corpo, tronco com ligeira inclinação frontal (15°) para carregar o glúteo.",
                "Desça verticalmente flexionando o quadril e o joelho dianteiro até atingir o limite estrito de 90° de flexão (sem avançar a canela).",
                "Empurre através do calcanhar e meio do pé dianteiro para retornar à extensão do quadril sem estalar o joelho no topo."
],
              proTips: [
                "Diretriz mandatória do joelho esquerdo: a canela dianteira deve permanecer vertical (perpendicular ao solo) para zerar a tensão no tendão patelar.",
                "A ligeira inclinação do tronco transfere o momento de força diretamente para o glúteo máximo e isquiotibiais."
]
            },
            svgModelType: 'squat',
            jointAngles: { kneeLimit: '90° rigoroso no joelho esquerdo', shinAngle: 'Quase vertical' },
          },
          {
            id: 'c-single-leg-rdl',
            name: 'Levantamento Terra Romeno Unilateral (Single-Leg RDL)',
            category: 'forca',
            sets: '3 séries',
            reps: '8 reps por perna',
            cadence: '3-0-1-0',
            restSec: 60,
            primaryMuscles: ['Isquiotibiais', 'Glúteo Máximo'],
            secondaryMuscles: ['Eretores da Espinha', 'Core'],
            biomechanicalCue: 'Joelho da perna de apoio semifletido e fixo. Toda a dobradiça vem do quadril (hip hinge), mantendo as costas neutras.',
            physioNote: 'Trabalha os isquiotibiais em extensão de quadril pura, fortalecendo a musculatura sem dobrar a fossa poplítea sob carga.',
            gifUrl: `${GIF_BASE}/gKozT8X.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/c-single-leg-rdl-hd.webp',
              posterUrl: '/assets/v2/c-single-leg-rdl-poster.webp',
              resolution: '720p',
              equipment: "Halter ou Kettlebell + Solo Firme",
              difficulty: "Avançado",
              targetMuscle: "Isquiotibiais",
              secondaryMuscles: ['Eretores da Espinha', 'Core'],
              instructions: [
                "Fique em pé apoiado sobre a perna esquerda (joelho ligeiramente destravado a 15-20°) segurando o peso na mão oposta (direita).",
                "Inicie a dobradiça de quadril (hip hinge) projetando o glúteo para trás enquanto a perna livre sobe estendida em linha reta atrás do corpo.",
                "Desça o halter rente à tíbia mantendo as costas rigorosamente neutras e os quadris paralelos ao chão (sem girar a pelve para fora).",
                "Ao sentir o estiramento máximo dos isquiotibiais, contraia o glúteo de apoio e empurre o quadril para a frente para retornar ereto."
],
              proTips: [
                "O alinhamento pélvico é essencial: aponte os dedos do pé da perna que sobe para o chão para manter os quadris nivelados.",
                "Fortalece a cadeia posterior unilateral e estabiliza o tornozelo e o complexo do joelho contra forças rotacionais."
]
            },
            svgModelType: 'deadlift',
          },
          {
            id: 'c-single-standing-calf',
            name: 'Elevação de Panturrilha em Pé Unilateral',
            category: 'forca',
            sets: '3 séries',
            reps: '10 reps por perna com halter leve',
            cadence: '2-1-1-1',
            restSec: 45,
            primaryMuscles: ['Gastrocnêmio', 'Sóleo'],
            secondaryMuscles: ['Fáscia Plantar'],
            biomechanicalCue: 'Eleve o calcanhar ao ponto mais alto, segure 1 segundo no topo com máxima contração e desça controladamente.',
            physioNote: 'Propulsão terminal do salto e estabilização de tornozelo na bandeja.',
            gifUrl: `${GIF_BASE}/1kB3Wmk.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/c-single-standing-calf-hd.webp',
              posterUrl: '/assets/v2/c-single-standing-calf-poster.webp',
              resolution: '720p',
              equipment: "Degrau / Step de Musculação + Halter em uma das mãos",
              difficulty: "Intermediário",
              targetMuscle: "Gastrocnêmio",
              secondaryMuscles: ['Fáscia Plantar'],
              instructions: [
                "Apoie a bola do pé sobre a borda de um degrau com a perna de trabalho estendida (joelho destravado); perna oposta cruzada atrás.",
                "Segure na parede ou corrimão com uma mão para equilíbrio estrito e o halter na mão do lado que trabalha.",
                "Desça o calcanhar o mais fundo possível abaixo do nível do degrau, sustentando o alongamento do gastrocnêmio por 2 segundos.",
                "Suba na ponta máxima dos pés contraindo a panturrilha com potência máxima e congele a contração por 2 segundos no topo."
],
              proTips: [
                "Com o joelho estendido, o gastrocnêmio medial e lateral opera em seu comprimento ideal de produção de torque vertical.",
                "Crucial para a rigidez elástica do tornozelo em saltos com um e dois pés no basquete."
]
            },
            svgModelType: 'calf',
          },
        ],
      },
      {
        name: 'Bloco 4 — Adutores & Estabilidade Lateral',
        duration: '8 min',
        goal: 'Estabilização frontal do joelho em mudanças bruscas de direção',
        exercises: [
          {
            id: 'c-copenhagen-plank',
            name: 'Prancha Copenhagen Modificada (Joelho no Banco)',
            category: 'core',
            sets: '3 séries',
            reps: '20 segundos cada lado',
            restSec: 45,
            primaryMuscles: ['Grupo Adutor da Coxa'],
            secondaryMuscles: ['Oblíquos', 'Glúteo Médio'],
            biomechanicalCue: 'Apoie o joelho (não o tornozelo) no banco para encurtar a alavanca. Eleve o quadril formando uma linha reta.',
            physioNote: 'Adutores fortes previnem lesões de virilha/púbis e estabilizam medialmente a patela.',
            gifUrl: `${GIF_BASE}/VO2qeJg.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/c-copenhagen-plank-hd.webp',
              posterUrl: '/assets/v2/c-copenhagen-plank-poster.webp',
              resolution: '720p',
              equipment: "Banco Plano de Musculação + Colchonete",
              difficulty: "Avançado",
              targetMuscle: "Grupo Adutor da Coxa]",
              secondaryMuscles: ['Oblíquos', 'Glúteo Médio'],
              instructions: [
                "Deite-se de lado alinhado com o banco; posicione a perna superior com a parte medial do joelho e canela apoiada sobre o banco.",
                "Apoie o antebraço inferior no solo diretamente sob o ombro com o cotovelo a 90°.",
                "Eleve os quadris do solo até formar uma linha reta entre tornozelo, quadril e ombro, sustentando a perna de baixo suspensa no ar.",
                "Mantenha a posição estática por 20 a 30 segundos com os adutores e oblíquos fortemente contraídos."
],
              proTips: [
                "Versão modificada com apoio no joelho: diminui o braço de alavanca para proteger os ligamentos colaterais do joelho esquerdo.",
                "Os adutores são os principais desaceleradores laterais em cortes no basquete; seu fortalecimento previne lesões no púbis e LCA."
]
            },
            svgModelType: 'plank',
          },
          {
            id: 'c-clamshell',
            name: 'Abdução de Quadril com Miniband (Clamshell)',
            category: 'core',
            sets: '2 séries',
            reps: '12 reps cada lado',
            restSec: 30,
            primaryMuscles: ['Glúteo Médio'],
            secondaryMuscles: ['Piriforme'],
            biomechanicalCue: 'Deitado de lado com joelhos a 90°. Pés colados, abra o joelho de cima sem rodar o quadril para trás.',
            physioNote: 'O glúteo médio é o principal freio contra o colapso medial do joelho durante aterrissagens em velocidade.',
            gifUrl: '/assets/clamshell-v1.gif',
            v2: {
              hdWebpUrl: '/assets/v2/c-clamshell-hd.webp',
              posterUrl: '/assets/v2/c-clamshell-poster.webp',
              resolution: '720p',
              equipment: "Miniband de Média Tensão posicionada logo acima dos joelhos",
              difficulty: "Iniciante",
              targetMuscle: "Glúteo Médio]",
              secondaryMuscles: ['Piriforme'],
              instructions: [
                "Deite-se de lado com os quadris flexionados a 45° e os joelhos a 90°, com os calcanhares juntos e colados um ao outro.",
                "Mantenha a pelve perpendicular ao solo sem deixar o quadril superior rodar para trás durante o movimento.",
                "Abra o joelho superior o máximo possível contra a resistência da miniband mantendo os pés em contato contínuo.",
                "Segure 2 segundos no topo sentindo o glúteo médio e rotadores profundos queimarem, e feche o joelho lentamente."
],
              proTips: [
                "O glúteo médio é o estabilizador mestre do fêmur no plano frontal; evita ativamente que o joelho colapse para dentro (valgo).",
                "Coloque a mão livre sobre o glúteo superior para sentir a contração muscular e garantir que a pelve não se movimente."
]
            },
            svgModelType: 'mobility',
          },
        ],
      },
    ],
  },
  {
    id: 'treino-d',
    title: 'Treino D • Agilidade, Deslocamento & Condicionamento',
    subtitle: 'Dia flexível opcional: mobilidade de quadra, paradas e tiros RSA.',
    dayOfWeek: 'Sexta-Feira (Opcional)',
    duration: '35-40 min',
    focus: 'Paradas em 2 tempos, arrancada de tripla ameaça e protocolo RSA 1:5',
    energySystem: 'Potência Aeróbica / Sistema Fosfágeno (ATP-CP)',
    accentColor: '#f59e0b', // Gold
    tag: 'AGILITY & BASKETBALL CONDITIONING',
    blocks: [
      {
        name: 'Bloco 1 — Aquecimento & Mobilidade Dinâmica',
        duration: '8 min',
        goal: 'Elevação de temperatura e ativação neuromuscular para corte',
        exercises: [
          {
            id: 'd-band-lateral-walk',
            name: 'Caminhada Lateral com Miniband nos Tornozelos',
            category: 'agilidade',
            sets: '2 séries',
            reps: '10 passos para cada lado',
            restSec: 30,
            primaryMuscles: ['Glúteo Médio', 'Tensor da Fáscia Lata'],
            secondaryMuscles: ['Quadríceps'],
            biomechanicalCue: 'Postura defensiva baixa. Mantenha a tensão contínua na faixa elástica sem arrastar os pés.',
            physioNote: 'Prepara a cápsula lateral do joelho e os tendões fibulares para os cortes na quadra.',
            gifUrl: `${GIF_BASE}/O95afRA.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/d-band-lateral-walk-hd.webp',
              posterUrl: '/assets/v2/d-band-lateral-walk-poster.webp',
              resolution: '720p',
              equipment: "Miniband posicionada ao redor dos tornozelos ou pontas dos pés",
              difficulty: "Intermediário",
              targetMuscle: "Glúteo Médio",
              secondaryMuscles: ['Quadríceps'],
              instructions: [
                "Posicione a miniband nos tornozelos e adote uma postura atlética defensiva de basquete (joelhos semi-flexionados, peito alto).",
                "Mantenha os pés paralelos e apontados rigorosamente para a frente (não abra as pontas dos pés para fora).",
                "Dê um passo lateral controlado de cerca de 30 cm com a perna líder, empurrando contra a tensão elástica da faixa.",
                "Acompanhe com a perna de trás mantendo sempre a faixa sob tensão (nunca deixe os pés se juntarem completamente)."
],
              proTips: [
                "Manter os pés apontados para a frente força o recrutamento isolado do glúteo médio e tensor da fáscia lata.",
                "Não balance os ombros para os lados; o tronco deve permanecer nivelado e estável durante todos os passos."
]
            },
            svgModelType: 'mobility',
          },
          {
            id: 'd-lateral-lunge',
            name: 'Afundo Lateral com Pausa em Base Baixa',
            category: 'agilidade',
            sets: '2 séries',
            reps: '6 reps cada lado',
            restSec: 30,
            primaryMuscles: ['Glúteos', 'Adutores'],
            secondaryMuscles: ['Quadríceps'],
            biomechanicalCue: 'Dê o passo lateral, empurre o quadril para trás e mantenha o pé oposto todo apoiado no solo.',
            physioNote: 'Alongamento dinâmico de adutores com fortalecimento excêntrico sob controle de ângulo.',
            gifUrl: `${GIF_BASE}/py1HSzx.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/d-lateral-lunge-hd.webp',
              posterUrl: '/assets/v2/d-lateral-lunge-poster.webp',
              resolution: '720p',
              equipment: "Peso Corporal ou Halter Único no Peito (Goblet)",
              difficulty: "Intermediário",
              targetMuscle: "Glúteos",
              secondaryMuscles: ['Quadríceps'],
              instructions: [
                "Fique em pé com pés na largura do quadril; dê um passo lateral amplo para o lado direito mantendo ambos os pés apontados para a frente.",
                "Sente o quadril direito para trás e para baixo flexionando o joelho a 90° enquanto a perna esquerda permanece totalmente estendida.",
                "Mantenha o peito erguido, coluna neutra e a tíbia direita verticalizada sobre o meio do pé.",
                "Pressione o chão explosivamente com o calcanhar direito para retornar à postura ereta inicial em um único movimento fluido."
],
              proTips: [
                "Mantenha o joelho alinhado com o 2º dedo do pé, sem permitir que ele caia para dentro ao receber a carga lateral.",
                "Excelente para desenvolver a mobilidade dos adutores e a força do glúteo máximo no plano frontal."
]
            },
            svgModelType: 'squat',
          },
        ],
      },
      {
        name: 'Bloco 2 — Deslocamento Lateral & Mudança de Direção',
        duration: '15 min',
        goal: 'Técnica de desaceleração e explosão de primeiro passo',
        exercises: [
          {
            id: 'd-slide-decel',
            name: 'Base Defensiva com Parada em 2 Tempos (Deceleration Step)',
            category: 'agilidade',
            sets: '4 séries',
            reps: '3 passadas laterais explosivas ➔ parada firme',
            restSec: 60,
            primaryMuscles: ['Quadríceps', 'Glúteo Médio', 'Sóleo'],
            secondaryMuscles: ['Core'],
            biomechanicalCue: 'Desloque-se lateralmente e freie no 2º tempo com o pé externo apontando ligeiramente para dentro para travar.',
            physioNote: 'Aprender a frear muscularmente dissipa forças rotacionais e protege os meniscos do joelho.',
            gifUrl: `${GIF_BASE}/zfNHMN9.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/d-slide-decel-hd.webp',
              posterUrl: '/assets/v2/d-slide-decel-poster.webp',
              resolution: '720p',
              equipment: "Piso Esportivo / Cone ou Marcação no Solo",
              difficulty: "Intermediário",
              targetMuscle: "Quadríceps",
              secondaryMuscles: ['Core'],
              instructions: [
                "Inicie em postura de base defensiva baixa e execute 2 a 3 passadas de deslizamento lateral velozes na direção de uma marcação.",
                "Ao atingir o ponto de frenagem, crave a perna externa firme no solo em parada em 2 tempos (Drop-Step Decel).",
                "Absorva a energia cinética com a flexão do quadril e estabilidade do tornozelo, mantendo o centro de gravidade baixo entre os apoios.",
                "Congele na posição defensiva por 1 segundo pronto para mudar de direção antes de iniciar para o outro lado."
],
              proTips: [
                "A parada deve ser limpa e sem escorregar: o ângulo da tíbia deve estar direcionado para desacelerar o vetor de deslocamento lateral.",
                "Mantenha as mãos ativas e o olhar à frente, simulando a contenção de um armador adversário."
]
            },
            svgModelType: 'sprint',
          },
          {
            id: 'd-first-step-drive',
            name: 'Projeção de Primeiro Passo da Tripla Ameaça (First Step)',
            category: 'agilidade',
            sets: '4 séries',
            reps: '2 arrancadas de 5 metros por perna',
            restSec: 60,
            primaryMuscles: ['Glúteo Máximo', 'Sóleo', 'Gastrocnêmio'],
            secondaryMuscles: ['Core'],
            biomechanicalCue: 'Parta da posição de tripla ameaça. Empurre com violência a perna de trás sem dar o falso passo para trás (false step).',
            physioNote: 'Mecânica aplicada ao jogo real: sair da inércia com velocidade de elite.',
            gifUrl: `${GIF_BASE}/CcWEoWV.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/d-first-step-drive-hd.webp',
              posterUrl: '/assets/v2/d-first-step-drive-poster.webp',
              resolution: '720p',
              equipment: "Bola de Basquete / Solo Aderente",
              difficulty: "Avançado",
              targetMuscle: "Glúteo Máximo",
              secondaryMuscles: ['Core'],
              instructions: [
                "Posicione-se na postura da Tripla Ameaça (Triple Threat) com a bola protegida no quadril e peso distribuído nos antepés.",
                "Inicie a finta de olhar ou passe rápido e dispare o primeiro passo agressivo para a frente e ligeiramente cruzado em direção à cesta.",
                "Incline o tronco para a frente a 45° projetando o ombro baixo para ultrapassar a linha imaginária do defensor.",
                "Golpeie o solo com o pé da frente com tração máxima da canela (ângulo agudo de ataque) e desacelere com controle após 2 passadas."
],
              proTips: [
                "Elimine qualquer passo falso para trás: toda a energia inicial deve ser projetada diretamente para frente no alvo.",
                "A extensão violenta do quadril traseiro combinada com o ataque agressivo do pé da frente gera aceleração máxima."
]
            },
            svgModelType: 'sprint',
            jointAngles: { shinAngle: '45° de ataque' },
          },
        ],
      },
      {
        name: 'Bloco 3 — Condicionamento Metabólico Específico (ESD)',
        duration: '12 min',
        goal: 'Capacidade de sprints repetidos no basquete (RSA)',
        exercises: [
          {
            id: 'd-rsa-protocol',
            name: 'Protocolo RSA de Basquete (Repeated Sprint Ability 1:5)',
            category: 'esd',
            sets: '2 blocos de 5 tiros',
            reps: '15–20 metros a 90% da velocidade máxima',
            restSec: 25,
            cadence: '5s sprint / 25s caminhada',
            primaryMuscles: ['Sistema Cardiovascular', 'Complexo da Coxa e Panturrilha'],
            secondaryMuscles: ['Metabolismo ATP-CP'],
            biomechanicalCue: 'Tiro de 15 metros a 90% da velocidade máxima ➔ desaceleração controlada. Caminhe e respire fundo durante os 25s.',
            physioNote: 'Simula o padrão de corrida intermitente do basquete com ressíntese rápida de fosfocreatina.',
            gifUrl: `${GIF_BASE}/Qoujh3Q.gif`,
            v2: {
              hdWebpUrl: '/assets/v2/d-rsa-protocol-hd.webp',
              posterUrl: '/assets/v2/d-rsa-protocol-poster.webp',
              resolution: '720p',
              equipment: "Quadra de Basquete Inteira / Cronômetro Digital",
              difficulty: "Avançado",
              targetMuscle: "Sistema Cardiovascular",
              secondaryMuscles: ['Metabolismo ATP-CP'],
              instructions: [
                "Posicione-se na linha de fundo da quadra em postura de saída de sprint.",
                "Ao sinal sonoro, acelere com 100% de intensidade até a linha de lance livre oposta ou linha de 3 pontos (aproximadamente 5 a 6 segundos).",
                "Desacelere nos últimos 2 metros e caminhe lentamente durante o período estrito de recuperação ativa (25 a 30 segundos, proporção 1:5).",
                "Retorne à linha de partida e repita o ciclo mantendo a velocidade máxima em todas as repetições."
],
              proTips: [
                "Protocolo de Capacidade de Sprint Repetido (RSA): condiciona os sistemas fosfagênio (ATP-CP) e oxidativo sob estresse anaeróbio de jogo.",
                "Se houver perda superior a 15% na velocidade de tiro ou dor patelar, encerre a série para preservar a integridade articular."
]
            },
            svgModelType: 'sprint',
          },
        ],
      },
    ],
  },
];
