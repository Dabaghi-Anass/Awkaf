import { useNavigate } from 'react-router-dom';

export default function Project({ project }) {
    const navigate = useNavigate();

    // Ensure the image URL is correct
    const imageUrl = project.image?.startsWith("http") ? project.image : `http://localhost:8000${project.image}`;
    console.log("Project Image URL:", imageUrl);

    return (
        <div dir='rtl' className="project-container bg-white h-[30em] w-[22em] rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
            
            {/* Project Image */}
            <div 
                className="project-pic bg-cover bg-center h-3/5 w-full rounded-t-xl"
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
            
            {/* Project Details */}
            <div className="project-text px-4 py-3">
                <h1 className="text-lg font-semibold text-gray-800">{project.name}</h1>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                    {project.introduction}
                </p>
            </div>

            {/* Button */}
            <div className="flex justify-center pb-3">
                <button 
                    className="more-details bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-5 rounded-lg transition-all"
                    onClick={() => navigate(`/wakf/${project.id}`)}
                >
                    تعرف أكثر
                </button>
            </div>
        </div>
    );
}
