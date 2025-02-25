import '../CSS/project.css'

export default function  Project ({project}){
    return(
       <div className="project-container">
                <div className="project-pic" ></div>
                <div className="project-text">
                     <h1>{project.name}</h1>
                     <p>{project.introduction}</p>
                </div>
                <div className="join-button-container">
                    <button className="join-button">تعرف أكثر</button>
                </div>
       </div>
    )

}