import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { AdminContext } from "./AdminProvider";

export const ProjectsTable = () => {
  const { activeTab, setActiveTab, setProjectData, setIsEditing } = useContext(AdminContext);
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
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
      const response = await fetch("http://127.0.0.1:8000/apif/public/waqf-projects/");
      const data = await response.json();
      if (Array.isArray(data)) {
        setTotalPages(Math.ceil(data.length / pageSize));
      }
    } catch (error) {
      console.error("Error fetching total pages:", error);
      setTotalPages(1);
    }
  };

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
      <div className="w-full mx-auto  p-6">
        
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-400">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Project Name</th>
              <th className="border border-gray-300 p-2">Objectives</th>
              <th className="border border-gray-300 p-2">Created Date</th>
              <th className="border border-gray-300 p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.id} className="text-center border border-gray-300 hover:bg-gray-100 transition duration-300">
                  <td className="p-2">{project.id}</td>
                  <td className="p-2">{project.name}</td>
                  <td className="p-2">{project.objectives}</td>
                  <td className="p-2">{project.created_at}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-800 ml-2"
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
              shape="rounded-2xl"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#035116",
                  borderColor: "#035116",
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "#e6f5ea",
                },
                "& .Mui-selected": {
                  backgroundColor: "#035116 !important",
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
