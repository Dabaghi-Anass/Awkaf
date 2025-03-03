import { useNavigate } from 'react-router-dom';
import '../CSS/project.css'


export default function  Project ({project}){
    const navigate = useNavigate();
    return(
       <div className="project-container">
                <div className="project-pic" ></div>
                <div className="project-text">
                     <h1>{project.name}</h1>
                     <p>{project.introduction}</p>
                </div>
                <div >
                    <button className="more-details" onClick={() => navigate(`/wakf/${project.id}`)}>تعرف أكثر</button>
                </div>
       </div>
    )

}