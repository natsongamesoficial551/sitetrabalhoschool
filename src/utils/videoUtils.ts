// Utilitários para detecção e manipulação de formatos de vídeo

/**
 * Extrai o ID do vídeo do YouTube de uma URL
 */
export const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

/**
 * Verifica se uma URL é do YouTube
 */
export const isYouTubeUrl = (url: string): boolean => {
  return /(?:youtube\.com|youtu\.be)/.test(url);
};

/**
 * Gera URL de embed do YouTube
 */
export const getYouTubeEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1&rel=0&showinfo=0`;
};

export interface VideoFormat {
  extension: string;
  mimeType: string;
  priority: number; // Menor número = maior prioridade
}

// Formatos suportados em ordem de preferência
export const SUPPORTED_FORMATS: VideoFormat[] = [
  { extension: 'mp4', mimeType: 'video/mp4', priority: 1 },
  { extension: 'webm', mimeType: 'video/webm', priority: 2 },
  { extension: 'ogv', mimeType: 'video/ogg', priority: 3 },
  { extension: 'mkv', mimeType: 'video/x-matroska', priority: 4 },
  { extension: 'avi', mimeType: 'video/x-msvideo', priority: 5 },
  { extension: 'mov', mimeType: 'video/quicktime', priority: 6 },
  { extension: 'wmv', mimeType: 'video/x-ms-wmv', priority: 7 },
  { extension: 'flv', mimeType: 'video/x-flv', priority: 8 },
];

/**
 * Gera URLs para todos os formatos possíveis de um vídeo
 */
export const generateVideoSources = (basePath: string, videoNumber: number): Array<{url: string, type: string}> => {
  return SUPPORTED_FORMATS.map(format => ({
    url: `${basePath}/video ${videoNumber}.${format.extension}`,
    type: format.mimeType
  }));
};

/**
 * Verifica se um formato de vídeo é suportado pelo navegador
 */
export const isFormatSupported = (mimeType: string): boolean => {
  const video = document.createElement('video');
  return video.canPlayType(mimeType) !== '';
};

/**
 * Retorna os formatos suportados pelo navegador atual
 */
export const getSupportedFormats = (): VideoFormat[] => {
  return SUPPORTED_FORMATS.filter(format => isFormatSupported(format.mimeType));
};

/**
 * Detecta automaticamente o melhor formato disponível
 * (Esta função pode ser expandida para fazer verificações reais de arquivo)
 */
export const detectBestFormat = async (basePath: string, videoNumber: number): Promise<string | null> => {
  const supportedFormats = getSupportedFormats();
  
  // Por enquanto, retorna o primeiro formato suportado
  // Em uma implementação mais avançada, poderia verificar se o arquivo existe
  if (supportedFormats.length > 0) {
    return `${basePath}/video ${videoNumber}.${supportedFormats[0].extension}`;
  }
  
  return null;
};

/**
 * Função para tentar carregar vídeo com fallback automático
 */
export const createVideoElement = (sources: Array<{url: string, type: string}>): HTMLVideoElement => {
  const video = document.createElement('video');
  
  sources.forEach(source => {
    const sourceElement = document.createElement('source');
    sourceElement.src = source.url;
    sourceElement.type = source.type;
    video.appendChild(sourceElement);
  });
  
  return video;
};