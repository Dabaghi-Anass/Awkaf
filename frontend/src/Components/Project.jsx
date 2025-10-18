import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E';

export default function Project({ project }) {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const imageUrl = project.image?.startsWith("http") 
    ? project.image 
    : `http://localhost:8000${project.image}`;

  const handleNavigate = () => {
    navigate(`/wakf/${project.id}`);
  };

  return (
    <div 
      dir='rtl' 
      className="group h-80 w-full cursor-pointer"
      onClick={handleNavigate}
    >
      <div className="relative h-full w-full bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
        
        {/* Image Container */}
        <div className="relative h-2/3 w-full overflow-hidden bg-gray-200">
          <div 
            className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ 
              backgroundImage: `url(${imageError ? fallbackImage : imageUrl})`
            }}
            onError={() => setImageError(true)}
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
          
          {/* Status Badge */}
          {project.status && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                {project.status}
              </span>
            </div>
          )}

          {/* Hover Arrow Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full">
              <ChevronLeft className="w-6 h-6 text-green4" strokeWidth={3} />
            </div>
          </div>
        </div>
        
        {/* Content Container */}
        <div className="flex flex-col justify-between flex-1 p-4">
          {/* Title */}
          <h2 className="text-base md:text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-green4 transition-colors duration-200">
            {project.name}
          </h2>
          
          {/* Button */}
          <button 
            onClick={handleNavigate}
            className="mt-3 w-full bg-green4 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-md transition-all duration-200 hover:shadow-lg text-sm"
          >
            تعرف أكثر
          </button>
        </div>
      </div>
    </div>
  );
}