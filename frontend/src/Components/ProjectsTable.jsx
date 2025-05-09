import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { AdminContext } from "./AdminProvider";

export const ProjectsTable = () => {
  const { activeTab, setActiveTab, setProjectData, setIsEditing } = useContext(AdminContext);
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects(page, pageSize);
  }, [page]);

  useEffect(() => {
    fetchTotalPages();
  }, []);

  const fetchTotalPages = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/apif/list/waqf-projects/");
      const data = await response.json();
      if (Array.isArray(data)) {
        setTotalPages(Math.ceil(data.length / pageSize));
        console.log("Total Pages:", data);
      }
    } catch (error) {
      console.error("Error fetching total pages:", error);
      setTotalPages(1);
    }
  };
  
  console.log("Total Pages:", totalPages);
  const fetchProjects = async (pageNumber, pageSize) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/apif/list/waqf-projects/?page=${pageNumber}&page_size=${pageSize}`
      );
      if (!response.ok) {
        console.error("Failed to fetch projects:", response.status);
        return;
      }
      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };
  console.log("Projects:", projects);

  const deleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No authentication token found!");
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/apif/waqf-projects/${projectId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to delete project:", response.status);
        return;
      }

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEdit = (project) => {
    setProjectData(project);
    setIsEditing(true);
    setActiveTab("ManageProject");
  };

  return (
    <>
      <div className="w-full mx-auto  ">
        
        <table className="w-full border-collapse  border border-gray-950 ">
          <thead>
            <tr className="bg-gray-800 text-[0.8em] text-white">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Project Name</th>
              <th className="border border-gray-300 p-2">Partners</th>
              <th className="border border-gray-300 p-2">Created Date</th>
              <th className="border border-gray-300 p-2">Updated Date</th>
              <th className="border border-gray-300 p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.id} className="text-left text-[0.8em] border border-gray-300 hover:bg-gray-100 transition duration-300">
                  <td className="p-2">{project.id}</td>
                  <td className="p-2">{project.name}</td>
                  <td className="p-2">{project.partners}</td>
                  <td className="p-2">{project.created_at}</td>
                  <td className="p-2">{project.updated_at}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="px-4 py-1 custom-button rounded-[8px]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="px-4 py-1 bg-gray-600 text-white rounded-[8px] hover:bg-gray-800 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-600">No projects found</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-5">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              variant="outlined"
              shape="rounded-lg"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#22C55E",
                  borderColor: "#22C55E",
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "#15803D",
                },
                "& .Mui-selected": {
                  backgroundColor: "#22C55E !important",
                  color: "white !important",
                },
              }}
            />
          </Stack>
        </div>
      </div>
    </>
  );
};
