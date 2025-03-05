import React, {useState,useEffect} from 'react'
import '../CSS/WakfP.css'
import { useParams,Link } from 'react-router-dom';
import { Header } from '../Components/Header';


export const WakfP = () => {
  const { id } = useParams();  
  const [project, setProject] = useState(null);


  useEffect(() => {
      const fetchProject = async () => {
          try {
              const response = await fetch(`http://localhost:8000/apif/public/waqf-projects/${id}/`, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
            
                  },
              });

              if (!response.ok) throw new Error("Failed to fetch project");

              const data = await response.json();
              setProject(data);
          } catch (error) {
              console.error("Error fetching project:", error);
          }
      };

      fetchProject();
  }, [id]);

  if (!project) {
      return <p>Loading...</p>;
  }
  console.log("Project Image URL:", project.image);


  return (
    <>
        
            <Header></Header>
            <div className='project-name Container '>
                    <h3 style={{marginBottom:'2.5em',}}><Link to={'/Awkaf'} style={{textDecoration:'none',color:'#035116'}} >Back</Link></h3>
                 <h1>{project.name}</h1>
            </div>
            <div className="Container">
            <div className="project-img " style={{ backgroundImage: `url(${project.image})` }}>
            </div>
            
            
            </div>
            <div className="" style={{background:"#035116",width:"100%",padding:'1.5em 0',color:"#dbf9d8"}}  >
            <div className="project-content Container" >
                <div style={{marginBottom:'2.5em'}}>
                    <h2>Project Introduction</h2>
                    <p>{project.introduction}</p>
                </div>

                <div style={{marginBottom:'2.5em'}}>
                    <h2>Background</h2>
                    <p>{project.background}</p>
                </div>

                <div style={{marginBottom:'2.5em'}}>
                    <h2>Objectives</h2>
                    <p>{project.objectives}</p>
                </div>

                <div style={{marginBottom:'2.5em'}}>
                    <h2>Key Stages</h2>
                    <p>{project.key_stages}</p>
                </div>

                <div style={{marginBottom:'2.5em'}}>
                    <h2>Expected outcomes</h2>
                    <p>{project.expected_outcomes}</p>
                </div>

                <div style={{marginBottom:'2.5em'}}>
                    <h2>Challenges and Solution</h2>
                    <p>{project.challenges_solutions}</p>
                </div>

                <div style={{marginBottom:'2.5em'}}>
                    <h2>Required resouces</h2>
                    <p>{project.required_resouces}</p>
                </div>

                <div style={{marginBottom:'2.5em'}}>
                    <h2>Timeline</h2>
                    <p>{project.timeline}</p>
                </div>

                <div style={{marginBottom:'2.5em'}}>
                    <h2>Tools</h2>
                    <p>{project.tools_technologies}</p>
                </div>

                <div style={{marginBottom:'2.5em'}}>
                    <h2>Partners & supporters</h2>
                    <p>{project.partners_supporters}</p>
                </div>

                <div style={{marginBottom:'2.5em'}}>
                    <h2>Conclusion</h2>
                    <p>{project.conclusion}</p>
                </div>
                
               
            </div>
            </div>
           

            
           
        

    </>
  )
}
