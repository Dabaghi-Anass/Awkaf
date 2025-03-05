import { useState ,useEffect} from 'react'
import '../CSS/Awkaf.css'
import { Header } from '../Components/Header'
import Project from '../Components/Project'
import WakfPic  from '../Components/WakfPic'
import ReactPaginate from "react-paginate";
import '../App.css'
export default function Awkaf(){

  const [projects, setProjects] = useState([]); 
  const [pageNumber, setPageNumber] = useState(0);

  const projectPerPage = 6;
  const pagesVisited = pageNumber * projectPerPage;

  const displayUsers = projects
    .slice(pagesVisited, pagesVisited + projectPerPage)
    
  const pageCount = Math.ceil(projects.length / projectPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  
 // Array to store fetched data
    // Function to fetch projects from the backend
    const fetchProjects = async () => {
   

      try {
          const response = await fetch("http://localhost:8000/apif/public/waqf-projects/", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
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
        <div style={{backgroundColor:"#bbb9b9",marginTop:"1em",paddingBottom:"0.5em"}}>
          <div className="Container center">
            <div className="project-container-grid">
            {displayUsers.map((project,id)=>(
              <Project key={id} project={project}> </Project>
            ))}
            </div>
            
        </div>
        
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns center"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
      />
          
        </div>
       
        <div className="line-yellow-cont">
        <div className="line-yellow"></div>
        </div>
        
        
        </>
    )
}