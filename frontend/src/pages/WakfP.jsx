import React, {useState,useEffect} from 'react'
import '../CSS/WakfP.css'
import { useParams } from 'react-router-dom';


export const WakfP = () => {
  const { id } = useParams();  // ✅ Get the project ID from the URL
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


  return (
    <>
         <div className="WakfP-container ">
            <div className='project-name '>
                 <h1>{project.name}</h1>
            </div>

            <div className="comp intro ">
                <h3>{project.introduction}</h3>
            </div>
            
           
         </div>

    </>
  )
}
