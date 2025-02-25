import { useState ,useEffect} from 'react'
import '../CSS/Awkaf.css'
import { Header } from '../Components/Header'
import Project from '../Components/Project'

import WakfPic  from '../Components/WakfPic'
export default function Awkaf(){



  const [projects, setProjects] = useState([]); // Array to store fetched data
    // Function to fetch projects from the backend
    const fetchProjects = async () => {
      const token = localStorage.getItem("accessToken");

      try {
          const response = await fetch("http://localhost:8000/apif/waqf-projects/", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
          });

          const data = await response.json();

          if (!response.ok) {
              console.error("Backend error:", data);
              throw new Error("Failed to fetch projects");
          }

          setProjects(data); // Store fetched data in state
      } catch (error) {
          console.error("Error fetching projects:", error);
          alert("Failed to fetch projects");
      }
  };

  // Fetch projects when the component mounts
  useEffect(() => {
      fetchProjects();
  }, []);
    return(
        <>
          <Header></Header>
          <WakfPic></WakfPic> 
        
        <div className="project-container-grid">
          {projects.map((project,id)=>(
            <Project key={id} project={project}></Project>
          ))}
        </div>
        <div className="line-yellow-cont">
        <div className="line-yellow"></div>
        </div>
        
        
        </>
    )
}