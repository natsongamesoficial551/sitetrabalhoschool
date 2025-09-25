import React, { useState } from 'react';
import VideoCard from './VideoCard';
import VideoModal from './VideoModal';
import { generateVideoSources } from '../utils/videoUtils';

interface Video {
  id: number;
  title: string;
  description: string;
  duration: string;
  thumbnail?: string;
  videoUrl?: string;
}

const VideoGallery: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // 10 slots para vídeos - adicione os links do YouTube e thumbnails aqui
  const videoSlots = [
    {
      id: 1,
      title: "Vídeo Natan",
      description: "Natan Borges resolvendo a questão 2 e 7.",
      duration: "11:17",
      videoUrl: "https://www.youtube.com/watch?v=fqCemKTGZVk",
      thumbnail: "https://img.youtube.com/vi/fqCemKTGZVk/maxresdefault.jpg", // Link da internet OU undefined para usar local
    },
    {
      id: 2,
      title: "Vídeo Lucas",
      description: "Lucas Gabardo resolvendo a questão 1 e 8.",
      duration: "1:44",
      videoUrl: "https://www.youtube.com/watch?v=b0iL9p0kenE",
      thumbnail: "https://img.youtube.com/vi/b0iL9p0kenE/maxresdefault.jpg", // Link da internet OU undefined para usar local
    },
    {
      id: 3,
      title: "Vídeo Mariana",
      description: "Mariana Gabardo resolvendo a questão 1 e 6.",
      duration: "3:37",
      videoUrl: "https://www.youtube.com/watch?v=dieU6dEjLdw",
      thumbnail: "https://img.youtube.com/vi/dieU6dEjLdw/maxresdefault.jpg", // Link da internet OU undefined para usar local
    },
    {
      id: 4,
      title: "Vídeo Nicolas",
      description: "Nicolas De Mesquita resolvendo a questão 10 e 5.",
      duration: "5:04",
      videoUrl: "https://www.youtube.com/watch?v=waKUyrTEtwo",
      thumbnail: "https://img.youtube.com/vi/waKUyrTEtwo/maxresdefault.jpg", // Link da internet OU undefined para usar local
    },
    {
      id: 5,
      title: "Vídeo André",
      description: "André lucas resolvendo a questão 6 e 1.",
      duration: "2:21",
      videoUrl: "https://www.youtube.com/watch?v=6ogn5UawORY",
      thumbnail: "https://img.youtube.com/vi/6ogn5UawORY/maxresdefault.jpg", // Link da internet OU undefined para usar local
    },
    {
      id: 6,
      title: "Vídeo Luiz Gustavo",
      description: "Luiz Gustavo resolvendo a questão 2 e 9.",
      duration: "3:15",
      videoUrl: "https://www.youtube.com/watch?v=D40bWHXYIFE",
      thumbnail: "https://img.youtube.com/vi/D40bWHXYIFE/maxresdefault.jpg", // Link da internet OU undefined para usar local
    },
    {
      id: 7,
      title: "Vídeo Breno",
      description: "Breno de Azevedo resolvendo a questão 5 e 10.",
      duration: "1:17",
      videoUrl: "https://www.youtube.com/watch?v=bwNIF-X03fs",
      thumbnail: "https://img.youtube.com/vi/bwNIF-X03fs/maxresdefault.jpg", // Link da internet OU undefined para usar local
    },
    {
      id: 8,
      title: "Vídeo Nath",
      description: "Nath Pontes resolvendo a questão 4 e 9.",
      duration: "1:17",
      videoUrl: "https://www.youtube.com/watch?v=QeJFLqcVbzY",
      thumbnail: "https://img.youtube.com/vi/QeJFLqcVbzY/maxresdefault.jpg", // Link da internet OU undefined para usar local
    },
    {
      id: 9,
      title: "Vídeo 9",
      description: "Descrição do vídeo 9. Conteúdo educacional sobre matemática.",
      duration: "14:15",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 9.jpg
    },
    {
      id: 10,
      title: "Vídeo 10",
      description: "Descrição do vídeo 10. Conteúdo educacional sobre matemática.",
      duration: "16:50",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 10.jpg
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-12">
      {/* Header da galeria */}
      <div className="text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
          Biblioteca de Vídeos
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-xl lg:max-w-2xl mx-auto leading-relaxed">
          Explore nossa coleção de vídeos educacionais cuidadosamente selecionados 
          para aprimorar seu aprendizado em matemática.
        </p>
        <div className="mt-4 sm:mt-6 inline-flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
          {videoSlots.length} vídeos disponíveis
        </div>
      </div>

      {/* Grid de vídeos - Espaçamento otimizado para todas as telas */}
      <div className="px-3 sm:px-4 lg:px-6">
        <div className="grid gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8
                        grid-cols-1 
                        xs:grid-cols-2 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        lg:grid-cols-4 
                        xl:grid-cols-5 
                        2xl:grid-cols-6
                        max-w-7xl mx-auto">
          {videoSlots.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={() => setSelectedVideo(video)}
            />
          ))}
        </div>
      </div>

      {/* Modal do player de vídeo */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {/* Seção de estatísticas - Espaçamento melhorado */}
      <div className="mt-8 sm:mt-12 lg:mt-16 mx-3 sm:mx-4 lg:mx-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 transition-colors duration-300 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-center">
            <div className="py-2">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">{videoSlots.length}</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Vídeos Disponíveis</div>
            </div>
            <div className="py-2">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-1 sm:mb-2">100%</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Qualidade HD</div>
            </div>
            <div className="py-2">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1 sm:mb-2">24/7</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Acesso Ilimitado</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;