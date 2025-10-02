import React, { useState, useEffect } from "react";

export const ManageProjects = () => {
  const [projects, setProjects] = useState([]);

  // Fetch projects when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("Using token:", token);
    
        const response = await fetch("http://127.0.0.1:8000/apif/list/waqf-projects/", {
          method: "GET",
          headers: token
            ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
            : { "Content-Type": "application/json" },
        });
    
        const text = await response.text();
        console.log("Raw response:", text);
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = JSON.parse(text); // instead of response.json()
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    
    

    fetchProjects();
  }, []);

  // Function to delete a project
  const handleDelete = async (projectId) => {
    try {
      const token = localStorage.getItem("accessToken"); // Ensure token is stored after login
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
  
      const response = await fetch(`http://127.0.0.1:8000/apif/list/waqf-projects/${projectId}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, // 🔥 Include the token
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 401) {
        throw new Error("Unauthorized: Please log in again.");
      }
  
      if (!response.ok) {
        throw new Error(`Failed to delete project. Status: ${response.status}`);
      }
  
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  

  return (
    <div className="manage-projects center">
      <h2>Manage Waqf Projects</h2>
      <ul>
        {projects.length > 0 ? (
          projects.map((project) => (
            <li key={project.id}>
              <strong>{project.name}</strong> - {project.intro}
              <button onClick={() => handleDelete(project.id)} style={{ marginLeft: "10px", color: "red" }}>
                ❌ Delete
              </button>
            </li>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </ul>
    </div>
  );
};

