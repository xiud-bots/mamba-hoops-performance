/**
 * ExerciseDB V1 & V2 Integration Service
 * Mamba Hoops Performance • Core Staff XIUD
 *
 * Suporte a ExerciseDB V1 (OSS API / CDN 180p/360p GIF / Catálogo Local)
 * e ExerciseDB V2 (AscendAPI / RapidAPI HD WebP / 720p / Instruções & Biomecânica)
 */

export interface ExerciseDBV2Metadata {
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

export interface CatalogExercise {
  id: string;
  name: string;
  gif: string;
  targetMuscles: string[];
  secondaryMuscles: string[];
  bodyParts: string[];
  equipment: string[];
  instructions: string[];
}

export interface RapidApiConfig {
  key?: string;
  host?: string;
}

// RapidAPI Host para ExerciseDB V2
export const RAPIDAPI_V2_HOST = 'edb-with-videos-and-images-by-ascendapi.p.rapidapi.com';

// Dicionário de Tradução PT-BR para Músculos
export const MUSCLE_TRANSLATIONS: Record<string, string> = {
  abductors: 'Abdutores',
  abs: 'Abdômen',
  adductors: 'Adutores',
  biceps: 'Bíceps',
  calves: 'Panturrilhas',
  'cardiovascular system': 'Cardiovascular',
  delts: 'Deltóides',
  forearms: 'Antebraços',
  glutes: 'Glúteos',
  hamstrings: 'Isquiotibiais',
  lats: 'Grande Dorsal',
  'levator scapulae': 'Levantador da Escápula',
  pectorals: 'Peitorais',
  quads: 'Quadríceps',
  'serratus anterior': 'Serrátil Anterior',
  spine: 'Eretores da Espinha',
  traps: 'Trapézio',
  triceps: 'Tríceps',
  'upper back': 'Costas Superior',
};

// Dicionário de Tradução PT-BR para Regiões Corporais
export const BODY_PART_TRANSLATIONS: Record<string, string> = {
  back: 'Costas',
  cardio: 'Cardio',
  chest: 'Peitoral',
  'lower arms': 'Antebraços',
  'lower legs': 'Pernas (Inferior)',
  neck: 'Pescoço',
  shoulders: 'Ombros',
  'upper arms': 'Braços (Superior)',
  'upper legs': 'Coxas (Superior)',
  waist: 'Cintura / Core',
};

// Dicionário de Tradução PT-BR para Equipamentos
export const EQUIPMENT_TRANSLATIONS: Record<string, string> = {
  assisted: 'Assistido',
  band: 'Elástico / Miniband',
  barbell: 'Barra Olímpica',
  'body weight': 'Peso Corporal',
  'bosu ball': 'Bosu Ball',
  cable: 'Cabo / Polia',
  dumbbell: 'Halteres',
  'elliptical machine': 'Elíptico',
  'ez barbell': 'Barra W (EZ)',
  hammer: 'Martelo',
  'leverage machine': 'Máquina Alavanca',
  'medicine ball': 'Medicine Ball',
  'olympic barbell': 'Barra Olímpica',
  'resistance band': 'Superband',
  roller: 'Rolo de Liberação',
  rope: 'Corda',
  'skierg machine': 'SkiErg',
  'sled machine': 'Trenó (Sled)',
  'smith machine': 'Smith Machine',
  'stability ball': 'Bola Suíça',
  'stationary bike': 'Bicicleta Ergométrica',
  'stepmill machine': 'Escada Ergométrica',
  tire: 'Pneu',
  'trap bar': 'Trap Bar (Hex Bar)',
  weighted: 'Com Carga Adicional',
  'wheel roller': 'Roda Abdominal',
};

/**
 * Retorna a chave RapidAPI configurada no ambiente (VITE_RAPIDAPI_KEY)
 */
export const getRapidApiKey = (): string | undefined => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const env = (import.meta as any).env;
  return env?.VITE_RAPIDAPI_KEY || undefined;
};

/**
 * Validador e conector com a API ExerciseDB V2 na RapidAPI
 */
export async function testRapidApiConnection(customKey?: string): Promise<{
  success: boolean;
  status: number;
  message: string;
}> {
  const key = customKey || getRapidApiKey();
  if (!key) {
    return {
      success: false,
      status: 401,
      message: 'Nenhuma chave RapidAPI detectada no ambiente (VITE_RAPIDAPI_KEY).',
    };
  }

  try {
    const response = await fetch(
      `https://${RAPIDAPI_V2_HOST}/api/v1/liveness`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': key,
          'X-RapidAPI-Host': RAPIDAPI_V2_HOST,
        },
      }
    );

    if (response.ok) {
      return {
        success: true,
        status: response.status,
        message: 'Conexão com ExerciseDB V2 na RapidAPI estabelecida com sucesso!',
      };
    }

    if (response.status === 403) {
      return {
        success: false,
        status: 403,
        message:
          'Chave válida, mas sem subscrição no endpoint oficial do ExerciseDB V2. Ative o plano Free no RapidAPI Hub.',
      };
    }

    return {
      success: false,
      status: response.status,
      message: `Resposta da API: HTTP ${response.status}`,
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      status: 500,
      message: `Erro de rede ao conectar à RapidAPI: ${errMsg}`,
    };
  }
}

/**
 * Busca ao vivo na RapidAPI AscendAPI V2
 */
export async function searchRapidApiV2(query: string, limit: number = 20): Promise<{
  success: boolean;
  data: Array<{
    exerciseId: string;
    name: string;
    bodyParts: string[];
    targetMuscles: string[];
    secondaryMuscles: string[];
    equipments: string[];
    instructions: string[];
    videoUrl?: string;
    imageUrl?: string;
  }>;
  message?: string;
}> {
  const key = getRapidApiKey();
  if (!key) {
    return {
      success: false,
      data: [],
      message: 'Chave RapidAPI não configurada.',
    };
  }

  try {
    const trimmed = query.trim();
    const endpoint = trimmed
      ? `https://${RAPIDAPI_V2_HOST}/api/v1/exercises/search?search=${encodeURIComponent(trimmed)}&limit=${limit}`
      : `https://${RAPIDAPI_V2_HOST}/api/v1/exercises?limit=${limit}`;

    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': RAPIDAPI_V2_HOST,
      },
    });

    if (!res.ok) {
      return {
        success: false,
        data: [],
        message: `HTTP ${res.status}: ${res.statusText}`,
      };
    }

    const json = await res.json();
    const items = json?.data || [];
    return {
      success: true,
      data: items,
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      data: [],
      message: errMsg,
    };
  }
}
