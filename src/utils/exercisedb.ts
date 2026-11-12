/**
 * ExerciseDB V1 & V2 Integration Service
 * Mamba Hoops Performance • Core Staff XIUD
 *
 * Suporte a ExerciseDB V1 (OSS API / CDN 180p/360p GIF)
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

export interface RapidApiConfig {
  key?: string;
  host?: string;
}

// RapidAPI Host para ExerciseDB V2
export const RAPIDAPI_V2_HOST = 'edb-with-videos-and-images-by-ascendapi.p.rapidapi.com';

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
