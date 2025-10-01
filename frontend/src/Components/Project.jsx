import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
export default function Project({ project }) {

    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();

    // Ensure the image URL is correct
    const imageUrl = project.image?.startsWith("http") ? project.image : `http://localhost:8000${project.image}`;
    console.log("Project Image URL:", imageUrl);

return (
        <div 
            dir='rtl' 
            className="project-container bg-white h-[28em] w-full rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
        >
            {/* Project Image with Overlay */}
            <div className="relative h-3/5 w-full overflow-hidden">
                <div 
                    className="bg-cover bg-center h-full w-full transition-transform duration-500 group-hover:scale-110"
                    style={{ 
                        backgroundImage: `url(${imageError ? fallbackImage : imageUrl})` 
                    }}
                    onError={() => setImageError(true)}
                >
                    {/* Dark Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                </div>

                {/* Status Badge (Optional - if you have status in your project data) */}
                {project.status && (
                    <div className="absolute top-4 right-4">
                        <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                            {project.status}
                        </span>
                    </div>
                )}
            </div>
            
            {/* Project Details */}
            <div className="project-text px-5 py-4 flex flex-col justify-between h-2/5">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
                        {project.name}
                    </h1>
                    
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
                        {project.introduction}
                    </p>

                    {/* Optional: Location if available in your data */}
                    {project.location && (
                        <div className="flex items-center text-xs text-gray-500 mt-2">
                            <MapPin className="w-3 h-3 ml-1" />
                            <span>{project.location}</span>
                        </div>
                    )}
                </div>

                {/* Button */}
                <div className="mt-auto pt-3">
                    <button 
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/button"
                        onClick={() => navigate(`/wakf/${project.id}`)}
                    >
                        <span>تعرف أكثر</span>
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover/button:-translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    );
}
