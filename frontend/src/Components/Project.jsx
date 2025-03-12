import { useNavigate } from 'react-router-dom';
import '../CSS/project.css';

export default function Project({ project }) {
    const navigate = useNavigate();

    // Ensure the image URL is correct
    const imageUrl = project.image?.startsWith("http") ? project.image : `http://localhost:8000${project.image}`;
    console.log("Project Image URL:", imageUrl);
    return (
        <div className="project-container bg-white  ">
            
            <div className="project-pic ">
                <img src={imageUrl} alt={project.name}  />
            </div>
            <div className="project-text">
                <h1>{project.name}</h1>
                <p>{project.introduction}</p>
            </div>
            <button className="more-details" onClick={() => navigate(`/wakf/${project.id}`)}>تعرف أكثر</button>
        </div>
    );
}
