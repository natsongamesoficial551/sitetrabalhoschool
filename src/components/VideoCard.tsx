import React from 'react';
import { Play, Clock, Eye } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  description: string;
  duration: string;
  thumbnail?: string;
  videoUrl?: string;
}

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden border border-gray-100 dark:border-gray-700"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {video.thumbnail ? (
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              // Se falhar, tenta carregar thumbnail local
              if (!target.src.includes(`/assets/thumb ${video.id}.jpg`)) {
                target.src = `/assets/thumb ${video.id}.jpg`;
              } else {
                target.style.display = 'none';
              }
            }}
          />
        ) : (
          // Tenta carregar thumbnail local primeiro
          <img 
            src={`/assets/thumb ${video.id}.jpg`}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              // Mostra placeholder se não encontrar thumbnail
              const placeholder = target.nextElementSibling as HTMLElement;
              if (placeholder) placeholder.style.display = 'flex';
            }}
          />
        )}
        
        {/* Placeholder quando não há thumbnail */}
        <div className="w-full h-full flex items-center justify-center absolute inset-0" style={{display: video.thumbnail ? 'none' : 'none'}}>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Play className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-gray-500 text-sm">Vídeo em breve</p>
            </div>
        </div>
        
        {/* Overlay de play */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 text-blue-600 fill-current" />
          </div>
        </div>

        {/* Badge de duração */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{video.duration}</span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {video.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
          {video.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>Visualizar</span>
          </div>
          <span className="text-blue-600 dark:text-blue-400 font-medium">Assistir agora</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;