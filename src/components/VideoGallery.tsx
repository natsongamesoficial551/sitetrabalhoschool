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

  // 37 slots para vídeos - adicione os links do YouTube e thumbnails aqui
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
      videoUrl: "https://www.youtube.com/watch?v=dieU6dEjLdw", // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: "https://img.youtube.com/vi/dieU6dEjLdw/maxresdefault.jpg", // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 3.jpg
    },
    {
      id: 4,
      title: "Vídeo Nicolas",
      description: "Nicolas De Mesquita resolvendo a questão 10 e 5.",
      duration: "5:04",
      videoUrl: "https://www.youtube.com/watch?v=waKUyrTEtwo", // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: "https://img.youtube.com/vi/waKUyrTEtwo/maxresdefault.jpg", // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 4.jpg
    },
    {
      id: 5,
      title: "Vídeo André",
      description: "André lucas resolvendo a questão 6 e 1.",
      duration: "2:21",
      videoUrl: "https://www.youtube.com/watch?v=6ogn5UawORY", // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: "https://img.youtube.com/vi/6ogn5UawORY/maxresdefault.jpg", // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 5.jpg
    },
    {
      id: 6,
      title: "Vídeo Luiz Gustavo",
      description: "Luiz Gustavo resolvendo a questão 2 e 9.",
      duration: "3:15",
      videoUrl: "https://www.youtube.com/watch?v=D40bWHXYIFE", // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: "https://img.youtube.com/vi/D40bWHXYIFE/maxresdefault.jpg", // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 6.jpg
    },
    {
      id: 7,
      title: "Vídeo Breno",
      description: "Breno de Azevedo resolvendo a questão 5 e 10.",
      duration: "1:17",
      videoUrl: "https://www.youtube.com/watch?v=bwNIF-X03fs", // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: "https://img.youtube.com/vi/bwNIF-X03fs/maxresdefault.jpg", // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 7.jpg
    },
    {
      id: 8,
      title: "Vídeo Nath",
      description: "Nath Pontes resolvendo a questão 4 e 9.",
      duration: "1:17",
      videoUrl: "https://www.youtube.com/watch?v=QeJFLqcVbzY", // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: "https://img.youtube.com/vi/QeJFLqcVbzY/maxresdefault.jpg", // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 8.jpg
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
    {
      id: 11,
      title: "Vídeo 11",
      description: "Descrição do vídeo 11. Conteúdo educacional sobre matemática.",
      duration: "12:20",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 11.jpg
    },
    {
      id: 12,
      title: "Vídeo 12",
      description: "Descrição do vídeo 12. Conteúdo educacional sobre matemática.",
      duration: "9:35",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 12.jpg
    },
    {
      id: 13,
      title: "Vídeo 13",
      description: "Descrição do vídeo 13. Conteúdo educacional sobre matemática.",
      duration: "18:05",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 13.jpg
    },
    {
      id: 14,
      title: "Vídeo 14",
      description: "Descrição do vídeo 14. Conteúdo educacional sobre matemática.",
      duration: "11:45",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 14.jpg
    },
    {
      id: 15,
      title: "Vídeo 15",
      description: "Descrição do vídeo 15. Conteúdo educacional sobre matemática.",
      duration: "13:10",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 15.jpg
    },
    {
      id: 16,
      title: "Vídeo 16",
      description: "Descrição do vídeo 16. Conteúdo educacional sobre matemática.",
      duration: "8:55",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 16.jpg
    },
    {
      id: 17,
      title: "Vídeo 17",
      description: "Descrição do vídeo 17. Conteúdo educacional sobre matemática.",
      duration: "15:30",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 17.jpg
    },
    {
      id: 18,
      title: "Vídeo 18",
      description: "Descrição do vídeo 18. Conteúdo educacional sobre matemática.",
      duration: "10:15",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 18.jpg
    },
    {
      id: 19,
      title: "Vídeo 19",
      description: "Descrição do vídeo 19. Conteúdo educacional sobre matemática.",
      duration: "12:40",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 19.jpg
    },
    {
      id: 20,
      title: "Vídeo 20",
      description: "Descrição do vídeo 20. Conteúdo educacional sobre matemática.",
      duration: "14:25",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 20.jpg
    },
    {
      id: 21,
      title: "Vídeo 21",
      description: "Descrição do vídeo 21. Conteúdo educacional sobre matemática.",
      duration: "9:20",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 21.jpg
    },
    {
      id: 22,
      title: "Vídeo 22",
      description: "Descrição do vídeo 22. Conteúdo educacional sobre matemática.",
      duration: "16:35",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 22.jpg
    },
    {
      id: 23,
      title: "Vídeo 23",
      description: "Descrição do vídeo 23. Conteúdo educacional sobre matemática.",
      duration: "11:50",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 23.jpg
    },
    {
      id: 24,
      title: "Vídeo 24",
      description: "Descrição do vídeo 24. Conteúdo educacional sobre matemática.",
      duration: "13:05",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 24.jpg
    },
    {
      id: 25,
      title: "Vídeo 25",
      description: "Descrição do vídeo 25. Conteúdo educacional sobre matemática.",
      duration: "8:45",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 25.jpg
    },
    {
      id: 26,
      title: "Vídeo 26",
      description: "Descrição do vídeo 26. Conteúdo educacional sobre matemática.",
      duration: "17:20",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 26.jpg
    },
    {
      id: 27,
      title: "Vídeo 27",
      description: "Descrição do vídeo 27. Conteúdo educacional sobre matemática.",
      duration: "10:55",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 27.jpg
    },
    {
      id: 28,
      title: "Vídeo 28",
      description: "Descrição do vídeo 28. Conteúdo educacional sobre matemática.",
      duration: "12:30",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 28.jpg
    },
    {
      id: 29,
      title: "Vídeo 29",
      description: "Descrição do vídeo 29. Conteúdo educacional sobre matemática.",
      duration: "15:15",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 29.jpg
    },
    {
      id: 30,
      title: "Vídeo 30",
      description: "Descrição do vídeo 30. Conteúdo educacional sobre matemática.",
      duration: "9:40",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 30.jpg
    },
    {
      id: 31,
      title: "Vídeo 31",
      description: "Descrição do vídeo 31. Conteúdo educacional sobre matemática.",
      duration: "14:50",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 31.jpg
    },
    {
      id: 32,
      title: "Vídeo 32",
      description: "Descrição do vídeo 32. Conteúdo educacional sobre matemática.",
      duration: "11:25",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 32.jpg
    },
    {
      id: 33,
      title: "Vídeo 33",
      description: "Descrição do vídeo 33. Conteúdo educacional sobre matemática.",
      duration: "16:10",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 33.jpg
    },
    {
      id: 34,
      title: "Vídeo 34",
      description: "Descrição do vídeo 34. Conteúdo educacional sobre matemática.",
      duration: "8:35",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 34.jpg
    },
    {
      id: 35,
      title: "Vídeo 35",
      description: "Descrição do vídeo 35. Conteúdo educacional sobre matemática.",
      duration: "13:45",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 35.jpg
    },
    {
      id: 36,
      title: "Vídeo 36",
      description: "Descrição do vídeo 36. Conteúdo educacional sobre matemática.",
      duration: "12:15",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 36.jpg
    },
    {
      id: 37,
      title: "Vídeo 37",
      description: "Descrição do vídeo 37. Conteúdo educacional sobre matemática.",
      duration: "18:30",
      videoUrl: undefined, // Coloque aqui: "https://www.youtube.com/watch?v=SEU_VIDEO_ID"
      thumbnail: undefined, // Coloque aqui: "https://link-da-thumbnail.jpg" OU deixe undefined para usar /assets/thumb 37.jpg
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header da galeria */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Biblioteca de Vídeos
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Explore nossa coleção de vídeos educacionais cuidadosamente selecionados 
          para aprimorar seu aprendizado em matemática.
        </p>
        <div className="mt-6 inline-flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
          {videoSlots.length} vídeos disponíveis
        </div>
      </div>

      {/* Grid de vídeos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {videoSlots.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => setSelectedVideo(video)}
          />
        ))}
      </div>

      {/* Modal do player de vídeo */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {/* Seção de estatísticas */}
      <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">37</div>
            <div className="text-gray-600 dark:text-gray-300">Vídeos Disponíveis</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
            <div className="text-gray-600 dark:text-gray-300">Qualidade HD</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300">Acesso Ilimitado</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;