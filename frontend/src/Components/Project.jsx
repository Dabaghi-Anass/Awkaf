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
            onClick={() => navigate(`/wakf/${project.id}`)}  
            className="project-container bg-white p-2 rounded-sm   h-[22rem]  w-full  shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group mx-auto cursor-pointer"
        >
            {/* Project Image with Overlay */}
            <div className="relative h-[65%] w-full overflow-hidden">
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
          
               
                    <h1 className="text-lg mt-2 font-medium text-gray-900  line-clamp-1 group-hover:text-green4 transition-colors">
                        {project.name}
                    </h1>
                    

                {/* Button */}
              
                    <button 
                        className="custom-button w-[90%]   block absolute bottom-2 left-1/2 transform -translate-x-1/2"
                        onClick={() => navigate(`/wakf/${project.id}`)}
                    >
                        <span>تعرف أكثر</span>
                       
                    </button>
           
            
        </div>
    );
}
