import React, { useState, useRef, useEffect } from 'react';
import { X, Play } from 'lucide-react';
import { generateVideoSources, isYouTubeUrl, extractYouTubeId, getYouTubeEmbedUrl } from '../utils/videoUtils';

interface Video {
  id: number;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
}

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Detecta se é vídeo do YouTube
  const isYouTube = video.videoUrl ? isYouTubeUrl(video.videoUrl) : false;
  const youtubeId = isYouTube && video.videoUrl ? extractYouTubeId(video.videoUrl) : null;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 flex-shrink-0">
          <div className="min-w-0 flex-1 mr-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white truncate">{video.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm sm:text-base">Duração: {video.duration}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Video Player - Responsive */}
        <div className="relative bg-black flex-1 min-h-0">
          <div className="aspect-video w-full h-full">
          {isYouTube && youtubeId ? (
            // Player do YouTube
            <iframe
              className="w-full h-full"
              src={getYouTubeEmbedUrl(youtubeId)}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : video.videoUrl ? (
            // Player de vídeo local com controles nativos
            <video
              ref={videoRef}
              className="w-full h-full"
              controls={true}
              playsInline
              preload="metadata"
              onError={(e) => {
                console.log('Erro ao carregar vídeo:', video.videoUrl);
              }}
            >
              {generateVideoSources('/assets', video.id).map((source, index) => (
                <source key={index} src={source.url} type={source.type} />
              ))}
              Seu navegador não suporta nenhum dos formatos de vídeo disponíveis.
            </video>
          ) : (
            // Placeholder
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">Vídeo em Breve</h3>
                <p className="text-gray-300">Este conteúdo será disponibilizado em breve</p>
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Description */}
        <div className="p-4 sm:p-6 flex-shrink-0 max-h-32 overflow-y-auto">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">{video.description}</p>
          <div className="mt-4 flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <span>Vídeo #{video.id}</span>
            <span>{isYouTube ? 'YouTube' : 'Vídeo Local'} • {isYouTube ? 'Streaming' : 'Qualidade HD'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;